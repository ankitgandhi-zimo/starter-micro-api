"use strict";
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
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var erros_message_1 = __importDefault(require("../../common/erros_message"));
var super_bill_model_1 = __importDefault(require("../../models/super_bill.model"));
var moment_1 = __importDefault(require("moment"));
var get_aging_report_viewmodel_1 = require("../../view-models/agingReport/get_aging_report.viewmodel");
var path_1 = __importDefault(require("path"));
var xlsx_populate_1 = __importDefault(require("xlsx-populate"));
var AgingReportServices = /** @class */ (function () {
    function AgingReportServices() {
        var _this = this;
        this.getReport = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var defaultPage, count, condition, appointment_condtion, insurance_condition, child_condition, startTime, endTime, result, obj, objToPush, result, obj, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        defaultPage = void 0;
                        count = void 0;
                        defaultPage = model.pageNumber ? model.pageNumber : 1;
                        count = model.pageSize ? model.pageSize : 50;
                        condition = { insurance_id: { $ne: null } };
                        appointment_condtion = {};
                        insurance_condition = {};
                        child_condition = {};
                        if (model.aging) {
                            if (model.tab == "AGING_DOS" || model.tab == "SUMMARY_DOS")
                                child_condition.aging_dos = {
                                    $lte: model.aging[1],
                                    $gte: model.aging[0],
                                };
                            if (model.tab == "AGING_SUBMISSION" ||
                                model.tab == "SUMMARY_SUBMISSION")
                                child_condition.aging_submission = {
                                    $lte: model.aging[1],
                                    $gte: model.aging[0],
                                };
                        }
                        if (model.clinic_id) {
                            condition.clinic_id = new mongoose_1.default.Types.ObjectId(model.clinic_id);
                        }
                        if (model.doctor_id) {
                            condition.referring_provider_id = new mongoose_1.default.Types.ObjectId(model.doctor_id);
                        }
                        if (model.location_id) {
                            condition.location_id = new mongoose_1.default.Types.ObjectId(model.location_id);
                        }
                        if (model.patient_id) {
                            condition.patient_id = new mongoose_1.default.Types.ObjectId(model.patient_id);
                        }
                        if (model.visitType) {
                            appointment_condtion.visitType = model.visitType;
                        }
                        if (model.case_type) {
                            appointment_condtion.case_type = new mongoose_1.default.Types.ObjectId(model.case_type);
                        }
                        if (model.insurance_type) {
                            insurance_condition.insurance_type = model.insurance_type;
                        }
                        if (model.insurance_plan_type) {
                            insurance_condition.insurance_plan_type = model.insurance_plan_type;
                        }
                        if (model.insurance_company_id) {
                            insurance_condition.insurance_company_id = new mongoose_1.default.Types.ObjectId(model.insurance_company_id);
                        }
                        if (model.startDateTime) {
                            startTime = new Date(model.startDateTime);
                            startTime.setHours(0, 0, 0, 0);
                            condition.createdAt = {
                                $gte: startTime,
                            };
                        }
                        if (model.endDateTime) {
                            endTime = new Date(model.endDateTime);
                            endTime.setHours(23, 59, 59, 999);
                            if ("createdAt" in condition)
                                condition.createdAt.$lte = endTime;
                            else
                                condition.createdAt = {
                                    $lte: endTime,
                                };
                        }
                        if (!(model.tab == get_aging_report_viewmodel_1.EnumTab.TOTAL_AR ||
                            model.tab == get_aging_report_viewmodel_1.EnumTab.AGING_DOS ||
                            model.tab == get_aging_report_viewmodel_1.EnumTab.AGING_SUBMISSION)) return [3 /*break*/, 2];
                        return [4 /*yield*/, super_bill_model_1.default.aggregate([
                                { $match: condition },
                                {
                                    $lookup: {
                                        from: "appointment",
                                        localField: "appointment_id",
                                        foreignField: "_id",
                                        pipeline: [
                                            {
                                                $project: {
                                                    startDateTime: 1,
                                                    endDateTime: 1,
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
                                    $addFields: {
                                        aging_dos: {
                                            $dateDiff: {
                                                startDate: "$appointmentData.startDateTime",
                                                endDate: "$$NOW",
                                                unit: "day",
                                            },
                                        },
                                    },
                                },
                                {
                                    $addFields: {
                                        aging_submission: {
                                            $dateDiff: {
                                                startDate: "$createdAt",
                                                endDate: "$$NOW",
                                                unit: "day",
                                            },
                                        },
                                    },
                                },
                                { $match: child_condition },
                                {
                                    $lookup: {
                                        from: "insurance",
                                        localField: "insurance_id",
                                        foreignField: "_id",
                                        pipeline: [{ $match: insurance_condition }],
                                        as: "insuranceData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$insuranceData",
                                        preserveNullAndEmptyArrays: false,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "doctor",
                                        localField: "referring_provider_id",
                                        foreignField: "_id",
                                        pipeline: [
                                            {
                                                $lookup: {
                                                    from: "users",
                                                    localField: "user_id",
                                                    foreignField: "_id",
                                                    pipeline: [
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
                                        as: "providerData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$providerData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "patients",
                                        localField: "patient_id",
                                        foreignField: "_id",
                                        pipeline: [
                                            {
                                                $project: {
                                                    first_name: 1,
                                                    last_name: 1,
                                                    date_of_birth: 1,
                                                    patientId: 1,
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
                                        from: "cpt",
                                        localField: "cpt.cpt_code_id",
                                        foreignField: "_id",
                                        let: { cpt_id: "$cpt.cpt_code_id" },
                                        pipeline: [
                                            {
                                                $project: {
                                                    cptCode: 1,
                                                    // description: 1,
                                                    // price: 1,
                                                    // _id: 1,
                                                },
                                            },
                                        ],
                                        as: "cptData",
                                    },
                                },
                                {
                                    $facet: {
                                        totalCount: [{ $count: "count" }],
                                        aggregatedData: [
                                            {
                                                $project: {
                                                    // _id: 0,
                                                    first_name: "$patientData.first_name",
                                                    last_name: "$patientData.last_name",
                                                    patientId: "$patientData.patientId",
                                                    dos: "$appointmentData.startDateTime",
                                                    provider_first_name: "$providerData.first_name",
                                                    provider_last_name: "$providerData.last_name",
                                                    // +
                                                    // " " +
                                                    // "$providerData.last_name",
                                                    primary_insurance: "$insurance_name",
                                                    cpt: "$cptData",
                                                    date_of_submission: "$createdAt",
                                                    charge_amount: "$total_amount",
                                                },
                                            },
                                            { $sort: { createdAt: 1 } },
                                            { $skip: count * (defaultPage - 1) },
                                            { $limit: count },
                                        ],
                                    },
                                },
                            ])];
                    case 1:
                        result = _a.sent();
                        if (result &&
                            result.length &&
                            result[0].aggregatedData &&
                            result[0].aggregatedData.length) {
                            result[0].aggregatedData.forEach(function (singleRecord) {
                                singleRecord.first_name = common_methods_1.default.getDecryptText(singleRecord.first_name);
                                singleRecord.last_name = common_methods_1.default.getDecryptText(singleRecord.last_name);
                                singleRecord.procedure = "";
                                singleRecord.cpt.forEach(function (singleCpt) {
                                    singleRecord.procedure += singleCpt.cptCode + " ";
                                });
                                delete singleRecord.cpt;
                                var current_date = (0, moment_1.default)();
                                if (model.tab == "AGING_DOS") {
                                    var days_diff = current_date.diff((0, moment_1.default)(singleRecord.dos), "days");
                                    singleRecord["0-30"] =
                                        days_diff < 31 ? singleRecord.charge_amount : 0;
                                    singleRecord["31-60"] =
                                        days_diff > 31 && days_diff < 61
                                            ? singleRecord.charge_amount
                                            : 0;
                                    singleRecord["61-90"] =
                                        days_diff > 61 && days_diff < 91
                                            ? singleRecord.charge_amount
                                            : 0;
                                    singleRecord["91-120"] =
                                        days_diff > 91 && days_diff < 121
                                            ? singleRecord.charge_amount
                                            : 0;
                                    singleRecord["121-150"] =
                                        days_diff > 121 && days_diff < 151
                                            ? singleRecord.charge_amount
                                            : 0;
                                    singleRecord["151-180"] =
                                        days_diff > 151 && days_diff < 181
                                            ? singleRecord.charge_amount
                                            : 0;
                                    singleRecord["180+"] =
                                        days_diff > 181 ? singleRecord.charge_amount : 0;
                                }
                                if (model.tab == "AGING_SUBMISSION") {
                                    var days_diff = current_date.diff((0, moment_1.default)(singleRecord.date_of_submission), "days");
                                    singleRecord["0-30"] =
                                        days_diff < 31 ? singleRecord.charge_amount : 0;
                                    singleRecord["31-60"] =
                                        days_diff > 31 && days_diff < 61
                                            ? singleRecord.charge_amount
                                            : 0;
                                    singleRecord["61-90"] =
                                        days_diff > 61 && days_diff < 91
                                            ? singleRecord.charge_amount
                                            : 0;
                                    singleRecord["91-120"] =
                                        days_diff > 91 && days_diff < 121
                                            ? singleRecord.charge_amount
                                            : 0;
                                    singleRecord["121-150"] =
                                        days_diff > 121 && days_diff < 151
                                            ? singleRecord.charge_amount
                                            : 0;
                                    singleRecord["151-180"] =
                                        days_diff > 151 && days_diff < 181
                                            ? singleRecord.charge_amount
                                            : 0;
                                    singleRecord["180+"] =
                                        days_diff > 181 ? singleRecord.charge_amount : 0;
                                }
                            });
                            obj = {
                                data: result[0].aggregatedData,
                                // count: result.totalDocs,
                                totalDocs: result[0].totalCount[0].count,
                                pageNumber: defaultPage,
                                pageSize: count,
                                totalPages: Math.ceil(result[0].totalCount[0].count / count),
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
                        return [3 /*break*/, 4];
                    case 2:
                        objToPush = { createdAt: "$createdAt", amount: "$total_amount" };
                        if (model.tab == "SUMMARY_DOS") {
                            objToPush.createdAt = "$appointmentData.startDateTime";
                        }
                        return [4 /*yield*/, super_bill_model_1.default.aggregate([
                                { $match: condition },
                                {
                                    $lookup: {
                                        from: "appointment",
                                        localField: "appointment_id",
                                        foreignField: "_id",
                                        pipeline: [
                                            {
                                                $project: {
                                                    startDateTime: 1,
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
                                    $addFields: {
                                        aging_dos: {
                                            $dateDiff: {
                                                startDate: "$appointmentData.startDateTime",
                                                endDate: "$$NOW",
                                                unit: "day",
                                            },
                                        },
                                    },
                                },
                                {
                                    $addFields: {
                                        aging_submission: {
                                            $dateDiff: {
                                                startDate: "$createdAt",
                                                endDate: "$$NOW",
                                                unit: "day",
                                            },
                                        },
                                    },
                                },
                                { $match: child_condition },
                                {
                                    $lookup: {
                                        from: "insurance",
                                        localField: "insurance_id",
                                        foreignField: "_id",
                                        pipeline: [
                                            { $match: insurance_condition },
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
                                                $project: {
                                                    insurance_company_name: "$insuranceCompanyData.companyName",
                                                    insurance_company_id: "$insuranceCompanyData._id",
                                                },
                                            },
                                        ],
                                        as: "insuranceData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$insuranceData",
                                        preserveNullAndEmptyArrays: false,
                                    },
                                },
                                {
                                    $group: {
                                        _id: "$insuranceData.insurance_company_id",
                                        total_amount_sum: { $sum: "$total_amount" },
                                        insurance_company_name: {
                                            $first: "$insuranceData.insurance_company_name",
                                        },
                                        data: {
                                            $push: objToPush,
                                        },
                                    },
                                },
                                {
                                    $project: {
                                        insurance_company_name: 1,
                                        total_amount_sum: 1,
                                        data: 1,
                                    },
                                },
                            ])];
                    case 3:
                        result = _a.sent();
                        if (result && result.length) {
                            result.forEach(function (singleRecord) {
                                var current_date = (0, moment_1.default)();
                                singleRecord["0-30"] = 0;
                                singleRecord["31-60"] = 0;
                                singleRecord["61-90"] = 0;
                                singleRecord["91-120"] = 0;
                                singleRecord["121-150"] = 0;
                                singleRecord["151-180"] = 0;
                                singleRecord["180+"] = 0;
                                singleRecord.data.forEach(function (innerRecord) {
                                    var days_diff = current_date.diff((0, moment_1.default)(innerRecord.createdAt), "days");
                                    singleRecord["0-30"] =
                                        days_diff < 31
                                            ? singleRecord["0-30"] + innerRecord.amount
                                            : singleRecord["0-30"];
                                    singleRecord["31-60"] =
                                        days_diff > 30 && days_diff < 61
                                            ? singleRecord["31-60"] + innerRecord.amount
                                            : singleRecord["31-60"];
                                    singleRecord["61-90"] =
                                        days_diff > 61 && days_diff < 91
                                            ? singleRecord["61-90"] + innerRecord.amount
                                            : singleRecord["61-90"];
                                    singleRecord["91-120"] =
                                        days_diff > 91 && days_diff < 121
                                            ? singleRecord["91-120"] + innerRecord.amount
                                            : singleRecord["91-120"];
                                    singleRecord["121-150"] =
                                        days_diff > 121 && days_diff < 151
                                            ? singleRecord["121-150"] + innerRecord.amount
                                            : singleRecord["121-150"];
                                    singleRecord["151-180"] =
                                        days_diff > 151 && days_diff < 181
                                            ? singleRecord["151-180"] + innerRecord.amount
                                            : singleRecord["151-180"];
                                    singleRecord["180+"] =
                                        days_diff > 181
                                            ? singleRecord["180+"] + innerRecord.amount
                                            : singleRecord["180+"];
                                    delete singleRecord.data;
                                });
                            });
                            obj = {
                                data: result,
                                // count: result.totalDocs,
                                totalDocs: result.length,
                                pageNumber: defaultPage,
                                pageSize: count,
                                totalPages: Math.ceil(result.length / count),
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
        this.getAgingReportExcel = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var condition, appointment_condtion, insurance_condition, child_condition, startTime, endTime, result, sheetStyle_1, workbook, agingSheet_1, agingSheetHeader, Aging_Dos, agingDosSheet_1, agingDosSheetHeader, Aging_Submission, agingSubmissionSheet_1, agingSubmissionSheetHeader, Aging_Summary_Dos, summaryDosSheet_1, summaryDosSheetHeader, Aging_Summary_Submission, summarySubmissionSheet_1, summarySubmissionSheetHeader, excelDataTotal, excelDataTotal, excelDataTotal, excelData, link, excelFileName, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        condition = { insurance_id: { $ne: null } };
                        appointment_condtion = {};
                        insurance_condition = {};
                        child_condition = {};
                        if (model.aging) {
                            if (model.tab == "AGING_DOS" || model.tab == "SUMMARY_DOS")
                                child_condition.aging_dos = {
                                    $lte: model.aging[1],
                                    $gte: model.aging[0],
                                };
                            if (model.tab == "AGING_SUBMISSION" ||
                                model.tab == "SUMMARY_SUBMISSION")
                                child_condition.aging_submission = {
                                    $lte: model.aging[1],
                                    $gte: model.aging[0],
                                };
                        }
                        if (model.clinic_id) {
                            condition.clinic_id = new mongoose_1.default.Types.ObjectId(model.clinic_id);
                        }
                        if (model.doctor_id) {
                            condition.referring_provider_id = new mongoose_1.default.Types.ObjectId(model.doctor_id);
                        }
                        if (model.location_id) {
                            condition.location_id = new mongoose_1.default.Types.ObjectId(model.location_id);
                        }
                        if (model.patient_id) {
                            condition.patient_id = new mongoose_1.default.Types.ObjectId(model.patient_id);
                        }
                        if (model.visitType) {
                            appointment_condtion.visitType = model.visitType;
                        }
                        if (model.case_type) {
                            appointment_condtion.case_type = new mongoose_1.default.Types.ObjectId(model.case_type);
                        }
                        if (model.insurance_type) {
                            insurance_condition.insurance_type = model.insurance_type;
                        }
                        if (model.insurance_plan_type) {
                            insurance_condition.insurance_plan_type = model.insurance_plan_type;
                        }
                        if (model.insurance_company_id) {
                            insurance_condition.insurance_company_id = new mongoose_1.default.Types.ObjectId(model.insurance_company_id);
                        }
                        if (model.startDateTime) {
                            startTime = new Date(model.startDateTime);
                            startTime.setHours(0, 0, 0, 0);
                            condition.createdAt = {
                                $gte: startTime,
                            };
                        }
                        if (model.endDateTime) {
                            endTime = new Date(model.endDateTime);
                            endTime.setHours(23, 59, 59, 999);
                            if ("createdAt" in condition)
                                condition.createdAt.$lte = endTime;
                            else
                                condition.createdAt = {
                                    $lte: endTime,
                                };
                        }
                        return [4 /*yield*/, super_bill_model_1.default.aggregate([
                                { $match: condition },
                                {
                                    $lookup: {
                                        from: "appointment",
                                        localField: "appointment_id",
                                        foreignField: "_id",
                                        pipeline: [
                                            {
                                                $project: {
                                                    startDateTime: 1,
                                                    endDateTime: 1,
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
                                    $addFields: {
                                        aging_dos: {
                                            $dateDiff: {
                                                startDate: "$appointmentData.startDateTime",
                                                endDate: "$$NOW",
                                                unit: "day",
                                            },
                                        },
                                    },
                                },
                                {
                                    $addFields: {
                                        aging_submission: {
                                            $dateDiff: {
                                                startDate: "$createdAt",
                                                endDate: "$$NOW",
                                                unit: "day",
                                            },
                                        },
                                    },
                                },
                                { $match: child_condition },
                                {
                                    $lookup: {
                                        from: "insurance",
                                        localField: "insurance_id",
                                        foreignField: "_id",
                                        pipeline: [
                                            // { $match: insurance_condition },
                                            { $match: insurance_condition },
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
                                                $project: {
                                                    insurance_company_name: "$insuranceCompanyData.companyName",
                                                    insurance_company_id: "$insuranceCompanyData._id",
                                                },
                                            },
                                        ],
                                        as: "insuranceData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$insuranceData",
                                        preserveNullAndEmptyArrays: false,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "doctor",
                                        localField: "referring_provider_id",
                                        foreignField: "_id",
                                        pipeline: [
                                            {
                                                $lookup: {
                                                    from: "users",
                                                    localField: "user_id",
                                                    foreignField: "_id",
                                                    pipeline: [
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
                                        as: "providerData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$providerData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "patients",
                                        localField: "patient_id",
                                        foreignField: "_id",
                                        pipeline: [
                                            {
                                                $project: {
                                                    first_name: 1,
                                                    last_name: 1,
                                                    date_of_birth: 1,
                                                    patientId: 1,
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
                                        from: "cpt",
                                        localField: "cpt.cpt_code_id",
                                        foreignField: "_id",
                                        let: { cpt_id: "$cpt.cpt_code_id" },
                                        pipeline: [
                                            {
                                                $project: {
                                                    cptCode: 1,
                                                    // description: 1,
                                                    // price: 1,
                                                    // _id: 1,
                                                },
                                            },
                                        ],
                                        as: "cptData",
                                    },
                                },
                                {
                                    $facet: {
                                        AgingData: [
                                            {
                                                $project: {
                                                    // _id: 0,
                                                    first_name: "$patientData.first_name",
                                                    last_name: "$patientData.last_name",
                                                    patientId: "$patientData.patientId",
                                                    dos: "$appointmentData.startDateTime",
                                                    provider_first_name: "$providerData.first_name",
                                                    provider_last_name: "$providerData.last_name",
                                                    // +
                                                    // " " +
                                                    // "$providerData.last_name",
                                                    primary_insurance: "$insurance_name",
                                                    cpt: "$cptData",
                                                    date_of_submission: "$createdAt",
                                                    charge_amount: "$total_amount",
                                                },
                                            },
                                            { $sort: { createdAt: 1 } },
                                        ],
                                        SummaryDataDos: [
                                            {
                                                $group: {
                                                    _id: "$insuranceData.insurance_company_id",
                                                    total_amount_sum: { $sum: "$total_amount" },
                                                    insurance_company_name: {
                                                        $first: "$insuranceData.insurance_company_name",
                                                    },
                                                    data: {
                                                        $push: { createdAt: "$createdAt", amount: "$total_amount" },
                                                    },
                                                },
                                            },
                                            {
                                                $project: {
                                                    insurance_company_name: 1,
                                                    total_amount_sum: 1,
                                                    data: 1,
                                                },
                                            },
                                        ],
                                        SummaryDataSubmission: [
                                            {
                                                $group: {
                                                    _id: "$insuranceData.insurance_company_id",
                                                    total_amount_sum: { $sum: "$total_amount" },
                                                    insurance_company_name: {
                                                        $first: "$insuranceData.insurance_company_name",
                                                    },
                                                    data: {
                                                        $push: {
                                                            createdAt: "$appointmentData.startDateTime",
                                                            amount: "$total_amount",
                                                        },
                                                    },
                                                },
                                            },
                                            {
                                                $project: {
                                                    insurance_company_name: 1,
                                                    total_amount_sum: 1,
                                                    data: 1,
                                                },
                                            },
                                        ],
                                        //                   let objToPush = ;
                                        // if (model.tab == "SUMMARY_DOS") {
                                        //   objToPush.createdAt = "$appointmentData.startDateTime";
                                        // }
                                    },
                                },
                                { $sort: { createdAt: 1 } },
                            ])];
                    case 1:
                        result = _a.sent();
                        sheetStyle_1 = {
                            border: true,
                            fontFamily: "Calibri",
                        };
                        return [4 /*yield*/, xlsx_populate_1.default.fromBlankAsync()];
                    case 2:
                        workbook = _a.sent();
                        agingSheet_1 = workbook.sheet("Sheet1");
                        workbook.sheet(0).name("Total_Ar");
                        agingSheetHeader = [
                            "S.No.",
                            "Name",
                            "Patient ID",
                            "DOS",
                            "Provider",
                            "Primary Insurance",
                            "Date of submission",
                            "Charge Amount",
                            "Procedure",
                        ];
                        agingSheetHeader.forEach(function (el, i) {
                            agingSheet_1
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
                        Aging_Dos = workbook.addSheet("Aging_Dos");
                        agingDosSheet_1 = workbook.sheet("Aging_Dos");
                        agingDosSheetHeader = [
                            "S.No.",
                            "Name",
                            "Patient ID",
                            "DOS",
                            "Provider",
                            "Primary Insurance",
                            "Date of submission",
                            "Charge Amount",
                            "Procedure",
                            "0-30",
                            "31-60",
                            "61-90",
                            "91-120",
                            "121-150",
                            "151-180",
                            "180+",
                        ];
                        agingDosSheetHeader.forEach(function (el, i) {
                            agingDosSheet_1
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
                        Aging_Submission = workbook.addSheet("Aging_Submission");
                        agingSubmissionSheet_1 = workbook.sheet("Aging_Submission");
                        agingSubmissionSheetHeader = [
                            "S.No.",
                            "Name",
                            "Patient ID",
                            "DOS",
                            "Provider",
                            "Primary Insurance",
                            "Date of submission",
                            "Charge Amount",
                            "Procedure",
                            "0-30",
                            "31-60",
                            "61-90",
                            "91-120",
                            "121-150",
                            "151-180",
                            "180+",
                        ];
                        agingSubmissionSheetHeader.forEach(function (el, i) {
                            agingSubmissionSheet_1
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
                        Aging_Summary_Dos = workbook.addSheet("Aging_Summary_Dos");
                        summaryDosSheet_1 = workbook.sheet("Aging_Summary_Dos");
                        summaryDosSheetHeader = [
                            "S.No.",
                            "Insurance",
                            "0-30",
                            "31-60",
                            "61-90",
                            "91-120",
                            "121-150",
                            "151-180",
                            "180+",
                        ];
                        summaryDosSheetHeader.forEach(function (el, i) {
                            summaryDosSheet_1
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
                        Aging_Summary_Submission = workbook.addSheet("Aging_Summary_Submission");
                        summarySubmissionSheet_1 = workbook.sheet("Aging_Summary_Submission");
                        summarySubmissionSheetHeader = [
                            "S.No.",
                            "Insurance",
                            "0-30",
                            "31-60",
                            "61-90",
                            "91-120",
                            "121-150",
                            "151-180",
                            "180+",
                        ];
                        summarySubmissionSheetHeader.forEach(function (el, i) {
                            summarySubmissionSheet_1
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
                        if (result && result.length) {
                            if (result[0].AgingData && result[0].AgingData.length) {
                                result[0].AgingData.forEach(function (singleRecord) {
                                    singleRecord.first_name = common_methods_1.default.getDecryptText(singleRecord.first_name);
                                    singleRecord.last_name = common_methods_1.default.getDecryptText(singleRecord.last_name);
                                    singleRecord.procedure = "";
                                    singleRecord.cpt.forEach(function (singleCpt) {
                                        singleRecord.procedure += singleCpt.cptCode + " ";
                                    });
                                    delete singleRecord.cpt;
                                    var current_date = (0, moment_1.default)();
                                    //if (model.tab == "AGING_DOS") {
                                    var days_diff = current_date.diff((0, moment_1.default)(singleRecord.dos), "days");
                                    singleRecord.aging_dos = {};
                                    singleRecord.aging_dos["0-30"] =
                                        days_diff < 31 ? singleRecord.charge_amount : 0;
                                    singleRecord.aging_dos["31-60"] =
                                        days_diff > 31 && days_diff < 61 ? singleRecord.charge_amount : 0;
                                    singleRecord.aging_dos["61-90"] =
                                        days_diff > 61 && days_diff < 91 ? singleRecord.charge_amount : 0;
                                    singleRecord.aging_dos["91-120"] =
                                        days_diff > 91 && days_diff < 121
                                            ? singleRecord.charge_amount
                                            : 0;
                                    singleRecord.aging_dos["121-150"] =
                                        days_diff > 121 && days_diff < 151
                                            ? singleRecord.charge_amount
                                            : 0;
                                    singleRecord.aging_dos["151-180"] =
                                        days_diff > 151 && days_diff < 181
                                            ? singleRecord.charge_amount
                                            : 0;
                                    singleRecord.aging_dos["180+"] =
                                        days_diff > 181 ? singleRecord.charge_amount : 0;
                                    //}
                                    //if (model.tab == "AGING_SUBMISSION") {
                                    days_diff = current_date.diff((0, moment_1.default)(singleRecord.date_of_submission), "days");
                                    singleRecord.aging_submission = {};
                                    singleRecord.aging_submission["0-30"] =
                                        days_diff < 31 ? singleRecord.charge_amount : 0;
                                    singleRecord.aging_submission["31-60"] =
                                        days_diff > 31 && days_diff < 61 ? singleRecord.charge_amount : 0;
                                    singleRecord.aging_submission["61-90"] =
                                        days_diff > 61 && days_diff < 91 ? singleRecord.charge_amount : 0;
                                    singleRecord.aging_submission["91-120"] =
                                        days_diff > 91 && days_diff < 121
                                            ? singleRecord.charge_amount
                                            : 0;
                                    singleRecord.aging_submission["121-150"] =
                                        days_diff > 121 && days_diff < 151
                                            ? singleRecord.charge_amount
                                            : 0;
                                    singleRecord.aging_submission["151-180"] =
                                        days_diff > 151 && days_diff < 181
                                            ? singleRecord.charge_amount
                                            : 0;
                                    singleRecord.aging_submission["180+"] =
                                        days_diff > 181 ? singleRecord.charge_amount : 0;
                                    //}
                                });
                                excelDataTotal = result[0].AgingData.length
                                    ? result[0].AgingData
                                    : [];
                                excelDataTotal.forEach(function (el, i) {
                                    // let date = moment(el.startDateTime).format(
                                    //   "DD-MM-YYYY"
                                    // );
                                    agingSheet_1
                                        .cell("A" + (i + 2))
                                        .value(i + 1)
                                        .style(sheetStyle_1);
                                    agingSheet_1
                                        .cell("B" + (i + 2))
                                        .value(el.first_name + " " + el.last_name)
                                        .style(sheetStyle_1);
                                    agingSheet_1
                                        .cell("C" + (i + 2))
                                        .value(el.Patient_ID)
                                        .style(sheetStyle_1);
                                    agingSheet_1
                                        .cell("D" + (i + 2))
                                        .value((0, moment_1.default)(el.dos).format("DD-MM-YYYY"))
                                        .style(sheetStyle_1);
                                    agingSheet_1
                                        .cell("E" + (i + 2))
                                        .value(el.provider_first_name + " " + el.provider_last_name)
                                        .style(sheetStyle_1);
                                    agingSheet_1
                                        .cell("F" + (i + 2))
                                        .value(el.primary_insurance)
                                        .style(sheetStyle_1);
                                    agingSheet_1
                                        .cell("G" + (i + 2))
                                        .value((0, moment_1.default)(el.date_of_submission).format("DD-MM-YYYY"))
                                        .style(sheetStyle_1);
                                    agingSheet_1
                                        .cell("H" + (i + 2))
                                        .value(el.charge_amount)
                                        .style(sheetStyle_1);
                                    agingSheet_1
                                        .cell("I" + (i + 2))
                                        .value(el.procedure)
                                        .style(sheetStyle_1);
                                    ////////////////////////////////////////////////////////////////////////////
                                    //AGING DOS
                                    agingDosSheet_1
                                        .cell("A" + (i + 2))
                                        .value(i + 1)
                                        .style(sheetStyle_1);
                                    agingDosSheet_1
                                        .cell("B" + (i + 2))
                                        .value(el.first_name + " " + el.last_name)
                                        .style(sheetStyle_1);
                                    agingDosSheet_1
                                        .cell("C" + (i + 2))
                                        .value(el.Patient_ID)
                                        .style(sheetStyle_1);
                                    agingDosSheet_1
                                        .cell("D" + (i + 2))
                                        .value((0, moment_1.default)(el.dos).format("DD-MM-YYYY"))
                                        .style(sheetStyle_1);
                                    agingDosSheet_1
                                        .cell("E" + (i + 2))
                                        .value(el.provider_first_name + " " + el.provider_last_name)
                                        .style(sheetStyle_1);
                                    agingDosSheet_1
                                        .cell("F" + (i + 2))
                                        .value(el.primary_insurance)
                                        .style(sheetStyle_1);
                                    agingDosSheet_1
                                        .cell("G" + (i + 2))
                                        .value((0, moment_1.default)(el.date_of_submission).format("DD-MM-YYYY"))
                                        .style(sheetStyle_1);
                                    agingDosSheet_1
                                        .cell("H" + (i + 2))
                                        .value(el.charge_amount)
                                        .style(sheetStyle_1);
                                    agingDosSheet_1
                                        .cell("I" + (i + 2))
                                        .value(el.procedure)
                                        .style(sheetStyle_1);
                                    agingDosSheet_1
                                        .cell("J" + (i + 2))
                                        .value(el.aging_dos["0-30"])
                                        .style(sheetStyle_1);
                                    agingDosSheet_1
                                        .cell("K" + (i + 2))
                                        .value(el.aging_dos["31-60"])
                                        .style(sheetStyle_1);
                                    agingDosSheet_1
                                        .cell("L" + (i + 2))
                                        .value(el.aging_dos["61-90"])
                                        .style(sheetStyle_1);
                                    agingDosSheet_1
                                        .cell("M" + (i + 2))
                                        .value(el.aging_dos["91-120"])
                                        .style(sheetStyle_1);
                                    agingDosSheet_1
                                        .cell("N" + (i + 2))
                                        .value(el.aging_dos["120-151"])
                                        .style(sheetStyle_1);
                                    agingDosSheet_1
                                        .cell("O" + (i + 2))
                                        .value(el.aging_dos["151-180"])
                                        .style(sheetStyle_1);
                                    agingDosSheet_1
                                        .cell("P" + (i + 2))
                                        .value(el.aging_dos["180+"])
                                        .style(sheetStyle_1);
                                    ////////////////////////////////////////////////////////////////////////////
                                    //AGING SUBMISSION
                                    agingSubmissionSheet_1
                                        .cell("A" + (i + 2))
                                        .value(i + 1)
                                        .style(sheetStyle_1);
                                    agingSubmissionSheet_1
                                        .cell("B" + (i + 2))
                                        .value(el.first_name + " " + el.last_name)
                                        .style(sheetStyle_1);
                                    agingSubmissionSheet_1
                                        .cell("C" + (i + 2))
                                        .value(el.Patient_ID)
                                        .style(sheetStyle_1);
                                    agingSubmissionSheet_1
                                        .cell("D" + (i + 2))
                                        .value((0, moment_1.default)(el.dos).format("DD-MM-YYYY"))
                                        .style(sheetStyle_1);
                                    agingSubmissionSheet_1
                                        .cell("E" + (i + 2))
                                        .value(el.provider_first_name + " " + el.provider_last_name)
                                        .style(sheetStyle_1);
                                    agingSubmissionSheet_1
                                        .cell("F" + (i + 2))
                                        .value(el.primary_insurance)
                                        .style(sheetStyle_1);
                                    agingSubmissionSheet_1
                                        .cell("G" + (i + 2))
                                        .value((0, moment_1.default)(el.date_of_submission).format("DD-MM-YYYY"))
                                        .style(sheetStyle_1);
                                    agingSubmissionSheet_1
                                        .cell("H" + (i + 2))
                                        .value(el.charge_amount)
                                        .style(sheetStyle_1);
                                    agingSubmissionSheet_1
                                        .cell("I" + (i + 2))
                                        .value(el.procedure)
                                        .style(sheetStyle_1);
                                    agingSubmissionSheet_1
                                        .cell("J" + (i + 2))
                                        .value(el.aging_submission["0-30"])
                                        .style(sheetStyle_1);
                                    agingSubmissionSheet_1
                                        .cell("K" + (i + 2))
                                        .value(el.aging_submission["31-60"])
                                        .style(sheetStyle_1);
                                    agingSubmissionSheet_1
                                        .cell("L" + (i + 2))
                                        .value(el.aging_submission["61-90"])
                                        .style(sheetStyle_1);
                                    agingSubmissionSheet_1
                                        .cell("M" + (i + 2))
                                        .value(el.aging_submission["91-120"])
                                        .style(sheetStyle_1);
                                    agingSubmissionSheet_1
                                        .cell("N" + (i + 2))
                                        .value(el.aging_submission["120-151"])
                                        .style(sheetStyle_1);
                                    agingSubmissionSheet_1
                                        .cell("O" + (i + 2))
                                        .value(el.aging_submission["151-180"])
                                        .style(sheetStyle_1);
                                    agingSubmissionSheet_1
                                        .cell("P" + (i + 2))
                                        .value(el.aging_submission["180+"])
                                        .style(sheetStyle_1);
                                });
                                agingSheet_1.freezePanes(1, 1);
                                agingDosSheet_1.freezePanes(1, 1);
                                agingSubmissionSheet_1.freezePanes(1, 1);
                            }
                            if (result[0].SummaryDataDos && result[0].SummaryDataDos.length) {
                                result[0].SummaryDataDos.forEach(function (singleRecord) {
                                    var current_date = (0, moment_1.default)();
                                    singleRecord["0-30"] = 0;
                                    singleRecord["31-60"] = 0;
                                    singleRecord["61-90"] = 0;
                                    singleRecord["91-120"] = 0;
                                    singleRecord["121-150"] = 0;
                                    singleRecord["151-180"] = 0;
                                    singleRecord["180+"] = 0;
                                    singleRecord.data.forEach(function (innerRecord) {
                                        var days_diff = current_date.diff((0, moment_1.default)(innerRecord.createdAt), "days");
                                        singleRecord["0-30"] =
                                            days_diff < 31
                                                ? singleRecord["0-30"] + innerRecord.amount
                                                : singleRecord["0-30"];
                                        singleRecord["31-60"] =
                                            days_diff > 30 && days_diff < 61
                                                ? singleRecord["31-60"] + innerRecord.amount
                                                : singleRecord["31-60"];
                                        singleRecord["61-90"] =
                                            days_diff > 61 && days_diff < 91
                                                ? singleRecord["61-90"] + innerRecord.amount
                                                : singleRecord["61-90"];
                                        singleRecord["91-120"] =
                                            days_diff > 91 && days_diff < 121
                                                ? singleRecord["91-120"] + innerRecord.amount
                                                : singleRecord["91-120"];
                                        singleRecord["121-150"] =
                                            days_diff > 121 && days_diff < 151
                                                ? singleRecord["121-150"] + innerRecord.amount
                                                : singleRecord["121-150"];
                                        singleRecord["151-180"] =
                                            days_diff > 151 && days_diff < 181
                                                ? singleRecord["151-180"] + innerRecord.amount
                                                : singleRecord["151-180"];
                                        singleRecord["180+"] =
                                            days_diff > 181
                                                ? singleRecord["180+"] + innerRecord.amount
                                                : singleRecord["180+"];
                                        delete singleRecord.data;
                                    });
                                });
                                excelDataTotal = result[0].SummaryDataDos.length
                                    ? result[0].SummaryDataDos
                                    : [];
                                excelDataTotal.forEach(function (el, i) {
                                    // let date = moment(el.startDateTime).format(
                                    //   "DD-MM-YYYY"
                                    // );
                                    summaryDosSheet_1
                                        .cell("A" + (i + 2))
                                        .value(i + 1)
                                        .style(sheetStyle_1);
                                    summaryDosSheet_1
                                        .cell("B" + (i + 2))
                                        .value(el.insurance_company_name)
                                        .style(sheetStyle_1);
                                    summaryDosSheet_1
                                        .cell("C" + (i + 2))
                                        .value(el["0-30"])
                                        .style(sheetStyle_1);
                                    summaryDosSheet_1
                                        .cell("D" + (i + 2))
                                        .value(el["31-60"])
                                        .style(sheetStyle_1);
                                    summaryDosSheet_1
                                        .cell("E" + (i + 2))
                                        .value(el["61-90"])
                                        .style(sheetStyle_1);
                                    summaryDosSheet_1
                                        .cell("F" + (i + 2))
                                        .value(el["91-120"])
                                        .style(sheetStyle_1);
                                    summaryDosSheet_1
                                        .cell("G" + (i + 2))
                                        .value(el["120-151"])
                                        .style(sheetStyle_1);
                                    summaryDosSheet_1
                                        .cell("H" + (i + 2))
                                        .value(el["151-180"])
                                        .style(sheetStyle_1);
                                    summaryDosSheet_1
                                        .cell("I" + (i + 2))
                                        .value(el["180+"])
                                        .style(sheetStyle_1);
                                });
                                summaryDosSheet_1.freezePanes(1, 1);
                            }
                            if (result[0].SummaryDataSubmission &&
                                result[0].SummaryDataSubmission.length) {
                                result[0].SummaryDataSubmission.forEach(function (singleRecord) {
                                    var current_date = (0, moment_1.default)();
                                    singleRecord["0-30"] = 0;
                                    singleRecord["31-60"] = 0;
                                    singleRecord["61-90"] = 0;
                                    singleRecord["91-120"] = 0;
                                    singleRecord["121-150"] = 0;
                                    singleRecord["151-180"] = 0;
                                    singleRecord["180+"] = 0;
                                    singleRecord.data.forEach(function (innerRecord) {
                                        var days_diff = current_date.diff((0, moment_1.default)(innerRecord.createdAt), "days");
                                        singleRecord["0-30"] =
                                            days_diff < 31
                                                ? singleRecord["0-30"] + innerRecord.amount
                                                : singleRecord["0-30"];
                                        singleRecord["31-60"] =
                                            days_diff > 30 && days_diff < 61
                                                ? singleRecord["31-60"] + innerRecord.amount
                                                : singleRecord["31-60"];
                                        singleRecord["61-90"] =
                                            days_diff > 61 && days_diff < 91
                                                ? singleRecord["61-90"] + innerRecord.amount
                                                : singleRecord["61-90"];
                                        singleRecord["91-120"] =
                                            days_diff > 91 && days_diff < 121
                                                ? singleRecord["91-120"] + innerRecord.amount
                                                : singleRecord["91-120"];
                                        singleRecord["121-150"] =
                                            days_diff > 121 && days_diff < 151
                                                ? singleRecord["121-150"] + innerRecord.amount
                                                : singleRecord["121-150"];
                                        singleRecord["151-180"] =
                                            days_diff > 151 && days_diff < 181
                                                ? singleRecord["151-180"] + innerRecord.amount
                                                : singleRecord["151-180"];
                                        singleRecord["180+"] =
                                            days_diff > 181
                                                ? singleRecord["180+"] + innerRecord.amount
                                                : singleRecord["180+"];
                                        delete singleRecord.data;
                                    });
                                });
                                excelDataTotal = result[0].SummaryDataSubmission.length
                                    ? result[0].SummaryDataSubmission
                                    : [];
                                excelDataTotal.forEach(function (el, i) {
                                    // let date = moment(el.startDateTime).format(
                                    //   "DD-MM-YYYY"
                                    // );
                                    summarySubmissionSheet_1
                                        .cell("A" + (i + 2))
                                        .value(i + 1)
                                        .style(sheetStyle_1);
                                    summarySubmissionSheet_1
                                        .cell("B" + (i + 2))
                                        .value(el.insurance_company_name)
                                        .style(sheetStyle_1);
                                    summarySubmissionSheet_1
                                        .cell("C" + (i + 2))
                                        .value(el["0-30"])
                                        .style(sheetStyle_1);
                                    summarySubmissionSheet_1
                                        .cell("D" + (i + 2))
                                        .value(el["31-60"])
                                        .style(sheetStyle_1);
                                    summarySubmissionSheet_1
                                        .cell("E" + (i + 2))
                                        .value(el["61-90"])
                                        .style(sheetStyle_1);
                                    summarySubmissionSheet_1
                                        .cell("F" + (i + 2))
                                        .value(el["91-120"])
                                        .style(sheetStyle_1);
                                    summarySubmissionSheet_1
                                        .cell("G" + (i + 2))
                                        .value(el["120-151"])
                                        .style(sheetStyle_1);
                                    summarySubmissionSheet_1
                                        .cell("H" + (i + 2))
                                        .value(el["151-180"])
                                        .style(sheetStyle_1);
                                    summarySubmissionSheet_1
                                        .cell("I" + (i + 2))
                                        .value(el["180+"])
                                        .style(sheetStyle_1);
                                });
                                summarySubmissionSheet_1.freezePanes(1, 1);
                            }
                        }
                        return [4 /*yield*/, workbook.outputAsync()];
                    case 3:
                        excelData = _a.sent();
                        return [4 /*yield*/, fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../../../../public/upload/reports/Aging_Report.xlsx"), excelData)];
                    case 4:
                        _a.sent();
                        link = "http://".concat(req.hostname, ":").concat(process.env.PORT, "/upload/reports/Aging_Report.xlsx");
                        excelFileName = "Aging_Report.xlsx";
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
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        ///
    }
    return AgingReportServices;
}());
exports.default = new AgingReportServices();
