import { DocumentType } from "@typegoose/typegoose";
import bcrypt from "bcrypt";
import { NextFunction, Request } from "express";
import HttpStatus from "http-status-codes";
import mongoose from "mongoose";
import Utility, { IServiceResult1 } from "../../common/common-methods";
import errorMessage from "../../common/erros_message";
import { IJWTPayload } from "../../common/interface/jwtpayload";
import TokenModel from "../../models/login_token.model";
import Roles from "../../models/roles.model";
import UserModel, { User } from "../../models/user.model";
import SuperBillOtherDetailModel from "../../models/super_bill_other_detail.model";
import {
  AddSuperBillOtherDetailViewmodel,
  UpdateSuperBillOtherDetailViewmodel,
  GetSuperBillOtherDetailListViewmodel,
} from "../../view-models/superBillOtherDetail";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";

export enum EnumRole {
  PROVIDER = "provider",
}
class SuperBillOtherDetailServices {
  addSuperBillOtherDetail = async (
    req: Request,
    model: AddSuperBillOtherDetailViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      model.createdby_id = userDetails._id;
      let alreadyPresentSuperBillDetail =
        await SuperBillOtherDetailModel.findOne({
          super_bill_id: model.super_bill_id,
        });
      if (alreadyPresentSuperBillDetail) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_SUPER_BILL_DETAIL,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        let saveSuperBill = await SuperBillOtherDetailModel.create(model);
        let getSuperBill: any = {};
        if (saveSuperBill) {
          getSuperBill = await SuperBillOtherDetailModel.findOne({
            _id: saveSuperBill._id,
          });
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_ADD_SUPER_BILL_DETAIL,
              error: errorMessage.ON_ADD_ERROR,
            },
            status_code: HttpStatus.BAD_REQUEST,
          };
        }

        if (saveSuperBill && getSuperBill) {
          // let addHistory = await HistoryModel.create({
          //   user_id: model.createdby_id,
          //   description: `super bill details added`,
          //   type: EHistoryActivityTypeValues.CLINIC,
          //   //type_id: EHistoryActivityTypeValues.CLINIC,
          // });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: {
              notes: getSuperBill,
            },
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_ADD_SUPER_BILL_DETAIL,
              error: errorMessage.ON_ADD_ERROR,
            },
            status_code: HttpStatus.BAD_REQUEST,
          };
        }
      }
    } catch (error) {
      next(error);
    }
  };
  updateSuperBillOtherDetail = async (
    req: Request,
    model: UpdateSuperBillOtherDetailViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let id = model.super_bill_id;
      //delete model!.super_bill_id;
      let userDetails = <DocumentType<User>>req.user;

      let updateBillResult = await SuperBillOtherDetailModel.findOneAndUpdate(
        { super_bill_id: id },
        model,
        {
          new: true,
          upsert: true,
        }
      );

      if (updateBillResult) {
        // let addHistory = await HistoryModel.create({
        //   user_id: userDetails._id,
        //   description: `user updated super bill other details`,
        //   type: EHistoryActivityTypeValues.USER,
        // });
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.SAVED_SUCCESSFULL,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_UPDATE_SUPER_BILL_DETAIL,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  getSuperBillOtherDetail = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let id = new mongoose.Types.ObjectId(model._id);

      let getBillResult = await SuperBillOtherDetailModel.aggregate([
        {
          $match: { super_bill_id: id },
        },
      ]);

      if (getBillResult && getBillResult.length > 0) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: getBillResult[0],
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_GET_SUPER_BILL_DETAIL,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  deleteSuperBillOtherDetail = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let deleteBillResult = await SuperBillOtherDetailModel.updateOne(
        { _id: model._id },
        { isDeleted: true }
      );

      if (deleteBillResult && deleteBillResult.modifiedCount > 0) {
        // let addHistory = await HistoryModel.create({
        //   user_id: model._id,
        //   description: `user deleted super bill other detail`,
        //   type: EHistoryActivityTypeValues.USER,
        // });
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.DELETE_SUCCESSFULL,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_DELETE_SUPER_BILL_DETAIL,
            error: errorMessage.ON_DELETE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new SuperBillOtherDetailServices();
