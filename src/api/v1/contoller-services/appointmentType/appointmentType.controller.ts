import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../../v1/common/common-methods";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddAppointmentTypeViewmodel,
  UpdateAppointmentTypeViewmodel,
  GetAppointmentTypeListViewmodel,
} from "../../view-models/appointmentType";

import appointmentTypeService from "./appointmentType.service";

class AppointmentType_Controller {
  addAppointmentType = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddAppointmentTypeViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddAppointmentTypeViewmodel =
          conversionResult.data as AddAppointmentTypeViewmodel;

        let addAppointmentTypeResult =
          await appointmentTypeService.addAppointmentType(req, model, next);

        if (addAppointmentTypeResult)
          return res.status(200).json({
            status_code: addAppointmentTypeResult.status_code,
            success: addAppointmentTypeResult.success,

            ...(addAppointmentTypeResult.success
              ? { data: addAppointmentTypeResult.data }
              : {
                  ...(addAppointmentTypeResult.success
                    ? { data: addAppointmentTypeResult.data }
                    : { errors: addAppointmentTypeResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  updateAppointmentType = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateAppointmentTypeViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateAppointmentTypeViewmodel =
          conversionResult.data as UpdateAppointmentTypeViewmodel;

        let updateAppointmentTypeResult =
          await appointmentTypeService.updateAppointmentType(req, model, next);

        if (updateAppointmentTypeResult)
          return res.status(200).json({
            status_code: updateAppointmentTypeResult.status_code,
            success: updateAppointmentTypeResult.success,

            ...(updateAppointmentTypeResult.success
              ? { data: updateAppointmentTypeResult.data }
              : {
                  ...(updateAppointmentTypeResult.success
                    ? { data: updateAppointmentTypeResult.data }
                    : { errors: updateAppointmentTypeResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  deleteAppointmentType = async (
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
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: CheckMongoIdViewmodel =
          conversionResult.data as CheckMongoIdViewmodel;

        let deleteAppointmentTypeResult =
          await appointmentTypeService.deleteAppointmentType(req, model, next);

        if (deleteAppointmentTypeResult)
          return res.status(200).json({
            status_code: deleteAppointmentTypeResult.status_code,
            success: deleteAppointmentTypeResult.success,
            ...(deleteAppointmentTypeResult.success
              ? { data: deleteAppointmentTypeResult.data }
              : { errors: deleteAppointmentTypeResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  getAppointmentType = async (
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
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: CheckMongoIdViewmodel =
          conversionResult.data as CheckMongoIdViewmodel;

        let getAppointmentTypeResult =
          await appointmentTypeService.getAppointmentType(req, model, next);

        if (getAppointmentTypeResult)
          return res.status(200).json({
            status_code: getAppointmentTypeResult.status_code,
            success: getAppointmentTypeResult.success,

            ...(getAppointmentTypeResult.success
              ? { data: getAppointmentTypeResult.data }
              : {
                  ...(getAppointmentTypeResult.success
                    ? { data: getAppointmentTypeResult.data }
                    : { errors: getAppointmentTypeResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  listAppointmentType = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetAppointmentTypeListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetAppointmentTypeListViewmodel =
          conversionResult.data as GetAppointmentTypeListViewmodel;

        let listAppointmentTypeResult =
          await appointmentTypeService.listAppointmentType(req, model, next);

        if (listAppointmentTypeResult)
          return res.status(200).json({
            status_code: listAppointmentTypeResult.status_code,
            success: listAppointmentTypeResult.success,

            ...(listAppointmentTypeResult.success
              ? { data: listAppointmentTypeResult.data }
              : {
                  ...(listAppointmentTypeResult.success
                    ? { data: listAppointmentTypeResult.data }
                    : { errors: listAppointmentTypeResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  filterListAppointmentType = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetAppointmentTypeListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetAppointmentTypeListViewmodel =
          conversionResult.data as GetAppointmentTypeListViewmodel;

        let listAppointmentTypeResult =
          await appointmentTypeService.filterListAppointmentType(
            req,
            model,
            next
          );

        if (listAppointmentTypeResult)
          return res.status(200).json({
            status_code: listAppointmentTypeResult.status_code,
            success: listAppointmentTypeResult.success,

            ...(listAppointmentTypeResult.success
              ? { data: listAppointmentTypeResult.data }
              : {
                  ...(listAppointmentTypeResult.success
                    ? { data: listAppointmentTypeResult.data }
                    : { errors: listAppointmentTypeResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new AppointmentType_Controller();
