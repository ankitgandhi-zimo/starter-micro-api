import { DocumentType } from "@typegoose/typegoose";
import { NextFunction, Request } from "express";
import fs from "fs";
import HttpStatus from "http-status-codes";
import _ from "lodash";
import moment from "moment";
import mongoose from "mongoose";
import path from "path";
import { v4 } from "uuid";
import XlsxPopulate from "xlsx-populate";
import Utility, { IServiceResult1 } from "../../common/common-methods";
import errorMessage from "../../common/erros_message";
import AppointmentModel, { Appointment } from "../../models/appointment.model";
import DoctorCheckoutModel, {
  DoctorCheckout,
} from "../../models/doctor_checkout.model";
import AppTypeModel, {
  AppointmentType,
} from "../../models/appointment_types.model";
import { Clinic } from "../../models/clinic.model";
import FetchDataModel from "../../models/fetch_data.model";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";
import PatientModel, { Patients } from "../../models/patient.model";
import { User } from "../../models/user.model";
import {
  AddAppointmentViewmodel,
  AddRecurringAppointmentViewmodel,
  AddRescheduleAppointmentViewmodel,
  DeclineAppointmentViewmodel,
  DeleteAppointmentViewmodel,
  GetAppointmentListViewmodel,
  UpdateAppointmentViewmodel,
  FetchAppointmentViewmodel,
} from "../../view-models/appointments";
import axios from "axios";
var momentTz = require("moment-timezone");
class AppointmentServices {
  addAppointment = async (
    req: Request,
    model: AddAppointmentViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      model.patient_ids = _.uniq(model.patient_ids);

      // check if appointment book by patient && not verified profile then not authorized to perform this action
      if (model.patient_ids.includes(userDetails!._id!.toString())) {
        let patientDoc = await PatientModel.findOne({
          _id: userDetails._id,
        });

        if (!patientDoc)
          return {
            status_code: HttpStatus.UNAUTHORIZED,
            success: false,
            data: {
              message: errorMessage.PATIENT_DETAILS_NOT_FOUND,
              error: errorMessage.ON_ADD_ERROR,
            },
          };
        if (patientDoc && patientDoc.isVerified === false)
          return {
            status_code: HttpStatus.UNAUTHORIZED,
            success: false,
            data: {
              message: errorMessage.PATIENT_NOT_VERIFIED,
              error: errorMessage.ON_ADD_ERROR,
            },
          };
      }

      //ADDED BY CHARANJIT--START

      let condition = {
        status: { $nin: ["Cancelled", "Declined"] },
        doctor_id: new mongoose.Types.ObjectId(model.doctor_id!.toString()),
        $or: [
          {
            startDateTime: {
              $gte: model.startDateTime,
              $lt: model.endDateTime,
            },
          },
          {
            endDateTime: {
              $gt: model.startDateTime,
              $lte: model.endDateTime,
            },
          },
          {
            // startDateTime: { $lt: model.startDateTime, $lt: model.endDateTime },
            // endDateTime: { $gt: model.startDateTime, $gt: model.endDateTime },

            $and: [
              {
                $expr: {
                  $lt: ["$startDateTime", model.startDateTime],
                },
              },
              {
                $expr: {
                  $lt: ["$startDateTime", model.endDateTime],
                },
              },
              {
                $expr: {
                  $gt: ["$endDateTime", model.startDateTime],
                },
              },
              {
                $expr: {
                  $gt: ["$endDateTime", model.endDateTime],
                },
              },
            ],
          },
        ],
        isDeleted: false,
      };

      let isInbetween = await AppointmentModel.find(condition).lean();

      if (isInbetween.length > 0 && isInbetween[0].title != "Unavailable") {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.appointmentMsg.AlreadyAppointment,
            error: errorMessage.ON_ADD_ERROR,
          },
        };
      }

      if (isInbetween.length > 0 && isInbetween[0].title == "Unavailable") {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.appointmentMsg.providerUnavailable,
            error: errorMessage.ON_ADD_ERROR,
          },
        };
      }

      //ADDED BY CHARANJIT --END

      let modelToSave = <Appointment>model;

      modelToSave.appointment_number = Math.floor(
        100000000 + Math.random() * 900000000
      ).toString();
      modelToSave.createdby_id = userDetails._id;
      let appTypeDetails = await AppTypeModel.findById(
        model.appointmentType_id
      );
      let appointmentObjects: any = [];
      if (appTypeDetails && appTypeDetails.isMultiPatient) {
        if (model.patient_ids.length > appTypeDetails.number_of_patients)
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message:
                errorMessage.NUMBER_OF_PATIENTS_EXCEED_APPOINTMENT +
                `${appTypeDetails.number_of_patients}`,
              error: errorMessage.ON_ADD_ERROR,
            },
          };
        else {
          modelToSave.groupId = v4();
          model.patient_ids.forEach((patientID) => {
            let appObj = {
              ...modelToSave,
            };

            appObj.patient_id = patientID;
            appointmentObjects.push(appObj);
          });
        }
      } else {
        modelToSave.patient_id = model.patient_ids[0];
        appointmentObjects.push(modelToSave);
      }

      let response = await AppointmentModel.insertMany(appointmentObjects);

      if (response && response.length > 0) {
        let HistoryObjectArray: any = [];
        appointmentObjects.forEach((obj: any) => {
          let temp: any = {
            user_id: userDetails._id,
            patient_id: obj.patient_id,

            doctor_id: obj.doctor_id,
            type_id: obj.patient_id,
            description: `appointment added successfully`,
            type: EHistoryActivityTypeValues.APPOINTMENT,
          };
          HistoryObjectArray.push(temp);
        });

        let addHistory = await HistoryModel.insertMany(HistoryObjectArray);

        return {
          status_code: HttpStatus.OK,
          success: true,
          data: response,
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.ERROR_ADD_APPOINTMENT,
            error: errorMessage.ON_ADD_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  updateAppointmentNew = async (
    req: Request,
    model: UpdateAppointmentViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let updateionDone = false;
      let userDetails = <DocumentType<User>>req.user;

      let foundAppointments = await AppointmentModel.find({
        appointment_number: model.appointment_number,
      });
      if (foundAppointments && foundAppointments.length > 0) {
        //ADDED BY CHARANJIT--START
        if (model.startDateTime && model.endDateTime) {
          let condition = {
            status: { $nin: ["Cancelled", "Declined"] },
            doctor_id: new mongoose.Types.ObjectId(model.doctor_id!.toString()),
            $or: [
              {
                startDateTime: {
                  $gte: model.startDateTime,
                  $lt: model.endDateTime,
                },
              },
              {
                endDateTime: {
                  $gt: model.startDateTime,
                  $lte: model.endDateTime,
                },
              },
              {
                // startDateTime: { $lt: model.startDateTime, $lt: model.endDateTime },
                // endDateTime: { $gt: model.startDateTime, $gt: model.endDateTime },

                $and: [
                  {
                    $expr: {
                      $lt: ["$startDateTime", model.startDateTime],
                    },
                  },
                  {
                    $expr: {
                      $lt: ["$startDateTime", model.endDateTime],
                    },
                  },
                  {
                    $expr: {
                      $gt: ["$endDateTime", model.startDateTime],
                    },
                  },
                  {
                    $expr: {
                      $gt: ["$endDateTime", model.endDateTime],
                    },
                  },
                ],
              },
            ],
            isDeleted: false,
          };

          let isInbetween = await AppointmentModel.find(condition).lean();

          if (isInbetween.length > 0 && isInbetween[0].title != "Unavailable") {
            return {
              status_code: HttpStatus.BAD_REQUEST,
              success: false,
              data: {
                message: errorMessage.appointmentMsg.AlreadyAppointment,
                error: errorMessage.ON_ADD_ERROR,
              },
            };
          }

          if (isInbetween.length > 0 && isInbetween[0].title == "Unavailable") {
            return {
              status_code: HttpStatus.BAD_REQUEST,
              success: false,
              data: {
                message: errorMessage.appointmentMsg.providerUnavailable,
                error: errorMessage.ON_ADD_ERROR,
              },
            };
          }
        }

        //ADDED BY CHARANJIT --END

        let updateApptResult;
        let modelToSave = <Appointment>model;
        modelToSave.appointment_number =
          foundAppointments[0].appointment_number;

        modelToSave.createdby_id = foundAppointments[0].createdby_id;

        if (
          foundAppointments &&
          foundAppointments.length == 1 &&
          !model.appointmentType_id &&
          !model.patient_ids
        ) {
          modelToSave.patient_id = foundAppointments[0].patient_id;

          updateApptResult = await AppointmentModel.updateOne(
            { _id: foundAppointments[0]._id },
            modelToSave
          );

          if (updateApptResult && updateApptResult.modifiedCount > 0) {
            updateionDone = true;
            return {
              status_code: HttpStatus.OK,
              success: true,
              data: true,
            };
          } else {
            return {
              status_code: HttpStatus.BAD_REQUEST,
              success: false,
              data: {
                message: errorMessage.ERROR_UPDATE_APPOINTMENT,
                error: errorMessage.ON_UPDATE_ERROR,
              },
            };
          }
        } else {
          modelToSave.groupId = foundAppointments[0].groupId;
          if (model.patient_ids) {
            model.patient_ids = _.uniq(model.patient_ids);
          }
          let appTypeID = model.appointmentType_id
            ? model.appointmentType_id
            : foundAppointments[0].appointmentType_id;
          let appTypeDetails = await AppTypeModel.findById(appTypeID);
          let numberOfPatients = model.patient_ids
            ? model.patient_ids.length
            : foundAppointments.length;

          if (
            appTypeDetails &&
            appTypeDetails.isMultiPatient &&
            numberOfPatients > appTypeDetails.number_of_patients
          ) {
            return {
              status_code: HttpStatus.BAD_REQUEST,
              success: false,
              data: {
                message:
                  errorMessage.NUMBER_OF_PATIENTS_EXCEED_APPOINTMENT +
                  `${appTypeDetails.number_of_patients}`,
                error: errorMessage.ON_UPDATE_ERROR,
              },
            };
          } else if (
            appTypeDetails &&
            !appTypeDetails.isMultiPatient &&
            numberOfPatients > 1
          ) {
            return {
              status_code: HttpStatus.BAD_REQUEST,
              success: false,
              data: {
                message: errorMessage.MULTIPLE_PATIENTS_NOT_ALLOWED,
                error: errorMessage.ON_UPDATE_ERROR,
              },
            };
          } else {
            let appointmentObjects: any = [];
            let removeExistingPatientsAppt = await AppointmentModel.deleteMany({
              appointment_number: model.appointment_number,
            });
            console.log(model.patient_ids, "model.patient_ids");
            model.patient_ids.forEach((patientID, i) => {
              let temp: any = { ...modelToSave };
              modelToSave;

              temp.patient_id = patientID; //model.patient_ids[i];

              appointmentObjects.push(temp);
            });

            let addApointmentsResults = await AppointmentModel.insertMany(
              appointmentObjects
            );
            if (addApointmentsResults) {
              let HistoryObjectArray: any = [];
              appointmentObjects.forEach((obj: any) => {
                let temp: any = {
                  user_id: userDetails._id,
                  patient_id: obj.patient_id,

                  doctor_id: obj.doctor_id,

                  description: `appointment updated successfully`,
                  type: EHistoryActivityTypeValues.APPOINTMENT,
                  type_id: obj.patient_id,
                };
                HistoryObjectArray.push(temp);
              });

              let addHistory = await HistoryModel.insertMany(
                HistoryObjectArray
              );

              return {
                status_code: HttpStatus.OK,
                success: true,
                data: errorMessage.UPDATE_SUCCESSFULL,
              };
            } else {
              return {
                status_code: HttpStatus.BAD_REQUEST,
                success: false,
                data: {
                  message: errorMessage.ERROR_UPDATE_APPOINTMENT,
                  error: errorMessage.ON_UPDATE_ERROR,
                },
              };
            }
          }
        }
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.APPOINTMENT_DETAILS_NOT_FOUND,
            error: errorMessage.ON_UPDATE_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  getAppointmentDetails = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let foundAppointments = await AppointmentModel.find({
        appointment_number: req.params.appointment_number,
        isDeleted: false,
      }).populate([
        { path: "clinic_id", select: { clinic_name: 1 } },

        {
          path: "doctor_id",
          select: { experience: 1, user_id: 1 },
          populate: {
            path: "user_id",
            select: { first_name: 1, last_name: 1 },
          },
        },

        {
          path: "patient_id",

          populate: [
            { path: "state", select: { stateName: 1 } },

            { path: "country", select: { countryName: 1 } },
          ],
          // select: {
          //   first_name: 1,
          //   middle_name: 1,
          //   last_name: 1,
          //   patientId: 1,
          // },
        },
        {
          path: "createdby_id",
          select: { first_name: 1, last_name: 1 },
        },

        {
          path: "location_id",
          select: {
            city: 1,
            address: 1,
            postal_code: 1,
          },
        },

        {
          path: "appointmentType_id",
          select: {},
        },

        {
          path: "declined.user_id",
          select: { first_name: 1, last_name: 1 },
        },
      ]);

      if (foundAppointments && foundAppointments.length > 0) {
        foundAppointments.forEach((appt) => {
          if (appt.patient_id) {
            let patientDoc = <DocumentType<Patients>>appt.patient_id;

            patientDoc.first_name = Utility.getDecryptText(
              patientDoc.first_name
            );
            patientDoc.middle_name = Utility.getDecryptText(
              patientDoc.middle_name
            );
            patientDoc.last_name = Utility.getDecryptText(patientDoc.last_name);
            appt.title = Utility.getDecryptText(appt.title);
          }
        });

        return {
          status_code: HttpStatus.OK,
          success: true,
          data: foundAppointments,
        };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.APPOINTMENT_DETAILS_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  getAppointmentDetailsWithId = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let foundAppointments = await AppointmentModel.findOne({
        _id: new mongoose.Types.ObjectId(req.params._id),
        isDeleted: false,
      }).populate([
        { path: "clinic_id", select: { clinic_name: 1 } },

        {
          path: "doctor_id",
          select: { experience: 1, user_id: 1 },
          populate: {
            path: "user_id",
            select: { first_name: 1, last_name: 1 },
          },
        },

        {
          path: "patient_id",

          populate: [
            { path: "state", select: { stateName: 1 } },

            {
              path: "country",
              select: { countryName: 1 },
            },
          ],
          // select: {
          //   first_name: 1,
          //   middle_name: 1,
          //   last_name: 1,
          //   patientId: 1,
          // },
        },
        {
          path: "createdby_id",
          select: { first_name: 1, last_name: 1 },
        },

        {
          path: "location_id",
          select: {
            city: 1,
            address: 1,
            postal_code: 1,
          },
        },

        {
          path: "appointmentType_id",
          select: {},
        },

        {
          path: "declined.user_id",
          select: { first_name: 1, last_name: 1 },
        },
      ]);

      if (foundAppointments) {
        if (foundAppointments.patient_id) {
          let patientDoc = <DocumentType<Patients>>foundAppointments.patient_id;

          patientDoc.first_name = patientDoc.first_name
            ? Utility.getDecryptText(patientDoc.first_name)
            : "";
          patientDoc.middle_name = patientDoc.middle_name
            ? Utility.getDecryptText(patientDoc.middle_name)
            : "";
          patientDoc.last_name = patientDoc.last_name
            ? Utility.getDecryptText(patientDoc.last_name)
            : "";

          patientDoc.title = patientDoc.title
            ? Utility.getDecryptText(patientDoc.title)
            : "";

          // foundAppointments.title = foundAppointments.title?Utility.getDecryptText(
          //   foundAppointments.title
          // ):"";
        }

        return {
          status_code: HttpStatus.OK,
          success: true,
          data: foundAppointments,
        };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.APPOINTMENT_DETAILS_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  deleteAppointmentDetails = async (
    req: Request,
    model: DeleteAppointmentViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let foundAppointMent = await AppointmentModel.findOne({
        _id: model._id,
        isDeleted: false,
      });

      if (foundAppointMent) {
        let condition = {};

        if (
          model.deleteSeries === "true" &&
          foundAppointMent.recurring &&
          foundAppointMent.recurring.number
        ) {
          condition = {
            "recurring.number": foundAppointMent!.recurring!.number,
          };
        } else
          condition = {
            _id: model._id,
          };
        let deleteAppResult = await AppointmentModel.update(
          condition,

          { isActive: false, isDeleted: true }
        );

        if (deleteAppResult && deleteAppResult.modifiedCount > 0) {
          // Add Activity History
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `appointment deleted successfully`,
            type: EHistoryActivityTypeValues.APPOINTMENT,
            type_id: foundAppointMent.patient_id,
          });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.DELETE_SUCCESSFULL,
          };
        } else
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.ERROR_DELETE_APPOINTMENT,
              error: errorMessage.ON_DELETE_ERROR,
            },
          };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.APPOINTMENT_DETAILS_NOT_FOUND,
            error: errorMessage.ON_DELETE_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  getAppointmentList = async (
    req: Request,
    model: GetAppointmentListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;
      let populateFeilds: any = [
        {
          path: "location_id",
          select: ["city", "address", "postal_code"],
        },

        {
          path: "appointmentType_id",
          select: ["duration", "number_of_patients", "type"],
        },
        {
          path: "patient_id",
          select: [
            "first_name",
            "middle_name",
            "last_name",
            "patientId",
            "title",
          ],
        },
        { path: "clinic_id", select: ["clinic_name"] },

        {
          path: "doctor_id",
          select: ["experience"],
          populate: {
            path: "user_id",
            select: { first_name: 1, last_name: 1 },
          },
        },
      ];

      let condition: any = {
        // isDeleted: false,
        status: { $ne: "Unavailability" },
      };
      if (model.hasDocument === true) {
        condition.document = { $ne: null };
      }
      if (model.patient_id) {
        condition.patient_id = new mongoose.Types.ObjectId(model.patient_id);
      }
      if (model.clinic_id) {
        condition.clinic_id = new mongoose.Types.ObjectId(
          model.clinic_id.toString()
        );
      }
      if (model.appointmentType_id) {
        condition.appointmentType_id = model.appointmentType_id;
      }

      if (model.status) {
        condition.status = model.status;
      }

      if (
        "isDeleted" in model &&
        model.isDeleted !== undefined &&
        model.isDeleted != null
      ) {
        condition.isDeleted = model.isDeleted;
      }

      if (model.clinic_id) {
        condition.clinic_id = model.clinic_id;
      }

      // if ("isDeleted" in model) {
      if (model.isDeleted == true || model.isDeleted == false) {
        condition.isDeleted = model.isDeleted;
      }
      if (model.startDateTime) {
        let startTime = new Date(model.startDateTime);
        startTime.setHours(0, 0, 0, 0);
        let endTime = new Date(model.startDateTime);
        endTime.setHours(23, 59, 59, 999);
        condition.startDateTime = {
          $gte: startTime,
          $lte: endTime,
        };
      }
      if (model.endDateTime) {
        let startTime = new Date(model.endDateTime);
        startTime.setHours(0, 0, 0, 0);
        let endTime = new Date(model.endDateTime);
        endTime.setHours(23, 59, 59, 999);
        condition.endDateTime = {
          $gte: startTime,
          $lte: endTime,
        };
      }

      defaultPage = model.pageNumber ? model.pageNumber : 1;
      count = model.pageSize ? model.pageSize : 50;
      let result: mongoose.PaginateResult<any> =
        await AppointmentModel.paginate(
          // {
          condition,
          // options: {
          //   projection: {
          //     createdAt: 0,
          //     updatedAt: 0,
          //     __v: 0,
          //   },
          // },
          // },
          {
            page: defaultPage,
            ...(count > 0 ? { limit: count } : { pagination: false }),
            populate: populateFeilds,

            // sort: { createdAt: -1 },
            sort: { startDateTime: 1 },
          }
        );
      let finalResponse: any = [];
      if (result && result.docs && result.docs.length > 0) {
        result.docs.forEach((tempObj: any, i, theArray) => {
          if (tempObj.patient_id) {
            let patientDoc: any = {
              ...tempObj.patient_id.toObject(),
            };
            if (patientDoc.first_name)
              patientDoc.first_name = Utility.getDecryptText(
                patientDoc.first_name
              );

            if (patientDoc.middle_name)
              patientDoc.middle_name = Utility.getDecryptText(
                patientDoc.middle_name
              );
            if (patientDoc.last_name)
              patientDoc.last_name = Utility.getDecryptText(
                patientDoc.last_name
              );
            if (patientDoc.title)
              patientDoc.title = Utility.getDecryptText(patientDoc.title);
            tempObj.patient_id = patientDoc;
            finalResponse.push(tempObj);
          }
        });

        let obj = {
          data: finalResponse, //result.docs,
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
            message: errorMessage.APPOINTMENT_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  getAppointmentListWithoutPagination = async (
    req: Request,
    model: GetAppointmentListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let condition: any = {
        isDeleted: false,
        appointmentType_id: model.appointmentType_id,
      };
      let response = await AppointmentModel.find(
        { condition },
        { startDateTime: 1, endDateTime: 1, title: 1 }
      );
      if (response && response.length > 0) {
        let obj = {
          data: response,
          // count: result.totalDocs,
          totalDocs: response.length,
          pageNumber: 1,
          pageSize: response.length,
          totalPages: 1,
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
            message: errorMessage.APPOINTMENT_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  addRecurringAppointment = async (
    req: Request,
    model: AddRecurringAppointmentViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      const patientData = await PatientModel.aggregate([
        { $match: { _id: model.patient_id } },
        { $project: { isVerified: 1 } },
      ]);
      // isVerified = patientData[0].isVerified;

      // if (isVerified == false)
      //   return res.json(
      //     Response(constants.statusCode.unauth, constants.patientMsg.notVerified)
      //   );

      const apptCommonFields = {
        duration: model.duration,
        clinic_id: model.clinic_id,
        doctor_id: model.doctor_id,
        visitType: model.visitType,
        patient_id: model.patient_id,
        location_id: model.location_id,
        createdby_id: userDetails._id,
        title: "Booked",
        appointment_type: model.appointment_type,
        appointmentType_id: model.appointmentType_id,
        status: "Accepted",
        recurring: { status: true, number: v4() },
      };

      const apptArr: any = [],
        timingArr: any = [],
        createApptArr = (startDate: any) => {
          let apptEndDate: any;
          const appointment_number = Math.floor(
            100000000 + Math.random() * 900000000
          );

          model.startTime < model.endTime
            ? (apptEndDate = moment.utc(startDate).format("YYYY-MM-DD"))
            : (apptEndDate = moment
                .utc(startDate)
                .add(1, "day")
                .format("YYYY-MM-DD"));

          const endDateTime = new Date(
              momentTz
                .tz(`${apptEndDate}T${model.endTime}`, model.timezone)
                .utc()
            ),
            startDateTime = momentTz
              .tz(
                `${moment.utc(startDate).format("YYYY-MM-DD")}T${
                  model.startTime
                }`,
                model.timezone
              )
              .utc(),
            apptObj = {
              startDateTime,
              endDateTime,
              appointment_number,
              ...apptCommonFields,
            };

          timingArr.push(
            {
              endDateTime: {
                $gt: startDateTime,
                $lte: endDateTime,
              },
            },
            {
              startDateTime: {
                $gte: startDateTime,
                $lt: endDateTime,
              },
            },
            {
              startDateTime: {
                $lt: startDateTime,
                //$lt: endDateTime,
              },
              endDateTime: {
                $gt: startDateTime,
                //$gt: endDateTime,
              },
            }
          );
          apptArr.push(apptObj);
        };

      if (model.end.type === "ENDBY") {
        /** End date will be given */
        if (!model.end.value)
          return {
            status_code: HttpStatus.UNAUTHORIZED,
            success: false,
            data: {
              message: errorMessage.reccuring.endDateReq,
              error: errorMessage.ON_ADD_ERROR,
            },
          };
        const recurringEndDate = moment.utc(model.end.value);
        if (model.end.value <= model.startDate)
          return {
            status_code: HttpStatus.UNAUTHORIZED,
            success: false,
            data: {
              message: errorMessage.reccuring.endDateExceed,
              error: errorMessage.ON_ADD_ERROR,
            },
          };
        switch (model.pattern.type) {
          case "DAILY": {
            if (model.pattern.daily.type === "EVERY") {
              if (!model.pattern.daily.value)
                return {
                  status_code: HttpStatus.UNAUTHORIZED,
                  success: false,
                  data: {
                    message: errorMessage.reccuring.daysValueReq,
                    error: errorMessage.ON_ADD_ERROR,
                  },
                };
              if (
                model.pattern.daily.value < 0 ||
                !Number.isInteger(model.pattern.daily.value)
              )
                return {
                  status_code: HttpStatus.UNAUTHORIZED,
                  success: false,
                  data: {
                    message: errorMessage.reccuring.enterNegValue,
                    error: errorMessage.ON_ADD_ERROR,
                  },
                };
              if (model.pattern.daily.value > 28)
                return {
                  status_code: HttpStatus.UNAUTHORIZED,
                  success: false,
                  data: {
                    message: errorMessage.reccuring.daysLimitExceed,
                    error: errorMessage.ON_ADD_ERROR,
                  },
                };

              while (moment.utc(model.startDate) <= recurringEndDate) {
                createApptArr(model.startDate);
                model.startDate = moment
                  .utc(model.startDate)
                  .add(model.pattern.daily.value, "days")
                  .format("YYYY-MM-DD");
              }
              break;
            } else if (model.pattern.daily.type === "EVERYWEEKDAY") {
              while (moment.utc(model.startDate) <= recurringEndDate) {
                if (
                  moment(model.startDate).weekday() !== 0 &&
                  moment(model.startDate).weekday() !== 6
                )
                  createApptArr(model.startDate);
                model.startDate = moment
                  .utc(model.startDate)
                  .add(1, "day")
                  .format("YYYY-MM-DD");
              }
              break;
            }
          }

          case "WEEKLY": {
            if (model.pattern.weekly.weekdays.length <= 0)
              return {
                status_code: HttpStatus.UNAUTHORIZED,
                success: false,
                data: {
                  message: errorMessage.reccuring.weekdaysReq,
                  error: errorMessage.ON_ADD_ERROR,
                },
              };

            if (model.pattern.weekly.week > 3)
              return {
                status_code: HttpStatus.UNAUTHORIZED,
                success: false,
                data: {
                  message: errorMessage.reccuring.weekdaysLimitExceed,
                  error: errorMessage.ON_ADD_ERROR,
                },
              };

            while (moment.utc(model.startDate) <= recurringEndDate) {
              const startDateWeekDay = moment(model.startDate).weekday();
              if (model.pattern.weekly.weekdays.includes(startDateWeekDay))
                createApptArr(model.startDate);
              if (startDateWeekDay === 6 && model.pattern.weekly.week > 1) {
                const addNumOfDays = (model.pattern.weekly.week - 1) * 8;
                model.startDate = moment
                  .utc(model.startDate)
                  .add(addNumOfDays, "day")
                  .format("YYYY-MM-DD");
              } else
                model.startDate = moment
                  .utc(model.startDate)
                  .add(1, "day")
                  .format("YYYY-MM-DD");
            }
            break;
          }

          case "MONTHLY": {
            if (model.pattern.monthly.type === "DAY") {
              if (!model.pattern.monthly.days.day)
                return {
                  status_code: HttpStatus.UNAUTHORIZED,
                  success: false,
                  data: {
                    message: errorMessage.reccuring.monthValueReq,
                    error: errorMessage.ON_ADD_ERROR,
                  },
                };

              if (
                model.pattern.monthly.days.day < 0 ||
                !Number.isInteger(model.pattern.monthly.days.day) ||
                model.pattern.monthly.days.month < 0 ||
                !Number.isInteger(model.pattern.monthly.days.month)
              )
                return {
                  status_code: HttpStatus.UNAUTHORIZED,
                  success: false,
                  data: {
                    message: errorMessage.reccuring.enterNegValue,
                    error: errorMessage.ON_ADD_ERROR,
                  },
                };

              if (model.pattern.monthly.days.month > 12)
                return {
                  status_code: HttpStatus.UNAUTHORIZED,
                  success: false,
                  data: {
                    message: errorMessage.reccuring.monthLimitExceed,
                    error: errorMessage.ON_ADD_ERROR,
                  },
                };

              if (model.pattern.monthly.days.day > 28)
                return {
                  status_code: HttpStatus.UNAUTHORIZED,
                  success: false,
                  data: {
                    message: errorMessage.reccuring.daysLimitExceed,
                    error: errorMessage.ON_ADD_ERROR,
                  },
                };

              const tempStartDate = moment
                .utc(model.startDate)
                .set("date", model.pattern.monthly.days.day)
                .format("YYYY-MM-DD");
              if (model.startDate <= tempStartDate)
                model.startDate = tempStartDate;
              else
                model.startDate = moment
                  .utc(model.startDate)
                  .set("date", model.pattern.monthly.days.day)
                  .add(1, "month")
                  .format("YYYY-MM-DD");
              while (moment.utc(model.startDate) <= recurringEndDate) {
                createApptArr(model.startDate);
                model.startDate = moment
                  .utc(model.startDate)
                  .add(model.pattern.monthly.days.month, "months")
                  .format("YYYY-MM-DD");
              }
              break;
            } else if (model.pattern.monthly.type === "SPECIFICDAY") {
              if (!model.pattern.monthly.specificDay.whichDayType)
                return {
                  status_code: HttpStatus.UNAUTHORIZED,
                  success: false,
                  data: {
                    message: errorMessage.reccuring.whichDayReq,
                    error: errorMessage.ON_ADD_ERROR,
                  },
                };

              if (!model.pattern.monthly.specificDay.whichWeekDay)
                return {
                  status_code: HttpStatus.UNAUTHORIZED,
                  success: false,
                  data: {
                    message: errorMessage.reccuring.weekDayReq,
                    error: errorMessage.ON_ADD_ERROR,
                  },
                };

              if (
                model.pattern.monthly.specificDay.month < 0 ||
                !Number.isInteger(model.pattern.monthly.specificDay.month)
              )
                return {
                  status_code: HttpStatus.UNAUTHORIZED,
                  success: false,
                  data: {
                    message: errorMessage.reccuring.enterNegValue,
                    error: errorMessage.ON_ADD_ERROR,
                  },
                };

              if (model.pattern.monthly.specificDay.month > 12)
                return {
                  status_code: HttpStatus.UNAUTHORIZED,
                  success: false,
                  data: {
                    message: errorMessage.reccuring.monthLimitExceed,
                    error: errorMessage.ON_ADD_ERROR,
                  },
                };

              const getSpecificDay = (date: any) => {
                let startDate = moment(date)
                  .startOf("month")
                  .subtract(1, "day");
                const endDate = moment(date).endOf("month"),
                  endDateNum = parseInt(endDate.format("DD")),
                  dateArr: any = [];
                for (let i = 0; i < endDateNum; i++) {
                  startDate = startDate.add(1, "day");
                  const weekDay = startDate.format("dddd");
                  if (
                    weekDay == model.pattern.monthly.specificDay.whichWeekDay
                  ) {
                    dateArr.push(startDate.format("YYYY-MM-DD"));
                    break;
                  }
                }
                while (startDate <= endDate) {
                  !dateArr.includes(startDate.format("YYYY-MM-DD")) &&
                    dateArr.push(startDate.format("YYYY-MM-DD"));
                  startDate = startDate.add(7, "days");
                }
                if (model.pattern.monthly.specificDay.whichDayType == "LAST")
                  return dateArr[dateArr.length - 1];
                else
                  return dateArr[
                    parseInt(model.pattern.monthly.specificDay.whichDayType) - 1
                  ];
              };
              const tempStartDate = getSpecificDay(model.startDate);
              if (model.startDate <= tempStartDate)
                model.startDate = tempStartDate;
              else
                model.startDate = getSpecificDay(
                  moment
                    .utc(model.startDate)
                    .add(model.pattern.monthly.specificDay.month, "month")
                );
              while (moment.utc(model.startDate) <= recurringEndDate) {
                createApptArr(model.startDate);

                model.startDate = moment
                  .utc(model.startDate)
                  .add(model.pattern.monthly.specificDay.month, "month")
                  .toString(); /// Remove .toString();
                model.startDate = getSpecificDay(model.startDate);
              }
              break;
            }
          }
        }
      } else if (model.end.type === "ENDAFTER") {
        /** Number of appointment will be given */
        const numOfAppt = model.end.value;
        if (!numOfAppt || numOfAppt <= 1 || numOfAppt > 20)
          return {
            status_code: HttpStatus.UNAUTHORIZED,
            success: false,
            data: {
              message: errorMessage.reccuring.numOfApptReq,
              error: errorMessage.ON_ADD_ERROR,
            },
          };

        switch (model.pattern.type) {
          case "DAILY": {
            if (model.pattern.daily.type === "EVERY") {
              if (!model.pattern.daily.value)
                return {
                  status_code: HttpStatus.UNAUTHORIZED,
                  success: false,
                  data: {
                    message: errorMessage.reccuring.daysValueReq,
                    error: errorMessage.ON_ADD_ERROR,
                  },
                };

              if (
                model.pattern.daily.value < 0 ||
                !Number.isInteger(model.pattern.daily.value)
              )
                return {
                  status_code: HttpStatus.UNAUTHORIZED,
                  success: false,
                  data: {
                    message: errorMessage.reccuring.enterNegValue,
                    error: errorMessage.ON_ADD_ERROR,
                  },
                };

              if (model.pattern.daily.value > 28)
                return {
                  status_code: HttpStatus.UNAUTHORIZED,
                  success: false,
                  data: {
                    message: errorMessage.reccuring.daysLimitExceed,
                    error: errorMessage.ON_ADD_ERROR,
                  },
                };
              while (apptArr.length < numOfAppt) {
                createApptArr(model.startDate);
                model.startDate = moment
                  .utc(model.startDate)
                  .add(model.pattern.daily.value, "days")
                  .format("YYYY-MM-DD");
              }

              break;
            } else if (model.pattern.daily.type === "EVERYWEEKDAY") {
              while (apptArr.length < numOfAppt) {
                if (
                  moment(model.startDate).weekday() !== 0 &&
                  moment(model.startDate).weekday() !== 6
                )
                  createApptArr(model.startDate);

                model.startDate = moment
                  .utc(model.startDate)
                  .add(1, "day")
                  .format("YYYY-MM-DD");
              }

              break;
            }
          }

          case "WEEKLY": {
            if (model.pattern.weekly.weekdays.length <= 0)
              return {
                status_code: HttpStatus.UNAUTHORIZED,
                success: false,
                data: {
                  message: errorMessage.reccuring.weekdaysReq,
                  error: errorMessage.ON_ADD_ERROR,
                },
              };
            if (model.pattern.weekly.week > 3)
              return {
                status_code: HttpStatus.UNAUTHORIZED,
                success: false,
                data: {
                  message: errorMessage.reccuring.weekdaysLimitExceed,
                  error: errorMessage.ON_ADD_ERROR,
                },
              };
            while (apptArr.length < numOfAppt) {
              const startDateWeekDay = moment(model.startDate).weekday();
              if (model.pattern.weekly.weekdays.includes(startDateWeekDay))
                createApptArr(model.startDate);

              if (startDateWeekDay === 6 && model.pattern.weekly.week > 1) {
                const addNumOfDays = (model.pattern.weekly.week - 1) * 8;
                model.startDate = moment
                  .utc(model.startDate)
                  .add(addNumOfDays, "day")
                  .format("YYYY-MM-DD");
              } else
                model.startDate = moment
                  .utc(model.startDate)
                  .add(1, "day")
                  .format("YYYY-MM-DD");
            }
            break;
          }

          case "MONTHLY": {
            if (model.pattern.monthly.type === "DAY") {
              if (!model.pattern.monthly.days.day)
                return {
                  status_code: HttpStatus.UNAUTHORIZED,
                  success: false,
                  data: {
                    message: errorMessage.reccuring.monthValueReq,
                    error: errorMessage.ON_ADD_ERROR,
                  },
                };
              if (
                model.pattern.monthly.days.day < 0 ||
                !Number.isInteger(model.pattern.monthly.days.day) ||
                model.pattern.monthly.days.month < 0 ||
                !Number.isInteger(model.pattern.monthly.days.month)
              )
                return {
                  status_code: HttpStatus.UNAUTHORIZED,
                  success: false,
                  data: {
                    message: errorMessage.reccuring.enterNegValue,
                    error: errorMessage.ON_ADD_ERROR,
                  },
                };
              if (model.pattern.monthly.days.month > 12)
                return {
                  status_code: HttpStatus.UNAUTHORIZED,
                  success: false,
                  data: {
                    message: errorMessage.reccuring.monthLimitExceed,
                    error: errorMessage.ON_ADD_ERROR,
                  },
                };
              if (model.pattern.monthly.days.day > 28)
                return {
                  status_code: HttpStatus.UNAUTHORIZED,
                  success: false,
                  data: {
                    message: errorMessage.reccuring.daysLimitExceed,
                    error: errorMessage.ON_ADD_ERROR,
                  },
                };
              const tempStartDate = moment
                .utc(model.startDate)
                .set("date", model.pattern.monthly.days.day)
                .format("YYYY-MM-DD");

              if (model.startDate <= tempStartDate)
                model.startDate = tempStartDate;
              else
                model.startDate = moment
                  .utc(model.startDate)
                  .set("date", model.pattern.monthly.days.day)
                  .add(1, "month")
                  .format("YYYY-MM-DD");

              while (apptArr.length < numOfAppt) {
                createApptArr(model.startDate);
                model.startDate = moment
                  .utc(model.startDate)
                  .add(model.pattern.monthly.days.month, "months")
                  .format("YYYY-MM-DD");
              }

              break;
            } else if (model.pattern.monthly.type === "SPECIFICDAY") {
              if (!model.pattern.monthly.specificDay.whichDayType)
                return {
                  status_code: HttpStatus.UNAUTHORIZED,
                  success: false,
                  data: {
                    message: errorMessage.reccuring.whichDayReq,
                    error: errorMessage.ON_ADD_ERROR,
                  },
                };
              if (!model.pattern.monthly.specificDay.whichWeekDay)
                return {
                  status_code: HttpStatus.UNAUTHORIZED,
                  success: false,
                  data: {
                    message: errorMessage.reccuring.weekDayReq,
                    error: errorMessage.ON_ADD_ERROR,
                  },
                };
              if (
                model.pattern.monthly.specificDay.month < 0 ||
                !Number.isInteger(model.pattern.monthly.specificDay.month)
              )
                return {
                  status_code: HttpStatus.UNAUTHORIZED,
                  success: false,
                  data: {
                    message: errorMessage.reccuring.enterNegValue,
                    error: errorMessage.ON_ADD_ERROR,
                  },
                };
              if (model.pattern.monthly.specificDay.month > 12)
                return {
                  status_code: HttpStatus.UNAUTHORIZED,
                  success: false,
                  data: {
                    message: errorMessage.reccuring.monthLimitExceed,
                    error: errorMessage.ON_ADD_ERROR,
                  },
                };
              const getSpecificDay = (date: any) => {
                let startDate = moment(date)
                  .startOf("month")
                  .subtract(1, "day");
                const endDate = moment(date).endOf("month");
                const endDateNum = parseInt(endDate.format("DD"));
                const dateArr: any = [];

                for (let i = 0; i < endDateNum; i++) {
                  startDate = startDate.add(1, "day");
                  const weekDay = startDate.format("dddd");

                  if (
                    weekDay == model.pattern.monthly.specificDay.whichWeekDay
                  ) {
                    dateArr.push(startDate.format("YYYY-MM-DD"));
                    break;
                  }
                }

                while (startDate <= endDate) {
                  !dateArr.includes(startDate.format("YYYY-MM-DD")) &&
                    dateArr.push(startDate.format("YYYY-MM-DD"));
                  startDate = startDate.add(7, "days");
                }

                if (model.pattern.monthly.specificDay.whichDayType == "LAST")
                  return dateArr[dateArr.length - 1];
                else
                  return dateArr[
                    parseInt(model.pattern.monthly.specificDay.whichDayType) - 1
                  ];
              };

              const tempStartDate = getSpecificDay(model.startDate);

              if (model.startDate <= tempStartDate)
                model.startDate = tempStartDate;
              else
                model.startDate = getSpecificDay(
                  moment
                    .utc(model.startDate)
                    .add(model.pattern.monthly.specificDay.month, "month")
                );

              while (apptArr.length < numOfAppt) {
                createApptArr(model.startDate);
                model.startDate = moment
                  .utc(model.startDate)
                  .add(model.pattern.monthly.specificDay.month, "month")
                  .toString(); /// Remove .toString();
                model.startDate = getSpecificDay(model.startDate);
              }

              break;
            }
          }
        }
      }

      if (apptArr.length === 0)
        return {
          status_code: HttpStatus.UNAUTHORIZED,
          success: false,
          data: {
            message: errorMessage.reccuring.noApptCreated,
            error: errorMessage.ON_ADD_ERROR,
          },
        };

      const unavailabileArr = [];

      let apptCondition = {
          $or: timingArr,
          isDeleted: false,
          status: { $nin: ["Cancelled", "Declined"] },
          doctor_id: model.doctor_id,
        },
        hasAppointment = await AppointmentModel.find(apptCondition).lean();

      if (hasAppointment.length) {
        let appointment = false,
          unavailabile = false;

        for (let index = 0; index < hasAppointment.length; index++) {
          const element = hasAppointment[index];
          if (element.status == "Unavailability") {
            if (element.location_id == model.location_id) {
              unavailabile = true;
              break;
            }
          } else {
            appointment = true;
            break;
          }
        }

        if (appointment == true)
          return {
            status_code: HttpStatus.UNAUTHORIZED,
            success: false,
            data: {
              message:
                errorMessage.reccuring
                  .AlreadyAppointment /*,{ hasAppointment, apptArr }*/,
              error: errorMessage.ON_ADD_ERROR,
            },
          };

        if (unavailabile == true)
          return {
            status_code: HttpStatus.UNAUTHORIZED,
            success: false,
            data: {
              message:
                errorMessage.reccuring
                  .doctorUnavailabile /*,{ unavailabileArr, apptArr }*/,
              error: errorMessage.ON_ADD_ERROR,
            },
          };
      }

      let isRecurringCreated = await AppointmentModel.insertMany(apptArr);

      if (isRecurringCreated) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.reccuring.createdSucc,
        };
      } else
        return {
          status_code: HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          data: {
            message: errorMessage.INTERNAL_SERVER_ERROR,
            error: errorMessage.ON_ADD_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  //Reschedule Appointment

  rescheduleAppointment = async (
    req: Request,
    model: AddRescheduleAppointmentViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let foundAppointMent = await AppointmentModel.findById(
        model.appointment_id
      ).populate([
        {
          path: "patient_id",
          select: { isVerified: 1 },
        },
        {
          path: "clinic_id",
          select: { clinicPolicy: 1 },
        },
      ]);

      if (!foundAppointMent)
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.appointmentMsg.apptNotFound,
            error: errorMessage.ON_UPDATE_ERROR,
          },
        };
      else {
        // check clinic allowed to reschedule appoint or not

        //ADDED BY CHARANJIT--START
        if (model.startDateTime && model.endDateTime) {
          let condition = {
            status: { $nin: ["Cancelled", "Declined"] },
            doctor_id: new mongoose.Types.ObjectId(model.doctor_id!.toString()),
            $or: [
              {
                startDateTime: {
                  $gte: model.startDateTime,
                  $lt: model.endDateTime,
                },
              },
              {
                endDateTime: {
                  $gt: model.startDateTime,
                  $lte: model.endDateTime,
                },
              },
              {
                // startDateTime: { $lt: model.startDateTime, $lt: model.endDateTime },
                // endDateTime: { $gt: model.startDateTime, $gt: model.endDateTime },

                $and: [
                  {
                    $expr: {
                      $lt: ["$startDateTime", model.startDateTime],
                    },
                  },
                  {
                    $expr: {
                      $lt: ["$startDateTime", model.endDateTime],
                    },
                  },
                  {
                    $expr: {
                      $gt: ["$endDateTime", model.startDateTime],
                    },
                  },
                  {
                    $expr: {
                      $gt: ["$endDateTime", model.endDateTime],
                    },
                  },
                ],
              },
            ],
            isDeleted: false,
          };

          let isInbetween = await AppointmentModel.find(condition).lean();

          if (isInbetween.length > 0 && isInbetween[0].title != "Unavailable") {
            return {
              status_code: HttpStatus.BAD_REQUEST,
              success: false,
              data: {
                message: errorMessage.appointmentMsg.AlreadyAppointment,
                error: errorMessage.ON_ADD_ERROR,
              },
            };
          }

          if (isInbetween.length > 0 && isInbetween[0].title == "Unavailable") {
            return {
              status_code: HttpStatus.BAD_REQUEST,
              success: false,
              data: {
                message: errorMessage.appointmentMsg.providerUnavailable,
                error: errorMessage.ON_ADD_ERROR,
              },
            };
          }
        }

        //ADDED BY CHARANJIT --END

        let clinicDetails = <DocumentType<Clinic>>foundAppointMent.clinic_id;

        if (
          !clinicDetails.clinicPolicy ||
          !clinicDetails.clinicPolicy!.reschedule
        )
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.appointmentMsg.clinicPolicyNotFound,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };

        if (clinicDetails.clinicPolicy!.reschedule.isAllowed === false)
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.appointmentMsg.rescheduleApptNotAllowed,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };

        if (
          userDetails!._id!.toString() ===
          foundAppointMent!.patient_id!.toString()
        ) {
          let patientDoc = <DocumentType<Patients>>foundAppointMent.patient_id;
          if (patientDoc.isVerified === false)
            return {
              status_code: HttpStatus.UNAUTHORIZED,
              success: false,
              data: {
                message: errorMessage.PATIENT_NOT_VERIFIED,
                error: errorMessage.ON_UPDATE_ERROR,
              },
            };
        }

        let condition = {
          status: { $nin: ["Cancelled", "Declined"] },
          doctor_id: new mongoose.Types.ObjectId(model.doctor_id.toString()),
          $or: [
            {
              startDateTime: {
                $gte: model.startDateTime,
                $lt: model.endDateTime,
              },
            },
            {
              endDateTime: {
                $gt: model.startDateTime,
                $lte: model.endDateTime,
              },
            },
            // {
            //   startDateTime: {
            //     $and: [
            //       { $lt: model.startDateTime },
            //       { $lt: model.endDateTime },
            //     ],
            //   },
            //   endDateTime: {
            //     $and: [
            //       { $gt: model.startDateTime },
            //       { $gt: model.endDateTime },
            //     ],
            //   },
            // },
          ],
          isDeleted: false,
        };

        let isInbetween = await AppointmentModel.find(condition).lean();

        if (isInbetween.length > 0)
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.appointmentMsg.AlreadyAppointment,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };

        const apptCond = {
          _id: new mongoose.Types.ObjectId(model.appointment_id.toString()),
          doctor_id: new mongoose.Types.ObjectId(model.doctor_id.toString()),
        };

        const data = await AppointmentModel.aggregate([
          { $match: apptCond },

          {
            $lookup: {
              from: "clinic",
              let: { clinic_id: "$clinic_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ["$user_id", "$$clinic_id"],
                    },
                  },
                },
                { $project: { clinicPolicy: 1 } },
              ],
              as: "clinicData",
            },
          },
          {
            $unwind: {
              path: "$clinicData",
              preserveNullAndEmptyArrays: true,
            },
          },

          {
            $lookup: {
              from: "clinic_locations",
              localField: "location_id",
              foreignField: "_id",
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
              from: "patients",
              localField: "patient_id",
              foreignField: "_id",
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

        if (!data.length)
          return {
            status_code: HttpStatus.UNAUTHORIZED,
            success: false,
            data: {
              message: errorMessage.appointmentMsg.apptNotFound,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };

        const apptData = data[0];

        if (!apptData)
          return {
            status_code: HttpStatus.UNAUTHORIZED,
            success: false,
            data: {
              message: errorMessage.appointmentMsg.apptNotFound,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };

        if (apptData.status != "Accepted")
          return {
            status_code: HttpStatus.UNAUTHORIZED,
            success: false,
            data: {
              message: errorMessage.incorrectAction(
                apptData.status,
                "reschedule"
              ),
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };

        if (apptData.title == "Rescheduled")
          return {
            status_code: HttpStatus.UNAUTHORIZED,
            success: false,
            data: {
              message: errorMessage.appointmentMsg.alreadyRescheduled,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };

        if (apptData.patient_id.toString() == userDetails!._id.toString()) {
          if (!apptData.clinicData.clinicPolicy.cancel.isAllowed)
            return {
              status_code: HttpStatus.UNAUTHORIZED,
              success: false,
              data: {
                message: errorMessage.incorrectAction(null, "cancel"),
                error: errorMessage.ON_UPDATE_ERROR,
              },
            };

          if (
            moment(apptData.startDateTime).diff(model.nowTime, "hour") <
            apptData.clinicData.clinicPolicy.cancel.hours
          )
            return {
              status_code: HttpStatus.UNAUTHORIZED,
              success: false,
              data: {
                message: errorMessage.appointmentMsg.conflictClinicPolicy(
                  "cancel",
                  apptData.clinicData.clinicPolicy.cancel.hours
                ),
                error: errorMessage.ON_UPDATE_ERROR,
              },
            };
        }

        // const rescheduleObj = { appointment_id: apptData._id }
        if (
          model.reschedule.type == "PATIENT" &&
          apptData.patient_id.toString() != userDetails!._id.toString()
        )
          return {
            status_code: HttpStatus.UNAUTHORIZED,
            success: false,
            data: {
              message: errorMessage.NOT_AUTHORIZED_FOR_ACTION,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };
        let rescheduleToBeSaved: any = {};
        rescheduleToBeSaved.rescheduleTime = model.nowTime;
        rescheduleToBeSaved.endDateTime = apptData.endDateTime;
        rescheduleToBeSaved.rescheduleby_id = userDetails!._id;
        rescheduleToBeSaved.startDateTime = apptData.startDateTime;
        rescheduleToBeSaved.type = model.reschedule.type;

        // await RescheduleModel.create(rescheduleObj)

        const apptUpdateObj: any = {
          endDateTime: model.endDateTime,
          startDateTime: model.startDateTime,
          //reschedule: model.reschedule,
          reschedule: rescheduleToBeSaved,
          title: "Rescheduled",
          description: model.description,
        };

        if (model.reschedule.type == "PATIENT")
          apptUpdateObj.status = "Pending";

        let finalResult = await AppointmentModel.updateOne(
          { _id: model.appointment_id },
          apptUpdateObj,
          { new: true }
        ).lean();

        if (finalResult && finalResult.modifiedCount > 0) {
          let temp: any = {
            user_id: userDetails._id,
            patient_id: foundAppointMent.patient_id,

            doctor_id: model.doctor_id,

            description: `appointment rescheduled successfully`,
            type: EHistoryActivityTypeValues.APPOINTMENT,
            type_id: foundAppointMent.patient_id,

            data: {
              prevStartDateTime: foundAppointMent.startDateTime,
              prevEndDateTime: foundAppointMent.endDateTime,

              newStartDateTime: model.startDateTime,
              newEndDateTime: model.endDateTime,
              // actionBy: userDetails._id,
            },
          };

          let addHistory = await HistoryModel.create(temp);

          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.appointmentMsg.rescheduleSuccess,
          };
        } else {
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.ERROR_RESCHEDULED_APPOINTMENT,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };
        }
      }
    } catch (error) {
      next(error);
    }
  };
  // Decline Appointment

  declineBooking = async (
    req: Request,
    model: DeclineAppointmentViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let loggedInUserId = userDetails._id;

      let foundAppointments = await AppointmentModel.findOne({
        _id: model.appointmentId,
      }).populate({
        path: "patient_id",
        select: { first_name: 1, last_name: 1 },
      });
      if (foundAppointments) {
        let patientDoc = <DocumentType<Patients>>foundAppointments.patient_id;
        if (patientDoc) {
          let patientName =
            Utility.getDecryptText(patientDoc.first_name) +
            " " +
            Utility.getDecryptText(patientDoc.last_name);
        }

        const condition = {
          _id: new mongoose.Types.ObjectId(model.appointmentId),
        };
        const data = await AppointmentModel.aggregate([
          { $match: condition },

          {
            $lookup: {
              from: "clinics",
              let: { clinic_id: "$clinic_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ["$user_id", "$$clinic_id"],
                    },
                  },
                },
                {
                  $project: {
                    clinicPolicy: 1,
                    clinicName: 1,
                  },
                },
              ],
              as: "clinicData",
            },
          },
          {
            $unwind: {
              path: "$clinicData",
              preserveNullAndEmptyArrays: true,
            },
          },

          {
            $lookup: {
              from: "users",
              let: { user_id: "$doctor_id" },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ["$_id", "$$user_id"] },
                  },
                },
                {
                  $project: { firstName: 1, lastName: 1 },
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
                    $expr: {
                      $eq: ["$_id", "$$patient_id"],
                    },
                  },
                },
                {
                  $project: { firstName: 1, lastName: 1 },
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
        ]);
        if (!data.length)
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.APPOINTMENT_DETAILS_NOT_FOUND,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };

        const appointmentData = data[0];

        if (appointmentData.status == "Unavailability")
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.WRONG_ACTION_PERFORMED,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };

        let updateData: any = foundAppointments;
        updateData = {
          declined: {
            user_id: loggedInUserId,
            time: model.nowTime,
            reason: model.reason,
          },
        };

        switch (model.type) {
          case "B_P_C":
            console.log("    case B_P_C");
            if (appointmentData.status != "Pending")
              return {
                status_code: HttpStatus.UNAUTHORIZED,
                success: false,
                data: {
                  message: errorMessage.incorrectAction(
                    appointmentData.status,
                    "cancel"
                  ),
                  error: errorMessage.ON_UPDATE_ERROR,
                },
              };

            if (
              appointmentData.createdby_id.toString() ==
                appointmentData.patient_id.toString() &&
              loggedInUserId != appointmentData.patient_id.toString()
            )
              return {
                status_code: HttpStatus.UNAUTHORIZED,
                success: false,
                data: {
                  message: errorMessage.incorrectAction(null, "cancel"),
                  error: errorMessage.ON_UPDATE_ERROR,
                },
              };

            break;
          case "B_A_C":
            console.log("    case B_A_C");

            if (appointmentData.status != "Accepted")
              return {
                status_code: HttpStatus.UNAUTHORIZED,
                success: false,
                data: {
                  message: errorMessage.incorrectAction(
                    appointmentData.status,
                    "cancel"
                  ),
                  error: errorMessage.ON_UPDATE_ERROR,
                },
              };

            break;
          case "B_D":
            console.log("    case B_D");
            if (appointmentData.status != "Pending")
              return {
                status_code: HttpStatus.UNAUTHORIZED,
                success: false,
                data: {
                  message: errorMessage.incorrectAction(
                    appointmentData.status,
                    "decline"
                  ),
                  error: errorMessage.ON_UPDATE_ERROR,
                },
              };

            if (appointmentData.patient_id.toString() == loggedInUserId)
              return {
                status_code: HttpStatus.UNAUTHORIZED,
                success: false,
                data: {
                  message: errorMessage.incorrectAction(null, "cancel"),
                  error: errorMessage.ON_UPDATE_ERROR,
                },
              };

            break;
          case "R_P_C":
            console.log("    case R_P_C");
            if (appointmentData.title != "Rescheduled")
              return {
                status_code: HttpStatus.UNAUTHORIZED,
                success: false,
                data: {
                  message: errorMessage.appointmentMsg.notRescheduled,
                  error: errorMessage.ON_UPDATE_ERROR,
                },
              };

            if (
              appointmentData.reschedule.rescheduleby_id ==
                appointmentData.patient_id.toString() &&
              loggedInUserId != appointmentData.patient_id.toString()
            )
              return {
                status_code: HttpStatus.UNAUTHORIZED,
                success: false,
                data: {
                  message: errorMessage.incorrectAction(null, "cancel"),
                  error: errorMessage.ON_UPDATE_ERROR,
                },
              };

            if (appointmentData.status != "Pending")
              return {
                status_code: HttpStatus.UNAUTHORIZED,
                success: false,
                data: {
                  message: errorMessage.incorrectAction(
                    appointmentData.status,
                    "cancel"
                  ),
                  error: errorMessage.ON_UPDATE_ERROR,
                },
              };

            break;
          case "R_A_C":
            console.log("    case R_A_C");
            if (appointmentData.title != "Rescheduled")
              return {
                status_code: HttpStatus.UNAUTHORIZED,
                success: false,
                data: {
                  message: errorMessage.appointmentMsg.notRescheduled,
                  error: errorMessage.ON_UPDATE_ERROR,
                },
              };

            if (appointmentData.status != "Accepted")
              return {
                status_code: HttpStatus.UNAUTHORIZED,
                success: false,
                data: {
                  message: errorMessage.incorrectAction(
                    appointmentData.status,
                    "cancel"
                  ),
                  error: errorMessage.ON_UPDATE_ERROR,
                },
              };

            break;
          case "R_D":
            console.log("    case R_D");
            if (appointmentData.title != "Rescheduled")
              return {
                status_code: HttpStatus.UNAUTHORIZED,
                success: false,
                data: {
                  message: errorMessage.appointmentMsg.notRescheduled,
                  error: errorMessage.ON_UPDATE_ERROR,
                },
              };

            if (
              appointmentData.reschedule.rescheduleby_id.toString() ==
                appointmentData.patient_id.toString() &&
              loggedInUserId == appointmentData.patient_id.toString()
            )
              return {
                status_code: HttpStatus.UNAUTHORIZED,
                success: false,
                data: {
                  message: errorMessage.incorrectAction(null, "cancel"),
                  error: errorMessage.ON_UPDATE_ERROR,
                },
              };

            if (appointmentData.status != "Pending")
              return {
                status_code: HttpStatus.UNAUTHORIZED,
                success: false,
                data: {
                  message: errorMessage.incorrectAction(
                    appointmentData.status,
                    "decline"
                  ),
                  error: errorMessage.ON_UPDATE_ERROR,
                },
              };

            updateData.$set = {
              "reschedule.responseby_id": loggedInUserId,
              responseTime: model.nowTime,
            };

            break;
        }

        if (
          model.type == "B_P_C" ||
          model.type == "B_A_C" ||
          model.type == "R_P_C" ||
          model.type == "R_A_C"
        ) {
          if (appointmentData.patient_id.toString() == loggedInUserId) {
            if (!appointmentData.clinicData.clinicPolicy.cancel.isAllowed)
              return {
                status_code: HttpStatus.UNAUTHORIZED,
                success: false,
                data: {
                  message: errorMessage.incorrectAction(null, "cancel"),
                  error: errorMessage.ON_UPDATE_ERROR,
                },
              };

            if (
              moment(appointmentData.startDateTime).diff(
                model.nowTime,
                "hour"
              ) < appointmentData.clinicData.clinicPolicy.cancel.hours
            )
              return {
                status_code: HttpStatus.UNAUTHORIZED,
                success: false,
                data: {
                  message: errorMessage.appointmentMsg.conflictClinicPolicy(
                    "cancel",
                    appointmentData.clinicData.clinicPolicy.cancel.hours
                  ),
                  error: errorMessage.ON_UPDATE_ERROR,
                },
              };
          }

          updateData.status = "Cancelled";
        } else if (model.type == "R_D" || model.type == "B_D") {
          updateData.status = "Declined";
        }

        let isUpdated = await AppointmentModel.findByIdAndUpdate(
          model.appointmentId,
          updateData,
          { new: true }
        ).lean();

        if (isUpdated) {
          if (new Date(isUpdated!.startDateTime) < new Date(model.nowTime)) {
            // await EPrescription.findOneAndUpdate(
            //   {
            //     appointment_id:
            //       mongoose.Types.ObjectId(appointmentId),
            //   },
            //   { isDeleted: true }
            // );
            // await FilledProgressNotes.findOneAndUpdate(
            //   {
            //     appointment_id:
            //       mongoose.Types.ObjectId(appointmentId),
            //   },
            //   { isDeleted: true }
            // );
            // await FilledTreatmentPlans.findOneAndUpdate(
            //   {
            //     appointment_id:
            //       mongoose.Types.ObjectId(appointmentId),
            //   },
            //   { isDeleted: true }
            // );
          }
          let temp: any = {
            user_id: userDetails._id,
            patient_id: null,

            doctor_id: null,

            description: `appointment declined successfully`,
            type: EHistoryActivityTypeValues.APPOINTMENT,
            type_id: foundAppointments.patient_id,
            data: {
              remarks: model.reason,

              time: new Date(),
              // actionBy: userDetails._id,
            },
          };
          let addHistory = await HistoryModel.create(temp);
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: `Appointment ${updateData.status.toLowerCase()}`,
          };
        } else {
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.ERROR_UPDATE_APPOINTMENT,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };
        }

        // else
        //   return {
        //     status_code: HttpStatus.BAD_REQUEST,
        //     success: false,
        //     data: {
        //       message:
        //         errorMessage.APPOINTMENT_DETAILS_NOT_FOUND,
        //       error: errorMessage.ON_UPDATE_ERROR,
        //     },
        //   };
      }
    } catch (error) {
      next(error);
    }
  };

  // Download Appointment Data

  getAppointmentDataToExcel = async (
    req: Request,
    model: GetAppointmentListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      const workbook = await XlsxPopulate.fromBlankAsync();
      let appointmentSheet: any = workbook.sheet("Sheet1");
      let appointmentSheetHeader = [
        "Appointment No.",
        "Appointment Type",
        "Patient Name",
        "Date",
        "Time",
        "Status",
      ];

      appointmentSheetHeader.forEach((el, i) => {
        appointmentSheet
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

      let populateFeilds: any = [
        {
          path: "appointmentType_id",
          select: ["type"],
        },
        {
          path: "patient_id",
          select: ["first_name", "middle_name", "last_name"],
        },
      ];

      let condition: any = {
        status: { $ne: "Unavailability" },
        isDeleted: false,
      };

      if (model.patient_id) {
        condition.patient_id = new mongoose.Types.ObjectId(model.patient_id);
      }

      if (
        "isDeleted" in model &&
        model.isDeleted !== undefined &&
        model.isDeleted != null
      ) {
        condition.isDeleted = model.isDeleted;
      }

      if (model.clinic_id) {
        condition.clinic_id = model.clinic_id;
      }
      if (model.appointmentType_id) {
        condition.appointmentType_id = model.appointmentType_id;
      }

      if (model.status) {
        condition.status = model.status;
      }
      // if ("isDeleted" in model) {
      if (model.isDeleted) {
        condition.isDeleted = model.isDeleted;
      }
      if (model.startDateTime) {
        let startTime = new Date(model.startDateTime);
        startTime.setHours(0, 0, 0, 0);
        let endTime = new Date(model.startDateTime);
        endTime.setHours(23, 59, 59, 999);
        condition.startDateTime = {
          $gte: startTime,
          $lte: endTime,
        };
      }
      if (model.endDateTime) {
        let startTime = new Date(model.endDateTime);
        startTime.setHours(0, 0, 0, 0);
        let endTime = new Date(model.endDateTime);
        endTime.setHours(23, 59, 59, 999);
        condition.endDateTime = {
          $gte: startTime,
          $lte: endTime,
        };
      }

      let result = await AppointmentModel.find(condition)
        .populate(populateFeilds)
        .sort({ startDateTime: 1 });

      if (result && result.length > 0) {
        let finalResponse: any = [];
        result.forEach((tempObj: any) => {
          if (tempObj.appointmentType_id) {
            let apptTypeDoc = <DocumentType<AppointmentType>>(
              tempObj.appointmentType_id
            );

            tempObj["apptTypeValue"] = apptTypeDoc.type;
          }

          if (tempObj.patient_id) {
            let patientDoc: any = {
              ...tempObj.patient_id.toObject(),
            };
            if (patientDoc.first_name)
              patientDoc.first_name = Utility.getDecryptText(
                patientDoc.first_name
              );

            if (patientDoc.middle_name)
              patientDoc.middle_name = Utility.getDecryptText(
                patientDoc.middle_name
              );
            if (patientDoc.last_name)
              patientDoc.last_name = Utility.getDecryptText(
                patientDoc.last_name
              );
            if (patientDoc.title)
              patientDoc.title = Utility.getDecryptText(patientDoc.title);
            tempObj.patient_id = patientDoc;
          }

          finalResponse.push(tempObj);
        });

        // });

        // write data in excel
        let appointmentData = finalResponse;

        let sheetStyle = {
          border: true,
          fontFamily: "Calibri",
        };

        appointmentData.forEach((el: any, i: number) => {
          let date = moment(el.startDateTime).format("DD-MM-YYYY");
          console.log(date, "date", i);
          appointmentSheet
            .cell("A" + (i + 2))
            .value(el.appointment_number)
            .style(sheetStyle);

          appointmentSheet
            .cell("B" + (i + 2))
            .value(el.apptTypeValue)
            .style(sheetStyle);

          appointmentSheet
            .cell("C" + (i + 2))
            .value(el.patient_id?.first_name + " " + el.patient_id?.last_name)
            .style(sheetStyle);
          appointmentSheet;

          appointmentSheet
            .cell("D" + (i + 2))
            .value(moment(el.startDateTime).format("DD-MM-YYYY"))
            .style(sheetStyle);
          appointmentSheet;

          appointmentSheet
            .cell("E" + (i + 2))
            .value(
              `${moment(el.startDateTime).format("LT")}-${moment(
                el.endDateTime
              ).format("LT")}`
            )
            .style(sheetStyle);
          appointmentSheet;

          appointmentSheet
            .cell("F" + (i + 2))
            .value(el.status)
            .style(sheetStyle);
        });

        appointmentSheet.freezePanes(1, 1);

        const data: any = await workbook.outputAsync();
        await fs.writeFileSync(
          path.join(
            __dirname,
            "../../../../../public/upload/appointments/Appointment_Report.xlsx"
          ),
          data
        );
        let link = `http://${req.hostname}:${process.env.PORT}/upload/appointments/Appointment_Report.xlsx`;

        let excelFileName = "Appointment_Report.xlsx";
        let response = {
          link,
          name: excelFileName,
        };
        return {
          status_code: HttpStatus.OK,
          data: response, //link,
          success: true,
        };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.APPOINTMENT_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  fetchAppointment = async (
    req: Request,
    model: FetchAppointmentViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let last_fetch = await FetchDataModel.find(
        { clinic_id: model.clinic_id, type: "APPOINTMENT" },
        { fetch_time: 1 }
      )
        .sort({ createdAt: -1 })
        .limit(1);
      let last_fetch_time = new Date(
        moment(Date.now() - 1 * 24 * 3600 * 1000).format("YYYY-MM-DD")
      ); //default is a day before current time
      if (last_fetch && last_fetch.length) {
        last_fetch_time = last_fetch[0]!.fetch_time;
      }

      let fetch_time = new Date();
      let make_fetch_req_entry = await FetchDataModel.create({
        type: "APPOINTMENT",
        last_fetch_time: last_fetch_time,
        fetch_time: fetch_time,
        clinic_id: model.clinic_id,
        createdby_id: userDetails._id,
      });

      if (make_fetch_req_entry) {
        let FETCH_APPOINTMENT_URL =
          "http://192.168.1.140:1336/api/rcm/appointment/exportData";
        let data_fetched: {
          data: {
            code: number;
            message: string;
            data: { createdArr: any[]; updatedArr: any[] };
          };
        } = await axios.post(FETCH_APPOINTMENT_URL, {
          currentDateTime: fetch_time,
          lastFetchTime: last_fetch_time,
        });
        //console.log("____________________________________________-");
        if (
          data_fetched &&
          data_fetched.data &&
          data_fetched.data.data &&
          (data_fetched.data.data.updatedArr.length ||
            data_fetched.data.data.createdArr.length)
        ) {
          let data: any = [];
          data_fetched.data.data.createdArr.forEach(function (singleRecord) {
            data.push({
              _id: singleRecord._id,
              title: singleRecord.title,
              duration: singleRecord.duration,
              document: singleRecord.document,
              noShow: singleRecord.noShow,
              description: singleRecord.description,
              isDeleted: singleRecord.isDeleted,
              isEmergency: singleRecord.isEmergency,
              chargePatient: singleRecord.chargePatient,
              appointment_type: singleRecord.appointment_type,
              appointment_number: singleRecord.appointment_number,
              visitType: singleRecord.visitType,
              status: singleRecord.status,
              clinic_id: model!.clinic_id,
              doctor_id: singleRecord.doctor_id,
              patient_id: singleRecord.patient_id,
              endDateTime: singleRecord.endDateTime,
              location_id: singleRecord.location_id,
              //"createdby_id": singleRecord.,
              startDateTime: singleRecord.startDateTime,
              appointmentType_id: singleRecord.appointmentType_id,
              groupId: singleRecord.groupId,
              emailStatus: singleRecord.emailStatus,
              reschedule: singleRecord.reschedule,
              callData: singleRecord.callData,
              accepted: singleRecord.accepted,
              declined: singleRecord.declined,
              deleted: singleRecord.deleted,
              recurring: singleRecord.recurring,
              createdAt: singleRecord.createdAt,
              updatedAt: singleRecord.updatedAt,
            });
          });

          data_fetched.data.data.updatedArr.forEach(function (singleRecord) {
            data.push({
              _id: singleRecord._id,
              title: singleRecord.title,
              duration: singleRecord.duration,
              document: singleRecord.document,
              noShow: singleRecord.noShow,
              description: singleRecord.description,
              isDeleted: singleRecord.isDeleted,
              isEmergency: singleRecord.isEmergency,
              chargePatient: singleRecord.chargePatient,
              appointment_type: singleRecord.appointment_type,
              appointment_number: singleRecord.appointment_number,
              visitType: singleRecord.visitType,
              status: singleRecord.status,
              clinic_id: model!.clinic_id,
              doctor_id: singleRecord.doctorCollectionData!._id,
              patient_id: singleRecord.patient_id,
              endDateTime: singleRecord.endDateTime,
              location_id: singleRecord.location_id,
              //"createdby_id": singleRecord.,
              startDateTime: singleRecord.startDateTime,
              appointmentType_id: singleRecord.appointmentType_id,
              groupId: singleRecord.groupId,
              emailStatus: singleRecord.emailStatus,
              reschedule: singleRecord.reschedule,
              callData: singleRecord.callData,
              accepted: singleRecord.accepted,
              declined: singleRecord.declined,
              deleted: singleRecord.deleted,
              recurring: singleRecord.recurring,
              createdAt: singleRecord.createdAt,
              updatedAt: singleRecord.updatedAt,
            });
          });

          let existingRecords = await AppointmentModel.find(
            {
              $or: data.map((singleAppointment) => ({
                _id: singleAppointment._id,
              })),
            },
            { _id: 1, clinic_id: 1 }
          );

          let conflicted_ids: any = [];
          if (existingRecords && existingRecords.length) {
            existingRecords.forEach((e) => {
              let foundIndex = data.findIndex(
                (a) =>
                  a._id.toString() == e._id.toString() &&
                  a.clinic_id.toString() != e!.clinic_id!.toString()
              );

              if (foundIndex > -1) {
                conflicted_ids.push(data[foundIndex]._id);
                data.splice(foundIndex, 1);
              }
            });
          }

          if (conflicted_ids.length) {
            await FetchDataModel.updateOne(
              { _id: make_fetch_req_entry._id },
              { conflicted_ids: conflicted_ids }
            );
          }

          if (data.length > 0) {
            let bulkAppointment: any[] = [];
            data.forEach(function (singleRecord: any) {
              bulkAppointment.push({
                updateOne: {
                  filter: { _id: singleRecord._id },
                  update: {
                    $set: singleRecord,
                  },
                  upsert: true,
                },
              });
            });

            let appointmentSaved = await AppointmentModel.bulkWrite(
              bulkAppointment
            );

            if (appointmentSaved) {
              return {
                status_code: HttpStatus.OK,
                data: conflicted_ids.length
                  ? errorMessage.DATA_FETCHED_SUCCESS_WITH_CONFLICTS
                  : errorMessage.DATA_FETCHED_SUCCESS,
                success: true,
              };
            } else {
              return {
                status_code: HttpStatus.BAD_REQUEST,
                success: false,
                data: {
                  message: errorMessage.NO_DATA_TO_FETCH,
                  error: errorMessage.ON_FETCH_ERROR,
                },
              };
            }
          } else {
            return {
              status_code: HttpStatus.BAD_REQUEST,
              success: false,
              data: {
                message: conflicted_ids.length
                  ? errorMessage.NO_DATA_TO_FETCH_BUT_CONFLICT_PRESENT
                  : errorMessage.NO_DATA_TO_FETCH,
                error: errorMessage.ON_FETCH_ERROR,
              },
            };
          }
        } else {
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.NO_DATA_TO_FETCH,
              error: errorMessage.ON_FETCH_ERROR,
            },
          };
        }
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.FAILED_TO_FETCH_DATA,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  fetchCheckouts = async (
    req: Request,
    model: FetchAppointmentViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let last_fetch = await FetchDataModel.find(
        { clinic_id: model.clinic_id, type: "CHECKOUT" },
        { fetch_time: 1 }
      )
        .sort({ createdAt: -1 })
        .limit(1);
      let last_fetch_time = new Date(
        moment(Date.now() - 1 * 24 * 3600 * 1000).format("YYYY-MM-DD")
      ); //default is a day before current time
      if (last_fetch && last_fetch.length) {
        last_fetch_time = last_fetch[0]!.fetch_time;
      }

      let fetch_time = new Date();
      let make_fetch_req_entry = await FetchDataModel.create({
        type: "CHECKOUT",
        last_fetch_time: last_fetch_time,
        fetch_time: fetch_time,
        clinic_id: model.clinic_id,
        createdby_id: userDetails._id,
      });

      if (make_fetch_req_entry) {
        let FETCH_CHECKOUT_URL =
          "http://192.168.1.140:1336/api/rcm/doctorCheckout/exportData";
        let data_fetched: {
          data: {
            code: number;
            message: string;
            data: { createdArr: any[]; updatedArr: any[] };
          };
        } = await axios.post(FETCH_CHECKOUT_URL, {
          currentDateTime: fetch_time,
          lastFetchTime: last_fetch_time,
        });
        //console.log("____________________________________________-");
        if (
          data_fetched &&
          data_fetched.data &&
          data_fetched.data.data &&
          (data_fetched.data.data.updatedArr.length ||
            data_fetched.data.data.createdArr.length)
        ) {
          let data: any = [];
          data_fetched.data.data.createdArr.forEach(function (singleRecord) {
            data.push({
              _id: singleRecord._id,
              codes: singleRecord.codes,
              notes: singleRecord.notes,
              duration: singleRecord.duration,
              remark: singleRecord.remark,
              noShow: singleRecord.remark,
              followUp: singleRecord.remark,
              checkoutTime: singleRecord.remark,
              placeOfService: singleRecord.placeOfService,
              chargePatient: singleRecord.chargePatient,
              doctor_id: singleRecord.doctorCollectionData!._id,
              clinic_id: model!.clinic_id,
              appointment_id: singleRecord.appointment_id,
              patient_id: singleRecord.patient_id,
              location_id: singleRecord.location_id,
              createdAt: singleRecord.createdAt,
              updatedAt: singleRecord.updatedAt,
              ///////////////////
            });
          });

          data_fetched.data.data.updatedArr.forEach(function (singleRecord) {
            data.push({
              _id: singleRecord._id,
              codes: singleRecord.codes,
              notes: singleRecord.notes,
              duration: singleRecord.duration,
              remark: singleRecord.remark,
              noShow: singleRecord.remark,
              followUp: singleRecord.remark,
              checkoutTime: singleRecord.remark,
              placeOfService: singleRecord.placeOfService,
              chargePatient: singleRecord.chargePatient,
              doctor_id: singleRecord.doctorCollectionData!._id,
              clinic_id: model!.clinic_id,
              appointment_id: singleRecord.appointment_id,
              patient_id: singleRecord.patient_id,
              location_id: singleRecord.location_id,
              createdAt: singleRecord.createdAt,
              updatedAt: singleRecord.updatedAt,
            });
          });

          let existingRecords = await DoctorCheckoutModel.find(
            {
              $or: data.map((singleAppointment) => ({
                _id: singleAppointment._id,
              })),
            },
            { _id: 1, clinic_id: 1 }
          );

          let conflicted_ids: any = [];
          if (existingRecords && existingRecords.length) {
            existingRecords.forEach((e) => {
              let foundIndex = data.findIndex(
                (a) =>
                  a._id.toString() == e._id.toString() &&
                  a.clinic_id.toString() != e!.clinic_id!.toString()
              );

              if (foundIndex > -1) {
                conflicted_ids.push(data[foundIndex]._id);
                data.splice(foundIndex, 1);
              }
            });
          }

          if (conflicted_ids.length) {
            await FetchDataModel.updateOne(
              { _id: make_fetch_req_entry._id },
              { conflicted_ids: conflicted_ids }
            );
          }

          if (data.length > 0) {
            let bulkCheckout: any[] = [];
            data.forEach(function (singleRecord: any) {
              bulkCheckout.push({
                updateOne: {
                  filter: { _id: singleRecord._id },
                  update: {
                    $set: singleRecord,
                  },
                  upsert: true,
                },
              });
            });

            let checkoutSaved = await DoctorCheckoutModel.bulkWrite(
              bulkCheckout
            );

            if (checkoutSaved) {
              return {
                status_code: HttpStatus.OK,
                data: conflicted_ids.length
                  ? errorMessage.DATA_FETCHED_SUCCESS_WITH_CONFLICTS
                  : errorMessage.DATA_FETCHED_SUCCESS,
                success: true,
              };
            } else {
              return {
                status_code: HttpStatus.BAD_REQUEST,
                success: false,
                data: {
                  message: errorMessage.NO_DATA_TO_FETCH,
                  error: errorMessage.ON_FETCH_ERROR,
                },
              };
            }
          } else {
            return {
              status_code: HttpStatus.BAD_REQUEST,
              success: false,
              data: {
                message: conflicted_ids.length
                  ? errorMessage.NO_DATA_TO_FETCH_BUT_CONFLICT_PRESENT
                  : errorMessage.NO_DATA_TO_FETCH,
                error: errorMessage.ON_FETCH_ERROR,
              },
            };
          }
        } else {
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.NO_DATA_TO_FETCH,
              error: errorMessage.ON_FETCH_ERROR,
            },
          };
        }
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.FAILED_TO_FETCH_DATA,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new AppointmentServices();
