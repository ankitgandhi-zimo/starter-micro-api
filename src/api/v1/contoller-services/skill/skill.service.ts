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
import SkillModel, { Skill } from "../../models/skill.model";
import {
  AddSkillViewmodel,
  UpdateSkillViewmodel,
  GetSkillListViewmodel,
} from "../../view-models/skill";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";

export enum EnumRole {
  PROVIDER = "provider",
}
class SkillServices {
  addSkill = async (
    req: Request,
    model: AddSkillViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      model.createdby_id = userDetails._id;

      let alreadyPresentSkill = await SkillModel.findOne(model);
      if (alreadyPresentSkill) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_SKILL,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        // let skillData = {
        //   skillName: model.skillName,
        //   //createdby_id: userDetails._id,
        // };

        let saveSkillResult = await SkillModel.create(model);

        if (saveSkillResult) {
          // let addHistory = await HistoryModel.create({
          //   user_id: model.createdby_id,
          //   description: `skill named ${model.skillName} added`,
          //   type: EHistoryActivityTypeValues.USER,
          //   type_id: model.createdby_id,
          // });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: {
              _id: saveSkillResult._id,
              skillName: saveSkillResult.skillName,
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
  updateSkill = async (
    req: Request,
    model: UpdateSkillViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let alreadyPresentSkill = await SkillModel.findOne({
        skillName: model.skillName,
        _id: { $ne: model._id },
      });
      if (alreadyPresentSkill) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_SKILL,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        let updateSkillResult = await SkillModel.findOneAndUpdate(
          { _id: model._id },
          model,
          {
            new: true,
          }
        );
        if (updateSkillResult) {
          // let addHistory = await HistoryModel.create({
          //   user_id: userDetails._id,
          //   description: `provider updated skill named ${model.skillName}`,
          //   type: EHistoryActivityTypeValues.PROVIDER,
          // });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.UPDATE_SUCCESSFULL,
            // data: {
            //   _id: updateSkillResult._id,
            //   skillName: updateSkillResult.skillName,
            // },
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_UPDATE_SKILL,
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
  deleteSkill = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let deleteSkillResult = await SkillModel.updateOne(
        { _id: req.params._id },
        { isDeleted: true }
      );
      if (deleteSkillResult && deleteSkillResult.modifiedCount > 0) {
        // let addHistory = await HistoryModel.create({
        //   user_id: userDetails._id,
        //   description: `provider deleted skill`,
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
            message: errorMessage.ERROR_ON_DELETE_SKILL,
            error: errorMessage.ON_DELETE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  getSkill = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let getSkillResult = await SkillModel.findOne({
        _id: model._id,
        // isActive: true,
        // isDeleted: false,
      });
      if (getSkillResult) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: {
            _id: getSkillResult._id,
            skillName: getSkillResult.skillName,
          },
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_FETCHING_SKILL,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  listSkill = async (
    req: Request,
    model: GetSkillListViewmodel,
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

        condition.skillName = {
          $regex: model.search,
          $options: "i",
        };
      }

      if (model.isActive) {
        condition.isActive = model.isActive;
      }

      let result: mongoose.PaginateResult<any> = await SkillModel.paginate(
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
            message: errorMessage.SKILL_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
  //Provides listing for dropdown for filtering data
  filterListSkill = async (
    req: Request,
    model: GetSkillListViewmodel,
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

        condition.skillName = {
          $regex: model.search,
          $options: "i",
        };
      }

      if (model.isActive) {
        condition.isActive = model.isActive;
      }

      let response = await SkillModel.find(condition, {
        createdAt: 0,
        updatedAt: 0,
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
            message: errorMessage.SKILL_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new SkillServices();
