import { DocumentType } from "@typegoose/typegoose";
import { NextFunction, Request } from "express";
import fs from "fs";
import HttpStatus from "http-status-codes";
import mongoose from "mongoose";
import path from "path";
import XlsxPopulate from "xlsx-populate";
import Utility, { IServiceResult1 } from "../../common/common-methods";
import errorMessage from "../../common/erros_message";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";
import EapInsuranceModel, { Eap } from "../../models/insurance/eap.model";
import HmoInsuranceModel, { Hmo } from "../../models/insurance/hmo.model";
import InsuranceModel, {
  Insurance,
} from "../../models/insurance/insurance.model";
import InsuranceCompanyModel, {
  InsuranceCompany,
} from "../../models/insurance/insurance_companies.model";
import PpoInsuranceModel, { Ppo } from "../../models/insurance/ppo.model";
import { Patients } from "../../models/patient.model";
import RolesModel from "../../models/roles.model";
import { User } from "../../models/user.model";
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

class InsuranceServices {
  addInsurance = async (
    req: Request,
    model: AddInsuranceViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let patientRole = await RolesModel.findOne({
        roleName: "patient",
      });
      let userDetails = <DocumentType<User>>req.user;

      let modelToSave = <Insurance>model;

      modelToSave.createdby_id = userDetails._id;

      let response = await InsuranceModel.create(modelToSave);
      console.log(model);
      if (response) {
        // Add Activity History
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `patient insurance added successfully`,
          type: EHistoryActivityTypeValues.PATIENT,
          type_id: model.patient_id,
        });

