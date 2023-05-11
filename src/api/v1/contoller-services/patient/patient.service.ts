import { DocumentType } from "@typegoose/typegoose";
import bcrypt from "bcrypt";
import { NextFunction, Request } from "express";

import HttpStatus from "http-status-codes";
import moment from "moment";
import mongoose from "mongoose";
import Utility, { IServiceResult1 } from "../../common/common-methods";
import errorMessage from "../../common/erros_message";
import AppointmentModel, { Appointment } from "../../models/appointment.model";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";

import DoctorModel from "../../models/doctor.model";
import FetchDataModel from "../../models/fetch_data.model";
import PatientModel, { Patients } from "../../models/patient.model";
import RolesModel from "../../models/roles.model";
import { User } from "../../models/user.model";

import fs from "fs";
import path from "path";
import XlsxPopulate from "xlsx-populate";
import AssignProviderModel, {
  AssignProvider,
} from "../../models/assigned_provider.model";
import BillingCheckoutModel from "../../models/billing_checkout.model";
import BillingPaymentModel from "../../models/billing_payment.model";
import BillingPostPaymentModel from "../../models/billing_post_payment.model";
import CardsModel from "../../models/cards.model";
import CptCodeModel from "../../models/cpt.model";
import DoctorCheckoutModel from "../../models/doctor_checkout.model";
import EpriscriptionModel from "../../models/epriscription.model";
import FilledDynamicFormModel from "../../models/filled_dynamic_form.model";
import FilledProgressNotesModel from "../../models/filled_progress_notes.model";
import FilledTreatmentPlanModel from "../../models/filled_treatment_plan.model";
import HmoModel from "../../models/insurance/hmo.model";
import InsuranceModel from "../../models/insurance/insurance.model";
import PpoModel from "../../models/insurance/ppo.model";
//import PatientCardAssociationModel from "../../models/patient_card_association.model";
import PatientDocsModel from "../../models/patient_document.model";
import SuperBillModel from "../../models/super_bill.model";

import axios from "axios";
import PatientDocModel, {
  PatientsDoc,
} from "../../models/patient_document.model";
import {
  AddPatientDocumentViewmodel,
  AddPatientViewmodel,
  AssignProviderViewmodel,
  ExportPatientListViewmodel,
  FetchPatientViewmodel,
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
} from "../../view-models/patients";
import { EAssProvTypeValues } from "../../view-models/patients/assigned_provider_to_patients.viewmodel";

export enum EnumRoles {
  SUPERADMIN = "superadmin",
}

