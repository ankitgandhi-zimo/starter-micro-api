import { DocumentType } from "@typegoose/typegoose";
import { NextFunction, Request } from "express";
import HttpStatus from "http-status-codes";
import mongoose from "mongoose";
import { IServiceResult1 } from "../../../common/common-methods";
import errorMessage from "../../../common/erros_message";
import FormCategoryModel from "../../../models/form_category.model";
import { User } from "../../../models/user.model";
import { CheckMongoIdViewmodel } from "../../../view-models/check_mongo_id.viewmodel";
import {
  AddFormCategoryViewmodel,
  GetFormCategoryListViewmodel,
  UpdateFormCategoryViewmodel,
} from "../../../view-models/dynamicForm/";

import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../../models/history.model";

class FormCategoryServices {
  addFormCategory = async (
    req: Request,
    model: AddFormCategoryViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      model.createdby_id = userDetails._id;
      let alreadyPresent = await FormCategoryModel.findOne({
        clinic_id: model.clinic_id,
        category: model.category,
      });
      //console.log(alreadyPresentForm);
      if (alreadyPresent) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_FORM_CATEGORY,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        let saveResult = await FormCategoryModel.create(model);

        if (saveResult) {
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `form category added`,
            type: EHistoryActivityTypeValues.CLINIC,
            type_id: saveResult._id,
          });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: {
              _id: saveResult._id,
              category: saveResult.category,
              isActive: saveResult.isActive,
              isDeleted: saveResult.isDeleted,
            },
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_ADD_FORM_CATEGORY,
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
  updateFormCategory = async (
    req: Request,
    model: UpdateFormCategoryViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let alreadyPresent = await FormCategoryModel.findOne({
        clinic_id: model.clinic_id,
        category: model.category,
        _id: { $ne: model._id },
      });
      if (alreadyPresent) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_FORM_CATEGORY,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        let updateResult = await FormCategoryModel.findOneAndUpdate(
          { _id: model._id },
          model,
          { new: true }
        );

        if (updateResult) {
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `Form category updated`,
            type: EHistoryActivityTypeValues.CLINIC,
            type_id: model._id,
          });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.UPDATE_SUCCESSFULL,
            // data: {
            //   _id: updateDynamicFormResult._id,
            //   isActive: updateDynamicFormResult.isActive,
            //   form_title: updateDynamicFormResult.form_title,
            //   fields: updateDynamicFormResult.fields,
            //   clinic_id: updateDynamicFormResult.clinic_id,
            // },
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_UPDATE_FORM_CATEGORY,
              error: errorMessage.ON_UPDATE_ERROR,
            },
            status_code: HttpStatus.BAD_REQUEST,
          };
        }
      }
    } catch (error) {
      next(error);
    }
  };
  deleteFormCategory = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let deleteResult = await FormCategoryModel.updateOne(
        { _id: req.params._id },
        { isDeleted: true }
      );
      if (deleteResult && deleteResult.modifiedCount > 0) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `Form category deleted`,
          type: EHistoryActivityTypeValues.CLINIC,
          type_id: req.params._id,
        });
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.DELETE_SUCCESSFULL,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_DELETE_FORM_CATEGORY,
            error: errorMessage.ON_DELETE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  getFormCategory = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let getResult = await FormCategoryModel.findOne({
        _id: model._id,
        // isActive: true,
        // isDeleted: false,
      });
      if (getResult) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: {
            _id: getResult._id,
            isActive: getResult.isActive,
            isDeleted: getResult.isDeleted,
            category: getResult.category,
          },
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_GET_FORM_CATEGORY,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  listFormCategory = async (
    req: Request,
    model: GetFormCategoryListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;
      defaultPage = model.pageNumber ? model.pageNumber : 1;
      count = model.pageSize ? model.pageSize : 50;
      let populateFeilds: any = [];

      let condition: any = {
        //isDeleted: false,
        //isActive: true,
      };

      if (model.clinic_id) condition.clinic_id = model.clinic_id;
      if ("isActive" in model && model.isActive != undefined) {
        condition.isActive = model.isActive;
      }
      if ("isDeleted" in model && model.isDeleted != undefined) {
        condition.isDeleted = model.isDeleted;
      }

      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

        condition.category = {
          $regex: model.search,
          $options: "i",
        };
      }

      let result: mongoose.PaginateResult<any> =
        await FormCategoryModel.paginate(condition, {
          page: defaultPage,
          ...(count > 0 ? { limit: count } : { pagination: false }),
          populate: populateFeilds,
          select: { createdby_id: 0 },
          sort: { createdAt: -1 },
        });

      if (result && result.docs && result.docs.length > 0) {
        let obj = {
          data: result.docs,
          // count: result.totalDocs,
          totalDocs: result.totalDocs,
          pageNumber: result.page,
          pageSize: result.limit,
          totalPages: Math.ceil(result.totalDocs / result.limit),
        };
        return {
          status_code: HttpStatus.OK,
          data: obj,
          success: true,
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.FORM_CATEGORY_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
  filterListFormCategory = async (
    req: Request,
    model: GetFormCategoryListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;
      defaultPage = model.pageNumber ? model.pageNumber : 1;
      count = model.pageSize ? model.pageSize : 50;
      let populateFeilds: any = [];

      let condition: any = {
        isDeleted: false,
        //isActive: true,
      };
      if (model.clinic_id) condition.clinic_id = model.clinic_id;

      if ("isActive" in model && model.isActive != undefined) {
        condition.isActive = model.isActive;
      }

      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

        condition.category = {
          $regex: model.search,
          $options: "i",
        };
      }

      let result = await FormCategoryModel.find(
        condition,
        { category: 1, _id: 1 },
        { $sort: { createdAt: -1 } }
      ).lean();

      if (result && result.length) {
        let obj = {
          data: result,
          // count: result.totalDocs,
          totalDocs: result.length,
        };
        return {
          status_code: HttpStatus.OK,
          data: obj,
          success: true,
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.FORM_CATEGORY_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new FormCategoryServices();
