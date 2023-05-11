import { DocumentType } from "@typegoose/typegoose";
import { NextFunction, Request } from "express";
import HttpStatus from "http-status-codes";
import mongoose from "mongoose";
import Utility, { IServiceResult1 } from "../../common/common-methods";
import errorMessage from "../../common/erros_message";
import FilledProgressNoteModel from "../../models/filled_progress_notes.model";
import { User } from "../../models/user.model";

import { Appointment } from "../../models/appointment.model";
import { Doctor } from "../../models/doctor.model";
import FilledTreatmentPlanModel from "../../models/filled_treatment_plan.model";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";
import { Patients } from "../../models/patient.model";
import {
  default as ProgressNoteModel,
  default as ProgressNotesModel,
  ProgressNotes,
} from "../../models/progress_notes.model";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddFilledProgressNoteViewmodel,
  CheckOutViewmodel,
  GetFilledProgressNoteListViewmodel,
  UpdateFilledProgressNoteViewmodel,
} from "../../view-models/filledProgressNote";
export enum EnumRole {
  PROVIDER = "provider",
}
class FilledProgressNoteServices {
  addFilledProgressNote = async (
    req: Request,
    model: AddFilledProgressNoteViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      model.createdby_id = userDetails._id;
      let alreadyPresentForm = await FilledProgressNoteModel.findOne({
        clinic_id: model.clinic_id,
        appointment_id: model.appointment_id,
        //progressNote_id:model.progressNote_id,
        doctor_id: model.doctor_id,
      });
      //console.log(alreadyPresentForm);
      if (alreadyPresentForm) {
        if (
          alreadyPresentForm.progressNote_id!.toString() !=
          model.progressNote_id!.toString()
        )
          await FilledProgressNoteModel.deleteOne({
            appointment_id: model.appointment_id,
          });
        else {
          let updateform = await FilledProgressNoteModel.updateOne(
            {
              appointment_id: model.appointment_id,
              progressNote_id: model.progressNote_id,
            },
            model
            //{ new: true }
          );

          if (updateform && updateform.modifiedCount > 0) {
            let addHistory = await HistoryModel.create({
              user_id: userDetails._id,
              description: `progress note updated`,
              type: EHistoryActivityTypeValues.CHECKOUT,
              // type_id: saveProgressNoteResult._id,
            });
            return {
              status_code: HttpStatus.OK,
              success: true,
              data: errorMessage.SAVED_SUCCESSFULL,
            };
          } else {
            return {
              success: false,
              data: {
                message: errorMessage.ERROR_ON_ADD_FILLED_PROGRESS_NOTE,
                error: errorMessage.ON_ADD_ERROR,
              },
              status_code: HttpStatus.BAD_REQUEST,
            };
          }
        }
      }

      // if (alreadyPresentForm) {

      //   return {
      //     success: false,
      //     data: {
      //       message: errorMessage.ALREADY_EXIST_FILLED_PROGRESS_NOTE,
      //       error: errorMessage.ON_ADD_ERROR,
      //     },
      //     status_code: HttpStatus.BAD_REQUEST,
      //   };
      // } else {
      let saveProgressNoteResult = await FilledProgressNoteModel.create(model);

      if (saveProgressNoteResult) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `progress note added`,
          type: EHistoryActivityTypeValues.CHECKOUT,
          type_id: saveProgressNoteResult._id,
        });
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.SAVED_SUCCESSFULL,
          // data: {
          //   _id: saveProgressNoteResult._id,
          //   field_data: saveProgressNoteResult.field_data,
          //   clinic_id: saveProgressNoteResult.clinic_id,
          //   doctor_id: saveProgressNoteResult.doctor_id,
          //   treatmentPlan_id: saveProgressNoteResult.treatmentPlan_id,
          //   appointment_id: saveProgressNoteResult.appointment_id,
          //   progressNote_id: saveProgressNoteResult.progressNote_id,
          // },
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_ADD_FILLED_PROGRESS_NOTE,
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
  updateFilledProgressNote = async (
    req: Request,
    model: UpdateFilledProgressNoteViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let updateProgressNoteResult =
        await FilledProgressNoteModel.findOneAndUpdate(
          { _id: model._id },
          model,
          { new: true }
        );

      if (updateProgressNoteResult) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `progress note updated`,
          type: EHistoryActivityTypeValues.PATIENT,
          type_id: updateProgressNoteResult.clinic_id,
        });
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.UPDATE_SUCCESSFULL,
          // data: {
          //   _id: updateProgressNoteResult._id,
          //   field_data: updateProgressNoteResult.field_data,
          //   clinic_id: updateProgressNoteResult.clinic_id,
          //   doctor_id: updateProgressNoteResult.doctor_id,
          //   treatmentPlan_id: updateProgressNoteResult.treatmentPlan_id,
          //   appointment_id: updateProgressNoteResult.appointment_id,
          //   progressNote_id: updateProgressNoteResult.progressNote_id,
          // },
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_UPDATE_PROGRESS_NOTE,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  deleteFilledProgressNote = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let deleteFilledProgressNoteResult =
        await FilledProgressNoteModel.updateOne(
          { _id: req.params._id },
          { isDeleted: true }
        );
      if (
        deleteFilledProgressNoteResult &&
        deleteFilledProgressNoteResult.modifiedCount > 0
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
            message: errorMessage.ERROR_ON_DELETE_FILLED_PROGRESS_NOTE,
            error: errorMessage.ON_DELETE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  getFilledProgressNote = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let getFilledProgressNoteResult = await FilledProgressNoteModel.findOne({
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
              select: {
                address: 1,
                city: 1,
                branchName: 1,
              },
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
          path: "progressNote_id",
          select: { fields: 1, form_title: 1 },
        },
      ]);
      if (getFilledProgressNoteResult) {
        let updatedData = {
          _id: getFilledProgressNoteResult._id,
          field_data: getFilledProgressNoteResult.field_data,
          //clinic_id: getFilledProgressNoteResult.clinic_id,
          doctor_data: getFilledProgressNoteResult.doctor_id,
          patient_data: <DocumentType<Patients>>(
            getFilledProgressNoteResult.patient_id
          ),
          treatmentPlan_id: getFilledProgressNoteResult.treatmentPlan_id,
          session_narrative: getFilledProgressNoteResult.session_narrative,
          treatment_goal: getFilledProgressNoteResult.treatment_goal,
          appointment_data: getFilledProgressNoteResult.appointment_id,
          progressNote: <DocumentType<ProgressNotes>>(
            getFilledProgressNoteResult.progressNote_id
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
          updatedData.progressNote.fields &&
          updatedData.progressNote.fields.length > 0
        ) {
          if (updatedData.field_data && updatedData.field_data.length > 0) {
            updatedData.progressNote.fields.forEach((d: any, i: number) => {
              let found_obj = updatedData.field_data.find(
                (e) => e.id!.toString() == d._id!.toString()
              );
              if (found_obj) {
                updatedData.progressNote.fields[i].default = found_obj.value;
              } else {
                if (d.input_type == "checkbox") {
                  updatedData.progressNote.fields[i].default = [];
                }
              }
            });
          } else {
            updatedData.progressNote.fields.forEach((d: any, i: number) => {
              if (d.input_type == "checkbox") {
                updatedData.progressNote.fields[i].default = [];
              }
            });
          }
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
            message: errorMessage.ERROR_ON_GET_FILLED_PROGRESS_NOTE,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  listFilledProgressNote = async (
    req: Request,
    model: GetFilledProgressNoteListViewmodel,
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
            _id: 1,
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
      ];

      let condition: any = {
        isDeleted: false,
        //isActive: true,
      };

      // if (model.search) {
      //   let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

      //   condition.type = {
      //     $regex: model.search,
      //     $options: "i",
      //   };
      // }

      if (model.isActive) {
        condition.isActive = model.isActive;
      }

      if (model.clinic_id) {
        condition.clinic_id = model.clinic_id;
      }

      if (model.patient_id) {
        condition.patient_id = model.patient_id;
      }

      let result: mongoose.PaginateResult<any> =
        await FilledProgressNoteModel.paginate(condition, {
          page: defaultPage,
          ...(count > 0 ? { limit: count } : { pagination: false }),
          populate: populateFeilds,

          sort: { createdAt: -1 },
        });

      if (result && result.docs && result.docs.length > 0) {
        let formattedData: any = [];
        result.docs.forEach((e) => {
          let userDetails = <DocumentType<Doctor>>e.doctor_id;

          let apptDetails = <DocumentType<Appointment>>e.appointment_id;

          let providerDetails = <DocumentType<User>>userDetails.user_id;

          formattedData.push({
            _id: e._id,
            appointment_number: apptDetails.appointment_number,
            startDateTime: apptDetails.startDateTime,
            endDateTime: apptDetails.endDateTime,
            provider_first_name: providerDetails.first_name,
            provider_last_name: providerDetails.last_name,
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
            message: errorMessage.FILLED_PROGRESS_NOTE_LIST_NOT_FOUND,
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
          _id: new mongoose.Types.ObjectId(model.progressNote_id!.toString()),
        },
        lastFilledCond = {
          // status: "SAVED",
          // doctor_id: mongoose.Types.ObjectId(doctor_id),
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

      let finalResult = await ProgressNoteModel.aggregate([
        { $match: condition },
        {
          $lookup: {
            from: "filledTreatmentPlan",
            pipeline: [
              { $match: lastFilledCond },
              { $sort: { _id: -1 } },
              { $limit: 1 },
            ],
            as: "lastFilledtreatmentData",
          },
        },
        {
          $unwind: {
            path: "$lastFilledtreatmentData",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: "treatmentplan",
            localField: "lastFilledtreatmentData.treatmentPlan_id",
            foreignField: "_id",
            as: "treatementPlanData",
          },
        },
        {
          $unwind: {
            path: "$treatementPlanData",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: "filledProgressNotes",
            pipeline: [{ $match: apptCond }],
            as: "filledprogressNoteData",
          },
        },
        {
          $unwind: {
            path: "$filledprogressNoteData",
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
            from: "clinic_locations",
            let: {
              location_id: "$appointmentData.location_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$location_id"] },
                },
              },
              {
                $project: {
                  branchName: 1,
                  city: 1,
                  address: 1,
                },
              },
            ],

            //localField: "appointmentData.location_id",
            //foreignField: "_id",
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
            from: "doctor",
            let: {
              doctor_id: "$appointmentData.doctor_id",
            },
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
              { $project: { userData: 1 } },
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
            finalResult[0].filledprogressNoteData &&
            finalResult[0].filledprogressNoteData.field_data.length > 0
          ) {
            finalResult[0].fields.forEach((d: any, i: number) => {
              let found_obj =
                finalResult[0].filledprogressNoteData.field_data.find(
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

        finalResult[0].session_narrative =
          finalResult[0].filledprogressNoteData &&
          finalResult[0].filledprogressNoteData.session_narrative
            ? finalResult[0].filledprogressNoteData.session_narrative
            : null;

        finalResult[0].treatment_goal =
          finalResult[0].filledprogressNoteData &&
          finalResult[0].filledprogressNoteData.treatment_goal
            ? finalResult[0].filledprogressNoteData.treatment_goal
            : null;

        finalResult[0].codes =
          finalResult[0].filledprogressNoteData &&
          finalResult[0].filledprogressNoteData.codes
            ? finalResult[0].filledprogressNoteData.codes
            : null;

        delete finalResult[0].filledprogressNoteData;
        delete finalResult[0].isActive;
        delete finalResult[0].isDeleted;
        delete finalResult[0].saveAsDraft;
        finalResult[0].progress_note_id = finalResult[0]._id;
        //delete finalResult[0].progress_note_id;
        //delete finalResult[0].clinic_id;
        delete finalResult[0].import;

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

  listProgressNoteCheckout = async (
    req: Request,
    model: CheckOutViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let lastFilledCond = {
        saveAsDraft: false,
        clinic_id: new mongoose.Types.ObjectId(model.clinic_id!.toString()),
        patient_id: new mongoose.Types.ObjectId(model.patient_id!.toString()),
        // doctor_id: mongoose.Types.ObjectId(doctor_id), // COMMENTED BY LOVEPREET ON 17-FEB-2023
      };

      // const lastFilledTreatmentPlan = await FilledTreatmentPlan.findOne(lastFilledCond).populate('treatmentPlan_id', 'title')

      const lastFilledTreatmentPlan = await FilledTreatmentPlanModel.aggregate([
        { $match: lastFilledCond },
        {
          $lookup: {
            from: "treatmentplan",
            localField: "treatmentPlan_id",
            foreignField: "_id",
            as: "treatementPlanData",
          },
        },
        {
          $unwind: {
            path: "$treatementPlanData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            title: "$treatementPlanData.form_title",
            treatmentPlan_id: "$treatementPlanData._id",
          },
        },
        { $sort: { _id: -1 } },
        { $limit: 1 },
      ]);

      if (!lastFilledTreatmentPlan.length)
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.NO_TREATMENT_PLAN_FILLED,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };

      let sortObject = {};
      // if (req.body.sortValue && req.body.sortOrder) {
      //   sortObject[req.body.sortValue] = req.body.sortOrder;
      // } else
      sortObject = { _id: -1 };

      let listCond = {
        isActive: true,
        isDeleted: false,
        clinic_id: new mongoose.Types.ObjectId(model.clinic_id!.toString()),
      };

      const data = await ProgressNotesModel.aggregate([
        { $match: listCond },
        {
          $facet: {
            totalCount: [{ $count: "sum" }],
            aggregatedData: [
              {
                $project: {
                  form_title: "$form_title",
                  isActive: "$isActive",
                  isDeleted: "$isDeleted",
                },
              },
              { $sort: sortObject },
              // { $limit: parseInt(skip) + parseInt(count) },
              // { $skip: parseInt(skip) },
            ],
          },
        },
      ]);

      const finalObjectToBeSend = {
        progressNotes: data[0].aggregatedData,
        treatmentPlan: {
          title: lastFilledTreatmentPlan[0].title,
          //graphicalArr: lastFilledTreatmentPlan[0].graphicalArr,
          treatmentPlan_id: lastFilledTreatmentPlan[0].treatmentPlan_id,
        },
      };

      if (finalObjectToBeSend) {
        return {
          status_code: HttpStatus.OK,
          data: finalObjectToBeSend,
          success: true,
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.PROGRESS_NOTE_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new FilledProgressNoteServices();
