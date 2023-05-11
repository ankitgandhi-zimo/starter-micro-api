import { DocumentType } from "@typegoose/typegoose";
import { NextFunction, Request } from "express";
import fs from "fs";
import HttpStatus from "http-status-codes";
import mongoose from "mongoose";
import path from "path";
import XlsxPopulate from "xlsx-populate";
import { IServiceResult1 } from "../../common/common-methods";
import errorMessage from "../../common/erros_message";
import ClinicModel, {
  Clinic,
  EClinicTypeValues,
} from "../../models/clinic.model";
import ClinicAssociationGroupModel from "../../models/clinic_association_with_group.model";
import { ClinicGroup } from "../../models/group.model";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";
import ClinicLocationModel, {
  ClinicLocation,
} from "../../models/location.model";
import RoleModel from "../../models/roles.model";
import {
  default as UserModel,
  default as USER_DB_MODEL,
  User,
} from "../../models/user.model";
import {
  AddClinicLocationViewmodel,
  AddClinicViewmodel,
  GetClinicListViewmodel,
  GetClinicLocationListViewmodel,
  UpdateClinicLocationViewmodel,
  UpdateClinicViewmodel,
} from "../../view-models/clinic";
export enum EnumRoles {
  SUPERADMIN = "superadmin",
}
class ClinicServices {
  addClinic = async (
    req: Request,
    model: AddClinicViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let findClinicRoleDoc = await RoleModel.findOne({
        roleName: "clinic",
      });

      let foundUser = await UserModel.findOne({
        email: model.email.toLowerCase(),
        is_deleted: false,
      });
      if (foundUser) {
        return {
          data: {
            message: errorMessage.ALREADY_ASSOCIATED_EMAIL,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
        };
      } else {
        // model.clinic_name =
        //   model.first_name + " " + model.last_name;

        let modelToSave = <Clinic>model;

        // make record in user collection

        let userObj = {
          first_name: model.first_name,
          last_name: model.last_name,
          image: modelToSave.image,
          role: findClinicRoleDoc ? findClinicRoleDoc._id : "",
          email: model.email.toLowerCase(),
          password: "",
          addedBy_id: userDetails._id,
          mobile_no: model.mobile_no,
          role_permission: findClinicRoleDoc!.permission,
        };

        let addRecordAsUser = await UserModel.create(userObj);

        if (addRecordAsUser) {
          modelToSave.user_id = addRecordAsUser._id;
        }

        // add clinic policy

        let addClinicPolicy = {
          noShowCharge: 0,
          isDeleted: false,
          isActive: false,
          cancel: {
            hours: 24,
            isAllowed: true,
          },
          reschedule: {
            hours: 24,
            isAllowed: true,
          },
        };
        modelToSave.clinicPolicy = addClinicPolicy;
        let response = await ClinicModel.create(modelToSave);

        if (response) {
          // Add Activity History
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `clinic added successfully`,
            type: EHistoryActivityTypeValues.CLINIC,
            type_id: response._id,
          });

          if (model.group) {
            let addClinicInGroup = await ClinicAssociationGroupModel.create({
              group_id: model.group,
              clinic_id: response._id,
            });
            // Add Activity History
            let addHistory = await HistoryModel.create({
              user_id: userDetails._id,
              description: `clinic added in group successfully`,
              type: EHistoryActivityTypeValues.CLINIC,
              type_id: response._id,
            });
          }

          return {
            status_code: HttpStatus.OK,
            success: true,
            data: response,
          };
        } else {
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.ERROR_ADD_CLINIC,
              error: errorMessage.ON_ADD_ERROR,
            },
          };
        }
      }
    } catch (error) {
      next(error);
    }
  };

  getClinicDetails = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let foundClinic = await ClinicModel.findById(req.params._id, {}).populate(
        {
          path: "user_id",
          // select: { role_permission: 1 },
          select: { createdAt: 0, updatedAt: 0, __v: 0 },
        }
      );
      // .populate(["country", "state"]);

      if (foundClinic) {
        let foundClinicLocation = await ClinicLocationModel.find({
          clinic_id: new mongoose.Types.ObjectId(req.params._id),
        }).populate(["country", "state"]);

        return {
          status_code: HttpStatus.OK,
          success: true,
          data: {
            ...foundClinic.toObject(),
            locations: foundClinicLocation,
          },
        };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.CLINIC_DETAILS_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  deleteClinicDetails = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let foundClinic = await ClinicModel.findById(req.params._id, {});

      if (foundClinic) {
        let clinicDeletionResult = await ClinicModel.updateOne(
          { _id: req.params._id },
          { isDeleted: true }
        );

        if (clinicDeletionResult && clinicDeletionResult.modifiedCount > 0) {
          // Add Activity History
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `clinic deleted successfully`,
            type: EHistoryActivityTypeValues.CLINIC,
            type_id: req.params._id,
          });

          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.DELETE_SUCCESSFULL,
          };
        } else
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.CLINIC_DELETION_ERROR,
              error: errorMessage.ON_FETCH_ERROR,
            },
          };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.CLINIC_DETAILS_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  // pending functionality
  getClinicList = async (
    req: Request,
    model: GetClinicListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let clinicRoleDoc = await RoleModel.findOne({
        roleName: "clinic",
      });

      let defaultPage: number;
      let count: number;
      let populateFeilds = [
        {
          path: "user_id",
          select: {
            _id: 0,
            first_name: 1,
            last_name: 1,
            email: 1,
          },
        },
      ];

      let condition: any = {
        isDeleted: false,
        role: clinicRoleDoc!._id,
      };

      if (model.clinic_name) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.clinic_name);

        if (
          isEmptyNameOnlySpace ||
          model.clinic_name == null ||
          model.clinic_name === ""
        ) {
          return {
            data: {
              message: errorMessage.NON_EMPTY_CLINIC_NAME,
              error: errorMessage.ON_FETCH_ERROR,
            },
            success: false,
            status_code: HttpStatus.BAD_REQUEST,
          };
        } else
          condition.clinic_name = {
            $regex: model.clinic_name,
            $options: "i",
          };
      }

      if (model.isActive) {
        condition.isActive = model.isActive;
      }

      if (model.clinic_type) {
        condition.clinic_type = model.clinic_type;
      }

      if (!model.pageNumber && !model.pageSize) {
        defaultPage = 1;
        count = -1;

        let response = await ClinicModel.find(condition, {
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
          password: 0,
        })
          .populate(populateFeilds)
          .sort({ clinic_name: 1 });
        // .sort({ createdAt: -1 });

        if (response && response.length > 0) {
          if (model.clinic_type == EClinicTypeValues.GROUP) {
            //   response.forEach((obj)=>{
            // obj.totalClinicInThisGroup=
            //   })
          }

          return {
            status_code: HttpStatus.OK,
            success: true,
            data: {
              data: response,
              // count: response.length,
              totalDocs: response.length,
              pageNumber: defaultPage,
              pageSize: response.length,
              totalPages: defaultPage,
            },
          };
        } else {
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.CLINIC_LIST_NOT_FOUND,
              error: errorMessage.ON_FETCH_ERROR,
            },
          };
        }
      } else if (model.pageNumber && model.pageNumber >= 1 && !model.pageSize) {
        defaultPage = model.pageNumber;
        count = 50;
      } else {
        defaultPage = model.pageNumber || 1;
        count = model.pageSize || 50;
      }
      let tempResult: any;

      let result: mongoose.PaginateResult<any> = await ClinicModel.paginate(
        {
          ...condition,
          options: {
            projection: {
              createdAt: 0,
              updatedAt: 0,
              __v: 0,
            },
          },
        },
        {
          page: defaultPage,
          ...(count > 0 ? { limit: count } : { pagination: false }),
          populate: populateFeilds,

          // sort: { createdAt: -1 },
          sort: { clinic_name: 1 },
        }
      );

      tempResult = result;
      let finalResponse: any = [];
      if (result && result.docs && result.docs.length > 0) {
        await Promise.all(
          result.docs.map(async (obj: any) => {
            let temp: any = { ...obj.toObject() };
            let clinicGroupAssociations =
              await ClinicAssociationGroupModel.find({
                clinic_id: new mongoose.Types.ObjectId(obj._id),
              }).populate("group_id");

            if (clinicGroupAssociations && clinicGroupAssociations.length > 0)
              temp.groupDetails = clinicGroupAssociations;
            else temp.groupDetails = [];

            finalResponse.push(temp);
            return obj;
          })
        );

        // set group data in clinic list
        finalResponse.forEach((finalObj: any) => {
          let finalGroupData: any = [];
          if (finalObj.groupDetails.length > 0) {
            finalObj.groupDetails.forEach((obj) => {
              let groupDoc = <DocumentType<ClinicGroup>>obj.group_id;
              let tempObj: any = {
                group_id: groupDoc._id,
                group_name: groupDoc.name,
              };
              finalGroupData.push(tempObj);
            });
          }

          finalObj.groupDetails = finalGroupData;
        });
        let obj = {
          data: finalResponse, //result.docs,
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
            message: errorMessage.CLINIC_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  getClinicList1 = async (
    req: Request,
    model: GetClinicListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let clinicRoleDoc = await RoleModel.findOne({
        roleName: "clinic",
      });

      let defaultPage: number;
      let count: number;

      let condition: any = {
        isDeleted: false,
        role: new mongoose.Types.ObjectId(clinicRoleDoc!._id),
      };

      if (model.clinic_name) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.clinic_name);

        if (
          isEmptyNameOnlySpace ||
          model.clinic_name == null ||
          model.clinic_name === ""
        ) {
          return {
            data: {
              message: errorMessage.NON_EMPTY_CLINIC_NAME,
              error: errorMessage.ON_FETCH_ERROR,
            },
            success: false,
            status_code: HttpStatus.BAD_REQUEST,
          };
        } else
          condition.clinic_name = {
            $regex: model.clinic_name,
            $options: "i",
          };
      }

      if (model.isActive) {
        condition.isActive = model.isActive;
      }

      if (model.clinic_type) {
        condition.clinic_type = model.clinic_type;
      }

      defaultPage = model.pageNumber || 1;
      count = model.pageSize || 50;

      let result = await ClinicModel.aggregate([
        { $match: condition },
        {
          $lookup: {
            from: "users",
            let: { user_id: "$user_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$user_id"],
                  },
                },
              },
              {
                $project: {
                  first_name: 1,
                  last_name: 1,
                  email: 1,
                },
              },
            ],
            as: "user_id",
          },
        },

        {
          $unwind: {
            path: "$user_id",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "clinic_association_groups",
            let: { clinic_id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$clinic_id", "$$clinic_id"],
                  },
                },
              },
              {
                $lookup: {
                  from: "clinic_groups",
                  let: { group_id: "$group_id" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$group_id"],
                        },
                      },
                    },
                    { $project: { name: 1 } },
                  ],
                  as: "clinicGroupData",
                },
              },
              {
                $unwind: {
                  path: "$clinicGroupData",
                  preserveNullAndEmptyArrays: true,
                },
              },

              {
                $project: {
                  group_id: "$group_id",
                  group_name: "$clinicGroupData.name",
                },
              },
            ],
            as: "groupDetails",
          },
        },
        {
          $unwind: {
            path: "$groupDetails",
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
                  clinic_name: 1,
                  image: 1,
                  mobile_no: 1,
                  designation: 1,
                  clinic_type: 1,
                  user_id: 1,
                  isDeleted: 1,
                  isActive: 1,
                  office: 1,
                  fax: 1,
                  clinicPolicy: 1,
                  createdAt: 1,
                  updatedAt: 1,
                  __v: 1,
                  groupDetails: 1,
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
      console.log(condition, "hjhhj", result);
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
            message: errorMessage.CLINIC_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  getClinicListWithoutPagination = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let clinicRoleDoc = await RoleModel.findOne({
        roleName: "clinic",
      });

      let condition: any = {
        isDeleted: false,
        isActive: true,
      };

      let response = await ClinicModel.find(condition, {
        clinic_name: 1,
      }).sort({ createdAt: -1 });

      if (response && response.length > 0) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: {
            data: response,
            // count: response.length,
            totalDocs: response.length,
            pageNumber: 1,
            pageSize: response.length,
            totalPages: 1,
          },
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.CLINIC_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  updateClinic = async (
    req: Request,
    model: UpdateClinicViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let findClinicRoleDoc = await RoleModel.findOne({
        roleName: "clinic",
      });
      let foundClinic = await ClinicModel.findOne({
        _id: model._id,
      }).populate("user_id");

      if (foundClinic) {
        let userData = <DocumentType<User>>foundClinic.user_id;
        let modelToSave = <Clinic>model;
        modelToSave.user_id = foundClinic.user_id;

        if (model.first_name || model.last_name || model.mobile_no) {
          let updateUserDetail = await USER_DB_MODEL.updateOne(
            { _id: foundClinic.user_id },
            {
              first_name: model.first_name ?? userData.first_name,
              last_name: model.last_name ?? userData.last_name,
              mobile_no: model.mobile_no ?? userData.mobile_no,
              image: model.image ?? userData.image,
            }
          );
        }
        let updateClinicDetails = await ClinicModel.updateOne(
          { _id: model._id },
          modelToSave
        );

        if (updateClinicDetails && updateClinicDetails.modifiedCount > 0) {
          // Add Activity History
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `clinic updated successfully`,
            type: EHistoryActivityTypeValues.CLINIC,
            type_id: model._id,
          });

          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.UPDATE_SUCCESSFULL,
          };
        } else {
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.ERROR_UPDATE_CLINIC,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };
        }
      } else
        return {
          data: {
            message: errorMessage.CLINIC_DETAILS_NOT_FOUND,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
        };
    } catch (error) {
      next(error);
    }
  };

  // clinic location sections

  addClinicLocation = async (
    req: Request,
    model: AddClinicLocationViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      // let foundLocation = await UserModel.findOne({
      //   address: model.address,
      //   is_deleted: false,
      //   clinic_id:model.clinic_id
      // });
      // if (foundLocation) {
      //   return {
      //     data: {
      //       message: errorMessage.ALREADY_ADDED_CLINIC_LOCATION,
      //       error: errorMessage.ON_ADD_ERROR,
      //     },
      //     status_code: HttpStatus.BAD_REQUEST,
      //     success: false,
      //   };
      // } else {
      let modelToSave = <ClinicLocation>model;

      let response = await ClinicLocationModel.create(modelToSave);

      if (response) {
        // Add Activity History
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `clinic location added successfully`,
          type: EHistoryActivityTypeValues.CLINIC,
          type_id: model.clinic_id,
        });
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: response,
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.ERROR_ADD_CLINIC_LOCATION,
            error: errorMessage.ON_ADD_ERROR,
          },
        };
      }
      // }
    } catch (error) {
      next(error);
    }
  };

  getClinicLocationDetails = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let foundClinicLocation = await ClinicLocationModel.findById(
        req.params._id,
        {}
      ).populate({
        path: "clinic_id",
        select: { clinic_name: 1, clinic_type: 1 },
      });

      if (foundClinicLocation) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: foundClinicLocation,
        };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.CLINIC_LOCATIONS_DETAILS_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  updateClinicLocation = async (
    req: Request,
    model: UpdateClinicLocationViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let foundLocation = await ClinicLocationModel.findOne({
        is_deleted: false,
        _id: model._id,
      });
      if (!foundLocation) {
        return {
          data: {
            message: errorMessage.CLINIC_LOCATIONS_DETAILS_NOT_FOUND,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
        };
      } else {
        let modelToSave = <ClinicLocation>model;

        let response = await ClinicLocationModel.updateOne(
          { _id: model._id },
          modelToSave
        );

        if (response && response.modifiedCount > 0) {
          // Add Activity History
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `clinic location updated successfully`,
            type: EHistoryActivityTypeValues.CLINIC,
            type_id: foundLocation.clinic_id,
          });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.UPDATE_SUCCESSFULL,
          };
        } else {
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.ERROR_UPDATE_CLINIC_LOCATION,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };
        }
      }
    } catch (error) {
      next(error);
    }
  };

  getClinicLocationList = async (
    req: Request,
    model: GetClinicLocationListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number = model.pageNumber ?? 1;
      let count: number = model.pageSize ?? 10;
      let populateFeilds: any = [
        {
          path: "clinic_id",
          select: {
            _id: 1,
            clinic_name: 1,
          },
        },
      ];

      let condition: any = {
        clinic_id: model.clinic_id,
      };

      if (
        model.search &&
        model.search != "" &&
        model.search != undefined &&
        model.search != null
      ) {
        condition.branchName = {
          $regex: model.search,
          $options: "i",
        };
      }

      if ("isActive" in model && model.isActive != null) {
        condition.isActive = model.isActive;
      }

      if ("isDeleted" in model && model.isDeleted != null) {
        condition.isDeleted = model.isDeleted;
      }

      let result: mongoose.PaginateResult<any> =
        await ClinicLocationModel.paginate(
          {
            ...condition,
            options: {
              projection: {
                createdAt: 0,
                updatedAt: 0,
                __v: 0,
              },
            },
          },
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
            message: errorMessage.CLINIC_LOCATIONS_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  getClinicLocationListWithoutPagination = async (
    req: Request,
    model: GetClinicLocationListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let condition: any = {
        clinic_id: model.clinic_id,
      };

      let response = await ClinicLocationModel.find(condition, {
        branchName: 1,
        address: 1,
      });

      if (response && response.length > 0) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: {
            data: response,
            // count: response.length,
            totalDocs: response.length,
            pageNumber: 1,
            pageSize: response.length,
            totalPages: 1,
          },
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

  // Export clinic list
  getClinicDataToExcel = async (
    req: Request,
    model: GetClinicListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      const workbook = await XlsxPopulate.fromBlankAsync();
      let clinicSheet: any = workbook.sheet("Sheet1");
      let clinicSheetHeader = ["Clinic Name", "Email", "Type", "Status"];

      clinicSheetHeader.forEach((el, i) => {
        clinicSheet
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

      const count = model.pageSize ? model.pageSize : errorMessage.count;
      req.body.page = model.pageNumber
        ? model.pageNumber
        : errorMessage.defaultPageNo;
      const skip = count * (req.body.page - 1);
      ////////////////////////////////////////////////////////////////

      let clinicRoleDoc = await RoleModel.findOne({
        roleName: "clinic",
      });

      let populateFeilds = [
        {
          path: "user_id",
          select: {
            email: 1,
          },
        },
      ];

      let condition: any = {
        is_deleted: false,
        role: clinicRoleDoc!._id,
      };

      if (model.clinic_name) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.clinic_name);

        if (
          isEmptyNameOnlySpace ||
          model.clinic_name == null ||
          model.clinic_name === ""
        ) {
          return {
            data: {
              message: errorMessage.NON_EMPTY_CLINIC_NAME,
              error: errorMessage.ON_FETCH_ERROR,
            },
            success: false,
            status_code: HttpStatus.BAD_REQUEST,
          };
        } else
          condition.clinic_name = {
            $regex: model.clinic_name,
            $options: "i",
          };
      }

      if (model.isActive) {
        condition.isActive = model.isActive;
      }

      if (model.clinic_type) {
        condition.clinic_type = model.clinic_type;
      }

      let clinicData = await ClinicModel.find(condition)
        .populate(populateFeilds)
        .sort({ clinic_name: 1 });

      //Added by Ankit 13-04-2023
      // sort list with clinic name alphabetically
      const sortedList = clinicData.sort((a: any, b: any) =>
        a.clinic_name.localeCompare(b.clinic_name)
      );

      if (!clinicData.length)
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.CLINIC_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };

      let sheetStyle = {
        border: true,
        fontFamily: "Calibri",
      };

      sortedList.forEach((el: any, i: number) => {
        clinicSheet
          .cell("A" + (i + 2))
          .value(el.clinic_name)
          .style(sheetStyle);
        clinicSheet;

        clinicSheet
          .cell("B" + (i + 2))
          .value(el.user_id?.email ? el.user_id!.email : "")
          .style(sheetStyle);

        clinicSheet
          .cell("C" + (i + 2))
          .value(el.clinic_type ? el.clinic_type : "")
          .style(sheetStyle);

        clinicSheet
          .cell("D" + (i + 2))
          .value(el.isActive === true ? "Activate" : "De-activate ")
          .style(sheetStyle);
      });

      clinicSheet.freezePanes(1, 1);

      const data: any = await workbook.outputAsync();
      await fs.writeFileSync(
        path.join(
          __dirname,
          "../../../../../public/upload/clinics/Clinic_Report.xlsx"
        ),
        data
      );

      let link = `http://${req.hostname}:${process.env.PORT}/upload/clinics/Clinic_Report.xlsx`;

      let excelFileName = "Clinic_Report.xlsx";
      let response = {
        link,
        name: excelFileName,
      };
      return {
        status_code: HttpStatus.OK,
        data: response, //link, //errorMessage.ExecutedSuccessfully,
        success: true,
      };
    } catch (error) {
      next(error);
    }
  };
}
export default new ClinicServices();
