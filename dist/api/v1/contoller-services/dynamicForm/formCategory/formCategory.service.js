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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var erros_message_1 = __importDefault(require("../../../common/erros_message"));
var form_category_model_1 = __importDefault(require("../../../models/form_category.model"));
var history_model_1 = __importStar(require("../../../models/history.model"));
var FormCategoryServices = /** @class */ (function () {
    function FormCategoryServices() {
        var _this = this;
        this.addFormCategory = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, alreadyPresent, saveResult, addHistory, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        userDetails = req.user;
                        model.createdby_id = userDetails._id;
                        return [4 /*yield*/, form_category_model_1.default.findOne({
                                clinic_id: model.clinic_id,
                                category: model.category,
                            })];
                    case 1:
                        alreadyPresent = _a.sent();
                        if (!alreadyPresent) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                success: false,
                                data: {
                                    message: erros_message_1.default.ALREADY_EXIST_FORM_CATEGORY,
                                    error: erros_message_1.default.ON_ADD_ERROR,
                                },
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                            }];
                    case 2: return [4 /*yield*/, form_category_model_1.default.create(model)];
                    case 3:
                        saveResult = _a.sent();
                        if (!saveResult) return [3 /*break*/, 5];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "form category added",
                                type: history_model_1.EHistoryActivityTypeValues.CLINIC,
                                type_id: saveResult._id,
                            })];
                    case 4:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: {
                                    _id: saveResult._id,
                                    category: saveResult.category,
                                    isActive: saveResult.isActive,
                                    isDeleted: saveResult.isDeleted,
                                },
                            }];
                    case 5: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ON_ADD_FORM_CATEGORY,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.updateFormCategory = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, alreadyPresent, updateResult, addHistory, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        userDetails = req.user;
                        return [4 /*yield*/, form_category_model_1.default.findOne({
                                clinic_id: model.clinic_id,
                                category: model.category,
                                _id: { $ne: model._id },
                            })];
                    case 1:
                        alreadyPresent = _a.sent();
                        if (!alreadyPresent) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                success: false,
                                data: {
                                    message: erros_message_1.default.ALREADY_EXIST_FORM_CATEGORY,
                                    error: erros_message_1.default.ON_UPDATE_ERROR,
                                },
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                            }];
                    case 2: return [4 /*yield*/, form_category_model_1.default.findOneAndUpdate({ _id: model._id }, model, { new: true })];
                    case 3:
                        updateResult = _a.sent();
                        if (!updateResult) return [3 /*break*/, 5];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "Form category updated",
                                type: history_model_1.EHistoryActivityTypeValues.CLINIC,
                                type_id: model._id,
                            })];
                    case 4:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.UPDATE_SUCCESSFULL,
                                // data: {
                                //   _id: updateDynamicFormResult._id,
                                //   isActive: updateDynamicFormResult.isActive,
                                //   form_title: updateDynamicFormResult.form_title,
                                //   fields: updateDynamicFormResult.fields,
                                //   clinic_id: updateDynamicFormResult.clinic_id,
                                // },
                            }];
                    case 5: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ON_UPDATE_FORM_CATEGORY,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.deleteFormCategory = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, deleteResult, addHistory, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        userDetails = req.user;
                        return [4 /*yield*/, form_category_model_1.default.updateOne({ _id: req.params._id }, { isDeleted: true })];
                    case 1:
                        deleteResult = _a.sent();
                        if (!(deleteResult && deleteResult.modifiedCount > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "Form category deleted",
                                type: history_model_1.EHistoryActivityTypeValues.CLINIC,
                                type_id: req.params._id,
                            })];
                    case 2:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.DELETE_SUCCESSFULL,
                            }];
                    case 3: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ON_DELETE_FORM_CATEGORY,
                                error: erros_message_1.default.ON_DELETE_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getFormCategory = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var getResult, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, form_category_model_1.default.findOne({
                                _id: model._id,
                                // isActive: true,
                                // isDeleted: false,
                            })];
                    case 1:
                        getResult = _a.sent();
                        if (getResult) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: {
                                        _id: getResult._id,
                                        isActive: getResult.isActive,
                                        isDeleted: getResult.isDeleted,
                                        category: getResult.category,
                                    },
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_ON_GET_FORM_CATEGORY,
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
        this.listFormCategory = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var defaultPage, count, populateFeilds, condition, isEmptyNameOnlySpace, result, obj, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        defaultPage = void 0;
                        count = void 0;
                        defaultPage = model.pageNumber ? model.pageNumber : 1;
                        count = model.pageSize ? model.pageSize : 50;
                        populateFeilds = [];
                        condition = {
                        //isDeleted: false,
                        //isActive: true,
                        };
                        if (model.clinic_id)
                            condition.clinic_id = model.clinic_id;
                        if ("isActive" in model && model.isActive != undefined) {
                            condition.isActive = model.isActive;
                        }
                        if ("isDeleted" in model && model.isDeleted != undefined) {
                            condition.isDeleted = model.isDeleted;
                        }
                        if (model.search) {
                            isEmptyNameOnlySpace = /^\s*$/.test(model.search);
                            condition.category = {
                                $regex: model.search,
                                $options: "i",
                            };
                        }
                        return [4 /*yield*/, form_category_model_1.default.paginate(condition, __assign(__assign({ page: defaultPage }, (count > 0 ? { limit: count } : { pagination: false })), { populate: populateFeilds, select: { createdby_id: 0 }, sort: { createdAt: -1 } }))];
                    case 1:
                        result = _a.sent();
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
                                        message: erros_message_1.default.FORM_CATEGORY_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.filterListFormCategory = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var defaultPage, count, populateFeilds, condition, isEmptyNameOnlySpace, result, obj, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        defaultPage = void 0;
                        count = void 0;
                        defaultPage = model.pageNumber ? model.pageNumber : 1;
                        count = model.pageSize ? model.pageSize : 50;
                        populateFeilds = [];
                        condition = {
                            isDeleted: false,
                            //isActive: true,
                        };
                        if (model.clinic_id)
                            condition.clinic_id = model.clinic_id;
                        if ("isActive" in model && model.isActive != undefined) {
                            condition.isActive = model.isActive;
                        }
                        if (model.search) {
                            isEmptyNameOnlySpace = /^\s*$/.test(model.search);
                            condition.category = {
                                $regex: model.search,
                                $options: "i",
                            };
                        }
                        return [4 /*yield*/, form_category_model_1.default.find(condition, { category: 1, _id: 1 }, { $sort: { createdAt: -1 } }).lean()];
                    case 1:
                        result = _a.sent();
                        if (result && result.length) {
                            obj = {
                                data: result,
                                // count: result.totalDocs,
                                totalDocs: result.length,
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
                                        message: erros_message_1.default.FORM_CATEGORY_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        next(error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return FormCategoryServices;
}());
exports.default = new FormCategoryServices();
