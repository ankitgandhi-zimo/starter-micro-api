import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, {
  ValidationResult,
} from "../../../common/common-methods";
import { CheckMongoIdViewmodel } from "../../../view-models/check_mongo_id.viewmodel";
import {
  AddCptCodeViewmodel,
  GetCptCodeListViewmodel,
  UpdateCptCodeViewmodel,
} from "../../../view-models/cpt_code";
import cptCodeService from "./cpt_code.service";
class CptCode_Controller {
  addCptCode = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          AddCptCodeViewmodel,
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
        let model: AddCptCodeViewmodel =
          conversionResult.data as AddCptCodeViewmodel;

        let addCodeResult = await cptCodeService.addCptCode(
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
  updateCptCode = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          UpdateCptCodeViewmodel,
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
        let model: UpdateCptCodeViewmodel =
          conversionResult.data as UpdateCptCodeViewmodel;

        let updateCptCodeResult =
          await cptCodeService.updateCptCode(
            req,
            model,
            next
          );

        if (updateCptCodeResult)
          return res.status(200).json({
            status_code: updateCptCodeResult.status_code,
            success: updateCptCodeResult.success,

            ...(updateCptCodeResult.success
              ? { data: updateCptCodeResult.data }
              : {
                  ...(updateCptCodeResult.success
                    ? { data: updateCptCodeResult.data }
                    : { errors: updateCptCodeResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  deleteCptCode = async (
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
          await cptCodeService.deleteCptCode(
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
  getCptCode = async (
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

        let getCptCodeResult =
          await cptCodeService.getCptCode(req, model, next);

        if (getCptCodeResult)
          return res.status(200).json({
            status_code: getCptCodeResult.status_code,
            success: getCptCodeResult.success,

            ...(getCptCodeResult.success
              ? { data: getCptCodeResult.data }
              : {
                  ...(getCptCodeResult.success
                    ? { data: getCptCodeResult.data }
                    : { errors: getCptCodeResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  listCptCode = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          GetCptCodeListViewmodel,
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
        let model: GetCptCodeListViewmodel =
          conversionResult.data as GetCptCodeListViewmodel;

        let listCptCodeResult =
          await cptCodeService.listCptCode(
            req,
            model,
            next
          );

        if (listCptCodeResult)
          return res.status(200).json({
            status_code: listCptCodeResult.status_code,
            success: listCptCodeResult.success,

            ...(listCptCodeResult.success
              ? { data: listCptCodeResult.data }
              : {
                  ...(listCptCodeResult.success
                    ? { data: listCptCodeResult.data }
                    : { errors: listCptCodeResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  filterListCptCode = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          GetCptCodeListViewmodel,
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
        let model: GetCptCodeListViewmodel =
          conversionResult.data as GetCptCodeListViewmodel;

        let listCodeResult =
          await cptCodeService.filterListCptCode(
            req,
            model,
            next
          );

        if (listCodeResult)
          return res.status(200).json({
            status_code: listCodeResult.status_code,
            success: listCodeResult.success,

            ...(listCodeResult.success
              ? { data: listCodeResult.data }
              : {
                  ...(listCodeResult.success
                    ? { data: listCodeResult.data }
                    : { errors: listCodeResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  getCptCodeDataToExcel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          GetCptCodeListViewmodel,
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
        let model: GetCptCodeListViewmodel =
          conversionResult.data as GetCptCodeListViewmodel;

        let exportCodeResult =
          await cptCodeService.getCptCodeDataToExcel(
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
}
export default new CptCode_Controller();
