import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../../v1/common/common-methods";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddProgressNoteViewmodel,
  UpdateProgressNoteViewmodel,
  GetProgressNoteListViewmodel,
  ImportProgressNoteViewmodel,
} from "../../view-models/progressNote";

import progressNoteService from "./progressNote.service";

class ProgressNote_Controller {
  addProgressNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddProgressNoteViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddProgressNoteViewmodel =
          conversionResult.data as AddProgressNoteViewmodel;

        let addProgressNoteResult = await progressNoteService.addProgressNote(
          req,
          model,
          next
        );

        if (addProgressNoteResult)
          return res.status(200).json({
            status_code: addProgressNoteResult.status_code,
            success: addProgressNoteResult.success,

            ...(addProgressNoteResult.success
              ? { data: addProgressNoteResult.data }
              : {
                  ...(addProgressNoteResult.success
                    ? { data: addProgressNoteResult.data }
                    : { errors: addProgressNoteResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  updateProgressNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateProgressNoteViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateProgressNoteViewmodel =
          conversionResult.data as UpdateProgressNoteViewmodel;

        let updateProgressNoteResult =
          await progressNoteService.updateProgressNote(req, model, next);

        if (updateProgressNoteResult)
          return res.status(200).json({
            status_code: updateProgressNoteResult.status_code,
            success: updateProgressNoteResult.success,

            ...(updateProgressNoteResult.success
              ? { data: updateProgressNoteResult.data }
              : {
                  ...(updateProgressNoteResult.success
                    ? { data: updateProgressNoteResult.data }
                    : { errors: updateProgressNoteResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  deleteProgressNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
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

        let deleteProgressNoteResult =
          await progressNoteService.deleteProgressNote(req, model, next);

        if (deleteProgressNoteResult)
          return res.status(200).json({
            status_code: deleteProgressNoteResult.status_code,
            success: deleteProgressNoteResult.success,
            ...(deleteProgressNoteResult.success
              ? { data: deleteProgressNoteResult.data }
              : { errors: deleteProgressNoteResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  getProgressNote = async (req: Request, res: Response, next: NextFunction) => {
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

        let getProgressNoteResult = await progressNoteService.getProgressNote(
          req,
          model,
          next
        );

        if (getProgressNoteResult)
          return res.status(200).json({
            status_code: getProgressNoteResult.status_code,
            success: getProgressNoteResult.success,

            ...(getProgressNoteResult.success
              ? { data: getProgressNoteResult.data }
              : {
                  ...(getProgressNoteResult.success
                    ? { data: getProgressNoteResult.data }
                    : { errors: getProgressNoteResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  listProgressNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetProgressNoteListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetProgressNoteListViewmodel =
          conversionResult.data as GetProgressNoteListViewmodel;

        let listProgressNoteResult = await progressNoteService.listProgressNote(
          req,
          model,
          next
        );

        if (listProgressNoteResult)
          return res.status(200).json({
            status_code: listProgressNoteResult.status_code,
            success: listProgressNoteResult.success,

            ...(listProgressNoteResult.success
              ? { data: listProgressNoteResult.data }
              : {
                  ...(listProgressNoteResult.success
                    ? { data: listProgressNoteResult.data }
                    : { errors: listProgressNoteResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  importProgressNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        ImportProgressNoteViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: ImportProgressNoteViewmodel =
          conversionResult.data as ImportProgressNoteViewmodel;

        let importResult = await progressNoteService.importProgressNote(
          req,
          model,
          next
        );

        if (importResult)
          return res.status(200).json({
            status_code: importResult.status_code,
            success: importResult.success,

            ...(importResult.success
              ? { data: importResult.data }
              : {
                  ...(importResult.success
                    ? { data: importResult.data }
                    : { errors: importResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new ProgressNote_Controller();
