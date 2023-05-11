import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../../v1/common/common-methods";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";

import {
  AddStateViewmodel,
  UpdateStateViewmodel,
  GetStateListViewmodel,
} from "../../view-models/state";

import stateService from "./state.service";

class State_Controller {
  addState = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddStateViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddStateViewmodel =
          conversionResult.data as AddStateViewmodel;

        let addCountryResult = await stateService.addState(req, model, next);

        if (addCountryResult)
          return res.status(200).json({
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
  updateState = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateStateViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateStateViewmodel =
          conversionResult.data as UpdateStateViewmodel;

        let addStateResult = await stateService.updateState(req, model, next);

        if (addStateResult)
          return res.status(200).json({
            status_code: addStateResult.status_code,
            success: addStateResult.success,

            ...(addStateResult.success
              ? { data: addStateResult.data }
              : {
                  ...(addStateResult.success
                    ? { data: addStateResult.data }
                    : { errors: addStateResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  deleteState = async (req: Request, res: Response, next: NextFunction) => {
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

        let deleteStateResult = await stateService.deleteState(
          req,
          model,
          next
        );

        if (deleteStateResult)
          return res.status(200).json({
            status_code: deleteStateResult.status_code,
            success: deleteStateResult.success,

            ...(deleteStateResult.success
              ? { data: deleteStateResult.data }
              : {
                  ...(deleteStateResult.success
                    ? { data: deleteStateResult.data }
                    : { errors: deleteStateResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  getState = async (req: Request, res: Response, next: NextFunction) => {
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

        let getStateResult = await stateService.getState(req, model, next);

        if (getStateResult)
          return res.status(200).json({
            status_code: getStateResult.status_code,
            success: getStateResult.success,

            ...(getStateResult.success
              ? { data: getStateResult.data }
              : {
                  ...(getStateResult.success
                    ? { data: getStateResult.data }
                    : { errors: getStateResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  listState = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetStateListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetStateListViewmodel =
          conversionResult.data as GetStateListViewmodel;

        let listStateResult = await stateService.listState(req, model, next);

        if (listStateResult)
          return res.status(200).json({
            status_code: listStateResult.status_code,
            success: listStateResult.success,

            ...(listStateResult.success
              ? { data: listStateResult.data }
              : {
                  ...(listStateResult.success
                    ? { data: listStateResult.data }
                    : { errors: listStateResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  filterListState = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetStateListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetStateListViewmodel =
          conversionResult.data as GetStateListViewmodel;

        let listStateResult = await stateService.filterListState(
          req,
          model,
          next
        );

        if (listStateResult)
          return res.status(200).json({
            status_code: listStateResult.status_code,
            success: listStateResult.success,

            ...(listStateResult.success
              ? { data: listStateResult.data }
              : {
                  ...(listStateResult.success
                    ? { data: listStateResult.data }
                    : { errors: listStateResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new State_Controller();
