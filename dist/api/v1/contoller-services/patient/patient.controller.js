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
var patients_1 = require("../../view-models/patients");
var patient_service_1 = __importDefault(require("./patient.service"));
var PatientController = /** @class */ (function () {
    function PatientController() {
        var _this = this;
        this.addPatient = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, patientResult, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(patients_1.AddPatientViewmodel, req.body)];
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
                        return [4 /*yield*/, patient_service_1.default.addPatient(req, model, next)];
                    case 3:
                        patientResult = _a.sent();
                        if (patientResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: patientResult.status_code, success: patientResult.success }, (patientResult.success
                                    ? { data: patientResult.data }
                                    : __assign({}, (patientResult.success
                                        ? { data: patientResult.data }
                                        : { errors: patientResult.data })))))];
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
        this.updatePatient = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, patientResult, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(patients_1.UpdatePatientViewmodel, req.body)];
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
                        return [4 /*yield*/, patient_service_1.default.updatePatient(req, model, next)];
                    case 3:
                        patientResult = _a.sent();
                        if (patientResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: patientResult.status_code, success: patientResult.success }, (patientResult.success
                                    ? { data: patientResult.data }
                                    : __assign({}, (patientResult.success
                                        ? { data: patientResult.data }
                                        : { errors: patientResult.data })))))];
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
        this.getPatientDetails = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, patientDetailResult, error_3;
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
                    case 2: return [4 /*yield*/, patient_service_1.default.getPatientDetails(req, next)];
                    case 3:
                        patientDetailResult = _a.sent();
                        if (patientDetailResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: patientDetailResult.status_code, success: patientDetailResult.success }, (patientDetailResult.success
                                    ? { data: patientDetailResult.data }
                                    : { errors: patientDetailResult.data })))];
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
        this.deletePatientDetails = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, patientDeletionResult, error_4;
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
                    case 2: return [4 /*yield*/, patient_service_1.default.deletePatientDetails(req, next)];
                    case 3:
                        patientDeletionResult = _a.sent();
                        if (patientDeletionResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: patientDeletionResult.status_code, success: patientDeletionResult.success }, (patientDeletionResult.success
                                    ? { data: patientDeletionResult.data }
                                    : { errors: patientDeletionResult.data })))];
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
        this.getPatientList = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, patientListResult, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(patients_1.GetPatientListViewmodel, req.body)];
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
                        return [4 /*yield*/, patient_service_1.default.getPatientList(req, model, next)];
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
        this.getPatientPaymentList = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, patientPaymentListResult, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(patients_1.PatientPaymentListViewmodel, req.body)];
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
                        return [4 /*yield*/, patient_service_1.default.getPatientPaymentList(req, model, next)];
                    case 3:
                        patientPaymentListResult = _a.sent();
                        if (patientPaymentListResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: patientPaymentListResult.status_code, success: patientPaymentListResult.success }, (patientPaymentListResult.success
                                    ? {
                                        data: patientPaymentListResult.data.data,
                                        totalDocs: patientPaymentListResult.data.totalDocs,
                                        pageNumber: patientPaymentListResult.data.pageNumber,
                                        pageSize: patientPaymentListResult.data.pageSize,
                                        totalPages: patientPaymentListResult.data.totalPages,
                                    }
                                    : { errors: patientPaymentListResult.data })))];
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
        this.exportPatientPaymentDataToExcel = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, patientResult, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(patients_1.PatientPaymentListViewmodel, req.body)];
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
                        return [4 /*yield*/, patient_service_1.default.exportPatientPaymentDataToExcel(req, model, next)];
                    case 3:
                        patientResult = _a.sent();
                        if (patientResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: patientResult.status_code, success: patientResult.success }, (patientResult.success
                                    ? { data: patientResult.data }
                                    : __assign({}, (patientResult.success
                                        ? { data: patientResult.data }
                                        : { errors: patientResult.data })))))];
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
        this.getPatientListWithoutPagination = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, patientListResult, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(patients_1.GetPatientListViewmodel, req.body)];
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
                        return [4 /*yield*/, patient_service_1.default.getPatientListWithoutPagination(req, model, next)];
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
                        error_8 = _a.sent();
                        next(error_8);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        // Checkout Section
        this.checkoutList = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, pendingCheckoutPatientResult, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(patients_1.PendingCheckoutPatientViewmodel, req.body)];
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
                        return [4 /*yield*/, patient_service_1.default.checkoutList(req, model, next)];
                    case 3:
                        pendingCheckoutPatientResult = _a.sent();
                        if (pendingCheckoutPatientResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: pendingCheckoutPatientResult.status_code, success: pendingCheckoutPatientResult.success }, (pendingCheckoutPatientResult.success
                                    ? {
                                        data: pendingCheckoutPatientResult.data.data,
                                        totalDocs: pendingCheckoutPatientResult.data.totalDocs,
                                        pageNumber: pendingCheckoutPatientResult.data.pageNumber,
                                        pageSize: pendingCheckoutPatientResult.data.pageSize,
                                        totalPages: pendingCheckoutPatientResult.data.totalPages,
                                    }
                                    : {
                                        errors: pendingCheckoutPatientResult.data,
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
        this.getCheckoutDataToExcel = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, patientResult, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(patients_1.PendingCheckoutPatientViewmodel, req.body)];
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
                        return [4 /*yield*/, patient_service_1.default.getCheckoutDataToExcel(req, model, next)];
                    case 3:
                        patientResult = _a.sent();
                        if (patientResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: patientResult.status_code, success: patientResult.success }, (patientResult.success
                                    ? { data: patientResult.data }
                                    : __assign({}, (patientResult.success
                                        ? { data: patientResult.data }
                                        : { errors: patientResult.data })))))];
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
        //Patient Checkout process
        this.checkoutPatient = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, patientCheckoutResult, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(patients_1.PatientCheckOutViewmodel, req.body)];
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
                        return [4 /*yield*/, patient_service_1.default.checkoutPatient(req, model, next)];
                    case 3:
                        patientCheckoutResult = _a.sent();
                        if (patientCheckoutResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: patientCheckoutResult.status_code, success: patientCheckoutResult.success }, (patientCheckoutResult.success
                                    ? { data: patientCheckoutResult.data }
                                    : __assign({}, (patientCheckoutResult.success
                                        ? { data: patientCheckoutResult.data }
                                        : {
                                            errors: patientCheckoutResult.data,
                                        })))))];
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
        // Patient Document Section
        this.addPatientDocument = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, patientDocResult, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(patients_1.AddPatientDocumentViewmodel, req.body)];
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
                        return [4 /*yield*/, patient_service_1.default.addPatientDocument(req, model, next)];
                    case 3:
                        patientDocResult = _a.sent();
                        if (patientDocResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: patientDocResult.status_code, success: patientDocResult.success }, (patientDocResult.success
                                    ? { data: patientDocResult.data }
                                    : __assign({}, (patientDocResult.success
                                        ? { data: patientDocResult.data }
                                        : { errors: patientDocResult.data })))))];
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
        this.updatePatientDocument = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, patientDocResult, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(patients_1.UpdatePatientDocumentViewmodel, req.body)];
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
                        return [4 /*yield*/, patient_service_1.default.updatePatientDocument(req, model, next)];
                    case 3:
                        patientDocResult = _a.sent();
                        if (patientDocResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: patientDocResult.status_code, success: patientDocResult.success }, (patientDocResult.success
                                    ? { data: patientDocResult.data }
                                    : __assign({}, (patientDocResult.success
                                        ? { data: patientDocResult.data }
                                        : { errors: patientDocResult.data })))))];
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
        this.getPatientDocumentDetails = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, patientDocDetailResult, error_14;
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
                    case 2: return [4 /*yield*/, patient_service_1.default.getPatientDocumentDetails(req, next)];
                    case 3:
                        patientDocDetailResult = _a.sent();
                        if (patientDocDetailResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: patientDocDetailResult.status_code, success: patientDocDetailResult.success }, (patientDocDetailResult.success
                                    ? { data: patientDocDetailResult.data }
                                    : { errors: patientDocDetailResult.data })))];
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
        this.deletePatientDocumentDetails = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, patientDocDetailResult, error_15;
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
                    case 2: return [4 /*yield*/, patient_service_1.default.deletePatientDocumentDetails(req, next)];
                    case 3:
                        patientDocDetailResult = _a.sent();
                        if (patientDocDetailResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: patientDocDetailResult.status_code, success: patientDocDetailResult.success }, (patientDocDetailResult.success
                                    ? { data: patientDocDetailResult.data }
                                    : { errors: patientDocDetailResult.data })))];
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
        this.getPatientDocumentList = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, patientDocListResult, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(patients_1.GetPatientDocumentListViewmodel, req.body)];
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
                        return [4 /*yield*/, patient_service_1.default.getPatientDocumentList(req, model, next)];
                    case 3:
                        patientDocListResult = _a.sent();
                        if (patientDocListResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: patientDocListResult.status_code, success: patientDocListResult.success }, (patientDocListResult.success
                                    ? {
                                        data: patientDocListResult.data.data,
                                        totalDocs: patientDocListResult.data.totalDocs,
                                        pageNumber: patientDocListResult.data.pageNumber,
                                        pageSize: patientDocListResult.data.pageSize,
                                        totalPages: patientDocListResult.data.totalPages,
                                    }
                                    : { errors: patientDocListResult.data })))];
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
        // Assigned patients to provider
        this.assignProviderToPatient = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, patientDocResult, error_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(patients_1.AssignProviderViewmodel, req.body)];
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
                        return [4 /*yield*/, patient_service_1.default.assignProviderToPatient(req, model, next)];
                    case 3:
                        patientDocResult = _a.sent();
                        if (patientDocResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: patientDocResult.status_code, success: patientDocResult.success }, (patientDocResult.success
                                    ? { data: patientDocResult.data }
                                    : __assign({}, (patientDocResult.success
                                        ? { data: patientDocResult.data }
                                        : { errors: patientDocResult.data })))))];
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
        this.getAssignedProviderOrPatient = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listResult, error_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(patients_1.GetAssignProviderPatientViewmodel, req.body)];
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
                        return [4 /*yield*/, patient_service_1.default.getAssignedProviderOrPatient(req, model, next)];
                    case 3:
                        listResult = _a.sent();
                        if (listResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: listResult.status_code, success: listResult.success }, (listResult.success
                                    ? { data: listResult.data }
                                    : __assign({}, (listResult.success
                                        ? { data: listResult.data }
                                        : { errors: listResult.data })))))];
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
        this.getVisitHistoryList = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listResult, error_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(patients_1.GetPatientHistoryListViewmodel, req.body)];
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
                        return [4 /*yield*/, patient_service_1.default.getVisitHistoryList(req, model, next)];
                    case 3:
                        listResult = _a.sent();
                        if (listResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: listResult.status_code, success: listResult.success }, (listResult.success
                                    ? { data: listResult.data }
                                    : __assign({}, (listResult.success
                                        ? { data: listResult.data }
                                        : { errors: listResult.data })))))];
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
        this.getVisitHistoryDetails = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listResult, error_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(patients_1.GetPatientHistoryDetailViewmodel, req.body)];
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
                        return [4 /*yield*/, patient_service_1.default.getVisitHistoryDetails(req, model, next)];
                    case 3:
                        listResult = _a.sent();
                        if (listResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: listResult.status_code, success: listResult.success }, (listResult.success
                                    ? { data: listResult.data }
                                    : __assign({}, (listResult.success
                                        ? { data: listResult.data }
                                        : { errors: listResult.data })))))];
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
        // export patient data
        this.getPatientDataToExcel = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, patientDataResult, error_21;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(patients_1.ExportPatientListViewmodel, req.body)];
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
                        return [4 /*yield*/, patient_service_1.default.getPatientDataToExcel(req, model, next)];
                    case 3:
                        patientDataResult = _a.sent();
                        if (patientDataResult)
                            return [2 /*return*/, res.status(patientDataResult.status_code).json(__assign({ status_code: patientDataResult.status_code, success: patientDataResult.success }, (patientDataResult.success
                                    ? { data: patientDataResult.data }
                                    : __assign({}, (patientDataResult.success
                                        ? { data: patientDataResult.data }
                                        : { errors: patientDataResult.data })))))];
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
        this.getCptCodes = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, codeResult, error_22;
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
                    case 2: return [4 /*yield*/, patient_service_1.default.getCptCodes(req, next)];
                    case 3:
                        codeResult = _a.sent();
                        if (codeResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: codeResult.status_code, success: codeResult.success }, (codeResult.success
                                    ? { data: codeResult.data }
                                    : { errors: codeResult.data })))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_22 = _a.sent();
                        next(error_22);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getCheckoutDetails = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, codeResult, error_23;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(check_mongo_id_viewmodel_1.CheckMongoIdViewmodel, req.params._id
                            //JSON.parse(`{"_id":"${req.params._id}"}`)
                            )];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error && conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2: return [4 /*yield*/, patient_service_1.default.getCheckoutDetails(req, next)];
                    case 3:
                        codeResult = _a.sent();
                        if (codeResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: codeResult.status_code, success: codeResult.success }, (codeResult.success
                                    ? { data: codeResult.data }
                                    : { errors: codeResult.data })))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_23 = _a.sent();
                        next(error_23);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.mergePatient = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, codeResult, error_24;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(patients_1.MergePatientViewmodel, req.body
                            //JSON.parse(`{"_id":"${req.params._id}"}`)
                            )];
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
                        return [4 /*yield*/, patient_service_1.default.mergePatient(req, model, next)];
                    case 3:
                        codeResult = _a.sent();
                        if (codeResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: codeResult.status_code, success: codeResult.success }, (codeResult.success
                                    ? { data: codeResult.data }
                                    : { errors: codeResult.data })))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_24 = _a.sent();
                        next(error_24);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.fetchPatients = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, codeResult, error_25;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(patients_1.FetchPatientViewmodel, req.body
                            //JSON.parse(`{"_id":"${req.params._id}"}`)
                            )];
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
                        return [4 /*yield*/, patient_service_1.default.fetchPatients(req, model, next)];
                    case 3:
                        codeResult = _a.sent();
                        if (codeResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: codeResult.status_code, success: codeResult.success }, (codeResult.success
                                    ? { data: codeResult.data }
                                    : { errors: codeResult.data })))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_25 = _a.sent();
                        next(error_25);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
    }
    return PatientController;
}());
exports.default = new PatientController();