class PatientServices {
  addPatient = async (
    req: Request,
    model: AddPatientViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let patientRole = await RolesModel.findOne({
        roleName: "patient",
      });
      let userDetails = <DocumentType<User>>req.user;

      console.log(model);

      // return {
      //   status_code: HttpStatus.OK,
      //   success: true,
      //   data: [],
      // };

      let modelToSave = <Patients>model;
      modelToSave.role = patientRole!._id;

      modelToSave.role_permission =
        patientRole && patientRole!.permission ? patientRole!.permission : {};

      if (model.password) {
        let salt = await bcrypt.genSalt(11);
        modelToSave.password = await bcrypt.hash(model.password, salt);
      }
      /** Genrating Patient random id */
      modelToSave.patientId =
        model.first_name.slice(0, 1).toUpperCase() +
        model.last_name.slice(0, 1).toUpperCase() +
        Math.floor(1000000 + Math.random() * 9000).toString();

      // encrypt first name , last name and title of patient details

      modelToSave.first_name = Utility.getEncryptText(
        model.first_name.toUpperCase()
      );
      modelToSave.last_name = Utility.getEncryptText(
        model.last_name.toUpperCase()
      );
      if (model.middle_name) {
        modelToSave.middle_name = Utility.getEncryptText(
          model.middle_name.toUpperCase()
        );
      }

      // modelToSave.title = Utility.getEncryptText(
      //   model.title.toUpperCase()
      // );

      modelToSave.createdby_id = userDetails._id;

      let response = await PatientModel.create(modelToSave);

      if (response) {
        // Add Activity History
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `patient added successfully`,
          type: EHistoryActivityTypeValues.PATIENT,
          type_id: response._id,
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
            message: errorMessage.ERROR_ADD_PATIENT,
            error: errorMessage.ON_ADD_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  updatePatient = async (
    req: Request,
    model: UpdatePatientViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let patientRole = await RolesModel.findOne({
        roleName: "patient",
      });
      let userDetails = <DocumentType<User>>req.user;

      let foundPatient = await PatientModel.findById({
        _id: model._id,
      });

      if (foundPatient) {
        let modelToSave = <Patients>(<unknown>model);

        // encrypt first name , last name and title of patient details
        let firstNamePatientId;
        if (model.first_name) {
          //update patient id first charatcer

          modelToSave.patientId = Utility.replaceCharacter(
            foundPatient.patientId,
            0,
            model.first_name.charAt(0).toUpperCase()
          );

          firstNamePatientId = modelToSave.patientId;

          modelToSave.first_name = Utility.getEncryptText(
            model.first_name.toUpperCase()
          );
        }

        if (model.last_name) {
          //update patient id 2nd charatcer
          let patientIdNeedToReplaced = firstNamePatientId
            ? firstNamePatientId
            : foundPatient.patientId;
          modelToSave.patientId = Utility.replaceCharacter(
            patientIdNeedToReplaced,
            1,
            model.last_name.charAt(0).toUpperCase()
          );

          modelToSave.last_name = Utility.getEncryptText(
            model.last_name.toUpperCase()
          );
        }

        if (model.title) {
          modelToSave.title = Utility.getEncryptText(model.title);
        }

        if (model.middle_name) {
          modelToSave.middle_name = Utility.getEncryptText(
            model.middle_name.toUpperCase()
          );
        }

        modelToSave.createdby_id = foundPatient.createdby_id;

        modelToSave.role = foundPatient.role;

        modelToSave.clinic_id = foundPatient.clinic_id;

        modelToSave.responsible_person = model.responsible_person
          ? model.responsible_person
          : "";

        let updationResult = await PatientModel.updateOne(
          { _id: model._id },
          modelToSave
        );

        if (updationResult && updationResult.modifiedCount > 0) {
          // Add Activity History
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `patient updated successfully`,
            type: EHistoryActivityTypeValues.PATIENT,
            type_id: foundPatient._id,
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
              message: errorMessage.ERROR_UPDATE_PATIENT,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };
        }
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.PATIENT_DETAILS_NOT_FOUND,
            error: errorMessage.ON_UPDATE_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  getPatientDetails = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let foundPatient = await PatientModel.findOne({
        _id: req.params._id,
        // isDeleted: false,
      }).populate([
        {
          path: "clinic_id",
          select: { clinic_name: 1 },
        },
        {
          path: "state",
          select: { stateName: 1 },
        },
        {
          path: "country",
          select: { countryName: 1 },
        },
        {
          path: "financialClass_id",
          select: { code: 1 },
        },
      ]);

      if (foundPatient) {
        foundPatient.first_name = Utility.getDecryptText(
          foundPatient.first_name
        );
        foundPatient.middle_name = Utility.getDecryptText(
          foundPatient.middle_name
        );
        foundPatient.last_name = Utility.getDecryptText(foundPatient.last_name);
        foundPatient.title = Utility.getDecryptText(foundPatient.title);

        return {
          status_code: HttpStatus.OK,
          success: true,
          data: foundPatient,
        };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.PATIENT_DETAILS_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  deletePatientDetails = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let foundPatient = await PatientModel.findById(req.params._id);

      if (foundPatient) {
        let deletePatientDetails = await PatientModel.updateOne(
          {
            _id: new mongoose.Types.ObjectId(req.params._id),
          },
          { isActive: false, isDeleted: true }
        );

        if (deletePatientDetails && deletePatientDetails.modifiedCount > 0) {
          // Add Activity History
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `patient deleted successfully`,
            type: EHistoryActivityTypeValues.PATIENT,
            type_id: foundPatient._id,
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
              message: errorMessage.ERROR_PATIENT_DELETION,
              error: errorMessage.ON_DELETE_ERROR,
            },
          };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.PATIENT_DETAILS_NOT_FOUND,
            error: errorMessage.ON_DELETE_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  getPatientList = async (
    req: Request,
    model: GetPatientListViewmodel,
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
        {
          path: "state",
          select: { stateName: 1 },
        },
        {
          path: "country",
          select: { countryName: 1 },
        },
      ];

      let condition: any = {};

      if (model.isActive) {
        condition.isActive = model.isActive;
      }

      if (model.clinicId) {
        condition.clinic_id = model.clinicId;
      }

      if (model.isDeleted == true || model.isDeleted == false) {
        condition.isDeleted = model.isDeleted;
      }
      if (!model.pageNumber && !model.pageSize) {
        defaultPage = 1;
        count = -1;

        let response = await PatientModel.find(condition, {
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
          password: 0,
        })
          .populate(populateFeilds)
          .sort({ createdAt: -1 });

        if (response && response.length > 0) {
          // decrypt patient info

          response.forEach((foundPatient) => {
            foundPatient.first_name = Utility.getDecryptText(
              foundPatient.first_name
            );
            foundPatient.last_name = Utility.getDecryptText(
              foundPatient.last_name
            );
            foundPatient.title = Utility.getDecryptText(foundPatient.title);
          });

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
              message: errorMessage.CLINIC_GROUP_LIST_NOT_FOUND,
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

      let result: mongoose.PaginateResult<any> = await PatientModel.paginate(
        {
          ...condition,
        },
        {
          page: defaultPage,
          ...(count > 0 ? { limit: count } : { pagination: false }),
          populate: populateFeilds,

          options: {
            projection: {
              password: 0,
              createdAt: 0,
              updatedAt: 0,
              __v: 0,
            },
          },
          sort: { createdAt: -1 },
        }
      );

      tempResult = result;

      if (result && result.docs && result.docs.length > 0) {
        let obj: any;
        let finalResponse: any = [];
        if (model.name) {
          let isEmptyNameOnlySpace = /^\s*$/.test(model.name);

          if (isEmptyNameOnlySpace || model.name == null || model.name === "") {
            return {
              data: {
                message: errorMessage.NON_EMPTY_FIRST_NAME,
                error: errorMessage.ON_FETCH_ERROR,
              },
              success: false,
              status_code: HttpStatus.BAD_REQUEST,
            };
          }

          result.docs.forEach((patientObj) => {
            if (
              Utility.getDecryptText(patientObj.first_name) ===
                model.name!.toUpperCase() ||
              Utility.getDecryptText(patientObj.last_name) ===
                model.name!.toUpperCase()
            )
              finalResponse.push(patientObj);
          });
        } else {
          finalResponse = result.docs;
        }

        // Decrypt patient info
        finalResponse.forEach((foundPatient: any) => {
          foundPatient.first_name = Utility.getDecryptText(
            foundPatient.first_name
          );
          foundPatient.last_name = Utility.getDecryptText(
            foundPatient.last_name
          );

          foundPatient.middle_name = foundPatient.middle_name
            ? Utility.getDecryptText(foundPatient.middle_name)
            : "";
          foundPatient.title = Utility.getDecryptText(foundPatient.title);
        });
        //Added by Ankit 07-04-2023
        // sort list with patient name alphabetically
        const sortedList = finalResponse.sort((a: any, b: any) =>
          a.first_name.localeCompare(b.first_name)
        );

        obj = {
          data: sortedList,
          // count: result.totalDocs,
          totalDocs: result.totalDocs,
          pageNumber: result.page,
          pageSize: result.limit,
          totalPages: Math.ceil(finalResponse.length / result.limit),
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
            message: errorMessage.PATIENT_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  getPatientPaymentList = async (
    req: Request,
    model: PatientPaymentListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;
      let populateFeilds: any = [
        // {
        //   path: "clinic_id",
        //   select: { clinic_name: 1 },
        // },
        {
          path: "createdby_id",
          select: { first_name: 1, last_name: 1 },
        },
      ];

      let condition: any = {
        clinic_id: model.clinic_id,
        patient_id: model.patient_id,
      };

      defaultPage = model.pageNumber ? model.pageNumber : 1;
      count = model.pageSize ? model.pageSize : 50;

      let tempResult: any;

      let result: mongoose.PaginateResult<any> =
        await BillingPaymentModel.paginate(
          {
            ...condition,
          },
          {
            page: defaultPage,
            ...(count > 0 ? { limit: count } : { pagination: false }),
            populate: populateFeilds,

            options: {
              projection: {
                updatedAt: 0,
                __v: 0,
              },
            },
            sort: { createdAt: -1 },
          }
        );

      tempResult = result;

      if (result && result.docs && result.docs.length > 0) {
        let obj: any;

        obj = {
          data: result.docs,
          // count: result.totalDocs,
          totalDocs: result.totalDocs,
          pageNumber: result.page,
          pageSize: result.limit,
          totalPages: Math.ceil(result.docs.length / result.limit),
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
            message: errorMessage.NO_RECORD_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  exportPatientPaymentDataToExcel = async (
    req: Request,
    model: PatientPaymentListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      const workbook = await XlsxPopulate.fromBlankAsync();
      let patientSheet: any = workbook.sheet("Sheet1");
      let patientSheetHeader = [
        "Payment Date",
        "Date Of Service",
        "Type",
        "Mode",
        "CC Mode",
        "Details",
        "Paid By",
        "Amount($)",
      ];

      patientSheetHeader.forEach((el, i) => {
        patientSheet
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
        // {
        //   path: "clinic_id",
        //   select: { clinic_name: 1 },
        // },
        {
          path: "createdby_id",
          select: { first_name: 1, last_name: 1 },
        },
        {
          path: "appointment_id",
          select: { startDateTime: 1 },
        },
      ];

      let condition: any = {
        clinic_id: model.clinic_id,
        patient_id: model.patient_id,
      };

      defaultPage = model.pageNumber ? model.pageNumber : 1;
      count = model.pageSize ? model.pageSize : 500000;

      let tempResult: any = [];

      let result: mongoose.PaginateResult<any> =
        await BillingPaymentModel.paginate({
          ...condition,
        });

      tempResult = result.docs;

      if (result && result.docs && result.docs.length > 0) {
        if (tempResult.length <= 0)
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.NO_RECORD_FOUND,
              error: errorMessage.ON_FETCH_ERROR,
            },
          };

        let Patientdata = tempResult;

        let sheetStyle = {
          border: true,
          fontFamily: "Calibri",
        };

        Patientdata.forEach((el: any, i: number) => {
          let apptData = <DocumentType<Appointment>>el.appointment_id;
          patientSheet
            .cell("A" + (i + 2))
            .value(moment(el.createdAt).format("lll"))
            .style(sheetStyle);
          patientSheet;

          patientSheet
            .cell("B" + (i + 2))
            .value(moment(apptData.startDateTime).format("lll"))
            .style(sheetStyle);

          patientSheet
            .cell("C" + (i + 2))
            .value(el.mode)
            .style(sheetStyle);

          patientSheet
            .cell("D" + (i + 2))
            .value(el.mode !== "CASH" ? "Online" : "Offline")
            .style(sheetStyle);

          patientSheet
            .cell("E" + (i + 2))
            .value(el.mode !== "CASH" ? "Online" : "Offline")
            .style(sheetStyle);
          patientSheet
            .cell("F" + (i + 2))
            .value(el.remark)
            .style(sheetStyle);
          patientSheet
            .cell("G" + (i + 2))
            .value(el.mode !== "CASH" ? "BANK" : "Patient")
            .style(sheetStyle);
          patientSheet
            .cell("H" + (i + 2))
            .value(el.amount)
            .style(sheetStyle);
        });

        patientSheet.freezePanes(1, 1);

        const data: any = await workbook.outputAsync();
        await fs.writeFileSync(
          path.join(
            __dirname,
            "../../../../../public/upload/patients/payments/Payment_Report.xlsx"
          ),
          data
        );
        let link = `http://${req.hostname}:${process.env.PORT}/upload/patients/payments/Payment_Report.xlsx`;

        let excelFileName = "Payment_Report.xlsx";
        let response = {
          link,
          name: excelFileName,
        };
        return {
          status_code: HttpStatus.OK,
          data: response, //link, //errorMessage.ExecutedSuccessfully,
          success: true,
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.NO_RECORD_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  getPatientListWithoutPagination = async (
    req: Request,
    model: GetPatientListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let condition: any = {
        isDeleted: false,
        isActive: true,
        //clinic_id: model.clinicId,
      };

      if (model.clinicId) condition.clinic_id = model.clinicId;
      let response = await PatientModel.find(condition, {
        first_name: 1,
        last_name: 1,
        middle_name: 1,
        isVerified: 1,
        patientId: 1,
      }).sort({ createdAt: -1 });

      if (response && response.length > 0) {
        // decrypt patient info

        response.forEach((foundPatient) => {
          foundPatient.first_name = foundPatient.first_name
            ? Utility.getDecryptText(foundPatient.first_name)
            : foundPatient.first_name;
          foundPatient.last_name = foundPatient.last_name
            ? Utility.getDecryptText(foundPatient.last_name)
            : foundPatient.last_name;
          foundPatient.title = foundPatient.title
            ? Utility.getDecryptText(foundPatient.title)
            : foundPatient.title;
        });

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
            message: errorMessage.PATIENT_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  pendingCheckoutPatientListNotUsed = async (
    req: Request,
    model: PendingCheckoutPatientViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;

      let populateFeilds: any = [
        {
          path: "patient_id",
          select: ["first_name", "last_name", "patientId", "image"],
        },
      ];

      let condition: any = {
        isDeleted: false,
        status: "Accepted",
        //clinic_id: model.clinic_id,
      };

      if (model.clinic_id) condition.clinic_id = model.clinic_id;
      if (model.doctor_id) condition.doctor_id = model.doctor_id;
      if (model.location_id) condition.location_id = model.location_id;

      if (model.startDateFilter && model.endDateFilter)
        condition.startDateTime = {
          $gte: new Date(model.startDateFilter),
          $lt: new Date(model.endDateFilter),
        };
      else {
        if (
          new Date(model.nowTime ? model.nowTime : new Date()).toString() ==
          "Invalid Date"
        )
          return {
            status_code: HttpStatus.UNAUTHORIZED,
            success: false,
            data: {
              message: errorMessage.dateReq,
              error: errorMessage.ON_FETCH_ERROR,
            },
          };

        let startDate = moment(model.nowTime).utc();
        let endDate = moment(model.nowTime).utc();
        if (model.days) {
          switch (model.days) {
            case "TODAY":
              endDate = moment.utc(new Date());
              break;

            case "LAST7":
              startDate = moment(endDate).subtract(7, "days").utc();
              break;

            case "LAST_MONTH":
              startDate = moment(startDate)
                .subtract(1, "month")
                .startOf("month")
                .utc();
              endDate = moment(startDate).endOf("month").utc();
              break;

            default:
              return {
                status_code: HttpStatus.UNAUTHORIZED,
                success: false,
                data: {
                  message: errorMessage.SomeThingWentWrong,
                  error: errorMessage.ON_FETCH_ERROR,
                },
              };
          }
        }

        // condition.startDateTime = {
        //   $gte: new Date(model.nowTime),
        //   $lt: new Date(model.nowTime),
        // };
      }

      const child_condition: any = {};

      if (model.searchText && model.searchText !== "") {
        const searchText = decodeURIComponent(model.searchText).replace(
          /[[\]{}()*+?,\\^$|#\s]/g,
          "\\s+"
        );

        child_condition.$or = [
          {
            "patientData.first_name": new RegExp(
              Utility.getEncryptText(searchText.toUpperCase()),
              "gi"
            ),
          },
          {
            "patientData.last_name": new RegExp(
              Utility.getEncryptText(searchText.toUpperCase()),
              "gi"
            ),
          },
        ];
      }

      let startTime = new Date(model.nowTime ? model.nowTime : new Date());
      startTime.setHours(0, 0, 0, 0);
      let endTime = new Date(model.nowTime ? model.nowTime : new Date());
      endTime.setHours(23, 59, 59, 999);
      condition.startDateTime = {
        // $gte: startTime,
        $lte: endTime,
      };

      defaultPage = model.pageNumber ? model.pageNumber : 1;
      count = model.pageSize ? model.pageSize : 50;
      let result: mongoose.PaginateResult<any> =
        await AppointmentModel.paginate(
          condition,

          {
            page: defaultPage,
            ...(count > 0 ? { limit: count } : { pagination: false }),
            populate: populateFeilds,

            sort: { createdAt: -1 },
          }
        );

      if (result && result.docs && result.docs.length > 0) {
        let finalResult: any = [];
        let temp_patient: any = {};
        result.docs.forEach((appointment: any) => {
          if (appointment.patient_id) {
            temp_patient = {
              _id: appointment.patient_id._id,
              image: appointment.patient_id.image,
              //_id: appointment.patient_id._id,
              patientId: appointment.patient_id.patientId,
              first_name: Utility.getDecryptText(
                appointment.patient_id.first_name
              ),
              last_name: Utility.getDecryptText(
                appointment.patient_id.last_name
              ),
            };
          }
          // console.log(appointment.patient_id.first_name);
          // // if (appointment.patient_id) {
          // appointment.patient_id.first_name =
          //   appointment.patient_id && appointment.patient_id.first_name
          //     ? Utility.getDecryptText(appointment.patient_id.first_name)
          //     : "";
          // appointment.patient_id.last_name =
          //   appointment.patient_id && appointment.patient_id.last_name
          //     ? Utility.getDecryptText(appointment.patient_id.last_name)
          //     : "";
          // }

          let temp: any = {
            title: appointment.title,
            status: appointment.status,
            patientData: temp_patient,
            endDateTime: appointment.endDateTime,

            startDateTime: appointment.startDateTime,
            appointment_number: appointment.appointment_number,
            appointment_id: appointment._id,

            checkInTime: appointment.startDateTime,
            isRecurring: appointment.recurring
              ? appointment.recurring.status
              : false,
            rescheduleData: {
              type: appointment.type,
            },
            bookedBy:
              appointment.patient_id &&
              appointment.patient_id._id &&
              appointment.patient_id._id.toString() ===
                appointment.createdby_id.toString()
                ? "PATIENT"
                : "CLINIC",
          };

          finalResult.push(temp);
        });
        let obj = {
          data: finalResult,
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
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.NO_RECORD_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  pendingCheckoutPatientList = async (
    req: Request,
    model: PendingCheckoutPatientViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      const {
        nowTime,
        clinic_id,
        doctor_id,
        location_id,
        patient_id,

        days,
      } = model;

      let count = model.pageSize ? model.pageSize : 50;
      req.body.page = model.pageNumber ? model.pageNumber : 1;
      let skip = count * (req.body.page - 1);

      let condition: any = {
          isDeleted: false,
          status: "Accepted",
          // clinic_id: new mongoose.Types.ObjectId(
          //   clinic_id.toString()
          // ),
        },
        sortObject = { startDateTime: -1 };

      if (clinic_id)
        condition.clinic_id = new mongoose.Types.ObjectId(clinic_id.toString());

      if (doctor_id)
        condition.doctor_id = new mongoose.Types.ObjectId(doctor_id.toString());
      if (location_id)
        condition.location_id = new mongoose.Types.ObjectId(
          location_id!.toString()
        );

      if (model.startDateFilter && model.endDateFilter)
        condition.startDateTime = {
          $gte: new Date(model.startDateFilter),
          $lte: new Date(model.endDateFilter),
        };
      else {
        // if (nowTime)
        //   condition.startDateTime = {
        //     $lte: new Date(nowTime),
        //   };
        // // else
        condition.startDateTime = {
          $lte: new Date(),
        };
      }

      let child_condition: any = {};

      if (patient_id) {
        child_condition = {
          "patientData._id": new mongoose.Types.ObjectId(
            model.patient_id!.toString()
          ),
        };
      }

      const data = await AppointmentModel.aggregate([
        { $match: condition },

        {
          $lookup: {
            from: "patients",
            let: { patient_id: "$patient_id" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$patient_id"] },
                },
              },
              {
                $project: {
                  first_name: 1,
                  patientId: 1,
                  last_name: 1,
                  image: 1,
                },
              },
            ],
            as: "patientData",
          },
        },
        {
          $unwind: {
            path: "$patientData",
            preserveNullAndEmptyArrays: true,
          },
        },

        { $match: child_condition },

        {
          $facet: {
            totalCount: [{ $count: "sum" }],
            aggregatedData: [
              {
                $project: {
                  _id: 0,
                  title: 1,
                  status: 1,
                  patientData: 1,
                  endDateTime: 1,
                  // doctorData: 1,
                  // clinicData: 1,
                  startDateTime: 1,
                  appointment_number: 1,
                  appointment_id: "$_id",
                  // color: '$apptTypeData.color',
                  checkInTime: "$startDateTime",
                  isRecurring: "$recurring.status",
                  rescheduleData: {
                    type: "$reschedule.type",
                  },
                  bookedBy: {
                    $cond: {
                      if: {
                        $eq: ["$patient_id", "$createdby_id"],
                      },
                      then: "PATIENT",
                      else: "CLINIC",
                    },
                  },
                },
              },
              // { $sort: sortObject },
              { $limit: skip + count },
              { $skip: skip },
            ],
          },
        },
      ]);

      if (data[0].aggregatedData.length) {
        data[0].aggregatedData.forEach((appointment) => {
          if (appointment.patientData) {
            appointment.patientData.first_name = appointment.patientData
              .first_name
              ? Utility.getDecryptText(appointment.patientData.first_name)
              : "";
            appointment.patientData.last_name = appointment.patientData
              .last_name
              ? Utility.getDecryptText(appointment.patientData.last_name)
              : "";
          }
        });

        ///////////////
        let obj: any = {};
        obj = {
          data: data[0].aggregatedData,

          totalDocs: data[0].totalCount[0].sum,
        };

        if (model.searchText) {
          console.log(model.searchText);
          let finalResponse: any = [];

          data[0].aggregatedData.forEach((appointment: any) => {
            if (appointment.patientData) {
              if (
                Utility.getDecryptText(
                  appointment.patientData.first_name
                ).toUpperCase() === model.searchText!.toUpperCase() ||
                Utility.getDecryptText(
                  appointment.patientData.last_name
                ).toUpperCase() === model.searchText!.toUpperCase()
              )
                finalResponse.push(appointment);
            }
          });
          obj = {
            data: finalResponse,

            totalDocs: finalResponse.length,
          };
        }

        return {
          status_code: HttpStatus.OK,
          data: obj,
          success: true,
        };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.NO_RECORD_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  checkoutList = async (
    req: Request,
    model: PendingCheckoutPatientViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      switch (model.tab) {
        case "PENDING":
          return await this.pendingCheckoutPatientList(req, model, next);
          break;

        case "NO_SHOW":
        case "CHECKED_OUT":
        case "NO_SHOW_CHARGABLE":
          return await this.checkedOutPatient(req, model, next);
          break;

        default:
          return {
            status_code: HttpStatus.UNAUTHORIZED,
            success: false,
            data: {
              message: errorMessage.SomeThingWentWrong,
              error: errorMessage.ON_FETCH_ERROR,
            },
          };
      }
    } catch (error) {
      next(error);
    }
  };

  checkedOutPatient = async (
    req: Request,
    model: PendingCheckoutPatientViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let count = model.pageSize ? model.pageSize : 50;
      req.body.page = model.pageNumber ? model.pageNumber : 1;
      let skip = count * (req.body.page - 1);

      let sortObject = { checkoutTime: -1 };

      let condition: any = {};
      let apptCondition: any = {};
      condition = {
        // clinic_id: new mongoose.Types.ObjectId(model.clinic_id!.toString()),
      };
      if (model.clinic_id)
        condition.clinic_id = new mongoose.Types.ObjectId(
          model.clinic_id!.toString()
        );
      if (model.tab == "NO_SHOW") {
        if (
          "chargePatient" in model &&
          model.chargePatient != undefined &&
          model.chargePatient != null
        ) {
          condition.chargePatient = model.chargePatient;
        }
        if (model.startDateFilter && model.endDateFilter) {
          // if (!model.todayCase == true)
          // condition.checkoutTime = {
          //   $lt: new Date(moment(model.nowTime).add(24, "h")),
          //   $gte: new Date(model.nowTime),
          // };
          // condition.checkoutTime = {
          //   $gte: new Date(model.startDateFilter),
          //   $lte: new Date(model.endDateFilter),
          // };

          apptCondition = {
            startDateTime: {
              $gte: new Date(model.startDateFilter),
              $lte: new Date(model.endDateFilter),
            },
          };
        }

        // else {
        //   // if (nowTime)
        //   //   condition.startDateTime = {
        //   //     $lte: new Date(nowTime),
        //   //   };
        //   // // else
        //   condition.checkoutTime = {
        //     $lte: new Date(),
        //   };
        // }
      }

      condition.noShow = true;
      if (model.tab == "CHECKED_OUT") {
        //condition.billGenerated = false;
        if (model.startDateFilter && model.endDateFilter) {
          // if (!model.todayCase == true)
          // condition.checkoutTime = {
          //   $lt: new Date(moment(model.nowTime).add(24, "h")),
          //   $gte: new Date(model.nowTime),
          // };
          // condition.checkoutTime = {
          //   $gte: new Date(model.startDateFilter),
          //   $lte: new Date(model.endDateFilter),
          // };
          apptCondition = {
            startDateTime: {
              $gte: new Date(model.startDateFilter),
              $lte: new Date(model.endDateFilter),
            },
          };
        }
        //  else {
        //   // if (nowTime)
        //   //   condition.startDateTime = {
        //   //     $lte: new Date(nowTime),
        //   //   };
        //   // // else
        //   condition.checkoutTime = {
        //     $lte: new Date(),
        //   };
        // }
        condition.noShow = false;
      }

      if (model.tab == "NO_SHOW_CHARGABLE") {
        condition.noShow = true;
        condition.chargePatient = true;
      }
      if (model.doctor_id)
        condition.doctor_id = new mongoose.Types.ObjectId(
          model.doctor_id!.toString()
        );
      if (model.location_id)
        condition.location_id = new mongoose.Types.ObjectId(
          model.location_id!.toString()
        );
      // if ("chargePatient" in model)
      //   condition.chargePatient = model.chargePatient;

      // if (req.body.startDateFilter && req.body.endDateFilter) condition.startDateTime = { $gte: new Date(req.body.startDateFilter), $lte: new Date(req.body.endDateFilter) }

      // const child_condition: any = {};

      // if (model.searchText) {
      //   const searchText = decodeURIComponent(
      //     model.searchText
      //   ).replace(/[[\]{}()*+?,\\^$|#\s]/g, "\\s+");

      //   child_condition.$or = [
      //     {
      //       "patientData.first_name": new RegExp(
      //         Utility.getEncryptText(
      //           searchText.toUpperCase()
      //         ),
      //         "gi"
      //       ),
      //     },
      //     {
      //       "patientData.last_name": new RegExp(
      //         Utility.getEncryptText(
      //           searchText.toUpperCase()
      //         ),
      //         "gi"
      //       ),
      //     },
      //   ];
      // }

      let child_condition: any = {};

      if (model.patient_id) {
        child_condition = {
          "patientData._id": new mongoose.Types.ObjectId(
            model.patient_id!.toString()
          ),
        };
      }

      const data = await DoctorCheckoutModel.aggregate([
        { $match: condition },

        {
          $lookup: {
            from: "appointment",
            localField: "appointment_id",
            foreignField: "_id",
            pipeline: [{ $match: apptCondition }],
            as: "appointmentData",
          },
        },
        {
          $unwind: {
            path: "$appointmentData",
            preserveNullAndEmptyArrays: false,
          },
        },
        // {
        //   $lookup: {
        //     from: "super_bill",
        //     localField: "appointment_id",
        //     foreignField: "appointment_id",
        //     pipeline: [
        //       {
        //         $project: {
        //           _id: 1,
        //         },
        //       },
        //     ],
        //     as: "superBillFound",
        //   },
        // },
        // {
        //   $match: {
        //     "superBillFound.0": {
        //       $exists: false,
        //     },
        //   },
        // },
        {
          $lookup: {
            from: "doctor",
            let: { doctor_id: "$doctor_id" },
            //localField: "doctor_id",
            // foreignField: "_id",
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$doctor_id"] },
                },
              },
              {
                $lookup: {
                  from: "users",
                  let: { user_id: "$user_id" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$user_id"],
                        },
                      },
                    },
                    {
                      $project: {
                        first_name: 1,
                        last_name: 1,
                      },
                    },
                  ],
                  as: "userData",
                },
              },
              {
                $unwind: {
                  path: "$userData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $project: {
                  first_name: "$userData.first_name",
                  last_name: "$userData.last_name",
                },
              },
            ],
            as: "doctorData",
          },
        },
        {
          $unwind: {
            path: "$doctorData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "patients",
            let: { patient_id: "$patient_id" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$patient_id"] },
                },
              },
              {
                $project: {
                  first_name: 1,
                  patientId: 1,
                  last_name: 1,
                  image: 1,
                },
              },
            ],
            as: "patientData",
          },
        },
        {
          $unwind: {
            path: "$patientData",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: "clinic_locations",
            let: { location_id: "$location_id" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$location_id"] },
                },
              },
              {
                $project: {
                  city: "$city",
                  branchName: "$branchName",
                  address: "$address",
                },
              },
            ],
            as: "locationData",
          },
        },

        {
          $unwind: {
            path: "$locationData",
            preserveNullAndEmptyArrays: true,
          },
        },

        // {
        //   $lookup: {
        //     from: "users",
        //     let: { doctor_id: "$doctor_id" },
        //     pipeline: [
        //       {
        //         $match: {
        //           $expr: { $eq: ["$_id", "$$doctor_id"] },
        //         },
        //       },
        //       {
        //         $project: {
        //           image: "$image",
        //           last_name: "$last_name",
        //           first_name: "$first_name",
        //         },
        //       },
        //     ],
        //     as: "doctorData",
        //   },
        // },
        // {
        //   $unwind: {
        //     path: "$doctorData",
        //     preserveNullAndEmptyArrays: true,
        //   },
        // },
        { $match: child_condition },

        {
          $facet: {
            totalCount: [{ $count: "sum" }],
            aggregatedData: [
              {
                $project: {
                  _id: 0,
                  remark: 1,
                  doctorData: 1,
                  patientData: 1,
                  locationData: 1,
                  checkoutTime: 1,
                  chargePatient: 1,
                  checkout_id: "$_id",
                  appointmentData: 1,
                  // checkoutTime: "$checkoutTime",
                  appointment_id: "$appointment_id",
                  endDateTime: "$appointmentData.endDateTime",
                  checkInTime: "$appointmentData.startDateTime",
                  startDateTime: "$appointmentData.startDateTime",
                  appointment_number: "$appointmentData.appointment_number",
                  billGenerated: 1,
                },
              },
              //{ $sort: sortObject },
              { $limit: skip + count },
              { $skip: skip },
            ],
          },
        },
      ]);

      if (data[0] && data[0].aggregatedData && data[0].aggregatedData.length) {
        data[0].aggregatedData.forEach((appointment: any) => {
          appointment.patientData.first_name = appointment.patientData
            .first_name
            ? Utility.getDecryptText(appointment.patientData.first_name)
            : "";
          appointment.patientData.last_name = appointment.patientData.last_name
            ? Utility.getDecryptText(appointment.patientData.last_name)
            : "";
        });
        // data[0].aggregatedData.push({
        //   totalCount: data[0].totalCount[0].sum,
        // });

        let obj: any = {
          data: data[0].aggregatedData,
          totalDocs: data[0].totalCount[0].sum,
        };
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: obj,

          // {
          //   data: {
          //     data: data[0].aggregatedData,
          //     totalCount: data[0].totalCount[0].sum,
          //   },
          // },
        };
        //return res.json(Response(constants.statusCode.ok, constants.messages.ExecutedSuccessfully, data[0].aggregatedData, data[0].totalCount[0].sum))
      }
      // return {
      //   status_code: HttpStatus.UNAUTHORIZED,
      //   success: false,
      //   data: {
      //     message: errorMessage.SomeThingWentWrong,
      //     error: errorMessage.ON_FETCH_ERROR,
      //   },
      // };
      else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.NO_RECORD_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  ///////////////////////********************************************************************************************************** */
  //API for patient checkout process

  checkoutPatient = async (
    req: Request,
    model: PatientCheckOutViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      console.log(model);
      let UserDetails = <DocumentType<User>>req.user;
      let cptCodeForBilling: any = [];

      model.codes!.cptCode!.forEach((el) =>
        cptCodeForBilling.push({ code_id: el })
      );

      const appointmentAggregation: any = [
        {
          $match: {
            _id: new mongoose.Types.ObjectId(model.appointment_id!.toString()),
            clinic_id: new mongoose.Types.ObjectId(model.clinic_id!.toString()),
          },
        },

        {
          $lookup: {
            from: "filledProgressNotes",
            let: { appointmentId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$appointment_id", "$$appointmentId"],
                  },
                },
              },
              { $project: { _id: 1 } },
            ],
            as: "hasProgressnotes",
          },
        },

        {
          $lookup: {
            from: "doctorcheckout",
            pipeline: [
              {
                $match: {
                  clinic_id: new mongoose.Types.ObjectId(
                    model.clinic_id!.toString()
                  ),
                  appointment_id: new mongoose.Types.ObjectId(
                    model.appointment_id!.toString()
                  ),
                },
              },
              { $project: { _id: 1 } },
            ],
            as: "doctorcheckoutDetails",
          },
        },

        {
          $lookup: {
            from: "patients",
            localField: "patient_id",
            foreignField: "_id",
            as: "patientData",
          },
        },
        {
          $unwind: {
            path: "$patientData",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: "financialclasses",
            localField: "patientData.financialClass_id",
            foreignField: "_id",
            as: "financialClassData",
          },
        },

        {
          $lookup: {
            from: "clinic",
            let: { clinic_id: "$clinic_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$clinic_id"],
                  },
                },
              },
              { $project: { clinicPolicy: 1 } },
            ],
            as: "clinicData",
          },
        },
        {
          $unwind: {
            path: "$clinicData",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: "insurance",
            let: { patient_id: "$patient_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$patient_id", "$$patient_id"],
                  },
                  coverage: "Primary",
                },
              },
              { $sort: { coverage: 1 } },
            ],
            as: "insuranceData",
          },
        },
        {
          $unwind: {
            path: "$insuranceData",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: "cpt",
            let: { cptCodeArr: cptCodeForBilling },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ["$_id", "$$cptCodeArr.code_id"],
                  },
                },
              },
              {
                $group: {
                  _id: null,
                  total: { $sum: "$price" },
                },
              },
            ],
            as: "cptCodes",
          },
        },
        {
          $unwind: {
            path: "$cptCodes",
            preserveNullAndEmptyArrays: true,
          },
        },
      ];

      let appointmentData: any = await AppointmentModel.aggregate(
        appointmentAggregation
      );

      appointmentData = appointmentData[0];

      if (appointmentData && appointmentData.doctorcheckoutDetails.length)
        return {
          status_code: HttpStatus.UNAUTHORIZED,
          success: false,
          data: {
            message: errorMessage.billingMsg.alreadyCheckedout,
            error: errorMessage.ON_UPDATE_ERROR,
          },
        };

      if (
        !appointmentData ||
        model.clinic_id!.toString() != appointmentData.clinic_id.toString()
      )
        return {
          status_code: HttpStatus.UNAUTHORIZED,
          success: false,
          data: {
            message: errorMessage.apptNotFound,
            error: errorMessage.ON_UPDATE_ERROR,
          },
        };

      if (appointmentData.status == "Unavailability")
        return {
          status_code: HttpStatus.UNAUTHORIZED,
          success: false,
          data: {
            message: "Can not checkout unavailability",
            error: errorMessage.ON_UPDATE_ERROR,
          },
        };

      if (appointmentData.status != "Accepted")
        return {
          status_code: HttpStatus.UNAUTHORIZED,
          success: false,
          data: {
            message: errorMessage.incorrectAction(
              appointmentData.status,
              "checkout"
            ),
            error: errorMessage.ON_UPDATE_ERROR,
          },
        };

      let checkoutTime = model.nowTime;
      const duration = appointmentData.duration;
      let providerCheckoutObj: any = {
        duration: duration,
        doctor_id: appointmentData.doctor_id.toString(),
        clinic_id: model.clinic_id,
        appointment_id: model.appointment_id,
        createdby_id: UserDetails._id,
        checkoutTime: checkoutTime,
        patient_id: appointmentData.patient_id.toString(),
      };
      providerCheckoutObj.location_id = appointmentData.location_id.toString();

      //*******  changes charan sir 16-03-2023   ******* */
      // let billingCheckoutObj: any = {
      //   runDate: checkoutTime,
      //   toDOS: appointmentData.endDateTime,
      //   appointment_id: appointmentData._id,
      //   clinic_id: appointmentData.clinic_id,
      //   doctor_id: appointmentData.doctor_id,
      //   patient_id: appointmentData.patient_id,
      //   associate_id: appointmentData.doctor_id,
      //   location_id: appointmentData.location_id,
      //   lastUpdatedby_id: appointmentData.doctor_id,
      // };
      //*******  changes charan sir 16-03-2023   ******* */
      if (model.noShow) {
        providerCheckoutObj.noShow = true;
        providerCheckoutObj.chargePatient = model.chargePatient;

        //ADDED BY CHARANJIT
        //Generate super bill here for no show checkouts, for other super bill is generated separately

        if (model.chargePatient) {
          let superBillObj = {
            patient_id: appointmentData.patient_id.toString(),
            appointment_id: model.appointment_id,
            clinic_id: model.clinic_id,
            referring_provider_id: appointmentData.doctor_id,
            fromDate: appointmentData.startDateTime,
            toDate: appointmentData.endDateTime,
            duration: appointmentData.duration,
            place_of_service: model.placeOfService,
            total_amount:
              appointmentData.clinicData &&
              appointmentData.clinicData.clinicPolicy
                ? appointmentData.clinicData.clinicPolicy.noShowCharge
                : 0,
            notes: model.remark,
            createdby_id: UserDetails._id,
            location_id: appointmentData.location_id,
            codes: {
              ICD_9: [],
              ICD_10: [],
              cptCode: [],
            },
            copay: {
              type: "FULL",
              amount: appointmentData.clinicData.clinicPolicy.noShowCharge,
              full: {},
            },
          };

          if (
            appointmentData.patientData.payment &&
            appointmentData.patientData.payment.full.type == "CARD" &&
            appointmentData.patientData.payment.full.card_id
          ) {
            superBillObj.copay.full = {
              type: "CARD",
              card_id: appointmentData.patientData.payment.full.card_id,
            };
          } else superBillObj.copay.full = { type: "CASH" };
          await SuperBillModel.create(superBillObj);

          providerCheckoutObj.billGenerated = true;
        }

        ///////////////////////////////

        //*******  changes charan sir 16-03-2023   ******* */
        // await noShowCheckoutValidation.validateAsync(
        //   providerCheckoutObj
        // );
        // billingCheckoutObj.noShow = true;
        // providerCheckoutObj.remark = model.remark;
        // billingCheckoutObj.codes = {
        //   ICD_9: [],
        //   ICD_10: [],
        //   cptCode: [],
        // };
        // billingCheckoutObj.totalAmount =
        //   appointmentData.clinicData.clinicPolicy.noShowCharge;
        // billingCheckoutObj.copay = {
        //   type: "FULL",
        //   amount: appointmentData.clinicData.clinicPolicy.noShowCharge,
        //   full: {},
        // };

        // if (
        //   appointmentData.patientData.payment.full.type == "CARD" &&
        //   appointmentData.patientData.payment.full.card_id
        // ) {
        //   billingCheckoutObj.copay.full.type = "CARD";
        //   billingCheckoutObj.copay.full.card_id =
        //     appointmentData.patientData.payment.full.card_id;
        // } else billingCheckoutObj.copay.full.type = "CASH";

        //*******  changes charan sir 16-03-2023   ******* */
      } else {
        //////////******************Stop this code after first demo --04-04-2023(Ankit)********************** */

        // if (!appointmentData.hasProgressnotes.length)
        //   return {
        //     status_code: HttpStatus.UNAUTHORIZED,
        //     success: false,
        //     data: {
        //       message: errorMessage.progressNotesNotFilled,
        //       error: errorMessage.ON_UPDATE_ERROR,
        //     },
        //   };
        //////////******************************************************* */
        const { followUp, placeOfService, notes } = model;

        providerCheckoutObj.followUp = followUp;
        providerCheckoutObj.placeOfService = placeOfService;
        // await checkoutValidation.validateAsync(
        //   providerCheckoutObj
        // );
        providerCheckoutObj.codes = model.codes;
        providerCheckoutObj.notes = model.notes;
        providerCheckoutObj.remark = model.remark;

        // let totalAmount = appointmentData.cptCodes.total,
        //   insurancePortion = 0,
        //   copay = totalAmount,
        //   coverage = null;

        // if (appointmentData.financialClassData.length) {
        //   totalAmount += appointmentData.financialClassData[0].price;
        //   copay += appointmentData.financialClassData[0].price;

        //   if (appointmentData.financialClassData[0].covered == "INSURANCE") {
        //     if (!appointmentData.insuranceData)
        //       return {
        //         status_code: HttpStatus.UNAUTHORIZED,
        //         success: false,
        //         data: {
        //           message: errorMessage.financialClassMsg.insuranceNotExist,
        //           error: errorMessage.ON_UPDATE_ERROR,
        //         },
        //       };

        //     billingCheckoutObj.responsibleParty = "INSURANCE";

        //     insurancePortion =
        //       totalAmount - appointmentData.insuranceData.copay.amount;
        //     coverage = appointmentData.insuranceData.coverage;
        //     copay = appointmentData.insuranceData.copay.amount;
        //   } else copay = appointmentData.financialClassData[0].price;

        //   billingCheckoutObj.financialClass_id =
        //     appointmentData.financialClassData[0]._id;
        // } else
        //   return {
        //     status_code: HttpStatus.UNAUTHORIZED,
        //     success: false,
        //     data: {
        //       message: errorMessage.financialClassMsg.invalidClass,
        //       error: errorMessage.ON_UPDATE_ERROR,
        //     },
        //   };
        // billingCheckoutObj.duration = duration;
        // billingCheckoutObj.totalAmount = totalAmount;
        // billingCheckoutObj.placeOfService = placeOfService;
        // billingCheckoutObj.copay = {
        //   amount: copay,
        //   type: appointmentData.patientData.payment.mode,
        // };
        // billingCheckoutObj.codes = {
        //   ICD_9: model.codes.ICD_9,
        //   ICD_10: model.codes.ICD_10,
        //   cptCode: cptCodeForBilling,
        // };
        // billingCheckoutObj.insurance = {
        //   status: insurancePortion > 0 ? false : true,
        //   amount: insurancePortion,
        //   coverage,
        // };

        // switch (billingCheckoutObj.copay.type) {
        //   case "FULL":
        //     billingCheckoutObj.copay.full =
        //       appointmentData.patientData.payment.full;

        //     break;

        //   default:
        //     return {
        //       status_code: HttpStatus.UNAUTHORIZED,
        //       success: false,
        //       data: {
        //         message: errorMessage.SomeThingWentWrong,
        //         error: errorMessage.ON_UPDATE_ERROR,
        //       },
        //     };
        // }
      }

      // // ! UNCOMMENT THIS BEFORE LIVE
      await AppointmentModel.findByIdAndUpdate(
        model.appointment_id,
        { status: "Checkout" },
        { new: true }
      ).lean();
      providerCheckoutObj.payer_id = model.payer_id;
      providerCheckoutObj.insurance_name = model.insurance_name;
      providerCheckoutObj.insurance_id = model.insurance_id;

      await DoctorCheckoutModel.create(providerCheckoutObj);

      // if (!model.noShow || (model.noShow && model.chargePatient))
      //   await BillingCheckoutModel.create(billingCheckoutObj);

      // Add Activity History
      let addHistory = await HistoryModel.create({
        user_id: UserDetails._id,
        description:
          model.noShow == false
            ? `patient checkout successfully`
            : `patient moved to no show list`,
        type: EHistoryActivityTypeValues.CHECKOUT,
        type_id: appointmentData.patient_id,
        // patient_id: appointmentData.patient_id,
      });
      return {
        status_code: HttpStatus.OK,
        success: true,
        data: errorMessage.CHECK_OUT_DONE,
      };
    } catch (error) {
      next(error);
    }
  };

  // patient Document Section

  addPatientDocument = async (
    req: Request,
    model: AddPatientDocumentViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let modelToSave = <PatientsDoc>model;

      modelToSave.createdby_id = userDetails._id;

      let response = await PatientDocModel.create(modelToSave);

      if (response) {
        // Add Activity History
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `patient document added successfully`,
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
            message: errorMessage.ERROR_ADD_PATIENT_DOC,
            error: errorMessage.ON_ADD_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  updatePatientDocument = async (
    req: Request,
    model: UpdatePatientDocumentViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let foundPatientDoc = await PatientDocModel.findOne({
        _id: model._id,
        isDeleted: false,
      });

      if (foundPatientDoc) {
        let modelToSave = <PatientsDoc>model;

        modelToSave.createdby_id = foundPatientDoc.createdby_id;
        modelToSave.clinic_id = foundPatientDoc.clinic_id;
        modelToSave.patient_id = foundPatientDoc.patient_id;
        modelToSave.isDeleted = foundPatientDoc.isDeleted;

        let response = await PatientDocModel.updateOne(
          { _id: model._id },
          modelToSave
        );

        if (response && response.modifiedCount > 0) {
          // Add Activity History
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `patient document update successfully`,
            type: EHistoryActivityTypeValues.PATIENT,
            type_id: foundPatientDoc.patient_id,
          });

          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.PATIENT_DOC_UPDATED_SUCCESS,
          };
        } else {
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.ERROR_ADD_PATIENT_DOC,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };
        }
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.PATIENT_DOC_DETAILS_NOT_FOUND,
            error: errorMessage.ON_UPDATE_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  getPatientDocumentDetails = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let foundPatientDoc = await PatientDocModel.findOne({
        _id: req.params._id,
        isDeleted: false,
      });

      if (foundPatientDoc) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: foundPatientDoc,
        };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.PATIENT_DOC_DETAILS_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  deletePatientDocumentDetails = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let foundPatientDoc = await PatientDocModel.findOne({
        _id: req.params._id,
        isDeleted: false,
      });

      if (foundPatientDoc) {
        let docDeletionResult = await PatientDocModel.updateOne(
          { _id: foundPatientDoc._id },
          { isDeleted: true }
        );

        if (docDeletionResult && docDeletionResult.modifiedCount > 0) {
          // Add Activity History
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `patient document deleted successfully`,
            type: EHistoryActivityTypeValues.PATIENT,
            type_id: foundPatientDoc.patient_id,
          });

          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.PATIENT_DOC_DELETED_SUCCESS,
          };
        } else
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.ERROR_DELETE_PATIENT_DOC,
              error: errorMessage.ON_DELETE_ERROR,
            },
          };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.PATIENT_DOC_DETAILS_NOT_FOUND,
            error: errorMessage.ON_DELETE_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  getPatientDocumentList = async (
    req: Request,
    model: GetPatientDocumentListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let condition: any = { isDeleted: false };

      // if (model.isDeleted) {
      //   condition.isDeleted = model.isDeleted;
      // }

      let defaultPage = model.pageNumber ? model.pageNumber : 1;
      let count = model.pageSize ? model.pageSize : 10;

      let tempResult: any;

      let result: mongoose.PaginateResult<any> = await PatientDocModel.paginate(
        {
          ...condition,
        },
        {
          page: defaultPage,
          ...(count > 0 ? { limit: count } : { pagination: false }),

          options: {
            projection: {
              title: 1,
              document: 1,
              description: 1,
            },
          },
          sort: { createdAt: -1 },
        }
      );

      tempResult = result;

      if (result && result.docs && result.docs.length > 0) {
        let obj: any;

        obj = {
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
            message: errorMessage.PATIENT_DOCUMENT_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  //Assigned provider to patient or  assignedpatients to providers

  assignProviderToPatient = async (
    req: Request,
    model: AssignProviderViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let modelToSave = <AssignProvider>model;

      modelToSave.createdby_id = userDetails._id;
      modelToSave.clinic_id = model.clinic_id;

      if (
        model.type == EAssProvTypeValues.ASSIGN_PATIENT &&
        model.providerArr &&
        model.providerArr.length == 1
      ) {
        const condition = {
            clinic_id: model.clinic_id,
            doctor_id: model.providerArr[0],
          },
          previousData = await AssignProviderModel.find(condition).lean();

        const deleteArr: any = [];

        previousData.forEach((el: any) => {
          const include = model.patientArr!.includes(el.patient_id.toString());

          if (include)
            model.patientArr = model.patientArr!.filter(
              (item) => item != el.patient_id.toString()
            );
          else deleteArr.push(new mongoose.Types.ObjectId(el.patient_id));
        });

        if (deleteArr.length)
          await AssignProviderModel.deleteMany({
            doctor_id: model.providerArr[0],
            patient_id: { $in: deleteArr },
          });

        if (model.patientArr && model.patientArr.length) {
          const insertArr: any = [];

          model.patientArr.forEach((el: any) => {
            insertArr.push({
              doctor_id: model.providerArr[0],
              patient_id: el,
              createdby_id: userDetails._id,
              clinic_id: model.clinic_id,
            });
          });

          await AssignProviderModel.insertMany(insertArr);

          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `patient assigned successfully`,
            type: EHistoryActivityTypeValues.PATIENT,
            // type_id:model.
          });
        }

        // return res.json(Response(constants.statusCode.unauth, constants.messages.underDevelopment, { previousData, deleteArr, providerArr }))
      } else if (
        model.type == "ASSIGN_PROVIDER" &&
        model.patientArr &&
        model.patientArr.length == 1
      ) {
        const condition = {
          clinic_id: model.clinic_id,
          patient_id: model.patientArr[0],
        };
        let previousData = await AssignProviderModel.find(condition).lean();

        const deleteArr: any = [];

        previousData.forEach((el: any) => {
          const include = model.providerArr.includes(el.doctor_id.toString());

          if (include)
            model.providerArr = model.providerArr.filter(
              (item) => item != el.doctor_id.toString()
            );
          else deleteArr.push(new mongoose.Types.ObjectId(el.doctor_id));
        });

        if (deleteArr.length) {
          await AssignProviderModel.deleteMany({
            patient_id: model.patientArr[0],
            doctor_id: { $in: deleteArr },
          });
        }

        if (model.providerArr.length) {
          const insertArr: any = [];

          model.providerArr.forEach((el) => {
            insertArr.push({
              patient_id: model.patientArr[0],
              doctor_id: el,
              createdby_id: userDetails._id,
              clinic_id: model.clinic_id,
            });
          });

          await AssignProviderModel.insertMany(insertArr);

          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `provider assigned successfully`,
            type: EHistoryActivityTypeValues.PROVIDER,
          });
        }

        // return res.json(Response(constants.statusCode.unauth, constants.messages.underDevelopment, { previousData, deleteArr, providerArr }))
      } else
        return {
          status_code: HttpStatus.UNAUTHORIZED,
          success: false,
          data: {
            message: errorMessage.SomeThingWentWrong,
            error: errorMessage.ON_ADD_ERROR,
          },
        };

      return {
        status_code: HttpStatus.OK,
        success: true,
        data: errorMessage.UPDATE_SUCCESSFULL,
      };
    } catch (error) {
      next(error);
    }
  };

  getAssignedProviderOrPatient = async (
    req: Request,
    model: GetAssignProviderPatientViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      const { patient_id, doctor_id, clinic_id, type } = model;

      // const count = req.body.count ? req.body.count : 1
      // req.body.page = req.body.page ? req.body.page : 10
      // const skip = count * (req.body.page - 1)

      let data: any;

      if (type == "PROVIDER_LIST") {
        if (!patient_id)
          return {
            status_code: HttpStatus.UNAUTHORIZED,
            success: false,
            data: {
              message: errorMessage.PATIENT_ID_NOT_EMPTY,
              error: errorMessage.ON_FETCH_ERROR,
            },
          };

        const condition = {
            clinic_id: clinic_id,
            isVerified: true,
          },
          child_condition = {
            "userData.isActive": true,
            "userData.isDeleted": false,
          },
          sortObject = { firstName: 1 };

        data = await DoctorModel.aggregate([
          { $match: condition },

          {
            $lookup: {
              from: "users",
              localField: "user_id",
              foreignField: "_id",
              as: "userData",
            },
          },
          {
            $unwind: {
              path: "$userData",
              preserveNullAndEmptyArrays: true,
            },
          },

          {
            $lookup: {
              from: "assignedProvider",
              let: { user_id: "$user_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ["$doctor_id", "$$user_id"],
                        },
                        {
                          $eq: [
                            "$patient_id",
                            new mongoose.Types.ObjectId(patient_id.toString()),
                          ],
                        },
                      ],
                    },
                  },
                },
              ],
              as: "isAssignedData",
            },
          },

          { $match: child_condition },

          {
            $facet: {
              totalCount: [{ $count: "sum" }],
              aggregatedData: [
                {
                  $project: {
                    _id: "$user_id",
                    first_name: "$userData.first_name",
                    last_name: "$userData.last_name",
                    isChecked: {
                      $cond: {
                        if: {
                          $eq: [{ $size: "$isAssignedData" }, 1],
                        },
                        then: true,
                        else: false,
                      },
                    },
                  },
                },
                // { $sort: sortObject },
                // { $limit: parseInt(skip) + parseInt(count) },
                // { $skip: parseInt(skip) },
              ],
            },
          },
        ]);

        if (data[0].aggregatedData.length)
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: data[0].aggregatedData,
            // data[0].totalCount[0].sum
          };
        else
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.NO_RECORD_FOUND,
              error: errorMessage.ON_FETCH_ERROR,
            },
          };
      } else if (type == "PATIENT_LIST") {
        if (!doctor_id)
          return {
            status_code: HttpStatus.UNAUTHORIZED,
            success: false,
            data: {
              message: errorMessage.DOCTOR_ID_NOT_EMPTY,
              error: errorMessage.ON_FETCH_ERROR,
            },
          };

        const condition = {
            clinic_id: new mongoose.Types.ObjectId(clinic_id!.toString()),
          },
          sortObject = { isChecked: -1, _id: -1 };

        data = await PatientModel.aggregate([
          { $match: condition },

          {
            $lookup: {
              from: "assignedProvider",
              let: { user_id: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ["$patient_id", "$$user_id"],
                        },
                        {
                          $eq: [
                            "$doctor_id",
                            new mongoose.Types.ObjectId(doctor_id!.toString()),
                          ],
                        },
                      ],
                    },
                  },
                },
                { $project: { _id: 1 } },
              ],
              as: "isCheckedData",
            },
          },

          {
            $facet: {
              totalCount: [{ $count: "sum" }],
              aggregatedData: [
                {
                  $project: {
                    _id: "$_id",
                    first_name: 1,
                    last_name: 1,

                    isChecked: {
                      $cond: {
                        if: {
                          $eq: [{ $size: "$isCheckedData" }, 1],
                        },
                        then: true,
                        else: false,
                      },
                    },
                  },
                },
                // { $sort: sortObject },
                // { $limit: parseInt(skip) + parseInt(count) },
                // { $skip: parseInt(skip) },
              ],
            },
          },
        ]);

        if (data[0].aggregatedData.length) {
          let finalResponse: any = [{ totalCount: data[0].totalCount[0].sum }];

          //  decrypt patient details
          data[0].aggregatedData.forEach((obj: any) => {
            obj.first_name = Utility.getDecryptText(obj.first_name);
            obj.last_name = Utility.getDecryptText(obj.last_name);

            finalResponse.push(obj);
          });

          return {
            status_code: HttpStatus.OK,
            success: true,
            data: finalResponse,
          };
        } else
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.NO_RECORD_FOUND,
              error: errorMessage.ON_FETCH_ERROR,
            },
          };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.SomeThingWentWrong,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };
  // Download Checkout  data
  getCheckoutDataToExcel = async (
    req: Request,
    model: PendingCheckoutPatientViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      switch (model.tab) {
        case "PENDING":
          let result = await this.pendingCheckoutPatientList(req, model, next);

          if (result && result.data.data.length <= 0)
            return {
              status_code: HttpStatus.BAD_REQUEST,
              success: false,
              data: {
                message: errorMessage.NO_RECORD_FOUND,
                error: errorMessage.ON_FETCH_ERROR,
              },
            };
          const workbook = await XlsxPopulate.fromBlankAsync();
          let checkoutSheet: any = workbook.sheet("Sheet1");
          let checkoutSheetHeader = [
            "Date",
            "Time",
            "Appointment ID",
            "Patient ID",
            "Patient Name",
            "Check-In-Time",
          ];

          checkoutSheetHeader.forEach((el, i) => {
            checkoutSheet
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

          let sheetStyle = {
            border: true,
            fontFamily: "Calibri",
          };
          let checkoutData =
            result && result.data.data.length > 0 ? result!.data.data : [];
          checkoutData.forEach((el: any, i: number) => {
            checkoutSheet
              .cell("A" + (i + 2))
              .value(moment(el.startDateTime).format("lll"))
              .style(sheetStyle);
            checkoutSheet;

            checkoutSheet
              .cell("B" + (i + 2))
              .value(moment(el.startDateTime).format("LT"))
              .style(sheetStyle);

            checkoutSheet
              .cell("C" + (i + 2))
              .value(el.appointment_number)
              .style(sheetStyle);

            checkoutSheet
              .cell("D" + (i + 2))
              .value(el.patientData.patientId)
              .style(sheetStyle);

            checkoutSheet
              .cell("E" + (i + 2))
              .value(el.patientData.first_name + " " + el.patientData.last_name)
              .style(sheetStyle);
            checkoutSheet
              .cell("F" + (i + 2))
              .value(moment(el.checkInTime).format("LT"))
              .style(sheetStyle);
          });

          checkoutSheet.freezePanes(1, 1);

          const data: any = await workbook.outputAsync();
          await fs.writeFileSync(
            path.join(
              __dirname,
              "../../../../../public/upload/checkout/Checkout_Report.xlsx"
            ),
            data
          );
          let link = `http://${req.hostname}:${process.env.PORT}/upload/checkout/Checkout_Report.xlsx`;

          let excelFileName = "Checkout_Report.xlsx";
          let response = {
            link,
            name: excelFileName,
          };
          return {
            status_code: HttpStatus.OK,
            data: response, //link, //errorMessage.ExecutedSuccessfully,
            success: true,
          };

          break;

        case "NO_SHOW":
        case "CHECKED_OUT":
        case "NO_SHOW_CHARGABLE":
          let result1 = await this.checkedOutPatient(req, model, next);

          if (
            result1 &&
            result1.data &&
            result1.data.data &&
            result1.data.data.length <= 0
          )
            return {
              status_code: HttpStatus.BAD_REQUEST,
              success: false,
              data: {
                message: errorMessage.NO_RECORD_FOUND,
                error: errorMessage.ON_FETCH_ERROR,
              },
            };

          const workbook1 = await XlsxPopulate.fromBlankAsync();
          let checkoutSheet1: any = workbook1.sheet("Sheet1");
          let checkoutSheetHeader1 = [
            "Date",
            "Time",
            "Appointment ID",
            "Patient ID",
            "Patient Name",
            "Check-In-Time",
            "Check-Out-Time",
            "Provider Name",
            "CheckOut Type",
          ];
          let sheetStyle1 = {
            border: true,
            fontFamily: "Calibri",
          };
          checkoutSheetHeader1.forEach((el, i) => {
            checkoutSheet1
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

          let checkoutData1 =
            result1 &&
            result1.data &&
            result1.data.data &&
            result1.data.data.length > 0
              ? result1!.data.data
              : [];

          console.log(checkoutData1, "checkoutData1");

          checkoutData1.forEach((el: any, i: number) => {
            checkoutSheet1
              .cell("A" + (i + 2))
              .value(moment(el.appointmentData.startDateTime).format("lll"))
              .style(sheetStyle1);
            checkoutSheet1;

            checkoutSheet1
              .cell("B" + (i + 2))
              .value(moment(el.appointmentData.startDateTime).format("LT"))
              .style(sheetStyle1);

            checkoutSheet1
              .cell("C" + (i + 2))
              .value(el.appointment_number)
              .style(sheetStyle1);

            checkoutSheet1
              .cell("D" + (i + 2))
              .value(el.patientData.patientId)
              .style(sheetStyle1);

            checkoutSheet1
              .cell("E" + (i + 2))
              .value(el.patientData.first_name + " " + el.patientData.last_name)
              .style(sheetStyle1);
            checkoutSheet1
              .cell("F" + (i + 2))
              .value(moment(el.checkInTime).format("LT"))
              .style(sheetStyle1);

            checkoutSheet1
              .cell("G" + (i + 2))
              .value(moment(el.checkoutTime).format("LT"))
              .style(sheetStyle1);
            checkoutSheet1
              .cell("H" + (i + 2))
              .value(el.doctorData.first_name + "" + el.doctorData.last_name)
              .style(sheetStyle1);

            checkoutSheet1
              .cell("I" + (i + 2))
              .value(
                "chargePatient" in el
                  ? el.chargePatient === false
                    ? "non-chargeable"
                    : "chargeable"
                  : " "
              )
              .style(sheetStyle1);
          });

          checkoutSheet1.freezePanes(1, 1);

          const data1: any = await workbook1.outputAsync();
          await fs.writeFileSync(
            path.join(
              __dirname,
              "../../../../../public/upload/checkout/Checkout_Report.xlsx"
            ),
            data1
          );
          let link1 = `http://${req.hostname}:${process.env.PORT}/upload/checkout/Checkout_Report.xlsx`;

          let excelFileName1 = "Checkout_Report.xlsx";
          let response1 = {
            link: link1,
            name: excelFileName1,
          };
          return {
            status_code: HttpStatus.OK,
            data: response1, //link, //errorMessage.ExecutedSuccessfully,
            success: true,
          };

          break;

        default:
          return {
            status_code: HttpStatus.UNAUTHORIZED,
            success: false,
            data: {
              message: errorMessage.SomeThingWentWrong,
              error: errorMessage.ON_FETCH_ERROR,
            },
          };
      }
    } catch (error) {
      next(error);
    }
  };

  // Download patient data

  getPatientDataToExcel = async (
    req: Request,
    model: ExportPatientListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      const workbook = await XlsxPopulate.fromBlankAsync();
      let patientSheet: any = workbook.sheet("Sheet1");
      let patientSheetHeader = [
        "Patient ID",
        "Patient Name",
        "Email",
        "Status",
        "Invitation Status",
        "Archieved/Un-Archieved Status",
        "Preferred Contact Number",
        "Preferred Contact Relation",
        "Alternate Contact Number",
        "Alternate Contact Relation",
      ];

      patientSheetHeader.forEach((el, i) => {
        patientSheet
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

      const count = model.pageSize ? model.pageSize : errorMessage.count;
      req.body.page = model.pageNumber
        ? model.pageNumber
        : errorMessage.defaultPageNo;
      const skip = count * (req.body.page - 1);
      let condition: any = {};
      condition = {
        clinic_id: new mongoose.Types.ObjectId(model.clinic_id!.toString()),
      };
      let child_condition: any = {};
      if (model.isActive) {
        condition.isActive = model.isActive == true ? true : false;
      }

      if (model.isDeleted == true || model.isDeleted == false) {
        condition.isDeleted = model.isDeleted;
      }

      if (model.isVerified)
        condition.isVerified = model.isVerified == true ? true : false;
      // if (
      //   req.body.registerMode != "" &&
      //   req.body.registerMode != undefined
      // )
      //   condition.registerMode = req.body.registerMode;

      let sortObject: any = {};
      if (req.body.sortValue && req.body.sortOrder) {
        sortObject[req.body.sortValue] = req.body.sortOrder;
      } else sortObject = { _id: -1 };

      if (model.name) {
        const searchText = decodeURIComponent(model.name).replace(
          /[[\]{}()*+?,\\^$|#\s]/g,
          "\\s+"
        );

        child_condition.$or = [
          { patientId: new RegExp(searchText, "gi") },
          {
            "insuranceData.insuranceName": new RegExp(searchText, "gi"),
          },
          {
            lastName: Utility.getEncryptText(model.name.toUpperCase()),
          },
          {
            firstName: Utility.getEncryptText(model.name.toUpperCase()),
          },
        ];
      }

      const aggregatedData = [
        {
          $project: {
            image: 1,
            _id: "$_id",
            email: "$email",
            contact: "$contact",
            lastName: "$last_name",
            isActive: "$isActive",
            firstName: "$first_name",
            isDeleted: "$isDeleted",
            patientId: "$patientId",
            isVerified: "$isVerified",
            status: {
              $cond: {
                if: { $eq: ["$password", null] },
                then: "Pending",
                else: "Accepted",
              },
            },
          },
        },
        // { $sort: sortObject },
      ];

      const patientArr = await PatientModel.aggregate([
        { $match: condition },

        {
          $lookup: {
            from: "insurance",
            let: { patient_id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$patient_id", "$$patient_id"],
                  },
                  coverage: "Primary",
                },
              },
              { $project: { insurance_name: 1 } },
            ],
            as: "insuranceData",
          },
        },

        {
          $unwind: {
            path: "$insuranceData",
            preserveNullAndEmptyArrays: true,
          },
        },

        { $match: child_condition },

        {
          $facet: {
            aggregatedData: aggregatedData,
          },
        },
      ]);

      if (!patientArr.length)
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.patientMsg.noRecordFound,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };

      let Patientdata = patientArr[0].aggregatedData;

      Patientdata.forEach((obj) => {
        obj.firstName = Utility.getDecryptText(obj.firstName);

        obj.lastName = Utility.getDecryptText(obj.lastName);
      });
      // sort list with patient name alphabetically
      const sortedList = Patientdata.sort((a, b) =>
        a.firstName.localeCompare(b.firstName)
      );

      let sheetStyle = {
        border: true,
        fontFamily: "Calibri",
      };

      sortedList.forEach((el: any, i: number) => {
        patientSheet
          .cell("A" + (i + 2))
          .value(el.patientId)
          .style(sheetStyle);
        patientSheet;

        patientSheet
          .cell("B" + (i + 2))
          .value(el.firstName + " " + el.lastName)
          .style(sheetStyle);

        patientSheet
          .cell("C" + (i + 2))
          .value(
            el.email ? el.email : ""
            // el.email ? Utility.getDecryptText(el.email) : ""
          )
          .style(sheetStyle);

        patientSheet
          .cell("D" + (i + 2))
          .value(el.isVerified ? "Verified" : "Unverified")
          .style(sheetStyle);

        patientSheet
          .cell("E" + (i + 2))
          .value(el.status)
          .style(sheetStyle);
        patientSheet
          .cell("F" + (i + 2))
          .value(el.isActive == true ? "Unarchived" : "Archived")
          .style(sheetStyle);
        patientSheet
          .cell("G" + (i + 2))
          .value(
            el.contact?.prefered?.mobileNo ? el.contact.prefered.mobileNo : ""
          )
          .style(sheetStyle);
        patientSheet
          .cell("H" + (i + 2))
          .value(
            el.contact?.prefered?.relation ? el.contact.prefered.relation : ""
          )
          .style(sheetStyle);
        patientSheet
          .cell("I" + (i + 2))
          .value(
            el.contact?.alternative?.mobileNo
              ? el.contact.alternative?.mobileNo
              : ""
          )
          .style(sheetStyle);
        patientSheet
          .cell("J" + (i + 2))
          .value(
            //
            el.contact?.alternative?.relation
              ? el.contact.alternative?.relation
              : ""
          )
          .style(sheetStyle);
      });

      patientSheet.freezePanes(1, 1);

      const data: any = await workbook.outputAsync();
      await fs.writeFileSync(
        path.join(
          __dirname,
          "../../../../../public/upload/patients/Patient_Report.xlsx"
        ),
        data
      );
      let link = `http://${req.hostname}:${process.env.PORT}/upload/patients/Patient_Report.xlsx`;

      let excelFileName = "Patient_Report.xlsx";
      let response = {
        link,
        name: excelFileName,
      };
      return {
        status_code: HttpStatus.OK,
        data: response, //link, //errorMessage.ExecutedSuccessfully,
        success: true,
      };
    } catch (error) {
      next(error);
    }
  };

  getVisitHistoryList = async (
    req: Request,
    model: GetPatientHistoryListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;
      defaultPage = model.pageNumber ? model.pageNumber : 1;
      count = model.pageSize ? model.pageSize : 50;
      //let userDetails = <DocumentType<User>>req.user;
      let condition: any = {};
      condition.status = "Checkout";
      condition.clinic_id = new mongoose.Types.ObjectId(
        model.clinic_id!.toString()
      );
      condition.patient_id = new mongoose.Types.ObjectId(
        model.patient_id!.toString()
      );
      // condition.doctor_id = new mongoose.Types.ObjectId(
      //   model.doctor_id!.toString()
      // );
      let data = await AppointmentModel.aggregate([
        {
          $match: condition,
        },
        {
          $sort: { endDateTime: -1 },
        },
        {
          $group: {
            _id: {
              doctor_id: "$doctor_id",
              patient_id: "$patient_id",
            },
            total_appointment: { $sum: 1 },
            last_visit: { $first: "$startDateTime" },
          },
        },
        {
          $lookup: {
            from: "patients",
            let: { patient_id: "$_id.patient_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$patient_id"],
                  },
                },
              },
              {
                $project: { first_name: 1, last_name: 1 },
              },
            ],
            as: "patientData",
          },
        },
        {
          $unwind: {
            path: "$patientData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "doctor",
            let: { id: "$_id.doctor_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$id"],
                  },
                },
              },
              ///

              {
                $lookup: {
                  from: "users",
                  let: { u_id: "$user_id" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$u_id"],
                        },
                      },
                    },
                    {
                      $project: {
                        first_name: 1,
                        last_name: 1,
                      },
                    },
                  ],
                  as: "userData",
                },
              },
              {
                $unwind: {
                  path: "$userData",
                  preserveNullAndEmptyArrays: true,
                },
              },

              ////
              { $project: { userData: 1 } },
            ],
            as: "doctorData",
          },
        },
        {
          $unwind: {
            path: "$doctorData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $facet: {
            totalCount: [{ $count: "count" }],
            aggregatedData: [
              {
                $project: {
                  _id: 0,
                  patient_id: "$_id.patient_id",
                  doctor_id: "$_id.doctor_id",
                  patientData: 1,
                  doctor_name: {
                    $concat: [
                      "$doctorData.userData.first_name",
                      " ",
                      "$doctorData.userData.last_name",
                    ],
                  },
                  total_appointment: 1,
                  last_visit: 1,
                },
              },
              { $sort: { last_visit: -1 } },
              { $skip: count * (defaultPage - 1) },
              { $limit: count },
            ],
          },
        },
      ]);

      if (data && data.length > 0 && data[0].aggregatedData.length) {
        //let formattedData: any[] = [];

        data[0].aggregatedData.forEach((e) => {
          e.patientData.first_name = e.patientData.first_name
            ? Utility.getDecryptText(e.patientData.first_name)
            : "";

          e.patientData.last_name = e.patientData.last_name
            ? Utility.getDecryptText(e.patientData.last_name)
            : "";
        });
        let obj = {
          data: data[0].aggregatedData,
          // count: result.totalDocs,
          totalDocs: data[0].totalCount[0].count,
          pageNumber: defaultPage,
          pageSize: count,
          totalPages: Math.ceil(data[0].totalCount[0].count / count),
        };
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: obj,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.NO_RECORD_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };

  getVisitHistoryDetails = async (
    req: Request,
    model: GetPatientHistoryDetailViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;
      defaultPage = model.pageNumber ? model.pageNumber : 1;
      count = model.pageSize ? model.pageSize : 50;
      //let userDetails = <DocumentType<User>>req.user;
      let condition: any = {};
      condition.status = "Checkout";
      condition.clinic_id = new mongoose.Types.ObjectId(
        model.clinic_id!.toString()
      );
      condition.patient_id = new mongoose.Types.ObjectId(
        model.patient_id!.toString()
      );
      condition.doctor_id = new mongoose.Types.ObjectId(
        model.doctor_id!.toString()
      );
      let data = await AppointmentModel.aggregate([
        {
          $match: condition,
        },

        // {
        //   $group: {
        //     _id: { doctor_id: "$doctor_id", patient_id: "$patient_id" },
        //     total_appointment: { $sum: 1 },
        //     last_visit: { $last: "$startDateTime" },
        //   },
        // },
        {
          $lookup: {
            from: "appointment_type",
            let: { id: "$appointmentType_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$id"],
                  },
                },
              },

              ////
              { $project: { type: 1 } },
            ],
            as: "apptTypeData",
          },
        },
        {
          $unwind: {
            path: "$apptTypeData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $facet: {
            totalCount: [{ $count: "count" }],
            aggregatedData: [
              {
                $project: {
                  appointment_number: 1,
                  appointment_type: "$apptTypeData.type",
                  startDateTime: 1,
                  endDateTime: 1,
                  status: 1,
                },
              },
              // { $sort: sortObject },
              { $skip: count * (defaultPage - 1) },
              { $limit: count },
            ],
          },
        },
        // {
        //   $project: {
        // appointment_number: 1,
        // appointment_type: "$apptTypeData.type",
        // startDateTime: 1,
        // endDateTime: 1,
        // status: 1,
        //   },
        // },
      ]);

      if (data && data.length > 0 && data[0].aggregatedData.length) {
        let obj = {
          data: data[0].aggregatedData,
          // count: result.totalDocs,
          totalDocs: data[0].totalCount[0].count,
          pageNumber: defaultPage,
          pageSize: count,
          totalPages: Math.ceil(data[0].totalCount[0].count / count),
        };
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: obj,
        };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.NO_RECORD_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  getCptCodes = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let data = await CptCodeModel.aggregate([
        { $match: { isActive: true, isDeleted: false } },
        {
          $lookup: {
            from: "insurance",
            let: { code_id: "$_id" },
            pipeline: [
              {
                $match: {
                  patient_id: new mongoose.Types.ObjectId(
                    req.params._id!.toString()
                  ),
                  coverage: "Primary",
                  $expr: { $eq: ["$$code_id", "$codes"] },
                },
              },
              { $project: { _id: 1 } },
            ],
            as: "isAssigned",
          },
        },

        {
          $project: {
            cptCode: 1,
            description: 1,
            price: 1,
            isAssigned: {
              $cond: {
                if: { $eq: [{ $size: "$isAssigned" }, 1] },
                then: true,
                else: false,
              },
            },
          },
        },
        { $sort: { isAssigned: -1, price: -1 } },
      ]);
      if (data && data.length > 0) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: data,
        };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.NO_RECORD_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  getCheckoutDetails = async (
    req: Request,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let data = await AppointmentModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(req.params._id!.toString()),
          },
        },

        // PATIENT LOOKUP
        {
          $lookup: {
            from: "patients",
            let: { patient_id: "$patient_id" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$patient_id"] },
                },
              },
              {
                $lookup: {
                  from: "states",
                  let: { state_id: "$state" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$state_id"],
                        },
                      },
                    },
                    { $project: { stateName: 1 } },
                  ],
                  as: "stateData",
                },
              },
              {
                $unwind: {
                  path: "$stateData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $lookup: {
                  from: "countries",
                  let: { country_id: "$country" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$country_id"],
                        },
                      },
                    },
                    { $project: { countryName: 1 } },
                  ],
                  as: "countryData",
                },
              },
              {
                $unwind: {
                  path: "$countryData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              // {
              //   $lookup: {
              //     from: "financialclasses",
              //     let: { financialClass_id: "$financialClass_id" },
              //     pipeline: [
              //       {
              //         $match: {
              //           $expr: { $eq: ["$_id", "$$financialClass_id"] },
              //         },
              //       },
              //       { $project: { code: 1 } },
              //     ],
              //     as: "financialClassData",
              //   },
              // },
              // {
              //   $unwind: {
              //     path: "$financialClassData",
              //     preserveNullAndEmptyArrays: true,
              //   },
              // },
              {
                $unwind: {
                  path: "$countryData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $project: {
                  SSN: 1,
                  city: 1,
                  title: 1,
                  gender: 1,
                  address: 1,
                  last_name: 1,
                  //apartment: 1,
                  appartment: 1,
                  first_name: 1,
                  postal_code: 1,
                  date_of_birth: 1,
                  //financialClass_id: 1,
                  stateName: "$stateData.stateName",
                  countryName: "$countryData.countryName",
                  //financialClassCode: "$financialClassData.code",
                  mobileNo: {
                    prefered: "$contact.prefered.mobileNo",
                    alternative: "$contact.alternative.mobileNo",
                  },
                },
              },
            ],
            as: "patientData",
          },
        },

        {
          $unwind: {
            path: "$patientData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "insurance",
            let: { patient_id: "$patient_id" },
            pipeline: [
              {
                $lookup: {
                  from: "insurance_companies",
                  localField: "insurance_company_id",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $project: {
                        companyName: 1,
                      },
                    },
                  ],
                  as: "insuranceCompanyData",
                },
              },
              {
                $unwind: {
                  path: "$insuranceCompanyData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $match: {
                  $expr: {
                    $eq: ["$patient_id", "$$patient_id"],
                  },
                  //coverage: "Primary",
                },
              },
              {
                $project: {
                  insurance_name: "$insuranceCompanyData.companyName",
                  _id: 1,
                  payer_id: 1,
                  coverage: 1,
                },
              },
              //{ $sort: { coverage: 1 } },
            ],
            as: "insuranceData",
          },
        },
        // {
        //   $unwind: {
        //     path: "$insuranceData",
        //     preserveNullAndEmptyArrays: true,
        //   },
        // },
        {
          $lookup: {
            from: "doctor",
            let: { doctor_id: "$doctor_id" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$doctor_id"] },
                },
              },
              {
                $lookup: {
                  from: "users",
                  let: { user_id: "$user_id" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$user_id"],
                        },
                      },
                    },
                    {
                      $project: {
                        first_name: 1,
                        last_name: 1,
                      },
                    },
                  ],
                  as: "userData",
                },
              },

              {
                $unwind: {
                  path: "$userData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $project: {
                  firstName: "$userData.first_name",
                  lastName: "$userData.last_name",
                },
              },
            ],
            as: "doctorData",
          },
        },

        {
          $unwind: {
            path: "$doctorData",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: "appointment_type",
            let: { appttype_id: "$appointmentType_id" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$appttype_id"] },
                },
              },
              {
                $project: {
                  type: 1,
                },
              },
            ],
            as: "appointmentTypeData",
          },
        },

        {
          $unwind: {
            path: "$appointmentTypeData",
            preserveNullAndEmptyArrays: true,
          },
        },
        // {
        //   $lookup: {
        //     from: "financialclasses",
        //     let: { clinic_id: "$clinic_id" },
        //     pipeline: [
        //       { $match: { $expr: { $eq: ["$createdby_id", "$$clinic_id"] } } },
        //       { $project: { price: 1, code: 1, covered: 1 } },
        //     ],
        //     as: "financialClassData",
        //   },
        // },

        {
          $lookup: {
            from: "clinic_locations",
            let: { location_id: "$location_id" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$location_id"] },
                },
              },
              {
                $project: {
                  city: "$city",
                  branchName: "$branchName",
                  address: "$address",
                },
              },
            ],
            as: "locationData",
          },
        },

        {
          $unwind: {
            path: "$locationData",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $project: {
            title: 1,
            status: 1,
            duration: 1,
            document: 1,
            doctorData: 1,
            patientData: 1,
            endDateTime: 1,
            locationData: 1,
            startDateTime: 1,
            appointment_type: "$appointmentTypeData.type",
            insuranceData: {
              $cond: {
                if: { $isArray: "$insuranceData" },
                then: "$insuranceData",
                else: [],
              },
            },

            //insuranceData: 1,

            //financialClassData: 1,
          },
        },
      ]);

      if (data.length) {
        // getting filled progress notes codes details

        let emptyObj = {
          ICD_10: [],
          cptCode: [],
        };
        let filledProgressNoteDetails = await FilledProgressNotesModel.findOne({
          appointment_id: new mongoose.Types.ObjectId(
            req.params._id!.toString()
          ),
        });

        //console.log(data[0].patientData);
        data[0].patientData.first_name = data[0].patientData.first_name
          ? Utility.getDecryptText(data[0].patientData.first_name)
          : "";

        data[0].patientData.last_name = data[0].patientData.last_name
          ? Utility.getDecryptText(data[0].patientData.last_name)
          : "";

        data[0].patientData.title = data[0].patientData.title
          ? Utility.getDecryptText(data[0].patientData.title)
          : "";

        // data[0].patientData.firstName = data.patientData.firstName
        //   ? utility.getDecryptText(data.patientData.firstName)
        //   : "";

        if (!data[0].filledProgressNote) {
          data[0]["filledProgressNoteCodes"] = emptyObj;
        }
        if (filledProgressNoteDetails)
          data[0]["filledProgressNoteCodes"] = filledProgressNoteDetails.codes;
        else data[0]["filledProgressNoteCodes"] = emptyObj;
      }

      // console.log(data);
      //data = data[0]

      if (data && data.length > 0) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: data[0],
        };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.NO_RECORD_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  mergePatient = async (
    req: Request,
    model: MergePatientViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let data_merged: any = [];

      let merge_appointment = await AppointmentModel.updateMany(
        { patient_id: model.merge_patient_id },
        {
          $set: { patient_id: model.merge_to_patient_id },
        }
      );

      if (merge_appointment && merge_appointment.modifiedCount > 0)
        data_merged.push({
          appointment: merge_appointment.modifiedCount,
        });

      let merge_filled_dynamic_forms = await FilledDynamicFormModel.updateMany(
        { patient_id: model.merge_patient_id },
        {
          $set: { patient_id: model.merge_to_patient_id },
        }
      );

      if (
        merge_filled_dynamic_forms &&
        merge_filled_dynamic_forms.modifiedCount > 0
      )
        data_merged.push({
          filled_dynamic_form: merge_filled_dynamic_forms.modifiedCount,
        });

      let merge_filled_progress_notes =
        await FilledProgressNotesModel.updateMany(
          { patient_id: model.merge_patient_id },
          {
            $set: { patient_id: model.merge_to_patient_id },
          }
        );

      if (
        merge_filled_progress_notes &&
        merge_filled_progress_notes.modifiedCount > 0
      )
        data_merged.push({
          filled_progress_notes: merge_filled_progress_notes.modifiedCount,
        });

      let merge_filled_treatment_plan =
        await FilledTreatmentPlanModel.updateMany(
          { patient_id: model.merge_patient_id },
          {
            $set: { patient_id: model.merge_to_patient_id },
          }
        );

      if (
        merge_filled_treatment_plan &&
        merge_filled_treatment_plan.modifiedCount > 0
      )
        data_merged.push({
          filled_treatment_plan: merge_filled_treatment_plan.modifiedCount,
        });

      let merge_billing_checkout = await BillingCheckoutModel.updateMany(
        { patient_id: model.merge_patient_id },
        {
          $set: { patient_id: model.merge_to_patient_id },
        }
      );

      if (
        merge_billing_checkout &&
        merge_filled_treatment_plan.modifiedCount > 0
      )
        data_merged.push({
          billing_checkout: merge_billing_checkout.modifiedCount,
        });

      let merge_billing_post_payment = await BillingPostPaymentModel.updateMany(
        { patient_id: model.merge_patient_id },
        {
          $set: { patient_id: model.merge_to_patient_id },
        }
      );

      if (
        merge_billing_post_payment &&
        merge_billing_post_payment.modifiedCount > 0
      )
        data_merged.push({
          billing_post_payment: merge_billing_post_payment.modifiedCount,
        });

      let merge_billing_payment = await BillingPaymentModel.updateMany(
        { patient_id: model.merge_patient_id },
        {
          $set: { patient_id: model.merge_to_patient_id },
        }
      );

      if (merge_billing_payment && merge_billing_payment.modifiedCount > 0)
        data_merged.push({
          billing_payment: merge_billing_payment.modifiedCount,
        });

      let merge_cards = await CardsModel.updateMany(
        { patient_id: model.merge_patient_id },
        { $set: { patient_id: model.merge_to_patient_id } }
      );

      if (merge_cards && merge_cards.modifiedCount > 0)
        data_merged.push({
          cards: merge_cards.modifiedCount,
        });

      let merge_e_priscription = await EpriscriptionModel.updateMany(
        { patient_id: model.merge_patient_id },
        {
          $set: { patient_id: model.merge_to_patient_id },
        }
      );

      if (merge_e_priscription && merge_e_priscription.modifiedCount > 0)
        data_merged.push({
          e_priscription: merge_e_priscription.modifiedCount,
        });

      let merge_hmo = await HmoModel.updateMany(
        { patient_id: model.merge_patient_id },
        { $set: { patient_id: model.merge_to_patient_id } }
      );

      if (merge_hmo && merge_hmo.modifiedCount > 0)
        data_merged.push({
          hmo: merge_hmo.modifiedCount,
        });

      let merge_ppo = await PpoModel.updateMany(
        { patient_id: model.merge_patient_id },
        { $set: { patient_id: model.merge_to_patient_id } }
      );

      if (merge_ppo && merge_ppo.modifiedCount > 0)
        data_merged.push({
          ppo: merge_ppo.modifiedCount,
        });

      let merge_insurance = await InsuranceModel.updateMany(
        { patient_id: model.merge_patient_id },
        { $set: { patient_id: model.merge_to_patient_id } }
      );

      if (merge_insurance && merge_insurance.modifiedCount > 0)
        data_merged.push({
          insurance: merge_insurance.modifiedCount,
        });

      let merge_patient_docs = await PatientDocsModel.updateMany(
        { patient_id: model.merge_patient_id },
        {
          $set: { patient_id: model.merge_to_patient_id },
        }
      );

      if (merge_patient_docs && merge_patient_docs.modifiedCount > 0)
        data_merged.push({
          patient_docs: merge_patient_docs.modifiedCount,
        });

      let merge_super_bill = await SuperBillModel.updateMany(
        { patient_id: model.merge_patient_id },
        {
          $set: { patient_id: model.merge_to_patient_id },
        }
      );

      if (merge_super_bill && merge_super_bill.modifiedCount > 0)
        data_merged.push({
          super_bill: merge_super_bill.modifiedCount,
        });

      // if (
      //   data_merged.length &&
      //   merge_appointment &&
      //   merge_filled_dynamic_forms &&
      //   merge_filled_progress_notes &&
      //   merge_filled_treatment_plan &&
      //   merge_billing_checkout &&
      //   merge_billing_post_payment &&
      //   merge_billing_payment &&
      //   merge_cards &&
      //   merge_e_priscription &&
      //   merge_hmo &&
      //   merge_ppo &&
      //   merge_insurance &&
      //   merge_patient_docs &&
      //   merge_super_bill
      // ) {
      let make_patient_inactive = await PatientModel.updateOne(
        { _id: model.merge_patient_id },
        { isActive: false, mergeStatus: true }
      );
      if (make_patient_inactive && make_patient_inactive.modifiedCount) {
        // Add Activity History
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `patient merged successfully`,
          type: EHistoryActivityTypeValues.PATIENT,
          // type_id: foundPatient._id,
        });

        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.MERGE_SUCCESS,
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: errorMessage.MERGE_FAILED,
        };
      }
      // } else {
      //   return {
      //     status_code: HttpStatus.BAD_REQUEST,
      //     success: false,
      //     data: errorMessage.MERGE_FAILED,
      //   };
      // }
    } catch (error) {
      next(error);
    }
  };

  fetchPatients = async (
    req: Request,
    model: FetchPatientViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let patientRoleData = await RolesModel.findOne(
        {
          roleName: "patient",
        },
        { _id: 1, permission: 1 }
      );
      if (!patientRoleData)
        return {
          success: false,
          data: {
            message: errorMessage.ROLE_NOT_FOUND,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };

      let last_fetch = await FetchDataModel.find(
        { clinic_id: model.clinic_id, type: "PATIENT" },
        { fetch_time: 1 }
      )
        .sort({ createdAt: -1 })
        .limit(1);
      let last_fetch_time = new Date(
        moment(Date.now() - 7 * 24 * 3600 * 1000).format("YYYY-MM-DD")
      ); //default is a week before current time
      if (last_fetch && last_fetch.length) {
        last_fetch_time = last_fetch[0]!.fetch_time;
      }

      let fetch_time = new Date();
      let make_fetch_req_entry = await FetchDataModel.create({
        type: "PATIENT",
        last_fetch_time: last_fetch_time,
        fetch_time: fetch_time,
        clinic_id: model.clinic_id,
        createdby_id: userDetails._id,
      });

      if (make_fetch_req_entry) {
        let FETCH_PATIENT_URL =
          "http://192.168.1.140:1336/api/rcm/patient/exportData";
        let data_fetched: {
          data: {
            code: number;
            message: string;
            data: { createdArr: any[]; updatedArr: any[] };
          };
        } = await axios.post(FETCH_PATIENT_URL, {
          currentDateTime: fetch_time,
          lastFetchTime: last_fetch_time,
        });
        //console.log("____________________________________________-");
        if (
          data_fetched &&
          data_fetched.data &&
          data_fetched.data.data &&
          (data_fetched.data.data.updatedArr.length ||
            data_fetched.data.data.createdArr.length)
        ) {
          let data: any = [];
          data_fetched.data.data.createdArr.forEach(function (singleRecord) {
            data.push({
              clinic_id: model!.clinic_id, //local mongo db id
              role: patientRoleData!._id,
              role_permission: patientRoleData!.permission,

              title: Utility.getEncryptText(singleRecord.title.toUpperCase()),
              first_name: Utility.getEncryptText(
                singleRecord.first_name.toUpperCase()
              ),
              last_name: Utility.getEncryptText(
                singleRecord.last_name.toUpperCase()
              ),
              gender:
                singleRecord.gender == "Male"
                  ? "M"
                  : singleRecord.gender == "Female"
                  ? "F"
                  : "Others",
              _id: singleRecord._id,
              middle_name: singleRecord.middle_name,
              responsible_person: singleRecord.responsible_person,
              patientId: singleRecord.patientId,
              GI: singleRecord.GI,
              SO: singleRecord.SO,
              SSN: singleRecord.SSN,
              email: singleRecord.email,
              date_of_birth: singleRecord.date_of_birth,
              marital_status: singleRecord.marital_status,
              appartment: singleRecord.appartment,
              address: singleRecord.address,
              postal_code: singleRecord.postal_code,
              city: singleRecord.city,
              createdAt: singleRecord.createdAt,
              updatedAt: singleRecord.updatedAt,
              //country: singleRecord.country, //mongdb local id
              //state: singleRecord.state, //mongdb local id
              time_zone: singleRecord.time_zone,
              customer_id_stripe: singleRecord.customer_id_stripe,
              contact: singleRecord.contact,
              payment: singleRecord.payment,
            });
          });

          data_fetched.data.data.updatedArr.forEach(function (singleRecord) {
            data.push({
              clinic_id: model!.clinic_id, //local mongo db id
              role: patientRoleData!._id,
              role_permission: patientRoleData!.permission,

              title: Utility.getEncryptText(singleRecord.title.toUpperCase()),
              first_name: Utility.getEncryptText(
                singleRecord.first_name.toUpperCase()
              ),
              last_name: Utility.getEncryptText(
                singleRecord.last_name.toUpperCase()
              ),
              gender:
                singleRecord.gender == "Male"
                  ? "M"
                  : singleRecord.gender == "Female"
                  ? "F"
                  : "Others",
              _id: singleRecord._id,
              middle_name: singleRecord.middle_name,
              responsible_person: singleRecord.responsible_person,
              patientId: singleRecord.patientId,
              GI: singleRecord.GI,
              SO: singleRecord.SO,
              SSN: singleRecord.SSN,
              email: singleRecord.email,
              date_of_birth: singleRecord.date_of_birth,
              marital_status: singleRecord.marital_status,
              appartment: singleRecord.appartment,
              address: singleRecord.address,
              postal_code: singleRecord.postal_code,
              city: singleRecord.city,
              createdAt: singleRecord.createdAt,
              updatedAt: singleRecord.updatedAt,
              //country: singleRecord.country, //mongdb local id
              //state: singleRecord.state, //mongdb local id
              time_zone: singleRecord.time_zone,
              customer_id_stripe: singleRecord.customer_id_stripe,
              contact: singleRecord.contact,
              payment: singleRecord.payment,
            });
          });

          let existingRecords = await PatientModel.find(
            {
              $or: data.map((singlePatient) => ({
                _id: singlePatient._id,
              })),
            },
            { _id: 1, clinic_id: 1 }
          );

          let conflicted_ids: any = [];
          if (existingRecords && existingRecords.length) {
            existingRecords.forEach((e) => {
              let foundIndex = data.findIndex(
                (a) =>
                  a._id.toString() == e._id.toString() &&
                  a.clinic_id.toString() != e!.clinic_id!.toString()
              );

              if (foundIndex > -1) {
                conflicted_ids.push(data[foundIndex]._id);
                data.splice(foundIndex, 1);
              }
            });
          }

          if (conflicted_ids.length) {
            await FetchDataModel.updateOne(
              { _id: make_fetch_req_entry._id },
              { conflicted_ids: conflicted_ids }
            );
          }

          if (data.length > 0) {
            let bulkPatient: any[] = [];
            data.forEach(function (singleRecord: any) {
              bulkPatient.push({
                updateOne: {
                  filter: { _id: singleRecord._id },
                  update: {
                    $set: singleRecord,
                  },
                  upsert: true,
                },
              });
            });

            let patientSaved = await PatientModel.bulkWrite(bulkPatient);

            if (patientSaved) {
              return {
                status_code: HttpStatus.OK,
                data: conflicted_ids.length
                  ? errorMessage.DATA_FETCHED_SUCCESS_WITH_CONFLICTS
                  : errorMessage.DATA_FETCHED_SUCCESS,
                success: true,
              };
            } else {
              return {
                status_code: HttpStatus.BAD_REQUEST,
                success: false,
                data: {
                  message: errorMessage.NO_DATA_TO_FETCH,
                  error: errorMessage.ON_FETCH_ERROR,
                },
              };
            }
          } else {
            return {
              status_code: HttpStatus.BAD_REQUEST,
              success: false,
              data: {
                message: conflicted_ids.length
                  ? errorMessage.NO_DATA_TO_FETCH_BUT_CONFLICT_PRESENT
                  : errorMessage.NO_DATA_TO_FETCH,
                error: errorMessage.ON_FETCH_ERROR,
              },
            };
          }
        } else {
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.NO_DATA_TO_FETCH,
              error: errorMessage.ON_FETCH_ERROR,
            },
          };
        }
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.FAILED_TO_FETCH_DATA,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
}

export default new PatientServices();
