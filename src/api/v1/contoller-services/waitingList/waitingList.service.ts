import { DocumentType } from "@typegoose/typegoose";
import { NextFunction, Request } from "express";
import fs from "fs";
import HttpStatus from "http-status-codes";
import mongoose from "mongoose";
import path from "path";
import XlsxPopulate from "xlsx-populate";
import Utility, {
  IServiceResult1,
} from "../../common/common-methods";
import errorMessage from "../../common/erros_message";
import { AppointmentType } from "../../models/appointment_types.model";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";
import { Patients } from "../../models/patient.model";
import { User } from "../../models/user.model";
import WaitingListModel from "../../models/waiting_list.model";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  AddWaitingListViewmodel,
  GetWaitingListViewmodel,
  UpdateWaitingListViewmodel,
} from "../../view-models/waitingList";

export enum EnumRole {
  PROVIDER = "provider",
}
class WaitingListServices {
  addWaitingList = async (
    req: Request,
    model: AddWaitingListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      model.createdby_id = userDetails._id;

      let alreadyPresentWaitingList =
        await WaitingListModel.findOne({
          doctor_id: model.doctor_id,
          clinic_id: model.clinic_id,
          patient_id: model.patient_id,
        });
      if (alreadyPresentWaitingList) {
        return {
          success: false,
          data: {
            message:
              errorMessage.ALREADY_EXIST_WAITING_LIST,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        let saveWaitingListResult =
          await WaitingListModel.create(model);

        let getWaitingListResult =
          await WaitingListModel.findOne({
            _id: saveWaitingListResult._id,
          })
            .populate([
              {
                path: "clinic_id",
              },
            ])
            .populate([
              {
                path: "doctor_id",
              },
            ])
            .populate([
              {
                path: "patient_id",
              },
            ])
            .populate([
              {
                path: "apptType_id",
              },
            ]);

        if (getWaitingListResult) {
          let addHistory = await HistoryModel.create({
            user_id: model.createdby_id,
            description: `waiting list added`,
            type: EHistoryActivityTypeValues.CLINIC,
            type_id: model.createdby_id,
          });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: {
              notes: getWaitingListResult,
            },
          };
        } else {
          return {
            success: false,
            data: {
              message:
                errorMessage.ERROR_ON_ADD_WAITING_LIST,
              error: errorMessage.ON_ADD_ERROR,
            },
            status_code: HttpStatus.BAD_REQUEST,
          };
        }
      }
    } catch (error) {
      next(error);
    }
  };
  updateWaitingList = async (
    req: Request,
    model: UpdateWaitingListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let updatedWaitingList =
        await WaitingListModel.findOneAndUpdate(
          {
            _id: model._id,
          },
          model,
          { new: true }
        )
          .populate([
            {
              path: "clinic_id",
            },
          ])
          .populate([
            {
              path: "doctor_id",
            },
          ])
          .populate([
            {
              path: "patient_id",
            },
          ])
          .populate([
            {
              path: "apptType_id",
            },
          ]);
      // if (updatedWaitingList) {
      //   return {
      //     success: false,
      //     data: {
      //       message: errorMessage.ALREADY_EXIST_WAITING_LIST,
      //       error: errorMessage.ON_ADD_ERROR,
      //     },
      //     status_code: HttpStatus.BAD_REQUEST,
      //   };
      // } else {
      // let updateWaitingListResult = await WaitingListModel.findOneAndUpdate(
      //   { _id: model._id },
      //   model,
      //   {
      //     new: true,
      //   }
      // );
      if (updatedWaitingList) {
        // let addHistory = await HistoryModel.create({
        //   user_id: userDetails._id,
        //   description: `provider updated waiting list`,
        //   type: EHistoryActivityTypeValues.PROVIDER,
        // });
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `waiting list updated`,
          type: EHistoryActivityTypeValues.CLINIC,
          type_id: userDetails._id,
        });
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.UPDATE_SUCCESSFULL,
          //data: updatedWaitingList,
        };
      } else {
        return {
          success: false,
          data: {
            message:
              errorMessage.ERROR_ON_UPDATE_WAITING_LIST,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
      //}
    } catch (error) {
      next(error);
    }
  };
  // deleteSkill = async (
  //   req: Request,
  //   model: CheckMongoIdViewmodel,
  //   next: NextFunction
  // ): Promise<IServiceResult1 | void> => {
  //   try {
  //     let deleteSkillResult = await SkillModel.updateOne(
  //       { _id: req.params._id },
  //       { isDeleted: true }
  //     );
  //     if (deleteSkillResult && deleteSkillResult.modifiedCount > 0) {
  //       return {
  //         status_code: HttpStatus.OK,
  //         success: true,
  //         data: true,
  //       };
  //     } else {
  //       return {
  //         success: false,
  //         data: {
  //           message: errorMessage.ERROR_ON_DELETE_SKILL,
  //           error: errorMessage.ON_DELETE_ERROR,
  //         },
  //         status_code: HttpStatus.BAD_REQUEST,
  //       };
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // };
  getWaitingList = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let getWaitingListResult =
        await WaitingListModel.findOne({
          _id: model._id,
          isActive: true,
          isDeleted: false,
        })
          .populate([
            {
              path: "clinic_id",
            },
          ])
          .populate([
            {
              path: "doctor_id",
            },
          ])
          .populate([
            {
              path: "patient_id",
            },
          ])
          .populate([
            {
              path: "apptType_id",
            },
          ]);
      if (getWaitingListResult) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: {
            notes: getWaitingListResult,
          },
        };
      } else {
        return {
          success: false,
          data: {
            message:
              errorMessage.ERROR_ON_FETCHING_WAITING_LIST,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  listWaitingList = async (
    req: Request,
    model: GetWaitingListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;

      let condition: any = {
        //is_deleted: false,
        doctor_id: model.doctor_id,
      };

      if (!model.pageNumber && !model.pageSize) {
        defaultPage = 1;
        count = -1;

        let response = await WaitingListModel.find(
          condition,
          {
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
          }
        ).sort({ createdAt: -1 });

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
              message: errorMessage.WAITING_LIST_NOT_FOUND,
              error: errorMessage.ON_FETCH_ERROR,
            },
          };
        }
      } else if (
        model.pageNumber &&
        model.pageNumber >= 1 &&
        !model.pageSize
      ) {
        defaultPage = model.pageNumber;
        count = 50;
      } else {
        defaultPage = model.pageNumber || 1;
        count = model.pageSize || 50;
      }
      let tempResult: any;

      let result: mongoose.PaginateResult<any> =
        await WaitingListModel.paginate(
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
            ...(count > 0
              ? { limit: count }
              : { pagination: false }),
            //populate: populateFeilds,

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
          totalPages: Math.ceil(
            result.totalDocs / result.limit
          ),
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
            message: errorMessage.WAITING_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  getPatientWaitingDataToExcel = async (
    req: Request,
    model: GetWaitingListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let populateFeilds: any = [
        {
          path: "createdby_id",
          select: { first_name: 1, last_name: 1 },
        },
        {
          path: "patient_id",
          select: { first_name: 1, last_name: 1 },
        },
        {
          path: "apptType_id",
          select: { type: 1, duration: 1 },
        },
        ,
        {
          path: "doctor_id",
          select: { user_id: 1 },
          populate: {
            path: "user_id",
            select: { first_name: 1, last_name: 1 },
          },
        },
      ];

      let condition: any = {
        //is_deleted: false,
        doctor_id: model.doctor_id,
      };

      let defaultPage = model.pageNumber || 1;
      let count = model.pageSize || 50;

      let result: mongoose.PaginateResult<any> =
        await WaitingListModel.paginate(
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
            ...(count > 0
              ? { limit: count }
              : { pagination: false }),
            populate: populateFeilds,

            sort: { createdAt: -1 },
          }
        );

      if (result && result.docs && result.docs.length > 0) {
        const workbook =
            await XlsxPopulate.fromBlankAsync(),
          patientWaitingSheet = workbook.sheet("Sheet1"),
          patientWaitingSheetHeader = [
            "Patient",
            "Appointment Type",
            "Added By",
            "Provider",
            "Note",
          ];

        patientWaitingSheetHeader.forEach((el, i) => {
          patientWaitingSheet
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
        let PatientWaitingdata = result.docs;

        PatientWaitingdata.forEach((el, i) => {
          let patientData = el.patient_id
            ? <DocumentType<Patients>>el.patient_id
            : { first_name: "", last_name: "" };

          let appTypeData = el.apptType_id
            ? <DocumentType<AppointmentType>>el.apptType_id
            : { type: "", duration: "" };
          let addedbyData = <DocumentType<User>>(
            el.createdby_id
          );

          let doctorDataDoc = <DocumentType<User>>(
            el.doctor_id.user_id
          );

          let doctorData =
            doctorDataDoc && doctorDataDoc
              ? doctorDataDoc
              : { first_name: "", last_name: "" };

          patientWaitingSheet
            .cell("A" + (i + 2))
            .value(
              Utility.getDecryptText(
                patientData.first_name
              ) +
                " " +
                Utility.getDecryptText(
                  patientData.last_name
                )
            )
            .style(sheetStyle);
          patientWaitingSheet;

          patientWaitingSheet
            .cell("B" + (i + 2))
            .value(
              appTypeData.type +
                "(" +
                appTypeData.duration +
                "mins.)"
            )
            .style(sheetStyle);

          patientWaitingSheet
            .cell("C" + (i + 2))
            .value(
              addedbyData.first_name +
                " " +
                addedbyData.last_name
            )

            .style(sheetStyle);

          patientWaitingSheet
            .cell("D" + (i + 2))
            .value(
              doctorData!.first_name +
                " " +
                doctorData!.last_name
            )

            .style(sheetStyle);

          patientWaitingSheet
            .cell("E" + (i + 2))
            .value(el.notes)
            .style(sheetStyle);
        });

        patientWaitingSheet.freezePanes(1, 1);

        const data: any = await workbook.outputAsync();
        await fs.writeFileSync(
          path.join(
            __dirname,
            "../../../../../public/upload/others/WaitingList_Report.xlsx"
          ),
          data
        );
        let link = `http://${req.hostname}:${process.env.PORT}/upload/others/WaitingList_Report.xlsx`;

        return {
          status_code: HttpStatus.OK,
          data: link,

          success: true,
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.WAITING_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new WaitingListServices();
