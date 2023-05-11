import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../common/common-methods";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddClinicInGroupViewmodel,
  AddGroupViewmodel,
  DeleteClinicFromGroupViewmodel,
  GetClinicGroupListViewmodel,
} from "../../view-models/groups";

import groupServices from "./group.service";

class Group_Controller {
  public addGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddGroupViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddGroupViewmodel =
          conversionResult.data as AddGroupViewmodel;

        let groupResult = await groupServices.addGroup(req, model, next);
        if (groupResult)
          return res.status(200).json({
            status_code: groupResult.status_code,
            success: groupResult.success,

            ...(groupResult.success
              ? { data: groupResult.data }
              : {
                  ...(groupResult.success
                    ? { data: groupResult.data }
                    : { errors: groupResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getGroupDetails = async (
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
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let groupDetailResult = await groupServices.getGroupDetails(req, next);
        if (groupDetailResult)
          return res.status(200).json({
            status_code: groupDetailResult.status_code,
            success: groupDetailResult.success,
            ...(groupDetailResult.success
              ? { data: groupDetailResult.data }
              : { errors: groupDetailResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public deleteGroupDetails = async (
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
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let groupDeletionResult = await groupServices.deleteGroupDetails(
          req,
          next
        );
        if (groupDeletionResult)
          return res.status(200).json({
            status_code: groupDeletionResult.status_code,
            success: groupDeletionResult.success,
            ...(groupDeletionResult.success
              ? { data: groupDeletionResult.data }
              : { errors: groupDeletionResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getGroupList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetClinicGroupListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetClinicGroupListViewmodel =
          conversionResult.data as GetClinicGroupListViewmodel;

        let groupListResult = await groupServices.getGroupList(
          req,
          model,
          next
        );

        if (groupListResult)
          return res.status(200).json({
            status_code: groupListResult.status_code,
            success: groupListResult.success,
            ...(groupListResult.success
              ? {
                  data: groupListResult.data.data,
                  totalDocs: groupListResult.data.totalDocs,
                  pageNumber: groupListResult.data.pageNumber,
                  pageSize: groupListResult.data.pageSize,
                  totalPages: groupListResult.data.totalPages,
                }
              : { errors: groupListResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  public getGroupListWithoutPagination = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let groupListResult = await groupServices.getGroupListWithoutPagination(
        req,

        next
      );

      if (groupListResult)
        return res.status(200).json({
          status_code: groupListResult.status_code,
          success: groupListResult.success,
          ...(groupListResult.success
            ? {
                data: groupListResult.data.data,
                totalDocs: groupListResult.data.totalDocs,
                pageNumber: groupListResult.data.pageNumber,
                pageSize: groupListResult.data.pageSize,
                totalPages: groupListResult.data.totalPages,
              }
            : { errors: groupListResult.data }),
        });
    } catch (error) {
      next(error);
    }
  };

  // clinic association in group

  public addClinicInGroup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddClinicInGroupViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddClinicInGroupViewmodel =
          conversionResult.data as AddClinicInGroupViewmodel;

        let groupResult = await groupServices.addClinicInGroup(
          req,
          model,
          next
        );
        if (groupResult)
          return res.status(200).json({
            status_code: groupResult.status_code,
            success: groupResult.success,

            ...(groupResult.success
              ? { data: groupResult.data }
              : {
                  ...(groupResult.success
                    ? { data: groupResult.data }
                    : { errors: groupResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public unGroupClinicFromGroup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        DeleteClinicFromGroupViewmodel,
        req.body
      );
      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: DeleteClinicFromGroupViewmodel =
          conversionResult.data as DeleteClinicFromGroupViewmodel;
        let groupDetailResult = await groupServices.unGroupClinicFromGroup(
          req,
          model,
          next
        );
        if (groupDetailResult)
          return res.status(200).json({
            status_code: groupDetailResult.status_code,
            success: groupDetailResult.success,
            ...(groupDetailResult.success
              ? { data: groupDetailResult.data }
              : { errors: groupDetailResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default new Group_Controller();
