import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, {
  ValidationResult,
} from "../../../common/common-methods";
import { CheckMongoIdViewmodel } from "../../../view-models/check_mongo_id.viewmodel";
import {
  AddModifierViewmodel,
  GetModifierListViewmodel,
  UpdateModifierViewmodel,
} from "../../../view-models/modifier";
import modifierService from "./modifier.service";
class Modifier_Controller {
  addModifier = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          AddModifierViewmodel,
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
        let model: AddModifierViewmodel =
          conversionResult.data as AddModifierViewmodel;

        let addResult = await modifierService.addModifier(
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

  updateModifier = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          UpdateModifierViewmodel,
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
        let model: UpdateModifierViewmodel =
          conversionResult.data as UpdateModifierViewmodel;

        let updateResult =
          await modifierService.updateModifier(
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
  deleteModifier = async (
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
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: CheckMongoIdViewmodel =
          conversionResult.data as CheckMongoIdViewmodel;

        let deleteResult =
          await modifierService.deleteModifier(
            req,
            model,
            next
          );

        if (deleteResult)
          return res.status(200).json({
            status_code: deleteResult.status_code,
            success: deleteResult.success,

            ...(deleteResult.success
              ? { data: deleteResult.data }
              : {
                  ...(deleteResult.success
                    ? { data: deleteResult.data }
                    : { errors: deleteResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  getModifier = async (
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
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: CheckMongoIdViewmodel =
          conversionResult.data as CheckMongoIdViewmodel;

        let getResult = await modifierService.getModifier(
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
  listModifier = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          GetModifierListViewmodel,
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
        let model: GetModifierListViewmodel =
          conversionResult.data as GetModifierListViewmodel;

        let listResult = await modifierService.listModifier(
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

  getModifierDataToExcel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          GetModifierListViewmodel,
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
        let model: GetModifierListViewmodel =
          conversionResult.data as GetModifierListViewmodel;

        let exportResult =
          await modifierService.getModifierDataToExcel(
            req,
            model,
            next
          );

        if (exportResult)
          return res.status(200).json({
            status_code: exportResult.status_code,
            success: exportResult.success,

            ...(exportResult.success
              ? { data: exportResult.data }
              : {
                  ...(exportResult.success
                    ? { data: exportResult.data }
                    : { errors: exportResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  // filterListCptCode = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) => {
  //   try {
  //     let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
  //       GetCptCodeListViewmodel,
  //       req.body
  //     );

  //     if (conversionResult.error && conversionResult.error.length > 0) {
  //       return res.status(HttpStatus.BAD_REQUEST).send({
  //         status_code: HttpStatus.BAD_REQUEST,
  //         success: false,
  //         errors: conversionResult.error[0],
  //       });
  //     } else {
  //       let model: GetCptCodeListViewmodel =
  //         conversionResult.data as GetCptCodeListViewmodel;

  //       let listCodeResult = await cptCodeService.filterListCptCode(
  //         req,
  //         model,
  //         next
  //       );

  //       if (listCodeResult)
  //         return res.status(listCodeResult.status_code).json({
  //           status_code: listCodeResult.status_code,
  //           success: listCodeResult.success,

  //           ...(listCodeResult.success
  //             ? { data: listCodeResult.data }
  //             : {
  //                 ...(listCodeResult.success
  //                   ? { data: listCodeResult.data }
  //                   : { errors: listCodeResult.data }),
  //               }),
  //         });
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}
export default new Modifier_Controller();
