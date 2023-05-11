import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../../v1/common/common-methods";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddSuperBillViewmodel,
  AssignSuperBillViewmodel,
  GetSuperBillListViewmodel,
  MarkPrintedViewmodel,
  UpdateSuperBillViewmodel,
  PatientListViewmodel,
  //GenerateDetailsViewmodel,
} from "../../view-models/superBill";

import superBillService from "./superBill.service";

class SuperBill_Controller {
  addSuperBill = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddSuperBillViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddSuperBillViewmodel =
          conversionResult.data as AddSuperBillViewmodel;

        let addSuperBillResult = await superBillService.addSuperBill(
          req,
          model,
          next
        );

        if (addSuperBillResult)
          return res.status(200).json({
            status_code: addSuperBillResult.status_code,
            success: addSuperBillResult.success,

            ...(addSuperBillResult.success
              ? { data: addSuperBillResult.data }
              : {
                  ...(addSuperBillResult.success
                    ? { data: addSuperBillResult.data }
                    : {
                        errors: addSuperBillResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  updateSuperBill = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateSuperBillViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateSuperBillViewmodel =
          conversionResult.data as UpdateSuperBillViewmodel;

        let updateSuperBillResult = await superBillService.updateSuperBill(
          req,
          model,
          next
        );

        if (updateSuperBillResult)
          return res.status(200).json({
            status_code: updateSuperBillResult.status_code,
            success: updateSuperBillResult.success,

            ...(updateSuperBillResult.success
              ? { data: updateSuperBillResult.data }
              : {
                  ...(updateSuperBillResult.success
                    ? { data: updateSuperBillResult.data }
                    : {
                        errors: updateSuperBillResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  getSuperBill = async (req: Request, res: Response, next: NextFunction) => {
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

        let getBillResult = await superBillService.getSuperBill(
          req,
          model,
          next
        );

        if (getBillResult)
          return res.status(200).json({
            status_code: getBillResult.status_code,
            success: getBillResult.success,

            ...(getBillResult.success
              ? { data: getBillResult.data }
              : {
                  ...(getBillResult.success
                    ? { data: getBillResult.data }
                    : { errors: getBillResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  getDetailsForGenerateSuperBill = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
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

        let getAppDetailsResult =
          await superBillService.getDetailsForGenerateSuperBill(
            req,
            model,
            next
          );

        if (getAppDetailsResult)
          return res.status(200).json({
            status_code: getAppDetailsResult.status_code,
            success: getAppDetailsResult.success,

            ...(getAppDetailsResult.success
              ? { data: getAppDetailsResult.data }
              : {
                  ...(getAppDetailsResult.success
                    ? { data: getAppDetailsResult.data }
                    : { errors: getAppDetailsResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  deleteSuperBill = async (req: Request, res: Response, next: NextFunction) => {
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

        let deleteSuperBillResult = await superBillService.deleteSuperBill(
          req,
          model,
          next
        );

        if (deleteSuperBillResult)
          return res.status(200).json({
            status_code: deleteSuperBillResult.status_code,
            success: deleteSuperBillResult.success,

            ...(deleteSuperBillResult.success
              ? { data: deleteSuperBillResult.data }
              : {
                  ...(deleteSuperBillResult.success
                    ? { data: deleteSuperBillResult.data }
                    : {
                        errors: deleteSuperBillResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  listSuperBill = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetSuperBillListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetSuperBillListViewmodel =
          conversionResult.data as GetSuperBillListViewmodel;

        let listBillResult = await superBillService.listSuperBill(
          req,
          model,
          next
        );

        if (listBillResult)
          return res.status(200).json({
            status_code: listBillResult.status_code,
            success: listBillResult.success,

            ...(listBillResult.success
              ? { data: listBillResult.data }
              : {
                  ...(listBillResult.success
                    ? { data: listBillResult.data }
                    : {
                        errors: listBillResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  getSuperBillDataToExcel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetSuperBillListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetSuperBillListViewmodel =
          conversionResult.data as GetSuperBillListViewmodel;

        let excelSuperBillResult =
          await superBillService.getSuperBillDataToExcel(req, model, next);

        if (excelSuperBillResult)
          return res.status(200).json({
            status_code: excelSuperBillResult.status_code,
            success: excelSuperBillResult.success,

            ...(excelSuperBillResult.success
              ? { data: excelSuperBillResult.data }
              : {
                  ...(excelSuperBillResult.success
                    ? { data: excelSuperBillResult.data }
                    : {
                        errors: excelSuperBillResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  // super bill assignment

  superBillAssignment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AssignSuperBillViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AssignSuperBillViewmodel =
          conversionResult.data as AssignSuperBillViewmodel;

        let assignSuperBillResult = await superBillService.superBillAssignment(
          req,
          model,
          next
        );

        if (assignSuperBillResult)
          return res.status(200).json({
            status_code: assignSuperBillResult.status_code,
            success: assignSuperBillResult.success,

            ...(assignSuperBillResult.success
              ? { data: assignSuperBillResult.data }
              : {
                  ...(assignSuperBillResult.success
                    ? { data: assignSuperBillResult.data }
                    : {
                        errors: assignSuperBillResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  superBillAssignmentHistory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
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

        let result = await superBillService.superBillAssignmentHistory(
          req,
          next
        );

        if (result)
          return res.status(200).json({
            status_code: result.status_code,
            success: result.success,

            ...(result.success
              ? { data: result.data }
              : {
                  ...(result.success
                    ? { data: result.data }
                    : { errors: result.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  markAsPrinted = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        MarkPrintedViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: MarkPrintedViewmodel =
          conversionResult.data as MarkPrintedViewmodel;

        let result = await superBillService.markAsPrinted(req, model, next);

        if (result)
          return res.status(200).json({
            status_code: result.status_code,
            success: result.success,

            ...(result.success
              ? { data: result.data }
              : {
                  ...(result.success
                    ? { data: result.data }
                    : { errors: result.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  getPatientList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        PatientListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: PatientListViewmodel =
          conversionResult.data as PatientListViewmodel;

        let result = await superBillService.getPatientList(req, model, next);

        if (result)
          return res.status(200).json({
            status_code: result.status_code,
            success: result.success,

            ...(result.success
              ? { data: result.data }
              : {
                  ...(result.success
                    ? { data: result.data }
                    : { errors: result.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  //getPatientList;

  // getDetailsForGenerateSuperBill1 = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) => {
  //   try {
  //     let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
  //       GenerateDetailsViewmodel,
  //       req.body
  //     );

  //     if (conversionResult.error && conversionResult.error.length > 0) {
  //       return res.status(HttpStatus.OK).send({
  //         status_code: HttpStatus.BAD_REQUEST,
  //         success: false,
  //         errors: conversionResult.error[0],
  //       });
  //     } else {
  //       let model: GenerateDetailsViewmodel =
  //         conversionResult.data as GenerateDetailsViewmodel;

  //       let listBillResult =
  //         await superBillService.getDetailsForGenerateSuperBill1(
  //           req,
  //           model,
  //           next
  //         );

  //       if (listBillResult)
  //         return res.status(200).json({
  //           status_code: listBillResult.status_code,
  //           success: listBillResult.success,

  //           ...(listBillResult.success
  //             ? { data: listBillResult.data }
  //             : {
  //                 ...(listBillResult.success
  //                   ? { data: listBillResult.data }
  //                   : {
  //                       errors: listBillResult.data,
  //                     }),
  //               }),
  //         });
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  getChargeHistory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
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

        let result = await superBillService.getChargeHistory(req, next);

        if (result)
          return res.status(200).json({
            status_code: result.status_code,
            success: result.success,

            ...(result.success
              ? { data: result.data }
              : {
                  ...(result.success
                    ? { data: result.data }
                    : { errors: result.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  getPaymentHistory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
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

        let result = await superBillService.getPaymentHistory(req, next);

        if (result)
          return res.status(200).json({
            status_code: result.status_code,
            success: result.success,

            ...(result.success
              ? { data: result.data }
              : {
                  ...(result.success
                    ? { data: result.data }
                    : { errors: result.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  //getPaymentHistory
  ///getHistory
}
export default new SuperBill_Controller();
