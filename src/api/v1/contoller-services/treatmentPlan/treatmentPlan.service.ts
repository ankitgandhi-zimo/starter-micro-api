import { DocumentType } from "@typegoose/typegoose";
import { NextFunction, Request } from "express";
import HttpStatus from "http-status-codes";
import mongoose from "mongoose";
import { IServiceResult1 } from "../../common/common-methods";
import errorMessage from "../../common/erros_message";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";
import TreatmentPlanModel from "../../models/treatmentPlan.model";
import { User } from "../../models/user.model";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddTreatmentPlanViewmodel,
  GetTreatmentPlanListViewmodel,
  ImportTreatmentPlanViewmodel,
  UpdateTreatmentPlanViewmodel,
} from "../../view-models/treatmentPlan";
import { FormFields } from "../../view-models/treatmentPlan/add_treatmentPlan.viewmodel";
export enum EnumRole {
  PROVIDER = "provider",
}
class TreatmentPlanServices {
  addTreatmentPlan = async (
    req: Request,
    model: AddTreatmentPlanViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      model.createdby_id = userDetails._id;
      let alreadyPresentTreatmentPlan = await TreatmentPlanModel.findOne({
        form_title: model.form_title,
        clinic_id: model.clinic_id,
      });

      if (alreadyPresentTreatmentPlan) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_TREATMENT_PLAN,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        let saveTreatmentPlanResult = await TreatmentPlanModel.create(model);

        if (saveTreatmentPlanResult) {
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `treatment plan added`,
            type: EHistoryActivityTypeValues.CLINIC,
            type_id: saveTreatmentPlanResult._id,
          });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: {
              _id: saveTreatmentPlanResult._id,
              isActive: saveTreatmentPlanResult.isActive,
              form_title: saveTreatmentPlanResult.form_title,
              fields: saveTreatmentPlanResult.fields,
              clinic_id: saveTreatmentPlanResult.clinic_id,
            },
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_ADD_TREATMENT_PLAN,
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
  updateTreatmentPlan = async (
    req: Request,
    model: UpdateTreatmentPlanViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let alreadyPresentTreatmentPlan = await TreatmentPlanModel.findOne({
        form_title: model.form_title,
        _id: { $ne: model._id },
      });
      if (alreadyPresentTreatmentPlan) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_TREATMENT_PLAN,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        let updateTreatmentPlanResult =
          await TreatmentPlanModel.findOneAndUpdate({ _id: model._id }, model, {
            new: true,
          });

        if (updateTreatmentPlanResult) {
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `treatment plan updated`,
            type: EHistoryActivityTypeValues.CLINIC,
            type_id: model._id,
          });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.UPDATE_SUCCESSFULL,
            // data: {
            //   _id: updateTreatmentPlanResult._id,
            //   isActive: updateTreatmentPlanResult.isActive,
            //   form_title: updateTreatmentPlanResult.form_title,
            //   fields: updateTreatmentPlanResult.fields,
            //   clinic_id: updateTreatmentPlanResult.clinic_id,
            // },
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_UPDATE_TREATMENT_PLAN,
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
  deleteTreatmentPlan = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let deleteTreatmentPlanResult = await TreatmentPlanModel.updateOne(
        { _id: req.params._id },
        { isDeleted: true }
      );
      if (
        deleteTreatmentPlanResult &&
        deleteTreatmentPlanResult.modifiedCount > 0
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
            message: errorMessage.ERROR_ON_DELETE_TREATMENT_PLAN,
            error: errorMessage.ON_DELETE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  getTreatmentPlan = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let getTreatmentPlanResult = await TreatmentPlanModel.findOne({
        _id: model._id,
        // isActive: true,
        // isDeleted: false,
      });
      if (getTreatmentPlanResult) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: {
            _id: getTreatmentPlanResult._id,
            isActive: getTreatmentPlanResult.isActive,
            form_title: getTreatmentPlanResult.form_title,
            fields: getTreatmentPlanResult.fields,
            clinic_id: getTreatmentPlanResult.clinic_id,
          },
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_GET_TREATMENT_PLAN,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      console.log(error, "dkfhkdh");
      next(error);
    }
  };
  listTreatmentPlan = async (
    req: Request,
    model: GetTreatmentPlanListViewmodel,
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

      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

        condition.form_title = {
          $regex: model.search,
          $options: "i",
        };
      }

      if (model.clinic_id) {
        condition.clinic_id = model.clinic_id;
      }

      if (
        "saveAsDraft" in model &&
        model.saveAsDraft != undefined &&
        model.saveAsDraft != null
      ) {
        condition.saveAsDraft = model.saveAsDraft;
      }

      if ("isActive" in model && model.isActive != undefined) {
        condition.isActive = model.isActive;
      }
      if ("isDeleted" in model && model.isDeleted != undefined) {
        condition.isDeleted = model.isDeleted;
      }

      let result: mongoose.PaginateResult<any> =
        await TreatmentPlanModel.paginate(condition, {
          page: defaultPage,
          ...(count > 0 ? { limit: count } : { pagination: false }),
          populate: populateFeilds,
          select: { createdby_id: 0, fields: 0, __v: 0 },
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
      }
      // if (!model.pageNumber && !model.pageSize) {
      //   defaultPage = 1;
      //   count = -1;

      //   let response = await TreatmentPlanModel.find(condition, {
      //     createdAt: 0,
      //     updatedAt: 0,
      //     fields: 0,
      //     createdby_id: 0,
      //     __v: 0,
      //   }).sort({
      //     createdAt: -1,
      //   });

      //   if (response && response.length > 0) {
      //     return {
      //       status_code: HttpStatus.OK,
      //       success: true,
      //       data: {
      //         data: response,
      //         // count: response.length,
      //         totalDocs: response.length,
      //         pageNumber: defaultPage,
      //         pageSize: response.length,
      //         totalPages: defaultPage,
      //       },
      //     };
      //   } else {
      //     return {
      //       status_code: HttpStatus.BAD_REQUEST,
      //       success: false,
      //       data: {
      //         message: errorMessage.TREATMENT_PLAN_LIST_NOT_FOUND,
      //         error: errorMessage.ON_FETCH_ERROR,
      //       },
      //     };
      //   }
      // } else if (model.pageNumber && model.pageNumber >= 1 && !model.pageSize) {
      //   defaultPage = model.pageNumber;
      //   count = 50;
      // } else {
      //   defaultPage = model.pageNumber || 1;
      //   count = model.pageSize || 50;
      // }
      // let tempResult: any;

      // let result: mongoose.PaginateResult<any> =
      //   await TreatmentPlanModel.paginate(
      //     {
      //       ...condition,
      //       options: {
      //         projection: {
      //           createdAt: 0,
      //           updatedAt: 0,
      //           __v: 0,
      //         },
      //       },
      //     },
      //     {
      //       page: defaultPage,
      //       ...(count > 0 ? { limit: count } : { pagination: false }),
      //       //populate: populateFeilds,

      //       sort: { createdAt: -1 },
      //     }
      //   );

      // tempResult = result;

      // if (result && result.docs && result.docs.length > 0) {
      //   let obj = {
      //     data: result.docs,
      //     // count: result.totalDocs,
      //     totalDocs: result.totalDocs,
      //     pageNumber: result.page,
      //     pageSize: result.limit,
      //     totalPages: Math.ceil(result.totalDocs / result.limit),
      //   };
      //   return {
      //     status_code: HttpStatus.OK,
      //     data: obj,
      //     success: true,
      //   };
      // }
      else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.TREATMENT_PLAN_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
  importTreatmentPlan = async (
    req: Request,
    model: ImportTreatmentPlanViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      model.createdby_id = userDetails._id;
      let alreadyPresentPlan = await TreatmentPlanModel.findOne({
        treatment_plan_id: model.treatment_plan_id,
        clinic_id: model.clinic_id,
      });
      if (alreadyPresentPlan) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_TREATMENT_PLAN,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        let formData = await TreatmentPlanModel.findOne({
          _id: model.treatment_plan_id,
        });
        if (formData) {
          model.form_title = formData?.form_title;
          model.fields = formData?.fields as FormFields[];
          model.import = true;
          let importResult = await TreatmentPlanModel.create(model);

          if (importResult) {
            return {
              status_code: HttpStatus.OK,
              success: true,
              data: errorMessage.TREATMENT_PLAN_IMPORT_SUCCESSFULL,
            };
          } else {
            return {
              success: false,
              data: {
                message: errorMessage.TREATMENT_PLAN_IMPORT_FAILED,
                error: errorMessage.ON_ADD_ERROR,
              },
              status_code: HttpStatus.BAD_REQUEST,
            };
          }
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_GET_TREATMENT_PLAN,
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
}
export default new TreatmentPlanServices();
