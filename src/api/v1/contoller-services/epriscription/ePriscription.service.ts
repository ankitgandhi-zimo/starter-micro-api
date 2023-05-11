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
import { Doctor } from "../../models/doctor.model";
import EPriscriptionModel from "../../models/epriscription.model";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";
import { User } from "../../models/user.model";
import {
  AddEPriscriptionViewmodel,
  GetEPriscriptionListViewmodel,
} from "../../view-models/ePriscription";
class EPriscriptionServices {
  addEPriscription = async (
    req: Request,
    model: AddEPriscriptionViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      model.createdby_id = userDetails._id;

      let alreadyPresentEPriscription =
        await EPriscriptionModel.findOne(model);
      if (alreadyPresentEPriscription) {
        return {
          success: false,
          data: {
            message:
              errorMessage.ALREADY_EXIST_EPRISCRIPTION,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      } else {
        let saveResult = await EPriscriptionModel.create(
          model
        );

        let getResult = await EPriscriptionModel.findOne({
          _id: saveResult._id,
        }).populate([
          {
            path: "doctor_id",
            populate: [
              {
                path: "user_id",
                select: { first_name: 1, last_name: 1 },
              },
            ],
            select: { _id: 1, user_id: 1 },
          },
          {
            path: "appointment_id",
            select: {
              _id: 1,
              appointment_number: 1,
              startDateTime: 1,
              endDateTime: 1,
            },
          },
        ]);
        // .populate([
        //   {
        //     path: "doctor_id",
        //     select: { _id: 1, user_id: 1 },
        //   },
        //   {
        //     path: "appointment_id",
        //     select: {
        //       _id: 1,
        //       appointment_number: 1,
        //       startDateTime: 1,
        //       endDateTime: 1,
        //     },
        //   },
        // ]);
        //console.log(getResult);
        let DoctorFormattedData: any = {};
        if (saveResult && getResult) {
          let addHistory = await HistoryModel.create({
            user_id: model.createdby_id,
            description: `eprescription added`,
            type: EHistoryActivityTypeValues.USER,
            type_id: userDetails._id,
          });

          if (
            getResult.doctor_id &&
            Object.keys(getResult.doctor_id).length > 0
          ) {
            let doctorData = <DocumentType<Doctor>>(
              getResult.doctor_id
            );
            if (doctorData._id)
              DoctorFormattedData._id = doctorData._id;
            if ("user_id" in getResult.doctor_id) {
              let userInfo = <DocumentType<User>>(
                getResult.doctor_id.user_id
              );
              if (userInfo.first_name)
                DoctorFormattedData.first_name =
                  userInfo.first_name;
              if (userInfo.last_name)
                DoctorFormattedData.last_name =
                  userInfo.last_name;
            }
          }
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: {
              _id: getResult._id,
              medicine: getResult.medicine,
              strength: getResult.strength,
              frequency: getResult.frequency,
              precaution: getResult.precaution,
              provider: DoctorFormattedData,
              appointmentData: getResult.appointment_id,
            },
          };
        } else {
          return {
            success: false,
            data: {
              message:
                errorMessage.ERROR_ON_ADD_EPRISCRIPTION,
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
  // updateNotes = async (
  //   req: Request,
  //   model: UpdateNotesViewmodel,
  //   next: NextFunction
  // ): Promise<IServiceResult1 | void> => {
  //   try {
  //     let userDetails = <DocumentType<User>>req.user;

  //     let updateNotesResult = await NotesModel.findOneAndUpdate(
  //       { _id: model._id },
  //       model,
  //       {
  //         new: true,
  //       }
  //     );
  //     if (updateNotesResult) {
  //       let addHistory = await HistoryModel.create({
  //         user_id: userDetails._id,
  //         description: `user updated notes`,
  //         type: EHistoryActivityTypeValues.USER,
  //       });
  //       return {
  //         status_code: HttpStatus.OK,
  //         success: true,
  //         data: errorMessage.UPDATE_SUCCESSFULL,
  //         // data: {
  //         //   _id: updateCountryResult._id,
  //         //   countryName: updateCountryResult.countryName,
  //         //   countryCode: updateCountryResult.countryCode,
  //         // },
  //       };
  //     } else {
  //       return {
  //         success: false,
  //         data: {
  //           message: errorMessage.ERROR_ON_UPDATE_NOTES,
  //           error: errorMessage.ON_UPDATE_ERROR,
  //         },
  //         status_code: HttpStatus.BAD_REQUEST,
  //       };
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // };
  // deleteNotes = async (
  //   req: Request,
  //   model: CheckMongoIdViewmodel,
  //   next: NextFunction
  // ): Promise<IServiceResult1 | void> => {
  //   try {
  //     let userDetails = <DocumentType<User>>req.user;

  //     let deleteNotesResult = await NotesModel.updateOne(
  //       { _id: req.params._id },
  //       { isDeleted: true }
  //     );
  //     if (deleteNotesResult && deleteNotesResult.modifiedCount > 0) {
  //       let addHistory = await HistoryModel.create({
  //         user_id: userDetails._id,
  //         description: `user deleted notes`,
  //         type: EHistoryActivityTypeValues.USER,
  //       });
  //       return {
  //         status_code: HttpStatus.OK,
  //         success: true,
  //         data: errorMessage.DELETE_SUCCESSFULL,
  //       };
  //     } else {
  //       return {
  //         success: false,
  //         data: {
  //           message: errorMessage.ERROR_ON_DELETE_USER,
  //           error: errorMessage.ON_DELETE_ERROR,
  //         },
  //         status_code: HttpStatus.BAD_REQUEST,
  //       };
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // };
  // getNotes = async (
  //   req: Request,
  //   model: CheckMongoIdViewmodel,
  //   next: NextFunction
  // ): Promise<IServiceResult1 | void> => {
  //   try {
  //     let getNotesResult = await NotesModel.findOne({
  //       _id: model._id,
  //       isActive: true,
  //       isDeleted: false,
  //     }).populate([
  //       {
  //         path: "createdby_id",
  //         select: { _id: 1, first_name: 1, last_name: 1 },
  //       },
  //     ]);
  //     if (getNotesResult) {
  //       return {
  //         status_code: HttpStatus.OK,
  //         success: true,
  //         data: {
  //           _id: getNotesResult._id,
  //           notes: getNotesResult.notes,
  //           createdBy: getNotesResult.createdby_id,
  //         },
  //       };
  //     } else {
  //       return {
  //         success: false,
  //         data: {
  //           message: errorMessage.ERROR_ON_GET_NOTES,
  //           error: errorMessage.ON_FETCH_ERROR,
  //         },
  //         status_code: HttpStatus.BAD_REQUEST,
  //       };
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // };
  listEPriscription = async (
    req: Request,
    model: GetEPriscriptionListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;
      defaultPage = model.pageNumber ? model.pageNumber : 1;
      count = model.pageSize ? model.pageSize : 50;
      let populateFeilds: any = [
        {
          path: "doctor_id",
          populate: [
            {
              path: "user_id",
              select: { first_name: 1, last_name: 1 },
            },
          ],
          select: { _id: 1, user_id: 1 },
        },
        {
          path: "appointment_id",
          select: {
            _id: 1,
            appointment_number: 1,
            startDateTime: 1,
            endDateTime: 1,
          },
        },
      ];

      let condition: any = {
        isDeleted: false,
        clinic_id: model.clinic_id,
        //isActive: true,
      };

      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(
          model.search
        );

        condition.notes = {
          $regex: model.search,
          $options: "i",
        };
      }

      if (model.isActive) {
        condition.isActive = model.isActive;
      }

      let result: mongoose.PaginateResult<any> =
        await EPriscriptionModel.paginate(condition, {
          page: defaultPage,
          ...(count > 0
            ? { limit: count }
            : { pagination: false }),
          populate: populateFeilds,

          sort: { createdAt: -1 },
        });

      if (result && result.docs && result.docs.length > 0) {
        let FormattedData: any = [];
        result.docs.forEach((d) => {
          let DoctorFormattedData: any = {};

          if (
            d.doctor_id &&
            Object.keys(d.doctor_id).length > 0
          ) {
            let doctorData = <DocumentType<Doctor>>(
              d.doctor_id
            );
            if (doctorData._id)
              DoctorFormattedData._id = doctorData._id;
            if ("user_id" in d.doctor_id) {
              let userInfo = <DocumentType<User>>(
                d.doctor_id.user_id
              );
              if (userInfo.first_name)
                DoctorFormattedData.first_name =
                  userInfo.first_name;
              if (userInfo.last_name)
                DoctorFormattedData.last_name =
                  userInfo.last_name;
            }
          }
          FormattedData.push({
            _id: d._id,
            medicine: d.medicine,
            strength: d.strength,
            frequency: d.frequency,
            precaution: d.precaution,
            provider: DoctorFormattedData,
            appointmentData: d.appointment_id,
          });
        });

        let obj = {
          data: FormattedData,
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
            message:
              errorMessage.EPRISCRIPTION_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  getEPrescriptionListByGroupDataToExcel = async (
    req: Request,
    model: GetEPriscriptionListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      const workbook = await XlsxPopulate.fromBlankAsync(),
        ePrescriptionSheet = workbook.sheet("Sheet1"),
        ePrescriptionSheetHeader = [
          "Appointment Number",
          "Appointment Date/Time",
          "Provider Name",
          "Patient Name",
        ];

      ePrescriptionSheetHeader.forEach((el, i) => {
        ePrescriptionSheet
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

      const count = model.pageSize ? model.pageSize : 50;
      req.body.page = model.pageSize ? model.pageSize : 1;
      const skip = count * (req.body.page - 1);

      let condition: any = { isDeleted: false },
        child_condition: any = {},
        sortObject = {};

      if (req.body.sortValue && req.body.sortOrder)
        sortObject[req.body.sortValue] = req.body.sortOrder;
      else
        sortObject = {
          "appointmentData.startDateTime": -1,
        };

      if (model.clinic_id)
        condition.clinic_id = new mongoose.Types.ObjectId(
          model.clinic_id.toString()
        );
      if (model.doctor_id)
        condition.doctor_id = new mongoose.Types.ObjectId(
          model.doctor_id.toString()
        );
      if (model.patient_id)
        condition.patient_id = new mongoose.Types.ObjectId(
          model.patient_id.toString()
        );
      if (model.createdby_id)
        condition.createdby_id =
          new mongoose.Types.ObjectId(
            model.createdby_id.toString()
          ); /** this is the doctor id (_id of USER COLLECTION) */
      if (model.appointment_id)
        condition.appointment_id =
          new mongoose.Types.ObjectId(
            model.appointment_id.toString()
          );
      if (model.startDateFilter && model.endDateFilter)
        child_condition["appointmentData.startDateTime"] = {
          $gte: new Date(model.startDateFilter),
          $lte: new Date(model.endDateFilter),
        };

      if (model.search) {
        const searchText = decodeURIComponent(
          model.search
        ).replace(/[[\]{}()*+?,\\^$|#\s]/g, "\\s+");

        child_condition.$or = [
          {
            "patientData.first_name": new RegExp(
              Utility.getEncryptText(
                searchText.toUpperCase()
              ),
              "gi"
            ),
          },
          {
            "patientData.last_name": new RegExp(
              Utility.getEncryptText(
                searchText.toUpperCase()
              ),
              "gi"
            ),
          },
          {
            "appointmentData.appointment_number":
              new RegExp(searchText, "gi"),
          },
        ];
      }

      const ePrescriptionArr =
        await EPriscriptionModel.aggregate([
          { $match: condition },
          {
            $group: {
              _id: "$appointment_id",
              clinic_id: { $first: "$clinic_id" },
              doctor_id: { $first: "$doctor_id" },
              patient_id: { $first: "$patient_id" },
              appointment_id: { $first: "$appointment_id" },
            },
          },
          {
            $lookup: {
              from: "appointment",
              let: { appointment_id: "$appointment_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ["$_id", "$$appointment_id"],
                    },
                  },
                },
                {
                  $project: {
                    startDateTime: 1,
                    endDateTime: 1,
                    appointment_number: 1,
                  },
                },
              ],
              as: "appointmentData",
            },
          },
          {
            $unwind: {
              path: "$appointmentData",
              preserveNullAndEmptyArrays: true,
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
                      $eq: ["$user_id", "$$clinic_id"],
                    },
                  },
                },
                { $project: { clinicName: "$clinicName" } },
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
              from: "patients",
              let: { patient_id: "$patient_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ["$_id", "$$patient_id"],
                    },
                  },
                },
                {
                  $project: {
                    first_name: 1,
                    last_name: 1,
                    patientId: 1,
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
          { $match: child_condition },
          {
            $facet: {
              totalCount: [{ $count: "sum" }],
              aggregatedData: [
                {
                  $project: {
                    _id: 0,
                    clinicData: "$clinicData",
                    // doctor_id: '$doctor_id',
                    doctorData: "$doctorData",
                    patientData: "$patientData",
                    appointmentData: "$appointmentData",
                  },
                },
                { $sort: sortObject },
                // { $limit: parseInt(skip) + parseInt(count) },
                // { $skip: parseInt(skip) },
              ],
            },
          },
        ]);

      if (!ePrescriptionArr.length)
        return {
          success: false,
          status_code: HttpStatus.NOT_FOUND,
          data: {
            message: errorMessage.NO_RECORD_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };

      let ePrescriptiondata =
        ePrescriptionArr[0].aggregatedData;

      let sheetStyle = {
        border: true,
        fontFamily: "Calibri",
      };

      ePrescriptiondata.forEach((el, i) => {
        ePrescriptionSheet
          .cell("A" + (i + 2))
          .value(el.appointmentData.appointment_number)
          .style(sheetStyle);
        ePrescriptionSheet;

        ePrescriptionSheet
          .cell("B" + (i + 2))
          .value(new Date(el.appointmentData.startDateTime))
          .style(sheetStyle);

        ePrescriptionSheet
          .cell("C" + (i + 2))
          .value(
            el.doctorData.first_name +
              " " +
              el.doctorData.last_name
          )
          .style(sheetStyle);

        ePrescriptionSheet
          .cell("D" + (i + 2))
          .value(
            Utility.getDecryptText(
              el.patientData.first_name
            ) +
              " " +
              Utility.getDecryptText(
                el.patientData.last_name
              )
          )
          .style(sheetStyle);
      });

      ePrescriptionSheet.freezePanes(1, 1);

      const data = await workbook.outputAsync();

      await fs.writeFileSync(
        path.join(
          __dirname,
          "../../../../../public/upload/others/E_Prescription_Report.xlsx"
        ),
        data
      );
      let link = `http://${req.hostname}:${process.env.PORT}/upload/others/E_Prescription_Report.xlsx`;
      return {
        status_code: HttpStatus.OK,
        success: true,
        data: link,
      };
    } catch (error) {
      next(error);
    }
  };
}
export default new EPriscriptionServices();
