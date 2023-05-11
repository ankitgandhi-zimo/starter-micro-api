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
var superBill_1 = require("../../view-models/superBill");
var superBill_service_1 = __importDefault(require("./superBill.service"));
var SuperBill_Controller = /** @class */ (function () {
    function SuperBill_Controller() {
        var _this = this;
        this.addSuperBill = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, addSuperBillResult, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(superBill_1.AddSuperBillViewmodel, req.body)];
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
                        return [4 /*yield*/, superBill_service_1.default.addSuperBill(req, model, next)];
                    case 3:
                        addSuperBillResult = _a.sent();
                        if (addSuperBillResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: addSuperBillResult.status_code, success: addSuperBillResult.success }, (addSuperBillResult.success
                                    ? { data: addSuperBillResult.data }
                                    : __assign({}, (addSuperBillResult.success
                                        ? { data: addSuperBillResult.data }
                                        : {
                                            errors: addSuperBillResult.data,
                                        })))))];
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
        this.updateSuperBill = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, updateSuperBillResult, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(superBill_1.UpdateSuperBillViewmodel, req.body)];
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
                        return [4 /*yield*/, superBill_service_1.default.updateSuperBill(req, model, next)];
                    case 3:
                        updateSuperBillResult = _a.sent();
                        if (updateSuperBillResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: updateSuperBillResult.status_code, success: updateSuperBillResult.success }, (updateSuperBillResult.success
                                    ? { data: updateSuperBillResult.data }
                                    : __assign({}, (updateSuperBillResult.success
                                        ? { data: updateSuperBillResult.data }
                                        : {
                                            errors: updateSuperBillResult.data,
                                        })))))];
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
        this.getSuperBill = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, getBillResult, error_3;
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
                        return [4 /*yield*/, superBill_service_1.default.getSuperBill(req, model, next)];
                    case 3:
                        getBillResult = _a.sent();
                        if (getBillResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: getBillResult.status_code, success: getBillResult.success }, (getBillResult.success
                                    ? { data: getBillResult.data }
                                    : __assign({}, (getBillResult.success
                                        ? { data: getBillResult.data }
                                        : { errors: getBillResult.data })))))];
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
        this.getDetailsForGenerateSuperBill = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, getAppDetailsResult, error_4;
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
                        return [4 /*yield*/, superBill_service_1.default.getDetailsForGenerateSuperBill(req, model, next)];
                    case 3:
                        getAppDetailsResult = _a.sent();
                        if (getAppDetailsResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: getAppDetailsResult.status_code, success: getAppDetailsResult.success }, (getAppDetailsResult.success
                                    ? { data: getAppDetailsResult.data }
                                    : __assign({}, (getAppDetailsResult.success
                                        ? { data: getAppDetailsResult.data }
                                        : { errors: getAppDetailsResult.data })))))];
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
        this.deleteSuperBill = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, deleteSuperBillResult, error_5;
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
                        return [4 /*yield*/, superBill_service_1.default.deleteSuperBill(req, model, next)];
                    case 3:
                        deleteSuperBillResult = _a.sent();
                        if (deleteSuperBillResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: deleteSuperBillResult.status_code, success: deleteSuperBillResult.success }, (deleteSuperBillResult.success
                                    ? { data: deleteSuperBillResult.data }
                                    : __assign({}, (deleteSuperBillResult.success
                                        ? { data: deleteSuperBillResult.data }
                                        : {
                                            errors: deleteSuperBillResult.data,
                                        })))))];
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
        this.listSuperBill = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listBillResult, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(superBill_1.GetSuperBillListViewmodel, req.body)];
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
                        return [4 /*yield*/, superBill_service_1.default.listSuperBill(req, model, next)];
                    case 3:
                        listBillResult = _a.sent();
                        if (listBillResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: listBillResult.status_code, success: listBillResult.success }, (listBillResult.success
                                    ? { data: listBillResult.data }
                                    : __assign({}, (listBillResult.success
                                        ? { data: listBillResult.data }
                                        : {
                                            errors: listBillResult.data,
                                        })))))];
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
        this.getSuperBillDataToExcel = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, excelSuperBillResult, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(superBill_1.GetSuperBillListViewmodel, req.body)];
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
                        return [4 /*yield*/, superBill_service_1.default.getSuperBillDataToExcel(req, model, next)];
                    case 3:
                        excelSuperBillResult = _a.sent();
                        if (excelSuperBillResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: excelSuperBillResult.status_code, success: excelSuperBillResult.success }, (excelSuperBillResult.success
                                    ? { data: excelSuperBillResult.data }
                                    : __assign({}, (excelSuperBillResult.success
                                        ? { data: excelSuperBillResult.data }
                                        : {
                                            errors: excelSuperBillResult.data,
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
        // super bill assignment
        this.superBillAssignment = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, assignSuperBillResult, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(superBill_1.AssignSuperBillViewmodel, req.body)];
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
                        return [4 /*yield*/, superBill_service_1.default.superBillAssignment(req, model, next)];
                    case 3:
                        assignSuperBillResult = _a.sent();
                        if (assignSuperBillResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: assignSuperBillResult.status_code, success: assignSuperBillResult.success }, (assignSuperBillResult.success
                                    ? { data: assignSuperBillResult.data }
                                    : __assign({}, (assignSuperBillResult.success
                                        ? { data: assignSuperBillResult.data }
                                        : {
                                            errors: assignSuperBillResult.data,
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
        this.superBillAssignmentHistory = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, result, error_9;
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
                        return [4 /*yield*/, superBill_service_1.default.superBillAssignmentHistory(req, next)];
                    case 3:
                        result = _a.sent();
                        if (result)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: result.status_code, success: result.success }, (result.success
                                    ? { data: result.data }
                                    : __assign({}, (result.success
                                        ? { data: result.data }
                                        : { errors: result.data })))))];
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
        this.markAsPrinted = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, result, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(superBill_1.MarkPrintedViewmodel, req.body)];
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
                        return [4 /*yield*/, superBill_service_1.default.markAsPrinted(req, model, next)];
                    case 3:
                        result = _a.sent();
                        if (result)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: result.status_code, success: result.success }, (result.success
                                    ? { data: result.data }
                                    : __assign({}, (result.success
                                        ? { data: result.data }
                                        : { errors: result.data })))))];
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
        this.getPatientList = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, result, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(superBill_1.PatientListViewmodel, req.body)];
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
                        return [4 /*yield*/, superBill_service_1.default.getPatientList(req, model, next)];
                    case 3:
                        result = _a.sent();
                        if (result)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: result.status_code, success: result.success }, (result.success
                                    ? { data: result.data }
                                    : __assign({}, (result.success
                                        ? { data: result.data }
                                        : { errors: result.data })))))];
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
        //getPatientList;
        // getDetailsForGenerateSuperBill1 = async (
        //   req: Request,
        //   res: Response,
        //   next: NextFunction
        // ) => {
        //   try {
        //     let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        //       GenerateDetailsViewmodel,
        //       req.body
        //     );
        //     if (conversionResult.error && conversionResult.error.length > 0) {
        //       return res.status(HttpStatus.OK).send({
        //         status_code: HttpStatus.BAD_REQUEST,
        //         success: false,
        //         errors: conversionResult.error[0],
        //       });
        //     } else {
        //       let model: GenerateDetailsViewmodel =
        //         conversionResult.data as GenerateDetailsViewmodel;
        //       let listBillResult =
        //         await superBillService.getDetailsForGenerateSuperBill1(
        //           req,
        //           model,
        //           next
        //         );
        //       if (listBillResult)
        //         return res.status(200).json({
        //           status_code: listBillResult.status_code,
        //           success: listBillResult.success,
        //           ...(listBillResult.success
        //             ? { data: listBillResult.data }
        //             : {
        //                 ...(listBillResult.success
        //                   ? { data: listBillResult.data }
        //                   : {
        //                       errors: listBillResult.data,
        //                     }),
        //               }),
        //         });
        //     }
        //   } catch (error) {
        //     next(error);
        //   }
        // };
        this.getChargeHistory = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, result, error_12;
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
                        return [4 /*yield*/, superBill_service_1.default.getChargeHistory(req, next)];
                    case 3:
                        result = _a.sent();
                        if (result)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: result.status_code, success: result.success }, (result.success
                                    ? { data: result.data }
                                    : __assign({}, (result.success
                                        ? { data: result.data }
                                        : { errors: result.data })))))];
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
        this.getPaymentHistory = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, result, error_13;
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
                        return [4 /*yield*/, superBill_service_1.default.getPaymentHistory(req, next)];
                    case 3:
                        result = _a.sent();
                        if (result)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: result.status_code, success: result.success }, (result.success
                                    ? { data: result.data }
                                    : __assign({}, (result.success
                                        ? { data: result.data }
                                        : { errors: result.data })))))];
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
        //getPaymentHistory
        ///getHistory
    }
    return SuperBill_Controller;
}());
exports.default = new SuperBill_Controller();
