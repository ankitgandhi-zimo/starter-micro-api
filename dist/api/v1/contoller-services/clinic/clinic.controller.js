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
var check_mongo_id_viewmodel_1 = require("../../view-models/check_mongo_id.viewmodel");
var clinic_1 = require("../../view-models/clinic");
var clinic_service_1 = __importDefault(require("./clinic.service"));
var Clinic_Controller = /** @class */ (function () {
    function Clinic_Controller() {
        // //LOGIN
        var _this = this;
        //Clinic Section
        this.addClinic = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, clinicResult, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(clinic_1.AddClinicViewmodel, req.body)];
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
                        return [4 /*yield*/, clinic_service_1.default.addClinic(req, model, next)];
                    case 3:
                        clinicResult = _a.sent();
                        if (clinicResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: clinicResult.status_code, success: clinicResult.success }, (clinicResult.success
                                    ? { data: clinicResult.data }
                                    : __assign({}, (clinicResult.success
                                        ? { data: clinicResult.data }
                                        : { errors: clinicResult.data })))))];
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
        this.updateClinic = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, clinicResult, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(clinic_1.UpdateClinicViewmodel, req.body)];
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
                        return [4 /*yield*/, clinic_service_1.default.updateClinic(req, model, next)];
                    case 3:
                        clinicResult = _a.sent();
                        if (clinicResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: clinicResult.status_code, success: clinicResult.success }, (clinicResult.success
                                    ? { data: clinicResult.data }
                                    : __assign({}, (clinicResult.success
                                        ? { data: clinicResult.data }
                                        : { errors: clinicResult.data })))))];
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
        this.getClinicDetails = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, clinicDetailResult, error_3;
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
                    case 2: return [4 /*yield*/, clinic_service_1.default.getClinicDetails(req, next)];
                    case 3:
                        clinicDetailResult = _a.sent();
                        if (clinicDetailResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: clinicDetailResult.status_code, success: clinicDetailResult.success }, (clinicDetailResult.success
                                    ? { data: clinicDetailResult.data }
                                    : { errors: clinicDetailResult.data })))];
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
        this.getClinicList = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, clinicListResult, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(clinic_1.GetClinicListViewmodel, req.body)];
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
                        return [4 /*yield*/, clinic_service_1.default.getClinicList(req, model, next)];
                    case 3:
                        clinicListResult = _a.sent();
                        if (clinicListResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: clinicListResult.status_code, success: clinicListResult.success }, (clinicListResult.success
                                    ? {
                                        data: clinicListResult.data.data,
                                        totalDocs: clinicListResult.data.totalDocs,
                                        pageNumber: clinicListResult.data.pageNumber,
                                        pageSize: clinicListResult.data.pageSize,
                                        totalPages: clinicListResult.data.totalPages,
                                    }
                                    : { errors: clinicListResult.data })))];
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
        this.getClinicListWithoutPagination = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var clinicListResult, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, clinic_service_1.default.getClinicListWithoutPagination(req, next)];
                    case 1:
                        clinicListResult = _a.sent();
                        if (clinicListResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: clinicListResult.status_code, success: clinicListResult.success }, (clinicListResult.success
                                    ? {
                                        data: clinicListResult.data.data,
                                        totalDocs: clinicListResult.data.totalDocs,
                                        pageNumber: clinicListResult.data.pageNumber,
                                        pageSize: clinicListResult.data.pageSize,
                                        totalPages: clinicListResult.data.totalPages,
                                    }
                                    : { errors: clinicListResult.data })))];
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteClinicDetails = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, clinicDetailResult, error_6;
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
                    case 2: return [4 /*yield*/, clinic_service_1.default.deleteClinicDetails(req, next)];
                    case 3:
                        clinicDetailResult = _a.sent();
                        if (clinicDetailResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: clinicDetailResult.status_code, success: clinicDetailResult.success }, (clinicDetailResult.success
                                    ? { data: clinicDetailResult.data }
                                    : { errors: clinicDetailResult.data })))];
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
        // clinic location section
        this.addClinicLocation = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, clinicLocationResult, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(clinic_1.AddClinicLocationViewmodel, req.body)];
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
                        return [4 /*yield*/, clinic_service_1.default.addClinicLocation(req, model, next)];
                    case 3:
                        clinicLocationResult = _a.sent();
                        if (clinicLocationResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: clinicLocationResult.status_code, success: clinicLocationResult.success }, (clinicLocationResult.success
                                    ? { data: clinicLocationResult.data }
                                    : __assign({}, (clinicLocationResult.success
                                        ? { data: clinicLocationResult.data }
                                        : {
                                            errors: clinicLocationResult.data,
                                        })))))];
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
        this.updateClinicLocation = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, clinicLocationResult, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(clinic_1.UpdateClinicLocationViewmodel, req.body)];
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
                        return [4 /*yield*/, clinic_service_1.default.updateClinicLocation(req, model, next)];
                    case 3:
                        clinicLocationResult = _a.sent();
                        if (clinicLocationResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: clinicLocationResult.status_code, success: clinicLocationResult.success }, (clinicLocationResult.success
                                    ? { data: clinicLocationResult.data }
                                    : __assign({}, (clinicLocationResult.success
                                        ? { data: clinicLocationResult.data }
                                        : {
                                            errors: clinicLocationResult.data,
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
        this.getClinicLocationDetails = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, clinicLocationDetailResult, error_9;
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
                    case 2: return [4 /*yield*/, clinic_service_1.default.getClinicLocationDetails(req, next)];
                    case 3:
                        clinicLocationDetailResult = _a.sent();
                        if (clinicLocationDetailResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: clinicLocationDetailResult.status_code, success: clinicLocationDetailResult.success }, (clinicLocationDetailResult.success
                                    ? { data: clinicLocationDetailResult.data }
                                    : {
                                        errors: clinicLocationDetailResult.data,
                                    })))];
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
        this.getClinicLocationList = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, clinicLocationListResult, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(clinic_1.GetClinicLocationListViewmodel, req.body)];
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
                        return [4 /*yield*/, clinic_service_1.default.getClinicLocationList(req, model, next)];
                    case 3:
                        clinicLocationListResult = _a.sent();
                        if (clinicLocationListResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: clinicLocationListResult.status_code, success: clinicLocationListResult.success }, (clinicLocationListResult.success
                                    ? {
                                        data: clinicLocationListResult.data.data,
                                        totalDocs: clinicLocationListResult.data.totalDocs,
                                        pageNumber: clinicLocationListResult.data.pageNumber,
                                        pageSize: clinicLocationListResult.data.pageSize,
                                        totalPages: clinicLocationListResult.data.totalPages,
                                    }
                                    : {
                                        errors: clinicLocationListResult.data,
                                    })))];
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
        this.getClinicLocationListWithoutPagination = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, clinicLocationListResult, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(clinic_1.GetClinicLocationListViewmodel, req.body)];
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
                        return [4 /*yield*/, clinic_service_1.default.getClinicLocationListWithoutPagination(req, model, next)];
                    case 3:
                        clinicLocationListResult = _a.sent();
                        if (clinicLocationListResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: clinicLocationListResult.status_code, success: clinicLocationListResult.success }, (clinicLocationListResult.success
                                    ? {
                                        data: clinicLocationListResult.data.data,
                                        totalDocs: clinicLocationListResult.data.totalDocs,
                                        pageNumber: clinicLocationListResult.data.pageNumber,
                                        pageSize: clinicLocationListResult.data.pageSize,
                                        totalPages: clinicLocationListResult.data.totalPages,
                                    }
                                    : {
                                        errors: clinicLocationListResult.data,
                                    })))];
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
        this.getClinicDataToExcel = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, clinicResult, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(clinic_1.GetClinicListViewmodel, req.body)];
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
                        return [4 /*yield*/, clinic_service_1.default.getClinicDataToExcel(req, model, next)];
                    case 3:
                        clinicResult = _a.sent();
                        if (clinicResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: clinicResult.status_code, success: clinicResult.success }, (clinicResult.success
                                    ? { data: clinicResult.data }
                                    : __assign({}, (clinicResult.success
                                        ? { data: clinicResult.data }
                                        : { errors: clinicResult.data })))))];
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
    }
    return Clinic_Controller;
}());
exports.default = new Clinic_Controller();
