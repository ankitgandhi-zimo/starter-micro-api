import { DocumentType } from "@typegoose/typegoose";
import { NextFunction, Request } from "express";

import axios from "axios";
import fs from "fs";
import HttpStatus from "http-status-codes";
import _ from "lodash";
import moment from "moment";
import mongoose from "mongoose";
import path from "path";
import XlsxPopulate from "xlsx-populate";
import { IServiceResult1 } from "../../common/common-methods";
import errorMessage from "../../common/erros_message";
import AppointmentTypeModel from "../../models/appointment_types.model";
import DoctorModel from "../../models/doctor.model";
import FetchDataModel from "../../models/fetch_data.model";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";
import ClinicLocationModel from "../../models/location.model";
import {
  default as Roles,
  default as RolesModel,
} from "../../models/roles.model";
import UserModel, { User } from "../../models/user.model";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddProviderViewmodel,
  FetchProviderViewmodel,
  GetAppointmentTypeListViewmodel,
  GetFilterListViewmodel,
  GetFilterProviderListViewmodel,
  GetProviderListViewmodel,
  UpdateAppointmentTypeViewmodel,
  UpdateLocationViewmodel,
  UpdateProviderViewmodel,
  GetProviderFilterListViewmodel,
} from "../../view-models/provider";
export enum EnumRole {
  PROVIDER = "provider",
}
interface IProvider {
  first_name?: string;
  last_name?: string;
  email?: string;
}
class ProviderServices {
  addProvider = async (
    req: Request,
    model: AddProviderViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let alreadyPresentEmail = await UserModel.findOne({
        email: model.email.toLowerCase(),
      });
      if (alreadyPresentEmail) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_ASSOCIATED_EMAIL,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        let userDetails = <DocumentType<User>>req.user;

        model.createdby_id = userDetails._id;
        let roleId = await this.findRoleId(EnumRole.PROVIDER);
        if (!roleId)
          return {
            success: false,
            data: {
              message: errorMessage.ROLE_NOT_FOUND,
              error: errorMessage.ON_ADD_ERROR,
            },
            status_code: HttpStatus.BAD_REQUEST,
          };
        let userData = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          mobile_no: req.body.mobile_no,
          image: req.body.image,
          role: roleId._id,
          role_permission: roleId!.permission,
        };

        let saveUserResult = await UserModel.create(userData);

        model.user_id = saveUserResult._id;

        let saveDoctorResult = await DoctorModel.create(model);
        let getDoctorResult = await DoctorModel.findOne({
          _id: saveDoctorResult._id,
        });
        // .populate([
        //   {
        //     path: "skills",
        //     select: { skillName: 1 },
        //   },
        // ]);
        if (saveDoctorResult && getDoctorResult) {
          let addHistory = await HistoryModel.create({
            user_id: model.createdby_id,
            description: `provider added`,
            type: EHistoryActivityTypeValues.PROVIDER,
            type_id: getDoctorResult._id,
            data: {
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email: req.body.email,
              mobile_no: req.body.mobile_no,
            },
          });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: {
              email: saveUserResult.email,
              _id: getDoctorResult._id,
              user_id: saveUserResult._id,
              first_name: saveUserResult.first_name,
              last_name: saveUserResult.last_name,
              mobile_no: saveUserResult.mobile_no,
              image: saveUserResult.image,
              middle_name: getDoctorResult.middle_name,
              title: getDoctorResult.title,
              address: getDoctorResult.address,
              postal_code: getDoctorResult.postal_code,
              city: getDoctorResult.city,
              state: getDoctorResult.state,
              country: getDoctorResult.country,
              dob: getDoctorResult.dob,
              license: getDoctorResult.license,
              npiNo: getDoctorResult.npiNo,
              deaNo: getDoctorResult.deaNo,
              experience: getDoctorResult.experience,
              taxonomy: getDoctorResult.experience,
              // additionalSkill: getDoctorResult.additionalSkill,
              // awards: getDoctorResult.awards,
              // qualifications: getDoctorResult.qualifications,
              // skills: getDoctorResult.skills,
              emergency_contact_number:
                getDoctorResult.emergency_contact_number,
              emergency_contact_name: getDoctorResult.emergency_contact_name,
              relation: getDoctorResult.relation,
            },
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_ADD_PROVIDER,
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
  updateProvider = async (
    req: Request,
    model: UpdateProviderViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let id = model._id;
      delete model._id;
      let UserModelData: any = {};
      if (model.first_name) UserModelData.first_name = model.first_name;
      if (model.last_name) UserModelData.last_name = model.last_name;
      if (model.mobile_no) UserModelData.mobile_no = model.mobile_no;
      if (model.image) UserModelData.image = model.image;
      if ("isActive" in model) UserModelData.isActive = model.isActive;
      if ("isDeleted" in model) UserModelData.isDeleted = model.isDeleted;

      let updateDoctorResult = await DoctorModel.findOneAndUpdate(
        { _id: id },
        model,
        {
          new: true,
        }
      ).populate([
        {
          path: "skills",
          select: { skillName: 1 },
        },
      ]);

      if (updateDoctorResult) {
        if (!_.isEmpty(UserModelData)) {
          let updateUserResult = await UserModel.findOneAndUpdate(
            { _id: updateDoctorResult.user_id },
            UserModelData,
            {
              new: true,
            }
          );

          if (!updateUserResult) {
            return {
              success: false,
              data: {
                message: errorMessage.ERROR_ON_UPDATE_PROVIDER,
                error: errorMessage.ON_UPDATE_ERROR,
              },
              status_code: HttpStatus.BAD_REQUEST,
            };
          }
        }

        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `provider updated`,
          type: EHistoryActivityTypeValues.PROVIDER,
          type_id: updateDoctorResult._id,
          data: UserModelData,
        });
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.UPDATE_SUCCESSFULL,

          // {
          //   _id: updateDoctorResult.user_id,
          //   email: updateUserResult.email,
          //   image: updateUserResult.image,
          //   first_name: updateUserResult.first_name,
          //   last_name: updateUserResult.last_name,
          //   mobile_no: updateUserResult.mobile_no,
          //   title: updateDoctorResult.title,
          //   address: updateDoctorResult.address,
          //   postal_code: updateDoctorResult.postal_code,
          //   city: updateDoctorResult.city,
          //   state: updateDoctorResult.state,
          //   country: updateDoctorResult.country,
          //   dob: updateDoctorResult.dob,
          //   license: updateDoctorResult.license,
          //   npiNo: updateDoctorResult.npiNo,
          //   deaNo: updateDoctorResult.deaNo,
          //   experience: updateDoctorResult.experience,
          //   additionalSkill: updateDoctorResult.additionalSkill,
          //   awards: updateDoctorResult.awards,
          //   qualifications: updateDoctorResult.qualifications,
          //   skills: updateDoctorResult.skills,
          //   emergency_contact_number:
          //     updateDoctorResult.emergency_contact_number,
          //   emergency_contact_name: updateDoctorResult.emergency_contact_name,
          //   relation: updateDoctorResult.relation,
          // },
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_UPDATE_PROVIDER,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  deleteProvider = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let find_user_id = await DoctorModel.findOne(
        { _id: model._id },
        { user_id: 1 }
      );
      if (find_user_id) {
        let deleteDoctorResult = await UserModel.updateOne(
          { _id: find_user_id.user_id },
          { isDeleted: true }
        );
        if (deleteDoctorResult && deleteDoctorResult.modifiedCount > 0) {
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `provider deleted`,
            type: EHistoryActivityTypeValues.PROVIDER,
            type_id: model._id,
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
              message: errorMessage.ERROR_ON_DELETE_PROVIDER,
              error: errorMessage.ON_DELETE_ERROR,
            },
            status_code: HttpStatus.BAD_REQUEST,
          };
        }
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_DELETE_PROVIDER,
            error: errorMessage.ON_DELETE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  getProvider = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let _id = new mongoose.Types.ObjectId(model._id);

