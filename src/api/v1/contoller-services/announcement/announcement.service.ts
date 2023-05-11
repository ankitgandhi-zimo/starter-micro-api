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
import AnnouncementModel, {
  Announcement,
} from "../../models/announcement.model";

import {
  AddAnnouncementViewmodel,
  UpdateAnnouncementViewmodel,
  GetAnnouncementListViewmodel,
} from "../../view-models/announcement";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import { app } from "../../../..";
import { EnumSocketEvents } from "../../common/socket";

class AnnouncementServices {
  addAnnouncement = async (
    req: Request,
    model: AddAnnouncementViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      model.createdby_id = userDetails._id;

      let saveResult = await AnnouncementModel.create(model);

      if (saveResult) {
        global.socketUsersList.forEach(function (value, key) {
          app
            .get("socketIO")
            .to(global.socketUsersList.get(key))
            .emit(EnumSocketEvents.ANNOUNCEMENT, {
              title: saveResult.title,
              description: saveResult.description,
              image: saveResult.image,
            });
        });

        let addHistory = await HistoryModel.create({
          user_id: model.createdby_id,
          description: `Announcement added`,
          type: EHistoryActivityTypeValues.ANNOUNCEMENT,
          type_id: saveResult._id,
        });
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: saveResult,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_ADD_ANNOUNCEMENT,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  updateAnnouncement = async (
    req: Request,
    model: UpdateAnnouncementViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let id = model._id;

      // let updateObj: any = {};
      // if (
      //   "isActive" in model &&
      //   model.isActive != null &&
      //   model.isActive != undefined
      // )
      //   updateObj.isActive = model.isActive;
      // if (
      //   "isDeleted" in model &&
      //   model.isDeleted != null &&
      //   model.isDeleted != undefined
      // )
      //   updateObj.isDeleted = model.isDeleted;
      // if (model.title) updateObj.title = model.title;
      // if (model.description) updateObj.description = model.description;
      // if (model.image) updateObj.image = model.image;
      let updateResult = await AnnouncementModel.findOneAndUpdate(
        { _id: id },
        model,
        {
          new: true,
        }
      );
      if (updateResult) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `Announcement updated`,
          type: EHistoryActivityTypeValues.ANNOUNCEMENT,
          type_id: id,
        });
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
            message: errorMessage.ERROR_ON_UPDATE_ANNOUNCEMENT,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };

  getAnnouncement = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let getResult = await AnnouncementModel.findOne({
        _id: model._id,
        // isActive: true,
        // isDeleted: false,
      });
      if (getResult) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: getResult,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_GET_ANNOUNCEMENT,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  listAnnouncement = async (
    req: Request,
    model: GetAnnouncementListViewmodel,
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

        condition.title = {
          $regex: model.search,
          $options: "i",
        };
      }

      if ("isActive" in model && model.isActive != undefined) {
        condition.isActive = model.isActive;
      }
      if ("isDeleted" in model && model.isDeleted != undefined) {
        condition.isDeleted = model.isDeleted;
      }
      let result: mongoose.PaginateResult<any> =
        await AnnouncementModel.paginate(condition, {
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
            message: errorMessage.ANNOUNCEMENT_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new AnnouncementServices();
