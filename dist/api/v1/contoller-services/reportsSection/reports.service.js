"use strict";
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
var fs_1 = __importDefault(require("fs"));
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var moment_1 = __importDefault(require("moment"));
var mongoose_1 = __importDefault(require("mongoose"));
var path_1 = __importDefault(require("path"));
var xlsx_populate_1 = __importDefault(require("xlsx-populate"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var billing_payment_model_1 = __importStar(require("../../models/billing_payment.model"));
var billing_post_payment_model_1 = __importDefault(require("../../models/billing_post_payment.model"));
var super_bill_model_1 = __importDefault(require("../../models/super_bill.model"));
var EnumRoles;
(function (EnumRoles) {
    EnumRoles["SUPERADMIN"] = "superadmin";
})(EnumRoles = exports.EnumRoles || (exports.EnumRoles = {}));
var ReportServices = /** @class */ (function () {
    function ReportServices() {
        var _this = this;
        this.exportChargeLogReportExcel = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var workbook, chargeLogSheet_1, chargeLogSheetHeader, count, page, skip, condition, data, excelData1, sheetStyle_1, excelData, link, excelFileName, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, xlsx_populate_1.default.fromBlankAsync()];
                    case 1:
                        workbook = _a.sent();
                        chargeLogSheet_1 = workbook.sheet("Sheet1");
                        chargeLogSheetHeader = [
                            "S.No.",
                            "First Name",
                            "Last Name",
                            "Patient ID",
                            "DOS",
                            "Provider",
                            "Primary Insurance",
                            "Secondary Insurance",
                            "Procedure 1",
                            "Procedure 2",
                            "Claim Status",
                            "Date of Submission",
                        ];
                        chargeLogSheetHeader.forEach(function (el, i) {
                            chargeLogSheet_1
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
                        if (!model.clinic_id) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    data: [],
                                    success: true,
                                }];
                        }
                        count = model.pageSize ? model.pageSize : 50;
                        page = model.pageNumber ? model.pageNumber : 1;
                        skip = count * (page - 1);
                        condition = {
                            clinic_id: new mongoose_1.default.Types.ObjectId(model.clinic_id.toString()),
                        };
                        return [4 /*yield*/, super_bill_model_1.default.aggregate([
                                { $match: condition },
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
                                        from: "appointment",
                                        localField: "appointment_id",
                                        foreignField: "_id",
                                        pipeline: [
                                            {
                                                $lookup: {
                                                    from: "doctor",
                                                    localField: "doctor_id",
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
                                                        { $project: { userData: 1 } },
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
                                                $project: {
                                                    startDateTime: 1,
                                                    providerData: 1,
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
                                        from: "insurance",
                                        let: {
                                            patient_id: "$patient_id",
                                            coverage: "$insurance.coverage",
                                        },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $and: [
                                                            {
                                                                $eq: [
                                                                    "$patient_id",
                                                                    "$$patient_id",
                                                                ],
                                                            },
                                                            {
                                                                $in: [
                                                                    "$coverage",
                                                                    [
                                                                        "Primary",
                                                                        "Secondary",
                                                                        "Tertiary",
                                                                    ],
                                                                ],
                                                            },
                                                        ],
                                                    },
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "insurance_companies",
                                                    localField: "insurance_company_id",
                                                    foreignField: "_id",
                                                    pipeline: [
                                                        {
                                                            $project: { companyName: 1 },
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
                                                    insuranceCompanyData: 1,
                                                },
                                            },
                                        ],
                                        as: "insuranceData",
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
                                                },
                                            },
                                        ],
                                        as: "cptData",
                                    },
                                },
                                // {
                                //   $unwind: {
                                //     path: "$cptData",
                                //     preserveNullAndEmptyArrays: true,
                                //   },
                                // },
                                {
                                    $facet: {
                                        totalCount: [{ $count: "sum" }],
                                        aggregatedData: [
                                            {
                                                $project: {
                                                    _id: 1,
                                                    Patient_ID: "$patientData.patientId",
                                                    patient_first_name: "$patientData.first_name",
                                                    patient_last_name: "$patientData.last_name",
                                                    dos: "$appointmentData.startDateTime",
                                                    provider_first_name: "$appointmentData.providerData.userData.first_name",
                                                    provider_last_name: "$appointmentData.providerData.userData.last_name",
                                                    procedure_1: "$cptData",
                                                    procedure_2: "$cptData",
                                                    claim_status: "$ClaimStatusObject.claimStatus",
                                                    date_of_submission: "$ClaimStatusObject.submitDate",
                                                    primaryInsurance: "$insuranceData",
                                                    secondaryInsurance: "$insuranceData",
                                                },
                                            },
                                            { $limit: skip + count },
                                            { $skip: skip },
                                        ],
                                    },
                                },
                            ])];
                    case 2:
                        data = _a.sent();
                        if (!(data && data[0].aggregatedData.length > 0)) return [3 /*break*/, 5];
                        data[0].aggregatedData.forEach(function (obj) {
                            obj.patient_first_name = common_methods_1.default.getDecryptText(obj.patient_first_name);
                            obj.patient_last_name = common_methods_1.default.getDecryptText(obj.patient_last_name);
                            obj.procedure_1 =
                                obj.procedure_1.length > 0
                                    ? obj.procedure_1[0].cptCode
                                    : "";
                            obj.procedure_2 =
                                obj.procedure_1.length >= 2
                                    ? obj.procedure_1[1].cptCode
                                    : "";
                            obj.primaryInsurance =
                                obj.primaryInsurance &&
                                    obj.primaryInsurance.length > 0
                                    ? obj.primaryInsurance[0].insuranceCompanyData
                                        .companyName
                                    : "";
                            obj.secondaryInsurance =
                                obj.secondaryInsurance &&
                                    obj.secondaryInsurance.length >= 2
                                    ? obj.secondaryInsurance[1]
                                        .insuranceCompanyData.companyName
                                    : "";
                        });
                        excelData1 = data[0].aggregatedData;
                        sheetStyle_1 = {
                            border: true,
                            fontFamily: "Calibri",
                        };
                        excelData1.forEach(function (el, i) {
                            console.log(el);
                            // let date = moment(el.startDateTime).format(
                            //   "DD-MM-YYYY"
                            // );
                            chargeLogSheet_1
                                .cell("A" + (i + 2))
                                .value(i + 1)
                                .style(sheetStyle_1);
                            chargeLogSheet_1
                                .cell("B" + (i + 2))
                                .value(el.patient_first_name)
                                .style(sheetStyle_1);
                            chargeLogSheet_1
                                .cell("C" + (i + 2))
                                .value(el.patient_last_name)
                                .style(sheetStyle_1);
                            chargeLogSheet_1
                                .cell("D" + (i + 2))
                                .value(el.Patient_ID)
                                .style(sheetStyle_1);
                            chargeLogSheet_1
                                .cell("E" + (i + 2))
                                .value((0, moment_1.default)(el.dos).format("DD-MM-YYYY"))
                                .style(sheetStyle_1);
                            chargeLogSheet_1
                                .cell("F" + (i + 2))
                                .value(el.provider_first_name +
                                "" +
                                el.provider_last_name)
                                .style(sheetStyle_1);
                            chargeLogSheet_1;
                            chargeLogSheet_1
                                .cell("G" + (i + 2))
                                .value(el.primaryInsurance)
                                .style(sheetStyle_1);
                            chargeLogSheet_1
                                .cell("H" + (i + 2))
                                .value(el.secondaryInsurance)
                                .style(sheetStyle_1);
                            chargeLogSheet_1
                                .cell("I" + (i + 2))
                                .value(el.procedure_1)
                                .style(sheetStyle_1);
                            chargeLogSheet_1
                                .cell("J" + (i + 2))
                                .value(el.procedure_2)
                                .style(sheetStyle_1);
                            chargeLogSheet_1
                                .cell("K" + (i + 2))
                                .value(el.claim_status)
                                .style(sheetStyle_1);
                            chargeLogSheet_1
                                .cell("L" + (i + 2))
                                .value((0, moment_1.default)(el.date_of_submission).format("DD-MM-YYYY"))
                                .style(sheetStyle_1);
                        });
                        chargeLogSheet_1.freezePanes(1, 1);
                        return [4 /*yield*/, workbook.outputAsync()];
                    case 3:
                        excelData = _a.sent();
                        return [4 /*yield*/, fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../../../../public/upload/reports/ChargeLog_Report.xlsx"), excelData)];
                    case 4:
                        _a.sent();
                        link = "http://".concat(req.hostname, ":").concat(process.env.PORT, "/upload/reports/ChargeLog_Report.xlsx");
                        excelFileName = "ChargeLog_Report.xlsx";
                        response = {
                            totalDocs: data[0].totalCount[0].sum,
                            data: excelData1,
                            link: link,
                            name: excelFileName,
                        };
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                data: response,
                                success: true,
                            }];
                    case 5: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.OK,
                            data: [],
                            success: true,
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
        this.exportDailyPaymentReportExcel = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var workbook, paymentSheet_1, paymentSheetHeader, count, page, skip, condition, startTime, endTime, startTime, endTime, data, excelData1, sheetStyle_2, excelData, link, excelFileName, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, xlsx_populate_1.default.fromBlankAsync()];
                    case 1:
                        workbook = _a.sent();
                        paymentSheet_1 = workbook.sheet("Sheet1");
                        paymentSheetHeader = [
                            "S.No.",
                            "Patient ID",
                            "Name",
                            "DOB",
                            "DOS",
                            "Provider",
                            "Self-Pay/Copay",
                            "Patient Due",
                            "Amount paid",
                            "Card Processed",
                            "Last 4 digits of Card",
                            "Payment Date",
                            "Payment Post Date",
                            "PAYMENT SENT ON",
                            "BALANCE",
                            "Payment Applied/Not Applied",
                        ];
                        paymentSheetHeader.forEach(function (el, i) {
                            paymentSheet_1
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
                        if (!model.clinic_id) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    data: [],
                                    success: true,
                                }];
                        }
                        count = model.pageSize ? model.pageSize : 50;
                        page = model.pageNumber ? model.pageNumber : 1;
                        skip = count * (page - 1);
                        condition = {
                            clinic_id: new mongoose_1.default.Types.ObjectId(model.clinic_id.toString()),
                        };
                        if (model.user_type === "INSURANCE")
                            condition = {
                                clinic_id: new mongoose_1.default.Types.ObjectId(model.clinic_id.toString()),
                                insurancePaymentId: { $ne: null },
                            };
                        if (model.depositDateFrom) {
                            startTime = new Date(model.depositDateFrom);
                            startTime.setHours(0, 0, 0, 0);
                            endTime = new Date(model.depositDateFrom);
                            endTime.setHours(23, 59, 59, 999);
                            condition.createdAt = {
                                $gte: startTime,
                                //$lte: endTime,
                            };
                        }
                        if (model.depositDateTo) {
                            startTime = new Date(model.depositDateTo);
                            startTime.setHours(0, 0, 0, 0);
                            endTime = new Date(model.depositDateTo);
                            endTime.setHours(23, 59, 59, 999);
                            condition.createdAt = {
                                // $gte: startTime,
                                $lte: endTime,
                            };
                        }
                        if (model.mode)
                            condition.mode = model.mode;
                        if (model.patient_id)
                            condition.patient_id = new mongoose_1.default.Types.ObjectId(model.patient_id.toString());
                        return [4 /*yield*/, billing_payment_model_1.default.aggregate([
                                { $match: condition },
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
                                        from: "appointment",
                                        localField: "appointment_id",
                                        foreignField: "_id",
                                        pipeline: [
                                            {
                                                $lookup: {
                                                    from: "doctor",
                                                    localField: "doctor_id",
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
                                                        { $project: { userData: 1 } },
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
                                                $project: {
                                                    startDateTime: 1,
                                                    providerData: 1,
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
                                    $facet: {
                                        totalCount: [{ $count: "sum" }],
                                        aggregatedData: [
                                            {
                                                $project: {
                                                    _id: 1,
                                                    Patient_ID: "$patientData.patientId",
                                                    patient_first_name: "$patientData.first_name",
                                                    patient_last_name: "$patientData.last_name",
                                                    dob: "$patientData.date_of_birth",
                                                    dos: "$appointmentData.startDateTime",
                                                    provider_first_name: "$appointmentData.providerData.userData.first_name",
                                                    provider_last_name: "$appointmentData.providerData.userData.last_name",
                                                    Self_Pay_Copay: "Self-Pay",
                                                    patient_Due: "0",
                                                    amount_paid: "$amount",
                                                    payment_mode: "$mode",
                                                    card_process: {
                                                        $cond: [
                                                            {
                                                                $eq: [
                                                                    "$mode",
                                                                    billing_payment_model_1.EBillingModeValues.CARD,
                                                                ],
                                                            },
                                                            "YES",
                                                            "NO",
                                                        ],
                                                    },
                                                    card_last_digit: {
                                                        $cond: [
                                                            { $eq: ["$card_process", "YES"] },
                                                            "1234",
                                                            " ",
                                                        ],
                                                    },
                                                    payment_date: "$createdAt",
                                                    payment_sent_date: "$createdAt",
                                                    balance: "00",
                                                    Payment_Applied_Not_Applied: "NO",
                                                },
                                            },
                                            { $limit: skip + count },
                                            { $skip: skip },
                                        ],
                                    },
                                },
                            ])];
                    case 2:
                        data = _a.sent();
                        if (!(data && data[0].aggregatedData.length > 0)) return [3 /*break*/, 5];
                        data[0].aggregatedData.forEach(function (obj) {
                            obj.patient_first_name = common_methods_1.default.getDecryptText(obj.patient_first_name);
                            obj.patient_last_name = common_methods_1.default.getDecryptText(obj.patient_last_name);
                        });
                        excelData1 = data[0].aggregatedData;
                        sheetStyle_2 = {
                            border: true,
                            fontFamily: "Calibri",
                        };
                        excelData1.forEach(function (el, i) {
                            // console.log(el);
                            // let date = moment(el.startDateTime).format(
                            //   "DD-MM-YYYY"
                            // );
                            paymentSheet_1
                                .cell("A" + (i + 2))
                                .value(i + 1)
                                .style(sheetStyle_2);
                            paymentSheet_1
                                .cell("B" + (i + 2))
                                .value(el.Patient_ID)
                                .style(sheetStyle_2);
                            paymentSheet_1
                                .cell("C" + (i + 2))
                                .value(el.patient_last_name +
                                "," +
                                el.patient_first_name)
                                .style(sheetStyle_2);
                            paymentSheet_1
                                .cell("D" + (i + 2))
                                .value((0, moment_1.default)(el.dob).format("DD-MM-YYYY"))
                                .style(sheetStyle_2);
                            paymentSheet_1
                                .cell("E" + (i + 2))
                                .value((0, moment_1.default)(el.dos).format("DD-MM-YYYY"))
                                .style(sheetStyle_2);
                            paymentSheet_1;
                            paymentSheet_1
                                .cell("F" + (i + 2))
                                .value(el.provider_first_name +
                                "" +
                                el.provider_last_name)
                                .style(sheetStyle_2);
                            paymentSheet_1
                                .cell("G" + (i + 2))
                                .value(el.Self_Pay_Copay)
                                .style(sheetStyle_2);
                            paymentSheet_1
                                .cell("H" + (i + 2))
                                .value(el.patient_Due)
                                .style(sheetStyle_2);
                            paymentSheet_1
                                .cell("I" + (i + 2))
                                .value(el.amount_paid)
                                .style(sheetStyle_2);
                            paymentSheet_1
                                .cell("J" + (i + 2))
                                .value(el.card_process)
                                .style(sheetStyle_2);
                            paymentSheet_1
                                .cell("K" + (i + 2))
                                .value(el.card_last_digit)
                                .style(sheetStyle_2);
                            paymentSheet_1
                                .cell("L" + (i + 2))
                                .value((0, moment_1.default)(el.payment_date).format("DD-MM-YYYY"))
                                .style(sheetStyle_2);
                            paymentSheet_1
                                .cell("M" + (i + 2))
                                .value(el.payment_date)
                                .style(sheetStyle_2);
                            paymentSheet_1
                                .cell("N" + (i + 2))
                                .value(el.payment_date)
                                .style(sheetStyle_2);
                            paymentSheet_1
                                .cell("O" + (i + 2))
                                .value(el.balance)
                                .style(sheetStyle_2);
                            paymentSheet_1
                                .cell("P" + (i + 2))
                                .value(el.Payment_Applied_Not_Applied)
                                .style(sheetStyle_2);
                        });
                        paymentSheet_1.freezePanes(1, 1);
                        return [4 /*yield*/, workbook.outputAsync()];
                    case 3:
                        excelData = _a.sent();
                        return [4 /*yield*/, fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../../../../public/upload/reports/Payment_Daily_Report.xlsx"), excelData)];
                    case 4:
                        _a.sent();
                        link = "http://".concat(req.hostname, ":").concat(process.env.PORT, "/upload/reports/Payment_Daily_Report.xlsx");
                        excelFileName = "Payment_Daily_Report.xlsx";
                        response = {
                            totalDocs: data[0].totalCount[0].sum,
                            data: excelData1,
                            link: link,
                            name: excelFileName,
                        };
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                data: response,
                                success: true,
                            }];
                    case 5: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.OK,
                            data: [],
                            success: true,
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
        this.exportInsuranceLogReportExcel = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var workbook, insuranceLogSheet_1, insuranceLogSheetHeader, count, page, skip, condition, data, excelData1, sheetStyle_3, finalResponseArr_1, excelData, link, excelFileName, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, xlsx_populate_1.default.fromBlankAsync()];
                    case 1:
                        workbook = _a.sent();
                        insuranceLogSheet_1 = workbook.sheet("Sheet1");
                        insuranceLogSheetHeader = [
                            "S.No.",
                            "Patient ID",
                            "DOS",
                            "UNIQUE ID",
                            "First Name",
                            "Last Name",
                            "Patient Name",
                            "DOB",
                            "Provider",
                            "Primary Insurance",
                            "Secondary Insurance",
                            "Procedure 1",
                            "Procedure 2",
                            "Charge Amt",
                            "Insurance Allowed Amt",
                            "Insurance Pmt",
                            "Pat Resp",
                            "PR-1/2/3",
                            "Pat Pmt",
                            "Adjustment",
                            "INS BALANCE DUE TO DENIAL",
                            "DENIAL REASON",
                            "Payment Mode",
                            // "Payment #",
                            // "Payment Date",
                            // "Pmt Post Date",
                            // "Balance Due",
                            // "Billed to Patient",
                            // "Billed to Secondary",
                            // "PAYMENT SENT ON",
                        ];
                        insuranceLogSheetHeader === null || insuranceLogSheetHeader === void 0 ? void 0 : insuranceLogSheetHeader.forEach(function (el, i) {
                            insuranceLogSheet_1
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
                        if (!model.clinic_id) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    data: [],
                                    success: true,
                                }];
                        }
                        count = model.pageSize ? model.pageSize : 50;
                        page = model.pageNumber ? model.pageNumber : 1;
                        skip = count * (page - 1);
                        condition = {
                            clinic_id: new mongoose_1.default.Types.ObjectId(model.clinic_id.toString()),
                        };
                        return [4 /*yield*/, billing_post_payment_model_1.default.aggregate([
                                { $match: condition },
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
                                                    patientId: 1,
                                                    date_of_birth: 1,
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
                                        from: "appointment",
                                        localField: "appointment_id",
                                        foreignField: "_id",
                                        pipeline: [
                                            {
                                                $lookup: {
                                                    from: "doctor",
                                                    localField: "doctor_id",
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
                                                        { $project: { userData: 1 } },
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
                                                $project: {
                                                    startDateTime: 1,
                                                    providerData: 1,
                                                    appointment_number: 1,
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
                                        from: "insurance",
                                        let: {
                                            patient_id: "$patient_id",
                                            coverage: "$insurance.coverage",
                                        },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $and: [
                                                            {
                                                                $eq: [
                                                                    "$patient_id",
                                                                    "$$patient_id",
                                                                ],
                                                            },
                                                            {
                                                                $in: [
                                                                    "$coverage",
                                                                    [
                                                                        "Primary",
                                                                        "Secondary",
                                                                        "Tertiary",
                                                                    ],
                                                                ],
                                                            },
                                                        ],
                                                    },
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "insurance_companies",
                                                    localField: "insurance_company_id",
                                                    foreignField: "_id",
                                                    pipeline: [
                                                        {
                                                            $project: { companyName: 1 },
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
                                                    insuranceCompanyData: 1,
                                                },
                                            },
                                        ],
                                        as: "insuranceData",
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
                                                },
                                            },
                                        ],
                                        as: "cptData",
                                    },
                                },
                                // {
                                //   $unwind: {
                                //     path: "$cptData",
                                //     preserveNullAndEmptyArrays: true,
                                //   },
                                // },
                                {
                                    $lookup: {
                                        from: "super_bill",
                                        localField: "superbill_id",
                                        foreignField: "_id",
                                        pipeline: [
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
                                                            },
                                                        },
                                                    ],
                                                    as: "cptData",
                                                },
                                            },
                                            {
                                                $project: {
                                                    cptData: 1,
                                                },
                                            },
                                        ],
                                        as: "superBillData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$superBillData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $facet: {
                                        totalCount: [{ $count: "sum" }],
                                        aggregatedData: [
                                            {
                                                $project: {
                                                    _id: 1,
                                                    Patient_ID: "$patientData.patientId",
                                                    patient_first_name: "$patientData.first_name",
                                                    patient_last_name: "$patientData.last_name",
                                                    dos: "$appointmentData.startDateTime",
                                                    uniqueID: "$appointmentData.appointment_number",
                                                    provider_first_name: "$appointmentData.providerData.userData.first_name",
                                                    provider_last_name: "$appointmentData.providerData.userData.last_name",
                                                    procedure_1: "$superBillData.cptData",
                                                    procedure_2: "$superBillData.cptData",
                                                    claim_status: "$ClaimStatusObject.claimStatus",
                                                    date_of_submission: "$ClaimStatusObject.submitDate",
                                                    primaryInsurance: "$insuranceData",
                                                    secondaryInsurance: "$insuranceData",
                                                    insurance_paid: "$insurance_paid",
                                                    charge_amount: "$charge_amount",
                                                    allowed_amount: "$allowed_amount",
                                                    adjustment: "$adjustment",
                                                    //
                                                },
                                            },
                                            { $limit: skip + count },
                                            { $skip: skip },
                                        ],
                                    },
                                },
                            ])];
                    case 2:
                        data = _a.sent();
                        if (!(data && data[0].aggregatedData.length > 0)) return [3 /*break*/, 5];
                        data[0].aggregatedData.forEach(function (obj) {
                            obj.patient_first_name = common_methods_1.default.getDecryptText(obj.patient_first_name);
                            obj.patient_last_name = common_methods_1.default.getDecryptText(obj.patient_last_name);
                            obj.procedure_1 =
                                obj.procedure_1 &&
                                    obj.procedure_1.length &&
                                    obj.procedure_1[0].cptCode > 0
                                    ? obj.procedure_1[0].cptCode
                                    : "";
                            obj.procedure_2 =
                                obj.procedure_1 &&
                                    obj.procedure_1.length &&
                                    obj.procedure_1[1].cptCode >= 2
                                    ? obj.procedure_1[1].cptCode
                                    : "";
                            obj.primaryInsurance =
                                obj.primaryInsurance &&
                                    obj.primaryInsurance.length > 0
                                    ? obj.primaryInsurance[0].insuranceCompanyData
                                        .companyName
                                    : "";
                            obj.secondaryInsurance =
                                obj.secondaryInsurance &&
                                    obj.secondaryInsurance.length >= 2
                                    ? obj.secondaryInsurance[1]
                                        .insuranceCompanyData.companyName
                                    : "";
                        });
                        excelData1 = data[0].aggregatedData;
                        sheetStyle_3 = {
                            border: true,
                            fontFamily: "Calibri",
                        };
                        finalResponseArr_1 = [];
                        excelData1.forEach(function (el, i) {
                            finalResponseArr_1.push(el);
                            var patientName = "".concat(el.patient_last_name +
                                " " +
                                el.patient_first_name);
                            insuranceLogSheet_1
                                .cell("A" + (i + 2))
                                .value(i + 1)
                                .style(sheetStyle_3);
                            insuranceLogSheet_1
                                .cell("B" + (i + 2))
                                .value(el.Patient_ID)
                                .style(sheetStyle_3);
                            insuranceLogSheet_1
                                .cell("C" + (i + 2))
                                .value((0, moment_1.default)(el.dos).format("DD-MM-YYYY"))
                                .style(sheetStyle_3);
                            insuranceLogSheet_1
                                .cell("D" + (i + 2))
                                .value(el.uniqueID)
                                .style(sheetStyle_3);
                            insuranceLogSheet_1
                                .cell("E" + (i + 2))
                                .value(el.patient_first_name)
                                .style(sheetStyle_3);
                            insuranceLogSheet_1
                                .cell("F" + (i + 2))
                                .value(el.patient_last_name)
                                .style(sheetStyle_3);
                            insuranceLogSheet_1;
                            insuranceLogSheet_1
                                .cell("G" + (i + 2))
                                .value(patientName)
                                .style(sheetStyle_3);
                            insuranceLogSheet_1
                                .cell("H" + (i + 2))
                                .value((0, moment_1.default)(el.dob).format("DD-MM-YYYY"))
                                .style(sheetStyle_3);
                            insuranceLogSheet_1
                                .cell("I" + (i + 2))
                                .value(el.provider_first_name +
                                "" +
                                el.provider_last_name)
                                .style(sheetStyle_3);
                            insuranceLogSheet_1
                                .cell("J" + (i + 2))
                                .value(el.primaryInsurance)
                                .style(sheetStyle_3);
                            insuranceLogSheet_1
                                .cell("K" + (i + 2))
                                .value(el.secondaryInsurance)
                                .style(sheetStyle_3);
                            insuranceLogSheet_1
                                .cell("L" + (i + 2))
                                .value(el.procedure_1)
                                .style(sheetStyle_3);
                            insuranceLogSheet_1
                                .cell("M" + (i + 2))
                                .value(el.procedure_2)
                                .style(sheetStyle_3);
                            insuranceLogSheet_1
                                .cell("N" + (i + 2))
                                .value(el.charge_amount)
                                .style(sheetStyle_3);
                            insuranceLogSheet_1
                                .cell("O" + (i + 2))
                                .value(el.allowed_amount)
                                .style(sheetStyle_3);
                            insuranceLogSheet_1
                                .cell("P" + (i + 2))
                                .value(el.insurance_paid)
                                .style(sheetStyle_3);
                            insuranceLogSheet_1
                                .cell("Q" + (i + 2))
                                .value(el.allowed_amount - el.insurance_paid)
                                .style(sheetStyle_3);
                            insuranceLogSheet_1
                                .cell("R" + (i + 2))
                                .value(" ")
                                .style(sheetStyle_3);
                            insuranceLogSheet_1
                                .cell("S" + (i + 2))
                                .value(el.allowed_amount - el.insurance_paid)
                                .style(sheetStyle_3);
                            insuranceLogSheet_1
                                .cell("T" + (i + 2))
                                .value(el.adjustment)
                                .style(sheetStyle_3);
                            insuranceLogSheet_1
                                .cell("U" + (i + 2))
                                .value("0")
                                .style(sheetStyle_3);
                            insuranceLogSheet_1
                                .cell("V" + (i + 2))
                                .value("")
                                .style(sheetStyle_3);
                            insuranceLogSheet_1
                                .cell("W" + (i + 2))
                                .value("CHECK")
                                .style(sheetStyle_3);
                            // insuranceLogSheet
                            //   .cell("X" + (i + 2))
                            //   .value("CHECK")
                            //   .style(sheetStyle);
                        });
                        insuranceLogSheet_1.freezePanes(1, 1);
                        return [4 /*yield*/, workbook.outputAsync()];
                    case 3:
                        excelData = _a.sent();
                        return [4 /*yield*/, fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../../../../public/upload/reports/InsuranceLog_Report.xlsx"), excelData)];
                    case 4:
                        _a.sent();
                        link = "http://".concat(req.hostname, ":").concat(process.env.PORT, "/upload/reports/InsuranceLog_Report.xlsx");
                        excelFileName = "InsuranceLog_Report.xlsx";
                        response = {
                            totalDocs: data[0].totalCount[0].sum,
                            data: finalResponseArr_1,
                            link: link,
                            name: excelFileName,
                        };
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                data: response,
                                success: true,
                            }];
                    case 5: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.OK,
                            data: [],
                            success: true,
                        }];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
    }
    return ReportServices;
}());
exports.default = new ReportServices();
