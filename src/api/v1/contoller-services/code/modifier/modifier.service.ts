import { DocumentType } from "@typegoose/typegoose";
import { NextFunction, Request } from "express";
import HttpStatus from "http-status-codes";
import mongoose from "mongoose";
import { IServiceResult1 } from "../../../common/common-methods";
import errorMessage from "../../../common/erros_message";
import ModifierModel from "../../../models/modifiers.model";
import { User } from "../../../models/user.model";

import fs from "fs";
import path from "path";
import XlsxPopulate from "xlsx-populate";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../../models/history.model";
import { CheckMongoIdViewmodel } from "../../../view-models/check_mongo_id.viewmodel";
import {
  AddModifierViewmodel,
  GetModifierListViewmodel,
  UpdateModifierViewmodel,
} from "../../../view-models/modifier";

class ModifierServices {
  addModifier = async (
    req: Request,
    model: AddModifierViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      model.createdby_id = userDetails._id;

      let alreadyPresentCode = await ModifierModel.findOne({
        modifierCode: model.modifierCode,
      });
      if (alreadyPresentCode) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_MODIFIER,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        let saveCodeResult = await ModifierModel.create(
          model
        );

        let getCodeResult = await ModifierModel.findOne(
          {
            _id: saveCodeResult._id,
          },
          { updatedAt: 0, __v: 0 }
        );

        if (saveCodeResult && getCodeResult) {
          let addHistory = await HistoryModel.create({
            user_id: model.createdby_id,
            description: `modifier added`,
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
              message: errorMessage.ERROR_ON_ADD_MODIFIER,
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
  updateModifier = async (
    req: Request,
    model: UpdateModifierViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let alreadyPresentCode = await ModifierModel.findOne({
        modifierCode: model.modifierCode,
        _id: { $ne: model._id },
      });
      if (alreadyPresentCode) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_MODIFIER,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }

      let updateCodeResult = await ModifierModel.updateOne(
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
          description: `Modifier updated`,
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
            message: errorMessage.ERROR_ON_UPDATE_MODIFIER,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  deleteModifier = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let deleteResult = await ModifierModel.updateOne(
        { _id: req.params._id },
        { isDeleted: true }
      );
      if (deleteResult && deleteResult.modifiedCount > 0) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `Modifier deleted`,
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
            message: errorMessage.ERROR_ON_DELETE_MODIFIER,
            error: errorMessage.ON_DELETE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  getModifier = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let getResult = await ModifierModel.findOne(
        {
          _id: model._id,
          // isActive: true,
          // isDeleted: false,
        },
        { updatedAt: 0, __v: 0 }
      );
      if (getResult) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: getResult,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_GET_MODIFIER,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  listModifier = async (
    req: Request,
    model: GetModifierListViewmodel,
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
      };

      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(
          model.search
        );

        condition.modifierCode = {
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
        await ModifierModel.paginate(condition, {
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
            message: errorMessage.MODIFIER_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  getModifierDataToExcel = async (
    req: Request,
    model: GetModifierListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      const workbook = await XlsxPopulate.fromBlankAsync();
      let modifierSheet: any = workbook.sheet("Sheet1");
      let modifierSheetHeader = [
        "Code",
        "Description",
        "Status",
      ];

      modifierSheetHeader.forEach((el, i) => {
        modifierSheet
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
        let isEmptyNameOnlySpace = /^\s*$/.test(
          model.search
        );

        condition.modifierCode = {
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
        await ModifierModel.paginate(condition, {
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
        let icdCodeData = result.docs;

        let sheetStyle = {
          border: true,
          fontFamily: "Calibri",
        };

        icdCodeData.forEach((el: any, i: number) => {
          modifierSheet
            .cell("A" + (i + 2))
            .value(el.modifierCode)
            .style(sheetStyle);

          modifierSheet
            .cell("B" + (i + 2))
            .value(el.description)
            .style(sheetStyle);

          modifierSheet
            .cell("C" + (i + 2))
            .value(el.isActive)
            .style(sheetStyle);
          modifierSheet;
        });

        modifierSheet.freezePanes(1, 1);

        const data: any = await workbook.outputAsync();
        await fs.writeFileSync(
          path.join(
            __dirname,
            "../../../../../../public/upload/codes/Modifier_Report.xlsx"
          ),
          data
        );
        let link = `http://${req.hostname}:${process.env.PORT}/upload/codes/Modifier_Report.xlsx`;

        let excelFileName = "Modifier_Report.xlsx";
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
            message: errorMessage.MODIFIER_LIST_NOT_FOUND,
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
export default new ModifierServices();
