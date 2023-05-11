import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../common/common-methods";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  GetClaimDetailsViewmodel,
  GetClaimListViewmodel,
  UpdateEditStatusViewmodel,
} from "../../view-models/claims";
import { AddClaimViewmodel } from "../../view-models/claims/add_claim.viewmodel";

import ClaimServices from "./claim.service";

class ClaimController {
  public submitClaim = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddClaimViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddClaimViewmodel =
          conversionResult.data as AddClaimViewmodel;

        let claimResult = await ClaimServices.submitClaim(req, model, next);
        if (claimResult)
          return res.status(200).json({
            status_code: claimResult.status_code,
            success: claimResult.success,

            ...(claimResult.success
              ? { data: claimResult.data }
              : {
                  ...(claimResult.success
                    ? { data: claimResult.data }
                    : {
                        errors: claimResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public updateEdiStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateEditStatusViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateEditStatusViewmodel =
          conversionResult.data as UpdateEditStatusViewmodel;

        let updateResult = await ClaimServices.updateEdiStatus(
          req,
          model,
          next
        );
        if (updateResult)
          return res.status(HttpStatus.OK).json({
            status_code: updateResult.status_code,
            success: updateResult.success,

            ...(updateResult.success
              ? { data: updateResult.data }
              : {
                  ...(updateResult.success
                    ? { data: updateResult.data }
                    : {
                        errors: updateResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getClaimDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetClaimDetailsViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetClaimDetailsViewmodel =
          conversionResult.data as GetClaimDetailsViewmodel;

        let claimResult = await ClaimServices.getClaimDetails(req, model, next);
        if (claimResult)
          return res.status(claimResult.status_code).json({
            status_code: claimResult.status_code,
            success: claimResult.success,

            ...(claimResult.success
              ? { data: claimResult.data }
              : {
                  ...(claimResult.success
                    ? { data: claimResult.data }
                    : {
                        errors: claimResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  public getClaimList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetClaimListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetClaimListViewmodel =
          conversionResult.data as GetClaimListViewmodel;

        let claimListResult = await ClaimServices.getClaimList(
          req,
          model,
          next
        );

        if (claimListResult)
          return res.status(claimListResult.status_code).json({
            status_code: claimListResult.status_code,
            success: claimListResult.success,
            ...(claimListResult.success
              ? {
                  data: claimListResult.data.data,
                  totalDocs: claimListResult.data.totalDocs,
                  pageNumber: claimListResult.data.pageNumber,
                  pageSize: claimListResult.data.pageSize,
                  totalPages: claimListResult.data.totalPages,
                }
              : { errors: claimListResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  getClaimData = async (req: Request, res: Response, next: NextFunction) => {
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

        let getData = await ClaimServices.getClaimData(req, model, next);

        if (getData)
          return res.status(200).json({
            status_code: getData.status_code,
            success: getData.success,

            ...(getData.success
              ? { data: getData.data }
              : {
                  ...(getData.success
                    ? { data: getData.data }
                    : {
                        errors: getData.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public exportClaimExcel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetClaimListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetClaimListViewmodel =
          conversionResult.data as GetClaimListViewmodel;

        let excelResult = await ClaimServices.exportClaimList(req, model, next);
        if (excelResult)
          return res.status(HttpStatus.OK).json({
            status_code: excelResult.status_code,
            success: excelResult.success,

            ...(excelResult.success
              ? { data: excelResult.data }
              : {
                  ...(excelResult.success
                    ? { data: excelResult.data }
                    : {
                        errors: excelResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default new ClaimController();
