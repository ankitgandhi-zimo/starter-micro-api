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
var insurance_1 = require("../../view-models/insurance");
var insurance_service_1 = __importDefault(require("./insurance.service"));
var InsuranceController = /** @class */ (function () {
    function InsuranceController() {
        var _this = this;
        this.addInsurance = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, insuranceResult, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(insurance_1.AddInsuranceViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, insurance_service_1.default.addInsurance(req, model, next)];
                    case 3:
                        insuranceResult = _a.sent();
                        if (insuranceResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: insuranceResult.status_code, success: insuranceResult.success }, (insuranceResult.success
                                    ? { data: insuranceResult.data }
                                    : __assign({}, (insuranceResult.success
                                        ? { data: insuranceResult.data }
                                        : { errors: insuranceResult.data })))))];
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
        this.updateInsurance = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, insuranceResult, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(insurance_1.UpdateInsuranceViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, insurance_service_1.default.updateInsurance(req, model, next)];
                    case 3:
                        insuranceResult = _a.sent();
                        if (insuranceResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: insuranceResult.status_code, success: insuranceResult.success }, (insuranceResult.success
                                    ? { data: insuranceResult.data }
                                    : __assign({}, (insuranceResult.success
                                        ? { data: insuranceResult.data }
                                        : { errors: insuranceResult.data })))))];
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
        this.getInsuranceDetails = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, insuranceDetailResult, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(check_mongo_id_viewmodel_1.CheckMongoIdViewmodel, JSON.parse("{\"_id\":\"".concat(req.params._id, "\"}")))];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2: return [4 /*yield*/, insurance_service_1.default.getInsuranceDetails(req, next)];
                    case 3:
                        insuranceDetailResult = _a.sent();
                        if (insuranceDetailResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: insuranceDetailResult.status_code, success: insuranceDetailResult.success }, (insuranceDetailResult.success
                                    ? { data: insuranceDetailResult.data }
                                    : { errors: insuranceDetailResult.data })))];
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
        this.deleteInsuranceDetails = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, insuranceDeletionResult, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(check_mongo_id_viewmodel_1.CheckMongoIdViewmodel, JSON.parse("{\"_id\":\"".concat(req.params._id, "\"}")))];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2: return [4 /*yield*/, insurance_service_1.default.deleteInsuranceDetails(req, next)];
                    case 3:
                        insuranceDeletionResult = _a.sent();
                        if (insuranceDeletionResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: insuranceDeletionResult.status_code, success: insuranceDeletionResult.success }, (insuranceDeletionResult.success
                                    ? { data: insuranceDeletionResult.data }
                                    : { errors: insuranceDeletionResult.data })))];
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
        this.getInsuranceList = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, patientListResult, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(insurance_1.GetInsuranceListViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, insurance_service_1.default.getInsuranceList(req, model, next)];
                    case 3:
                        patientListResult = _a.sent();
                        if (patientListResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: patientListResult.status_code, success: patientListResult.success }, (patientListResult.success
                                    ? {
                                        data: patientListResult.data.data,
                                        totalDocs: patientListResult.data.totalDocs,
                                        pageNumber: patientListResult.data.pageNumber,
                                        pageSize: patientListResult.data.pageSize,
                                        totalPages: patientListResult.data.totalPages,
                                    }
                                    : { errors: patientListResult.data })))];
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
        this.getInsuranceListWithoutPagination = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, patientInsuranceListResult, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(insurance_1.GetInsuranceListViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, insurance_service_1.default.getInsuranceListWithoutPagination(req, model, next)];
                    case 3:
                        patientInsuranceListResult = _a.sent();
                        if (patientInsuranceListResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: patientInsuranceListResult.status_code, success: patientInsuranceListResult.success }, (patientInsuranceListResult.success
                                    ? {
                                        data: patientInsuranceListResult.data
                                            .data,
                                        totalDocs: patientInsuranceListResult.data
                                            .totalDocs,
                                        pageNumber: patientInsuranceListResult.data
                                            .pageNumber,
                                        pageSize: patientInsuranceListResult.data
                                            .pageSize,
                                        totalPages: patientInsuranceListResult.data
                                            .totalPages,
                                    }
                                    : {
                                        errors: patientInsuranceListResult.data,
                                    })))];
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
        // INSURANACE COMPANY SECTION  START
        this.addInsuranceCompany = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, insuranceCompanyResult, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(insurance_1.AddInsuranceCompanyViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, insurance_service_1.default.addInsuranceCompany(req, model, next)];
                    case 3:
                        insuranceCompanyResult = _a.sent();
                        if (insuranceCompanyResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: insuranceCompanyResult.status_code, success: insuranceCompanyResult.success }, (insuranceCompanyResult.success
                                    ? { data: insuranceCompanyResult.data }
                                    : __assign({}, (insuranceCompanyResult.success
                                        ? {
                                            data: insuranceCompanyResult.data,
                                        }
                                        : {
                                            errors: insuranceCompanyResult.data,
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
        this.updateInsuranceCompany = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, insuranceCompanyResult, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(insurance_1.UpdateInsuranceCompanyViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, insurance_service_1.default.updateInsuranceCompany(req, model, next)];
                    case 3:
                        insuranceCompanyResult = _a.sent();
                        if (insuranceCompanyResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: insuranceCompanyResult.status_code, success: insuranceCompanyResult.success }, (insuranceCompanyResult.success
                                    ? { data: insuranceCompanyResult.data }
                                    : __assign({}, (insuranceCompanyResult.success
                                        ? {
                                            data: insuranceCompanyResult.data,
                                        }
                                        : {
                                            errors: insuranceCompanyResult.data,
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
        this.getInsuranceCompanyDetails = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, insuranceCompanyResult, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(check_mongo_id_viewmodel_1.CheckMongoIdViewmodel, JSON.parse("{\"_id\":\"".concat(req.params._id, "\"}")))];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2: return [4 /*yield*/, insurance_service_1.default.getInsuranceCompanyDetails(req, next)];
                    case 3:
                        insuranceCompanyResult = _a.sent();
                        if (insuranceCompanyResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: insuranceCompanyResult.status_code, success: insuranceCompanyResult.success }, (insuranceCompanyResult.success
                                    ? { data: insuranceCompanyResult.data }
                                    : { errors: insuranceCompanyResult.data })))];
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
        this.deleteInsuranceCompanyDetails = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, insuranceCompanyResult, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(check_mongo_id_viewmodel_1.CheckMongoIdViewmodel, JSON.parse("{\"_id\":\"".concat(req.params._id, "\"}")))];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2: return [4 /*yield*/, insurance_service_1.default.deleteInsuranceCompanyDetails(req, next)];
                    case 3:
                        insuranceCompanyResult = _a.sent();
                        if (insuranceCompanyResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: insuranceCompanyResult.status_code, success: insuranceCompanyResult.success }, (insuranceCompanyResult.success
                                    ? { data: insuranceCompanyResult.data }
                                    : { errors: insuranceCompanyResult.data })))];
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
        this.getInsuranceCompanyList = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, insuranceCompanyListResult, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(insurance_1.GetInsuranceCompanyListViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, insurance_service_1.default.getInsuranceCompanyList(req, model, next)];
                    case 3:
                        insuranceCompanyListResult = _a.sent();
                        if (insuranceCompanyListResult)
                            return [2 /*return*/, res
                                    .status(insuranceCompanyListResult.status_code)
                                    .json(__assign({ status_code: insuranceCompanyListResult.status_code, success: insuranceCompanyListResult.success }, (insuranceCompanyListResult.success
                                    ? {
                                        data: insuranceCompanyListResult.data
                                            .data,
                                        totalDocs: insuranceCompanyListResult.data
                                            .totalDocs,
                                        pageNumber: insuranceCompanyListResult.data
                                            .pageNumber,
                                        pageSize: insuranceCompanyListResult.data
                                            .pageSize,
                                        totalPages: insuranceCompanyListResult.data
                                            .totalPages,
                                    }
                                    : {
                                        errors: insuranceCompanyListResult.data,
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
        this.getInsuranceCompanyDataToExcel = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, insuranceCompanyResult, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(insurance_1.GetInsuranceCompanyListViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, insurance_service_1.default.getInsuranceCompanyDataToExcel(req, model, next)];
                    case 3:
                        insuranceCompanyResult = _a.sent();
                        if (insuranceCompanyResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: insuranceCompanyResult.status_code, success: insuranceCompanyResult.success }, (insuranceCompanyResult.success
                                    ? { data: insuranceCompanyResult.data }
                                    : __assign({}, (insuranceCompanyResult.success
                                        ? {
                                            data: insuranceCompanyResult.data,
                                        }
                                        : {
                                            errors: insuranceCompanyResult.data,
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
        // Eap Insurance Section
        this.addEapInsurance = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, insuranceResult, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(insurance_1.AddEapInsuranceViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, insurance_service_1.default.addEapInsurance(req, model, next)];
                    case 3:
                        insuranceResult = _a.sent();
                        if (insuranceResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: insuranceResult.status_code, success: insuranceResult.success }, (insuranceResult.success
                                    ? { data: insuranceResult.data }
                                    : __assign({}, (insuranceResult.success
                                        ? { data: insuranceResult.data }
                                        : { errors: insuranceResult.data })))))];
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
        this.updateEapInsurance = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, insuranceResult, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(insurance_1.UpdateEapInsuranceViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, insurance_service_1.default.updateEapInsurance(req, model, next)];
                    case 3:
                        insuranceResult = _a.sent();
                        if (insuranceResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: insuranceResult.status_code, success: insuranceResult.success }, (insuranceResult.success
                                    ? { data: insuranceResult.data }
                                    : __assign({}, (insuranceResult.success
                                        ? { data: insuranceResult.data }
                                        : { errors: insuranceResult.data })))))];
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
        this.getEapInsuranceDetails = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, insuranceDetailResult, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(check_mongo_id_viewmodel_1.CheckMongoIdViewmodel, JSON.parse("{\"_id\":\"".concat(req.params._id, "\"}")))];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2: return [4 /*yield*/, insurance_service_1.default.getEapInsuranceDetails(req, next)];
                    case 3:
                        insuranceDetailResult = _a.sent();
                        if (insuranceDetailResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: insuranceDetailResult.status_code, success: insuranceDetailResult.success }, (insuranceDetailResult.success
                                    ? { data: insuranceDetailResult.data }
                                    : { errors: insuranceDetailResult.data })))];
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
        // Hmo Insurance Section
        this.addHmoInsurance = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, insuranceResult, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(insurance_1.AddHmoInsuranceViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, insurance_service_1.default.addHmoInsurance(req, model, next)];
                    case 3:
                        insuranceResult = _a.sent();
                        if (insuranceResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: insuranceResult.status_code, success: insuranceResult.success }, (insuranceResult.success
                                    ? { data: insuranceResult.data }
                                    : __assign({}, (insuranceResult.success
                                        ? { data: insuranceResult.data }
                                        : { errors: insuranceResult.data })))))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_16 = _a.sent();
                        next(error_16);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.updateHmoInsurance = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, insuranceResult, error_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(insurance_1.UpdateHmoInsuranceViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, insurance_service_1.default.updateHmoInsurance(req, model, next)];
                    case 3:
                        insuranceResult = _a.sent();
                        if (insuranceResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: insuranceResult.status_code, success: insuranceResult.success }, (insuranceResult.success
                                    ? { data: insuranceResult.data }
                                    : __assign({}, (insuranceResult.success
                                        ? { data: insuranceResult.data }
                                        : { errors: insuranceResult.data })))))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_17 = _a.sent();
                        next(error_17);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getHmoInsuranceDetails = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, insuranceDetailResult, error_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(check_mongo_id_viewmodel_1.CheckMongoIdViewmodel, JSON.parse("{\"_id\":\"".concat(req.params._id, "\"}")))];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2: return [4 /*yield*/, insurance_service_1.default.getHmoInsuranceDetails(req, next)];
                    case 3:
                        insuranceDetailResult = _a.sent();
                        if (insuranceDetailResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: insuranceDetailResult.status_code, success: insuranceDetailResult.success }, (insuranceDetailResult.success
                                    ? { data: insuranceDetailResult.data }
                                    : { errors: insuranceDetailResult.data })))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_18 = _a.sent();
                        next(error_18);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        // PPO Insurance Section
        this.addPpoInsurance = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, insuranceResult, error_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(insurance_1.AddPpoInsuranceViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, insurance_service_1.default.addPpoInsurance(req, model, next)];
                    case 3:
                        insuranceResult = _a.sent();
                        if (insuranceResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: insuranceResult.status_code, success: insuranceResult.success }, (insuranceResult.success
                                    ? { data: insuranceResult.data }
                                    : __assign({}, (insuranceResult.success
                                        ? { data: insuranceResult.data }
                                        : { errors: insuranceResult.data })))))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_19 = _a.sent();
                        next(error_19);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.updatePpoInsurance = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, insuranceResult, error_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(insurance_1.UpdatePpoInsuranceViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, insurance_service_1.default.updatePpoInsurance(req, model, next)];
                    case 3:
                        insuranceResult = _a.sent();
                        if (insuranceResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: insuranceResult.status_code, success: insuranceResult.success }, (insuranceResult.success
                                    ? { data: insuranceResult.data }
                                    : __assign({}, (insuranceResult.success
                                        ? { data: insuranceResult.data }
                                        : { errors: insuranceResult.data })))))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_20 = _a.sent();
                        next(error_20);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getPpoInsuranceDetails = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, insuranceDetailResult, error_21;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(check_mongo_id_viewmodel_1.CheckMongoIdViewmodel, JSON.parse("{\"_id\":\"".concat(req.params._id, "\"}")))];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2: return [4 /*yield*/, insurance_service_1.default.getPpoInsuranceDetails(req, next)];
                    case 3:
                        insuranceDetailResult = _a.sent();
                        if (insuranceDetailResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: insuranceDetailResult.status_code, success: insuranceDetailResult.success }, (insuranceDetailResult.success
                                    ? { data: insuranceDetailResult.data }
                                    : { errors: insuranceDetailResult.data })))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_21 = _a.sent();
                        next(error_21);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
    }
    return InsuranceController;
}());
exports.default = new InsuranceController();
