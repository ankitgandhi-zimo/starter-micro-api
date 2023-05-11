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
var cpt_code_1 = require("../../../view-models/cpt_code");
var cpt_code_service_1 = __importDefault(require("./cpt_code.service"));
var CptCode_Controller = /** @class */ (function () {
    function CptCode_Controller() {
        var _this = this;
        this.addCptCode = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, addCodeResult, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(cpt_code_1.AddCptCodeViewmodel, req.body)];
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
                        return [4 /*yield*/, cpt_code_service_1.default.addCptCode(req, model, next)];
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
        this.updateCptCode = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, updateCptCodeResult, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(cpt_code_1.UpdateCptCodeViewmodel, req.body)];
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
                        return [4 /*yield*/, cpt_code_service_1.default.updateCptCode(req, model, next)];
                    case 3:
                        updateCptCodeResult = _a.sent();
                        if (updateCptCodeResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: updateCptCodeResult.status_code, success: updateCptCodeResult.success }, (updateCptCodeResult.success
                                    ? { data: updateCptCodeResult.data }
                                    : __assign({}, (updateCptCodeResult.success
                                        ? { data: updateCptCodeResult.data }
                                        : { errors: updateCptCodeResult.data })))))];
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
        this.deleteCptCode = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
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
                        return [4 /*yield*/, cpt_code_service_1.default.deleteCptCode(req, model, next)];
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
        this.getCptCode = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, getCptCodeResult, error_4;
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
                        return [4 /*yield*/, cpt_code_service_1.default.getCptCode(req, model, next)];
                    case 3:
                        getCptCodeResult = _a.sent();
                        if (getCptCodeResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: getCptCodeResult.status_code, success: getCptCodeResult.success }, (getCptCodeResult.success
                                    ? { data: getCptCodeResult.data }
                                    : __assign({}, (getCptCodeResult.success
                                        ? { data: getCptCodeResult.data }
                                        : { errors: getCptCodeResult.data })))))];
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
        this.listCptCode = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listCptCodeResult, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(cpt_code_1.GetCptCodeListViewmodel, req.body)];
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
                        return [4 /*yield*/, cpt_code_service_1.default.listCptCode(req, model, next)];
                    case 3:
                        listCptCodeResult = _a.sent();
                        if (listCptCodeResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: listCptCodeResult.status_code, success: listCptCodeResult.success }, (listCptCodeResult.success
                                    ? { data: listCptCodeResult.data }
                                    : __assign({}, (listCptCodeResult.success
                                        ? { data: listCptCodeResult.data }
                                        : { errors: listCptCodeResult.data })))))];
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
        this.filterListCptCode = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listCodeResult, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(cpt_code_1.GetCptCodeListViewmodel, req.body)];
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
                        return [4 /*yield*/, cpt_code_service_1.default.filterListCptCode(req, model, next)];
                    case 3:
                        listCodeResult = _a.sent();
                        if (listCodeResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: listCodeResult.status_code, success: listCodeResult.success }, (listCodeResult.success
                                    ? { data: listCodeResult.data }
                                    : __assign({}, (listCodeResult.success
                                        ? { data: listCodeResult.data }
                                        : { errors: listCodeResult.data })))))];
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
        this.getCptCodeDataToExcel = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, exportCodeResult, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(cpt_code_1.GetCptCodeListViewmodel, req.body)];
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
                        return [4 /*yield*/, cpt_code_service_1.default.getCptCodeDataToExcel(req, model, next)];
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
                        error_7 = _a.sent();
                        next(error_7);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
    }
    return CptCode_Controller;
}());
exports.default = new CptCode_Controller();
