import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, {
  ValidationResult,
} from "../../../v1/common/common-methods";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddWaitingListViewmodel,
  GetWaitingListViewmodel,
  UpdateWaitingListViewmodel,
} from "../../view-models/waitingList";

import waititngListService from "./waitingList.service";

class WaitingList_Controller {
  addWaitingList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          AddWaitingListViewmodel,
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
        let model: AddWaitingListViewmodel =
          conversionResult.data as AddWaitingListViewmodel;

        let addWaitingListResult =
          await waititngListService.addWaitingList(
            req,
            model,
            next
          );

        if (addWaitingListResult)
          return res
            .status(addWaitingListResult.status_code)
            .json({
              status_code: addWaitingListResult.status_code,
              success: addWaitingListResult.success,

              ...(addWaitingListResult.success
                ? { data: addWaitingListResult.data }
                : {
                    ...(addWaitingListResult.success
                      ? { data: addWaitingListResult.data }
                      : {
                          errors: addWaitingListResult.data,
                        }),
                  }),
            });
      }
    } catch (error) {
      next(error);
    }
  };

  updateWaitingList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          UpdateWaitingListViewmodel,
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
        let model: UpdateWaitingListViewmodel =
          conversionResult.data as UpdateWaitingListViewmodel;

        let updateWaitingListResult =
          await waititngListService.updateWaitingList(
            req,
            model,
            next
          );

        if (updateWaitingListResult)
          return res
            .status(updateWaitingListResult.status_code)
            .json({
              status_code:
                updateWaitingListResult.status_code,
              success: updateWaitingListResult.success,

              ...(updateWaitingListResult.success
                ? { data: updateWaitingListResult.data }
                : {
                    ...(updateWaitingListResult.success
                      ? {
                          data: updateWaitingListResult.data,
                        }
                      : {
                          errors:
                            updateWaitingListResult.data,
                        }),
                  }),
            });
      }
    } catch (error) {
      next(error);
    }
  };
  // deleteSkill = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
  //       CheckMongoIdViewmodel,
  //       JSON.parse(`{"_id":"${req.params._id}"}`)
  //     );

  //     if (conversionResult.error && conversionResult.error.length > 0) {
  //       return res.status(HttpStatus.BAD_REQUEST).send({
  //         status_code: HttpStatus.BAD_REQUEST,
  //         success: false,
  //         errors: conversionResult.error[0],
  //       });
  //     } else {
  //       let model: CheckMongoIdViewmodel =
  //         conversionResult.data as CheckMongoIdViewmodel;

  //       let deleteSkillResult = await skillService.deleteSkill(
  //         req,
  //         model,
  //         next
  //       );

  //       if (deleteSkillResult)
  //         return res.status(deleteSkillResult.status_code).json({
  //           status_code: deleteSkillResult.status_code,
  //           success: deleteSkillResult.success,

  //           ...(deleteSkillResult.success
  //             ? { data: deleteSkillResult.data }
  //             : {
  //                 ...(deleteSkillResult.success
  //                   ? { data: deleteSkillResult.data }
  //                   : { errors: deleteSkillResult.data }),
  //               }),
  //         });
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // };
  getWaitingList = async (
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
        let model: CheckMongoIdViewmodel =
          conversionResult.data as CheckMongoIdViewmodel;

        let getWaitingListResult =
          await waititngListService.getWaitingList(
            req,
            model,
            next
          );

        if (getWaitingListResult)
          return res
            .status(getWaitingListResult.status_code)
            .json({
              status_code: getWaitingListResult.status_code,
              success: getWaitingListResult.success,

              ...(getWaitingListResult.success
                ? { data: getWaitingListResult.data }
                : {
                    ...(getWaitingListResult.success
                      ? { data: getWaitingListResult.data }
                      : {
                          errors: getWaitingListResult.data,
                        }),
                  }),
            });
      }
    } catch (error) {
      next(error);
    }
  };
  listWaitingList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          GetWaitingListViewmodel,
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
        let model: GetWaitingListViewmodel =
          conversionResult.data as GetWaitingListViewmodel;

        let listWaitingListResult =
          await waititngListService.listWaitingList(
            req,
            model,
            next
          );

        if (listWaitingListResult)
          return res
            .status(listWaitingListResult.status_code)
            .json({
              status_code:
                listWaitingListResult.status_code,
              success: listWaitingListResult.success,

              ...(listWaitingListResult.success
                ? { data: listWaitingListResult.data }
                : {
                    ...(listWaitingListResult.success
                      ? { data: listWaitingListResult.data }
                      : {
                          errors:
                            listWaitingListResult.data,
                        }),
                  }),
            });
      }
    } catch (error) {
      next(error);
    }
  };
  getPatientWaitingDataToExcel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          GetWaitingListViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetWaitingListViewmodel =
          conversionResult.data as GetWaitingListViewmodel;

        let exportWaitingListResult =
          await waititngListService.getPatientWaitingDataToExcel(
            req,
            model,
            next
          );

        if (exportWaitingListResult)
          return res.status(HttpStatus.OK).json({
            status_code:
              exportWaitingListResult.status_code,
            success: exportWaitingListResult.success,

            ...(exportWaitingListResult.success
              ? { data: exportWaitingListResult.data }
              : {
                  ...(exportWaitingListResult.success
                    ? {
                        data: exportWaitingListResult.data,
                      }
                    : {
                        errors:
                          exportWaitingListResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new WaitingList_Controller();
