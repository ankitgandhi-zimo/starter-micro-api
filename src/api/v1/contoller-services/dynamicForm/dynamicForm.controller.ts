import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../../v1/common/common-methods";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddDynamicFormViewmodel,
  UpdateDynamicFormViewmodel,
  GetDynamicFormListViewmodel,
  ImportDynamicFormViewmodel,
} from "../../view-models/dynamicForm";

import DynamicFormService from "./dynamicForm.service";

class DynamicForm_Controller {
  addDynamicForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddDynamicFormViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddDynamicFormViewmodel =
          conversionResult.data as AddDynamicFormViewmodel;

        let addDynamicFormResult = await DynamicFormService.addDynamicForm(
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
  updateDynamicForm = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateDynamicFormViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateDynamicFormViewmodel =
          conversionResult.data as UpdateDynamicFormViewmodel;

        let addDynamicFormResult = await DynamicFormService.updateDynamicForm(
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
  deleteDynamicForm = async (
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
          await DynamicFormService.deleteDynamicForm(req, model, next);

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
  getDynamicForm = async (req: Request, res: Response, next: NextFunction) => {
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

        let getDynamicFormResult = await DynamicFormService.getDynamicForm(
          req,
          model,
          next
        );

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
  listDynamicForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetDynamicFormListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetDynamicFormListViewmodel =
          conversionResult.data as GetDynamicFormListViewmodel;

        let listDynamicFormResult = await DynamicFormService.listDynamicForm(
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
  importDynamicForm = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        ImportDynamicFormViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: ImportDynamicFormViewmodel =
          conversionResult.data as ImportDynamicFormViewmodel;

        let importDynamicFormResult =
          await DynamicFormService.importDynamicForm(req, model, next);

        if (importDynamicFormResult)
          return res.status(200).json({
            status_code: importDynamicFormResult.status_code,
            success: importDynamicFormResult.success,

            ...(importDynamicFormResult.success
              ? { data: importDynamicFormResult.data }
              : {
                  ...(importDynamicFormResult.success
                    ? { data: importDynamicFormResult.data }
                    : { errors: importDynamicFormResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  categoryCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetDynamicFormListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetDynamicFormListViewmodel =
          conversionResult.data as GetDynamicFormListViewmodel;

        let categoryResult = await DynamicFormService.categoryCount(
          req,
          model,
          next
        );

        if (categoryResult)
          return res.status(200).json({
            status_code: categoryResult.status_code,
            success: categoryResult.success,

            ...(categoryResult.success
              ? { data: categoryResult.data }
              : {
                  ...(categoryResult.success
                    ? { data: categoryResult.data }
                    : { errors: categoryResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  filterListForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetDynamicFormListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetDynamicFormListViewmodel =
          conversionResult.data as GetDynamicFormListViewmodel;

        let categoryResult = await DynamicFormService.filterListForm(
          req,
          model,
          next
        );

        if (categoryResult)
          return res.status(200).json({
            status_code: categoryResult.status_code,
            success: categoryResult.success,

            ...(categoryResult.success
              ? { data: categoryResult.data }
              : {
                  ...(categoryResult.success
                    ? { data: categoryResult.data }
                    : { errors: categoryResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  //filterListForm
}
export default new DynamicForm_Controller();
