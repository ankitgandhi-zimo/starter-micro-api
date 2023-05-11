import { DocumentType } from "@typegoose/typegoose";
import { NextFunction, Request } from "express";
import fs from "fs";
import HttpStatus from "http-status-codes";
import mongoose from "mongoose";
import path from "path";
import XlsxPopulate from "xlsx-populate";
import { IServiceResult1 } from "../../../common/common-methods";
import errorMessage from "../../../common/erros_message";
import CptCodeModel from "../../../models/cpt.model";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../../models/history.model";
import { User } from "../../../models/user.model";
import { CheckMongoIdViewmodel } from "../../../view-models/check_mongo_id.viewmodel";
import {
  AddCptCodeViewmodel,
  GetCptCodeListViewmodel,
  UpdateCptCodeViewmodel,
} from "../../../view-models/cpt_code";

class CptCodeServices {
  addCptCode = async (
    req: Request,
    model: AddCptCodeViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      model.createdby_id = userDetails._id;

      let alreadyPresentCode = await CptCodeModel.findOne(
        model
      );
      if (alreadyPresentCode) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_CPT_CODE,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        let saveCodeResult = await CptCodeModel.create(
          model
        );

        let getCodeResult = await CptCodeModel.findOne(
          {
            _id: saveCodeResult._id,
          },
          { updatedAt: 0, __v: 0 }
        );

        if (saveCodeResult && getCodeResult) {
          let addHistory = await HistoryModel.create({
            user_id: model.createdby_id,
            description: `cpt code added`,
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
              message: errorMessage.ERROR_ON_ADD_CPT_CODE,
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
  updateCptCode = async (
    req: Request,
    model: UpdateCptCodeViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let alreadyPresentCode = await CptCodeModel.findOne({
        cptCode: model.cptCode,
        _id: { $ne: model._id },
      });
      if (alreadyPresentCode) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_CPT_CODE,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }

      let updateCodeResult = await CptCodeModel.updateOne(
        { _id: model._id },
        model,
        {
          new: true,
        }
      );
      if (
        updateCodeResult &&
        updateCodeResult.modifiedCount > 0
      ) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `cpt code updated`,
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
            message: errorMessage.ERROR_ON_UPDATE_CPT_CODE,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  deleteCptCode = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let deleteCptCodeResult =
        await CptCodeModel.updateOne(
          { _id: req.params._id },
          { isDeleted: true }
        );
      if (
        deleteCptCodeResult &&
        deleteCptCodeResult.modifiedCount > 0
      ) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `cpt code deleted`,
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
            message: errorMessage.ERROR_ON_DELETE_CPT_CODE,
            error: errorMessage.ON_DELETE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  getCptCode = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let getCptCodeResult = await CptCodeModel.findOne(
        {
          _id: model._id,
          // isActive: true,
          // isDeleted: false,
        },
        { updatedAt: 0, __v: 0 }
      );
      if (getCptCodeResult) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: getCptCodeResult,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_GET_CPT_CODE,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  listCptCode = async (
    req: Request,
    model: GetCptCodeListViewmodel,
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
        //isDeleted: false,
      };

      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(
          model.search
        );

        condition.cptCode = {
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

      let result: mongoose.PaginateResult<any> =
        await CptCodeModel.paginate(condition, {
          page: defaultPage,
          ...(count > 0
            ? { limit: count }
            : { pagination: false }),
          populate: populateFeilds,
          select: { createdby_id: 0, __v: 0 },
          sort: { createdAt: -1 },
        });

      if (result && result.docs && result.docs.length > 0) {
        let obj = {
          data: result.docs,
          // count: result.totalDocs,
          totalDocs: result.totalDocs,
          pageNumber: result.page,
          pageSize: result.limit,
          totalPages: Math.ceil(
            result.totalDocs / result.limit
          ),
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
            message: errorMessage.CPT_CODE_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
  filterListCptCode = async (
    req: Request,
    model: GetCptCodeListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let condition: any = {
        isDeleted: false,
      };

      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(
          model.search
        );

        condition.cptCode = {
          $regex: model.search,
          $options: "i",
        };
      }

      if (model.isActive) {
        condition.isActive = model.isActive;
      }

      let response = await CptCodeModel.find(condition, {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
        isDeleted: 0,
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
            message: errorMessage.CPT_CODE_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  // Download CPT Data

  getCptCodeDataToExcel = async (
    req: Request,
    model: GetCptCodeListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      const workbook = await XlsxPopulate.fromBlankAsync();
      let cptCodeSheet: any = workbook.sheet("Sheet1");
      let cptCodeSheetHeader = [
        "Code",
        "Description",
        "Pricing",
        "Status",
      ];

      cptCodeSheetHeader.forEach((el, i) => {
        cptCodeSheet
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
        isDeleted: false,
        //isDeleted: false,
      };

      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(
          model.search
        );

        condition.cptCode = {
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

      let result: mongoose.PaginateResult<any> =
        await CptCodeModel.paginate(condition, {
          page: defaultPage,
          ...(count > 0
            ? { limit: count }
            : { pagination: false }),
          populate: populateFeilds,
          select: { createdby_id: 0, __v: 0 },
          sort: { createdAt: -1 },
        });

      if (result && result.docs && result.docs.length > 0) {
        // write data in excel
        let cptCodeData = result.docs;

        let sheetStyle = {
          border: true,
          fontFamily: "Calibri",
        };
        console.log(cptCodeData, "fdf");
        cptCodeData.forEach((el: any, i: number) => {
          cptCodeSheet
            .cell("A" + (i + 2))
            .value(el.cptCode)
            .style(sheetStyle);

          cptCodeSheet
            .cell("B" + (i + 2))
            .value(el.description)
            .style(sheetStyle);

          cptCodeSheet
            .cell("C" + (i + 2))
            .value(el.price)
            .style(sheetStyle);
          cptCodeSheet;

          cptCodeSheet
            .cell("D" + (i + 2))
            .value(el.isActive)
            .style(sheetStyle);
          cptCodeSheet;
        });

        cptCodeSheet.freezePanes(1, 1);

        const data: any = await workbook.outputAsync();
        await fs.writeFileSync(
          path.join(
            __dirname,
            "../../../../../../public/upload/codes/CPT_Code_Report.xlsx"
          ),
          data
        );
        let link = `http://${req.hostname}:${process.env.PORT}/upload/codes/CPT_Code_Report.xlsx`;

        let excelFileName = "CPT_Code_Report.xlsx";
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
            message: errorMessage.CPT_CODE_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new CptCodeServices();
