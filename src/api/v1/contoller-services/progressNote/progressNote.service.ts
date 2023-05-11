import { DocumentType } from "@typegoose/typegoose";
import { NextFunction, Request } from "express";
import HttpStatus from "http-status-codes";
import mongoose from "mongoose";
import { IServiceResult1 } from "../../common/common-methods";
import errorMessage from "../../common/erros_message";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";
import ProgressNoteModel from "../../models/progress_notes.model";
import { User } from "../../models/user.model";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddProgressNoteViewmodel,
  GetProgressNoteListViewmodel,
  ImportProgressNoteViewmodel,
  UpdateProgressNoteViewmodel,
} from "../../view-models/progressNote";
import { FormFields } from "../../view-models/progressNote/add_progressNote.viewmodel";
export enum EnumRole {
  PROVIDER = "provider",
}
class ProgressNoteServices {
  addProgressNote = async (
    req: Request,
    model: AddProgressNoteViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      model.createdby_id = userDetails._id;
      let alreadyPresentProgressNote = await ProgressNoteModel.findOne({
        form_title: model.form_title,
        clinic_id: model.clinic_id,
      });

      if (alreadyPresentProgressNote) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_PROGRESS_NOTE,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        let saveProgressNoteResult = await ProgressNoteModel.create(model);

        if (saveProgressNoteResult) {
          let addHistory = await HistoryModel.create({
            user_id: model.createdby_id,
            description: `progress note added`,
            type: EHistoryActivityTypeValues.CLINIC,
            type_id: saveProgressNoteResult._id,
          });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: {
              _id: saveProgressNoteResult._id,
              isActive: saveProgressNoteResult.isActive,
              form_title: saveProgressNoteResult.form_title,
              fields: saveProgressNoteResult.fields,
              clinic_id: saveProgressNoteResult.clinic_id,
            },
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_ADD_PROGRESS_NOTE,
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
  updateProgressNote = async (
    req: Request,
    model: UpdateProgressNoteViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let alreadyPresentProgressNote = await ProgressNoteModel.findOne({
        form_title: model.form_title,
        _id: { $ne: model._id },
      });
      if (alreadyPresentProgressNote) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `progress note updated`,
          type: EHistoryActivityTypeValues.CLINIC,
          type_id: model._id,
        });
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_PROGRESS_NOTE,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        let updateProgressNoteResult = await ProgressNoteModel.findOneAndUpdate(
          { _id: model._id },
          model,
          {
            new: true,
          }
        );

        if (updateProgressNoteResult) {
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.UPDATE_SUCCESSFULL,
            // data: {
            //   _id: updateProgressNoteResult._id,
            //   isActive: updateProgressNoteResult.isActive,
            //   form_title: updateProgressNoteResult.form_title,
            //   fields: updateProgressNoteResult.fields,
            //   clinic_id: updateProgressNoteResult.clinic_id,
            // },
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_UPDATE_PROGRESS_NOTE,
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
  deleteProgressNote = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let deleteProgressNoteResult = await ProgressNoteModel.updateOne(
        { _id: req.params._id },
        { isDeleted: true }
      );
      if (
        deleteProgressNoteResult &&
        deleteProgressNoteResult.modifiedCount > 0
      ) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.DELETE_SUCCESSFULL,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_DELETE_PROGRESS_NOTE,
            error: errorMessage.ON_DELETE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  getProgressNote = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let getProgressNoteResult = await ProgressNoteModel.findOne({
        _id: model._id,
        // isActive: true,
        // isDeleted: false,
      });
      if (getProgressNoteResult) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: {
            _id: getProgressNoteResult._id,
            isActive: getProgressNoteResult.isActive,
            form_title: getProgressNoteResult.form_title,
            fields: getProgressNoteResult.fields,
            clinic_id: getProgressNoteResult.clinic_id,
          },
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_GET_PROGRESS_NOTE,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      console.log(error, "dkfhkdh");
      next(error);
    }
  };
  listProgressNote = async (
    req: Request,
    model: GetProgressNoteListViewmodel,
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

        condition.form_title = {
          $regex: model.search,
          $options: "i",
        };
      }

      if ("saveAsDraft" in model && model.saveAsDraft != undefined) {
        condition.saveAsDraft = model.saveAsDraft;
      }

      if ("isActive" in model && model.isActive != undefined) {
        condition.isActive = model.isActive;
      }

      if (model.clinic_id) {
        condition.clinic_id = model.clinic_id;
      }

      let result: mongoose.PaginateResult<any> =
        await ProgressNoteModel.paginate(condition, {
          page: defaultPage,
          ...(count > 0 ? { limit: count } : { pagination: false }),
          populate: populateFeilds,
          select: { fields: 0, __v: 0 },
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
            message: errorMessage.PROGRESS_NOTE_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
  importProgressNote = async (
    req: Request,
    model: ImportProgressNoteViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      model.createdby_id = userDetails._id;
      let alreadyPresentNote = await ProgressNoteModel.findOne({
        progress_note_id: model.progress_note_id,
        clinic_id: model.clinic_id,
      });
      if (alreadyPresentNote) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_PROGRESS_NOTE,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        let formData = await ProgressNoteModel.findOne({
          _id: model.progress_note_id,
        });
        if (formData) {
          model.form_title = formData?.form_title;
          model.fields = formData?.fields as FormFields[];
          model.import = true;
          let importResult = await ProgressNoteModel.create(model);

          if (importResult) {
            return {
              status_code: HttpStatus.OK,
              success: true,
              data: errorMessage.PROGRESS_NOTE_IMPORT_SUCCESSFULL,
            };
          } else {
            return {
              success: false,
              data: {
                message: errorMessage.PROGRESS_NOTE_IMPORT_FAILED,
                error: errorMessage.ON_ADD_ERROR,
              },
              status_code: HttpStatus.BAD_REQUEST,
            };
          }
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_GET_PROGRESS_NOTE,
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
}
export default new ProgressNoteServices();
