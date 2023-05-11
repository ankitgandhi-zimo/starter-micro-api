import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, {
  ValidationResult,
} from "../../../v1/common/common-methods";
import {
  ForgotPasswordViewmodel,
  LoginViewmodel,
  ResetForgotPasswordViewmodel,
} from "../../view-models/auth";
import { ChangePasswordViewModel } from "../../view-models/auth/change_password.viewmodel";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddUserRoleViewmodel,
  AddUserViewmodel,
  GetUserHistoryViewmodel,
  GetUserListViewmodel,
  UpdateUserRoleViewmodel,
  UpdateUserViewmodel,
} from "../../view-models/user";

import userService from "./user.service";

class User_Controller {
  // //LOGIN
  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          LoginViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: LoginViewmodel =
          conversionResult.data as LoginViewmodel;

        let loginResult = await userService.login(
          req,
          model,
          next
        );

        if (loginResult)
          return res.status(loginResult.status_code).json({
            status_code: loginResult.status_code,
            success: loginResult.success,

            ...(loginResult.success
              ? { data: loginResult.data }
              : {
                  ...(loginResult.success
                    ? { data: loginResult.data }
                    : { errors: loginResult.data }),
                }),
          });

        // if (loginResult && loginResult.status_code === HttpStatus.OK)
        //   return res.status(loginResult.status_code).json({
        //     status_code: loginResult.status_code,
        //     success: true,
        //     data: loginResult.data,
        //   });
        // else
        //   return res.status(loginResult.status_code).json({
        //     status_code: loginResult.status_code,

