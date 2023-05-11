import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, {
  ValidationResult,
} from "../../common/common-methods";
import {
  ChargeLogReportViewmodel,
  GetDailyPaymentReportViewmodel,
} from "../../view-models/reports";

import ReportServices from "./reports.service";

class ReportsController {
  public exportChargeLogReportExcel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          ChargeLogReportViewmodel,
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
        let model: ChargeLogReportViewmodel =
          conversionResult.data as ChargeLogReportViewmodel;

        let excelResult =
          await ReportServices.exportChargeLogReportExcel(
            req,
            model,
            next
          );

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

  public exportInsuranceLogReportExcel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          ChargeLogReportViewmodel,
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
        let model: ChargeLogReportViewmodel =
          conversionResult.data as ChargeLogReportViewmodel;

        let excelResult =
          await ReportServices.exportInsuranceLogReportExcel(
            req,
            model,
            next
          );

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

  public exportDailyPaymentReportExcel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          GetDailyPaymentReportViewmodel,
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
        let model: GetDailyPaymentReportViewmodel =
          conversionResult.data as GetDailyPaymentReportViewmodel;

        let excelResult =
          await ReportServices.exportDailyPaymentReportExcel(
            req,
            model,
            next
          );
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

export default new ReportsController();
