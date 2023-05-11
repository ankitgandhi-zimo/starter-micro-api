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
exports.EnumRoles = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var moment_1 = __importDefault(require("moment"));
var mongoose_1 = __importDefault(require("mongoose"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var erros_message_1 = __importDefault(require("../../common/erros_message"));
var appointment_model_1 = __importDefault(require("../../models/appointment.model"));
var history_model_1 = __importStar(require("../../models/history.model"));
var doctor_model_1 = __importDefault(require("../../models/doctor.model"));
var fetch_data_model_1 = __importDefault(require("../../models/fetch_data.model"));
var patient_model_1 = __importDefault(require("../../models/patient.model"));
var roles_model_1 = __importDefault(require("../../models/roles.model"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var xlsx_populate_1 = __importDefault(require("xlsx-populate"));
var assigned_provider_model_1 = __importDefault(require("../../models/assigned_provider.model"));
var billing_checkout_model_1 = __importDefault(require("../../models/billing_checkout.model"));
var billing_payment_model_1 = __importDefault(require("../../models/billing_payment.model"));
var billing_post_payment_model_1 = __importDefault(require("../../models/billing_post_payment.model"));
var cards_model_1 = __importDefault(require("../../models/cards.model"));
var cpt_model_1 = __importDefault(require("../../models/cpt.model"));
var doctor_checkout_model_1 = __importDefault(require("../../models/doctor_checkout.model"));
var epriscription_model_1 = __importDefault(require("../../models/epriscription.model"));
var filled_dynamic_form_model_1 = __importDefault(require("../../models/filled_dynamic_form.model"));
var filled_progress_notes_model_1 = __importDefault(require("../../models/filled_progress_notes.model"));
var filled_treatment_plan_model_1 = __importDefault(require("../../models/filled_treatment_plan.model"));
var hmo_model_1 = __importDefault(require("../../models/insurance/hmo.model"));
var insurance_model_1 = __importDefault(require("../../models/insurance/insurance.model"));
var ppo_model_1 = __importDefault(require("../../models/insurance/ppo.model"));
//import PatientCardAssociationModel from "../../models/patient_card_association.model";
var patient_document_model_1 = __importDefault(require("../../models/patient_document.model"));
var super_bill_model_1 = __importDefault(require("../../models/super_bill.model"));
var axios_1 = __importDefault(require("axios"));
var patient_document_model_2 = __importDefault(require("../../models/patient_document.model"));
var assigned_provider_to_patients_viewmodel_1 = require("../../view-models/patients/assigned_provider_to_patients.viewmodel");
var EnumRoles;
(function (EnumRoles) {
    EnumRoles["SUPERADMIN"] = "superadmin";
})(EnumRoles = exports.EnumRoles || (exports.EnumRoles = {}));
var PatientServices = /** @class */ (function () {
    function PatientServices() {
        var _this = this;
        this.addPatient = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var patientRole, userDetails, modelToSave, salt, _a, response, addHistory, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 9, , 10]);
                        return [4 /*yield*/, roles_model_1.default.findOne({
                                roleName: "patient",
                            })];
                    case 1:
                        patientRole = _b.sent();
                        userDetails = req.user;
                        console.log(model);
                        modelToSave = model;
                        modelToSave.role = patientRole._id;
                        modelToSave.role_permission =
                            patientRole && patientRole.permission ? patientRole.permission : {};
                        if (!model.password) return [3 /*break*/, 4];
                        return [4 /*yield*/, bcrypt_1.default.genSalt(11)];
                    case 2:
                        salt = _b.sent();
                        _a = modelToSave;
                        return [4 /*yield*/, bcrypt_1.default.hash(model.password, salt)];
                    case 3:
                        _a.password = _b.sent();
                        _b.label = 4;
                    case 4:
                        /** Genrating Patient random id */
                        modelToSave.patientId =
                            model.first_name.slice(0, 1).toUpperCase() +
                                model.last_name.slice(0, 1).toUpperCase() +
                                Math.floor(1000000 + Math.random() * 9000).toString();
                        // encrypt first name , last name and title of patient details
                        modelToSave.first_name = common_methods_1.default.getEncryptText(model.first_name.toUpperCase());
                        modelToSave.last_name = common_methods_1.default.getEncryptText(model.last_name.toUpperCase());
                        if (model.middle_name) {
                            modelToSave.middle_name = common_methods_1.default.getEncryptText(model.middle_name.toUpperCase());
                        }
                        // modelToSave.title = Utility.getEncryptText(
                        //   model.title.toUpperCase()
                        // );
                        modelToSave.createdby_id = userDetails._id;
                        return [4 /*yield*/, patient_model_1.default.create(modelToSave)];
                    case 5:
                        response = _b.sent();
                        if (!response) return [3 /*break*/, 7];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "patient added successfully",
                                type: history_model_1.EHistoryActivityTypeValues.PATIENT,
                                type_id: response._id,
                            })];
                    case 6:
                        addHistory = _b.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: response,
                            }];
                    case 7: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ADD_PATIENT,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                        }];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        this.updatePatient = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var patientRole, userDetails, foundPatient, modelToSave, firstNamePatientId, patientIdNeedToReplaced, updationResult, addHistory, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        return [4 /*yield*/, roles_model_1.default.findOne({
                                roleName: "patient",
                            })];
                    case 1:
                        patientRole = _a.sent();
                        userDetails = req.user;
                        return [4 /*yield*/, patient_model_1.default.findById({
                                _id: model._id,
                            })];
                    case 2:
                        foundPatient = _a.sent();
                        if (!foundPatient) return [3 /*break*/, 7];
                        modelToSave = model;
                        firstNamePatientId = void 0;
                        if (model.first_name) {
                            //update patient id first charatcer
                            modelToSave.patientId = common_methods_1.default.replaceCharacter(foundPatient.patientId, 0, model.first_name.charAt(0).toUpperCase());
                            firstNamePatientId = modelToSave.patientId;
                            modelToSave.first_name = common_methods_1.default.getEncryptText(model.first_name.toUpperCase());
                        }
                        if (model.last_name) {
                            patientIdNeedToReplaced = firstNamePatientId
                                ? firstNamePatientId
                                : foundPatient.patientId;
                            modelToSave.patientId = common_methods_1.default.replaceCharacter(patientIdNeedToReplaced, 1, model.last_name.charAt(0).toUpperCase());
                            modelToSave.last_name = common_methods_1.default.getEncryptText(model.last_name.toUpperCase());
                        }
                        if (model.title) {
                            modelToSave.title = common_methods_1.default.getEncryptText(model.title);
                        }
                        if (model.middle_name) {
                            modelToSave.middle_name = common_methods_1.default.getEncryptText(model.middle_name.toUpperCase());
                        }
                        modelToSave.createdby_id = foundPatient.createdby_id;
                        modelToSave.role = foundPatient.role;
                        modelToSave.clinic_id = foundPatient.clinic_id;
                        modelToSave.responsible_person = model.responsible_person
                            ? model.responsible_person
                            : "";
                        return [4 /*yield*/, patient_model_1.default.updateOne({ _id: model._id }, modelToSave)];
                    case 3:
                        updationResult = _a.sent();
                        if (!(updationResult && updationResult.modifiedCount > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "patient updated successfully",
                                type: history_model_1.EHistoryActivityTypeValues.PATIENT,
                                type_id: foundPatient._id,
                            })];
                    case 4:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.UPDATE_SUCCESSFULL,
                            }];
                    case 5: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_UPDATE_PATIENT,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                        }];
                    case 6: return [3 /*break*/, 8];
                    case 7: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.PATIENT_DETAILS_NOT_FOUND,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                        }];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        this.getPatientDetails = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var foundPatient, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, patient_model_1.default.findOne({
                                _id: req.params._id,
                                // isDeleted: false,
                            }).populate([
                                {
                                    path: "clinic_id",
                                    select: { clinic_name: 1 },
                                },
                                {
                                    path: "state",
                                    select: { stateName: 1 },
                                },
                                {
                                    path: "country",
                                    select: { countryName: 1 },
                                },
                                {
                                    path: "financialClass_id",
                                    select: { code: 1 },
                                },
                            ])];
                    case 1:
                        foundPatient = _a.sent();
                        if (foundPatient) {
                            foundPatient.first_name = common_methods_1.default.getDecryptText(foundPatient.first_name);
                            foundPatient.middle_name = common_methods_1.default.getDecryptText(foundPatient.middle_name);
                            foundPatient.last_name = common_methods_1.default.getDecryptText(foundPatient.last_name);
                            foundPatient.title = common_methods_1.default.getDecryptText(foundPatient.title);
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: foundPatient,
                                }];
                        }
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.PATIENT_DETAILS_NOT_FOUND,
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
        this.deletePatientDetails = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, foundPatient, deletePatientDetails, addHistory, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        userDetails = req.user;
                        return [4 /*yield*/, patient_model_1.default.findById(req.params._id)];
                    case 1:
                        foundPatient = _a.sent();
                        if (!foundPatient) return [3 /*break*/, 6];
                        return [4 /*yield*/, patient_model_1.default.updateOne({
                                _id: new mongoose_1.default.Types.ObjectId(req.params._id),
                            }, { isActive: false, isDeleted: true })];
                    case 2:
                        deletePatientDetails = _a.sent();
                        if (!(deletePatientDetails && deletePatientDetails.modifiedCount > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "patient deleted successfully",
                                type: history_model_1.EHistoryActivityTypeValues.PATIENT,
                                type_id: foundPatient._id,
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
                                message: erros_message_1.default.ERROR_PATIENT_DELETION,
                                error: erros_message_1.default.ON_DELETE_ERROR,
                            },
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.PATIENT_DETAILS_NOT_FOUND,
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
        this.getPatientList = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var defaultPage, count, populateFeilds, condition, response, tempResult, result, obj, finalResponse_1, isEmptyNameOnlySpace, sortedList, error_5;
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
                            {
                                path: "state",
                                select: { stateName: 1 },
                            },
                            {
                                path: "country",
                                select: { countryName: 1 },
                            },
                        ];
                        condition = {};
                        if (model.isActive) {
                            condition.isActive = model.isActive;
                        }
                        if (model.clinicId) {
                            condition.clinic_id = model.clinicId;
                        }
                        if (model.isDeleted == true || model.isDeleted == false) {
                            condition.isDeleted = model.isDeleted;
                        }
                        if (!(!model.pageNumber && !model.pageSize)) return [3 /*break*/, 2];
                        defaultPage = 1;
                        count = -1;
                        return [4 /*yield*/, patient_model_1.default.find(condition, {
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
                            // decrypt patient info
                            response.forEach(function (foundPatient) {
                                foundPatient.first_name = common_methods_1.default.getDecryptText(foundPatient.first_name);
                                foundPatient.last_name = common_methods_1.default.getDecryptText(foundPatient.last_name);
                                foundPatient.title = common_methods_1.default.getDecryptText(foundPatient.title);
                            });
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
                                        message: erros_message_1.default.CLINIC_GROUP_LIST_NOT_FOUND,
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
                        return [4 /*yield*/, patient_model_1.default.paginate(__assign({}, condition), __assign(__assign({ page: defaultPage }, (count > 0 ? { limit: count } : { pagination: false })), { populate: populateFeilds, options: {
                                    projection: {
                                        password: 0,
                                        createdAt: 0,
                                        updatedAt: 0,
                                        __v: 0,
                                    },
                                }, sort: { createdAt: -1 } }))];
                    case 4:
                        result = _a.sent();
                        tempResult = result;
                        if (result && result.docs && result.docs.length > 0) {
                            obj = void 0;
                            finalResponse_1 = [];
                            if (model.name) {
                                isEmptyNameOnlySpace = /^\s*$/.test(model.name);
                                if (isEmptyNameOnlySpace || model.name == null || model.name === "") {
                                    return [2 /*return*/, {
                                            data: {
                                                message: erros_message_1.default.NON_EMPTY_FIRST_NAME,
                                                error: erros_message_1.default.ON_FETCH_ERROR,
                                            },
                                            success: false,
                                            status_code: http_status_codes_1.default.BAD_REQUEST,
                                        }];
                                }
                                result.docs.forEach(function (patientObj) {
                                    if (common_methods_1.default.getDecryptText(patientObj.first_name) ===
                                        model.name.toUpperCase() ||
                                        common_methods_1.default.getDecryptText(patientObj.last_name) ===
                                            model.name.toUpperCase())
                                        finalResponse_1.push(patientObj);
                                });
                            }
                            else {
                                finalResponse_1 = result.docs;
                            }
                            // Decrypt patient info
                            finalResponse_1.forEach(function (foundPatient) {
                                foundPatient.first_name = common_methods_1.default.getDecryptText(foundPatient.first_name);
                                foundPatient.last_name = common_methods_1.default.getDecryptText(foundPatient.last_name);
                                foundPatient.middle_name = foundPatient.middle_name
                                    ? common_methods_1.default.getDecryptText(foundPatient.middle_name)
                                    : "";
                                foundPatient.title = common_methods_1.default.getDecryptText(foundPatient.title);
                            });
                            sortedList = finalResponse_1.sort(function (a, b) {
                                return a.first_name.localeCompare(b.first_name);
                            });
                            obj = {
                                data: sortedList,
                                // count: result.totalDocs,
                                totalDocs: result.totalDocs,
                                pageNumber: result.page,
                                pageSize: result.limit,
                                totalPages: Math.ceil(finalResponse_1.length / result.limit),
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
                                        message: erros_message_1.default.PATIENT_LIST_NOT_FOUND,
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
        this.getPatientPaymentList = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var defaultPage, count, populateFeilds, condition, tempResult, result, obj, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        defaultPage = void 0;
                        count = void 0;
                        populateFeilds = [
                            // {
                            //   path: "clinic_id",
                            //   select: { clinic_name: 1 },
                            // },
                            {
                                path: "createdby_id",
                                select: { first_name: 1, last_name: 1 },
                            },
                        ];
                        condition = {
                            clinic_id: model.clinic_id,
                            patient_id: model.patient_id,
                        };
                        defaultPage = model.pageNumber ? model.pageNumber : 1;
                        count = model.pageSize ? model.pageSize : 50;
                        tempResult = void 0;
                        return [4 /*yield*/, billing_payment_model_1.default.paginate(__assign({}, condition), __assign(__assign({ page: defaultPage }, (count > 0 ? { limit: count } : { pagination: false })), { populate: populateFeilds, options: {
                                    projection: {
                                        updatedAt: 0,
                                        __v: 0,
                                    },
                                }, sort: { createdAt: -1 } }))];
                    case 1:
                        result = _a.sent();
                        tempResult = result;
                        if (result && result.docs && result.docs.length > 0) {
                            obj = void 0;
                            obj = {
                                data: result.docs,
                                // count: result.totalDocs,
                                totalDocs: result.totalDocs,
                                pageNumber: result.page,
                                pageSize: result.limit,
                                totalPages: Math.ceil(result.docs.length / result.limit),
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
                                        message: erros_message_1.default.NO_RECORD_FOUND,
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
        this.exportPatientPaymentDataToExcel = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var workbook, patientSheet_1, patientSheetHeader, defaultPage, count, populateFeilds, condition, tempResult, result, Patientdata, sheetStyle_1, data, link, excelFileName, response, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, xlsx_populate_1.default.fromBlankAsync()];
                    case 1:
                        workbook = _a.sent();
                        patientSheet_1 = workbook.sheet("Sheet1");
                        patientSheetHeader = [
                            "Payment Date",
                            "Date Of Service",
                            "Type",
                            "Mode",
                            "CC Mode",
                            "Details",
                            "Paid By",
                            "Amount($)",
                        ];
                        patientSheetHeader.forEach(function (el, i) {
                            patientSheet_1
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
                            // {
                            //   path: "clinic_id",
                            //   select: { clinic_name: 1 },
                            // },
                            {
                                path: "createdby_id",
                                select: { first_name: 1, last_name: 1 },
                            },
                            {
                                path: "appointment_id",
                                select: { startDateTime: 1 },
                            },
                        ];
                        condition = {
                            clinic_id: model.clinic_id,
                            patient_id: model.patient_id,
                        };
                        defaultPage = model.pageNumber ? model.pageNumber : 1;
                        count = model.pageSize ? model.pageSize : 500000;
                        tempResult = [];
                        return [4 /*yield*/, billing_payment_model_1.default.paginate(__assign({}, condition))];
                    case 2:
                        result = _a.sent();
                        tempResult = result.docs;
                        if (!(result && result.docs && result.docs.length > 0)) return [3 /*break*/, 5];
                        if (tempResult.length <= 0)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_RECORD_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        Patientdata = tempResult;
                        sheetStyle_1 = {
                            border: true,
                            fontFamily: "Calibri",
                        };
                        Patientdata.forEach(function (el, i) {
                            var apptData = el.appointment_id;
                            patientSheet_1
                                .cell("A" + (i + 2))
                                .value((0, moment_1.default)(el.createdAt).format("lll"))
                                .style(sheetStyle_1);
                            patientSheet_1;
                            patientSheet_1
                                .cell("B" + (i + 2))
                                .value((0, moment_1.default)(apptData.startDateTime).format("lll"))
                                .style(sheetStyle_1);
                            patientSheet_1
                                .cell("C" + (i + 2))
                                .value(el.mode)
                                .style(sheetStyle_1);
                            patientSheet_1
                                .cell("D" + (i + 2))
                                .value(el.mode !== "CASH" ? "Online" : "Offline")
                                .style(sheetStyle_1);
                            patientSheet_1
                                .cell("E" + (i + 2))
                                .value(el.mode !== "CASH" ? "Online" : "Offline")
                                .style(sheetStyle_1);
                            patientSheet_1
                                .cell("F" + (i + 2))
                                .value(el.remark)
                                .style(sheetStyle_1);
                            patientSheet_1
                                .cell("G" + (i + 2))
                                .value(el.mode !== "CASH" ? "BANK" : "Patient")
                                .style(sheetStyle_1);
                            patientSheet_1
                                .cell("H" + (i + 2))
                                .value(el.amount)
                                .style(sheetStyle_1);
                        });
                        patientSheet_1.freezePanes(1, 1);
                        return [4 /*yield*/, workbook.outputAsync()];
                    case 3:
                        data = _a.sent();
                        return [4 /*yield*/, fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../../../../public/upload/patients/payments/Payment_Report.xlsx"), data)];
                    case 4:
                        _a.sent();
                        link = "http://".concat(req.hostname, ":").concat(process.env.PORT, "/upload/patients/payments/Payment_Report.xlsx");
                        excelFileName = "Payment_Report.xlsx";
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
                                message: erros_message_1.default.NO_RECORD_FOUND,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_7 = _a.sent();
                        next(error_7);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.getPatientListWithoutPagination = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var condition, response, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        condition = {
                            isDeleted: false,
                            isActive: true,
                            //clinic_id: model.clinicId,
                        };
                        if (model.clinicId)
                            condition.clinic_id = model.clinicId;
                        return [4 /*yield*/, patient_model_1.default.find(condition, {
                                first_name: 1,
                                last_name: 1,
                                middle_name: 1,
                                isVerified: 1,
                                patientId: 1,
                            }).sort({ createdAt: -1 })];
                    case 1:
                        response = _a.sent();
                        if (response && response.length > 0) {
                            // decrypt patient info
                            response.forEach(function (foundPatient) {
                                foundPatient.first_name = foundPatient.first_name
                                    ? common_methods_1.default.getDecryptText(foundPatient.first_name)
                                    : foundPatient.first_name;
                                foundPatient.last_name = foundPatient.last_name
                                    ? common_methods_1.default.getDecryptText(foundPatient.last_name)
                                    : foundPatient.last_name;
                                foundPatient.title = foundPatient.title
                                    ? common_methods_1.default.getDecryptText(foundPatient.title)
                                    : foundPatient.title;
                            });
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
                                        message: erros_message_1.default.PATIENT_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
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
        this.pendingCheckoutPatientListNotUsed = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var defaultPage, count, populateFeilds, condition, startDate, endDate, child_condition, searchText, startTime, endTime, result, finalResult_1, temp_patient_1, obj, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        defaultPage = void 0;
                        count = void 0;
                        populateFeilds = [
                            {
                                path: "patient_id",
                                select: ["first_name", "last_name", "patientId", "image"],
                            },
                        ];
                        condition = {
                            isDeleted: false,
                            status: "Accepted",
                            //clinic_id: model.clinic_id,
                        };
                        if (model.clinic_id)
                            condition.clinic_id = model.clinic_id;
                        if (model.doctor_id)
                            condition.doctor_id = model.doctor_id;
                        if (model.location_id)
                            condition.location_id = model.location_id;
                        if (model.startDateFilter && model.endDateFilter)
                            condition.startDateTime = {
                                $gte: new Date(model.startDateFilter),
                                $lt: new Date(model.endDateFilter),
                            };
                        else {
                            if (new Date(model.nowTime ? model.nowTime : new Date()).toString() ==
                                "Invalid Date")
                                return [2 /*return*/, {
                                        status_code: http_status_codes_1.default.UNAUTHORIZED,
                                        success: false,
                                        data: {
                                            message: erros_message_1.default.dateReq,
                                            error: erros_message_1.default.ON_FETCH_ERROR,
                                        },
                                    }];
                            startDate = (0, moment_1.default)(model.nowTime).utc();
                            endDate = (0, moment_1.default)(model.nowTime).utc();
                            if (model.days) {
                                switch (model.days) {
                                    case "TODAY":
                                        endDate = moment_1.default.utc(new Date());
                                        break;
                                    case "LAST7":
                                        startDate = (0, moment_1.default)(endDate).subtract(7, "days").utc();
                                        break;
                                    case "LAST_MONTH":
                                        startDate = (0, moment_1.default)(startDate)
                                            .subtract(1, "month")
                                            .startOf("month")
                                            .utc();
                                        endDate = (0, moment_1.default)(startDate).endOf("month").utc();
                                        break;
                                    default:
                                        return [2 /*return*/, {
                                                status_code: http_status_codes_1.default.UNAUTHORIZED,
                                                success: false,
                                                data: {
                                                    message: erros_message_1.default.SomeThingWentWrong,
                                                    error: erros_message_1.default.ON_FETCH_ERROR,
                                                },
                                            }];
                                }
                            }
                            // condition.startDateTime = {
                            //   $gte: new Date(model.nowTime),
                            //   $lt: new Date(model.nowTime),
                            // };
                        }
                        child_condition = {};
                        if (model.searchText && model.searchText !== "") {
                            searchText = decodeURIComponent(model.searchText).replace(/[[\]{}()*+?,\\^$|#\s]/g, "\\s+");
                            child_condition.$or = [
                                {
                                    "patientData.first_name": new RegExp(common_methods_1.default.getEncryptText(searchText.toUpperCase()), "gi"),
                                },
                                {
                                    "patientData.last_name": new RegExp(common_methods_1.default.getEncryptText(searchText.toUpperCase()), "gi"),
                                },
                            ];
                        }
                        startTime = new Date(model.nowTime ? model.nowTime : new Date());
                        startTime.setHours(0, 0, 0, 0);
                        endTime = new Date(model.nowTime ? model.nowTime : new Date());
                        endTime.setHours(23, 59, 59, 999);
                        condition.startDateTime = {
                            // $gte: startTime,
                            $lte: endTime,
                        };
                        defaultPage = model.pageNumber ? model.pageNumber : 1;
                        count = model.pageSize ? model.pageSize : 50;
                        return [4 /*yield*/, appointment_model_1.default.paginate(condition, __assign(__assign({ page: defaultPage }, (count > 0 ? { limit: count } : { pagination: false })), { populate: populateFeilds, sort: { createdAt: -1 } }))];
                    case 1:
                        result = _a.sent();
                        if (result && result.docs && result.docs.length > 0) {
                            finalResult_1 = [];
                            temp_patient_1 = {};
                            result.docs.forEach(function (appointment) {
                                if (appointment.patient_id) {
                                    temp_patient_1 = {
                                        _id: appointment.patient_id._id,
                                        image: appointment.patient_id.image,
                                        //_id: appointment.patient_id._id,
                                        patientId: appointment.patient_id.patientId,
                                        first_name: common_methods_1.default.getDecryptText(appointment.patient_id.first_name),
                                        last_name: common_methods_1.default.getDecryptText(appointment.patient_id.last_name),
                                    };
                                }
                                // console.log(appointment.patient_id.first_name);
                                // // if (appointment.patient_id) {
                                // appointment.patient_id.first_name =
                                //   appointment.patient_id && appointment.patient_id.first_name
                                //     ? Utility.getDecryptText(appointment.patient_id.first_name)
                                //     : "";
                                // appointment.patient_id.last_name =
                                //   appointment.patient_id && appointment.patient_id.last_name
                                //     ? Utility.getDecryptText(appointment.patient_id.last_name)
                                //     : "";
                                // }
                                var temp = {
                                    title: appointment.title,
                                    status: appointment.status,
                                    patientData: temp_patient_1,
                                    endDateTime: appointment.endDateTime,
                                    startDateTime: appointment.startDateTime,
                                    appointment_number: appointment.appointment_number,
                                    appointment_id: appointment._id,
                                    checkInTime: appointment.startDateTime,
                                    isRecurring: appointment.recurring
                                        ? appointment.recurring.status
                                        : false,
                                    rescheduleData: {
                                        type: appointment.type,
                                    },
                                    bookedBy: appointment.patient_id &&
                                        appointment.patient_id._id &&
                                        appointment.patient_id._id.toString() ===
                                            appointment.createdby_id.toString()
                                        ? "PATIENT"
                                        : "CLINIC",
                                };
                                finalResult_1.push(temp);
                            });
                            obj = {
                                data: finalResult_1,
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
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_RECORD_FOUND,
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
        this.pendingCheckoutPatientList = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var nowTime, clinic_id, doctor_id, location_id, patient_id, days, count, skip, condition, sortObject, child_condition, data, obj, finalResponse_2, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        nowTime = model.nowTime, clinic_id = model.clinic_id, doctor_id = model.doctor_id, location_id = model.location_id, patient_id = model.patient_id, days = model.days;
                        count = model.pageSize ? model.pageSize : 50;
                        req.body.page = model.pageNumber ? model.pageNumber : 1;
                        skip = count * (req.body.page - 1);
                        condition = {
                            isDeleted: false,
                            status: "Accepted",
                            // clinic_id: new mongoose.Types.ObjectId(
                            //   clinic_id.toString()
                            // ),
                        }, sortObject = { startDateTime: -1 };
                        if (clinic_id)
                            condition.clinic_id = new mongoose_1.default.Types.ObjectId(clinic_id.toString());
                        if (doctor_id)
                            condition.doctor_id = new mongoose_1.default.Types.ObjectId(doctor_id.toString());
                        if (location_id)
                            condition.location_id = new mongoose_1.default.Types.ObjectId(location_id.toString());
                        if (model.startDateFilter && model.endDateFilter)
                            condition.startDateTime = {
                                $gte: new Date(model.startDateFilter),
                                $lte: new Date(model.endDateFilter),
                            };
                        else {
                            // if (nowTime)
                            //   condition.startDateTime = {
                            //     $lte: new Date(nowTime),
                            //   };
                            // // else
                            condition.startDateTime = {
                                $lte: new Date(),
                            };
                        }
                        child_condition = {};
                        if (patient_id) {
                            child_condition = {
                                "patientData._id": new mongoose_1.default.Types.ObjectId(model.patient_id.toString()),
                            };
                        }
                        return [4 /*yield*/, appointment_model_1.default.aggregate([
                                { $match: condition },
                                {
                                    $lookup: {
                                        from: "patients",
                                        let: { patient_id: "$patient_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: { $eq: ["$_id", "$$patient_id"] },
                                                },
                                            },
                                            {
                                                $project: {
                                                    first_name: 1,
                                                    patientId: 1,
                                                    last_name: 1,
                                                    image: 1,
                                                },
                                            },
                                        ],
                                        as: "patientData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$patientData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                { $match: child_condition },
                                {
                                    $facet: {
                                        totalCount: [{ $count: "sum" }],
                                        aggregatedData: [
                                            {
                                                $project: {
                                                    _id: 0,
                                                    title: 1,
                                                    status: 1,
                                                    patientData: 1,
                                                    endDateTime: 1,
                                                    // doctorData: 1,
                                                    // clinicData: 1,
                                                    startDateTime: 1,
                                                    appointment_number: 1,
                                                    appointment_id: "$_id",
                                                    // color: '$apptTypeData.color',
                                                    checkInTime: "$startDateTime",
                                                    isRecurring: "$recurring.status",
                                                    rescheduleData: {
                                                        type: "$reschedule.type",
                                                    },
                                                    bookedBy: {
                                                        $cond: {
                                                            if: {
                                                                $eq: ["$patient_id", "$createdby_id"],
                                                            },
                                                            then: "PATIENT",
                                                            else: "CLINIC",
                                                        },
                                                    },
                                                },
                                            },
                                            // { $sort: sortObject },
                                            { $limit: skip + count },
                                            { $skip: skip },
                                        ],
                                    },
                                },
                            ])];
                    case 1:
                        data = _a.sent();
                        if (data[0].aggregatedData.length) {
                            data[0].aggregatedData.forEach(function (appointment) {
                                if (appointment.patientData) {
                                    appointment.patientData.first_name = appointment.patientData
                                        .first_name
                                        ? common_methods_1.default.getDecryptText(appointment.patientData.first_name)
                                        : "";
                                    appointment.patientData.last_name = appointment.patientData
                                        .last_name
                                        ? common_methods_1.default.getDecryptText(appointment.patientData.last_name)
                                        : "";
                                }
                            });
                            obj = {};
                            obj = {
                                data: data[0].aggregatedData,
                                totalDocs: data[0].totalCount[0].sum,
                            };
                            if (model.searchText) {
                                console.log(model.searchText);
                                finalResponse_2 = [];
                                data[0].aggregatedData.forEach(function (appointment) {
                                    if (appointment.patientData) {
                                        if (common_methods_1.default.getDecryptText(appointment.patientData.first_name).toUpperCase() === model.searchText.toUpperCase() ||
                                            common_methods_1.default.getDecryptText(appointment.patientData.last_name).toUpperCase() === model.searchText.toUpperCase())
                                            finalResponse_2.push(appointment);
                                    }
                                });
                                obj = {
                                    data: finalResponse_2,
                                    totalDocs: finalResponse_2.length,
                                };
                            }
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    data: obj,
                                    success: true,
                                }];
                        }
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_RECORD_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 3];
                    case 2:
                        error_10 = _a.sent();
                        next(error_10);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.checkoutList = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, error_11;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        _a = model.tab;
                        switch (_a) {
                            case "PENDING": return [3 /*break*/, 1];
                            case "NO_SHOW": return [3 /*break*/, 3];
                            case "CHECKED_OUT": return [3 /*break*/, 3];
                            case "NO_SHOW_CHARGABLE": return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.pendingCheckoutPatientList(req, model, next)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: return [4 /*yield*/, this.checkedOutPatient(req, model, next)];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.UNAUTHORIZED,
                            success: false,
                            data: {
                                message: erros_message_1.default.SomeThingWentWrong,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_11 = _b.sent();
                        next(error_11);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.checkedOutPatient = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var count, skip, sortObject, condition, apptCondition, child_condition, data, obj, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        count = model.pageSize ? model.pageSize : 50;
                        req.body.page = model.pageNumber ? model.pageNumber : 1;
                        skip = count * (req.body.page - 1);
                        sortObject = { checkoutTime: -1 };
                        condition = {};
                        apptCondition = {};
                        condition = {
                        // clinic_id: new mongoose.Types.ObjectId(model.clinic_id!.toString()),
                        };
                        if (model.clinic_id)
                            condition.clinic_id = new mongoose_1.default.Types.ObjectId(model.clinic_id.toString());
                        if (model.tab == "NO_SHOW") {
                            if ("chargePatient" in model &&
                                model.chargePatient != undefined &&
                                model.chargePatient != null) {
                                condition.chargePatient = model.chargePatient;
                            }
                            if (model.startDateFilter && model.endDateFilter) {
                                // if (!model.todayCase == true)
                                // condition.checkoutTime = {
                                //   $lt: new Date(moment(model.nowTime).add(24, "h")),
                                //   $gte: new Date(model.nowTime),
                                // };
                                // condition.checkoutTime = {
                                //   $gte: new Date(model.startDateFilter),
                                //   $lte: new Date(model.endDateFilter),
                                // };
                                apptCondition = {
                                    startDateTime: {
                                        $gte: new Date(model.startDateFilter),
                                        $lte: new Date(model.endDateFilter),
                                    },
                                };
                            }
                            // else {
                            //   // if (nowTime)
                            //   //   condition.startDateTime = {
                            //   //     $lte: new Date(nowTime),
                            //   //   };
                            //   // // else
                            //   condition.checkoutTime = {
                            //     $lte: new Date(),
                            //   };
                            // }
                        }
                        condition.noShow = true;
                        if (model.tab == "CHECKED_OUT") {
                            //condition.billGenerated = false;
                            if (model.startDateFilter && model.endDateFilter) {
                                // if (!model.todayCase == true)
                                // condition.checkoutTime = {
                                //   $lt: new Date(moment(model.nowTime).add(24, "h")),
                                //   $gte: new Date(model.nowTime),
                                // };
                                // condition.checkoutTime = {
                                //   $gte: new Date(model.startDateFilter),
                                //   $lte: new Date(model.endDateFilter),
                                // };
                                apptCondition = {
                                    startDateTime: {
                                        $gte: new Date(model.startDateFilter),
                                        $lte: new Date(model.endDateFilter),
                                    },
                                };
                            }
                            //  else {
                            //   // if (nowTime)
                            //   //   condition.startDateTime = {
                            //   //     $lte: new Date(nowTime),
                            //   //   };
                            //   // // else
                            //   condition.checkoutTime = {
                            //     $lte: new Date(),
                            //   };
                            // }
                            condition.noShow = false;
                        }
                        if (model.tab == "NO_SHOW_CHARGABLE") {
                            condition.noShow = true;
                            condition.chargePatient = true;
                        }
                        if (model.doctor_id)
                            condition.doctor_id = new mongoose_1.default.Types.ObjectId(model.doctor_id.toString());
                        if (model.location_id)
                            condition.location_id = new mongoose_1.default.Types.ObjectId(model.location_id.toString());
                        child_condition = {};
                        if (model.patient_id) {
                            child_condition = {
                                "patientData._id": new mongoose_1.default.Types.ObjectId(model.patient_id.toString()),
                            };
                        }
                        return [4 /*yield*/, doctor_checkout_model_1.default.aggregate([
                                { $match: condition },
                                {
                                    $lookup: {
                                        from: "appointment",
                                        localField: "appointment_id",
                                        foreignField: "_id",
                                        pipeline: [{ $match: apptCondition }],
                                        as: "appointmentData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$appointmentData",
                                        preserveNullAndEmptyArrays: false,
                                    },
                                },
                                // {
                                //   $lookup: {
                                //     from: "super_bill",
                                //     localField: "appointment_id",
                                //     foreignField: "appointment_id",
                                //     pipeline: [
                                //       {
                                //         $project: {
                                //           _id: 1,
                                //         },
                                //       },
                                //     ],
                                //     as: "superBillFound",
                                //   },
                                // },
                                // {
                                //   $match: {
                                //     "superBillFound.0": {
                                //       $exists: false,
                                //     },
                                //   },
                                // },
                                {
                                    $lookup: {
                                        from: "doctor",
                                        let: { doctor_id: "$doctor_id" },
                                        //localField: "doctor_id",
                                        // foreignField: "_id",
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: { $eq: ["$_id", "$$doctor_id"] },
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "users",
                                                    let: { user_id: "$user_id" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $eq: ["$_id", "$$user_id"],
                                                                },
                                                            },
                                                        },
                                                        {
                                                            $project: {
                                                                first_name: 1,
                                                                last_name: 1,
                                                            },
                                                        },
                                                    ],
                                                    as: "userData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$userData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $project: {
                                                    first_name: "$userData.first_name",
                                                    last_name: "$userData.last_name",
                                                },
                                            },
                                        ],
                                        as: "doctorData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$doctorData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "patients",
                                        let: { patient_id: "$patient_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: { $eq: ["$_id", "$$patient_id"] },
                                                },
                                            },
                                            {
                                                $project: {
                                                    first_name: 1,
                                                    patientId: 1,
                                                    last_name: 1,
                                                    image: 1,
                                                },
                                            },
                                        ],
                                        as: "patientData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$patientData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "clinic_locations",
                                        let: { location_id: "$location_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: { $eq: ["$_id", "$$location_id"] },
                                                },
                                            },
                                            {
                                                $project: {
                                                    city: "$city",
                                                    branchName: "$branchName",
                                                    address: "$address",
                                                },
                                            },
                                        ],
                                        as: "locationData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$locationData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                // {
                                //   $lookup: {
                                //     from: "users",
                                //     let: { doctor_id: "$doctor_id" },
                                //     pipeline: [
                                //       {
                                //         $match: {
                                //           $expr: { $eq: ["$_id", "$$doctor_id"] },
                                //         },
                                //       },
                                //       {
                                //         $project: {
                                //           image: "$image",
                                //           last_name: "$last_name",
                                //           first_name: "$first_name",
                                //         },
                                //       },
                                //     ],
                                //     as: "doctorData",
                                //   },
                                // },
                                // {
                                //   $unwind: {
                                //     path: "$doctorData",
                                //     preserveNullAndEmptyArrays: true,
                                //   },
                                // },
                                { $match: child_condition },
                                {
                                    $facet: {
                                        totalCount: [{ $count: "sum" }],
                                        aggregatedData: [
                                            {
                                                $project: {
                                                    _id: 0,
                                                    remark: 1,
                                                    doctorData: 1,
                                                    patientData: 1,
                                                    locationData: 1,
                                                    checkoutTime: 1,
                                                    chargePatient: 1,
                                                    checkout_id: "$_id",
                                                    appointmentData: 1,
                                                    // checkoutTime: "$checkoutTime",
                                                    appointment_id: "$appointment_id",
                                                    endDateTime: "$appointmentData.endDateTime",
                                                    checkInTime: "$appointmentData.startDateTime",
                                                    startDateTime: "$appointmentData.startDateTime",
                                                    appointment_number: "$appointmentData.appointment_number",
                                                    billGenerated: 1,
                                                },
                                            },
                                            //{ $sort: sortObject },
                                            { $limit: skip + count },
                                            { $skip: skip },
                                        ],
                                    },
                                },
                            ])];
                    case 1:
                        data = _a.sent();
                        if (data[0] && data[0].aggregatedData && data[0].aggregatedData.length) {
                            data[0].aggregatedData.forEach(function (appointment) {
                                appointment.patientData.first_name = appointment.patientData
                                    .first_name
                                    ? common_methods_1.default.getDecryptText(appointment.patientData.first_name)
                                    : "";
                                appointment.patientData.last_name = appointment.patientData.last_name
                                    ? common_methods_1.default.getDecryptText(appointment.patientData.last_name)
                                    : "";
                            });
                            obj = {
                                data: data[0].aggregatedData,
                                totalDocs: data[0].totalCount[0].sum,
                            };
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: obj,
                                    // {
                                    //   data: {
                                    //     data: data[0].aggregatedData,
                                    //     totalCount: data[0].totalCount[0].sum,
                                    //   },
                                    // },
                                }];
                            //return res.json(Response(constants.statusCode.ok, constants.messages.ExecutedSuccessfully, data[0].aggregatedData, data[0].totalCount[0].sum))
                        }
                        // return {
                        //   status_code: HttpStatus.UNAUTHORIZED,
                        //   success: false,
                        //   data: {
                        //     message: errorMessage.SomeThingWentWrong,
                        //     error: errorMessage.ON_FETCH_ERROR,
                        //   },
                        // };
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_RECORD_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 3];
                    case 2:
                        error_12 = _a.sent();
                        next(error_12);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        ///////////////////////********************************************************************************************************** */
        //API for patient checkout process
        this.checkoutPatient = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var UserDetails, cptCodeForBilling_1, appointmentAggregation, appointmentData, checkoutTime, duration, providerCheckoutObj, superBillObj, followUp, placeOfService, notes, addHistory, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        console.log(model);
                        UserDetails = req.user;
                        cptCodeForBilling_1 = [];
                        model.codes.cptCode.forEach(function (el) {
                            return cptCodeForBilling_1.push({ code_id: el });
                        });
                        appointmentAggregation = [
                            {
                                $match: {
                                    _id: new mongoose_1.default.Types.ObjectId(model.appointment_id.toString()),
                                    clinic_id: new mongoose_1.default.Types.ObjectId(model.clinic_id.toString()),
                                },
                            },
                            {
                                $lookup: {
                                    from: "filledProgressNotes",
                                    let: { appointmentId: "$_id" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ["$appointment_id", "$$appointmentId"],
                                                },
                                            },
                                        },
                                        { $project: { _id: 1 } },
                                    ],
                                    as: "hasProgressnotes",
                                },
                            },
                            {
                                $lookup: {
                                    from: "doctorcheckout",
                                    pipeline: [
                                        {
                                            $match: {
                                                clinic_id: new mongoose_1.default.Types.ObjectId(model.clinic_id.toString()),
                                                appointment_id: new mongoose_1.default.Types.ObjectId(model.appointment_id.toString()),
                                            },
                                        },
                                        { $project: { _id: 1 } },
                                    ],
                                    as: "doctorcheckoutDetails",
                                },
                            },
                            {
                                $lookup: {
                                    from: "patients",
                                    localField: "patient_id",
                                    foreignField: "_id",
                                    as: "patientData",
                                },
                            },
                            {
                                $unwind: {
                                    path: "$patientData",
                                    preserveNullAndEmptyArrays: true,
                                },
                            },
                            {
                                $lookup: {
                                    from: "financialclasses",
                                    localField: "patientData.financialClass_id",
                                    foreignField: "_id",
                                    as: "financialClassData",
                                },
                            },
                            {
                                $lookup: {
                                    from: "clinic",
                                    let: { clinic_id: "$clinic_id" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ["$_id", "$$clinic_id"],
                                                },
                                            },
                                        },
                                        { $project: { clinicPolicy: 1 } },
                                    ],
                                    as: "clinicData",
                                },
                            },
                            {
                                $unwind: {
                                    path: "$clinicData",
                                    preserveNullAndEmptyArrays: true,
                                },
                            },
                            {
                                $lookup: {
                                    from: "insurance",
                                    let: { patient_id: "$patient_id" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ["$patient_id", "$$patient_id"],
                                                },
                                                coverage: "Primary",
                                            },
                                        },
                                        { $sort: { coverage: 1 } },
                                    ],
                                    as: "insuranceData",
                                },
                            },
                            {
                                $unwind: {
                                    path: "$insuranceData",
                                    preserveNullAndEmptyArrays: true,
                                },
                            },
                            {
                                $lookup: {
                                    from: "cpt",
                                    let: { cptCodeArr: cptCodeForBilling_1 },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $in: ["$_id", "$$cptCodeArr.code_id"],
                                                },
                                            },
                                        },
                                        {
                                            $group: {
                                                _id: null,
                                                total: { $sum: "$price" },
                                            },
                                        },
                                    ],
                                    as: "cptCodes",
                                },
                            },
                            {
                                $unwind: {
                                    path: "$cptCodes",
                                    preserveNullAndEmptyArrays: true,
                                },
                            },
                        ];
                        return [4 /*yield*/, appointment_model_1.default.aggregate(appointmentAggregation)];
                    case 1:
                        appointmentData = _a.sent();
                        appointmentData = appointmentData[0];
                        if (appointmentData && appointmentData.doctorcheckoutDetails.length)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.billingMsg.alreadyCheckedout,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                }];
                        if (!appointmentData ||
                            model.clinic_id.toString() != appointmentData.clinic_id.toString())
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.apptNotFound,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                }];
                        if (appointmentData.status == "Unavailability")
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    success: false,
                                    data: {
                                        message: "Can not checkout unavailability",
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                }];
                        if (appointmentData.status != "Accepted")
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.incorrectAction(appointmentData.status, "checkout"),
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                }];
                        checkoutTime = model.nowTime;
                        duration = appointmentData.duration;
                        providerCheckoutObj = {
                            duration: duration,
                            doctor_id: appointmentData.doctor_id.toString(),
                            clinic_id: model.clinic_id,
                            appointment_id: model.appointment_id,
                            createdby_id: UserDetails._id,
                            checkoutTime: checkoutTime,
                            patient_id: appointmentData.patient_id.toString(),
                        };
                        providerCheckoutObj.location_id = appointmentData.location_id.toString();
                        if (!model.noShow) return [3 /*break*/, 4];
                        providerCheckoutObj.noShow = true;
                        providerCheckoutObj.chargePatient = model.chargePatient;
                        if (!model.chargePatient) return [3 /*break*/, 3];
                        superBillObj = {
                            patient_id: appointmentData.patient_id.toString(),
                            appointment_id: model.appointment_id,
                            clinic_id: model.clinic_id,
                            referring_provider_id: appointmentData.doctor_id,
                            fromDate: appointmentData.startDateTime,
                            toDate: appointmentData.endDateTime,
                            duration: appointmentData.duration,
                            place_of_service: model.placeOfService,
                            total_amount: appointmentData.clinicData &&
                                appointmentData.clinicData.clinicPolicy
                                ? appointmentData.clinicData.clinicPolicy.noShowCharge
                                : 0,
                            notes: model.remark,
                            createdby_id: UserDetails._id,
                            location_id: appointmentData.location_id,
                            codes: {
                                ICD_9: [],
                                ICD_10: [],
                                cptCode: [],
                            },
                            copay: {
                                type: "FULL",
                                amount: appointmentData.clinicData.clinicPolicy.noShowCharge,
                                full: {},
                            },
                        };
                        if (appointmentData.patientData.payment &&
                            appointmentData.patientData.payment.full.type == "CARD" &&
                            appointmentData.patientData.payment.full.card_id) {
                            superBillObj.copay.full = {
                                type: "CARD",
                                card_id: appointmentData.patientData.payment.full.card_id,
                            };
                        }
                        else
                            superBillObj.copay.full = { type: "CASH" };
                        return [4 /*yield*/, super_bill_model_1.default.create(superBillObj)];
                    case 2:
                        _a.sent();
                        providerCheckoutObj.billGenerated = true;
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        followUp = model.followUp, placeOfService = model.placeOfService, notes = model.notes;
                        providerCheckoutObj.followUp = followUp;
                        providerCheckoutObj.placeOfService = placeOfService;
                        // await checkoutValidation.validateAsync(
                        //   providerCheckoutObj
                        // );
                        providerCheckoutObj.codes = model.codes;
                        providerCheckoutObj.notes = model.notes;
                        providerCheckoutObj.remark = model.remark;
                        _a.label = 5;
                    case 5: 
                    // // ! UNCOMMENT THIS BEFORE LIVE
                    return [4 /*yield*/, appointment_model_1.default.findByIdAndUpdate(model.appointment_id, { status: "Checkout" }, { new: true }).lean()];
                    case 6:
                        // // ! UNCOMMENT THIS BEFORE LIVE
                        _a.sent();
                        providerCheckoutObj.payer_id = model.payer_id;
                        providerCheckoutObj.insurance_name = model.insurance_name;
                        providerCheckoutObj.insurance_id = model.insurance_id;
                        return [4 /*yield*/, doctor_checkout_model_1.default.create(providerCheckoutObj)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: UserDetails._id,
                                description: model.noShow == false
                                    ? "patient checkout successfully"
                                    : "patient moved to no show list",
                                type: history_model_1.EHistoryActivityTypeValues.CHECKOUT,
                                type_id: appointmentData.patient_id,
                                // patient_id: appointmentData.patient_id,
                            })];
                    case 8:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.CHECK_OUT_DONE,
                            }];
                    case 9:
                        error_13 = _a.sent();
                        next(error_13);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        // patient Document Section
        this.addPatientDocument = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, modelToSave, response, addHistory, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        userDetails = req.user;
                        modelToSave = model;
                        modelToSave.createdby_id = userDetails._id;
                        return [4 /*yield*/, patient_document_model_2.default.create(modelToSave)];
                    case 1:
                        response = _a.sent();
                        if (!response) return [3 /*break*/, 3];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "patient document added successfully",
                                type: history_model_1.EHistoryActivityTypeValues.PATIENT,
                                type_id: model.patient_id,
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
                                message: erros_message_1.default.ERROR_ADD_PATIENT_DOC,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                        }];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_14 = _a.sent();
                        next(error_14);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.updatePatientDocument = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, foundPatientDoc, modelToSave, response, addHistory, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        userDetails = req.user;
                        return [4 /*yield*/, patient_document_model_2.default.findOne({
                                _id: model._id,
                                isDeleted: false,
                            })];
                    case 1:
                        foundPatientDoc = _a.sent();
                        if (!foundPatientDoc) return [3 /*break*/, 6];
                        modelToSave = model;
                        modelToSave.createdby_id = foundPatientDoc.createdby_id;
                        modelToSave.clinic_id = foundPatientDoc.clinic_id;
                        modelToSave.patient_id = foundPatientDoc.patient_id;
                        modelToSave.isDeleted = foundPatientDoc.isDeleted;
                        return [4 /*yield*/, patient_document_model_2.default.updateOne({ _id: model._id }, modelToSave)];
                    case 2:
                        response = _a.sent();
                        if (!(response && response.modifiedCount > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "patient document update successfully",
                                type: history_model_1.EHistoryActivityTypeValues.PATIENT,
                                type_id: foundPatientDoc.patient_id,
                            })];
                    case 3:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.PATIENT_DOC_UPDATED_SUCCESS,
                            }];
                    case 4: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ADD_PATIENT_DOC,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.PATIENT_DOC_DETAILS_NOT_FOUND,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                        }];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_15 = _a.sent();
                        next(error_15);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.getPatientDocumentDetails = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var foundPatientDoc, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, patient_document_model_2.default.findOne({
                                _id: req.params._id,
                                isDeleted: false,
                            })];
                    case 1:
                        foundPatientDoc = _a.sent();
                        if (foundPatientDoc) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: foundPatientDoc,
                                }];
                        }
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.PATIENT_DOC_DETAILS_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 3];
                    case 2:
                        error_16 = _a.sent();
                        next(error_16);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deletePatientDocumentDetails = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, foundPatientDoc, docDeletionResult, addHistory, error_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        userDetails = req.user;
                        return [4 /*yield*/, patient_document_model_2.default.findOne({
                                _id: req.params._id,
                                isDeleted: false,
                            })];
                    case 1:
                        foundPatientDoc = _a.sent();
                        if (!foundPatientDoc) return [3 /*break*/, 6];
                        return [4 /*yield*/, patient_document_model_2.default.updateOne({ _id: foundPatientDoc._id }, { isDeleted: true })];
                    case 2:
                        docDeletionResult = _a.sent();
                        if (!(docDeletionResult && docDeletionResult.modifiedCount > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "patient document deleted successfully",
                                type: history_model_1.EHistoryActivityTypeValues.PATIENT,
                                type_id: foundPatientDoc.patient_id,
                            })];
                    case 3:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.PATIENT_DOC_DELETED_SUCCESS,
                            }];
                    case 4: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_DELETE_PATIENT_DOC,
                                error: erros_message_1.default.ON_DELETE_ERROR,
                            },
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.PATIENT_DOC_DETAILS_NOT_FOUND,
                                error: erros_message_1.default.ON_DELETE_ERROR,
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
        this.getPatientDocumentList = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var condition, defaultPage, count, tempResult, result, obj, error_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        condition = { isDeleted: false };
                        defaultPage = model.pageNumber ? model.pageNumber : 1;
                        count = model.pageSize ? model.pageSize : 10;
                        tempResult = void 0;
                        return [4 /*yield*/, patient_document_model_2.default.paginate(__assign({}, condition), __assign(__assign({ page: defaultPage }, (count > 0 ? { limit: count } : { pagination: false })), { options: {
                                    projection: {
                                        title: 1,
                                        document: 1,
                                        description: 1,
                                    },
                                }, sort: { createdAt: -1 } }))];
                    case 1:
                        result = _a.sent();
                        tempResult = result;
                        if (result && result.docs && result.docs.length > 0) {
                            obj = void 0;
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
                                        message: erros_message_1.default.PATIENT_DOCUMENT_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_18 = _a.sent();
                        next(error_18);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        //Assigned provider to patient or  assignedpatients to providers
        this.assignProviderToPatient = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails_1, modelToSave, condition, previousData, deleteArr_1, insertArr_1, addHistory, condition, previousData, deleteArr_2, insertArr_2, addHistory, error_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 16, , 17]);
                        userDetails_1 = req.user;
                        modelToSave = model;
                        modelToSave.createdby_id = userDetails_1._id;
                        modelToSave.clinic_id = model.clinic_id;
                        if (!(model.type == assigned_provider_to_patients_viewmodel_1.EAssProvTypeValues.ASSIGN_PATIENT &&
                            model.providerArr &&
                            model.providerArr.length == 1)) return [3 /*break*/, 7];
                        condition = {
                            clinic_id: model.clinic_id,
                            doctor_id: model.providerArr[0],
                        };
                        return [4 /*yield*/, assigned_provider_model_1.default.find(condition).lean()];
                    case 1:
                        previousData = _a.sent();
                        deleteArr_1 = [];
                        previousData.forEach(function (el) {
                            var include = model.patientArr.includes(el.patient_id.toString());
                            if (include)
                                model.patientArr = model.patientArr.filter(function (item) { return item != el.patient_id.toString(); });
                            else
                                deleteArr_1.push(new mongoose_1.default.Types.ObjectId(el.patient_id));
                        });
                        if (!deleteArr_1.length) return [3 /*break*/, 3];
                        return [4 /*yield*/, assigned_provider_model_1.default.deleteMany({
                                doctor_id: model.providerArr[0],
                                patient_id: { $in: deleteArr_1 },
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!(model.patientArr && model.patientArr.length)) return [3 /*break*/, 6];
                        insertArr_1 = [];
                        model.patientArr.forEach(function (el) {
                            insertArr_1.push({
                                doctor_id: model.providerArr[0],
                                patient_id: el,
                                createdby_id: userDetails_1._id,
                                clinic_id: model.clinic_id,
                            });
                        });
                        return [4 /*yield*/, assigned_provider_model_1.default.insertMany(insertArr_1)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails_1._id,
                                description: "patient assigned successfully",
                                type: history_model_1.EHistoryActivityTypeValues.PATIENT,
                                // type_id:model.
                            })];
                    case 5:
                        addHistory = _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 15];
                    case 7:
                        if (!(model.type == "ASSIGN_PROVIDER" &&
                            model.patientArr &&
                            model.patientArr.length == 1)) return [3 /*break*/, 14];
                        condition = {
                            clinic_id: model.clinic_id,
                            patient_id: model.patientArr[0],
                        };
                        return [4 /*yield*/, assigned_provider_model_1.default.find(condition).lean()];
                    case 8:
                        previousData = _a.sent();
                        deleteArr_2 = [];
                        previousData.forEach(function (el) {
                            var include = model.providerArr.includes(el.doctor_id.toString());
                            if (include)
                                model.providerArr = model.providerArr.filter(function (item) { return item != el.doctor_id.toString(); });
                            else
                                deleteArr_2.push(new mongoose_1.default.Types.ObjectId(el.doctor_id));
                        });
                        if (!deleteArr_2.length) return [3 /*break*/, 10];
                        return [4 /*yield*/, assigned_provider_model_1.default.deleteMany({
                                patient_id: model.patientArr[0],
                                doctor_id: { $in: deleteArr_2 },
                            })];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        if (!model.providerArr.length) return [3 /*break*/, 13];
                        insertArr_2 = [];
                        model.providerArr.forEach(function (el) {
                            insertArr_2.push({
                                patient_id: model.patientArr[0],
                                doctor_id: el,
                                createdby_id: userDetails_1._id,
                                clinic_id: model.clinic_id,
                            });
                        });
                        return [4 /*yield*/, assigned_provider_model_1.default.insertMany(insertArr_2)];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails_1._id,
                                description: "provider assigned successfully",
                                type: history_model_1.EHistoryActivityTypeValues.PROVIDER,
                            })];
                    case 12:
                        addHistory = _a.sent();
                        _a.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.UNAUTHORIZED,
                            success: false,
                            data: {
                                message: erros_message_1.default.SomeThingWentWrong,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                        }];
                    case 15: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.OK,
                            success: true,
                            data: erros_message_1.default.UPDATE_SUCCESSFULL,
                        }];
                    case 16:
                        error_19 = _a.sent();
                        next(error_19);
                        return [3 /*break*/, 17];
                    case 17: return [2 /*return*/];
                }
            });
        }); };
        this.getAssignedProviderOrPatient = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, patient_id, doctor_id, clinic_id, type, data, condition, child_condition, sortObject, condition, sortObject, finalResponse_3, error_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        userDetails = req.user;
                        patient_id = model.patient_id, doctor_id = model.doctor_id, clinic_id = model.clinic_id, type = model.type;
                        data = void 0;
                        if (!(type == "PROVIDER_LIST")) return [3 /*break*/, 2];
                        if (!patient_id)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.PATIENT_ID_NOT_EMPTY,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        condition = {
                            clinic_id: clinic_id,
                            isVerified: true,
                        }, child_condition = {
                            "userData.isActive": true,
                            "userData.isDeleted": false,
                        }, sortObject = { firstName: 1 };
                        return [4 /*yield*/, doctor_model_1.default.aggregate([
                                { $match: condition },
                                {
                                    $lookup: {
                                        from: "users",
                                        localField: "user_id",
                                        foreignField: "_id",
                                        as: "userData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$userData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "assignedProvider",
                                        let: { user_id: "$user_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $and: [
                                                            {
                                                                $eq: ["$doctor_id", "$$user_id"],
                                                            },
                                                            {
                                                                $eq: [
                                                                    "$patient_id",
                                                                    new mongoose_1.default.Types.ObjectId(patient_id.toString()),
                                                                ],
                                                            },
                                                        ],
                                                    },
                                                },
                                            },
                                        ],
                                        as: "isAssignedData",
                                    },
                                },
                                { $match: child_condition },
                                {
                                    $facet: {
                                        totalCount: [{ $count: "sum" }],
                                        aggregatedData: [
                                            {
                                                $project: {
                                                    _id: "$user_id",
                                                    first_name: "$userData.first_name",
                                                    last_name: "$userData.last_name",
                                                    isChecked: {
                                                        $cond: {
                                                            if: {
                                                                $eq: [{ $size: "$isAssignedData" }, 1],
                                                            },
                                                            then: true,
                                                            else: false,
                                                        },
                                                    },
                                                },
                                            },
                                            // { $sort: sortObject },
                                            // { $limit: parseInt(skip) + parseInt(count) },
                                            // { $skip: parseInt(skip) },
                                        ],
                                    },
                                },
                            ])];
                    case 1:
                        data = _a.sent();
                        if (data[0].aggregatedData.length)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: data[0].aggregatedData,
                                    // data[0].totalCount[0].sum
                                }];
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_RECORD_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(type == "PATIENT_LIST")) return [3 /*break*/, 4];
                        if (!doctor_id)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.DOCTOR_ID_NOT_EMPTY,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        condition = {
                            clinic_id: new mongoose_1.default.Types.ObjectId(clinic_id.toString()),
                        }, sortObject = { isChecked: -1, _id: -1 };
                        return [4 /*yield*/, patient_model_1.default.aggregate([
                                { $match: condition },
                                {
                                    $lookup: {
                                        from: "assignedProvider",
                                        let: { user_id: "$_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $and: [
                                                            {
                                                                $eq: ["$patient_id", "$$user_id"],
                                                            },
                                                            {
                                                                $eq: [
                                                                    "$doctor_id",
                                                                    new mongoose_1.default.Types.ObjectId(doctor_id.toString()),
                                                                ],
                                                            },
                                                        ],
                                                    },
                                                },
                                            },
                                            { $project: { _id: 1 } },
                                        ],
                                        as: "isCheckedData",
                                    },
                                },
                                {
                                    $facet: {
                                        totalCount: [{ $count: "sum" }],
                                        aggregatedData: [
                                            {
                                                $project: {
                                                    _id: "$_id",
                                                    first_name: 1,
                                                    last_name: 1,
                                                    isChecked: {
                                                        $cond: {
                                                            if: {
                                                                $eq: [{ $size: "$isCheckedData" }, 1],
                                                            },
                                                            then: true,
                                                            else: false,
                                                        },
                                                    },
                                                },
                                            },
                                            // { $sort: sortObject },
                                            // { $limit: parseInt(skip) + parseInt(count) },
                                            // { $skip: parseInt(skip) },
                                        ],
                                    },
                                },
                            ])];
                    case 3:
                        data = _a.sent();
                        if (data[0].aggregatedData.length) {
                            finalResponse_3 = [{ totalCount: data[0].totalCount[0].sum }];
                            //  decrypt patient details
                            data[0].aggregatedData.forEach(function (obj) {
                                obj.first_name = common_methods_1.default.getDecryptText(obj.first_name);
                                obj.last_name = common_methods_1.default.getDecryptText(obj.last_name);
                                finalResponse_3.push(obj);
                            });
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: finalResponse_3,
                                }];
                        }
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_RECORD_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.SomeThingWentWrong,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_20 = _a.sent();
                        next(error_20);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        // Download Checkout  data
        this.getCheckoutDataToExcel = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, result, workbook, checkoutSheet_1, checkoutSheetHeader, sheetStyle_2, checkoutData, data, link, excelFileName, response, result1, workbook1, checkoutSheet1_1, checkoutSheetHeader1, sheetStyle1_1, checkoutData1, data1, link1, excelFileName1, response1, error_21;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 13, , 14]);
                        _a = model.tab;
                        switch (_a) {
                            case "PENDING": return [3 /*break*/, 1];
                            case "NO_SHOW": return [3 /*break*/, 6];
                            case "CHECKED_OUT": return [3 /*break*/, 6];
                            case "NO_SHOW_CHARGABLE": return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 11];
                    case 1: return [4 /*yield*/, this.pendingCheckoutPatientList(req, model, next)];
                    case 2:
                        result = _b.sent();
                        if (result && result.data.data.length <= 0)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_RECORD_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [4 /*yield*/, xlsx_populate_1.default.fromBlankAsync()];
                    case 3:
                        workbook = _b.sent();
                        checkoutSheet_1 = workbook.sheet("Sheet1");
                        checkoutSheetHeader = [
                            "Date",
                            "Time",
                            "Appointment ID",
                            "Patient ID",
                            "Patient Name",
                            "Check-In-Time",
                        ];
                        checkoutSheetHeader.forEach(function (el, i) {
                            checkoutSheet_1
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
                        sheetStyle_2 = {
                            border: true,
                            fontFamily: "Calibri",
                        };
                        checkoutData = result && result.data.data.length > 0 ? result.data.data : [];
                        checkoutData.forEach(function (el, i) {
                            checkoutSheet_1
                                .cell("A" + (i + 2))
                                .value((0, moment_1.default)(el.startDateTime).format("lll"))
                                .style(sheetStyle_2);
                            checkoutSheet_1;
                            checkoutSheet_1
                                .cell("B" + (i + 2))
                                .value((0, moment_1.default)(el.startDateTime).format("LT"))
                                .style(sheetStyle_2);
                            checkoutSheet_1
                                .cell("C" + (i + 2))
                                .value(el.appointment_number)
                                .style(sheetStyle_2);
                            checkoutSheet_1
                                .cell("D" + (i + 2))
                                .value(el.patientData.patientId)
                                .style(sheetStyle_2);
                            checkoutSheet_1
                                .cell("E" + (i + 2))
                                .value(el.patientData.first_name + " " + el.patientData.last_name)
                                .style(sheetStyle_2);
                            checkoutSheet_1
                                .cell("F" + (i + 2))
                                .value((0, moment_1.default)(el.checkInTime).format("LT"))
                                .style(sheetStyle_2);
                        });
                        checkoutSheet_1.freezePanes(1, 1);
                        return [4 /*yield*/, workbook.outputAsync()];
                    case 4:
                        data = _b.sent();
                        return [4 /*yield*/, fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../../../../public/upload/checkout/Checkout_Report.xlsx"), data)];
                    case 5:
                        _b.sent();
                        link = "http://".concat(req.hostname, ":").concat(process.env.PORT, "/upload/checkout/Checkout_Report.xlsx");
                        excelFileName = "Checkout_Report.xlsx";
                        response = {
                            link: link,
                            name: excelFileName,
                        };
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                data: response,
                                success: true,
                            }];
                    case 6: return [4 /*yield*/, this.checkedOutPatient(req, model, next)];
                    case 7:
                        result1 = _b.sent();
                        if (result1 &&
                            result1.data &&
                            result1.data.data &&
                            result1.data.data.length <= 0)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_RECORD_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [4 /*yield*/, xlsx_populate_1.default.fromBlankAsync()];
                    case 8:
                        workbook1 = _b.sent();
                        checkoutSheet1_1 = workbook1.sheet("Sheet1");
                        checkoutSheetHeader1 = [
                            "Date",
                            "Time",
                            "Appointment ID",
                            "Patient ID",
                            "Patient Name",
                            "Check-In-Time",
                            "Check-Out-Time",
                            "Provider Name",
                            "CheckOut Type",
                        ];
                        sheetStyle1_1 = {
                            border: true,
                            fontFamily: "Calibri",
                        };
                        checkoutSheetHeader1.forEach(function (el, i) {
                            checkoutSheet1_1
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
                        checkoutData1 = result1 &&
                            result1.data &&
                            result1.data.data &&
                            result1.data.data.length > 0
                            ? result1.data.data
                            : [];
                        console.log(checkoutData1, "checkoutData1");
                        checkoutData1.forEach(function (el, i) {
                            checkoutSheet1_1
                                .cell("A" + (i + 2))
                                .value((0, moment_1.default)(el.appointmentData.startDateTime).format("lll"))
                                .style(sheetStyle1_1);
                            checkoutSheet1_1;
                            checkoutSheet1_1
                                .cell("B" + (i + 2))
                                .value((0, moment_1.default)(el.appointmentData.startDateTime).format("LT"))
                                .style(sheetStyle1_1);
                            checkoutSheet1_1
                                .cell("C" + (i + 2))
                                .value(el.appointment_number)
                                .style(sheetStyle1_1);
                            checkoutSheet1_1
                                .cell("D" + (i + 2))
                                .value(el.patientData.patientId)
                                .style(sheetStyle1_1);
                            checkoutSheet1_1
                                .cell("E" + (i + 2))
                                .value(el.patientData.first_name + " " + el.patientData.last_name)
                                .style(sheetStyle1_1);
                            checkoutSheet1_1
                                .cell("F" + (i + 2))
                                .value((0, moment_1.default)(el.checkInTime).format("LT"))
                                .style(sheetStyle1_1);
                            checkoutSheet1_1
                                .cell("G" + (i + 2))
                                .value((0, moment_1.default)(el.checkoutTime).format("LT"))
                                .style(sheetStyle1_1);
                            checkoutSheet1_1
                                .cell("H" + (i + 2))
                                .value(el.doctorData.first_name + "" + el.doctorData.last_name)
                                .style(sheetStyle1_1);
                            checkoutSheet1_1
                                .cell("I" + (i + 2))
                                .value("chargePatient" in el
                                ? el.chargePatient === false
                                    ? "non-chargeable"
                                    : "chargeable"
                                : " ")
                                .style(sheetStyle1_1);
                        });
                        checkoutSheet1_1.freezePanes(1, 1);
                        return [4 /*yield*/, workbook1.outputAsync()];
                    case 9:
                        data1 = _b.sent();
                        return [4 /*yield*/, fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../../../../public/upload/checkout/Checkout_Report.xlsx"), data1)];
                    case 10:
                        _b.sent();
                        link1 = "http://".concat(req.hostname, ":").concat(process.env.PORT, "/upload/checkout/Checkout_Report.xlsx");
                        excelFileName1 = "Checkout_Report.xlsx";
                        response1 = {
                            link: link1,
                            name: excelFileName1,
                        };
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                data: response1,
                                success: true,
                            }];
                    case 11: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.UNAUTHORIZED,
                            success: false,
                            data: {
                                message: erros_message_1.default.SomeThingWentWrong,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        error_21 = _b.sent();
                        next(error_21);
                        return [3 /*break*/, 14];
                    case 14: return [2 /*return*/];
                }
            });
        }); };
        // Download patient data
        this.getPatientDataToExcel = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var workbook, patientSheet_2, patientSheetHeader, count, skip, condition, child_condition, sortObject, searchText, aggregatedData, patientArr, Patientdata, sortedList, sheetStyle_3, data, link, excelFileName, response, error_22;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, xlsx_populate_1.default.fromBlankAsync()];
                    case 1:
                        workbook = _a.sent();
                        patientSheet_2 = workbook.sheet("Sheet1");
                        patientSheetHeader = [
                            "Patient ID",
                            "Patient Name",
                            "Email",
                            "Status",
                            "Invitation Status",
                            "Archieved/Un-Archieved Status",
                            "Preferred Contact Number",
                            "Preferred Contact Relation",
                            "Alternate Contact Number",
                            "Alternate Contact Relation",
                        ];
                        patientSheetHeader.forEach(function (el, i) {
                            patientSheet_2
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
                        count = model.pageSize ? model.pageSize : erros_message_1.default.count;
                        req.body.page = model.pageNumber
                            ? model.pageNumber
                            : erros_message_1.default.defaultPageNo;
                        skip = count * (req.body.page - 1);
                        condition = {};
                        condition = {
                            clinic_id: new mongoose_1.default.Types.ObjectId(model.clinic_id.toString()),
                        };
                        child_condition = {};
                        if (model.isActive) {
                            condition.isActive = model.isActive == true ? true : false;
                        }
                        if (model.isDeleted == true || model.isDeleted == false) {
                            condition.isDeleted = model.isDeleted;
                        }
                        if (model.isVerified)
                            condition.isVerified = model.isVerified == true ? true : false;
                        sortObject = {};
                        if (req.body.sortValue && req.body.sortOrder) {
                            sortObject[req.body.sortValue] = req.body.sortOrder;
                        }
                        else
                            sortObject = { _id: -1 };
                        if (model.name) {
                            searchText = decodeURIComponent(model.name).replace(/[[\]{}()*+?,\\^$|#\s]/g, "\\s+");
                            child_condition.$or = [
                                { patientId: new RegExp(searchText, "gi") },
                                {
                                    "insuranceData.insuranceName": new RegExp(searchText, "gi"),
                                },
                                {
                                    lastName: common_methods_1.default.getEncryptText(model.name.toUpperCase()),
                                },
                                {
                                    firstName: common_methods_1.default.getEncryptText(model.name.toUpperCase()),
                                },
                            ];
                        }
                        aggregatedData = [
                            {
                                $project: {
                                    image: 1,
                                    _id: "$_id",
                                    email: "$email",
                                    contact: "$contact",
                                    lastName: "$last_name",
                                    isActive: "$isActive",
                                    firstName: "$first_name",
                                    isDeleted: "$isDeleted",
                                    patientId: "$patientId",
                                    isVerified: "$isVerified",
                                    status: {
                                        $cond: {
                                            if: { $eq: ["$password", null] },
                                            then: "Pending",
                                            else: "Accepted",
                                        },
                                    },
                                },
                            },
                            // { $sort: sortObject },
                        ];
                        return [4 /*yield*/, patient_model_1.default.aggregate([
                                { $match: condition },
                                {
                                    $lookup: {
                                        from: "insurance",
                                        let: { patient_id: "$_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$patient_id", "$$patient_id"],
                                                    },
                                                    coverage: "Primary",
                                                },
                                            },
                                            { $project: { insurance_name: 1 } },
                                        ],
                                        as: "insuranceData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$insuranceData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                { $match: child_condition },
                                {
                                    $facet: {
                                        aggregatedData: aggregatedData,
                                    },
                                },
                            ])];
                    case 2:
                        patientArr = _a.sent();
                        if (!patientArr.length)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.patientMsg.noRecordFound,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        Patientdata = patientArr[0].aggregatedData;
                        Patientdata.forEach(function (obj) {
                            obj.firstName = common_methods_1.default.getDecryptText(obj.firstName);
                            obj.lastName = common_methods_1.default.getDecryptText(obj.lastName);
                        });
                        sortedList = Patientdata.sort(function (a, b) {
                            return a.firstName.localeCompare(b.firstName);
                        });
                        sheetStyle_3 = {
                            border: true,
                            fontFamily: "Calibri",
                        };
                        sortedList.forEach(function (el, i) {
                            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                            patientSheet_2
                                .cell("A" + (i + 2))
                                .value(el.patientId)
                                .style(sheetStyle_3);
                            patientSheet_2;
                            patientSheet_2
                                .cell("B" + (i + 2))
                                .value(el.firstName + " " + el.lastName)
                                .style(sheetStyle_3);
                            patientSheet_2
                                .cell("C" + (i + 2))
                                .value(el.email ? el.email : ""
                            // el.email ? Utility.getDecryptText(el.email) : ""
                            )
                                .style(sheetStyle_3);
                            patientSheet_2
                                .cell("D" + (i + 2))
                                .value(el.isVerified ? "Verified" : "Unverified")
                                .style(sheetStyle_3);
                            patientSheet_2
                                .cell("E" + (i + 2))
                                .value(el.status)
                                .style(sheetStyle_3);
                            patientSheet_2
                                .cell("F" + (i + 2))
                                .value(el.isActive == true ? "Unarchived" : "Archived")
                                .style(sheetStyle_3);
                            patientSheet_2
                                .cell("G" + (i + 2))
                                .value(((_b = (_a = el.contact) === null || _a === void 0 ? void 0 : _a.prefered) === null || _b === void 0 ? void 0 : _b.mobileNo) ? el.contact.prefered.mobileNo : "")
                                .style(sheetStyle_3);
                            patientSheet_2
                                .cell("H" + (i + 2))
                                .value(((_d = (_c = el.contact) === null || _c === void 0 ? void 0 : _c.prefered) === null || _d === void 0 ? void 0 : _d.relation) ? el.contact.prefered.relation : "")
                                .style(sheetStyle_3);
                            patientSheet_2
                                .cell("I" + (i + 2))
                                .value(((_f = (_e = el.contact) === null || _e === void 0 ? void 0 : _e.alternative) === null || _f === void 0 ? void 0 : _f.mobileNo)
                                ? (_g = el.contact.alternative) === null || _g === void 0 ? void 0 : _g.mobileNo
                                : "")
                                .style(sheetStyle_3);
                            patientSheet_2
                                .cell("J" + (i + 2))
                                .value(
                            //
                            ((_j = (_h = el.contact) === null || _h === void 0 ? void 0 : _h.alternative) === null || _j === void 0 ? void 0 : _j.relation)
                                ? (_k = el.contact.alternative) === null || _k === void 0 ? void 0 : _k.relation
                                : "")
                                .style(sheetStyle_3);
                        });
                        patientSheet_2.freezePanes(1, 1);
                        return [4 /*yield*/, workbook.outputAsync()];
                    case 3:
                        data = _a.sent();
                        return [4 /*yield*/, fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../../../../public/upload/patients/Patient_Report.xlsx"), data)];
                    case 4:
                        _a.sent();
                        link = "http://".concat(req.hostname, ":").concat(process.env.PORT, "/upload/patients/Patient_Report.xlsx");
                        excelFileName = "Patient_Report.xlsx";
                        response = {
                            link: link,
                            name: excelFileName,
                        };
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                data: response,
                                success: true,
                            }];
                    case 5:
                        error_22 = _a.sent();
                        next(error_22);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getVisitHistoryList = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var defaultPage, count, condition, data, obj, error_23;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        defaultPage = void 0;
                        count = void 0;
                        defaultPage = model.pageNumber ? model.pageNumber : 1;
                        count = model.pageSize ? model.pageSize : 50;
                        condition = {};
                        condition.status = "Checkout";
                        condition.clinic_id = new mongoose_1.default.Types.ObjectId(model.clinic_id.toString());
                        condition.patient_id = new mongoose_1.default.Types.ObjectId(model.patient_id.toString());
                        return [4 /*yield*/, appointment_model_1.default.aggregate([
                                {
                                    $match: condition,
                                },
                                {
                                    $sort: { endDateTime: -1 },
                                },
                                {
                                    $group: {
                                        _id: {
                                            doctor_id: "$doctor_id",
                                            patient_id: "$patient_id",
                                        },
                                        total_appointment: { $sum: 1 },
                                        last_visit: { $first: "$startDateTime" },
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "patients",
                                        let: { patient_id: "$_id.patient_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$_id", "$$patient_id"],
                                                    },
                                                },
                                            },
                                            {
                                                $project: { first_name: 1, last_name: 1 },
                                            },
                                        ],
                                        as: "patientData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$patientData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "doctor",
                                        let: { id: "$_id.doctor_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$_id", "$$id"],
                                                    },
                                                },
                                            },
                                            ///
                                            {
                                                $lookup: {
                                                    from: "users",
                                                    let: { u_id: "$user_id" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $eq: ["$_id", "$$u_id"],
                                                                },
                                                            },
                                                        },
                                                        {
                                                            $project: {
                                                                first_name: 1,
                                                                last_name: 1,
                                                            },
                                                        },
                                                    ],
                                                    as: "userData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$userData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            ////
                                            { $project: { userData: 1 } },
                                        ],
                                        as: "doctorData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$doctorData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $facet: {
                                        totalCount: [{ $count: "count" }],
                                        aggregatedData: [
                                            {
                                                $project: {
                                                    _id: 0,
                                                    patient_id: "$_id.patient_id",
                                                    doctor_id: "$_id.doctor_id",
                                                    patientData: 1,
                                                    doctor_name: {
                                                        $concat: [
                                                            "$doctorData.userData.first_name",
                                                            " ",
                                                            "$doctorData.userData.last_name",
                                                        ],
                                                    },
                                                    total_appointment: 1,
                                                    last_visit: 1,
                                                },
                                            },
                                            { $sort: { last_visit: -1 } },
                                            { $skip: count * (defaultPage - 1) },
                                            { $limit: count },
                                        ],
                                    },
                                },
                            ])];
                    case 1:
                        data = _a.sent();
                        if (data && data.length > 0 && data[0].aggregatedData.length) {
                            //let formattedData: any[] = [];
                            data[0].aggregatedData.forEach(function (e) {
                                e.patientData.first_name = e.patientData.first_name
                                    ? common_methods_1.default.getDecryptText(e.patientData.first_name)
                                    : "";
                                e.patientData.last_name = e.patientData.last_name
                                    ? common_methods_1.default.getDecryptText(e.patientData.last_name)
                                    : "";
                            });
                            obj = {
                                data: data[0].aggregatedData,
                                // count: result.totalDocs,
                                totalDocs: data[0].totalCount[0].count,
                                pageNumber: defaultPage,
                                pageSize: count,
                                totalPages: Math.ceil(data[0].totalCount[0].count / count),
                            };
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: obj,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_RECORD_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_23 = _a.sent();
                        next(error_23);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getVisitHistoryDetails = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var defaultPage, count, condition, data, obj, error_24;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        defaultPage = void 0;
                        count = void 0;
                        defaultPage = model.pageNumber ? model.pageNumber : 1;
                        count = model.pageSize ? model.pageSize : 50;
                        condition = {};
                        condition.status = "Checkout";
                        condition.clinic_id = new mongoose_1.default.Types.ObjectId(model.clinic_id.toString());
                        condition.patient_id = new mongoose_1.default.Types.ObjectId(model.patient_id.toString());
                        condition.doctor_id = new mongoose_1.default.Types.ObjectId(model.doctor_id.toString());
                        return [4 /*yield*/, appointment_model_1.default.aggregate([
                                {
                                    $match: condition,
                                },
                                // {
                                //   $group: {
                                //     _id: { doctor_id: "$doctor_id", patient_id: "$patient_id" },
                                //     total_appointment: { $sum: 1 },
                                //     last_visit: { $last: "$startDateTime" },
                                //   },
                                // },
                                {
                                    $lookup: {
                                        from: "appointment_type",
                                        let: { id: "$appointmentType_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$_id", "$$id"],
                                                    },
                                                },
                                            },
                                            ////
                                            { $project: { type: 1 } },
                                        ],
                                        as: "apptTypeData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$apptTypeData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $facet: {
                                        totalCount: [{ $count: "count" }],
                                        aggregatedData: [
                                            {
                                                $project: {
                                                    appointment_number: 1,
                                                    appointment_type: "$apptTypeData.type",
                                                    startDateTime: 1,
                                                    endDateTime: 1,
                                                    status: 1,
                                                },
                                            },
                                            // { $sort: sortObject },
                                            { $skip: count * (defaultPage - 1) },
                                            { $limit: count },
                                        ],
                                    },
                                },
                                // {
                                //   $project: {
                                // appointment_number: 1,
                                // appointment_type: "$apptTypeData.type",
                                // startDateTime: 1,
                                // endDateTime: 1,
                                // status: 1,
                                //   },
                                // },
                            ])];
                    case 1:
                        data = _a.sent();
                        if (data && data.length > 0 && data[0].aggregatedData.length) {
                            obj = {
                                data: data[0].aggregatedData,
                                // count: result.totalDocs,
                                totalDocs: data[0].totalCount[0].count,
                                pageNumber: defaultPage,
                                pageSize: count,
                                totalPages: Math.ceil(data[0].totalCount[0].count / count),
                            };
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: obj,
                                }];
                        }
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_RECORD_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 3];
                    case 2:
                        error_24 = _a.sent();
                        next(error_24);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getCptCodes = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var data, error_25;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, cpt_model_1.default.aggregate([
                                { $match: { isActive: true, isDeleted: false } },
                                {
                                    $lookup: {
                                        from: "insurance",
                                        let: { code_id: "$_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    patient_id: new mongoose_1.default.Types.ObjectId(req.params._id.toString()),
                                                    coverage: "Primary",
                                                    $expr: { $eq: ["$$code_id", "$codes"] },
                                                },
                                            },
                                            { $project: { _id: 1 } },
                                        ],
                                        as: "isAssigned",
                                    },
                                },
                                {
                                    $project: {
                                        cptCode: 1,
                                        description: 1,
                                        price: 1,
                                        isAssigned: {
                                            $cond: {
                                                if: { $eq: [{ $size: "$isAssigned" }, 1] },
                                                then: true,
                                                else: false,
                                            },
                                        },
                                    },
                                },
                                { $sort: { isAssigned: -1, price: -1 } },
                            ])];
                    case 1:
                        data = _a.sent();
                        if (data && data.length > 0) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: data,
                                }];
                        }
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_RECORD_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 3];
                    case 2:
                        error_25 = _a.sent();
                        next(error_25);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getCheckoutDetails = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var data, emptyObj, filledProgressNoteDetails, error_26;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, appointment_model_1.default.aggregate([
                                {
                                    $match: {
                                        _id: new mongoose_1.default.Types.ObjectId(req.params._id.toString()),
                                    },
                                },
                                // PATIENT LOOKUP
                                {
                                    $lookup: {
                                        from: "patients",
                                        let: { patient_id: "$patient_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: { $eq: ["$_id", "$$patient_id"] },
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "states",
                                                    let: { state_id: "$state" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $eq: ["$_id", "$$state_id"],
                                                                },
                                                            },
                                                        },
                                                        { $project: { stateName: 1 } },
                                                    ],
                                                    as: "stateData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$stateData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "countries",
                                                    let: { country_id: "$country" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $eq: ["$_id", "$$country_id"],
                                                                },
                                                            },
                                                        },
                                                        { $project: { countryName: 1 } },
                                                    ],
                                                    as: "countryData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$countryData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            // {
                                            //   $lookup: {
                                            //     from: "financialclasses",
                                            //     let: { financialClass_id: "$financialClass_id" },
                                            //     pipeline: [
                                            //       {
                                            //         $match: {
                                            //           $expr: { $eq: ["$_id", "$$financialClass_id"] },
                                            //         },
                                            //       },
                                            //       { $project: { code: 1 } },
                                            //     ],
                                            //     as: "financialClassData",
                                            //   },
                                            // },
                                            // {
                                            //   $unwind: {
                                            //     path: "$financialClassData",
                                            //     preserveNullAndEmptyArrays: true,
                                            //   },
                                            // },
                                            {
                                                $unwind: {
                                                    path: "$countryData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $project: {
                                                    SSN: 1,
                                                    city: 1,
                                                    title: 1,
                                                    gender: 1,
                                                    address: 1,
                                                    last_name: 1,
                                                    //apartment: 1,
                                                    appartment: 1,
                                                    first_name: 1,
                                                    postal_code: 1,
                                                    date_of_birth: 1,
                                                    //financialClass_id: 1,
                                                    stateName: "$stateData.stateName",
                                                    countryName: "$countryData.countryName",
                                                    //financialClassCode: "$financialClassData.code",
                                                    mobileNo: {
                                                        prefered: "$contact.prefered.mobileNo",
                                                        alternative: "$contact.alternative.mobileNo",
                                                    },
                                                },
                                            },
                                        ],
                                        as: "patientData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$patientData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "insurance",
                                        let: { patient_id: "$patient_id" },
                                        pipeline: [
                                            {
                                                $lookup: {
                                                    from: "insurance_companies",
                                                    localField: "insurance_company_id",
                                                    foreignField: "_id",
                                                    pipeline: [
                                                        {
                                                            $project: {
                                                                companyName: 1,
                                                            },
                                                        },
                                                    ],
                                                    as: "insuranceCompanyData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$insuranceCompanyData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$patient_id", "$$patient_id"],
                                                    },
                                                    //coverage: "Primary",
                                                },
                                            },
                                            {
                                                $project: {
                                                    insurance_name: "$insuranceCompanyData.companyName",
                                                    _id: 1,
                                                    payer_id: 1,
                                                    coverage: 1,
                                                },
                                            },
                                            //{ $sort: { coverage: 1 } },
                                        ],
                                        as: "insuranceData",
                                    },
                                },
                                // {
                                //   $unwind: {
                                //     path: "$insuranceData",
                                //     preserveNullAndEmptyArrays: true,
                                //   },
                                // },
                                {
                                    $lookup: {
                                        from: "doctor",
                                        let: { doctor_id: "$doctor_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: { $eq: ["$_id", "$$doctor_id"] },
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "users",
                                                    let: { user_id: "$user_id" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $eq: ["$_id", "$$user_id"],
                                                                },
                                                            },
                                                        },
                                                        {
                                                            $project: {
                                                                first_name: 1,
                                                                last_name: 1,
                                                            },
                                                        },
                                                    ],
                                                    as: "userData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$userData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $project: {
                                                    firstName: "$userData.first_name",
                                                    lastName: "$userData.last_name",
                                                },
                                            },
                                        ],
                                        as: "doctorData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$doctorData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "appointment_type",
                                        let: { appttype_id: "$appointmentType_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: { $eq: ["$_id", "$$appttype_id"] },
                                                },
                                            },
                                            {
                                                $project: {
                                                    type: 1,
                                                },
                                            },
                                        ],
                                        as: "appointmentTypeData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$appointmentTypeData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                // {
                                //   $lookup: {
                                //     from: "financialclasses",
                                //     let: { clinic_id: "$clinic_id" },
                                //     pipeline: [
                                //       { $match: { $expr: { $eq: ["$createdby_id", "$$clinic_id"] } } },
                                //       { $project: { price: 1, code: 1, covered: 1 } },
                                //     ],
                                //     as: "financialClassData",
                                //   },
                                // },
                                {
                                    $lookup: {
                                        from: "clinic_locations",
                                        let: { location_id: "$location_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: { $eq: ["$_id", "$$location_id"] },
                                                },
                                            },
                                            {
                                                $project: {
                                                    city: "$city",
                                                    branchName: "$branchName",
                                                    address: "$address",
                                                },
                                            },
                                        ],
                                        as: "locationData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$locationData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $project: {
                                        title: 1,
                                        status: 1,
                                        duration: 1,
                                        document: 1,
                                        doctorData: 1,
                                        patientData: 1,
                                        endDateTime: 1,
                                        locationData: 1,
                                        startDateTime: 1,
                                        appointment_type: "$appointmentTypeData.type",
                                        insuranceData: {
                                            $cond: {
                                                if: { $isArray: "$insuranceData" },
                                                then: "$insuranceData",
                                                else: [],
                                            },
                                        },
                                        //insuranceData: 1,
                                        //financialClassData: 1,
                                    },
                                },
                            ])];
                    case 1:
                        data = _a.sent();
                        if (!data.length) return [3 /*break*/, 3];
                        emptyObj = {
                            ICD_10: [],
                            cptCode: [],
                        };
                        return [4 /*yield*/, filled_progress_notes_model_1.default.findOne({
                                appointment_id: new mongoose_1.default.Types.ObjectId(req.params._id.toString()),
                            })];
                    case 2:
                        filledProgressNoteDetails = _a.sent();
                        //console.log(data[0].patientData);
                        data[0].patientData.first_name = data[0].patientData.first_name
                            ? common_methods_1.default.getDecryptText(data[0].patientData.first_name)
                            : "";
                        data[0].patientData.last_name = data[0].patientData.last_name
                            ? common_methods_1.default.getDecryptText(data[0].patientData.last_name)
                            : "";
                        data[0].patientData.title = data[0].patientData.title
                            ? common_methods_1.default.getDecryptText(data[0].patientData.title)
                            : "";
                        // data[0].patientData.firstName = data.patientData.firstName
                        //   ? utility.getDecryptText(data.patientData.firstName)
                        //   : "";
                        if (!data[0].filledProgressNote) {
                            data[0]["filledProgressNoteCodes"] = emptyObj;
                        }
                        if (filledProgressNoteDetails)
                            data[0]["filledProgressNoteCodes"] = filledProgressNoteDetails.codes;
                        else
                            data[0]["filledProgressNoteCodes"] = emptyObj;
                        _a.label = 3;
                    case 3:
                        // console.log(data);
                        //data = data[0]
                        if (data && data.length > 0) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: data[0],
                                }];
                        }
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_RECORD_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 5];
                    case 4:
                        error_26 = _a.sent();
                        next(error_26);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.mergePatient = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, data_merged, merge_appointment, merge_filled_dynamic_forms, merge_filled_progress_notes, merge_filled_treatment_plan, merge_billing_checkout, merge_billing_post_payment, merge_billing_payment, merge_cards, merge_e_priscription, merge_hmo, merge_ppo, merge_insurance, merge_patient_docs, merge_super_bill, make_patient_inactive, addHistory, error_27;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 19, , 20]);
                        userDetails = req.user;
                        data_merged = [];
                        return [4 /*yield*/, appointment_model_1.default.updateMany({ patient_id: model.merge_patient_id }, {
                                $set: { patient_id: model.merge_to_patient_id },
                            })];
                    case 1:
                        merge_appointment = _a.sent();
                        if (merge_appointment && merge_appointment.modifiedCount > 0)
                            data_merged.push({
                                appointment: merge_appointment.modifiedCount,
                            });
                        return [4 /*yield*/, filled_dynamic_form_model_1.default.updateMany({ patient_id: model.merge_patient_id }, {
                                $set: { patient_id: model.merge_to_patient_id },
                            })];
                    case 2:
                        merge_filled_dynamic_forms = _a.sent();
                        if (merge_filled_dynamic_forms &&
                            merge_filled_dynamic_forms.modifiedCount > 0)
                            data_merged.push({
                                filled_dynamic_form: merge_filled_dynamic_forms.modifiedCount,
                            });
                        return [4 /*yield*/, filled_progress_notes_model_1.default.updateMany({ patient_id: model.merge_patient_id }, {
                                $set: { patient_id: model.merge_to_patient_id },
                            })];
                    case 3:
                        merge_filled_progress_notes = _a.sent();
                        if (merge_filled_progress_notes &&
                            merge_filled_progress_notes.modifiedCount > 0)
                            data_merged.push({
                                filled_progress_notes: merge_filled_progress_notes.modifiedCount,
                            });
                        return [4 /*yield*/, filled_treatment_plan_model_1.default.updateMany({ patient_id: model.merge_patient_id }, {
                                $set: { patient_id: model.merge_to_patient_id },
                            })];
                    case 4:
                        merge_filled_treatment_plan = _a.sent();
                        if (merge_filled_treatment_plan &&
                            merge_filled_treatment_plan.modifiedCount > 0)
                            data_merged.push({
                                filled_treatment_plan: merge_filled_treatment_plan.modifiedCount,
                            });
                        return [4 /*yield*/, billing_checkout_model_1.default.updateMany({ patient_id: model.merge_patient_id }, {
                                $set: { patient_id: model.merge_to_patient_id },
                            })];
                    case 5:
                        merge_billing_checkout = _a.sent();
                        if (merge_billing_checkout &&
                            merge_filled_treatment_plan.modifiedCount > 0)
                            data_merged.push({
                                billing_checkout: merge_billing_checkout.modifiedCount,
                            });
                        return [4 /*yield*/, billing_post_payment_model_1.default.updateMany({ patient_id: model.merge_patient_id }, {
                                $set: { patient_id: model.merge_to_patient_id },
                            })];
                    case 6:
                        merge_billing_post_payment = _a.sent();
                        if (merge_billing_post_payment &&
                            merge_billing_post_payment.modifiedCount > 0)
                            data_merged.push({
                                billing_post_payment: merge_billing_post_payment.modifiedCount,
                            });
                        return [4 /*yield*/, billing_payment_model_1.default.updateMany({ patient_id: model.merge_patient_id }, {
                                $set: { patient_id: model.merge_to_patient_id },
                            })];
                    case 7:
                        merge_billing_payment = _a.sent();
                        if (merge_billing_payment && merge_billing_payment.modifiedCount > 0)
                            data_merged.push({
                                billing_payment: merge_billing_payment.modifiedCount,
                            });
                        return [4 /*yield*/, cards_model_1.default.updateMany({ patient_id: model.merge_patient_id }, { $set: { patient_id: model.merge_to_patient_id } })];
                    case 8:
                        merge_cards = _a.sent();
                        if (merge_cards && merge_cards.modifiedCount > 0)
                            data_merged.push({
                                cards: merge_cards.modifiedCount,
                            });
                        return [4 /*yield*/, epriscription_model_1.default.updateMany({ patient_id: model.merge_patient_id }, {
                                $set: { patient_id: model.merge_to_patient_id },
                            })];
                    case 9:
                        merge_e_priscription = _a.sent();
                        if (merge_e_priscription && merge_e_priscription.modifiedCount > 0)
                            data_merged.push({
                                e_priscription: merge_e_priscription.modifiedCount,
                            });
                        return [4 /*yield*/, hmo_model_1.default.updateMany({ patient_id: model.merge_patient_id }, { $set: { patient_id: model.merge_to_patient_id } })];
                    case 10:
                        merge_hmo = _a.sent();
                        if (merge_hmo && merge_hmo.modifiedCount > 0)
                            data_merged.push({
                                hmo: merge_hmo.modifiedCount,
                            });
                        return [4 /*yield*/, ppo_model_1.default.updateMany({ patient_id: model.merge_patient_id }, { $set: { patient_id: model.merge_to_patient_id } })];
                    case 11:
                        merge_ppo = _a.sent();
                        if (merge_ppo && merge_ppo.modifiedCount > 0)
                            data_merged.push({
                                ppo: merge_ppo.modifiedCount,
                            });
                        return [4 /*yield*/, insurance_model_1.default.updateMany({ patient_id: model.merge_patient_id }, { $set: { patient_id: model.merge_to_patient_id } })];
                    case 12:
                        merge_insurance = _a.sent();
                        if (merge_insurance && merge_insurance.modifiedCount > 0)
                            data_merged.push({
                                insurance: merge_insurance.modifiedCount,
                            });
                        return [4 /*yield*/, patient_document_model_1.default.updateMany({ patient_id: model.merge_patient_id }, {
                                $set: { patient_id: model.merge_to_patient_id },
                            })];
                    case 13:
                        merge_patient_docs = _a.sent();
                        if (merge_patient_docs && merge_patient_docs.modifiedCount > 0)
                            data_merged.push({
                                patient_docs: merge_patient_docs.modifiedCount,
                            });
                        return [4 /*yield*/, super_bill_model_1.default.updateMany({ patient_id: model.merge_patient_id }, {
                                $set: { patient_id: model.merge_to_patient_id },
                            })];
                    case 14:
                        merge_super_bill = _a.sent();
                        if (merge_super_bill && merge_super_bill.modifiedCount > 0)
                            data_merged.push({
                                super_bill: merge_super_bill.modifiedCount,
                            });
                        return [4 /*yield*/, patient_model_1.default.updateOne({ _id: model.merge_patient_id }, { isActive: false, mergeStatus: true })];
                    case 15:
                        make_patient_inactive = _a.sent();
                        if (!(make_patient_inactive && make_patient_inactive.modifiedCount)) return [3 /*break*/, 17];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "patient merged successfully",
                                type: history_model_1.EHistoryActivityTypeValues.PATIENT,
                                // type_id: foundPatient._id,
                            })];
                    case 16:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.MERGE_SUCCESS,
                            }];
                    case 17: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: erros_message_1.default.MERGE_FAILED,
                        }];
                    case 18: return [3 /*break*/, 20];
                    case 19:
                        error_27 = _a.sent();
                        next(error_27);
                        return [3 /*break*/, 20];
                    case 20: return [2 /*return*/];
                }
            });
        }); };
        this.fetchPatients = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, patientRoleData_1, last_fetch, last_fetch_time, fetch_time, make_fetch_req_entry, FETCH_PATIENT_URL, data_fetched, data_1, existingRecords, conflicted_ids_1, bulkPatient_1, patientSaved, error_28;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 15, , 16]);
                        userDetails = req.user;
                        return [4 /*yield*/, roles_model_1.default.findOne({
                                roleName: "patient",
                            }, { _id: 1, permission: 1 })];
                    case 1:
                        patientRoleData_1 = _a.sent();
                        if (!patientRoleData_1)
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ROLE_NOT_FOUND,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        return [4 /*yield*/, fetch_data_model_1.default.find({ clinic_id: model.clinic_id, type: "PATIENT" }, { fetch_time: 1 })
                                .sort({ createdAt: -1 })
                                .limit(1)];
                    case 2:
                        last_fetch = _a.sent();
                        last_fetch_time = new Date((0, moment_1.default)(Date.now() - 7 * 24 * 3600 * 1000).format("YYYY-MM-DD"));
                        if (last_fetch && last_fetch.length) {
                            last_fetch_time = last_fetch[0].fetch_time;
                        }
                        fetch_time = new Date();
                        return [4 /*yield*/, fetch_data_model_1.default.create({
                                type: "PATIENT",
                                last_fetch_time: last_fetch_time,
                                fetch_time: fetch_time,
                                clinic_id: model.clinic_id,
                                createdby_id: userDetails._id,
                            })];
                    case 3:
                        make_fetch_req_entry = _a.sent();
                        if (!make_fetch_req_entry) return [3 /*break*/, 13];
                        FETCH_PATIENT_URL = "http://192.168.1.140:1336/api/rcm/patient/exportData";
                        return [4 /*yield*/, axios_1.default.post(FETCH_PATIENT_URL, {
                                currentDateTime: fetch_time,
                                lastFetchTime: last_fetch_time,
                            })];
                    case 4:
                        data_fetched = _a.sent();
                        if (!(data_fetched &&
                            data_fetched.data &&
                            data_fetched.data.data &&
                            (data_fetched.data.data.updatedArr.length ||
                                data_fetched.data.data.createdArr.length))) return [3 /*break*/, 11];
                        data_1 = [];
                        data_fetched.data.data.createdArr.forEach(function (singleRecord) {
                            data_1.push({
                                clinic_id: model.clinic_id,
                                role: patientRoleData_1._id,
                                role_permission: patientRoleData_1.permission,
                                title: common_methods_1.default.getEncryptText(singleRecord.title.toUpperCase()),
                                first_name: common_methods_1.default.getEncryptText(singleRecord.first_name.toUpperCase()),
                                last_name: common_methods_1.default.getEncryptText(singleRecord.last_name.toUpperCase()),
                                gender: singleRecord.gender == "Male"
                                    ? "M"
                                    : singleRecord.gender == "Female"
                                        ? "F"
                                        : "Others",
                                _id: singleRecord._id,
                                middle_name: singleRecord.middle_name,
                                responsible_person: singleRecord.responsible_person,
                                patientId: singleRecord.patientId,
                                GI: singleRecord.GI,
                                SO: singleRecord.SO,
                                SSN: singleRecord.SSN,
                                email: singleRecord.email,
                                date_of_birth: singleRecord.date_of_birth,
                                marital_status: singleRecord.marital_status,
                                appartment: singleRecord.appartment,
                                address: singleRecord.address,
                                postal_code: singleRecord.postal_code,
                                city: singleRecord.city,
                                createdAt: singleRecord.createdAt,
                                updatedAt: singleRecord.updatedAt,
                                //country: singleRecord.country, //mongdb local id
                                //state: singleRecord.state, //mongdb local id
                                time_zone: singleRecord.time_zone,
                                customer_id_stripe: singleRecord.customer_id_stripe,
                                contact: singleRecord.contact,
                                payment: singleRecord.payment,
                            });
                        });
                        data_fetched.data.data.updatedArr.forEach(function (singleRecord) {
                            data_1.push({
                                clinic_id: model.clinic_id,
                                role: patientRoleData_1._id,
                                role_permission: patientRoleData_1.permission,
                                title: common_methods_1.default.getEncryptText(singleRecord.title.toUpperCase()),
                                first_name: common_methods_1.default.getEncryptText(singleRecord.first_name.toUpperCase()),
                                last_name: common_methods_1.default.getEncryptText(singleRecord.last_name.toUpperCase()),
                                gender: singleRecord.gender == "Male"
                                    ? "M"
                                    : singleRecord.gender == "Female"
                                        ? "F"
                                        : "Others",
                                _id: singleRecord._id,
                                middle_name: singleRecord.middle_name,
                                responsible_person: singleRecord.responsible_person,
                                patientId: singleRecord.patientId,
                                GI: singleRecord.GI,
                                SO: singleRecord.SO,
                                SSN: singleRecord.SSN,
                                email: singleRecord.email,
                                date_of_birth: singleRecord.date_of_birth,
                                marital_status: singleRecord.marital_status,
                                appartment: singleRecord.appartment,
                                address: singleRecord.address,
                                postal_code: singleRecord.postal_code,
                                city: singleRecord.city,
                                createdAt: singleRecord.createdAt,
                                updatedAt: singleRecord.updatedAt,
                                //country: singleRecord.country, //mongdb local id
                                //state: singleRecord.state, //mongdb local id
                                time_zone: singleRecord.time_zone,
                                customer_id_stripe: singleRecord.customer_id_stripe,
                                contact: singleRecord.contact,
                                payment: singleRecord.payment,
                            });
                        });
                        return [4 /*yield*/, patient_model_1.default.find({
                                $or: data_1.map(function (singlePatient) { return ({
                                    _id: singlePatient._id,
                                }); }),
                            }, { _id: 1, clinic_id: 1 })];
                    case 5:
                        existingRecords = _a.sent();
                        conflicted_ids_1 = [];
                        if (existingRecords && existingRecords.length) {
                            existingRecords.forEach(function (e) {
                                var foundIndex = data_1.findIndex(function (a) {
                                    return a._id.toString() == e._id.toString() &&
                                        a.clinic_id.toString() != e.clinic_id.toString();
                                });
                                if (foundIndex > -1) {
                                    conflicted_ids_1.push(data_1[foundIndex]._id);
                                    data_1.splice(foundIndex, 1);
                                }
                            });
                        }
                        if (!conflicted_ids_1.length) return [3 /*break*/, 7];
                        return [4 /*yield*/, fetch_data_model_1.default.updateOne({ _id: make_fetch_req_entry._id }, { conflicted_ids: conflicted_ids_1 })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        if (!(data_1.length > 0)) return [3 /*break*/, 9];
                        bulkPatient_1 = [];
                        data_1.forEach(function (singleRecord) {
                            bulkPatient_1.push({
                                updateOne: {
                                    filter: { _id: singleRecord._id },
                                    update: {
                                        $set: singleRecord,
                                    },
                                    upsert: true,
                                },
                            });
                        });
                        return [4 /*yield*/, patient_model_1.default.bulkWrite(bulkPatient_1)];
                    case 8:
                        patientSaved = _a.sent();
                        if (patientSaved) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    data: conflicted_ids_1.length
                                        ? erros_message_1.default.DATA_FETCHED_SUCCESS_WITH_CONFLICTS
                                        : erros_message_1.default.DATA_FETCHED_SUCCESS,
                                    success: true,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_DATA_TO_FETCH,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 10];
                    case 9: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: conflicted_ids_1.length
                                    ? erros_message_1.default.NO_DATA_TO_FETCH_BUT_CONFLICT_PRESENT
                                    : erros_message_1.default.NO_DATA_TO_FETCH,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 10: return [3 /*break*/, 12];
                    case 11: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.NO_DATA_TO_FETCH,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 12: return [3 /*break*/, 14];
                    case 13: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.FAILED_TO_FETCH_DATA,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        error_28 = _a.sent();
                        next(error_28);
                        return [3 /*break*/, 16];
                    case 16: return [2 /*return*/];
                }
            });
        }); };
    }
    return PatientServices;
}());
exports.default = new PatientServices();
