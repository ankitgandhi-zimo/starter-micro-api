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
exports.EnumRole = void 0;
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var erros_message_1 = __importDefault(require("../../common/erros_message"));
var appointment_stage_model_1 = __importDefault(require("../../models/appointment_stage.model"));
var EnumRole;
(function (EnumRole) {
    EnumRole["PROVIDER"] = "provider";
})(EnumRole = exports.EnumRole || (exports.EnumRole = {}));
var AppointmentStageServices = /** @class */ (function () {
    function AppointmentStageServices() {
        var _this = this;
        this.addAppointmentStage = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var alreadyPresentAppointmentStage, saveAppointmentStageResult, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, appointment_stage_model_1.default.findOne({
                                doctor_id: model.doctor_id,
                                clinic_id: model.clinic_id,
                                appointment_id: model.appointment_id,
                            })];
                    case 1:
                        alreadyPresentAppointmentStage = _a.sent();
                        if (!alreadyPresentAppointmentStage) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                success: false,
                                data: {
                                    message: erros_message_1.default.ALREADY_EXIST_APPOINTMENTSTAGE,
                                    error: erros_message_1.default.ON_ADD_ERROR,
                                },
                                status_code: http_status_codes_1.default.OK,
                            }];
                    case 2: return [4 /*yield*/, appointment_stage_model_1.default.create(model)];
                    case 3:
                        saveAppointmentStageResult = _a.sent();
                        if (saveAppointmentStageResult) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: {
                                        stage: saveAppointmentStageResult.stage,
                                        clinic_id: saveAppointmentStageResult.clinic_id,
                                        doctor_id: saveAppointmentStageResult.doctor_id,
                                        appointment_id: saveAppointmentStageResult.appointment_id,
                                    },
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_ON_ADD_SKILL,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.OK,
                                }];
                        }
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
        this.updateAppointmentStage = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var updateAppointmentStageResult, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, appointment_stage_model_1.default.findOneAndUpdate({ _id: model._id }, model, {
                                new: true,
                            })];
                    case 1:
                        updateAppointmentStageResult = _a.sent();
                        if (updateAppointmentStageResult) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: {
                                        stage: updateAppointmentStageResult.stage,
                                        clinic_id: updateAppointmentStageResult.clinic_id,
                                        doctor_id: updateAppointmentStageResult.doctor_id,
                                        appointment_id: updateAppointmentStageResult.appointment_id,
                                    },
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_ON_UPDATE_APPOINTMENTSTAGE,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.OK,
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteAppointmentStage = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var deleteAppointmentStageResult, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, appointment_stage_model_1.default.updateOne({ _id: req.params._id }, { isDeleted: true })];
                    case 1:
                        deleteAppointmentStageResult = _a.sent();
                        if (deleteAppointmentStageResult &&
                            deleteAppointmentStageResult.modifiedCount > 0) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: true,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_ON_DELETE_APPOINTMENTSTAGE,
                                        error: erros_message_1.default.ON_DELETE_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getAppointmentStage = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var getAppointmentStageResult, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, appointment_stage_model_1.default.findOne({
                                _id: model._id,
                                isActive: true,
                                isDeleted: false,
                            })];
                    case 1:
                        getAppointmentStageResult = _a.sent();
                        if (getAppointmentStageResult) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: {
                                        stage: getAppointmentStageResult.stage,
                                        clinic_id: getAppointmentStageResult.clinic_id,
                                        doctor_id: getAppointmentStageResult.doctor_id,
                                        appointment_id: getAppointmentStageResult.appointment_id,
                                    },
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_ON_GET_APPOINTMENTSTAGE,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.listAppointmentStage = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var defaultPage, count, condition, isEmptyNameOnlySpace, response, tempResult, result, obj, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        defaultPage = void 0;
                        count = void 0;
                        condition = {
                            isDeleted: false,
                            isActive: true,
                        };
                        if (model.stage) {
                            isEmptyNameOnlySpace = /^\s*$/.test(model.stage);
                            condition.stage = {
                                $regex: model.stage,
                                $options: "i",
                            };
                        }
                        if (model.isActive) {
                            condition.isActive = model.isActive;
                        }
                        if (!(!model.pageNumber && !model.pageSize)) return [3 /*break*/, 2];
                        defaultPage = 1;
                        count = -1;
                        return [4 /*yield*/, appointment_stage_model_1.default.find(condition, {
                                createdAt: 0,
                                updatedAt: 0,
                                __v: 0,
                            }).sort({
                                createdAt: -1,
                            })];
                    case 1:
                        response = _a.sent();
                        if (response && response.length > 0) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: {
                                        data: response,
                                        // count: response.length,
                                        totalDocs: response.length,
                                        pageNumber: defaultPage,
                                        pageSize: response.length,
                                        totalPages: defaultPage,
                                    },
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.APPOINTMENTSTAGE_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        if (model.pageNumber && model.pageNumber >= 1 && !model.pageSize) {
                            defaultPage = model.pageNumber;
                            count = 50;
                        }
                        else {
                            defaultPage = model.pageNumber || 1;
                            count = model.pageSize || 50;
                        }
                        _a.label = 3;
                    case 3:
                        tempResult = void 0;
                        return [4 /*yield*/, appointment_stage_model_1.default.paginate(__assign(__assign({}, condition), { options: {
                                    projection: {
                                        createdAt: 0,
                                        updatedAt: 0,
                                        __v: 0,
                                    },
                                } }), __assign(__assign({ page: defaultPage }, (count > 0 ? { limit: count } : { pagination: false })), { 
                                //populate: populateFeilds,
                                sort: { createdAt: -1 } }))];
                    case 4:
                        result = _a.sent();
                        tempResult = result;
                        if (result && result.docs && result.docs.length > 0) {
                            obj = {
                                data: result.docs,
                                // count: result.totalDocs,
                                totalDocs: result.totalDocs,
                                pageNumber: result.page,
                                pageSize: result.limit,
                                totalPages: Math.ceil(result.totalDocs / result.limit),
                            };
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    data: obj,
                                    success: true,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.APPOINTMENTSTAGE_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
    }
    return AppointmentStageServices;
}());
exports.default = new AppointmentStageServices();
