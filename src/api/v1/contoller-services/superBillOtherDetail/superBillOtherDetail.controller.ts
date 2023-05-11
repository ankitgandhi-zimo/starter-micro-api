import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../../v1/common/common-methods";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddSuperBillOtherDetailViewmodel,
  UpdateSuperBillOtherDetailViewmodel,
  GetSuperBillOtherDetailListViewmodel,
} from "../../view-models/superBillOtherDetail";

import superBillOtherDetailService from "./superBillOtherDetail.service";

class SuperBillOtherDetail_Controller {
  addSuperBillOtherDetail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddSuperBillOtherDetailViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddSuperBillOtherDetailViewmodel =
          conversionResult.data as AddSuperBillOtherDetailViewmodel;

        let addSuperBillResult =
          await superBillOtherDetailService.addSuperBillOtherDetail(
            req,
            model,
            next
          );

        if (addSuperBillResult)
          return res.status(200).json({
            status_code: addSuperBillResult.status_code,
            success: addSuperBillResult.success,

            ...(addSuperBillResult.success
              ? { data: addSuperBillResult.data }
              : {
                  ...(addSuperBillResult.success
                    ? { data: addSuperBillResult.data }
                    : { errors: addSuperBillResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  updateSuperBillOtherDetail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateSuperBillOtherDetailViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateSuperBillOtherDetailViewmodel =
          conversionResult.data as UpdateSuperBillOtherDetailViewmodel;

        let updateSuperBillResult =
          await superBillOtherDetailService.updateSuperBillOtherDetail(
            req,
            model,
            next
          );

        if (updateSuperBillResult)
          return res.status(200).json({
            status_code: updateSuperBillResult.status_code,
            success: updateSuperBillResult.success,

            ...(updateSuperBillResult.success
              ? { data: updateSuperBillResult.data }
              : {
                  ...(updateSuperBillResult.success
                    ? { data: updateSuperBillResult.data }
                    : { errors: updateSuperBillResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  getSuperBillOtherDetail = async (
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

        let getBillResult =
          await superBillOtherDetailService.getSuperBillOtherDetail(
            req,
            model,
            next
          );

        if (getBillResult)
          return res.status(200).json({
            status_code: getBillResult.status_code,
            success: getBillResult.success,

            ...(getBillResult.success
              ? { data: getBillResult.data }
              : {
                  ...(getBillResult.success
                    ? { data: getBillResult.data }
                    : { errors: getBillResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  deleteSuperBillOtherDetail = async (
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

        let deleteSuperBillResult =
          await superBillOtherDetailService.deleteSuperBillOtherDetail(
            req,
            model,
            next
          );

        if (deleteSuperBillResult)
          return res.status(200).json({
            status_code: deleteSuperBillResult.status_code,
            success: deleteSuperBillResult.success,

            ...(deleteSuperBillResult.success
              ? { data: deleteSuperBillResult.data }
              : {
                  ...(deleteSuperBillResult.success
                    ? { data: deleteSuperBillResult.data }
                    : {
                        errors: deleteSuperBillResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new SuperBillOtherDetail_Controller();
