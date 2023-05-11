import { DocumentType } from "@typegoose/typegoose";
import bcrypt from "bcrypt";
import { NextFunction, Request } from "express";
import HttpStatus from "http-status-codes";
import mongoose from "mongoose";
import Utility, { IServiceResult1 } from "../../common/common-methods";
import errorMessage from "../../common/erros_message";
import { IJWTPayload } from "../../common/interface/jwtpayload";
import TokenModel from "../../models/login_token.model";
import ClaimFillingPaymentCodesModel, {
  ClaimFillingPaymentCodes,
} from "../../models/claim_filling_payment_codes.model";

import { ListViewmodel } from "../../view-models/list.viewmodel";

class ClaimFillingPaymentCodesServices {
  //Provides listing for dropdown for filtering data
  listPaymentCodes = async (
    req: Request,
    model: ListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let condition: any = {
        isDeleted: false,
      };

      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

        condition.code = {
          $regex: model.search,
          $options: "i",
        };
      }

      let response = await ClaimFillingPaymentCodesModel.find(condition, {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      }).sort({ createdAt: -1 });

      if (response && response.length > 0) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: {
            data: response,
            totalDocs: response.length,
          },
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.PAYMENT_CODES_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new ClaimFillingPaymentCodesServices();
