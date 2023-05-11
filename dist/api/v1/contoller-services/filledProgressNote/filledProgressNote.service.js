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
var mongoose_1 = __importDefault(require("mongoose"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var erros_message_1 = __importDefault(require("../../common/erros_message"));
var filled_progress_notes_model_1 = __importDefault(require("../../models/filled_progress_notes.model"));
var filled_treatment_plan_model_1 = __importDefault(require("../../models/filled_treatment_plan.model"));
var history_model_1 = __importStar(require("../../models/history.model"));
var progress_notes_model_1 = __importDefault(require("../../models/progress_notes.model"));
var EnumRole;
(function (EnumRole) {
    EnumRole["PROVIDER"] = "provider";
})(EnumRole = exports.EnumRole || (exports.EnumRole = {}));
var FilledProgressNoteServices = /** @class */ (function () {
    function FilledProgressNoteServices() {
        var _this = this;
        this.addFilledProgressNote = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, alreadyPresentForm, updateform, addHistory, saveProgressNoteResult, addHistory, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 12, , 13]);
                        userDetails = req.user;
                        model.createdby_id = userDetails._id;
                        return [4 /*yield*/, filled_progress_notes_model_1.default.findOne({
                                clinic_id: model.clinic_id,
                                appointment_id: model.appointment_id,
                                //progressNote_id:model.progressNote_id,
                                doctor_id: model.doctor_id,
                            })];
                    case 1:
                        alreadyPresentForm = _a.sent();
                        if (!alreadyPresentForm) return [3 /*break*/, 7];
                        if (!(alreadyPresentForm.progressNote_id.toString() !=
                            model.progressNote_id.toString())) return [3 /*break*/, 3];
                        return [4 /*yield*/, filled_progress_notes_model_1.default.deleteOne({
                                appointment_id: model.appointment_id,
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 3: return [4 /*yield*/, filled_progress_notes_model_1.default.updateOne({
                            appointment_id: model.appointment_id,
                            progressNote_id: model.progressNote_id,
                        }, model
                        //{ new: true }
                        )];
                    case 4:
                        updateform = _a.sent();
                        if (!(updateform && updateform.modifiedCount > 0)) return [3 /*break*/, 6];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "progress note updated",
                                type: history_model_1.EHistoryActivityTypeValues.CHECKOUT,
                                // type_id: saveProgressNoteResult._id,
                            })];
                    case 5:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.SAVED_SUCCESSFULL,
                            }];
                    case 6: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ON_ADD_FILLED_PROGRESS_NOTE,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 7: return [4 /*yield*/, filled_progress_notes_model_1.default.create(model)];
                    case 8:
                        saveProgressNoteResult = _a.sent();
                        if (!saveProgressNoteResult) return [3 /*break*/, 10];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "progress note added",
                                type: history_model_1.EHistoryActivityTypeValues.CHECKOUT,
                                type_id: saveProgressNoteResult._id,
                            })];
                    case 9:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.SAVED_SUCCESSFULL,
                                // data: {
                                //   _id: saveProgressNoteResult._id,
                                //   field_data: saveProgressNoteResult.field_data,
                                //   clinic_id: saveProgressNoteResult.clinic_id,
                                //   doctor_id: saveProgressNoteResult.doctor_id,
                                //   treatmentPlan_id: saveProgressNoteResult.treatmentPlan_id,
                                //   appointment_id: saveProgressNoteResult.appointment_id,
                                //   progressNote_id: saveProgressNoteResult.progressNote_id,
                                // },
                            }];
                    case 10: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ON_ADD_FILLED_PROGRESS_NOTE,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        }); };
        this.updateFilledProgressNote = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, updateProgressNoteResult, addHistory, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        userDetails = req.user;
                        return [4 /*yield*/, filled_progress_notes_model_1.default.findOneAndUpdate({ _id: model._id }, model, { new: true })];
                    case 1:
                        updateProgressNoteResult = _a.sent();
                        if (!updateProgressNoteResult) return [3 /*break*/, 3];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "progress note updated",
                                type: history_model_1.EHistoryActivityTypeValues.PATIENT,
                                type_id: updateProgressNoteResult.clinic_id,
                            })];
                    case 2:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.UPDATE_SUCCESSFULL,
                                // data: {
                                //   _id: updateProgressNoteResult._id,
                                //   field_data: updateProgressNoteResult.field_data,
                                //   clinic_id: updateProgressNoteResult.clinic_id,
                                //   doctor_id: updateProgressNoteResult.doctor_id,
                                //   treatmentPlan_id: updateProgressNoteResult.treatmentPlan_id,
                                //   appointment_id: updateProgressNoteResult.appointment_id,
                                //   progressNote_id: updateProgressNoteResult.progressNote_id,
                                // },
                            }];
                    case 3: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ON_UPDATE_PROGRESS_NOTE,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.deleteFilledProgressNote = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var deleteFilledProgressNoteResult, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, filled_progress_notes_model_1.default.updateOne({ _id: req.params._id }, { isDeleted: true })];
                    case 1:
                        deleteFilledProgressNoteResult = _a.sent();
                        if (deleteFilledProgressNoteResult &&
                            deleteFilledProgressNoteResult.modifiedCount > 0) {
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
                                        message: erros_message_1.default.ERROR_ON_DELETE_FILLED_PROGRESS_NOTE,
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
        this.getFilledProgressNote = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var getFilledProgressNoteResult, updatedData_1, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, filled_progress_notes_model_1.default.findOne({
                                _id: model._id,
                                // isActive: true,
                                // isDeleted: false,
                            }).populate([
                                {
                                    path: "appointment_id",
                                    populate: [
                                        {
                                            path: "appointmentType_id",
                                            select: { type: 1, duration: 1 },
                                        },
                                        {
                                            path: "location_id",
                                            select: {
                                                address: 1,
                                                city: 1,
                                                branchName: 1,
                                            },
                                        },
                                    ],
                                    select: {
                                        endDateTime: 1,
                                        startDateTime: 1,
                                        visitType: 1,
                                        appointmentType_id: 1,
                                        location_id: 1,
                                    },
                                },
                                {
                                    path: "doctor_id",
                                    populate: {
                                        path: "user_id",
                                        select: { first_name: 1, last_name: 1 },
                                    },
                                    select: {
                                        user_id: 1,
                                    },
                                },
                                {
                                    path: "patient_id",
                                    select: { first_name: 1, last_name: 1 },
                                },
                                {
                                    path: "progressNote_id",
                                    select: { fields: 1, form_title: 1 },
                                },
                            ])];
                    case 1:
                        getFilledProgressNoteResult = _a.sent();
                        if (getFilledProgressNoteResult) {
                            updatedData_1 = {
                                _id: getFilledProgressNoteResult._id,
                                field_data: getFilledProgressNoteResult.field_data,
                                //clinic_id: getFilledProgressNoteResult.clinic_id,
                                doctor_data: getFilledProgressNoteResult.doctor_id,
                                patient_data: (getFilledProgressNoteResult.patient_id),
                                treatmentPlan_id: getFilledProgressNoteResult.treatmentPlan_id,
                                session_narrative: getFilledProgressNoteResult.session_narrative,
                                treatment_goal: getFilledProgressNoteResult.treatment_goal,
                                appointment_data: getFilledProgressNoteResult.appointment_id,
                                progressNote: (getFilledProgressNoteResult.progressNote_id),
                            };
                            if (updatedData_1.patient_data) {
                                updatedData_1.patient_data.first_name = common_methods_1.default.getDecryptText(updatedData_1.patient_data.first_name).toLowerCase();
                                updatedData_1.patient_data.last_name = common_methods_1.default.getDecryptText(updatedData_1.patient_data.last_name).toLowerCase();
                                updatedData_1.patient_data.first_name =
                                    updatedData_1.patient_data.first_name.charAt(0).toUpperCase() +
                                        updatedData_1.patient_data.first_name.slice(1);
                                updatedData_1.patient_data.last_name =
                                    updatedData_1.patient_data.last_name.charAt(0).toUpperCase() +
                                        updatedData_1.patient_data.last_name.slice(1);
                            }
                            if (updatedData_1.progressNote.fields &&
                                updatedData_1.progressNote.fields.length > 0) {
                                if (updatedData_1.field_data && updatedData_1.field_data.length > 0) {
                                    updatedData_1.progressNote.fields.forEach(function (d, i) {
                                        var found_obj = updatedData_1.field_data.find(function (e) { return e.id.toString() == d._id.toString(); });
                                        if (found_obj) {
                                            updatedData_1.progressNote.fields[i].default = found_obj.value;
                                        }
                                        else {
                                            if (d.input_type == "checkbox") {
                                                updatedData_1.progressNote.fields[i].default = [];
                                            }
                                        }
                                    });
                                }
                                else {
                                    updatedData_1.progressNote.fields.forEach(function (d, i) {
                                        if (d.input_type == "checkbox") {
                                            updatedData_1.progressNote.fields[i].default = [];
                                        }
                                    });
                                }
                            }
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: updatedData_1,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_ON_GET_FILLED_PROGRESS_NOTE,
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
        this.listFilledProgressNote = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var defaultPage, count, populateFeilds, condition, result, formattedData_1, obj, error_5;
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
                                path: "appointment_id",
                                select: {
                                    _id: 1,
                                    appointment_number: 1,
                                    startDateTime: 1,
                                    endDateTime: 1,
                                },
                            },
                            {
                                path: "doctor_id",
                                populate: [
                                    {
                                        path: "user_id",
                                        select: { first_name: 1, last_name: 1 },
                                    },
                                ],
                                select: { _id: 1, user_id: 1 },
                            },
                        ];
                        condition = {
                            isDeleted: false,
                            //isActive: true,
                        };
                        // if (model.search) {
                        //   let isEmptyNameOnlySpace = /^\s*$/.test(model.search);
                        //   condition.type = {
                        //     $regex: model.search,
                        //     $options: "i",
                        //   };
                        // }
                        if (model.isActive) {
                            condition.isActive = model.isActive;
                        }
                        if (model.clinic_id) {
                            condition.clinic_id = model.clinic_id;
                        }
                        if (model.patient_id) {
                            condition.patient_id = model.patient_id;
                        }
                        return [4 /*yield*/, filled_progress_notes_model_1.default.paginate(condition, __assign(__assign({ page: defaultPage }, (count > 0 ? { limit: count } : { pagination: false })), { populate: populateFeilds, sort: { createdAt: -1 } }))];
                    case 1:
                        result = _a.sent();
                        if (result && result.docs && result.docs.length > 0) {
                            formattedData_1 = [];
                            result.docs.forEach(function (e) {
                                var userDetails = e.doctor_id;
                                var apptDetails = e.appointment_id;
                                var providerDetails = userDetails.user_id;
                                formattedData_1.push({
                                    _id: e._id,
                                    appointment_number: apptDetails.appointment_number,
                                    startDateTime: apptDetails.startDateTime,
                                    endDateTime: apptDetails.endDateTime,
                                    provider_first_name: providerDetails.first_name,
                                    provider_last_name: providerDetails.last_name,
                                });
                            });
                            obj = {
                                data: formattedData_1,
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
                                        message: erros_message_1.default.FILLED_PROGRESS_NOTE_LIST_NOT_FOUND,
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
        this.checkoutData = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var condition, lastFilledCond, apptCond, finalResult_1, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        condition = {
                            _id: new mongoose_1.default.Types.ObjectId(model.progressNote_id.toString()),
                        }, lastFilledCond = {
                            // status: "SAVED",
                            // doctor_id: mongoose.Types.ObjectId(doctor_id),
                            clinic_id: new mongoose_1.default.Types.ObjectId(model.clinic_id.toString()),
                            //patient_id: new mongoose.Types.ObjectId(model.patient_id!.toString()),
                        }, apptCond = {
                            //doctor_id: new mongoose.Types.ObjectId(model.doctor_id!.toString()),
                            // clinic_id: new mongoose.Types.ObjectId(model.clinic_id!.toString()),
                            //patient_id: new mongoose.Types.ObjectId(model.patient_id!.toString()),
                            appointment_id: new mongoose_1.default.Types.ObjectId(model.appointment_id.toString()),
                        };
                        return [4 /*yield*/, progress_notes_model_1.default.aggregate([
                                { $match: condition },
                                {
                                    $lookup: {
                                        from: "filledTreatmentPlan",
                                        pipeline: [
                                            { $match: lastFilledCond },
                                            { $sort: { _id: -1 } },
                                            { $limit: 1 },
                                        ],
                                        as: "lastFilledtreatmentData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$lastFilledtreatmentData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "treatmentplan",
                                        localField: "lastFilledtreatmentData.treatmentPlan_id",
                                        foreignField: "_id",
                                        as: "treatementPlanData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$treatementPlanData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "filledProgressNotes",
                                        pipeline: [{ $match: apptCond }],
                                        as: "filledprogressNoteData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$filledprogressNoteData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "appointment",
                                        pipeline: [
                                            {
                                                $match: {
                                                    // doctor_id: new mongoose.Types.ObjectId(
                                                    //   model.doctor_id!.toString()
                                                    // ),
                                                    // clinic_id: new mongoose.Types.ObjectId(
                                                    //   model.clinic_id!.toString()
                                                    // ),
                                                    // patient_id: new mongoose.Types.ObjectId(
                                                    //   model.patient_id!.toString()
                                                    // ),
                                                    _id: new mongoose_1.default.Types.ObjectId(model.appointment_id.toString()),
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "appointment",
                                                    let: { appt_id: "$appointmentType_id" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $eq: ["$_id", "$$appt_id"],
                                                                },
                                                            },
                                                        },
                                                        {
                                                            $project: { type: 1 },
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
                                            {
                                                $project: {
                                                    startDateTime: 1,
                                                    endDateTime: 1,
                                                    duration: 1,
                                                    appointment_type: "$appointmentTypeData.type",
                                                    visitType: 1,
                                                    location_id: 1,
                                                    patient_id: 1,
                                                    doctor_id: 1,
                                                },
                                            },
                                        ],
                                        as: "appointmentData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$appointmentData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "clinic_locations",
                                        let: {
                                            location_id: "$appointmentData.location_id",
                                        },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: { $eq: ["$_id", "$$location_id"] },
                                                },
                                            },
                                            {
                                                $project: {
                                                    branchName: 1,
                                                    city: 1,
                                                    address: 1,
                                                },
                                            },
                                        ],
                                        //localField: "appointmentData.location_id",
                                        //foreignField: "_id",
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
                                    $lookup: {
                                        from: "doctor",
                                        let: {
                                            doctor_id: "$appointmentData.doctor_id",
                                        },
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
                                    $lookup: {
                                        from: "patients",
                                        let: {
                                            patient_id: "$appointmentData.patient_id",
                                        },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: { $eq: ["$_id", "$$patient_id"] },
                                                },
                                            },
                                            { $project: { first_name: 1, last_name: 1 } },
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
                            ])];
                    case 1:
                        finalResult_1 = _a.sent();
                        if (finalResult_1) {
                            // finalResult[0].patientData.first_name = Utility.getEncryptText(
                            //   finalResult[0].patientData.first_name.toUpperCase()
                            // );
                            if (finalResult_1[0].fields && finalResult_1[0].fields.length > 0) {
                                if (finalResult_1[0].filledprogressNoteData &&
                                    finalResult_1[0].filledprogressNoteData.field_data.length > 0) {
                                    finalResult_1[0].fields.forEach(function (d, i) {
                                        var found_obj = finalResult_1[0].filledprogressNoteData.field_data.find(function (e) { return e.id.toString() == d._id.toString(); });
                                        if (found_obj) {
                                            finalResult_1[0].fields[i].default = found_obj.value;
                                        }
                                        else {
                                            if (d.input_type == "checkbox") {
                                                finalResult_1[0].fields[i].default = [];
                                            }
                                        }
                                    });
                                }
                                else {
                                    finalResult_1[0].fields.forEach(function (d, i) {
                                        if (d.input_type == "checkbox") {
                                            finalResult_1[0].fields[i].default = [];
                                        }
                                    });
                                }
                            }
                            finalResult_1[0].patientData.first_name = finalResult_1[0].patientData
                                .first_name
                                ? common_methods_1.default.getDecryptText(finalResult_1[0].patientData.first_name)
                                : "";
                            finalResult_1[0].patientData.last_name = finalResult_1[0].patientData
                                .last_name
                                ? common_methods_1.default.getDecryptText(finalResult_1[0].patientData.last_name)
                                : "";
                            finalResult_1[0].session_narrative =
                                finalResult_1[0].filledprogressNoteData &&
                                    finalResult_1[0].filledprogressNoteData.session_narrative
                                    ? finalResult_1[0].filledprogressNoteData.session_narrative
                                    : null;
                            finalResult_1[0].treatment_goal =
                                finalResult_1[0].filledprogressNoteData &&
                                    finalResult_1[0].filledprogressNoteData.treatment_goal
                                    ? finalResult_1[0].filledprogressNoteData.treatment_goal
                                    : null;
                            finalResult_1[0].codes =
                                finalResult_1[0].filledprogressNoteData &&
                                    finalResult_1[0].filledprogressNoteData.codes
                                    ? finalResult_1[0].filledprogressNoteData.codes
                                    : null;
                            delete finalResult_1[0].filledprogressNoteData;
                            delete finalResult_1[0].isActive;
                            delete finalResult_1[0].isDeleted;
                            delete finalResult_1[0].saveAsDraft;
                            finalResult_1[0].progress_note_id = finalResult_1[0]._id;
                            //delete finalResult[0].progress_note_id;
                            //delete finalResult[0].clinic_id;
                            delete finalResult_1[0].import;
                            // finalResult[0].patientData.last_name = Utility.getEncryptText(
                            //   finalResult[0].patientData.last_name.toUpperCase()
                            // );
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    data: finalResult_1[0],
                                    success: true,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.FILLED_PROGRESS_NOTE_LIST_NOT_FOUND,
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
        this.listProgressNoteCheckout = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var lastFilledCond, lastFilledTreatmentPlan, sortObject, listCond, data, finalObjectToBeSend, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        lastFilledCond = {
                            saveAsDraft: false,
                            clinic_id: new mongoose_1.default.Types.ObjectId(model.clinic_id.toString()),
                            patient_id: new mongoose_1.default.Types.ObjectId(model.patient_id.toString()),
                            // doctor_id: mongoose.Types.ObjectId(doctor_id), // COMMENTED BY LOVEPREET ON 17-FEB-2023
                        };
                        return [4 /*yield*/, filled_treatment_plan_model_1.default.aggregate([
                                { $match: lastFilledCond },
                                {
                                    $lookup: {
                                        from: "treatmentplan",
                                        localField: "treatmentPlan_id",
                                        foreignField: "_id",
                                        as: "treatementPlanData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$treatementPlanData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $project: {
                                        title: "$treatementPlanData.form_title",
                                        treatmentPlan_id: "$treatementPlanData._id",
                                    },
                                },
                                { $sort: { _id: -1 } },
                                { $limit: 1 },
                            ])];
                    case 1:
                        lastFilledTreatmentPlan = _a.sent();
                        if (!lastFilledTreatmentPlan.length)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_TREATMENT_PLAN_FILLED,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        sortObject = {};
                        // if (req.body.sortValue && req.body.sortOrder) {
                        //   sortObject[req.body.sortValue] = req.body.sortOrder;
                        // } else
                        sortObject = { _id: -1 };
                        listCond = {
                            isActive: true,
                            isDeleted: false,
                            clinic_id: new mongoose_1.default.Types.ObjectId(model.clinic_id.toString()),
                        };
                        return [4 /*yield*/, progress_notes_model_1.default.aggregate([
                                { $match: listCond },
                                {
                                    $facet: {
                                        totalCount: [{ $count: "sum" }],
                                        aggregatedData: [
                                            {
                                                $project: {
                                                    form_title: "$form_title",
                                                    isActive: "$isActive",
                                                    isDeleted: "$isDeleted",
                                                },
                                            },
                                            { $sort: sortObject },
                                            // { $limit: parseInt(skip) + parseInt(count) },
                                            // { $skip: parseInt(skip) },
                                        ],
                                    },
                                },
                            ])];
                    case 2:
                        data = _a.sent();
                        finalObjectToBeSend = {
                            progressNotes: data[0].aggregatedData,
                            treatmentPlan: {
                                title: lastFilledTreatmentPlan[0].title,
                                //graphicalArr: lastFilledTreatmentPlan[0].graphicalArr,
                                treatmentPlan_id: lastFilledTreatmentPlan[0].treatmentPlan_id,
                            },
                        };
                        if (finalObjectToBeSend) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    data: finalObjectToBeSend,
                                    success: true,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.PROGRESS_NOTE_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_7 = _a.sent();
                        next(error_7);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return FilledProgressNoteServices;
}());
exports.default = new FilledProgressNoteServices();
