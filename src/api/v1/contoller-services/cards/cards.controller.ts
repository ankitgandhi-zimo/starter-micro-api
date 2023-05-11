import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../common/common-methods";
import {
  AddCardViewmodel,
  GetCardDetailsViewmodel,
  GetCardListViewmodel,
  PaymentChargedViewmodel,
} from "../../view-models/cards";

import cardServices from "./cards.service";

class CardsClassController {
  public addCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddCardViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddCardViewmodel = conversionResult.data as AddCardViewmodel;

        let cardResult = await cardServices.addCard(req, model, next);
        if (cardResult)
          return res.status(cardResult.status_code).json({
            status_code: cardResult.status_code,
            success: cardResult.success,

            ...(cardResult.success
              ? { data: cardResult.data }
              : {
                  ...(cardResult.success
                    ? { data: cardResult.data }
                    : {
                        errors: cardResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getCardDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetCardDetailsViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetCardDetailsViewmodel =
          conversionResult.data as GetCardDetailsViewmodel;

        let cardResult = await cardServices.getCardDetails(req, model, next);
        if (cardResult)
          return res.status(cardResult.status_code).json({
            status_code: cardResult.status_code,
            success: cardResult.success,
            ...(cardResult.success
              ? { data: cardResult.data }
              : {
                  errors: cardResult.data,
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public deleteCardDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetCardDetailsViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetCardDetailsViewmodel =
          conversionResult.data as GetCardDetailsViewmodel;
        let cardDeletionResult = await cardServices.deleteCardDetails(
          req,
          model,
          next
        );
        if (cardDeletionResult)
          return res.status(cardDeletionResult.status_code).json({
            status_code: cardDeletionResult.status_code,
            success: cardDeletionResult.success,
            ...(cardDeletionResult.success
              ? {
                  data: cardDeletionResult.data,
                }
              : {
                  errors: cardDeletionResult.data,
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getCardList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetCardListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetCardListViewmodel =
          conversionResult.data as GetCardListViewmodel;

        let cardListResult = await cardServices.getCardList(req, model, next);

        if (cardListResult)
          return res.status(cardListResult.status_code).json({
            status_code: cardListResult.status_code,
            success: cardListResult.success,
            ...(cardListResult.success
              ? {
                  data: cardListResult.data.data,
                  totalDocs: cardListResult.data.totalDocs,
                  pageNumber: cardListResult.data.pageNumber,
                  pageSize: cardListResult.data.pageSize,
                  totalPages: cardListResult.data.totalPages,
                }
              : { errors: cardListResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public chargeByPatientCards = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        PaymentChargedViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: PaymentChargedViewmodel =
          conversionResult.data as PaymentChargedViewmodel;

        let paymentResult = await cardServices.chargeByPatientCards(
          req,
          model,
          next
        );
        if (paymentResult)
          return res.status(paymentResult.status_code).json({
            status_code: paymentResult.status_code,
            success: paymentResult.success,

            ...(paymentResult.success
              ? { data: paymentResult.data }
              : {
                  ...(paymentResult.success
                    ? { data: paymentResult.data }
                    : {
                        errors: paymentResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default new CardsClassController();
