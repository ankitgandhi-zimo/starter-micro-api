import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../../v1/common/common-methods";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddFilledProgressNoteViewmodel,
  UpdateFilledProgressNoteViewmodel,
  GetFilledProgressNoteListViewmodel,
  CheckOutViewmodel,
} from "../../view-models/filledProgressNote";

import FilledProgressNoteService from "./filledProgressNote.service";

class FilledProgressNote_Controller {
  addFilledProgressNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddFilledProgressNoteViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddFilledProgressNoteViewmodel =
          conversionResult.data as AddFilledProgressNoteViewmodel;

        let addProgressNoteResult =
          await FilledProgressNoteService.addFilledProgressNote(
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
  updateFilledProgressNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateFilledProgressNoteViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateFilledProgressNoteViewmodel =
          conversionResult.data as UpdateFilledProgressNoteViewmodel;

        let updateProgressNoteResult =
          await FilledProgressNoteService.updateFilledProgressNote(
            req,
            model,
            next
          );

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
  deleteFilledProgressNote = async (
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
          await FilledProgressNoteService.deleteFilledProgressNote(
            req,
            model,
            next
          );

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
  getFilledProgressNote = async (
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

        let getProgressNoteResult =
          await FilledProgressNoteService.getFilledProgressNote(
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
  listFilledProgressNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetFilledProgressNoteListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetFilledProgressNoteListViewmodel =
          conversionResult.data as GetFilledProgressNoteListViewmodel;

        let listProgressNoteResult =
          await FilledProgressNoteService.listFilledProgressNote(
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

  checkoutData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        CheckOutViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: CheckOutViewmodel =
          conversionResult.data as CheckOutViewmodel;

        let result = await FilledProgressNoteService.checkoutData(
          req,
          model,
          next
        );

        if (result)
          return res.status(200).json({
            status_code: result.status_code,
            success: result.success,

            ...(result.success
              ? { data: result.data }
              : {
                  ...(result.success
                    ? { data: result.data }
                    : { errors: result.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  listProgressNoteCheckout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        CheckOutViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: CheckOutViewmodel =
          conversionResult.data as CheckOutViewmodel;

        let result = await FilledProgressNoteService.listProgressNoteCheckout(
          req,
          model,
          next
        );

        if (result)
          return res.status(200).json({
            status_code: result.status_code,
            success: result.success,

            ...(result.success
              ? { data: result.data }
              : {
                  ...(result.success
                    ? { data: result.data }
                    : { errors: result.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  //listProgressNoteCheckout
  //checkoutData
}
export default new FilledProgressNote_Controller();
