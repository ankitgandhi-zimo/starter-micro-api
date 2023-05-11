import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../../v1/common/common-methods";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddFilledTreatmentPlanViewmodel,
  UpdateFilledTreatmentPlanViewmodel,
  GetFilledTreatmentPlanListViewmodel,
  CheckOutViewmodel,
} from "../../view-models/filledTreatmentPlan";

import FilledTreatmentPlanService from "./filledTreatmentPlan.service";

class FilledTreatmentPlan_Controller {
  addTreatmentPlan = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddFilledTreatmentPlanViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddFilledTreatmentPlanViewmodel =
          conversionResult.data as AddFilledTreatmentPlanViewmodel;

        let addTreatmentPlanResult =
          await FilledTreatmentPlanService.addTreatmentPlan(req, model, next);

        if (addTreatmentPlanResult)
          return res.status(200).json({
            status_code: addTreatmentPlanResult.status_code,
            success: addTreatmentPlanResult.success,

            ...(addTreatmentPlanResult.success
              ? { data: addTreatmentPlanResult.data }
              : {
                  ...(addTreatmentPlanResult.success
                    ? { data: addTreatmentPlanResult.data }
                    : { errors: addTreatmentPlanResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  updateTreatmentPlan = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateFilledTreatmentPlanViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateFilledTreatmentPlanViewmodel =
          conversionResult.data as UpdateFilledTreatmentPlanViewmodel;

        let addTreatmentPlanResult =
          await FilledTreatmentPlanService.updateTreatmentPlan(
            req,
            model,
            next
          );

        if (addTreatmentPlanResult)
          return res.status(200).json({
            status_code: addTreatmentPlanResult.status_code,
            success: addTreatmentPlanResult.success,

            ...(addTreatmentPlanResult.success
              ? { data: addTreatmentPlanResult.data }
              : {
                  ...(addTreatmentPlanResult.success
                    ? { data: addTreatmentPlanResult.data }
                    : { errors: addTreatmentPlanResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  deleteTreatmentPlan = async (
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

        let deleteTreatmentPlanResult =
          await FilledTreatmentPlanService.deleteTreatmentPlan(
            req,
            model,
            next
          );

        if (deleteTreatmentPlanResult)
          return res.status(200).json({
            status_code: deleteTreatmentPlanResult.status_code,
            success: deleteTreatmentPlanResult.success,
            ...(deleteTreatmentPlanResult.success
              ? { data: deleteTreatmentPlanResult.data }
              : { errors: deleteTreatmentPlanResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  getTreatmentPlan = async (
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

        let getTreatmentPlanResult =
          await FilledTreatmentPlanService.getTreatmentPlan(req, model, next);

        if (getTreatmentPlanResult)
          return res.status(200).json({
            status_code: getTreatmentPlanResult.status_code,
            success: getTreatmentPlanResult.success,

            ...(getTreatmentPlanResult.success
              ? { data: getTreatmentPlanResult.data }
              : {
                  ...(getTreatmentPlanResult.success
                    ? { data: getTreatmentPlanResult.data }
                    : { errors: getTreatmentPlanResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  listTreatmentPlan = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetFilledTreatmentPlanListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetFilledTreatmentPlanListViewmodel =
          conversionResult.data as GetFilledTreatmentPlanListViewmodel;

        let listTreatmentPlanResult =
          await FilledTreatmentPlanService.listTreatmentPlan(req, model, next);

        if (listTreatmentPlanResult)
          return res.status(200).json({
            status_code: listTreatmentPlanResult.status_code,
            success: listTreatmentPlanResult.success,

            ...(listTreatmentPlanResult.success
              ? { data: listTreatmentPlanResult.data }
              : {
                  ...(listTreatmentPlanResult.success
                    ? { data: listTreatmentPlanResult.data }
                    : { errors: listTreatmentPlanResult.data }),
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

        let result = await FilledTreatmentPlanService.checkoutData(
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
  //checkoutData
}
export default new FilledTreatmentPlan_Controller();
