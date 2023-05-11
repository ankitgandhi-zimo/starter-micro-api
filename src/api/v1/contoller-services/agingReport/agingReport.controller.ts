import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../../v1/common/common-methods";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import { GetAgingReportViewmodel } from "../../view-models/agingReport";

import agingReportService from "./agingReport.service";

class AgingReport_Controller {
  getReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetAgingReportViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetAgingReportViewmodel =
          conversionResult.data as GetAgingReportViewmodel;

        let reportResult = await agingReportService.getReport(req, model, next);

        if (reportResult)
          return res.status(200).json({
            status_code: reportResult.status_code,
            success: reportResult.success,

            ...(reportResult.success
              ? { data: reportResult.data }
              : {
                  ...(reportResult.success
                    ? { data: reportResult.data }
                    : { errors: reportResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  getAgingReportExcel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetAgingReportViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetAgingReportViewmodel =
          conversionResult.data as GetAgingReportViewmodel;

        let reportResult = await agingReportService.getAgingReportExcel(
          req,
          model,
          next
        );

        if (reportResult)
          return res.status(200).json({
            status_code: reportResult.status_code,
            success: reportResult.success,

            ...(reportResult.success
              ? { data: reportResult.data }
              : {
                  ...(reportResult.success
                    ? { data: reportResult.data }
                    : { errors: reportResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  //getAgingReportExcel
}
export default new AgingReport_Controller();
