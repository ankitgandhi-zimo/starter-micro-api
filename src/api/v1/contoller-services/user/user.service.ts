import { DocumentType } from "@typegoose/typegoose";
import bcrypt from "bcrypt";
import { NextFunction, Request } from "express";
import HttpStatus from "http-status-codes";
import mongoose from "mongoose";
import { v4 } from "uuid";
import Utility, {
  IServiceResult1,
} from "../../common/common-methods";
import errorMessage from "../../common/erros_message";
import { IJWTPayload } from "../../common/interface/jwtpayload";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";
import TokenModel from "../../models/login_token.model";
import otpModel from "../../models/otp_model";
import { default as PatientModel } from "../../models/patient.model";
import RoleModel, { Roles } from "../../models/roles.model";

import {
  default as UserModel,
  User,
} from "../../models/user.model";

import {
  ForgotPasswordViewmodel,
  LoginViewmodel,
  ResetForgotPasswordViewmodel,
} from "../../view-models/auth";
import { ChangePasswordViewModel } from "../../view-models/auth/change_password.viewmodel";
import {
  AddUserRoleViewmodel,
  AddUserViewmodel,
  GetUserHistoryViewmodel,
  GetUserListViewmodel,
  UpdateUserRoleViewmodel,
  UpdateUserViewmodel,
} from "../../view-models/user";
export enum EnumRoles {
  SUPERADMIN = "superadmin",
}

// let twilio_instance = twilio(
//   process.env.TWILIO_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

