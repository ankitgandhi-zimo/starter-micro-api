import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../common/common-methods";
import {
  AddInsurancePaymentViewmodel,
  ListInsurancePaymentViewmodel,
  UpdateInsurancePaymentViewmodel,
} from "../../view-models/insurancePayments";
import insurancePaymentServices from "./insurancePayments.service";
class PaymentController {
  public addInsurancePayment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddInsurancePaymentViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddInsurancePaymentViewmodel =
          conversionResult.data as AddInsurancePaymentViewmodel;

        let paymentResult = await insurancePaymentServices.addInsurancePayment(
          req,
          model,
          next
        );
        if (paymentResult)
          return res.status(200).json({
            status_code: paymentResult.status_code,
            success: paymentResult.success,

            ...(paymentResult.success
              ? { data: paymentResult.data }
              : {
                  ...(paymentResult.success
                    ? { data: paymentResult.data }
                    : { errors: paymentResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public updateInsurancePayment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateInsurancePaymentViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateInsurancePaymentViewmodel =
          conversionResult.data as UpdateInsurancePaymentViewmodel;

        let paymentResult =
          await insurancePaymentServices.updateInsurancePayment(
            req,
            model,
            next
          );
        if (paymentResult)
          return res.status(200).json({
            status_code: paymentResult.status_code,
            success: paymentResult.success,

            ...(paymentResult.success
              ? { data: paymentResult.data }
              : {
                  ...(paymentResult.success
                    ? { data: paymentResult.data }
                    : { errors: paymentResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  //updateInsurancePayment
  public listInsurancePayment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        ListInsurancePaymentViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: ListInsurancePaymentViewmodel =
          conversionResult.data as ListInsurancePaymentViewmodel;

        let paymentResult = await insurancePaymentServices.listInsurancePayment(
          req,
          model,
          next
        );
        if (paymentResult)
          return res.status(200).json({
            status_code: paymentResult.status_code,
            success: paymentResult.success,

            ...(paymentResult.success
              ? { data: paymentResult.data }
              : {
                  ...(paymentResult.success
                    ? { data: paymentResult.data }
                    : { errors: paymentResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default new PaymentController();
