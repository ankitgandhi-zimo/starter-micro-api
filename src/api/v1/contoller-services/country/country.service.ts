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
import CountryModel, { Country } from "../../models/country.model";
import {
  AddCountryViewmodel,
  UpdateCountryViewmodel,
  GetCountryListViewmodel,
} from "../../view-models/country";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";

export enum EnumRole {
  PROVIDER = "provider",
}
class CountryServices {
  addCountry = async (
    req: Request,
    model: AddCountryViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      model.createdby_id = userDetails._id;

      let alreadyPresentCountry = await CountryModel.findOne(model);
      if (alreadyPresentCountry) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_STATE,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        // let skillData = {
        //   skillName: model.skillName,
        //   //createdby_id: userDetails._id,
        // };

        let saveCountryResult = await CountryModel.create(model);

        if (saveCountryResult) {
          // let addHistory = await HistoryModel.create({
          //   user_id: model.createdby_id,
          //   description: `provider added country`,
          //   type: EHistoryActivityTypeValues.PROVIDER,
          // });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: {
              _id: saveCountryResult._id,
              countryName: saveCountryResult.countryName,
              countryCode: saveCountryResult.countryCode,
            },
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_ADD_COUNTRY,
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
  updateCountry = async (
    req: Request,
    model: UpdateCountryViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let alreadyPresentCountry = await CountryModel.findOne({
        countryName: model.countryName,
        _id: { $ne: model._id },
      });
      if (alreadyPresentCountry) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_COUNTRY,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        let updateCountryResult = await CountryModel.findOneAndUpdate(
          { _id: model._id },
          model,
          {
            new: true,
          }
        );
        if (updateCountryResult) {
          // let addHistory = await HistoryModel.create({
          //   user_id: userDetails._id,
          //   description: `provider updated country`,
          //   type: EHistoryActivityTypeValues.PROVIDER,
          // });
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
              message: errorMessage.ERROR_ON_UPDATE_COUNTRY,
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
  deleteCountry = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let deleteCountryResult = await CountryModel.updateOne(
        { _id: req.params._id },
        { isDeleted: true }
      );
      if (deleteCountryResult && deleteCountryResult.modifiedCount > 0) {
        // let addHistory = await HistoryModel.create({
        //   user_id: userDetails._id,
        //   description: `provider deleted country`,
        //   type: EHistoryActivityTypeValues.PROVIDER,
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
            message: errorMessage.ERROR_ON_DELETE_COUNTRY,
            error: errorMessage.ON_DELETE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  getCountry = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let getCountryResult = await CountryModel.findOne({
        _id: model._id,
        // isActive: true,
        // isDeleted: false,
      });
      if (getCountryResult) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: {
            _id: getCountryResult._id,
            countryName: getCountryResult.countryName,
            countryCode: getCountryResult.countryCode,
          },
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_GET_COUNTRY,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  listCountry = async (
    req: Request,
    model: GetCountryListViewmodel,
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

        condition.countryName = {
          $regex: model.search,
          $options: "i",
        };
      }

      if (model.isActive) {
        condition.isActive = model.isActive;
      }

      let result: mongoose.PaginateResult<any> = await CountryModel.paginate(
        condition,
        {
          page: defaultPage,
          ...(count > 0 ? { limit: count } : { pagination: false }),
          populate: populateFeilds,

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
            message: errorMessage.COUNTRY_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
  //Provides listing for dropdown for filtering data
  filterListCountry = async (
    req: Request,
    model: GetCountryListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;

      let condition: any = {
        isDeleted: false,
      };

      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

        condition.countryName = {
          $regex: model.search,
          $options: "i",
        };
      }

      if (model.isActive) {
        condition.isActive = model.isActive;
      }

      let response = await CountryModel.find(condition, {
        createdAt: 0,
        updatedAt: 0,
        isActive: 0,
        isDeleted: 0,
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
            message: errorMessage.COUNTRY_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new CountryServices();
