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
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var appointments_1 = require("../../view-models/appointments");
var check_mongo_id_viewmodel_1 = require("../../view-models/check_mongo_id.viewmodel");
var appointment_service_1 = __importDefault(require("../appointment/appointment.service"));
var Appointment_Controller = /** @class */ (function () {
    function Appointment_Controller() {
        var _this = this;
        this.addAppointment = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, appointmentResult, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(appointments_1.AddAppointmentViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error && conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(200).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, appointment_service_1.default.addAppointment(req, model, next)];
                    case 3:
                        appointmentResult = _a.sent();
                        if (appointmentResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: appointmentResult.status_code, success: appointmentResult.success }, (appointmentResult.success
                                    ? { data: appointmentResult.data }
                                    : __assign({}, (appointmentResult.success
                                        ? { data: appointmentResult.data }
                                        : { errors: appointmentResult.data })))))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.addRecurringAppointment = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, appointmentResult, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(appointments_1.AddRecurringAppointmentViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error && conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(200).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, appointment_service_1.default.addRecurringAppointment(req, model, next)];
                    case 3:
                        appointmentResult = _a.sent();
                        if (appointmentResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: appointmentResult.status_code, success: appointmentResult.success }, (appointmentResult.success
                                    ? { data: appointmentResult.data }
                                    : __assign({}, (appointmentResult.success
                                        ? { data: appointmentResult.data }
                                        : { errors: appointmentResult.data })))))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.updateAppointment = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, appointmentResult, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(appointments_1.UpdateAppointmentViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error && conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(200).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, appointment_service_1.default.updateAppointmentNew(req, model, next)];
                    case 3:
                        appointmentResult = _a.sent();
                        if (appointmentResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: appointmentResult.status_code, success: appointmentResult.success }, (appointmentResult.success
                                    ? { data: appointmentResult.data }
                                    : __assign({}, (appointmentResult.success
                                        ? { data: appointmentResult.data }
                                        : { errors: appointmentResult.data })))))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getAppointmentDetails = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, appointmentDetailResult, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(appointments_1.GetAppointmentDetailsViewmodel, JSON.parse("{\"appointment_number\":\"".concat(req.params.appointment_number, "\"}")))];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error && conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(200).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2: return [4 /*yield*/, appointment_service_1.default.getAppointmentDetails(req, next)];
                    case 3:
                        appointmentDetailResult = _a.sent();
                        if (appointmentDetailResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: appointmentDetailResult.status_code, success: appointmentDetailResult.success }, (appointmentDetailResult.success
                                    ? { data: appointmentDetailResult.data }
                                    : { errors: appointmentDetailResult.data })))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.deleteAppointmentDetails = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, appointmentDeletionResult, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(appointments_1.DeleteAppointmentViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error && conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(200).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, appointment_service_1.default.deleteAppointmentDetails(req, model, next)];
                    case 3:
                        appointmentDeletionResult = _a.sent();
                        if (appointmentDeletionResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: appointmentDeletionResult.status_code, success: appointmentDeletionResult.success }, (appointmentDeletionResult.success
                                    ? { data: appointmentDeletionResult.data }
                                    : {
                                        errors: appointmentDeletionResult.data,
                                    })))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getAppointmentList = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, appointmentListResult, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(appointments_1.GetAppointmentListViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error && conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        console.log("in data1111");
                        return [2 /*return*/, res.status(200).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, appointment_service_1.default.getAppointmentList(req, model, next)];
                    case 3:
                        appointmentListResult = _a.sent();
                        if (appointmentListResult) {
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: appointmentListResult.status_code, success: appointmentListResult.success }, (appointmentListResult.success
                                    ? {
                                        data: appointmentListResult.data.data,
                                        totalDocs: appointmentListResult.data.totalDocs,
                                        pageNumber: appointmentListResult.data.pageNumber,
                                        pageSize: appointmentListResult.data.pageSize,
                                        totalPages: appointmentListResult.data.totalPages,
                                    }
                                    : { errors: appointmentListResult.data })))];
                        }
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_6 = _a.sent();
                        next(error_6);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getAppointmentListWithoutPagination = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, appointmentListResult, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(appointments_1.GetAppointmentListViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error && conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(200).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, appointment_service_1.default.getAppointmentListWithoutPagination(req, model, next)];
                    case 3:
                        appointmentListResult = _a.sent();
                        if (appointmentListResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: appointmentListResult.status_code, success: appointmentListResult.success }, (appointmentListResult.success
                                    ? {
                                        data: appointmentListResult.data.data,
                                        totalDocs: appointmentListResult.data.totalDocs,
                                        pageNumber: appointmentListResult.data.pageNumber,
                                        pageSize: appointmentListResult.data.pageSize,
                                        totalPages: appointmentListResult.data.totalPages,
                                    }
                                    : { errors: appointmentListResult.data })))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_7 = _a.sent();
                        next(error_7);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.rescheduleAppointment = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, RescheduleAppointmentResult, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(appointments_1.AddRescheduleAppointmentViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error && conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(200).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, appointment_service_1.default.rescheduleAppointment(req, model, next)];
                    case 3:
                        RescheduleAppointmentResult = _a.sent();
                        if (RescheduleAppointmentResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: RescheduleAppointmentResult.status_code, success: RescheduleAppointmentResult.success }, (RescheduleAppointmentResult.success
                                    ? { data: RescheduleAppointmentResult.data }
                                    : __assign({}, (RescheduleAppointmentResult.success
                                        ? {
                                            data: RescheduleAppointmentResult.data,
                                        }
                                        : {
                                            errors: RescheduleAppointmentResult.data,
                                        })))))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_8 = _a.sent();
                        next(error_8);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.declineBooking = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, declinedAppointmentResult, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(appointments_1.DeclineAppointmentViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error && conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(200).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, appointment_service_1.default.declineBooking(req, model, next)];
                    case 3:
                        declinedAppointmentResult = _a.sent();
                        if (declinedAppointmentResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: declinedAppointmentResult.status_code, success: declinedAppointmentResult.success }, (declinedAppointmentResult.success
                                    ? { data: declinedAppointmentResult.data }
                                    : __assign({}, (declinedAppointmentResult.success
                                        ? {
                                            data: declinedAppointmentResult.data,
                                        }
                                        : {
                                            errors: declinedAppointmentResult.data,
                                        })))))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_9 = _a.sent();
                        next(error_9);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getAppointmentDataToExcel = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, appointmentResult, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(appointments_1.GetAppointmentListViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error && conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(200).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, appointment_service_1.default.getAppointmentDataToExcel(req, model, next)];
                    case 3:
                        appointmentResult = _a.sent();
                        if (appointmentResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: appointmentResult.status_code, success: appointmentResult.success }, (appointmentResult.success
                                    ? { data: appointmentResult.data }
                                    : __assign({}, (appointmentResult.success
                                        ? { data: appointmentResult.data }
                                        : { errors: appointmentResult.data })))))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_10 = _a.sent();
                        next(error_10);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getAppointmentDetailsWithId = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, appointmentDetailResult, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(check_mongo_id_viewmodel_1.CheckMongoIdViewmodel, JSON.parse("{\"_id\":\"".concat(req.params._id, "\"}")))];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error && conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(200).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2: return [4 /*yield*/, appointment_service_1.default.getAppointmentDetailsWithId(req, next)];
                    case 3:
                        appointmentDetailResult = _a.sent();
                        if (appointmentDetailResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: appointmentDetailResult.status_code, success: appointmentDetailResult.success }, (appointmentDetailResult.success
                                    ? { data: appointmentDetailResult.data }
                                    : { errors: appointmentDetailResult.data })))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_11 = _a.sent();
                        next(error_11);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.fetchAppointments = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listResult, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(appointments_1.FetchAppointmentViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error && conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, appointment_service_1.default.fetchAppointment(req, model, next)];
                    case 3:
                        listResult = _a.sent();
                        if (listResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: listResult.status_code, success: listResult.success }, (listResult.success
                                    ? { data: listResult.data }
                                    : __assign({}, (listResult.success
                                        ? { data: listResult.data }
                                        : {
                                            errors: listResult.data,
                                        })))))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_12 = _a.sent();
                        next(error_12);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.fetchCheckouts = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listResult, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(appointments_1.FetchAppointmentViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error && conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, appointment_service_1.default.fetchCheckouts(req, model, next)];
                    case 3:
                        listResult = _a.sent();
                        if (listResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: listResult.status_code, success: listResult.success }, (listResult.success
                                    ? { data: listResult.data }
                                    : __assign({}, (listResult.success
                                        ? { data: listResult.data }
                                        : {
                                            errors: listResult.data,
                                        })))))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_13 = _a.sent();
                        next(error_13);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
    }
    return Appointment_Controller;
}());
exports.default = new Appointment_Controller();
