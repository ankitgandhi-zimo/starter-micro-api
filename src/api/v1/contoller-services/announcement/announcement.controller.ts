import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../../v1/common/common-methods";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddAnnouncementViewmodel,
  UpdateAnnouncementViewmodel,
  GetAnnouncementListViewmodel,
} from "../../view-models/announcement";

import announcementService from "./announcement.service";

class Announcement_Controller {
  addAnnouncement = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddAnnouncementViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddAnnouncementViewmodel =
          conversionResult.data as AddAnnouncementViewmodel;

        let addResult = await announcementService.addAnnouncement(
          req,
          model,
          next
        );

        if (addResult)
          return res.status(200).json({
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
  updateAnnouncement = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateAnnouncementViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateAnnouncementViewmodel =
          conversionResult.data as UpdateAnnouncementViewmodel;

        let updateResult = await announcementService.updateAnnouncement(
          req,
          model,
          next
        );

        if (updateResult)
          return res.status(200).json({
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

  getAnnouncement = async (req: Request, res: Response, next: NextFunction) => {
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

        let getResult = await announcementService.getAnnouncement(
          req,
          model,
          next
        );

        if (getResult)
          return res.status(200).json({
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
  listAnnouncement = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetAnnouncementListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetAnnouncementListViewmodel =
          conversionResult.data as GetAnnouncementListViewmodel;

        let listResult = await announcementService.listAnnouncement(
          req,
          model,
          next
        );

        if (listResult)
          return res.status(200).json({
            status_code: listResult.status_code,
            success: listResult.success,

            ...(listResult.success
              ? { data: listResult.data }
              : {
                  ...(listResult.success
                    ? { data: listResult.data }
                    : { errors: listResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new Announcement_Controller();
