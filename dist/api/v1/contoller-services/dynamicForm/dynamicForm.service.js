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
exports.EnumRole = void 0;
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var lodash_1 = __importDefault(require("lodash"));
var mongoose_1 = __importDefault(require("mongoose"));
var erros_message_1 = __importDefault(require("../../common/erros_message"));
var dynamic_form_model_1 = __importDefault(require("../../models/dynamic_form.model"));
var history_model_1 = __importStar(require("../../models/history.model"));
var EnumRole;
(function (EnumRole) {
    EnumRole["PROVIDER"] = "provider";
})(EnumRole = exports.EnumRole || (exports.EnumRole = {}));
var DynamicFormServices = /** @class */ (function () {
    function DynamicFormServices() {
        var _this = this;
        this.addDynamicForm = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, alreadyPresentForm, saveDynamicFormResult, addHistory, getDynamicForm, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        userDetails = req.user;
                        model.createdby_id = userDetails._id;
                        return [4 /*yield*/, dynamic_form_model_1.default.findOne({
                                form_title: model.form_title,
                                category: model.category,
                                clinic_id: model.clinic_id,
                            })];
                    case 1:
                        alreadyPresentForm = _a.sent();
                        if (!alreadyPresentForm) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                success: false,
                                data: {
                                    message: erros_message_1.default.ALREADY_EXIST_DYNAMIC_FORM,
                                    error: erros_message_1.default.ON_ADD_ERROR,
                                },
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                            }];
                    case 2: return [4 /*yield*/, dynamic_form_model_1.default.create(model)];
                    case 3:
                        saveDynamicFormResult = _a.sent();
                        if (!saveDynamicFormResult) return [3 /*break*/, 6];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "dynamic form added",
                                type: history_model_1.EHistoryActivityTypeValues.CLINIC,
                                type_id: saveDynamicFormResult._id,
                            })];
                    case 4:
                        addHistory = _a.sent();
                        return [4 /*yield*/, dynamic_form_model_1.default.aggregate([
                                {
                                    $match: { _id: saveDynamicFormResult._id },
                                },
                                {
                                    $lookup: {
                                        from: "form_category",
                                        let: { cat_id: "$category" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$_id", "$$cat_id"],
                                                    },
                                                },
                                            },
                                            { $project: { category: 1, _id: 1 } },
                                        ],
                                        as: "categoryData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$categoryData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                            ])];
                    case 5:
                        getDynamicForm = _a.sent();
                        if (getDynamicForm && getDynamicForm.length) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: {
                                        _id: getDynamicForm[0]._id,
                                        isActive: getDynamicForm[0].isActive,
                                        form_title: getDynamicForm[0].form_title,
                                        categoryData: getDynamicForm[0].categoryData,
                                        fields: getDynamicForm[0].fields,
                                        clinic_id: getDynamicForm[0].clinic_id,
                                        saveAsDraft: getDynamicForm[0].saveAsDraft,
                                    },
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_ON_GET_DYNAMIC_FORM,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ON_ADD_DYNAMIC_FORM,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.updateDynamicForm = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, alreadyPresentForm, updateDynamicFormResult, addHistory, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        userDetails = req.user;
                        return [4 /*yield*/, dynamic_form_model_1.default.findOne({
                                form_title: model.form_title,
                                _id: { $ne: model._id },
                            })];
                    case 1:
                        alreadyPresentForm = _a.sent();
                        if (!alreadyPresentForm) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                success: false,
                                data: {
                                    message: erros_message_1.default.ALREADY_EXIST_DYNAMIC_FORM,
                                    error: erros_message_1.default.ON_UPDATE_ERROR,
                                },
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                            }];
                    case 2: return [4 /*yield*/, dynamic_form_model_1.default.findOneAndUpdate({ _id: model._id }, model, { new: true })];
                    case 3:
                        updateDynamicFormResult = _a.sent();
                        if (!updateDynamicFormResult) return [3 /*break*/, 5];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "dynamic form updated",
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
                                message: erros_message_1.default.ERROR_ON_UPDATE_DYNAMIC_FORM,
                                error: erros_message_1.default.ON_ADD_ERROR,
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
        this.deleteDynamicForm = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, deleteDynamicFormResult, addHistory, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        userDetails = req.user;
                        return [4 /*yield*/, dynamic_form_model_1.default.updateOne({ _id: req.params._id }, { isDeleted: true })];
                    case 1:
                        deleteDynamicFormResult = _a.sent();
                        if (!(deleteDynamicFormResult &&
                            deleteDynamicFormResult.modifiedCount > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "dynamic form deleted",
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
                                message: erros_message_1.default.ERROR_ON_DELETE_DYNAMIC_FORM,
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
        this.getDynamicForm = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var getDynamicForm, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, dynamic_form_model_1.default.aggregate([
                                {
                                    $match: {
                                        _id: new mongoose_1.default.Types.ObjectId(model._id),
                                        // isActive: true,
                                        // isDeleted: false,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "form_category",
                                        let: { cat_id: "$category" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$_id", "$$cat_id"],
                                                    },
                                                },
                                            },
                                            { $project: { category: 1, _id: 1 } },
                                        ],
                                        as: "categoryData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$categoryData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                            ])];
                    case 1:
                        getDynamicForm = _a.sent();
                        if (getDynamicForm && getDynamicForm.length) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: {
                                        _id: getDynamicForm[0]._id,
                                        isActive: getDynamicForm[0].isActive,
                                        form_title: getDynamicForm[0].form_title,
                                        categoryData: getDynamicForm[0].categoryData,
                                        fields: getDynamicForm[0].fields,
                                        clinic_id: getDynamicForm[0].clinic_id,
                                        saveAsDraft: getDynamicForm[0].saveAsDraft,
                                    },
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_ON_GET_DYNAMIC_FORM,
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
        this.listDynamicForm = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var defaultPage, count, populateFeilds, condition, isEmptyNameOnlySpace, result, obj, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        defaultPage = void 0;
                        count = void 0;
                        defaultPage = model.pageNumber ? model.pageNumber : 1;
                        count = model.pageSize ? model.pageSize : 50;
                        populateFeilds = [
                            {
                                path: "category",
                                select: { _id: 1, category: 1 },
                            },
                        ];
                        condition = {
                            isDeleted: false,
                            //isActive: true,
                        };
                        if ("saveAsDraft" in model && model.saveAsDraft != undefined) {
                            condition.saveAsDraft = model.saveAsDraft;
                        }
                        if ("isActive" in model && model.isActive != undefined) {
                            condition.isActive = model.isActive;
                        }
                        if (model.clinic_id) {
                            condition.clinic_id = model.clinic_id;
                        }
                        if (model.search) {
                            isEmptyNameOnlySpace = /^\s*$/.test(model.search);
                            condition.form_title = {
                                $regex: model.search,
                                $options: "i",
                            };
                        }
                        return [4 /*yield*/, dynamic_form_model_1.default.paginate(condition, __assign(__assign({ page: defaultPage }, (count > 0 ? { limit: count } : { pagination: false })), { populate: populateFeilds, select: { fields: 0, createdby_id: 0, __v: 0 }, sort: { createdAt: -1 } }))];
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
                                        message: erros_message_1.default.DYNAMIC_FORM_LIST_NOT_FOUND,
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
        this.importDynamicForm = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, alreadyPresentForm, formData_1, saveObjArray_1, importDynamicFormResult, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        userDetails = req.user;
                        model.createdby_id = userDetails._id;
                        model.form_ids = lodash_1.default.uniq(model.form_ids);
                        return [4 /*yield*/, dynamic_form_model_1.default.find({
                                form_id: { $in: model.form_ids },
                                // category: model.category,
                                clinic_id: model.clinic_id,
                            })];
                    case 1:
                        alreadyPresentForm = _a.sent();
                        if (!(alreadyPresentForm &&
                            alreadyPresentForm.length == model.form_ids.length)) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                success: false,
                                data: {
                                    message: erros_message_1.default.ALREADY_EXIST_DYNAMIC_FORM,
                                    error: erros_message_1.default.ON_ADD_ERROR,
                                },
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                            }];
                    case 2:
                        //removing present forms from model.form_ids
                        if (alreadyPresentForm) {
                            alreadyPresentForm.forEach(function (e) {
                                //if (e.clinic) {
                                if (model.form_ids.includes(e.form_id.toString())) {
                                    var index = model.form_ids.indexOf(e.form_id.toString());
                                    if (index !== -1) {
                                        //found
                                        model.form_ids.splice(index, 1);
                                    }
                                }
                                // }
                            });
                        }
                        return [4 /*yield*/, dynamic_form_model_1.default.find({
                                _id: { $in: model.form_ids },
                            })];
                    case 3:
                        formData_1 = _a.sent();
                        if (!formData_1) return [3 /*break*/, 5];
                        saveObjArray_1 = [];
                        model.form_ids.forEach(function (e) {
                            formData_1.forEach(function (f) {
                                if (f._id.toString() == e.toString()) {
                                    saveObjArray_1.push({
                                        form_title: f.form_title,
                                        fields: f.fields,
                                        category: f.category,
                                        import: true,
                                        form_id: e,
                                        clinic_id: model.clinic_id,
                                    });
                                }
                            });
                        });
                        return [4 /*yield*/, dynamic_form_model_1.default.insertMany(saveObjArray_1)];
                    case 4:
                        importDynamicFormResult = _a.sent();
                        if (importDynamicFormResult) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: erros_message_1.default.DYNAMIC_FORM_IMPORT_SUCCESSFULL,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.DYNAMIC_FORM_IMPORT_FAILED,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        return [3 /*break*/, 6];
                    case 5: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ON_GET_DYNAMIC_FORM,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_6 = _a.sent();
                        next(error_6);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.categoryCount = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var condition, isEmptyNameOnlySpace, result, obj, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        condition = {};
                        if (model.search) {
                            isEmptyNameOnlySpace = /^\s*$/.test(model.search);
                            condition.form_title = {
                                $regex: model.search,
                                $options: "i",
                            };
                        }
                        condition.isActive = true;
                        condition.isDeleted = false;
                        condition.clinic_id = null;
                        return [4 /*yield*/, dynamic_form_model_1.default.aggregate([
                                {
                                    $match: condition,
                                },
                                {
                                    $group: { _id: "$category", count: { $sum: 1 } },
                                },
                                {
                                    $lookup: {
                                        from: "form_category",
                                        let: { cat_id: "$_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$_id", "$$cat_id"],
                                                    },
                                                },
                                            },
                                            { $project: { category: 1, _id: 1 } },
                                        ],
                                        as: "categoryData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$categoryData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $project: {
                                        // category_id: "$_id",
                                        count: 1,
                                        category: "$categoryData.category",
                                    },
                                },
                            ])];
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
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.FORM_CATEGORY_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _a.sent();
                        next(error_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.filterListForm = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var condition, isEmptyNameOnlySpace, result, obj, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        condition = {};
                        condition.isActive = true;
                        condition.isDeleted = false;
                        condition.clinic_id = null;
                        if (model.category)
                            condition.category = model.category;
                        if (model.search) {
                            isEmptyNameOnlySpace = /^\s*$/.test(model.search);
                            condition.form_title = {
                                $regex: model.search,
                                $options: "i",
                            };
                        }
                        return [4 /*yield*/, dynamic_form_model_1.default.find(condition, {
                                _id: 1,
                                form_title: 1,
                                category: 1,
                            }).populate({
                                path: "category",
                                select: { _id: 1, category: 1 },
                            })];
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
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.DYNAMIC_FORM_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_8 = _a.sent();
                        next(error_8);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return DynamicFormServices;
}());
exports.default = new DynamicFormServices();
