import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../../v1/common/common-methods";
import { ListViewmodel } from "../../view-models/list.viewmodel";

import claimFillingPaymentCodesService from "./claimFillingPaymentCodes.service";

class claimFillingPaymentCodes_Controller {
  listPaymentCodes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        ListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: ListViewmodel = conversionResult.data as ListViewmodel;

        let listCodesResult =
          await claimFillingPaymentCodesService.listPaymentCodes(
            req,
            model,
            next
          );

        if (listCodesResult)
          return res.status(listCodesResult.status_code).json({
            status_code: listCodesResult.status_code,
            success: listCodesResult.success,

            ...(listCodesResult.success
              ? { data: listCodesResult.data }
              : {
                  ...(listCodesResult.success
                    ? { data: listCodesResult.data }
                    : { errors: listCodesResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new claimFillingPaymentCodes_Controller();
