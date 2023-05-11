import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../../v1/common/common-methods";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";

import {
  AddCountryViewmodel,
  UpdateCountryViewmodel,
  GetCountryListViewmodel,
} from "../../view-models/country";

import countryService from "./country.service";

class Country_Controller {
  addCountry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddCountryViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddCountryViewmodel =
          conversionResult.data as AddCountryViewmodel;

        let addCountryResult = await countryService.addCountry(
          req,
          model,
          next
        );

        if (addCountryResult)
          return res.status(addCountryResult.status_code).json({
            status_code: addCountryResult.status_code,
            success: addCountryResult.success,

            ...(addCountryResult.success
              ? { data: addCountryResult.data }
              : {
                  ...(addCountryResult.success
                    ? { data: addCountryResult.data }
                    : { errors: addCountryResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  updateCountry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateCountryViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateCountryViewmodel =
          conversionResult.data as UpdateCountryViewmodel;

        let addCountryResult = await countryService.updateCountry(
          req,
          model,
          next
        );

        if (addCountryResult)
          return res.status(addCountryResult.status_code).json({
            status_code: addCountryResult.status_code,
            success: addCountryResult.success,

            ...(addCountryResult.success
              ? { data: addCountryResult.data }
              : {
                  ...(addCountryResult.success
                    ? { data: addCountryResult.data }
                    : { errors: addCountryResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  deleteCountry = async (req: Request, res: Response, next: NextFunction) => {
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

        let deleteCountryResult = await countryService.deleteCountry(
          req,
          model,
          next
        );

        if (deleteCountryResult)
          return res.status(deleteCountryResult.status_code).json({
            status_code: deleteCountryResult.status_code,
            success: deleteCountryResult.success,

            ...(deleteCountryResult.success
              ? { data: deleteCountryResult.data }
              : {
                  ...(deleteCountryResult.success
                    ? { data: deleteCountryResult.data }
                    : { errors: deleteCountryResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  getCountry = async (req: Request, res: Response, next: NextFunction) => {
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

        let getCountryResult = await countryService.getCountry(
          req,
          model,
          next
        );

        if (getCountryResult)
          return res.status(getCountryResult.status_code).json({
            status_code: getCountryResult.status_code,
            success: getCountryResult.success,

            ...(getCountryResult.success
              ? { data: getCountryResult.data }
              : {
                  ...(getCountryResult.success
                    ? { data: getCountryResult.data }
                    : { errors: getCountryResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  listCountry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetCountryListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetCountryListViewmodel =
          conversionResult.data as GetCountryListViewmodel;

        let listCountryResult = await countryService.listCountry(
          req,
          model,
          next
        );

        if (listCountryResult)
          return res.status(listCountryResult.status_code).json({
            status_code: listCountryResult.status_code,
            success: listCountryResult.success,

            ...(listCountryResult.success
              ? { data: listCountryResult.data }
              : {
                  ...(listCountryResult.success
                    ? { data: listCountryResult.data }
                    : { errors: listCountryResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  filterListCountry = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetCountryListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetCountryListViewmodel =
          conversionResult.data as GetCountryListViewmodel;

        let listCountryResult = await countryService.filterListCountry(
          req,
          model,
          next
        );

        if (listCountryResult)
          return res.status(listCountryResult.status_code).json({
            status_code: listCountryResult.status_code,
            success: listCountryResult.success,

            ...(listCountryResult.success
              ? { data: listCountryResult.data }
              : {
                  ...(listCountryResult.success
                    ? { data: listCountryResult.data }
                    : { errors: listCountryResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new Country_Controller();
