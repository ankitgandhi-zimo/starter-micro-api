import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../common/common-methods";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddFinancialClassViewmodel,
  GetFinancialClassListViewmodel,
  UpdateFinancialClassViewmodel,
} from "../../view-models/financialClass";

import financialClassServices from "./financialClass.service";

class FinancialClassController {
  public addFinancialClass = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddFinancialClassViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddFinancialClassViewmodel =
          conversionResult.data as AddFinancialClassViewmodel;

        let financialClassResult =
          await financialClassServices.addFinancialClass(req, model, next);
        if (financialClassResult)
          return res.status(200).json({
            status_code: financialClassResult.status_code,
            success: financialClassResult.success,

            ...(financialClassResult.success
              ? { data: financialClassResult.data }
              : {
                  ...(financialClassResult.success
                    ? { data: financialClassResult.data }
                    : {
                        errors: financialClassResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public updateFinancialClass = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateFinancialClassViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateFinancialClassViewmodel =
          conversionResult.data as UpdateFinancialClassViewmodel;

        let financialClassResult =
          await financialClassServices.updateFinancialClass(req, model, next);
        if (financialClassResult)
          return res.status(200).json({
            status_code: financialClassResult.status_code,
            success: financialClassResult.success,

            ...(financialClassResult.success
              ? { data: financialClassResult.data }
              : {
                  ...(financialClassResult.success
                    ? { data: financialClassResult.data }
                    : {
                        errors: financialClassResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  public getFinancialClassDetails = async (
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
        let financialClassDetailsResult =
          await financialClassServices.getFinancialClassDetails(req, next);
        if (financialClassDetailsResult)
          return res.status(200).json({
            status_code: financialClassDetailsResult.status_code,
            success: financialClassDetailsResult.success,
            ...(financialClassDetailsResult.success
              ? { data: financialClassDetailsResult.data }
              : {
                  errors: financialClassDetailsResult.data,
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public deleteFinancialClassDetails = async (
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
        let financialClassDeletionResult =
          await financialClassServices.deleteFinancialClassDetails(req, next);
        if (financialClassDeletionResult)
          return res.status(200).json({
            status_code: financialClassDeletionResult.status_code,
            success: financialClassDeletionResult.success,
            ...(financialClassDeletionResult.success
              ? {
                  data: financialClassDeletionResult.data,
                }
              : {
                  errors: financialClassDeletionResult.data,
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getFinancialClassList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetFinancialClassListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetFinancialClassListViewmodel =
          conversionResult.data as GetFinancialClassListViewmodel;

        let groupListResult =
          await financialClassServices.getFinancialClassList(req, model, next);

        if (groupListResult)
          return res.status(200).json({
            status_code: groupListResult.status_code,
            success: groupListResult.success,
            ...(groupListResult.success
              ? {
                  data: groupListResult.data.data,
                  totalDocs: groupListResult.data.totalDocs,
                  pageNumber: groupListResult.data.pageNumber,
                  pageSize: groupListResult.data.pageSize,
                  totalPages: groupListResult.data.totalPages,
                }
              : { errors: groupListResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default new FinancialClassController();
