import { NextFunction, Request } from "express";
import HttpStatus from "http-status-codes";
import _ from "lodash";
import mongoose from "mongoose";
import { IServiceResult1 } from "../../common/common-methods";
import errorMessage from "../../common/erros_message";
import ClinicModel, {
  EClinicTypeValues,
} from "../../models/clinic.model";
import ClinicAssociationModel from "../../models/clinic_association_with_group.model";
import ClinicGroupModel, {
  ClinicGroup,
} from "../../models/group.model";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";
import {
  AddClinicInGroupViewmodel,
  AddGroupViewmodel,
  DeleteClinicFromGroupViewmodel,
  GetClinicGroupListViewmodel,
} from "../../view-models/groups";

import { DocumentType } from "@typegoose/typegoose";
import { User } from "../../models/user.model";
export enum EnumRoles {
  SUPERADMIN = "superadmin",
}
class GroupServices {
  addGroup = async (
    req: Request,
    model: AddGroupViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let CheckGroupExistence =
        await ClinicGroupModel.findOne({
          name: model.name,
          is_deleted: false,
        });
      if (CheckGroupExistence) {
        return {
          data: {
            message: errorMessage.ALREADY_EXISTED_GROUP,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
        };
      } else {
        let modelToSave = <ClinicGroup>model;

        //auto generate 6 charatcer group id
        let groupId = Math.round(
          Math.pow(36, 6 + 1) -
            Math.random() * Math.pow(36, 6)
        )
          .toString(36)
          .slice(1);
        modelToSave.group_id =
          modelToSave.name.slice(0, 2) + groupId;

        let response = await ClinicGroupModel.create(
          modelToSave
        );

        if (response) {
          // Add Activity History
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `clinic group added successfully`,
            type: EHistoryActivityTypeValues.CLINIC,
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
              message: errorMessage.ERROR_ADD_GROUP,
              error: errorMessage.ON_ADD_ERROR,
            },
          };
        }
      }
    } catch (error) {
      next(error);
    }
  };

  getGroupDetails = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let foundGroup = await ClinicGroupModel.findOne({
        _id: new mongoose.Types.ObjectId(req.params._id),
        isDeleted: false,
      });

      if (foundGroup) {
        let checkClinicAssociatedWithGroup =
          await ClinicAssociationModel.find({
            group_id: new mongoose.Types.ObjectId(
              req.params._id
            ),
            is_deleted: false,
          });
        let associatedClinicIds: any = [];
        checkClinicAssociatedWithGroup.forEach((obj) => {
          associatedClinicIds.push(
            obj.clinic_id?.toString()
          );
        });
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: {
            ...foundGroup.toObject(),
            totalClinics:
              checkClinicAssociatedWithGroup.length,
            associatedClinicArr: associatedClinicIds,
          },
        };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.GROUPS_DETAILS_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  deleteGroupDetails = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let foundGroup = await ClinicGroupModel.findById(
        req.params._id
      );

      if (foundGroup) {
        // if group deleted then change clinic type indiviual and remove association all clinic with this group
        let checkClinicAssociatedWithGroup =
          await ClinicAssociationModel.find({
            group_id: new mongoose.Types.ObjectId(
              req.params._id
            ),
            is_deleted: false,
          });

        let allClinicIds: any = [];

        checkClinicAssociatedWithGroup.forEach((obj) => {
          allClinicIds.push(obj.clinic_id?.toString());
        });

        if (allClinicIds.length > 0) {
          //change clinic type  group to indiviual
          let updateClinicDetails =
            await ClinicModel.update(
              {
                _id: { $in: allClinicIds },
              },
              { clinic_type: EClinicTypeValues.INDIVIDUAL }
            );
        }

        let removeClinicAssociationWithGroup =
          await ClinicAssociationModel.deleteMany({
            group_id: new mongoose.Types.ObjectId(
              req.params._id
            ),
          });

        let deleteGroupDetails =
          await ClinicGroupModel.updateOne(
            {
              _id: new mongoose.Types.ObjectId(
                req.params._id
              ),
            },
            { isActive: false, isDeleted: true }
          );

        if (
          deleteGroupDetails &&
          deleteGroupDetails.modifiedCount > 0
        ) {
          // Add Activity History
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `clinic group deleted successfully`,
            type: EHistoryActivityTypeValues.CLINIC,
          });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.DELETE_SUCCESSFULL,
          };
        }
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.ERROR_GROUP_DELETION,
            error: errorMessage.ON_DELETE_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  // clinic association with group

  addClinicInGroup = async (
    req: Request,
    model: AddClinicInGroupViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let foundGroup = await ClinicGroupModel.findOne({
        _id: new mongoose.Types.ObjectId(model.group_id),
      });

      model.clinic_ids = _.uniq(model.clinic_ids);

      let checkClinicAssociatedWithGroup =
        await ClinicAssociationModel.find({
          clinic_id: { $in: model.clinic_ids },
          group_id: model.group_id,
          isDeleted: false,
        });

      if (
        checkClinicAssociatedWithGroup &&
        checkClinicAssociatedWithGroup.length > 0
      ) {
        let alreadyAssoClinicIds: any = [];

        checkClinicAssociatedWithGroup.forEach((obj) => {
          alreadyAssoClinicIds.push(
            obj.clinic_id!.toString()
          );
        });

        const clinicNotToBeGrouped = new Set(
          alreadyAssoClinicIds
        );
        const newArr = model.clinic_ids.filter(
          (clinicId) => {
            // return those elements not in the clinicNotToBeGrouped
            return !clinicNotToBeGrouped.has(clinicId);
          }
        );

        model.clinic_ids = newArr;
      }

      let allClinicsObj: any = [];

      let historyobjArr: any = [];
      model.clinic_ids.forEach((tempId) => {
        let tempObj: any = {
          clinic_id: tempId,
          group_id: model.group_id.toString(),
        };
        allClinicsObj.push(tempObj);

        let historyObj: any = {
          user_id: userDetails._id,
          description: `clinic added in ${
            foundGroup!.name
          } group successfully`,
          type: EHistoryActivityTypeValues.CLINIC,
          type_id: tempId,
        };
        historyobjArr.push(historyObj);
      });

      let clinicGroupingResult =
        await ClinicAssociationModel.insertMany(
          allClinicsObj
        );

      if (
        clinicGroupingResult &&
        clinicGroupingResult.length > 0
      ) {
        let updateClinicDetails = await ClinicModel.update(
          { _id: { $in: model.clinic_ids } },
          { clinic_type: EClinicTypeValues.GROUP }
        );

        // Add Activity history

        let addHistory = await HistoryModel.insertMany(
          historyobjArr
        );

        return {
          status_code: HttpStatus.OK,
          success: true,
          data: clinicGroupingResult,
        };
      } else
        return {
          data: {
            message:
              errorMessage.CLINIC_ALREADY_ASSOCIATED_GROUP,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
        };
    } catch (error) {
      next(error);
    }
  };

  // old api single added and updated
  // addClinicInGroup = async (
  //   req: Request,
  //   model: AddClinicInGroupViewmodel,
  //   next: NextFunction
  // ): Promise<IServiceResult1 | void> => {
  //   try {
  //     let userDetails = <DocumentType<User>>req.user;

  //     let CheckClinicExistInGroup =
  //       await ClinicAssociationModel.findOne({
  //         clinic_id: new mongoose.Types.ObjectId(
  //           model.clinic_id
  //         ),
  //       });

  //     if (
  //       CheckClinicExistInGroup &&
  //       CheckClinicExistInGroup.group_id!.toString() ==
  //         model.group_id.toString() &&
  //       CheckClinicExistInGroup.isDeleted == false
  //     ) {
  //       return {
  //         data: {
  //           message:
  //             errorMessage.CLINIC_ALREADY_ASSOCIATED_GROUP,
  //           error: errorMessage.ON_ADD_ERROR,
  //         },
  //         status_code: HttpStatus.BAD_REQUEST,
  //         success: false,
  //       };
  //     } else if (
  //       CheckClinicExistInGroup &&
  //       CheckClinicExistInGroup.group_id!.toString() ==
  //         model.group_id.toString() &&
  //       CheckClinicExistInGroup.isDeleted == true
  //     ) {
  //       // check this clinic already added but ungroup earlier , then only change isDeleted feild value "false"

  //       let updateClinicType = await ClinicModel.updateOne(
  //         {
  //           _id: new mongoose.Types.ObjectId(
  //             model.clinic_id
  //           ),
  //         },
  //         { clinic_type: EClinicTypeValues.GROUP }
  //       );

  //       // Add Activity History
  //       let addHistory = await HistoryModel.create({
  //         user_id: userDetails._id,
  //         description: `clinic re-associated with group successfully`,
  //         type: EHistoryActivityTypeValues.CLINIC,
  //       });

  //       let response =
  //         await ClinicAssociationModel.updateOne(
  //           { _id: CheckClinicExistInGroup._id },
  //           { isDeleted: false }
  //         );
  //       return {
  //         status_code: HttpStatus.OK,
  //         success: true,
  //         data: CheckClinicExistInGroup,
  //       };
  //     } else if (
  //       CheckClinicExistInGroup &&
  //       CheckClinicExistInGroup.group_id!.toString() !=
  //         model.group_id.toString() &&
  //       CheckClinicExistInGroup.isDeleted == false
  //     ) {
  //       return {
  //         data: {
  //           message:
  //             errorMessage.CLINIC_ALREADY_ASSOCIATED_ANOTHER_GROUP,
  //           error: errorMessage.ON_ADD_ERROR,
  //         },
  //         status_code: HttpStatus.BAD_REQUEST,
  //         success: false,
  //       };
  //     } else {
  //       let modelToSave = <ClinicAssociationGroup>model;

  //       let response = await ClinicAssociationModel.create(
  //         modelToSave
  //       );

  //       if (response) {
  //         {
  //           let updateClinicType =
  //             await ClinicModel.updateOne(
  //               {
  //                 _id: new mongoose.Types.ObjectId(
  //                   model.clinic_id
  //                 ),
  //               },
  //               { clinic_type: EClinicTypeValues.GROUP }
  //             );

  //           // Add Activity History
  //           let addHistory = await HistoryModel.create({
  //             user_id: userDetails._id,
  //             description: `clinic associated with group successfully`,
  //             type: EHistoryActivityTypeValues.CLINIC,
  //           });

  //           return {
  //             status_code: HttpStatus.OK,
  //             success: true,
  //             data: response,
  //           };
  //         }
  //       } else {
  //         return {
  //           status_code: HttpStatus.BAD_REQUEST,
  //           success: false,
  //           data: {
  //             message:
  //               errorMessage.ERROR_ADD_CLINIC_IN_GROUP,
  //             error: errorMessage.ON_ADD_ERROR,
  //           },
  //         };
  //       }
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  unGroupClinicFromGroup = async (
    req: Request,

    model: DeleteClinicFromGroupViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let CheckClinicExistInGroup =
        await ClinicAssociationModel.find({
          clinic_id: { $in: model.clinic_ids },

          is_deleted: false,
        });

      if (
        CheckClinicExistInGroup &&
        CheckClinicExistInGroup.length < 1
      ) {
        return {
          data: {
            message:
              errorMessage.CLINIC_NOT_ASSOCIATED_GROUP,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
        };
      } else {
        // ungroup a clinic from group
        let response =
          await ClinicAssociationModel.deleteMany({
            clinic_id: { $in: model.clinic_ids },
          });

        if (response && response.deletedCount > 0) {
          {
            let updateClinicDetails =
              await ClinicModel.update(
                { _id: { $in: model.clinic_ids } },
                {
                  clinic_type: EClinicTypeValues.INDIVIDUAL,
                }
              );
            model.clinic_ids = _.uniq(model.clinic_ids);
            await Promise.all(
              model.clinic_ids!.map(async (obj) => {
                // Add Activity History
                let addHistory = await HistoryModel.create({
                  user_id: userDetails._id,
                  description: `clinic ungroup from group successfully`,
                  type: EHistoryActivityTypeValues.CLINIC,
                  type_id: obj,
                });
              })
            );

            return {
              status_code: HttpStatus.OK,
              success: true,
              data: errorMessage.UPDATE_SUCCESSFULL,
            };
          }
        } else {
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message:
                errorMessage.ERROR_UNGROUP_CLINIC_IN_GROUP,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };
        }
      }
    } catch (error) {
      next(error);
    }
  };

  getGroupList = async (
    req: Request,
    model: GetClinicGroupListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let count = model.pageSize ? model.pageSize : 50;
      req.body.page = model.pageNumber
        ? model.pageNumber
        : 1;
      let skip = count * (req.body.page - 1);

      // let sortObject = { checkoutTime: -1 };

      let condition: any = {
        isDeleted: false,
      };

      if (model.group_name) {
        // let isEmptyNameOnlySpace = /^\s*$/.test(
        //   model.group_name
        // );

        // if (
        //   isEmptyNameOnlySpace ||
        //   model.group_name == null
        //   // ||
        //   // model.group_name === ""
        // ) {
        //   return {
        //     data: {
        //       message: errorMessage.NON_EMPTY_GROUP_NAME,
        //       error: errorMessage.ON_FETCH_ERROR,
        //     },
        //     success: false,
        //     status_code: HttpStatus.BAD_REQUEST,
        //   };
        // } else
        condition.name = {
          $regex: model.group_name,
          $options: "i",
        };
      }

      if (model.isActive) {
        condition.isActive = model.isActive;
      }

      const data = await ClinicGroupModel.aggregate([
        { $match: condition },
        { $sort: { createdAt: -1 } },
        {
          $lookup: {
            from: "clinic_association_groups",
            localField: "_id",
            foreignField: "group_id",
            pipeline: [{ $match: { isDeleted: false } }],
            //pipeline: [{ $count: "count" }],
            as: "clinic_association_groups_arr",
          },
        },
        // {
        //   $unwind: {
        //     path: "$count",
        //     preserveNullAndEmptyArrays: true,
        //   },
        // },
        // {
        //   $group: {
        //     _id: "$_id",
        //     count: { $first: "$count" },
        //     name: { $first: "$name" },
        //     isActive: { $first: "$isActive" },
        //     isDeleted: { $first: "$isDeleted" },
        //     createdAt: { $first: "$createdAt" },
        //   },
        // },
        {
          $facet: {
            totalCount: [{ $count: "sum" }],
            aggregatedData: [
              {
                $project: {
                  _id: "$_id",
                  name: 1,
                  group_id: 1,
                  isActive: 1,
                  isDeleted: 1,
                  //count: { $ifNull: ["$count.count", 0] },
                  count: {
                    $cond: {
                      if: {
                        $isArray:
                          "$clinic_association_groups_arr",
                      },
                      then: {
                        $size:
                          "$clinic_association_groups_arr",
                      },
                      else: 0,
                    },
                  },
                  //createdAt: 1,
                },
              },

              { $limit: skip + count },
              { $skip: skip },
              //{ $sort: { createdAt: -1 } },
            ],
          },
        },
      ]);

      if (data && data[0].aggregatedData.length > 0) {
        let obj = {
          data: data[0].aggregatedData,
          // count: result.totalDocs,
          totalDocs: data[0].totalCount[0].sum,
          // pageNumber: req.body.page,
          // pageSize: count,
          // totalPages: Math.ceil(
          //   data[0].aggregatedData.length / count
          // ),
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
            message:
              errorMessage.CLINIC_GROUP_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  getGroupListWithoutPagination = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let condition: any = {
        is_deleted: false,
      };

      let response = await ClinicGroupModel.find(
        condition,
        {
          name: 1,
        }
      ).sort({ createdAt: -1 });

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
            message:
              errorMessage.CLINIC_GROUP_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new GroupServices();
