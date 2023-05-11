import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../../v1/common/common-methods";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddProviderViewmodel,
  GetAppointmentTypeListViewmodel,
  GetFilterListViewmodel,
  GetFilterProviderListViewmodel,
  GetProviderListViewmodel,
  UpdateAppointmentTypeViewmodel,
  UpdateLocationViewmodel,
  UpdateProviderViewmodel,
  FetchProviderViewmodel,
  //GetProviderFilterListViewmodel,
} from "../../view-models/provider";

import providerService from "./provider.service";

class Provider_Controller {
  addProvider = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddProviderViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddProviderViewmodel =
          conversionResult.data as AddProviderViewmodel;

        let addProviderResult = await providerService.addProvider(
          req,
          model,
          next
        );

        if (addProviderResult)
          return res.status(200).json({
            status_code: addProviderResult.status_code,
            success: addProviderResult.success,

            ...(addProviderResult.success
              ? { data: addProviderResult.data }
              : {
                  ...(addProviderResult.success
                    ? { data: addProviderResult.data }
                    : { errors: addProviderResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  updateProvider = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateProviderViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateProviderViewmodel =
          conversionResult.data as UpdateProviderViewmodel;

        let updateProviderResult = await providerService.updateProvider(
          req,
          model,
          next
        );

        if (updateProviderResult)
          return res.status(200).json({
            status_code: updateProviderResult.status_code,
            success: updateProviderResult.success,

            ...(updateProviderResult.success
              ? { data: updateProviderResult.data }
              : {
                  ...(updateProviderResult.success
                    ? { data: updateProviderResult.data }
                    : {
                        errors: updateProviderResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  deleteProvider = async (req: Request, res: Response, next: NextFunction) => {
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

        let deleteProviderResult = await providerService.deleteProvider(
          req,
          model,
          next
        );

        if (deleteProviderResult)
          return res.status(200).json({
            status_code: deleteProviderResult.status_code,
            success: deleteProviderResult.success,

            ...(deleteProviderResult.success
              ? { data: deleteProviderResult.data }
              : {
                  ...(deleteProviderResult.success
                    ? { data: deleteProviderResult.data }
                    : {
                        errors: deleteProviderResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  getProvider = async (req: Request, res: Response, next: NextFunction) => {
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

        let getProviderResult = await providerService.getProvider(
          req,
          model,
          next
        );

        if (getProviderResult)
          return res.status(200).json({
            status_code: getProviderResult.status_code,
            success: getProviderResult.success,

            ...(getProviderResult.success
              ? { data: getProviderResult.data }
              : {
                  ...(getProviderResult.success
                    ? { data: getProviderResult.data }
                    : { errors: getProviderResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  listProvider = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetProviderListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetProviderListViewmodel =
          conversionResult.data as GetProviderListViewmodel;

        let listProviderResult = await providerService.listProvider(
          req,
          model,
          next
        );

        if (listProviderResult)
          return res.status(200).json({
            status_code: listProviderResult.status_code,
            success: listProviderResult.success,

            ...(listProviderResult.success
              ? { data: listProviderResult.data }
              : {
                  ...(listProviderResult.success
                    ? { data: listProviderResult.data }
                    : {
                        errors: listProviderResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  filterListProvider = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetFilterProviderListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetFilterProviderListViewmodel =
          conversionResult.data as GetFilterProviderListViewmodel;

        let listProviderResult = await providerService.filterListProvider(
          req,
          model,
          next
        );

        if (listProviderResult)
          return res.status(200).json({
            status_code: listProviderResult.status_code,
            success: listProviderResult.success,

            ...(listProviderResult.success
              ? { data: listProviderResult.data }
              : {
                  ...(listProviderResult.success
                    ? { data: listProviderResult.data }
                    : {
                        errors: listProviderResult.data,
                      }),
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
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateAppointmentTypeViewmodel =
          conversionResult.data as UpdateAppointmentTypeViewmodel;

        let listProviderResult = await providerService.updateAppointmentType(
          req,
          model,
          next
        );

        if (listProviderResult)
          return res.status(200).json({
            status_code: listProviderResult.status_code,
            success: listProviderResult.success,

            ...(listProviderResult.success
              ? { data: listProviderResult.data }
              : {
                  ...(listProviderResult.success
                    ? { data: listProviderResult.data }
                    : {
                        errors: listProviderResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  updateLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateLocationViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateLocationViewmodel =
          conversionResult.data as UpdateLocationViewmodel;

        let listProviderResult = await providerService.updateLocation(
          req,
          model,
          next
        );

        if (listProviderResult)
          return res.status(200).json({
            status_code: listProviderResult.status_code,
            success: listProviderResult.success,

            ...(listProviderResult.success
              ? { data: listProviderResult.data }
              : {
                  ...(listProviderResult.success
                    ? { data: listProviderResult.data }
                    : {
                        errors: listProviderResult.data,
                      }),
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
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetAppointmentTypeListViewmodel =
          conversionResult.data as GetAppointmentTypeListViewmodel;

        let listProviderResult = await providerService.listAppointmentType(
          req,
          model,
          next
        );

        if (listProviderResult)
          return res.status(200).json({
            status_code: listProviderResult.status_code,
            success: listProviderResult.success,

            ...(listProviderResult.success
              ? { data: listProviderResult.data }
              : {
                  ...(listProviderResult.success
                    ? { data: listProviderResult.data }
                    : {
                        errors: listProviderResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  listLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetAppointmentTypeListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetAppointmentTypeListViewmodel =
          conversionResult.data as GetAppointmentTypeListViewmodel;

        let listProviderResult = await providerService.listLocation(
          req,
          model,
          next
        );

        if (listProviderResult)
          return res.status(200).json({
            status_code: listProviderResult.status_code,
            success: listProviderResult.success,

            ...(listProviderResult.success
              ? { data: listProviderResult.data }
              : {
                  ...(listProviderResult.success
                    ? { data: listProviderResult.data }
                    : {
                        errors: listProviderResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  filterListLocations = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetFilterListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetFilterListViewmodel =
          conversionResult.data as GetFilterListViewmodel;

        let listProviderResult = await providerService.filterListLocations(
          req,
          model,
          next
        );

        if (listProviderResult)
          return res.status(200).json({
            status_code: listProviderResult.status_code,
            success: listProviderResult.success,

            ...(listProviderResult.success
              ? { data: listProviderResult.data }
              : {
                  ...(listProviderResult.success
                    ? { data: listProviderResult.data }
                    : {
                        errors: listProviderResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  filterListApptType = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetFilterListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetFilterListViewmodel =
          conversionResult.data as GetFilterListViewmodel;

        let listProviderResult = await providerService.filterListApptType(
          req,
          model,
          next
        );

        if (listProviderResult)
          return res.status(200).json({
            status_code: listProviderResult.status_code,
            success: listProviderResult.success,

            ...(listProviderResult.success
              ? { data: listProviderResult.data }
              : {
                  ...(listProviderResult.success
                    ? { data: listProviderResult.data }
                    : {
                        errors: listProviderResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  //filterListLocations
  getAssignedApptType = async (
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
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetAppointmentTypeListViewmodel =
          conversionResult.data as GetAppointmentTypeListViewmodel;

        let listProviderResult = await providerService.getAssignedApptType(
          req,
          model,
          next
        );

        if (listProviderResult)
          return res.status(200).json({
            status_code: listProviderResult.status_code,
            success: listProviderResult.success,

            ...(listProviderResult.success
              ? { data: listProviderResult.data }
              : {
                  ...(listProviderResult.success
                    ? { data: listProviderResult.data }
                    : {
                        errors: listProviderResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  getProviderDataToExcel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetProviderListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetProviderListViewmodel =
          conversionResult.data as GetProviderListViewmodel;

        let listResult = await providerService.getProviderDataToExcel(
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
  fetchProviders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        FetchProviderViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: FetchProviderViewmodel =
          conversionResult.data as FetchProviderViewmodel;

        let listResult = await providerService.fetchProviders(req, model, next);

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

  //fetchProviders
}
export default new Provider_Controller();
