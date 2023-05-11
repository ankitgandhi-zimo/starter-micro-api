import { DocumentType } from "@typegoose/typegoose";
import { NextFunction, Request } from "express";
import HttpStatus from "http-status-codes";
import mongoose from "mongoose";
import Utility, { IServiceResult1 } from "../../common/common-methods";
import errorMessage from "../../common/erros_message";
import AppointmentModel from "../../models/appointment.model";
import AvailabilityModel from "../../models/availability.model";
import DoctorModel from "../../models/doctor.model";
import TimezoneModel, { Timezone } from "../../models/timezone.model";
import { User } from "../../models/user.model";
import {
  DeleteUnavailabilityViewmodel,
  GetAvailabilityViewmodel,
  GetAvailabilityViewViewmodel,
  GetAvailableDaysViewmodel,
  GetAvailableDoctorViewmodel,
  GetAvailableTimeSlotsViewmodel,
  GetDoctorLocationViewmodel,
  GetSchedulerViewmodel,
  GetSelectedWeekDaysViewmodel,
  GetTimeSlotsViewmodel,
  GetUnavailabilityViewmodel,
  SetAvailabilityViewmodel,
  SetUnavailabilityViewmodel,
  UpdateAvailabilityViewmodel,
} from "../../view-models/availability";

// import { AddAppointmentViewmodel } from "../../view-models/appointments";

import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";
const moment = require("moment-timezone");

interface localAvailabilityInterface {
  id: number;
  name: string;
  arrayOfTimings: any[];
}

interface localAvailabilityInterface1 {
  id: number;
  isChecked: boolean;
  name: string;
  arrayOfTimings: any[];
}

