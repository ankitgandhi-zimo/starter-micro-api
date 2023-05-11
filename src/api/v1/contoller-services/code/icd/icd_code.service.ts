import { DocumentType } from "@typegoose/typegoose";
import { NextFunction, Request } from "express";
import fs from "fs";
import HttpStatus from "http-status-codes";
import mongoose from "mongoose";
import path from "path";
import XlsxPopulate from "xlsx-populate";
import { IServiceResult1 } from "../../../common/common-methods";
import errorMessage from "../../../common/erros_message";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../../models/history.model";
import IctCodeModel from "../../../models/ict.model";
import { User } from "../../../models/user.model";
import { CheckMongoIdViewmodel } from "../../../view-models/check_mongo_id.viewmodel";
import {
  AddIcdCodeViewmodel,
  GetIcdCodeListViewmodel,
  UpdateIcdCodeViewmodel,
} from "../../../view-models/icd_code";
class IcdCodeServices {
  addIcdCode = async (
    req: Request,
    model: AddIcdCodeViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      model.createdby_id = userDetails._id;

      let alreadyPresentCode = await IctCodeModel.findOne({
        ictCode: model.ictCode,
        codeCategory: model.codeCategory,
      });
      if (alreadyPresentCode) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_ICD_CODE,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        let saveCodeResult = await IctCodeModel.create(model);

        let getCodeResult = await IctCodeModel.findOne(
          {
            _id: saveCodeResult._id,
          },
          { updatedAt: 0, __v: 0 }
        );

        if (saveCodeResult && getCodeResult) {
          let addHistory = await HistoryModel.create({
            user_id: model.createdby_id,
            description: `Ict code added`,
            type: EHistoryActivityTypeValues.USER,
            type_id: model.createdby_id,
          });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: getCodeResult,
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_ADD_ICD_CODE,
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
  updateIcdCode = async (
    req: Request,
    model: UpdateIcdCodeViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let alreadyPresentCode = await IctCodeModel.findOne({
        ictCode: model.ictCode,
        _id: { $ne: model._id },
      });
      if (alreadyPresentCode) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_ICD_CODE,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }

      let updateCodeResult = await IctCodeModel.updateOne(
        { _id: model._id },
        model,
        {
          new: true,
        }
      );
      if (updateCodeResult && updateCodeResult.modifiedCount > 0) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `icd code updated`,
          type: EHistoryActivityTypeValues.USER,
          type_id: userDetails._id,
        });
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.UPDATE_SUCCESSFULL,
          // data: {
          //   _id: updateCountryResult._id,
          //   countryName: updateCountryResult.countryName,
          //   countryCode: updateCountryResult.countryCode,
          // },
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_UPDATE_ICD_CODE,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  deleteIcdCode = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let deleteIcdCodeResult = await IctCodeModel.updateOne(
        { _id: req.params._id },
        { isDeleted: true }
      );
      if (deleteIcdCodeResult && deleteIcdCodeResult.modifiedCount > 0) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `Icd code deleted`,
          type: EHistoryActivityTypeValues.USER,
          type_id: userDetails._id,
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
            message: errorMessage.ERROR_ON_DELETE_ICD_CODE,
            error: errorMessage.ON_DELETE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  getIcdCode = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let getIcdCodeResult = await IctCodeModel.findOne(
        {
          _id: model._id,
          // isActive: true,
          // isDeleted: false,
        },
        { updatedAt: 0, __v: 0 }
      );
      if (getIcdCodeResult) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: getIcdCodeResult,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_GET_ICD_CODE,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  listIcdCode = async (
    req: Request,
    model: GetIcdCodeListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;
      defaultPage = model.pageNumber ? model.pageNumber : 1;
      //count = model.pageSize ? model.pageSize : 50;
      count = 700;
      let populateFeilds: any = [];

      let condition: any = {
        //isDeleted: false,
      };

      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

        condition.ictCode = {
          $regex: model.search,
          $options: "i",
        };
      }

      if (
        "isActive" in model &&
        model.isActive != undefined &&
        model.isActive != null
      ) {
        condition.isActive = model.isActive;
      }

      if (
        "isDeleted" in model &&
        model.isDeleted != undefined &&
        model.isDeleted != null
      ) {
        condition.isDeleted = model.isDeleted;
      }

