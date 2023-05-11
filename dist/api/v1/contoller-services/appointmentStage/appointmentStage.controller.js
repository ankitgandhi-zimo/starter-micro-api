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
var appointmentStage_1 = require("../../view-models/appointmentStage");
var appointmentStage_service_1 = __importDefault(require("./appointmentStage.service"));
var AppointmentStage_Controller = /** @class */ (function () {
    function AppointmentStage_Controller() {
        var _this = this;
        this.addAppointmentStage = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, addAppointmentStageResult, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(appointmentStage_1.AddAppointmentStageViewmodel, req.body)];
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
                        return [4 /*yield*/, appointmentStage_service_1.default.addAppointmentStage(req, model, next)];
                    case 3:
                        addAppointmentStageResult = _a.sent();
                        if (addAppointmentStageResult)
                            return [2 /*return*/, res.status(addAppointmentStageResult.status_code).json(__assign({ status_code: addAppointmentStageResult.status_code, success: addAppointmentStageResult.success }, (addAppointmentStageResult.success
                                    ? { data: addAppointmentStageResult.data }
                                    : __assign({}, (addAppointmentStageResult.success
                                        ? { data: addAppointmentStageResult.data }
                                        : { errors: addAppointmentStageResult.data })))))];
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
        this.updateAppointmentStage = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, updateAppointmentStageResult, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(appointmentStage_1.UpdateAppointmentStageViewmodel, req.body)];
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
                        return [4 /*yield*/, appointmentStage_service_1.default.updateAppointmentStage(req, model, next)];
                    case 3:
                        updateAppointmentStageResult = _a.sent();
                        if (updateAppointmentStageResult)
                            return [2 /*return*/, res.status(updateAppointmentStageResult.status_code).json(__assign({ status_code: updateAppointmentStageResult.status_code, success: updateAppointmentStageResult.success }, (updateAppointmentStageResult.success
                                    ? { data: updateAppointmentStageResult.data }
                                    : __assign({}, (updateAppointmentStageResult.success
                                        ? { data: updateAppointmentStageResult.data }
                                        : { errors: updateAppointmentStageResult.data })))))];
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
        this.deleteAppointmentStage = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, deleteAppointmentStageResult, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(check_mongo_id_viewmodel_1.CheckMongoIdViewmodel, JSON.parse("{\"_id\":\"".concat(req.params._id, "\"}")))];
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
                        return [4 /*yield*/, appointmentStage_service_1.default.deleteAppointmentStage(req, model, next)];
                    case 3:
                        deleteAppointmentStageResult = _a.sent();
                        if (deleteAppointmentStageResult)
                            return [2 /*return*/, res.status(deleteAppointmentStageResult.status_code).json(__assign({ status_code: deleteAppointmentStageResult.status_code, success: deleteAppointmentStageResult.success }, (deleteAppointmentStageResult.success
                                    ? { data: deleteAppointmentStageResult.data }
                                    : { errors: deleteAppointmentStageResult.data })))];
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
        this.getAppointmentStage = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, getAppointmentStageResult, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(check_mongo_id_viewmodel_1.CheckMongoIdViewmodel, JSON.parse("{\"_id\":\"".concat(req.params._id, "\"}")))];
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
                        return [4 /*yield*/, appointmentStage_service_1.default.getAppointmentStage(req, model, next)];
                    case 3:
                        getAppointmentStageResult = _a.sent();
                        if (getAppointmentStageResult)
                            return [2 /*return*/, res.status(getAppointmentStageResult.status_code).json(__assign({ status_code: getAppointmentStageResult.status_code, success: getAppointmentStageResult.success }, (getAppointmentStageResult.success
                                    ? { data: getAppointmentStageResult.data }
                                    : __assign({}, (getAppointmentStageResult.success
                                        ? { data: getAppointmentStageResult.data }
                                        : { errors: getAppointmentStageResult.data })))))];
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
        this.listAppointmentStage = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listAppointmentStageResult, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(appointmentStage_1.GetAppointmentStageListViewmodel, req.body)];
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
                        return [4 /*yield*/, appointmentStage_service_1.default.listAppointmentStage(req, model, next)];
                    case 3:
                        listAppointmentStageResult = _a.sent();
                        if (listAppointmentStageResult)
                            return [2 /*return*/, res.status(listAppointmentStageResult.status_code).json(__assign({ status_code: listAppointmentStageResult.status_code, success: listAppointmentStageResult.success }, (listAppointmentStageResult.success
                                    ? { data: listAppointmentStageResult.data }
                                    : __assign({}, (listAppointmentStageResult.success
                                        ? { data: listAppointmentStageResult.data }
                                        : { errors: listAppointmentStageResult.data })))))];
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
    }
    return AppointmentStage_Controller;
}());
exports.default = new AppointmentStage_Controller();
