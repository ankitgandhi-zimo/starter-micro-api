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
var billingTeam_1 = require("../../view-models/billingTeam");
var check_mongo_id_viewmodel_1 = require("../../view-models/check_mongo_id.viewmodel");
var billingTeam_service_1 = __importDefault(require("./billingTeam.service"));
var BillingTeam_Controller = /** @class */ (function () {
    function BillingTeam_Controller() {
        var _this = this;
        this.addBillingTeam = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, addBillingTeamResult, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(billingTeam_1.AddBillingTeamViewmodel, req.body)];
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
                        return [4 /*yield*/, billingTeam_service_1.default.addBillingTeam(req, model, next)];
                    case 3:
                        addBillingTeamResult = _a.sent();
                        if (addBillingTeamResult)
                            return [2 /*return*/, res
                                    .status(addBillingTeamResult.status_code)
                                    .json(__assign({ status_code: addBillingTeamResult.status_code, success: addBillingTeamResult.success }, (addBillingTeamResult.success
                                    ? { data: addBillingTeamResult.data }
                                    : __assign({}, (addBillingTeamResult.success
                                        ? { data: addBillingTeamResult.data }
                                        : {
                                            errors: addBillingTeamResult.data,
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
        this.updateBillingTeam = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, updateBillingTeamResult, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(billingTeam_1.UpdateBillingTeamViewmodel, req.body)];
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
                        return [4 /*yield*/, billingTeam_service_1.default.updateBillingTeam(req, model, next)];
                    case 3:
                        updateBillingTeamResult = _a.sent();
                        if (updateBillingTeamResult)
                            return [2 /*return*/, res
                                    .status(updateBillingTeamResult.status_code)
                                    .json(__assign({ status_code: updateBillingTeamResult.status_code, success: updateBillingTeamResult.success }, (updateBillingTeamResult.success
                                    ? { data: updateBillingTeamResult.data }
                                    : __assign({}, (updateBillingTeamResult.success
                                        ? {
                                            data: updateBillingTeamResult.data,
                                        }
                                        : {
                                            errors: updateBillingTeamResult.data,
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
        this.deleteBillingTeam = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, deleteBillingTeamResult, error_3;
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
                        return [4 /*yield*/, billingTeam_service_1.default.deleteBillingTeam(req, model, next)];
                    case 3:
                        deleteBillingTeamResult = _a.sent();
                        if (deleteBillingTeamResult)
                            return [2 /*return*/, res
                                    .status(deleteBillingTeamResult.status_code)
                                    .json(__assign({ status_code: deleteBillingTeamResult.status_code, success: deleteBillingTeamResult.success }, (deleteBillingTeamResult.success
                                    ? { data: deleteBillingTeamResult.data }
                                    : __assign({}, (deleteBillingTeamResult.success
                                        ? {
                                            data: deleteBillingTeamResult.data,
                                        }
                                        : {
                                            errors: deleteBillingTeamResult.data,
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
        this.getBillingTeam = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, getBillingTeamResult, error_4;
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
                        return [4 /*yield*/, billingTeam_service_1.default.getBillingTeam(req, model, next)];
                    case 3:
                        getBillingTeamResult = _a.sent();
                        if (getBillingTeamResult)
                            return [2 /*return*/, res
                                    .status(getBillingTeamResult.status_code)
                                    .json(__assign({ status_code: getBillingTeamResult.status_code, success: getBillingTeamResult.success }, (getBillingTeamResult.success
                                    ? { data: getBillingTeamResult.data }
                                    : __assign({}, (getBillingTeamResult.success
                                        ? { data: getBillingTeamResult.data }
                                        : {
                                            errors: getBillingTeamResult.data,
                                        })))))];
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
        this.addMember = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, assignResult, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(billingTeam_1.AssignMemberViewmodel, req.body)];
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
                        return [4 /*yield*/, billingTeam_service_1.default.addMember(req, model, next)];
                    case 3:
                        assignResult = _a.sent();
                        if (assignResult)
                            return [2 /*return*/, res.status(assignResult.status_code).json(__assign({ status_code: assignResult.status_code, success: assignResult.success }, (assignResult.success
                                    ? { data: assignResult.data }
                                    : __assign({}, (assignResult.success
                                        ? { data: assignResult.data }
                                        : { errors: assignResult.data })))))];
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
        this.listBillingTeam = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listBillingTeamResult, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(billingTeam_1.GetBillingTeamListViewmodel, req.body)];
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
                        return [4 /*yield*/, billingTeam_service_1.default.listBillingTeam(req, model, next)];
                    case 3:
                        listBillingTeamResult = _a.sent();
                        if (listBillingTeamResult)
                            return [2 /*return*/, res
                                    .status(listBillingTeamResult.status_code)
                                    .json(__assign({ status_code: listBillingTeamResult.status_code, success: listBillingTeamResult.success }, (listBillingTeamResult.success
                                    ? { data: listBillingTeamResult.data }
                                    : __assign({}, (listBillingTeamResult.success
                                        ? { data: listBillingTeamResult.data }
                                        : {
                                            errors: listBillingTeamResult.data,
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
        this.listBillingTeamMembers = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listBillingTeamResult, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(billingTeam_1.GetBillingTeamMembersListViewmodel, req.body)];
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
                        return [4 /*yield*/, billingTeam_service_1.default.listBillingTeamMembers(req, model, next)];
                    case 3:
                        listBillingTeamResult = _a.sent();
                        if (listBillingTeamResult)
                            return [2 /*return*/, res.status(http_status_codes_1.default.OK).json(__assign({ status_code: listBillingTeamResult.status_code, success: listBillingTeamResult.success }, (listBillingTeamResult.success
                                    ? { data: listBillingTeamResult.data }
                                    : __assign({}, (listBillingTeamResult.success
                                        ? { data: listBillingTeamResult.data }
                                        : {
                                            errors: listBillingTeamResult.data,
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
        this.listBillingTeamClinics = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listBillingTeamResult, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(billingTeam_1.GetBillingTeamClinicsListViewmodel, req.body)];
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
                        return [4 /*yield*/, billingTeam_service_1.default.listBillingTeamClinics(req, model, next)];
                    case 3:
                        listBillingTeamResult = _a.sent();
                        if (listBillingTeamResult)
                            return [2 /*return*/, res.status(http_status_codes_1.default.OK).json(__assign({ status_code: listBillingTeamResult.status_code, success: listBillingTeamResult.success }, (listBillingTeamResult.success
                                    ? { data: listBillingTeamResult.data }
                                    : __assign({}, (listBillingTeamResult.success
                                        ? { data: listBillingTeamResult.data }
                                        : {
                                            errors: listBillingTeamResult.data,
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
        this.assignMemberToTeam = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listBillingTeamResult, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(billingTeam_1.AssignMemberToTeamViewmodel, req.body)];
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
                        return [4 /*yield*/, billingTeam_service_1.default.assignMemberToTeam(req, model, next)];
                    case 3:
                        listBillingTeamResult = _a.sent();
                        if (listBillingTeamResult)
                            return [2 /*return*/, res
                                    .status(listBillingTeamResult.status_code)
                                    .json(__assign({ status_code: listBillingTeamResult.status_code, success: listBillingTeamResult.success }, (listBillingTeamResult.success
                                    ? { data: listBillingTeamResult.data }
                                    : __assign({}, (listBillingTeamResult.success
                                        ? { data: listBillingTeamResult.data }
                                        : {
                                            errors: listBillingTeamResult.data,
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
        this.removeMember = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, removeMemeberTeamResult, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(billingTeam_1.AssignMemberToTeamViewmodel, req.body)];
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
                        return [4 /*yield*/, billingTeam_service_1.default.removeMember(req, model, next)];
                    case 3:
                        removeMemeberTeamResult = _a.sent();
                        if (removeMemeberTeamResult)
                            return [2 /*return*/, res
                                    .status(removeMemeberTeamResult.status_code)
                                    .json(__assign({ status_code: removeMemeberTeamResult.status_code, success: removeMemeberTeamResult.success }, (removeMemeberTeamResult.success
                                    ? { data: removeMemeberTeamResult.data }
                                    : __assign({}, (removeMemeberTeamResult.success
                                        ? {
                                            data: removeMemeberTeamResult.data,
                                        }
                                        : {
                                            errors: removeMemeberTeamResult.data,
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
        this.removeAndAddNewTeamAssociation = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, removeMemeberTeamAssociationResult, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(billingTeam_1.UpdateMemberAssociationToTeamViewmodel, req.body)];
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
                        return [4 /*yield*/, billingTeam_service_1.default.removeAndAddNewTeamAssociation(req, model, next)];
                    case 3:
                        removeMemeberTeamAssociationResult = _a.sent();
                        if (removeMemeberTeamAssociationResult)
                            return [2 /*return*/, res
                                    .status(removeMemeberTeamAssociationResult.status_code)
                                    .json(__assign({ status_code: removeMemeberTeamAssociationResult.status_code, success: removeMemeberTeamAssociationResult.success }, (removeMemeberTeamAssociationResult.success
                                    ? {
                                        data: removeMemeberTeamAssociationResult.data,
                                    }
                                    : __assign({}, (removeMemeberTeamAssociationResult.success
                                        ? {
                                            data: removeMemeberTeamAssociationResult.data,
                                        }
                                        : {
                                            errors: removeMemeberTeamAssociationResult.data,
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
        this.filterListBillingTeam = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listBillingTeamResult, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(billingTeam_1.GetBillingTeamListViewmodel, req.body)];
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
                        return [4 /*yield*/, billingTeam_service_1.default.filterListBillingTeam(req, model, next)];
                    case 3:
                        listBillingTeamResult = _a.sent();
                        if (listBillingTeamResult)
                            return [2 /*return*/, res
                                    .status(listBillingTeamResult.status_code)
                                    .json(__assign({ status_code: listBillingTeamResult.status_code, success: listBillingTeamResult.success }, (listBillingTeamResult.success
                                    ? { data: listBillingTeamResult.data }
                                    : __assign({}, (listBillingTeamResult.success
                                        ? { data: listBillingTeamResult.data }
                                        : {
                                            errors: listBillingTeamResult.data,
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
        //filterListBillingTeam
        this.getBillingTeamDataToExcel = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listBillingTeamResult, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(billingTeam_1.GetBillingTeamListViewmodel, req.body)];
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
                        return [4 /*yield*/, billingTeam_service_1.default.getBillingTeamDataToExcel(req, model, next)];
                    case 3:
                        listBillingTeamResult = _a.sent();
                        if (listBillingTeamResult)
                            return [2 /*return*/, res
                                    .status(listBillingTeamResult.status_code)
                                    .json(__assign({ status_code: listBillingTeamResult.status_code, success: listBillingTeamResult.success }, (listBillingTeamResult.success
                                    ? { data: listBillingTeamResult.data }
                                    : __assign({}, (listBillingTeamResult.success
                                        ? { data: listBillingTeamResult.data }
                                        : {
                                            errors: listBillingTeamResult.data,
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
        this.getBillingTeamMembersDataToExcel = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listBillingTeamResult, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(billingTeam_1.GetBillingTeamMembersListViewmodel, req.body)];
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
                        return [4 /*yield*/, billingTeam_service_1.default.getBillingTeamMembersDataToExcel(req, model, next)];
                    case 3:
                        listBillingTeamResult = _a.sent();
                        if (listBillingTeamResult)
                            return [2 /*return*/, res
                                    .status(listBillingTeamResult.status_code)
                                    .json(__assign({ status_code: listBillingTeamResult.status_code, success: listBillingTeamResult.success }, (listBillingTeamResult.success
                                    ? { data: listBillingTeamResult.data }
                                    : __assign({}, (listBillingTeamResult.success
                                        ? { data: listBillingTeamResult.data }
                                        : {
                                            errors: listBillingTeamResult.data,
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
        // clinic assignment to billing team
        this.assignClinicToBillingTeam = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, assignResult, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(billingTeam_1.AssignClinicToTeamViewmodel, req.body)];
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
                        return [4 /*yield*/, billingTeam_service_1.default.assignClinicToBillingTeam(req, model, next)];
                    case 3:
                        assignResult = _a.sent();
                        if (assignResult)
                            return [2 /*return*/, res.status(assignResult.status_code).json(__assign({ status_code: assignResult.status_code, success: assignResult.success }, (assignResult.success
                                    ? { data: assignResult.data }
                                    : __assign({}, (assignResult.success
                                        ? { data: assignResult.data }
                                        : {
                                            errors: assignResult.data,
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
        this.UnAssignClinicToBillingTeam = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, unAssignResult, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(billingTeam_1.UnAssignClinicToTeamViewmodel, req.body)];
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
                        return [4 /*yield*/, billingTeam_service_1.default.UnAssignClinicToBillingTeam(req, model, next)];
                    case 3:
                        unAssignResult = _a.sent();
                        if (unAssignResult)
                            return [2 /*return*/, res
                                    .status(unAssignResult.status_code)
                                    .json(__assign({ status_code: unAssignResult.status_code, success: unAssignResult.success }, (unAssignResult.success
                                    ? { data: unAssignResult.data }
                                    : __assign({}, (unAssignResult.success
                                        ? { data: unAssignResult.data }
                                        : {
                                            errors: unAssignResult.data,
                                        })))))];
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
    }
    return BillingTeam_Controller;
}());
exports.default = new BillingTeam_Controller();