      let result: mongoose.PaginateResult<any> = await IctCodeModel.paginate(
        condition,
        {
          page: defaultPage,
          ...(count > 0 ? { limit: count } : { pagination: false }),
          populate: populateFeilds,
          select: { createdby_id: 0, __v: 0 },
          sort: { createdAt: -1 },
        }
      );

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
            message: errorMessage.ICD_CODE_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  getIcdCodeDataToExcel = async (
    req: Request,
    model: GetIcdCodeListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      const workbook = await XlsxPopulate.fromBlankAsync();
      let icdCodeSheet: any = workbook.sheet("Sheet1");
      let icdCodeSheetHeader = ["Code", "Category", "Description", "Status"];

      icdCodeSheetHeader.forEach((el, i) => {
        icdCodeSheet
          .cell(String.fromCharCode(i + 65) + "1")
          .value(el)
          .style({
            border: true,
            fontFamily: "Calibri",
            fill: {
              type: "solid",
              color: { rgb: "d9d9d9" },
            },
          });
      });

      let defaultPage: number;
      let count: number;
      defaultPage = model.pageNumber ? model.pageNumber : 1;
      count = model.pageSize ? model.pageSize : 50;
      let populateFeilds: any = [];

      let condition: any = {
        //isDeleted: false,
      };

      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

        condition.ictCode = {
          $regex: model.search,
          $options: "i",
        };
      }

      if (
        "isActive" in model &&
        model.isActive != undefined &&
        model.isActive != null
      ) {
        condition.isActive = model.isActive;
      }

      if (
        "isDeleted" in model &&
        model.isDeleted != undefined &&
        model.isDeleted != null
      ) {
        condition.isDeleted = model.isDeleted;
      }

      let result: mongoose.PaginateResult<any> = await IctCodeModel.paginate(
        condition,
        {
          page: defaultPage,
          ...(count > 0 ? { limit: count } : { pagination: false }),
          populate: populateFeilds,
          select: { createdby_id: 0, __v: 0 },
          sort: { createdAt: -1 },
        }
      );

      if (result && result.docs && result.docs.length > 0) {
        // write data in excel
        let icdCodeData = result.docs;

        let sheetStyle = {
          border: true,
          fontFamily: "Calibri",
        };

        icdCodeData.forEach((el: any, i: number) => {
          icdCodeSheet
            .cell("A" + (i + 2))
            .value(el.ictCode)
            .style(sheetStyle);

          icdCodeSheet
            .cell("B" + (i + 2))
            .value(el.codeCategory)
            .style(sheetStyle);

          icdCodeSheet
            .cell("C" + (i + 2))
            .value(el.description)
            .style(sheetStyle);
          icdCodeSheet;

          icdCodeSheet
            .cell("D" + (i + 2))
            .value(el.isActive)
            .style(sheetStyle);
          icdCodeSheet;
        });

        icdCodeSheet.freezePanes(1, 1);

        const data: any = await workbook.outputAsync();
        await fs.writeFileSync(
          path.join(
            __dirname,
            "../../../../../../public/upload/codes/ICD_Code_Report.xlsx"
          ),
          data
        );
        let link = `http://${req.hostname}:${process.env.PORT}/upload/codes/ICD_Code_Report.xlsx`;

        let excelFileName = "ICD_Code_Report.xlsx";
        let response = {
          link,
          name: excelFileName,
        };
        return {
          status_code: HttpStatus.OK,
          data: response, //link,
          success: true,
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.ICD_CODE_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  // filterListCptCode = async (
  //   req: Request,
  //   model: GetCptCodeListViewmodel,
  //   next: NextFunction
  // ): Promise<IServiceResult1 | void> => {
  //   try {
  //     let condition: any = {
  //       isDeleted: false,
  //     };

  //     if (model.search) {
  //       let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

  //       condition.cptCode = {
  //         $regex: model.search,
  //         $options: "i",
  //       };
  //     }

  //     if (model.isActive) {
  //       condition.isActive = model.isActive;
  //     }

  //     let response = await CptCodeModel.find(condition, {
  //       createdAt: 0,
  //       updatedAt: 0,
  //       __v: 0,
  //       isDeleted: 0,
  //       isActive: 0,
  //     }).sort({ createdAt: -1 });

  //     if (response && response.length > 0) {
  //       return {
  //         status_code: HttpStatus.OK,
  //         success: true,
  //         data: {
  //           data: response,
  //           totalDocs: response.length,
  //         },
  //       };
  //     } else {
  //       return {
  //         status_code: HttpStatus.BAD_REQUEST,
  //         success: false,
  //         data: {
  //           message: errorMessage.CPT_CODE_LIST_NOT_FOUND,
  //           error: errorMessage.ON_FETCH_ERROR,
  //         },
  //       };
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}
export default new IcdCodeServices();
