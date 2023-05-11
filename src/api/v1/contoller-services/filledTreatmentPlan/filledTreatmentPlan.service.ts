import { DocumentType } from "@typegoose/typegoose";
import { NextFunction, Request } from "express";
import HttpStatus from "http-status-codes";
import mongoose from "mongoose";
import Utility, { IServiceResult1 } from "../../common/common-methods";
import errorMessage from "../../common/erros_message";
import FilledTreatmentPlanModel from "../../models/filled_treatment_plan.model";
import { User } from "../../models/user.model";

import { Appointment } from "../../models/appointment.model";
import { Doctor } from "../../models/doctor.model";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";
import { Patients } from "../../models/patient.model";
import TreatmentPlanModel, {
  TreatmentPlan,
} from "../../models/treatmentPlan.model";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddFilledTreatmentPlanViewmodel,
  CheckOutViewmodel,
  GetFilledTreatmentPlanListViewmodel,
  UpdateFilledTreatmentPlanViewmodel,
} from "../../view-models/filledTreatmentPlan";
export enum EnumRole {
  PROVIDER = "provider",
}
class FilledTreatmentPlanServices {
  addTreatmentPlan = async (
    req: Request,
    model: AddFilledTreatmentPlanViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      model.createdby_id = userDetails._id;
      let alreadyPresentTreatmentPlan = await FilledTreatmentPlanModel.findOne({
        doctor_id: model.doctor_id,
        clinic_id: model.clinic_id,
        appointment_id: model.appointment_id,
        treatmentPlan_id: model.treatmentPlan_id,
      });

      if (alreadyPresentTreatmentPlan) {
        let saveTreatmentPlanResult = await FilledTreatmentPlanModel.updateOne(
          {
            appointment_id: model.appointment_id,
            treatmentPlan_id: model.treatmentPlan_id,
          },
          model
        );

        if (
          saveTreatmentPlanResult &&
          saveTreatmentPlanResult.modifiedCount > 0
        ) {
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `treatment plan updated`,
            type: EHistoryActivityTypeValues.CHECKOUT,
            // type_id: saveTreatmentPlanResult._id,
          });

          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.SAVED_SUCCESSFULL,
          };
        } else
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_UPDATE_FILLED_TREATMENT_PLAN,
              error: errorMessage.ON_UPDATE_ERROR,
            },
            status_code: HttpStatus.BAD_REQUEST,
          };
      }

      let saveTreatmentPlanResult = await FilledTreatmentPlanModel.create(
        model
      );

      if (saveTreatmentPlanResult) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `treatment plan added`,
          type: EHistoryActivityTypeValues.CHECKOUT,
          type_id: saveTreatmentPlanResult._id,
        });

        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.SAVED_SUCCESSFULL,
          // data: {
          //   _id: saveTreatmentPlanResult._id,
          //   doctor_id: saveTreatmentPlanResult.doctor_id,
          //   clinic_id: saveTreatmentPlanResult.clinic_id,
          //   appointment_id: saveTreatmentPlanResult.appointment_id,
          //   field_data: saveTreatmentPlanResult.field_data,
          //   patient_id: saveTreatmentPlanResult.patient_id,
          //   treatmentPlan_id: saveTreatmentPlanResult.treatmentPlan_id,
          // },
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_ADD_FILLED_TREATMENT_PLAN,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
      // }
    } catch (error) {
      next(error);
    }
  };
  updateTreatmentPlan = async (
    req: Request,
    model: UpdateFilledTreatmentPlanViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let updateTreatmentPlanResult =
        await FilledTreatmentPlanModel.findOneAndUpdate(
          { _id: model._id },
          model,
          {
            new: true,
          }
        );

      if (updateTreatmentPlanResult) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `treatment plan updated`,
          type: EHistoryActivityTypeValues.CHECKOUT,
          type_id: updateTreatmentPlanResult.clinic_id,
        });
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.UPDATE_SUCCESSFULL,
          // data: {
          //   _id: updateTreatmentPlanResult._id,
          //   doctor_id: updateTreatmentPlanResult.doctor_id,
          //   clinic_id: updateTreatmentPlanResult.clinic_id,
          //   appointment_id: updateTreatmentPlanResult.appointment_id,
          //   field_data: updateTreatmentPlanResult.field_data,
          //   patient_id: updateTreatmentPlanResult.patient_id,
          //   treatmentPlan_id: updateTreatmentPlanResult.treatmentPlan_id,
          // },
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_UPDATE_TREATMENT_PLAN,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  deleteTreatmentPlan = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let deleteTreatmentPlanResult = await FilledTreatmentPlanModel.updateOne(
        { _id: req.params._id },
        { isDeleted: true }
      );
      if (
        deleteTreatmentPlanResult &&
        deleteTreatmentPlanResult.modifiedCount > 0
      ) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.DELETE_SUCCESSFULL,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_DELETE_FILLED_TREATMENT_PLAN,
            error: errorMessage.ON_DELETE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  getTreatmentPlan = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let getTreatmentPlanResult = await FilledTreatmentPlanModel.findOne({
        _id: model._id,
        // isActive: true,
        // isDeleted: false,
      }).populate([
        {
          path: "appointment_id",
          populate: [
            {
              path: "appointmentType_id",
              select: { type: 1, duration: 1 },
            },
            {
              path: "location_id",
              select: { address: 1, city: 1 },
            },
          ],
          select: {
            endDateTime: 1,
            startDateTime: 1,
            visitType: 1,
            appointmentType_id: 1,
            location_id: 1,
          },
        },
        {
          path: "doctor_id",
          populate: {
            path: "user_id",
            select: { first_name: 1, last_name: 1 },
          },
          select: {
            user_id: 1,
          },
        },
        {
          path: "patient_id",
          select: { first_name: 1, last_name: 1 },
        },
        {
          path: "treatmentPlan_id",
          select: { fields: 1, form_title: 1 },
        },
      ]);
      if (getTreatmentPlanResult) {
        let updatedData = {
          _id: getTreatmentPlanResult._id,
          field_data: getTreatmentPlanResult.field_data,
          //clinic_id: getFilledProgressNoteResult.clinic_id,
          doctor_data: getTreatmentPlanResult.doctor_id,
          patient_data: <DocumentType<Patients>>(
            getTreatmentPlanResult.patient_id
          ),
          //treatmentPlan_id: getTreatmentPlanResult.treatmentPlan_id,
          // session_narrative: getTreatmentPlanResult.session_narrative,
          // treatment_goal: getTreatmentPlanResult.treatment_goal,
          appointment_data: getTreatmentPlanResult.appointment_id,
          treatmentPlan: <DocumentType<TreatmentPlan>>(
            getTreatmentPlanResult.treatmentPlan_id
          ),
        };
        if (updatedData.patient_data) {
          updatedData.patient_data.first_name = Utility.getDecryptText(
            updatedData.patient_data.first_name
          ).toLowerCase();
          updatedData.patient_data.last_name = Utility.getDecryptText(
            updatedData.patient_data.last_name
          ).toLowerCase();
          updatedData.patient_data.first_name =
            updatedData.patient_data.first_name.charAt(0).toUpperCase() +
            updatedData.patient_data.first_name.slice(1);
          updatedData.patient_data.last_name =
            updatedData.patient_data.last_name.charAt(0).toUpperCase() +
            updatedData.patient_data.last_name.slice(1);
        }

        if (
          updatedData.treatmentPlan.fields &&
          updatedData.treatmentPlan.fields.length > 0
        ) {
          if (updatedData.field_data && updatedData.field_data.length > 0) {
            updatedData.treatmentPlan.fields.forEach((d: any, i: number) => {
              let found_obj = updatedData.field_data.find(
                (e) => e.id!.toString() == d._id!.toString()
              );
              if (found_obj) {
                updatedData.treatmentPlan.fields[i].default = found_obj.value;
              } else {
                if (d.input_type == "checkbox") {
                  updatedData.treatmentPlan.fields[i].default = [];
                }
              }
            });
          } else {
            updatedData.treatmentPlan.fields.forEach((d: any, i: number) => {
              if (d.input_type == "checkbox") {
                updatedData.treatmentPlan.fields[i].default = [];
              }
            });
          }

          // let updatedData = {
          //   _id: getTreatmentPlanResult._id,
          //   field_data: getTreatmentPlanResult.field_data,
          //   //clinic_id: getFilledProgressNoteResult.clinic_id,
          //   doctor_data: getTreatmentPlanResult.doctor_id,
          //   treatmentPlan: <DocumentType<TreatmentPlan>>(
          //     getTreatmentPlanResult.treatmentPlan_id
          //   ),
          //   appointment_data: getTreatmentPlanResult.appointment_id,
          // };

          // if (
          //   updatedData.field_data &&
          //   updatedData.field_data.length > 0 &&
          //   updatedData.treatmentPlan.fields &&
          //   updatedData.treatmentPlan.fields.length > 0
          // ) {
          //   updatedData.treatmentPlan.fields.forEach((d: any, i: number) => {
          //     let found_obj = updatedData.field_data.find(
          //       (e) => e.id!.toString() == d._id!.toString()
          //     );
          //     if (found_obj) {
          //       updatedData.treatmentPlan.fields[i].default = found_obj.value;
          //     } else {
          //       if (d.input_type == "checkbox") {
          //         updatedData.treatmentPlan.fields[i].default = [];
          //       }
          //     }
          //   });
        }

        return {
          status_code: HttpStatus.OK,
          success: true,
          data: updatedData,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_GET_TREATMENT_PLAN,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  listTreatmentPlan = async (
    req: Request,
    model: GetFilledTreatmentPlanListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;
      defaultPage = model.pageNumber ? model.pageNumber : 1;
      count = model.pageSize ? model.pageSize : 50;
      let populateFeilds: any = [
        {
          path: "appointment_id",
          select: {
            appointment_number: 1,
            startDateTime: 1,
            endDateTime: 1,
          },
        },
        {
          path: "doctor_id",
          populate: [
            {
              path: "user_id",
              select: { first_name: 1, last_name: 1 },
            },
          ],
          select: { _id: 1, user_id: 1 },
        },
        {
          path: "patient_id",
          select: { first_name: 1, last_name: 1 },
        },
      ];

      let condition: any = {
        isDeleted: false,
        //isActive: true,
      };
      condition.clinic_id = model.clinic_id;
      condition.patient_id = model.patient_id;
      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

        condition.form_title = {
          $regex: model.search,
          $options: "i",
        };
      }

      if (model.isActive) {
        condition.isActive = model.isActive;
      }

      let result: mongoose.PaginateResult<any> =
        await FilledTreatmentPlanModel.paginate(condition, {
          page: defaultPage,
          ...(count > 0 ? { limit: count } : { pagination: false }),
          populate: populateFeilds,

          sort: { createdAt: -1 },
        });

      if (result && result.docs && result.docs.length > 0) {
        let formattedData: any = [];
        result.docs.forEach((e) => {
          let patient_data = <DocumentType<Patients>>e.patient_id;

          patient_data.first_name = Utility.getDecryptText(
            patient_data.first_name
          ).toLowerCase();
          patient_data.last_name = Utility.getDecryptText(
            patient_data.last_name
          ).toLowerCase();
          patient_data.first_name =
            patient_data.first_name.charAt(0).toUpperCase() +
            patient_data.first_name.slice(1);
          patient_data.last_name =
            patient_data.last_name.charAt(0).toUpperCase() +
            patient_data.last_name.slice(1);

          let appointment_data = <DocumentType<Appointment>>e.appointment_id;
          let provider_data = <DocumentType<Doctor>>e.doctor_id;

          let provider_detail = <DocumentType<User>>provider_data.user_id!;
          formattedData.push({
            _id: e._id,
            appointment_number: appointment_data.appointment_number,
            startDateTime: appointment_data.startDateTime,
            endDateTime: appointment_data.endDateTime,
            provider_id: e.doctor_id._id,
            provider_first_name: provider_detail.first_name
              ? provider_detail.first_name
              : "",
            provider_last_name: provider_detail.last_name
              ? provider_detail.last_name
              : "",
            patient_id: e.patient_id._id,
            patient_first_name: patient_data.first_name,
            patient_last_name: patient_data.last_name,
            // provider_name:
            //   provider_data.user_id.first_name ||
            //   "" + " " + provider_data.user_id.first_name ||
            //   "",
            // patient_id: patient_data._id,
            // patient_name:
            //   patient_data.first_name + " " + patient_data.first_name,
          });
        });

        let obj = {
          data: formattedData,
          // count: result.totalDocs,
          totalDocs: result.totalDocs,
          pageNumber: result.page,
          pageSize: result.limit,
          totalPages: Math.ceil(result.totalDocs / result.limit),
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
            //message: errorMessage.TREATMENT_PLAN_LIST_NOT_FOUND,
            message: errorMessage.TREATMENT_PLAN_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  checkoutData = async (
    req: Request,
    model: CheckOutViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      const condition = {
          _id: new mongoose.Types.ObjectId(model.treatmentPlan_id!.toString()),
        },
        lastFilledCond = {
          // status: "SAVED",
          // doctor_id: mongoose.Types.ObjectId(doctor_id),
          saveAsDraft: false,
          clinic_id: new mongoose.Types.ObjectId(model.clinic_id!.toString()),
          //patient_id: new mongoose.Types.ObjectId(model.patient_id!.toString()),
        },
        apptCond = {
          //doctor_id: new mongoose.Types.ObjectId(model.doctor_id!.toString()),
          // clinic_id: new mongoose.Types.ObjectId(model.clinic_id!.toString()),
          //patient_id: new mongoose.Types.ObjectId(model.patient_id!.toString()),
          appointment_id: new mongoose.Types.ObjectId(
            model.appointment_id!.toString()
          ),
        };

      let finalResult = await TreatmentPlanModel.aggregate([
        { $match: condition },

        {
          $lookup: {
            from: "filledTreatmentPlan",
            let: { plan_id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$treatmentPlan_id", "$$plan_id"],
                      },
                      {
                        $eq: [
                          "$appointment_id",
                          new mongoose.Types.ObjectId(
                            model.appointment_id!.toString()
                          ),
                        ],
                      },
                    ],
                  },
                },
              },
              // {
              //   $match: {
              //     treatmentPlan_id: "$$plan_id",
              //     appointment_id: new mongoose.Types.ObjectId(
              //       model.appointment_id!.toString()
              //     ),
              //   },
              // },
            ],
            as: "filledTreatmentPlanData",
          },
        },
        {
          $unwind: {
            path: "$filledTreatmentPlanData",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: "appointment",
            pipeline: [
              {
                $match: {
                  // doctor_id: new mongoose.Types.ObjectId(
                  //   model.doctor_id!.toString()
                  // ),
                  // clinic_id: new mongoose.Types.ObjectId(
                  //   model.clinic_id!.toString()
                  // ),
                  // patient_id: new mongoose.Types.ObjectId(
                  //   model.patient_id!.toString()
                  // ),
                  _id: new mongoose.Types.ObjectId(
                    model.appointment_id!.toString()
                  ),
                },
              },
              {
                $lookup: {
                  from: "appointment",
                  let: { appt_id: "$appointmentType_id" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$appt_id"],
                        },
                      },
                    },
                    {
                      $project: { type: 1 },
                    },
                  ],
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
                  startDateTime: 1,
                  endDateTime: 1,
                  duration: 1,
                  appointment_type: "$appointmentTypeData.type",
                  visitType: 1,
                  location_id: 1,
                  patient_id: 1,
                  doctor_id: 1,
                  clinic_id: 1,
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
            from: "patients",
            let: {
              patient_id: "$appointmentData.patient_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$patient_id"] },
                },
              },
              { $project: { first_name: 1, last_name: 1 } },
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
      ]);

      if (finalResult) {
        // finalResult[0].patientData.first_name = Utility.getEncryptText(
        //   finalResult[0].patientData.first_name.toUpperCase()
        // );

        if (finalResult[0].fields && finalResult[0].fields.length > 0) {
          if (
            finalResult[0].filledTreatmentPlanData &&
            finalResult[0].filledTreatmentPlanData.field_data.length > 0
          ) {
            finalResult[0].fields.forEach((d: any, i: number) => {
              let found_obj =
                finalResult[0].filledTreatmentPlanData.field_data.find(
                  (e) => e.id!.toString() == d._id!.toString()
                );
              if (found_obj) {
                finalResult[0].fields[i].default = found_obj.value;
              } else {
                if (d.input_type == "checkbox") {
                  finalResult[0].fields[i].default = [];
                }
              }
            });
          } else {
            finalResult[0].fields.forEach((d: any, i: number) => {
              if (d.input_type == "checkbox") {
                finalResult[0].fields[i].default = [];
              }
            });
          }
        }

        finalResult[0].patientData.first_name = finalResult[0].patientData
          .first_name
          ? Utility.getDecryptText(finalResult[0].patientData.first_name)
          : "";

        finalResult[0].patientData.last_name = finalResult[0].patientData
          .last_name
          ? Utility.getDecryptText(finalResult[0].patientData.last_name)
          : "";

        // delete finalResult[0].filledprogressNoteData;
        // delete finalResult[0].isActive;
        // delete finalResult[0].isDeleted;
        // delete finalResult[0].saveAsDraft;
        // delete finalResult[0].progress_note_id;
        // delete finalResult[0].clinic_id;
        // delete finalResult[0].import;
        finalResult[0].clinic_id = finalResult[0].appointmentData.clinic_id;
        // finalResult[0].patientData.last_name = Utility.getEncryptText(
        //   finalResult[0].patientData.last_name.toUpperCase()
        // );
        return {
          status_code: HttpStatus.OK,
          data: finalResult[0],
          success: true,
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.FILLED_PROGRESS_NOTE_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new FilledTreatmentPlanServices();
