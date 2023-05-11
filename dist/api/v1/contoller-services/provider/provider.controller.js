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
var provider_1 = require("../../view-models/provider");
var provider_service_1 = __importDefault(require("./provider.service"));
var Provider_Controller = /** @class */ (function () {
    function Provider_Controller() {
        var _this = this;
        this.addProvider = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, addProviderResult, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(provider_1.AddProviderViewmodel, req.body)];
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
                        return [4 /*yield*/, provider_service_1.default.addProvider(req, model, next)];
                    case 3:
                        addProviderResult = _a.sent();
                        if (addProviderResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: addProviderResult.status_code, success: addProviderResult.success }, (addProviderResult.success
                                    ? { data: addProviderResult.data }
                                    : __assign({}, (addProviderResult.success
                                        ? { data: addProviderResult.data }
                                        : { errors: addProviderResult.data })))))];
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
        this.updateProvider = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, updateProviderResult, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(provider_1.UpdateProviderViewmodel, req.body)];
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
                        return [4 /*yield*/, provider_service_1.default.updateProvider(req, model, next)];
                    case 3:
                        updateProviderResult = _a.sent();
                        if (updateProviderResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: updateProviderResult.status_code, success: updateProviderResult.success }, (updateProviderResult.success
                                    ? { data: updateProviderResult.data }
                                    : __assign({}, (updateProviderResult.success
                                        ? { data: updateProviderResult.data }
                                        : {
                                            errors: updateProviderResult.data,
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
        this.deleteProvider = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, deleteProviderResult, error_3;
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
                        return [4 /*yield*/, provider_service_1.default.deleteProvider(req, model, next)];
                    case 3:
                        deleteProviderResult = _a.sent();
                        if (deleteProviderResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: deleteProviderResult.status_code, success: deleteProviderResult.success }, (deleteProviderResult.success
                                    ? { data: deleteProviderResult.data }
                                    : __assign({}, (deleteProviderResult.success
                                        ? { data: deleteProviderResult.data }
                                        : {
                                            errors: deleteProviderResult.data,
                                        })))))];
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
        this.getProvider = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, getProviderResult, error_4;
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
                        return [4 /*yield*/, provider_service_1.default.getProvider(req, model, next)];
                    case 3:
                        getProviderResult = _a.sent();
                        if (getProviderResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: getProviderResult.status_code, success: getProviderResult.success }, (getProviderResult.success
                                    ? { data: getProviderResult.data }
                                    : __assign({}, (getProviderResult.success
                                        ? { data: getProviderResult.data }
                                        : { errors: getProviderResult.data })))))];
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
        this.listProvider = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listProviderResult, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(provider_1.GetProviderListViewmodel, req.body)];
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
                        return [4 /*yield*/, provider_service_1.default.listProvider(req, model, next)];
                    case 3:
                        listProviderResult = _a.sent();
                        if (listProviderResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: listProviderResult.status_code, success: listProviderResult.success }, (listProviderResult.success
                                    ? { data: listProviderResult.data }
                                    : __assign({}, (listProviderResult.success
                                        ? { data: listProviderResult.data }
                                        : {
                                            errors: listProviderResult.data,
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
        this.filterListProvider = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listProviderResult, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(provider_1.GetFilterProviderListViewmodel, req.body)];
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
                        return [4 /*yield*/, provider_service_1.default.filterListProvider(req, model, next)];
                    case 3:
                        listProviderResult = _a.sent();
                        if (listProviderResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: listProviderResult.status_code, success: listProviderResult.success }, (listProviderResult.success
                                    ? { data: listProviderResult.data }
                                    : __assign({}, (listProviderResult.success
                                        ? { data: listProviderResult.data }
                                        : {
                                            errors: listProviderResult.data,
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
        this.updateAppointmentType = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listProviderResult, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(provider_1.UpdateAppointmentTypeViewmodel, req.body)];
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
                        return [4 /*yield*/, provider_service_1.default.updateAppointmentType(req, model, next)];
                    case 3:
                        listProviderResult = _a.sent();
                        if (listProviderResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: listProviderResult.status_code, success: listProviderResult.success }, (listProviderResult.success
                                    ? { data: listProviderResult.data }
                                    : __assign({}, (listProviderResult.success
                                        ? { data: listProviderResult.data }
                                        : {
                                            errors: listProviderResult.data,
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
        this.updateLocation = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listProviderResult, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(provider_1.UpdateLocationViewmodel, req.body)];
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
                        return [4 /*yield*/, provider_service_1.default.updateLocation(req, model, next)];
                    case 3:
                        listProviderResult = _a.sent();
                        if (listProviderResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: listProviderResult.status_code, success: listProviderResult.success }, (listProviderResult.success
                                    ? { data: listProviderResult.data }
                                    : __assign({}, (listProviderResult.success
                                        ? { data: listProviderResult.data }
                                        : {
                                            errors: listProviderResult.data,
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
        this.listAppointmentType = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listProviderResult, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(provider_1.GetAppointmentTypeListViewmodel, req.body)];
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
                        return [4 /*yield*/, provider_service_1.default.listAppointmentType(req, model, next)];
                    case 3:
                        listProviderResult = _a.sent();
                        if (listProviderResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: listProviderResult.status_code, success: listProviderResult.success }, (listProviderResult.success
                                    ? { data: listProviderResult.data }
                                    : __assign({}, (listProviderResult.success
                                        ? { data: listProviderResult.data }
                                        : {
                                            errors: listProviderResult.data,
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
        this.listLocation = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listProviderResult, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(provider_1.GetAppointmentTypeListViewmodel, req.body)];
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
                        return [4 /*yield*/, provider_service_1.default.listLocation(req, model, next)];
                    case 3:
                        listProviderResult = _a.sent();
                        if (listProviderResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: listProviderResult.status_code, success: listProviderResult.success }, (listProviderResult.success
                                    ? { data: listProviderResult.data }
                                    : __assign({}, (listProviderResult.success
                                        ? { data: listProviderResult.data }
                                        : {
                                            errors: listProviderResult.data,
                                        })))))];
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
        this.filterListLocations = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listProviderResult, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(provider_1.GetFilterListViewmodel, req.body)];
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
                        return [4 /*yield*/, provider_service_1.default.filterListLocations(req, model, next)];
                    case 3:
                        listProviderResult = _a.sent();
                        if (listProviderResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: listProviderResult.status_code, success: listProviderResult.success }, (listProviderResult.success
                                    ? { data: listProviderResult.data }
                                    : __assign({}, (listProviderResult.success
                                        ? { data: listProviderResult.data }
                                        : {
                                            errors: listProviderResult.data,
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
        this.filterListApptType = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listProviderResult, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(provider_1.GetFilterListViewmodel, req.body)];
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
                        return [4 /*yield*/, provider_service_1.default.filterListApptType(req, model, next)];
                    case 3:
                        listProviderResult = _a.sent();
                        if (listProviderResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: listProviderResult.status_code, success: listProviderResult.success }, (listProviderResult.success
                                    ? { data: listProviderResult.data }
                                    : __assign({}, (listProviderResult.success
                                        ? { data: listProviderResult.data }
                                        : {
                                            errors: listProviderResult.data,
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
        //filterListLocations
        this.getAssignedApptType = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listProviderResult, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(provider_1.GetAppointmentTypeListViewmodel, req.body)];
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
                        return [4 /*yield*/, provider_service_1.default.getAssignedApptType(req, model, next)];
                    case 3:
                        listProviderResult = _a.sent();
                        if (listProviderResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: listProviderResult.status_code, success: listProviderResult.success }, (listProviderResult.success
                                    ? { data: listProviderResult.data }
                                    : __assign({}, (listProviderResult.success
                                        ? { data: listProviderResult.data }
                                        : {
                                            errors: listProviderResult.data,
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
        this.getProviderDataToExcel = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listResult, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(provider_1.GetProviderListViewmodel, req.body)];
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
                        return [4 /*yield*/, provider_service_1.default.getProviderDataToExcel(req, model, next)];
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
                        error_14 = _a.sent();
                        next(error_14);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.fetchProviders = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listResult, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(provider_1.FetchProviderViewmodel, req.body)];
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
                        return [4 /*yield*/, provider_service_1.default.fetchProviders(req, model, next)];
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
                        error_15 = _a.sent();
                        next(error_15);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        //fetchProviders
    }
    return Provider_Controller;
}());
exports.default = new Provider_Controller();