class AvailabilityServices {
  setAvailability = async (
    req: Request,
    model: SetAvailabilityViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      //console.log(model.availableSlots[0]);
      let userDetails = <DocumentType<User>>req.user;
      model.setby_id = userDetails._id;

      let checkedWeekDaysArr: any = [];
      //console.log(JSON.stringify(model));
      model.week.forEach(
        (weekObj) =>
          weekObj.isChecked == true && checkedWeekDaysArr.push(weekObj)
      );

      let find_timezone = await TimezoneModel.findOne(
        { _id: model.timezone },
        { timezone: 1 }
      );
      if (!find_timezone || (find_timezone && !find_timezone.timezone))
        return {
          success: false,
          data: {
            message: errorMessage.SomeThingWentWrong,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };

      let saved_timezone = find_timezone.timezone;

      let setStartDateArr: any = [],
        availableSlots: any = [],
        setEndDateArr: any = [];

      const reqBodyStartDate = model.startDate,
        reqBodyEndDate = model.endDate;

      // ! CODE TO BE CHANGE REMOVE CHECKS
      checkedWeekDaysArr.forEach((weekObj: any) => {
        let startDate = moment
          .utc(reqBodyStartDate)
          .isoWeekday(weekObj.name)
          .format("YYYY-MM-DD");
        if (startDate < reqBodyStartDate)
          startDate = moment.utc(startDate).add(7, "days").format("YYYY-MM-DD");
        const startArrayOfTimings = weekObj.arrayOfTimings.sort(
            (a: any, b: any) => a.startTime.localeCompare(b.startTime)
          ),
          startTime = moment
            .utc(startArrayOfTimings[0].startTime, "HH:mm")
            .format("HH:mm");

        setStartDateArr.push({ startDate, startTime });

        let endDate = moment
            .utc(reqBodyEndDate)
            .isoWeekday(weekObj.name)
            .format("YYYY-MM-DD"),
          endArrayOfTimings = weekObj.arrayOfTimings.sort((a: any, b: any) =>
            a.endTime.localeCompare(b.endTime)
          ),
          endTime = moment
            .utc(
              endArrayOfTimings[endArrayOfTimings.length - 1].endTime,
              "HH:mm"
            )
            .format("HH:mm");

        if (reqBodyEndDate < endDate)
          endDate = moment
            .utc(endDate)
            .subtract(7, "days")
            .format("YYYY-MM-DD");

        setEndDateArr.push({ endDate, endTime });

        weekObj.arrayOfTimings.forEach((timing: any) => {
          let [h, m] = timing.startTime.split(":");
          timing.startTime = moment(model.startDate)
            .tz(saved_timezone)
            .set({ h, m })
            .utc();
          [h, m] = timing.endTime.split(":");

          timing.endTime = moment(model.startDate)
            .tz(saved_timezone)
            .set({ h, m })
            .utc();
        });
      });

      //console.log(checkedWeekDaysArr);

      setStartDateArr.sort(
        (a: any, b: any) =>
          new Date(a.startDate).valueOf() - new Date(b.startDate).valueOf()
      );
      setEndDateArr.sort(
        (a: any, b: any) =>
          new Date(a.endDate).valueOf() - new Date(b.endDate).valueOf()
      );

      model.startDate = moment
        .tz(
          `${setStartDateArr[0].startDate} ${setStartDateArr[0].startTime}:00`,
          saved_timezone
        )
        .utc();
      model.endDate = moment
        .tz(
          `${setEndDateArr[setEndDateArr.length - 1].endDate} ${
            setEndDateArr[setEndDateArr.length - 1].endTime
          }:00`,
          saved_timezone
        )
        .utc();

      let hasAvailabilityCond = {
        visitType: model.visitType,
        doctor_id: new mongoose.Types.ObjectId(model.doctor_id!.toString()),
        $or: [
          {
            fromDateTime: {
              $gte: model.startDate,
              $lt: model.endDate,
            },
          },
          {
            toDateTime: {
              $gte: model.startDate,
              $lt: model.endDate,
            },
          },
          {
            fromDateTime: {
              $lte: model.startDate,
              $lt: model.endDate,
            },
            toDateTime: {
              $gt: model.startDate,
              $gte: model.endDate,
            },
          },
        ],
      };
      let isAvailabile = await AvailabilityModel.find(
        hasAvailabilityCond
      ).lean();

      // const userCondition = {
      //   _id:new  mongoose.Types.ObjectId(model.doctor_id!.toString()),
      // };

      // let mobileReceiver = [new mongoose.Types.ObjectId(model.doctor_id.!.toString())],
      //   doctorData = await User.aggregate([
      //     { $match: userCondition },

      //     {
      //       $lookup: {
      //         from: "doctor",
      //         localField: "_id",
      //         foreignField: "user_id",
      //         as: "doctorData",
      //       },
      //     },
      //     {
      //       $unwind: { path: "$doctorData", preserveNullAndEmptyArrays: true },
      //     },

      //     {
      //       $lookup: {
      //         from: "users",
      //         pipeline: [
      //           {
      //             $match: {
      //               $expr: {
      //                 $eq: ["$_id", mongoose.Types.ObjectId(model.setby_id)],
      //               },
      //             },
      //           },
      //         ],
      //         as: "setbyData",
      //       },
      //     },
      //     { $unwind: { path: "$setbyData", preserveNullAndEmptyArrays: true } },

      //     {
      //       $lookup: {
      //         from: "mobiledevices",
      //         pipeline: [
      //           {
      //             $match: { $expr: { $in: ["$createdby_id", mobileReceiver] } },
      //           },
      //         ],
      //         as: "mobileDevicesData",
      //       },
      //     },

      //     {
      //       $project: {
      //         setbyData: 1,
      //         mobileDevicesData: 1,
      //         lastName: "$lastName",
      //         firstName: "$firstName",
      //         // title: '$doctorData.title',
      //         // middleName: '$doctorData.middleName',
      //         isVerified: "$doctorData.isVerified",
      //       },
      //     },
      //   ]);

      // if (!doctorData.length)
      //   return res.json(
      //     Response(constants.statusCode.unauth, constants.messages.userNotFound)
      //   );

      // doctorData = doctorData[0];

      // if (doctorData.isVerified == false)
      //   return res.json(
      //     Response(constants.statusCode.unauth, constants.doctorMsg.notVerified)
      //   );

      model.availableSlots.forEach((apptTypeObj) => {
        let weekDaysArr: any = [];
        apptTypeObj.selectedDaysofWeekArr.forEach((weekDay) => {
          if (weekDay.isSelectedForSlots == true) {
            weekDaysArr.push({
              id: weekDay.id,
              name: weekDay.name,
              unselectedSlots: weekDay.unselectedSlots,
            });
          }
        });
        availableSlots.push({
          apptType_id: apptTypeObj.apptType_id,
          selectedDays: weekDaysArr,
        });
      });

      //console.log(JSON.stringify(availableSlots));
      let insertObj = {
        visitType: model.visitType,
        location: model.location,
        setby_id: model.setby_id,
        timezone: model.timezone,
        toDateTime: model.endDate,
        doctor_id: model.doctor_id,
        clinic_id: model.clinic_id,
        availableSlots: availableSlots,
        available_days: checkedWeekDaysArr,
        fromDateTime: model.startDate,
      };

      if (isAvailabile.length > 0) {
        /** Means therapist have already set their availibility before it can be single or multiple */

        let availableWeekArr: any = [],
          availableLocationArr: any = [];

        isAvailabile.forEach((availabilityEl: any) => {
          availableLocationArr.push(availabilityEl.location.toString());
          availabilityEl.available_days.forEach((availableWeekDay: any) =>
            availableWeekArr.push(availableWeekDay.name)
          );
        });
        if (availableLocationArr.includes(model.location.toString()))
          return {
            success: false,
            data: {
              message: errorMessage.ALREADY_AVAILABILITY,
              error: errorMessage.ON_ADD_ERROR,
            },
            status_code: HttpStatus.BAD_REQUEST,
          };
        // return res.json(
        //   Response(
        //     constants.statusCode.alreadyExist,
        //     constants.availabilityMsg.alreadyAvailability
        //   )
        // );

        availableWeekArr = Array.from(new Set(availableWeekArr));
        //availableWeekArr = [...new Set(availableWeekArr)];

        // const commonWeekDay = selectedWeekArr.filter((weekDay) => availableWeekArr.includes(weekDay))
        //   if (commonWeekDay.length)
        // return res.json(
        //   Response(
        //     constants.statusCode.alreadyExist,
        //     constants.availabilityMsg.alreadyAvailabilityWeekDays(
        //       commonWeekDay
        //     )
        //   )
        // );
      }

      let saveAvailabilityResult = await AvailabilityModel.create(insertObj);

      if (saveAvailabilityResult) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `doctor availability set`,
          type: EHistoryActivityTypeValues.PROVIDER,

          type_id: model.doctor_id,
          data: {
            location: model.location,
            timezone: model.timezone,
            startDate: model.startDate,
            endDate: model.endDate,
            visitType: model.visitType,
          },
        });
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.AVAILABILITY_SET_SUCCESS,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_SET_AVAILABILITY,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };
  getAvailability = async (
    req: Request,
    model: GetAvailabilityViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      //     if (!model.doctor_id)
      //   return res.json(
      //     Response(constants.statusCode.unauth, constants.doctorMsg.idReq)
      //   );
      // if (!req.body.timezone)
      //   return res.json(
      //     Response(
      //       constants.statusCode.unauth,
      //       constants.availabilityMsg.timeZoneReq
      //     )
      //   );
      // if (!req.body.availability_id)
      //   return res.json(
      //     Response(constants.statusCode.unauth, constants.availabilityMsg.idReq)
      //   );

      // if (!req.body.selectedDate) return res.json(Response(constants.statusCode.unauth, constants.availabilityMsg.selectDate))
      const localTimeZone = model.timezone;

      let condition: any = {};
      condition.doctor_id = new mongoose.Types.ObjectId(
        model.doctor_id!.toString()
      );
      condition._id = new mongoose.Types.ObjectId(
        model.availability_id!.toString()
      );

      if (model.selectedDate) {
        condition.toDateTime = { $gte: model.selectedDate };
        condition.fromDateTime = {
          $lte: model.selectedDate,
        };
      }
      // condition = {
      //   $and: [
      //     {
      //       toDateTime: {
      //         $gte: model.selectedDate,
      //         // $gte: model.endDate,
      //       },
      //     },
      //     {
      //       fromDateTime: {
      //         $lte: model.selectedDate,
      //         // $lte: model.endDate,
      //       },
      //     },
      //   ],
      // };

      if (model.location_id)
        condition.location = new mongoose.Types.ObjectId(
          model.location_id!.toString()
        );
      if (model.clinic_id)
        condition.clinic_id = new mongoose.Types.ObjectId(
          model.clinic_id!.toString()
        );
      if (model.visitType) condition.visitType = model.visitType;

      let finalResult = await AvailabilityModel.findOne(condition, {
        availableSlots: 0,
      })
        .populate({
          path: "timezone",
          select: { timezone: 1 },
        })
        .lean();
      if (finalResult) {
        let get_timezone = <DocumentType<Timezone>>finalResult.timezone;
        const localAvailability = this.convertAvailability(
          finalResult.available_days,
          localTimeZone,
          //finalResult.timezone
          get_timezone.timezone
        );

        localAvailability.forEach((el: any) =>
          el.arrayOfTimings.length
            ? (el.isChecked = true)
            : (el.isChecked = false)
        );

        const finalObjToBeSend = {
          available_days: localAvailability,
          toDateTime: finalResult.toDateTime,
          fromDateTime: finalResult.fromDateTime,
        };

        return {
          status_code: HttpStatus.OK,
          success: true,
          data: finalObjToBeSend,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.AVAILABILITY_GET_FAILED,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };

  getAvailabilityForView = async (
    req: Request,
    model: GetAvailabilityViewViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      const localTimeZone = model.timezone;

      let condition: any = {};
      condition.doctor_id = new mongoose.Types.ObjectId(
        model.doctor_id!.toString()
      );

      condition.clinic_id = new mongoose.Types.ObjectId(
        model.clinic_id!.toString()
      );

      condition.toDateTime = {
        $gte: new Date(moment.utc(new Date()).startOf("day")),
      };

      if (model.location_id)
        condition.location = new mongoose.Types.ObjectId(
          model.location_id!.toString()
        );

      if (model.visitType) condition.visitType = model.visitType;
      let finalResult = await AvailabilityModel.aggregate([
        { $match: condition },

        {
          $lookup: {
            from: "users",
            let: { user_id: "$setby_id" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$user_id"] },
                },
              },
              { $project: { first_name: 1, last_name: 1 } },
            ],
            as: "setByData",
          },
        },
        {
          $unwind: {
            path: "$setByData",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: "timezone",
            let: { id: "$timezone" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$id"] },
                },
              },
              { $project: { timezone: 1 } },
            ],
            as: "timezoneData",
          },
        },
        {
          $unwind: {
            path: "$timezoneData",
            preserveNullAndEmptyArrays: true,
          },
        },

        { $sort: { fromDateTime: 1 } },

        {
          $group: {
            _id: {
              location_id: "$location",
              visitType: "$visitType",
            },

            dateRange: {
              $push: {
                _id: "$$ROOT._id",
                //timezone: "$$ROOT.timezone",
                timezone: "$$ROOT.timezoneData.timezone",
                setByData: "$$ROOT.setByData",
                createdAt: "$$ROOT.createdAt",
                toDateTime: "$$ROOT.toDateTime",
                fromDateTime: "$$ROOT.fromDateTime",
                available_days: "$$ROOT.available_days",
                visitType: "$$ROOT.visitType",
              },
              // $push: '$$ROOT',
            },
          },
        },

        {
          $lookup: {
            from: "clinic_locations",
            let: { location_id: "$_id.location_id" },
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
            _id: 0,
            dateRange: 1,
            locationData: 1,
          },
        },
        {
          $sort: {
            "dateRange._id": -1,
            "locationData._id": -1,
          },
        },
      ]);

      if (finalResult.length) {
        // for (let i = 0; i < finalResult.length; i++) {
        //   for (let j = 0; j < finalResult[i].dateRange.length; j++) {
        //     finalResult[i].dateRange[j].available_days =
        //       this.convertAvailability(
        //         finalResult[i].dateRange[j].available_days,
        //         localTimeZone,
        //         finalResult[i].dateRange[j].timezone
        //       );
        //   }
        //   finalResult[i].dateRange[].locationData =
        //     finalResult[index].locationData;
        // }

        finalResult.forEach((location, index) => {
          location.dateRange.forEach((range: any, index2) => {
            // const hasWeekDays = []
            // range.available_days.forEach((weekDay) => hasWeekDays.push(weekDay.id))

            range.available_days = this.convertAvailability(
              range.available_days,
              localTimeZone,
              range.timezone
            );

            finalResult[index].dateRange[index2].locationData =
              finalResult[index].locationData;
          });
          // console.log(index);
          // console.log(finalResult[index].locationData);
        });

        //if (finalResult) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: finalResult,
        };
        // } else {
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.AVAILABILITY_GET_FAILED,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };

  updateAvailability = async (
    req: Request,
    model: UpdateAvailabilityViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let checkedWeekDaysArr: any = [],
        // selectedWeekArr = [],
        setStartDateArr: any = [],
        availableSlots: any = [],
        setEndDateArr: any = [];

      let find_timezone = await TimezoneModel.findOne(
        { _id: model.timezone },
        { timezone: 1 }
      );
      if (!find_timezone || (find_timezone && !find_timezone.timezone))
        return {
          success: false,
          data: {
            message: errorMessage.SomeThingWentWrong,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };

      let saved_timezone = find_timezone.timezone;
      model.week.forEach(
        (weekObj) =>
          weekObj.isChecked == true && checkedWeekDaysArr.push(weekObj)
      );

      const reqBodyStartDate = model.startDate,
        reqBodyEndDate = model.endDate;

      checkedWeekDaysArr.forEach((weekObj: any) => {
        let startDate = moment
          .utc(reqBodyStartDate)
          .isoWeekday(weekObj.name)
          .format("YYYY-MM-DD");
        if (startDate < reqBodyStartDate)
          startDate = moment.utc(startDate).add(7, "days").format("YYYY-MM-DD");
        const startArrayOfTimings = weekObj.arrayOfTimings.sort(
            (a: any, b: any) => a.startTime.localeCompare(b.startTime)
          ),
          startTime = moment
            .utc(startArrayOfTimings[0].startTime, "HH:mm")
            .format("HH:mm");
        setStartDateArr.push({ startDate, startTime });
        // })

        // checkedWeekDaysArr.forEach((weekObj) => {
        let endDate = moment
            .utc(reqBodyEndDate)
            .isoWeekday(weekObj.name)
            .format("YYYY-MM-DD"),
          endArrayOfTimings = weekObj.arrayOfTimings.sort((a: any, b: any) =>
            a.endTime.localeCompare(b.endTime)
          ),
          endTime = moment
            .utc(
              endArrayOfTimings[endArrayOfTimings.length - 1].endTime,
              "HH:mm"
            )
            .format("HH:mm");

        if (reqBodyEndDate < endDate)
          endDate = moment
            .utc(endDate)
            .subtract(7, "days")
            .format("YYYY-MM-DD");

        setEndDateArr.push({ endDate, endTime });

        weekObj.arrayOfTimings.forEach((timing: any) => {
          let [h, m] = timing.startTime.split(":");
          timing.startTime = moment(model.startDate)
            .tz(saved_timezone)
            .set({ h, m })
            .utc();
          [h, m] = timing.endTime.split(":");

          timing.endTime = moment(model.startDate)
            .tz(saved_timezone)
            .set({ h, m })
            .utc();
        });

        // availableDaysArr.push(weekObj)
        // selectedWeekArr.push(weekObj.name)
      });

      setStartDateArr.sort(
        (a: any, b: any) =>
          new Date(a.startDate).valueOf() - new Date(b.startDate).valueOf()
      );
      setEndDateArr.sort(
        (a: any, b: any) =>
          new Date(a.endDate).valueOf() - new Date(b.endDate).valueOf()
      );

      model.startDate = moment
        .tz(
          `${setStartDateArr[0].startDate} ${setStartDateArr[0].startTime}:00`,
          saved_timezone
        )
        .utc();
      model.endDate = moment
        .tz(
          `${setEndDateArr[setEndDateArr.length - 1].endDate} ${
            setEndDateArr[setEndDateArr.length - 1].endTime
          }:00`,
          saved_timezone
        )
        .utc();

      const condition = {
        visitType: model.visitType,
        _id: new mongoose.Types.ObjectId(model.availability_id!.toString()),
        doctor_id: new mongoose.Types.ObjectId(model.doctor_id!.toString()),
        clinic_id: new mongoose.Types.ObjectId(model.clinic_id!.toString()),
        location: new mongoose.Types.ObjectId(model.location!.toString()),
      };

      model.availableSlots.forEach((apptTypeObj) => {
        const weekDaysArr: any = [];
        apptTypeObj.selectedDaysofWeekArr.forEach((weekDay) => {
          if (weekDay.isSelectedForSlots == true)
            weekDaysArr.push({
              id: weekDay.id,
              name: weekDay.name,
              unselectedSlots: weekDay.unselectedSlots,
            });
        });
        availableSlots.push({
          apptType_id: apptTypeObj.apptType_id,
          selectedDays: weekDaysArr,
        });
      });

      const updateObj = {
          toDateTime: model.endDate,
          timezone: model.timezone,
          visitType: model.visitType,
          availableSlots: availableSlots,
          fromDateTime: model.startDate,
          available_days: checkedWeekDaysArr,
        },
        finalResult = await AvailabilityModel.findOneAndUpdate(
          condition,
          updateObj
        );

      if (finalResult) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `doctor availability updated`,
          type: EHistoryActivityTypeValues.PROVIDER,
          type_id: model.doctor_id,
          data: {
            //location: model.location,
            timezone: model.timezone,
            startDate: model.startDate,
            endDate: model.endDate,
            visitType: model.visitType,
          },
        });
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.UPDATE_SUCCESSFULL,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.AVAILABILITY_UPDATE_FAILED,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };

  setUnavailability = async (
    req: Request,
    model: SetUnavailabilityViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      model.createdby_id = userDetails._id;

      //const mobileReceiver = [new mongoose.Types.ObjectId(req.body.doctor_id)],
      // const userCondition = {
      //   _id: new mongoose.Types.ObjectId(model.doctor_id!.toString()),
      // };

      // let doctorData = await .aggregate([
      //   { $match: userCondition },

      //   {
      //     $lookup: {
      //       from: "doctors",
      //       localField: "_id",
      //       foreignField: "user_id",
      //       as: "doctorData",
      //     },
      //   },
      //   { $unwind: { path: "$doctorData", preserveNullAndEmptyArrays: true } },

      //   {
      //     $lookup: {
      //       from: "users",
      //       pipeline: [
      //         {
      //           $match: {
      //             $expr: {
      //               $eq: [
      //                 "$_id",
      //                 mongoose.Types.ObjectId(req.body.createdby_id),
      //               ],
      //             },
      //           },
      //         },
      //       ],
      //       as: "setbyData",
      //     },
      //   },
      //   { $unwind: { path: "$setbyData", preserveNullAndEmptyArrays: true } },

      //   {
      //     $lookup: {
      //       from: "mobiledevices",
      //       pipeline: [
      //         { $match: { $expr: { $in: ["$createdby_id", mobileReceiver] } } },
      //       ],
      //       as: "mobileDevicesData",
      //     },
      //   },

      //   {
      //     $project: {
      //       setbyData: 1,
      //       mobileDevicesData: 1,
      //       lastName: "$lastName",
      //       firstName: "$firstName",
      //       // title: '$doctorData.title',
      //       // middleName: '$doctorData.middleName',
      //       isVerified: "$doctorData.isVerified",
      //     },
      //   },
      // ]);

      // doctorData = doctorData[0];

      // if (doctorData.isVerified == false)
      //   return res.json(
      //     Response(constants.statusCode.unauth, constants.doctorMsg.notVerified)
      //   );

      const commonFields = {
        status: model.status,
        clinic_id: model.clinic_id,
        doctor_id: model.doctor_id,
        location_id: model.location_id,
        createdby_id: model.createdby_id,
        title: "Unavailable",
        appointment_number: Math.floor(
          100000000 + Math.random() * 900000000
        ).toString(),
        //color: constants.settings.unavailabilityColor,
      };

      let finalArr: any = [];
      let apptTimingArr: any = [];
      while (model.startDate <= model.endDate) {
        model.timingArr.forEach((el) => {
          // let startDateTime = moment.tz(
          //     `${model.startDate} ${el.startTime}`,
          //     model.timezone
          //   );

          var startDateTime = moment(
            model.startDate + " " + el.startTime,
            "YYYY-MM-DD HH:mm"
          )
            .tz(model.timezone)
            .utc();

          var endDateTime = moment(
            model.startDate + " " + el.endTime,
            "YYYY-MM-DD HH:mm"
          )
            .tz(model.timezone)
            .utc();

          const weekday = moment(startDateTime).weekday();

          startDateTime = startDateTime.utc();

          if (model.weekDaysArr.includes(weekday)) {
            if (startDateTime > endDateTime)
              endDateTime = moment(endDateTime).add(1, "day");
            const duration =
                moment(endDateTime).diff(startDateTime) / (1000 * 60),
              ApptObj = {
                ...commonFields,
                startDateTime,
                endDateTime,
                duration,
              };

            apptTimingArr.push(
              {
                startDateTime: {
                  $gte: startDateTime,
                  $lt: endDateTime,
                },
              },
              {
                endDateTime: {
                  $gt: startDateTime,
                  $lte: endDateTime,
                },
              },
              {
                //   startDateTime: { $lt: startDateTime, $lt: endDateTime },
                //   endDateTime: { $gt: startDateTime, $gt: endDateTime },

                $and: [
                  {
                    $expr: {
                      $lt: ["$startDateTime", startDateTime],
                    },
                  },
                  {
                    $expr: {
                      $lt: ["$startDateTime", endDateTime],
                    },
                  },
                  {
                    $expr: {
                      $gt: ["$endDateTime", startDateTime],
                    },
                  },
                  {
                    $expr: {
                      $gt: ["$endDateTime", endDateTime],
                    },
                  },
                ],
              }
            );

            finalArr.push(ApptObj);
          }
        });

        model.startDate = moment
          .utc(model.startDate)
          .add(1, "day")
          .format("YYYY-MM-DD");
      }

      if (!finalArr.length) {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_SET_UNAVAILABILITY_INVALID_DATE,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }

      let apptCondition = {
        $or: apptTimingArr,
        isDeleted: false,
        status: { $nin: ["Cancelled", "Declined"] },
        doctor_id: new mongoose.Types.ObjectId(model.doctor_id!.toString()),
        location_id: new mongoose.Types.ObjectId(model.location_id!.toString()),
      };

      let hasAppointment = await AppointmentModel.find(apptCondition).lean();

      if (hasAppointment.length) {
        const unavailabileArr: any = [];

        hasAppointment.forEach((appt) => {
          if (appt.status == "Unavailability") {
            unavailabileArr.push({
              startDateTime: appt.startDateTime,
              endDateTime: appt.endDateTime,
            });
          }
        });

        if (unavailabileArr.length) {
          return {
            success: false,
            data: {
              message:
                errorMessage.ERROR_ON_SET_UNAVAILABILITY_DOCTOR_UNAVAILABLE,
              error: errorMessage.ON_ADD_ERROR,
            },
            status_code: HttpStatus.BAD_REQUEST,
          };
        } else {
          return {
            success: false,
            data: {
              message:
                errorMessage.ERROR_ON_SET_UNAVAILABILITY_ALREADY_APPOINTMENT,
              error: errorMessage.ON_ADD_ERROR,
            },
            status_code: HttpStatus.BAD_REQUEST,
          };
        }
      }

      const finalResult = await AppointmentModel.insertMany(finalArr);

      if (finalResult) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `doctor unavailability set`,
          type: EHistoryActivityTypeValues.PROVIDER,
          type_id: model.doctor_id,
          data: {
            timezone: model.timezone,
            location: model.location_id,
          },
        });
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.UNAVAILABILITY_SET_SUCCESS,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.appointmentMsg.providerUnavailable,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };

  getUnavailability = async (
    req: Request,
    model: GetUnavailabilityViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let defaultPage: number;
      let count: number;
      defaultPage = model.pageNumber ? model.pageNumber : 1;
      count = model.pageSize ? model.pageSize : 50;
      let condition = {
        isDeleted: false,
        title: "Unavailable",
        doctor_id: new mongoose.Types.ObjectId(model.doctor_id!.toString()),
        clinic_id: new mongoose.Types.ObjectId(model.clinic_id!.toString()),
      };

      let sortObject = { createdAt: 1 };

      const data = await AppointmentModel.aggregate([
        { $match: condition },

        {
          $group: {
            _id: "$appointment_number",
            title: { $first: "$title" },
            status: { $first: "$status" },
            timmingArr: {
              $addToSet: {
                // endTime: { $dateToString: { format: '1999-12-26T%H:%M%z', date: '$endDateTime' } },

                // startTime: { $dateToString: { format: '1999-12-26T%H:%M%z', date: '$startDateTime' } },

                endTime: {
                  $dateToString: {
                    format: `${model.startDate}T%H:%M%z`,
                    date: "$endDateTime",
                  },
                },
                startTime: {
                  $dateToString: {
                    format: `${model.startDate}T%H:%M%z`,
                    date: "$startDateTime",
                  },
                },
              },
            },
            createdAt: { $first: "$createdAt" },
            isDeleted: { $first: "$isDeleted" },
            updatedAt: { $first: "$updatedAt" },
            location_id: { $first: "$location_id" },
            endDateTime: { $last: "$endDateTime" },
            startDateTime: { $first: "$startDateTime" },
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
                  branchName: 1,
                  city: 1,
                  address: 1,
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
          $facet: {
            totalCount: [{ $count: "count" }],
            aggregatedData: [
              {
                $project: {
                  _id: 0,
                  title: 1,
                  createdAt: 1,
                  updatedAt: 1,
                  timmingArr: 1,
                  endDateTime: 1,
                  locationData: 1,
                  startDateTime: 1,
                  appointment_number: "$_id",
                },
              },
              { $sort: { createdAt: 1 } },
              { $skip: count * (defaultPage - 1) },
              { $limit: count },
            ],
          },
        },
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
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_GET_UNAVAILABILITY,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };

  deleteUnavailability = async (
    req: Request,
    model: DeleteUnavailabilityViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let unavailabilityData = await AppointmentModel.findOne({
        appointment_number: model.appointment_number,
      });
      // ! THIS IS HARD DELETE
      const isDeleted = await AppointmentModel.updateMany(
        {
          appointment_number: model.appointment_number,
        },
        {
          $set: { isDeleted: true },
        }
      );

      if (isDeleted && isDeleted.modifiedCount > 0 && unavailabilityData) {
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `doctor unavailability deleted`,
          type: EHistoryActivityTypeValues.PROVIDER,
          type_id: unavailabilityData.doctor_id,
          data: {
            appointment_number: model.appointment_number,
          },
        });
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.UNAVAILABILITY_DELETE_SUCCESSFULL,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.ERROR_ON_GET_UNAVAILABILITY,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };

  getTimeSlots = async (
    req: Request,
    model: GetTimeSlotsViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let checkedAtleastOneDay = false;

      model.apptTypeWithSelectedDays.forEach((apptType: any) => {
        apptType.selectedDaysofWeekArr.forEach((selectedDay: any) => {
          if (selectedDay.isSelectedForSlots == true) {
            let slotsArr: any = [];
            checkedAtleastOneDay = true;
            selectedDay.arrayOfTimings.forEach((timing: any) => {
              let [h, m] = timing.startTime.split(":");
              timing.startTime = moment(model.today)
                .tz(model.timezone)
                .set({ h, m })
                .utc();
              [h, m] = timing.endTime.split(":");
              timing.endTime = moment(model.today)
                .tz(model.timezone)
                .set({ h, m })
                .utc();

              let startTimeArr = moment
                  .utc(timing.startTime)
                  .format("HH:mm")
                  .split(":"),
                endTimeArr = moment
                  .utc(timing.endTime)
                  .format("HH:mm")
                  .split(":"),
                loopEndDateTime;

              if (endTimeArr[0] < startTimeArr[0])
                loopEndDateTime = moment.utc(model.today).add(24, "h").set({
                  h: endTimeArr[0],
                  m: endTimeArr[1],
                });
              else
                loopEndDateTime = moment.utc(model.today).set({
                  h: endTimeArr[0],
                  m: endTimeArr[1],
                });

              let slotEndDateTime = moment
                .utc(model.today)
                .set({
                  h: startTimeArr[0],
                  m: startTimeArr[1],
                })
                .add(apptType.duration, "minutes");

              while (slotEndDateTime <= loopEndDateTime) {
                let slotStartDateTime = moment
                  .utc(slotEndDateTime)
                  .subtract(apptType.duration, "minutes");
                slotsArr.push({
                  startTime: slotStartDateTime,
                  endTime: slotEndDateTime,
                  isChecked: true,
                });
                slotEndDateTime = moment
                  .utc(slotEndDateTime)
                  .add(apptType.duration, "minutes");
              }
              selectedDay.slotsArr = slotsArr;
              selectedDay.unselectedSlots = [];
            });
          }
        });
      });

      //if (!checkedAtleastOneDay) return res.json(Response(constants.statusCode.unauth, constants.apptTypeMsg.selectAtleastOneDay))

      if (checkedAtleastOneDay) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: model.apptTypeWithSelectedDays,
        };
      } else {
        return {
          success: false,
          data: {
            message: errorMessage.SELECT_ATLEAST_ONE_DAY,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      next(error);
    }
  };

  getAvailabilityDetailsForUpdate = async (
    req: Request,
    model: GetAvailabilityViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let condition = {
        doctor_id: new mongoose.Types.ObjectId(model.doctor_id!.toString()),
        _id: new mongoose.Types.ObjectId(model.availability_id!.toString()),
        clinic_id: new mongoose.Types.ObjectId(model.clinic_id!.toString()),
        location: new mongoose.Types.ObjectId(model.location_id!.toString()),
        visitType: model.visitType,
      };

      let finalResult = await AvailabilityModel.findOne(condition, {
        availableSlots: 0,
        setby_id: 0,
      })
        .populate({ path: "timezone", select: "timezone" })
        .lean();

      if (finalResult) {
        let get_timezone = <DocumentType<Timezone>>finalResult.timezone;
        const weekDaysArr: localAvailabilityInterface1[] = [
          {
            id: 0,
            isChecked: false,
            name: "Sunday",
            arrayOfTimings: [],
          },
          {
            id: 1,
            isChecked: false,
            name: "Monday",
            arrayOfTimings: [],
          },
          {
            id: 2,
            isChecked: false,
            name: "Tuesday",
            arrayOfTimings: [],
          },
          {
            id: 3,
            isChecked: false,
            name: "Wednesday",
            arrayOfTimings: [],
          },
          {
            id: 4,
            isChecked: false,
            name: "Thursday",
            arrayOfTimings: [],
          },
          {
            id: 5,
            isChecked: false,
            name: "Friday",
            arrayOfTimings: [],
          },
          {
            id: 6,
            isChecked: false,
            name: "Saturday",
            arrayOfTimings: [],
          },
        ];

        weekDaysArr.forEach((weekDayEl) => {
          for (
            let index = 0;
            index < finalResult!.available_days.length;
            index++
          ) {
            const element = finalResult!.available_days[index];

            if (weekDayEl.name == element.name) {
              weekDayEl.isChecked = true;

              element.arrayOfTimings.forEach((timing) => {
                let [h, m] = moment(timing.startTime)
                  //.tz(finalResult!.timezone)
                  .tz(get_timezone!.timezone)
                  .format("HH:mm")
                  .split(":");
                const startTime = moment(finalResult!.fromDateTime)
                  //.tz(model.timezone)
                  .tz(model!.timezone)
                  .set({ h, m })
                  .utc();
                [h, m] = moment(timing.endTime)
                  .tz(get_timezone!.timezone)
                  //.tz(finalResult!.timezone)
                  .format("HH:mm")
                  .split(":");
                const endTime = moment(finalResult!.fromDateTime)
                  .tz(model!.timezone)
                  //.tz(model.timezone)
                  .set({ h, m })
                  .utc();
                weekDayEl.arrayOfTimings.push({
                  startTime,
                  endTime,
                });
              });

              break;
            }
          }
        });

        finalResult.available_days = weekDaysArr;
        if (finalResult) {
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: finalResult,
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.SELECT_ATLEAST_ONE_DAY,
              error: errorMessage.ON_FETCH_ERROR,
            },
            status_code: HttpStatus.BAD_REQUEST,
          };
        }
      }
    } catch (error) {
      next(error);
    }
  };

  getAvailableDatesArr = async (
    req: Request,
    model: GetAvailableDaysViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      const condition = {
        clinic_id: new mongoose.Types.ObjectId(model.clinic_id!.toString()),
        doctor_id: new mongoose.Types.ObjectId(model.doctor_id!.toString()),
        _id: new mongoose.Types.ObjectId(model.availability_id!.toString()),
        location: new mongoose.Types.ObjectId(model.location_id!.toString()),
      };
      const data = await AvailabilityModel.aggregate([
        { $match: condition },

        // { $unwind: '$availableSlots' },
        // { $match: { 'availableSlots.apptType_id': mongoose.Types.ObjectId(appType_id) } },

        {
          $project: {
            toDateTime: 1,
            fromDateTime: 1,
            selectedDays: "$availableSlots.selectedDays",
          },
        },
      ]);

      if (!data.length)
        return {
          success: false,
          data: {
            message: errorMessage.appointmentMsg.providerUnavailable,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };

      const availibility = data[0];

      // const dateArr = [],
      //   weekDayIds = [],
      //   UTCavailability = [];

      const finalObjToSend = {
        dateArr: [],
        endDate: availibility.toDateTime,
        startDate: availibility.fromDateTime,
      };
      if (finalObjToSend) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: finalObjToSend,
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

  getAvailableDoctorsLocation = async (
    req: Request,
    model: GetDoctorLocationViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      const condition: any = {};
      condition.clinic_id = new mongoose.Types.ObjectId(
        model.clinic_id!.toString()
      );
      condition.doctor_id = new mongoose.Types.ObjectId(
        model.doctor_id!.toString()
      );
      condition.toDateTime = {
        $gte: new Date(moment.utc(new Date()).startOf("day")),
      };
      if (model.visitType) condition.visitType = model.visitType;
      //};
      const finalResult = await AvailabilityModel.aggregate([
        { $match: condition },

        {
          $lookup: {
            from: "clinic_locations",
            localField: "location",
            foreignField: "_id",
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
          $lookup: {
            from: "timezone",
            localField: "timezone",
            foreignField: "_id",
            as: "timezoneData",
          },
        },
        {
          $unwind: {
            path: "$timezoneData",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: "doctor",
            localField: "doctor_id",
            foreignField: "_id",
            as: "doctorData",
          },
        },
        {
          $unwind: {
            path: "$doctorData",
            preserveNullAndEmptyArrays: true,
          },
        },

        // {
        //   $lookup: {
        //     from: "users",
        //     localField: "doctor_id",
        //     foreignField: "_id",
        //     as: "userData",
        //   },
        // },
        // { $unwind: { path: "$userData", preserveNullAndEmptyArrays: true } },

        {
          $lookup: {
            from: "users",
            let: { doctor_id: "$doctorData.user_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$doctor_id"],
                  },
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

        // { $match: child_condition },

        {
          $project: {
            userData: 1,
            timezone: "$timezoneData.timezone",
            doctorData: 1,
            toDateTime: 1,
            fromDateTime: 1,
            availability_id: "$_id",
            _id: "$locationData._id",
            city: "$locationData.city",
            address: "$locationData.address",
            branchName: "$locationData.branchName",
          },
        },
      ]);

      if (finalResult && finalResult.length > 0) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: finalResult,
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

  getAvailableTimeSlots = async (
    req: Request,
    model: GetAvailableTimeSlotsViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      const {
        availability_id,
        timezone: localTimeZone,
        providerTimezone,
        selectedDate,
        selectedWeekDay: localWeekDay,
        appType_id,
        clinic_id,
        doctor_id,
        location_id,
      } = model;

      const availableDateTime = moment.tz(selectedDate, providerTimezone).utc(),
        localDateTime = moment.tz(selectedDate, localTimeZone).utc(),
        timezoneDiff = availableDateTime.diff(localDateTime);

      let condition: any = {};
      condition.clinic_id = new mongoose.Types.ObjectId(clinic_id!.toString());
      condition.doctor_id = new mongoose.Types.ObjectId(doctor_id!.toString());
      condition.location = new mongoose.Types.ObjectId(location_id!.toString());
      condition.$and = [
        {
          fromDateTime: {
            $lte: new Date(
              moment.tz(selectedDate, providerTimezone).endOf("day").utc()
            ),
          },
        },
        {
          toDateTime: {
            $gte: new Date(
              moment.tz(selectedDate, providerTimezone).startOf("day").utc()
            ),
          },
        },
      ];
      condition._id = new mongoose.Types.ObjectId(availability_id!.toString());
      //};
      if (model.visitType) condition.visitType = model.visitType;

      let apptEndDate = new Date(
          moment.tz(selectedDate, providerTimezone).endOf("day").utc()
        ),
        apptStartDate = new Date(
          moment.tz(selectedDate, providerTimezone).startOf("day").utc()
        );

      if (timezoneDiff < 0)
        apptEndDate = new Date(moment(apptEndDate).add(1, "day"));
      else if (timezoneDiff > 0)
        apptStartDate = new Date(moment(apptStartDate).subtract(1, "day"));

      const apptCond = {
        isDeleted: false,
        status: { $nin: ["Cancelled", "Declined"] },
        doctor_id: new mongoose.Types.ObjectId(doctor_id!.toString()),
        clinic_id: new mongoose.Types.ObjectId(clinic_id!.toString()),
        endDateTime: { $lte: apptEndDate },
        startDateTime: { $gte: apptStartDate },
      };

      const availibility = await AvailabilityModel.aggregate([
        { $match: condition },

        { $unwind: "$availableSlots" },
        {
          $match: {
            "availableSlots.apptType_id": new mongoose.Types.ObjectId(
              appType_id!.toString()
            ),
          },
        },
        {
          $lookup: {
            from: "timezone",
            localField: "timezone",
            foreignField: "_id",
            as: "timezoneData",
          },
        },
        {
          $unwind: {
            path: "$timezoneData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "appointment_type",
            pipeline: [
              {
                $match: {
                  _id: new mongoose.Types.ObjectId(appType_id!.toString()),
                },
              },
              { $project: { type: 1, duration: 1 } },
            ],
            as: "apptTypeData",
          },
        },

        {
          $lookup: {
            from: "appointment",
            pipeline: [
              { $match: apptCond },
              {
                $project: {
                  startDateTime: 1,
                  endDateTime: 1,
                  status: 1,
                },
              },
            ],
            as: "apptData",
          },
        },

        {
          $project: {
            apptData: 1,
            timezone: "$timezoneData.timezone",
            apptTypeData: 1,
            availableSlots: 1,
            available_days: 1,
          },
        },
      ]);
      if (availibility.length == 0) {
        return {
          success: false,
          data: {
            message: errorMessage.appointmentMsg.providerUnavailable,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }

      if (!availibility[0].apptTypeData.length) {
        return {
          success: false,
          data: {
            message: errorMessage.APPOINTMENT_TYPE_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }

      if (providerTimezone != availibility[0].timezone) {
        return {
          success: false,
          data: {
            message: errorMessage.INCORRECT_TIME_ZONE,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      }

      const duration = availibility[0].apptTypeData[0].duration,
        apptType = availibility[0].apptTypeData[0].type;

      const appointmentArr = availibility[0].apptData;

      const checkApptConflict = (slotStartTime, slotEndTime) => {
        for (let index = 0; index < appointmentArr.length; index++) {
          const apptObj = appointmentArr[index];

          if (
            slotStartTime <= apptObj.startDateTime &&
            apptObj.startDateTime < slotEndTime
          ) {
            if (apptObj.status == "Unavailability") return "Unavailable";
            return "Booked";
          }
          if (
            slotStartTime < apptObj.endDateTime &&
            apptObj.endDateTime <= slotEndTime
          ) {
            if (apptObj.status == "Unavailability") return "Unavailable";
            return "Booked";
          }
          if (
            apptObj.startDateTime < slotStartTime &&
            slotEndTime < apptObj.endDateTime
          ) {
            if (apptObj.status == "Unavailability") return "Unavailable";
            return "Booked";
          }
        }
        return "Available";
      };
      const totalSlotes: any = [],
        arrayToBeSend: any = [],
        availableDaysArr = availibility[0].available_days,
        selectedDaysArr = availibility[0].availableSlots.selectedDays;
      const createSlotArr = (timingArr, unselectedSlotsArr, slotDate) => {
        let index = 0;
        let [year, month, date] = moment(slotDate)
          .format("YYYY-MM-DD")
          .split("-");
        month = month - 1;
        timingArr.forEach((timing) => {
          const loopEndDateTime = moment
            .tz(timing.endTime, providerTimezone)
            .set({ date, month, year });
          let slotEndDateTime = moment
            .tz(timing.startTime, providerTimezone)
            .add(duration, "minutes")
            .set({ date, month, year });
          while (slotEndDateTime <= loopEndDateTime) {
            if (!unselectedSlotsArr.includes(index)) {
              const slotStartDateTime = moment
                .tz(slotEndDateTime, providerTimezone)
                .subtract(duration, "minutes");

              totalSlotes.push({
                startTime: slotStartDateTime,
                endTime: slotEndDateTime,
              });
            }

            index++;

            slotEndDateTime = moment
              .tz(slotEndDateTime, providerTimezone)
              .add(duration, "minutes");
          }
        });
      };

      if (timezoneDiff == 0) {
        let timingArr = null,
          unselectedSlots = null;
        for (let index = 0; index < selectedDaysArr.length; index++) {
          const element = selectedDaysArr[index];
          if (element.name == localWeekDay) {
            unselectedSlots = element.unselectedSlots;
            break;
          }
        }
        if (unselectedSlots == null) {
          return {
            success: false,
            data: {
              message: errorMessage.SELECTED_APPOINTMENT_TYPE_NOT_ACCEPTED,
              error: errorMessage.ON_FETCH_ERROR,
            },
            status_code: HttpStatus.BAD_REQUEST,
          };
        }

        for (let index = 0; index < availableDaysArr.length; index++) {
          const element = availableDaysArr[index];
          if (element.name == localWeekDay) {
            timingArr = element.arrayOfTimings;
            break;
          }
        }

        if (timingArr == null) {
          return {
            success: false,
            data: {
              message: errorMessage.NO_RECORD_FOUND,
              error: errorMessage.ON_FETCH_ERROR,
            },
            status_code: HttpStatus.BAD_REQUEST,
          };
        }

        createSlotArr(timingArr, unselectedSlots, selectedDate);
      }
      const getDay = (weekDay, value) => {
        let day: any = null;
        switch (weekDay) {
          case "Sunday":
            value > 0 ? (day = "Monday") : (day = "Saturday");
            break;
          case "Monday":
            value > 0 ? (day = "Tuesday") : (day = "Sunday");
            break;
          case "Tuesday":
            value > 0 ? (day = "Wednesday") : (day = "Monday");
            break;
          case "Wednesday":
            value > 0 ? (day = "Thursday") : (day = "Tuesday");
            break;
          case "Thursday":
            value > 0 ? (day = "Friday") : (day = "Wednesday");
            break;
          case "Friday":
            value > 0 ? (day = "Saturday") : (day = "Thursday");
            break;
          case "Saturday":
            value > 0 ? (day = "Sunday") : (day = "Friday");
            break;
        }
        return day;
      };
      if (timezoneDiff < 0) {
        let timingArr = null,
          unselectedSlots = null,
          nextWeekDay = getDay(localWeekDay, 1);

        for (let index = 0; index < selectedDaysArr.length; index++) {
          const element = selectedDaysArr[index];
          if (element.name == localWeekDay) {
            unselectedSlots = element.unselectedSlots;
            break;
          }
        }
        if (unselectedSlots != null) {
          for (let index = 0; index < availableDaysArr.length; index++) {
            const element = availableDaysArr[index];
            if (element.name == localWeekDay) {
              timingArr = element.arrayOfTimings;
              break;
            }
          }

          if (timingArr != null)
            createSlotArr(timingArr, unselectedSlots, selectedDate);
        }

        timingArr = null;
        unselectedSlots = null;

        for (let index = 0; index < selectedDaysArr.length; index++) {
          const element = selectedDaysArr[index];
          if (element.name == nextWeekDay) {
            unselectedSlots = element.unselectedSlots;
            break;
          }
        }
        if (unselectedSlots != null) {
          for (let index = 0; index < availableDaysArr.length; index++) {
            const element = availableDaysArr[index];
            if (element.name == nextWeekDay) {
              timingArr = element.arrayOfTimings;
              break;
            }
          }

          const sloteDate = moment
            .utc(selectedDate)
            .add(1, "day")
            .format("YYYY-MM-DD");

          if (timingArr != null)
            createSlotArr(timingArr, unselectedSlots, sloteDate);
        }
      } else if (timezoneDiff > 0) {
        let timingArr = null,
          unselectedSlots = null,
          previousWeekDay = getDay(localWeekDay, -1);
        for (let index = 0; index < selectedDaysArr.length; index++) {
          const element = selectedDaysArr[index];
          if (element.name == localWeekDay) {
            unselectedSlots = element.unselectedSlots;
            break;
          }
        }
        if (unselectedSlots != null) {
          for (let index = 0; index < availableDaysArr.length; index++) {
            const element = availableDaysArr[index];
            if (element.name == localWeekDay) {
              timingArr = element.arrayOfTimings;
              break;
            }
          }
          if (timingArr != null)
            createSlotArr(timingArr, unselectedSlots, selectedDate);
        }
        timingArr = null;
        unselectedSlots = null;
        for (let index = 0; index < selectedDaysArr.length; index++) {
          const element = selectedDaysArr[index];
          if (element.name == previousWeekDay) {
            unselectedSlots = element.unselectedSlots;
            break;
          }
        }
        if (unselectedSlots != null) {
          for (let index = 0; index < availableDaysArr.length; index++) {
            const element = availableDaysArr[index];
            if (element.name == previousWeekDay) {
              timingArr = element.arrayOfTimings;
              break;
            }
          }
          const sloteDate = moment
            .utc(selectedDate)
            .subtract(1, "day")
            .format("YYYY-MM-DD");

          if (timingArr != null)
            createSlotArr(timingArr, unselectedSlots, sloteDate);
        }
      }
      totalSlotes.forEach((slote) => {
        if (
          moment.tz(slote.startTime, localTimeZone).format("YYYY-MM-DD") ==
          selectedDate
        ) {
          // console.log('enter')
          arrayToBeSend.push({
            ...slote,
            status: checkApptConflict(
              new Date(slote.startTime),
              new Date(slote.endTime)
            ),
          });
        }
      });
      ////ENDS

      if (arrayToBeSend && arrayToBeSend.length > 0) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: arrayToBeSend,
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

  getSchedulerData = async (
    req: Request,
    model: GetSchedulerViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      const {
        clinic_id,
        availability_id,
        filter,
        nowTime,
        weekDay,
        timezone: localTimeZone,
      } = model;
      let endDateFilter,
        startDateFilter = model.startDateFilter;

      // await getSchedulerDataValidation.validateAsync({
      //   clinic_id,
      //   startDateFilter,
      //   weekDay,
      //   filter,
      //   localTimeZone,
      // });

      if (filter != "DAY" && !availability_id)
        return {
          success: false,
          data: {
            message: errorMessage.SomeThingWentWrong,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      // return res.json(
      //   Response(
      //     constants.statusCode.unauth,
      //     constants.messages.somethingWentWrong
      //   )
      // );

      switch (filter) {
        case "DAY":
          endDateFilter = moment(startDateFilter).add(1, "day");
          break;
        case "WEEK":
        case "MONTH":
          endDateFilter = req.body.endDateFilter;
          break;
      }

      //const count = 6;
      model.pageNumber = model.pageNumber ? model.pageNumber : 1;
      let pageSize = model.pageSize ? model.pageSize : 5;
      const skip = pageSize * (model.pageNumber - 1);

      const sortObject = { fromDateTime: 1 };
      let availibilityCond: any = {};
      if (model.visitType) availibilityCond.visitType = model.visitType;
      availibilityCond.clinic_id = new mongoose.Types.ObjectId(
        clinic_id!.toString()
      );
      const apptCond: any = {};
      apptCond.isDeleted = false;
      apptCond.status = { $nin: ["Cancelled", "Declined"] };
      apptCond.clinic_id = new mongoose.Types.ObjectId(clinic_id!.toString());
      apptCond.$expr = {
        $and: [
          { $eq: ["$location_id", "$$location_id"] },
          { $eq: ["$doctor_id", "$$doctor_id"] },
        ],
      };

      if (filter != "DAY") {
        availibilityCond._id = new mongoose.Types.ObjectId(
          availability_id!.toString()
        );
        apptCond.startDateTime = {
          $gte: new Date(startDateFilter),
          $lte: new Date(endDateFilter),
        };
      } else {
        availibilityCond.toDateTime = {
          $gte: new Date(startDateFilter),
        };
        availibilityCond.fromDateTime = {
          $lte: new Date(endDateFilter),
        };
        apptCond.$or = [
          {
            startDateTime: {
              $gte: new Date(startDateFilter),
              $lte: new Date(endDateFilter),
            },
          },
          {
            endDateTime: {
              $gte: new Date(startDateFilter),
              $lte: new Date(endDateFilter),
            },
          },
        ];
      }

      const data = await AvailabilityModel.aggregate([
        { $match: availibilityCond },
        {
          $lookup: {
            from: "timezone",
            localField: "timezone",
            foreignField: "_id",
            as: "timezoneData",
          },
        },
        {
          $unwind: {
            path: "$timezoneData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "doctor",
            localField: "doctor_id",
            foreignField: "_id",
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
            from: "users",
            let: { doctor_id: "$doctorData.user_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$doctor_id"],
                  },
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
        //{ $match: { "doctorData.isActive": true, "doctorData.isDeleted": false } },
        {
          $lookup: {
            from: "appointment",
            let: {
              doctor_id: "$doctor_id",
              location_id: "$location",
            },
            pipeline: [
              { $match: apptCond },

              {
                $lookup: {
                  from: "appointment_type",
                  let: {
                    appointmentType_id: "$appointmentType_id",
                  },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$appointmentType_id"],
                        },
                      },
                    },
                    { $project: { color: 1 } },
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
                    {
                      $project: {
                        insuranceName: 1,
                        copayAmount: "$copay.amount",
                      },
                    },
                  ],
                  as: "insuranceData",
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
                        patientId: 1,
                        last_name: 1,
                        date_of_birth: 1,
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
                $project: {
                  status: 1,
                  title: 1,
                  //status: 1,
                  duration: 1,
                  isEmergency: 1,
                  patientData: 1,
                  endDateTime: 1,
                  insuranceData: 1,
                  startDateTime: 1,
                  appointment_type: 1,
                  appointment_number: 1,
                  typeOfTherapy: "$visitType",
                  isRecurring: "$recurring.status",
                  rescheduleData: {
                    type: "$reschedule.type",
                  },
                  color: {
                    $ifNull: [
                      "$apptTypeData.color",
                      //constants.settings.unavailabilityColor,
                      "black",
                    ],
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
              { $sort: { startDateTime: 1 } },
            ],
            as: "appointmentData",
          },
        },

        {
          $lookup: {
            from: "clinic_locations",
            localField: "location",
            foreignField: "_id",
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
            _id: 0,
            // localAvailability: 1,
            //timezone: 1,
            timezone: "$timezoneData.timezone",
            doctor_id: 1,
            // doctorData: 1,
            toDateTime: 1,
            fromDateTime: 1,
            appointmentData: 1,
            availability_id: "$_id",
            location_id: "$location",
            city: "$locationData.city",
            availability: "$available_days",
            address: "$locationData.address",
            lastName: "$userData.last_name",
            firstName: "$userData.first_name",
            branchName: "$locationData.branchName",
          },
        },
        //{ $sort: sortObject },
        { $limit: skip + pageSize },
        { $skip: skip },
      ]);

      let totalCount = 1;
      if (data.length) {
        let dataToBeSend: any = [];
        let appointmentData: any = [];

        data.forEach((availabilityEl: any) => {
          availabilityEl.appointmentData.forEach((appointment) => {
            if (appointment.patientData) {
              appointment.patientData.first_name = appointment.patientData
                .first_name
                ? Utility.getDecryptText(appointment.patientData.first_name)
                : "";
              appointment.patientData.last_name = appointment.patientData
                .last_name
                ? Utility.getDecryptText(appointment.patientData.last_name)
                : "";
              // ? utility.getDecryptText(appointment.patientData.firstName)
              // : "";
              // appointment.patientData.lastName =
              //   appointment.patientData.lastName;
              // ? utility.getDecryptText(appointment.patientData.lastName)
              // : "";
            }
          });

          const localAvailability = this.convertAvailability(
            availabilityEl.availability,
            localTimeZone,
            availabilityEl.timezone
          );

          availabilityEl.availability = localAvailability;
          availabilityEl.appointmentData.forEach((appt) => {
            appointmentData.push({
              ...appt,
              ...{
                doctor_id: availabilityEl.doctor_id,
                location_id: availabilityEl.location_id,
                branchName: availabilityEl.branchName,
                city: availabilityEl.city,
                availability_id: availabilityEl.availability_id,
                lastName: availabilityEl.last_name,
                firstName: availabilityEl.first_name,
              },
            });
          });
          //appointmentData;
          dataToBeSend.push(availabilityEl);
        });

        if (filter == "DAY")
          totalCount = await AvailabilityModel.countDocuments(availibilityCond);

        if (dataToBeSend && dataToBeSend.length > 0) {
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: {
              data: dataToBeSend,
              appointmentData: appointmentData,
              totalDocs: totalCount,
            },
            //data: dataToBeSend,
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

  getAvailableDoctors = async (
    req: Request,
    model: GetAvailableDoctorViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      const count = model.pageSize ? model.pageSize : 50;
      const page = model.pageNumber ? model.pageNumber : 1;
      const skip = count * (page - 1);

      const availabilityEnd = new Date(model.nowTime),
        availabilityStart = new Date(moment(model.nowTime).add(24, "h"));

      const condition: any = {};
      if (model.visitType) condition.visitType = model.visitType;
      condition.clinic_id = new mongoose.Types.ObjectId(
        model.clinic_id!.toString()
      );

      if (model.todayCase == true)
        condition.toDateTime = { $gte: availabilityEnd };
      else {
        condition.fromDateTime = { $lt: availabilityStart };
        condition.toDateTime = { $gte: availabilityEnd };
      }

      if (model.location_id)
        condition.location = new mongoose.Types.ObjectId(
          model.location_id!.toString()
        );
      if (model.doctor_id)
        condition.doctor_id = new mongoose.Types.ObjectId(
          model.doctor_id!.toString()
        );

      let child_condition: any = {};
      // = {
      //"doctorData.isVerified": true,
      child_condition["userData.isActive"] = true;
      child_condition["userData.isDeleted"] = false;
      // };

      // if (model.skill_id)
      //   child_condition["doctorData.skills"] = {
      //     $elemMatch: { skill_id: new mongoose.Types.ObjectId(model.skill_id) },
      //   };

      let sortObject = {};

      if (model.sortValue && model.sortOrder) {
        sortObject[model.sortValue] = model.sortOrder;
      } else sortObject = { firstName: 1 };

      if (model.search) {
        const search = decodeURIComponent(model.search).replace(
          /[[\]{}()*+?,\\^$|#\s]/g,
          "\\s+"
        );
        child_condition.$or = [
          {
            "userData.firstName": new RegExp(search, "gi"),
          },
          { "userData.lastName": new RegExp(search, "gi") },
        ];
      }
      // if (model.selectedDate) {
      //   const weekDay = moment.utc(model.selectedDate).format('dddd')
      //   selectedDate = new Date(model.selectedDate)
      //   child_condition.toDateTime = { $gte: selectedDate }
      //   child_condition.fromDateTime = { $lte: selectedDate }
      //   child_condition.available_days = { $elemMatch: { name: weekDay } }
      // }
      // console.log('condition  ', condition)
      // console.log('child_condition  ', child_condition)

      const data = await AvailabilityModel.aggregate([
        { $match: condition },
        {
          $lookup: {
            from: "timezone",
            localField: "timezone",
            foreignField: "_id",
            as: "timezoneData",
          },
        },
        {
          $unwind: {
            path: "$timezoneData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "doctor",
            localField: "doctor_id",
            foreignField: "_id",
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
            from: "clinic_locations",
            localField: "location",
            foreignField: "_id",
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
          $lookup: {
            from: "users",
            let: { user_id: "$doctorData.user_id" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$user_id"] },
                },
              },
              //{ $project: { color: 1 } },
            ],
            as: "userData",
          },
        },
        // {
        //   $lookup: {
        //     from: "users",
        //     localField: "doctor_id",
        //     foreignField: "_id",
        //     as: "userData",
        //   },
        // },
        {
          $unwind: {
            path: "$userData",
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
                  //timezone: 1,
                  timezone: "$timezoneData.timezone",
                  visitType: 1,
                  toDateTime: 1,
                  fromDateTime: 1,
                  available_days: 1,
                  image: "$userData.image",
                  title: "$doctorData.title",
                  lastName: "$userData.last_name",
                  firstName: "$userData.first_name",
                  doctor_id: "$doctorData._id",
                  middleName: "$doctorData.middleName",
                  description: "$doctorData.description",
                  qualifications: "$doctorData.qualifications",
                  locationData: {
                    _id: "$locationData._id",
                    city: "$locationData.city",
                    address: "$locationData.address",
                    branchName: "$locationData.branchName",
                  },
                },
              },
              { $sort: sortObject },
              { $limit: skip + count },
              { $skip: skip },
            ],
          },
        },
      ]);

      // console.log('data[0].aggregatedData  ', data[0].aggregatedData)

      if (data[0].aggregatedData.length) {
        // let finalObjectToBeSend = []

        // const weekDay = moment.utc(model.selectedDate).weekday(),
        //   finalResult = data[0].aggregatedData

        // if (model.selectedDate && model.fromTime && model.toTime) {
        //   finalResult.forEach((el) => {
        //     el.available_days.forEach((availableDayEl) => {
        //       if (availableDayEl.id == weekDay) {
        //         for (let i = 0; i < availableDayEl.arrayOfTimings.length; i++) {
        //           const timingEl = availableDayEl.arrayOfTimings[i]
        //           const availalbleStartTime = moment(timingEl.startTime).format('HH:mm')
        //           const availalbleEndTime = moment(timingEl.endTime).format('HH:mm')

        //           if (model.fromTime > availalbleStartTime && model.toTime < availalbleEndTime) {
        //             finalObjectToBeSend.push(el)
        //             break
        //           }
        //         }
        //       }
        //     })
        //   })
        // } else finalObjectToBeSend = finalResult

        // if (finalObjectToBeSend.length)\

        let arr: any = [];
        if (model.todayCase != true) {
          const selectedWeek = moment(model.nowTime)
            .tz(model.timezone)
            .format("dddd");

          data[0].aggregatedData.forEach((el) => {
            const localAvailability = this.convertAvailability(
              el.available_days,
              model.timezone,
              el.timezone
            );
            for (let index = 0; index < localAvailability.length; index++) {
              const element = localAvailability[index];
              if (
                element.name == selectedWeek &&
                element.arrayOfTimings.length
              ) {
                arr.push(el);
                break;
              }
            }
          });
        } else arr = data[0].aggregatedData;

        if (arr.length)
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: {
              data: arr,
              totalDocs: data[0].totalCount[0].sum,
            },
          };
        else
          return {
            success: false,
            data: {
              message: errorMessage.NO_DOCTOR_AVAILABLE,
              error: errorMessage.ON_ADD_ERROR,
            },
            status_code: HttpStatus.BAD_REQUEST,
          };
      } else
        return {
          success: false,
          data: {
            message: errorMessage.NO_DOCTOR_AVAILABLE,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
    } catch (error) {
      next(error);
    }
  };

  getSelectedWeekDaysOfAvailablility = async (
    req: Request,
    model: GetSelectedWeekDaysViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      const doctorCond = {
        _id: new mongoose.Types.ObjectId(model.doctor_id!.toString()),
      };

      const data = await DoctorModel.aggregate([
        { $match: doctorCond },

        {
          $lookup: {
            from: "appointment_type",
            let: { appTypeId: "$assignedApptTypes" },
            pipeline: [
              {
                $match: {
                  $expr: { $in: ["$_id", "$$appTypeId"] },
                  isActive: true,
                  isDeleted: false,
                },
              },

              {
                $lookup: {
                  from: "availabilities",
                  let: { apptTypeId: "$_id" },
                  pipeline: [
                    {
                      $match: {
                        _id: new mongoose.Types.ObjectId(
                          model.availability_id!.toString()
                        ),
                        doctor_id: new mongoose.Types.ObjectId(
                          model.doctor_id!.toString()
                        ),
                      },
                    },
                    { $unwind: "$availableSlots" },
                    {
                      $match: {
                        $expr: {
                          $eq: ["$availableSlots.apptType_id", "$$apptTypeId"],
                        },
                      },
                    },
                    {
                      $project: {
                        available_days: "$available_days.name",
                        selectedDays: "$availableSlots.selectedDays.name",
                      },
                    },
                  ],
                  as: "availability",
                },
              },

              {
                $unwind: {
                  path: "$availability",
                  preserveNullAndEmptyArrays: true,
                },
              },

              {
                $project: {
                  type: 1,
                  color: 1,
                  duration: 1,
                  // availability: 1,
                  selectedDays: "$availability.selectedDays",
                  available_days: "$availability.available_days",
                },
              },
            ],
            as: "assignedApptTypes",
          },
        },
        {
          $project: {
            doctor_id: req.body.doctor_id,
            availability_id: req.body.availability_id,
            assignedApptTypes: 1,
            _id: 0,
          },
        },
      ]);

      if (!data.length)
        return {
          success: false,
          data: {
            message: errorMessage.NO_RECORD_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
      if (!data[0].assignedApptTypes.length)
        return {
          success: false,
          data: {
            message: errorMessage.APPOINTMENT_TYPE_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };

      //availabilityMsg
      if (!data[0].assignedApptTypes[0].available_days)
        return {
          success: false,
          data: {
            message: errorMessage.AVAILABILITY_GET_FAILED,
            error: errorMessage.ON_FETCH_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };

      // return res.json(Response(constants.statusCode.ok, constants.messages.ExecutedSuccessfully, data))

      data[0].assignedApptTypes.forEach((el) => {
        const arr: any = [];
        el.available_days.forEach((availableDay) =>
          arr.push({
            name: availableDay,
            isSelectedForSlots: el.selectedDays.includes(availableDay),
          })
        );
        el.selectedDaysofWeekArr = arr;
        delete el.selectedDays;
        delete el.available_days;
      });

      return {
        status_code: HttpStatus.OK,
        success: true,
        data: data[0],
      };

      // return res.json(
      //   Response(
      //     constants.statusCode.ok,
      //     constants.messages.ExecutedSuccessfully,
      //     data[0]
      //   )
      // );
      //   if (arr.length)
      //     return {
      //       status_code: HttpStatus.OK,
      //       success: true,
      //       data: { data: arr, totalDocs: data[0].totalCount[0].sum },
      //     };
      //   else
      //     return {
      //       success: false,
      //       data: {
      //         message: errorMessage.NO_DOCTOR_AVAILABLE,
      //         error: errorMessage.ON_ADD_ERROR,
      //       },
      //       status_code: HttpStatus.BAD_REQUEST,
      //     };
      // } else
      //   return {
      //     success: false,
      //     data: {
      //       message: errorMessage.NO_DOCTOR_AVAILABLE,
      //       error: errorMessage.ON_ADD_ERROR,
      //     },
      //     status_code: HttpStatus.BAD_REQUEST,
      //   };
    } catch (error) {
      next(error);
    }
  };

  /////////

  convertAvailability = (
    available_days: any[],
    localTimeZone: string,
    availableTimezone: string
  ) => {
    // console.log(available_days, localTimeZone, availableTimezone)

    let localAvailability: localAvailabilityInterface[] = [
      { id: 0, name: "Sunday", arrayOfTimings: [] },
      { id: 1, name: "Monday", arrayOfTimings: [] },
      { id: 2, name: "Tuesday", arrayOfTimings: [] },
      { id: 3, name: "Wednesday", arrayOfTimings: [] },
      { id: 4, name: "Thursday", arrayOfTimings: [] },
      { id: 5, name: "Friday", arrayOfTimings: [] },
      { id: 6, name: "Saturday", arrayOfTimings: [] },
    ];

    //localAvailability =

    available_days.forEach((element) => {
      element.arrayOfTimings.forEach((timing: any) => {
        // console.log('skhdbfhjsdbfjhdsbfjdsbf    ', moment(timing.startTime).tz(localTimeZone).format('HH:mm A'))
        const startTimeLocal = moment(timing.startTime)
          .tz(localTimeZone)
          .format("dddd");
        const endTimeLocal = moment(timing.endTime)
          .tz(localTimeZone)
          .format("dddd");
        const startTimeAvailable = moment(timing.startTime)
          .tz(availableTimezone)
          .format("dddd");
        const endTimeAvailable = moment(timing.endTime)
          .tz(availableTimezone)
          .format("dddd");

        if (
          startTimeLocal == startTimeAvailable &&
          endTimeLocal == endTimeAvailable
        ) {
          // console.log('All Good')
          loop: for (let i = 0; i < localAvailability.length; i++) {
            const el = localAvailability[i];
            if (el.name == element.name) {
              let tempObj: any = {};
              tempObj.startTime = timing.startTime;
              tempObj.endTime = timing.endTime;
              el.arrayOfTimings.push(tempObj);
              // el.arrayOfTimings.push({
              //   startTime: timing.startTime,
              //   endTime: timing.endTime,
              // });
              break loop;
            }
          }
        } else if (
          startTimeLocal == startTimeAvailable &&
          endTimeLocal != endTimeAvailable
        ) {
          // console.log('Some time goes to next day')

          const startTime = moment(timing.startTime).tz(localTimeZone),
            endTime = moment(timing.startTime).tz(localTimeZone).endOf("day"),
            startTime_forNext = moment(timing.endTime)
              .tz(localTimeZone)
              .startOf("day"),
            endTime_forNext = moment(timing.endTime).tz(localTimeZone);

          loop: for (let i = 0; i < localAvailability.length; i++) {
            const el = localAvailability[i];
            if (el.name == element.name) {
              el.arrayOfTimings.push({
                startTime,
                endTime,
              });
              let nextDay = i + 1;
              if (nextDay == 7) nextDay = 0;
              localAvailability[nextDay].arrayOfTimings.push({
                startTime: startTime_forNext,
                endTime: endTime_forNext,
              });
              break loop;
            }
          }
        } else if (
          startTimeLocal != startTimeAvailable &&
          endTimeLocal == endTimeAvailable
        ) {
          // console.log('Some time goes to back day')

          const startTime = moment(timing.startTime).tz(localTimeZone),
            endTime = moment(timing.startTime).tz(localTimeZone).endOf("day"),
            startTime_toBack = moment(timing.endTime)
              .tz(localTimeZone)
              .startOf("day"),
            endTime_toBack = moment(timing.endTime).tz(localTimeZone);

          loop: for (let i = 0; i < localAvailability.length; i++) {
            const el = localAvailability[i];
            if (el.name == element.name) {
              el.arrayOfTimings.push({
                startTime: startTime_toBack,
                endTime: endTime_toBack,
              });
              let backDay = i - 1;
              if (backDay == -1) backDay = 6;
              localAvailability[backDay].arrayOfTimings.push({
                startTime,
                endTime,
              });
              break loop;
            }
          }
        } else if (
          startTimeLocal != startTimeAvailable &&
          endTimeLocal != endTimeAvailable
        ) {
          // console.log('Both changed')

          const startTime = moment(timing.startTime).tz(localTimeZone),
            endTime = moment(timing.endTime).tz(localTimeZone),
            local = moment(timing.startTime).tz(localTimeZone),
            available = moment(timing.startTime)
              .tz(availableTimezone)
              .startOf("day");

          loop: for (let i = 0; i < localAvailability.length; i++) {
            const el = localAvailability[i];
            if (el.name == element.name) {
              let index,
                diff = available - local;
              if (diff < 0) {
                index = i - 1;
                if (index == -1) index = 6;
              } else {
                index = i + 1;
                if (index == 7) index = 0;
              }
              localAvailability[index].arrayOfTimings.push({
                startTime,
                endTime,
              });
              break loop;
            }
          }
        }
      });
    });

    return localAvailability;
  };
}
export default new AvailabilityServices();
