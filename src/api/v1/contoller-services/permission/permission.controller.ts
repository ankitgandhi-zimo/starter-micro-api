import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../../v1/common/common-methods";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddPermissionViewmodel,
  UpdatePermissionViewmodel,
  GetPermissionListViewmodel,
  UpdateUserPermissionViewmodel,
} from "../../view-models/permission";

import permissionService from "./permission.service";

class Permission_Controller {
  addPermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddPermissionViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddPermissionViewmodel =
          conversionResult.data as AddPermissionViewmodel;

        let addPermissionResult = await permissionService.addPermission(
          req,
          model,
          next
        );

        if (addPermissionResult)
          return res.status(addPermissionResult.status_code).json({
            status_code: addPermissionResult.status_code,
            success: addPermissionResult.success,

            ...(addPermissionResult.success
              ? { data: addPermissionResult.data }
              : {
                  ...(addPermissionResult.success
                    ? { data: addPermissionResult.data }
                    : { errors: addPermissionResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  updatePermission = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdatePermissionViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdatePermissionViewmodel =
          conversionResult.data as UpdatePermissionViewmodel;

        let updatePermissionResult = await permissionService.updatePermission(
          req,
          model,
          next
        );

        if (updatePermissionResult)
          return res.status(updatePermissionResult.status_code).json({
            status_code: updatePermissionResult.status_code,
            success: updatePermissionResult.success,

            ...(updatePermissionResult.success
              ? { data: updatePermissionResult.data }
              : {
                  ...(updatePermissionResult.success
                    ? { data: updatePermissionResult.data }
                    : { errors: updatePermissionResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  deletePermission = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        CheckMongoIdViewmodel,
        JSON.parse(`{"_id":"${req.params._id}"}`)
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: CheckMongoIdViewmodel =
          conversionResult.data as CheckMongoIdViewmodel;

        let deletePermissionResult = await permissionService.deletePermission(
          req,
          model,
          next
        );

        if (deletePermissionResult)
          return res.status(deletePermissionResult.status_code).json({
            status_code: deletePermissionResult.status_code,
            success: deletePermissionResult.success,

            ...(deletePermissionResult.success
              ? { data: deletePermissionResult.data }
              : {
                  ...(deletePermissionResult.success
                    ? { data: deletePermissionResult.data }
                    : { errors: deletePermissionResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  getPermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        CheckMongoIdViewmodel,
        JSON.parse(`{"_id":"${req.params._id}"}`)
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: CheckMongoIdViewmodel =
          conversionResult.data as CheckMongoIdViewmodel;

        let getPermissionResult = await permissionService.getPermission(
          req,
          model,
          next
        );

        if (getPermissionResult)
          return res.status(getPermissionResult.status_code).json({
            status_code: getPermissionResult.status_code,
            success: getPermissionResult.success,

            ...(getPermissionResult.success
              ? { data: getPermissionResult.data }
              : {
                  ...(getPermissionResult.success
                    ? { data: getPermissionResult.data }
                    : { errors: getPermissionResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  listPermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetPermissionListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetPermissionListViewmodel =
          conversionResult.data as GetPermissionListViewmodel;

        let listPermissionResult = await permissionService.listPermission(
          req,
          model,
          next
        );

        if (listPermissionResult)
          return res.status(listPermissionResult.status_code).json({
            status_code: listPermissionResult.status_code,
            success: listPermissionResult.success,

            ...(listPermissionResult.success
              ? { data: listPermissionResult.data }
              : {
                  ...(listPermissionResult.success
                    ? { data: listPermissionResult.data }
                    : { errors: listPermissionResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  updateUserPermission = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateUserPermissionViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateUserPermissionViewmodel =
          conversionResult.data as UpdateUserPermissionViewmodel;

        let updatePermissionResult =
          await permissionService.updateUserPermission(req, model, next);

        if (updatePermissionResult)
          return res.status(updatePermissionResult.status_code).json({
            status_code: updatePermissionResult.status_code,
            success: updatePermissionResult.success,

            ...(updatePermissionResult.success
              ? { data: updatePermissionResult.data }
              : {
                  ...(updatePermissionResult.success
                    ? { data: updatePermissionResult.data }
                    : { errors: updatePermissionResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new Permission_Controller();
