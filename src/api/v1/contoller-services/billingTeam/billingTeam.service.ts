import { DocumentType } from "@typegoose/typegoose";
import { NextFunction, Request } from "express";
import fs from "fs";
import HttpStatus from "http-status-codes";
import _ from "lodash";
import mongoose from "mongoose";
import path from "path";
import XlsxPopulate from "xlsx-populate";
import { IServiceResult1 } from "../../common/common-methods";
import errorMessage from "../../common/erros_message";
import BillingTeamModel from "../../models/billing_team.model";
import BillingTeamAssociatedClinicsModel, {
  BillingTeamAssociatedClinics,
} from "../../models/billing_team_associated_clinics.model";
import BillingTeamMemberModel from "../../models/billing_team_member.model";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";
import UserModel, { User } from "../../models/user.model";
import {
  AddBillingTeamViewmodel,
  AssignClinicToTeamViewmodel,
  AssignMemberToTeamViewmodel,
  AssignMemberViewmodel,
  GetBillingTeamClinicsListViewmodel,
  GetBillingTeamListViewmodel,
  GetBillingTeamMembersListViewmodel,
  UnAssignClinicToTeamViewmodel,
  UpdateBillingTeamViewmodel,
  UpdateMemberAssociationToTeamViewmodel,
} from "../../view-models/billingTeam";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
export enum EnumRole {
  PROVIDER = "provider",
}
class BillingTeamServices {
  addBillingTeam = async (
    req: Request,
    model: AddBillingTeamViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      model.createdby_id = userDetails._id;
      // model.claim_creator = _.uniq(model.claim_creator);
      // model.auditor = _.uniq(model.auditor);
      // model.payment_dept = _.uniq(model.payment_dept);
      // model.statement_handler = _.uniq(model.statement_handler);
      // model.follow_up = _.uniq(model.follow_up);

      let alreadyPresentBillingTeam = await BillingTeamModel.findOne({
        name: model.name,
        isDeleted: false,
      });
      if (alreadyPresentBillingTeam) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_BILLING_TEAM,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        let saveBillingTeamResult = await BillingTeamModel.create(model);

        if (saveBillingTeamResult) {
          let associated_clinis: any = [];
          if (model.clinics && model.clinics.length) {
            model.clinics.forEach((e) => {
              associated_clinis.push({
                team_id: saveBillingTeamResult._id,
                clinic: e,
                createdby_id: model.createdby_id,
              });
            });
          }
          if (associated_clinis.length) {
            await BillingTeamAssociatedClinicsModel.insertMany(
              associated_clinis
            );
          }
        }
        let findBillingTeamResult = await BillingTeamModel.findOne(
          {
            _id: saveBillingTeamResult._id,
          },
          { updatedAt: 0, createdAt: 0, __v: 0 }
        );

        // .populate([
        //   {
        //     path: "clinics",

        //     select: { _id: 1, clinic_name: 1 },
        //   },
        // ]);

        if (findBillingTeamResult) {
          let findAssociatedClinics =
            await BillingTeamAssociatedClinicsModel.find(
              {
                team_id: saveBillingTeamResult._id,
              },
              { updatedAt: 0, createdAt: 0, __v: 0 }
            ).populate({
              path: "clinic",
              select: { clinic_name: 1, clinic_type: 1 },
            });
          let addHistory = await HistoryModel.create({
            user_id: model.createdby_id,
            description: `Billing team added`,
            type: EHistoryActivityTypeValues.BillingTeam,
            type_id: model.createdby_id,
            data: {
              team_id: findBillingTeamResult._id,
              name: findBillingTeamResult.name,
              //clinics: findBillingTeamResult.clinics,
            },
          });
          let clinicData: any = [];
          if (findAssociatedClinics) {
            findAssociatedClinics.forEach((e) => {
              clinicData.push(e.clinic);
            });
          }
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: {
              _id: findBillingTeamResult._id,
              name: findBillingTeamResult.name,
              clinics: clinicData,
            },
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_ADD_BILLING_TEAM,
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
  updateBillingTeam = async (
    req: Request,
    model: UpdateBillingTeamViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      model.clinics = _.uniq(model.clinics);
      let alreadyPresentBillingTeam = await BillingTeamModel.findOne({
        name: model.name,
        isDeleted: false,
        _id: { $ne: model._id },
      });
      if (alreadyPresentBillingTeam) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_BILLING_TEAM,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        let updateBillingTeamResult = await BillingTeamModel.updateOne(
          { _id: model._id },
          model
        );

        let find_associated_clinics =
          await BillingTeamAssociatedClinicsModel.find(
            { team_id: model._id },
            { clinic: 1, _id: 0, isDeleted: 1 }
          );

        //All assigned clinic ids come in model.clinics, we are checking if they already exist in db, then do not do any operation(splice the model.clinics)
        //If the saved clinic id is not present in model.clinics then temporarily put in clinics_to_update_remove and change isDeleted to true
        //The isDeleted records present in db if are present in model.clinics , then update their isDeleted to false rather than creating new record(clinics_to_update_add)
        let clinics_to_update_add: any = [];
        let clinics_to_update_remove: any = [];
        if (find_associated_clinics) {
          find_associated_clinics.forEach((e) => {
            if (e.clinic) {
              if (model.clinics.includes(e.clinic?.toString())) {
                var index = model.clinics.indexOf(e.clinic?.toString());
                if (index !== -1) {
                  //found

                  if (e.isDeleted)
                    clinics_to_update_add.push(e.clinic?.toString());
                  model.clinics.splice(index, 1);
                }
              } else {
                clinics_to_update_remove.push(e.clinic?.toString());
              }
            }
          });
        }

        let associated_clinics: any = [];
        if (model.clinics && model.clinics.length) {
          model.clinics.forEach((e) => {
            associated_clinics.push({
              team_id: model._id,
              clinic: e,
              createdby_id: userDetails._id,
            });
          });
        }
        if (associated_clinics.length) {
          await BillingTeamAssociatedClinicsModel.insertMany(
            associated_clinics
          );
        }
        //MAKING CLINIC ISDELETED TRUE WHICH ARE NOT PRESENT IN LIST

        if (clinics_to_update_remove.length) {
          await BillingTeamAssociatedClinicsModel.updateMany(
            {
              team_id: model._id,
              clinic: { $in: clinics_to_update_remove },
            },
            { $set: { isDeleted: true } }
          );
        }

        if (clinics_to_update_add.length) {
          await BillingTeamAssociatedClinicsModel.updateMany(
            {
              team_id: model._id,
              clinic: { $in: clinics_to_update_add },
            },
            { $set: { isDeleted: false } }
          );
        }

        if (updateBillingTeamResult) {
          // if (model.clinics && model.clinics.length){

          // }
          let history_obj: any = {};
          if (model._id) history_obj.team_id = model._id;
          if (model.clinics) history_obj.clinics = model.clinics;
          if (model.isActive) history_obj.isActive = model.isActive;
          if (model.name) history_obj.name = model.name;

          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `Billing team updated`,
            type: EHistoryActivityTypeValues.BillingTeam,
            type_id: userDetails._id,
            data: history_obj,
          });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.UPDATE_SUCCESSFULL,
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_UPDATE_BILLING_TEAM,
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
  deleteBillingTeam = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let deleteBillingTeamResult = await BillingTeamModel.updateOne(
        { _id: req.params._id },
        { isDeleted: true }
      );
      if (
        deleteBillingTeamResult &&
        deleteBillingTeamResult.modifiedCount > 0
      ) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `Billing team deleted`,
          type: EHistoryActivityTypeValues.BillingTeam,
          type_id: userDetails._id,
          data: {
            team_id: model._id,
          },
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
            message: errorMessage.ERROR_ON_DELETE_BILLING_TEAM,
            error: errorMessage.ON_DELETE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };

  addMember = async (
    req: Request,
    model: AssignMemberViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let alreadyPresentEmail = await UserModel.findOne({
        email: model.email.toLowerCase(),
      });
      if (alreadyPresentEmail)
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_ASSOCIATED_EMAIL,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };

      let createUser = await UserModel.create({
        email: model.email,
        first_name: model.first_name,
        last_name: model.last_name,
        role: model.role_id,
      });

      let assignResult = await BillingTeamMemberModel.create({
        team_id: model.team_id,
        member_id: createUser._id,
        role_id: model.role_id,
      });
      if (assignResult) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `Team member assigned`,
          type: EHistoryActivityTypeValues.BillingTeam,
          type_id: userDetails._id,
          data: {
            team_id: model.team_id,
            email: model.email,
            first_name: model.first_name,
            last_name: model.last_name,
            role: model.role_id,
          },
        });
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.TEAM_MEMBER_ASSIGN_SUCCESSFULL,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_ASSIGNING_BILLING_TEAM,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  getBillingTeam = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let getBillingTeamResult = await BillingTeamModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(model._id),
            //isActive: true,
            //isDeleted: false,
          },
        },
        {
          $lookup: {
            from: "billing_team_associated_clinics",
            let: { team_id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$team_id", "$$team_id"],
                  },
                  isActive: true,
                  isDeleted: false,
                },
              },
              {
                $lookup: {
                  from: "clinic",
                  let: { clinic_id: "$clinic" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$clinic_id"],
                        },
                        isActive: true,
                        isDeleted: false,
                      },
                    },
                  ],
                  as: "clinicData",
                },
              },
              {
                $unwind: {
                  path: "$clinicData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $project: {
                  _id: 1,
                  clinic: "$clinicData.clinic_name",
                },
              },
            ],
            as: "associatedClinicData",
          },
        },
        // {
        //   $unwind: {
        //     path: "$associatedClinicData",
        //     preserveNullAndEmptyArrays: true,
        //   },
        // },
        {
          $lookup: {
            from: "billing_team_member",
            let: { team_id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$team_id", "$$team_id"],
                  },
                  isActive: true,
                  isDeleted: false,
                },
              },
              {
                $lookup: {
                  from: "users",
                  let: { member_id: "$member_id" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$member_id"],
                        },
                        isActive: true,
                        isDeleted: false,
                      },
                    },
                    {
                      $lookup: {
                        from: "roles",
                        let: { role_id: "$role" },
                        pipeline: [
                          {
                            $match: {
                              $expr: {
                                $eq: ["$_id", "$$role_id"],
                              },
                              // isActive: true,
                              // isDeleted: false,
                            },
                          },
                        ],
                        as: "roleData",
                      },
                    },
                    {
                      $unwind: {
                        path: "$roleData",
                        preserveNullAndEmptyArrays: true,
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
                $project: {
                  _id: 1,
                  first_name: "$userData.first_name",
                  last_name: "$userData.last_name",
                  email: "$userData.email",
                  mobile_no: "$userData.mobile_no",
                  role: "$userData.roleData.roleTitle",
                },
              },
            ],
            as: "memberData",
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            clinics: "$associatedClinicData",
            members: "$memberData",
          },
        },
      ]);
      // let getBillingTeamResult = await BillingTeamModel.findOne(
      //   {
      //     _id: model._id,
      //     isActive: true,
      //     isDeleted: false,
      //   },
      //   { updatedAt: 0, createdAt: 0, __v: 0, createdby_id: 0 }
      // );

      // let findAssociatedClinics = await BillingTeamAssociatedClinicsModel.find(
      //   {
      //     team_id: model._id,
      //     isActive: true,
      //     isDeleted: false,
      //   },
      //   { updatedAt: 0, createdAt: 0, __v: 0, createdby_id: 0 }
      // ).populate({ path: "clinic", select: "clinic_name clinic_type" });

      if (getBillingTeamResult) {
        // let clinicData: any = [];
        // if (findAssociatedClinics) {
        //   findAssociatedClinics.forEach((e) => {
        //     clinicData.push(e.clinic);
        //   });
        // }
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: getBillingTeamResult[0],
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_GET_BILLING_TEAM,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };

  listBillingTeam = async (
    req: Request,
    model: GetBillingTeamListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;
      defaultPage = model.pageNumber ? model.pageNumber : 1;
      count = model.pageSize ? model.pageSize : 50;
      let populateFeilds: any = [];

      let condition: any = {};
      let child_condition: any = {};
      //child_condition.role = new mongoose.Types.ObjectId(model.role_id);

      // if ("isDeleted" in model && model.isDeleted)
      //   child_condition.isDeleted = model.isDeleted;

      // if (model.isDeleted == true || model.isDeleted == false) {
      //   condition.isDeleted = model.isDeleted;
      // }
      condition.isDeleted = false;
      condition.isActive = true;

      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.search);
        condition.$or = [
          {
            name: {
              $regex: model.search,
              $options: "i",
            },
          },
        ];
      }

      // if (model.isActive) {
      //   child_condition.isActive = model.isActive;
      // }

      let result = await BillingTeamModel.aggregate([
        { $match: condition },
        {
          $lookup: {
            from: "billing_team_member",
            let: { team_id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$team_id", "$$team_id"],
                  },
                  isActive: true,
                  isDeleted: false,
                },
              },
            ],
            as: "memberData",
          },
        },

        {
          $lookup: {
            from: "billing_team_associated_clinics",
            let: { team_id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$team_id", "$$team_id"],
                  },
                  isActive: true,
                  isDeleted: false,
                },
              },
              {
                $lookup: {
                  from: "clinic",
                  let: { clinic_id: "$clinic" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$clinic_id"],
                        },
                        // isActive: true,
                        // isDeleted: false,
                      },
                    },
                    {
                      $project: {
                        _id: 1,
                        clinic_name: 1,
                      },
                    },
                  ],
                  as: "clinicData",
                },
              },
              {
                $unwind: {
                  path: "$clinicData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $project: {
                  clinic_id: "$clinic",
                  clinic_name: "$clinicData.clinic_name",
                },
              },
            ],
            as: "assocatedClinicData",
          },
        },
        // {
        //   $unwind: {
        //     path: "$memberData",
        //     preserveNullAndEmptyArrays: true,
        //   },
        // },
        {
          $facet: {
            count: [{ $count: "count" }],
            data: [
              {
                $project: {
                  _id: 1,
                  name: 1,
                  clinics: "$assocatedClinicData",

                  total_clinics: {
                    $cond: {
                      if: {
                        $isArray: "$assocatedClinicData",
                      },
                      then: {
                        $size: "$assocatedClinicData",
                      },
                      else: 0,
                    },
                  },
                  total_members: {
                    $cond: {
                      if: { $isArray: "$memberData" },
                      then: { $size: "$memberData" },
                      else: 0,
                    },
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

      if (
        result &&
        result.length > 0 &&
        result[0].data &&
        result[0].data.length > 0
      ) {
        let finalResponse: any = [];

        result[0].data.forEach((obj: any) => {
          let clinicIdsArr: any = [];
          obj.clinics.forEach((x) => {
            clinicIdsArr.push(x.clinic_id);
          });

          obj.clinicIds = clinicIdsArr;

          finalResponse.push(obj);
        });

        let obj = {
          data: finalResponse,
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
            message: errorMessage.BILLING_TEAM_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
  listBillingTeamMembers = async (
    req: Request,
    model: GetBillingTeamMembersListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;
      defaultPage = model.pageNumber ? model.pageNumber : 1;
      count = model.pageSize ? model.pageSize : 50;
      let populateFeilds: any = [];

      let condition: any = { isDeleted: false };
      let child_condition: any = {};
      child_condition.$expr = {
        $eq: ["$_id", "$$user_id"],
      };
      if (model.role_id)
        child_condition.role = new mongoose.Types.ObjectId(model.role_id);

      // if ("isDeleted" in model && model.isDeleted)
      //   child_condition.isDeleted = model.isDeleted;

      // if (model.isDeleted == true || model.isDeleted == false) {
      //   condition.isDeleted = model.isDeleted;
      // }
      condition.team_id = new mongoose.Types.ObjectId(model.team_id);
      condition.isDeleted = false;
      condition.isActive = true;

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
        ];
      }
      child_condition.isActive = true;
      child_condition.isDeleted = false;

      // if (model.isActive) {
      //   child_condition.isActive = model.isActive;
      // }
      //console.log(condition);
      let result = await BillingTeamMemberModel.aggregate([
        { $match: condition },
        {
          $lookup: {
            from: "users",
            let: { user_id: "$member_id" },
            pipeline: [
              {
                $match: child_condition,
              },
              {
                $lookup: {
                  from: "roles",
                  let: { role_id: "$role" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$role_id"],
                        },
                      },
                    },
                    {
                      $project: {
                        roleTitle: 1,
                      },
                    },
                  ],
                  as: "roleData",
                },
              },
              {
                $unwind: {
                  path: "$roleData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $project: {
                  first_name: 1,
                  last_name: 1,
                  email: 1,
                  role: 1,
                  roleData: 1,
                },
              },
            ],
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
                  member_id: 1,
                  first_name: "$userData.first_name",
                  last_name: "$userData.last_name",
                  email: "$userData.email",
                  role: "$userData.roleData.roleTitle",
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
      // console.log(JSON.stringify(result));
      if (
        result &&
        result.length > 0 &&
        result[0].data &&
        result[0].data.length > 0
      ) {
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
            message: errorMessage.BILLING_TEAM_MEMBER_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  listBillingTeamClinics = async (
    req: Request,
    model: GetBillingTeamClinicsListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;
      defaultPage = model.pageNumber ? model.pageNumber : 1;
      count = model.pageSize ? model.pageSize : 50;

      let condition: any = {};
      let child_condition: any = {};
      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.search);
        child_condition.$or = [
          {
            clinic_name: {
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
        ];
      }
      // let child_condition: any = {};
      // child_condition.$expr = {
      //   $eq: ["$_id", "$$user_id"],
      // };

      // if ("isDeleted" in model && model.isDeleted)
      //   child_condition.isDeleted = model.isDeleted;

      // if (model.isDeleted == true || model.isDeleted == false) {
      //   condition.isDeleted = model.isDeleted;
      // }
      condition.team_id = new mongoose.Types.ObjectId(model.team_id);
      condition.isDeleted = false;
      condition.isActive = true;

      // if (model.isActive) {
      //   child_condition.isActive = model.isActive;
      // }

      let result = await BillingTeamAssociatedClinicsModel.aggregate([
        { $match: condition },
        {
          $lookup: {
            from: "clinic",
            let: { clinic_id: "$clinic" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$clinic_id"] },
                },
              },
              {
                $lookup: {
                  from: "users",
                  let: { u_id: "$user_id" },
                  pipeline: [
                    {
                      $match: {
                        $expr: { $eq: ["$_id", "$$u_id"] },
                      },
                    },
                    {
                      $project: {
                        email: 1,
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
                $project: {
                  clinic_name: 1,
                  email: "$userData.email",
                },
              },
            ],
            as: "clinicData",
          },
        },
        {
          $unwind: {
            path: "$clinicData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $facet: {
            count: [{ $count: "count" }],
            data: [
              {
                $project: {
                  _id: 1,
                  clinic_name: "$clinicData.clinic_name",
                  clinic_id: "$clinicData._id",
                  email: "$clinicData.email",
                },
              },
              { $match: child_condition },
              {
                $sort: { createdAt: -1 },
              },
              { $skip: count * (defaultPage - 1) },
              { $limit: count },
            ],
          },
        },
      ]);
      // console.log(JSON.stringify(result));
      if (
        result &&
        result.length > 0 &&
        result[0].data &&
        result[0].data.length > 0
      ) {
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
            message: errorMessage.BILLING_TEAM_CLINICS_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
  assignMemberToTeam = async (
    req: Request,
    model: AssignMemberToTeamViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let alreadyPresentBillingTeamMember =
        await BillingTeamMemberModel.findOne({
          team_id: model.team_id,
          member_id: model.member_id,
          //isDeleted: false,
        });

      if (
        alreadyPresentBillingTeamMember &&
        !alreadyPresentBillingTeamMember.isDeleted
      ) {
        return {
          success: false,
          data: {
            message: errorMessage.ALREADY_EXIST_ASSIGNED_TEAM_MEMBER,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else if (
        alreadyPresentBillingTeamMember &&
        alreadyPresentBillingTeamMember.isDeleted
      ) {
        let updateExistingTeamMember = await BillingTeamMemberModel.updateOne(
          {
            team_id: model.team_id,
            member_id: model.member_id,
            //isDeleted: false,
          },
          {
            $set: { isDeleted: false },
          }
        );
        if (
          updateExistingTeamMember &&
          updateExistingTeamMember.modifiedCount > 0
        ) {
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `Team member assigned`,
            type: EHistoryActivityTypeValues.BillingTeam,
            type_id: userDetails._id,
            data: {
              team_id: model.team_id,
              // email: model.email,
              // first_name: model.first_name,
              // last_name: model.last_name,
              // role: model.role_id,
              member_id: model.member_id,
            },
          });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.ASSIGNED_TEAM_MEMBER_SUCCESS,
          };
        }
      } else {
        let user = await UserModel.aggregate([
          {
            $match: {
              _id: new mongoose.Types.ObjectId(model.member_id),
            },
          },
          {
            $lookup: {
              from: "roles",
              let: { role_id: "$role" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ["$_id", "$$role_id"],
                    },
                  },
                },
                { $project: { _id: 1 } },
              ],
              as: "roleData",
            },
          },
          {
            $unwind: {
              path: "$roleData",
              preserveNullAndEmptyArrays: true,
            },
          },
          { $project: { roleData: 1 } },
        ]);

        if (user && user.length && user[0].roleData) {
          let assignMember = await BillingTeamMemberModel.create({
            team_id: model.team_id,
            member_id: model.member_id,
            role_id: user[0]!.roleData!._id,
          });
          if (assignMember)
            return {
              status_code: HttpStatus.OK,
              success: true,
              data: errorMessage.ASSIGNED_TEAM_MEMBER_SUCCESS,
            };
          else
            return {
              success: false,
              data: {
                message: errorMessage.ASSIGNED_TEAM_MEMBER_FAILED,
                error: errorMessage.ON_ADD_ERROR,
              },
              status_code: HttpStatus.BAD_REQUEST,
            };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ASSIGNED_TEAM_MEMBER_FAILED,
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
  removeMember = async (
    req: Request,
    model: AssignMemberToTeamViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let removeMember = await BillingTeamMemberModel.updateOne(
        {
          team_id: new mongoose.Types.ObjectId(model.team_id),
          member_id: new mongoose.Types.ObjectId(model.member_id),
        },
        { $set: { isDeleted: true } }
      );

      if (removeMember && removeMember.modifiedCount > 0) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `Team member removed`,
          type: EHistoryActivityTypeValues.BillingTeam,
          type_id: userDetails._id,
          data: {
            team_id: model.team_id,
            // email: model.email,
            // first_name: model.first_name,
            // last_name: model.last_name,
            // role: model.role_id,
            member_id: model.member_id,
          },
        });
        return {
          status_code: HttpStatus.OK,
          data: errorMessage.ASSIGNED_TEAM_MEMBER_REMOVE_SUCCESS,
          success: true,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ASSIGNED_TEAM_MEMBER_REMOVE_FAILED,
            error: errorMessage.ON_DELETE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };

  // Ankit -17-04-2023
  removeAndAddNewTeamAssociation = async (
    req: Request,
    model: UpdateMemberAssociationToTeamViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      // let foundTeamMemberAssociation =
      //   await BillingTeamMemberModel.find({
      //     team_id: model.old_team_id,
      //     member_id: model.member_id,
      //     isDeleted: false,
      //   });

      // if (
      //   foundTeamMemberAssociation &&
      //   foundTeamMemberAssociation.length > 0
      // ) {
      let updateExistingTeamMember = await BillingTeamMemberModel.update(
        {
          // team_id: model.old_team_id,
          member_id: model.member_id,
          //isDeleted: false,
        },
        {
          $set: {
            isDeleted: true,
            isActive: false,
          },
        }
      );

      let newAssArr: any = [];

      model.new_team_ids.forEach((obj) => {
        let temp: any = {
          team_id: obj,
          member_id: model.member_id,
        };

        newAssArr.push(temp);
      });

      let addTeamMemberAss = await BillingTeamMemberModel.insertMany(newAssArr);

      if (addTeamMemberAss) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `Team member association updated successfully`,
          type: EHistoryActivityTypeValues.BillingTeam,
          type_id: userDetails._id,
          data: {
            team_id: model.new_team_ids[0],
            // email: model.email,
            // first_name: model.first_name,
            // last_name: model.last_name,
            // role: model.role_id,
            member_id: model.member_id,
          },
        });
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.UPDATE_ASSIGNED_TEAM_MEMBER_Successfully,
        };
      } else
        return {
          success: false,
          data: {
            message: errorMessage.UPDATE_ASSIGNED_TEAM_MEMBER_FAILED,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      // } else {
      //   return {
      //     success: false,
      //     data: {
      //       message: errorMessage.TEAM_MEMBER_NOT_ASSIGNED,
      //       error: errorMessage.ON_UPDATE_ERROR,
      //     },
      //     status_code: HttpStatus.BAD_REQUEST,
      //   };
      // }
    } catch (error) {
      next(error);
    }
  };
  filterListBillingTeam = async (
    req: Request,
    model: GetBillingTeamListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let result = await BillingTeamModel.aggregate([
        { $match: { isActive: true, isDeleted: false } },
        { $project: { name: 1, _id: 1 } },
        { $sort: { createdAt: -1 } },
      ]);

      if (result && result.length) {
        let obj = {
          data: result,
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
            message: errorMessage.BILLING_TEAM_MEMBER_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  // Clinic assign ment to billing team

  assignClinicToBillingTeam = async (
    req: Request,
    model: AssignClinicToTeamViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let alreadyAddedClinicToBillingTeam =
        await BillingTeamAssociatedClinicsModel.findOne({
          clinic: model.clinic_id,
          team_id: model.team_id,
          isDeleted: false,
        });
      if (alreadyAddedClinicToBillingTeam) {
        return {
          success: false,
          data: {
            message: errorMessage.CLINIC_ALREADY_ADDED_BILLING_TEAM,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        let modelToSave = <BillingTeamAssociatedClinics>model;

        modelToSave.clinic = model.clinic_id;

        modelToSave.createdby_id = userDetails._id;
        let result = await BillingTeamAssociatedClinicsModel.create(
          modelToSave
        );

        if (result) {
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `clinic assigned to billing team`,
            type: EHistoryActivityTypeValues.BillingTeam,
            // type_id: model.team_member,
          });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: result,
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.ERROR_ON_ASSIGN_CLINIC_TO_TEAM,
              error: errorMessage.ON_ADD_ERROR,
            },
            status_code: HttpStatus.BAD_REQUEST,
          };
        }
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  UnAssignClinicToBillingTeam = async (
    req: Request,
    model: UnAssignClinicToTeamViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let updationResult = await BillingTeamAssociatedClinicsModel.updateMany(
        {
          team_id: model.team_id,
          clinic_id: { $in: model.clinicIds },
        },
        { isDeleted: true }
      );

      if (updationResult && updationResult.modifiedCount > 0) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `clinic un-assigned from  billing team`,
          type: EHistoryActivityTypeValues.BillingTeam,
          // type_id: model.team_member,
        });
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: "Clinic Unassigned successfully",
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_UN_ASSIGN_CLINIC_TO_TEAM,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };

  // Download BillingTeam Data

  getBillingTeamDataToExcel = async (
    req: Request,
    model: GetBillingTeamListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      const workbook = await XlsxPopulate.fromBlankAsync();
      let billinTeamSheet: any = workbook.sheet("Sheet1");
      let billinTeamSheetHeader = [
        "Team Name",
        "Clinic Assigned",
        "Team Memeber",
      ];

      billinTeamSheetHeader.forEach((el, i) => {
        billinTeamSheet
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

      let condition: any = {};

      condition.isDeleted = false;
      condition.isActive = true;

      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.search);
        condition.$or = [
          {
            name: {
              $regex: model.search,
              $options: "i",
            },
          },
        ];
      }

      // if (model.isActive) {
      //   child_condition.isActive = model.isActive;
      // }

      let result = await BillingTeamModel.aggregate([
        { $match: condition },
        {
          $lookup: {
            from: "billing_team_member",
            let: { team_id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$team_id", "$$team_id"],
                  },
                  isActive: true,
                  isDeleted: false,
                },
              },
            ],
            as: "memberData",
          },
        },

        {
          $lookup: {
            from: "billing_team_associated_clinics",
            let: { team_id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$team_id", "$$team_id"],
                  },
                  isActive: true,
                  isDeleted: false,
                },
              },
              {
                $lookup: {
                  from: "clinic",
                  let: { clinic_id: "$clinic" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$clinic_id"],
                        },
                        // isActive: true,
                        // isDeleted: false,
                      },
                    },
                    {
                      $project: {
                        _id: 1,
                        clinic_name: 1,
                      },
                    },
                  ],
                  as: "clinicData",
                },
              },
              {
                $unwind: {
                  path: "$clinicData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $project: {
                  clinic_id: "$clinic",
                  clinic_name: "$clinicData.clinic_name",
                },
              },
            ],
            as: "assocatedClinicData",
          },
        },
        // {
        //   $unwind: {
        //     path: "$memberData",
        //     preserveNullAndEmptyArrays: true,
        //   },
        // },
        {
          $facet: {
            count: [{ $count: "count" }],
            data: [
              {
                $project: {
                  _id: 1,
                  name: 1,
                  clinics: "$assocatedClinicData",
                  total_clinics: {
                    $cond: {
                      if: {
                        $isArray: "$assocatedClinicData",
                      },
                      then: {
                        $size: "$assocatedClinicData",
                      },
                      else: 0,
                    },
                  },
                  total_members: {
                    $cond: {
                      if: { $isArray: "$memberData" },
                      then: { $size: "$memberData" },
                      else: 0,
                    },
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

      let sheetStyle = {
        border: true,
        fontFamily: "Calibri",
      };

      if (result && result[0].data && result[0].data.length > 0) {
        // write data in excel
        let finalResponse = result[0].data;

        finalResponse.forEach((el: any, i: number) => {
          billinTeamSheet
            .cell("A" + (i + 2))
            .value(el.name)
            .style(sheetStyle);

          billinTeamSheet
            .cell("B" + (i + 2))
            .value(el.total_clinics)
            .style(sheetStyle);

          billinTeamSheet
            .cell("C" + (i + 2))
            .value(el.total_members)
            .style(sheetStyle);
        });

        billinTeamSheet.freezePanes(1, 1);

        const data: any = await workbook.outputAsync();
        await fs.writeFileSync(
          path.join(
            __dirname,
            "../../../../../public/upload/billing/Billing_Team_Report.xlsx"
          ),
          data
        );
        let link = `http://${req.hostname}:${process.env.PORT}/upload/billing/Billing_Team_Report.xlsx`;
        let excelFileName = "Billing_Team_Report.xlsx";
        let response = {
          link,
          name: excelFileName,
        };
        return {
          status_code: HttpStatus.OK,
          data: response, //link,

          success: true,
        };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.BILLING_TEAM_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  getBillingTeamMembersDataToExcel = async (
    req: Request,
    model: GetBillingTeamMembersListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      const workbook = await XlsxPopulate.fromBlankAsync();
      let billinTeamSheet: any = workbook.sheet("Sheet1");
      let billinTeamSheetHeader = ["Name", "Email", "Assigned Roles"];

      billinTeamSheetHeader.forEach((el, i) => {
        billinTeamSheet
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

      let condition: any = {};
      let child_condition: any = {};
      child_condition.$expr = {
        $eq: ["$_id", "$$user_id"],
      };
      if (model.role_id)
        child_condition.role = new mongoose.Types.ObjectId(model.role_id);

      // if ("isDeleted" in model && model.isDeleted)
      //   child_condition.isDeleted = model.isDeleted;

      // if (model.isDeleted == true || model.isDeleted == false) {
      //   condition.isDeleted = model.isDeleted;
      // }
      condition.team_id = new mongoose.Types.ObjectId(model.team_id);
      condition.isDeleted = false;
      condition.isActive = true;

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
        ];
      }
      child_condition.isActive = true;
      child_condition.isDeleted = false;

      // if (model.isActive) {
      //   child_condition.isActive = model.isActive;
      // }
      //console.log(condition);
      let result = await BillingTeamMemberModel.aggregate([
        { $match: condition },
        {
          $lookup: {
            from: "users",
            let: { user_id: "$member_id" },
            pipeline: [
              {
                $match: child_condition,
              },
              {
                $lookup: {
                  from: "roles",
                  let: { role_id: "$role" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$role_id"],
                        },
                      },
                    },
                    {
                      $project: {
                        roleTitle: 1,
                      },
                    },
                  ],
                  as: "roleData",
                },
              },
              {
                $unwind: {
                  path: "$roleData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $project: {
                  first_name: 1,
                  last_name: 1,
                  email: 1,
                  role: 1,
                  roleData: 1,
                },
              },
            ],
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
                  role: "$userData.roleData.roleTitle",
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

      if (
        result &&
        result.length > 0 &&
        result[0].data &&
        result[0].data.length > 0
      ) {
        let sheetStyle = {
          border: true,
          fontFamily: "Calibri",
        };

        // write data in excel
        let finalResponse = result[0].data;

        finalResponse.forEach((el: any, i: number) => {
          billinTeamSheet
            .cell("A" + (i + 2))
            .value(el.first_name + "" + el.last_name)
            .style(sheetStyle);

          billinTeamSheet
            .cell("B" + (i + 2))
            .value(el.email)
            .style(sheetStyle);

          billinTeamSheet
            .cell("C" + (i + 2))
            .value(el.role)
            .style(sheetStyle);
        });

        billinTeamSheet.freezePanes(1, 1);

        const data: any = await workbook.outputAsync();
        await fs.writeFileSync(
          path.join(
            __dirname,
            "../../../../../public/upload/billing/Billing_Team_Member_Report.xlsx"
          ),
          data
        );
        let link = `http://${req.hostname}:${process.env.PORT}/upload/billing/Billing_Team_Member_Report.xlsx`;
        let excelFileName = "Billing_Team_Member_Report.xlsx";
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
            message: errorMessage.BILLING_TEAM_MEMBER_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new BillingTeamServices();
