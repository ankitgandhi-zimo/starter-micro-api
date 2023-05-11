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
import FilledDynamicFormModel from "../../models/filled_dynamic_form.model";
import DynamicFormModel from "../../models/dynamic_form.model";
import {
  AddFilledDynamicFormViewmodel,
  UpdateFilledDynamicFormViewmodel,
  GetFilledDynamicFormListViewmodel,
  SendFormViewmodel,
} from "../../view-models/filledDynamicForm";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import { updateTaggedTemplate } from "typescript";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";
import DYNAMIC_FORM_DB_MODEL from "../../models/dynamic_form.model";
export enum EnumRole {
  PROVIDER = "provider",
}
class FilledDynamicFormServices {
  addFilledDynamicForm = async (
    req: Request,
    model: AddFilledDynamicFormViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      model.createdby_id = userDetails._id;
      let alreadyPresentForm = await FilledDynamicFormModel.findOne({
        patient_id: model.patient_id,
        clinic_id: model.clinic_id,
        provider_id: model.provider_id,
        form_id: model.form_id,
      });
      //console.log(alreadyPresentForm);
      if (alreadyPresentForm) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_FILLED_DYNAMIC_FORM,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        let saveDynamicFormResult = await FilledDynamicFormModel.create(model);

        if (saveDynamicFormResult) {
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.FORM_SHARED_SUCCESS,
            // {
            //   _id: saveDynamicFormResult._id,
            //   isActive: saveDynamicFormResult.isActive,
            //   field_data: saveDynamicFormResult.field_data,
            //   form_id: saveDynamicFormResult.form_id,
            //   clinic_id: saveDynamicFormResult.clinic_id,
            //   status: saveDynamicFormResult.status,
            // },
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.FORM_SHARED_FAILED,
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
  updateFilledDynamicForm = async (
    req: Request,
    model: UpdateFilledDynamicFormViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      //model.createdby_id = userDetails._id;
      let updateData: any = {};
      updateData = model;

      let formStatus = await FilledDynamicFormModel.findOne(
        { _id: model._id },
        { status: 1 }
      );
      if (updateData.remarks) {
        updateData.remarks = {
          remark: updateData.remarks,
          by: userDetails._id,
        };
        updateData.$push = { remarks: updateData.remarks };
        delete updateData.remarks;
      }
      if (formStatus) {
        if (updateData.status && updateData.status == "VIEWED") {
          updateData.received_date = new Date();
        }
      }

      let updateDynamicFormResult =
        await FilledDynamicFormModel.findOneAndUpdate(
          { _id: model._id },
          updateData,
          { new: true }
        );

      if (updateDynamicFormResult) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `form updated`,
          type: EHistoryActivityTypeValues.CLINIC,
          type_id: updateDynamicFormResult.clinic_id,
        });
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.UPDATE_SUCCESSFULL,
          // data: {
          //   _id: updateDynamicFormResult._id,
          //   isActive: updateDynamicFormResult.isActive,
          //   field_data: updateDynamicFormResult.field_data,
          //   form_id: updateDynamicFormResult.form_id,
          //   clinic_id: updateDynamicFormResult.clinic_id,
          // },
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_UPDATE_DYNAMIC_FORM,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  deleteFilledDynamicForm = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let deleteDynamicFormResult = await FilledDynamicFormModel.updateOne(
        { _id: req.params._id },
        { isDeleted: true }
      );
      if (
        deleteDynamicFormResult &&
        deleteDynamicFormResult.modifiedCount > 0
      ) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.DELETE_SUCCESSFULL,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_DELETE_FILLED_DYNAMIC_FORM,
            error: errorMessage.ON_DELETE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  getFilledDynamicForm = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let getDynamicFormResult = await FilledDynamicFormModel.findOne({
        _id: model._id,
        // isActive: true,
        // isDeleted: false,
      }).populate([
        {
          path: "remarks.by",
          select: { _id: 1, first_name: 1, last_name: 1 },
        },
        {
          path: "form_id",
          select: { _id: 1, form_title: 1, fields: 1 },
        },
      ]);
      if (getDynamicFormResult) {
        let updatedData: any = [];
        updatedData = getDynamicFormResult;
        // if (
        //   updatedData.form_id &&
        //   updatedData.form_id!.fields &&
        //   updatedData.form_id!.fields.length > 0
        // ) {
        //   updatedData.form_id.fields.forEach((d: any, i: number) => {
        //     updatedData.field_data.forEach((e: any) => {
        //       if (d._id!.toString() == e.id!.toString()) {
        //         if (d.input_type == "checkbox") {
        //           updatedData.form_id.fields[i].default = e.value
        //             ? e.value
        //             : [];
        //         } else updatedData.form_id.fields[i].default = e.value;
        //       }
        //     });
        //   });
        // }

        if (
          updatedData.form_id.fields &&
          updatedData.form_id.fields.length > 0
        ) {
          if (updatedData.field_data && updatedData.field_data.length > 0) {
            updatedData.form_id.fields.forEach((d: any, i: number) => {
              let found_obj = updatedData.field_data.find(
                (e: any) => e.id!.toString() == d._id!.toString()
              );
              if (found_obj) {
                updatedData.form_id.fields[i].default = found_obj.value;
              } else {
                if (d.input_type == "checkbox") {
                  updatedData.form_id.fields[i].default = [];
                }
              }
            });
          } else {
            updatedData.form_id.fields.forEach((d: any, i: number) => {
              if (d.input_type == "checkbox") {
                updatedData.form_id.fields[i].default = [];
              }
            });
          }
        }

        //console.log(getDynamicFormResult);

        return {
          status_code: HttpStatus.OK,
          success: true,
          data: {
            _id: updatedData._id,
            isActive: updatedData.isActive,
            field_data: updatedData.field_data,
            remarks: updatedData.remarks,
            form_id: updatedData.form_id,
            clinic_id: updatedData.clinic_id,
          },
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_GET_FILLED_DYNAMIC_FORM,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  listFilledDynamicForm = async (
    req: Request,
    model: GetFilledDynamicFormListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;
      defaultPage = model.pageNumber ? model.pageNumber : 1;
      count = model.pageSize ? model.pageSize : 50;
      let child_condition: any = {};
      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

        child_condition.form_title = {
          $regex: model.search,
          $options: "i",
        };
      }
      let populateFeilds: any = [
        {
          path: "form_id",
          // match: child_condition,
          select: { _id: 1, form_title: 1 },
        },
      ];

      let condition: any = {
        isDeleted: false,
        //isActive: true,
      };
      condition.patient_id = model.patient_id;
      condition.clinic_id = model.clinic_id;
      if (model.isActive) {
        condition.isActive = model.isActive;
      }

      if (model.status) {
        condition.status = model.status;
      }

      let result: mongoose.PaginateResult<any> =
        await FilledDynamicFormModel.paginate(condition, {
          page: defaultPage,
          ...(count > 0 ? { limit: count } : { pagination: false }),
          populate: populateFeilds,
          select: {
            isDeleted: 0,
            isActive: 0,
            status: 0,
            field_data: 0,
            clinic_id: 0,
            patient_id: 0,
            provider_id: 0,
            remarks: 0,
            __v: 0,
          },
          sort: { createdAt: -1 },
        });

      if (result && result.docs && result.docs.length > 0) {
        let dataArray: any = [];
        result.docs.forEach((e, i) => {
          let tempObj = {
            _id: e._id,
            filledPercentage: e.filledPercentage,
            form_title: e.form_id.form_title,
            createdAt: e.createdAt,
            received_date: e.received_date,
            updatedAt: e.updatedAt,
          };

          dataArray.push(tempObj);
          // if (e.form_id) {
          // }
          // dataArray[i].form_title = e.form_id.form_title
          //   ? e.form_id.form_title
          //   : "";
        });
        let obj = {
          data: dataArray,
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
            message: errorMessage.FILLED_DYNAMIC_FORM_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
  sendForm = async (
    req: Request,
    model: SendFormViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      model.createdby_id = userDetails._id;

      let formData = await DynamicFormModel.find({
        _id: { $in: model.form_ids },
      });

      let toAddArray: any = [];
      formData.forEach((data) => {
        toAddArray.push({
          patient_id: model.patient_id,
          clinic_id: model.clinic_id,
          form_id: data._id,
          createdby_id: model.createdby_id,
        });
      });

      // let alreadyPresentForm = await FilledDynamicFormModel.findOne({
      //   patient_id: model.patient_id,
      //   clinic_id: model.clinic_id,
      //   provider_id: model.provider_id,
      //   form_id: model.form_id,
      // });
      //console.log(alreadyPresentForm);
      if (toAddArray && toAddArray.length) {
        let addedForm = await FilledDynamicFormModel.create(toAddArray);
        if (addedForm) {
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.FORM_ASSIGNED_SUCCESS,
            // {
            //   _id: saveDynamicFormResult._id,
            //   isActive: saveDynamicFormResult.isActive,
            //   field_data: saveDynamicFormResult.field_data,
            //   form_id: saveDynamicFormResult.form_id,
            //   clinic_id: saveDynamicFormResult.clinic_id,
            //   status: saveDynamicFormResult.status,
            // },
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.FORM_ASSIGNED_FAILED,
              error: errorMessage.ON_ADD_ERROR,
            },
            status_code: HttpStatus.BAD_REQUEST,
          };
        }
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.FORM_ASSIGNED_FAILED,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  //sendForm
}
export default new FilledDynamicFormServices();
