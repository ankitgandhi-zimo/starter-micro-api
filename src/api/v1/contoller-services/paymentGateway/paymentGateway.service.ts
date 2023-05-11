import { DocumentType } from "@typegoose/typegoose";
import { NextFunction, Request } from "express";
import HttpStatus from "http-status-codes";
import mongoose from "mongoose";
import { IServiceResult1 } from "../../common/common-methods";
import errorMessage from "../../common/erros_message";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";
import PaymentGatewayModel, {
  PaymentGateway,
} from "../../models/payment_gateway.model";
import { User } from "../../models/user.model";
import { AddPaymentGatewayViewmodel } from "../../view-models/paymentGateway";
const PUBLIC__STRIPE = require("stripe")(process.env.STRIPE_PUBLIC_KEY);

class PaymentGatewayServices {
  addPaymentGateway = async (
    req: Request,
    model: AddPaymentGatewayViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let modelToSave = <PaymentGateway>model;

      let response = await PaymentGatewayModel.create(modelToSave);

      if (response) {
        // Add Activity History
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `payment gateway added successfully`,
          type: EHistoryActivityTypeValues.CLINIC,
          type_id: model.clinic_id,
        });

        return {
          status_code: HttpStatus.OK,
          success: true,
          data: response,
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.ERROR_ADD_PAYMENT_GATEWAY,
            error: errorMessage.ON_ADD_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  getPaymentGatewayDetails = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let foundPaymentGateway = await PaymentGatewayModel.findOne(
        {
          _id: new mongoose.Types.ObjectId(req.params._id),
          isDeleted: false,
        },
        {
          isDeleted: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        }
      );

      if (foundPaymentGateway) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: foundPaymentGateway,
        };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.PAYMENT_GATEWAY_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  deletePaymentGatewayDetails = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let foundClinic = await PaymentGatewayModel.findById(req.params._id, {});

      if (foundClinic) {
        let clinicDeletionResult = await PaymentGatewayModel.updateOne(
          { _id: req.params._id },
          { isDeleted: true }
        );

        if (clinicDeletionResult && clinicDeletionResult.modifiedCount > 0)
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.DELETE_SUCCESSFULL,
          };
        else
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.ERROR_DELETION_PAYMENT_GATEWAY,
              error: errorMessage.ON_DELETE_ERROR,
            },
          };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.PAYMENT_GATEWAY_NOT_FOUND,
            error: errorMessage.ON_DELETE_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  getPaymentGatewayList = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let foundPaymentGatewayList = await PaymentGatewayModel.find(
        {
          clinic_id: new mongoose.Types.ObjectId(req.params._id),
          isDeleted: false,
        },
        {
          isDeleted: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        }
      );

      if (foundPaymentGatewayList && foundPaymentGatewayList.length > 0) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: foundPaymentGatewayList,
        };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.PAYMENT_GATEWAY_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  verifyPaymentGatewayDetails = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let foundPaymentGateway = await PaymentGatewayModel.findOne(
        {
          _id: new mongoose.Types.ObjectId(req.params._id),
          isDeleted: false,
        },
        {
          isDeleted: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        }
      );

      if (foundPaymentGateway) {
        // verify public key

        let stripe = require("stripe")(foundPaymentGateway.public_key);

        const token = await stripe.tokens.create({
          person: {
            first_name: "Account",
            last_name: "verification",
            relationship: { owner: true },
          },
        });

        console.log(token, "token");
        // verify secret key

        let stripe1 = require("stripe")(foundPaymentGateway.secret_key);
        const token1 = await stripe1.tokens.create({
          person: {
            first_name: "Account",
            last_name: "verification",
            relationship: { owner: true },
          },
        });
        if (token && token1) {
          let updateGatewayAccount = await PaymentGatewayModel.updateOne(
            {
              _id: new mongoose.Types.ObjectId(req.params._id),
            },
            { isVerified: true }
          );
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `payment gateway verified successfully`,
            type: EHistoryActivityTypeValues.CLINIC,
            type_id: foundPaymentGateway.clinic_id,
          });

          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.PAYMENT_GATEWAY_ACCOUNT_VERIFIED,
          };
        } else
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.INVALID_PAYMENT_GATEWAY_CREDENTIALS,
              error: errorMessage.ON_FETCH_ERROR,
            },
          };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.PAYMENT_GATEWAY_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };
}
export default new PaymentGatewayServices();