      let getDoctorResult = await DoctorModel.aggregate([
        {
          $match: {
            _id: _id,
            //isDeleted: false,
          },
        },
        {
          $lookup: {
            from: "users",
            let: { u_id: "$user_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$u_id"],
                  },
                },
              },
              {
                $project: {
                  _id: 0,
                  first_name: 1,
                  last_name: 1,
                  email: 1,
                  mobile_no: 1,
                  image: 1,
                },
              },
            ],
            as: "userData",
          },
        },
        {
          $unwind: {
            path: "$userData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "states",
            let: { state: "$state" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$state"],
                  },
                },
              },
              {
                $project: {
                  _id: 1,
                  stateName: 1,
                },
              },
            ],
            as: "stateData",
          },
        },
        {
          $unwind: {
            path: "$stateData",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: "countries",
            let: { country: "$country" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$country"],
                  },
                },
              },
              {
                $project: {
                  _id: 1,
                  countryName: 1,
                },
              },
            ],
            as: "countryData",
          },
        },
        {
          $unwind: {
            path: "$countryData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "skill",
            let: { skillIds: "$skills" },
            pipeline: [
              // {
              //   $match: {
              //     $expr: {
              //       $eq: ["$_id", "$$skillIds"],
              //     },
              //   },
              // },
              {
                $match: {
                  $expr: { $in: ["$_id", "$$skillIds"] },
                },
              },
              {
                $project: {
                  skillName: 1,
                  _id: 1,
                },
              },
            ],
            as: "skillData",
          },
        },
        {
          $project: {
            _id: 1,
            first_name: "$userData.first_name",
            last_name: "$userData.last_name",
            middle_name: 1,
            email: "$userData.email",
            mobile_no: "$userData.mobile_no",
            image: "$userData.image",
            user_id: 1,
            address: 1,
            title: 1,
            postal_code: 1,
            city: 1,
            state: "$stateData",
            country: "$countryData",
            dob: 1,
            license: 1,
            npiNo: 1,
            deaNo: 1,
            experience: 1,
            taxonomy: 1,
            awards: {
              $ifNull: ["$awards", []],
            },
            skills: "$skillData",
            qualifications: {
              $ifNull: ["$qualifications", []],
            },
            additionalSkill: {
              $ifNull: ["$additionalSkill", []],
            },
            emergency_contact_number: 1,
            emergency_contact_name: 1,
            relation: 1,
          },
        },
      ]);

      // let getDoctorResult = await UserModel.aggregate([
      //   {
      //     $match: {
      //       _id: _id,
      //       //isDeleted: false,
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: "doctor",
      //       pipeline: [
      //         {
      //           $match: {
      //             $expr: {
      //               $eq: ["$user_id", _id],
      //             },
      //           },
      //         },
      //         {
      //           $lookup: {
      //             from: "states",
      //             let: { state: "$state" },
      //             pipeline: [
      //               {
      //                 $match: {
      //                   $expr: {
      //                     $eq: ["$_id", "$$state"],
      //                   },
      //                 },
      //               },
      //               {
      //                 $project: {
      //                   _id: 1,
      //                   stateName: 1,
      //                 },
      //               },
      //             ],
      //             as: "stateData",
      //           },
      //         },
      //         {
      //           $unwind: {
      //             path: "$stateData",
      //             preserveNullAndEmptyArrays: true,
      //           },
      //         },

      //         {
      //           $lookup: {
      //             from: "countries",
      //             let: { country: "$country" },
      //             pipeline: [
      //               {
      //                 $match: {
      //                   $expr: {
      //                     $eq: ["$_id", "$$country"],
      //                   },
      //                 },
      //               },
      //               {
      //                 $project: {
      //                   _id: 1,
      //                   countryName: 1,
      //                 },
      //               },
      //             ],
      //             as: "countryData",
      //           },
      //         },
      //         {
      //           $unwind: {
      //             path: "$countryData",
      //             preserveNullAndEmptyArrays: true,
      //           },
      //         },
      //         {
      //           $project: {
      //             user_id: 1,
      //             title: 1,
      //             address: 1,
      //             postal_code: 1,
      //             city: 1,
      //             //country: 1,
      //             //state: 1,
      //             dob: 1,
      //             license: 1,
      //             npiNo: 1,
      //             deaNo: 1,
      //             experience: 1,
      //             awards: 1,
      //             skills: 1,
      //             qualifications: 1,
      //             relation: 1,
      //             emergency_contact_number: 1,
      //             emergency_contact_name: 1,
      //             additionalSkill: 1,
      //             state: "$stateData",
      //             country: "$countryData",
      //           },
      //         },
      //       ],
      //       as: "doctorData",
      //     },
      //   },
      //   { $unwind: { path: "$doctorData", preserveNullAndEmptyArrays: true } },
      //   {
      //     $lookup: {
      //       from: "skill",
      //       let: { skillIds: "$doctorData.skills" },
      //       pipeline: [
      //         // {
      //         //   $match: {
      //         //     $expr: {
      //         //       $eq: ["$_id", "$$skillIds"],
      //         //     },
      //         //   },
      //         // },
      //         { $match: { $expr: { $in: ["$_id", "$$skillIds"] } } },
      //         {
      //           $project: {
      //             skillName: 1,
      //             _id: 1,
      //           },
      //         },
      //       ],
      //       as: "skillData",
      //     },
      //   },
      //   {
      //     $project: {
      //       first_name: 1,
      //       last_name: 1,
      //       email: 1,
      //       mobile_no: 1,
      //       image: 1,
      //       //user_id: "$doctorData.user_id",
      //       address: "$doctorData.address",
      //       title: "$doctorData.title",
      //       postal_code: "$doctorData.postal_code",
      //       city: "$doctorData.city",
      //       state: "$doctorData.state",
      //       country: "$doctorData.country",
      //       dob: "$doctorData.dob",
      //       license: "$doctorData.license",
      //       npiNo: "$doctorData.npiNo",
      //       deaNo: "$doctorData.deaNo",
      //       experience: "$doctorData.experience",
      //       awards: {
      //         $ifNull: ["$doctorData.awards", []],
      //       },
      //       skills: "$skillData",
      //       qualifications: {
      //         $ifNull: ["$doctorData.qualifications", []],
      //       },
      //       additionalSkill: {
      //         $ifNull: ["$doctorData.additionalSkill", []],
      //       },
      //       emergency_contact_number: "$doctorData.emergency_contact_number",
      //       emergency_contact_name: "$doctorData.emergency_contact_name",
      //       relation: "$doctorData.relation",
      //     },
      //   },
      // ]);
      if (getDoctorResult && getDoctorResult.length > 0) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: getDoctorResult[0],
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_FETCHING_PROVIDER,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  listProvider = async (
    req: Request,
    model: GetProviderListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let roleId = await this.findRoleId(EnumRole.PROVIDER);

      if (!roleId)
        return {
          success: false,
          data: {
            message: errorMessage.ROLE_NOT_FOUND,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      else {
        let defaultPage: number;
        let count: number;
        defaultPage = model.pageNumber ? model.pageNumber : 1;
        count = model.pageSize ? model.pageSize : 50;
        let populateFeilds: any = [];

        let condition: any = {};

        let child_condition: any = {};
        child_condition.role = new mongoose.Types.ObjectId(roleId._id);
        condition.clinic_id = new mongoose.Types.ObjectId(
          model.clinic_id?.toString()
        );
        // if ("isDeleted" in model && model.isDeleted)
        //   child_condition.isDeleted = model.isDeleted;

        if (model.isDeleted == true || model.isDeleted == false) {
          child_condition.isDeleted = model.isDeleted;
        }

        if (model.search) {
          let isEmptyNameOnlySpace = /^\s*$/.test(model.search);
          child_condition.$or = [
            {
              first_name: {
                $regex: model.search,
                $options: "i",
              },
            },
            {
              last_name: {
                $regex: model.search,
                $options: "i",
              },
            },
            {
              email: {
                $regex: model.search,
                $options: "i",
              },
            },
            {
              mobile_no: {
                $regex: model.search,
                $options: "i",
              },
            },
          ];
        }

        if (model.isActive) {
          child_condition.isActive = model.isActive;
        }

        let result = await DoctorModel.aggregate([
          { $match: condition },
          {
            $lookup: {
              from: "users",
              localField: "user_id",
              foreignField: "_id",
              //pipeline: [{ $match: child_condition }],
              as: "userData",
            },
          },
          {
            $unwind: {
              path: "$userData",
              preserveNullAndEmptyArrays: false,
            },
          },
          {
            $facet: {
              count: [{ $count: "count" }],
              data: [
                {
                  $project: {
                    _id: 1,
                    first_name: "$userData.first_name",
                    last_name: "$userData.last_name",
                    middle_name: 1,
                    email: "$userData.email",
                    mobile_no: "$userData.mobile_no",
                    image: "$userData.image",
                    isActive: "$userData.isActive",
                    isDeleted: "$userData.isDeleted",
                    createdAt: "$userData.createdAt",
                  },
                },
                {
                  $sort: { createdAt: -1 },
                },
                { $skip: count * (defaultPage - 1) },
                { $limit: count },
              ],
            },
          },
        ]);

        // let result: mongoose.PaginateResult<any> = await UserModel.paginate(
        //   condition,
        //   {
        //     page: defaultPage,
        //     ...(count > 0 ? { limit: count } : { pagination: false }),
        //     populate: populateFeilds,
        //     select: {
        //       _id: 1,
        //       first_name: 1,
        //       last_name: 1,
        //       email: 1,
        //       mobile_no: 1,
        //       image: 1,
        //       isActive: 1,
        //       isDeleted: 1,
        //     },
        //     sort: { createdAt: -1 },
        //   }
        // );

        if (
          result &&
          result.length > 0 &&
          result[0].data &&
          result[0].data.length > 0
        ) {
          //Added by Ankit 07-04-2023
          // sort list with doctor name alphabetically
          const sortedList = result[0].data.sort((a: any, b: any) =>
            a.first_name.localeCompare(b.first_name)
          );

          let obj = {
            data: sortedList,
            // count: result.totalDocs,
            totalDocs: result[0].count[0].count,
            pageNumber: defaultPage,
            pageSize: count,
            totalPages: Math.ceil(result[0].count[0].count / count),
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
              message: errorMessage.PROVIDER_LIST_NOT_FOUND,
              error: errorMessage.ON_FETCH_ERROR,
            },
          };
        }
      }
    } catch (error) {
      next(error);
    }
  };
  //Provides listing for dropdown for filtering data
  filterListProvider = async (
    req: Request,
    model: GetFilterProviderListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let roleId = await this.findRoleId(EnumRole.PROVIDER);

      if (!roleId)
        return {
          success: false,
          data: {
            message: errorMessage.ROLE_NOT_FOUND,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      else {
        let condition: any = {
          isDeleted: false,
          role: roleId._id,
          isActive: true,
        };

        if (model.clinic_id && model.clinic_id != undefined) {
          condition.clinic_id = model.clinic_id;
        }

        // if (model.search) {
        //   let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

        //   if (
        //     isEmptyNameOnlySpace ||
        //     model.search == null ||
        //     model.search === ""
        //   ) {
        //     return {
        //       data: {
        //         message: "errorMessage.NON_EMPTY_CLINIC_NAME",
        //         error: errorMessage.ON_FETCH_ERROR,
        //       },
        //       success: false,
        //       status_code: HttpStatus.BAD_REQUEST,
        //     };
        //   } else
        //     condition.first_name = {
        //       $regex: model.search,
        //       $options: "i",
        //     };
        // }

        // if (model.isActive) {
        //  condition.isActive = true;
        // }

        let response = await DoctorModel.find(condition, {
          user_id: 1,
          createdAt: 1,
        })
          .populate("user_id", "first_name last_name")
          .sort({ createdAt: -1 });

        if (response && response.length > 0) {
          let result: any = [];

          for (let i = 0; i < response.length; i++) {
            let userDetails = <DocumentType<User>>response[i].user_id;
            result.push({
              _id: response[i]._id,
              user_id: userDetails ? userDetails._id : null,
              first_name: userDetails ? userDetails.first_name : null,
              last_name: userDetails ? userDetails.last_name : null,
            });
          }

          return {
            status_code: HttpStatus.OK,
            success: true,
            data: {
              data: result,
              totalDocs: response.length,
            },
          };
        } else {
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.PROVIDER_LIST_NOT_FOUND,
              error: errorMessage.ON_FETCH_ERROR,
            },
          };
        }
      }
    } catch (error) {
      next(error);
    }
  };

  updateAppointmentType = async (
    req: Request,
    model: UpdateAppointmentTypeViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      //model.assignedApptTypes = _.uniq(model.assignedApptTypes);
      let condition: any = {};
      if (model.assign) {
        condition.$addToSet = {
          assignedApptTypes: model.appointment_type_id,
        };
      } else {
        condition.$pull = {
          assignedApptTypes: model.appointment_type_id,
        };
      }
      let assignedAppointmentType = await DoctorModel.update(
        {
          _id: model._id,
        },
        condition
      );

      if (
        assignedAppointmentType &&
        assignedAppointmentType.modifiedCount > 0
      ) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.UPDATE_ASSIGNED_APPT_TYPE_SUCCESSFULL,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_UPDATE_APPOINTMENTTYPE,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
      //}
    } catch (error) {
      next(error);
    }
  };
  updateLocation = async (
    req: Request,
    model: UpdateLocationViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      //model.assignedApptTypes = _.uniq(model.assignedApptTypes);
      let condition: any = {};
      if (model.assign) {
        condition.$addToSet = {
          location: model.location_id,
        };
      } else {
        condition.$pull = { location: model.location_id };
      }
      let assignedLocation = await DoctorModel.updateOne(
        {
          _id: model._id,
        },
        condition
      );

      if (assignedLocation && assignedLocation.modifiedCount > 0) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.UPDATE_SUCCESSFULL,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_UPDATE_CLINIC_LOCATION,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
      //}
    } catch (error) {
      next(error);
    }
  };
  listAppointmentType = async (
    req: Request,
    model: GetAppointmentTypeListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;
      defaultPage = model.pageNumber ? model.pageNumber : 1;
      count = model.pageSize ? model.pageSize : 50;
      let apptTypesProvider = await DoctorModel.findOne(
        { _id: model._id },
        { assignedApptTypes: 1 }
      );
      let appointmentTypes: any = [];
      if (apptTypesProvider)
        appointmentTypes = apptTypesProvider.assignedApptTypes;
      let result = await AppointmentTypeModel.aggregate([
        {
          $match: {
            isActive: true,
            isDeleted: false,
            clinic_id: new mongoose.Types.ObjectId(model.clinic_id!.toString()),
          },
        },

        {
          $facet: {
            count: [{ $count: "count" }],
            data: [
              {
                $project: {
                  _id: 1,
                  type: 1,
                  color: 1,
                  isAssigned: {
                    $cond: [{ $in: ["$_id", appointmentTypes] }, true, false],
                  },
                },
              },
              {
                $sort: { createdAt: -1 },
              },
              { $skip: count * (defaultPage - 1) },
              { $limit: count },
            ],
          },
        },
      ]);

      // let apptTypesProvider = await DoctorModel.findOne({ _id: model._id });
      // let appointmentTypes: any = [];
      // if (
      //   apptTypesProvider &&
      //   apptTypesProvider.assignedApptTypes &&
      //   apptTypesProvider.assignedApptTypes.length > 0
      // ) {
      //   apptTypesProvider.assignedApptTypes.forEach((e) => {
      //     appointmentTypes.push(e!.toString());
      //   });
      // }

      if (
        result &&
        result.length > 0 &&
        result[0].data &&
        result[0].data.length > 0
      ) {
        // result[0].data.forEach((e: { isAssigned: boolean; _id: any }) => {
        //   if (appointmentTypes.includes(e!._id.toString())) {
        //     e.isAssigned = true;
        //   }
        // });
        let obj = {
          data: result[0].data,
          // count: result.totalDocs,
          totalDocs: result[0].count[0].count,
          pageNumber: defaultPage,
          pageSize: count,
          totalPages: Math.ceil(result[0].count[0].count / count),
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
            message: errorMessage.APPOINTMENT_TYPE_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
  listLocation = async (
    req: Request,
    model: GetAppointmentTypeListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;
      defaultPage = model.pageNumber ? model.pageNumber : 1;
      count = model.pageSize ? model.pageSize : 50;
      let locationProvider = await DoctorModel.findOne(
        { _id: model._id },
        { location: 1 }
      );
      let location: any = [];
      if (locationProvider) location = locationProvider.location;
      let result = await ClinicLocationModel.aggregate([
        {
          $match: {
            isActive: true,
            isDeleted: false,
            clinic_id: new mongoose.Types.ObjectId(model.clinic_id!.toString()),
          },
        },

        {
          $facet: {
            count: [{ $count: "count" }],
            data: [
              {
                $lookup: {
                  from: "states",
                  let: { state: "$state" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$state"],
                        },
                      },
                    },
                    { $project: { stateName: 1 } },
                  ],
                  as: "stateData",
                },
              },
              {
                $unwind: {
                  path: "$stateData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $lookup: {
                  from: "countries",
                  let: { country: "$country" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$country"],
                        },
                      },
                    },
                    { $project: { countryName: 1 } },
                  ],
                  as: "countryData",
                },
              },
              {
                $unwind: {
                  path: "$countryData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $project: {
                  _id: 1,
                  branchName: 1,
                  address: 1,
                  city: 1,
                  state: "$stateData.stateName",
                  country: "$countryData.countryName",
                  isAssigned: {
                    $cond: [{ $in: ["$_id", location] }, true, false],
                  },
                },
              },
              {
                $sort: { createdAt: -1 },
              },
              { $skip: count * (defaultPage - 1) },
              { $limit: count },
            ],
          },
        },
      ]);

      // let locations: any = [];
      // if (
      //   locationProvider &&
      //   locationProvider.location &&
      //   locationProvider.location.length > 0
      // ) {
      //   locationProvider.location.forEach((e) => {
      //     locations.push(e!.toString());
      //   });
      // }

      if (
        result &&
        result.length > 0 &&
        result[0].data &&
        result[0].data.length > 0
      ) {
        // result[0].data.forEach((e: { isAssigned: boolean; _id: any }) => {
        //   if (locations.includes(e!._id.toString())) {
        //     e.isAssigned = true;
        //   }
        // });
        let obj = {
          data: result[0].data,
          // count: result.totalDocs,
          totalDocs: result[0].count[0].count,
          pageNumber: defaultPage,
          pageSize: count,
          totalPages: Math.ceil(result[0].count[0].count / count),
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
            message: errorMessage.CLINIC_LOCATIONS_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
  filterListLocations = async (
    req: Request,
    model: GetFilterListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let result = await DoctorModel.aggregate([
        {
          $match: {
            // isActive: true,
            // isDeleted: false,
            _id: new mongoose.Types.ObjectId(model.doctor_id!.toString()),
          },
        },
        {
          $unwind: "$location",
        },
        {
          $lookup: {
            from: "clinic_locations",
            let: { loc_id: "$location" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$loc_id"],
                  },
                },
              },
              {
                $project: {
                  branchName: 1,
                  address: 1,
                  city: 1,
                },
              },
            ],
            as: "locData",
          },
        },
        {
          $unwind: "$locData",
        },
        {
          $project: {
            _id: "$locData._id",
            branchName: "$locData.branchName",
            address: "$locData.address",
            city: "$locData.city",
          },
        },

        // {
        //   $facet: {
        //     count: [{ $count: "count" }],
        //     data: [
        //       {
        //         $lookup: {
        //           from: "states",
        //           let: { state: "$state" },
        //           pipeline: [
        //             {
        //               $match: {
        //                 $expr: {
        //                   $eq: ["$_id", "$$state"],
        //                 },
        //               },
        //             },
        //             { $project: { stateName: 1 } },
        //           ],
        //           as: "stateData",
        //         },
        //       },
        //       {
        //         $unwind: {
        //           path: "$stateData",
        //           preserveNullAndEmptyArrays: true,
        //         },
        //       },
        //       {
        //         $lookup: {
        //           from: "countries",
        //           let: { country: "$country" },
        //           pipeline: [
        //             {
        //               $match: {
        //                 $expr: {
        //                   $eq: ["$_id", "$$country"],
        //                 },
        //               },
        //             },
        //             { $project: { countryName: 1 } },
        //           ],
        //           as: "countryData",
        //         },
        //       },
        //       {
        //         $unwind: {
        //           path: "$countryData",
        //           preserveNullAndEmptyArrays: true,
        //         },
        //       },
        //       {
        //         $project: {
        //           _id: 1,
        //           branchName: 1,
        //           address: 1,
        //           city: 1,
        //           state: "$stateData.stateName",
        //           country: "$countryData.countryName",
        //         },
        //       },
        //       {
        //         $sort: { createdAt: -1 },
        //       },
        //     ],
        //   },
        // },
      ]);

      if (result && result.length > 0) {
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
            message: errorMessage.CLINIC_LOCATIONS_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
  filterListApptType = async (
    req: Request,
    model: GetFilterListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let result = await DoctorModel.aggregate([
        {
          $match: {
            //isActive: true,
            //isDeleted: false,
            _id: new mongoose.Types.ObjectId(model.doctor_id!.toString()),
          },
        },
        {
          $unwind: "$assignedApptTypes",
        },
        {
          $lookup: {
            from: "appointment_type",
            let: {
              apt_id: "$assignedApptTypes",
              clinic_id: "$clinic_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    // $eq: ["$_id", "$$apt_id"],
                    $and: [
                      {
                        $eq: ["$clinic_id", "$$clinic_id"],
                      },
                      { $eq: ["$_id", "$$apt_id"] },
                      { $eq: ["$isActive", true] },
                      { $eq: ["$isDeleted", false] },
                    ],
                  },
                },
              },
              {
                $project: {
                  type: 1,
                  color: 1,
                  duration: 1,
                  isMultiPatient: 1,
                  number_of_patients: 1,
                },
              },
            ],
            as: "aptData",
          },
        },
        {
          $unwind: "$aptData",
        },
        {
          $project: {
            _id: "$aptData._id",
            type: "$aptData.type",
            color: "$aptData.color",
            duration: "$aptData.duration",
            isMultiPatient: "$aptData.isMultiPatient",
            number_of_patients: "$aptData.number_of_patients",
          },
        },

        // {
        //   $facet: {
        //     count: [{ $count: "count" }],
        //     data: [
        //       {
        //         $lookup: {
        //           from: "states",
        //           let: { state: "$state" },
        //           pipeline: [
        //             {
        //               $match: {
        //                 $expr: {
        //                   $eq: ["$_id", "$$state"],
        //                 },
        //               },
        //             },
        //             { $project: { stateName: 1 } },
        //           ],
        //           as: "stateData",
        //         },
        //       },
        //       {
        //         $unwind: {
        //           path: "$stateData",
        //           preserveNullAndEmptyArrays: true,
        //         },
        //       },
        //       {
        //         $lookup: {
        //           from: "countries",
        //           let: { country: "$country" },
        //           pipeline: [
        //             {
        //               $match: {
        //                 $expr: {
        //                   $eq: ["$_id", "$$country"],
        //                 },
        //               },
        //             },
        //             { $project: { countryName: 1 } },
        //           ],
        //           as: "countryData",
        //         },
        //       },
        //       {
        //         $unwind: {
        //           path: "$countryData",
        //           preserveNullAndEmptyArrays: true,
        //         },
        //       },
        //       {
        //         $project: {
        //           _id: 1,
        //           branchName: 1,
        //           address: 1,
        //           city: 1,
        //           state: "$stateData.stateName",
        //           country: "$countryData.countryName",
        //         },
        //       },
        //       {
        //         $sort: { createdAt: -1 },
        //       },
        //     ],
        //   },
        // },
      ]);

      if (result && result.length > 0) {
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
            message: errorMessage.NO_RECORD_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
  //filterListLocations
  getAssignedApptType = async (
    req: Request,
    model: GetAppointmentTypeListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      const finalObjectToBeSend = await DoctorModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(model._id!.toString()),
          },
        },

        {
          $lookup: {
            from: "appointment_type",
            localField: "assignedApptTypes",
            foreignField: "_id",
            as: "assignedApptTypes",
          },
        },

        { $project: { assignedApptTypes: 1 } },
      ]);

      if (model.selectedDaysofWeekArr) {
        model.selectedDaysofWeekArr.forEach((el: any) =>
          el.isChecked == true
            ? (el.isSelectedForSlots = true)
            : (el.isSelectedForSlots = false)
        );
      }
      if (model.selectedDaysofWeekArr)
        finalObjectToBeSend[0].assignedApptTypes.forEach(
          (apptType: any) =>
            (apptType.selectedDaysofWeekArr = model.selectedDaysofWeekArr)
        );

      if (finalObjectToBeSend && finalObjectToBeSend.length > 0) {
        return {
          status_code: HttpStatus.OK,
          data: finalObjectToBeSend[0],
          success: true,
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.APPOINTMENT_TYPE_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
  findRoleId = async (roleName: string) => {
    try {
      let roleIdData = await Roles.findOne(
        {
          roleName: roleName,
          isActive: true,
          isDeleted: false,
        },
        { _id: 1, permission: 1 }
      );
      //if (roleIdData && "_id" in roleIdData) return roleIdData._id;
      if (roleIdData) return roleIdData;
      else return null;
    } catch (error) {
      return null;
    }
  };

  // Download provider  data

  getProviderDataToExcel = async (
    req: Request,
    model: GetProviderListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let roleId = await this.findRoleId(EnumRole.PROVIDER);

      if (!roleId)
        return {
          success: false,
          data: {
            message: errorMessage.ROLE_NOT_FOUND,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };

      const workbook = await XlsxPopulate.fromBlankAsync();
      let providerSheet: any = workbook.sheet("Sheet1");
      let providerSheetHeader = ["Name", "Email", "Status"];

      providerSheetHeader.forEach((el, i) => {
        providerSheet
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

      let condition: any = {};
      let child_condition: any = {};
      child_condition.role = new mongoose.Types.ObjectId(roleId._id);
      condition.clinic_id = new mongoose.Types.ObjectId(
        model.clinic_id?.toString()
      );

      if (model.isDeleted == true || model.isDeleted == false) {
        child_condition.isDeleted = model.isDeleted;
      }

      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.search);
        child_condition.$or = [
          {
            first_name: {
              $regex: model.search,
              $options: "i",
            },
          },
          {
            last_name: {
              $regex: model.search,
              $options: "i",
            },
          },
          {
            email: {
              $regex: model.search,
              $options: "i",
            },
          },
          {
            mobile_no: {
              $regex: model.search,
              $options: "i",
            },
          },
        ];
      }

      if (model.isActive) {
        child_condition.isActive = model.isActive;
      }

      let result = await DoctorModel.aggregate([
        { $match: condition },
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            pipeline: [{ $match: child_condition }],
            as: "userData",
          },
        },
        {
          $unwind: {
            path: "$userData",
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $facet: {
            count: [{ $count: "count" }],
            data: [
              {
                $project: {
                  _id: 1,
                  first_name: "$userData.first_name",
                  last_name: "$userData.last_name",
                  email: "$userData.email",
                  isActive: "$userData.isActive",
                },
              },
              {
                $sort: { createdAt: -1 },
              },
            ],
          },
        },
      ]);

      if (
        result &&
        result.length > 0 &&
        result[0].data &&
        result[0].data.length > 0
      ) {
        //Added by Ankit 07-04-2023
        // sort list with doctor name alphabetically
        const sortedList = result[0].data.sort((a: any, b: any) =>
          a.first_name.localeCompare(b.first_name)
        );

        let Providerdata = sortedList;

        let sheetStyle = {
          border: true,
          fontFamily: "Calibri",
        };

        Providerdata.forEach((el: any, i: number) => {
          providerSheet
            .cell("A" + (i + 2))
            .value(el.first_name + " " + el.last_name)
            .style(sheetStyle);
          providerSheet;

          providerSheet
            .cell("B" + (i + 2))
            .value(el.email ? el.email : "")
            .style(sheetStyle);

          providerSheet
            .cell("C" + (i + 2))
            .value(el.isActive == true ? "Unarchived" : "Archived")
            .style(sheetStyle);
        });

        providerSheet.freezePanes(1, 1);

        const data: any = await workbook.outputAsync();
        await fs.writeFileSync(
          path.join(
            __dirname,
            "../../../../../public/upload/providers/Provider_Report.xlsx"
          ),
          data
        );
        let link = `http://${req.hostname}:${process.env.PORT}/upload/providers/Provider_Report.xlsx`;

        let excelFileName = "Provider_Report.xlsx";
        let response = {
          link,
          name: excelFileName,
        };
        return {
          status_code: HttpStatus.OK,
          data: response, //link, //errorMessage.ExecutedSuccessfully,
          success: true,
        };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.PROVIDER_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  fetchProviders = async (
    req: Request,
    model: FetchProviderViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let providerRoleData = await RolesModel.findOne(
        {
          roleName: "provider",
        },
        { _id: 1, permission: 1 }
      );
      if (!providerRoleData)
        return {
          success: false,
          data: {
            message: errorMessage.ROLE_NOT_FOUND,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };

      let last_fetch = await FetchDataModel.find(
        { clinic_id: model.clinic_id, type: "PROVIDER" },
        { fetch_time: 1 }
      )
        .sort({ createdAt: -1 })
        .limit(1);
      let last_fetch_time = new Date(
        moment(Date.now() - 7 * 24 * 3600 * 1000).format("YYYY-MM-DD")
      ); //default is a week before current time
      if (last_fetch && last_fetch.length) {
        last_fetch_time = last_fetch[0]!.fetch_time;
      }

      let fetch_time = new Date();
      let make_fetch_req_entry = await FetchDataModel.create({
        type: "PROVIDER",
        last_fetch_time: last_fetch_time,
        fetch_time: fetch_time,
        clinic_id: model.clinic_id,
        createdby_id: userDetails._id,
      });

      if (make_fetch_req_entry) {
        let FETCH_PROVIDER_URL =
          "http://192.168.1.140:1336/api/rcm/doctor/exportData";
        let data_fetched: {
          data: {
            code: number;
            message: string;
            data: { createdArr: any[]; updatedArr: any[] };
          };
        } = await axios.post(FETCH_PROVIDER_URL, {
          currentDateTime: fetch_time,
          lastFetchTime: last_fetch_time,
        });
        //console.log("____________________________________________-");
        if (
          data_fetched &&
          data_fetched.data &&
          data_fetched.data.data &&
          (data_fetched.data.data.updatedArr.length ||
            data_fetched.data.data.createdArr.length)
        ) {
          let data: any = [];
          let user_data: any = [];
          data_fetched.data.data.createdArr.forEach(function (singleRecord) {
            data.push({
              clinic_id: model!.clinic_id, //local mongo db id
              _id: singleRecord._id,
              user_id: singleRecord.user_id,

              npiNo: singleRecord.npiNo,
              deaNo: singleRecord.deaNo,
              title: singleRecord.title,
              license: singleRecord.license,
              //relation: singleRecord.relation ? singleRecord.relation : null,
              emergency_contact_number: singleRecord.emergency_contact_number
                ? singleRecord.emergency_contact_number
                : null,
              emergency_contact_name: singleRecord.emergency_contact_name
                ? singleRecord.emergency_contact_name
                : null,
              experience: singleRecord.experience,
              dob: singleRecord.dob,
              address: singleRecord.address,
              postal_code: singleRecord.postal_code,
              createdAt: singleRecord.createdAt,
              updatedAt: singleRecord.updatedAt,
              city: singleRecord.city,
            });
            user_data.push({
              _id: singleRecord.user_id,
              first_name: singleRecord.first_name,
              last_name: singleRecord.last_name,
              email: singleRecord.email,
              mobile_no: singleRecord.mobile_no,
              role: providerRoleData!._id, //
              role_permission: providerRoleData!.permission,
            });
          });

          data_fetched.data.data.updatedArr.forEach(function (singleRecord) {
            data.push({
              clinic_id: model!.clinic_id, //local mongo db id
              role: providerRoleData!._id,
              role_permission: providerRoleData!.permission,
              _id: singleRecord._id,
              user_id: singleRecord.user_id,

              npiNo: singleRecord.npiNo,
              deaNo: singleRecord.deaNo,
              title: singleRecord.title,
              license: singleRecord.license,
              //relation: singleRecord.relation ? singleRecord.relation : null,
              emergency_contact_number: singleRecord.emergency_contact_number
                ? singleRecord.emergency_contact_number
                : null,
              emergency_contact_name: singleRecord.emergency_contact_name
                ? singleRecord.emergency_contact_name
                : null,
              experience: singleRecord.experience,
              dob: singleRecord.dob,
              address: singleRecord.address,
              postal_code: singleRecord.postal_code,
              createdAt: singleRecord.createdAt,
              updatedAt: singleRecord.updatedAt,
              city: singleRecord.city,
            });
            user_data.push({
              _id: singleRecord.user_id,
              first_name: singleRecord.first_name,
              last_name: singleRecord.last_name,
              email: singleRecord.email,
              mobile_no: singleRecord.mobile_no,
              role: providerRoleData!._id, //
              role_permission: providerRoleData!.permission,
            });
          });

          let existingRecords = await DoctorModel.find(
            {
              $or: data.map((singleDoctor) => ({
                _id: singleDoctor._id,
              })),
            },
            { _id: 1, clinic_id: 1 }
          );

          let conflicted_ids: any = [];
          if (existingRecords && existingRecords.length) {
            existingRecords.forEach((e) => {
              let foundIndex = data.findIndex(
                (a) =>
                  a._id.toString() == e._id.toString() &&
                  a.clinic_id.toString() != e!.clinic_id!.toString()
              );

              if (foundIndex > -1) {
                conflicted_ids.push(data[foundIndex]._id);
                data.splice(foundIndex, 1);
              }
            });
          }

          if (conflicted_ids.length) {
            await FetchDataModel.updateOne(
              { _id: make_fetch_req_entry._id },
              { conflicted_ids: conflicted_ids }
            );
          }

          if (data.length > 0) {
            let bulkDoctor: any[] = [];
            data.forEach(function (singleRecord: any) {
              bulkDoctor.push({
                updateOne: {
                  filter: { _id: singleRecord._id },
                  update: {
                    $set: singleRecord,
                  },
                  upsert: true,
                },
              });
            });
            let bulkUser: any[] = [];
            if (user_data.length > 0) {
              user_data.forEach(function (singleRecord: any) {
                bulkUser.push({
                  updateOne: {
                    filter: { _id: singleRecord._id },
                    update: {
                      $set: singleRecord,
                    },
                    upsert: true,
                  },
                });
              });
            }

            let doctorSaved = await DoctorModel.bulkWrite(bulkDoctor);
            let userSaved = await UserModel.bulkWrite(bulkUser);

            if (doctorSaved && userSaved) {
              return {
                status_code: HttpStatus.OK,
                data: conflicted_ids.length
                  ? errorMessage.DATA_FETCHED_SUCCESS_WITH_CONFLICTS
                  : errorMessage.DATA_FETCHED_SUCCESS,
                success: true,
              };
            } else {
              return {
                status_code: HttpStatus.BAD_REQUEST,
                success: false,
                data: {
                  message: errorMessage.NO_DATA_TO_FETCH,
                  error: errorMessage.ON_FETCH_ERROR,
                },
              };
            }
          } else {
            return {
              status_code: HttpStatus.BAD_REQUEST,
              success: false,
              data: {
                message: conflicted_ids.length
                  ? errorMessage.NO_DATA_TO_FETCH_BUT_CONFLICT_PRESENT
                  : errorMessage.NO_DATA_TO_FETCH,
                error: errorMessage.ON_FETCH_ERROR,
              },
            };
          }
        } else {
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.NO_DATA_TO_FETCH,
              error: errorMessage.ON_FETCH_ERROR,
            },
          };
        }
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.FAILED_TO_FETCH_DATA,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new ProviderServices();
