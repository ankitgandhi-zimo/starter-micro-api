import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../common/common-methods";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import { AddPaymentGatewayViewmodel } from "../../view-models/paymentGateway";

import paymentGatewayServices from "./paymentGateway.service";

class Payment_Gateway_Controller {
  public addPaymentGateway = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddPaymentGatewayViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddPaymentGatewayViewmodel =
          conversionResult.data as AddPaymentGatewayViewmodel;

        let paymentGatewayResult =
          await paymentGatewayServices.addPaymentGateway(req, model, next);
        if (paymentGatewayResult)
          return res.status(200).json({
            status_code: paymentGatewayResult.status_code,
            success: paymentGatewayResult.success,

            ...(paymentGatewayResult.success
              ? { data: paymentGatewayResult.data }
              : {
                  ...(paymentGatewayResult.success
                    ? { data: paymentGatewayResult.data }
                    : {
                        errors: paymentGatewayResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public deletePaymentGatewayDetails = async (
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
        let paymentGatewayResult =
          await paymentGatewayServices.deletePaymentGatewayDetails(req, next);
        if (paymentGatewayResult)
          return res.status(200).json({
            status_code: paymentGatewayResult.status_code,
            success: paymentGatewayResult.success,
            ...(paymentGatewayResult.success
              ? { data: paymentGatewayResult.data }
              : { errors: paymentGatewayResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getPaymentGatewayDetails = async (
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
        let paymentGatewayResult =
          await paymentGatewayServices.getPaymentGatewayDetails(req, next);
        if (paymentGatewayResult)
          return res.status(200).json({
            status_code: paymentGatewayResult.status_code,
            success: paymentGatewayResult.success,
            ...(paymentGatewayResult.success
              ? { data: paymentGatewayResult.data }
              : { errors: paymentGatewayResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getPaymentGatewayList = async (
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
        let paymentGatewayResult =
          await paymentGatewayServices.getPaymentGatewayList(req, next);
        if (paymentGatewayResult)
          return res.status(200).json({
            status_code: paymentGatewayResult.status_code,
            success: paymentGatewayResult.success,
            ...(paymentGatewayResult.success
              ? { data: paymentGatewayResult.data }
              : { errors: paymentGatewayResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public verifyPaymentGatewayDetails = async (
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
        let paymentGatewayResult =
          await paymentGatewayServices.verifyPaymentGatewayDetails(req, next);
        if (paymentGatewayResult)
          return res.status(200).json({
            status_code: paymentGatewayResult.status_code,
            success: paymentGatewayResult.success,
            ...(paymentGatewayResult.success
              ? { data: paymentGatewayResult.data }
              : { errors: paymentGatewayResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new Payment_Gateway_Controller();
