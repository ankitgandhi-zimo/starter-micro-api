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
var waitingList_1 = require("../../view-models/waitingList");
var waitingList_service_1 = __importDefault(require("./waitingList.service"));
var WaitingList_Controller = /** @class */ (function () {
    function WaitingList_Controller() {
        var _this = this;
        this.addWaitingList = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, addWaitingListResult, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(waitingList_1.AddWaitingListViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.BAD_REQUEST).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, waitingList_service_1.default.addWaitingList(req, model, next)];
                    case 3:
                        addWaitingListResult = _a.sent();
                        if (addWaitingListResult)
                            return [2 /*return*/, res
                                    .status(addWaitingListResult.status_code)
                                    .json(__assign({ status_code: addWaitingListResult.status_code, success: addWaitingListResult.success }, (addWaitingListResult.success
                                    ? { data: addWaitingListResult.data }
                                    : __assign({}, (addWaitingListResult.success
                                        ? { data: addWaitingListResult.data }
                                        : {
                                            errors: addWaitingListResult.data,
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
        this.updateWaitingList = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, updateWaitingListResult, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(waitingList_1.UpdateWaitingListViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.BAD_REQUEST).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, waitingList_service_1.default.updateWaitingList(req, model, next)];
                    case 3:
                        updateWaitingListResult = _a.sent();
                        if (updateWaitingListResult)
                            return [2 /*return*/, res
                                    .status(updateWaitingListResult.status_code)
                                    .json(__assign({ status_code: updateWaitingListResult.status_code, success: updateWaitingListResult.success }, (updateWaitingListResult.success
                                    ? { data: updateWaitingListResult.data }
                                    : __assign({}, (updateWaitingListResult.success
                                        ? {
                                            data: updateWaitingListResult.data,
                                        }
                                        : {
                                            errors: updateWaitingListResult.data,
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
        // deleteSkill = async (req: Request, res: Response, next: NextFunction) => {
        //   try {
        //     let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        //       CheckMongoIdViewmodel,
        //       JSON.parse(`{"_id":"${req.params._id}"}`)
        //     );
        //     if (conversionResult.error && conversionResult.error.length > 0) {
        //       return res.status(HttpStatus.BAD_REQUEST).send({
        //         status_code: HttpStatus.BAD_REQUEST,
        //         success: false,
        //         errors: conversionResult.error[0],
        //       });
        //     } else {
        //       let model: CheckMongoIdViewmodel =
        //         conversionResult.data as CheckMongoIdViewmodel;
        //       let deleteSkillResult = await skillService.deleteSkill(
        //         req,
        //         model,
        //         next
        //       );
        //       if (deleteSkillResult)
        //         return res.status(deleteSkillResult.status_code).json({
        //           status_code: deleteSkillResult.status_code,
        //           success: deleteSkillResult.success,
        //           ...(deleteSkillResult.success
        //             ? { data: deleteSkillResult.data }
        //             : {
        //                 ...(deleteSkillResult.success
        //                   ? { data: deleteSkillResult.data }
        //                   : { errors: deleteSkillResult.data }),
        //               }),
        //         });
        //     }
        //   } catch (error) {
        //     next(error);
        //   }
        // };
        this.getWaitingList = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, getWaitingListResult, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(check_mongo_id_viewmodel_1.CheckMongoIdViewmodel, JSON.parse("{\"_id\":\"".concat(req.params._id, "\"}")))];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.BAD_REQUEST).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, waitingList_service_1.default.getWaitingList(req, model, next)];
                    case 3:
                        getWaitingListResult = _a.sent();
                        if (getWaitingListResult)
                            return [2 /*return*/, res
                                    .status(getWaitingListResult.status_code)
                                    .json(__assign({ status_code: getWaitingListResult.status_code, success: getWaitingListResult.success }, (getWaitingListResult.success
                                    ? { data: getWaitingListResult.data }
                                    : __assign({}, (getWaitingListResult.success
                                        ? { data: getWaitingListResult.data }
                                        : {
                                            errors: getWaitingListResult.data,
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
        this.listWaitingList = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listWaitingListResult, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(waitingList_1.GetWaitingListViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.BAD_REQUEST).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, waitingList_service_1.default.listWaitingList(req, model, next)];
                    case 3:
                        listWaitingListResult = _a.sent();
                        if (listWaitingListResult)
                            return [2 /*return*/, res
                                    .status(listWaitingListResult.status_code)
                                    .json(__assign({ status_code: listWaitingListResult.status_code, success: listWaitingListResult.success }, (listWaitingListResult.success
                                    ? { data: listWaitingListResult.data }
                                    : __assign({}, (listWaitingListResult.success
                                        ? { data: listWaitingListResult.data }
                                        : {
                                            errors: listWaitingListResult.data,
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
        this.getPatientWaitingDataToExcel = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, exportWaitingListResult, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(waitingList_1.GetWaitingListViewmodel, req.body)];
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
                        return [4 /*yield*/, waitingList_service_1.default.getPatientWaitingDataToExcel(req, model, next)];
                    case 3:
                        exportWaitingListResult = _a.sent();
                        if (exportWaitingListResult)
                            return [2 /*return*/, res.status(http_status_codes_1.default.OK).json(__assign({ status_code: exportWaitingListResult.status_code, success: exportWaitingListResult.success }, (exportWaitingListResult.success
                                    ? { data: exportWaitingListResult.data }
                                    : __assign({}, (exportWaitingListResult.success
                                        ? {
                                            data: exportWaitingListResult.data,
                                        }
                                        : {
                                            errors: exportWaitingListResult.data,
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
    }
    return WaitingList_Controller;
}());
exports.default = new WaitingList_Controller();
