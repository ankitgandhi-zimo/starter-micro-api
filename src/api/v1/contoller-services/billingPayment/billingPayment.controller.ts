import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, {
  ValidationResult,
} from "../../common/common-methods";
import {
  AddPostPaymentViewmodel,
  DisabledPaymentLinkViewmodel,
  GetPostPaymentListViewmodel,
  GetSuperBillListForPostPaymentViewmodel,
  MakeAndGetCMS1500Viewmodel,
  ReceivedPaymentViewmodel,
  UpdateBillingPaymentViewmodel,
  UpdatePostPaymentViewmodel,
} from "../../view-models/billingPayment";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import paymentServices from "../billingPayment/billingPayment.service";
class Billing_Payment_Controller {
  public receivePayment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          ReceivedPaymentViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: ReceivedPaymentViewmodel =
          conversionResult.data as ReceivedPaymentViewmodel;

        let paymentResult =
          await paymentServices.receivePayment(
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

  public disablePaymentLink = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          DisabledPaymentLinkViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: DisabledPaymentLinkViewmodel =
          conversionResult.data as DisabledPaymentLinkViewmodel;

        let paymentLinkResult =
          await paymentServices.disablePaymentLink(
            req,
            model,
            next
          );
        if (paymentLinkResult)
          return res.status(200).json({
            status_code: paymentLinkResult.status_code,
            success: paymentLinkResult.success,

            ...(paymentLinkResult.success
              ? { data: paymentLinkResult.data }
              : {
                  ...(paymentLinkResult.success
                    ? { data: paymentLinkResult.data }
                    : { errors: paymentLinkResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public updateDuePayment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          UpdateBillingPaymentViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateBillingPaymentViewmodel =
          conversionResult.data as UpdateBillingPaymentViewmodel;
        let updationlResult =
          await paymentServices.updateDuePayment(
            req,
            model,
            next
          );
        if (updationlResult)
          return res.status(200).json({
            status_code: updationlResult.status_code,
            success: updationlResult.success,
            ...(updationlResult.success
              ? { data: updationlResult.data }
              : { errors: updationlResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public addPostPayment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          AddPostPaymentViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddPostPaymentViewmodel =
          conversionResult.data as AddPostPaymentViewmodel;

        let postPaymentResult =
          await paymentServices.addPostPayment(
            req,
            model,
            next
          );
        if (postPaymentResult)
          return res.status(200).json({
            status_code: postPaymentResult.status_code,
            success: postPaymentResult.success,

            ...(postPaymentResult.success
              ? { data: postPaymentResult.data }
              : {
                  ...(postPaymentResult.success
                    ? { data: postPaymentResult.data }
                    : { errors: postPaymentResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getPostPaymentList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          GetPostPaymentListViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetPostPaymentListViewmodel =
          conversionResult.data as GetPostPaymentListViewmodel;

        let postPaymentResult =
          await paymentServices.getPostPaymentList(
            req,
            model,
            next
          );
        if (postPaymentResult)
          return res.status(200).json({
            status_code: postPaymentResult.status_code,
            success: postPaymentResult.success,

            ...(postPaymentResult.success
              ? { data: postPaymentResult.data }
              : {
                  ...(postPaymentResult.success
                    ? { data: postPaymentResult.data }
                    : { errors: postPaymentResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  public updatePostPayment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          UpdatePostPaymentViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdatePostPaymentViewmodel =
          conversionResult.data as UpdatePostPaymentViewmodel;

        let postPaymentResult =
          await paymentServices.updatePostPayment(
            req,
            model,
            next
          );
        if (postPaymentResult)
          return res.status(200).json({
            status_code: postPaymentResult.status_code,
            success: postPaymentResult.success,

            ...(postPaymentResult.success
              ? { data: postPaymentResult.data }
              : {
                  ...(postPaymentResult.success
                    ? { data: postPaymentResult.data }
                    : { errors: postPaymentResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getPostPaymentDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          CheckMongoIdViewmodel,
          JSON.parse(`{"_id":"${req.params._id}"}`)
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(200).send({
          status_code: HttpStatus.OK,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: CheckMongoIdViewmodel =
          conversionResult.data as CheckMongoIdViewmodel;

        let postPaymentDetailsResult =
          await paymentServices.getPostPaymentDetails(
            req,
            model,
            next
          );
        if (postPaymentDetailsResult)
          return res.status(200).json({
            status_code:
              postPaymentDetailsResult.status_code,
            success: postPaymentDetailsResult.success,
            ...(postPaymentDetailsResult.success
              ? { data: postPaymentDetailsResult.data }
              : { errors: postPaymentDetailsResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getSuperBillListForPostPayment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          GetSuperBillListForPostPaymentViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetSuperBillListForPostPaymentViewmodel =
          conversionResult.data as GetSuperBillListForPostPaymentViewmodel;

        let requiredResult =
          await paymentServices.getSuperBillListForPostPayment(
            req,
            model,
            next
          );
        if (requiredResult)
          return res.status(200).json({
            status_code: requiredResult.status_code,
            success: requiredResult.success,

            ...(requiredResult.success
              ? { data: requiredResult.data }
              : {
                  ...(requiredResult.success
                    ? { data: requiredResult.data }
                    : { errors: requiredResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public makeCMS1500Form = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          MakeAndGetCMS1500Viewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: MakeAndGetCMS1500Viewmodel =
          conversionResult.data as MakeAndGetCMS1500Viewmodel;

        let cms1500Result =
          await paymentServices.makeCMS1500Form(
            req,
            model,
            next
          );
        if (cms1500Result)
          return res.status(200).json({
            status_code: cms1500Result.status_code,
            success: cms1500Result.success,

            ...(cms1500Result.success
              ? { data: cms1500Result.data }
              : {
                  ...(cms1500Result.success
                    ? { data: cms1500Result.data }
                    : { errors: cms1500Result.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public makeCMS1500FormForSecondaryInsurance = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          MakeAndGetCMS1500Viewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: MakeAndGetCMS1500Viewmodel =
          conversionResult.data as MakeAndGetCMS1500Viewmodel;

        let cms1500Result =
          await paymentServices.makeCMS1500FormForSecondaryInsurance(
            req,
            model,
            next
          );
        if (cms1500Result)
          return res.status(200).json({
            status_code: cms1500Result.status_code,
            success: cms1500Result.success,

            ...(cms1500Result.success
              ? { data: cms1500Result.data }
              : {
                  ...(cms1500Result.success
                    ? { data: cms1500Result.data }
                    : { errors: cms1500Result.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default new Billing_Payment_Controller();
