import { NextFunction, Request } from "express";
import fs from "fs";
import HttpStatus from "http-status-codes";
import moment from "moment";
import mongoose from "mongoose";
import path from "path";
import XlsxPopulate from "xlsx-populate";
import Utility, {
  IServiceResult1,
} from "../../common/common-methods";
import BILLING_PAYMENT_MODEL, {
  EBillingModeValues,
} from "../../models/billing_payment.model";
import BillingPostPaymentModel from "../../models/billing_post_payment.model";
import SuperBillModel from "../../models/super_bill.model";
import {
  ChargeLogReportViewmodel,
  GetDailyPaymentReportViewmodel,
} from "../../view-models/reports";

export enum EnumRoles {
  SUPERADMIN = "superadmin",
}
class ReportServices {
  exportChargeLogReportExcel = async (
    req: Request,
    model: ChargeLogReportViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      const workbook = await XlsxPopulate.fromBlankAsync();
      let chargeLogSheet: any = workbook.sheet("Sheet1");
      let chargeLogSheetHeader = [
        "S.No.",
        "First Name",
        "Last Name",
        "Patient ID",
        "DOS",
        "Provider",
        "Primary Insurance",
        "Secondary Insurance",
        "Procedure 1",
        "Procedure 2",
        "Claim Status",
        "Date of Submission",
      ];

      chargeLogSheetHeader.forEach((el: any, i: number) => {
        chargeLogSheet
          .cell(String.fromCharCode(i + 65) + "1")
          .value(el)
          .style({
            border: true,
            fontFamily: "Calibri",
            fill: {
              type: "solid",
              color: { rgb: "d9d9d9" },
            },
          });
      });

      if (!model.clinic_id) {
        return {
          status_code: HttpStatus.OK,
          data: [],
          success: true,
        };
      }

      const count = model.pageSize ? model.pageSize : 50;
      const page = model.pageNumber ? model.pageNumber : 1;
      const skip = count * (page - 1);

      let condition: any = {
        clinic_id: new mongoose.Types.ObjectId(
          model.clinic_id.toString()
        ),
      };

      const data: any = await SuperBillModel.aggregate([
        { $match: condition },

        {
          $lookup: {
            from: "patients",
            localField: "patient_id",
            foreignField: "_id",
            pipeline: [
              {
                $project: {
                  first_name: 1,
                  last_name: 1,
                  patientId: 1,
                },
              },
            ],
            as: "patientData",
          },
        },
        {
          $unwind: {
            path: "$patientData",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: "appointment",
            localField: "appointment_id",
            foreignField: "_id",
            pipeline: [
              {
                $lookup: {
                  from: "doctor",
                  localField: "doctor_id",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $lookup: {
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        pipeline: [
                          {
                            $project: {
                              first_name: 1,
                              last_name: 1,
                            },
                          },
                        ],
                        as: "userData",
                      },
                    },
                    {
                      $unwind: {
                        path: "$userData",
                        preserveNullAndEmptyArrays: true,
                      },
                    },
                    { $project: { userData: 1 } },
                  ],
                  as: "providerData",
                },
              },
              {
                $unwind: {
                  path: "$providerData",
                  preserveNullAndEmptyArrays: true,
                },
              },

              {
                $project: {
                  startDateTime: 1,
                  providerData: 1,
                },
              },
            ],
            as: "appointmentData",
          },
        },
        {
          $unwind: {
            path: "$appointmentData",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: "insurance",
            let: {
              patient_id: "$patient_id",
              coverage: "$insurance.coverage",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: [
                          "$patient_id",
                          "$$patient_id",
                        ],
                      },
                      {
                        $in: [
                          "$coverage",
                          [
                            "Primary",
                            "Secondary",
                            "Tertiary",
                          ],
                        ],
                      },
                    ],
                  },
                },
              },

              {
                $lookup: {
                  from: "insurance_companies",
                  localField: "insurance_company_id",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $project: { companyName: 1 },
                    },
                  ],
                  as: "insuranceCompanyData",
                },
              },
              {
                $unwind: {
                  path: "$insuranceCompanyData",
                  preserveNullAndEmptyArrays: true,
                },
              },

              {
                $project: {
                  insuranceCompanyData: 1,
                },
              },
            ],
            as: "insuranceData",
          },
        },

        {
          $lookup: {
            from: "cpt",
            localField: "cpt.cpt_code_id",
            foreignField: "_id",
            let: { cpt_id: "$cpt.cpt_code_id" },
            pipeline: [
              {
                $project: {
                  cptCode: 1,
                },
              },
            ],
            as: "cptData",
          },
        },
        // {
        //   $unwind: {
        //     path: "$cptData",
        //     preserveNullAndEmptyArrays: true,
        //   },
        // },

        {
          $facet: {
            totalCount: [{ $count: "sum" }],
            aggregatedData: [
              {
                $project: {
                  _id: 1,

                  Patient_ID: "$patientData.patientId",

                  patient_first_name:
                    "$patientData.first_name",
                  patient_last_name:
                    "$patientData.last_name",

                  dos: "$appointmentData.startDateTime",
                  provider_first_name:
                    "$appointmentData.providerData.userData.first_name",
                  provider_last_name:
                    "$appointmentData.providerData.userData.last_name",
                  procedure_1: "$cptData",

                  procedure_2: "$cptData",
                  claim_status:
                    "$ClaimStatusObject.claimStatus",
                  date_of_submission:
                    "$ClaimStatusObject.submitDate",

                  primaryInsurance: "$insuranceData",
                  secondaryInsurance: "$insuranceData",
                },
              },
              { $limit: skip + count },
              { $skip: skip },
            ],
          },
        },
      ]);

      if (data && data[0].aggregatedData.length > 0) {
        data[0].aggregatedData.forEach((obj: any) => {
          obj.patient_first_name = Utility.getDecryptText(
            obj.patient_first_name
          );

          obj.patient_last_name = Utility.getDecryptText(
            obj.patient_last_name
          );

          obj.procedure_1 =
            obj.procedure_1.length > 0
              ? obj.procedure_1[0].cptCode
              : "";
          obj.procedure_2 =
            obj.procedure_1.length >= 2
              ? obj.procedure_1[1].cptCode
              : "";

          obj.primaryInsurance =
            obj.primaryInsurance &&
            obj.primaryInsurance.length > 0
              ? obj.primaryInsurance[0].insuranceCompanyData
                  .companyName
              : "";
          obj.secondaryInsurance =
            obj.secondaryInsurance &&
            obj.secondaryInsurance.length >= 2
              ? obj.secondaryInsurance[1]
                  .insuranceCompanyData.companyName
              : "";
        });

        // write data in excel
        let excelData1 = data[0].aggregatedData;

        let sheetStyle = {
          border: true,
          fontFamily: "Calibri",
        };

        excelData1.forEach((el: any, i: number) => {
          console.log(el);
          // let date = moment(el.startDateTime).format(
          //   "DD-MM-YYYY"
          // );

          chargeLogSheet
            .cell("A" + (i + 2))
            .value(i + 1)
            .style(sheetStyle);

          chargeLogSheet
            .cell("B" + (i + 2))
            .value(el.patient_first_name)
            .style(sheetStyle);

          chargeLogSheet
            .cell("C" + (i + 2))
            .value(el.patient_last_name)
            .style(sheetStyle);

          chargeLogSheet
            .cell("D" + (i + 2))
            .value(el.Patient_ID)

            .style(sheetStyle);

          chargeLogSheet
            .cell("E" + (i + 2))
            .value(moment(el.dos).format("DD-MM-YYYY"))
            .style(sheetStyle);

          chargeLogSheet
            .cell("F" + (i + 2))
            .value(
              el.provider_first_name +
                "" +
                el.provider_last_name
            )
            .style(sheetStyle);
          chargeLogSheet;

          chargeLogSheet
            .cell("G" + (i + 2))
            .value(el.primaryInsurance)
            .style(sheetStyle);

          chargeLogSheet
            .cell("H" + (i + 2))
            .value(el.secondaryInsurance)
            .style(sheetStyle);

          chargeLogSheet
            .cell("I" + (i + 2))
            .value(el.procedure_1)
            .style(sheetStyle);

          chargeLogSheet
            .cell("J" + (i + 2))
            .value(el.procedure_2)
            .style(sheetStyle);

          chargeLogSheet
            .cell("K" + (i + 2))
            .value(el.claim_status)
            .style(sheetStyle);

          chargeLogSheet
            .cell("L" + (i + 2))
            .value(
              moment(el.date_of_submission).format(
                "DD-MM-YYYY"
              )
            )
            .style(sheetStyle);
        });

        chargeLogSheet.freezePanes(1, 1);

        const excelData: any = await workbook.outputAsync();
        await fs.writeFileSync(
          path.join(
            __dirname,
            "../../../../../public/upload/reports/ChargeLog_Report.xlsx"
          ),
          excelData
        );
        let link = `http://${req.hostname}:${process.env.PORT}/upload/reports/ChargeLog_Report.xlsx`;

        let excelFileName = "ChargeLog_Report.xlsx";
        let response = {
          totalDocs: data[0].totalCount[0].sum,
          data: excelData1,
          link,
          name: excelFileName,
        };
        return {
          status_code: HttpStatus.OK,
          data: response, //link,
          success: true,
        };
      } else {
        return {
          status_code: HttpStatus.OK,
          data: [],
          success: true,
        };
      }
    } catch (error) {
      next(error);
    }
  };

  exportDailyPaymentReportExcel = async (
    req: Request,
    model: GetDailyPaymentReportViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      // either user type patient or  insurance
      const workbook = await XlsxPopulate.fromBlankAsync();
      let paymentSheet: any = workbook.sheet("Sheet1");
      let paymentSheetHeader = [
        "S.No.",
        "Patient ID",
        "Name",
        "DOB",
        "DOS",
        "Provider",
        "Self-Pay/Copay",
        "Patient Due",
        "Amount paid",
        "Card Processed",
        "Last 4 digits of Card",
        "Payment Date",
        "Payment Post Date",
        "PAYMENT SENT ON",
        "BALANCE",
        "Payment Applied/Not Applied",
      ];

      paymentSheetHeader.forEach((el: any, i: number) => {
        paymentSheet
          .cell(String.fromCharCode(i + 65) + "1")
          .value(el)
          .style({
            border: true,
            fontFamily: "Calibri",
            fill: {
              type: "solid",
              color: { rgb: "d9d9d9" },
            },
          });
      });

      if (!model.clinic_id) {
        return {
          status_code: HttpStatus.OK,
          data: [],
          success: true,
        };
      }

      const count = model.pageSize ? model.pageSize : 50;
      const page = model.pageNumber ? model.pageNumber : 1;
      const skip = count * (page - 1);

      let condition: any = {
        clinic_id: new mongoose.Types.ObjectId(
          model.clinic_id.toString()
        ),
      };

      if (model.user_type === "INSURANCE")
        condition = {
          clinic_id: new mongoose.Types.ObjectId(
            model.clinic_id.toString()
          ),
          insurancePaymentId: { $ne: null },
        };

      if (model.depositDateFrom) {
        let startTime = new Date(model.depositDateFrom);
        startTime.setHours(0, 0, 0, 0);
        let endTime = new Date(model.depositDateFrom);
        endTime.setHours(23, 59, 59, 999);
        condition.createdAt = {
          $gte: startTime,
          //$lte: endTime,
        };
      }
      if (model.depositDateTo) {
        let startTime = new Date(model.depositDateTo);
        startTime.setHours(0, 0, 0, 0);
        let endTime = new Date(model.depositDateTo);
        endTime.setHours(23, 59, 59, 999);
        condition.createdAt = {
          // $gte: startTime,
          $lte: endTime,
        };
      }

      if (model.mode) condition.mode = model.mode;

      if (model.patient_id)
        condition.patient_id = new mongoose.Types.ObjectId(
          model.patient_id!.toString()
        );

      const data: any =
        await BILLING_PAYMENT_MODEL.aggregate([
          { $match: condition },

          {
            $lookup: {
              from: "patients",
              localField: "patient_id",
              foreignField: "_id",
              pipeline: [
                {
                  $project: {
                    first_name: 1,
                    last_name: 1,
                    date_of_birth: 1,
                    patientId: 1,
                  },
                },
              ],
              as: "patientData",
            },
          },
          {
            $unwind: {
              path: "$patientData",
              preserveNullAndEmptyArrays: true,
            },
          },

          {
            $lookup: {
              from: "appointment",
              localField: "appointment_id",
              foreignField: "_id",
              pipeline: [
                {
                  $lookup: {
                    from: "doctor",
                    localField: "doctor_id",
                    foreignField: "_id",
                    pipeline: [
                      {
                        $lookup: {
                          from: "users",
                          localField: "user_id",
                          foreignField: "_id",
                          pipeline: [
                            {
                              $project: {
                                first_name: 1,
                                last_name: 1,
                              },
                            },
                          ],
                          as: "userData",
                        },
                      },
                      {
                        $unwind: {
                          path: "$userData",
                          preserveNullAndEmptyArrays: true,
                        },
                      },
                      { $project: { userData: 1 } },
                    ],
                    as: "providerData",
                  },
                },
                {
                  $unwind: {
                    path: "$providerData",
                    preserveNullAndEmptyArrays: true,
                  },
                },

                {
                  $project: {
                    startDateTime: 1,
                    providerData: 1,
                  },
                },
              ],
              as: "appointmentData",
            },
          },
          {
            $unwind: {
              path: "$appointmentData",
              preserveNullAndEmptyArrays: true,
            },
          },

          {
            $facet: {
              totalCount: [{ $count: "sum" }],
              aggregatedData: [
                {
                  $project: {
                    _id: 1,

                    Patient_ID: "$patientData.patientId",

                    patient_first_name:
                      "$patientData.first_name",
                    patient_last_name:
                      "$patientData.last_name",
                    dob: "$patientData.date_of_birth",
                    dos: "$appointmentData.startDateTime",
                    provider_first_name:
                      "$appointmentData.providerData.userData.first_name",
                    provider_last_name:
                      "$appointmentData.providerData.userData.last_name",
                    Self_Pay_Copay: "Self-Pay",
                    patient_Due: "0",
                    amount_paid: "$amount",
                    payment_mode: "$mode",

                    card_process: {
                      $cond: [
                        {
                          $eq: [
                            "$mode",
                            EBillingModeValues.CARD,
                          ],
                        },
                        "YES",
                        "NO",
                      ],
                    },
                    card_last_digit: {
                      $cond: [
                        { $eq: ["$card_process", "YES"] },
                        "1234",
                        " ",
                      ],
                    },
                    payment_date: "$createdAt",
                    payment_sent_date: "$createdAt",
                    balance: "00",
                    Payment_Applied_Not_Applied: "NO",
                  },
                },
                { $limit: skip + count },
                { $skip: skip },
              ],
            },
          },
        ]);

      if (data && data[0].aggregatedData.length > 0) {
        data[0].aggregatedData.forEach((obj: any) => {
          obj.patient_first_name = Utility.getDecryptText(
            obj.patient_first_name
          );

          obj.patient_last_name = Utility.getDecryptText(
            obj.patient_last_name
          );
        });

        // write data in excel
        let excelData1 = data[0].aggregatedData;

        let sheetStyle = {
          border: true,
          fontFamily: "Calibri",
        };

        excelData1.forEach((el: any, i: number) => {
          // console.log(el);
          // let date = moment(el.startDateTime).format(
          //   "DD-MM-YYYY"
          // );

          paymentSheet
            .cell("A" + (i + 2))
            .value(i + 1)
            .style(sheetStyle);

          paymentSheet
            .cell("B" + (i + 2))
            .value(el.Patient_ID)
            .style(sheetStyle);

          paymentSheet
            .cell("C" + (i + 2))
            .value(
              el.patient_last_name +
                "," +
                el.patient_first_name
            )
            .style(sheetStyle);

          paymentSheet
            .cell("D" + (i + 2))
            .value(moment(el.dob).format("DD-MM-YYYY"))
            .style(sheetStyle);

          paymentSheet
            .cell("E" + (i + 2))
            .value(moment(el.dos).format("DD-MM-YYYY"))
            .style(sheetStyle);
          paymentSheet;

          paymentSheet
            .cell("F" + (i + 2))
            .value(
              el.provider_first_name +
                "" +
                el.provider_last_name
            )
            .style(sheetStyle);

          paymentSheet
            .cell("G" + (i + 2))
            .value(el.Self_Pay_Copay)
            .style(sheetStyle);

          paymentSheet
            .cell("H" + (i + 2))
            .value(el.patient_Due)
            .style(sheetStyle);

          paymentSheet
            .cell("I" + (i + 2))
            .value(el.amount_paid)
            .style(sheetStyle);

          paymentSheet
            .cell("J" + (i + 2))
            .value(el.card_process)
            .style(sheetStyle);

          paymentSheet
            .cell("K" + (i + 2))
            .value(el.card_last_digit)
            .style(sheetStyle);

          paymentSheet
            .cell("L" + (i + 2))
            .value(
              moment(el.payment_date).format("DD-MM-YYYY")
            )
            .style(sheetStyle);

          paymentSheet
            .cell("M" + (i + 2))
            .value(el.payment_date)
            .style(sheetStyle);

          paymentSheet
            .cell("N" + (i + 2))
            .value(el.payment_date)
            .style(sheetStyle);

          paymentSheet
            .cell("O" + (i + 2))
            .value(el.balance)
            .style(sheetStyle);

          paymentSheet
            .cell("P" + (i + 2))
            .value(el.Payment_Applied_Not_Applied)
            .style(sheetStyle);
        });

        paymentSheet.freezePanes(1, 1);

        const excelData: any = await workbook.outputAsync();
        await fs.writeFileSync(
          path.join(
            __dirname,
            "../../../../../public/upload/reports/Payment_Daily_Report.xlsx"
          ),
          excelData
        );
        let link = `http://${req.hostname}:${process.env.PORT}/upload/reports/Payment_Daily_Report.xlsx`;

        let excelFileName = "Payment_Daily_Report.xlsx";
        let response = {
          totalDocs: data[0].totalCount[0].sum,
          data: excelData1,
          link,
          name: excelFileName,
        };
        return {
          status_code: HttpStatus.OK,
          data: response, //link,
          success: true,
        };
      } else {
        return {
          status_code: HttpStatus.OK,
          data: [],
          success: true,
        };
      }
    } catch (error) {
      next(error);
    }
  };

  exportInsuranceLogReportExcel = async (
    req: Request,
    model: ChargeLogReportViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      const workbook = await XlsxPopulate.fromBlankAsync();
      let insuranceLogSheet: any = workbook.sheet("Sheet1");
      let insuranceLogSheetHeader = [
        "S.No.",
        "Patient ID",
        "DOS",
        "UNIQUE ID",
        "First Name",
        "Last Name",
        "Patient Name",
        "DOB",
        "Provider",
        "Primary Insurance",
        "Secondary Insurance",
        "Procedure 1",
        "Procedure 2",
        "Charge Amt",
        "Insurance Allowed Amt",
        "Insurance Pmt",
        "Pat Resp",
        "PR-1/2/3",
        "Pat Pmt",
        "Adjustment",
        "INS BALANCE DUE TO DENIAL",
        "DENIAL REASON",
        "Payment Mode",
        // "Payment #",
        // "Payment Date",
        // "Pmt Post Date",
        // "Balance Due",
        // "Billed to Patient",
        // "Billed to Secondary",
        // "PAYMENT SENT ON",
      ];

      insuranceLogSheetHeader?.forEach(
        (el: any, i: number) => {
          insuranceLogSheet
            .cell(String.fromCharCode(i + 65) + "1")
            .value(el)
            .style({
              border: true,
              fontFamily: "Calibri",
              fill: {
                type: "solid",
                color: { rgb: "d9d9d9" },
              },
            });
        }
      );

      if (!model.clinic_id) {
        return {
          status_code: HttpStatus.OK,
          data: [],
          success: true,
        };
      }

      const count = model.pageSize ? model.pageSize : 50;
      const page = model.pageNumber ? model.pageNumber : 1;
      const skip = count * (page - 1);

      let condition: any = {
        clinic_id: new mongoose.Types.ObjectId(
          model.clinic_id.toString()
        ),
      };

      const data: any =
        await BillingPostPaymentModel.aggregate([
          { $match: condition },

          {
            $lookup: {
              from: "patients",
              localField: "patient_id",
              foreignField: "_id",
              pipeline: [
                {
                  $project: {
                    first_name: 1,
                    last_name: 1,
                    patientId: 1,
                    date_of_birth: 1,
                  },
                },
              ],
              as: "patientData",
            },
          },
          {
            $unwind: {
              path: "$patientData",
              preserveNullAndEmptyArrays: true,
            },
          },

          {
            $lookup: {
              from: "appointment",
              localField: "appointment_id",
              foreignField: "_id",
              pipeline: [
                {
                  $lookup: {
                    from: "doctor",
                    localField: "doctor_id",
                    foreignField: "_id",
                    pipeline: [
                      {
                        $lookup: {
                          from: "users",
                          localField: "user_id",
                          foreignField: "_id",
                          pipeline: [
                            {
                              $project: {
                                first_name: 1,
                                last_name: 1,
                              },
                            },
                          ],
                          as: "userData",
                        },
                      },
                      {
                        $unwind: {
                          path: "$userData",
                          preserveNullAndEmptyArrays: true,
                        },
                      },
                      { $project: { userData: 1 } },
                    ],
                    as: "providerData",
                  },
                },
                {
                  $unwind: {
                    path: "$providerData",
                    preserveNullAndEmptyArrays: true,
                  },
                },

                {
                  $project: {
                    startDateTime: 1,
                    providerData: 1,
                    appointment_number: 1,
                  },
                },
              ],
              as: "appointmentData",
            },
          },
          {
            $unwind: {
              path: "$appointmentData",
              preserveNullAndEmptyArrays: true,
            },
          },

          {
            $lookup: {
              from: "insurance",
              let: {
                patient_id: "$patient_id",
                coverage: "$insurance.coverage",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: [
                            "$patient_id",
                            "$$patient_id",
                          ],
                        },
                        {
                          $in: [
                            "$coverage",
                            [
                              "Primary",
                              "Secondary",
                              "Tertiary",
                            ],
                          ],
                        },
                      ],
                    },
                  },
                },

                {
                  $lookup: {
                    from: "insurance_companies",
                    localField: "insurance_company_id",
                    foreignField: "_id",
                    pipeline: [
                      {
                        $project: { companyName: 1 },
                      },
                    ],
                    as: "insuranceCompanyData",
                  },
                },
                {
                  $unwind: {
                    path: "$insuranceCompanyData",
                    preserveNullAndEmptyArrays: true,
                  },
                },

                {
                  $project: {
                    insuranceCompanyData: 1,
                  },
                },
              ],
              as: "insuranceData",
            },
          },

          {
            $lookup: {
              from: "cpt",
              localField: "cpt.cpt_code_id",
              foreignField: "_id",
              let: { cpt_id: "$cpt.cpt_code_id" },
              pipeline: [
                {
                  $project: {
                    cptCode: 1,
                  },
                },
              ],
              as: "cptData",
            },
          },
          // {
          //   $unwind: {
          //     path: "$cptData",
          //     preserveNullAndEmptyArrays: true,
          //   },
          // },
          {
            $lookup: {
              from: "super_bill",
              localField: "superbill_id",
              foreignField: "_id",
              pipeline: [
                {
                  $lookup: {
                    from: "cpt",
                    localField: "cpt.cpt_code_id",
                    foreignField: "_id",
                    let: { cpt_id: "$cpt.cpt_code_id" },
                    pipeline: [
                      {
                        $project: {
                          cptCode: 1,
                        },
                      },
                    ],
                    as: "cptData",
                  },
                },

                {
                  $project: {
                    cptData: 1,
                  },
                },
              ],
              as: "superBillData",
            },
          },
          {
            $unwind: {
              path: "$superBillData",
              preserveNullAndEmptyArrays: true,
            },
          },

          {
            $facet: {
              totalCount: [{ $count: "sum" }],
              aggregatedData: [
                {
                  $project: {
                    _id: 1,

                    Patient_ID: "$patientData.patientId",

                    patient_first_name:
                      "$patientData.first_name",
                    patient_last_name:
                      "$patientData.last_name",

                    dos: "$appointmentData.startDateTime",
                    uniqueID:
                      "$appointmentData.appointment_number",

                    provider_first_name:
                      "$appointmentData.providerData.userData.first_name",
                    provider_last_name:
                      "$appointmentData.providerData.userData.last_name",
                    procedure_1: "$superBillData.cptData",

                    procedure_2: "$superBillData.cptData",
                    claim_status:
                      "$ClaimStatusObject.claimStatus",
                    date_of_submission:
                      "$ClaimStatusObject.submitDate",

                    primaryInsurance: "$insuranceData",
                    secondaryInsurance: "$insuranceData",

                    insurance_paid: "$insurance_paid",

                    charge_amount: "$charge_amount",

                    allowed_amount: "$allowed_amount",
                    adjustment: "$adjustment",

                    //
                  },
                },
                { $limit: skip + count },
                { $skip: skip },
              ],
            },
          },
        ]);

      if (data && data[0].aggregatedData.length > 0) {
        data[0].aggregatedData.forEach((obj: any) => {
          obj.patient_first_name = Utility.getDecryptText(
            obj.patient_first_name
          );

          obj.patient_last_name = Utility.getDecryptText(
            obj.patient_last_name
          );

          obj.procedure_1 =
            obj.procedure_1 &&
            obj.procedure_1.length &&
            obj.procedure_1[0].cptCode > 0
              ? obj.procedure_1[0].cptCode
              : "";
          obj.procedure_2 =
            obj.procedure_1 &&
            obj.procedure_1.length &&
            obj.procedure_1[1].cptCode >= 2
              ? obj.procedure_1[1].cptCode
              : "";

          obj.primaryInsurance =
            obj.primaryInsurance &&
            obj.primaryInsurance.length > 0
              ? obj.primaryInsurance[0].insuranceCompanyData
                  .companyName
              : "";
          obj.secondaryInsurance =
            obj.secondaryInsurance &&
            obj.secondaryInsurance.length >= 2
              ? obj.secondaryInsurance[1]
                  .insuranceCompanyData.companyName
              : "";
        });

        // write data in excel
        let excelData1 = data[0].aggregatedData;

        let sheetStyle = {
          border: true,
          fontFamily: "Calibri",
        };
        let finalResponseArr: any = [];
        excelData1.forEach((el: any, i: number) => {
          finalResponseArr.push(el);

          let patientName = `${
            el.patient_last_name +
            " " +
            el.patient_first_name
          }`;

          insuranceLogSheet
            .cell("A" + (i + 2))
            .value(i + 1)
            .style(sheetStyle);

          insuranceLogSheet
            .cell("B" + (i + 2))
            .value(el.Patient_ID)
            .style(sheetStyle);

          insuranceLogSheet
            .cell("C" + (i + 2))
            .value(moment(el.dos).format("DD-MM-YYYY"))
            .style(sheetStyle);

          insuranceLogSheet
            .cell("D" + (i + 2))
            .value(el.uniqueID)

            .style(sheetStyle);

          insuranceLogSheet
            .cell("E" + (i + 2))
            .value(el.patient_first_name)
            .style(sheetStyle);

          insuranceLogSheet
            .cell("F" + (i + 2))
            .value(el.patient_last_name)

            .style(sheetStyle);
          insuranceLogSheet;

          insuranceLogSheet
            .cell("G" + (i + 2))
            .value(patientName)

            .style(sheetStyle);

          insuranceLogSheet
            .cell("H" + (i + 2))
            .value(moment(el.dob).format("DD-MM-YYYY"))

            .style(sheetStyle);

          insuranceLogSheet
            .cell("I" + (i + 2))

            .value(
              el.provider_first_name +
                "" +
                el.provider_last_name
            )

            .style(sheetStyle);

          insuranceLogSheet
            .cell("J" + (i + 2))

            .value(el.primaryInsurance)

            .style(sheetStyle);

          insuranceLogSheet
            .cell("K" + (i + 2))
            .value(el.secondaryInsurance)
            .style(sheetStyle);

          insuranceLogSheet
            .cell("L" + (i + 2))
            .value(el.procedure_1)
            .style(sheetStyle);

          insuranceLogSheet
            .cell("M" + (i + 2))

            .value(el.procedure_2)
            .style(sheetStyle);

          insuranceLogSheet
            .cell("N" + (i + 2))

            .value(el.charge_amount)
            .style(sheetStyle);

          insuranceLogSheet
            .cell("O" + (i + 2))

            .value(el.allowed_amount)
            .style(sheetStyle);

          insuranceLogSheet
            .cell("P" + (i + 2))

            .value(el.insurance_paid)
            .style(sheetStyle);

          insuranceLogSheet
            .cell("Q" + (i + 2))

            .value(el.allowed_amount - el.insurance_paid)
            .style(sheetStyle);

          insuranceLogSheet
            .cell("R" + (i + 2))

            .value(" ")
            .style(sheetStyle);

          insuranceLogSheet
            .cell("S" + (i + 2))

            .value(el.allowed_amount - el.insurance_paid)
            .style(sheetStyle);

          insuranceLogSheet
            .cell("T" + (i + 2))

            .value(el.adjustment)
            .style(sheetStyle);

          insuranceLogSheet
            .cell("U" + (i + 2))

            .value("0")
            .style(sheetStyle);

          insuranceLogSheet
            .cell("V" + (i + 2))

            .value("")
            .style(sheetStyle);

          insuranceLogSheet
            .cell("W" + (i + 2))

            .value("CHECK")
            .style(sheetStyle);

          // insuranceLogSheet
          //   .cell("X" + (i + 2))

          //   .value("CHECK")
          //   .style(sheetStyle);
        });

        insuranceLogSheet.freezePanes(1, 1);

        const excelData: any = await workbook.outputAsync();
        await fs.writeFileSync(
          path.join(
            __dirname,
            "../../../../../public/upload/reports/InsuranceLog_Report.xlsx"
          ),
          excelData
        );
        let link = `http://${req.hostname}:${process.env.PORT}/upload/reports/InsuranceLog_Report.xlsx`;

        let excelFileName = "InsuranceLog_Report.xlsx";
        let response = {
          totalDocs: data[0].totalCount[0].sum,
          data: finalResponseArr,
          link,
          name: excelFileName,
        };
        return {
          status_code: HttpStatus.OK,
          data: response, //link,
          success: true,
        };
      } else {
        return {
          status_code: HttpStatus.OK,
          data: [],
          success: true,
        };
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new ReportServices();
