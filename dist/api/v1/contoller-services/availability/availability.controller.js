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
var common_methods_1 = __importDefault(require("../../../v1/common/common-methods"));
var availability_1 = require("../../view-models/availability");
var availability_service_1 = __importDefault(require("./availability.service"));
var Availability_Controller = /** @class */ (function () {
    function Availability_Controller() {
        var _this = this;
        this.setAvailability = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, addAvailabilityResult, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(availability_1.SetAvailabilityViewmodel, req.body)];
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
                        return [4 /*yield*/, availability_service_1.default.setAvailability(req, model, next)];
                    case 3:
                        addAvailabilityResult = _a.sent();
                        if (addAvailabilityResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: addAvailabilityResult.status_code, success: addAvailabilityResult.success }, (addAvailabilityResult.success
                                    ? { data: addAvailabilityResult.data }
                                    : __assign({}, (addAvailabilityResult.success
                                        ? { data: addAvailabilityResult.data }
                                        : { errors: addAvailabilityResult.data })))))];
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
        this.getAvailability = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, getAvailabilityResult, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(availability_1.GetAvailabilityViewmodel, req.body)];
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
                        return [4 /*yield*/, availability_service_1.default.getAvailability(req, model, next)];
                    case 3:
                        getAvailabilityResult = _a.sent();
                        if (getAvailabilityResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: getAvailabilityResult.status_code, success: getAvailabilityResult.success }, (getAvailabilityResult.success
                                    ? { data: getAvailabilityResult.data }
                                    : __assign({}, (getAvailabilityResult.success
                                        ? { data: getAvailabilityResult.data }
                                        : { errors: getAvailabilityResult.data })))))];
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
        this.getAvailabilityForView = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, getAvailabilityResult, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(availability_1.GetAvailabilityViewViewmodel, req.body)];
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
                        return [4 /*yield*/, availability_service_1.default.getAvailabilityForView(req, model, next)];
                    case 3:
                        getAvailabilityResult = _a.sent();
                        if (getAvailabilityResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: getAvailabilityResult.status_code, success: getAvailabilityResult.success }, (getAvailabilityResult.success
                                    ? { data: getAvailabilityResult.data }
                                    : __assign({}, (getAvailabilityResult.success
                                        ? { data: getAvailabilityResult.data }
                                        : { errors: getAvailabilityResult.data })))))];
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
        this.updateAvailability = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, updateAvailabilityResult, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(availability_1.UpdateAvailabilityViewmodel, req.body)];
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
                        return [4 /*yield*/, availability_service_1.default.updateAvailability(req, model, next)];
                    case 3:
                        updateAvailabilityResult = _a.sent();
                        if (updateAvailabilityResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: updateAvailabilityResult.status_code, success: updateAvailabilityResult.success }, (updateAvailabilityResult.success
                                    ? { data: updateAvailabilityResult.data }
                                    : __assign({}, (updateAvailabilityResult.success
                                        ? { data: updateAvailabilityResult.data }
                                        : { errors: updateAvailabilityResult.data })))))];
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
        this.setUnavailability = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, addUnavailabilityResult, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(availability_1.SetUnavailabilityViewmodel, req.body)];
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
                        return [4 /*yield*/, availability_service_1.default.setUnavailability(req, model, next)];
                    case 3:
                        addUnavailabilityResult = _a.sent();
                        if (addUnavailabilityResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: addUnavailabilityResult.status_code, success: addUnavailabilityResult.success }, (addUnavailabilityResult.success
                                    ? { data: addUnavailabilityResult.data }
                                    : __assign({}, (addUnavailabilityResult.success
                                        ? { data: addUnavailabilityResult.data }
                                        : { errors: addUnavailabilityResult.data })))))];
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
        this.getUnavailability = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, getUnavailabilityResult, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(availability_1.GetUnavailabilityViewmodel, req.body)];
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
                        return [4 /*yield*/, availability_service_1.default.getUnavailability(req, model, next)];
                    case 3:
                        getUnavailabilityResult = _a.sent();
                        if (getUnavailabilityResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: getUnavailabilityResult.status_code, success: getUnavailabilityResult.success }, (getUnavailabilityResult.success
                                    ? { data: getUnavailabilityResult.data }
                                    : __assign({}, (getUnavailabilityResult.success
                                        ? { data: getUnavailabilityResult.data }
                                        : { errors: getUnavailabilityResult.data })))))];
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
        this.deleteUnavailability = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, deleteUnavailabilityResult, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(availability_1.DeleteUnavailabilityViewmodel, req.body)];
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
                        return [4 /*yield*/, availability_service_1.default.deleteUnavailability(req, model, next)];
                    case 3:
                        deleteUnavailabilityResult = _a.sent();
                        if (deleteUnavailabilityResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: deleteUnavailabilityResult.status_code, success: deleteUnavailabilityResult.success }, (deleteUnavailabilityResult.success
                                    ? { data: deleteUnavailabilityResult.data }
                                    : __assign({}, (deleteUnavailabilityResult.success
                                        ? { data: deleteUnavailabilityResult.data }
                                        : { errors: deleteUnavailabilityResult.data })))))];
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
        this.getTimeSlots = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, Result, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(availability_1.GetTimeSlotsViewmodel, req.body)];
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
                        return [4 /*yield*/, availability_service_1.default.getTimeSlots(req, model, next)];
                    case 3:
                        Result = _a.sent();
                        if (Result)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: Result.status_code, success: Result.success }, (Result.success
                                    ? { data: Result.data }
                                    : __assign({}, (Result.success
                                        ? { data: Result.data }
                                        : { errors: Result.data })))))];
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
        this.getAvailabilityDetailsForUpdate = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, Result, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(availability_1.GetAvailabilityViewmodel, req.body)];
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
                        return [4 /*yield*/, availability_service_1.default.getAvailabilityDetailsForUpdate(req, model, next)];
                    case 3:
                        Result = _a.sent();
                        if (Result)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: Result.status_code, success: Result.success }, (Result.success
                                    ? { data: Result.data }
                                    : __assign({}, (Result.success
                                        ? { data: Result.data }
                                        : { errors: Result.data })))))];
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
        this.getAvailableDatesArr = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, Result, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(availability_1.GetAvailableDaysViewmodel, req.body)];
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
                        return [4 /*yield*/, availability_service_1.default.getAvailableDatesArr(req, model, next)];
                    case 3:
                        Result = _a.sent();
                        if (Result)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: Result.status_code, success: Result.success }, (Result.success
                                    ? { data: Result.data }
                                    : __assign({}, (Result.success
                                        ? { data: Result.data }
                                        : { errors: Result.data })))))];
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
        this.getAvailableDoctorsLocation = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, Result, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(availability_1.GetDoctorLocationViewmodel, req.body)];
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
                        return [4 /*yield*/, availability_service_1.default.getAvailableDoctorsLocation(req, model, next)];
                    case 3:
                        Result = _a.sent();
                        if (Result)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: Result.status_code, success: Result.success }, (Result.success
                                    ? { data: Result.data }
                                    : __assign({}, (Result.success
                                        ? { data: Result.data }
                                        : { errors: Result.data })))))];
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
        this.getAvailableTimeSlots = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, Result, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(availability_1.GetAvailableTimeSlotsViewmodel, req.body)];
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
                        return [4 /*yield*/, availability_service_1.default.getAvailableTimeSlots(req, model, next)];
                    case 3:
                        Result = _a.sent();
                        if (Result)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: Result.status_code, success: Result.success }, (Result.success
                                    ? { data: Result.data }
                                    : __assign({}, (Result.success
                                        ? { data: Result.data }
                                        : { errors: Result.data })))))];
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
        this.getSchedulerData = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, Result, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(availability_1.GetSchedulerViewmodel, req.body)];
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
                        return [4 /*yield*/, availability_service_1.default.getSchedulerData(req, model, next)];
                    case 3:
                        Result = _a.sent();
                        if (Result)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: Result.status_code, success: Result.success }, (Result.success
                                    ? { data: Result.data }
                                    : __assign({}, (Result.success
                                        ? { data: Result.data }
                                        : { errors: Result.data })))))];
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
        this.getAvailableDoctors = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, Result, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(availability_1.GetAvailableDoctorViewmodel, req.body)];
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
                        return [4 /*yield*/, availability_service_1.default.getAvailableDoctors(req, model, next)];
                    case 3:
                        Result = _a.sent();
                        if (Result)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: Result.status_code, success: Result.success }, (Result.success
                                    ? { data: Result.data }
                                    : __assign({}, (Result.success
                                        ? { data: Result.data }
                                        : { errors: Result.data })))))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_14 = _a.sent();
                        next(error_14);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getSelectedWeekDaysOfAvailablility = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, Result, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(availability_1.GetSelectedWeekDaysViewmodel, req.body)];
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
                        return [4 /*yield*/, availability_service_1.default.getSelectedWeekDaysOfAvailablility(req, model, next)];
                    case 3:
                        Result = _a.sent();
                        if (Result)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: Result.status_code, success: Result.success }, (Result.success
                                    ? { data: Result.data }
                                    : __assign({}, (Result.success
                                        ? { data: Result.data }
                                        : { errors: Result.data })))))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_15 = _a.sent();
                        next(error_15);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        //getSelectedWeekDaysOfAvailablility
        //getAvailableDoctors
        //getSchedulerData
    }
    return Availability_Controller;
}());
exports.default = new Availability_Controller();
