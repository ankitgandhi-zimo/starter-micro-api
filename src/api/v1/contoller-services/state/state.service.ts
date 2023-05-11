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

import StateModel from "../../models/state.model";
import {
  AddStateViewmodel,
  UpdateStateViewmodel,
  GetStateListViewmodel,
} from "../../view-models/state";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";

export enum EnumRole {
  PROVIDER = "provider",
}
class StateServices {
  addState = async (
    req: Request,
    model: AddStateViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      model.createdby_id = userDetails._id;

      let alreadyPresentState = await StateModel.findOne(model);
      if (alreadyPresentState) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_STATE,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        // let skillData = {
        //   skillName: model.skillName,
        //   //createdby_id: userDetails._id,
        // };

        let saveStateResult = await StateModel.create(model);

        if (saveStateResult) {
          // let addHistory = await HistoryModel.create({
          //   user_id: model.createdby_id,
          //   description: `provider added state`,
          //   type: EHistoryActivityTypeValues.PROVIDER,
          // });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: {
              _id: saveStateResult._id,
              stateName: saveStateResult.stateName,
              stateCode: saveStateResult.stateCode,
            },
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_ADD_STATE,
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
  updateState = async (
    req: Request,
    model: UpdateStateViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let alreadyPresentState = await StateModel.findOne({
        stateName: model.stateName,
        _id: { $ne: model._id },
      });
      if (alreadyPresentState) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_STATE,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        let updateStateResult = await StateModel.findOneAndUpdate(
          { _id: model._id },
          model,
          {
            new: true,
          }
        );
        if (updateStateResult) {
          // let addHistory = await HistoryModel.create({
          //   user_id: userDetails._id,
          //   description: `provider updated state`,
          //   type: EHistoryActivityTypeValues.PROVIDER,
          // });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.UPDATE_SUCCESSFULL,
            // data: {
            //   _id: updateStateResult._id,
            //   stateName: updateStateResult.stateName,
            //   stateCode: updateStateResult.stateCode,
            // },
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_UPDATE_COUNTRY,
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
  deleteState = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let deleteStateResult = await StateModel.updateOne(
        { _id: req.params._id },
        { isDeleted: true }
      );
      if (deleteStateResult && deleteStateResult.modifiedCount > 0) {
        // let addHistory = await HistoryModel.create({
        //   user_id: userDetails._id,
        //   description: `provider deleted state`,
        //   type: EHistoryActivityTypeValues.PROVIDER,
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
            message: errorMessage.ERROR_ON_DELETE_STATE,
            error: errorMessage.ON_DELETE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  getState = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let getStateResult = await StateModel.findOne({
        _id: model._id,
        // isActive: true,
        // isDeleted: false,
      });
      if (getStateResult) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: {
            _id: getStateResult._id,
            stateName: getStateResult.stateName,
            stateCode: getStateResult.stateCode,
          },
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_GET_STATE,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  listState = async (
    req: Request,
    model: GetStateListViewmodel,
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
        //isActive: true,
      };

      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

        condition.stateName = {
          $regex: model.search,
          $options: "i",
        };
      }

      if (model.isActive) {
        condition.isActive = model.isActive;
      }

      let result: mongoose.PaginateResult<any> = await StateModel.paginate(
        condition,
        {
          page: defaultPage,
          ...(count > 0 ? { limit: count } : { pagination: false }),
          populate: populateFeilds,

          sort: { createdAt: -1 },
        }
      );

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
            message: errorMessage.STATE_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
  //Provides listing for dropdown for filtering data
  filterListState = async (
    req: Request,
    model: GetStateListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;

      let condition: any = {
        isDeleted: false,
      };

      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

        condition.stateName = {
          $regex: model.search,
          $options: "i",
        };
      }

      if (model.isActive) {
        condition.isActive = model.isActive;
      }

      if (model.countryId) {
        condition.countryId = model.countryId;
      }

      let response = await StateModel.find(condition, {
        createdAt: 0,
        updatedAt: 0,
        isActive: 0,
        isDeleted: 0,
        createdby_id: 0,
        __v: 0,
      }).sort({ createdAt: -1 });

      if (response && response.length > 0) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: {
            data: response,
            totalDocs: response.length,
          },
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.STATE_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new StateServices();
