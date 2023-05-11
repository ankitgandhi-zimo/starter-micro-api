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
import PermissionModel from "../../models/permission.model";
import {
  AddPermissionViewmodel,
  UpdatePermissionViewmodel,
  GetPermissionListViewmodel,
  UpdateUserPermissionViewmodel,
} from "../../view-models/permission";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";

export enum EnumRole {
  PROVIDER = "provider",
}
class PermissionServices {
  addPermission = async (
    req: Request,
    model: AddPermissionViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      model.createdby_id = userDetails._id;
      model.name = model.name.toUpperCase();
      let alreadyPresentPermission = await PermissionModel.findOne(model);
      if (alreadyPresentPermission) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_PERMISSION,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        // let skillData = {
        //   skillName: model.skillName,
        //   //createdby_id: userDetails._id,
        // };

        let savePermissionResult = await PermissionModel.create(model);

        if (savePermissionResult) {
          let addHistory = await HistoryModel.create({
            user_id: model.createdby_id,
            description: `provider added permission named ${model.name}`,
            type: EHistoryActivityTypeValues.USER,
          });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: {
              _id: savePermissionResult._id,
              name: savePermissionResult.name,
            },
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_ADD_PERMISSION,
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
  updatePermission = async (
    req: Request,
    model: UpdatePermissionViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      model.name = model.name.toUpperCase();
      let alreadyPresentPermission = await PermissionModel.findOne({
        name: model.name,
        _id: { $ne: model._id },
      });
      if (alreadyPresentPermission) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_PERMISSION,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        let updatePermissionResult = await PermissionModel.findOneAndUpdate(
          { _id: model._id },
          model,
          {
            new: true,
          }
        );
        if (updatePermissionResult) {
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `user updated permission named ${model.name}`,
            type: EHistoryActivityTypeValues.USER,
          });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.UPDATE_SUCCESSFULL,
            // data: {
            //   _id: updatePermissionResult._id,
            //   name: updatePermissionResult.name,
            // },
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_UPDATE_PERMISSION,
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
  deletePermission = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let deletePermissionResult = await PermissionModel.updateOne(
        { _id: req.params._id },
        { isDeleted: true }
      );
      if (deletePermissionResult && deletePermissionResult.modifiedCount > 0) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `user deleted permission`,
          type: EHistoryActivityTypeValues.USER,
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
            message: errorMessage.ERROR_ON_DELETE_PERMISSION,
            error: errorMessage.ON_DELETE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  getPermission = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let getPermissionResult = await PermissionModel.findOne({
        _id: model._id,
        isActive: true,
        isDeleted: false,
      });
      if (getPermissionResult) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: {
            _id: getPermissionResult._id,
            name: getPermissionResult.name,
          },
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_GET_PERMISSION,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  listPermission = async (
    req: Request,
    model: GetPermissionListViewmodel,
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

        condition.name = {
          $regex: model.search,
          $options: "i",
        };
      }

      if (model.isActive) {
        condition.isActive = model.isActive;
      }

      let result: mongoose.PaginateResult<any> = await PermissionModel.paginate(
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
            message: errorMessage.PERMISSION_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
  updateUserPermission = async (
    req: Request,
    model: UpdateUserPermissionViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let updatePermissionResult = await UserModel.findOneAndUpdate(
        { _id: model._id },
        { $set: { role_permission: model.role_permission } },
        {
          fields: { first_name: 1, last_name: 1, role_permission: 1, _id: 1 },
          new: true,
        }
      );
      if (updatePermissionResult) {
        await HistoryModel.create({
          user_id: userDetails._id,
          description: `user updated permission of ${updatePermissionResult.first_name} ${updatePermissionResult.last_name}`,
          type: EHistoryActivityTypeValues.USER,
        });
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: {
            _id: updatePermissionResult._id,
            role_permission: updatePermissionResult.role_permission,
          },
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_UPDATE_PERMISSION,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new PermissionServices();
