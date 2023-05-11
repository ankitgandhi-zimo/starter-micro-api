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
var check_mongo_id_viewmodel_1 = require("../../view-models/check_mongo_id.viewmodel");
var appointmentType_1 = require("../../view-models/appointmentType");
var appointmentType_service_1 = __importDefault(require("./appointmentType.service"));
var AppointmentType_Controller = /** @class */ (function () {
    function AppointmentType_Controller() {
        var _this = this;
        this.addAppointmentType = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, addAppointmentTypeResult, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(appointmentType_1.AddAppointmentTypeViewmodel, req.body)];
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
                        return [4 /*yield*/, appointmentType_service_1.default.addAppointmentType(req, model, next)];
                    case 3:
                        addAppointmentTypeResult = _a.sent();
                        if (addAppointmentTypeResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: addAppointmentTypeResult.status_code, success: addAppointmentTypeResult.success }, (addAppointmentTypeResult.success
                                    ? { data: addAppointmentTypeResult.data }
                                    : __assign({}, (addAppointmentTypeResult.success
                                        ? { data: addAppointmentTypeResult.data }
                                        : { errors: addAppointmentTypeResult.data })))))];
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
        this.updateAppointmentType = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, updateAppointmentTypeResult, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(appointmentType_1.UpdateAppointmentTypeViewmodel, req.body)];
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
                        return [4 /*yield*/, appointmentType_service_1.default.updateAppointmentType(req, model, next)];
                    case 3:
                        updateAppointmentTypeResult = _a.sent();
                        if (updateAppointmentTypeResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: updateAppointmentTypeResult.status_code, success: updateAppointmentTypeResult.success }, (updateAppointmentTypeResult.success
                                    ? { data: updateAppointmentTypeResult.data }
                                    : __assign({}, (updateAppointmentTypeResult.success
                                        ? { data: updateAppointmentTypeResult.data }
                                        : { errors: updateAppointmentTypeResult.data })))))];
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
        this.deleteAppointmentType = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, deleteAppointmentTypeResult, error_3;
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
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, appointmentType_service_1.default.deleteAppointmentType(req, model, next)];
                    case 3:
                        deleteAppointmentTypeResult = _a.sent();
                        if (deleteAppointmentTypeResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: deleteAppointmentTypeResult.status_code, success: deleteAppointmentTypeResult.success }, (deleteAppointmentTypeResult.success
                                    ? { data: deleteAppointmentTypeResult.data }
                                    : { errors: deleteAppointmentTypeResult.data })))];
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
        this.getAppointmentType = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, getAppointmentTypeResult, error_4;
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
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, appointmentType_service_1.default.getAppointmentType(req, model, next)];
                    case 3:
                        getAppointmentTypeResult = _a.sent();
                        if (getAppointmentTypeResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: getAppointmentTypeResult.status_code, success: getAppointmentTypeResult.success }, (getAppointmentTypeResult.success
                                    ? { data: getAppointmentTypeResult.data }
                                    : __assign({}, (getAppointmentTypeResult.success
                                        ? { data: getAppointmentTypeResult.data }
                                        : { errors: getAppointmentTypeResult.data })))))];
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
        this.listAppointmentType = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listAppointmentTypeResult, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(appointmentType_1.GetAppointmentTypeListViewmodel, req.body)];
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
                        return [4 /*yield*/, appointmentType_service_1.default.listAppointmentType(req, model, next)];
                    case 3:
                        listAppointmentTypeResult = _a.sent();
                        if (listAppointmentTypeResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: listAppointmentTypeResult.status_code, success: listAppointmentTypeResult.success }, (listAppointmentTypeResult.success
                                    ? { data: listAppointmentTypeResult.data }
                                    : __assign({}, (listAppointmentTypeResult.success
                                        ? { data: listAppointmentTypeResult.data }
                                        : { errors: listAppointmentTypeResult.data })))))];
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
        this.filterListAppointmentType = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listAppointmentTypeResult, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(appointmentType_1.GetAppointmentTypeListViewmodel, req.body)];
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
                        return [4 /*yield*/, appointmentType_service_1.default.filterListAppointmentType(req, model, next)];
                    case 3:
                        listAppointmentTypeResult = _a.sent();
                        if (listAppointmentTypeResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: listAppointmentTypeResult.status_code, success: listAppointmentTypeResult.success }, (listAppointmentTypeResult.success
                                    ? { data: listAppointmentTypeResult.data }
                                    : __assign({}, (listAppointmentTypeResult.success
                                        ? { data: listAppointmentTypeResult.data }
                                        : { errors: listAppointmentTypeResult.data })))))];
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
    }
    return AppointmentType_Controller;
}());
exports.default = new AppointmentType_Controller();