class UserServices {
  //Auth Services
  login = async (
    req: Request,
    model: LoginViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let found_user;
      found_user = await UserModel.findOne({
        email: model.email.toLowerCase(),
      }).populate([{ path: "role" }]);

      if (!found_user) {
        // check if patient try to login
        let loginUserresult = await PatientModel.findOne({
          email: model.email.toLowerCase(),
        }).populate([{ path: "role" }]);
        if (loginUserresult) {
          loginUserresult.first_name =
            Utility.getDecryptText(
              loginUserresult.first_name
            );
          loginUserresult.last_name =
            Utility.getDecryptText(
              loginUserresult.last_name
            );

          found_user = loginUserresult;
        }
      }
      if (!found_user) {
        return {
          status_code: HttpStatus.BAD_REQUEST,

          data: {
            message: errorMessage.USER_NOT_FOUND,
            Error: errorMessage.ON_FETCH_ERROR,
          },
          success: false,
        };
      } else {
        let comparePasswordResult = await bcrypt.compare(
          model.password,
          found_user.password ?? ""
        );

        if (comparePasswordResult) {
          let roleDoc = <Roles>found_user.role;
          let tokenPayload: IJWTPayload = {
            email: found_user.email,
            user_id: found_user._id,
            role: roleDoc ? roleDoc.roleTitle : "",
          };
          let signtoken = Utility.signJWT(tokenPayload);

          let saveToken = await TokenModel.create({
            token: signtoken,
            user_id: found_user._id,
          });

          // Add Activity History
          let addHistory = await HistoryModel.create({
            user_id: found_user._id,
            description: `login successfully`,
            type: EHistoryActivityTypeValues.USER,
            type_id: found_user._id,
          });

          return {
            status_code: HttpStatus.OK,
            success: true,
            data: {
              email: found_user.email,
              user_id: found_user._id,
              first_name: found_user.first_name,
              last_name: found_user.last_name,
              token: signtoken,
              role: roleDoc ? roleDoc.roleTitle : "",
              image: found_user.image,
              user_permission: found_user.role_permission
                ? found_user.role_permission
                : {},
            },
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.WRONG_PASSWORD,
              error: errorMessage.LOGIN,
            },
            status_code: HttpStatus.BAD_REQUEST,
          };
        }
      }
    } catch (error) {
      next(error);
    }
  };
  logout = async (
    req: Request
  ): Promise<IServiceResult1> => {
    try {
      // let refresh_token = req.headers["authorization"];
      let refresh_token = req.headers[
        "authorization"
      ]?.replace("Bearer", "");

      if (!refresh_token)
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: "Token Not Found",
            error: "On Logout With Token Error",
          },
        };
      else {
        let payload: any =
          Utility.decodeToken(refresh_token);

        let checkNotExistTokenForLogin =
          await TokenModel.findOne({
            user_id: new mongoose.Types.ObjectId(
              payload.user_id
            ),
            token: refresh_token,
          });
        let result = await TokenModel.deleteOne({
          user_id: new mongoose.Types.ObjectId(
            payload.user_id
          ),
          token: refresh_token,
        });

        if (
          (result && result.deletedCount > 0) ||
          !checkNotExistTokenForLogin
        ) {
          if (req.body.logoutAllDevices === true) {
            let result = await TokenModel.deleteMany({
              user_id: {
                $eq: new mongoose.Types.ObjectId(
                  payload.user_id
                ),
              },
            });
          }

          // Add Activity History
          let addHistory = await HistoryModel.create({
            user_id: payload.user_id,
            description: `logout successfully`,
            type: EHistoryActivityTypeValues.USER,
            type_id: payload._id,
          });

          return {
            status_code: HttpStatus.OK,
            data: true,
            success: true,
          };
        } else
          return {
            status_code: HttpStatus.BAD_REQUEST,
            data: {
              message: "Token Not Found",
              error: "On Logout Error",
            },
            success: false,
          };
      }
    } catch (error) {
      return {
        status_code: HttpStatus.OK,
        data: true,
        success: true,
      };
    }
  };
  changePassword = async (
    req: Request,
    model: ChangePasswordViewModel
  ): Promise<IServiceResult1> => {
    try {
      let foundUser = await UserModel.findOne({
        email: model.email.toLowerCase(),
      });
      if (!foundUser)
        return {
          success: false,
          data: {
            message: "User Not Found",
            error: "On Add Error",
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      else {
        let isAuthenticateEmployee = await bcrypt.compare(
          model.password,
          foundUser.password!
        );
        if (isAuthenticateEmployee) {
          let salt = await bcrypt.genSalt(11);
          let temp_password = await bcrypt.hash(
            model.new_password,
            salt
          );

          let updateUserPassword =
            await UserModel.updateOne(
              {
                _id: new mongoose.Types.ObjectId(
                  foundUser._id
                ),
              },
              { password: temp_password }
            );
          if (updateUserPassword.modifiedCount > 0) {
            // logout from all devices
            if (model.logOutAll === "true") {
              let logoutFromAllDevices =
                await TokenModel.deleteMany({
                  user_id: { $eq: foundUser._id },
                });
            }

            // Add Activity History
            let addHistory = await HistoryModel.create({
              user_id: foundUser._id,
              description: `password changed successfully`,
              type: EHistoryActivityTypeValues.USER,
              type_id: foundUser._id,
            });

            return {
              success: true,
              data: true,
              status_code: HttpStatus.OK,
            };
          } else
            return {
              success: false,
              data: {
                message:
                  "An Error occurred While Reset Password",
                error: "On Update Error",
              },
              status_code: HttpStatus.BAD_REQUEST,
            };
        } else
          return {
            success: false,
            data: {
              message: "Password Not Matched",
              error: "On Update Error",
            },
            status_code: HttpStatus.BAD_REQUEST,
          };
      }
    } catch (error) {
      return {
        success: false,
        data: {
          message: "Internal Server Error",
          error: "On Update Error",
        },
        status_code: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  };
  //User Section

  getUserDetails = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      // console.log(req.headers, "jiu");

      let foundUser = await UserModel.findById(
        req.params._id,
        {
          // createdAt: 0,
          // updatedAt: 0,
          // __v: 0,
          // password: 0,
          first_name: 1,
          last_name: 1,
          mobile_no: 1,
          image: 1,
          role: 1,
          email: 1,
          role_permission: 1,
        }
      ).populate([
        { path: "role", select: { _id: 0, roleTitle: 1 } },
      ]);

      if (foundUser) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: foundUser,
        };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.USER_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  getRoleList = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let foundRoleList: any;
      foundRoleList = await RoleModel.find({
        roleName: { $ne: "superadmin" },
        isDeleted: false,
      }).sort({ roleName: 1 });

      if (req.params.type === "billing") {
        foundRoleList = await RoleModel.find({
          roleName: { $ne: "superadmin" },
          isDeleted: false,
          isBillingTeam: true,
        }).sort({ roleName: 1 });
      }

      if (foundRoleList && foundRoleList.length > 0) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: foundRoleList,
        };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.ROLE_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  updateRole = async (
    req: Request,
    model: UpdateUserRoleViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let foundRole = await RoleModel.findOne({
        _id: model._id,
        // is_deleted: false,
      });
      if (foundRole) {
        let modelToSave = <DocumentType<Roles>>model;
        // modelToSave.permission = model.permission;

        // remove duplicate key pair and override first key value pair in request
        const newObj: any = {};

        for (const key in model.permission) {
          if (!newObj.hasOwnProperty(key)) {
            newObj[key] = model.permission[key];
          }
        }

        let response = await RoleModel.updateOne(
          { _id: foundRole._id },
          { $set: { permission: newObj } }
          // modelToSave
        );

        if (response && response.modifiedCount > 0) {
          // Add Activity History
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `Role details updated successfully`,
            type: EHistoryActivityTypeValues.USER,
            type_id: model._id,
          });
          // update role details in  user and patient collection associated with this role

          let updateUserCollection =
            await UserModel.updateMany(
              {
                role: new mongoose.Types.ObjectId(
                  model._id
                ),
              },
              { role_permission: model.permission }
            );

          let updatePatientCollection =
            await PatientModel.updateMany(
              {
                role: new mongoose.Types.ObjectId(
                  model._id
                ),
              },
              { role_permission: model.permission }
            );

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
              message: errorMessage.ERROR_UPDATE_USER_ROLE,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };
        }
      } else
        return {
          data: {
            message: errorMessage.ROLE_NOT_FOUND,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
        };
    } catch (error) {
      next(error);
    }
  };

  addRole = async (
    req: Request,
    model: AddUserRoleViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let modelToSave = <Roles>model;

      modelToSave.createdby_id = userDetails._id;
      let checkRoleTitleExistence = await RoleModel.findOne(
        {
          roleTitle: model.roleTitle,
        }
      );
      if (checkRoleTitleExistence)
        return {
          success: false,
          status_code: HttpStatus.BAD_REQUEST,
          data: {
            message:
              errorMessage.ROLE_TITLE_ALREADY_ASSIGNED,
            error: errorMessage.ON_ADD_ERROR,
          },
        };

      let checkRoleNameExistence = await RoleModel.findOne({
        roleName: model.roleName,
      });

      if (checkRoleNameExistence)
        return {
          success: false,
          status_code: HttpStatus.BAD_REQUEST,
          data: {
            message:
              errorMessage.ROLE_NAME_ALREADY_ASSIGNED,
            error: errorMessage.ON_ADD_ERROR,
          },
        };

      let addRoleResult = await RoleModel.create(
        modelToSave
      );
      if (addRoleResult) {
        // Add Activity History
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `Role details added successfully`,
          type: EHistoryActivityTypeValues.USER,
        });
        // update role details in  user and patient collection associated with this role

        return {
          status_code: HttpStatus.OK,
          success: true,
          data: addRoleResult,
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.ERROR_ADD_USER_ROLE,
            error: errorMessage.ON_ADD_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  getRoleDetails = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      // console.log(req.headers, "jiu");

      let foundRoleDetails = await RoleModel.findById(
        req.params._id,
        {}
      );

      if (foundRoleDetails) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: foundRoleDetails,
        };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.ROLE_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  addUser = async (
    req: Request,
    model: AddUserViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let superadminRoleDoc: any;
      let teamAdminRoleDoc: any;
      let allRoles = await RoleModel.find({});

      allRoles.forEach((x) => {
        if (x.roleName == "superadmin")
          superadminRoleDoc = x;
        else if (x.roleName == "teamadmin")
          teamAdminRoleDoc = x;
      });

      if (
        userDetails?.role!.toString() !=
          superadminRoleDoc._id.toString() &&
        userDetails?.role!.toString() !=
          teamAdminRoleDoc._id.toString()
      )
        return {
          data: {
            message: errorMessage.ADD_USER_NOT_AUTORIZED,
            error: errorMessage.ON_ADD_ERROR,
          },
          success: false,
          status_code: HttpStatus.UNAUTHORIZED,
        };
      else {
        // if login user is with teamadmin role and try to add teamadmin role user

        if (
          userDetails?.role!.toString() !==
            superadminRoleDoc._id.toString() &&
          model.role == teamAdminRoleDoc._id.toString()
        )
          return {
            data: {
              message:
                errorMessage.ADD_TEAM_ADMIN_USER_NOT_AUTORIZED,
              error: errorMessage.ON_ADD_ERROR,
            },
            success: false,
            status_code: HttpStatus.UNAUTHORIZED,
          };
        else {
          let foundUser = await UserModel.findOne({
            email: model.email.toLowerCase(),
            is_deleted: false,
          });
          if (foundUser) {
            return {
              data: {
                message:
                  errorMessage.ALREADY_ASSOCIATED_EMAIL,
                error: errorMessage.ON_ADD_ERROR,
              },
              status_code: HttpStatus.BAD_REQUEST,
              success: false,
            };
          } else {
            let modelToSave = <User>model;
            modelToSave.addedBy_id = userDetails._id;

            let salt = await bcrypt.genSalt(11);
            //auto generate 6 charatcer password if password not provided
            let temp_password = Math.round(
              Math.pow(36, 6 + 1) -
                Math.random() * Math.pow(36, 6)
            )
              .toString(36)
              .slice(1);

            let password_for_employee = model.password
              ? model.password
              : temp_password;

            let passwordToBeSave = model.password
              ? await bcrypt.hash(model.password, salt)
              : await bcrypt.hash(temp_password, salt);
            modelToSave.password = passwordToBeSave;
            modelToSave.email = model.email.toLowerCase();

            let response = await UserModel.create(
              modelToSave
            );

            // Add Activity History
            let addHistory = await HistoryModel.create({
              user_id: userDetails._id,
              description: `user added successfully`,
              type: EHistoryActivityTypeValues.USER,
              type_id: response._id,
            });

            if (response) {
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
                  message: errorMessage.ERROR_ADD_USER,
                  error: errorMessage.ON_ADD_ERROR,
                },
              };
            }
          }
        }
      }
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (
    req: Request,
    model: UpdateUserViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      console.log(req.body, "============");
      let superadminRoleDoc: any;
      let teamAdminRoleDoc: any;
      let allRoles = await RoleModel.find({});
      let specifiedRole: any;
      let clinicRoleDoc: any;

      allRoles.forEach((x) => {
        if (x.roleName == "superadmin")
          superadminRoleDoc = x;
        if (x.roleName == "teamadmin") teamAdminRoleDoc = x;
        if (x.roleName == "clinic") clinicRoleDoc = x;

        if (model.role) {
          if (x._id.toString() == model.role.toString())
            specifiedRole = x;
        }
      });

      if (model.role || model.isActive || model.isDeleted) {
        if (
          userDetails!.role!.toString() !=
            superadminRoleDoc._id.toString() &&
          model.role

          //   &&
          // userDetails?.role!.toString() !=
          //   teamAdminRoleDoc._id.toString()
        )
          return {
            data: {
              message:
                errorMessage.NOT_AUTORIZED_UPDATE_ROLE,
              error: errorMessage.ON_UPDATE_ERROR,
            },
            success: false,
            status_code: HttpStatus.UNAUTHORIZED,
          };

        if (
          userDetails!.role!.toString() !=
            superadminRoleDoc._id.toString() &&
          model.isActive
        )
          return {
            data: {
              message:
                errorMessage.NOT_AUTORIZED_UPDATE_ACTIVATE_STATUS,
              error: errorMessage.ON_UPDATE_ERROR,
            },
            success: false,
            status_code: HttpStatus.UNAUTHORIZED,
          };

        if (
          userDetails?.role!.toString() !=
            superadminRoleDoc._id.toString() &&
          model.isDeleted
        )
          return {
            data: {
              message:
                errorMessage.NOT_AUTORIZED_DELETE_STATUS,
              error: errorMessage.ON_UPDATE_ERROR,
            },
            success: false,
            status_code: HttpStatus.UNAUTHORIZED,
          };
      }

      let foundUser = await UserModel.findOne({
        _id: model._id,
        is_deleted: false,
      });
      if (foundUser) {
        let modelToSave = <User>model;

        // if (model.email) {
        //   let foundEmailEixstence = await UserModel.findOne(
        //     {
        //       email: model.email.toLowerCase(),
        //       is_deleted: false,
        //     }
        //   );
        //   if (
        //     foundEmailEixstence &&
        //     foundEmailEixstence._id.toString() !==
        //       model._id.toString()
        //   ) {
        //     return {
        //       data: {
        //         message:
        //           errorMessage.ALREADY_ASSOCIATED_EMAIL,
        //         error: errorMessage.ON_UPDATE_ERROR,
        //       },
        //       status_code: HttpStatus.BAD_REQUEST,
        //       success: false,
        //     };
        //   } else {
        //     modelToSave.email = model.email;
        //   }
        // }

        if (specifiedRole) {
          modelToSave.role = specifiedRole._id;
          modelToSave.role_permission =
            specifiedRole.permission;
        }

        modelToSave.first_name = model.first_name
          ? model.first_name
          : foundUser.first_name;
        modelToSave.last_name = model.last_name
          ? model.last_name
          : foundUser.last_name;

        modelToSave.password = foundUser.password;

        let response = await UserModel.updateOne(
          { _id: model._id },
          modelToSave
        );

        if (response && response.modifiedCount > 0) {
          // Add Activity History
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `user updated successfully`,
            type: EHistoryActivityTypeValues.USER,
            type_id: model._id,
          });
          // // if user is clinic type role then update feilds in clinic collection

          // if (
          //   foundUser.role!.toString() ===
          //     clinicRoleDoc._id.toString() &&
          //   (model.first_name || model.last_name)
          // ) {
          //   let name =
          //     model.first_name ??
          //     foundUser.first_name +
          //       " " +
          //       model.last_name ??
          //     foundUser.last_name;

          //   let updateClinicDetails =
          //     await ClinicModel.updateOne(
          //       { user_id: foundUser._id },
          //       { clinic_name: name }
          //     );
          // }
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
              message: errorMessage.ERROR_UPDATE_USER,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };
        }
      } else
        return {
          data: {
            message: errorMessage.USER_NOT_FOUND,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
        };
    } catch (error) {
      next(error);
    }
  };

  getUserList = async (
    req: Request,
    model: GetUserListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let superAdminRoleDoc = await RoleModel.findOne({
        roleName: "superadmin",
      });
      let defaultPage: number;
      let count: number;
      let populateFeilds = [
        { path: "role", select: { _id: 0, roleTitle: 1 } },
        {
          path: "addedBy_id",
          select: { _id: 0, first_name: 1, last_name: 1 },
        },
      ];

      let condition: any = {
        role: { $ne: superAdminRoleDoc!._id },
        is_deleted: false,
      };
      if (model.role) {
        condition.role = model.role;
      }
      if (model.first_name) {
        let isEmptyNameOnlySpace = /^\s*$/.test(
          model.first_name
        );

        condition.first_name = {
          $regex: model.first_name,
          $options: "i",
        };
      }
      if (!model.pageNumber && !model.pageSize) {
        defaultPage = 1;
        count = -1;

        let response = await UserModel.find(condition, {
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
          password: 0,
        })
          .populate(populateFeilds)
          .sort({ createdAt: -1 });

        if (response && response.length > 0) {
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
              message: errorMessage.USER_LIST_NOT_FOUND,
              error: errorMessage.ON_FETCH_ERROR,
            },
          };
        }
      } else if (
        model.pageNumber &&
        model.pageNumber >= 1 &&
        !model.pageSize
      ) {
        defaultPage = model.pageNumber;
        count = 50;
      } else {
        defaultPage = model.pageNumber || 1;
        count = model.pageSize || 50;
      }
      let tempResult: any;

      let result: mongoose.PaginateResult<any> =
        await UserModel.paginate(
          {
            ...condition,
            options: {
              projection: {
                createdAt: 0,
                updatedAt: 0,
                __v: 0,
                password: 0,
              },
            },
          },
          {
            page: defaultPage,
            ...(count > 0
              ? { limit: count }
              : { pagination: false }),
            populate: populateFeilds,

            sort: { createdAt: -1 },
          }
        );

      tempResult = result;

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
            message: errorMessage.USER_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  getUserListWithoutPagination = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let superAdminRoleDoc = await RoleModel.findOne({
        roleName: "superadmin",
      });

      let condition: any = {
        role: { $ne: superAdminRoleDoc!._id },
        is_deleted: false,
      };

      let response = await UserModel.find(condition, {
        first_name: 1,
        last_name: 1,
        email: 1,
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
            message: errorMessage.USER_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  forgotPassword = async (
    req: Request,
    model: ForgotPasswordViewmodel
  ): Promise<IServiceResult1> => {
    try {
      const found_user = await UserModel.findOne({
        email: model.email.toLowerCase(),
      });
      if (!found_user) {
        return {
          success: false,
          status_code: HttpStatus.BAD_REQUEST,
          data: {
            message: errorMessage.USER_NOT_FOUND,
            Error: errorMessage.ON_FETCH_ERROR,
          },
        };
      } else {
        let condition = {
          user_id: new mongoose.Types.ObjectId(
            found_user._id
          ),
          createdAt: {},
        };

        let startTime = new Date(model.currentDate);
        startTime.setHours(0, 0, 0, 0);
        let endTime = new Date(model.currentDate);
        endTime.setHours(23, 59, 59, 999);
        condition.createdAt = {
          $gte: startTime,
          $lte: endTime,
        };

        let foundAlreadyGeneratedOtp = await otpModel
          .find(condition)
          .sort({ updatedAt: -1 });

        if (
          foundAlreadyGeneratedOtp &&
          foundAlreadyGeneratedOtp.length === 3
        ) {
          return {
            success: false,
            status_code: HttpStatus.BAD_REQUEST,
            data: {
              message:
                errorMessage.LIMIT_EXCEED_TRY_AFTER_24_HOURS,
              error: errorMessage.ON_FORGOT_PASSWORD_ERROR,
            },
          };
        }

        let resetKeyValue = v4();

        let updateUserDetails = await UserModel.updateOne(
          { _id: found_user._id },
          { resetkey: resetKeyValue }
        );

        if (
          updateUserDetails &&
          updateUserDetails.modifiedCount > 0
        ) {
          let addEntryInOTP = await otpModel.create({
            user_id: found_user._id,
            otp: resetKeyValue,
          });

          // Sending email
          const printContents = {
            userId: found_user._id,
            email: found_user.email,
            userName: found_user.first_name,
            link:
              "http://192.168.1.114:3000/" +
              "reset-password/" +
              resetKeyValue,
          };
          const options = {
            to: found_user.email,
            subject: errorMessage.ForgotPasswordTitle,
          };
          const mailResponse =
            await Utility.ForgotPasswordEmail(
              options,
              printContents
            );

          if (mailResponse)
            return {
              success: true,
              status_code: HttpStatus.OK,
              data: errorMessage.LINK_SEND_TO_EMAIL,
            };
          else
            return {
              success: false,
              status_code: HttpStatus.BAD_REQUEST,
              data: {
                message: errorMessage.EMAIL_NOT_SEND,
                error:
                  errorMessage.ON_FORGOT_PASSWORD_ERROR,
              },
            };
        } else
          return {
            success: false,
            status_code: HttpStatus.BAD_REQUEST,
            data: {
              message: errorMessage.EMAIL_NOT_SEND,
              error: errorMessage.ON_FORGOT_PASSWORD_ERROR,
            },
          };
      }
    } catch (error) {
      console.log(error);
      return {
        success: false,
        status_code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {
          message: errorMessage.INTERNAL_SERVER_ERROR,
          error: errorMessage.ON_FORGOT_PASSWORD_ERROR,
        },
      };
    }
  };
  reset_forgot_password = async (
    model: ResetForgotPasswordViewmodel
  ): Promise<IServiceResult1> => {
    try {
      let found_user = await UserModel.findOne({
        // email: model.email.toLowerCase(),
        resetkey: model.reset_token,
      });

      if (found_user) {
        let salt = await bcrypt.genSalt(11);
        let new_password = await bcrypt.hash(
          model.new_password,
          salt
        );
        let result = await UserModel.updateOne(
          { email: found_user.email },
          { password: new_password }
        );
        if (result && result.modifiedCount > 0) {
          return {
            success: true,
            status_code: HttpStatus.OK,
            data: "Password Updated Successfully",
          };
        } else
          return {
            success: false,
            status_code: HttpStatus.BAD_REQUEST,
            data: {
              message: "Unbale To Update New Password",
              error: "On Update Error",
            },
          };
      } else
        return {
          success: false,
          status_code: HttpStatus.BAD_REQUEST,
          data: {
            message:
              errorMessage.NOT_AUTHORIZED_RESET_PASSWORD,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      return {
        success: false,
        status_code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {
          message: errorMessage.INTERNAL_SERVER_ERROR,
          Error: errorMessage.ON_FETCH_ERROR,
        },
      };
    }
  };

  // history section

  getUserHistoryListNew = async (
    req: Request,
    model: GetUserHistoryViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let populatedFields: any = [
        {
          path: "user_id",
          select: { first_name: 1, last_name: 1 },
        },
      ];
      let condition: any = {
        user_id: new mongoose.Types.ObjectId(
          model.user_id!.toString()
        ),
      };

      if (model.type) condition.type = model.type;

      let defaultPage = model.pageNumber
        ? model.pageNumber
        : 1;
      let count = model.pageSize ? model.pageSize : 50;

      let result: mongoose.PaginateResult<any> =
        await HistoryModel.paginate(
          {
            condition,
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
            ...(count > 0
              ? { limit: count }
              : { pagination: false }),
            populate: populatedFields,

            sort: { createdAt: -1 },
          }
        );

      console.log(condition, "foundHistory");
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
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.HISTORY_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  getUserHistoryDetails = async (
    req: Request,
    model: GetUserHistoryViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let condition: any = {
        //user_id: model._id,
      };
      let requiredModel: any;

      if (model.user_id) {
        condition.user_id = model.user_id;
      }
      if (model.type) {
        condition.type = model.type;
      }

      if (model.type_id) {
        condition.type_id = model.type_id;
      }

      let populatedFields: any = [
        {
          path: "user_id",
          select: { first_name: 1, last_name: 1 },
        },
      ];

      let foundHistory = await HistoryModel.find(condition)
        .sort({
          createdAt: -1,
        })
        .populate(populatedFields);

      if (foundHistory && foundHistory.length > 0)
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: foundHistory,
        };
      else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.HISTORY_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };
}
export default new UserServices();
