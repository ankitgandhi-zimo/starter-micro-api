import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../../v1/common/common-methods";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddSkillViewmodel,
  UpdateSkillViewmodel,
  GetSkillListViewmodel,
} from "../../view-models/skill";

import skillService from "./skill.service";

class Skill_Controller {
  addSkill = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddSkillViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddSkillViewmodel =
          conversionResult.data as AddSkillViewmodel;

        let addSkillResult = await skillService.addSkill(req, model, next);

        if (addSkillResult)
          return res.status(200).json({
            status_code: addSkillResult.status_code,
            success: addSkillResult.success,

            ...(addSkillResult.success
              ? { data: addSkillResult.data }
              : {
                  ...(addSkillResult.success
                    ? { data: addSkillResult.data }
                    : { errors: addSkillResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  updateSkill = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateSkillViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateSkillViewmodel =
          conversionResult.data as UpdateSkillViewmodel;

        let addSkillResult = await skillService.updateSkill(req, model, next);

        if (addSkillResult)
          return res.status(200).json({
            status_code: addSkillResult.status_code,
            success: addSkillResult.success,

            ...(addSkillResult.success
              ? { data: addSkillResult.data }
              : {
                  ...(addSkillResult.success
                    ? { data: addSkillResult.data }
                    : { errors: addSkillResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  deleteSkill = async (req: Request, res: Response, next: NextFunction) => {
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

        let deleteSkillResult = await skillService.deleteSkill(
          req,
          model,
          next
        );

        if (deleteSkillResult)
          return res.status(200).json({
            status_code: deleteSkillResult.status_code,
            success: deleteSkillResult.success,

            ...(deleteSkillResult.success
              ? { data: deleteSkillResult.data }
              : {
                  ...(deleteSkillResult.success
                    ? { data: deleteSkillResult.data }
                    : { errors: deleteSkillResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  getSkill = async (req: Request, res: Response, next: NextFunction) => {
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

        let getSkillResult = await skillService.getSkill(req, model, next);

        if (getSkillResult)
          return res.status(200).json({
            status_code: getSkillResult.status_code,
            success: getSkillResult.success,

            ...(getSkillResult.success
              ? { data: getSkillResult.data }
              : {
                  ...(getSkillResult.success
                    ? { data: getSkillResult.data }
                    : { errors: getSkillResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  listSkill = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetSkillListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetSkillListViewmodel =
          conversionResult.data as GetSkillListViewmodel;

        let listSkillResult = await skillService.listSkill(req, model, next);

        if (listSkillResult)
          return res.status(200).json({
            status_code: listSkillResult.status_code,
            success: listSkillResult.success,

            ...(listSkillResult.success
              ? { data: listSkillResult.data }
              : {
                  ...(listSkillResult.success
                    ? { data: listSkillResult.data }
                    : { errors: listSkillResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  filterListSkill = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetSkillListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetSkillListViewmodel =
          conversionResult.data as GetSkillListViewmodel;

        let listSkillResult = await skillService.filterListSkill(
          req,
          model,
          next
        );

        if (listSkillResult)
          return res.status(200).json({
            status_code: listSkillResult.status_code,
            success: listSkillResult.success,

            ...(listSkillResult.success
              ? { data: listSkillResult.data }
              : {
                  ...(listSkillResult.success
                    ? { data: listSkillResult.data }
                    : { errors: listSkillResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new Skill_Controller();