        //     success: false,
        //     error: loginResult.data,
        //   });
      }
    } catch (error) {
      next(error);
    }
  };

  changePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          ChangePasswordViewModel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let model: ChangePasswordViewModel =
          conversionResult.data as ChangePasswordViewModel;

        let resetpasswordResult =
          await userService.changePassword(req, model);

        if (resetpasswordResult)
          return res.status(200).json({
            status_code: resetpasswordResult.status_code,
            success: resetpasswordResult.success,
            ...(resetpasswordResult.success
              ? {
                  data: resetpasswordResult.data,
                  totalDocs:
                    resetpasswordResult.data.totalDocs,
                  pageNumber:
                    resetpasswordResult.data.pageNumber,
                  pageSize:
                    resetpasswordResult.data.pageSize,
                  totalPages:
                    resetpasswordResult.data.totalPages,
                }
              : { errors: resetpasswordResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  forgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          ForgotPasswordViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let model: ForgotPasswordViewmodel =
          conversionResult.data as ForgotPasswordViewmodel;

        let forgotpasswordResult =
          await userService.forgotPassword(req, model);
        if (
          forgotpasswordResult &&
          forgotpasswordResult.status_code === HttpStatus.OK
        )
          return res.status(200).json({
            status_code: forgotpasswordResult.status_code,
            success: true,
            data: forgotpasswordResult.data,
          });
        else
          return res.status(200).json({
            status_code: forgotpasswordResult.status_code,

            success: false,
            errors: forgotpasswordResult.data,
          });
      }
    } catch (error) {
      next(error);
    }
  };

  reset_forgot_password = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          ResetForgotPasswordViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let model: ResetForgotPasswordViewmodel =
          conversionResult.data as ResetForgotPasswordViewmodel;

        let forgotpasswordResult =
          await userService.reset_forgot_password(model);
        if (
          forgotpasswordResult &&
          forgotpasswordResult.status_code === HttpStatus.OK
        )
          return res.status(200).json({
            status_code: forgotpasswordResult.status_code,
            success: true,
            data: forgotpasswordResult.data,
          });
        else
          return res.status(200).json({
            status_code: forgotpasswordResult.status_code,

            success: false,
            errors: forgotpasswordResult.data,
          });
      }
    } catch (error) {
      next(error);
    }
  };

  logout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let logOutResult = await userService.logout(req);

      if (logOutResult)
        return res.status(200).json({
          status_code: logOutResult.status_code,
          success: logOutResult.success,
          ...(logOutResult.success
            ? {
                data: logOutResult.data,
                totalDocs: logOutResult.data.totalDocs,
                pageNumber: logOutResult.data.pageNumber,
                pageSize: logOutResult.data.pageSize,
                totalPages: logOutResult.data.totalPages,
              }
            : { errors: logOutResult.data }),
        });
    } catch (error) {
      next(error);
    }
  };

  //User Section
  public addUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          AddUserViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddUserViewmodel =
          conversionResult.data as AddUserViewmodel;

        let userResult = await userService.addUser(
          req,
          model,
          next
        );
        if (userResult)
          return res.status(200).json({
            status_code: userResult.status_code,
            success: userResult.success,

            ...(userResult.success
              ? { data: userResult.data }
              : {
                  ...(userResult.success
                    ? { data: userResult.data }
                    : { errors: userResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          UpdateUserViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateUserViewmodel =
          conversionResult.data as UpdateUserViewmodel;

        let userResult = await userService.updateUser(
          req,
          model,
          next
        );
        if (userResult)
          return res.status(userResult.status_code).json({
            status_code: userResult.status_code,
            success: userResult.success,

            ...(userResult.success
              ? { data: userResult.data }
              : {
                  ...(userResult.success
                    ? { data: userResult.data }
                    : { errors: userResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getUserList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult =
        await Utility.ValidateAndConvert(
          GetUserListViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetUserListViewmodel =
          conversionResult.data as GetUserListViewmodel;

        let userListResult = await userService.getUserList(
          req,
          model,
          next
        );
        if (userListResult)
          return res.status(200).json({
            status_code: userListResult.status_code,
            success: userListResult.success,
            ...(userListResult.success
              ? {
                  data: userListResult.data.data,
                  totalDocs: userListResult.data.totalDocs,
                  pageNumber:
                    userListResult.data.pageNumber,
                  pageSize: userListResult.data.pageSize,
                  totalPages:
                    userListResult.data.totalPages,
                }
              : { errors: userListResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getUserListWithoutPagination = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let userListResult =
        await userService.getUserListWithoutPagination(
          req,

          next
        );
      if (userListResult)
        return res.status(userListResult.status_code).json({
          status_code: userListResult.status_code,
          success: userListResult.success,
          ...(userListResult.success
            ? {
                data: userListResult.data.data,
                totalDocs: userListResult.data.totalDocs,
                pageNumber: userListResult.data.pageNumber,
                pageSize: userListResult.data.pageSize,
                totalPages: userListResult.data.totalPages,
              }
            : { errors: userListResult.data }),
        });
    } catch (error) {
      next(error);
    }
  };

  public getUserDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          CheckMongoIdViewmodel,
          JSON.parse(`{"_id":"${req.params._id}"}`)
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let userDetailResult =
          await userService.getUserDetails(req, next);
        if (userDetailResult)
          return res.status(200).json({
            status_code: userDetailResult.status_code,
            success: userDetailResult.success,
            ...(userDetailResult.success
              ? { data: userDetailResult.data }
              : { errors: userDetailResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getRoleDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          CheckMongoIdViewmodel,
          JSON.parse(`{"_id":"${req.params._id}"}`)
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let roleDetailResult =
          await userService.getRoleDetails(req, next);
        if (roleDetailResult)
          return res.status(200).json({
            status_code: roleDetailResult.status_code,
            success: roleDetailResult.success,
            ...(roleDetailResult.success
              ? { data: roleDetailResult.data }
              : { errors: roleDetailResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  //Role Section
  public getRoleList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let roleList = await userService.getRoleList(
        req,
        next
      );
      if (roleList)
        return res.status(200).json({
          status_code: roleList.status_code,
          success: roleList.success,
          ...(roleList.success
            ? {
                data: roleList.data,
                totalDocs: roleList.data.totalDocs,
                pageNumber: roleList.data.pageNumber,
                pageSize: roleList.data.pageSize,
                totalPages: roleList.data.totalPages,
              }
            : { errors: roleList.data }),
        });
    } catch (error) {
      next(error);
    }
  };

  public addRole = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          AddUserRoleViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddUserRoleViewmodel =
          conversionResult.data as AddUserRoleViewmodel;

        let userRoleResult = await userService.addRole(
          req,
          model,
          next
        );
        if (userRoleResult)
          return res.status(200).json({
            status_code: userRoleResult.status_code,
            success: userRoleResult.success,

            ...(userRoleResult.success
              ? { data: userRoleResult.data }
              : {
                  ...(userRoleResult.success
                    ? { data: userRoleResult.data }
                    : { errors: userRoleResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  public updateRole = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          UpdateUserRoleViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateUserRoleViewmodel =
          conversionResult.data as UpdateUserRoleViewmodel;

        let userRoleResult = await userService.updateRole(
          req,
          model,
          next
        );
        if (userRoleResult)
          return res.status(200).json({
            status_code: userRoleResult.status_code,
            success: userRoleResult.success,

            ...(userRoleResult.success
              ? { data: userRoleResult.data }
              : {
                  ...(userRoleResult.success
                    ? { data: userRoleResult.data }
                    : { errors: userRoleResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  // history section
  public getUserHistoryDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          GetUserHistoryViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetUserHistoryViewmodel =
          conversionResult.data as GetUserHistoryViewmodel;
        let userHistoryDetailslResult =
          await userService.getUserHistoryDetails(
            req,
            model,
            next
          );
        if (userHistoryDetailslResult)
          return res.status(200).json({
            status_code:
              userHistoryDetailslResult.status_code,
            success: userHistoryDetailslResult.success,

            ...(userHistoryDetailslResult.success
              ? { data: userHistoryDetailslResult.data }
              : {
                  ...(userHistoryDetailslResult.success
                    ? {
                        data: userHistoryDetailslResult.data,
                      }
                    : {
                        errors:
                          userHistoryDetailslResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new User_Controller();
