import { DocumentType } from "@typegoose/typegoose";
import bcrypt from "bcrypt";
import { NextFunction, Request } from "express";
import HttpStatus from "http-status-codes";
import mongoose from "mongoose";
import Utility, { IServiceResult1 } from "../../common/common-methods";
import errorMessage from "../../common/erros_message";
import { IJWTPayload } from "../../common/interface/jwtpayload";
import TokenModel from "../../models/login_token.model";
import Roles from "../../models/roles.model";
import UserModel, { User } from "../../models/user.model";
import AppointmentStageModel from "../../models/appointment_stage.model";
import {
  AddAppointmentStageViewmodel,
  UpdateAppointmentStageViewmodel,
  GetAppointmentStageListViewmodel,
} from "../../view-models/appointmentStage";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import { truncate } from "lodash";

export enum EnumRole {
  PROVIDER = "provider",
}
class AppointmentStageServices {
  addAppointmentStage = async (
    req: Request,
    model: AddAppointmentStageViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let alreadyPresentAppointmentStage = await AppointmentStageModel.findOne({
        doctor_id: model.doctor_id,
        clinic_id: model.clinic_id,
        appointment_id: model.appointment_id,
      });
      if (alreadyPresentAppointmentStage) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_APPOINTMENTSTAGE,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.OK,
        };
      } else {
        let saveAppointmentStageResult = await AppointmentStageModel.create(
          model
        );

        if (saveAppointmentStageResult) {
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: {
              stage: saveAppointmentStageResult.stage,
              clinic_id: saveAppointmentStageResult.clinic_id,
              doctor_id: saveAppointmentStageResult.doctor_id,
              appointment_id: saveAppointmentStageResult.appointment_id,
            },
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_ADD_SKILL,
              error: errorMessage.ON_ADD_ERROR,
            },
            status_code: HttpStatus.OK,
          };
        }
      }
    } catch (error) {
      next(error);
    }
  };
  updateAppointmentStage = async (
    req: Request,
    model: UpdateAppointmentStageViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let updateAppointmentStageResult =
        await AppointmentStageModel.findOneAndUpdate(
          { _id: model._id },
          model,
          {
            new: true,
          }
        );
      if (updateAppointmentStageResult) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: {
            stage: updateAppointmentStageResult.stage,
            clinic_id: updateAppointmentStageResult.clinic_id,
            doctor_id: updateAppointmentStageResult.doctor_id,
            appointment_id: updateAppointmentStageResult.appointment_id,
          },
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_UPDATE_APPOINTMENTSTAGE,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.OK,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  deleteAppointmentStage = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let deleteAppointmentStageResult = await AppointmentStageModel.updateOne(
        { _id: req.params._id },
        { isDeleted: true }
      );
      if (
        deleteAppointmentStageResult &&
        deleteAppointmentStageResult.modifiedCount > 0
      ) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: true,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_DELETE_APPOINTMENTSTAGE,
            error: errorMessage.ON_DELETE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  getAppointmentStage = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let getAppointmentStageResult = await AppointmentStageModel.findOne({
        _id: model._id,
        isActive: true,
        isDeleted: false,
      });
      if (getAppointmentStageResult) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: {
            stage: getAppointmentStageResult.stage,
            clinic_id: getAppointmentStageResult.clinic_id,
            doctor_id: getAppointmentStageResult.doctor_id,
            appointment_id: getAppointmentStageResult.appointment_id,
          },
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_GET_APPOINTMENTSTAGE,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  listAppointmentStage = async (
    req: Request,
    model: GetAppointmentStageListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;

      let condition: any = {
        isDeleted: false,
        isActive: true,
      };
      if (model.stage) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.stage);

        condition.stage = {
          $regex: model.stage,
          $options: "i",
        };
      }

      if (model.isActive) {
        condition.isActive = model.isActive;
      }

      if (!model.pageNumber && !model.pageSize) {
        defaultPage = 1;
        count = -1;

        let response = await AppointmentStageModel.find(condition, {
          createdAt: 0,
          updatedAt: 0,
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
              pageNumber: defaultPage,
              pageSize: response.length,
              totalPages: defaultPage,
            },
          };
        } else {
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.APPOINTMENTSTAGE_LIST_NOT_FOUND,
              error: errorMessage.ON_FETCH_ERROR,
            },
          };
        }
      } else if (model.pageNumber && model.pageNumber >= 1 && !model.pageSize) {
        defaultPage = model.pageNumber;
        count = 50;
      } else {
        defaultPage = model.pageNumber || 1;
        count = model.pageSize || 50;
      }
      let tempResult: any;

      let result: mongoose.PaginateResult<any> =
        await AppointmentStageModel.paginate(
          {
            ...condition,
            options: {
              projection: {
                createdAt: 0,
                updatedAt: 0,
                __v: 0,
              },
            },
          },
          {
            page: defaultPage,
            ...(count > 0 ? { limit: count } : { pagination: false }),
            //populate: populateFeilds,

            sort: { createdAt: -1 },
          }
        );

      tempResult = result;

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
            message: errorMessage.APPOINTMENTSTAGE_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new AppointmentStageServices();
