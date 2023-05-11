import { DocumentType } from "@typegoose/typegoose";
import { NextFunction, Request } from "express";
import fs from "fs";
import HttpStatus from "http-status-codes";
import mongoose from "mongoose";
import Utility, { IServiceResult1 } from "../../common/common-methods";
import errorMessage from "../../common/erros_message";
import AppointmentModel from "../../models/appointment.model";
import BillingPaymentModel from "../../models/billing_payment.model";
import DoctorCheckoutModel from "../../models/doctor_checkout.model";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";
import SuperBillModel, {
  BillStatus,
  EAssignedStatus,
} from "../../models/super_bill.model";
import SuperBillAssignmentModel, {
  SuperBillAssignment,
} from "../../models/super_bill_assignment.model";
import { User } from "../../models/user.model";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddSuperBillViewmodel,
  AssignSuperBillViewmodel,
  GetSuperBillListViewmodel,
  MarkPrintedViewmodel,
  PatientListViewmodel,
  UpdateSuperBillViewmodel,
} from "../../view-models/superBill";

import moment from "moment";

import path from "path";
import XlsxPopulate from "xlsx-populate";
export enum EnumRole {
  PROVIDER = "provider",
}
class SuperBillServices {
  addSuperBill = async (
    req: Request,
    model: AddSuperBillViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      model.createdby_id = userDetails._id;
      let alreadyPresentSuperBill = await SuperBillModel.findOne({
        appointment_id: model.appointment_id,
      });

      let insuranceCoverage: any = "null";
      switch (model.coverage) {
        case "1":
          insuranceCoverage = "Primary";
          break;
        case "2":
          insuranceCoverage = "Secondary";
          break;
        case "3":
          insuranceCoverage = "Tertiary";
          break;
      }

      model.insurance = {
        amount: model.total_amount,
        coverage: insuranceCoverage,
        status: model.total_amount == 0 ? true : false,
      };
      //   'insurance.amount': insurancePortion,
      // 'insurance.coverage': insuranceCoverage,
      // 'insurance.status': insurancePortion == 0 ? true : false,

      if (alreadyPresentSuperBill) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_SUPER_BILL,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        if (model.status == BillStatus.NOLINKSAVE) {
          if (model!.cpt && model!.cpt.length > 0) {
            model!.cpt!.forEach((cpt) => {
              delete cpt!.icd;
            });
          }
        }
        let saveSuperBill = await SuperBillModel.create(model);

        let LinkObject: any = {
          url: null,
          //id:null,
          resetKey: null,
        };
        // if (model.payment_mode == EModeValues.LINK) {
        //   LinkObject.url = "";
        //   LinkObject.id = "";
        //   LinkObject.resetKey = "";
        // }

        let getSuperBill: any = {};
        //if (saveSuperBill) {
        //   if (
        //     model.status == BillStatus.QUICKSAVEANDSIGNOF ||
        //     model.status == BillStatus.LINKSAVESIGNOFF
        //   ) {
        //     let BillingPaymentObj = {
        //       mode: model.payment_mode, //need to verify
        //       status: "DUE",
        //       method: model.payment_option, //need to verify
        //       batchNumber: null,
        //       email: null,
        //       remark: model.notes, //need to verify
        //       cheque: model.cheque_number,
        //       chargeId: model.payer_id, //need to verify
        //       amount: model.total_amount,
        //       receiveDate: null,
        //       clinic_id: model.clinic_id,
        //       patient_id: model.patient_id,
        //       appointment_id: model.appointment_id,
        //       link: LinkObject,
        //       createdby_id: model.createdby_id,
        //     };

        //     await BillingPaymentModel.create(BillingPaymentObj);
        //   }

        //   getSuperBill = await SuperBillModel.findOne({
        //     _id: saveSuperBill._id,
        //   });
        // } else {
        //   return {
        //     success: false,
        //     data: {
        //       message: errorMessage.ERROR_ON_ADD_SUPER_BILL,
        //       error: errorMessage.ON_ADD_ERROR,
        //     },
        //     status_code: HttpStatus.BAD_REQUEST,
        //   };
        // }

        if (saveSuperBill) {
          await DoctorCheckoutModel.updateOne(
            { appointment_id: model.appointment_id },
            { $set: { billGenerated: true } }
          );

          let addHistory = await HistoryModel.create({
            user_id: model.createdby_id,
            description: `super bill created`,
            type: EHistoryActivityTypeValues.SUPERBILL,
            type_id: saveSuperBill._id,
            data: model,
            //data:model
          });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: saveSuperBill,
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_ADD_SUPER_BILL,
              error: errorMessage.ON_ADD_ERROR,
            },

            status_code: HttpStatus.BAD_REQUEST,
          };
        }
      }
    } catch (error) {
      next(error);
    }
  };
  updateSuperBill = async (
    req: Request,
    model: UpdateSuperBillViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let id = model._id;
      delete model!._id;
      let userDetails = <DocumentType<User>>req.user;
      if (model.status == BillStatus.NOLINKSAVE) {
        if (model!.cpt && model!.cpt.length > 0) {
          model!.cpt!.forEach((cpt) => {
            delete cpt!.icd;
          });
        }
      }

      let insuranceCoverage: any = null;
      switch (model.coverage) {
        case "1":
          insuranceCoverage = "Primary";
          break;
        case "2":
          insuranceCoverage = "Secondary";
          break;
        case "3":
          insuranceCoverage = "Tertiary";
          break;
      }

      // if (model.insurance_id == null) {
      //   model.payer_id = "";
      //   model.insurance_name = "";
      // }

      model.insurance = {
        amount: model.total_amount,
        coverage: insuranceCoverage,
        status: model.total_amount == 0 ? true : false,
      };
      let updateBillResult = await SuperBillModel.findOneAndUpdate(
        { _id: id },
        model,
        {
          new: true,
        }
      );

      if (updateBillResult) {
        // let BillingPaymentObj: any = {};

        // if (model.payment_mode) BillingPaymentObj.mode = model.payment_mode;
        // if (model.payment_option)
        //   BillingPaymentObj.method = model.payment_option;
        // if (model.notes) BillingPaymentObj.remark = model.notes;
        // if (model.cheque_number) BillingPaymentObj.cheque = model.cheque_number;
        // if (model.payer_id) BillingPaymentObj.chargeId = model.payer_id;
        // if (model.total_amount) BillingPaymentObj.amount = model.total_amount;

        // let foundData = await BillingPaymentModel.findOneAndUpdate(
        //   {
        //     appointment_id: updateBillResult.appointment_id,
        //   },
        //   BillingPaymentObj
        // );

        Object.keys(model).forEach((key) =>
          model[key] === undefined ? delete model[key] : {}
        );
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `super bill updated`,
          type: EHistoryActivityTypeValues.SUPERBILL,
          type_id: id,
          data: model,
        });
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.UPDATE_SUCCESSFULL,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_UPDATE_SUPER_BILL,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  getSuperBill = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let id = new mongoose.Types.ObjectId(model._id);

      let getBillResult: any = await SuperBillModel.aggregate([
        {
          $match: { _id: id },
        },

        {
          $lookup: {
            from: "doctor",
            localField: "billing_provider_id",
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
            as: "billingProviderData",
          },
        },
        {
          $unwind: {
            path: "$billingProviderData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "doctor",
            localField: "rendering_provider_id",
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
            as: "renderingProviderData",
          },
        },
        {
          $unwind: {
            path: "$renderingProviderData",
            preserveNullAndEmptyArrays: true,
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
            as: "referingProviderData",
          },
        },
        {
          $unwind: {
            path: "$referingProviderData",
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
                $lookup: {
                  from: "states",
                  localField: "state",
                  foreignField: "_id",
                  pipeline: [{ $project: { stateName: 1 } }],
                  as: "stateData",
                },
              },
              {
                $unwind: {
                  path: "$stateData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $lookup: {
                  from: "countries",
                  localField: "country",
                  foreignField: "_id",
                  pipeline: [{ $project: { countryName: 1 } }],
                  as: "countryData",
                },
              },
              {
                $unwind: {
                  path: "$countryData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $project: {
                  first_name: 1,
                  last_name: 1,
                  address: 1,
                  city: 1,
                  responsible_person: 1,
                  state: "$stateData.stateName",
                  country: "$countryData.countryName",
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
                  from: "clinic_locations",
                  localField: "location_id",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $project: {
                        branchName: 1,
                        city: 1,
                        address: 1,
                        postal_code: 1,
                      },
                    },
                  ],
                  as: "locationData",
                },
              },
              {
                $unwind: {
                  path: "$locationData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $lookup: {
                  from: "appointment_type",
                  localField: "appointmentType_id",
                  foreignField: "_id",
                  pipeline: [{ $project: { type: 1 } }],
                  as: "appointmentTypeData",
                },
              },
              {
                $unwind: {
                  path: "$appointmentTypeData",
                  preserveNullAndEmptyArrays: true,
                },
              },

              {
                $project: {
                  visitType: 1,
                  appointment_number: 1,
                  duration: 1,
                  locationData: 1,
                  startDateTime: 1,
                  endDateTime: 1,
                  appointmentTypeData: 1,
                  dos: "$startDateTime",
                  createdAt: "$createdAt",
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
        ///
        // {
        //   $lookup: {
        //     from: "modifiers",
        //     localField: "cpt.modifier",
        //     foreignField: "_id",
        //     pipeline: [
        //       // {
        //       //   $match: { $expr: { $in: ["$_id", "$$modifier_id"] } },
        //       // },
        //       {
        //         $project: {
        //           modifierCode: 1,
        //           description: 1,
        //           _id: 1,
        //         },
        //       },
        //     ],
        //     as: "modifierData",
        //   },
        // },
        //{ $unwind: "$cpt.modifier" },
        {
          $lookup: {
            from: "cpt",
            localField: "cpt.cpt_code_id",
            foreignField: "_id",
            let: { cpt_id: "$cpt.cpt_code_id" },
            pipeline: [
              //{ $unwind: "$cpt.modifier" },
              // {
              //   $match: { $expr: { $eq: ["$_id", "$$cpt_id"] } },
              // },
              // {
              //   $lookup:{
              //     from:"modifiers"
              //   }
              // }
              {
                $project: {
                  cptCode: 1,
                  description: 1,
                  price: 1,
                  _id: 1,
                  //modifiers: "$$modifiers",
                  //modifierData: "$modifierData",
                  // modifierData: {
                  //   $cond: [{ $isArray: "$modifierData" }, "$modifierData", []],
                  // },
                },
              },
            ],
            as: "cptData",
          },
        },

        {
          $lookup: {
            from: "icts",
            localField: "icd",
            foreignField: "_id",
            pipeline: [
              {
                $project: {
                  ictCode: 1,
                  description: 1,
                  codeCategory: 1,
                  _id: 1,
                },
              },
            ],
            as: "icdData",
          },
        },
        {
          $lookup: {
            from: "insurance",
            localField: "patient_id",
            foreignField: "patient_id",
            pipeline: [
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
                  copay: 1,
                  coverage: 1,
                  insurance_name: "$insuranceCompanyData.companyName",
                  payer_id: 1,
                },
              },
            ],
            as: "insuranceData",
          },
        },
      ]);
      // delete getBillResult[0].cpt;
      // delete getBillResult[0].icd;

      if (getBillResult && getBillResult.length > 0) {
        let dataObj: any = {};

        dataObj.insuranceDetails = [];
        if (getBillResult[0].insuranceData.length) {
          getBillResult[0].insuranceData.forEach((singleRecord) => {
            dataObj.insuranceDetails.push({
              _id: singleRecord._id,
              coverage: singleRecord.coverage,
              payer_id: singleRecord.payer_id,
              insurance_name: singleRecord.insurance_name,
              coPayDetails: singleRecord.copay
                ? {
                    amount: singleRecord.copay.amount,
                    type: "FULL",
                  }
                : null,
            });
          });
        }

        dataObj._id = getBillResult[0]._id;
        dataObj.insurance_id = getBillResult[0].insurance_id;
        dataObj.insurance_name = getBillResult[0].insurance_name;
        dataObj.appointment_number = getBillResult[0].appointmentData
          ? getBillResult[0].appointmentData.appointment_number
          : null;
        dataObj.patientData = getBillResult[0].patientData
          ? getBillResult[0].patientData
          : null;

        if (dataObj.patientData) {
          dataObj.patientData.first_name = dataObj.patientData.first_name
            ? Utility.getDecryptText(dataObj.patientData.first_name)
            : " ";
          dataObj.patientData.last_name = dataObj.patientData.last_name
            ? Utility.getDecryptText(dataObj.patientData.last_name)
            : " ";
        }

        dataObj.locationData = getBillResult[0].appointmentData
          ? getBillResult[0].appointmentData.locationData
          : null;

        dataObj.appointmentTypeData = getBillResult[0].patientData
          ? getBillResult[0].patientData.appointmentTypeData
          : null;

        dataObj.place_of_service = getBillResult[0].place_of_service;
        dataObj.type_of_service = getBillResult[0].type_of_service;
        dataObj.endDateTime = getBillResult[0].toDate;
        dataObj.startDateTime = getBillResult[0].fromDate;
        dataObj.doctorData = getBillResult[0].referingProviderData
          ? getBillResult[0].referingProviderData
          : null;
        dataObj.billingDoctorData = getBillResult[0].billingProviderData
          ? getBillResult[0].billingProviderData
          : null;
        dataObj.renderingDoctorData = getBillResult[0].renderingProviderData
          ? getBillResult[0].renderingProviderData
          : null;
        dataObj.responsible_party = getBillResult[0].responsible_party;
        dataObj.accept_assignment = getBillResult[0].accept_assignment;
        dataObj.cheque_number = getBillResult[0].cheque_number;
        dataObj.notes = getBillResult[0].notes;
        dataObj.email = getBillResult[0].email;
        dataObj.payment_mode = getBillResult[0].payment_mode;
        dataObj.payment_option = getBillResult[0].payment_option;
        dataObj.total_amount = getBillResult[0].total_amount;
        dataObj.payer_id = getBillResult[0].payer_id;
        dataObj.status = getBillResult[0].status;
        dataObj.duration = getBillResult[0].duration;
        dataObj.copay = getBillResult[0].copay ? getBillResult[0].copay : 0;
        dataObj.payer_id = getBillResult[0].payer_id
          ? getBillResult[0].payer_id
          : null;
        dataObj.financial_class_id =
          getBillResult[0].financial_class_id ?? null;
        // dataObj.icd = getBillResult[0].icd;
        // dataObj.cpt = getBillResult[0].cpt;
        dataObj.icdData = getBillResult[0].icdData;
        //dataObj.modifierData = getBillResult[0].modifierData;

        dataObj.clinic_id = getBillResult[0].clinic_id;
        dataObj.appointment_id = getBillResult[0].appointment_id;
        // dataObj.codeDetails = getBillResult[0].appointmentData
        //   ? getBillResult[0].appointmentData.duration
        //   : null;

        if (getBillResult[0].cptData && getBillResult[0].cptData.length) {
          if (getBillResult[0].cpt && getBillResult[0].cpt.length) {
            getBillResult[0].cpt.forEach((e, i) => {
              // if(e.cpt_code_id!.toString()==)

              let found_cpt = getBillResult[0].cptData.filter(function (el) {
                return el._id!.toString() == e.cpt_code_id!.toString();
              });

              if (found_cpt) {
                getBillResult[0].cpt[i].price = found_cpt[0].price;
                getBillResult[0].cpt[i].description = found_cpt[0].description;
                getBillResult[0].cpt[i].cptCode = found_cpt[0].cptCode;
                getBillResult[0].cpt[i]._id = found_cpt[0]._id!.toString();
              }
            });
          }
        }
        dataObj.cptData = getBillResult[0].cpt;
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: dataObj,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_GET_SUPER_BILL,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  deleteSuperBill = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let deleteBillResult = await SuperBillModel.updateOne(
        { _id: model._id },
        { isDeleted: true }
      );

      if (deleteBillResult && deleteBillResult.modifiedCount > 0) {
        // let addHistory = await HistoryModel.create({
        //   user_id: model._id,
        //   description: `super bill deleted`,
        //   type: EHistoryActivityTypeValues.USER,
        //   type_id: userDetails._id,
        // });
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.DELETE_SUCCESSFULL,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_DELETE_SUPER_BILL,
            error: errorMessage.ON_DELETE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  listSuperBill = async (
    req: Request,
    model: GetSuperBillListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;
      defaultPage = model.pageNumber ? model.pageNumber : 1;
      count = model.pageSize ? model.pageSize : 50;
      //let populateFeilds: any = [];

      let condition: any = {};
      let appointmentCondition: any = {};
      let insuranceCondition: any = {};

      if (model.insurance_type) {
        insuranceCondition.insurance_type = model.insurance_type;
      }

      if (model.insurance_coverage && model.insurance_coverage != "") {
        insuranceCondition.coverage = model.insurance_coverage;
      }

      if (model.insurance_plan_type && model.insurance_plan_type != "") {
        insuranceCondition.insurance_plan_type = model.insurance_plan_type;
      }

      if (model.cpt) {
        // if ("isDeleted" in model && model.isDeleted)
        //   condition.isDeleted = model.isDeleted;

        // if (model.search) {
        //   let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

        //   condition.first_name = {
        //     $regex: model.search,
        //     $options: "i",
        //   };
        // }

        // if (model.isActive) {
        //   condition.isActive = model.isActive;
        // }

        condition.cpt = {
          $elemMatch: {
            cpt_code_id: {
              $eq: new mongoose.Types.ObjectId(model.cpt!.toString()),
            },
          },
        };
      }

      if (model.icd)
        condition.icd = new mongoose.Types.ObjectId(model.icd!.toString());

      if (model.billing_provider_id)
        condition.billing_provider_id = new mongoose.Types.ObjectId(
          model.billing_provider_id!.toString()
        );

      if (model.rendering_provider_id)
        condition.rendering_provider_id = new mongoose.Types.ObjectId(
          model.rendering_provider_id!.toString()
        );

      if (model.referring_provider_id)
        condition.referring_provider_id = new mongoose.Types.ObjectId(
          model.referring_provider_id!.toString()
        );

      if (model.patient_id)
        condition.patient_id = new mongoose.Types.ObjectId(
          model.patient_id.toString()
        );

      if (model.clinic_id)
        condition.clinic_id = new mongoose.Types.ObjectId(
          model.clinic_id.toString()
        );

      // if (model.insurance_plan_type)
      //   insuranceCondition.insurance_plan_type = model.insurance_plan_type;

      if (model.visitType) {
        appointmentCondition.visitType = model.visitType;
      }

      if (model.location_id) {
        appointmentCondition.location_id = new mongoose.Types.ObjectId(
          model.location_id!.toString()
        );
      }

      if (model.case_type)
        appointmentCondition.appointmentType_id = new mongoose.Types.ObjectId(
          model.case_type!.toString()
        );

      if (model.startDateTime) {
        let startTime = new Date(model.startDateTime);
        startTime.setHours(0, 0, 0, 0);
        appointmentCondition.startDateTime = {
          $gte: startTime,
        };
      }
      if (model.endDateTime) {
        let endTime = new Date(model.endDateTime);
        endTime.setHours(23, 59, 59, 999);
        if ("endDateTime" in appointmentCondition)
          appointmentCondition.endDateTime.$lte = endTime;
        else
          appointmentCondition.endDateTime = {
            $lte: endTime,
          };
      }

      if (model.charge_startDateTime) {
        let startTime = new Date(model.charge_startDateTime);
        startTime.setHours(0, 0, 0, 0);
        condition.createdAt = {
          $gte: startTime,
        };
      }
      if (model.charge_endDateTime) {
        let endTime = new Date(model.charge_endDateTime);
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
          $sort: { createdAt: -1 },
        },
        {
          $lookup: {
            from: "patients",
            localField: "patient_id",
            foreignField: "_id",
            pipeline: [
              // {
              //   $lookup: {
              //     from: "states",
              //     localField: "state",
              //     foreignField: "_id",
              //     pipeline: [{ $project: { stateName: 1 } }],
              //     as: "stateData",
              //   },
              // },
              // {
              //   $unwind: {
              //     path: "$stateData",
              //     preserveNullAndEmptyArrays: true,
              //   },
              // },
              // {
              //   $lookup: {
              //     from: "countries",
              //     localField: "country",
              //     foreignField: "_id",
              //     pipeline: [{ $project: { countryName: 1 } }],
              //     as: "countryData",
              //   },
              // },
              // {
              //   $unwind: {
              //     path: "$countryData",
              //     preserveNullAndEmptyArrays: true,
              //   },
              // },
              {
                $project: {
                  first_name: 1,
                  last_name: 1,
                  address: 1,
                  city: 1,
                  date_of_birth: 1,
                  patientId: 1,
                  // state: "$stateData.stateName",
                  // country: "$countryData.countryName",
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
            from: "insurance",
            localField: "insurance_id",
            foreignField: "_id",
            pipeline: [
              {
                $match: insuranceCondition,
              },
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
                // $project: {
                //   insurance_plan_type: 1,
                //   insurance_comapny: "$insuranceCompanyData.companyName",
                // },
                $project: {
                  copay: 1,
                  coverage: 1,
                  insurance_name: "$insuranceCompanyData.companyName",
                  payer_id: 1,
                  insurance_type: 1,
                  insurance_plan_type: 1,
                },
              },
            ],
            as: "insuranceData",
          },
        },
        {
          $unwind: {
            path: "$insuranceData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "doctor",
            localField: "rendering_provider_id",
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
            as: "renderingProviderData",
          },
        },
        {
          $unwind: {
            path: "$renderingProviderData",
            preserveNullAndEmptyArrays: true,
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
            as: "referingProviderData",
          },
        },
        {
          $unwind: {
            path: "$referingProviderData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "doctor",
            localField: "billing_provider_id",
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
            as: "billingProviderData",
          },
        },
        {
          $unwind: {
            path: "$billingProviderData",
            preserveNullAndEmptyArrays: true,
          },
        },
        ///////
        {
          $lookup: {
            from: "appointment",
            localField: "appointment_id",
            foreignField: "_id",
            pipeline: [
              { $match: appointmentCondition },
              {
                $lookup: {
                  from: "clinic_locations",
                  localField: "location_id",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $project: { branchName: 1, city: 1 },
                    },
                  ],
                  as: "locationData",
                },
              },
              {
                $unwind: {
                  path: "$locationData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $lookup: {
                  from: "appointment_type",
                  localField: "appointmentType_id",
                  foreignField: "_id",
                  pipeline: [{ $project: { type: 1 } }],
                  as: "appointmentTypeData",
                },
              },
              {
                $unwind: {
                  path: "$appointmentTypeData",
                  preserveNullAndEmptyArrays: true,
                },
              },

              {
                $project: {
                  _id: 1,
                  visitType: 1,
                  appointment_number: 1,
                  locationData: 1,
                  appointmentTypeData: 1,
                  dos: "$startDateTime",
                  dos_end: "$endDateTime",
                  createdAt: "$createdAt",
                },
              },
            ],
            as: "appointmentData",
          },
        },
        {
          $unwind: {
            path: "$appointmentData",
            preserveNullAndEmptyArrays: false,
          },
        },

        ///
        {
          $lookup: {
            from: "cpt",
            localField: "cpt.cpt_code_id",
            foreignField: "_id",
            pipeline: [
              {
                $project: {
                  cptCode: 1,
                  price: 1,
                  _id: 1,
                },
              },
            ],
            as: "cptData",
          },
        },
        {
          $lookup: {
            from: "modifiers",
            localField: "cpt.modifier",
            foreignField: "_id",
            pipeline: [
              {
                $project: {
                  modifierCode: 1,
                  _id: 1,
                },
              },
            ],
            as: "modifierData",
          },
        },
        {
          $set: {
            cpt: {
              $map: {
                input: "$cpt",
                in: {
                  $mergeObjects: [
                    "$$this",
                    {
                      cptCode: {
                        $arrayElemAt: [
                          "$cptData.cptCode",
                          {
                            $indexOfArray: [
                              "$cptData._id",
                              "$$this.cpt_code_id",
                            ],
                          },
                        ],
                      },
                      price: {
                        $arrayElemAt: [
                          "$cptData.price",
                          {
                            $indexOfArray: [
                              "$cptData._id",
                              "$$this.cpt_code_id",
                            ],
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        { $unset: "cptData" },
        {
          $lookup: {
            from: "icts",
            localField: "icd",
            foreignField: "_id",
            pipeline: [
              {
                $project: {
                  ictCode: 1,
                  _id: 1,
                },
              },
            ],
            as: "icdData",
          },
        },
        // {
        //   $unwind: {
        //     path: "$icdData",
        //     preserveNullAndEmptyArrays: true,
        //   },
        // },
        {
          $facet: {
            count: [{ $count: "count" }],
            data: [
              {
                $project: {
                  _id: 1,
                  // status: 1,
                  // patient_id: 1,
                  // appointment_id: 1,
                  // payer_id: 1,
                  // responsible_party_name: 1,
                  // insurance_name: 1,
                  // provider_id: 1,
                  // rendering_provider_id: 1,
                  // fromDate: 1,
                  // toDate: 1,
                  // duration: 1,
                  // type_of_service: 1,
                  // place_of_service: 1,
                  //modifierData: 1,
                  appointment_id: 1,
                  insuranceData: 1,
                  patientData: 1,
                  doctorData: 1,
                  appointmentData: 1,
                  cptData: 1,
                  visit_report_status: "default report status",
                  cpt: 1,
                  status: 1,
                  icdData: 1,
                  marked_as_printed: 1,
                  billingProviderData: 1,
                  referingProviderData: 1,
                  renderingProviderData: 1,
                  total_amount: 1,
                  // financial_class_id: 1,
                  // total_amount: 1,
                  // responsible_party: 1,
                  // accept_assignment: 1,
                  // payment_option: 1,
                  // payment_mode: 1,
                  // received_cash: 1,
                  // cheque_number: 1,
                  // notes: 1,
                  updatedAt: 1,
                  // patientData: 1,
                },
              },
              { $skip: count * (defaultPage - 1) },
              { $limit: count },
            ],
          },
        },
      ]);

      if (
        result &&
        result.length > 0 &&
        result[0].data &&
        result[0].data.length > 0
      ) {
        let formattedData: any = [];
        result[0].data.forEach((d) => {
          formattedData.push({
            _id: d._id,
            patient_name: d.patientData
              ? Utility.getDecryptText(d.patientData.first_name) +
                " " +
                Utility.getDecryptText(d.patientData.last_name)
              : "",
            visitType: d.appointmentData ? d.appointmentData.visitType : "",
            appointment_id: d.appointment_id,
            appointmentType:
              d.appointmentData && d.appointmentData.appointmentTypeData
                ? d.appointmentData.appointmentTypeData.type
                : "",
            dob: d.patientData.date_of_birth,
            //cpt: d.cptData ? d.cptData : [],
            ict: d.icdData ? d.icdData : [],
            cpt: d.cpt ? d.cpt : [],
            insuranceData: d.insuranceData ? d.insuranceData : null,
            // refering_provider_name: d.referingProviderData
            //   ? d.doctorData.first_name + " " + d.doctorData.last_name
            //   : "",
            referingProviderData: d.referingProviderData,
            renderingProviderData: d.renderingProviderData,
            billingProviderData: d.billingProviderData,
            dos: d.appointmentData ? d.appointmentData.dos : "",
            dos_end: d.appointmentData ? d.appointmentData.dos_end : "",
            date_of_creation: d.appointmentData
              ? d.appointmentData.createdAt
              : "",
            chartNo: d.patientData.patientId,
            visit_report_status: d.visit_report_status,
            status: d.status,
            location: d.appointmentData
              ? d.appointmentData.locationData
                ? d.appointmentData.locationData
                : null
              : null,
            modified_date: d.updatedAt,
            icd: d.icdData ? d.icdData : null,
            marked_as_printed: d.marked_as_printed,
            icd_type: "ICD-10",
            total_amount: d.total_amount,
            //modifierData: d.modifierData ? d.modifierData : [],
          });
        });
        let obj = {
          data: formattedData,
          // count: result.totalDocs,
          totalDocs: result[0].count[0].count,
          pageNumber: defaultPage,
          pageSize: count,
          totalPages: Math.ceil(result[0].count[0].count / count),
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
            message: errorMessage.SUPER_BILL_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  // Ankit -17-02-2023
  superBillAssignment = async (
    req: Request,
    model: AssignSuperBillViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let foundSuperBillDetails = await SuperBillModel.findById(
        model.superbillId
      );
      model.createdby_id = userDetails._id;

      let ModelToSave = <DocumentType<SuperBillAssignment>>model;
      let assignmentResult = await SuperBillAssignmentModel.create(ModelToSave);
      if (assignmentResult) {
        let updateSuperBill = await SuperBillModel.updateOne(
          { _id: model.superbillId },
          { assignedStatus: EAssignedStatus.ASSIGNED }
        );

        let addHistory = await HistoryModel.create({
          user_id: model.createdby_id,
          description: `super bill assigned to billing team for further process`,
          type: EHistoryActivityTypeValues.SUPERBILL,
          type_id: model.superbillId,
          //type: EHistoryActivityTypeValues.USER,
          // type_id:
          //   foundSuperBillDetails && foundSuperBillDetails.patient_id
          //     ? foundSuperBillDetails.patient_id
          //     : null,
        });
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: assignmentResult,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.SUPER_BILL_ASSIGNMENT_ERROR,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };

  superBillAssignmentHistory = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let assignmentResult = await SuperBillAssignmentModel.find(
        {
          superbillId: new mongoose.Types.ObjectId(req.params._id),
        },
        { assignedTo: 1, discription: 1, teamId: 1 }
      )
        .populate([
          {
            path: "assignedTo",
            select: { first_name: 1, last_name: 1 },
          },
        ])
        .sort({ createdAt: -1 });
      if (assignmentResult && assignmentResult.length > 0) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: assignmentResult,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.SUPER_BILL_ASSIGNMENT_HISTORY,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };

  markAsPrinted = async (
    req: Request,
    model: MarkPrintedViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let updateBillResult = await SuperBillModel.updateMany(
        { _id: { $in: model.super_bill_ids } },
        { marked_as_printed: true }
      );

      if (updateBillResult && updateBillResult.modifiedCount > 0) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.UPDATE_SUCCESSFULL,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_UPDATE_PRINT_STATUS,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };

  getDetailsForGenerateSuperBill = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let id = new mongoose.Types.ObjectId(model._id);

      let data = await AppointmentModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(req.params._id),
            isDeleted: false,
          },
        },
        {
          $lookup: {
            from: "doctor",
            let: { doctor_id: "$doctor_id" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$doctor_id"] },
                },
              },

              {
                $lookup: {
                  from: "users",
                  let: { user_id: "$user_id" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$user_id"],
                        },
                      },
                    },
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
            as: "doctorData",
          },
        },
        {
          $unwind: {
            path: "$doctorData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "patients",
            let: { patient_id: "$patient_id" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$patient_id"] },
                },
              },

              {
                $lookup: {
                  from: "states",
                  let: { state_id: "$state" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$state_id"],
                        },
                      },
                    },
                    {
                      $project: {
                        stateName: 1,
                      },
                    },
                  ],
                  as: "stateData",
                },
              },

              {
                $unwind: {
                  path: "$stateData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $lookup: {
                  from: "countries",
                  let: { country_id: "$country" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$country_id"],
                        },
                      },
                    },
                    {
                      $project: {
                        countryName: 1,
                      },
                    },
                  ],
                  as: "countryData",
                },
              },

              {
                $unwind: {
                  path: "$countryData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $project: {
                  first_name: 1,
                  last_name: 1,
                  stateName: "$stateData.stateName",
                  countryName: "$countryData.countryName",
                  responsible_person: 1,
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
            from: "clinic_locations",
            localField: "location_id",
            foreignField: "_id",
            pipeline: [
              {
                $project: {
                  branchName: 1,
                  city: 1,
                  address: 1,
                  postal_code: 1,
                  // branchName: 1, city: 1
                },
              },
            ],
            as: "locationData",
          },
        },
        {
          $unwind: {
            path: "$locationData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "appointment_type",
            localField: "appointmentType_id",
            foreignField: "_id",
            // pipeline: [
            //   {
            //     $project: {
            //       type: 1,
            //       // city: 1,
            //       // address: 1,
            //       // postal_code: 1,
            //       // // branchName: 1, city: 1
            //     },
            //   },
            // ],
            as: "appointmentTypeData",
          },
        },
        {
          $unwind: {
            path: "$appointmentTypeData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            //from: "filledProgressNotes",
            from: "doctorcheckout",
            localField: "_id",
            //let: { appointment_id: "$_id" },

            foreignField: "appointment_id",
            pipeline: [
              // {
              //   // $match: {
              //   //   $expr: { $eq: ["$appointment_id", "$$appointment_id"] },
              //   // },
              // },
              {
                $lookup: {
                  from: "cpt",
                  localField: "codes.cptCode",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $project: {
                        cptCode: 1,
                        description: 1,
                        price: 1,
                        _id: 1,
                      },
                    },
                  ],
                  as: "cptCodeData",
                },
              },

              {
                $lookup: {
                  from: "icts",
                  localField: "codes.ICD_10",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $project: {
                        ictCode: 1,
                        description: 1,
                        codeCategory: 1,
                        _id: 1,
                      },
                    },
                  ],
                  as: "ictCodeData",
                },
              },

              {
                $project: {
                  //codes: 1,
                  ictCodeData: 1,
                  cptCodeData: 1,
                  placeOfService: 1,
                  insurance_id: 1,
                  insurance_name: 1,
                  payer_id: 1,
                },
              },
            ],
            as: "doctorCheckoutData",
          },
        },
        {
          $unwind: {
            path: "$doctorCheckoutData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "insurance",
            localField: "patient_id",
            foreignField: "patient_id",
            pipeline: [
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
                  copay: 1,
                  coverage: 1,
                  insurance_name: "$insuranceCompanyData.companyName",
                  payer_id: 1,
                },
              },
            ],
            as: "insuranceData",
          },
        },
        // {
        //   $unwind: {
        //     path: "$insuranceData",
        //     preserveNullAndEmptyArrays: true,
        //   },
        // },
        // {
        //   $lookup: {
        //     from: "doctorcheckout",
        //     localField: "_id",
        //     foreignField: "appointment_id",
        //     pipeline: [
        //       {
        //         $project: { placeOfService: 1 },
        //       },
        //     ],
        //     as: "doctorCheckoutData",
        //   },
        // },
        // {
        //   $unwind: {
        //     path: "$doctorCheckoutData",
        //     preserveNullAndEmptyArrays: true,
        //   },
        // },
      ]);

      if (data && data.length) {
        data[0].patientData.first_name = Utility.getDecryptText(
          data[0].patientData.first_name
        );
        data[0].patientData.last_name = Utility.getDecryptText(
          data[0].patientData.last_name
        );

        data[0].insuranceDetails = [];
        data[0].insuranceData.forEach((singleRecord) => {
          data[0].insuranceDetails.push({
            _id: singleRecord._id,
            coverage: singleRecord.coverage,
            payer_id: singleRecord.payer_id,
            insurance_name: singleRecord.insurance_name,
            coPayDetails: singleRecord.copay
              ? {
                  amount: singleRecord.copay.amount,
                  type: "FULL",
                }
              : null,
          });
        });

        // data[0].insuranceDetails = data[0].insuranceData
        //   ? {
        //       _id: data[0].insuranceData._id,
        //       payer_id: data[0].insuranceData.payer_id,
        //       payer_id: data[0].insuranceData.payer_id,
        //       insurance_name: data[0].insuranceData.insurance_name,
        //       coPayDetails: data[0].insuranceData.copay
        //         ? {
        //             amount: data[0].insuranceData.copay.amount,
        //             type: "FULL",
        //           }
        //         : null,
        //     }
        //   : null;

        data[0].insurance_id = data[0].doctorCheckoutData
          ? data[0].doctorCheckoutData.insurance_id
          : null;
        data[0].insurance_name = data[0].doctorCheckoutData
          ? data[0].doctorCheckoutData.insurance_name
          : null;
        data[0].payer_id = data[0].doctorCheckoutData
          ? data[0].doctorCheckoutData.payer_id
          : null;

        data[0].place_of_service = data[0].doctorCheckoutData
          ? data[0].doctorCheckoutData.placeOfService
          : null;

        data[0].codeDetails = {
          cptCode: data[0].doctorCheckoutData
            ? data[0].doctorCheckoutData.cptCodeData
            : [],
          ICD_10: data[0].doctorCheckoutData
            ? data[0].doctorCheckoutData.ictCodeData
            : [],
        };

        // data[0].appointmentType_id = data[0].appointmentTypeData;
        // data[0].location_id = data[0].locationData;
        // data[0].location_id = data[0].locationData;

        delete data[0].insuranceData;

        return {
          status_code: HttpStatus.OK,
          success: true,
          data: data[0],
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_GET_SUPER_BILL,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }

      // console.log(JSON.stringify(data));
      // let getAppResult = await AppointmentModel.findOne({
      //   _id: new mongoose.Types.ObjectId(req.params._id),
      //   isDeleted: false,
      // }).populate([
      //   {
      //     path: "doctor_id",
      //     select: { experience: 1, user_id: 1 },
      //     populate: {
      //       path: "user_id",
      //       select: { first_name: 1, last_name: 1 },
      //     },
      //   },

      //   {
      //     path: "patient_id",

      //     populate: [
      //       { path: "state", select: { stateName: 1 } },

      //       {
      //         path: "country",
      //         select: { countryName: 1 },
      //       },
      //     ],
      //     // select: {
      //     //   first_name: 1,
      //     //   middle_name: 1,
      //     //   last_name: 1,
      //     //   patientId: 1,
      //     // },
      //   },
      //   {
      //     path: "createdby_id",
      //     select: { first_name: 1, last_name: 1 },
      //   },

      //   {
      //     path: "location_id",
      //     select: {
      //       city: 1,
      //       address: 1,
      //       postal_code: 1,
      //     },
      //   },

      //   {
      //     path: "appointmentType_id",
      //     select: {},
      //   },
      // ]);

      // if (getAppResult) {
      //   let codeDetails = await filledProgressNotesModel
      //     .findOne({ appointment_id: id }, { codes: 1 })
      //     .populate([
      //       {
      //         path: "codes.ICD_10",
      //         select: { ictCode: 1, description: 1, codeCategory: 1 },
      //       },
      //       {
      //         path: "codes.cptCode",
      //         select: { cptCode: 1, price: 1, description: 1 },
      //       },
      //     ]);

      //   let patient_data = <DocumentType<Patients>>getAppResult!.patient_id;

      //   let insuranceDetails = await InsuranceModel.findOne(
      //     {
      //       patient_id: patient_data!._id,
      //     },
      //     { copay: 1, insurance_name: 1, payer_id: 1 }
      //   );

      //   // let codeDetails = [
      //   //   {
      //   //     ICD_10: ["60eeacfed6977b53459cf654"],
      //   //     cptCode: ["61fba68b2a2e1160b9e91bfd"],
      //   //   },
      //   // ];

      //   let patientDoc = <DocumentType<Patients>>getAppResult.patient_id;
      //   if (patientDoc && patientDoc.first_name) {
      //     patientDoc.first_name = Utility.getDecryptText(patientDoc.first_name);
      //   }

      //   if (patientDoc && patientDoc.last_name) {
      //     patientDoc.last_name = Utility.getDecryptText(patientDoc.last_name);
      //   }

      //   let response = {
      //     ...getAppResult.toObject(),
      //     codeDetails:
      //       codeDetails && codeDetails.codes ? codeDetails.codes : [],
      //     place_of_service: "08",
      //     insuranceDetails: insuranceDetails
      //       ? {
      //           _id: insuranceDetails._id,
      //           payer_id: insuranceDetails.payer_id,
      //           insurance_name: insuranceDetails.insurance_name,
      //           coPayDetails: insuranceDetails.copay
      //             ? {
      //                 amount: insuranceDetails.copay.amount,
      //                 type: "FULL",
      //               }
      //             : null,
      //         }
      //       : null,

      //     // coPayDetails
      //     //   ? {
      //     //       amount: coPayDetails.copay.amount,
      //     //       type: "FULL",
      //     //     }
      //     //   : null,
      //   };

      //   return {
      //     status_code: HttpStatus.OK,
      //     success: true,
      //     data: response,
      //   };
      // } else {
      //   return {
      //     success: false,
      //     data: {
      //       message: errorMessage.ERROR_ON_GET_SUPER_BILL,
      //       error: errorMessage.ON_FETCH_ERROR,
      //     },
      //     status_code: HttpStatus.BAD_REQUEST,
      //   };
      // }
    } catch (error) {
      next(error);
    }
  };

  getSuperBillDataToExcel = async (
    req: Request,
    model: GetSuperBillListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      const workbook = await XlsxPopulate.fromBlankAsync();
      let superbillSheet: any = workbook.sheet("Sheet1");
      let superbillSheetHeader = [
        "Location",
        "Billing Provider",
        "Rendering Provider",
        "Reffering Provider",
        "Chart No.",
        "PatientDOB",

        "Patient",
        "Insurance Plan",
        "Insurance Company",

        "Case Type",
        "Case Name",
        "CreationDate",
        "DOS(FROM)",
        "DOS(To)",
        "CPT Code",
        "ICD Code",
        "Provider",
        "Modifier",
        "POS(unit)",
        "Unit Charge",
        "Total Charges",
        "ICD Type",
        "Status",
      ];

      superbillSheetHeader.forEach((el, i) => {
        superbillSheet
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

      let defaultPage: number;
      let count: number;
      defaultPage = model.pageNumber ? model.pageNumber : 1;
      count = model.pageSize ? model.pageSize : 50;
      //let populateFeilds: any = [];

      let condition: any = {};
      // if ("isDeleted" in model && model.isDeleted)
      //   condition.isDeleted = model.isDeleted;

      // if (model.search) {
      //   let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

      //   condition.first_name = {
      //     $regex: model.search,
      //     $options: "i",
      //   };
      // }

      if (model.isActive) {
        condition.isActive = model.isActive;
      }

      let result = await SuperBillModel.aggregate([
        {
          $lookup: {
            from: "patients",
            localField: "patient_id",
            foreignField: "_id",
            pipeline: [
              // {
              //   $lookup: {
              //     from: "states",
              //     localField: "state",
              //     foreignField: "_id",
              //     pipeline: [{ $project: { stateName: 1 } }],
              //     as: "stateData",
              //   },
              // },
              // {
              //   $unwind: {
              //     path: "$stateData",
              //     preserveNullAndEmptyArrays: true,
              //   },
              // },
              // {
              //   $lookup: {
              //     from: "countries",
              //     localField: "country",
              //     foreignField: "_id",
              //     pipeline: [{ $project: { countryName: 1 } }],
              //     as: "countryData",
              //   },
              // },
              {
                $unwind: {
                  path: "$countryData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $project: {
                  first_name: 1,
                  patientId: 1,
                  last_name: 1,
                  address: 1,
                  city: 1,
                  date_of_birth: 1,
                  // state: "$stateData.stateName",
                  // country: "$countryData.countryName",
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
            from: "doctor",
            localField: "rendering_provider_id",
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
            as: "renderingProviderData",
          },
        },
        {
          $unwind: {
            path: "$renderingProviderData",
            preserveNullAndEmptyArrays: true,
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
            as: "referingProviderData",
          },
        },
        {
          $unwind: {
            path: "$referingProviderData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "doctor",
            localField: "billing_provider_id",
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
            as: "billingProviderData",
          },
        },
        {
          $unwind: {
            path: "$billingProviderData",
            preserveNullAndEmptyArrays: true,
          },
        },
        ///////
        {
          $lookup: {
            from: "appointment",
            localField: "appointment_id",
            foreignField: "_id",
            pipeline: [
              {
                $lookup: {
                  from: "clinic_locations",
                  localField: "location_id",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $project: { branchName: 1, city: 1 },
                    },
                  ],
                  as: "locationData",
                },
              },
              {
                $unwind: {
                  path: "$locationData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $lookup: {
                  from: "appointment_type",
                  localField: "appointmentType_id",
                  foreignField: "_id",
                  pipeline: [{ $project: { type: 1 } }],
                  as: "appointmentTypeData",
                },
              },
              {
                $unwind: {
                  path: "$appointmentTypeData",
                  preserveNullAndEmptyArrays: true,
                },
              },

              {
                $project: {
                  visitType: 1,
                  appointment_number: 1,
                  locationData: 1,
                  appointmentTypeData: 1,
                  dos: "$startDateTime",
                  endDate: "$endDateTime",
                  createdAt: "$createdAt",
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
        ///
        {
          $lookup: {
            from: "cpt",
            localField: "cpt.cpt_code_id",
            foreignField: "_id",
            pipeline: [
              {
                $project: {
                  cptCode: 1,
                  _id: 1,
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
            from: "icts",
            localField: "icd",
            foreignField: "_id",
            pipeline: [
              {
                $project: {
                  ictCode: 1,
                  _id: 1,
                },
              },
            ],
            as: "icdData",
          },
        },
        // {
        //   $unwind: {
        //     path: "$icdData",
        //     preserveNullAndEmptyArrays: true,
        //   },
        // },
        {
          $facet: {
            count: [{ $count: "count" }],
            data: [
              {
                $project: {
                  _id: 1,
                  // status: 1,
                  // patient_id: 1,
                  // appointment_id: 1,
                  // payer_id: 1,
                  // responsible_party_name: 1,
                  // insurance_name: 1,
                  // provider_id: 1,
                  // rendering_provider_id: 1,
                  // fromDate: 1,
                  // toDate: 1,
                  // duration: 1,
                  // type_of_service: 1,
                  // place_of_service: 1,
                  patientData: 1,
                  doctorData: 1,
                  appointmentData: 1,
                  cptData: 1,
                  visit_report_status: "default report status",
                  status: 1,
                  icdData: 1,
                  marked_as_printed: 1,
                  billingProviderData: 1,
                  referingProviderData: 1,
                  renderingProviderData: 1,
                  // financial_class_id: 1,
                  total_amount: 1,
                  // responsible_party: 1,
                  // accept_assignment: 1,
                  // payment_option: 1,
                  // payment_mode: 1,
                  // received_cash: 1,
                  // cheque_number: 1,
                  // notes: 1,
                  updatedAt: 1,
                  createdAt: 1,
                  // patientData: 1,
                  locationData: "$appointmentData.locationData",
                },
              },
              { $skip: count * (defaultPage - 1) },
              { $limit: count },
              {
                $sort: { updatedAt: -1 },
              },
            ],
          },
        },
      ]);

      if (
        result &&
        result.length > 0 &&
        result[0].data &&
        result[0].data.length > 0
      ) {
        let formattedData: any = [];
        result[0].data.forEach((d) => {
          let cptDataDetails: any;
          d.cptData.map((e: any) => {
            cptDataDetails += e.cptCode + ",";
          });

          let icdDataDetails: any;
          d.icdData.map((e: any) => {
            icdDataDetails += e.ictCode + ",";
          });

          let location: any =
            d.locationData && d.locationData.city && d.locationData.branchName
              ? d.locationData.city + "(" + d.locationData.branchName + ")"
              : "";
          formattedData.push({
            _id: d._id,
            Patient: d.patientData
              ? Utility.getDecryptText(d.patientData.first_name) +
                " " +
                Utility.getDecryptText(d.patientData.last_name)
              : "",

            Case_Type: d.appointmentData ? d.appointmentData.visitType : "",
            visitType: d.appointmentData ? d.appointmentData.visitType : "",

            appointmentType: d.appointmentData.appointmentTypeData
              ? d.appointmentData.appointmentTypeData.type
              : "",

            Case_Name: d.appointmentData.appointmentTypeData
              ? d.appointmentData.appointmentTypeData.type
              : "",
            dob: d.patientData.date_of_birth,
            cpt: d.cptData ? d.cptData : [],
            Chart_No: d.patientData.patientId,
            Reffering_Provider:
              d.referingProviderData.first_name +
              "" +
              d.referingProviderData.last_name,
            Rendering_Provider:
              d.renderingProviderData.first_name +
              "" +
              d.renderingProviderData.last_name,
            Billing_Provider:
              d.billingProviderData.first_name +
              "" +
              d.billingProviderData.last_name,
            dos: d.appointmentData ? d.appointmentData.dos : "",
            date_of_creation: d.appointmentData
              ? d.appointmentData.createdAt
              : "",
            CPT_Code: cptDataDetails.slice(8),
            ICD_Code: icdDataDetails.slice(8),
            Provider: "",
            Modifier: "",
            POS_unit: "",
            Unit_Charge: "",
            Total_Charges: d.total_amount,
            ICD_Type: "ICD-10",
            Status: d.status,
            locationDetails: location,

            CreatedDate: d.createdAt,
          });
        });

        // write data in excel
        let superBillData = formattedData;

        let sheetStyle = {
          border: true,
          fontFamily: "Calibri",
        };

        superBillData.forEach((el: any, i: number) => {
          let date = moment(el.startDateTime).format("DD-MM-YYYY");
          console.log(el);

          superbillSheet
            .cell("A" + (i + 2))
            .value(el.locationDetails)
            .style(sheetStyle);

          superbillSheet
            .cell("B" + (i + 2))
            .value(el.Billing_Provider)
            .style(sheetStyle);

          superbillSheet
            .cell("C" + (i + 2))
            .value(el.Rendering_Provider)
            .style(sheetStyle);

          superbillSheet
            .cell("D" + (i + 2))
            .value(el.Reffering_Provider)
            .style(sheetStyle);

          superbillSheet
            .cell("E" + (i + 2))
            .value(el.Chart_No)
            .style(sheetStyle);

          superbillSheet
            .cell("F" + (i + 2))
            .value(moment(el.PatientDOB).format("DD-MM-YYYY"))
            .style(sheetStyle);

          superbillSheet
            .cell("G" + (i + 2))
            .value(el.Patient)
            .style(sheetStyle);

          superbillSheet
            .cell("H" + (i + 2))
            .value(el.Insurance_Plan)
            .style(sheetStyle);

          superbillSheet
            .cell("I" + (i + 2))
            .value(el.Insurance_Company)
            .style(sheetStyle);

          superbillSheet
            .cell("J" + (i + 2))
            .value(el.Case_Type)
            .style(sheetStyle);

          superbillSheet
            .cell("K" + (i + 2))
            .value(el.Case_Name)
            .style(sheetStyle);

          superbillSheet
            .cell("L" + (i + 2))
            .value(moment(el.CreatedDate).format("DD-MM-YYYY"))
            .style(sheetStyle);

          superbillSheet
            .cell("M" + (i + 2))
            .value(moment(el.DOS).format("DD-MM-YYYY"))
            .style(sheetStyle);

          superbillSheet
            .cell("N" + (i + 2))
            .value(moment(el.Enddate).format("DD-MM-YYYY"))
            .style(sheetStyle);

          superbillSheet
            .cell("O" + (i + 2))
            .value(el.CPT_Code)
            .style(sheetStyle);

          superbillSheet
            .cell("P" + (i + 2))
            .value(el.ICD_Code)
            .style(sheetStyle);

          superbillSheet
            .cell("Q" + (i + 2))
            .value(el.Provider)
            .style(sheetStyle);

          superbillSheet
            .cell("R" + (i + 2))
            .value(el.Modifier)
            .style(sheetStyle);

          superbillSheet
            .cell("S" + (i + 2))
            .value(el.POS_unit)
            .style(sheetStyle);

          superbillSheet
            .cell("T" + (i + 2))
            .value(el.Unit_Charge)
            .style(sheetStyle);

          superbillSheet
            .cell("U" + (i + 2))
            .value(el.Total_Charges)
            .style(sheetStyle);

          superbillSheet
            .cell("V" + (i + 2))
            .value(el.ICD_Type)
            .style(sheetStyle);

          superbillSheet
            .cell("W" + (i + 2))
            .value(el.Status)
            .style(sheetStyle);
        });

        superbillSheet.freezePanes(1, 1);

        const data: any = await workbook.outputAsync();
        await fs.writeFileSync(
          path.join(
            __dirname,
            "../../../../../public/upload/superbill/SuperBill_Report.xlsx"
          ),
          data
        );
        let link = `http://${req.hostname}:${process.env.PORT}/upload/superbill/SuperBill_Report.xlsx`;

        let excelFileName = "SuperBill_Report.xlsx";
        let response = {
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
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.SUPER_BILL_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  // getDetailsForGenerateSuperBill1 = async (
  //   req: Request,
  //   model: GenerateDetailsViewmodel,
  //   next: NextFunction
  // ): Promise<IServiceResult1 | void> => {
  //   try {
  //     let condition = {
  //       clinic_id: new mongoose.Types.ObjectId(model.clinic_id),
  //       appointment_id: new mongoose.Types.ObjectId(model.appointment_id),
  //       _id: new mongoose.Types.ObjectId(model.checkout_id),
  //     };

  //     const data = await BillingCheckoutModel.aggregate([
  //       { $match: condition },

  //       {
  //         $lookup: {
  //           from: "locations",
  //           let: { location_id: "$location_id" },
  //           pipeline: [
  //             { $match: { $expr: { $eq: ["$_id", "$$location_id"] } } },
  //             {
  //               $project: {
  //                 city: "$city",
  //                 branchName: 1,
  //                 address: 1,
  //                 taxonomy: 1,
  //                 npiNo: 1,
  //               },
  //             },
  //           ],
  //           as: "locationData",
  //         },
  //       },

  //       {
  //         $unwind: { path: "$locationData", preserveNullAndEmptyArrays: true },
  //       },

  //       {
  //         $lookup: {
  //           from: "appointments",
  //           let: { appointment_id: "$appointment_id" },
  //           pipeline: [
  //             { $match: { $expr: { $eq: ["$_id", "$$appointment_id"] } } },
  //           ],
  //           as: "appointmentData",
  //         },
  //       },
  //       {
  //         $unwind: {
  //           path: "$appointmentData",
  //           preserveNullAndEmptyArrays: true,
  //         },
  //       },

  //       {
  //         $lookup: {
  //           from: "patients",
  //           let: { patient_id: "$patient_id" },
  //           pipeline: [
  //             { $match: { $expr: { $eq: ["$_id", "$$patient_id"] } } },
  //             {
  //               $project: {
  //                 firstName: 1,
  //                 patientId: 1,
  //                 lastName: 1,
  //                 image: 1,
  //                 responsiblePartyName: 1,
  //               },
  //             },
  //           ],
  //           as: "patientData",
  //         },
  //       },
  //       { $unwind: { path: "$patientData", preserveNullAndEmptyArrays: true } },

  //       {
  //         $lookup: {
  //           from: "users",
  //           let: { clinic_id: "$clinic_id" },
  //           pipeline: [
  //             {
  //               $match: {
  //                 $expr: { $eq: ["$invitedby_id", "$$clinic_id"] },
  //               },
  //             },

  //             {
  //               $lookup: {
  //                 from: "roles",
  //                 localField: "role_id",
  //                 foreignField: "_id",
  //                 as: "roleData",
  //               },
  //             },

  //             {
  //               $unwind: {
  //                 path: "$roleData",
  //                 preserveNullAndEmptyArrays: true,
  //               },
  //             },

  //             {
  //               $match: {
  //                 $expr: {
  //                   $in: [
  //                     "$roleData.roleTitle",
  //                     [
  //                       constants.rolename.ASSOCIATEPROVIDER,
  //                       constants.rolename.DOCTOR,
  //                     ],
  //                   ],
  //                 },
  //               },
  //             },

  //             {
  //               $project: {
  //                 firstName: 1,
  //                 lastName: 1,
  //                 roleTitle: "$roleData.roleTitle",
  //               },
  //             },

  //             { $sort: { roleTitle: -1 } },
  //           ],
  //           as: "providerList",
  //         },
  //       },

  //       {
  //         $lookup: {
  //           from: "users",
  //           let: { user_id: "$associate_id" },
  //           pipeline: [
  //             { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
  //             { $project: { firstName: 1, lastName: 1, image: 1, npiNo: 1 } },
  //           ],
  //           as: "doctorData",
  //         },
  //       },
  //       { $unwind: { path: "$doctorData", preserveNullAndEmptyArrays: true } },

  //       {
  //         $lookup: {
  //           from: "cards",
  //           let: { patient_id: "$patient_id" },
  //           pipeline: [
  //             { $match: { $expr: { $eq: ["$patient_id", "$$patient_id"] } } },
  //             { $project: { brand: 1, last4: 1 } },
  //           ],
  //           as: "patientCards",
  //         },
  //       },

  //       {
  //         $lookup: {
  //           from: "insurances",
  //           let: { patient_id: "$patient_id" },
  //           pipeline: [
  //             { $match: { $expr: { $eq: ["$patient_id", "$$patient_id"] } } },
  //             { $sort: { coverage: 1 } },
  //             {
  //               $project: {
  //                 insuranceName: 1,
  //                 copay: 1,
  //                 coverage: 1,
  //                 payerId: 1,
  //               },
  //             },
  //           ],
  //           as: "insuranceData",
  //         },
  //       },

  //       // {
  //       //   $lookup: {
  //       //     from: "financialclasses",
  //       //     let: { clinic_id: "$clinic_id" },
  //       //     pipeline: [
  //       //       { $match: { $expr: { $eq: ["$createdby_id", "$$clinic_id"] } } },
  //       //       { $project: { price: 1, code: 1, covered: 1 } },
  //       //     ],
  //       //     as: "financialClassData",
  //       //   },
  //       // },

  //       {
  //         $project: {
  //           _id: 0,
  //           //paper: 1,
  //           providerList: 1,
  //           copay: {
  //             type: "FULL",
  //             //notes: "$copay.notes",
  //             amount: "$copay.amount",
  //             //status: "$copay.status",
  //             // full: {
  //             //   type: "$copay.full.type",
  //             //   cheque: "$copay.full.cheque",
  //             //   status: "$copay.full.status",
  //             //   link: "$copay.full.link.url",
  //             //   email: "$copay.full.email",
  //             //   card_id: "$copay.full.card_id",
  //             // },
  //           },
  //           duration: 1,
  //           doctor_id: 1,
  //           doctorData: 1,
  //           patientData: 1,
  //           orignalRefNo: 1,
  //           patientCards: 1,
  //           associate_id: 1,
  //           locationData: 1,
  //           insuranceData: 1,
  //           typeOfService: 1,
  //           placeOfService: 1,
  //           resubmissionCode: 1,
  //           checkout_id: "$_id",
  //           acceptAssignment: 1,
  //           financialClass_id: 1,
  //           financialClassData: 1,
  //           endDateTime: "$toDOS",
  //           checkoutTime: "$checkoutTime",
  //           providerAssignedCodes: "$codes",
  //           appointment_id: "$appointment_id",
  //           insurancePortion: "$insurance.amount",
  //           checkInTime: "$appointmentData.startDateTime",
  //           startDateTime: "$appointmentData.startDateTime",
  //           appointment_number: "$appointmentData.appointment_number",
  //         },
  //       },
  //     ]);

  //     if (true) {
  //     } else {
  //       return {
  //         status_code: HttpStatus.BAD_REQUEST,
  //         success: false,
  //         data: {
  //           message: errorMessage.NO_RECORD_FOUND,
  //           error: errorMessage.ON_FETCH_ERROR,
  //         },
  //       };
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  getPatientList = async (
    req: Request,
    model: PatientListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let get_patients = await AppointmentModel.aggregate([
        {
          $match: {
            appointment_number: model.appointment_number,
            status: "Checkout",
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
            from: "doctorcheckout",
            localField: "_id",
            foreignField: "appointment_id",
            pipeline: [
              { $match: { billGenerated: false, noShow: false } },
              {
                $project: {
                  _id: 1,
                },
              },
            ],
            as: "doctorCheckoutData",
          },
        },
        {
          $unwind: {
            path: "$doctorCheckoutData",
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $lookup: {
            from: "super_bill",
            localField: "_id",
            foreignField: "appointment_id",
            pipeline: [
              {
                $project: {
                  _id: 1,
                },
              },
            ],
            as: "superBillFound",
          },
        },
        {
          $match: {
            "superBillFound.0": {
              $exists: false,
            },
          },
        },
        {
          $project: {
            first_name: "$patientData.first_name",
            last_name: "$patientData.last_name",
            appointment_id: "$_id",
          },
        },
      ]);

      if (get_patients && get_patients.length) {
        get_patients.forEach((e) => {
          e.first_name = Utility.getDecryptText(e.first_name);
          e.last_name = Utility.getDecryptText(e.last_name);
        });
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: get_patients,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.NO_RECORD_FOUND,
            //message: errorMessage.NO_CHECKED_OUT_APPOINTMENT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };

  getChargeHistory = async (
    req: Request,
    //model: PatientListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let result = await SuperBillModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(req.params._id),
          },
        },
        {
          $lookup: {
            from: "doctor",
            localField: "billing_provider_id",
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
            as: "billingProviderData",
          },
        },
        {
          $unwind: {
            path: "$billingProviderData",
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
                $lookup: {
                  from: "states",
                  localField: "state",
                  foreignField: "_id",
                  pipeline: [{ $project: { stateName: 1 } }],
                  as: "stateData",
                },
              },
              {
                $unwind: {
                  path: "$stateData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $lookup: {
                  from: "countries",
                  localField: "country",
                  foreignField: "_id",
                  pipeline: [{ $project: { countryName: 1 } }],
                  as: "countryData",
                },
              },
              {
                $unwind: {
                  path: "$countryData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $project: {
                  first_name: 1,
                  last_name: 1,
                  address: 1,
                  city: 1,
                  responsible_person: 1,
                  state: "$stateData.stateName",
                  country: "$countryData.countryName",
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
                  description: 1,
                  price: 1,
                  _id: 1,
                },
              },
            ],
            as: "cptData",
          },
        },

        {
          $lookup: {
            from: "icts",
            localField: "icd",
            foreignField: "_id",
            pipeline: [
              {
                $project: {
                  ictCode: 1,
                  description: 1,
                  codeCategory: 1,
                  _id: 1,
                },
              },
            ],
            as: "icdData",
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
                  from: "clinic_locations",
                  localField: "location_id",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $project: {
                        branchName: 1,
                        city: 1,
                        address: 1,
                        postal_code: 1,
                      },
                    },
                  ],
                  as: "locationData",
                },
              },
              {
                $unwind: {
                  path: "$locationData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $lookup: {
                  from: "appointment_type",
                  localField: "appointmentType_id",
                  foreignField: "_id",
                  pipeline: [{ $project: { type: 1 } }],
                  as: "appointmentTypeData",
                },
              },
              {
                $unwind: {
                  path: "$appointmentTypeData",
                  preserveNullAndEmptyArrays: true,
                },
              },

              {
                $project: {
                  visitType: 1,
                  appointment_number: 1,
                  duration: 1,
                  locationData: 1,
                  startDateTime: 1,
                  endDateTime: 1,
                  appointmentTypeData: 1,
                  dos: "$startDateTime",
                  createdAt: "$createdAt",
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
            localField: "insurance_id",
            foreignField: "_id",
            pipeline: [
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
                  copay: 1,
                  coverage: 1,
                  insurance_name: "$insuranceCompanyData.companyName",
                  payer_id: 1,
                  insurance_plan_type: 1,
                },
              },
            ],
            as: "insuranceData",
          },
        },
        {
          $unwind: {
            path: "$insuranceData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $facet: {
            overview: [
              {
                $project: {
                  _id: 1,
                  billingProviderData: 1,
                  patientData: 1,
                  cptData: 1,
                  icdData: 1,
                  total_amount: 1,
                  appointmentData: 1,
                  insuranceData: 1,
                  copay: 1,
                  insurance: 1,
                  notes: 1,
                  current_balance: 10, //STATIC
                  againg_days: 10, //STATIC
                  current_follow_up_status: null, //STATIC
                },
              },
            ],
          },
        },
      ]);

      if (
        result &&
        result.length &&
        result[0].overview &&
        result[0].overview.length
      ) {
        let claim_history_data = [
          {
            invoice: "59DGDGD232",
            billing_provider: result[0].overview[0].billingProviderData
              ? result[0].overview[0].billingProviderData
              : null,
            appointment_data: result[0].overview[0].appointmentData
              ? result[0].overview[0].appointmentData
              : null,
            insurance_data: result[0].overview[0].insuranceData
              ? result[0].overview[0].insuranceData
              : null,
            date: new Date(),
            charge: result[0].overview[0].total_amount,
            credited: 0,
            balance: 0,
            copay: result[0].overview[0].copay
              ? result[0].overview[0].copay.amount
              : 0,
            priority: result[0].overview[0].insurance
              ? result[0].overview[0].insurance.coverage
              : null,
            status:
              result[0].overview[0].insurance &&
              result[0].overview[0].insurance.claimStatus != null
                ? result[0].overview[0].insurance.claimStatus
                : "To be claimed",
            type: "E",
            remit_code: "",
            notes: result[0].overview[0].notes,
          },
        ];

        result[0].overview[0].patientData.first_name = Utility.getDecryptText(
          result[0].overview[0].patientData.first_name
        );
        result[0].overview[0].patientData.last_name = Utility.getDecryptText(
          result[0].overview[0].patientData.last_name
        );

        return {
          status_code: HttpStatus.OK,
          success: true,
          data: {
            overview: result[0].overview[0],
            history: claim_history_data,
          },
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.NO_RECORD_FOUND,
            //message: errorMessage.NO_CHECKED_OUT_APPOINTMENT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };

  getPaymentHistory = async (
    req: Request,
    //model: GetHistoryViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let result = await BillingPaymentModel.aggregate([
        {
          $match: {
            appointment_id: new mongoose.Types.ObjectId(req.params._id),
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
                  from: "clinic_locations",
                  localField: "location_id",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $project: {
                        branchName: 1,
                        city: 1,
                        address: 1,
                        postal_code: 1,
                      },
                    },
                  ],
                  as: "locationData",
                },
              },
              {
                $unwind: {
                  path: "$locationData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $lookup: {
                  from: "appointment_type",
                  localField: "appointmentType_id",
                  foreignField: "_id",
                  pipeline: [{ $project: { type: 1 } }],
                  as: "appointmentTypeData",
                },
              },
              {
                $unwind: {
                  path: "$appointmentTypeData",
                  preserveNullAndEmptyArrays: true,
                },
              },

              {
                $project: {
                  visitType: 1,
                  appointment_number: 1,
                  duration: 1,
                  locationData: 1,
                  startDateTime: 1,
                  endDateTime: 1,
                  appointmentTypeData: 1,
                  dos: "$startDateTime",
                  createdAt: "$createdAt",
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
            from: "super_bill",
            localField: "appointment_id",
            foreignField: "appointment_id",
            pipeline: [
              {
                $lookup: {
                  from: "doctor",
                  localField: "billing_provider_id",
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
                  as: "billingProviderData",
                },
              },
              {
                $unwind: {
                  path: "$billingProviderData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $lookup: {
                  from: "doctor",
                  localField: "rendering_provider_id",
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
                  as: "renderingProviderData",
                },
              },
              {
                $unwind: {
                  path: "$renderingProviderData",
                  preserveNullAndEmptyArrays: true,
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
                  as: "referingProviderData",
                },
              },
              {
                $unwind: {
                  path: "$referingProviderData",
                  preserveNullAndEmptyArrays: true,
                },
              },

              {
                $lookup: {
                  from: "cpt",
                  localField: "cpt.cpt_code_id",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $project: {
                        cptCode: 1,
                        price: 1,
                        _id: 1,
                      },
                    },
                  ],
                  as: "cptData",
                },
              },
              {
                $lookup: {
                  from: "modifiers",
                  localField: "cpt.modifier",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $project: {
                        modifierCode: 1,
                        _id: 1,
                      },
                    },
                  ],
                  as: "modifierData",
                },
              },
              {
                $set: {
                  cpt: {
                    $map: {
                      input: "$cpt",
                      in: {
                        $mergeObjects: [
                          "$$this",
                          {
                            cptCode: {
                              $arrayElemAt: [
                                "$cptData.cptCode",
                                {
                                  $indexOfArray: [
                                    "$cptData._id",
                                    "$$this.cpt_code_id",
                                  ],
                                },
                              ],
                            },
                            price: {
                              $arrayElemAt: [
                                "$cptData.price",
                                {
                                  $indexOfArray: [
                                    "$cptData._id",
                                    "$$this.cpt_code_id",
                                  ],
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  },
                },
              },
              { $unset: "cptData" },
              {
                $lookup: {
                  from: "icts",
                  localField: "icd",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $project: {
                        ictCode: 1,
                        _id: 1,
                      },
                    },
                  ],
                  as: "icdData",
                },
              },
              {
                $project: {
                  billing_provider: "$billingProviderData",
                  rendering_provider: "$renderingProviderData",
                  refering_provider: "$referingProviderData",
                  icdData: "$icdData",
                  modifierData: "$modifierData",
                  cptData: "$cpt",
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
        // {
        //   $facet: {
        //     overview: [
        //       {
        //         $project: {},
        //       },
        //     ],
        //   },
        // },
      ]);
      if (result && result.length) {
        result.forEach((data) => {
          data.revCode = [];
          data.admission_date = new Date();
          data.discharge_date = new Date();
          data.allowed_amount = 0;
          data.total_paid_amount = 0;
          data.total_adjustment_amount = 0;
          data.claim_no = "";
          data.referance_no = "";
          data.insurance_plan = "";
          data.insurance_priority = "";
          data.fs_ra = "";
          data.posted_date = data.createdAt;
          data.adjustment_amount = 0;
          data.rejection_code = "";
          data.rejection_code_description = "";
          data.reversal_payment = 0;
          data.reversal_adjustment = 0;
          data.remianing_balance = 0;
          data.insuranceId = "";

          data.patientData.first_name = Utility.getDecryptText(
            data.patientData.first_name
          );
          data.patientData.last_name = Utility.getDecryptText(
            data.patientData.last_name
          );
        });
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: result,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.NO_RECORD_FOUND,
            //message: errorMessage.NO_CHECKED_OUT_APPOINTMENT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new SuperBillServices();
