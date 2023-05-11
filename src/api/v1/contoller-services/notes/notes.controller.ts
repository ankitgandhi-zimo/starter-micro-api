import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../../v1/common/common-methods";
import {
  AddNotesViewmodel,
  UpdateNotesViewmodel,
  GetNotesListViewmodel,
} from "../../view-models/notes";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import notesService from "./notes.service";
class Notes_Controller {
  addNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddNotesViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddNotesViewmodel =
          conversionResult.data as AddNotesViewmodel;

        let addNotesResult = await notesService.addNotes(req, model, next);

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
  updateNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateNotesViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateNotesViewmodel =
          conversionResult.data as UpdateNotesViewmodel;

        let updateNotesResult = await notesService.updateNotes(
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
  deleteNotes = async (req: Request, res: Response, next: NextFunction) => {
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

        let deleteNotesResult = await notesService.deleteNotes(
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
  getNotes = async (req: Request, res: Response, next: NextFunction) => {
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

        let getNotesResult = await notesService.getNotes(req, model, next);

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
  listNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetNotesListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetNotesListViewmodel =
          conversionResult.data as GetNotesListViewmodel;

        let listNotesResult = await notesService.listNotes(req, model, next);

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
export default new Notes_Controller();
