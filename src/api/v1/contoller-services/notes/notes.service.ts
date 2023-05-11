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
import NotesModel, { Notes } from "../../models/notes.model";
import {
  AddNotesViewmodel,
  UpdateNotesViewmodel,
  GetNotesListViewmodel,
} from "../../view-models/notes";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";

class NotesServices {
  addNotes = async (
    req: Request,
    model: AddNotesViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      model.createdby_id = userDetails._id;

      let alreadyPresentNotes = await NotesModel.findOne(model);
      if (alreadyPresentNotes) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_NOTES,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        // let skillData = {
        //   skillName: model.skillName,
        //   //createdby_id: userDetails._id,
        // };

        let saveNotesResult = await NotesModel.create(model);

        let getNoteResult = await NotesModel.findOne(
          {
            _id: saveNotesResult._id,
          },
          { isDeleted: 0, isActive: 0, updatedAt: 0, __v: 0 }
        ).populate([
          {
            path: "createdby_id",
            select: { _id: 1, first_name: 1, last_name: 1 },
          },
          {
            path: "note_type",
            select: { _id: 1, type: 1 },
          },
        ]);

        if (saveNotesResult && getNoteResult) {
          let dataObj: any = {};
          dataObj = getNoteResult;

          dataObj.createdBy = getNoteResult.createdby_id;
          delete dataObj.createdby_id;

          let addHistory = await HistoryModel.create({
            user_id: model.createdby_id,
            description: `notes added`,
            type: EHistoryActivityTypeValues.PATIENT,
            type_id: model.patient_id,
          });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: dataObj,
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_ADD_NOTES,
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
  updateNotes = async (
    req: Request,
    model: UpdateNotesViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let updateNotesResult = await NotesModel.findOneAndUpdate(
        { _id: model._id },
        model,
        {
          new: true,
        }
      );
      if (updateNotesResult) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `notes updated`,
          type: EHistoryActivityTypeValues.PATIENT,
          type_id: updateNotesResult.patient_id,
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
            message: errorMessage.ERROR_ON_UPDATE_NOTES,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  deleteNotes = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let deleteNotesResult = await NotesModel.updateOne(
        { _id: req.params._id },
        { isDeleted: true }
      );
      if (deleteNotesResult && deleteNotesResult.modifiedCount > 0) {
        // let addHistory = await HistoryModel.create({
        //   user_id: userDetails._id,
        //   description: `notes deleted`,
        //   type: EHistoryActivityTypeValues.PATIENT,
        //   type_id: model.patient_id,
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
            message: errorMessage.ERROR_ON_DELETE_NOTES,
            error: errorMessage.ON_DELETE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  getNotes = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let getNotesResult = await NotesModel.findOne(
        {
          _id: model._id,
          // isActive: true,
          // isDeleted: false,
        },
        { isDeleted: 0, isActive: 0, updatedAt: 0, __v: 0 }
      ).populate([
        {
          path: "createdby_id",
          select: { _id: 1, first_name: 1, last_name: 1 },
        },
        {
          path: "note_type",
          select: { _id: 1, type: 1 },
        },
      ]);
      if (getNotesResult) {
        let dataObj: any = {};
        dataObj = getNotesResult;

        dataObj.createdBy = getNotesResult.createdby_id;
        delete dataObj.createdby_id;
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: dataObj,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_GET_NOTES,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  listNotes = async (
    req: Request,
    model: GetNotesListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;
      defaultPage = model.pageNumber ? model.pageNumber : 1;
      count = model.pageSize ? model.pageSize : 50;
      let populateFeilds: any = [
        {
          path: "createdby_id",
          select: { _id: 1, first_name: 1, last_name: 1 },
        },
        {
          path: "note_type",
          select: { _id: 1, type: 1 },
        },
      ];

      let condition: any = {
        isDeleted: false,
        clinic_id: model.clinic_id,
      };

      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

        condition.notes = {
          $regex: model.search,
          $options: "i",
        };
      }

      if (model.isActive) {
        condition.isActive = model.isActive;
      }

      let result: mongoose.PaginateResult<any> = await NotesModel.paginate(
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
            notes: d.notes,
            createdBy: d.createdby_id,
            note_type: d.note_type,
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
            message: errorMessage.NOTES_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new NotesServices();
