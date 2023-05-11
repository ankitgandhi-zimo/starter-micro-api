import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../common/common-methods";
import {
  AddAppointmentViewmodel,
  AddRecurringAppointmentViewmodel,
  AddRescheduleAppointmentViewmodel,
  DeclineAppointmentViewmodel,
  DeleteAppointmentViewmodel,
  GetAppointmentDetailsViewmodel,
  GetAppointmentListViewmodel,
  UpdateAppointmentViewmodel,
  FetchAppointmentViewmodel,
} from "../../view-models/appointments";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import appointmentServices from "../appointment/appointment.service";
class Appointment_Controller {
  public addAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddAppointmentViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddAppointmentViewmodel =
          conversionResult.data as AddAppointmentViewmodel;

        let appointmentResult = await appointmentServices.addAppointment(
          req,
          model,
          next
        );
        if (appointmentResult)
          return res.status(200).json({
            status_code: appointmentResult.status_code,
            success: appointmentResult.success,

            ...(appointmentResult.success
              ? { data: appointmentResult.data }
              : {
                  ...(appointmentResult.success
                    ? { data: appointmentResult.data }
                    : { errors: appointmentResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public addRecurringAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddRecurringAppointmentViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddRecurringAppointmentViewmodel =
          conversionResult.data as AddRecurringAppointmentViewmodel;

        let appointmentResult =
          await appointmentServices.addRecurringAppointment(req, model, next);
        if (appointmentResult)
          return res.status(200).json({
            status_code: appointmentResult.status_code,
            success: appointmentResult.success,

            ...(appointmentResult.success
              ? { data: appointmentResult.data }
              : {
                  ...(appointmentResult.success
                    ? { data: appointmentResult.data }
                    : { errors: appointmentResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  public updateAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateAppointmentViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateAppointmentViewmodel =
          conversionResult.data as UpdateAppointmentViewmodel;

        let appointmentResult = await appointmentServices.updateAppointmentNew(
          req,
          model,
          next
        );
        if (appointmentResult)
          return res.status(200).json({
            status_code: appointmentResult.status_code,
            success: appointmentResult.success,

            ...(appointmentResult.success
              ? { data: appointmentResult.data }
              : {
                  ...(appointmentResult.success
                    ? { data: appointmentResult.data }
                    : { errors: appointmentResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  public getAppointmentDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // let conversionResult: ValidationResult =
      //   await Utility.ValidateAndConvert(
      //     CheckMongoIdViewmodel,
      //     JSON.parse(`{"_id":"${req.params._id}"}`)
      //   );
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetAppointmentDetailsViewmodel,
        JSON.parse(`{"appointment_number":"${req.params.appointment_number}"}`)
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let appointmentDetailResult =
          await appointmentServices.getAppointmentDetails(req, next);
        if (appointmentDetailResult)
          return res.status(200).json({
            status_code: appointmentDetailResult.status_code,
            success: appointmentDetailResult.success,
            ...(appointmentDetailResult.success
              ? { data: appointmentDetailResult.data }
              : { errors: appointmentDetailResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public deleteAppointmentDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //  let conversionResult: ValidationResult =
      //   await Utility.ValidateAndConvert(
      //     CheckMongoIdViewmodel,
      //     JSON.parse(`{"_id":"${req.params._id}"}`)
      //   );
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        DeleteAppointmentViewmodel,
        req.body
      );
      //   JSON.parse(
      //     `{"appointment_number":"${req.params.appointment_number}"}`
      //   )
      // );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model = conversionResult.data as DeleteAppointmentViewmodel;
        let appointmentDeletionResult =
          await appointmentServices.deleteAppointmentDetails(req, model, next);
        if (appointmentDeletionResult)
          return res.status(200).json({
            status_code: appointmentDeletionResult.status_code,
            success: appointmentDeletionResult.success,
            ...(appointmentDeletionResult.success
              ? { data: appointmentDeletionResult.data }
              : {
                  errors: appointmentDeletionResult.data,
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getAppointmentList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetAppointmentListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        console.log("in data1111");
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetAppointmentListViewmodel =
          conversionResult.data as GetAppointmentListViewmodel;

        let appointmentListResult =
          await appointmentServices.getAppointmentList(req, model, next);

        if (appointmentListResult) {
          return res.status(200).json({
            status_code: appointmentListResult.status_code,
            success: appointmentListResult.success,
            ...(appointmentListResult.success
              ? {
                  data: appointmentListResult.data.data,
                  totalDocs: appointmentListResult.data.totalDocs,
                  pageNumber: appointmentListResult.data.pageNumber,
                  pageSize: appointmentListResult.data.pageSize,
                  totalPages: appointmentListResult.data.totalPages,
                }
              : { errors: appointmentListResult.data }),
          });
        }
      }
    } catch (error) {
      next(error);
    }
  };

  public getAppointmentListWithoutPagination = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetAppointmentListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetAppointmentListViewmodel =
          conversionResult.data as GetAppointmentListViewmodel;

        let appointmentListResult =
          await appointmentServices.getAppointmentListWithoutPagination(
            req,
            model,
            next
          );
        if (appointmentListResult)
          return res.status(200).json({
            status_code: appointmentListResult.status_code,
            success: appointmentListResult.success,
            ...(appointmentListResult.success
              ? {
                  data: appointmentListResult.data.data,
                  totalDocs: appointmentListResult.data.totalDocs,
                  pageNumber: appointmentListResult.data.pageNumber,
                  pageSize: appointmentListResult.data.pageSize,
                  totalPages: appointmentListResult.data.totalPages,
                }
              : { errors: appointmentListResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  public rescheduleAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddRescheduleAppointmentViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddRescheduleAppointmentViewmodel =
          conversionResult.data as AddRescheduleAppointmentViewmodel;

        let RescheduleAppointmentResult =
          await appointmentServices.rescheduleAppointment(req, model, next);
        if (RescheduleAppointmentResult)
          return res.status(200).json({
            status_code: RescheduleAppointmentResult.status_code,
            success: RescheduleAppointmentResult.success,

            ...(RescheduleAppointmentResult.success
              ? { data: RescheduleAppointmentResult.data }
              : {
                  ...(RescheduleAppointmentResult.success
                    ? {
                        data: RescheduleAppointmentResult.data,
                      }
                    : {
                        errors: RescheduleAppointmentResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public declineBooking = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        DeclineAppointmentViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: DeclineAppointmentViewmodel =
          conversionResult.data as DeclineAppointmentViewmodel;

        let declinedAppointmentResult =
          await appointmentServices.declineBooking(req, model, next);
        if (declinedAppointmentResult)
          return res.status(200).json({
            status_code: declinedAppointmentResult.status_code,
            success: declinedAppointmentResult.success,

            ...(declinedAppointmentResult.success
              ? { data: declinedAppointmentResult.data }
              : {
                  ...(declinedAppointmentResult.success
                    ? {
                        data: declinedAppointmentResult.data,
                      }
                    : {
                        errors: declinedAppointmentResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getAppointmentDataToExcel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetAppointmentListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(200).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetAppointmentListViewmodel =
          conversionResult.data as GetAppointmentListViewmodel;

        let appointmentResult =
          await appointmentServices.getAppointmentDataToExcel(req, model, next);
        if (appointmentResult)
          return res.status(200).json({
            status_code: appointmentResult.status_code,
            success: appointmentResult.success,

            ...(appointmentResult.success
              ? { data: appointmentResult.data }
              : {
                  ...(appointmentResult.success
                    ? { data: appointmentResult.data }
                    : { errors: appointmentResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getAppointmentDetailsWithId = async (
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
        let appointmentDetailResult =
          await appointmentServices.getAppointmentDetailsWithId(req, next);
        if (appointmentDetailResult)
          return res.status(200).json({
            status_code: appointmentDetailResult.status_code,
            success: appointmentDetailResult.success,
            ...(appointmentDetailResult.success
              ? { data: appointmentDetailResult.data }
              : { errors: appointmentDetailResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  fetchAppointments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        FetchAppointmentViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: FetchAppointmentViewmodel =
          conversionResult.data as FetchAppointmentViewmodel;

        let listResult = await appointmentServices.fetchAppointment(
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
                    : {
                        errors: listResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  fetchCheckouts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        FetchAppointmentViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: FetchAppointmentViewmodel =
          conversionResult.data as FetchAppointmentViewmodel;

        let listResult = await appointmentServices.fetchCheckouts(
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
                    : {
                        errors: listResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default new Appointment_Controller();
