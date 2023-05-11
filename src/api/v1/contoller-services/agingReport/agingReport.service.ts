import { DocumentType } from "@typegoose/typegoose";
import fs from "fs";
import bcrypt from "bcrypt";
import { NextFunction, Request } from "express";
import HttpStatus from "http-status-codes";
import mongoose from "mongoose";
import Utility, { IServiceResult1 } from "../../common/common-methods";
import errorMessage from "../../common/erros_message";
import { IJWTPayload } from "../../common/interface/jwtpayload";
import TokenModel from "../../models/login_token.model";
import UserModel, { User } from "../../models/user.model";
import SuperBillModel from "../../models/super_bill.model";
import { GetAgingReportViewmodel } from "../../view-models/agingReport";
import moment from "moment";
import { EnumTab } from "../../view-models/agingReport/get_aging_report.viewmodel";
import path from "path";
import XlsxPopulate from "xlsx-populate";

class AgingReportServices {
  getReport = async (
    req: Request,
    model: GetAgingReportViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;
      defaultPage = model.pageNumber ? model.pageNumber : 1;
      count = model.pageSize ? model.pageSize : 50;

      let condition: any = { insurance_id: { $ne: null } };
      let appointment_condtion: any = {};
      let insurance_condition: any = {};
      let child_condition: any = {};

      if (model.aging) {
        if (model.tab == "AGING_DOS" || model.tab == "SUMMARY_DOS")
          child_condition.aging_dos = {
            $lte: model.aging[1],
            $gte: model.aging[0],
          };
        if (
          model.tab == "AGING_SUBMISSION" ||
          model.tab == "SUMMARY_SUBMISSION"
        )
          child_condition.aging_submission = {
            $lte: model.aging[1],
            $gte: model.aging[0],
          };
      }

      if (model.clinic_id) {
        condition.clinic_id = new mongoose.Types.ObjectId(model.clinic_id);
      }

      if (model.doctor_id) {
        condition.referring_provider_id = new mongoose.Types.ObjectId(
          model.doctor_id
        );
      }

      if (model.location_id) {
        condition.location_id = new mongoose.Types.ObjectId(model.location_id);
      }

      if (model.patient_id) {
        condition.patient_id = new mongoose.Types.ObjectId(model.patient_id);
      }

      if (model.visitType) {
        appointment_condtion.visitType = model.visitType;
      }

      if (model.case_type) {
        appointment_condtion.case_type = new mongoose.Types.ObjectId(
          model.case_type
        );
      }

      if (model.insurance_type) {
        insurance_condition.insurance_type = model.insurance_type;
      }

      if (model.insurance_plan_type) {
        insurance_condition.insurance_plan_type = model.insurance_plan_type;
      }

      if (model.insurance_company_id) {
        insurance_condition.insurance_company_id = new mongoose.Types.ObjectId(
          model.insurance_company_id
        );
      }
      if (model.startDateTime) {
        let startTime = new Date(model.startDateTime);
        startTime.setHours(0, 0, 0, 0);
        condition.createdAt = {
          $gte: startTime,
        };
      }
      if (model.endDateTime) {
        let endTime = new Date(model.endDateTime);
        endTime.setHours(23, 59, 59, 999);
        if ("createdAt" in condition) condition.createdAt.$lte = endTime;
        else
          condition.createdAt = {
            $lte: endTime,
          };
      }

      if (
        model.tab == EnumTab.TOTAL_AR ||
        model.tab == EnumTab.AGING_DOS ||
        model.tab == EnumTab.AGING_SUBMISSION
      ) {
        let result = await SuperBillModel.aggregate([
          { $match: condition },
          {
            $lookup: {
              from: "appointment",
              localField: "appointment_id",
              foreignField: "_id",
              pipeline: [
                {
                  $project: {
                    startDateTime: 1,
                    endDateTime: 1,
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
            $addFields: {
              aging_dos: {
                $dateDiff: {
                  startDate: "$appointmentData.startDateTime",
                  endDate: "$$NOW",
                  unit: "day",
                },
              },
            },
          },
          {
            $addFields: {
              aging_submission: {
                $dateDiff: {
                  startDate: "$createdAt",
                  endDate: "$$NOW",
                  unit: "day",
                },
              },
            },
          },
          { $match: child_condition },
          {
            $lookup: {
              from: "insurance",
              localField: "insurance_id",
              foreignField: "_id",
              pipeline: [{ $match: insurance_condition }],
              as: "insuranceData",
            },
          },
          {
            $unwind: {
              path: "$insuranceData",
              preserveNullAndEmptyArrays: false,
            },
          },
          {
            $lookup: {
              from: "doctor",
              localField: "referring_provider_id",
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
                {
                  $project: {
                    first_name: "$userData.first_name",
                    last_name: "$userData.last_name",
                  },
                },
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
              from: "cpt",
              localField: "cpt.cpt_code_id",
              foreignField: "_id",
              let: { cpt_id: "$cpt.cpt_code_id" },
              pipeline: [
                {
                  $project: {
                    cptCode: 1,
                    // description: 1,
                    // price: 1,
                    // _id: 1,
                  },
                },
              ],
              as: "cptData",
            },
          },

          {
            $facet: {
              totalCount: [{ $count: "count" }],
              aggregatedData: [
                {
                  $project: {
                    // _id: 0,
                    first_name: "$patientData.first_name",
                    last_name: "$patientData.last_name",
                    patientId: "$patientData.patientId",
                    dos: "$appointmentData.startDateTime",
                    provider_first_name: "$providerData.first_name",
                    provider_last_name: "$providerData.last_name",
                    // +
                    // " " +
                    // "$providerData.last_name",
                    primary_insurance: "$insurance_name",
                    cpt: "$cptData",
                    date_of_submission: "$createdAt",
                    charge_amount: "$total_amount",
                  },
                },
                { $sort: { createdAt: 1 } },
                { $skip: count * (defaultPage - 1) },
                { $limit: count },
              ],
            },
          },
        ]);

        if (
          result &&
          result.length &&
          result[0].aggregatedData &&
          result[0].aggregatedData.length
        ) {
          result[0].aggregatedData.forEach((singleRecord) => {
            singleRecord.first_name = Utility.getDecryptText(
              singleRecord.first_name
            );
            singleRecord.last_name = Utility.getDecryptText(
              singleRecord.last_name
            );

            singleRecord.procedure = "";
            singleRecord.cpt.forEach((singleCpt) => {
              singleRecord.procedure += singleCpt.cptCode + " ";
            });
            delete singleRecord.cpt;
            let current_date = moment();
            if (model.tab == "AGING_DOS") {
              let days_diff = current_date.diff(
                moment(singleRecord.dos),
                "days"
              );
              singleRecord["0-30"] =
                days_diff < 31 ? singleRecord.charge_amount : 0;
              singleRecord["31-60"] =
                days_diff > 31 && days_diff < 61
                  ? singleRecord.charge_amount
                  : 0;
              singleRecord["61-90"] =
                days_diff > 61 && days_diff < 91
                  ? singleRecord.charge_amount
                  : 0;
              singleRecord["91-120"] =
                days_diff > 91 && days_diff < 121
                  ? singleRecord.charge_amount
                  : 0;
              singleRecord["121-150"] =
                days_diff > 121 && days_diff < 151
                  ? singleRecord.charge_amount
                  : 0;
              singleRecord["151-180"] =
                days_diff > 151 && days_diff < 181
                  ? singleRecord.charge_amount
                  : 0;
              singleRecord["180+"] =
                days_diff > 181 ? singleRecord.charge_amount : 0;
            }
            if (model.tab == "AGING_SUBMISSION") {
              let days_diff = current_date.diff(
                moment(singleRecord.date_of_submission),
                "days"
              );
              singleRecord["0-30"] =
                days_diff < 31 ? singleRecord.charge_amount : 0;
              singleRecord["31-60"] =
                days_diff > 31 && days_diff < 61
                  ? singleRecord.charge_amount
                  : 0;
              singleRecord["61-90"] =
                days_diff > 61 && days_diff < 91
                  ? singleRecord.charge_amount
                  : 0;
              singleRecord["91-120"] =
                days_diff > 91 && days_diff < 121
                  ? singleRecord.charge_amount
                  : 0;
              singleRecord["121-150"] =
                days_diff > 121 && days_diff < 151
                  ? singleRecord.charge_amount
                  : 0;
              singleRecord["151-180"] =
                days_diff > 151 && days_diff < 181
                  ? singleRecord.charge_amount
                  : 0;
              singleRecord["180+"] =
                days_diff > 181 ? singleRecord.charge_amount : 0;
            }
          });
          let obj = {
            data: result[0].aggregatedData,
            // count: result.totalDocs,
            totalDocs: result[0].totalCount[0].count,
            pageNumber: defaultPage,
            pageSize: count,
            totalPages: Math.ceil(result[0].totalCount[0].count / count),
          };

          return {
            status_code: HttpStatus.OK,
            data: obj,
            success: true,
          };
        } else {
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.NO_RECORD_FOUND,
              error: errorMessage.ON_FETCH_ERROR,
            },
          };
        }
      } else {
        let objToPush = { createdAt: "$createdAt", amount: "$total_amount" };
        if (model.tab == "SUMMARY_DOS") {
          objToPush.createdAt = "$appointmentData.startDateTime";
        }

        let result = await SuperBillModel.aggregate([
          { $match: condition },
          {
            $lookup: {
              from: "appointment",
              localField: "appointment_id",
              foreignField: "_id",
              pipeline: [
                {
                  $project: {
                    startDateTime: 1,
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
            $addFields: {
              aging_dos: {
                $dateDiff: {
                  startDate: "$appointmentData.startDateTime",
                  endDate: "$$NOW",
                  unit: "day",
                },
              },
            },
          },
          {
            $addFields: {
              aging_submission: {
                $dateDiff: {
                  startDate: "$createdAt",
                  endDate: "$$NOW",
                  unit: "day",
                },
              },
            },
          },
          { $match: child_condition },
          {
            $lookup: {
              from: "insurance",
              localField: "insurance_id",
              foreignField: "_id",
              pipeline: [
                { $match: insurance_condition },
                {
                  $lookup: {
                    from: "insurance_companies",
                    localField: "insurance_company_id",
                    foreignField: "_id",
                    pipeline: [
                      {
                        $project: {
                          companyName: 1,
                        },
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
                    insurance_company_name: "$insuranceCompanyData.companyName",
                    insurance_company_id: "$insuranceCompanyData._id",
                  },
                },
              ],
              as: "insuranceData",
            },
          },
          {
            $unwind: {
              path: "$insuranceData",
              preserveNullAndEmptyArrays: false,
            },
          },

          {
            $group: {
              _id: "$insuranceData.insurance_company_id",
              total_amount_sum: { $sum: "$total_amount" },
              insurance_company_name: {
                $first: "$insuranceData.insurance_company_name",
              },
              data: {
                $push: objToPush,
              },
            },
          },

          {
            $project: {
              insurance_company_name: 1,
              total_amount_sum: 1,
              data: 1,
            },
          },
        ]);

        if (result && result.length) {
          result.forEach((singleRecord) => {
            let current_date = moment();
            singleRecord["0-30"] = 0;
            singleRecord["31-60"] = 0;
            singleRecord["61-90"] = 0;
            singleRecord["91-120"] = 0;
            singleRecord["121-150"] = 0;
            singleRecord["151-180"] = 0;
            singleRecord["180+"] = 0;
            singleRecord.data.forEach((innerRecord) => {
              let days_diff = current_date.diff(
                moment(innerRecord.createdAt),
                "days"
              );

              singleRecord["0-30"] =
                days_diff < 31
                  ? singleRecord["0-30"] + innerRecord.amount
                  : singleRecord["0-30"];

              singleRecord["31-60"] =
                days_diff > 30 && days_diff < 61
                  ? singleRecord["31-60"] + innerRecord.amount
                  : singleRecord["31-60"];

              singleRecord["61-90"] =
                days_diff > 61 && days_diff < 91
                  ? singleRecord["61-90"] + innerRecord.amount
                  : singleRecord["61-90"];

              singleRecord["91-120"] =
                days_diff > 91 && days_diff < 121
                  ? singleRecord["91-120"] + innerRecord.amount
                  : singleRecord["91-120"];

              singleRecord["121-150"] =
                days_diff > 121 && days_diff < 151
                  ? singleRecord["121-150"] + innerRecord.amount
                  : singleRecord["121-150"];

              singleRecord["151-180"] =
                days_diff > 151 && days_diff < 181
                  ? singleRecord["151-180"] + innerRecord.amount
                  : singleRecord["151-180"];

              singleRecord["180+"] =
                days_diff > 181
                  ? singleRecord["180+"] + innerRecord.amount
                  : singleRecord["180+"];

              delete singleRecord.data;
            });
          });
          let obj = {
            data: result,
            // count: result.totalDocs,
            totalDocs: result.length,
            pageNumber: defaultPage,
            pageSize: count,
            totalPages: Math.ceil(result.length / count),
          };

          return {
            status_code: HttpStatus.OK,
            data: obj,
            success: true,
          };
        } else {
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.NO_RECORD_FOUND,
              error: errorMessage.ON_FETCH_ERROR,
            },
          };
        }

        ////////////////////////////////////////////////////////////////////
      }
    } catch (error) {
      next(error);
    }
  };

  getAgingReportExcel = async (
    req: Request,
    model: GetAgingReportViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let condition: any = { insurance_id: { $ne: null } };
      let appointment_condtion: any = {};
      let insurance_condition: any = {};
      let child_condition: any = {};

      if (model.aging) {
        if (model.tab == "AGING_DOS" || model.tab == "SUMMARY_DOS")
          child_condition.aging_dos = {
            $lte: model.aging[1],
            $gte: model.aging[0],
          };
        if (
          model.tab == "AGING_SUBMISSION" ||
          model.tab == "SUMMARY_SUBMISSION"
        )
          child_condition.aging_submission = {
            $lte: model.aging[1],
            $gte: model.aging[0],
          };
      }

      if (model.clinic_id) {
        condition.clinic_id = new mongoose.Types.ObjectId(model.clinic_id);
      }

      if (model.doctor_id) {
        condition.referring_provider_id = new mongoose.Types.ObjectId(
          model.doctor_id
        );
      }

      if (model.location_id) {
        condition.location_id = new mongoose.Types.ObjectId(model.location_id);
      }

      if (model.patient_id) {
        condition.patient_id = new mongoose.Types.ObjectId(model.patient_id);
      }

      if (model.visitType) {
        appointment_condtion.visitType = model.visitType;
      }

      if (model.case_type) {
        appointment_condtion.case_type = new mongoose.Types.ObjectId(
          model.case_type
        );
      }

      if (model.insurance_type) {
        insurance_condition.insurance_type = model.insurance_type;
      }

      if (model.insurance_plan_type) {
        insurance_condition.insurance_plan_type = model.insurance_plan_type;
      }

      if (model.insurance_company_id) {
        insurance_condition.insurance_company_id = new mongoose.Types.ObjectId(
          model.insurance_company_id
        );
      }
      if (model.startDateTime) {
        let startTime = new Date(model.startDateTime);
        startTime.setHours(0, 0, 0, 0);
        condition.createdAt = {
          $gte: startTime,
        };
      }
      if (model.endDateTime) {
        let endTime = new Date(model.endDateTime);
        endTime.setHours(23, 59, 59, 999);
        if ("createdAt" in condition) condition.createdAt.$lte = endTime;
        else
          condition.createdAt = {
            $lte: endTime,
          };
      }

      let result = await SuperBillModel.aggregate([
        { $match: condition },
        {
          $lookup: {
            from: "appointment",
            localField: "appointment_id",
            foreignField: "_id",
            pipeline: [
              {
                $project: {
                  startDateTime: 1,
                  endDateTime: 1,
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
          $addFields: {
            aging_dos: {
              $dateDiff: {
                startDate: "$appointmentData.startDateTime",
                endDate: "$$NOW",
                unit: "day",
              },
            },
          },
        },
        {
          $addFields: {
            aging_submission: {
              $dateDiff: {
                startDate: "$createdAt",
                endDate: "$$NOW",
                unit: "day",
              },
            },
          },
        },
        { $match: child_condition },
        {
          $lookup: {
            from: "insurance",
            localField: "insurance_id",
            foreignField: "_id",
            pipeline: [
              // { $match: insurance_condition },
              { $match: insurance_condition },
              {
                $lookup: {
                  from: "insurance_companies",
                  localField: "insurance_company_id",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $project: {
                        companyName: 1,
                      },
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
                  insurance_company_name: "$insuranceCompanyData.companyName",
                  insurance_company_id: "$insuranceCompanyData._id",
                },
              },
            ],
            as: "insuranceData",
          },
        },
        {
          $unwind: {
            path: "$insuranceData",
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $lookup: {
            from: "doctor",
            localField: "referring_provider_id",
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
              {
                $project: {
                  first_name: "$userData.first_name",
                  last_name: "$userData.last_name",
                },
              },
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
            from: "cpt",
            localField: "cpt.cpt_code_id",
            foreignField: "_id",
            let: { cpt_id: "$cpt.cpt_code_id" },
            pipeline: [
              {
                $project: {
                  cptCode: 1,
                  // description: 1,
                  // price: 1,
                  // _id: 1,
                },
              },
            ],
            as: "cptData",
          },
        },

        {
          $facet: {
            AgingData: [
              {
                $project: {
                  // _id: 0,
                  first_name: "$patientData.first_name",
                  last_name: "$patientData.last_name",
                  patientId: "$patientData.patientId",
                  dos: "$appointmentData.startDateTime",
                  provider_first_name: "$providerData.first_name",
                  provider_last_name: "$providerData.last_name",
                  // +
                  // " " +
                  // "$providerData.last_name",
                  primary_insurance: "$insurance_name",
                  cpt: "$cptData",
                  date_of_submission: "$createdAt",
                  charge_amount: "$total_amount",
                },
              },
              { $sort: { createdAt: 1 } },
            ],
            SummaryDataDos: [
              {
                $group: {
                  _id: "$insuranceData.insurance_company_id",
                  total_amount_sum: { $sum: "$total_amount" },
                  insurance_company_name: {
                    $first: "$insuranceData.insurance_company_name",
                  },
                  data: {
                    $push: { createdAt: "$createdAt", amount: "$total_amount" },
                  },
                },
              },

              {
                $project: {
                  insurance_company_name: 1,
                  total_amount_sum: 1,
                  data: 1,
                },
              },
            ],
            SummaryDataSubmission: [
              {
                $group: {
                  _id: "$insuranceData.insurance_company_id",
                  total_amount_sum: { $sum: "$total_amount" },
                  insurance_company_name: {
                    $first: "$insuranceData.insurance_company_name",
                  },
                  data: {
                    $push: {
                      createdAt: "$appointmentData.startDateTime",
                      amount: "$total_amount",
                    },
                  },
                },
              },

              {
                $project: {
                  insurance_company_name: 1,
                  total_amount_sum: 1,
                  data: 1,
                },
              },
            ],

            //                   let objToPush = ;
            // if (model.tab == "SUMMARY_DOS") {
            //   objToPush.createdAt = "$appointmentData.startDateTime";
            // }
          },
        },

        { $sort: { createdAt: 1 } },
      ]);
      let sheetStyle = {
        border: true,
        fontFamily: "Calibri",
      };
      const workbook = await XlsxPopulate.fromBlankAsync();
      let agingSheet: any = workbook.sheet("Sheet1");
      workbook.sheet(0).name("Total_Ar");
      let agingSheetHeader = [
        "S.No.",
        "Name",
        "Patient ID",
        "DOS",
        "Provider",
        "Primary Insurance",
        "Date of submission",
        "Charge Amount",
        "Procedure",
      ];

      agingSheetHeader.forEach((el: any, i: number) => {
        agingSheet
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

      const Aging_Dos = workbook.addSheet("Aging_Dos");

      // // Add a new sheet named 'New 2' at index 1 (0-based)
      // const newSheet2 = workbook.addSheet("New 2", 1);

      let agingDosSheet: any = workbook.sheet("Aging_Dos");
      let agingDosSheetHeader = [
        "S.No.",
        "Name",
        "Patient ID",
        "DOS",
        "Provider",
        "Primary Insurance",
        "Date of submission",
        "Charge Amount",
        "Procedure",
        "0-30",
        "31-60",
        "61-90",
        "91-120",
        "121-150",
        "151-180",
        "180+",
      ];

      agingDosSheetHeader.forEach((el: any, i: number) => {
        agingDosSheet
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

      const Aging_Submission = workbook.addSheet("Aging_Submission");

      // // Add a new sheet named 'New 2' at index 1 (0-based)
      // const newSheet2 = workbook.addSheet("New 2", 1);

      let agingSubmissionSheet: any = workbook.sheet("Aging_Submission");
      let agingSubmissionSheetHeader = [
        "S.No.",
        "Name",
        "Patient ID",
        "DOS",
        "Provider",
        "Primary Insurance",
        "Date of submission",
        "Charge Amount",
        "Procedure",
        "0-30",
        "31-60",
        "61-90",
        "91-120",
        "121-150",
        "151-180",
        "180+",
      ];

      agingSubmissionSheetHeader.forEach((el: any, i: number) => {
        agingSubmissionSheet
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
      const Aging_Summary_Dos = workbook.addSheet("Aging_Summary_Dos");

      // // Add a new sheet named 'New 2' at index 1 (0-based)
      // const newSheet2 = workbook.addSheet("New 2", 1);

      let summaryDosSheet: any = workbook.sheet("Aging_Summary_Dos");
      let summaryDosSheetHeader = [
        "S.No.",
        "Insurance",
        "0-30",
        "31-60",
        "61-90",
        "91-120",
        "121-150",
        "151-180",
        "180+",
      ];

      summaryDosSheetHeader.forEach((el: any, i: number) => {
        summaryDosSheet
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

      const Aging_Summary_Submission = workbook.addSheet(
        "Aging_Summary_Submission"
      );

      // // Add a new sheet named 'New 2' at index 1 (0-based)
      // const newSheet2 = workbook.addSheet("New 2", 1);

      let summarySubmissionSheet: any = workbook.sheet(
        "Aging_Summary_Submission"
      );
      let summarySubmissionSheetHeader = [
        "S.No.",
        "Insurance",
        "0-30",
        "31-60",
        "61-90",
        "91-120",
        "121-150",
        "151-180",
        "180+",
      ];

      summarySubmissionSheetHeader.forEach((el: any, i: number) => {
        summarySubmissionSheet
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
      if (result && result.length) {
        if (result[0].AgingData && result[0].AgingData.length) {
          result[0].AgingData.forEach((singleRecord) => {
            singleRecord.first_name = Utility.getDecryptText(
              singleRecord.first_name
            );
            singleRecord.last_name = Utility.getDecryptText(
              singleRecord.last_name
            );

            singleRecord.procedure = "";
            singleRecord.cpt.forEach((singleCpt) => {
              singleRecord.procedure += singleCpt.cptCode + " ";
            });
            delete singleRecord.cpt;
            let current_date = moment();
            //if (model.tab == "AGING_DOS") {
            let days_diff = current_date.diff(moment(singleRecord.dos), "days");
            singleRecord.aging_dos = {};
            singleRecord.aging_dos["0-30"] =
              days_diff < 31 ? singleRecord.charge_amount : 0;
            singleRecord.aging_dos["31-60"] =
              days_diff > 31 && days_diff < 61 ? singleRecord.charge_amount : 0;
            singleRecord.aging_dos["61-90"] =
              days_diff > 61 && days_diff < 91 ? singleRecord.charge_amount : 0;
            singleRecord.aging_dos["91-120"] =
              days_diff > 91 && days_diff < 121
                ? singleRecord.charge_amount
                : 0;
            singleRecord.aging_dos["121-150"] =
              days_diff > 121 && days_diff < 151
                ? singleRecord.charge_amount
                : 0;
            singleRecord.aging_dos["151-180"] =
              days_diff > 151 && days_diff < 181
                ? singleRecord.charge_amount
                : 0;
            singleRecord.aging_dos["180+"] =
              days_diff > 181 ? singleRecord.charge_amount : 0;
            //}
            //if (model.tab == "AGING_SUBMISSION") {
            days_diff = current_date.diff(
              moment(singleRecord.date_of_submission),
              "days"
            );
            singleRecord.aging_submission = {};
            singleRecord.aging_submission["0-30"] =
              days_diff < 31 ? singleRecord.charge_amount : 0;
            singleRecord.aging_submission["31-60"] =
              days_diff > 31 && days_diff < 61 ? singleRecord.charge_amount : 0;
            singleRecord.aging_submission["61-90"] =
              days_diff > 61 && days_diff < 91 ? singleRecord.charge_amount : 0;
            singleRecord.aging_submission["91-120"] =
              days_diff > 91 && days_diff < 121
                ? singleRecord.charge_amount
                : 0;
            singleRecord.aging_submission["121-150"] =
              days_diff > 121 && days_diff < 151
                ? singleRecord.charge_amount
                : 0;
            singleRecord.aging_submission["151-180"] =
              days_diff > 151 && days_diff < 181
                ? singleRecord.charge_amount
                : 0;
            singleRecord.aging_submission["180+"] =
              days_diff > 181 ? singleRecord.charge_amount : 0;
            //}
          });

          // write data in excel
          let excelDataTotal = result[0].AgingData.length
            ? result[0].AgingData
            : [];

          excelDataTotal.forEach((el: any, i: number) => {
            // let date = moment(el.startDateTime).format(
            //   "DD-MM-YYYY"
            // );

            agingSheet
              .cell("A" + (i + 2))
              .value(i + 1)
              .style(sheetStyle);

            agingSheet
              .cell("B" + (i + 2))
              .value(el.first_name + " " + el.last_name)
              .style(sheetStyle);

            agingSheet
              .cell("C" + (i + 2))
              .value(el.Patient_ID)

              .style(sheetStyle);

            agingSheet
              .cell("D" + (i + 2))
              .value(moment(el.dos).format("DD-MM-YYYY"))
              .style(sheetStyle);

            agingSheet
              .cell("E" + (i + 2))
              .value(el.provider_first_name + " " + el.provider_last_name)
              .style(sheetStyle);

            agingSheet
              .cell("F" + (i + 2))
              .value(el.primary_insurance)
              .style(sheetStyle);

            agingSheet
              .cell("G" + (i + 2))
              .value(moment(el.date_of_submission).format("DD-MM-YYYY"))
              .style(sheetStyle);

            agingSheet
              .cell("H" + (i + 2))
              .value(el.charge_amount)
              .style(sheetStyle);

            agingSheet
              .cell("I" + (i + 2))
              .value(el.procedure)
              .style(sheetStyle);

            ////////////////////////////////////////////////////////////////////////////
            //AGING DOS

            agingDosSheet
              .cell("A" + (i + 2))
              .value(i + 1)
              .style(sheetStyle);

            agingDosSheet
              .cell("B" + (i + 2))
              .value(el.first_name + " " + el.last_name)
              .style(sheetStyle);

            agingDosSheet
              .cell("C" + (i + 2))
              .value(el.Patient_ID)

              .style(sheetStyle);

            agingDosSheet
              .cell("D" + (i + 2))
              .value(moment(el.dos).format("DD-MM-YYYY"))
              .style(sheetStyle);

            agingDosSheet
              .cell("E" + (i + 2))
              .value(el.provider_first_name + " " + el.provider_last_name)
              .style(sheetStyle);

            agingDosSheet
              .cell("F" + (i + 2))
              .value(el.primary_insurance)
              .style(sheetStyle);

            agingDosSheet
              .cell("G" + (i + 2))
              .value(moment(el.date_of_submission).format("DD-MM-YYYY"))
              .style(sheetStyle);

            agingDosSheet
              .cell("H" + (i + 2))
              .value(el.charge_amount)
              .style(sheetStyle);

            agingDosSheet
              .cell("I" + (i + 2))
              .value(el.procedure)
              .style(sheetStyle);

            agingDosSheet
              .cell("J" + (i + 2))
              .value(el.aging_dos["0-30"])
              .style(sheetStyle);

            agingDosSheet
              .cell("K" + (i + 2))
              .value(el.aging_dos["31-60"])
              .style(sheetStyle);

            agingDosSheet
              .cell("L" + (i + 2))
              .value(el.aging_dos["61-90"])
              .style(sheetStyle);

            agingDosSheet
              .cell("M" + (i + 2))
              .value(el.aging_dos["91-120"])
              .style(sheetStyle);

            agingDosSheet
              .cell("N" + (i + 2))
              .value(el.aging_dos["120-151"])
              .style(sheetStyle);

            agingDosSheet
              .cell("O" + (i + 2))
              .value(el.aging_dos["151-180"])
              .style(sheetStyle);

            agingDosSheet
              .cell("P" + (i + 2))
              .value(el.aging_dos["180+"])
              .style(sheetStyle);

            ////////////////////////////////////////////////////////////////////////////
            //AGING SUBMISSION

            agingSubmissionSheet
              .cell("A" + (i + 2))
              .value(i + 1)
              .style(sheetStyle);

            agingSubmissionSheet
              .cell("B" + (i + 2))
              .value(el.first_name + " " + el.last_name)
              .style(sheetStyle);

            agingSubmissionSheet
              .cell("C" + (i + 2))
              .value(el.Patient_ID)

              .style(sheetStyle);

            agingSubmissionSheet
              .cell("D" + (i + 2))
              .value(moment(el.dos).format("DD-MM-YYYY"))
              .style(sheetStyle);

            agingSubmissionSheet
              .cell("E" + (i + 2))
              .value(el.provider_first_name + " " + el.provider_last_name)
              .style(sheetStyle);

            agingSubmissionSheet
              .cell("F" + (i + 2))
              .value(el.primary_insurance)
              .style(sheetStyle);

            agingSubmissionSheet
              .cell("G" + (i + 2))
              .value(moment(el.date_of_submission).format("DD-MM-YYYY"))
              .style(sheetStyle);

            agingSubmissionSheet
              .cell("H" + (i + 2))
              .value(el.charge_amount)
              .style(sheetStyle);

            agingSubmissionSheet
              .cell("I" + (i + 2))
              .value(el.procedure)
              .style(sheetStyle);

            agingSubmissionSheet
              .cell("J" + (i + 2))
              .value(el.aging_submission["0-30"])
              .style(sheetStyle);

            agingSubmissionSheet
              .cell("K" + (i + 2))
              .value(el.aging_submission["31-60"])
              .style(sheetStyle);

            agingSubmissionSheet
              .cell("L" + (i + 2))
              .value(el.aging_submission["61-90"])
              .style(sheetStyle);

            agingSubmissionSheet
              .cell("M" + (i + 2))
              .value(el.aging_submission["91-120"])
              .style(sheetStyle);

            agingSubmissionSheet
              .cell("N" + (i + 2))
              .value(el.aging_submission["120-151"])
              .style(sheetStyle);

            agingSubmissionSheet
              .cell("O" + (i + 2))
              .value(el.aging_submission["151-180"])
              .style(sheetStyle);

            agingSubmissionSheet
              .cell("P" + (i + 2))
              .value(el.aging_submission["180+"])
              .style(sheetStyle);
          });

          agingSheet.freezePanes(1, 1);
          agingDosSheet.freezePanes(1, 1);
          agingSubmissionSheet.freezePanes(1, 1);
        }

        if (result[0].SummaryDataDos && result[0].SummaryDataDos.length) {
          result[0].SummaryDataDos.forEach((singleRecord) => {
            let current_date = moment();
            singleRecord["0-30"] = 0;
            singleRecord["31-60"] = 0;
            singleRecord["61-90"] = 0;
            singleRecord["91-120"] = 0;
            singleRecord["121-150"] = 0;
            singleRecord["151-180"] = 0;
            singleRecord["180+"] = 0;
            singleRecord.data.forEach((innerRecord) => {
              let days_diff = current_date.diff(
                moment(innerRecord.createdAt),
                "days"
              );

              singleRecord["0-30"] =
                days_diff < 31
                  ? singleRecord["0-30"] + innerRecord.amount
                  : singleRecord["0-30"];

              singleRecord["31-60"] =
                days_diff > 30 && days_diff < 61
                  ? singleRecord["31-60"] + innerRecord.amount
                  : singleRecord["31-60"];

              singleRecord["61-90"] =
                days_diff > 61 && days_diff < 91
                  ? singleRecord["61-90"] + innerRecord.amount
                  : singleRecord["61-90"];

              singleRecord["91-120"] =
                days_diff > 91 && days_diff < 121
                  ? singleRecord["91-120"] + innerRecord.amount
                  : singleRecord["91-120"];

              singleRecord["121-150"] =
                days_diff > 121 && days_diff < 151
                  ? singleRecord["121-150"] + innerRecord.amount
                  : singleRecord["121-150"];

              singleRecord["151-180"] =
                days_diff > 151 && days_diff < 181
                  ? singleRecord["151-180"] + innerRecord.amount
                  : singleRecord["151-180"];

              singleRecord["180+"] =
                days_diff > 181
                  ? singleRecord["180+"] + innerRecord.amount
                  : singleRecord["180+"];

              delete singleRecord.data;
            });
          });

          let excelDataTotal = result[0].SummaryDataDos.length
            ? result[0].SummaryDataDos
            : [];

          excelDataTotal.forEach((el: any, i: number) => {
            // let date = moment(el.startDateTime).format(
            //   "DD-MM-YYYY"
            // );

            summaryDosSheet
              .cell("A" + (i + 2))
              .value(i + 1)
              .style(sheetStyle);

            summaryDosSheet
              .cell("B" + (i + 2))
              .value(el.insurance_company_name)
              .style(sheetStyle);

            summaryDosSheet
              .cell("C" + (i + 2))
              .value(el["0-30"])
              .style(sheetStyle);

            summaryDosSheet
              .cell("D" + (i + 2))
              .value(el["31-60"])
              .style(sheetStyle);

            summaryDosSheet
              .cell("E" + (i + 2))
              .value(el["61-90"])
              .style(sheetStyle);

            summaryDosSheet
              .cell("F" + (i + 2))
              .value(el["91-120"])
              .style(sheetStyle);

            summaryDosSheet
              .cell("G" + (i + 2))
              .value(el["120-151"])
              .style(sheetStyle);

            summaryDosSheet
              .cell("H" + (i + 2))
              .value(el["151-180"])
              .style(sheetStyle);

            summaryDosSheet
              .cell("I" + (i + 2))
              .value(el["180+"])
              .style(sheetStyle);
          });

          summaryDosSheet.freezePanes(1, 1);
        }

        if (
          result[0].SummaryDataSubmission &&
          result[0].SummaryDataSubmission.length
        ) {
          result[0].SummaryDataSubmission.forEach((singleRecord) => {
            let current_date = moment();
            singleRecord["0-30"] = 0;
            singleRecord["31-60"] = 0;
            singleRecord["61-90"] = 0;
            singleRecord["91-120"] = 0;
            singleRecord["121-150"] = 0;
            singleRecord["151-180"] = 0;
            singleRecord["180+"] = 0;
            singleRecord.data.forEach((innerRecord) => {
              let days_diff = current_date.diff(
                moment(innerRecord.createdAt),
                "days"
              );

              singleRecord["0-30"] =
                days_diff < 31
                  ? singleRecord["0-30"] + innerRecord.amount
                  : singleRecord["0-30"];

              singleRecord["31-60"] =
                days_diff > 30 && days_diff < 61
                  ? singleRecord["31-60"] + innerRecord.amount
                  : singleRecord["31-60"];

              singleRecord["61-90"] =
                days_diff > 61 && days_diff < 91
                  ? singleRecord["61-90"] + innerRecord.amount
                  : singleRecord["61-90"];

              singleRecord["91-120"] =
                days_diff > 91 && days_diff < 121
                  ? singleRecord["91-120"] + innerRecord.amount
                  : singleRecord["91-120"];

              singleRecord["121-150"] =
                days_diff > 121 && days_diff < 151
                  ? singleRecord["121-150"] + innerRecord.amount
                  : singleRecord["121-150"];

              singleRecord["151-180"] =
                days_diff > 151 && days_diff < 181
                  ? singleRecord["151-180"] + innerRecord.amount
                  : singleRecord["151-180"];

              singleRecord["180+"] =
                days_diff > 181
                  ? singleRecord["180+"] + innerRecord.amount
                  : singleRecord["180+"];

              delete singleRecord.data;
            });
          });

          let excelDataTotal = result[0].SummaryDataSubmission.length
            ? result[0].SummaryDataSubmission
            : [];

          excelDataTotal.forEach((el: any, i: number) => {
            // let date = moment(el.startDateTime).format(
            //   "DD-MM-YYYY"
            // );

            summarySubmissionSheet
              .cell("A" + (i + 2))
              .value(i + 1)
              .style(sheetStyle);

            summarySubmissionSheet
              .cell("B" + (i + 2))
              .value(el.insurance_company_name)
              .style(sheetStyle);

            summarySubmissionSheet
              .cell("C" + (i + 2))
              .value(el["0-30"])
              .style(sheetStyle);

            summarySubmissionSheet
              .cell("D" + (i + 2))
              .value(el["31-60"])
              .style(sheetStyle);

            summarySubmissionSheet
              .cell("E" + (i + 2))
              .value(el["61-90"])
              .style(sheetStyle);

            summarySubmissionSheet
              .cell("F" + (i + 2))
              .value(el["91-120"])
              .style(sheetStyle);

            summarySubmissionSheet
              .cell("G" + (i + 2))
              .value(el["120-151"])
              .style(sheetStyle);

            summarySubmissionSheet
              .cell("H" + (i + 2))
              .value(el["151-180"])
              .style(sheetStyle);

            summarySubmissionSheet
              .cell("I" + (i + 2))
              .value(el["180+"])
              .style(sheetStyle);
          });

          summarySubmissionSheet.freezePanes(1, 1);
        }
      }

      const excelData: any = await workbook.outputAsync();
      await fs.writeFileSync(
        path.join(
          __dirname,
          "../../../../../public/upload/reports/Aging_Report.xlsx"
        ),
        excelData
      );

      let link = `http://${req.hostname}:${process.env.PORT}/upload/reports/Aging_Report.xlsx`;

      let excelFileName = "Aging_Report.xlsx";
      let response = {
        link,
        name: excelFileName,
      };
      return {
        status_code: HttpStatus.OK,
        data: response, //link,
        success: true,
      };
    } catch (error) {
      next(error);
    }
  };
  ///
}
export default new AgingReportServices();
