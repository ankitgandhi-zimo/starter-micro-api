import { DocumentType } from "@typegoose/typegoose";
import { NextFunction, Request } from "express";
import HttpStatus from "http-status-codes";
import mongoose from "mongoose";
import { IServiceResult1 } from "../../common/common-methods";
import errorMessage from "../../common/erros_message";
import AssignTeamModel from "../../models/assign_team.model";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";
import UserModel, { User } from "../../models/user.model";
import {
  AddAssignTeamViewmodel,
  GetAssignTeamListViewmodel,
  UpdateAssignTeamViewmodel,
} from "../../view-models/assignTeam";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";

export enum EnumRole {
  PROVIDER = "provider",
}
class AssignTeamServices {
  addAssignTeam = async (
    req: Request,
    model: AddAssignTeamViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      model.createdby_id = userDetails._id;
      let alreadyPresentTeam =
        await AssignTeamModel.findOne({
          appointment_id: model.appointment_id,
          team_member: model.team_member,
          team_id: model.team_id,
        });
      if (alreadyPresentTeam) {
        return {
          success: false,
          data: {
            message:
              errorMessage.ALREADY_EXIST_ASSIGNED_TEAM_MEMBER,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        let findRoleId = await UserModel.findOne(
          {
            _id: model.team_member,
          },
          { role: 1 }
        );

        if (findRoleId && findRoleId.role)
          model.role_id = findRoleId.role.toString();
        else {
          return {
            success: false,
            data: {
              message:
                errorMessage.ERROR_ON_GET_ASSIGNED_TEAM_MEMBER,
              error: errorMessage.ON_ADD_ERROR,
            },
            status_code: HttpStatus.BAD_REQUEST,
          };
        }
        let saveTeamResult = await AssignTeamModel.create(
          model
        );

        let getTeamResult = await AssignTeamModel.findOne(
          { _id: saveTeamResult._id },
          {
            select: {
              createdby_id: 0,
              appointment_id: 0,
              __v: 0,
            },
          }
        ).populate([
          {
            path: "team_member",
            select: { _id: 1, first_name: 1, last_name: 1 },
          },
        ]);

        if (getTeamResult) {
          let addHistory = await HistoryModel.create({
            user_id: model.createdby_id,
            description: `team member added`,
            type: EHistoryActivityTypeValues.CLINIC,
            type_id: model.team_member,
          });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: getTeamResult,
          };
        } else {
          return {
            success: false,
            data: {
              message:
                errorMessage.ERROR_ON_ADD_ASSIGNED_TEAM_MEMBER,
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
  updateAssignTeam = async (
    req: Request,
    model: UpdateAssignTeamViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      if ("team_member" in model) {
        let findRoleId = await UserModel.findOne(
          {
            _id: model.team_member,
          },
          { role: 1 }
        );

        if (findRoleId && findRoleId.role)
          model.role_id = findRoleId.role.toString();
        else {
          return {
            success: false,
            data: {
              message:
                errorMessage.ERROR_ON_GET_ASSIGNED_TEAM_MEMBER,
              error: errorMessage.ON_ADD_ERROR,
            },
            status_code: HttpStatus.BAD_REQUEST,
          };
        }
      }
      let updateResult =
        await AssignTeamModel.findOneAndUpdate(
          { _id: model._id },
          model,
          {
            new: true,
          }
        );
      if (updateResult) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `team member added`,
          type: EHistoryActivityTypeValues.CLINIC,
          type_id: model.team_member,
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
            message:
              errorMessage.ERROR_ON_UPDATE_ASSIGNED_TEAM_MEMBER,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  deleteAssignTeam = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let deleteResult = await AssignTeamModel.updateOne(
        { _id: req.params._id },
        { isDeleted: true }
      );
      if (deleteResult && deleteResult.modifiedCount > 0) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `team member removed from team`,
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
            message:
              errorMessage.ERROR_ON_DELETE_ASSIGNED_TEAM_MEMBER,
            error: errorMessage.ON_DELETE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  getAssignTeam = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let getAssignTeamResult =
        await AssignTeamModel.findOne({
          _id: model._id,
          isActive: true,
          isDeleted: false,
        }).populate([
          {
            path: "team_member",
            select: { _id: 1, first_name: 1, last_name: 1 },
          },
        ]);
      if (getAssignTeamResult) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: getAssignTeamResult,
        };
      } else {
        return {
          success: false,
          data: {
            message:
              errorMessage.ERROR_ON_GET_ASSIGNED_TEAM_MEMBER,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  listAssignTeam = async (
    req: Request,
    model: GetAssignTeamListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;
      defaultPage = model.pageNumber ? model.pageNumber : 1;
      count = model.pageSize ? model.pageSize : 50;
      let populateFeilds: any = [
        {
          path: "team_member",
          select: { _id: 1, first_name: 1, last_name: 1 },
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

      let result: mongoose.PaginateResult<any> =
        await AssignTeamModel.paginate(condition, {
          page: defaultPage,
          ...(count > 0
            ? { limit: count }
            : { pagination: false }),
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
          totalPages: Math.ceil(
            result.totalDocs / result.limit
          ),
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
            message:
              errorMessage.ASSIGNED_TEAM_MEMBER_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new AssignTeamServices();
