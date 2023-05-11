import { DocumentType } from "@typegoose/typegoose";
import { NextFunction, Request } from "express";
import HttpStatus from "http-status-codes";
import _ from "lodash";
import mongoose from "mongoose";
import { IServiceResult1 } from "../../common/common-methods";
import errorMessage from "../../common/erros_message";
import DynamicFormModel from "../../models/dynamic_form.model";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";
import { User } from "../../models/user.model";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddDynamicFormViewmodel,
  GetDynamicFormListViewmodel,
  ImportDynamicFormViewmodel,
  UpdateDynamicFormViewmodel,
} from "../../view-models/dynamicForm";
import { FormFields } from "../../view-models/dynamicForm/add_dynamicForm.viewmodel";

export enum EnumRole {
  PROVIDER = "provider",
}
class DynamicFormServices {
  addDynamicForm = async (
    req: Request,
    model: AddDynamicFormViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      model.createdby_id = userDetails._id;
      let alreadyPresentForm = await DynamicFormModel.findOne({
        form_title: model.form_title,
        category: model.category,
        clinic_id: model.clinic_id,
      });

      if (alreadyPresentForm) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_DYNAMIC_FORM,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        let saveDynamicFormResult = await DynamicFormModel.create(model);

        if (saveDynamicFormResult) {
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `dynamic form added`,
            type: EHistoryActivityTypeValues.CLINIC,
            type_id: saveDynamicFormResult._id,
          });
          let getDynamicForm = await DynamicFormModel.aggregate([
            {
              $match: { _id: saveDynamicFormResult._id },
            },

            {
              $lookup: {
                from: "form_category",
                let: { cat_id: "$category" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$_id", "$$cat_id"],
                      },
                    },
                  },
                  { $project: { category: 1, _id: 1 } },
                ],
                as: "categoryData",
              },
            },
            {
              $unwind: {
                path: "$categoryData",
                preserveNullAndEmptyArrays: true,
              },
            },
          ]);
          if (getDynamicForm && getDynamicForm.length) {
            return {
              status_code: HttpStatus.OK,
              success: true,
              data: {
                _id: getDynamicForm[0]._id,
                isActive: getDynamicForm[0].isActive,
                form_title: getDynamicForm[0].form_title,
                categoryData: getDynamicForm[0].categoryData,
                fields: getDynamicForm[0].fields,
                clinic_id: getDynamicForm[0].clinic_id,
                saveAsDraft: getDynamicForm[0].saveAsDraft,
              },
            };
          } else {
            return {
              success: false,
              data: {
                message: errorMessage.ERROR_ON_GET_DYNAMIC_FORM,
                error: errorMessage.ON_FETCH_ERROR,
              },
              status_code: HttpStatus.BAD_REQUEST,
            };
          }
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_ADD_DYNAMIC_FORM,
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
  updateDynamicForm = async (
    req: Request,
    model: UpdateDynamicFormViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let alreadyPresentForm = await DynamicFormModel.findOne({
        form_title: model.form_title,
        _id: { $ne: model._id },
      });
      if (alreadyPresentForm) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_DYNAMIC_FORM,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        let updateDynamicFormResult = await DynamicFormModel.findOneAndUpdate(
          { _id: model._id },
          model,
          { new: true }
        );

        if (updateDynamicFormResult) {
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `dynamic form updated`,
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
              message: errorMessage.ERROR_ON_UPDATE_DYNAMIC_FORM,
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
  deleteDynamicForm = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let deleteDynamicFormResult = await DynamicFormModel.updateOne(
        { _id: req.params._id },
        { isDeleted: true }
      );
      if (
        deleteDynamicFormResult &&
        deleteDynamicFormResult.modifiedCount > 0
      ) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `dynamic form deleted`,
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
            message: errorMessage.ERROR_ON_DELETE_DYNAMIC_FORM,
            error: errorMessage.ON_DELETE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  getDynamicForm = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      // let getDynamicFormResult = await DynamicFormModel.findOne({
      //   _id: model._id,
      //   isActive: true,
      //   isDeleted: false,
      // });
      // if (getDynamicFormResult) {
      //   return {
      //     status_code: HttpStatus.OK,
      //     success: true,
      //     data: {
      //       _id: getDynamicFormResult._id,
      //       isActive: getDynamicFormResult.isActive,
      //       form_title: getDynamicFormResult.form_title,
      //       category: getDynamicFormResult.category,
      //       fields: getDynamicFormResult.fields,
      //       clinic_id: getDynamicFormResult.clinic_id,
      //     },
      //   };
      // } else {
      //   return {
      //     success: false,
      //     data: {
      //       message: errorMessage.ERROR_ON_GET_DYNAMIC_FORM,
      //       error: errorMessage.ON_FETCH_ERROR,
      //     },
      //     status_code: HttpStatus.BAD_REQUEST,
      //   };
      // }
      let getDynamicForm = await DynamicFormModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(model._id),
            // isActive: true,
            // isDeleted: false,
          },
        },

        {
          $lookup: {
            from: "form_category",
            let: { cat_id: "$category" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$cat_id"],
                  },
                },
              },
              { $project: { category: 1, _id: 1 } },
            ],
            as: "categoryData",
          },
        },
        {
          $unwind: {
            path: "$categoryData",
            preserveNullAndEmptyArrays: true,
          },
        },
      ]);
      if (getDynamicForm && getDynamicForm.length) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: {
            _id: getDynamicForm[0]._id,
            isActive: getDynamicForm[0].isActive,
            form_title: getDynamicForm[0].form_title,
            categoryData: getDynamicForm[0].categoryData,
            fields: getDynamicForm[0].fields,
            clinic_id: getDynamicForm[0].clinic_id,
            saveAsDraft: getDynamicForm[0].saveAsDraft,
          },
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_GET_DYNAMIC_FORM,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  listDynamicForm = async (
    req: Request,
    model: GetDynamicFormListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;
      defaultPage = model.pageNumber ? model.pageNumber : 1;
      count = model.pageSize ? model.pageSize : 50;
      let populateFeilds: any = [
        {
          path: "category",
          select: { _id: 1, category: 1 },
        },
      ];

      let condition: any = {
        isDeleted: false,
        //isActive: true,
      };
      if ("saveAsDraft" in model && model.saveAsDraft != undefined) {
        condition.saveAsDraft = model.saveAsDraft;
      }

      if ("isActive" in model && model.isActive != undefined) {
        condition.isActive = model.isActive;
      }

      if (model.clinic_id) {
        condition.clinic_id = model.clinic_id;
      }
      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

        condition.form_title = {
          $regex: model.search,
          $options: "i",
        };
      }

      let result: mongoose.PaginateResult<any> =
        await DynamicFormModel.paginate(condition, {
          page: defaultPage,
          ...(count > 0 ? { limit: count } : { pagination: false }),
          populate: populateFeilds,
          select: { fields: 0, createdby_id: 0, __v: 0 },
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
            message: errorMessage.DYNAMIC_FORM_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
  importDynamicForm = async (
    req: Request,
    model: ImportDynamicFormViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      model.createdby_id = userDetails._id;
      model.form_ids = _.uniq(model.form_ids);
      let alreadyPresentForm = await DynamicFormModel.find({
        form_id: { $in: model.form_ids },
        // category: model.category,
        clinic_id: model.clinic_id,
      });
      if (
        alreadyPresentForm &&
        alreadyPresentForm.length == model.form_ids.length
      ) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_DYNAMIC_FORM,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        //removing present forms from model.form_ids
        if (alreadyPresentForm) {
          alreadyPresentForm.forEach((e) => {
            //if (e.clinic) {
            if (model.form_ids.includes(e.form_id!.toString())) {
              var index = model.form_ids.indexOf(e.form_id!.toString());
              if (index !== -1) {
                //found

                model.form_ids.splice(index, 1);
              }
            }
            // }
          });
        }

        let formData = await DynamicFormModel.find({
          _id: { $in: model.form_ids },
        });
        if (formData) {
          let saveObjArray: any = [];
          model.form_ids.forEach((e) => {
            formData.forEach((f) => {
              if (f._id.toString() == e.toString()) {
                saveObjArray.push({
                  form_title: f.form_title,
                  fields: f.fields as FormFields[],
                  category: f.category,
                  import: true,
                  form_id: e,
                  clinic_id: model.clinic_id,
                });
              }
            });
          });

          // let saveObj = {
          //   form_title: formData.form_title,
          //   fields: formData.fields as FormFields[],
          //   category: formData.category,
          //   import: true,
          //   form_id: model.form_id,
          //   clinic_id: model.clinic_id,
          // };
          // model.form_title = formData?.form_title;
          // model.fields = formData?.fields as FormFields[];
          // model.category;
          // model.import = true;

          let importDynamicFormResult = await DynamicFormModel.insertMany(
            saveObjArray
          );

          if (importDynamicFormResult) {
            return {
              status_code: HttpStatus.OK,
              success: true,
              data: errorMessage.DYNAMIC_FORM_IMPORT_SUCCESSFULL,
            };
          } else {
            return {
              success: false,
              data: {
                message: errorMessage.DYNAMIC_FORM_IMPORT_FAILED,
                error: errorMessage.ON_ADD_ERROR,
              },
              status_code: HttpStatus.BAD_REQUEST,
            };
          }
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_GET_DYNAMIC_FORM,
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
  categoryCount = async (
    req: Request,
    model: GetDynamicFormListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let condition: any = {};
      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

        condition.form_title = {
          $regex: model.search,
          $options: "i",
        };
      }
      condition.isActive = true;
      condition.isDeleted = false;
      condition.clinic_id = null;

      let result = await DynamicFormModel.aggregate([
        {
          $match: condition,
        },
        {
          $group: { _id: "$category", count: { $sum: 1 } },
        },
        {
          $lookup: {
            from: "form_category",
            let: { cat_id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$cat_id"],
                  },
                },
              },
              { $project: { category: 1, _id: 1 } },
            ],
            as: "categoryData",
          },
        },
        {
          $unwind: {
            path: "$categoryData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            // category_id: "$_id",
            count: 1,
            category: "$categoryData.category",
          },
        },
      ]);
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
          success: false,
          data: {
            message: errorMessage.FORM_CATEGORY_LIST_NOT_FOUND,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };

  filterListForm = async (
    req: Request,
    model: GetDynamicFormListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let condition: any = {};
      condition.isActive = true;
      condition.isDeleted = false;
      condition.clinic_id = null;
      if (model.category) condition.category = model.category;

      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

        condition.form_title = {
          $regex: model.search,
          $options: "i",
        };
      }
      let result = await DynamicFormModel.find(condition, {
        _id: 1,
        form_title: 1,
        category: 1,
      }).populate({
        path: "category",
        select: { _id: 1, category: 1 },
      });
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
          success: false,
          data: {
            message: errorMessage.DYNAMIC_FORM_LIST_NOT_FOUND,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new DynamicFormServices();
