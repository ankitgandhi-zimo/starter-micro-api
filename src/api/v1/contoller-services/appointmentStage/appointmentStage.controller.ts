import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../../v1/common/common-methods";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddAppointmentStageViewmodel,
  UpdateAppointmentStageViewmodel,
  GetAppointmentStageListViewmodel,
} from "../../view-models/appointmentStage";

import appointmentStageService from "./appointmentStage.service";

class AppointmentStage_Controller {
  addAppointmentStage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddAppointmentStageViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddAppointmentStageViewmodel =
          conversionResult.data as AddAppointmentStageViewmodel;

        let addAppointmentStageResult =
          await appointmentStageService.addAppointmentStage(req, model, next);

        if (addAppointmentStageResult)
          return res.status(addAppointmentStageResult.status_code).json({
            status_code: addAppointmentStageResult.status_code,
            success: addAppointmentStageResult.success,

            ...(addAppointmentStageResult.success
              ? { data: addAppointmentStageResult.data }
              : {
                  ...(addAppointmentStageResult.success
                    ? { data: addAppointmentStageResult.data }
                    : { errors: addAppointmentStageResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  updateAppointmentStage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateAppointmentStageViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateAppointmentStageViewmodel =
          conversionResult.data as UpdateAppointmentStageViewmodel;

        let updateAppointmentStageResult =
          await appointmentStageService.updateAppointmentStage(
            req,
            model,
            next
          );

        if (updateAppointmentStageResult)
          return res.status(updateAppointmentStageResult.status_code).json({
            status_code: updateAppointmentStageResult.status_code,
            success: updateAppointmentStageResult.success,

            ...(updateAppointmentStageResult.success
              ? { data: updateAppointmentStageResult.data }
              : {
                  ...(updateAppointmentStageResult.success
                    ? { data: updateAppointmentStageResult.data }
                    : { errors: updateAppointmentStageResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  deleteAppointmentStage = async (
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

        let deleteAppointmentStageResult =
          await appointmentStageService.deleteAppointmentStage(
            req,
            model,
            next
          );

        if (deleteAppointmentStageResult)
          return res.status(deleteAppointmentStageResult.status_code).json({
            status_code: deleteAppointmentStageResult.status_code,
            success: deleteAppointmentStageResult.success,
            ...(deleteAppointmentStageResult.success
              ? { data: deleteAppointmentStageResult.data }
              : { errors: deleteAppointmentStageResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  getAppointmentStage = async (
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

        let getAppointmentStageResult =
          await appointmentStageService.getAppointmentStage(req, model, next);

        if (getAppointmentStageResult)
          return res.status(getAppointmentStageResult.status_code).json({
            status_code: getAppointmentStageResult.status_code,
            success: getAppointmentStageResult.success,

            ...(getAppointmentStageResult.success
              ? { data: getAppointmentStageResult.data }
              : {
                  ...(getAppointmentStageResult.success
                    ? { data: getAppointmentStageResult.data }
                    : { errors: getAppointmentStageResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  listAppointmentStage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetAppointmentStageListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetAppointmentStageListViewmodel =
          conversionResult.data as GetAppointmentStageListViewmodel;

        let listAppointmentStageResult =
          await appointmentStageService.listAppointmentStage(req, model, next);

        if (listAppointmentStageResult)
          return res.status(listAppointmentStageResult.status_code).json({
            status_code: listAppointmentStageResult.status_code,
            success: listAppointmentStageResult.success,

            ...(listAppointmentStageResult.success
              ? { data: listAppointmentStageResult.data }
              : {
                  ...(listAppointmentStageResult.success
                    ? { data: listAppointmentStageResult.data }
                    : { errors: listAppointmentStageResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new AppointmentStage_Controller();
