import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../common/common-methods";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddClinicLocationViewmodel,
  AddClinicViewmodel,
  GetClinicListViewmodel,
  GetClinicLocationListViewmodel,
  UpdateClinicLocationViewmodel,
  UpdateClinicViewmodel,
} from "../../view-models/clinic";

import clinicServices from "./clinic.service";

class Clinic_Controller {
  // //LOGIN

  //Clinic Section
  public addClinic = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddClinicViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddClinicViewmodel =
          conversionResult.data as AddClinicViewmodel;

        let clinicResult = await clinicServices.addClinic(req, model, next);
        if (clinicResult)
          return res.status(200).json({
            status_code: clinicResult.status_code,
            success: clinicResult.success,

            ...(clinicResult.success
              ? { data: clinicResult.data }
              : {
                  ...(clinicResult.success
                    ? { data: clinicResult.data }
                    : { errors: clinicResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public updateClinic = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateClinicViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateClinicViewmodel =
          conversionResult.data as UpdateClinicViewmodel;

        let clinicResult = await clinicServices.updateClinic(req, model, next);
        if (clinicResult)
          return res.status(200).json({
            status_code: clinicResult.status_code,
            success: clinicResult.success,

            ...(clinicResult.success
              ? { data: clinicResult.data }
              : {
                  ...(clinicResult.success
                    ? { data: clinicResult.data }
                    : { errors: clinicResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getClinicDetails = async (
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
        let clinicDetailResult = await clinicServices.getClinicDetails(
          req,
          next
        );
        if (clinicDetailResult)
          return res.status(200).json({
            status_code: clinicDetailResult.status_code,
            success: clinicDetailResult.success,
            ...(clinicDetailResult.success
              ? { data: clinicDetailResult.data }
              : { errors: clinicDetailResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getClinicList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult = await Utility.ValidateAndConvert(
        GetClinicListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetClinicListViewmodel =
          conversionResult.data as GetClinicListViewmodel;

        let clinicListResult = await clinicServices.getClinicList(
          req,
          model,
          next
        );
        if (clinicListResult)
          return res.status(200).json({
            status_code: clinicListResult.status_code,
            success: clinicListResult.success,
            ...(clinicListResult.success
              ? {
                  data: clinicListResult.data.data,
                  totalDocs: clinicListResult.data.totalDocs,
                  pageNumber: clinicListResult.data.pageNumber,
                  pageSize: clinicListResult.data.pageSize,
                  totalPages: clinicListResult.data.totalPages,
                }
              : { errors: clinicListResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getClinicListWithoutPagination = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let clinicListResult =
        await clinicServices.getClinicListWithoutPagination(
          req,

          next
        );
      if (clinicListResult)
        return res.status(200).json({
          status_code: clinicListResult.status_code,
          success: clinicListResult.success,
          ...(clinicListResult.success
            ? {
                data: clinicListResult.data.data,
                totalDocs: clinicListResult.data.totalDocs,
                pageNumber: clinicListResult.data.pageNumber,
                pageSize: clinicListResult.data.pageSize,
                totalPages: clinicListResult.data.totalPages,
              }
            : { errors: clinicListResult.data }),
        });
    } catch (error) {
      next(error);
    }
  };

  public deleteClinicDetails = async (
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
        let clinicDetailResult = await clinicServices.deleteClinicDetails(
          req,
          next
        );
        if (clinicDetailResult)
          return res.status(200).json({
            status_code: clinicDetailResult.status_code,
            success: clinicDetailResult.success,
            ...(clinicDetailResult.success
              ? { data: clinicDetailResult.data }
              : { errors: clinicDetailResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  // clinic location section

  public addClinicLocation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddClinicLocationViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddClinicLocationViewmodel =
          conversionResult.data as AddClinicLocationViewmodel;

        let clinicLocationResult = await clinicServices.addClinicLocation(
          req,
          model,
          next
        );
        if (clinicLocationResult)
          return res.status(200).json({
            status_code: clinicLocationResult.status_code,
            success: clinicLocationResult.success,

            ...(clinicLocationResult.success
              ? { data: clinicLocationResult.data }
              : {
                  ...(clinicLocationResult.success
                    ? { data: clinicLocationResult.data }
                    : {
                        errors: clinicLocationResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public updateClinicLocation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateClinicLocationViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateClinicLocationViewmodel =
          conversionResult.data as UpdateClinicLocationViewmodel;

        let clinicLocationResult = await clinicServices.updateClinicLocation(
          req,
          model,
          next
        );
        if (clinicLocationResult)
          return res.status(200).json({
            status_code: clinicLocationResult.status_code,
            success: clinicLocationResult.success,

            ...(clinicLocationResult.success
              ? { data: clinicLocationResult.data }
              : {
                  ...(clinicLocationResult.success
                    ? { data: clinicLocationResult.data }
                    : {
                        errors: clinicLocationResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getClinicLocationDetails = async (
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
        let clinicLocationDetailResult =
          await clinicServices.getClinicLocationDetails(req, next);
        if (clinicLocationDetailResult)
          return res.status(200).json({
            status_code: clinicLocationDetailResult.status_code,
            success: clinicLocationDetailResult.success,
            ...(clinicLocationDetailResult.success
              ? { data: clinicLocationDetailResult.data }
              : {
                  errors: clinicLocationDetailResult.data,
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  public getClinicLocationList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult = await Utility.ValidateAndConvert(
        GetClinicLocationListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetClinicLocationListViewmodel =
          conversionResult.data as GetClinicLocationListViewmodel;

        let clinicLocationListResult =
          await clinicServices.getClinicLocationList(req, model, next);
        if (clinicLocationListResult)
          return res.status(200).json({
            status_code: clinicLocationListResult.status_code,
            success: clinicLocationListResult.success,
            ...(clinicLocationListResult.success
              ? {
                  data: clinicLocationListResult.data.data,
                  totalDocs: clinicLocationListResult.data.totalDocs,
                  pageNumber: clinicLocationListResult.data.pageNumber,
                  pageSize: clinicLocationListResult.data.pageSize,
                  totalPages: clinicLocationListResult.data.totalPages,
                }
              : {
                  errors: clinicLocationListResult.data,
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getClinicLocationListWithoutPagination = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult = await Utility.ValidateAndConvert(
        GetClinicLocationListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetClinicLocationListViewmodel =
          conversionResult.data as GetClinicLocationListViewmodel;

        let clinicLocationListResult =
          await clinicServices.getClinicLocationListWithoutPagination(
            req,
            model,
            next
          );
        if (clinicLocationListResult)
          return res.status(200).json({
            status_code: clinicLocationListResult.status_code,
            success: clinicLocationListResult.success,
            ...(clinicLocationListResult.success
              ? {
                  data: clinicLocationListResult.data.data,
                  totalDocs: clinicLocationListResult.data.totalDocs,
                  pageNumber: clinicLocationListResult.data.pageNumber,
                  pageSize: clinicLocationListResult.data.pageSize,
                  totalPages: clinicLocationListResult.data.totalPages,
                }
              : {
                  errors: clinicLocationListResult.data,
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getClinicDataToExcel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetClinicListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetClinicListViewmodel =
          conversionResult.data as UpdateClinicViewmodel;

        let clinicResult = await clinicServices.getClinicDataToExcel(
          req,
          model,
          next
        );
        if (clinicResult)
          return res.status(200).json({
            status_code: clinicResult.status_code,
            success: clinicResult.success,

            ...(clinicResult.success
              ? { data: clinicResult.data }
              : {
                  ...(clinicResult.success
                    ? { data: clinicResult.data }
                    : { errors: clinicResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new Clinic_Controller();
