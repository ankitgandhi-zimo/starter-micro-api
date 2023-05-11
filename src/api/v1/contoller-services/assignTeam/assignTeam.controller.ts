import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../../v1/common/common-methods";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddAssignTeamViewmodel,
  UpdateAssignTeamViewmodel,
  GetAssignTeamListViewmodel,
} from "../../view-models/assignTeam";

import assignTeamService from "./assignTeam.service";

class AssignTeam_Controller {
  addAssignTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddAssignTeamViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddAssignTeamViewmodel =
          conversionResult.data as AddAssignTeamViewmodel;

        let addResult = await assignTeamService.addAssignTeam(req, model, next);

        if (addResult)
          return res.status(addResult.status_code).json({
            status_code: addResult.status_code,
            success: addResult.success,

            ...(addResult.success
              ? { data: addResult.data }
              : {
                  ...(addResult.success
                    ? { data: addResult.data }
                    : { errors: addResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  updateAssignTeam = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateAssignTeamViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateAssignTeamViewmodel =
          conversionResult.data as UpdateAssignTeamViewmodel;

        let updateResult = await assignTeamService.updateAssignTeam(
          req,
          model,
          next
        );

        if (updateResult)
          return res.status(updateResult.status_code).json({
            status_code: updateResult.status_code,
            success: updateResult.success,

            ...(updateResult.success
              ? { data: updateResult.data }
              : {
                  ...(updateResult.success
                    ? { data: updateResult.data }
                    : { errors: updateResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  deleteAssignTeam = async (
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
        let model: CheckMongoIdViewmodel =
          conversionResult.data as CheckMongoIdViewmodel;

        let deleteResult = await assignTeamService.deleteAssignTeam(
          req,
          model,
          next
        );

        if (deleteResult)
          return res.status(deleteResult.status_code).json({
            status_code: deleteResult.status_code,
            success: deleteResult.success,
            ...(deleteResult.success
              ? { data: deleteResult.data }
              : { errors: deleteResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  getAssignTeam = async (req: Request, res: Response, next: NextFunction) => {
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
        let model: CheckMongoIdViewmodel =
          conversionResult.data as CheckMongoIdViewmodel;

        let getResult = await assignTeamService.getAssignTeam(req, model, next);

        if (getResult)
          return res.status(getResult.status_code).json({
            status_code: getResult.status_code,
            success: getResult.success,

            ...(getResult.success
              ? { data: getResult.data }
              : {
                  ...(getResult.success
                    ? { data: getResult.data }
                    : { errors: getResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  listAssignTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetAssignTeamListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetAssignTeamListViewmodel =
          conversionResult.data as GetAssignTeamListViewmodel;

        let listAssignTeamResult = await assignTeamService.listAssignTeam(
          req,
          model,
          next
        );

        if (listAssignTeamResult)
          return res.status(listAssignTeamResult.status_code).json({
            status_code: listAssignTeamResult.status_code,
            success: listAssignTeamResult.success,

            ...(listAssignTeamResult.success
              ? { data: listAssignTeamResult.data }
              : {
                  ...(listAssignTeamResult.success
                    ? { data: listAssignTeamResult.data }
                    : { errors: listAssignTeamResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new AssignTeam_Controller();
