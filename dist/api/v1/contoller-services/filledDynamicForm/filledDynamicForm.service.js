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
var erros_message_1 = __importDefault(require("../../common/erros_message"));
var filled_dynamic_form_model_1 = __importDefault(require("../../models/filled_dynamic_form.model"));
var dynamic_form_model_1 = __importDefault(require("../../models/dynamic_form.model"));
var history_model_1 = __importStar(require("../../models/history.model"));
var EnumRole;
(function (EnumRole) {
    EnumRole["PROVIDER"] = "provider";
})(EnumRole = exports.EnumRole || (exports.EnumRole = {}));
var FilledDynamicFormServices = /** @class */ (function () {
    function FilledDynamicFormServices() {
        var _this = this;
        this.addFilledDynamicForm = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, alreadyPresentForm, saveDynamicFormResult, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        userDetails = req.user;
                        model.createdby_id = userDetails._id;
                        return [4 /*yield*/, filled_dynamic_form_model_1.default.findOne({
                                patient_id: model.patient_id,
                                clinic_id: model.clinic_id,
                                provider_id: model.provider_id,
                                form_id: model.form_id,
                            })];
                    case 1:
                        alreadyPresentForm = _a.sent();
                        if (!alreadyPresentForm) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                success: false,
                                data: {
                                    message: erros_message_1.default.ALREADY_EXIST_FILLED_DYNAMIC_FORM,
                                    error: erros_message_1.default.ON_ADD_ERROR,
                                },
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                            }];
                    case 2: return [4 /*yield*/, filled_dynamic_form_model_1.default.create(model)];
                    case 3:
                        saveDynamicFormResult = _a.sent();
                        if (saveDynamicFormResult) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: erros_message_1.default.FORM_SHARED_SUCCESS,
                                    // {
                                    //   _id: saveDynamicFormResult._id,
                                    //   isActive: saveDynamicFormResult.isActive,
                                    //   field_data: saveDynamicFormResult.field_data,
                                    //   form_id: saveDynamicFormResult.form_id,
                                    //   clinic_id: saveDynamicFormResult.clinic_id,
                                    //   status: saveDynamicFormResult.status,
                                    // },
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.FORM_SHARED_FAILED,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
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
        this.updateFilledDynamicForm = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, updateData, formStatus, updateDynamicFormResult, addHistory, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        userDetails = req.user;
                        updateData = {};
                        updateData = model;
                        return [4 /*yield*/, filled_dynamic_form_model_1.default.findOne({ _id: model._id }, { status: 1 })];
                    case 1:
                        formStatus = _a.sent();
                        if (updateData.remarks) {
                            updateData.remarks = {
                                remark: updateData.remarks,
                                by: userDetails._id,
                            };
                            updateData.$push = { remarks: updateData.remarks };
                            delete updateData.remarks;
                        }
                        if (formStatus) {
                            if (updateData.status && updateData.status == "VIEWED") {
                                updateData.received_date = new Date();
                            }
                        }
                        return [4 /*yield*/, filled_dynamic_form_model_1.default.findOneAndUpdate({ _id: model._id }, updateData, { new: true })];
                    case 2:
                        updateDynamicFormResult = _a.sent();
                        if (!updateDynamicFormResult) return [3 /*break*/, 4];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "form updated",
                                type: history_model_1.EHistoryActivityTypeValues.CLINIC,
                                type_id: updateDynamicFormResult.clinic_id,
                            })];
                    case 3:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.UPDATE_SUCCESSFULL,
                                // data: {
                                //   _id: updateDynamicFormResult._id,
                                //   isActive: updateDynamicFormResult.isActive,
                                //   field_data: updateDynamicFormResult.field_data,
                                //   form_id: updateDynamicFormResult.form_id,
                                //   clinic_id: updateDynamicFormResult.clinic_id,
                                // },
                            }];
                    case 4: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ON_UPDATE_DYNAMIC_FORM,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.deleteFilledDynamicForm = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var deleteDynamicFormResult, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, filled_dynamic_form_model_1.default.updateOne({ _id: req.params._id }, { isDeleted: true })];
                    case 1:
                        deleteDynamicFormResult = _a.sent();
                        if (deleteDynamicFormResult &&
                            deleteDynamicFormResult.modifiedCount > 0) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: erros_message_1.default.DELETE_SUCCESSFULL,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_ON_DELETE_FILLED_DYNAMIC_FORM,
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
        this.getFilledDynamicForm = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var getDynamicFormResult, updatedData_1, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, filled_dynamic_form_model_1.default.findOne({
                                _id: model._id,
                                // isActive: true,
                                // isDeleted: false,
                            }).populate([
                                {
                                    path: "remarks.by",
                                    select: { _id: 1, first_name: 1, last_name: 1 },
                                },
                                {
                                    path: "form_id",
                                    select: { _id: 1, form_title: 1, fields: 1 },
                                },
                            ])];
                    case 1:
                        getDynamicFormResult = _a.sent();
                        if (getDynamicFormResult) {
                            updatedData_1 = [];
                            updatedData_1 = getDynamicFormResult;
                            // if (
                            //   updatedData.form_id &&
                            //   updatedData.form_id!.fields &&
                            //   updatedData.form_id!.fields.length > 0
                            // ) {
                            //   updatedData.form_id.fields.forEach((d: any, i: number) => {
                            //     updatedData.field_data.forEach((e: any) => {
                            //       if (d._id!.toString() == e.id!.toString()) {
                            //         if (d.input_type == "checkbox") {
                            //           updatedData.form_id.fields[i].default = e.value
                            //             ? e.value
                            //             : [];
                            //         } else updatedData.form_id.fields[i].default = e.value;
                            //       }
                            //     });
                            //   });
                            // }
                            if (updatedData_1.form_id.fields &&
                                updatedData_1.form_id.fields.length > 0) {
                                if (updatedData_1.field_data && updatedData_1.field_data.length > 0) {
                                    updatedData_1.form_id.fields.forEach(function (d, i) {
                                        var found_obj = updatedData_1.field_data.find(function (e) { return e.id.toString() == d._id.toString(); });
                                        if (found_obj) {
                                            updatedData_1.form_id.fields[i].default = found_obj.value;
                                        }
                                        else {
                                            if (d.input_type == "checkbox") {
                                                updatedData_1.form_id.fields[i].default = [];
                                            }
                                        }
                                    });
                                }
                                else {
                                    updatedData_1.form_id.fields.forEach(function (d, i) {
                                        if (d.input_type == "checkbox") {
                                            updatedData_1.form_id.fields[i].default = [];
                                        }
                                    });
                                }
                            }
                            //console.log(getDynamicFormResult);
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: {
                                        _id: updatedData_1._id,
                                        isActive: updatedData_1.isActive,
                                        field_data: updatedData_1.field_data,
                                        remarks: updatedData_1.remarks,
                                        form_id: updatedData_1.form_id,
                                        clinic_id: updatedData_1.clinic_id,
                                    },
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_ON_GET_FILLED_DYNAMIC_FORM,
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
        this.listFilledDynamicForm = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var defaultPage, count, child_condition, isEmptyNameOnlySpace, populateFeilds, condition, result, dataArray_1, obj, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        defaultPage = void 0;
                        count = void 0;
                        defaultPage = model.pageNumber ? model.pageNumber : 1;
                        count = model.pageSize ? model.pageSize : 50;
                        child_condition = {};
                        if (model.search) {
                            isEmptyNameOnlySpace = /^\s*$/.test(model.search);
                            child_condition.form_title = {
                                $regex: model.search,
                                $options: "i",
                            };
                        }
                        populateFeilds = [
                            {
                                path: "form_id",
                                // match: child_condition,
                                select: { _id: 1, form_title: 1 },
                            },
                        ];
                        condition = {
                            isDeleted: false,
                            //isActive: true,
                        };
                        condition.patient_id = model.patient_id;
                        condition.clinic_id = model.clinic_id;
                        if (model.isActive) {
                            condition.isActive = model.isActive;
                        }
                        if (model.status) {
                            condition.status = model.status;
                        }
                        return [4 /*yield*/, filled_dynamic_form_model_1.default.paginate(condition, __assign(__assign({ page: defaultPage }, (count > 0 ? { limit: count } : { pagination: false })), { populate: populateFeilds, select: {
                                    isDeleted: 0,
                                    isActive: 0,
                                    status: 0,
                                    field_data: 0,
                                    clinic_id: 0,
                                    patient_id: 0,
                                    provider_id: 0,
                                    remarks: 0,
                                    __v: 0,
                                }, sort: { createdAt: -1 } }))];
                    case 1:
                        result = _a.sent();
                        if (result && result.docs && result.docs.length > 0) {
                            dataArray_1 = [];
                            result.docs.forEach(function (e, i) {
                                var tempObj = {
                                    _id: e._id,
                                    filledPercentage: e.filledPercentage,
                                    form_title: e.form_id.form_title,
                                    createdAt: e.createdAt,
                                    received_date: e.received_date,
                                    updatedAt: e.updatedAt,
                                };
                                dataArray_1.push(tempObj);
                                // if (e.form_id) {
                                // }
                                // dataArray[i].form_title = e.form_id.form_title
                                //   ? e.form_id.form_title
                                //   : "";
                            });
                            obj = {
                                data: dataArray_1,
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
                                        message: erros_message_1.default.FILLED_DYNAMIC_FORM_LIST_NOT_FOUND,
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
        this.sendForm = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, formData, toAddArray_1, addedForm, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        userDetails = req.user;
                        model.createdby_id = userDetails._id;
                        return [4 /*yield*/, dynamic_form_model_1.default.find({
                                _id: { $in: model.form_ids },
                            })];
                    case 1:
                        formData = _a.sent();
                        toAddArray_1 = [];
                        formData.forEach(function (data) {
                            toAddArray_1.push({
                                patient_id: model.patient_id,
                                clinic_id: model.clinic_id,
                                form_id: data._id,
                                createdby_id: model.createdby_id,
                            });
                        });
                        if (!(toAddArray_1 && toAddArray_1.length)) return [3 /*break*/, 3];
                        return [4 /*yield*/, filled_dynamic_form_model_1.default.create(toAddArray_1)];
                    case 2:
                        addedForm = _a.sent();
                        if (addedForm) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: erros_message_1.default.FORM_ASSIGNED_SUCCESS,
                                    // {
                                    //   _id: saveDynamicFormResult._id,
                                    //   isActive: saveDynamicFormResult.isActive,
                                    //   field_data: saveDynamicFormResult.field_data,
                                    //   form_id: saveDynamicFormResult.form_id,
                                    //   clinic_id: saveDynamicFormResult.clinic_id,
                                    //   status: saveDynamicFormResult.status,
                                    // },
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.FORM_ASSIGNED_FAILED,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        return [3 /*break*/, 4];
                    case 3: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.FORM_ASSIGNED_FAILED,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_6 = _a.sent();
                        next(error_6);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        //sendForm
    }
    return FilledDynamicFormServices;
}());
exports.default = new FilledDynamicFormServices();
