import { NextFunction, Request } from "express";
import HttpStatus from "http-status-codes";
import mongoose from "mongoose";
import { IServiceResult1 } from "../../common/common-methods";
import errorMessage from "../../common/erros_message";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";

import { DocumentType } from "@typegoose/typegoose";
import FinancialClassModel, {
  FinancialClass,
} from "../../models/financialclass.model";
import { User } from "../../models/user.model";
import {
  AddFinancialClassViewmodel,
  GetFinancialClassListViewmodel,
  UpdateFinancialClassViewmodel,
} from "../../view-models/financialClass";
export enum EnumRoles {
  SUPERADMIN = "superadmin",
}
class FinancialClassServices {
  addFinancialClass = async (
    req: Request,
    model: AddFinancialClassViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let checkExist = await FinancialClassModel.findOne({
        code: model.code,
      });
      if (checkExist)
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message:
              errorMessage.financialClassMsg
                .ALREADY_EXIST_FINANCIAL_CLASS,
            error: errorMessage.ON_ADD_ERROR,
          },
        };
      else {
        let modelToSave = <FinancialClass>model;

        modelToSave.createdby_id = userDetails._id;
        let response = await FinancialClassModel.create(
          modelToSave
        );

        if (response) {
          // Add Activity History
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `Financial class  added successfully`,
            type: EHistoryActivityTypeValues.CLINIC,
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
              message:
                errorMessage.financialClassMsg
                  .ERROR_ADD_FINANCIAL_CLASS,
              error: errorMessage.ON_ADD_ERROR,
            },
          };
        }
      }
    } catch (error) {
      next(error);
    }
  };

  updateFinancialClass = async (
    req: Request,
    model: UpdateFinancialClassViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let foundFinancialClass =
        await FinancialClassModel.findById(model._id);

      if (!foundFinancialClass)
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message:
              errorMessage.financialClassMsg
                .FINANCIAL_CLASS_DETAILS_NOT_FOUND,
            error: errorMessage.ON_UPDATE_ERROR,
          },
        };
      else {
        let modelToSave = <DocumentType<FinancialClass>>(
          model
        );

        let userDetails = <DocumentType<User>>req.user;

        if (model.code) {
          let checkExist =
            await FinancialClassModel.findOne({
              code: model.code,
            });
          if (
            checkExist &&
            checkExist._id.toString() !==
              model._id.toString()
          )
            return {
              status_code: HttpStatus.BAD_REQUEST,
              success: false,
              data: {
                message:
                  errorMessage.financialClassMsg
                    .ALREADY_EXIST_FINANCIAL_CLASS,
                error: errorMessage.ON_UPDATE_ERROR,
              },
            };
          else modelToSave.code = model.code;
        }

        modelToSave.createdby_id =
          foundFinancialClass.createdby_id;
        let response = await FinancialClassModel.updateOne(
          { _id: model._id },
          modelToSave
        );

        if (response && response.modifiedCount > 0) {
          // Add Activity History
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `Financial class  updated successfully`,
            type: EHistoryActivityTypeValues.CLINIC,
          });

          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.UPDATE_SUCCESSFULL,
          };
        } else {
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message:
                errorMessage.financialClassMsg
                  .ERROR_UPDATE_FINANCIAL_CLASS,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };
        }
      }
    } catch (error) {
      next(error);
    }
  };

  getFinancialClassDetails = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let foundFinancialClass =
        await FinancialClassModel.findOne({
          _id: new mongoose.Types.ObjectId(req.params._id),
          isDeleted: false,
        });

      if (foundFinancialClass)
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: foundFinancialClass,
        };
      else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message:
              errorMessage.financialClassMsg
                .FINANCIAL_CLASS_DETAILS_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  deleteFinancialClassDetails = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let foundFinancialClass =
        await FinancialClassModel.findOne({
          _id: new mongoose.Types.ObjectId(req.params._id),
          isDeleted: false,
        });

      if (!foundFinancialClass)
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message:
              errorMessage.financialClassMsg
                .FINANCIAL_CLASS_DETAILS_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      else {
        let deleteFinancialClassDetails =
          await FinancialClassModel.updateOne(
            {
              _id: new mongoose.Types.ObjectId(
                req.params._id
              ),
            },
            { isActive: false, isDeleted: true }
          );

        if (
          deleteFinancialClassDetails &&
          deleteFinancialClassDetails.modifiedCount > 0
        ) {
          // Add Activity History
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `Financial class deleted successfully`,
            type: EHistoryActivityTypeValues.CLINIC,
          });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.DELETE_SUCCESSFULL,
          };
        } else
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message:
                errorMessage.financialClassMsg
                  .ERROR_DELETE_FINANCIAL_CLASS,
              error: errorMessage.ON_DELETE_ERROR,
            },
          };
      }
    } catch (error) {
      next(error);
    }
  };

  getFinancialClassList = async (
    req: Request,
    model: GetFinancialClassListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      const count = model.pageSize ? model.pageSize : 10;
      req.body.page = model.pageNumber
        ? model.pageNumber
        : 1;
      const skip = count * (req.body.page - 1);

      let condition: any = {
        isDeleted: false,
        isActive: true,
      };

      if (model.clinic_id)
        condition.createdby_id =
          new mongoose.Types.ObjectId(
            model.clinic_id.toString()
          );

      if (model.isActive === "false") {
        condition.isActive = false;
      }

      const data = await FinancialClassModel.aggregate([
        { $match: condition },
        {
          $facet: {
            totalCount: [{ $count: "sum" }],
            aggregatedData: [
              {
                $project: {
                  _id: "$_id",
                  code: "$code",
                  price: "$price",
                  isActive: "$isActive",
                  isDeleted: "$isDeleted",
                  description: "$description",
                  createdby_id: "$createdby_id",
                },
              },

              { $limit: skip + count },
              { $skip: skip },
            ],
          },
        },
      ]);

      if (
        data[0].aggregatedData &&
        data[0].aggregatedData.length > 0
      ) {
        data[0].aggregatedData.push({
          totalCount: data[0].totalCount[0].sum,
        });

        return {
          status_code: HttpStatus.OK,
          data: { data: data[0].aggregatedData },
          success: true,
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message:
              errorMessage.financialClassMsg
                .FINANCIAL_CLASS_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new FinancialClassServices();
