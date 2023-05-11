import { DocumentType } from "@typegoose/typegoose";
import bcrypt from "bcrypt";
import { NextFunction, Request } from "express";
import HttpStatus from "http-status-codes";
import mongoose from "mongoose";
import Utility, { IServiceResult1 } from "../../../common/common-methods";
import errorMessage from "../../../common/erros_message";
import { IJWTPayload } from "../../../common/interface/jwtpayload";
import TokenModel from "../../../models/login_token.model";
import Roles from "../../../models/roles.model";
import UserModel, { User } from "../../../models/user.model";
import NoteTypeModel from "../../../models/note_type.model";
import AppointmentModel from "../../../models/appointment.model";
import {
  AddNoteTypeViewmodel,
  UpdateNoteTypeViewmodel,
  GetNoteTypeListViewmodel,
} from "../../../view-models/notes";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../../models/history.model";
import { CheckMongoIdViewmodel } from "../../../view-models/check_mongo_id.viewmodel";

class NoteTypeServices {
  addNoteType = async (
    req: Request,
    model: AddNoteTypeViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      model.createdby_id = userDetails._id;

      let alreadyPresentNoteType = await NoteTypeModel.findOne({
        type: model.type,
        clinic_id: model.clinic_id,
      });
      if (alreadyPresentNoteType) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_NOTE_TYPE,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        let saveNotesResult = await NoteTypeModel.create(model);

        // let getNoteResult = await NoteTypeModel.findOne(
        //   {
        //     _id: saveNotesResult._id,
        //   },
        //   { isDeleted: 0, isActive: 0, updatedAt: 0, __v: 0 }
        // );
        if (saveNotesResult) {
          //

          let addHistory = await HistoryModel.create({
            user_id: model.createdby_id,
            description: `Note type added`,
            type: EHistoryActivityTypeValues.CLINIC,
            type_id: saveNotesResult._id,
          });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: saveNotesResult,
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_ADD_NOTE_TYPE,
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
  updateNoteType = async (
    req: Request,
    model: UpdateNoteTypeViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let updateNotesResult = await NoteTypeModel.findOneAndUpdate(
        { _id: model._id },
        model,
        {
          new: true,
        }
      );
      if (updateNotesResult) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `Note type updated`,
          type: EHistoryActivityTypeValues.CLINIC,
          type_id: model._id,
        });
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.UPDATE_SUCCESSFULL,
          // data: {
          //   _id: updateCountryResult._id,
          //   countryName: updateCountryResult.countryName,
          //   countryCode: updateCountryResult.countryCode,
          // },
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_UPDATE_NOTE_TYPE,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  deleteNoteType = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let deleteNotesResult = await NoteTypeModel.updateOne(
        { _id: req.params._id },
        { isDeleted: true }
      );
      if (deleteNotesResult && deleteNotesResult.modifiedCount > 0) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `user deleted note type`,
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
            message: errorMessage.ERROR_ON_DELETE_NOTE_TYPE,
            error: errorMessage.ON_DELETE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  getNoteType = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let getNotesResult = await NoteTypeModel.findOne(
        {
          _id: model._id,
          // isActive: true,
          // isDeleted: false,
        },
        { updatedAt: 0, __v: 0 }
      );
      if (getNotesResult) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: getNotesResult,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_GET_NOTE_TYPE,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  listNoteType = async (
    req: Request,
    model: GetNoteTypeListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;
      defaultPage = model.pageNumber ? model.pageNumber : 1;
      count = model.pageSize ? model.pageSize : 50;
      let populateFeilds: any = [];

      let condition: any = {
        // isDeleted: false,
      };

      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

        condition.type = {
          $regex: model.search,
          $options: "i",
        };
      }

      if (model.clinic_id) condition.clinic_id = model.clinic_id;
      if ("isActive" in model && model.isActive != undefined) {
        condition.isActive = model.isActive;
      }
      if ("isDeleted" in model && model.isDeleted != undefined) {
        condition.isDeleted = model.isDeleted;
      }

      // if (model.isActive) {
      //   condition.isActive = model.isActive;
      // }

      let result: mongoose.PaginateResult<any> = await NoteTypeModel.paginate(
        condition,
        {
          page: defaultPage,
          ...(count > 0 ? { limit: count } : { pagination: false }),
          populate: populateFeilds,

          sort: { createdAt: -1 },
        }
      );

      if (result && result.docs && result.docs.length > 0) {
        let formatted_data: any = [];
        result.docs.forEach((d) => {
          formatted_data.push({
            _id: d._id,
            type: d.type,
            isActive: d.isActive,
            isDeleted: d.isDeleted,
            createdBy: d.createdby_id,
            createdAt: d.createdAt,
          });
          // _id: saveNotesResult._id,
          //     notes: saveNotesResult.notes,
          //     createdBy: getNoteResult.createdby_id,
        });
        let obj = {
          data: formatted_data,
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
            message: errorMessage.NOTE_TYPE_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
  filterListNoteType = async (
    req: Request,
    model: GetNoteTypeListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let condition: any = {
        isDeleted: false,
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

      let response = await NoteTypeModel.find(condition, {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
        isDeleted: 0,
        isActive: 0,
        createdby_id: 0,
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
            message: errorMessage.NOTE_TYPE_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new NoteTypeServices();
