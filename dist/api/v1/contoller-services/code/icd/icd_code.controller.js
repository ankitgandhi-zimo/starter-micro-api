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
var common_methods_1 = __importDefault(require("../../../common/common-methods"));
var check_mongo_id_viewmodel_1 = require("../../../view-models/check_mongo_id.viewmodel");
var icd_code_1 = require("../../../view-models/icd_code");
var icd_code_service_1 = __importDefault(require("./icd_code.service"));
var IcdCode_Controller = /** @class */ (function () {
    function IcdCode_Controller() {
        var _this = this;
        this.addIcdCode = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, addCodeResult, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(icd_code_1.AddIcdCodeViewmodel, req.body)];
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
                        return [4 /*yield*/, icd_code_service_1.default.addIcdCode(req, model, next)];
                    case 3:
                        addCodeResult = _a.sent();
                        if (addCodeResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: addCodeResult.status_code, success: addCodeResult.success }, (addCodeResult.success
                                    ? { data: addCodeResult.data }
                                    : __assign({}, (addCodeResult.success
                                        ? { data: addCodeResult.data }
                                        : { errors: addCodeResult.data })))))];
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
        this.updateIcdCode = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, updateIcdCodeResult, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(icd_code_1.UpdateIcdCodeViewmodel, req.body)];
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
                        return [4 /*yield*/, icd_code_service_1.default.updateIcdCode(req, model, next)];
                    case 3:
                        updateIcdCodeResult = _a.sent();
                        if (updateIcdCodeResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: updateIcdCodeResult.status_code, success: updateIcdCodeResult.success }, (updateIcdCodeResult.success
                                    ? { data: updateIcdCodeResult.data }
                                    : __assign({}, (updateIcdCodeResult.success
                                        ? { data: updateIcdCodeResult.data }
                                        : { errors: updateIcdCodeResult.data })))))];
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
        this.deleteIcdCode = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, deleteCptCodeResult, error_3;
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
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, icd_code_service_1.default.deleteIcdCode(req, model, next)];
                    case 3:
                        deleteCptCodeResult = _a.sent();
                        if (deleteCptCodeResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: deleteCptCodeResult.status_code, success: deleteCptCodeResult.success }, (deleteCptCodeResult.success
                                    ? { data: deleteCptCodeResult.data }
                                    : __assign({}, (deleteCptCodeResult.success
                                        ? { data: deleteCptCodeResult.data }
                                        : { errors: deleteCptCodeResult.data })))))];
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
        this.getIcdCode = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, getIcdCodeResult, error_4;
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
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, icd_code_service_1.default.getIcdCode(req, model, next)];
                    case 3:
                        getIcdCodeResult = _a.sent();
                        if (getIcdCodeResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: getIcdCodeResult.status_code, success: getIcdCodeResult.success }, (getIcdCodeResult.success
                                    ? { data: getIcdCodeResult.data }
                                    : __assign({}, (getIcdCodeResult.success
                                        ? { data: getIcdCodeResult.data }
                                        : { errors: getIcdCodeResult.data })))))];
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
        this.getIcdCodeDataToExcel = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, exportCodeResult, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(icd_code_1.GetIcdCodeListViewmodel, req.body)];
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
                        return [4 /*yield*/, icd_code_service_1.default.getIcdCodeDataToExcel(req, model, next)];
                    case 3:
                        exportCodeResult = _a.sent();
                        if (exportCodeResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: exportCodeResult.status_code, success: exportCodeResult.success }, (exportCodeResult.success
                                    ? { data: exportCodeResult.data }
                                    : __assign({}, (exportCodeResult.success
                                        ? { data: exportCodeResult.data }
                                        : { errors: exportCodeResult.data })))))];
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
        this.listIcdCode = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listIcdCodeResult, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(icd_code_1.GetIcdCodeListViewmodel, req.body)];
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
                        return [4 /*yield*/, icd_code_service_1.default.listIcdCode(req, model, next)];
                    case 3:
                        listIcdCodeResult = _a.sent();
                        if (listIcdCodeResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: listIcdCodeResult.status_code, success: listIcdCodeResult.success }, (listIcdCodeResult.success
                                    ? { data: listIcdCodeResult.data }
                                    : __assign({}, (listIcdCodeResult.success
                                        ? { data: listIcdCodeResult.data }
                                        : { errors: listIcdCodeResult.data })))))];
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
        // filterListCptCode = async (
        //   req: Request,
        //   res: Response,
        //   next: NextFunction
        // ) => {
        //   try {
        //     let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        //       GetCptCodeListViewmodel,
        //       req.body
        //     );
        //     if (conversionResult.error && conversionResult.error.length > 0) {
        //       return res.status(HttpStatus.BAD_REQUEST).send({
        //         status_code: HttpStatus.BAD_REQUEST,
        //         success: false,
        //         errors: conversionResult.error[0],
        //       });
        //     } else {
        //       let model: GetCptCodeListViewmodel =
        //         conversionResult.data as GetCptCodeListViewmodel;
        //       let listCodeResult = await cptCodeService.filterListCptCode(
        //         req,
        //         model,
        //         next
        //       );
        //       if (listCodeResult)
        //         return res.status(listCodeResult.status_code).json({
        //           status_code: listCodeResult.status_code,
        //           success: listCodeResult.success,
        //           ...(listCodeResult.success
        //             ? { data: listCodeResult.data }
        //             : {
        //                 ...(listCodeResult.success
        //                   ? { data: listCodeResult.data }
        //                   : { errors: listCodeResult.data }),
        //               }),
        //         });
        //     }
        //   } catch (error) {
        //     next(error);
        //   }
        // };
    }
    return IcdCode_Controller;
}());
exports.default = new IcdCode_Controller();
