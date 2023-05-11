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
var fs_1 = __importDefault(require("fs"));
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var mongoose_1 = __importDefault(require("mongoose"));
var path_1 = __importDefault(require("path"));
var xlsx_populate_1 = __importDefault(require("xlsx-populate"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var erros_message_1 = __importDefault(require("../../common/erros_message"));
var history_model_1 = __importStar(require("../../models/history.model"));
var eap_model_1 = __importDefault(require("../../models/insurance/eap.model"));
var hmo_model_1 = __importDefault(require("../../models/insurance/hmo.model"));
var insurance_model_1 = __importDefault(require("../../models/insurance/insurance.model"));
var insurance_companies_model_1 = __importDefault(require("../../models/insurance/insurance_companies.model"));
var ppo_model_1 = __importDefault(require("../../models/insurance/ppo.model"));
var roles_model_1 = __importDefault(require("../../models/roles.model"));
var InsuranceServices = /** @class */ (function () {
    function InsuranceServices() {
        var _this = this;
        this.addInsurance = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var patientRole, userDetails, modelToSave, response, addHistory, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, roles_model_1.default.findOne({
                                roleName: "patient",
                            })];
                    case 1:
                        patientRole = _a.sent();
                        userDetails = req.user;
                        modelToSave = model;
                        modelToSave.createdby_id = userDetails._id;
                        return [4 /*yield*/, insurance_model_1.default.create(modelToSave)];
                    case 2:
                        response = _a.sent();
                        console.log(model);
                        if (!response) return [3 /*break*/, 4];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "patient insurance added successfully",
                                type: history_model_1.EHistoryActivityTypeValues.PATIENT,
                                type_id: model.patient_id,
                            })];
                    case 3:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: response,
                            }];
                    case 4: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ADD_INSURANCE,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.updateInsurance = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, foundInsuranceDetails, modelToSave, response, addHistory, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        userDetails = req.user;
                        return [4 /*yield*/, insurance_model_1.default.findOne({
                                _id: model._id,
                                // isDeleted: false,
                            })];
                    case 1:
                        foundInsuranceDetails = _a.sent();
                        if (!foundInsuranceDetails) return [3 /*break*/, 6];
                        modelToSave = model;
                        modelToSave.createdby_id = foundInsuranceDetails.createdby_id;
                        modelToSave.clinic_id = foundInsuranceDetails.clinic_id;
                        return [4 /*yield*/, insurance_model_1.default.updateOne({ _id: model._id }, modelToSave)];
                    case 2:
                        response = _a.sent();
                        if (!(response && response.modifiedCount > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "patient insurnace details updated successfully",
                                type: history_model_1.EHistoryActivityTypeValues.PATIENT,
                                type_id: foundInsuranceDetails.patient_id,
                            })];
                    case 3:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.UPDATE_SUCCESSFULL,
                            }];
                    case 4: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_UPDATE_INSURANCE,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.INSURANCE_DETAILS_NOT_FOUND,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                        }];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.getInsuranceDetails = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var foundInsuranceDetails, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, insurance_model_1.default.findOne({
                                _id: req.params._id,
                                isDeleted: false,
                            }).populate([
                                {
                                    path: "clinic_id",
                                    select: { clinic_name: 1 },
                                },
                                // {
                                //   path: "createdby_id",
                                //   select: { first_name: 1, last_name: 1 },
                                // },
                                // {
                                //   path: "patient_id",
                                //   select: {
                                //     first_name: 1,
                                //     middle_name: 1,
                                //     last_name: 1,
                                //   },
                                // },
                                {
                                    path: "insurance_company_id",
                                    select: { company_name: 1 },
                                },
                            ])];
                    case 1:
                        foundInsuranceDetails = _a.sent();
                        if (foundInsuranceDetails) {
                            //  if (foundInsuranceDetails.patient_id) {
                            //   let patientDoc =
                            //     DocumentType <
                            //     Patients >
                            //     foundInsuranceDetails.patient_id;
                            //   foundInsuranceDetails.patient_id.first_name =
                            //     Utility.getDecryptText(patientDoc.first_name);
                            //   foundInsuranceDetails.patient_id.last_name =
                            //     Utility.getDecryptText(patientDoc.last_name);
                            //   foundInsuranceDetails.patient_id.title =
                            //     Utility.getDecryptText(patientDoc.title);
                            //}
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: foundInsuranceDetails,
                                }];
                        }
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.INSURANCE_DETAILS_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteInsuranceDetails = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, foundInsuranceDetails, deleteInsuranceDetails, addHistory, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        userDetails = req.user;
                        return [4 /*yield*/, insurance_model_1.default.findById(req.params._id)];
                    case 1:
                        foundInsuranceDetails = _a.sent();
                        if (!foundInsuranceDetails) return [3 /*break*/, 6];
                        return [4 /*yield*/, insurance_model_1.default.updateOne({
                                _id: new mongoose_1.default.Types.ObjectId(req.params._id),
                            }, { isActive: false, isDeleted: true })];
                    case 2:
                        deleteInsuranceDetails = _a.sent();
                        if (!(deleteInsuranceDetails &&
                            deleteInsuranceDetails.modifiedCount > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "insurance details deleted successfully",
                                type: history_model_1.EHistoryActivityTypeValues.PATIENT,
                                type_id: foundInsuranceDetails.patient_id,
                            })];
                    case 3:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.DELETE_SUCCESSFULL,
                            }];
                    case 4: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_INSURANCE__DELETION,
                                error: erros_message_1.default.ON_DELETE_ERROR,
                            },
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.INSURANCE_DETAILS_NOT_FOUND,
                                error: erros_message_1.default.ON_DELETE_ERROR,
                            },
                        }];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.getInsuranceList = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var defaultPage, count, populateFeilds, condition, response, tempResult, result, obj, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        defaultPage = void 0;
                        count = void 0;
                        populateFeilds = [
                            {
                                path: "clinic_id",
                                select: { clinic_name: 1 },
                            },
                            // {
                            //   path: "createdby_id",
                            //   select: { first_name: 1, last_name: 1 },
                            // },
                            // {
                            //   path: "patient_id",
                            //   select: {
                            //     first_name: 1,
                            //     middle_name: 1,
                            //     last_name: 1,
                            //   },
                            // },
                            {
                                path: "insurance_company_id",
                                select: { company_name: 1 },
                            },
                        ];
                        condition = {
                            is_deleted: false,
                        };
                        // if (model.name) {
                        //   let isEmptyNameOnlySpace = /^\s*$/.test(model.name);
                        //   if (
                        //     isEmptyNameOnlySpace ||
                        //     model.name == null ||
                        //     model.name === ""
                        //   ) {
                        //     return {
                        //       data: {
                        //         message: errorMessage.NON_EMPTY_FIRST_NAME,
                        //         error: errorMessage.ON_FETCH_ERROR,
                        //       },
                        //       success: false,
                        //       status_code: HttpStatus.BAD_REQUEST,
                        //     };
                        //   } else
                        //     condition.name = {
                        //       $regex: model.name,
                        //       $options: "i",
                        //     };
                        // }
                        if (model.isActive) {
                            condition.isActive = model.isActive;
                        }
                        if (model.patient_id) {
                            condition.patient_id = model.patient_id;
                        }
                        if (!(!model.pageNumber && !model.pageSize)) return [3 /*break*/, 2];
                        defaultPage = 1;
                        count = -1;
                        return [4 /*yield*/, insurance_model_1.default.find(condition, {
                                createdAt: 0,
                                updatedAt: 0,
                                __v: 0,
                                password: 0,
                            })
                                .populate(populateFeilds)
                                .sort({ createdAt: -1 })];
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
                                        message: erros_message_1.default.INSURANCE_LIST_NOT_FOUND,
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
                        return [4 /*yield*/, insurance_model_1.default.paginate(__assign(__assign({}, condition), { options: {
                                    projection: {
                                        createdAt: 0,
                                        updatedAt: 0,
                                        __v: 0,
                                    },
                                } }), __assign(__assign({ page: defaultPage }, (count > 0 ? { limit: count } : { pagination: false })), { populate: populateFeilds, sort: { createdAt: -1 } }))];
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
                                        message: erros_message_1.default.INSURANCE_LIST_NOT_FOUND,
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
        this.getInsuranceListWithoutPagination = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var populateFeilds, condition, response, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        populateFeilds = [
                            {
                                path: "clinic_id",
                                select: { clinic_name: 1 },
                            },
                            // {
                            //   path: "insurance_company_id",
                            //   select: { company_name: 1 },
                            // },
                        ];
                        condition = {
                            is_deleted: false,
                        };
                        if (model.patient_id) {
                            condition.patient_id = model.patient_id;
                        }
                        return [4 /*yield*/, insurance_model_1.default.find(condition, {
                                copay: 1,
                                clinic_id: 1,
                            })
                                .populate(populateFeilds)
                                .sort({ createdAt: -1 })];
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
                                        pageNumber: 1,
                                        pageSize: response.length,
                                        totalPages: 1,
                                    },
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.INSURANCE_LIST_NOT_FOUND,
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
        // INSURANCE COMPANY SECTION
        this.addInsuranceCompany = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, modelToSave, response, addHistory, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        userDetails = req.user;
                        modelToSave = model;
                        modelToSave.createdby_id = userDetails._id;
                        return [4 /*yield*/, insurance_companies_model_1.default.create(modelToSave)];
                    case 1:
                        response = _a.sent();
                        if (!response) return [3 /*break*/, 3];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "insurance company added successfully",
                                type: history_model_1.EHistoryActivityTypeValues.CLINIC,
                                type_id: model.clinic_id,
                            })];
                    case 2:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: response,
                            }];
                    case 3: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ADD_INSURANCE_COMPANIES,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                        }];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_7 = _a.sent();
                        next(error_7);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.updateInsuranceCompany = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, foundInsuranceCompanyDetails, modelToSave, response, addHistory, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        userDetails = req.user;
                        return [4 /*yield*/, insurance_companies_model_1.default.findOne({
                                _id: model._id,
                                // isDeleted: false,
                            })];
                    case 1:
                        foundInsuranceCompanyDetails = _a.sent();
                        if (!foundInsuranceCompanyDetails) return [3 /*break*/, 6];
                        modelToSave = model;
                        modelToSave.createdby_id = foundInsuranceCompanyDetails.createdby_id;
                        modelToSave.clinic_id = foundInsuranceCompanyDetails.clinic_id;
                        return [4 /*yield*/, insurance_companies_model_1.default.updateOne({ _id: model._id }, modelToSave)];
                    case 2:
                        response = _a.sent();
                        if (!(response && response.modifiedCount > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "insurnace company details updated successfully",
                                type: history_model_1.EHistoryActivityTypeValues.CLINIC,
                                type_id: foundInsuranceCompanyDetails.clinic_id,
                            })];
                    case 3:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: true,
                            }];
                    case 4: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_UPDATE_INSURANCE,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.INSURANCE_COMPANIES_DETAILS_NOT_FOUND,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_8 = _a.sent();
                        next(error_8);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.getInsuranceCompanyDetails = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var foundInsuranceDetails, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, insurance_companies_model_1.default.findOne({
                                _id: req.params._id,
                                isDeleted: false,
                            }).populate([
                                {
                                    path: "clinic_id",
                                    select: { clinic_name: 1 },
                                },
                                // {
                                //   path: "createdby_id",
                                //   select: { first_name: 1, last_name: 1 },
                                // },
                                // {
                                //   path: "patient_id",
                                //   select: {
                                //     first_name: 1,
                                //     middle_name: 1,
                                //     last_name: 1,
                                //   },
                                // },
                            ])];
                    case 1:
                        foundInsuranceDetails = _a.sent();
                        if (foundInsuranceDetails) {
                            //  if (foundInsuranceDetails.patient_id) {
                            //   let patientDoc =
                            //     DocumentType <
                            //     Patients >
                            //     foundInsuranceDetails.patient_id;
                            //   foundInsuranceDetails.patient_id.first_name =
                            //     Utility.getDecryptText(patientDoc.first_name);
                            //   foundInsuranceDetails.patient_id.last_name =
                            //     Utility.getDecryptText(patientDoc.last_name);
                            //   foundInsuranceDetails.patient_id.title =
                            //     Utility.getDecryptText(patientDoc.title);
                            //}
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: foundInsuranceDetails,
                                }];
                        }
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.INSURANCE_DETAILS_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _a.sent();
                        next(error_9);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteInsuranceCompanyDetails = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, foundInsuranceComapnyDetails, deleteInsuranceDetails, addHistory, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        userDetails = req.user;
                        return [4 /*yield*/, insurance_companies_model_1.default.findById(req.params._id)];
                    case 1:
                        foundInsuranceComapnyDetails = _a.sent();
                        if (!foundInsuranceComapnyDetails) return [3 /*break*/, 6];
                        return [4 /*yield*/, insurance_companies_model_1.default.updateOne({
                                _id: new mongoose_1.default.Types.ObjectId(req.params._id),
                            }, { isActive: false, isDeleted: true })];
                    case 2:
                        deleteInsuranceDetails = _a.sent();
                        if (!(deleteInsuranceDetails &&
                            deleteInsuranceDetails.modifiedCount > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "insurance company details deleted successfully",
                                type: history_model_1.EHistoryActivityTypeValues.CLINIC,
                                type_id: foundInsuranceComapnyDetails.clinic_id,
                            })];
                    case 3:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: true,
                            }];
                    case 4: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_INSURANCE__DELETION,
                                error: erros_message_1.default.ON_DELETE_ERROR,
                            },
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.INSURANCE_COMPANIES_DETAILS_NOT_FOUND,
                                error: erros_message_1.default.ON_DELETE_ERROR,
                            },
                        }];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_10 = _a.sent();
                        next(error_10);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.getInsuranceCompanyList = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var defaultPage, count, populateFeilds, condition, result, obj, error_11;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        defaultPage = void 0;
                        count = void 0;
                        populateFeilds = [
                            {
                                path: "clinic_id",
                                select: { clinic_name: 1 },
                            },
                            // {
                            //   path: "createdby_id",
                            //   select: { first_name: 1, last_name: 1 },
                            // },
                            // {
                            //   path: "patient_id",
                            //   select: {
                            //     first_name: 1,
                            //     middle_name: 1,
                            //     last_name: 1,
                            //   },
                            // },
                        ];
                        condition = {
                        // isDeleted: false,
                        };
                        // if (model.name) {
                        //   let isEmptyNameOnlySpace = /^\s*$/.test(model.name);
                        //   if (
                        //     isEmptyNameOnlySpace ||
                        //     model.name == null ||
                        //     model.name === ""
                        //   ) {
                        //     return {
                        //       data: {
                        //         message: errorMessage.NON_EMPTY_FIRST_NAME,
                        //         error: errorMessage.ON_FETCH_ERROR,
                        //       },
                        //       success: false,
                        //       status_code: HttpStatus.BAD_REQUEST,
                        //     };
                        //   } else
                        //     condition.name = {
                        //       $regex: model.name,
                        //       $options: "i",
                        //     };
                        // }
                        if ("isActive" in model &&
                            model.isActive != undefined &&
                            model.isActive != null) {
                            condition.isActive = model.isActive;
                        }
                        if (model.search) {
                            //let isEmptyNameOnlySpace = /^\s*$/.test(model.search);
                            condition.companyName = {
                                $regex: model.search,
                                $options: "i",
                            };
                        }
                        if ("isDeleted" in model &&
                            model.isDeleted != undefined &&
                            model.isDeleted != null) {
                            condition.isDeleted = model.isDeleted;
                        }
                        console.log(condition, "condition");
                        defaultPage = (_a = model.pageNumber) !== null && _a !== void 0 ? _a : 1;
                        count = (_b = model.pageSize) !== null && _b !== void 0 ? _b : 50;
                        return [4 /*yield*/, insurance_companies_model_1.default.paginate(__assign(__assign({}, condition), { options: {
                                    projection: {
                                        createdAt: 0,
                                        updatedAt: 0,
                                        __v: 0,
                                    },
                                } }), __assign(__assign({ page: defaultPage }, (count > 0 ? { limit: count } : { pagination: false })), { populate: populateFeilds, sort: { createdAt: -1 } }))];
                    case 1:
                        result = _c.sent();
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
                                        message: erros_message_1.default.INSURANCE_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_11 = _c.sent();
                        next(error_11);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getInsuranceCompanyDataToExcel = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var workbook, insuranceSheet_1, insuranceSheetHeader, defaultPage, count, populateFeilds, condition, result, insuranceData, sheetStyle_1, data, link, excelFileName, response, error_12;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, xlsx_populate_1.default.fromBlankAsync()];
                    case 1:
                        workbook = _c.sent();
                        insuranceSheet_1 = workbook.sheet("Sheet1");
                        insuranceSheetHeader = [
                            "Insurance Name",
                            "insurance Address",
                            "Status",
                        ];
                        insuranceSheetHeader.forEach(function (el, i) {
                            insuranceSheet_1
                                .cell(String.fromCharCode(i + 65) + "1")
                                .value(el)
                                .style({
                                border: true,
                                fontFamily: "Calibri",
                                fill: {
                                    type: "solid",
                                    color: { rgb: "d9d9d9" },
                                },
                            });
                        });
                        defaultPage = void 0;
                        count = void 0;
                        populateFeilds = [
                            {
                                path: "clinic_id",
                                select: { clinic_name: 1 },
                            },
                            // {
                            //   path: "createdby_id",
                            //   select: { first_name: 1, last_name: 1 },
                            // },
                            // {
                            //   path: "patient_id",
                            //   select: {
                            //     first_name: 1,
                            //     middle_name: 1,
                            //     last_name: 1,
                            //   },
                            // },
                        ];
                        condition = {
                        // isDeleted: false,
                        };
                        // if (model.name) {
                        //   let isEmptyNameOnlySpace = /^\s*$/.test(model.name);
                        //   if (
                        //     isEmptyNameOnlySpace ||
                        //     model.name == null ||
                        //     model.name === ""
                        //   ) {
                        //     return {
                        //       data: {
                        //         message: errorMessage.NON_EMPTY_FIRST_NAME,
                        //         error: errorMessage.ON_FETCH_ERROR,
                        //       },
                        //       success: false,
                        //       status_code: HttpStatus.BAD_REQUEST,
                        //     };
                        //   } else
                        //     condition.name = {
                        //       $regex: model.name,
                        //       $options: "i",
                        //     };
                        // }
                        if ("isActive" in model &&
                            model.isActive != undefined &&
                            model.isActive != null) {
                            condition.isActive = model.isActive;
                        }
                        if (model.search) {
                            //let isEmptyNameOnlySpace = /^\s*$/.test(model.search);
                            condition.companyName = {
                                $regex: model.search,
                                $options: "i",
                            };
                        }
                        if ("isDeleted" in model &&
                            model.isDeleted != undefined &&
                            model.isDeleted != null) {
                            condition.isDeleted = model.isDeleted;
                        }
                        console.log(condition, "condition");
                        defaultPage = (_a = model.pageNumber) !== null && _a !== void 0 ? _a : 1;
                        count = (_b = model.pageSize) !== null && _b !== void 0 ? _b : 50;
                        return [4 /*yield*/, insurance_companies_model_1.default.paginate(__assign(__assign({}, condition), { options: {
                                    projection: {
                                        createdAt: 0,
                                        updatedAt: 0,
                                        __v: 0,
                                    },
                                } }), __assign(__assign({ page: defaultPage }, (count > 0 ? { limit: count } : { pagination: false })), { populate: populateFeilds, sort: { createdAt: -1 } }))];
                    case 2:
                        result = _c.sent();
                        if (!(result && result.docs && result.docs.length > 0)) return [3 /*break*/, 5];
                        insuranceData = result.docs;
                        sheetStyle_1 = {
                            border: true,
                            fontFamily: "Calibri",
                        };
                        insuranceData.forEach(function (el, i) {
                            insuranceSheet_1
                                .cell("A" + (i + 2))
                                .value(el.companyName)
                                .style(sheetStyle_1);
                            insuranceSheet_1
                                .cell("B" + (i + 2))
                                .value(el.address)
                                .style(sheetStyle_1);
                            insuranceSheet_1
                                .cell("C" + (i + 2))
                                .value(el.isActive)
                                .style(sheetStyle_1);
                            insuranceSheet_1;
                        });
                        insuranceSheet_1.freezePanes(1, 1);
                        return [4 /*yield*/, workbook.outputAsync()];
                    case 3:
                        data = _c.sent();
                        return [4 /*yield*/, fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../../../../public/upload/insurance/Insurance_Report.xlsx"), data)];
                    case 4:
                        _c.sent();
                        link = "http://".concat(req.hostname, ":").concat(process.env.PORT, "/upload/insurance/Insurance_Report.xlsx");
                        excelFileName = "Insurance_Report.xlsx";
                        response = {
                            link: link,
                            name: excelFileName,
                        };
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                data: response,
                                success: true,
                            }];
                    case 5: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.INSURANCE_LIST_NOT_FOUND,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_12 = _c.sent();
                        next(error_12);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        //Eap Insurance Section
        this.addEapInsurance = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, foundInsuranceDetails, modelToSave, response, addHistory, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        userDetails = req.user;
                        return [4 /*yield*/, eap_model_1.default.findOne({
                                patient_id: model.patient_id,
                            })];
                    case 1:
                        foundInsuranceDetails = _a.sent();
                        if (foundInsuranceDetails)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_ALRAEDY_EXIST_INSURANCE,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        modelToSave = model;
                        modelToSave.createdby_id = userDetails._id;
                        return [4 /*yield*/, eap_model_1.default.create(modelToSave)];
                    case 2:
                        response = _a.sent();
                        if (!response) return [3 /*break*/, 4];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "patient eap insurance added successfully",
                                type: history_model_1.EHistoryActivityTypeValues.PATIENT,
                                type_id: model.patient_id,
                            })];
                    case 3:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: response,
                            }];
                    case 4: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ADD_INSURANCE,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_13 = _a.sent();
                        next(error_13);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.updateEapInsurance = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, foundInsuranceDetails, modelToSave, response, addHistory, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        userDetails = req.user;
                        return [4 /*yield*/, eap_model_1.default.findOne({
                                patient_id: model.patient_id,
                                // isDeleted: false,
                            })];
                    case 1:
                        foundInsuranceDetails = _a.sent();
                        if (!foundInsuranceDetails) return [3 /*break*/, 6];
                        modelToSave = model;
                        modelToSave.createdby_id = foundInsuranceDetails.createdby_id;
                        modelToSave.clinic_id = foundInsuranceDetails.clinic_id;
                        return [4 /*yield*/, eap_model_1.default.updateOne({ _id: foundInsuranceDetails._id }, modelToSave)];
                    case 2:
                        response = _a.sent();
                        if (!(response && response.modifiedCount > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "patient eap insurnace details updated successfully",
                                type: history_model_1.EHistoryActivityTypeValues.PATIENT,
                                type_id: foundInsuranceDetails.patient_id,
                            })];
                    case 3:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.UPDATE_SUCCESSFULL,
                            }];
                    case 4: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_UPDATE_INSURANCE,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.INSURANCE_DETAILS_NOT_FOUND,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                        }];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_14 = _a.sent();
                        next(error_14);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.getEapInsuranceDetails = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var foundInsuranceDetails, patientDoc, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, eap_model_1.default.findOne({
                                patient_id: new mongoose_1.default.Types.ObjectId(req.params._id),
                            }).populate([
                                {
                                    path: "clinic_id",
                                    select: { clinic_name: 1 },
                                },
                                {
                                    path: "patient_id",
                                    select: {
                                        first_name: 1,
                                        middle_name: 1,
                                        last_name: 1,
                                        title: 1,
                                    },
                                },
                            ])];
                    case 1:
                        foundInsuranceDetails = _a.sent();
                        if (foundInsuranceDetails) {
                            if (foundInsuranceDetails.patient_id) {
                                patientDoc = (foundInsuranceDetails.patient_id);
                                patientDoc.first_name = common_methods_1.default.getDecryptText(patientDoc.first_name);
                                patientDoc.last_name = common_methods_1.default.getDecryptText(patientDoc.last_name);
                                patientDoc.title = common_methods_1.default.getDecryptText(patientDoc.title);
                                foundInsuranceDetails.patient_id = patientDoc;
                            }
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: foundInsuranceDetails,
                                }];
                        }
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.INSURANCE_DETAILS_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 3];
                    case 2:
                        error_15 = _a.sent();
                        next(error_15);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        //HMO Insurance Section
        this.addHmoInsurance = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, foundInsuranceDetails, modelToSave, response, addHistory, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        userDetails = req.user;
                        return [4 /*yield*/, hmo_model_1.default.findOne({
                                patient_id: model.patient_id,
                            })];
                    case 1:
                        foundInsuranceDetails = _a.sent();
                        if (foundInsuranceDetails)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_ALRAEDY_EXIST_INSURANCE,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        modelToSave = model;
                        modelToSave.createdby_id = userDetails._id;
                        return [4 /*yield*/, hmo_model_1.default.create(modelToSave)];
                    case 2:
                        response = _a.sent();
                        if (!response) return [3 /*break*/, 4];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "patient hmo insurance added successfully",
                                type: history_model_1.EHistoryActivityTypeValues.PATIENT,
                                type_id: model.patient_id,
                            })];
                    case 3:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: response,
                            }];
                    case 4: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ADD_INSURANCE,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_16 = _a.sent();
                        next(error_16);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.updateHmoInsurance = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, foundInsuranceDetails, modelToSave, response, addHistory, error_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        userDetails = req.user;
                        return [4 /*yield*/, hmo_model_1.default.findOne({
                                patient_id: model.patient_id,
                                // isDeleted: false,
                            })];
                    case 1:
                        foundInsuranceDetails = _a.sent();
                        if (!foundInsuranceDetails) return [3 /*break*/, 6];
                        modelToSave = model;
                        modelToSave.createdby_id = foundInsuranceDetails.createdby_id;
                        modelToSave.clinic_id = foundInsuranceDetails.clinic_id;
                        return [4 /*yield*/, hmo_model_1.default.updateOne({ _id: foundInsuranceDetails._id }, modelToSave)];
                    case 2:
                        response = _a.sent();
                        if (!(response && response.modifiedCount > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "patient hmo insurnace details updated successfully",
                                type: history_model_1.EHistoryActivityTypeValues.PATIENT,
                                type_id: foundInsuranceDetails.patient_id,
                            })];
                    case 3:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.UPDATE_SUCCESSFULL,
                            }];
                    case 4: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_UPDATE_INSURANCE,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.INSURANCE_DETAILS_NOT_FOUND,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                        }];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_17 = _a.sent();
                        next(error_17);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.getHmoInsuranceDetails = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var foundInsuranceDetails, patientDoc, error_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, hmo_model_1.default.findOne({
                                patient_id: new mongoose_1.default.Types.ObjectId(req.params._id),
                            }).populate([
                                {
                                    path: "clinic_id",
                                    select: { clinic_name: 1 },
                                },
                                {
                                    path: "patient_id",
                                    select: {
                                        first_name: 1,
                                        middle_name: 1,
                                        last_name: 1,
                                        title: 1,
                                    },
                                },
                            ])];
                    case 1:
                        foundInsuranceDetails = _a.sent();
                        if (foundInsuranceDetails) {
                            if (foundInsuranceDetails.patient_id) {
                                patientDoc = (foundInsuranceDetails.patient_id);
                                patientDoc.first_name = common_methods_1.default.getDecryptText(patientDoc.first_name);
                                patientDoc.last_name = common_methods_1.default.getDecryptText(patientDoc.last_name);
                                patientDoc.title = common_methods_1.default.getDecryptText(patientDoc.title);
                                foundInsuranceDetails.patient_id = patientDoc;
                            }
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: foundInsuranceDetails,
                                }];
                        }
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.INSURANCE_DETAILS_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 3];
                    case 2:
                        error_18 = _a.sent();
                        next(error_18);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        //PPOInsurance Section
        this.addPpoInsurance = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, modelToSave, foundInsuranceDetails, response, addHistory, error_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        userDetails = req.user;
                        modelToSave = model;
                        modelToSave.createdby_id = userDetails._id;
                        return [4 /*yield*/, ppo_model_1.default.findOne({
                                patient_id: model.patient_id,
                            })];
                    case 1:
                        foundInsuranceDetails = _a.sent();
                        if (foundInsuranceDetails)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_ALRAEDY_EXIST_INSURANCE,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        return [4 /*yield*/, ppo_model_1.default.create(modelToSave)];
                    case 2:
                        response = _a.sent();
                        if (!response) return [3 /*break*/, 4];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "patient ppo insurance added successfully",
                                type: history_model_1.EHistoryActivityTypeValues.PATIENT,
                                type_id: model.patient_id,
                            })];
                    case 3:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: response,
                            }];
                    case 4: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ADD_INSURANCE,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_19 = _a.sent();
                        next(error_19);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.updatePpoInsurance = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, foundInsuranceDetails, modelToSave, response, addHistory, error_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        userDetails = req.user;
                        return [4 /*yield*/, ppo_model_1.default.findOne({
                                patient_id: model.patient_id,
                                // isDeleted: false,
                            })];
                    case 1:
                        foundInsuranceDetails = _a.sent();
                        if (!foundInsuranceDetails) return [3 /*break*/, 6];
                        modelToSave = model;
                        modelToSave.createdby_id = foundInsuranceDetails.createdby_id;
                        modelToSave.clinic_id = foundInsuranceDetails.clinic_id;
                        return [4 /*yield*/, ppo_model_1.default.updateOne({ _id: foundInsuranceDetails._id }, modelToSave)];
                    case 2:
                        response = _a.sent();
                        if (!(response && response.modifiedCount > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "patient ppo insurnace details updated successfully",
                                type: history_model_1.EHistoryActivityTypeValues.PATIENT,
                                type_id: foundInsuranceDetails.patient_id,
                            })];
                    case 3:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.UPDATE_SUCCESSFULL,
                            }];
                    case 4: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_UPDATE_INSURANCE,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.INSURANCE_DETAILS_NOT_FOUND,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                        }];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_20 = _a.sent();
                        next(error_20);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.getPpoInsuranceDetails = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var foundInsuranceDetails, patientDoc, error_21;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, ppo_model_1.default.findOne({
                                patient_id: new mongoose_1.default.Types.ObjectId(req.params._id),
                            }).populate([
                                {
                                    path: "clinic_id",
                                    select: { clinic_name: 1 },
                                },
                                {
                                    path: "patient_id",
                                    select: {
                                        first_name: 1,
                                        middle_name: 1,
                                        last_name: 1,
                                        title: 1,
                                    },
                                },
                            ])];
                    case 1:
                        foundInsuranceDetails = _a.sent();
                        if (foundInsuranceDetails) {
                            if (foundInsuranceDetails.patient_id) {
                                patientDoc = (foundInsuranceDetails.patient_id);
                                patientDoc.first_name = common_methods_1.default.getDecryptText(patientDoc.first_name);
                                patientDoc.last_name = common_methods_1.default.getDecryptText(patientDoc.last_name);
                                patientDoc.title = common_methods_1.default.getDecryptText(patientDoc.title);
                                foundInsuranceDetails.patient_id = patientDoc;
                            }
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: foundInsuranceDetails,
                                }];
                        }
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.INSURANCE_DETAILS_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 3];
                    case 2:
                        error_21 = _a.sent();
                        next(error_21);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return InsuranceServices;
}());
exports.default = new InsuranceServices();
