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
var fs_1 = __importDefault(require("fs"));
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var lodash_1 = __importDefault(require("lodash"));
var moment_1 = __importDefault(require("moment"));
var mongoose_1 = __importDefault(require("mongoose"));
var path_1 = __importDefault(require("path"));
var uuid_1 = require("uuid");
var xlsx_populate_1 = __importDefault(require("xlsx-populate"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var erros_message_1 = __importDefault(require("../../common/erros_message"));
var appointment_model_1 = __importDefault(require("../../models/appointment.model"));
var doctor_checkout_model_1 = __importDefault(require("../../models/doctor_checkout.model"));
var appointment_types_model_1 = __importDefault(require("../../models/appointment_types.model"));
var fetch_data_model_1 = __importDefault(require("../../models/fetch_data.model"));
var history_model_1 = __importStar(require("../../models/history.model"));
var patient_model_1 = __importDefault(require("../../models/patient.model"));
var axios_1 = __importDefault(require("axios"));
var momentTz = require("moment-timezone");
var AppointmentServices = /** @class */ (function () {
    function AppointmentServices() {
        var _this = this;
        this.addAppointment = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails_1, patientDoc, condition, isInbetween, modelToSave_1, appTypeDetails, appointmentObjects_1, response, HistoryObjectArray_1, addHistory, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        userDetails_1 = req.user;
                        model.patient_ids = lodash_1.default.uniq(model.patient_ids);
                        if (!model.patient_ids.includes(userDetails_1._id.toString())) return [3 /*break*/, 2];
                        return [4 /*yield*/, patient_model_1.default.findOne({
                                _id: userDetails_1._id,
                            })];
                    case 1:
                        patientDoc = _a.sent();
                        if (!patientDoc)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.PATIENT_DETAILS_NOT_FOUND,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        if (patientDoc && patientDoc.isVerified === false)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.PATIENT_NOT_VERIFIED,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        _a.label = 2;
                    case 2:
                        condition = {
                            status: { $nin: ["Cancelled", "Declined"] },
                            doctor_id: new mongoose_1.default.Types.ObjectId(model.doctor_id.toString()),
                            $or: [
                                {
                                    startDateTime: {
                                        $gte: model.startDateTime,
                                        $lt: model.endDateTime,
                                    },
                                },
                                {
                                    endDateTime: {
                                        $gt: model.startDateTime,
                                        $lte: model.endDateTime,
                                    },
                                },
                                {
                                    // startDateTime: { $lt: model.startDateTime, $lt: model.endDateTime },
                                    // endDateTime: { $gt: model.startDateTime, $gt: model.endDateTime },
                                    $and: [
                                        {
                                            $expr: {
                                                $lt: ["$startDateTime", model.startDateTime],
                                            },
                                        },
                                        {
                                            $expr: {
                                                $lt: ["$startDateTime", model.endDateTime],
                                            },
                                        },
                                        {
                                            $expr: {
                                                $gt: ["$endDateTime", model.startDateTime],
                                            },
                                        },
                                        {
                                            $expr: {
                                                $gt: ["$endDateTime", model.endDateTime],
                                            },
                                        },
                                    ],
                                },
                            ],
                            isDeleted: false,
                        };
                        return [4 /*yield*/, appointment_model_1.default.find(condition).lean()];
                    case 3:
                        isInbetween = _a.sent();
                        if (isInbetween.length > 0 && isInbetween[0].title != "Unavailable") {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.appointmentMsg.AlreadyAppointment,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        }
                        if (isInbetween.length > 0 && isInbetween[0].title == "Unavailable") {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.appointmentMsg.providerUnavailable,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        }
                        modelToSave_1 = model;
                        modelToSave_1.appointment_number = Math.floor(100000000 + Math.random() * 900000000).toString();
                        modelToSave_1.createdby_id = userDetails_1._id;
                        return [4 /*yield*/, appointment_types_model_1.default.findById(model.appointmentType_id)];
                    case 4:
                        appTypeDetails = _a.sent();
                        appointmentObjects_1 = [];
                        if (appTypeDetails && appTypeDetails.isMultiPatient) {
                            if (model.patient_ids.length > appTypeDetails.number_of_patients)
                                return [2 /*return*/, {
                                        status_code: http_status_codes_1.default.BAD_REQUEST,
                                        success: false,
                                        data: {
                                            message: erros_message_1.default.NUMBER_OF_PATIENTS_EXCEED_APPOINTMENT +
                                                "".concat(appTypeDetails.number_of_patients),
                                            error: erros_message_1.default.ON_ADD_ERROR,
                                        },
                                    }];
                            else {
                                modelToSave_1.groupId = (0, uuid_1.v4)();
                                model.patient_ids.forEach(function (patientID) {
                                    var appObj = __assign({}, modelToSave_1);
                                    appObj.patient_id = patientID;
                                    appointmentObjects_1.push(appObj);
                                });
                            }
                        }
                        else {
                            modelToSave_1.patient_id = model.patient_ids[0];
                            appointmentObjects_1.push(modelToSave_1);
                        }
                        return [4 /*yield*/, appointment_model_1.default.insertMany(appointmentObjects_1)];
                    case 5:
                        response = _a.sent();
                        if (!(response && response.length > 0)) return [3 /*break*/, 7];
                        HistoryObjectArray_1 = [];
                        appointmentObjects_1.forEach(function (obj) {
                            var temp = {
                                user_id: userDetails_1._id,
                                patient_id: obj.patient_id,
                                doctor_id: obj.doctor_id,
                                type_id: obj.patient_id,
                                description: "appointment added successfully",
                                type: history_model_1.EHistoryActivityTypeValues.APPOINTMENT,
                            };
                            HistoryObjectArray_1.push(temp);
                        });
                        return [4 /*yield*/, history_model_1.default.insertMany(HistoryObjectArray_1)];
                    case 6:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: response,
                            }];
                    case 7: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ADD_APPOINTMENT,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                        }];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        this.updateAppointmentNew = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var updateionDone, userDetails_2, foundAppointments, condition, isInbetween, updateApptResult, modelToSave_2, appTypeID, appTypeDetails, numberOfPatients, appointmentObjects_2, removeExistingPatientsAppt, addApointmentsResults, HistoryObjectArray_2, addHistory, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 16, , 17]);
                        updateionDone = false;
                        userDetails_2 = req.user;
                        return [4 /*yield*/, appointment_model_1.default.find({
                                appointment_number: model.appointment_number,
                            })];
                    case 1:
                        foundAppointments = _a.sent();
                        if (!(foundAppointments && foundAppointments.length > 0)) return [3 /*break*/, 14];
                        if (!(model.startDateTime && model.endDateTime)) return [3 /*break*/, 3];
                        condition = {
                            status: { $nin: ["Cancelled", "Declined"] },
                            doctor_id: new mongoose_1.default.Types.ObjectId(model.doctor_id.toString()),
                            $or: [
                                {
                                    startDateTime: {
                                        $gte: model.startDateTime,
                                        $lt: model.endDateTime,
                                    },
                                },
                                {
                                    endDateTime: {
                                        $gt: model.startDateTime,
                                        $lte: model.endDateTime,
                                    },
                                },
                                {
                                    // startDateTime: { $lt: model.startDateTime, $lt: model.endDateTime },
                                    // endDateTime: { $gt: model.startDateTime, $gt: model.endDateTime },
                                    $and: [
                                        {
                                            $expr: {
                                                $lt: ["$startDateTime", model.startDateTime],
                                            },
                                        },
                                        {
                                            $expr: {
                                                $lt: ["$startDateTime", model.endDateTime],
                                            },
                                        },
                                        {
                                            $expr: {
                                                $gt: ["$endDateTime", model.startDateTime],
                                            },
                                        },
                                        {
                                            $expr: {
                                                $gt: ["$endDateTime", model.endDateTime],
                                            },
                                        },
                                    ],
                                },
                            ],
                            isDeleted: false,
                        };
                        return [4 /*yield*/, appointment_model_1.default.find(condition).lean()];
                    case 2:
                        isInbetween = _a.sent();
                        if (isInbetween.length > 0 && isInbetween[0].title != "Unavailable") {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.appointmentMsg.AlreadyAppointment,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        }
                        if (isInbetween.length > 0 && isInbetween[0].title == "Unavailable") {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.appointmentMsg.providerUnavailable,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        }
                        _a.label = 3;
                    case 3:
                        updateApptResult = void 0;
                        modelToSave_2 = model;
                        modelToSave_2.appointment_number =
                            foundAppointments[0].appointment_number;
                        modelToSave_2.createdby_id = foundAppointments[0].createdby_id;
                        if (!(foundAppointments &&
                            foundAppointments.length == 1 &&
                            !model.appointmentType_id &&
                            !model.patient_ids)) return [3 /*break*/, 5];
                        modelToSave_2.patient_id = foundAppointments[0].patient_id;
                        return [4 /*yield*/, appointment_model_1.default.updateOne({ _id: foundAppointments[0]._id }, modelToSave_2)];
                    case 4:
                        updateApptResult = _a.sent();
                        if (updateApptResult && updateApptResult.modifiedCount > 0) {
                            updateionDone = true;
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: true,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_UPDATE_APPOINTMENT,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 13];
                    case 5:
                        modelToSave_2.groupId = foundAppointments[0].groupId;
                        if (model.patient_ids) {
                            model.patient_ids = lodash_1.default.uniq(model.patient_ids);
                        }
                        appTypeID = model.appointmentType_id
                            ? model.appointmentType_id
                            : foundAppointments[0].appointmentType_id;
                        return [4 /*yield*/, appointment_types_model_1.default.findById(appTypeID)];
                    case 6:
                        appTypeDetails = _a.sent();
                        numberOfPatients = model.patient_ids
                            ? model.patient_ids.length
                            : foundAppointments.length;
                        if (!(appTypeDetails &&
                            appTypeDetails.isMultiPatient &&
                            numberOfPatients > appTypeDetails.number_of_patients)) return [3 /*break*/, 7];
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                data: {
                                    message: erros_message_1.default.NUMBER_OF_PATIENTS_EXCEED_APPOINTMENT +
                                        "".concat(appTypeDetails.number_of_patients),
                                    error: erros_message_1.default.ON_UPDATE_ERROR,
                                },
                            }];
                    case 7:
                        if (!(appTypeDetails &&
                            !appTypeDetails.isMultiPatient &&
                            numberOfPatients > 1)) return [3 /*break*/, 8];
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                data: {
                                    message: erros_message_1.default.MULTIPLE_PATIENTS_NOT_ALLOWED,
                                    error: erros_message_1.default.ON_UPDATE_ERROR,
                                },
                            }];
                    case 8:
                        appointmentObjects_2 = [];
                        return [4 /*yield*/, appointment_model_1.default.deleteMany({
                                appointment_number: model.appointment_number,
                            })];
                    case 9:
                        removeExistingPatientsAppt = _a.sent();
                        console.log(model.patient_ids, "model.patient_ids");
                        model.patient_ids.forEach(function (patientID, i) {
                            var temp = __assign({}, modelToSave_2);
                            modelToSave_2;
                            temp.patient_id = patientID; //model.patient_ids[i];
                            appointmentObjects_2.push(temp);
                        });
                        return [4 /*yield*/, appointment_model_1.default.insertMany(appointmentObjects_2)];
                    case 10:
                        addApointmentsResults = _a.sent();
                        if (!addApointmentsResults) return [3 /*break*/, 12];
                        HistoryObjectArray_2 = [];
                        appointmentObjects_2.forEach(function (obj) {
                            var temp = {
                                user_id: userDetails_2._id,
                                patient_id: obj.patient_id,
                                doctor_id: obj.doctor_id,
                                description: "appointment updated successfully",
                                type: history_model_1.EHistoryActivityTypeValues.APPOINTMENT,
                                type_id: obj.patient_id,
                            };
                            HistoryObjectArray_2.push(temp);
                        });
                        return [4 /*yield*/, history_model_1.default.insertMany(HistoryObjectArray_2)];
                    case 11:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.UPDATE_SUCCESSFULL,
                            }];
                    case 12: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_UPDATE_APPOINTMENT,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                        }];
                    case 13: return [3 /*break*/, 15];
                    case 14: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.APPOINTMENT_DETAILS_NOT_FOUND,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                        }];
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 17];
                    case 17: return [2 /*return*/];
                }
            });
        }); };
        this.getAppointmentDetails = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var foundAppointments, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, appointment_model_1.default.find({
                                appointment_number: req.params.appointment_number,
                                isDeleted: false,
                            }).populate([
                                { path: "clinic_id", select: { clinic_name: 1 } },
                                {
                                    path: "doctor_id",
                                    select: { experience: 1, user_id: 1 },
                                    populate: {
                                        path: "user_id",
                                        select: { first_name: 1, last_name: 1 },
                                    },
                                },
                                {
                                    path: "patient_id",
                                    populate: [
                                        { path: "state", select: { stateName: 1 } },
                                        { path: "country", select: { countryName: 1 } },
                                    ],
                                    // select: {
                                    //   first_name: 1,
                                    //   middle_name: 1,
                                    //   last_name: 1,
                                    //   patientId: 1,
                                    // },
                                },
                                {
                                    path: "createdby_id",
                                    select: { first_name: 1, last_name: 1 },
                                },
                                {
                                    path: "location_id",
                                    select: {
                                        city: 1,
                                        address: 1,
                                        postal_code: 1,
                                    },
                                },
                                {
                                    path: "appointmentType_id",
                                    select: {},
                                },
                                {
                                    path: "declined.user_id",
                                    select: { first_name: 1, last_name: 1 },
                                },
                            ])];
                    case 1:
                        foundAppointments = _a.sent();
                        if (foundAppointments && foundAppointments.length > 0) {
                            foundAppointments.forEach(function (appt) {
                                if (appt.patient_id) {
                                    var patientDoc = appt.patient_id;
                                    patientDoc.first_name = common_methods_1.default.getDecryptText(patientDoc.first_name);
                                    patientDoc.middle_name = common_methods_1.default.getDecryptText(patientDoc.middle_name);
                                    patientDoc.last_name = common_methods_1.default.getDecryptText(patientDoc.last_name);
                                    appt.title = common_methods_1.default.getDecryptText(appt.title);
                                }
                            });
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: foundAppointments,
                                }];
                        }
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.APPOINTMENT_DETAILS_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getAppointmentDetailsWithId = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var foundAppointments, patientDoc, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, appointment_model_1.default.findOne({
                                _id: new mongoose_1.default.Types.ObjectId(req.params._id),
                                isDeleted: false,
                            }).populate([
                                { path: "clinic_id", select: { clinic_name: 1 } },
                                {
                                    path: "doctor_id",
                                    select: { experience: 1, user_id: 1 },
                                    populate: {
                                        path: "user_id",
                                        select: { first_name: 1, last_name: 1 },
                                    },
                                },
                                {
                                    path: "patient_id",
                                    populate: [
                                        { path: "state", select: { stateName: 1 } },
                                        {
                                            path: "country",
                                            select: { countryName: 1 },
                                        },
                                    ],
                                    // select: {
                                    //   first_name: 1,
                                    //   middle_name: 1,
                                    //   last_name: 1,
                                    //   patientId: 1,
                                    // },
                                },
                                {
                                    path: "createdby_id",
                                    select: { first_name: 1, last_name: 1 },
                                },
                                {
                                    path: "location_id",
                                    select: {
                                        city: 1,
                                        address: 1,
                                        postal_code: 1,
                                    },
                                },
                                {
                                    path: "appointmentType_id",
                                    select: {},
                                },
                                {
                                    path: "declined.user_id",
                                    select: { first_name: 1, last_name: 1 },
                                },
                            ])];
                    case 1:
                        foundAppointments = _a.sent();
                        if (foundAppointments) {
                            if (foundAppointments.patient_id) {
                                patientDoc = foundAppointments.patient_id;
                                patientDoc.first_name = patientDoc.first_name
                                    ? common_methods_1.default.getDecryptText(patientDoc.first_name)
                                    : "";
                                patientDoc.middle_name = patientDoc.middle_name
                                    ? common_methods_1.default.getDecryptText(patientDoc.middle_name)
                                    : "";
                                patientDoc.last_name = patientDoc.last_name
                                    ? common_methods_1.default.getDecryptText(patientDoc.last_name)
                                    : "";
                                patientDoc.title = patientDoc.title
                                    ? common_methods_1.default.getDecryptText(patientDoc.title)
                                    : "";
                                // foundAppointments.title = foundAppointments.title?Utility.getDecryptText(
                                //   foundAppointments.title
                                // ):"";
                            }
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: foundAppointments,
                                }];
                        }
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.APPOINTMENT_DETAILS_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteAppointmentDetails = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, foundAppointMent, condition, deleteAppResult, addHistory, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        userDetails = req.user;
                        return [4 /*yield*/, appointment_model_1.default.findOne({
                                _id: model._id,
                                isDeleted: false,
                            })];
                    case 1:
                        foundAppointMent = _a.sent();
                        if (!foundAppointMent) return [3 /*break*/, 6];
                        condition = {};
                        if (model.deleteSeries === "true" &&
                            foundAppointMent.recurring &&
                            foundAppointMent.recurring.number) {
                            condition = {
                                "recurring.number": foundAppointMent.recurring.number,
                            };
                        }
                        else
                            condition = {
                                _id: model._id,
                            };
                        return [4 /*yield*/, appointment_model_1.default.update(condition, { isActive: false, isDeleted: true })];
                    case 2:
                        deleteAppResult = _a.sent();
                        if (!(deleteAppResult && deleteAppResult.modifiedCount > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "appointment deleted successfully",
                                type: history_model_1.EHistoryActivityTypeValues.APPOINTMENT,
                                type_id: foundAppointMent.patient_id,
                            })];
                    case 3:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.DELETE_SUCCESSFULL,
                            }];
                    case 4: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_DELETE_APPOINTMENT,
                                error: erros_message_1.default.ON_DELETE_ERROR,
                            },
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.APPOINTMENT_DETAILS_NOT_FOUND,
                                error: erros_message_1.default.ON_DELETE_ERROR,
                            },
                        }];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.getAppointmentList = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var defaultPage, count, populateFeilds, condition, startTime, endTime, startTime, endTime, result, finalResponse_1, obj, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        defaultPage = void 0;
                        count = void 0;
                        populateFeilds = [
                            {
                                path: "location_id",
                                select: ["city", "address", "postal_code"],
                            },
                            {
                                path: "appointmentType_id",
                                select: ["duration", "number_of_patients", "type"],
                            },
                            {
                                path: "patient_id",
                                select: [
                                    "first_name",
                                    "middle_name",
                                    "last_name",
                                    "patientId",
                                    "title",
                                ],
                            },
                            { path: "clinic_id", select: ["clinic_name"] },
                            {
                                path: "doctor_id",
                                select: ["experience"],
                                populate: {
                                    path: "user_id",
                                    select: { first_name: 1, last_name: 1 },
                                },
                            },
                        ];
                        condition = {
                            // isDeleted: false,
                            status: { $ne: "Unavailability" },
                        };
                        if (model.hasDocument === true) {
                            condition.document = { $ne: null };
                        }
                        if (model.patient_id) {
                            condition.patient_id = new mongoose_1.default.Types.ObjectId(model.patient_id);
                        }
                        if (model.clinic_id) {
                            condition.clinic_id = new mongoose_1.default.Types.ObjectId(model.clinic_id.toString());
                        }
                        if (model.appointmentType_id) {
                            condition.appointmentType_id = model.appointmentType_id;
                        }
                        if (model.status) {
                            condition.status = model.status;
                        }
                        if ("isDeleted" in model &&
                            model.isDeleted !== undefined &&
                            model.isDeleted != null) {
                            condition.isDeleted = model.isDeleted;
                        }
                        if (model.clinic_id) {
                            condition.clinic_id = model.clinic_id;
                        }
                        // if ("isDeleted" in model) {
                        if (model.isDeleted == true || model.isDeleted == false) {
                            condition.isDeleted = model.isDeleted;
                        }
                        if (model.startDateTime) {
                            startTime = new Date(model.startDateTime);
                            startTime.setHours(0, 0, 0, 0);
                            endTime = new Date(model.startDateTime);
                            endTime.setHours(23, 59, 59, 999);
                            condition.startDateTime = {
                                $gte: startTime,
                                $lte: endTime,
                            };
                        }
                        if (model.endDateTime) {
                            startTime = new Date(model.endDateTime);
                            startTime.setHours(0, 0, 0, 0);
                            endTime = new Date(model.endDateTime);
                            endTime.setHours(23, 59, 59, 999);
                            condition.endDateTime = {
                                $gte: startTime,
                                $lte: endTime,
                            };
                        }
                        defaultPage = model.pageNumber ? model.pageNumber : 1;
                        count = model.pageSize ? model.pageSize : 50;
                        return [4 /*yield*/, appointment_model_1.default.paginate(
                            // {
                            condition, __assign(__assign({ page: defaultPage }, (count > 0 ? { limit: count } : { pagination: false })), { populate: populateFeilds, 
                                // sort: { createdAt: -1 },
                                sort: { startDateTime: 1 } }))];
                    case 1:
                        result = _a.sent();
                        finalResponse_1 = [];
                        if (result && result.docs && result.docs.length > 0) {
                            result.docs.forEach(function (tempObj, i, theArray) {
                                if (tempObj.patient_id) {
                                    var patientDoc = __assign({}, tempObj.patient_id.toObject());
                                    if (patientDoc.first_name)
                                        patientDoc.first_name = common_methods_1.default.getDecryptText(patientDoc.first_name);
                                    if (patientDoc.middle_name)
                                        patientDoc.middle_name = common_methods_1.default.getDecryptText(patientDoc.middle_name);
                                    if (patientDoc.last_name)
                                        patientDoc.last_name = common_methods_1.default.getDecryptText(patientDoc.last_name);
                                    if (patientDoc.title)
                                        patientDoc.title = common_methods_1.default.getDecryptText(patientDoc.title);
                                    tempObj.patient_id = patientDoc;
                                    finalResponse_1.push(tempObj);
                                }
                            });
                            obj = {
                                data: finalResponse_1,
                                // count: result.totalDocs,
                                totalDocs: result.totalDocs,
                                pageNumber: result.page,
                                pageSize: result.limit,
                                totalPages: Math.ceil(result.totalDocs / result.limit),
                            };
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    data: obj,
                                    success: true,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.APPOINTMENT_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
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
        this.getAppointmentListWithoutPagination = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var condition, response, obj, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        condition = {
                            isDeleted: false,
                            appointmentType_id: model.appointmentType_id,
                        };
                        return [4 /*yield*/, appointment_model_1.default.find({ condition: condition }, { startDateTime: 1, endDateTime: 1, title: 1 })];
                    case 1:
                        response = _a.sent();
                        if (response && response.length > 0) {
                            obj = {
                                data: response,
                                // count: result.totalDocs,
                                totalDocs: response.length,
                                pageNumber: 1,
                                pageSize: response.length,
                                totalPages: 1,
                            };
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    data: obj,
                                    success: true,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.APPOINTMENT_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _a.sent();
                        next(error_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.addRecurringAppointment = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, patientData, apptCommonFields_1, apptArr_1, timingArr_1, createApptArr, recurringEndDate, startDateWeekDay, addNumOfDays, tempStartDate, getSpecificDay, tempStartDate, numOfAppt, startDateWeekDay, addNumOfDays, tempStartDate, getSpecificDay, tempStartDate, unavailabileArr, apptCondition, hasAppointment, appointment, unavailabile, index, element, isRecurringCreated, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        userDetails = req.user;
                        return [4 /*yield*/, patient_model_1.default.aggregate([
                                { $match: { _id: model.patient_id } },
                                { $project: { isVerified: 1 } },
                            ])];
                    case 1:
                        patientData = _a.sent();
                        apptCommonFields_1 = {
                            duration: model.duration,
                            clinic_id: model.clinic_id,
                            doctor_id: model.doctor_id,
                            visitType: model.visitType,
                            patient_id: model.patient_id,
                            location_id: model.location_id,
                            createdby_id: userDetails._id,
                            title: "Booked",
                            appointment_type: model.appointment_type,
                            appointmentType_id: model.appointmentType_id,
                            status: "Accepted",
                            recurring: { status: true, number: (0, uuid_1.v4)() },
                        };
                        apptArr_1 = [], timingArr_1 = [], createApptArr = function (startDate) {
                            var apptEndDate;
                            var appointment_number = Math.floor(100000000 + Math.random() * 900000000);
                            model.startTime < model.endTime
                                ? (apptEndDate = moment_1.default.utc(startDate).format("YYYY-MM-DD"))
                                : (apptEndDate = moment_1.default
                                    .utc(startDate)
                                    .add(1, "day")
                                    .format("YYYY-MM-DD"));
                            var endDateTime = new Date(momentTz
                                .tz("".concat(apptEndDate, "T").concat(model.endTime), model.timezone)
                                .utc()), startDateTime = momentTz
                                .tz("".concat(moment_1.default.utc(startDate).format("YYYY-MM-DD"), "T").concat(model.startTime), model.timezone)
                                .utc(), apptObj = __assign({ startDateTime: startDateTime, endDateTime: endDateTime, appointment_number: appointment_number }, apptCommonFields_1);
                            timingArr_1.push({
                                endDateTime: {
                                    $gt: startDateTime,
                                    $lte: endDateTime,
                                },
                            }, {
                                startDateTime: {
                                    $gte: startDateTime,
                                    $lt: endDateTime,
                                },
                            }, {
                                startDateTime: {
                                    $lt: startDateTime,
                                    //$lt: endDateTime,
                                },
                                endDateTime: {
                                    $gt: startDateTime,
                                    //$gt: endDateTime,
                                },
                            });
                            apptArr_1.push(apptObj);
                        };
                        if (model.end.type === "ENDBY") {
                            /** End date will be given */
                            if (!model.end.value)
                                return [2 /*return*/, {
                                        status_code: http_status_codes_1.default.UNAUTHORIZED,
                                        success: false,
                                        data: {
                                            message: erros_message_1.default.reccuring.endDateReq,
                                            error: erros_message_1.default.ON_ADD_ERROR,
                                        },
                                    }];
                            recurringEndDate = moment_1.default.utc(model.end.value);
                            if (model.end.value <= model.startDate)
                                return [2 /*return*/, {
                                        status_code: http_status_codes_1.default.UNAUTHORIZED,
                                        success: false,
                                        data: {
                                            message: erros_message_1.default.reccuring.endDateExceed,
                                            error: erros_message_1.default.ON_ADD_ERROR,
                                        },
                                    }];
                            switch (model.pattern.type) {
                                case "DAILY": {
                                    if (model.pattern.daily.type === "EVERY") {
                                        if (!model.pattern.daily.value)
                                            return [2 /*return*/, {
                                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                                    success: false,
                                                    data: {
                                                        message: erros_message_1.default.reccuring.daysValueReq,
                                                        error: erros_message_1.default.ON_ADD_ERROR,
                                                    },
                                                }];
                                        if (model.pattern.daily.value < 0 ||
                                            !Number.isInteger(model.pattern.daily.value))
                                            return [2 /*return*/, {
                                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                                    success: false,
                                                    data: {
                                                        message: erros_message_1.default.reccuring.enterNegValue,
                                                        error: erros_message_1.default.ON_ADD_ERROR,
                                                    },
                                                }];
                                        if (model.pattern.daily.value > 28)
                                            return [2 /*return*/, {
                                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                                    success: false,
                                                    data: {
                                                        message: erros_message_1.default.reccuring.daysLimitExceed,
                                                        error: erros_message_1.default.ON_ADD_ERROR,
                                                    },
                                                }];
                                        while (moment_1.default.utc(model.startDate) <= recurringEndDate) {
                                            createApptArr(model.startDate);
                                            model.startDate = moment_1.default
                                                .utc(model.startDate)
                                                .add(model.pattern.daily.value, "days")
                                                .format("YYYY-MM-DD");
                                        }
                                        break;
                                    }
                                    else if (model.pattern.daily.type === "EVERYWEEKDAY") {
                                        while (moment_1.default.utc(model.startDate) <= recurringEndDate) {
                                            if ((0, moment_1.default)(model.startDate).weekday() !== 0 &&
                                                (0, moment_1.default)(model.startDate).weekday() !== 6)
                                                createApptArr(model.startDate);
                                            model.startDate = moment_1.default
                                                .utc(model.startDate)
                                                .add(1, "day")
                                                .format("YYYY-MM-DD");
                                        }
                                        break;
                                    }
                                }
                                case "WEEKLY": {
                                    if (model.pattern.weekly.weekdays.length <= 0)
                                        return [2 /*return*/, {
                                                status_code: http_status_codes_1.default.UNAUTHORIZED,
                                                success: false,
                                                data: {
                                                    message: erros_message_1.default.reccuring.weekdaysReq,
                                                    error: erros_message_1.default.ON_ADD_ERROR,
                                                },
                                            }];
                                    if (model.pattern.weekly.week > 3)
                                        return [2 /*return*/, {
                                                status_code: http_status_codes_1.default.UNAUTHORIZED,
                                                success: false,
                                                data: {
                                                    message: erros_message_1.default.reccuring.weekdaysLimitExceed,
                                                    error: erros_message_1.default.ON_ADD_ERROR,
                                                },
                                            }];
                                    while (moment_1.default.utc(model.startDate) <= recurringEndDate) {
                                        startDateWeekDay = (0, moment_1.default)(model.startDate).weekday();
                                        if (model.pattern.weekly.weekdays.includes(startDateWeekDay))
                                            createApptArr(model.startDate);
                                        if (startDateWeekDay === 6 && model.pattern.weekly.week > 1) {
                                            addNumOfDays = (model.pattern.weekly.week - 1) * 8;
                                            model.startDate = moment_1.default
                                                .utc(model.startDate)
                                                .add(addNumOfDays, "day")
                                                .format("YYYY-MM-DD");
                                        }
                                        else
                                            model.startDate = moment_1.default
                                                .utc(model.startDate)
                                                .add(1, "day")
                                                .format("YYYY-MM-DD");
                                    }
                                    break;
                                }
                                case "MONTHLY": {
                                    if (model.pattern.monthly.type === "DAY") {
                                        if (!model.pattern.monthly.days.day)
                                            return [2 /*return*/, {
                                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                                    success: false,
                                                    data: {
                                                        message: erros_message_1.default.reccuring.monthValueReq,
                                                        error: erros_message_1.default.ON_ADD_ERROR,
                                                    },
                                                }];
                                        if (model.pattern.monthly.days.day < 0 ||
                                            !Number.isInteger(model.pattern.monthly.days.day) ||
                                            model.pattern.monthly.days.month < 0 ||
                                            !Number.isInteger(model.pattern.monthly.days.month))
                                            return [2 /*return*/, {
                                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                                    success: false,
                                                    data: {
                                                        message: erros_message_1.default.reccuring.enterNegValue,
                                                        error: erros_message_1.default.ON_ADD_ERROR,
                                                    },
                                                }];
                                        if (model.pattern.monthly.days.month > 12)
                                            return [2 /*return*/, {
                                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                                    success: false,
                                                    data: {
                                                        message: erros_message_1.default.reccuring.monthLimitExceed,
                                                        error: erros_message_1.default.ON_ADD_ERROR,
                                                    },
                                                }];
                                        if (model.pattern.monthly.days.day > 28)
                                            return [2 /*return*/, {
                                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                                    success: false,
                                                    data: {
                                                        message: erros_message_1.default.reccuring.daysLimitExceed,
                                                        error: erros_message_1.default.ON_ADD_ERROR,
                                                    },
                                                }];
                                        tempStartDate = moment_1.default
                                            .utc(model.startDate)
                                            .set("date", model.pattern.monthly.days.day)
                                            .format("YYYY-MM-DD");
                                        if (model.startDate <= tempStartDate)
                                            model.startDate = tempStartDate;
                                        else
                                            model.startDate = moment_1.default
                                                .utc(model.startDate)
                                                .set("date", model.pattern.monthly.days.day)
                                                .add(1, "month")
                                                .format("YYYY-MM-DD");
                                        while (moment_1.default.utc(model.startDate) <= recurringEndDate) {
                                            createApptArr(model.startDate);
                                            model.startDate = moment_1.default
                                                .utc(model.startDate)
                                                .add(model.pattern.monthly.days.month, "months")
                                                .format("YYYY-MM-DD");
                                        }
                                        break;
                                    }
                                    else if (model.pattern.monthly.type === "SPECIFICDAY") {
                                        if (!model.pattern.monthly.specificDay.whichDayType)
                                            return [2 /*return*/, {
                                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                                    success: false,
                                                    data: {
                                                        message: erros_message_1.default.reccuring.whichDayReq,
                                                        error: erros_message_1.default.ON_ADD_ERROR,
                                                    },
                                                }];
                                        if (!model.pattern.monthly.specificDay.whichWeekDay)
                                            return [2 /*return*/, {
                                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                                    success: false,
                                                    data: {
                                                        message: erros_message_1.default.reccuring.weekDayReq,
                                                        error: erros_message_1.default.ON_ADD_ERROR,
                                                    },
                                                }];
                                        if (model.pattern.monthly.specificDay.month < 0 ||
                                            !Number.isInteger(model.pattern.monthly.specificDay.month))
                                            return [2 /*return*/, {
                                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                                    success: false,
                                                    data: {
                                                        message: erros_message_1.default.reccuring.enterNegValue,
                                                        error: erros_message_1.default.ON_ADD_ERROR,
                                                    },
                                                }];
                                        if (model.pattern.monthly.specificDay.month > 12)
                                            return [2 /*return*/, {
                                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                                    success: false,
                                                    data: {
                                                        message: erros_message_1.default.reccuring.monthLimitExceed,
                                                        error: erros_message_1.default.ON_ADD_ERROR,
                                                    },
                                                }];
                                        getSpecificDay = function (date) {
                                            var startDate = (0, moment_1.default)(date)
                                                .startOf("month")
                                                .subtract(1, "day");
                                            var endDate = (0, moment_1.default)(date).endOf("month"), endDateNum = parseInt(endDate.format("DD")), dateArr = [];
                                            for (var i = 0; i < endDateNum; i++) {
                                                startDate = startDate.add(1, "day");
                                                var weekDay = startDate.format("dddd");
                                                if (weekDay == model.pattern.monthly.specificDay.whichWeekDay) {
                                                    dateArr.push(startDate.format("YYYY-MM-DD"));
                                                    break;
                                                }
                                            }
                                            while (startDate <= endDate) {
                                                !dateArr.includes(startDate.format("YYYY-MM-DD")) &&
                                                    dateArr.push(startDate.format("YYYY-MM-DD"));
                                                startDate = startDate.add(7, "days");
                                            }
                                            if (model.pattern.monthly.specificDay.whichDayType == "LAST")
                                                return dateArr[dateArr.length - 1];
                                            else
                                                return dateArr[parseInt(model.pattern.monthly.specificDay.whichDayType) - 1];
                                        };
                                        tempStartDate = getSpecificDay(model.startDate);
                                        if (model.startDate <= tempStartDate)
                                            model.startDate = tempStartDate;
                                        else
                                            model.startDate = getSpecificDay(moment_1.default
                                                .utc(model.startDate)
                                                .add(model.pattern.monthly.specificDay.month, "month"));
                                        while (moment_1.default.utc(model.startDate) <= recurringEndDate) {
                                            createApptArr(model.startDate);
                                            model.startDate = moment_1.default
                                                .utc(model.startDate)
                                                .add(model.pattern.monthly.specificDay.month, "month")
                                                .toString(); /// Remove .toString();
                                            model.startDate = getSpecificDay(model.startDate);
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                        else if (model.end.type === "ENDAFTER") {
                            numOfAppt = model.end.value;
                            if (!numOfAppt || numOfAppt <= 1 || numOfAppt > 20)
                                return [2 /*return*/, {
                                        status_code: http_status_codes_1.default.UNAUTHORIZED,
                                        success: false,
                                        data: {
                                            message: erros_message_1.default.reccuring.numOfApptReq,
                                            error: erros_message_1.default.ON_ADD_ERROR,
                                        },
                                    }];
                            switch (model.pattern.type) {
                                case "DAILY": {
                                    if (model.pattern.daily.type === "EVERY") {
                                        if (!model.pattern.daily.value)
                                            return [2 /*return*/, {
                                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                                    success: false,
                                                    data: {
                                                        message: erros_message_1.default.reccuring.daysValueReq,
                                                        error: erros_message_1.default.ON_ADD_ERROR,
                                                    },
                                                }];
                                        if (model.pattern.daily.value < 0 ||
                                            !Number.isInteger(model.pattern.daily.value))
                                            return [2 /*return*/, {
                                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                                    success: false,
                                                    data: {
                                                        message: erros_message_1.default.reccuring.enterNegValue,
                                                        error: erros_message_1.default.ON_ADD_ERROR,
                                                    },
                                                }];
                                        if (model.pattern.daily.value > 28)
                                            return [2 /*return*/, {
                                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                                    success: false,
                                                    data: {
                                                        message: erros_message_1.default.reccuring.daysLimitExceed,
                                                        error: erros_message_1.default.ON_ADD_ERROR,
                                                    },
                                                }];
                                        while (apptArr_1.length < numOfAppt) {
                                            createApptArr(model.startDate);
                                            model.startDate = moment_1.default
                                                .utc(model.startDate)
                                                .add(model.pattern.daily.value, "days")
                                                .format("YYYY-MM-DD");
                                        }
                                        break;
                                    }
                                    else if (model.pattern.daily.type === "EVERYWEEKDAY") {
                                        while (apptArr_1.length < numOfAppt) {
                                            if ((0, moment_1.default)(model.startDate).weekday() !== 0 &&
                                                (0, moment_1.default)(model.startDate).weekday() !== 6)
                                                createApptArr(model.startDate);
                                            model.startDate = moment_1.default
                                                .utc(model.startDate)
                                                .add(1, "day")
                                                .format("YYYY-MM-DD");
                                        }
                                        break;
                                    }
                                }
                                case "WEEKLY": {
                                    if (model.pattern.weekly.weekdays.length <= 0)
                                        return [2 /*return*/, {
                                                status_code: http_status_codes_1.default.UNAUTHORIZED,
                                                success: false,
                                                data: {
                                                    message: erros_message_1.default.reccuring.weekdaysReq,
                                                    error: erros_message_1.default.ON_ADD_ERROR,
                                                },
                                            }];
                                    if (model.pattern.weekly.week > 3)
                                        return [2 /*return*/, {
                                                status_code: http_status_codes_1.default.UNAUTHORIZED,
                                                success: false,
                                                data: {
                                                    message: erros_message_1.default.reccuring.weekdaysLimitExceed,
                                                    error: erros_message_1.default.ON_ADD_ERROR,
                                                },
                                            }];
                                    while (apptArr_1.length < numOfAppt) {
                                        startDateWeekDay = (0, moment_1.default)(model.startDate).weekday();
                                        if (model.pattern.weekly.weekdays.includes(startDateWeekDay))
                                            createApptArr(model.startDate);
                                        if (startDateWeekDay === 6 && model.pattern.weekly.week > 1) {
                                            addNumOfDays = (model.pattern.weekly.week - 1) * 8;
                                            model.startDate = moment_1.default
                                                .utc(model.startDate)
                                                .add(addNumOfDays, "day")
                                                .format("YYYY-MM-DD");
                                        }
                                        else
                                            model.startDate = moment_1.default
                                                .utc(model.startDate)
                                                .add(1, "day")
                                                .format("YYYY-MM-DD");
                                    }
                                    break;
                                }
                                case "MONTHLY": {
                                    if (model.pattern.monthly.type === "DAY") {
                                        if (!model.pattern.monthly.days.day)
                                            return [2 /*return*/, {
                                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                                    success: false,
                                                    data: {
                                                        message: erros_message_1.default.reccuring.monthValueReq,
                                                        error: erros_message_1.default.ON_ADD_ERROR,
                                                    },
                                                }];
                                        if (model.pattern.monthly.days.day < 0 ||
                                            !Number.isInteger(model.pattern.monthly.days.day) ||
                                            model.pattern.monthly.days.month < 0 ||
                                            !Number.isInteger(model.pattern.monthly.days.month))
                                            return [2 /*return*/, {
                                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                                    success: false,
                                                    data: {
                                                        message: erros_message_1.default.reccuring.enterNegValue,
                                                        error: erros_message_1.default.ON_ADD_ERROR,
                                                    },
                                                }];
                                        if (model.pattern.monthly.days.month > 12)
                                            return [2 /*return*/, {
                                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                                    success: false,
                                                    data: {
                                                        message: erros_message_1.default.reccuring.monthLimitExceed,
                                                        error: erros_message_1.default.ON_ADD_ERROR,
                                                    },
                                                }];
                                        if (model.pattern.monthly.days.day > 28)
                                            return [2 /*return*/, {
                                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                                    success: false,
                                                    data: {
                                                        message: erros_message_1.default.reccuring.daysLimitExceed,
                                                        error: erros_message_1.default.ON_ADD_ERROR,
                                                    },
                                                }];
                                        tempStartDate = moment_1.default
                                            .utc(model.startDate)
                                            .set("date", model.pattern.monthly.days.day)
                                            .format("YYYY-MM-DD");
                                        if (model.startDate <= tempStartDate)
                                            model.startDate = tempStartDate;
                                        else
                                            model.startDate = moment_1.default
                                                .utc(model.startDate)
                                                .set("date", model.pattern.monthly.days.day)
                                                .add(1, "month")
                                                .format("YYYY-MM-DD");
                                        while (apptArr_1.length < numOfAppt) {
                                            createApptArr(model.startDate);
                                            model.startDate = moment_1.default
                                                .utc(model.startDate)
                                                .add(model.pattern.monthly.days.month, "months")
                                                .format("YYYY-MM-DD");
                                        }
                                        break;
                                    }
                                    else if (model.pattern.monthly.type === "SPECIFICDAY") {
                                        if (!model.pattern.monthly.specificDay.whichDayType)
                                            return [2 /*return*/, {
                                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                                    success: false,
                                                    data: {
                                                        message: erros_message_1.default.reccuring.whichDayReq,
                                                        error: erros_message_1.default.ON_ADD_ERROR,
                                                    },
                                                }];
                                        if (!model.pattern.monthly.specificDay.whichWeekDay)
                                            return [2 /*return*/, {
                                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                                    success: false,
                                                    data: {
                                                        message: erros_message_1.default.reccuring.weekDayReq,
                                                        error: erros_message_1.default.ON_ADD_ERROR,
                                                    },
                                                }];
                                        if (model.pattern.monthly.specificDay.month < 0 ||
                                            !Number.isInteger(model.pattern.monthly.specificDay.month))
                                            return [2 /*return*/, {
                                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                                    success: false,
                                                    data: {
                                                        message: erros_message_1.default.reccuring.enterNegValue,
                                                        error: erros_message_1.default.ON_ADD_ERROR,
                                                    },
                                                }];
                                        if (model.pattern.monthly.specificDay.month > 12)
                                            return [2 /*return*/, {
                                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                                    success: false,
                                                    data: {
                                                        message: erros_message_1.default.reccuring.monthLimitExceed,
                                                        error: erros_message_1.default.ON_ADD_ERROR,
                                                    },
                                                }];
                                        getSpecificDay = function (date) {
                                            var startDate = (0, moment_1.default)(date)
                                                .startOf("month")
                                                .subtract(1, "day");
                                            var endDate = (0, moment_1.default)(date).endOf("month");
                                            var endDateNum = parseInt(endDate.format("DD"));
                                            var dateArr = [];
                                            for (var i = 0; i < endDateNum; i++) {
                                                startDate = startDate.add(1, "day");
                                                var weekDay = startDate.format("dddd");
                                                if (weekDay == model.pattern.monthly.specificDay.whichWeekDay) {
                                                    dateArr.push(startDate.format("YYYY-MM-DD"));
                                                    break;
                                                }
                                            }
                                            while (startDate <= endDate) {
                                                !dateArr.includes(startDate.format("YYYY-MM-DD")) &&
                                                    dateArr.push(startDate.format("YYYY-MM-DD"));
                                                startDate = startDate.add(7, "days");
                                            }
                                            if (model.pattern.monthly.specificDay.whichDayType == "LAST")
                                                return dateArr[dateArr.length - 1];
                                            else
                                                return dateArr[parseInt(model.pattern.monthly.specificDay.whichDayType) - 1];
                                        };
                                        tempStartDate = getSpecificDay(model.startDate);
                                        if (model.startDate <= tempStartDate)
                                            model.startDate = tempStartDate;
                                        else
                                            model.startDate = getSpecificDay(moment_1.default
                                                .utc(model.startDate)
                                                .add(model.pattern.monthly.specificDay.month, "month"));
                                        while (apptArr_1.length < numOfAppt) {
                                            createApptArr(model.startDate);
                                            model.startDate = moment_1.default
                                                .utc(model.startDate)
                                                .add(model.pattern.monthly.specificDay.month, "month")
                                                .toString(); /// Remove .toString();
                                            model.startDate = getSpecificDay(model.startDate);
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                        if (apptArr_1.length === 0)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.reccuring.noApptCreated,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        unavailabileArr = [];
                        apptCondition = {
                            $or: timingArr_1,
                            isDeleted: false,
                            status: { $nin: ["Cancelled", "Declined"] },
                            doctor_id: model.doctor_id,
                        };
                        return [4 /*yield*/, appointment_model_1.default.find(apptCondition).lean()];
                    case 2:
                        hasAppointment = _a.sent();
                        if (hasAppointment.length) {
                            appointment = false, unavailabile = false;
                            for (index = 0; index < hasAppointment.length; index++) {
                                element = hasAppointment[index];
                                if (element.status == "Unavailability") {
                                    if (element.location_id == model.location_id) {
                                        unavailabile = true;
                                        break;
                                    }
                                }
                                else {
                                    appointment = true;
                                    break;
                                }
                            }
                            if (appointment == true)
                                return [2 /*return*/, {
                                        status_code: http_status_codes_1.default.UNAUTHORIZED,
                                        success: false,
                                        data: {
                                            message: erros_message_1.default.reccuring
                                                .AlreadyAppointment /*,{ hasAppointment, apptArr }*/,
                                            error: erros_message_1.default.ON_ADD_ERROR,
                                        },
                                    }];
                            if (unavailabile == true)
                                return [2 /*return*/, {
                                        status_code: http_status_codes_1.default.UNAUTHORIZED,
                                        success: false,
                                        data: {
                                            message: erros_message_1.default.reccuring
                                                .doctorUnavailabile /*,{ unavailabileArr, apptArr }*/,
                                            error: erros_message_1.default.ON_ADD_ERROR,
                                        },
                                    }];
                        }
                        return [4 /*yield*/, appointment_model_1.default.insertMany(apptArr_1)];
                    case 3:
                        isRecurringCreated = _a.sent();
                        if (isRecurringCreated) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: erros_message_1.default.reccuring.createdSucc,
                                }];
                        }
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.INTERNAL_SERVER_ERROR,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.INTERNAL_SERVER_ERROR,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 5];
                    case 4:
                        error_8 = _a.sent();
                        next(error_8);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        //Reschedule Appointment
        this.rescheduleAppointment = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, foundAppointMent, condition_1, isInbetween_1, clinicDetails, patientDoc, condition, isInbetween, apptCond, data, apptData, rescheduleToBeSaved, apptUpdateObj, finalResult, temp, addHistory, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, , 12]);
                        userDetails = req.user;
                        return [4 /*yield*/, appointment_model_1.default.findById(model.appointment_id).populate([
                                {
                                    path: "patient_id",
                                    select: { isVerified: 1 },
                                },
                                {
                                    path: "clinic_id",
                                    select: { clinicPolicy: 1 },
                                },
                            ])];
                    case 1:
                        foundAppointMent = _a.sent();
                        if (!!foundAppointMent) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                data: {
                                    message: erros_message_1.default.appointmentMsg.apptNotFound,
                                    error: erros_message_1.default.ON_UPDATE_ERROR,
                                },
                            }];
                    case 2:
                        if (!(model.startDateTime && model.endDateTime)) return [3 /*break*/, 4];
                        condition_1 = {
                            status: { $nin: ["Cancelled", "Declined"] },
                            doctor_id: new mongoose_1.default.Types.ObjectId(model.doctor_id.toString()),
                            $or: [
                                {
                                    startDateTime: {
                                        $gte: model.startDateTime,
                                        $lt: model.endDateTime,
                                    },
                                },
                                {
                                    endDateTime: {
                                        $gt: model.startDateTime,
                                        $lte: model.endDateTime,
                                    },
                                },
                                {
                                    // startDateTime: { $lt: model.startDateTime, $lt: model.endDateTime },
                                    // endDateTime: { $gt: model.startDateTime, $gt: model.endDateTime },
                                    $and: [
                                        {
                                            $expr: {
                                                $lt: ["$startDateTime", model.startDateTime],
                                            },
                                        },
                                        {
                                            $expr: {
                                                $lt: ["$startDateTime", model.endDateTime],
                                            },
                                        },
                                        {
                                            $expr: {
                                                $gt: ["$endDateTime", model.startDateTime],
                                            },
                                        },
                                        {
                                            $expr: {
                                                $gt: ["$endDateTime", model.endDateTime],
                                            },
                                        },
                                    ],
                                },
                            ],
                            isDeleted: false,
                        };
                        return [4 /*yield*/, appointment_model_1.default.find(condition_1).lean()];
                    case 3:
                        isInbetween_1 = _a.sent();
                        if (isInbetween_1.length > 0 && isInbetween_1[0].title != "Unavailable") {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.appointmentMsg.AlreadyAppointment,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        }
                        if (isInbetween_1.length > 0 && isInbetween_1[0].title == "Unavailable") {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.appointmentMsg.providerUnavailable,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        }
                        _a.label = 4;
                    case 4:
                        clinicDetails = foundAppointMent.clinic_id;
                        if (!clinicDetails.clinicPolicy ||
                            !clinicDetails.clinicPolicy.reschedule)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.appointmentMsg.clinicPolicyNotFound,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                }];
                        if (clinicDetails.clinicPolicy.reschedule.isAllowed === false)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.appointmentMsg.rescheduleApptNotAllowed,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                }];
                        if (userDetails._id.toString() ===
                            foundAppointMent.patient_id.toString()) {
                            patientDoc = foundAppointMent.patient_id;
                            if (patientDoc.isVerified === false)
                                return [2 /*return*/, {
                                        status_code: http_status_codes_1.default.UNAUTHORIZED,
                                        success: false,
                                        data: {
                                            message: erros_message_1.default.PATIENT_NOT_VERIFIED,
                                            error: erros_message_1.default.ON_UPDATE_ERROR,
                                        },
                                    }];
                        }
                        condition = {
                            status: { $nin: ["Cancelled", "Declined"] },
                            doctor_id: new mongoose_1.default.Types.ObjectId(model.doctor_id.toString()),
                            $or: [
                                {
                                    startDateTime: {
                                        $gte: model.startDateTime,
                                        $lt: model.endDateTime,
                                    },
                                },
                                {
                                    endDateTime: {
                                        $gt: model.startDateTime,
                                        $lte: model.endDateTime,
                                    },
                                },
                                // {
                                //   startDateTime: {
                                //     $and: [
                                //       { $lt: model.startDateTime },
                                //       { $lt: model.endDateTime },
                                //     ],
                                //   },
                                //   endDateTime: {
                                //     $and: [
                                //       { $gt: model.startDateTime },
                                //       { $gt: model.endDateTime },
                                //     ],
                                //   },
                                // },
                            ],
                            isDeleted: false,
                        };
                        return [4 /*yield*/, appointment_model_1.default.find(condition).lean()];
                    case 5:
                        isInbetween = _a.sent();
                        if (isInbetween.length > 0)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.appointmentMsg.AlreadyAppointment,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                }];
                        apptCond = {
                            _id: new mongoose_1.default.Types.ObjectId(model.appointment_id.toString()),
                            doctor_id: new mongoose_1.default.Types.ObjectId(model.doctor_id.toString()),
                        };
                        return [4 /*yield*/, appointment_model_1.default.aggregate([
                                { $match: apptCond },
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
                                        from: "clinic_locations",
                                        localField: "location_id",
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
                            ])];
                    case 6:
                        data = _a.sent();
                        if (!data.length)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.appointmentMsg.apptNotFound,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                }];
                        apptData = data[0];
                        if (!apptData)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.appointmentMsg.apptNotFound,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                }];
                        if (apptData.status != "Accepted")
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.incorrectAction(apptData.status, "reschedule"),
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                }];
                        if (apptData.title == "Rescheduled")
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.appointmentMsg.alreadyRescheduled,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                }];
                        if (apptData.patient_id.toString() == userDetails._id.toString()) {
                            if (!apptData.clinicData.clinicPolicy.cancel.isAllowed)
                                return [2 /*return*/, {
                                        status_code: http_status_codes_1.default.UNAUTHORIZED,
                                        success: false,
                                        data: {
                                            message: erros_message_1.default.incorrectAction(null, "cancel"),
                                            error: erros_message_1.default.ON_UPDATE_ERROR,
                                        },
                                    }];
                            if ((0, moment_1.default)(apptData.startDateTime).diff(model.nowTime, "hour") <
                                apptData.clinicData.clinicPolicy.cancel.hours)
                                return [2 /*return*/, {
                                        status_code: http_status_codes_1.default.UNAUTHORIZED,
                                        success: false,
                                        data: {
                                            message: erros_message_1.default.appointmentMsg.conflictClinicPolicy("cancel", apptData.clinicData.clinicPolicy.cancel.hours),
                                            error: erros_message_1.default.ON_UPDATE_ERROR,
                                        },
                                    }];
                        }
                        // const rescheduleObj = { appointment_id: apptData._id }
                        if (model.reschedule.type == "PATIENT" &&
                            apptData.patient_id.toString() != userDetails._id.toString())
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NOT_AUTHORIZED_FOR_ACTION,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                }];
                        rescheduleToBeSaved = {};
                        rescheduleToBeSaved.rescheduleTime = model.nowTime;
                        rescheduleToBeSaved.endDateTime = apptData.endDateTime;
                        rescheduleToBeSaved.rescheduleby_id = userDetails._id;
                        rescheduleToBeSaved.startDateTime = apptData.startDateTime;
                        rescheduleToBeSaved.type = model.reschedule.type;
                        apptUpdateObj = {
                            endDateTime: model.endDateTime,
                            startDateTime: model.startDateTime,
                            //reschedule: model.reschedule,
                            reschedule: rescheduleToBeSaved,
                            title: "Rescheduled",
                            description: model.description,
                        };
                        if (model.reschedule.type == "PATIENT")
                            apptUpdateObj.status = "Pending";
                        return [4 /*yield*/, appointment_model_1.default.updateOne({ _id: model.appointment_id }, apptUpdateObj, { new: true }).lean()];
                    case 7:
                        finalResult = _a.sent();
                        if (!(finalResult && finalResult.modifiedCount > 0)) return [3 /*break*/, 9];
                        temp = {
                            user_id: userDetails._id,
                            patient_id: foundAppointMent.patient_id,
                            doctor_id: model.doctor_id,
                            description: "appointment rescheduled successfully",
                            type: history_model_1.EHistoryActivityTypeValues.APPOINTMENT,
                            type_id: foundAppointMent.patient_id,
                            data: {
                                prevStartDateTime: foundAppointMent.startDateTime,
                                prevEndDateTime: foundAppointMent.endDateTime,
                                newStartDateTime: model.startDateTime,
                                newEndDateTime: model.endDateTime,
                                // actionBy: userDetails._id,
                            },
                        };
                        return [4 /*yield*/, history_model_1.default.create(temp)];
                    case 8:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.appointmentMsg.rescheduleSuccess,
                            }];
                    case 9: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_RESCHEDULED_APPOINTMENT,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                        }];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        error_9 = _a.sent();
                        next(error_9);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        }); };
        // Decline Appointment
        this.declineBooking = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, loggedInUserId, foundAppointments, patientDoc, patientName, condition, data, appointmentData, updateData, isUpdated, temp, addHistory, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        userDetails = req.user;
                        loggedInUserId = userDetails._id;
                        return [4 /*yield*/, appointment_model_1.default.findOne({
                                _id: model.appointmentId,
                            }).populate({
                                path: "patient_id",
                                select: { first_name: 1, last_name: 1 },
                            })];
                    case 1:
                        foundAppointments = _a.sent();
                        if (!foundAppointments) return [3 /*break*/, 6];
                        patientDoc = foundAppointments.patient_id;
                        if (patientDoc) {
                            patientName = common_methods_1.default.getDecryptText(patientDoc.first_name) +
                                " " +
                                common_methods_1.default.getDecryptText(patientDoc.last_name);
                        }
                        condition = {
                            _id: new mongoose_1.default.Types.ObjectId(model.appointmentId),
                        };
                        return [4 /*yield*/, appointment_model_1.default.aggregate([
                                { $match: condition },
                                {
                                    $lookup: {
                                        from: "clinics",
                                        let: { clinic_id: "$clinic_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$user_id", "$$clinic_id"],
                                                    },
                                                },
                                            },
                                            {
                                                $project: {
                                                    clinicPolicy: 1,
                                                    clinicName: 1,
                                                },
                                            },
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
                                        from: "users",
                                        let: { user_id: "$doctor_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: { $eq: ["$_id", "$$user_id"] },
                                                },
                                            },
                                            {
                                                $project: { firstName: 1, lastName: 1 },
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
                                                    $expr: {
                                                        $eq: ["$_id", "$$patient_id"],
                                                    },
                                                },
                                            },
                                            {
                                                $project: { firstName: 1, lastName: 1 },
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
                            ])];
                    case 2:
                        data = _a.sent();
                        if (!data.length)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.APPOINTMENT_DETAILS_NOT_FOUND,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                }];
                        appointmentData = data[0];
                        if (appointmentData.status == "Unavailability")
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.WRONG_ACTION_PERFORMED,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                }];
                        updateData = foundAppointments;
                        updateData = {
                            declined: {
                                user_id: loggedInUserId,
                                time: model.nowTime,
                                reason: model.reason,
                            },
                        };
                        switch (model.type) {
                            case "B_P_C":
                                console.log("    case B_P_C");
                                if (appointmentData.status != "Pending")
                                    return [2 /*return*/, {
                                            status_code: http_status_codes_1.default.UNAUTHORIZED,
                                            success: false,
                                            data: {
                                                message: erros_message_1.default.incorrectAction(appointmentData.status, "cancel"),
                                                error: erros_message_1.default.ON_UPDATE_ERROR,
                                            },
                                        }];
                                if (appointmentData.createdby_id.toString() ==
                                    appointmentData.patient_id.toString() &&
                                    loggedInUserId != appointmentData.patient_id.toString())
                                    return [2 /*return*/, {
                                            status_code: http_status_codes_1.default.UNAUTHORIZED,
                                            success: false,
                                            data: {
                                                message: erros_message_1.default.incorrectAction(null, "cancel"),
                                                error: erros_message_1.default.ON_UPDATE_ERROR,
                                            },
                                        }];
                                break;
                            case "B_A_C":
                                console.log("    case B_A_C");
                                if (appointmentData.status != "Accepted")
                                    return [2 /*return*/, {
                                            status_code: http_status_codes_1.default.UNAUTHORIZED,
                                            success: false,
                                            data: {
                                                message: erros_message_1.default.incorrectAction(appointmentData.status, "cancel"),
                                                error: erros_message_1.default.ON_UPDATE_ERROR,
                                            },
                                        }];
                                break;
                            case "B_D":
                                console.log("    case B_D");
                                if (appointmentData.status != "Pending")
                                    return [2 /*return*/, {
                                            status_code: http_status_codes_1.default.UNAUTHORIZED,
                                            success: false,
                                            data: {
                                                message: erros_message_1.default.incorrectAction(appointmentData.status, "decline"),
                                                error: erros_message_1.default.ON_UPDATE_ERROR,
                                            },
                                        }];
                                if (appointmentData.patient_id.toString() == loggedInUserId)
                                    return [2 /*return*/, {
                                            status_code: http_status_codes_1.default.UNAUTHORIZED,
                                            success: false,
                                            data: {
                                                message: erros_message_1.default.incorrectAction(null, "cancel"),
                                                error: erros_message_1.default.ON_UPDATE_ERROR,
                                            },
                                        }];
                                break;
                            case "R_P_C":
                                console.log("    case R_P_C");
                                if (appointmentData.title != "Rescheduled")
                                    return [2 /*return*/, {
                                            status_code: http_status_codes_1.default.UNAUTHORIZED,
                                            success: false,
                                            data: {
                                                message: erros_message_1.default.appointmentMsg.notRescheduled,
                                                error: erros_message_1.default.ON_UPDATE_ERROR,
                                            },
                                        }];
                                if (appointmentData.reschedule.rescheduleby_id ==
                                    appointmentData.patient_id.toString() &&
                                    loggedInUserId != appointmentData.patient_id.toString())
                                    return [2 /*return*/, {
                                            status_code: http_status_codes_1.default.UNAUTHORIZED,
                                            success: false,
                                            data: {
                                                message: erros_message_1.default.incorrectAction(null, "cancel"),
                                                error: erros_message_1.default.ON_UPDATE_ERROR,
                                            },
                                        }];
                                if (appointmentData.status != "Pending")
                                    return [2 /*return*/, {
                                            status_code: http_status_codes_1.default.UNAUTHORIZED,
                                            success: false,
                                            data: {
                                                message: erros_message_1.default.incorrectAction(appointmentData.status, "cancel"),
                                                error: erros_message_1.default.ON_UPDATE_ERROR,
                                            },
                                        }];
                                break;
                            case "R_A_C":
                                console.log("    case R_A_C");
                                if (appointmentData.title != "Rescheduled")
                                    return [2 /*return*/, {
                                            status_code: http_status_codes_1.default.UNAUTHORIZED,
                                            success: false,
                                            data: {
                                                message: erros_message_1.default.appointmentMsg.notRescheduled,
                                                error: erros_message_1.default.ON_UPDATE_ERROR,
                                            },
                                        }];
                                if (appointmentData.status != "Accepted")
                                    return [2 /*return*/, {
                                            status_code: http_status_codes_1.default.UNAUTHORIZED,
                                            success: false,
                                            data: {
                                                message: erros_message_1.default.incorrectAction(appointmentData.status, "cancel"),
                                                error: erros_message_1.default.ON_UPDATE_ERROR,
                                            },
                                        }];
                                break;
                            case "R_D":
                                console.log("    case R_D");
                                if (appointmentData.title != "Rescheduled")
                                    return [2 /*return*/, {
                                            status_code: http_status_codes_1.default.UNAUTHORIZED,
                                            success: false,
                                            data: {
                                                message: erros_message_1.default.appointmentMsg.notRescheduled,
                                                error: erros_message_1.default.ON_UPDATE_ERROR,
                                            },
                                        }];
                                if (appointmentData.reschedule.rescheduleby_id.toString() ==
                                    appointmentData.patient_id.toString() &&
                                    loggedInUserId == appointmentData.patient_id.toString())
                                    return [2 /*return*/, {
                                            status_code: http_status_codes_1.default.UNAUTHORIZED,
                                            success: false,
                                            data: {
                                                message: erros_message_1.default.incorrectAction(null, "cancel"),
                                                error: erros_message_1.default.ON_UPDATE_ERROR,
                                            },
                                        }];
                                if (appointmentData.status != "Pending")
                                    return [2 /*return*/, {
                                            status_code: http_status_codes_1.default.UNAUTHORIZED,
                                            success: false,
                                            data: {
                                                message: erros_message_1.default.incorrectAction(appointmentData.status, "decline"),
                                                error: erros_message_1.default.ON_UPDATE_ERROR,
                                            },
                                        }];
                                updateData.$set = {
                                    "reschedule.responseby_id": loggedInUserId,
                                    responseTime: model.nowTime,
                                };
                                break;
                        }
                        if (model.type == "B_P_C" ||
                            model.type == "B_A_C" ||
                            model.type == "R_P_C" ||
                            model.type == "R_A_C") {
                            if (appointmentData.patient_id.toString() == loggedInUserId) {
                                if (!appointmentData.clinicData.clinicPolicy.cancel.isAllowed)
                                    return [2 /*return*/, {
                                            status_code: http_status_codes_1.default.UNAUTHORIZED,
                                            success: false,
                                            data: {
                                                message: erros_message_1.default.incorrectAction(null, "cancel"),
                                                error: erros_message_1.default.ON_UPDATE_ERROR,
                                            },
                                        }];
                                if ((0, moment_1.default)(appointmentData.startDateTime).diff(model.nowTime, "hour") < appointmentData.clinicData.clinicPolicy.cancel.hours)
                                    return [2 /*return*/, {
                                            status_code: http_status_codes_1.default.UNAUTHORIZED,
                                            success: false,
                                            data: {
                                                message: erros_message_1.default.appointmentMsg.conflictClinicPolicy("cancel", appointmentData.clinicData.clinicPolicy.cancel.hours),
                                                error: erros_message_1.default.ON_UPDATE_ERROR,
                                            },
                                        }];
                            }
                            updateData.status = "Cancelled";
                        }
                        else if (model.type == "R_D" || model.type == "B_D") {
                            updateData.status = "Declined";
                        }
                        return [4 /*yield*/, appointment_model_1.default.findByIdAndUpdate(model.appointmentId, updateData, { new: true }).lean()];
                    case 3:
                        isUpdated = _a.sent();
                        if (!isUpdated) return [3 /*break*/, 5];
                        if (new Date(isUpdated.startDateTime) < new Date(model.nowTime)) {
                            // await EPrescription.findOneAndUpdate(
                            //   {
                            //     appointment_id:
                            //       mongoose.Types.ObjectId(appointmentId),
                            //   },
                            //   { isDeleted: true }
                            // );
                            // await FilledProgressNotes.findOneAndUpdate(
                            //   {
                            //     appointment_id:
                            //       mongoose.Types.ObjectId(appointmentId),
                            //   },
                            //   { isDeleted: true }
                            // );
                            // await FilledTreatmentPlans.findOneAndUpdate(
                            //   {
                            //     appointment_id:
                            //       mongoose.Types.ObjectId(appointmentId),
                            //   },
                            //   { isDeleted: true }
                            // );
                        }
                        temp = {
                            user_id: userDetails._id,
                            patient_id: null,
                            doctor_id: null,
                            description: "appointment declined successfully",
                            type: history_model_1.EHistoryActivityTypeValues.APPOINTMENT,
                            type_id: foundAppointments.patient_id,
                            data: {
                                remarks: model.reason,
                                time: new Date(),
                                // actionBy: userDetails._id,
                            },
                        };
                        return [4 /*yield*/, history_model_1.default.create(temp)];
                    case 4:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: "Appointment ".concat(updateData.status.toLowerCase()),
                            }];
                    case 5: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_UPDATE_APPOINTMENT,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                        }];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_10 = _a.sent();
                        next(error_10);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        // Download Appointment Data
        this.getAppointmentDataToExcel = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var workbook, appointmentSheet_1, appointmentSheetHeader, populateFeilds, condition, startTime, endTime, startTime, endTime, result, finalResponse_2, appointmentData, sheetStyle_1, data, link, excelFileName, response, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, xlsx_populate_1.default.fromBlankAsync()];
                    case 1:
                        workbook = _a.sent();
                        appointmentSheet_1 = workbook.sheet("Sheet1");
                        appointmentSheetHeader = [
                            "Appointment No.",
                            "Appointment Type",
                            "Patient Name",
                            "Date",
                            "Time",
                            "Status",
                        ];
                        appointmentSheetHeader.forEach(function (el, i) {
                            appointmentSheet_1
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
                        populateFeilds = [
                            {
                                path: "appointmentType_id",
                                select: ["type"],
                            },
                            {
                                path: "patient_id",
                                select: ["first_name", "middle_name", "last_name"],
                            },
                        ];
                        condition = {
                            status: { $ne: "Unavailability" },
                            isDeleted: false,
                        };
                        if (model.patient_id) {
                            condition.patient_id = new mongoose_1.default.Types.ObjectId(model.patient_id);
                        }
                        if ("isDeleted" in model &&
                            model.isDeleted !== undefined &&
                            model.isDeleted != null) {
                            condition.isDeleted = model.isDeleted;
                        }
                        if (model.clinic_id) {
                            condition.clinic_id = model.clinic_id;
                        }
                        if (model.appointmentType_id) {
                            condition.appointmentType_id = model.appointmentType_id;
                        }
                        if (model.status) {
                            condition.status = model.status;
                        }
                        // if ("isDeleted" in model) {
                        if (model.isDeleted) {
                            condition.isDeleted = model.isDeleted;
                        }
                        if (model.startDateTime) {
                            startTime = new Date(model.startDateTime);
                            startTime.setHours(0, 0, 0, 0);
                            endTime = new Date(model.startDateTime);
                            endTime.setHours(23, 59, 59, 999);
                            condition.startDateTime = {
                                $gte: startTime,
                                $lte: endTime,
                            };
                        }
                        if (model.endDateTime) {
                            startTime = new Date(model.endDateTime);
                            startTime.setHours(0, 0, 0, 0);
                            endTime = new Date(model.endDateTime);
                            endTime.setHours(23, 59, 59, 999);
                            condition.endDateTime = {
                                $gte: startTime,
                                $lte: endTime,
                            };
                        }
                        return [4 /*yield*/, appointment_model_1.default.find(condition)
                                .populate(populateFeilds)
                                .sort({ startDateTime: 1 })];
                    case 2:
                        result = _a.sent();
                        if (!(result && result.length > 0)) return [3 /*break*/, 5];
                        finalResponse_2 = [];
                        result.forEach(function (tempObj) {
                            if (tempObj.appointmentType_id) {
                                var apptTypeDoc = (tempObj.appointmentType_id);
                                tempObj["apptTypeValue"] = apptTypeDoc.type;
                            }
                            if (tempObj.patient_id) {
                                var patientDoc = __assign({}, tempObj.patient_id.toObject());
                                if (patientDoc.first_name)
                                    patientDoc.first_name = common_methods_1.default.getDecryptText(patientDoc.first_name);
                                if (patientDoc.middle_name)
                                    patientDoc.middle_name = common_methods_1.default.getDecryptText(patientDoc.middle_name);
                                if (patientDoc.last_name)
                                    patientDoc.last_name = common_methods_1.default.getDecryptText(patientDoc.last_name);
                                if (patientDoc.title)
                                    patientDoc.title = common_methods_1.default.getDecryptText(patientDoc.title);
                                tempObj.patient_id = patientDoc;
                            }
                            finalResponse_2.push(tempObj);
                        });
                        appointmentData = finalResponse_2;
                        sheetStyle_1 = {
                            border: true,
                            fontFamily: "Calibri",
                        };
                        appointmentData.forEach(function (el, i) {
                            var _a, _b;
                            var date = (0, moment_1.default)(el.startDateTime).format("DD-MM-YYYY");
                            console.log(date, "date", i);
                            appointmentSheet_1
                                .cell("A" + (i + 2))
                                .value(el.appointment_number)
                                .style(sheetStyle_1);
                            appointmentSheet_1
                                .cell("B" + (i + 2))
                                .value(el.apptTypeValue)
                                .style(sheetStyle_1);
                            appointmentSheet_1
                                .cell("C" + (i + 2))
                                .value(((_a = el.patient_id) === null || _a === void 0 ? void 0 : _a.first_name) + " " + ((_b = el.patient_id) === null || _b === void 0 ? void 0 : _b.last_name))
                                .style(sheetStyle_1);
                            appointmentSheet_1;
                            appointmentSheet_1
                                .cell("D" + (i + 2))
                                .value((0, moment_1.default)(el.startDateTime).format("DD-MM-YYYY"))
                                .style(sheetStyle_1);
                            appointmentSheet_1;
                            appointmentSheet_1
                                .cell("E" + (i + 2))
                                .value("".concat((0, moment_1.default)(el.startDateTime).format("LT"), "-").concat((0, moment_1.default)(el.endDateTime).format("LT")))
                                .style(sheetStyle_1);
                            appointmentSheet_1;
                            appointmentSheet_1
                                .cell("F" + (i + 2))
                                .value(el.status)
                                .style(sheetStyle_1);
                        });
                        appointmentSheet_1.freezePanes(1, 1);
                        return [4 /*yield*/, workbook.outputAsync()];
                    case 3:
                        data = _a.sent();
                        return [4 /*yield*/, fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../../../../public/upload/appointments/Appointment_Report.xlsx"), data)];
                    case 4:
                        _a.sent();
                        link = "http://".concat(req.hostname, ":").concat(process.env.PORT, "/upload/appointments/Appointment_Report.xlsx");
                        excelFileName = "Appointment_Report.xlsx";
                        response = {
                            link: link,
                            name: excelFileName,
                        };
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                data: response,
                                success: true,
                            }];
                    case 5: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.APPOINTMENT_LIST_NOT_FOUND,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_11 = _a.sent();
                        next(error_11);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.fetchAppointment = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, last_fetch, last_fetch_time, fetch_time, make_fetch_req_entry, FETCH_APPOINTMENT_URL, data_fetched, data_1, existingRecords, conflicted_ids_1, bulkAppointment_1, appointmentSaved, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 14, , 15]);
                        userDetails = req.user;
                        return [4 /*yield*/, fetch_data_model_1.default.find({ clinic_id: model.clinic_id, type: "APPOINTMENT" }, { fetch_time: 1 })
                                .sort({ createdAt: -1 })
                                .limit(1)];
                    case 1:
                        last_fetch = _a.sent();
                        last_fetch_time = new Date((0, moment_1.default)(Date.now() - 1 * 24 * 3600 * 1000).format("YYYY-MM-DD"));
                        if (last_fetch && last_fetch.length) {
                            last_fetch_time = last_fetch[0].fetch_time;
                        }
                        fetch_time = new Date();
                        return [4 /*yield*/, fetch_data_model_1.default.create({
                                type: "APPOINTMENT",
                                last_fetch_time: last_fetch_time,
                                fetch_time: fetch_time,
                                clinic_id: model.clinic_id,
                                createdby_id: userDetails._id,
                            })];
                    case 2:
                        make_fetch_req_entry = _a.sent();
                        if (!make_fetch_req_entry) return [3 /*break*/, 12];
                        FETCH_APPOINTMENT_URL = "http://192.168.1.140:1336/api/rcm/appointment/exportData";
                        return [4 /*yield*/, axios_1.default.post(FETCH_APPOINTMENT_URL, {
                                currentDateTime: fetch_time,
                                lastFetchTime: last_fetch_time,
                            })];
                    case 3:
                        data_fetched = _a.sent();
                        if (!(data_fetched &&
                            data_fetched.data &&
                            data_fetched.data.data &&
                            (data_fetched.data.data.updatedArr.length ||
                                data_fetched.data.data.createdArr.length))) return [3 /*break*/, 10];
                        data_1 = [];
                        data_fetched.data.data.createdArr.forEach(function (singleRecord) {
                            data_1.push({
                                _id: singleRecord._id,
                                title: singleRecord.title,
                                duration: singleRecord.duration,
                                document: singleRecord.document,
                                noShow: singleRecord.noShow,
                                description: singleRecord.description,
                                isDeleted: singleRecord.isDeleted,
                                isEmergency: singleRecord.isEmergency,
                                chargePatient: singleRecord.chargePatient,
                                appointment_type: singleRecord.appointment_type,
                                appointment_number: singleRecord.appointment_number,
                                visitType: singleRecord.visitType,
                                status: singleRecord.status,
                                clinic_id: model.clinic_id,
                                doctor_id: singleRecord.doctor_id,
                                patient_id: singleRecord.patient_id,
                                endDateTime: singleRecord.endDateTime,
                                location_id: singleRecord.location_id,
                                //"createdby_id": singleRecord.,
                                startDateTime: singleRecord.startDateTime,
                                appointmentType_id: singleRecord.appointmentType_id,
                                groupId: singleRecord.groupId,
                                emailStatus: singleRecord.emailStatus,
                                reschedule: singleRecord.reschedule,
                                callData: singleRecord.callData,
                                accepted: singleRecord.accepted,
                                declined: singleRecord.declined,
                                deleted: singleRecord.deleted,
                                recurring: singleRecord.recurring,
                                createdAt: singleRecord.createdAt,
                                updatedAt: singleRecord.updatedAt,
                            });
                        });
                        data_fetched.data.data.updatedArr.forEach(function (singleRecord) {
                            data_1.push({
                                _id: singleRecord._id,
                                title: singleRecord.title,
                                duration: singleRecord.duration,
                                document: singleRecord.document,
                                noShow: singleRecord.noShow,
                                description: singleRecord.description,
                                isDeleted: singleRecord.isDeleted,
                                isEmergency: singleRecord.isEmergency,
                                chargePatient: singleRecord.chargePatient,
                                appointment_type: singleRecord.appointment_type,
                                appointment_number: singleRecord.appointment_number,
                                visitType: singleRecord.visitType,
                                status: singleRecord.status,
                                clinic_id: model.clinic_id,
                                doctor_id: singleRecord.doctorCollectionData._id,
                                patient_id: singleRecord.patient_id,
                                endDateTime: singleRecord.endDateTime,
                                location_id: singleRecord.location_id,
                                //"createdby_id": singleRecord.,
                                startDateTime: singleRecord.startDateTime,
                                appointmentType_id: singleRecord.appointmentType_id,
                                groupId: singleRecord.groupId,
                                emailStatus: singleRecord.emailStatus,
                                reschedule: singleRecord.reschedule,
                                callData: singleRecord.callData,
                                accepted: singleRecord.accepted,
                                declined: singleRecord.declined,
                                deleted: singleRecord.deleted,
                                recurring: singleRecord.recurring,
                                createdAt: singleRecord.createdAt,
                                updatedAt: singleRecord.updatedAt,
                            });
                        });
                        return [4 /*yield*/, appointment_model_1.default.find({
                                $or: data_1.map(function (singleAppointment) { return ({
                                    _id: singleAppointment._id,
                                }); }),
                            }, { _id: 1, clinic_id: 1 })];
                    case 4:
                        existingRecords = _a.sent();
                        conflicted_ids_1 = [];
                        if (existingRecords && existingRecords.length) {
                            existingRecords.forEach(function (e) {
                                var foundIndex = data_1.findIndex(function (a) {
                                    return a._id.toString() == e._id.toString() &&
                                        a.clinic_id.toString() != e.clinic_id.toString();
                                });
                                if (foundIndex > -1) {
                                    conflicted_ids_1.push(data_1[foundIndex]._id);
                                    data_1.splice(foundIndex, 1);
                                }
                            });
                        }
                        if (!conflicted_ids_1.length) return [3 /*break*/, 6];
                        return [4 /*yield*/, fetch_data_model_1.default.updateOne({ _id: make_fetch_req_entry._id }, { conflicted_ids: conflicted_ids_1 })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        if (!(data_1.length > 0)) return [3 /*break*/, 8];
                        bulkAppointment_1 = [];
                        data_1.forEach(function (singleRecord) {
                            bulkAppointment_1.push({
                                updateOne: {
                                    filter: { _id: singleRecord._id },
                                    update: {
                                        $set: singleRecord,
                                    },
                                    upsert: true,
                                },
                            });
                        });
                        return [4 /*yield*/, appointment_model_1.default.bulkWrite(bulkAppointment_1)];
                    case 7:
                        appointmentSaved = _a.sent();
                        if (appointmentSaved) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    data: conflicted_ids_1.length
                                        ? erros_message_1.default.DATA_FETCHED_SUCCESS_WITH_CONFLICTS
                                        : erros_message_1.default.DATA_FETCHED_SUCCESS,
                                    success: true,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_DATA_TO_FETCH,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 9];
                    case 8: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: conflicted_ids_1.length
                                    ? erros_message_1.default.NO_DATA_TO_FETCH_BUT_CONFLICT_PRESENT
                                    : erros_message_1.default.NO_DATA_TO_FETCH,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 9: return [3 /*break*/, 11];
                    case 10: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.NO_DATA_TO_FETCH,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 11: return [3 /*break*/, 13];
                    case 12: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.FAILED_TO_FETCH_DATA,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        error_12 = _a.sent();
                        next(error_12);
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        }); };
        this.fetchCheckouts = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, last_fetch, last_fetch_time, fetch_time, make_fetch_req_entry, FETCH_CHECKOUT_URL, data_fetched, data_2, existingRecords, conflicted_ids_2, bulkCheckout_1, checkoutSaved, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 14, , 15]);
                        userDetails = req.user;
                        return [4 /*yield*/, fetch_data_model_1.default.find({ clinic_id: model.clinic_id, type: "CHECKOUT" }, { fetch_time: 1 })
                                .sort({ createdAt: -1 })
                                .limit(1)];
                    case 1:
                        last_fetch = _a.sent();
                        last_fetch_time = new Date((0, moment_1.default)(Date.now() - 1 * 24 * 3600 * 1000).format("YYYY-MM-DD"));
                        if (last_fetch && last_fetch.length) {
                            last_fetch_time = last_fetch[0].fetch_time;
                        }
                        fetch_time = new Date();
                        return [4 /*yield*/, fetch_data_model_1.default.create({
                                type: "CHECKOUT",
                                last_fetch_time: last_fetch_time,
                                fetch_time: fetch_time,
                                clinic_id: model.clinic_id,
                                createdby_id: userDetails._id,
                            })];
                    case 2:
                        make_fetch_req_entry = _a.sent();
                        if (!make_fetch_req_entry) return [3 /*break*/, 12];
                        FETCH_CHECKOUT_URL = "http://192.168.1.140:1336/api/rcm/doctorCheckout/exportData";
                        return [4 /*yield*/, axios_1.default.post(FETCH_CHECKOUT_URL, {
                                currentDateTime: fetch_time,
                                lastFetchTime: last_fetch_time,
                            })];
                    case 3:
                        data_fetched = _a.sent();
                        if (!(data_fetched &&
                            data_fetched.data &&
                            data_fetched.data.data &&
                            (data_fetched.data.data.updatedArr.length ||
                                data_fetched.data.data.createdArr.length))) return [3 /*break*/, 10];
                        data_2 = [];
                        data_fetched.data.data.createdArr.forEach(function (singleRecord) {
                            data_2.push({
                                _id: singleRecord._id,
                                codes: singleRecord.codes,
                                notes: singleRecord.notes,
                                duration: singleRecord.duration,
                                remark: singleRecord.remark,
                                noShow: singleRecord.remark,
                                followUp: singleRecord.remark,
                                checkoutTime: singleRecord.remark,
                                placeOfService: singleRecord.placeOfService,
                                chargePatient: singleRecord.chargePatient,
                                doctor_id: singleRecord.doctorCollectionData._id,
                                clinic_id: model.clinic_id,
                                appointment_id: singleRecord.appointment_id,
                                patient_id: singleRecord.patient_id,
                                location_id: singleRecord.location_id,
                                createdAt: singleRecord.createdAt,
                                updatedAt: singleRecord.updatedAt,
                                ///////////////////
                            });
                        });
                        data_fetched.data.data.updatedArr.forEach(function (singleRecord) {
                            data_2.push({
                                _id: singleRecord._id,
                                codes: singleRecord.codes,
                                notes: singleRecord.notes,
                                duration: singleRecord.duration,
                                remark: singleRecord.remark,
                                noShow: singleRecord.remark,
                                followUp: singleRecord.remark,
                                checkoutTime: singleRecord.remark,
                                placeOfService: singleRecord.placeOfService,
                                chargePatient: singleRecord.chargePatient,
                                doctor_id: singleRecord.doctorCollectionData._id,
                                clinic_id: model.clinic_id,
                                appointment_id: singleRecord.appointment_id,
                                patient_id: singleRecord.patient_id,
                                location_id: singleRecord.location_id,
                                createdAt: singleRecord.createdAt,
                                updatedAt: singleRecord.updatedAt,
                            });
                        });
                        return [4 /*yield*/, doctor_checkout_model_1.default.find({
                                $or: data_2.map(function (singleAppointment) { return ({
                                    _id: singleAppointment._id,
                                }); }),
                            }, { _id: 1, clinic_id: 1 })];
                    case 4:
                        existingRecords = _a.sent();
                        conflicted_ids_2 = [];
                        if (existingRecords && existingRecords.length) {
                            existingRecords.forEach(function (e) {
                                var foundIndex = data_2.findIndex(function (a) {
                                    return a._id.toString() == e._id.toString() &&
                                        a.clinic_id.toString() != e.clinic_id.toString();
                                });
                                if (foundIndex > -1) {
                                    conflicted_ids_2.push(data_2[foundIndex]._id);
                                    data_2.splice(foundIndex, 1);
                                }
                            });
                        }
                        if (!conflicted_ids_2.length) return [3 /*break*/, 6];
                        return [4 /*yield*/, fetch_data_model_1.default.updateOne({ _id: make_fetch_req_entry._id }, { conflicted_ids: conflicted_ids_2 })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        if (!(data_2.length > 0)) return [3 /*break*/, 8];
                        bulkCheckout_1 = [];
                        data_2.forEach(function (singleRecord) {
                            bulkCheckout_1.push({
                                updateOne: {
                                    filter: { _id: singleRecord._id },
                                    update: {
                                        $set: singleRecord,
                                    },
                                    upsert: true,
                                },
                            });
                        });
                        return [4 /*yield*/, doctor_checkout_model_1.default.bulkWrite(bulkCheckout_1)];
                    case 7:
                        checkoutSaved = _a.sent();
                        if (checkoutSaved) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    data: conflicted_ids_2.length
                                        ? erros_message_1.default.DATA_FETCHED_SUCCESS_WITH_CONFLICTS
                                        : erros_message_1.default.DATA_FETCHED_SUCCESS,
                                    success: true,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_DATA_TO_FETCH,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 9];
                    case 8: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: conflicted_ids_2.length
                                    ? erros_message_1.default.NO_DATA_TO_FETCH_BUT_CONFLICT_PRESENT
                                    : erros_message_1.default.NO_DATA_TO_FETCH,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 9: return [3 /*break*/, 11];
                    case 10: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.NO_DATA_TO_FETCH,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 11: return [3 /*break*/, 13];
                    case 12: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.FAILED_TO_FETCH_DATA,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        error_13 = _a.sent();
                        next(error_13);
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        }); };
    }
    return AppointmentServices;
}());
exports.default = new AppointmentServices();
