import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../common/common-methods";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddPatientDocumentViewmodel,
  AddPatientViewmodel,
  AssignProviderViewmodel,
  ExportPatientListViewmodel,
  GetAssignProviderPatientViewmodel,
  GetPatientDocumentListViewmodel,
  GetPatientHistoryDetailViewmodel,
  GetPatientHistoryListViewmodel,
  GetPatientListViewmodel,
  MergePatientViewmodel,
  PatientCheckOutViewmodel,
  PatientPaymentListViewmodel,
  PendingCheckoutPatientViewmodel,
  UpdatePatientDocumentViewmodel,
  UpdatePatientViewmodel,
  FetchPatientViewmodel,
} from "../../view-models/patients";

import patientServices from "./patient.service";

class PatientController {
  public addPatient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddPatientViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddPatientViewmodel =
          conversionResult.data as AddPatientViewmodel;

        let patientResult = await patientServices.addPatient(req, model, next);
        if (patientResult)
          return res.status(200).json({
            status_code: patientResult.status_code,
            success: patientResult.success,

            ...(patientResult.success
              ? { data: patientResult.data }
              : {
                  ...(patientResult.success
                    ? { data: patientResult.data }
                    : { errors: patientResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public updatePatient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdatePatientViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdatePatientViewmodel =
          conversionResult.data as UpdatePatientViewmodel;

        let patientResult = await patientServices.updatePatient(
          req,
          model,
          next
        );
        if (patientResult)
          return res.status(200).json({
            status_code: patientResult.status_code,
            success: patientResult.success,

            ...(patientResult.success
              ? { data: patientResult.data }
              : {
                  ...(patientResult.success
                    ? { data: patientResult.data }
                    : { errors: patientResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  public getPatientDetails = async (
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
        let patientDetailResult = await patientServices.getPatientDetails(
          req,
          next
        );
        if (patientDetailResult)
          return res.status(200).json({
            status_code: patientDetailResult.status_code,
            success: patientDetailResult.success,
            ...(patientDetailResult.success
              ? { data: patientDetailResult.data }
              : { errors: patientDetailResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public deletePatientDetails = async (
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
        let patientDeletionResult = await patientServices.deletePatientDetails(
          req,
          next
        );
        if (patientDeletionResult)
          return res.status(200).json({
            status_code: patientDeletionResult.status_code,
            success: patientDeletionResult.success,
            ...(patientDeletionResult.success
              ? { data: patientDeletionResult.data }
              : { errors: patientDeletionResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getPatientList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetPatientListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetPatientListViewmodel =
          conversionResult.data as GetPatientListViewmodel;

        let patientListResult = await patientServices.getPatientList(
          req,
          model,
          next
        );

        if (patientListResult)
          return res.status(200).json({
            status_code: patientListResult.status_code,
            success: patientListResult.success,
            ...(patientListResult.success
              ? {
                  data: patientListResult.data.data,
                  totalDocs: patientListResult.data.totalDocs,
                  pageNumber: patientListResult.data.pageNumber,
                  pageSize: patientListResult.data.pageSize,
                  totalPages: patientListResult.data.totalPages,
                }
              : { errors: patientListResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getPatientPaymentList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        PatientPaymentListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: PatientPaymentListViewmodel =
          conversionResult.data as PatientPaymentListViewmodel;

        let patientPaymentListResult =
          await patientServices.getPatientPaymentList(req, model, next);

        if (patientPaymentListResult)
          return res.status(200).json({
            status_code: patientPaymentListResult.status_code,
            success: patientPaymentListResult.success,
            ...(patientPaymentListResult.success
              ? {
                  data: patientPaymentListResult.data.data,
                  totalDocs: patientPaymentListResult.data.totalDocs,
                  pageNumber: patientPaymentListResult.data.pageNumber,
                  pageSize: patientPaymentListResult.data.pageSize,
                  totalPages: patientPaymentListResult.data.totalPages,
                }
              : { errors: patientPaymentListResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public exportPatientPaymentDataToExcel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        PatientPaymentListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: PatientPaymentListViewmodel =
          conversionResult.data as PatientPaymentListViewmodel;

        let patientResult =
          await patientServices.exportPatientPaymentDataToExcel(
            req,
            model,
            next
          );
        if (patientResult)
          return res.status(200).json({
            status_code: patientResult.status_code,
            success: patientResult.success,

            ...(patientResult.success
              ? { data: patientResult.data }
              : {
                  ...(patientResult.success
                    ? { data: patientResult.data }
                    : { errors: patientResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  public getPatientListWithoutPagination = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetPatientListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetPatientListViewmodel =
          conversionResult.data as GetPatientListViewmodel;

        let patientListResult =
          await patientServices.getPatientListWithoutPagination(
            req,
            model,
            next
          );
        if (patientListResult)
          return res.status(200).json({
            status_code: patientListResult.status_code,
            success: patientListResult.success,
            ...(patientListResult.success
              ? {
                  data: patientListResult.data.data,
                  totalDocs: patientListResult.data.totalDocs,
                  pageNumber: patientListResult.data.pageNumber,
                  pageSize: patientListResult.data.pageSize,
                  totalPages: patientListResult.data.totalPages,
                }
              : { errors: patientListResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  // Checkout Section

  public checkoutList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        PendingCheckoutPatientViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: PendingCheckoutPatientViewmodel =
          conversionResult.data as PendingCheckoutPatientViewmodel;

        let pendingCheckoutPatientResult = await patientServices.checkoutList(
          req,
          model,
          next
        );
        if (pendingCheckoutPatientResult)
          return res.status(200).json({
            status_code: pendingCheckoutPatientResult.status_code,
            success: pendingCheckoutPatientResult.success,
            ...(pendingCheckoutPatientResult.success
              ? {
                  data: pendingCheckoutPatientResult.data.data,
                  totalDocs: pendingCheckoutPatientResult.data.totalDocs,
                  pageNumber: pendingCheckoutPatientResult.data.pageNumber,
                  pageSize: pendingCheckoutPatientResult.data.pageSize,
                  totalPages: pendingCheckoutPatientResult.data.totalPages,
                }
              : {
                  errors: pendingCheckoutPatientResult.data,
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getCheckoutDataToExcel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        PendingCheckoutPatientViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: PendingCheckoutPatientViewmodel =
          conversionResult.data as PendingCheckoutPatientViewmodel;

        let patientResult = await patientServices.getCheckoutDataToExcel(
          req,
          model,
          next
        );
        if (patientResult)
          return res.status(200).json({
            status_code: patientResult.status_code,
            success: patientResult.success,

            ...(patientResult.success
              ? { data: patientResult.data }
              : {
                  ...(patientResult.success
                    ? { data: patientResult.data }
                    : { errors: patientResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  //Patient Checkout process

  public checkoutPatient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        PatientCheckOutViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: PatientCheckOutViewmodel =
          conversionResult.data as PatientCheckOutViewmodel;

        let patientCheckoutResult = await patientServices.checkoutPatient(
          req,
          model,
          next
        );
        if (patientCheckoutResult)
          return res.status(200).json({
            status_code: patientCheckoutResult.status_code,
            success: patientCheckoutResult.success,

            ...(patientCheckoutResult.success
              ? { data: patientCheckoutResult.data }
              : {
                  ...(patientCheckoutResult.success
                    ? { data: patientCheckoutResult.data }
                    : {
                        errors: patientCheckoutResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  // Patient Document Section
  public addPatientDocument = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddPatientDocumentViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddPatientDocumentViewmodel =
          conversionResult.data as AddPatientDocumentViewmodel;

        let patientDocResult = await patientServices.addPatientDocument(
          req,
          model,
          next
        );
        if (patientDocResult)
          return res.status(200).json({
            status_code: patientDocResult.status_code,
            success: patientDocResult.success,

            ...(patientDocResult.success
              ? { data: patientDocResult.data }
              : {
                  ...(patientDocResult.success
                    ? { data: patientDocResult.data }
                    : { errors: patientDocResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public updatePatientDocument = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdatePatientDocumentViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdatePatientDocumentViewmodel =
          conversionResult.data as UpdatePatientDocumentViewmodel;

        let patientDocResult = await patientServices.updatePatientDocument(
          req,
          model,
          next
        );
        if (patientDocResult)
          return res.status(200).json({
            status_code: patientDocResult.status_code,
            success: patientDocResult.success,

            ...(patientDocResult.success
              ? { data: patientDocResult.data }
              : {
                  ...(patientDocResult.success
                    ? { data: patientDocResult.data }
                    : { errors: patientDocResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  public getPatientDocumentDetails = async (
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
        let patientDocDetailResult =
          await patientServices.getPatientDocumentDetails(req, next);
        if (patientDocDetailResult)
          return res.status(200).json({
            status_code: patientDocDetailResult.status_code,
            success: patientDocDetailResult.success,
            ...(patientDocDetailResult.success
              ? { data: patientDocDetailResult.data }
              : { errors: patientDocDetailResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public deletePatientDocumentDetails = async (
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
        let patientDocDetailResult =
          await patientServices.deletePatientDocumentDetails(req, next);
        if (patientDocDetailResult)
          return res.status(200).json({
            status_code: patientDocDetailResult.status_code,
            success: patientDocDetailResult.success,
            ...(patientDocDetailResult.success
              ? { data: patientDocDetailResult.data }
              : { errors: patientDocDetailResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  public getPatientDocumentList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetPatientDocumentListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetPatientDocumentListViewmodel =
          conversionResult.data as GetPatientDocumentListViewmodel;

        let patientDocListResult = await patientServices.getPatientDocumentList(
          req,
          model,
          next
        );

        if (patientDocListResult)
          return res.status(200).json({
            status_code: patientDocListResult.status_code,
            success: patientDocListResult.success,
            ...(patientDocListResult.success
              ? {
                  data: patientDocListResult.data.data,
                  totalDocs: patientDocListResult.data.totalDocs,
                  pageNumber: patientDocListResult.data.pageNumber,
                  pageSize: patientDocListResult.data.pageSize,
                  totalPages: patientDocListResult.data.totalPages,
                }
              : { errors: patientDocListResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  // Assigned patients to provider
  public assignProviderToPatient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AssignProviderViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AssignProviderViewmodel =
          conversionResult.data as AssignProviderViewmodel;

        let patientDocResult = await patientServices.assignProviderToPatient(
          req,
          model,
          next
        );
        if (patientDocResult)
          return res.status(200).json({
            status_code: patientDocResult.status_code,
            success: patientDocResult.success,

            ...(patientDocResult.success
              ? { data: patientDocResult.data }
              : {
                  ...(patientDocResult.success
                    ? { data: patientDocResult.data }
                    : { errors: patientDocResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getAssignedProviderOrPatient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetAssignProviderPatientViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetAssignProviderPatientViewmodel =
          conversionResult.data as GetAssignProviderPatientViewmodel;

        let listResult = await patientServices.getAssignedProviderOrPatient(
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

  public getVisitHistoryList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetPatientHistoryListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetPatientHistoryListViewmodel =
          conversionResult.data as GetPatientHistoryListViewmodel;

        let listResult = await patientServices.getVisitHistoryList(
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
  public getVisitHistoryDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetPatientHistoryDetailViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetPatientHistoryDetailViewmodel =
          conversionResult.data as GetPatientHistoryDetailViewmodel;

        let listResult = await patientServices.getVisitHistoryDetails(
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

  // export patient data
  public getPatientDataToExcel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        ExportPatientListViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: ExportPatientListViewmodel =
          conversionResult.data as ExportPatientListViewmodel;

        let patientDataResult = await patientServices.getPatientDataToExcel(
          req,
          model,
          next
        );
        if (patientDataResult)
          return res.status(patientDataResult.status_code).json({
            status_code: patientDataResult.status_code,
            success: patientDataResult.success,

            ...(patientDataResult.success
              ? { data: patientDataResult.data }
              : {
                  ...(patientDataResult.success
                    ? { data: patientDataResult.data }
                    : { errors: patientDataResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getCptCodes = async (
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
        let codeResult = await patientServices.getCptCodes(req, next);
        if (codeResult)
          return res.status(200).json({
            status_code: codeResult.status_code,
            success: codeResult.success,
            ...(codeResult.success
              ? { data: codeResult.data }
              : { errors: codeResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getCheckoutDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        CheckMongoIdViewmodel,
        req.params._id
        //JSON.parse(`{"_id":"${req.params._id}"}`)
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let codeResult = await patientServices.getCheckoutDetails(req, next);
        if (codeResult)
          return res.status(200).json({
            status_code: codeResult.status_code,
            success: codeResult.success,
            ...(codeResult.success
              ? { data: codeResult.data }
              : { errors: codeResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public mergePatient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        MergePatientViewmodel,
        req.body
        //JSON.parse(`{"_id":"${req.params._id}"}`)
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: MergePatientViewmodel =
          conversionResult.data as MergePatientViewmodel;
        let codeResult = await patientServices.mergePatient(req, model, next);
        if (codeResult)
          return res.status(200).json({
            status_code: codeResult.status_code,
            success: codeResult.success,
            ...(codeResult.success
              ? { data: codeResult.data }
              : { errors: codeResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public fetchPatients = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        FetchPatientViewmodel,
        req.body
        //JSON.parse(`{"_id":"${req.params._id}"}`)
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: FetchPatientViewmodel =
          conversionResult.data as FetchPatientViewmodel;
        let codeResult = await patientServices.fetchPatients(req, model, next);
        if (codeResult)
          return res.status(200).json({
            status_code: codeResult.status_code,
            success: codeResult.success,
            ...(codeResult.success
              ? { data: codeResult.data }
              : { errors: codeResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default new PatientController();
