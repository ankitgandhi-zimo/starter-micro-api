import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../../v1/common/common-methods";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddFilledDynamicFormViewmodel,
  UpdateFilledDynamicFormViewmodel,
  GetFilledDynamicFormListViewmodel,
  SendFormViewmodel,
} from "../../view-models/filledDynamicForm";

import FilledDynamicFormService from "./filledDynamicForm.service";

class FilledDynamicForm_Controller {
  addFilledDynamicForm = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddFilledDynamicFormViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddFilledDynamicFormViewmodel =
          conversionResult.data as AddFilledDynamicFormViewmodel;

        let addDynamicFormResult =
          await FilledDynamicFormService.addFilledDynamicForm(req, model, next);

        if (addDynamicFormResult)
          return res.status(200).json({
            status_code: addDynamicFormResult.status_code,
            success: addDynamicFormResult.success,

            ...(addDynamicFormResult.success
              ? { data: addDynamicFormResult.data }
              : {
                  ...(addDynamicFormResult.success
                    ? { data: addDynamicFormResult.data }
                    : { errors: addDynamicFormResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  updateFilledDynamicForm = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateFilledDynamicFormViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateFilledDynamicFormViewmodel =
          conversionResult.data as UpdateFilledDynamicFormViewmodel;

        let addDynamicFormResult =
          await FilledDynamicFormService.updateFilledDynamicForm(
            req,
            model,
            next
          );

        if (addDynamicFormResult)
          return res.status(200).json({
            status_code: addDynamicFormResult.status_code,
            success: addDynamicFormResult.success,

            ...(addDynamicFormResult.success
              ? { data: addDynamicFormResult.data }
              : {
                  ...(addDynamicFormResult.success
                    ? { data: addDynamicFormResult.data }
                    : { errors: addDynamicFormResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  deleteFilledDynamicForm = async (
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

        let deleteDynamicFormResult =
          await FilledDynamicFormService.deleteFilledDynamicForm(
            req,
            model,
            next
          );

        if (deleteDynamicFormResult)
          return res.status(200).json({
            status_code: deleteDynamicFormResult.status_code,
            success: deleteDynamicFormResult.success,
            ...(deleteDynamicFormResult.success
              ? { data: deleteDynamicFormResult.data }
              : { errors: deleteDynamicFormResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  getFilledDynamicForm = async (
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

        let getDynamicFormResult =
          await FilledDynamicFormService.getFilledDynamicForm(req, model, next);

        if (getDynamicFormResult)
          return res.status(200).json({
            status_code: getDynamicFormResult.status_code,
            success: getDynamicFormResult.success,

            ...(getDynamicFormResult.success
              ? { data: getDynamicFormResult.data }
              : {
                  ...(getDynamicFormResult.success
                    ? { data: getDynamicFormResult.data }
                    : { errors: getDynamicFormResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  listFilledDynamicForm = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetFilledDynamicFormListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetFilledDynamicFormListViewmodel =
          conversionResult.data as GetFilledDynamicFormListViewmodel;

        let listDynamicFormResult =
          await FilledDynamicFormService.listFilledDynamicForm(
            req,
            model,
            next
          );

        if (listDynamicFormResult)
          return res.status(200).json({
            status_code: listDynamicFormResult.status_code,
            success: listDynamicFormResult.success,

            ...(listDynamicFormResult.success
              ? { data: listDynamicFormResult.data }
              : {
                  ...(listDynamicFormResult.success
                    ? { data: listDynamicFormResult.data }
                    : { errors: listDynamicFormResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  sendForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        SendFormViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: SendFormViewmodel =
          conversionResult.data as SendFormViewmodel;

        let addDynamicFormResult = await FilledDynamicFormService.sendForm(
          req,
          model,
          next
        );

        if (addDynamicFormResult)
          return res.status(200).json({
            status_code: addDynamicFormResult.status_code,
            success: addDynamicFormResult.success,

            ...(addDynamicFormResult.success
              ? { data: addDynamicFormResult.data }
              : {
                  ...(addDynamicFormResult.success
                    ? { data: addDynamicFormResult.data }
                    : { errors: addDynamicFormResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  //sendForm
}
export default new FilledDynamicForm_Controller();
