import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, {
  ValidationResult,
} from "../../../../v1/common/common-methods";
import {
  AddNoteTypeViewmodel,
  UpdateNoteTypeViewmodel,
  GetNoteTypeListViewmodel,
} from "../../../view-models/notes";
import { CheckMongoIdViewmodel } from "../../../view-models/check_mongo_id.viewmodel";
import noteTypeService from "./note_type.service";
class NoteType_Controller {
  addNoteType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddNoteTypeViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddNoteTypeViewmodel =
          conversionResult.data as AddNoteTypeViewmodel;

        let addNotesResult = await noteTypeService.addNoteType(
          req,
          model,
          next
        );

        if (addNotesResult)
          return res.status(200).json({
            status_code: addNotesResult.status_code,
            success: addNotesResult.success,

            ...(addNotesResult.success
              ? { data: addNotesResult.data }
              : {
                  ...(addNotesResult.success
                    ? { data: addNotesResult.data }
                    : { errors: addNotesResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  updateNoteType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateNoteTypeViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateNoteTypeViewmodel =
          conversionResult.data as UpdateNoteTypeViewmodel;

        let updateNotesResult = await noteTypeService.updateNoteType(
          req,
          model,
          next
        );

        if (updateNotesResult)
          return res.status(200).json({
            status_code: updateNotesResult.status_code,
            success: updateNotesResult.success,

            ...(updateNotesResult.success
              ? { data: updateNotesResult.data }
              : {
                  ...(updateNotesResult.success
                    ? { data: updateNotesResult.data }
                    : { errors: updateNotesResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  deleteNoteType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        CheckMongoIdViewmodel,
        JSON.parse(`{"_id":"${req.params._id}"}`)
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: CheckMongoIdViewmodel =
          conversionResult.data as CheckMongoIdViewmodel;

        let deleteNotesResult = await noteTypeService.deleteNoteType(
          req,
          model,
          next
        );

        if (deleteNotesResult)
          return res.status(200).json({
            status_code: deleteNotesResult.status_code,
            success: deleteNotesResult.success,

            ...(deleteNotesResult.success
              ? { data: deleteNotesResult.data }
              : {
                  ...(deleteNotesResult.success
                    ? { data: deleteNotesResult.data }
                    : { errors: deleteNotesResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  getNoteType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        CheckMongoIdViewmodel,
        JSON.parse(`{"_id":"${req.params._id}"}`)
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: CheckMongoIdViewmodel =
          conversionResult.data as CheckMongoIdViewmodel;

        let getNotesResult = await noteTypeService.getNoteType(
          req,
          model,
          next
        );

        if (getNotesResult)
          return res.status(200).json({
            status_code: getNotesResult.status_code,
            success: getNotesResult.success,

            ...(getNotesResult.success
              ? { data: getNotesResult.data }
              : {
                  ...(getNotesResult.success
                    ? { data: getNotesResult.data }
                    : { errors: getNotesResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  listNoteType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetNoteTypeListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetNoteTypeListViewmodel =
          conversionResult.data as GetNoteTypeListViewmodel;

        let listNotesResult = await noteTypeService.listNoteType(
          req,
          model,
          next
        );

        if (listNotesResult)
          return res.status(200).json({
            status_code: listNotesResult.status_code,
            success: listNotesResult.success,

            ...(listNotesResult.success
              ? { data: listNotesResult.data }
              : {
                  ...(listNotesResult.success
                    ? { data: listNotesResult.data }
                    : { errors: listNotesResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  filterListNoteType = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetNoteTypeListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetNoteTypeListViewmodel =
          conversionResult.data as GetNoteTypeListViewmodel;

        let listNotesResult = await noteTypeService.filterListNoteType(
          req,
          model,
          next
        );

        if (listNotesResult)
          return res.status(200).json({
            status_code: listNotesResult.status_code,
            success: listNotesResult.success,

            ...(listNotesResult.success
              ? { data: listNotesResult.data }
              : {
                  ...(listNotesResult.success
                    ? { data: listNotesResult.data }
                    : { errors: listNotesResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new NoteType_Controller();
