"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var mongoose_1 = __importDefault(require("mongoose"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var erros_message_1 = __importDefault(require("../../common/erros_message"));
var appointment_model_1 = __importDefault(require("../../models/appointment.model"));
var availability_model_1 = __importDefault(require("../../models/availability.model"));
var doctor_model_1 = __importDefault(require("../../models/doctor.model"));
var timezone_model_1 = __importDefault(require("../../models/timezone.model"));
// import { AddAppointmentViewmodel } from "../../view-models/appointments";
var history_model_1 = __importStar(require("../../models/history.model"));
var moment = require("moment-timezone");
var AvailabilityServices = /** @class */ (function () {
    function AvailabilityServices() {
        var _this = this;
        this.setAvailability = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, checkedWeekDaysArr_1, find_timezone, saved_timezone_1, setStartDateArr_1, availableSlots_1, setEndDateArr_1, reqBodyStartDate_1, reqBodyEndDate_1, hasAvailabilityCond, isAvailabile, insertObj, availableWeekArr_1, availableLocationArr_1, saveAvailabilityResult, addHistory, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        userDetails = req.user;
                        model.setby_id = userDetails._id;
                        checkedWeekDaysArr_1 = [];
                        //console.log(JSON.stringify(model));
                        model.week.forEach(function (weekObj) {
                            return weekObj.isChecked == true && checkedWeekDaysArr_1.push(weekObj);
                        });
                        return [4 /*yield*/, timezone_model_1.default.findOne({ _id: model.timezone }, { timezone: 1 })];
                    case 1:
                        find_timezone = _a.sent();
                        if (!find_timezone || (find_timezone && !find_timezone.timezone))
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.SomeThingWentWrong,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        saved_timezone_1 = find_timezone.timezone;
                        setStartDateArr_1 = [], availableSlots_1 = [], setEndDateArr_1 = [];
                        reqBodyStartDate_1 = model.startDate, reqBodyEndDate_1 = model.endDate;
                        // ! CODE TO BE CHANGE REMOVE CHECKS
                        checkedWeekDaysArr_1.forEach(function (weekObj) {
                            var startDate = moment
                                .utc(reqBodyStartDate_1)
                                .isoWeekday(weekObj.name)
                                .format("YYYY-MM-DD");
                            if (startDate < reqBodyStartDate_1)
                                startDate = moment.utc(startDate).add(7, "days").format("YYYY-MM-DD");
                            var startArrayOfTimings = weekObj.arrayOfTimings.sort(function (a, b) { return a.startTime.localeCompare(b.startTime); }), startTime = moment
                                .utc(startArrayOfTimings[0].startTime, "HH:mm")
                                .format("HH:mm");
                            setStartDateArr_1.push({ startDate: startDate, startTime: startTime });
                            var endDate = moment
                                .utc(reqBodyEndDate_1)
                                .isoWeekday(weekObj.name)
                                .format("YYYY-MM-DD"), endArrayOfTimings = weekObj.arrayOfTimings.sort(function (a, b) {
                                return a.endTime.localeCompare(b.endTime);
                            }), endTime = moment
                                .utc(endArrayOfTimings[endArrayOfTimings.length - 1].endTime, "HH:mm")
                                .format("HH:mm");
                            if (reqBodyEndDate_1 < endDate)
                                endDate = moment
                                    .utc(endDate)
                                    .subtract(7, "days")
                                    .format("YYYY-MM-DD");
                            setEndDateArr_1.push({ endDate: endDate, endTime: endTime });
                            weekObj.arrayOfTimings.forEach(function (timing) {
                                var _a;
                                var _b = timing.startTime.split(":"), h = _b[0], m = _b[1];
                                timing.startTime = moment(model.startDate)
                                    .tz(saved_timezone_1)
                                    .set({ h: h, m: m })
                                    .utc();
                                _a = timing.endTime.split(":"), h = _a[0], m = _a[1];
                                timing.endTime = moment(model.startDate)
                                    .tz(saved_timezone_1)
                                    .set({ h: h, m: m })
                                    .utc();
                            });
                        });
                        //console.log(checkedWeekDaysArr);
                        setStartDateArr_1.sort(function (a, b) {
                            return new Date(a.startDate).valueOf() - new Date(b.startDate).valueOf();
                        });
                        setEndDateArr_1.sort(function (a, b) {
                            return new Date(a.endDate).valueOf() - new Date(b.endDate).valueOf();
                        });
                        model.startDate = moment
                            .tz("".concat(setStartDateArr_1[0].startDate, " ").concat(setStartDateArr_1[0].startTime, ":00"), saved_timezone_1)
                            .utc();
                        model.endDate = moment
                            .tz("".concat(setEndDateArr_1[setEndDateArr_1.length - 1].endDate, " ").concat(setEndDateArr_1[setEndDateArr_1.length - 1].endTime, ":00"), saved_timezone_1)
                            .utc();
                        hasAvailabilityCond = {
                            visitType: model.visitType,
                            doctor_id: new mongoose_1.default.Types.ObjectId(model.doctor_id.toString()),
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
                        return [4 /*yield*/, availability_model_1.default.find(hasAvailabilityCond).lean()];
                    case 2:
                        isAvailabile = _a.sent();
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
                        model.availableSlots.forEach(function (apptTypeObj) {
                            var weekDaysArr = [];
                            apptTypeObj.selectedDaysofWeekArr.forEach(function (weekDay) {
                                if (weekDay.isSelectedForSlots == true) {
                                    weekDaysArr.push({
                                        id: weekDay.id,
                                        name: weekDay.name,
                                        unselectedSlots: weekDay.unselectedSlots,
                                    });
                                }
                            });
                            availableSlots_1.push({
                                apptType_id: apptTypeObj.apptType_id,
                                selectedDays: weekDaysArr,
                            });
                        });
                        insertObj = {
                            visitType: model.visitType,
                            location: model.location,
                            setby_id: model.setby_id,
                            timezone: model.timezone,
                            toDateTime: model.endDate,
                            doctor_id: model.doctor_id,
                            clinic_id: model.clinic_id,
                            availableSlots: availableSlots_1,
                            available_days: checkedWeekDaysArr_1,
                            fromDateTime: model.startDate,
                        };
                        if (isAvailabile.length > 0) {
                            availableWeekArr_1 = [], availableLocationArr_1 = [];
                            isAvailabile.forEach(function (availabilityEl) {
                                availableLocationArr_1.push(availabilityEl.location.toString());
                                availabilityEl.available_days.forEach(function (availableWeekDay) {
                                    return availableWeekArr_1.push(availableWeekDay.name);
                                });
                            });
                            if (availableLocationArr_1.includes(model.location.toString()))
                                return [2 /*return*/, {
                                        success: false,
                                        data: {
                                            message: erros_message_1.default.ALREADY_AVAILABILITY,
                                            error: erros_message_1.default.ON_ADD_ERROR,
                                        },
                                        status_code: http_status_codes_1.default.BAD_REQUEST,
                                    }];
                            // return res.json(
                            //   Response(
                            //     constants.statusCode.alreadyExist,
                            //     constants.availabilityMsg.alreadyAvailability
                            //   )
                            // );
                            availableWeekArr_1 = Array.from(new Set(availableWeekArr_1));
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
                        return [4 /*yield*/, availability_model_1.default.create(insertObj)];
                    case 3:
                        saveAvailabilityResult = _a.sent();
                        if (!saveAvailabilityResult) return [3 /*break*/, 5];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "doctor availability set",
                                type: history_model_1.EHistoryActivityTypeValues.PROVIDER,
                                type_id: model.doctor_id,
                                data: {
                                    location: model.location,
                                    timezone: model.timezone,
                                    startDate: model.startDate,
                                    endDate: model.endDate,
                                    visitType: model.visitType,
                                },
                            })];
                    case 4:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.AVAILABILITY_SET_SUCCESS,
                            }];
                    case 5: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ON_SET_AVAILABILITY,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.getAvailability = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var localTimeZone, condition, finalResult, get_timezone, localAvailability, finalObjToBeSend, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        localTimeZone = model.timezone;
                        condition = {};
                        condition.doctor_id = new mongoose_1.default.Types.ObjectId(model.doctor_id.toString());
                        condition._id = new mongoose_1.default.Types.ObjectId(model.availability_id.toString());
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
                            condition.location = new mongoose_1.default.Types.ObjectId(model.location_id.toString());
                        if (model.clinic_id)
                            condition.clinic_id = new mongoose_1.default.Types.ObjectId(model.clinic_id.toString());
                        if (model.visitType)
                            condition.visitType = model.visitType;
                        return [4 /*yield*/, availability_model_1.default.findOne(condition, {
                                availableSlots: 0,
                            })
                                .populate({
                                path: "timezone",
                                select: { timezone: 1 },
                            })
                                .lean()];
                    case 1:
                        finalResult = _a.sent();
                        if (finalResult) {
                            get_timezone = finalResult.timezone;
                            localAvailability = this.convertAvailability(finalResult.available_days, localTimeZone, 
                            //finalResult.timezone
                            get_timezone.timezone);
                            localAvailability.forEach(function (el) {
                                return el.arrayOfTimings.length
                                    ? (el.isChecked = true)
                                    : (el.isChecked = false);
                            });
                            finalObjToBeSend = {
                                available_days: localAvailability,
                                toDateTime: finalResult.toDateTime,
                                fromDateTime: finalResult.fromDateTime,
                            };
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: finalObjToBeSend,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.AVAILABILITY_GET_FAILED,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getAvailabilityForView = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var localTimeZone_1, condition, finalResult_1, error_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        localTimeZone_1 = model.timezone;
                        condition = {};
                        condition.doctor_id = new mongoose_1.default.Types.ObjectId(model.doctor_id.toString());
                        condition.clinic_id = new mongoose_1.default.Types.ObjectId(model.clinic_id.toString());
                        condition.toDateTime = {
                            $gte: new Date(moment.utc(new Date()).startOf("day")),
                        };
                        if (model.location_id)
                            condition.location = new mongoose_1.default.Types.ObjectId(model.location_id.toString());
                        if (model.visitType)
                            condition.visitType = model.visitType;
                        return [4 /*yield*/, availability_model_1.default.aggregate([
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
                            ])];
                    case 1:
                        finalResult_1 = _a.sent();
                        if (finalResult_1.length) {
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
                            finalResult_1.forEach(function (location, index) {
                                location.dateRange.forEach(function (range, index2) {
                                    // const hasWeekDays = []
                                    // range.available_days.forEach((weekDay) => hasWeekDays.push(weekDay.id))
                                    range.available_days = _this.convertAvailability(range.available_days, localTimeZone_1, range.timezone);
                                    finalResult_1[index].dateRange[index2].locationData =
                                        finalResult_1[index].locationData;
                                });
                                // console.log(index);
                                // console.log(finalResult[index].locationData);
                            });
                            //if (finalResult) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: finalResult_1,
                                }];
                            // } else {
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.AVAILABILITY_GET_FAILED,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updateAvailability = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, checkedWeekDaysArr_2, 
            // selectedWeekArr = [],
            setStartDateArr_2, availableSlots_2, setEndDateArr_2, find_timezone, saved_timezone_2, reqBodyStartDate_2, reqBodyEndDate_2, condition, updateObj, finalResult, addHistory, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        userDetails = req.user;
                        checkedWeekDaysArr_2 = [], setStartDateArr_2 = [], availableSlots_2 = [], setEndDateArr_2 = [];
                        return [4 /*yield*/, timezone_model_1.default.findOne({ _id: model.timezone }, { timezone: 1 })];
                    case 1:
                        find_timezone = _a.sent();
                        if (!find_timezone || (find_timezone && !find_timezone.timezone))
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.SomeThingWentWrong,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        saved_timezone_2 = find_timezone.timezone;
                        model.week.forEach(function (weekObj) {
                            return weekObj.isChecked == true && checkedWeekDaysArr_2.push(weekObj);
                        });
                        reqBodyStartDate_2 = model.startDate, reqBodyEndDate_2 = model.endDate;
                        checkedWeekDaysArr_2.forEach(function (weekObj) {
                            var startDate = moment
                                .utc(reqBodyStartDate_2)
                                .isoWeekday(weekObj.name)
                                .format("YYYY-MM-DD");
                            if (startDate < reqBodyStartDate_2)
                                startDate = moment.utc(startDate).add(7, "days").format("YYYY-MM-DD");
                            var startArrayOfTimings = weekObj.arrayOfTimings.sort(function (a, b) { return a.startTime.localeCompare(b.startTime); }), startTime = moment
                                .utc(startArrayOfTimings[0].startTime, "HH:mm")
                                .format("HH:mm");
                            setStartDateArr_2.push({ startDate: startDate, startTime: startTime });
                            // })
                            // checkedWeekDaysArr.forEach((weekObj) => {
                            var endDate = moment
                                .utc(reqBodyEndDate_2)
                                .isoWeekday(weekObj.name)
                                .format("YYYY-MM-DD"), endArrayOfTimings = weekObj.arrayOfTimings.sort(function (a, b) {
                                return a.endTime.localeCompare(b.endTime);
                            }), endTime = moment
                                .utc(endArrayOfTimings[endArrayOfTimings.length - 1].endTime, "HH:mm")
                                .format("HH:mm");
                            if (reqBodyEndDate_2 < endDate)
                                endDate = moment
                                    .utc(endDate)
                                    .subtract(7, "days")
                                    .format("YYYY-MM-DD");
                            setEndDateArr_2.push({ endDate: endDate, endTime: endTime });
                            weekObj.arrayOfTimings.forEach(function (timing) {
                                var _a;
                                var _b = timing.startTime.split(":"), h = _b[0], m = _b[1];
                                timing.startTime = moment(model.startDate)
                                    .tz(saved_timezone_2)
                                    .set({ h: h, m: m })
                                    .utc();
                                _a = timing.endTime.split(":"), h = _a[0], m = _a[1];
                                timing.endTime = moment(model.startDate)
                                    .tz(saved_timezone_2)
                                    .set({ h: h, m: m })
                                    .utc();
                            });
                            // availableDaysArr.push(weekObj)
                            // selectedWeekArr.push(weekObj.name)
                        });
                        setStartDateArr_2.sort(function (a, b) {
                            return new Date(a.startDate).valueOf() - new Date(b.startDate).valueOf();
                        });
                        setEndDateArr_2.sort(function (a, b) {
                            return new Date(a.endDate).valueOf() - new Date(b.endDate).valueOf();
                        });
                        model.startDate = moment
                            .tz("".concat(setStartDateArr_2[0].startDate, " ").concat(setStartDateArr_2[0].startTime, ":00"), saved_timezone_2)
                            .utc();
                        model.endDate = moment
                            .tz("".concat(setEndDateArr_2[setEndDateArr_2.length - 1].endDate, " ").concat(setEndDateArr_2[setEndDateArr_2.length - 1].endTime, ":00"), saved_timezone_2)
                            .utc();
                        condition = {
                            visitType: model.visitType,
                            _id: new mongoose_1.default.Types.ObjectId(model.availability_id.toString()),
                            doctor_id: new mongoose_1.default.Types.ObjectId(model.doctor_id.toString()),
                            clinic_id: new mongoose_1.default.Types.ObjectId(model.clinic_id.toString()),
                            location: new mongoose_1.default.Types.ObjectId(model.location.toString()),
                        };
                        model.availableSlots.forEach(function (apptTypeObj) {
                            var weekDaysArr = [];
                            apptTypeObj.selectedDaysofWeekArr.forEach(function (weekDay) {
                                if (weekDay.isSelectedForSlots == true)
                                    weekDaysArr.push({
                                        id: weekDay.id,
                                        name: weekDay.name,
                                        unselectedSlots: weekDay.unselectedSlots,
                                    });
                            });
                            availableSlots_2.push({
                                apptType_id: apptTypeObj.apptType_id,
                                selectedDays: weekDaysArr,
                            });
                        });
                        updateObj = {
                            toDateTime: model.endDate,
                            timezone: model.timezone,
                            visitType: model.visitType,
                            availableSlots: availableSlots_2,
                            fromDateTime: model.startDate,
                            available_days: checkedWeekDaysArr_2,
                        };
                        return [4 /*yield*/, availability_model_1.default.findOneAndUpdate(condition, updateObj)];
                    case 2:
                        finalResult = _a.sent();
                        if (!finalResult) return [3 /*break*/, 4];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "doctor availability updated",
                                type: history_model_1.EHistoryActivityTypeValues.PROVIDER,
                                type_id: model.doctor_id,
                                data: {
                                    //location: model.location,
                                    timezone: model.timezone,
                                    startDate: model.startDate,
                                    endDate: model.endDate,
                                    visitType: model.visitType,
                                },
                            })];
                    case 3:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.UPDATE_SUCCESSFULL,
                            }];
                    case 4: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.AVAILABILITY_UPDATE_FAILED,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.setUnavailability = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, commonFields_1, finalArr_1, apptTimingArr_1, apptCondition, hasAppointment, unavailabileArr_1, finalResult, addHistory, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        userDetails = req.user;
                        model.createdby_id = userDetails._id;
                        commonFields_1 = {
                            status: model.status,
                            clinic_id: model.clinic_id,
                            doctor_id: model.doctor_id,
                            location_id: model.location_id,
                            createdby_id: model.createdby_id,
                            title: "Unavailable",
                            appointment_number: Math.floor(100000000 + Math.random() * 900000000).toString(),
                            //color: constants.settings.unavailabilityColor,
                        };
                        finalArr_1 = [];
                        apptTimingArr_1 = [];
                        while (model.startDate <= model.endDate) {
                            model.timingArr.forEach(function (el) {
                                // let startDateTime = moment.tz(
                                //     `${model.startDate} ${el.startTime}`,
                                //     model.timezone
                                //   );
                                var startDateTime = moment(model.startDate + " " + el.startTime, "YYYY-MM-DD HH:mm")
                                    .tz(model.timezone)
                                    .utc();
                                var endDateTime = moment(model.startDate + " " + el.endTime, "YYYY-MM-DD HH:mm")
                                    .tz(model.timezone)
                                    .utc();
                                var weekday = moment(startDateTime).weekday();
                                startDateTime = startDateTime.utc();
                                if (model.weekDaysArr.includes(weekday)) {
                                    if (startDateTime > endDateTime)
                                        endDateTime = moment(endDateTime).add(1, "day");
                                    var duration = moment(endDateTime).diff(startDateTime) / (1000 * 60), ApptObj = __assign(__assign({}, commonFields_1), { startDateTime: startDateTime, endDateTime: endDateTime, duration: duration });
                                    apptTimingArr_1.push({
                                        startDateTime: {
                                            $gte: startDateTime,
                                            $lt: endDateTime,
                                        },
                                    }, {
                                        endDateTime: {
                                            $gt: startDateTime,
                                            $lte: endDateTime,
                                        },
                                    }, {
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
                                    });
                                    finalArr_1.push(ApptObj);
                                }
                            });
                            model.startDate = moment
                                .utc(model.startDate)
                                .add(1, "day")
                                .format("YYYY-MM-DD");
                        }
                        if (!finalArr_1.length) {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_ON_SET_UNAVAILABILITY_INVALID_DATE,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        apptCondition = {
                            $or: apptTimingArr_1,
                            isDeleted: false,
                            status: { $nin: ["Cancelled", "Declined"] },
                            doctor_id: new mongoose_1.default.Types.ObjectId(model.doctor_id.toString()),
                            location_id: new mongoose_1.default.Types.ObjectId(model.location_id.toString()),
                        };
                        return [4 /*yield*/, appointment_model_1.default.find(apptCondition).lean()];
                    case 1:
                        hasAppointment = _a.sent();
                        if (hasAppointment.length) {
                            unavailabileArr_1 = [];
                            hasAppointment.forEach(function (appt) {
                                if (appt.status == "Unavailability") {
                                    unavailabileArr_1.push({
                                        startDateTime: appt.startDateTime,
                                        endDateTime: appt.endDateTime,
                                    });
                                }
                            });
                            if (unavailabileArr_1.length) {
                                return [2 /*return*/, {
                                        success: false,
                                        data: {
                                            message: erros_message_1.default.ERROR_ON_SET_UNAVAILABILITY_DOCTOR_UNAVAILABLE,
                                            error: erros_message_1.default.ON_ADD_ERROR,
                                        },
                                        status_code: http_status_codes_1.default.BAD_REQUEST,
                                    }];
                            }
                            else {
                                return [2 /*return*/, {
                                        success: false,
                                        data: {
                                            message: erros_message_1.default.ERROR_ON_SET_UNAVAILABILITY_ALREADY_APPOINTMENT,
                                            error: erros_message_1.default.ON_ADD_ERROR,
                                        },
                                        status_code: http_status_codes_1.default.BAD_REQUEST,
                                    }];
                            }
                        }
                        return [4 /*yield*/, appointment_model_1.default.insertMany(finalArr_1)];
                    case 2:
                        finalResult = _a.sent();
                        if (!finalResult) return [3 /*break*/, 4];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "doctor unavailability set",
                                type: history_model_1.EHistoryActivityTypeValues.PROVIDER,
                                type_id: model.doctor_id,
                                data: {
                                    timezone: model.timezone,
                                    location: model.location_id,
                                },
                            })];
                    case 3:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.UNAVAILABILITY_SET_SUCCESS,
                            }];
                    case 4: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.appointmentMsg.providerUnavailable,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.getUnavailability = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var defaultPage, count, condition, sortObject, data, obj, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        defaultPage = void 0;
                        count = void 0;
                        defaultPage = model.pageNumber ? model.pageNumber : 1;
                        count = model.pageSize ? model.pageSize : 50;
                        condition = {
                            isDeleted: false,
                            title: "Unavailable",
                            doctor_id: new mongoose_1.default.Types.ObjectId(model.doctor_id.toString()),
                            clinic_id: new mongoose_1.default.Types.ObjectId(model.clinic_id.toString()),
                        };
                        sortObject = { createdAt: 1 };
                        return [4 /*yield*/, appointment_model_1.default.aggregate([
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
                                                        format: "".concat(model.startDate, "T%H:%M%z"),
                                                        date: "$endDateTime",
                                                    },
                                                },
                                                startTime: {
                                                    $dateToString: {
                                                        format: "".concat(model.startDate, "T%H:%M%z"),
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
                            ])];
                    case 1:
                        data = _a.sent();
                        if (data && data.length > 0 && data[0].aggregatedData.length) {
                            obj = {
                                data: data[0].aggregatedData,
                                // count: result.totalDocs,
                                totalDocs: data[0].totalCount[0].count,
                                pageNumber: defaultPage,
                                pageSize: count,
                                totalPages: Math.ceil(data[0].totalCount[0].count / count),
                            };
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: obj,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_ON_GET_UNAVAILABILITY,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        next(error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteUnavailability = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, unavailabilityData, isDeleted, addHistory, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        userDetails = req.user;
                        return [4 /*yield*/, appointment_model_1.default.findOne({
                                appointment_number: model.appointment_number,
                            })];
                    case 1:
                        unavailabilityData = _a.sent();
                        return [4 /*yield*/, appointment_model_1.default.updateMany({
                                appointment_number: model.appointment_number,
                            }, {
                                $set: { isDeleted: true },
                            })];
                    case 2:
                        isDeleted = _a.sent();
                        if (!(isDeleted && isDeleted.modifiedCount > 0 && unavailabilityData)) return [3 /*break*/, 4];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "doctor unavailability deleted",
                                type: history_model_1.EHistoryActivityTypeValues.PROVIDER,
                                type_id: unavailabilityData.doctor_id,
                                data: {
                                    appointment_number: model.appointment_number,
                                },
                            })];
                    case 3:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.UNAVAILABILITY_DELETE_SUCCESSFULL,
                            }];
                    case 4: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ON_GET_UNAVAILABILITY,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_7 = _a.sent();
                        next(error_7);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.getTimeSlots = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var checkedAtleastOneDay_1;
            return __generator(this, function (_a) {
                try {
                    checkedAtleastOneDay_1 = false;
                    model.apptTypeWithSelectedDays.forEach(function (apptType) {
                        apptType.selectedDaysofWeekArr.forEach(function (selectedDay) {
                            if (selectedDay.isSelectedForSlots == true) {
                                var slotsArr_1 = [];
                                checkedAtleastOneDay_1 = true;
                                selectedDay.arrayOfTimings.forEach(function (timing) {
                                    var _a;
                                    var _b = timing.startTime.split(":"), h = _b[0], m = _b[1];
                                    timing.startTime = moment(model.today)
                                        .tz(model.timezone)
                                        .set({ h: h, m: m })
                                        .utc();
                                    _a = timing.endTime.split(":"), h = _a[0], m = _a[1];
                                    timing.endTime = moment(model.today)
                                        .tz(model.timezone)
                                        .set({ h: h, m: m })
                                        .utc();
                                    var startTimeArr = moment
                                        .utc(timing.startTime)
                                        .format("HH:mm")
                                        .split(":"), endTimeArr = moment
                                        .utc(timing.endTime)
                                        .format("HH:mm")
                                        .split(":"), loopEndDateTime;
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
                                    var slotEndDateTime = moment
                                        .utc(model.today)
                                        .set({
                                        h: startTimeArr[0],
                                        m: startTimeArr[1],
                                    })
                                        .add(apptType.duration, "minutes");
                                    while (slotEndDateTime <= loopEndDateTime) {
                                        var slotStartDateTime = moment
                                            .utc(slotEndDateTime)
                                            .subtract(apptType.duration, "minutes");
                                        slotsArr_1.push({
                                            startTime: slotStartDateTime,
                                            endTime: slotEndDateTime,
                                            isChecked: true,
                                        });
                                        slotEndDateTime = moment
                                            .utc(slotEndDateTime)
                                            .add(apptType.duration, "minutes");
                                    }
                                    selectedDay.slotsArr = slotsArr_1;
                                    selectedDay.unselectedSlots = [];
                                });
                            }
                        });
                    });
                    //if (!checkedAtleastOneDay) return res.json(Response(constants.statusCode.unauth, constants.apptTypeMsg.selectAtleastOneDay))
                    if (checkedAtleastOneDay_1) {
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: model.apptTypeWithSelectedDays,
                            }];
                    }
                    else {
                        return [2 /*return*/, {
                                success: false,
                                data: {
                                    message: erros_message_1.default.SELECT_ATLEAST_ONE_DAY,
                                    error: erros_message_1.default.ON_FETCH_ERROR,
                                },
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                            }];
                    }
                }
                catch (error) {
                    next(error);
                }
                return [2 /*return*/];
            });
        }); };
        this.getAvailabilityDetailsForUpdate = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var condition, finalResult_2, get_timezone_1, weekDaysArr, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        condition = {
                            doctor_id: new mongoose_1.default.Types.ObjectId(model.doctor_id.toString()),
                            _id: new mongoose_1.default.Types.ObjectId(model.availability_id.toString()),
                            clinic_id: new mongoose_1.default.Types.ObjectId(model.clinic_id.toString()),
                            location: new mongoose_1.default.Types.ObjectId(model.location_id.toString()),
                            visitType: model.visitType,
                        };
                        return [4 /*yield*/, availability_model_1.default.findOne(condition, {
                                availableSlots: 0,
                                setby_id: 0,
                            })
                                .populate({ path: "timezone", select: "timezone" })
                                .lean()];
                    case 1:
                        finalResult_2 = _a.sent();
                        if (finalResult_2) {
                            get_timezone_1 = finalResult_2.timezone;
                            weekDaysArr = [
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
                            weekDaysArr.forEach(function (weekDayEl) {
                                for (var index = 0; index < finalResult_2.available_days.length; index++) {
                                    var element = finalResult_2.available_days[index];
                                    if (weekDayEl.name == element.name) {
                                        weekDayEl.isChecked = true;
                                        element.arrayOfTimings.forEach(function (timing) {
                                            var _a;
                                            var _b = moment(timing.startTime)
                                                //.tz(finalResult!.timezone)
                                                .tz(get_timezone_1.timezone)
                                                .format("HH:mm")
                                                .split(":"), h = _b[0], m = _b[1];
                                            var startTime = moment(finalResult_2.fromDateTime)
                                                //.tz(model.timezone)
                                                .tz(model.timezone)
                                                .set({ h: h, m: m })
                                                .utc();
                                            _a = moment(timing.endTime)
                                                .tz(get_timezone_1.timezone)
                                                //.tz(finalResult!.timezone)
                                                .format("HH:mm")
                                                .split(":"), h = _a[0], m = _a[1];
                                            var endTime = moment(finalResult_2.fromDateTime)
                                                .tz(model.timezone)
                                                //.tz(model.timezone)
                                                .set({ h: h, m: m })
                                                .utc();
                                            weekDayEl.arrayOfTimings.push({
                                                startTime: startTime,
                                                endTime: endTime,
                                            });
                                        });
                                        break;
                                    }
                                }
                            });
                            finalResult_2.available_days = weekDaysArr;
                            if (finalResult_2) {
                                return [2 /*return*/, {
                                        status_code: http_status_codes_1.default.OK,
                                        success: true,
                                        data: finalResult_2,
                                    }];
                            }
                            else {
                                return [2 /*return*/, {
                                        success: false,
                                        data: {
                                            message: erros_message_1.default.SELECT_ATLEAST_ONE_DAY,
                                            error: erros_message_1.default.ON_FETCH_ERROR,
                                        },
                                        status_code: http_status_codes_1.default.BAD_REQUEST,
                                    }];
                            }
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_8 = _a.sent();
                        next(error_8);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getAvailableDatesArr = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var condition, data, availibility, finalObjToSend, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        condition = {
                            clinic_id: new mongoose_1.default.Types.ObjectId(model.clinic_id.toString()),
                            doctor_id: new mongoose_1.default.Types.ObjectId(model.doctor_id.toString()),
                            _id: new mongoose_1.default.Types.ObjectId(model.availability_id.toString()),
                            location: new mongoose_1.default.Types.ObjectId(model.location_id.toString()),
                        };
                        return [4 /*yield*/, availability_model_1.default.aggregate([
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
                            ])];
                    case 1:
                        data = _a.sent();
                        if (!data.length)
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.appointmentMsg.providerUnavailable,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        availibility = data[0];
                        finalObjToSend = {
                            dateArr: [],
                            endDate: availibility.toDateTime,
                            startDate: availibility.fromDateTime,
                        };
                        if (finalObjToSend) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: finalObjToSend,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_RECORD_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _a.sent();
                        next(error_9);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getAvailableDoctorsLocation = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var condition, finalResult, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        condition = {};
                        condition.clinic_id = new mongoose_1.default.Types.ObjectId(model.clinic_id.toString());
                        condition.doctor_id = new mongoose_1.default.Types.ObjectId(model.doctor_id.toString());
                        condition.toDateTime = {
                            $gte: new Date(moment.utc(new Date()).startOf("day")),
                        };
                        if (model.visitType)
                            condition.visitType = model.visitType;
                        return [4 /*yield*/, availability_model_1.default.aggregate([
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
                            ])];
                    case 1:
                        finalResult = _a.sent();
                        if (finalResult && finalResult.length > 0) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: finalResult,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_RECORD_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_10 = _a.sent();
                        next(error_10);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getAvailableTimeSlots = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var availability_id, localTimeZone_2, providerTimezone_1, selectedDate_1, localWeekDay, appType_id, clinic_id, doctor_id, location_id, availableDateTime, localDateTime, timezoneDiff, condition, apptEndDate, apptStartDate, apptCond, availibility, duration_1, apptType, appointmentArr_1, checkApptConflict_1, totalSlotes_1, arrayToBeSend_1, availableDaysArr, selectedDaysArr, createSlotArr, timingArr, unselectedSlots, index, element, index, element, getDay, timingArr, unselectedSlots, nextWeekDay, index, element, index, element, index, element, index, element, sloteDate, timingArr, unselectedSlots, previousWeekDay, index, element, index, element, index, element, index, element, sloteDate, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        availability_id = model.availability_id, localTimeZone_2 = model.timezone, providerTimezone_1 = model.providerTimezone, selectedDate_1 = model.selectedDate, localWeekDay = model.selectedWeekDay, appType_id = model.appType_id, clinic_id = model.clinic_id, doctor_id = model.doctor_id, location_id = model.location_id;
                        availableDateTime = moment.tz(selectedDate_1, providerTimezone_1).utc(), localDateTime = moment.tz(selectedDate_1, localTimeZone_2).utc(), timezoneDiff = availableDateTime.diff(localDateTime);
                        condition = {};
                        condition.clinic_id = new mongoose_1.default.Types.ObjectId(clinic_id.toString());
                        condition.doctor_id = new mongoose_1.default.Types.ObjectId(doctor_id.toString());
                        condition.location = new mongoose_1.default.Types.ObjectId(location_id.toString());
                        condition.$and = [
                            {
                                fromDateTime: {
                                    $lte: new Date(moment.tz(selectedDate_1, providerTimezone_1).endOf("day").utc()),
                                },
                            },
                            {
                                toDateTime: {
                                    $gte: new Date(moment.tz(selectedDate_1, providerTimezone_1).startOf("day").utc()),
                                },
                            },
                        ];
                        condition._id = new mongoose_1.default.Types.ObjectId(availability_id.toString());
                        //};
                        if (model.visitType)
                            condition.visitType = model.visitType;
                        apptEndDate = new Date(moment.tz(selectedDate_1, providerTimezone_1).endOf("day").utc()), apptStartDate = new Date(moment.tz(selectedDate_1, providerTimezone_1).startOf("day").utc());
                        if (timezoneDiff < 0)
                            apptEndDate = new Date(moment(apptEndDate).add(1, "day"));
                        else if (timezoneDiff > 0)
                            apptStartDate = new Date(moment(apptStartDate).subtract(1, "day"));
                        apptCond = {
                            isDeleted: false,
                            status: { $nin: ["Cancelled", "Declined"] },
                            doctor_id: new mongoose_1.default.Types.ObjectId(doctor_id.toString()),
                            clinic_id: new mongoose_1.default.Types.ObjectId(clinic_id.toString()),
                            endDateTime: { $lte: apptEndDate },
                            startDateTime: { $gte: apptStartDate },
                        };
                        return [4 /*yield*/, availability_model_1.default.aggregate([
                                { $match: condition },
                                { $unwind: "$availableSlots" },
                                {
                                    $match: {
                                        "availableSlots.apptType_id": new mongoose_1.default.Types.ObjectId(appType_id.toString()),
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
                                                    _id: new mongoose_1.default.Types.ObjectId(appType_id.toString()),
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
                            ])];
                    case 1:
                        availibility = _a.sent();
                        if (availibility.length == 0) {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.appointmentMsg.providerUnavailable,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        if (!availibility[0].apptTypeData.length) {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.APPOINTMENT_TYPE_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        if (providerTimezone_1 != availibility[0].timezone) {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.INCORRECT_TIME_ZONE,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        duration_1 = availibility[0].apptTypeData[0].duration, apptType = availibility[0].apptTypeData[0].type;
                        appointmentArr_1 = availibility[0].apptData;
                        checkApptConflict_1 = function (slotStartTime, slotEndTime) {
                            for (var index = 0; index < appointmentArr_1.length; index++) {
                                var apptObj = appointmentArr_1[index];
                                if (slotStartTime <= apptObj.startDateTime &&
                                    apptObj.startDateTime < slotEndTime) {
                                    if (apptObj.status == "Unavailability")
                                        return "Unavailable";
                                    return "Booked";
                                }
                                if (slotStartTime < apptObj.endDateTime &&
                                    apptObj.endDateTime <= slotEndTime) {
                                    if (apptObj.status == "Unavailability")
                                        return "Unavailable";
                                    return "Booked";
                                }
                                if (apptObj.startDateTime < slotStartTime &&
                                    slotEndTime < apptObj.endDateTime) {
                                    if (apptObj.status == "Unavailability")
                                        return "Unavailable";
                                    return "Booked";
                                }
                            }
                            return "Available";
                        };
                        totalSlotes_1 = [], arrayToBeSend_1 = [], availableDaysArr = availibility[0].available_days, selectedDaysArr = availibility[0].availableSlots.selectedDays;
                        createSlotArr = function (timingArr, unselectedSlotsArr, slotDate) {
                            var index = 0;
                            var _a = moment(slotDate)
                                .format("YYYY-MM-DD")
                                .split("-"), year = _a[0], month = _a[1], date = _a[2];
                            month = month - 1;
                            timingArr.forEach(function (timing) {
                                var loopEndDateTime = moment
                                    .tz(timing.endTime, providerTimezone_1)
                                    .set({ date: date, month: month, year: year });
                                var slotEndDateTime = moment
                                    .tz(timing.startTime, providerTimezone_1)
                                    .add(duration_1, "minutes")
                                    .set({ date: date, month: month, year: year });
                                while (slotEndDateTime <= loopEndDateTime) {
                                    if (!unselectedSlotsArr.includes(index)) {
                                        var slotStartDateTime = moment
                                            .tz(slotEndDateTime, providerTimezone_1)
                                            .subtract(duration_1, "minutes");
                                        totalSlotes_1.push({
                                            startTime: slotStartDateTime,
                                            endTime: slotEndDateTime,
                                        });
                                    }
                                    index++;
                                    slotEndDateTime = moment
                                        .tz(slotEndDateTime, providerTimezone_1)
                                        .add(duration_1, "minutes");
                                }
                            });
                        };
                        if (timezoneDiff == 0) {
                            timingArr = null, unselectedSlots = null;
                            for (index = 0; index < selectedDaysArr.length; index++) {
                                element = selectedDaysArr[index];
                                if (element.name == localWeekDay) {
                                    unselectedSlots = element.unselectedSlots;
                                    break;
                                }
                            }
                            if (unselectedSlots == null) {
                                return [2 /*return*/, {
                                        success: false,
                                        data: {
                                            message: erros_message_1.default.SELECTED_APPOINTMENT_TYPE_NOT_ACCEPTED,
                                            error: erros_message_1.default.ON_FETCH_ERROR,
                                        },
                                        status_code: http_status_codes_1.default.BAD_REQUEST,
                                    }];
                            }
                            for (index = 0; index < availableDaysArr.length; index++) {
                                element = availableDaysArr[index];
                                if (element.name == localWeekDay) {
                                    timingArr = element.arrayOfTimings;
                                    break;
                                }
                            }
                            if (timingArr == null) {
                                return [2 /*return*/, {
                                        success: false,
                                        data: {
                                            message: erros_message_1.default.NO_RECORD_FOUND,
                                            error: erros_message_1.default.ON_FETCH_ERROR,
                                        },
                                        status_code: http_status_codes_1.default.BAD_REQUEST,
                                    }];
                            }
                            createSlotArr(timingArr, unselectedSlots, selectedDate_1);
                        }
                        getDay = function (weekDay, value) {
                            var day = null;
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
                            timingArr = null, unselectedSlots = null, nextWeekDay = getDay(localWeekDay, 1);
                            for (index = 0; index < selectedDaysArr.length; index++) {
                                element = selectedDaysArr[index];
                                if (element.name == localWeekDay) {
                                    unselectedSlots = element.unselectedSlots;
                                    break;
                                }
                            }
                            if (unselectedSlots != null) {
                                for (index = 0; index < availableDaysArr.length; index++) {
                                    element = availableDaysArr[index];
                                    if (element.name == localWeekDay) {
                                        timingArr = element.arrayOfTimings;
                                        break;
                                    }
                                }
                                if (timingArr != null)
                                    createSlotArr(timingArr, unselectedSlots, selectedDate_1);
                            }
                            timingArr = null;
                            unselectedSlots = null;
                            for (index = 0; index < selectedDaysArr.length; index++) {
                                element = selectedDaysArr[index];
                                if (element.name == nextWeekDay) {
                                    unselectedSlots = element.unselectedSlots;
                                    break;
                                }
                            }
                            if (unselectedSlots != null) {
                                for (index = 0; index < availableDaysArr.length; index++) {
                                    element = availableDaysArr[index];
                                    if (element.name == nextWeekDay) {
                                        timingArr = element.arrayOfTimings;
                                        break;
                                    }
                                }
                                sloteDate = moment
                                    .utc(selectedDate_1)
                                    .add(1, "day")
                                    .format("YYYY-MM-DD");
                                if (timingArr != null)
                                    createSlotArr(timingArr, unselectedSlots, sloteDate);
                            }
                        }
                        else if (timezoneDiff > 0) {
                            timingArr = null, unselectedSlots = null, previousWeekDay = getDay(localWeekDay, -1);
                            for (index = 0; index < selectedDaysArr.length; index++) {
                                element = selectedDaysArr[index];
                                if (element.name == localWeekDay) {
                                    unselectedSlots = element.unselectedSlots;
                                    break;
                                }
                            }
                            if (unselectedSlots != null) {
                                for (index = 0; index < availableDaysArr.length; index++) {
                                    element = availableDaysArr[index];
                                    if (element.name == localWeekDay) {
                                        timingArr = element.arrayOfTimings;
                                        break;
                                    }
                                }
                                if (timingArr != null)
                                    createSlotArr(timingArr, unselectedSlots, selectedDate_1);
                            }
                            timingArr = null;
                            unselectedSlots = null;
                            for (index = 0; index < selectedDaysArr.length; index++) {
                                element = selectedDaysArr[index];
                                if (element.name == previousWeekDay) {
                                    unselectedSlots = element.unselectedSlots;
                                    break;
                                }
                            }
                            if (unselectedSlots != null) {
                                for (index = 0; index < availableDaysArr.length; index++) {
                                    element = availableDaysArr[index];
                                    if (element.name == previousWeekDay) {
                                        timingArr = element.arrayOfTimings;
                                        break;
                                    }
                                }
                                sloteDate = moment
                                    .utc(selectedDate_1)
                                    .subtract(1, "day")
                                    .format("YYYY-MM-DD");
                                if (timingArr != null)
                                    createSlotArr(timingArr, unselectedSlots, sloteDate);
                            }
                        }
                        totalSlotes_1.forEach(function (slote) {
                            if (moment.tz(slote.startTime, localTimeZone_2).format("YYYY-MM-DD") ==
                                selectedDate_1) {
                                // console.log('enter')
                                arrayToBeSend_1.push(__assign(__assign({}, slote), { status: checkApptConflict_1(new Date(slote.startTime), new Date(slote.endTime)) }));
                            }
                        });
                        ////ENDS
                        if (arrayToBeSend_1 && arrayToBeSend_1.length > 0) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: arrayToBeSend_1,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_RECORD_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_11 = _a.sent();
                        next(error_11);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getSchedulerData = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var clinic_id, availability_id, filter, nowTime, weekDay, localTimeZone_3, endDateFilter, startDateFilter, pageSize, skip, sortObject, availibilityCond, apptCond, data, totalCount, dataToBeSend_1, appointmentData_1, error_12;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        clinic_id = model.clinic_id, availability_id = model.availability_id, filter = model.filter, nowTime = model.nowTime, weekDay = model.weekDay, localTimeZone_3 = model.timezone;
                        endDateFilter = void 0, startDateFilter = model.startDateFilter;
                        // await getSchedulerDataValidation.validateAsync({
                        //   clinic_id,
                        //   startDateFilter,
                        //   weekDay,
                        //   filter,
                        //   localTimeZone,
                        // });
                        if (filter != "DAY" && !availability_id)
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.SomeThingWentWrong,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
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
                        pageSize = model.pageSize ? model.pageSize : 5;
                        skip = pageSize * (model.pageNumber - 1);
                        sortObject = { fromDateTime: 1 };
                        availibilityCond = {};
                        if (model.visitType)
                            availibilityCond.visitType = model.visitType;
                        availibilityCond.clinic_id = new mongoose_1.default.Types.ObjectId(clinic_id.toString());
                        apptCond = {};
                        apptCond.isDeleted = false;
                        apptCond.status = { $nin: ["Cancelled", "Declined"] };
                        apptCond.clinic_id = new mongoose_1.default.Types.ObjectId(clinic_id.toString());
                        apptCond.$expr = {
                            $and: [
                                { $eq: ["$location_id", "$$location_id"] },
                                { $eq: ["$doctor_id", "$$doctor_id"] },
                            ],
                        };
                        if (filter != "DAY") {
                            availibilityCond._id = new mongoose_1.default.Types.ObjectId(availability_id.toString());
                            apptCond.startDateTime = {
                                $gte: new Date(startDateFilter),
                                $lte: new Date(endDateFilter),
                            };
                        }
                        else {
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
                        return [4 /*yield*/, availability_model_1.default.aggregate([
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
                            ])];
                    case 1:
                        data = _a.sent();
                        totalCount = 1;
                        if (!data.length) return [3 /*break*/, 4];
                        dataToBeSend_1 = [];
                        appointmentData_1 = [];
                        data.forEach(function (availabilityEl) {
                            availabilityEl.appointmentData.forEach(function (appointment) {
                                if (appointment.patientData) {
                                    appointment.patientData.first_name = appointment.patientData
                                        .first_name
                                        ? common_methods_1.default.getDecryptText(appointment.patientData.first_name)
                                        : "";
                                    appointment.patientData.last_name = appointment.patientData
                                        .last_name
                                        ? common_methods_1.default.getDecryptText(appointment.patientData.last_name)
                                        : "";
                                    // ? utility.getDecryptText(appointment.patientData.firstName)
                                    // : "";
                                    // appointment.patientData.lastName =
                                    //   appointment.patientData.lastName;
                                    // ? utility.getDecryptText(appointment.patientData.lastName)
                                    // : "";
                                }
                            });
                            var localAvailability = _this.convertAvailability(availabilityEl.availability, localTimeZone_3, availabilityEl.timezone);
                            availabilityEl.availability = localAvailability;
                            availabilityEl.appointmentData.forEach(function (appt) {
                                appointmentData_1.push(__assign(__assign({}, appt), {
                                    doctor_id: availabilityEl.doctor_id,
                                    location_id: availabilityEl.location_id,
                                    branchName: availabilityEl.branchName,
                                    city: availabilityEl.city,
                                    availability_id: availabilityEl.availability_id,
                                    lastName: availabilityEl.last_name,
                                    firstName: availabilityEl.first_name,
                                }));
                            });
                            //appointmentData;
                            dataToBeSend_1.push(availabilityEl);
                        });
                        if (!(filter == "DAY")) return [3 /*break*/, 3];
                        return [4 /*yield*/, availability_model_1.default.countDocuments(availibilityCond)];
                    case 2:
                        totalCount = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (dataToBeSend_1 && dataToBeSend_1.length > 0) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: {
                                        data: dataToBeSend_1,
                                        appointmentData: appointmentData_1,
                                        totalDocs: totalCount,
                                    },
                                    //data: dataToBeSend,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_RECORD_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.NO_RECORD_FOUND,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_12 = _a.sent();
                        next(error_12);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.getAvailableDoctors = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var count, page, skip, availabilityEnd, availabilityStart, condition, child_condition, sortObject, search, data, arr_1, selectedWeek_1, error_13;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        count = model.pageSize ? model.pageSize : 50;
                        page = model.pageNumber ? model.pageNumber : 1;
                        skip = count * (page - 1);
                        availabilityEnd = new Date(model.nowTime), availabilityStart = new Date(moment(model.nowTime).add(24, "h"));
                        condition = {};
                        if (model.visitType)
                            condition.visitType = model.visitType;
                        condition.clinic_id = new mongoose_1.default.Types.ObjectId(model.clinic_id.toString());
                        if (model.todayCase == true)
                            condition.toDateTime = { $gte: availabilityEnd };
                        else {
                            condition.fromDateTime = { $lt: availabilityStart };
                            condition.toDateTime = { $gte: availabilityEnd };
                        }
                        if (model.location_id)
                            condition.location = new mongoose_1.default.Types.ObjectId(model.location_id.toString());
                        if (model.doctor_id)
                            condition.doctor_id = new mongoose_1.default.Types.ObjectId(model.doctor_id.toString());
                        child_condition = {};
                        // = {
                        //"doctorData.isVerified": true,
                        child_condition["userData.isActive"] = true;
                        child_condition["userData.isDeleted"] = false;
                        sortObject = {};
                        if (model.sortValue && model.sortOrder) {
                            sortObject[model.sortValue] = model.sortOrder;
                        }
                        else
                            sortObject = { firstName: 1 };
                        if (model.search) {
                            search = decodeURIComponent(model.search).replace(/[[\]{}()*+?,\\^$|#\s]/g, "\\s+");
                            child_condition.$or = [
                                {
                                    "userData.firstName": new RegExp(search, "gi"),
                                },
                                { "userData.lastName": new RegExp(search, "gi") },
                            ];
                        }
                        return [4 /*yield*/, availability_model_1.default.aggregate([
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
                            ])];
                    case 1:
                        data = _a.sent();
                        // console.log('data[0].aggregatedData  ', data[0].aggregatedData)
                        if (data[0].aggregatedData.length) {
                            arr_1 = [];
                            if (model.todayCase != true) {
                                selectedWeek_1 = moment(model.nowTime)
                                    .tz(model.timezone)
                                    .format("dddd");
                                data[0].aggregatedData.forEach(function (el) {
                                    var localAvailability = _this.convertAvailability(el.available_days, model.timezone, el.timezone);
                                    for (var index = 0; index < localAvailability.length; index++) {
                                        var element = localAvailability[index];
                                        if (element.name == selectedWeek_1 &&
                                            element.arrayOfTimings.length) {
                                            arr_1.push(el);
                                            break;
                                        }
                                    }
                                });
                            }
                            else
                                arr_1 = data[0].aggregatedData;
                            if (arr_1.length)
                                return [2 /*return*/, {
                                        status_code: http_status_codes_1.default.OK,
                                        success: true,
                                        data: {
                                            data: arr_1,
                                            totalDocs: data[0].totalCount[0].sum,
                                        },
                                    }];
                            else
                                return [2 /*return*/, {
                                        success: false,
                                        data: {
                                            message: erros_message_1.default.NO_DOCTOR_AVAILABLE,
                                            error: erros_message_1.default.ON_ADD_ERROR,
                                        },
                                        status_code: http_status_codes_1.default.BAD_REQUEST,
                                    }];
                        }
                        else
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_DOCTOR_AVAILABLE,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        return [3 /*break*/, 3];
                    case 2:
                        error_13 = _a.sent();
                        next(error_13);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getSelectedWeekDaysOfAvailablility = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var doctorCond, data, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        doctorCond = {
                            _id: new mongoose_1.default.Types.ObjectId(model.doctor_id.toString()),
                        };
                        return [4 /*yield*/, doctor_model_1.default.aggregate([
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
                                                                _id: new mongoose_1.default.Types.ObjectId(model.availability_id.toString()),
                                                                doctor_id: new mongoose_1.default.Types.ObjectId(model.doctor_id.toString()),
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
                            ])];
                    case 1:
                        data = _a.sent();
                        if (!data.length)
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_RECORD_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        if (!data[0].assignedApptTypes.length)
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.APPOINTMENT_TYPE_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        //availabilityMsg
                        if (!data[0].assignedApptTypes[0].available_days)
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.AVAILABILITY_GET_FAILED,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        // return res.json(Response(constants.statusCode.ok, constants.messages.ExecutedSuccessfully, data))
                        data[0].assignedApptTypes.forEach(function (el) {
                            var arr = [];
                            el.available_days.forEach(function (availableDay) {
                                return arr.push({
                                    name: availableDay,
                                    isSelectedForSlots: el.selectedDays.includes(availableDay),
                                });
                            });
                            el.selectedDaysofWeekArr = arr;
                            delete el.selectedDays;
                            delete el.available_days;
                        });
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: data[0],
                            }];
                    case 2:
                        error_14 = _a.sent();
                        next(error_14);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /////////
        this.convertAvailability = function (available_days, localTimeZone, availableTimezone) {
            // console.log(available_days, localTimeZone, availableTimezone)
            var localAvailability = [
                { id: 0, name: "Sunday", arrayOfTimings: [] },
                { id: 1, name: "Monday", arrayOfTimings: [] },
                { id: 2, name: "Tuesday", arrayOfTimings: [] },
                { id: 3, name: "Wednesday", arrayOfTimings: [] },
                { id: 4, name: "Thursday", arrayOfTimings: [] },
                { id: 5, name: "Friday", arrayOfTimings: [] },
                { id: 6, name: "Saturday", arrayOfTimings: [] },
            ];
            //localAvailability =
            available_days.forEach(function (element) {
                element.arrayOfTimings.forEach(function (timing) {
                    // console.log('skhdbfhjsdbfjhdsbfjdsbf    ', moment(timing.startTime).tz(localTimeZone).format('HH:mm A'))
                    var startTimeLocal = moment(timing.startTime)
                        .tz(localTimeZone)
                        .format("dddd");
                    var endTimeLocal = moment(timing.endTime)
                        .tz(localTimeZone)
                        .format("dddd");
                    var startTimeAvailable = moment(timing.startTime)
                        .tz(availableTimezone)
                        .format("dddd");
                    var endTimeAvailable = moment(timing.endTime)
                        .tz(availableTimezone)
                        .format("dddd");
                    if (startTimeLocal == startTimeAvailable &&
                        endTimeLocal == endTimeAvailable) {
                        // console.log('All Good')
                        loop: for (var i = 0; i < localAvailability.length; i++) {
                            var el = localAvailability[i];
                            if (el.name == element.name) {
                                var tempObj = {};
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
                    }
                    else if (startTimeLocal == startTimeAvailable &&
                        endTimeLocal != endTimeAvailable) {
                        // console.log('Some time goes to next day')
                        var startTime = moment(timing.startTime).tz(localTimeZone), endTime = moment(timing.startTime).tz(localTimeZone).endOf("day"), startTime_forNext = moment(timing.endTime)
                            .tz(localTimeZone)
                            .startOf("day"), endTime_forNext = moment(timing.endTime).tz(localTimeZone);
                        loop: for (var i = 0; i < localAvailability.length; i++) {
                            var el = localAvailability[i];
                            if (el.name == element.name) {
                                el.arrayOfTimings.push({
                                    startTime: startTime,
                                    endTime: endTime,
                                });
                                var nextDay = i + 1;
                                if (nextDay == 7)
                                    nextDay = 0;
                                localAvailability[nextDay].arrayOfTimings.push({
                                    startTime: startTime_forNext,
                                    endTime: endTime_forNext,
                                });
                                break loop;
                            }
                        }
                    }
                    else if (startTimeLocal != startTimeAvailable &&
                        endTimeLocal == endTimeAvailable) {
                        // console.log('Some time goes to back day')
                        var startTime = moment(timing.startTime).tz(localTimeZone), endTime = moment(timing.startTime).tz(localTimeZone).endOf("day"), startTime_toBack = moment(timing.endTime)
                            .tz(localTimeZone)
                            .startOf("day"), endTime_toBack = moment(timing.endTime).tz(localTimeZone);
                        loop: for (var i = 0; i < localAvailability.length; i++) {
                            var el = localAvailability[i];
                            if (el.name == element.name) {
                                el.arrayOfTimings.push({
                                    startTime: startTime_toBack,
                                    endTime: endTime_toBack,
                                });
                                var backDay = i - 1;
                                if (backDay == -1)
                                    backDay = 6;
                                localAvailability[backDay].arrayOfTimings.push({
                                    startTime: startTime,
                                    endTime: endTime,
                                });
                                break loop;
                            }
                        }
                    }
                    else if (startTimeLocal != startTimeAvailable &&
                        endTimeLocal != endTimeAvailable) {
                        // console.log('Both changed')
                        var startTime = moment(timing.startTime).tz(localTimeZone), endTime = moment(timing.endTime).tz(localTimeZone), local = moment(timing.startTime).tz(localTimeZone), available = moment(timing.startTime)
                            .tz(availableTimezone)
                            .startOf("day");
                        loop: for (var i = 0; i < localAvailability.length; i++) {
                            var el = localAvailability[i];
                            if (el.name == element.name) {
                                var index = void 0, diff = available - local;
                                if (diff < 0) {
                                    index = i - 1;
                                    if (index == -1)
                                        index = 6;
                                }
                                else {
                                    index = i + 1;
                                    if (index == 7)
                                        index = 0;
                                }
                                localAvailability[index].arrayOfTimings.push({
                                    startTime: startTime,
                                    endTime: endTime,
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
    return AvailabilityServices;
}());
exports.default = new AvailabilityServices();
