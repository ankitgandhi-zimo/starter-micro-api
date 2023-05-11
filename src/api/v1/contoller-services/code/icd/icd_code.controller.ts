import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, {
  ValidationResult,
} from "../../../common/common-methods";
import { CheckMongoIdViewmodel } from "../../../view-models/check_mongo_id.viewmodel";
import {
  AddIcdCodeViewmodel,
  GetIcdCodeListViewmodel,
  UpdateIcdCodeViewmodel,
} from "../../../view-models/icd_code";
import icdCodeService from "./icd_code.service";
class IcdCode_Controller {
  addIcdCode = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          AddIcdCodeViewmodel,
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
        let model: AddIcdCodeViewmodel =
          conversionResult.data as AddIcdCodeViewmodel;

        let addCodeResult = await icdCodeService.addIcdCode(
          req,
          model,
          next
        );

        if (addCodeResult)
          return res.status(200).json({
            status_code: addCodeResult.status_code,
            success: addCodeResult.success,

            ...(addCodeResult.success
              ? { data: addCodeResult.data }
              : {
                  ...(addCodeResult.success
                    ? { data: addCodeResult.data }
                    : { errors: addCodeResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  updateIcdCode = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          UpdateIcdCodeViewmodel,
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
        let model: UpdateIcdCodeViewmodel =
          conversionResult.data as UpdateIcdCodeViewmodel;

        let updateIcdCodeResult =
          await icdCodeService.updateIcdCode(
            req,
            model,
            next
          );

        if (updateIcdCodeResult)
          return res.status(200).json({
            status_code: updateIcdCodeResult.status_code,
            success: updateIcdCodeResult.success,

            ...(updateIcdCodeResult.success
              ? { data: updateIcdCodeResult.data }
              : {
                  ...(updateIcdCodeResult.success
                    ? { data: updateIcdCodeResult.data }
                    : { errors: updateIcdCodeResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  deleteIcdCode = async (
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

        let deleteCptCodeResult =
          await icdCodeService.deleteIcdCode(
            req,
            model,
            next
          );

        if (deleteCptCodeResult)
          return res.status(200).json({
            status_code: deleteCptCodeResult.status_code,
            success: deleteCptCodeResult.success,

            ...(deleteCptCodeResult.success
              ? { data: deleteCptCodeResult.data }
              : {
                  ...(deleteCptCodeResult.success
                    ? { data: deleteCptCodeResult.data }
                    : { errors: deleteCptCodeResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  getIcdCode = async (
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

        let getIcdCodeResult =
          await icdCodeService.getIcdCode(req, model, next);

        if (getIcdCodeResult)
          return res.status(200).json({
            status_code: getIcdCodeResult.status_code,
            success: getIcdCodeResult.success,

            ...(getIcdCodeResult.success
              ? { data: getIcdCodeResult.data }
              : {
                  ...(getIcdCodeResult.success
                    ? { data: getIcdCodeResult.data }
                    : { errors: getIcdCodeResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  getIcdCodeDataToExcel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          GetIcdCodeListViewmodel,
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
        let model: GetIcdCodeListViewmodel =
          conversionResult.data as GetIcdCodeListViewmodel;

        let exportCodeResult =
          await icdCodeService.getIcdCodeDataToExcel(
            req,
            model,
            next
          );

        if (exportCodeResult)
          return res.status(200).json({
            status_code: exportCodeResult.status_code,
            success: exportCodeResult.success,

            ...(exportCodeResult.success
              ? { data: exportCodeResult.data }
              : {
                  ...(exportCodeResult.success
                    ? { data: exportCodeResult.data }
                    : { errors: exportCodeResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  listIcdCode = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          GetIcdCodeListViewmodel,
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
        let model: GetIcdCodeListViewmodel =
          conversionResult.data as GetIcdCodeListViewmodel;

        let listIcdCodeResult =
          await icdCodeService.listIcdCode(
            req,
            model,
            next
          );

        if (listIcdCodeResult)
          return res.status(200).json({
            status_code: listIcdCodeResult.status_code,
            success: listIcdCodeResult.success,

            ...(listIcdCodeResult.success
              ? { data: listIcdCodeResult.data }
              : {
                  ...(listIcdCodeResult.success
                    ? { data: listIcdCodeResult.data }
                    : { errors: listIcdCodeResult.data }),
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
export default new IcdCode_Controller();
