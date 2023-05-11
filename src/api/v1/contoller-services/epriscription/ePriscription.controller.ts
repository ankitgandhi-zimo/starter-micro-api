import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../../v1/common/common-methods";
import {
  AddEPriscriptionViewmodel,
  GetEPriscriptionListViewmodel,
} from "../../view-models/ePriscription";
import ePriscriptionService from "./ePriscription.service";
class EPriscription_Controller {
  addEPriscription = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddEPriscriptionViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddEPriscriptionViewmodel =
          conversionResult.data as AddEPriscriptionViewmodel;

        let addResult = await ePriscriptionService.addEPriscription(
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
  // updateNotes = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
  //       UpdateNotesViewmodel,
  //       req.body
  //     );

  //     if (conversionResult.error && conversionResult.error.length > 0) {
  //       return res.status(HttpStatus.BAD_REQUEST).send({
  //         status_code: HttpStatus.BAD_REQUEST,
  //         success: false,
  //         errors: conversionResult.error[0],
  //       });
  //     } else {
  //       let model: UpdateNotesViewmodel =
  //         conversionResult.data as UpdateNotesViewmodel;

  //       let updateNotesResult = await notesService.updateNotes(
  //         req,
  //         model,
  //         next
  //       );

  //       if (updateNotesResult)
  //         return res.status(updateNotesResult.status_code).json({
  //           status_code: updateNotesResult.status_code,
  //           success: updateNotesResult.success,

  //           ...(updateNotesResult.success
  //             ? { data: updateNotesResult.data }
  //             : {
  //                 ...(updateNotesResult.success
  //                   ? { data: updateNotesResult.data }
  //                   : { errors: updateNotesResult.data }),
  //               }),
  //         });
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // };
  // deleteNotes = async (req: Request, res: Response, next: NextFunction) => {
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

  //       let deleteNotesResult = await notesService.deleteNotes(
  //         req,
  //         model,
  //         next
  //       );

  //       if (deleteNotesResult)
  //         return res.status(deleteNotesResult.status_code).json({
  //           status_code: deleteNotesResult.status_code,
  //           success: deleteNotesResult.success,

  //           ...(deleteNotesResult.success
  //             ? { data: deleteNotesResult.data }
  //             : {
  //                 ...(deleteNotesResult.success
  //                   ? { data: deleteNotesResult.data }
  //                   : { errors: deleteNotesResult.data }),
  //               }),
  //         });
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // };
  // getNotes = async (req: Request, res: Response, next: NextFunction) => {
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

  //       let getNotesResult = await notesService.getNotes(req, model, next);

  //       if (getNotesResult)
  //         return res.status(getNotesResult.status_code).json({
  //           status_code: getNotesResult.status_code,
  //           success: getNotesResult.success,

  //           ...(getNotesResult.success
  //             ? { data: getNotesResult.data }
  //             : {
  //                 ...(getNotesResult.success
  //                   ? { data: getNotesResult.data }
  //                   : { errors: getNotesResult.data }),
  //               }),
  //         });
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // };
  listEPriscription = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetEPriscriptionListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetEPriscriptionListViewmodel =
          conversionResult.data as GetEPriscriptionListViewmodel;

        let listEPriscriptionResult =
          await ePriscriptionService.listEPriscription(req, model, next);

        if (listEPriscriptionResult)
          return res.status(200).json({
            status_code: listEPriscriptionResult.status_code,
            success: listEPriscriptionResult.success,

            ...(listEPriscriptionResult.success
              ? { data: listEPriscriptionResult.data }
              : {
                  ...(listEPriscriptionResult.success
                    ? {
                        data: listEPriscriptionResult.data,
                      }
                    : {
                        errors: listEPriscriptionResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  getEPrescriptionListByGroupDataToExcel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetEPriscriptionListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetEPriscriptionListViewmodel =
          conversionResult.data as GetEPriscriptionListViewmodel;

        let listResult =
          await ePriscriptionService.getEPrescriptionListByGroupDataToExcel(
            req,
            model,
            next
          );

        if (listResult)
          return res.status(listResult.status_code).json({
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
export default new EPriscription_Controller();
