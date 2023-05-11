import { DocumentType } from "@typegoose/typegoose";
import { NextFunction, Request } from "express";
import HttpStatus from "http-status-codes";
import mongoose from "mongoose";
import { IServiceResult1 } from "../../common/common-methods";
import errorMessage from "../../common/erros_message";
import AppointmentTypeModel from "../../models/appointment_types.model";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";
import { User } from "../../models/user.model";
import {
  AddAppointmentTypeViewmodel,
  GetAppointmentTypeListViewmodel,
  UpdateAppointmentTypeViewmodel,
} from "../../view-models/appointmentType";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";

export enum EnumRole {
  PROVIDER = "provider",
}
class AppointmentTypeServices {
  addAppointmentType = async (
    req: Request,
    model: AddAppointmentTypeViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      model.createdby_id = userDetails._id;
      let alreadyPresentAppointmentType = await AppointmentTypeModel.findOne({
        clinic_id: model.clinic_id,
        type: model.type,
      });
      if (alreadyPresentAppointmentType) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_APPOINTMENTTYPE,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        let saveAppointmentTypeResult = await AppointmentTypeModel.create(
          model
        );

        if (saveAppointmentTypeResult) {
          let addHistory = await HistoryModel.create({
            user_id: model.createdby_id,
            description: `appointment type named ${model.type} added`,
            type: EHistoryActivityTypeValues.CLINIC,
            type_id: saveAppointmentTypeResult._id,
          });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: {
              _id: saveAppointmentTypeResult._id,
              type: saveAppointmentTypeResult.type,
              color: saveAppointmentTypeResult.color,
              duration: saveAppointmentTypeResult.duration,
              isMultiPatient: saveAppointmentTypeResult.isMultiPatient,
              number_of_patients: saveAppointmentTypeResult.number_of_patients,
            },
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_ADD_SKILL,
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
  updateAppointmentType = async (
    req: Request,
    model: UpdateAppointmentTypeViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let alreadyPresentAppointmentType = await AppointmentTypeModel.findOne({
        type: model.type,
        clinic_id: model.clinic_id,
        _id: { $ne: model._id },
      });
      if (alreadyPresentAppointmentType) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_APPOINTMENTTYPE,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        let updateAppointmentTypeResult =
          await AppointmentTypeModel.findOneAndUpdate(
            { _id: model._id },
            model,
            {
              new: true,
            }
          );
        if (updateAppointmentTypeResult) {
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `appointment type updated successfully`,
            type: EHistoryActivityTypeValues.CLINIC,
            type_id: model._id,
          });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.UPDATE_SUCCESSFULL,
            // data: {
            //   _id: updateAppointmentTypeResult._id,
            //   type: updateAppointmentTypeResult.type,
            //   color: updateAppointmentTypeResult.color,
            //   duration: updateAppointmentTypeResult.duration,
            //   isMultiPatient: updateAppointmentTypeResult.isMultiPatient,
            //   number_of_patients:
            //     updateAppointmentTypeResult.number_of_patients,
            // },
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_UPDATE_APPOINTMENTTYPE,
              error: errorMessage.ON_UPDATE_ERROR,
            },
            status_code: HttpStatus.BAD_REQUEST,
          };
        }
      }
    } catch (error) {
      next(error);
    }
  };
  deleteAppointmentType = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let deleteAppointmentTypeResult = await AppointmentTypeModel.updateOne(
        { _id: req.params._id },
        { isDeleted: true }
      );
      if (
        deleteAppointmentTypeResult &&
        deleteAppointmentTypeResult.modifiedCount > 0
      ) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `appointment type deleted successfully`,
          type: EHistoryActivityTypeValues.CLINIC,
          type_id: req.params._id,
        });
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.DELETE_SUCCESSFULL,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_DELETE_APPOINTMENTTYPE,
            error: errorMessage.ON_DELETE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  getAppointmentType = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let getAppointmentTypeResult = await AppointmentTypeModel.findOne({
        _id: model._id,
        isActive: true,
        isDeleted: false,
      });
      if (getAppointmentTypeResult) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: {
            _id: getAppointmentTypeResult._id,
            type: getAppointmentTypeResult.type,
            color: getAppointmentTypeResult.color,
            duration: getAppointmentTypeResult.duration,
            isMultiPatient: getAppointmentTypeResult.isMultiPatient,
            number_of_patients: getAppointmentTypeResult.number_of_patients,
          },
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_FETCHING_APPOINTMENTTYPE,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  listAppointmentType = async (
    req: Request,
    model: GetAppointmentTypeListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;
      defaultPage = model.pageNumber ? model.pageNumber : 1;
      count = model.pageSize ? model.pageSize : 50;
      let populateFeilds: any = [];

      let condition: any = {
        isDeleted: false,
        clinic_id: model.clinic_id,
        //isActive: true,
      };

      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

        condition.type = {
          $regex: model.search,
          $options: "i",
        };
      }

      if (model.isActive) {
        condition.isActive = model.isActive;
      }

      let result: mongoose.PaginateResult<any> =
        await AppointmentTypeModel.paginate(condition, {
          page: defaultPage,
          ...(count > 0 ? { limit: count } : { pagination: false }),
          populate: populateFeilds,

          sort: { createdAt: -1 },
        });

      if (result && result.docs && result.docs.length > 0) {
        let obj = {
          data: result.docs,
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
            message: errorMessage.APPOINTMENT_TYPE_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
  filterListAppointmentType = async (
    req: Request,
    model: GetAppointmentTypeListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;

      let condition: any = {};
      condition.clinic_id = model.clinic_id;
      condition.isDeleted = false;
      condition.isActive = true;
      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

        condition.type = {
          $regex: model.search,
          $options: "i",
        };
      }

      // if (model.isActive) {
      //   condition.isActive = model.isActive;
      // }

      let response = await AppointmentTypeModel.find(condition, {
        createdAt: 0,
        updatedAt: 0,
        isDeleted: 0,
        isActive: 0,
        color: 0,
        createdby_id: 0,
        isMultiPatient: 0,
        number_of_patients: 0,
        duration: 0,
        __v: 0,
      }).sort({
        createdAt: -1,
      });

      if (response && response.length > 0) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: {
            data: response,
            // count: response.length,
            totalDocs: response.length,
          },
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.APPOINTMENT_TYPE_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new AppointmentTypeServices();
