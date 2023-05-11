import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, {
  ValidationResult,
} from "../../common/common-methods";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddEapInsuranceViewmodel,
  AddHmoInsuranceViewmodel,
  AddInsuranceCompanyViewmodel,
  AddInsuranceViewmodel,
  AddPpoInsuranceViewmodel,
  GetInsuranceCompanyListViewmodel,
  GetInsuranceListViewmodel,
  UpdateEapInsuranceViewmodel,
  UpdateHmoInsuranceViewmodel,
  UpdateInsuranceCompanyViewmodel,
  UpdateInsuranceViewmodel,
  UpdatePpoInsuranceViewmodel,
} from "../../view-models/insurance";

import insuranceServices from "./insurance.service";

class InsuranceController {
  public addInsurance = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          AddInsuranceViewmodel,
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
        let model: AddInsuranceViewmodel =
          conversionResult.data as AddInsuranceViewmodel;

        let insuranceResult =
          await insuranceServices.addInsurance(
            req,
            model,
            next
          );
        if (insuranceResult)
          return res.status(200).json({
            status_code: insuranceResult.status_code,
            success: insuranceResult.success,

            ...(insuranceResult.success
              ? { data: insuranceResult.data }
              : {
                  ...(insuranceResult.success
                    ? { data: insuranceResult.data }
                    : { errors: insuranceResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  public updateInsurance = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          UpdateInsuranceViewmodel,
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
        let model: UpdateInsuranceViewmodel =
          conversionResult.data as UpdateInsuranceViewmodel;

        let insuranceResult =
          await insuranceServices.updateInsurance(
            req,
            model,
            next
          );
        if (insuranceResult)
          return res.status(200).json({
            status_code: insuranceResult.status_code,
            success: insuranceResult.success,

            ...(insuranceResult.success
              ? { data: insuranceResult.data }
              : {
                  ...(insuranceResult.success
                    ? { data: insuranceResult.data }
                    : { errors: insuranceResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  public getInsuranceDetails = async (
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
        let insuranceDetailResult =
          await insuranceServices.getInsuranceDetails(
            req,
            next
          );
        if (insuranceDetailResult)
          return res.status(200).json({
            status_code: insuranceDetailResult.status_code,
            success: insuranceDetailResult.success,
            ...(insuranceDetailResult.success
              ? { data: insuranceDetailResult.data }
              : { errors: insuranceDetailResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public deleteInsuranceDetails = async (
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
        let insuranceDeletionResult =
          await insuranceServices.deleteInsuranceDetails(
            req,
            next
          );
        if (insuranceDeletionResult)
          return res.status(200).json({
            status_code:
              insuranceDeletionResult.status_code,
            success: insuranceDeletionResult.success,
            ...(insuranceDeletionResult.success
              ? { data: insuranceDeletionResult.data }
              : { errors: insuranceDeletionResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getInsuranceList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          GetInsuranceListViewmodel,
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
        let model: GetInsuranceListViewmodel =
          conversionResult.data as GetInsuranceListViewmodel;

        let patientListResult =
          await insuranceServices.getInsuranceList(
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
                  totalDocs:
                    patientListResult.data.totalDocs,
                  pageNumber:
                    patientListResult.data.pageNumber,
                  pageSize: patientListResult.data.pageSize,
                  totalPages:
                    patientListResult.data.totalPages,
                }
              : { errors: patientListResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getInsuranceListWithoutPagination = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          GetInsuranceListViewmodel,
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
        let model: GetInsuranceListViewmodel =
          conversionResult.data as GetInsuranceListViewmodel;

        let patientInsuranceListResult =
          await insuranceServices.getInsuranceListWithoutPagination(
            req,
            model,
            next
          );

        if (patientInsuranceListResult)
          return res.status(200).json({
            status_code:
              patientInsuranceListResult.status_code,
            success: patientInsuranceListResult.success,
            ...(patientInsuranceListResult.success
              ? {
                  data: patientInsuranceListResult.data
                    .data,
                  totalDocs:
                    patientInsuranceListResult.data
                      .totalDocs,
                  pageNumber:
                    patientInsuranceListResult.data
                      .pageNumber,
                  pageSize:
                    patientInsuranceListResult.data
                      .pageSize,
                  totalPages:
                    patientInsuranceListResult.data
                      .totalPages,
                }
              : {
                  errors: patientInsuranceListResult.data,
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  // INSURANACE COMPANY SECTION  START

  public addInsuranceCompany = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          AddInsuranceCompanyViewmodel,
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
        let model: AddInsuranceCompanyViewmodel =
          conversionResult.data as AddInsuranceCompanyViewmodel;

        let insuranceCompanyResult =
          await insuranceServices.addInsuranceCompany(
            req,
            model,
            next
          );
        if (insuranceCompanyResult)
          return res.status(200).json({
            status_code: insuranceCompanyResult.status_code,
            success: insuranceCompanyResult.success,

            ...(insuranceCompanyResult.success
              ? { data: insuranceCompanyResult.data }
              : {
                  ...(insuranceCompanyResult.success
                    ? {
                        data: insuranceCompanyResult.data,
                      }
                    : {
                        errors: insuranceCompanyResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public updateInsuranceCompany = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          UpdateInsuranceCompanyViewmodel,
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
        let model: UpdateInsuranceCompanyViewmodel =
          conversionResult.data as UpdateInsuranceCompanyViewmodel;

        let insuranceCompanyResult =
          await insuranceServices.updateInsuranceCompany(
            req,
            model,
            next
          );
        if (insuranceCompanyResult)
          return res.status(200).json({
            status_code: insuranceCompanyResult.status_code,
            success: insuranceCompanyResult.success,

            ...(insuranceCompanyResult.success
              ? { data: insuranceCompanyResult.data }
              : {
                  ...(insuranceCompanyResult.success
                    ? {
                        data: insuranceCompanyResult.data,
                      }
                    : {
                        errors: insuranceCompanyResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  public getInsuranceCompanyDetails = async (
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
        let insuranceCompanyResult =
          await insuranceServices.getInsuranceCompanyDetails(
            req,
            next
          );
        if (insuranceCompanyResult)
          return res.status(200).json({
            status_code: insuranceCompanyResult.status_code,
            success: insuranceCompanyResult.success,
            ...(insuranceCompanyResult.success
              ? { data: insuranceCompanyResult.data }
              : { errors: insuranceCompanyResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public deleteInsuranceCompanyDetails = async (
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
        let insuranceCompanyResult =
          await insuranceServices.deleteInsuranceCompanyDetails(
            req,
            next
          );
        if (insuranceCompanyResult)
          return res.status(200).json({
            status_code: insuranceCompanyResult.status_code,
            success: insuranceCompanyResult.success,
            ...(insuranceCompanyResult.success
              ? { data: insuranceCompanyResult.data }
              : { errors: insuranceCompanyResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getInsuranceCompanyList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          GetInsuranceCompanyListViewmodel,
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
        let model: GetInsuranceCompanyListViewmodel =
          conversionResult.data as GetInsuranceCompanyListViewmodel;

        let insuranceCompanyListResult =
          await insuranceServices.getInsuranceCompanyList(
            req,
            model,
            next
          );

        if (insuranceCompanyListResult)
          return res
            .status(insuranceCompanyListResult.status_code)
            .json({
              status_code:
                insuranceCompanyListResult.status_code,
              success: insuranceCompanyListResult.success,
              ...(insuranceCompanyListResult.success
                ? {
                    data: insuranceCompanyListResult.data
                      .data,
                    totalDocs:
                      insuranceCompanyListResult.data
                        .totalDocs,
                    pageNumber:
                      insuranceCompanyListResult.data
                        .pageNumber,
                    pageSize:
                      insuranceCompanyListResult.data
                        .pageSize,
                    totalPages:
                      insuranceCompanyListResult.data
                        .totalPages,
                  }
                : {
                    errors: insuranceCompanyListResult.data,
                  }),
            });
      }
    } catch (error) {
      next(error);
    }
  };

  public getInsuranceCompanyDataToExcel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          GetInsuranceCompanyListViewmodel,
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
        let model: GetInsuranceCompanyListViewmodel =
          conversionResult.data as GetInsuranceCompanyListViewmodel;

        let insuranceCompanyResult =
          await insuranceServices.getInsuranceCompanyDataToExcel(
            req,
            model,
            next
          );
        if (insuranceCompanyResult)
          return res.status(200).json({
            status_code: insuranceCompanyResult.status_code,
            success: insuranceCompanyResult.success,

            ...(insuranceCompanyResult.success
              ? { data: insuranceCompanyResult.data }
              : {
                  ...(insuranceCompanyResult.success
                    ? {
                        data: insuranceCompanyResult.data,
                      }
                    : {
                        errors: insuranceCompanyResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  // Eap Insurance Section

  public addEapInsurance = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          AddEapInsuranceViewmodel,
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
        let model: AddEapInsuranceViewmodel =
          conversionResult.data as AddEapInsuranceViewmodel;

        let insuranceResult =
          await insuranceServices.addEapInsurance(
            req,
            model,
            next
          );
        if (insuranceResult)
          return res.status(200).json({
            status_code: insuranceResult.status_code,
            success: insuranceResult.success,

            ...(insuranceResult.success
              ? { data: insuranceResult.data }
              : {
                  ...(insuranceResult.success
                    ? { data: insuranceResult.data }
                    : { errors: insuranceResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public updateEapInsurance = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          UpdateEapInsuranceViewmodel,
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
        let model: UpdateEapInsuranceViewmodel =
          conversionResult.data as UpdateEapInsuranceViewmodel;

        let insuranceResult =
          await insuranceServices.updateEapInsurance(
            req,
            model,
            next
          );
        if (insuranceResult)
          return res.status(200).json({
            status_code: insuranceResult.status_code,
            success: insuranceResult.success,

            ...(insuranceResult.success
              ? { data: insuranceResult.data }
              : {
                  ...(insuranceResult.success
                    ? { data: insuranceResult.data }
                    : { errors: insuranceResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  public getEapInsuranceDetails = async (
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
        let insuranceDetailResult =
          await insuranceServices.getEapInsuranceDetails(
            req,
            next
          );
        if (insuranceDetailResult)
          return res.status(200).json({
            status_code: insuranceDetailResult.status_code,
            success: insuranceDetailResult.success,
            ...(insuranceDetailResult.success
              ? { data: insuranceDetailResult.data }
              : { errors: insuranceDetailResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  // Hmo Insurance Section

  public addHmoInsurance = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          AddHmoInsuranceViewmodel,
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
        let model: AddHmoInsuranceViewmodel =
          conversionResult.data as AddHmoInsuranceViewmodel;

        let insuranceResult =
          await insuranceServices.addHmoInsurance(
            req,
            model,
            next
          );
        if (insuranceResult)
          return res.status(200).json({
            status_code: insuranceResult.status_code,
            success: insuranceResult.success,

            ...(insuranceResult.success
              ? { data: insuranceResult.data }
              : {
                  ...(insuranceResult.success
                    ? { data: insuranceResult.data }
                    : { errors: insuranceResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public updateHmoInsurance = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          UpdateHmoInsuranceViewmodel,
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
        let model: UpdateHmoInsuranceViewmodel =
          conversionResult.data as UpdateHmoInsuranceViewmodel;

        let insuranceResult =
          await insuranceServices.updateHmoInsurance(
            req,
            model,
            next
          );
        if (insuranceResult)
          return res.status(200).json({
            status_code: insuranceResult.status_code,
            success: insuranceResult.success,

            ...(insuranceResult.success
              ? { data: insuranceResult.data }
              : {
                  ...(insuranceResult.success
                    ? { data: insuranceResult.data }
                    : { errors: insuranceResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  public getHmoInsuranceDetails = async (
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
        let insuranceDetailResult =
          await insuranceServices.getHmoInsuranceDetails(
            req,
            next
          );
        if (insuranceDetailResult)
          return res.status(200).json({
            status_code: insuranceDetailResult.status_code,
            success: insuranceDetailResult.success,
            ...(insuranceDetailResult.success
              ? { data: insuranceDetailResult.data }
              : { errors: insuranceDetailResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  // PPO Insurance Section

  public addPpoInsurance = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          AddPpoInsuranceViewmodel,
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
        let model: AddPpoInsuranceViewmodel =
          conversionResult.data as AddPpoInsuranceViewmodel;

        let insuranceResult =
          await insuranceServices.addPpoInsurance(
            req,
            model,
            next
          );
        if (insuranceResult)
          return res.status(200).json({
            status_code: insuranceResult.status_code,
            success: insuranceResult.success,

            ...(insuranceResult.success
              ? { data: insuranceResult.data }
              : {
                  ...(insuranceResult.success
                    ? { data: insuranceResult.data }
                    : { errors: insuranceResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public updatePpoInsurance = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          UpdatePpoInsuranceViewmodel,
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
        let model: UpdatePpoInsuranceViewmodel =
          conversionResult.data as UpdatePpoInsuranceViewmodel;

        let insuranceResult =
          await insuranceServices.updatePpoInsurance(
            req,
            model,
            next
          );
        if (insuranceResult)
          return res.status(200).json({
            status_code: insuranceResult.status_code,
            success: insuranceResult.success,

            ...(insuranceResult.success
              ? { data: insuranceResult.data }
              : {
                  ...(insuranceResult.success
                    ? { data: insuranceResult.data }
                    : { errors: insuranceResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  public getPpoInsuranceDetails = async (
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
        let insuranceDetailResult =
          await insuranceServices.getPpoInsuranceDetails(
            req,
            next
          );
        if (insuranceDetailResult)
          return res.status(200).json({
            status_code: insuranceDetailResult.status_code,
            success: insuranceDetailResult.success,
            ...(insuranceDetailResult.success
              ? { data: insuranceDetailResult.data }
              : { errors: insuranceDetailResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default new InsuranceController();
