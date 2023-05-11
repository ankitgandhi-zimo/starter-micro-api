import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, {
  ValidationResult,
} from "../../../../v1/common/common-methods";
import { CheckMongoIdViewmodel } from "../../../view-models/check_mongo_id.viewmodel";
import {
  AddFormCategoryViewmodel,
  UpdateFormCategoryViewmodel,
  GetFormCategoryListViewmodel,
} from "../../../view-models/dynamicForm";

import FormCategoryService from "./formCategory.service";

class FormCategory_Controller {
  addFormCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddFormCategoryViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddFormCategoryViewmodel =
          conversionResult.data as AddFormCategoryViewmodel;

        let addDynamicFormResult = await FormCategoryService.addFormCategory(
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
  updateFormCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateFormCategoryViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateFormCategoryViewmodel =
          conversionResult.data as UpdateFormCategoryViewmodel;

        let updateResult = await FormCategoryService.updateFormCategory(
          req,
          model,
          next
        );

        if (updateResult)
          return res.status(200).json({
            status_code: updateResult.status_code,
            success: updateResult.success,

            ...(updateResult.success
              ? { data: updateResult.data }
              : {
                  ...(updateResult.success
                    ? { data: updateResult.data }
                    : { errors: updateResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  deleteFormCategory = async (
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

        let deleteResult = await FormCategoryService.deleteFormCategory(
          req,
          model,
          next
        );

        if (deleteResult)
          return res.status(200).json({
            status_code: deleteResult.status_code,
            success: deleteResult.success,
            ...(deleteResult.success
              ? { data: deleteResult.data }
              : { errors: deleteResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  getFormCategory = async (req: Request, res: Response, next: NextFunction) => {
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

        let getResult = await FormCategoryService.getFormCategory(
          req,
          model,
          next
        );

        if (getResult)
          return res.status(200).json({
            status_code: getResult.status_code,
            success: getResult.success,

            ...(getResult.success
              ? { data: getResult.data }
              : {
                  ...(getResult.success
                    ? { data: getResult.data }
                    : { errors: getResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  listFormCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetFormCategoryListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetFormCategoryListViewmodel =
          conversionResult.data as GetFormCategoryListViewmodel;

        let listResult = await FormCategoryService.listFormCategory(
          req,
          model,
          next
        );

        if (listResult)
          return res.status(200).json({
            status_code: listResult.status_code,
            success: listResult.success,

            ...(listResult.success
              ? { data: listResult.data }
              : {
                  ...(listResult.success
                    ? { data: listResult.data }
                    : { errors: listResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  filterListFormCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetFormCategoryListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetFormCategoryListViewmodel =
          conversionResult.data as GetFormCategoryListViewmodel;

        let listResult = await FormCategoryService.filterListFormCategory(
          req,
          model,
          next
        );

        if (listResult)
          return res.status(200).json({
            status_code: listResult.status_code,
            success: listResult.success,

            ...(listResult.success
              ? { data: listResult.data }
              : {
                  ...(listResult.success
                    ? { data: listResult.data }
                    : { errors: listResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new FormCategory_Controller();
