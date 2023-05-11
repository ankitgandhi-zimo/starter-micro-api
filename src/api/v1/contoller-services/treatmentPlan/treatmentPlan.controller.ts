import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../../v1/common/common-methods";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddTreatmentPlanViewmodel,
  UpdateTreatmentPlanViewmodel,
  GetTreatmentPlanListViewmodel,
  ImportTreatmentPlanViewmodel,
} from "../../view-models/treatmentPlan";

import TreatmentPlanService from "./treatmentPlan.service";

class TreatmentPlan_Controller {
  addTreatmentPlan = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddTreatmentPlanViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddTreatmentPlanViewmodel =
          conversionResult.data as AddTreatmentPlanViewmodel;

        let addTreatmentPlanResult =
          await TreatmentPlanService.addTreatmentPlan(req, model, next);

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
        UpdateTreatmentPlanViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateTreatmentPlanViewmodel =
          conversionResult.data as UpdateTreatmentPlanViewmodel;

        let addTreatmentPlanResult =
          await TreatmentPlanService.updateTreatmentPlan(req, model, next);

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
          await TreatmentPlanService.deleteTreatmentPlan(req, model, next);

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
          await TreatmentPlanService.getTreatmentPlan(req, model, next);

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
        GetTreatmentPlanListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetTreatmentPlanListViewmodel =
          conversionResult.data as GetTreatmentPlanListViewmodel;

        let listTreatmentPlanResult =
          await TreatmentPlanService.listTreatmentPlan(req, model, next);

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
  importTreatmentPlan = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        ImportTreatmentPlanViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: ImportTreatmentPlanViewmodel =
          conversionResult.data as ImportTreatmentPlanViewmodel;

        let importResult = await TreatmentPlanService.importTreatmentPlan(
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
export default new TreatmentPlan_Controller();