        return {
          status_code: HttpStatus.OK,
          success: true,
          data: response,
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.ERROR_ADD_INSURANCE,
            error: errorMessage.ON_ADD_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  updateInsurance = async (
    req: Request,
    model: UpdateInsuranceViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let foundInsuranceDetails = await InsuranceModel.findOne({
        _id: model._id,
        // isDeleted: false,
      });

      if (foundInsuranceDetails) {
        let modelToSave = <Insurance>model;

        modelToSave.createdby_id = foundInsuranceDetails.createdby_id;

        modelToSave.clinic_id = foundInsuranceDetails.clinic_id;

        let response = await InsuranceModel.updateOne(
          { _id: model._id },
          modelToSave
        );

        if (response && response.modifiedCount > 0) {
          // Add Activity History
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `patient insurnace details updated successfully`,
            type: EHistoryActivityTypeValues.PATIENT,
            type_id: foundInsuranceDetails.patient_id,
          });

          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.UPDATE_SUCCESSFULL,
          };
        } else {
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.ERROR_UPDATE_INSURANCE,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };
        }
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.INSURANCE_DETAILS_NOT_FOUND,
            error: errorMessage.ON_UPDATE_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  getInsuranceDetails = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let foundInsuranceDetails = await InsuranceModel.findOne({
        _id: req.params._id,
        isDeleted: false,
      }).populate([
        {
          path: "clinic_id",
          select: { clinic_name: 1 },
        },
        // {
        //   path: "createdby_id",
        //   select: { first_name: 1, last_name: 1 },
        // },
        // {
        //   path: "patient_id",
        //   select: {
        //     first_name: 1,
        //     middle_name: 1,
        //     last_name: 1,
        //   },
        // },

        {
          path: "insurance_company_id",
          select: { company_name: 1 },
        },
      ]);

      if (foundInsuranceDetails) {
        //  if (foundInsuranceDetails.patient_id) {
        //   let patientDoc =
        //     DocumentType <
        //     Patients >
        //     foundInsuranceDetails.patient_id;
        //   foundInsuranceDetails.patient_id.first_name =
        //     Utility.getDecryptText(patientDoc.first_name);
        //   foundInsuranceDetails.patient_id.last_name =
        //     Utility.getDecryptText(patientDoc.last_name);
        //   foundInsuranceDetails.patient_id.title =
        //     Utility.getDecryptText(patientDoc.title);
        //}
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: foundInsuranceDetails,
        };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.INSURANCE_DETAILS_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  deleteInsuranceDetails = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let foundInsuranceDetails = await InsuranceModel.findById(req.params._id);

      if (foundInsuranceDetails) {
        let deleteInsuranceDetails = await InsuranceModel.updateOne(
          {
            _id: new mongoose.Types.ObjectId(req.params._id),
          },
          { isActive: false, isDeleted: true }
        );

        if (
          deleteInsuranceDetails &&
          deleteInsuranceDetails.modifiedCount > 0
        ) {
          // Add Activity History
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `insurance details deleted successfully`,
            type: EHistoryActivityTypeValues.PATIENT,
            type_id: foundInsuranceDetails.patient_id,
          });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.DELETE_SUCCESSFULL,
          };
        } else
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.ERROR_INSURANCE__DELETION,
              error: errorMessage.ON_DELETE_ERROR,
            },
          };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.INSURANCE_DETAILS_NOT_FOUND,
            error: errorMessage.ON_DELETE_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  getInsuranceList = async (
    req: Request,
    model: GetInsuranceListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;
      let populateFeilds: any = [
        {
          path: "clinic_id",
          select: { clinic_name: 1 },
        },
        // {
        //   path: "createdby_id",
        //   select: { first_name: 1, last_name: 1 },
        // },
        // {
        //   path: "patient_id",
        //   select: {
        //     first_name: 1,
        //     middle_name: 1,
        //     last_name: 1,
        //   },
        // },

        {
          path: "insurance_company_id",
          select: { company_name: 1 },
        },
      ];

      let condition: any = {
        is_deleted: false,
      };

      // if (model.name) {
      //   let isEmptyNameOnlySpace = /^\s*$/.test(model.name);

      //   if (
      //     isEmptyNameOnlySpace ||
      //     model.name == null ||
      //     model.name === ""
      //   ) {
      //     return {
      //       data: {
      //         message: errorMessage.NON_EMPTY_FIRST_NAME,
      //         error: errorMessage.ON_FETCH_ERROR,
      //       },
      //       success: false,
      //       status_code: HttpStatus.BAD_REQUEST,
      //     };
      //   } else
      //     condition.name = {
      //       $regex: model.name,
      //       $options: "i",
      //     };
      // }

      if (model.isActive) {
        condition.isActive = model.isActive;
      }

      if (model.patient_id) {
        condition.patient_id = model.patient_id;
      }

      if (!model.pageNumber && !model.pageSize) {
        defaultPage = 1;
        count = -1;

        let response = await InsuranceModel.find(condition, {
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
          password: 0,
        })
          .populate(populateFeilds)
          .sort({ createdAt: -1 });

        if (response && response.length > 0) {
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: {
              data: response,
              // count: response.length,
              totalDocs: response.length,
              pageNumber: defaultPage,
              pageSize: response.length,
              totalPages: defaultPage,
            },
          };
        } else {
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.INSURANCE_LIST_NOT_FOUND,
              error: errorMessage.ON_FETCH_ERROR,
            },
          };
        }
      } else if (model.pageNumber && model.pageNumber >= 1 && !model.pageSize) {
        defaultPage = model.pageNumber;
        count = 50;
      } else {
        defaultPage = model.pageNumber || 1;
        count = model.pageSize || 50;
      }
      let tempResult: any;

      let result: mongoose.PaginateResult<any> = await InsuranceModel.paginate(
        {
          ...condition,
          options: {
            projection: {
              createdAt: 0,
              updatedAt: 0,
              __v: 0,
            },
          },
        },
        {
          page: defaultPage,
          ...(count > 0 ? { limit: count } : { pagination: false }),
          populate: populateFeilds,

          sort: { createdAt: -1 },
        }
      );

      tempResult = result;

      if (result && result.docs && result.docs.length > 0) {
        let obj = {
          data: result.docs,
          // count: result.totalDocs,
          totalDocs: result.totalDocs,
          pageNumber: result.page,
          pageSize: result.limit,
          totalPages: Math.ceil(result.totalDocs / result.limit),
        };
        return {
          status_code: HttpStatus.OK,
          data: obj,
          success: true,
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.INSURANCE_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  getInsuranceListWithoutPagination = async (
    req: Request,
    model: GetInsuranceListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let populateFeilds: any = [
        {
          path: "clinic_id",
          select: { clinic_name: 1 },
        },

        // {
        //   path: "insurance_company_id",
        //   select: { company_name: 1 },
        // },
      ];

      let condition: any = {
        is_deleted: false,
      };

      if (model.patient_id) {
        condition.patient_id = model.patient_id;
      }

      let response = await InsuranceModel.find(condition, {
        copay: 1,
        clinic_id: 1,
      })
        .populate(populateFeilds)
        .sort({ createdAt: -1 });

      if (response && response.length > 0) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: {
            data: response,
            // count: response.length,
            totalDocs: response.length,
            pageNumber: 1,
            pageSize: response.length,
            totalPages: 1,
          },
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.INSURANCE_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
  // INSURANCE COMPANY SECTION

  addInsuranceCompany = async (
    req: Request,
    model: AddInsuranceCompanyViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let modelToSave = <InsuranceCompany>model;

      modelToSave.createdby_id = userDetails._id;

      let response = await InsuranceCompanyModel.create(modelToSave);

      if (response) {
        // Add Activity History
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `insurance company added successfully`,
          type: EHistoryActivityTypeValues.CLINIC,
          type_id: model.clinic_id,
        });

        return {
          status_code: HttpStatus.OK,
          success: true,
          data: response,
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.ERROR_ADD_INSURANCE_COMPANIES,
            error: errorMessage.ON_ADD_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  updateInsuranceCompany = async (
    req: Request,
    model: UpdateInsuranceCompanyViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let foundInsuranceCompanyDetails = await InsuranceCompanyModel.findOne({
        _id: model._id,
        // isDeleted: false,
      });

      if (foundInsuranceCompanyDetails) {
        let modelToSave = <InsuranceCompany>model;

        modelToSave.createdby_id = foundInsuranceCompanyDetails.createdby_id;

        modelToSave.clinic_id = foundInsuranceCompanyDetails.clinic_id;

        let response = await InsuranceCompanyModel.updateOne(
          { _id: model._id },
          modelToSave
        );

        if (response && response.modifiedCount > 0) {
          // Add Activity History
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `insurnace company details updated successfully`,
            type: EHistoryActivityTypeValues.CLINIC,
            type_id: foundInsuranceCompanyDetails.clinic_id,
          });

          return {
            status_code: HttpStatus.OK,
            success: true,
            data: true,
          };
        } else {
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.ERROR_UPDATE_INSURANCE,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };
        }
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.INSURANCE_COMPANIES_DETAILS_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  getInsuranceCompanyDetails = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let foundInsuranceDetails = await InsuranceCompanyModel.findOne({
        _id: req.params._id,
        isDeleted: false,
      }).populate([
        {
          path: "clinic_id",
          select: { clinic_name: 1 },
        },
        // {
        //   path: "createdby_id",
        //   select: { first_name: 1, last_name: 1 },
        // },
        // {
        //   path: "patient_id",
        //   select: {
        //     first_name: 1,
        //     middle_name: 1,
        //     last_name: 1,
        //   },
        // },
      ]);

      if (foundInsuranceDetails) {
        //  if (foundInsuranceDetails.patient_id) {
        //   let patientDoc =
        //     DocumentType <
        //     Patients >
        //     foundInsuranceDetails.patient_id;
        //   foundInsuranceDetails.patient_id.first_name =
        //     Utility.getDecryptText(patientDoc.first_name);
        //   foundInsuranceDetails.patient_id.last_name =
        //     Utility.getDecryptText(patientDoc.last_name);
        //   foundInsuranceDetails.patient_id.title =
        //     Utility.getDecryptText(patientDoc.title);
        //}
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: foundInsuranceDetails,
        };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.INSURANCE_DETAILS_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  deleteInsuranceCompanyDetails = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let foundInsuranceComapnyDetails = await InsuranceCompanyModel.findById(
        req.params._id
      );

      if (foundInsuranceComapnyDetails) {
        let deleteInsuranceDetails = await InsuranceCompanyModel.updateOne(
          {
            _id: new mongoose.Types.ObjectId(req.params._id),
          },
          { isActive: false, isDeleted: true }
        );

        if (
          deleteInsuranceDetails &&
          deleteInsuranceDetails.modifiedCount > 0
        ) {
          // Add Activity History
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `insurance company details deleted successfully`,
            type: EHistoryActivityTypeValues.CLINIC,
            type_id: foundInsuranceComapnyDetails.clinic_id,
          });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: true,
          };
        } else
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.ERROR_INSURANCE__DELETION,
              error: errorMessage.ON_DELETE_ERROR,
            },
          };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.INSURANCE_COMPANIES_DETAILS_NOT_FOUND,
            error: errorMessage.ON_DELETE_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  getInsuranceCompanyList = async (
    req: Request,
    model: GetInsuranceCompanyListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;
      let populateFeilds: any = [
        {
          path: "clinic_id",
          select: { clinic_name: 1 },
        },
        // {
        //   path: "createdby_id",
        //   select: { first_name: 1, last_name: 1 },
        // },
        // {
        //   path: "patient_id",
        //   select: {
        //     first_name: 1,
        //     middle_name: 1,
        //     last_name: 1,
        //   },
        // },
      ];

      let condition: any = {
        // isDeleted: false,
      };

      // if (model.name) {
      //   let isEmptyNameOnlySpace = /^\s*$/.test(model.name);

      //   if (
      //     isEmptyNameOnlySpace ||
      //     model.name == null ||
      //     model.name === ""
      //   ) {
      //     return {
      //       data: {
      //         message: errorMessage.NON_EMPTY_FIRST_NAME,
      //         error: errorMessage.ON_FETCH_ERROR,
      //       },
      //       success: false,
      //       status_code: HttpStatus.BAD_REQUEST,
      //     };
      //   } else
      //     condition.name = {
      //       $regex: model.name,
      //       $options: "i",
      //     };
      // }

      if (
        "isActive" in model &&
        model.isActive != undefined &&
        model.isActive != null
      ) {
        condition.isActive = model.isActive;
      }

      if (model.search) {
        //let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

        condition.companyName = {
          $regex: model.search,
          $options: "i",
        };
      }

      if (
        "isDeleted" in model &&
        model.isDeleted != undefined &&
        model.isDeleted != null
      ) {
        condition.isDeleted = model.isDeleted;
      }
      console.log(condition, "condition");

      defaultPage = model.pageNumber ?? 1;
      count = model.pageSize ?? 50;

      let result: mongoose.PaginateResult<any> =
        await InsuranceCompanyModel.paginate(
          {
            ...condition,
            options: {
              projection: {
                createdAt: 0,
                updatedAt: 0,
                __v: 0,
              },
            },
          },
          {
            page: defaultPage,
            ...(count > 0 ? { limit: count } : { pagination: false }),
            populate: populateFeilds,

            sort: { createdAt: -1 },
          }
        );

      if (result && result.docs && result.docs.length > 0) {
        let obj = {
          data: result.docs,
          // count: result.totalDocs,
          totalDocs: result.totalDocs,
          pageNumber: result.page,
          pageSize: result.limit,
          totalPages: Math.ceil(result.totalDocs / result.limit),
        };
        return {
          status_code: HttpStatus.OK,
          data: obj,
          success: true,
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.INSURANCE_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  getInsuranceCompanyDataToExcel = async (
    req: Request,
    model: GetInsuranceCompanyListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      const workbook = await XlsxPopulate.fromBlankAsync();
      let insuranceSheet: any = workbook.sheet("Sheet1");
      let insuranceSheetHeader = [
        "Insurance Name",
        "insurance Address",
        "Status",
      ];

      insuranceSheetHeader.forEach((el, i) => {
        insuranceSheet
          .cell(String.fromCharCode(i + 65) + "1")
          .value(el)
          .style({
            border: true,
            fontFamily: "Calibri",
            fill: {
              type: "solid",
              color: { rgb: "d9d9d9" },
            },
          });
      });
      let defaultPage: number;
      let count: number;
      let populateFeilds: any = [
        {
          path: "clinic_id",
          select: { clinic_name: 1 },
        },
        // {
        //   path: "createdby_id",
        //   select: { first_name: 1, last_name: 1 },
        // },
        // {
        //   path: "patient_id",
        //   select: {
        //     first_name: 1,
        //     middle_name: 1,
        //     last_name: 1,
        //   },
        // },
      ];

      let condition: any = {
        // isDeleted: false,
      };

      // if (model.name) {
      //   let isEmptyNameOnlySpace = /^\s*$/.test(model.name);

      //   if (
      //     isEmptyNameOnlySpace ||
      //     model.name == null ||
      //     model.name === ""
      //   ) {
      //     return {
      //       data: {
      //         message: errorMessage.NON_EMPTY_FIRST_NAME,
      //         error: errorMessage.ON_FETCH_ERROR,
      //       },
      //       success: false,
      //       status_code: HttpStatus.BAD_REQUEST,
      //     };
      //   } else
      //     condition.name = {
      //       $regex: model.name,
      //       $options: "i",
      //     };
      // }

      if (
        "isActive" in model &&
        model.isActive != undefined &&
        model.isActive != null
      ) {
        condition.isActive = model.isActive;
      }

      if (model.search) {
        //let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

        condition.companyName = {
          $regex: model.search,
          $options: "i",
        };
      }

      if (
        "isDeleted" in model &&
        model.isDeleted != undefined &&
        model.isDeleted != null
      ) {
        condition.isDeleted = model.isDeleted;
      }
      console.log(condition, "condition");

      defaultPage = model.pageNumber ?? 1;
      count = model.pageSize ?? 50;

      let result: mongoose.PaginateResult<any> =
        await InsuranceCompanyModel.paginate(
          {
            ...condition,
            options: {
              projection: {
                createdAt: 0,
                updatedAt: 0,
                __v: 0,
              },
            },
          },
          {
            page: defaultPage,
            ...(count > 0 ? { limit: count } : { pagination: false }),
            populate: populateFeilds,

            sort: { createdAt: -1 },
          }
        );

      if (result && result.docs && result.docs.length > 0) {
        // write data in excel
        let insuranceData = result.docs;

        let sheetStyle = {
          border: true,
          fontFamily: "Calibri",
        };

        insuranceData.forEach((el: any, i: number) => {
          insuranceSheet
            .cell("A" + (i + 2))
            .value(el.companyName)
            .style(sheetStyle);

          insuranceSheet
            .cell("B" + (i + 2))
            .value(el.address)
            .style(sheetStyle);

          insuranceSheet
            .cell("C" + (i + 2))
            .value(el.isActive)
            .style(sheetStyle);
          insuranceSheet;
        });

        insuranceSheet.freezePanes(1, 1);

        const data: any = await workbook.outputAsync();
        await fs.writeFileSync(
          path.join(
            __dirname,
            "../../../../../public/upload/insurance/Insurance_Report.xlsx"
          ),
          data
        );
        let link = `http://${req.hostname}:${process.env.PORT}/upload/insurance/Insurance_Report.xlsx`;

        let excelFileName = "Insurance_Report.xlsx";
        let response = {
          link,
          name: excelFileName,
        };
        return {
          status_code: HttpStatus.OK,
          data: response, //link,
          success: true,
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.INSURANCE_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  //Eap Insurance Section
  addEapInsurance = async (
    req: Request,
    model: AddEapInsuranceViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let foundInsuranceDetails = await EapInsuranceModel.findOne({
        patient_id: model.patient_id,
      });
      if (foundInsuranceDetails)
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.ERROR_ALRAEDY_EXIST_INSURANCE,
            error: errorMessage.ON_ADD_ERROR,
          },
        };
      let modelToSave = <Eap>model;

      modelToSave.createdby_id = userDetails._id;

      let response = await EapInsuranceModel.create(modelToSave);

      if (response) {
        // Add Activity History
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `patient eap insurance added successfully`,
          type: EHistoryActivityTypeValues.PATIENT,
          type_id: model.patient_id,
        });

        return {
          status_code: HttpStatus.OK,
          success: true,
          data: response,
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.ERROR_ADD_INSURANCE,
            error: errorMessage.ON_ADD_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  updateEapInsurance = async (
    req: Request,
    model: UpdateEapInsuranceViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let foundInsuranceDetails = await EapInsuranceModel.findOne({
        patient_id: model.patient_id,
        // isDeleted: false,
      });

      if (foundInsuranceDetails) {
        let modelToSave = <Eap>model;

        modelToSave.createdby_id = foundInsuranceDetails.createdby_id;

        modelToSave.clinic_id = foundInsuranceDetails.clinic_id;

        let response = await EapInsuranceModel.updateOne(
          { _id: foundInsuranceDetails._id },
          modelToSave
        );

        if (response && response.modifiedCount > 0) {
          // Add Activity History
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `patient eap insurnace details updated successfully`,
            type: EHistoryActivityTypeValues.PATIENT,
            type_id: foundInsuranceDetails.patient_id,
          });

          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.UPDATE_SUCCESSFULL,
          };
        } else {
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.ERROR_UPDATE_INSURANCE,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };
        }
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.INSURANCE_DETAILS_NOT_FOUND,
            error: errorMessage.ON_UPDATE_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  getEapInsuranceDetails = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let foundInsuranceDetails = await EapInsuranceModel.findOne({
        patient_id: new mongoose.Types.ObjectId(req.params._id),
      }).populate([
        {
          path: "clinic_id",
          select: { clinic_name: 1 },
        },

        {
          path: "patient_id",
          select: {
            first_name: 1,
            middle_name: 1,
            last_name: 1,
            title: 1,
          },
        },
      ]);

      if (foundInsuranceDetails) {
        if (foundInsuranceDetails.patient_id) {
          let patientDoc = <DocumentType<Patients>>(
            foundInsuranceDetails.patient_id
          );
          patientDoc.first_name = Utility.getDecryptText(patientDoc.first_name);
          patientDoc.last_name = Utility.getDecryptText(patientDoc.last_name);
          patientDoc.title = Utility.getDecryptText(patientDoc.title);

          foundInsuranceDetails.patient_id = patientDoc;
        }
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: foundInsuranceDetails,
        };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.INSURANCE_DETAILS_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  //HMO Insurance Section
  addHmoInsurance = async (
    req: Request,
    model: AddHmoInsuranceViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let foundInsuranceDetails = await HmoInsuranceModel.findOne({
        patient_id: model.patient_id,
      });
      if (foundInsuranceDetails)
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.ERROR_ALRAEDY_EXIST_INSURANCE,
            error: errorMessage.ON_ADD_ERROR,
          },
        };
      let modelToSave = <Hmo>model;

      modelToSave.createdby_id = userDetails._id;

      let response = await HmoInsuranceModel.create(modelToSave);

      if (response) {
        // Add Activity History
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `patient hmo insurance added successfully`,
          type: EHistoryActivityTypeValues.PATIENT,
          type_id: model.patient_id,
        });

        return {
          status_code: HttpStatus.OK,
          success: true,
          data: response,
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.ERROR_ADD_INSURANCE,
            error: errorMessage.ON_ADD_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  updateHmoInsurance = async (
    req: Request,
    model: UpdateHmoInsuranceViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let foundInsuranceDetails = await HmoInsuranceModel.findOne({
        patient_id: model.patient_id,

        // isDeleted: false,
      });

      if (foundInsuranceDetails) {
        let modelToSave = <Hmo>model;

        modelToSave.createdby_id = foundInsuranceDetails.createdby_id;

        modelToSave.clinic_id = foundInsuranceDetails.clinic_id;

        let response = await HmoInsuranceModel.updateOne(
          { _id: foundInsuranceDetails._id },
          modelToSave
        );

        if (response && response.modifiedCount > 0) {
          // Add Activity History
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `patient hmo insurnace details updated successfully`,
            type: EHistoryActivityTypeValues.PATIENT,
            type_id: foundInsuranceDetails.patient_id,
          });

          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.UPDATE_SUCCESSFULL,
          };
        } else {
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.ERROR_UPDATE_INSURANCE,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };
        }
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.INSURANCE_DETAILS_NOT_FOUND,
            error: errorMessage.ON_UPDATE_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  getHmoInsuranceDetails = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let foundInsuranceDetails = await HmoInsuranceModel.findOne({
        patient_id: new mongoose.Types.ObjectId(req.params._id),
      }).populate([
        {
          path: "clinic_id",
          select: { clinic_name: 1 },
        },

        {
          path: "patient_id",
          select: {
            first_name: 1,
            middle_name: 1,
            last_name: 1,
            title: 1,
          },
        },
      ]);

      if (foundInsuranceDetails) {
        if (foundInsuranceDetails.patient_id) {
          let patientDoc = <DocumentType<Patients>>(
            foundInsuranceDetails.patient_id
          );
          patientDoc.first_name = Utility.getDecryptText(patientDoc.first_name);
          patientDoc.last_name = Utility.getDecryptText(patientDoc.last_name);
          patientDoc.title = Utility.getDecryptText(patientDoc.title);

          foundInsuranceDetails.patient_id = patientDoc;
        }
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: foundInsuranceDetails,
        };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.INSURANCE_DETAILS_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  //PPOInsurance Section
  addPpoInsurance = async (
    req: Request,
    model: AddPpoInsuranceViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let modelToSave = <Ppo>model;

      modelToSave.createdby_id = userDetails._id;

      let foundInsuranceDetails = await PpoInsuranceModel.findOne({
        patient_id: model.patient_id,
      });
      if (foundInsuranceDetails)
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.ERROR_ALRAEDY_EXIST_INSURANCE,
            error: errorMessage.ON_ADD_ERROR,
          },
        };
      let response = await PpoInsuranceModel.create(modelToSave);

      if (response) {
        // Add Activity History
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `patient ppo insurance added successfully`,
          type: EHistoryActivityTypeValues.PATIENT,
          type_id: model.patient_id,
        });

        return {
          status_code: HttpStatus.OK,
          success: true,
          data: response,
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.ERROR_ADD_INSURANCE,
            error: errorMessage.ON_ADD_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  updatePpoInsurance = async (
    req: Request,
    model: UpdatePpoInsuranceViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let foundInsuranceDetails = await PpoInsuranceModel.findOne({
        patient_id: model.patient_id,

        // isDeleted: false,
      });

      if (foundInsuranceDetails) {
        let modelToSave = <Ppo>model;

        modelToSave.createdby_id = foundInsuranceDetails.createdby_id;

        modelToSave.clinic_id = foundInsuranceDetails.clinic_id;

        let response = await PpoInsuranceModel.updateOne(
          { _id: foundInsuranceDetails._id },
          modelToSave
        );

        if (response && response.modifiedCount > 0) {
          // Add Activity History
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `patient ppo insurnace details updated successfully`,
            type: EHistoryActivityTypeValues.PATIENT,
            type_id: foundInsuranceDetails.patient_id,
          });

          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.UPDATE_SUCCESSFULL,
          };
        } else {
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.ERROR_UPDATE_INSURANCE,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };
        }
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.INSURANCE_DETAILS_NOT_FOUND,
            error: errorMessage.ON_UPDATE_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  getPpoInsuranceDetails = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let foundInsuranceDetails = await PpoInsuranceModel.findOne({
        patient_id: new mongoose.Types.ObjectId(req.params._id),
      }).populate([
        {
          path: "clinic_id",
          select: { clinic_name: 1 },
        },

        {
          path: "patient_id",
          select: {
            first_name: 1,
            middle_name: 1,
            last_name: 1,
            title: 1,
          },
        },
      ]);

      if (foundInsuranceDetails) {
        if (foundInsuranceDetails.patient_id) {
          let patientDoc = <DocumentType<Patients>>(
            foundInsuranceDetails.patient_id
          );
          patientDoc.first_name = Utility.getDecryptText(patientDoc.first_name);
          patientDoc.last_name = Utility.getDecryptText(patientDoc.last_name);
          patientDoc.title = Utility.getDecryptText(patientDoc.title);

          foundInsuranceDetails.patient_id = patientDoc;
        }
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: foundInsuranceDetails,
        };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.INSURANCE_DETAILS_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };
}
export default new InsuranceServices();
