import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../../v1/common/common-methods";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  SetAvailabilityViewmodel,
  GetAvailabilityViewmodel,
  GetTimeSlotsViewmodel,
  GetAvailabilityViewViewmodel,
  UpdateAvailabilityViewmodel,
  SetUnavailabilityViewmodel,
  GetUnavailabilityViewmodel,
  DeleteUnavailabilityViewmodel,
  GetAvailableDaysViewmodel,
  GetDoctorLocationViewmodel,
  GetAvailableTimeSlotsViewmodel,
  GetSchedulerViewmodel,
  GetAvailableDoctorViewmodel,
  GetSelectedWeekDaysViewmodel,
} from "../../view-models/availability";

import availabilityService from "./availability.service";

class Availability_Controller {
  setAvailability = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        SetAvailabilityViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: SetAvailabilityViewmodel =
          conversionResult.data as SetAvailabilityViewmodel;

        let addAvailabilityResult = await availabilityService.setAvailability(
          req,
          model,
          next
        );

        if (addAvailabilityResult)
          return res.status(200).json({
            status_code: addAvailabilityResult.status_code,
            success: addAvailabilityResult.success,

            ...(addAvailabilityResult.success
              ? { data: addAvailabilityResult.data }
              : {
                  ...(addAvailabilityResult.success
                    ? { data: addAvailabilityResult.data }
                    : { errors: addAvailabilityResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  getAvailability = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetAvailabilityViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetAvailabilityViewmodel =
          conversionResult.data as GetAvailabilityViewmodel;

        let getAvailabilityResult = await availabilityService.getAvailability(
          req,
          model,
          next
        );

        if (getAvailabilityResult)
          return res.status(200).json({
            status_code: getAvailabilityResult.status_code,
            success: getAvailabilityResult.success,

            ...(getAvailabilityResult.success
              ? { data: getAvailabilityResult.data }
              : {
                  ...(getAvailabilityResult.success
                    ? { data: getAvailabilityResult.data }
                    : { errors: getAvailabilityResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  getAvailabilityForView = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetAvailabilityViewViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetAvailabilityViewViewmodel =
          conversionResult.data as GetAvailabilityViewViewmodel;

        let getAvailabilityResult =
          await availabilityService.getAvailabilityForView(req, model, next);

        if (getAvailabilityResult)
          return res.status(200).json({
            status_code: getAvailabilityResult.status_code,
            success: getAvailabilityResult.success,

            ...(getAvailabilityResult.success
              ? { data: getAvailabilityResult.data }
              : {
                  ...(getAvailabilityResult.success
                    ? { data: getAvailabilityResult.data }
                    : { errors: getAvailabilityResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  updateAvailability = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateAvailabilityViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateAvailabilityViewmodel =
          conversionResult.data as UpdateAvailabilityViewmodel;

        let updateAvailabilityResult =
          await availabilityService.updateAvailability(req, model, next);

        if (updateAvailabilityResult)
          return res.status(200).json({
            status_code: updateAvailabilityResult.status_code,
            success: updateAvailabilityResult.success,

            ...(updateAvailabilityResult.success
              ? { data: updateAvailabilityResult.data }
              : {
                  ...(updateAvailabilityResult.success
                    ? { data: updateAvailabilityResult.data }
                    : { errors: updateAvailabilityResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  setUnavailability = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        SetUnavailabilityViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: SetUnavailabilityViewmodel =
          conversionResult.data as SetUnavailabilityViewmodel;

        let addUnavailabilityResult =
          await availabilityService.setUnavailability(req, model, next);

        if (addUnavailabilityResult)
          return res.status(200).json({
            status_code: addUnavailabilityResult.status_code,
            success: addUnavailabilityResult.success,

            ...(addUnavailabilityResult.success
              ? { data: addUnavailabilityResult.data }
              : {
                  ...(addUnavailabilityResult.success
                    ? { data: addUnavailabilityResult.data }
                    : { errors: addUnavailabilityResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  getUnavailability = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetUnavailabilityViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetUnavailabilityViewmodel =
          conversionResult.data as GetUnavailabilityViewmodel;

        let getUnavailabilityResult =
          await availabilityService.getUnavailability(req, model, next);

        if (getUnavailabilityResult)
          return res.status(200).json({
            status_code: getUnavailabilityResult.status_code,
            success: getUnavailabilityResult.success,

            ...(getUnavailabilityResult.success
              ? { data: getUnavailabilityResult.data }
              : {
                  ...(getUnavailabilityResult.success
                    ? { data: getUnavailabilityResult.data }
                    : { errors: getUnavailabilityResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  deleteUnavailability = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        DeleteUnavailabilityViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: DeleteUnavailabilityViewmodel =
          conversionResult.data as DeleteUnavailabilityViewmodel;

        let deleteUnavailabilityResult =
          await availabilityService.deleteUnavailability(req, model, next);

        if (deleteUnavailabilityResult)
          return res.status(200).json({
            status_code: deleteUnavailabilityResult.status_code,
            success: deleteUnavailabilityResult.success,

            ...(deleteUnavailabilityResult.success
              ? { data: deleteUnavailabilityResult.data }
              : {
                  ...(deleteUnavailabilityResult.success
                    ? { data: deleteUnavailabilityResult.data }
                    : { errors: deleteUnavailabilityResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  getTimeSlots = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetTimeSlotsViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetTimeSlotsViewmodel =
          conversionResult.data as GetTimeSlotsViewmodel;

        let Result = await availabilityService.getTimeSlots(req, model, next);

        if (Result)
          return res.status(200).json({
            status_code: Result.status_code,
            success: Result.success,

            ...(Result.success
              ? { data: Result.data }
              : {
                  ...(Result.success
                    ? { data: Result.data }
                    : { errors: Result.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  getAvailabilityDetailsForUpdate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetAvailabilityViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetAvailabilityViewmodel =
          conversionResult.data as GetAvailabilityViewmodel;

        let Result = await availabilityService.getAvailabilityDetailsForUpdate(
          req,
          model,
          next
        );

        if (Result)
          return res.status(200).json({
            status_code: Result.status_code,
            success: Result.success,

            ...(Result.success
              ? { data: Result.data }
              : {
                  ...(Result.success
                    ? { data: Result.data }
                    : { errors: Result.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  getAvailableDatesArr = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetAvailableDaysViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetAvailableDaysViewmodel =
          conversionResult.data as GetAvailableDaysViewmodel;

        let Result = await availabilityService.getAvailableDatesArr(
          req,
          model,
          next
        );

        if (Result)
          return res.status(200).json({
            status_code: Result.status_code,
            success: Result.success,

            ...(Result.success
              ? { data: Result.data }
              : {
                  ...(Result.success
                    ? { data: Result.data }
                    : { errors: Result.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  getAvailableDoctorsLocation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetDoctorLocationViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetDoctorLocationViewmodel =
          conversionResult.data as GetDoctorLocationViewmodel;

        let Result = await availabilityService.getAvailableDoctorsLocation(
          req,
          model,
          next
        );

        if (Result)
          return res.status(200).json({
            status_code: Result.status_code,
            success: Result.success,

            ...(Result.success
              ? { data: Result.data }
              : {
                  ...(Result.success
                    ? { data: Result.data }
                    : { errors: Result.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  getAvailableTimeSlots = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetAvailableTimeSlotsViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetAvailableTimeSlotsViewmodel =
          conversionResult.data as GetAvailableTimeSlotsViewmodel;

        let Result = await availabilityService.getAvailableTimeSlots(
          req,
          model,
          next
        );

        if (Result)
          return res.status(200).json({
            status_code: Result.status_code,
            success: Result.success,

            ...(Result.success
              ? { data: Result.data }
              : {
                  ...(Result.success
                    ? { data: Result.data }
                    : { errors: Result.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  getSchedulerData = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetSchedulerViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetSchedulerViewmodel =
          conversionResult.data as GetSchedulerViewmodel;

        let Result = await availabilityService.getSchedulerData(
          req,
          model,
          next
        );

        if (Result)
          return res.status(200).json({
            status_code: Result.status_code,
            success: Result.success,

            ...(Result.success
              ? { data: Result.data }
              : {
                  ...(Result.success
                    ? { data: Result.data }
                    : { errors: Result.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  getAvailableDoctors = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetAvailableDoctorViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetAvailableDoctorViewmodel =
          conversionResult.data as GetAvailableDoctorViewmodel;

        let Result = await availabilityService.getAvailableDoctors(
          req,
          model,
          next
        );

        if (Result)
          return res.status(200).json({
            status_code: Result.status_code,
            success: Result.success,

            ...(Result.success
              ? { data: Result.data }
              : {
                  ...(Result.success
                    ? { data: Result.data }
                    : { errors: Result.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  getSelectedWeekDaysOfAvailablility = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetSelectedWeekDaysViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetSelectedWeekDaysViewmodel =
          conversionResult.data as GetSelectedWeekDaysViewmodel;

        let Result =
          await availabilityService.getSelectedWeekDaysOfAvailablility(
            req,
            model,
            next
          );

        if (Result)
          return res.status(200).json({
            status_code: Result.status_code,
            success: Result.success,

            ...(Result.success
              ? { data: Result.data }
              : {
                  ...(Result.success
                    ? { data: Result.data }
                    : { errors: Result.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  //getSelectedWeekDaysOfAvailablility
  //getAvailableDoctors
  //getSchedulerData
}
export default new Availability_Controller();
