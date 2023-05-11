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
exports.EnumRole = void 0;
var fs_1 = __importDefault(require("fs"));
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var mongoose_1 = __importDefault(require("mongoose"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var erros_message_1 = __importDefault(require("../../common/erros_message"));
var appointment_model_1 = __importDefault(require("../../models/appointment.model"));
var billing_payment_model_1 = __importDefault(require("../../models/billing_payment.model"));
var doctor_checkout_model_1 = __importDefault(require("../../models/doctor_checkout.model"));
var history_model_1 = __importStar(require("../../models/history.model"));
var super_bill_model_1 = __importStar(require("../../models/super_bill.model"));
var super_bill_assignment_model_1 = __importDefault(require("../../models/super_bill_assignment.model"));
var moment_1 = __importDefault(require("moment"));
var path_1 = __importDefault(require("path"));
var xlsx_populate_1 = __importDefault(require("xlsx-populate"));
var EnumRole;
(function (EnumRole) {
    EnumRole["PROVIDER"] = "provider";
})(EnumRole = exports.EnumRole || (exports.EnumRole = {}));
var SuperBillServices = /** @class */ (function () {
    function SuperBillServices() {
        var _this = this;
        this.addSuperBill = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, alreadyPresentSuperBill, insuranceCoverage, saveSuperBill, LinkObject, getSuperBill, addHistory, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        userDetails = req.user;
                        model.createdby_id = userDetails._id;
                        return [4 /*yield*/, super_bill_model_1.default.findOne({
                                appointment_id: model.appointment_id,
                            })];
                    case 1:
                        alreadyPresentSuperBill = _a.sent();
                        insuranceCoverage = "null";
                        switch (model.coverage) {
                            case "1":
                                insuranceCoverage = "Primary";
                                break;
                            case "2":
                                insuranceCoverage = "Secondary";
                                break;
                            case "3":
                                insuranceCoverage = "Tertiary";
                                break;
                        }
                        model.insurance = {
                            amount: model.total_amount,
                            coverage: insuranceCoverage,
                            status: model.total_amount == 0 ? true : false,
                        };
                        if (!alreadyPresentSuperBill) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                success: false,
                                data: {
                                    message: erros_message_1.default.ALREADY_EXIST_SUPER_BILL,
                                    error: erros_message_1.default.ON_ADD_ERROR,
                                },
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                            }];
                    case 2:
                        if (model.status == super_bill_model_1.BillStatus.NOLINKSAVE) {
                            if (model.cpt && model.cpt.length > 0) {
                                model.cpt.forEach(function (cpt) {
                                    delete cpt.icd;
                                });
                            }
                        }
                        return [4 /*yield*/, super_bill_model_1.default.create(model)];
                    case 3:
                        saveSuperBill = _a.sent();
                        LinkObject = {
                            url: null,
                            //id:null,
                            resetKey: null,
                        };
                        getSuperBill = {};
                        if (!saveSuperBill) return [3 /*break*/, 6];
                        return [4 /*yield*/, doctor_checkout_model_1.default.updateOne({ appointment_id: model.appointment_id }, { $set: { billGenerated: true } })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: model.createdby_id,
                                description: "super bill created",
                                type: history_model_1.EHistoryActivityTypeValues.SUPERBILL,
                                type_id: saveSuperBill._id,
                                data: model,
                                //data:model
                            })];
                    case 5:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: saveSuperBill,
                            }];
                    case 6: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ON_ADD_SUPER_BILL,
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
        this.updateSuperBill = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, userDetails, insuranceCoverage, updateBillResult, addHistory, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        id = model._id;
                        delete model._id;
                        userDetails = req.user;
                        if (model.status == super_bill_model_1.BillStatus.NOLINKSAVE) {
                            if (model.cpt && model.cpt.length > 0) {
                                model.cpt.forEach(function (cpt) {
                                    delete cpt.icd;
                                });
                            }
                        }
                        insuranceCoverage = null;
                        switch (model.coverage) {
                            case "1":
                                insuranceCoverage = "Primary";
                                break;
                            case "2":
                                insuranceCoverage = "Secondary";
                                break;
                            case "3":
                                insuranceCoverage = "Tertiary";
                                break;
                        }
                        // if (model.insurance_id == null) {
                        //   model.payer_id = "";
                        //   model.insurance_name = "";
                        // }
                        model.insurance = {
                            amount: model.total_amount,
                            coverage: insuranceCoverage,
                            status: model.total_amount == 0 ? true : false,
                        };
                        return [4 /*yield*/, super_bill_model_1.default.findOneAndUpdate({ _id: id }, model, {
                                new: true,
                            })];
                    case 1:
                        updateBillResult = _a.sent();
                        if (!updateBillResult) return [3 /*break*/, 3];
                        // let BillingPaymentObj: any = {};
                        // if (model.payment_mode) BillingPaymentObj.mode = model.payment_mode;
                        // if (model.payment_option)
                        //   BillingPaymentObj.method = model.payment_option;
                        // if (model.notes) BillingPaymentObj.remark = model.notes;
                        // if (model.cheque_number) BillingPaymentObj.cheque = model.cheque_number;
                        // if (model.payer_id) BillingPaymentObj.chargeId = model.payer_id;
                        // if (model.total_amount) BillingPaymentObj.amount = model.total_amount;
                        // let foundData = await BillingPaymentModel.findOneAndUpdate(
                        //   {
                        //     appointment_id: updateBillResult.appointment_id,
                        //   },
                        //   BillingPaymentObj
                        // );
                        Object.keys(model).forEach(function (key) {
                            return model[key] === undefined ? delete model[key] : {};
                        });
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "super bill updated",
                                type: history_model_1.EHistoryActivityTypeValues.SUPERBILL,
                                type_id: id,
                                data: model,
                            })];
                    case 2:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.UPDATE_SUCCESSFULL,
                            }];
                    case 3: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ON_UPDATE_SUPER_BILL,
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
        this.getSuperBill = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, getBillResult_1, dataObj_1, error_3;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        id = new mongoose_1.default.Types.ObjectId(model._id);
                        return [4 /*yield*/, super_bill_model_1.default.aggregate([
                                {
                                    $match: { _id: id },
                                },
                                {
                                    $lookup: {
                                        from: "doctor",
                                        localField: "billing_provider_id",
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
                                        as: "billingProviderData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$billingProviderData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "doctor",
                                        localField: "rendering_provider_id",
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
                                        as: "renderingProviderData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$renderingProviderData",
                                        preserveNullAndEmptyArrays: true,
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
                                        as: "referingProviderData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$referingProviderData",
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
                                                $lookup: {
                                                    from: "states",
                                                    localField: "state",
                                                    foreignField: "_id",
                                                    pipeline: [{ $project: { stateName: 1 } }],
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
                                                    localField: "country",
                                                    foreignField: "_id",
                                                    pipeline: [{ $project: { countryName: 1 } }],
                                                    as: "countryData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$countryData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $project: {
                                                    first_name: 1,
                                                    last_name: 1,
                                                    address: 1,
                                                    city: 1,
                                                    responsible_person: 1,
                                                    state: "$stateData.stateName",
                                                    country: "$countryData.countryName",
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
                                                    from: "clinic_locations",
                                                    localField: "location_id",
                                                    foreignField: "_id",
                                                    pipeline: [
                                                        {
                                                            $project: {
                                                                branchName: 1,
                                                                city: 1,
                                                                address: 1,
                                                                postal_code: 1,
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
                                                $lookup: {
                                                    from: "appointment_type",
                                                    localField: "appointmentType_id",
                                                    foreignField: "_id",
                                                    pipeline: [{ $project: { type: 1 } }],
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
                                                    visitType: 1,
                                                    appointment_number: 1,
                                                    duration: 1,
                                                    locationData: 1,
                                                    startDateTime: 1,
                                                    endDateTime: 1,
                                                    appointmentTypeData: 1,
                                                    dos: "$startDateTime",
                                                    createdAt: "$createdAt",
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
                                ///
                                // {
                                //   $lookup: {
                                //     from: "modifiers",
                                //     localField: "cpt.modifier",
                                //     foreignField: "_id",
                                //     pipeline: [
                                //       // {
                                //       //   $match: { $expr: { $in: ["$_id", "$$modifier_id"] } },
                                //       // },
                                //       {
                                //         $project: {
                                //           modifierCode: 1,
                                //           description: 1,
                                //           _id: 1,
                                //         },
                                //       },
                                //     ],
                                //     as: "modifierData",
                                //   },
                                // },
                                //{ $unwind: "$cpt.modifier" },
                                {
                                    $lookup: {
                                        from: "cpt",
                                        localField: "cpt.cpt_code_id",
                                        foreignField: "_id",
                                        let: { cpt_id: "$cpt.cpt_code_id" },
                                        pipeline: [
                                            //{ $unwind: "$cpt.modifier" },
                                            // {
                                            //   $match: { $expr: { $eq: ["$_id", "$$cpt_id"] } },
                                            // },
                                            // {
                                            //   $lookup:{
                                            //     from:"modifiers"
                                            //   }
                                            // }
                                            {
                                                $project: {
                                                    cptCode: 1,
                                                    description: 1,
                                                    price: 1,
                                                    _id: 1,
                                                    //modifiers: "$$modifiers",
                                                    //modifierData: "$modifierData",
                                                    // modifierData: {
                                                    //   $cond: [{ $isArray: "$modifierData" }, "$modifierData", []],
                                                    // },
                                                },
                                            },
                                        ],
                                        as: "cptData",
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "icts",
                                        localField: "icd",
                                        foreignField: "_id",
                                        pipeline: [
                                            {
                                                $project: {
                                                    ictCode: 1,
                                                    description: 1,
                                                    codeCategory: 1,
                                                    _id: 1,
                                                },
                                            },
                                        ],
                                        as: "icdData",
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "insurance",
                                        localField: "patient_id",
                                        foreignField: "patient_id",
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
                                                $project: {
                                                    copay: 1,
                                                    coverage: 1,
                                                    insurance_name: "$insuranceCompanyData.companyName",
                                                    payer_id: 1,
                                                },
                                            },
                                        ],
                                        as: "insuranceData",
                                    },
                                },
                            ])];
                    case 1:
                        getBillResult_1 = _b.sent();
                        // delete getBillResult[0].cpt;
                        // delete getBillResult[0].icd;
                        if (getBillResult_1 && getBillResult_1.length > 0) {
                            dataObj_1 = {};
                            dataObj_1.insuranceDetails = [];
                            if (getBillResult_1[0].insuranceData.length) {
                                getBillResult_1[0].insuranceData.forEach(function (singleRecord) {
                                    dataObj_1.insuranceDetails.push({
                                        _id: singleRecord._id,
                                        coverage: singleRecord.coverage,
                                        payer_id: singleRecord.payer_id,
                                        insurance_name: singleRecord.insurance_name,
                                        coPayDetails: singleRecord.copay
                                            ? {
                                                amount: singleRecord.copay.amount,
                                                type: "FULL",
                                            }
                                            : null,
                                    });
                                });
                            }
                            dataObj_1._id = getBillResult_1[0]._id;
                            dataObj_1.insurance_id = getBillResult_1[0].insurance_id;
                            dataObj_1.insurance_name = getBillResult_1[0].insurance_name;
                            dataObj_1.appointment_number = getBillResult_1[0].appointmentData
                                ? getBillResult_1[0].appointmentData.appointment_number
                                : null;
                            dataObj_1.patientData = getBillResult_1[0].patientData
                                ? getBillResult_1[0].patientData
                                : null;
                            if (dataObj_1.patientData) {
                                dataObj_1.patientData.first_name = dataObj_1.patientData.first_name
                                    ? common_methods_1.default.getDecryptText(dataObj_1.patientData.first_name)
                                    : " ";
                                dataObj_1.patientData.last_name = dataObj_1.patientData.last_name
                                    ? common_methods_1.default.getDecryptText(dataObj_1.patientData.last_name)
                                    : " ";
                            }
                            dataObj_1.locationData = getBillResult_1[0].appointmentData
                                ? getBillResult_1[0].appointmentData.locationData
                                : null;
                            dataObj_1.appointmentTypeData = getBillResult_1[0].patientData
                                ? getBillResult_1[0].patientData.appointmentTypeData
                                : null;
                            dataObj_1.place_of_service = getBillResult_1[0].place_of_service;
                            dataObj_1.type_of_service = getBillResult_1[0].type_of_service;
                            dataObj_1.endDateTime = getBillResult_1[0].toDate;
                            dataObj_1.startDateTime = getBillResult_1[0].fromDate;
                            dataObj_1.doctorData = getBillResult_1[0].referingProviderData
                                ? getBillResult_1[0].referingProviderData
                                : null;
                            dataObj_1.billingDoctorData = getBillResult_1[0].billingProviderData
                                ? getBillResult_1[0].billingProviderData
                                : null;
                            dataObj_1.renderingDoctorData = getBillResult_1[0].renderingProviderData
                                ? getBillResult_1[0].renderingProviderData
                                : null;
                            dataObj_1.responsible_party = getBillResult_1[0].responsible_party;
                            dataObj_1.accept_assignment = getBillResult_1[0].accept_assignment;
                            dataObj_1.cheque_number = getBillResult_1[0].cheque_number;
                            dataObj_1.notes = getBillResult_1[0].notes;
                            dataObj_1.email = getBillResult_1[0].email;
                            dataObj_1.payment_mode = getBillResult_1[0].payment_mode;
                            dataObj_1.payment_option = getBillResult_1[0].payment_option;
                            dataObj_1.total_amount = getBillResult_1[0].total_amount;
                            dataObj_1.payer_id = getBillResult_1[0].payer_id;
                            dataObj_1.status = getBillResult_1[0].status;
                            dataObj_1.duration = getBillResult_1[0].duration;
                            dataObj_1.copay = getBillResult_1[0].copay ? getBillResult_1[0].copay : 0;
                            dataObj_1.payer_id = getBillResult_1[0].payer_id
                                ? getBillResult_1[0].payer_id
                                : null;
                            dataObj_1.financial_class_id =
                                (_a = getBillResult_1[0].financial_class_id) !== null && _a !== void 0 ? _a : null;
                            // dataObj.icd = getBillResult[0].icd;
                            // dataObj.cpt = getBillResult[0].cpt;
                            dataObj_1.icdData = getBillResult_1[0].icdData;
                            //dataObj.modifierData = getBillResult[0].modifierData;
                            dataObj_1.clinic_id = getBillResult_1[0].clinic_id;
                            dataObj_1.appointment_id = getBillResult_1[0].appointment_id;
                            // dataObj.codeDetails = getBillResult[0].appointmentData
                            //   ? getBillResult[0].appointmentData.duration
                            //   : null;
                            if (getBillResult_1[0].cptData && getBillResult_1[0].cptData.length) {
                                if (getBillResult_1[0].cpt && getBillResult_1[0].cpt.length) {
                                    getBillResult_1[0].cpt.forEach(function (e, i) {
                                        // if(e.cpt_code_id!.toString()==)
                                        var found_cpt = getBillResult_1[0].cptData.filter(function (el) {
                                            return el._id.toString() == e.cpt_code_id.toString();
                                        });
                                        if (found_cpt) {
                                            getBillResult_1[0].cpt[i].price = found_cpt[0].price;
                                            getBillResult_1[0].cpt[i].description = found_cpt[0].description;
                                            getBillResult_1[0].cpt[i].cptCode = found_cpt[0].cptCode;
                                            getBillResult_1[0].cpt[i]._id = found_cpt[0]._id.toString();
                                        }
                                    });
                                }
                            }
                            dataObj_1.cptData = getBillResult_1[0].cpt;
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: dataObj_1,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_ON_GET_SUPER_BILL,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _b.sent();
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteSuperBill = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var deleteBillResult, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, super_bill_model_1.default.updateOne({ _id: model._id }, { isDeleted: true })];
                    case 1:
                        deleteBillResult = _a.sent();
                        if (deleteBillResult && deleteBillResult.modifiedCount > 0) {
                            // let addHistory = await HistoryModel.create({
                            //   user_id: model._id,
                            //   description: `super bill deleted`,
                            //   type: EHistoryActivityTypeValues.USER,
                            //   type_id: userDetails._id,
                            // });
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
                                        message: erros_message_1.default.ERROR_ON_DELETE_SUPER_BILL,
                                        error: erros_message_1.default.ON_DELETE_ERROR,
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
        this.listSuperBill = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var defaultPage, count, condition, appointmentCondition, insuranceCondition, startTime, endTime, startTime, endTime, result, formattedData_1, obj, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        defaultPage = void 0;
                        count = void 0;
                        defaultPage = model.pageNumber ? model.pageNumber : 1;
                        count = model.pageSize ? model.pageSize : 50;
                        condition = {};
                        appointmentCondition = {};
                        insuranceCondition = {};
                        if (model.insurance_type) {
                            insuranceCondition.insurance_type = model.insurance_type;
                        }
                        if (model.insurance_coverage && model.insurance_coverage != "") {
                            insuranceCondition.coverage = model.insurance_coverage;
                        }
                        if (model.insurance_plan_type && model.insurance_plan_type != "") {
                            insuranceCondition.insurance_plan_type = model.insurance_plan_type;
                        }
                        if (model.cpt) {
                            // if ("isDeleted" in model && model.isDeleted)
                            //   condition.isDeleted = model.isDeleted;
                            // if (model.search) {
                            //   let isEmptyNameOnlySpace = /^\s*$/.test(model.search);
                            //   condition.first_name = {
                            //     $regex: model.search,
                            //     $options: "i",
                            //   };
                            // }
                            // if (model.isActive) {
                            //   condition.isActive = model.isActive;
                            // }
                            condition.cpt = {
                                $elemMatch: {
                                    cpt_code_id: {
                                        $eq: new mongoose_1.default.Types.ObjectId(model.cpt.toString()),
                                    },
                                },
                            };
                        }
                        if (model.icd)
                            condition.icd = new mongoose_1.default.Types.ObjectId(model.icd.toString());
                        if (model.billing_provider_id)
                            condition.billing_provider_id = new mongoose_1.default.Types.ObjectId(model.billing_provider_id.toString());
                        if (model.rendering_provider_id)
                            condition.rendering_provider_id = new mongoose_1.default.Types.ObjectId(model.rendering_provider_id.toString());
                        if (model.referring_provider_id)
                            condition.referring_provider_id = new mongoose_1.default.Types.ObjectId(model.referring_provider_id.toString());
                        if (model.patient_id)
                            condition.patient_id = new mongoose_1.default.Types.ObjectId(model.patient_id.toString());
                        if (model.clinic_id)
                            condition.clinic_id = new mongoose_1.default.Types.ObjectId(model.clinic_id.toString());
                        // if (model.insurance_plan_type)
                        //   insuranceCondition.insurance_plan_type = model.insurance_plan_type;
                        if (model.visitType) {
                            appointmentCondition.visitType = model.visitType;
                        }
                        if (model.location_id) {
                            appointmentCondition.location_id = new mongoose_1.default.Types.ObjectId(model.location_id.toString());
                        }
                        if (model.case_type)
                            appointmentCondition.appointmentType_id = new mongoose_1.default.Types.ObjectId(model.case_type.toString());
                        if (model.startDateTime) {
                            startTime = new Date(model.startDateTime);
                            startTime.setHours(0, 0, 0, 0);
                            appointmentCondition.startDateTime = {
                                $gte: startTime,
                            };
                        }
                        if (model.endDateTime) {
                            endTime = new Date(model.endDateTime);
                            endTime.setHours(23, 59, 59, 999);
                            if ("endDateTime" in appointmentCondition)
                                appointmentCondition.endDateTime.$lte = endTime;
                            else
                                appointmentCondition.endDateTime = {
                                    $lte: endTime,
                                };
                        }
                        if (model.charge_startDateTime) {
                            startTime = new Date(model.charge_startDateTime);
                            startTime.setHours(0, 0, 0, 0);
                            condition.createdAt = {
                                $gte: startTime,
                            };
                        }
                        if (model.charge_endDateTime) {
                            endTime = new Date(model.charge_endDateTime);
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
                                    $sort: { createdAt: -1 },
                                },
                                {
                                    $lookup: {
                                        from: "patients",
                                        localField: "patient_id",
                                        foreignField: "_id",
                                        pipeline: [
                                            // {
                                            //   $lookup: {
                                            //     from: "states",
                                            //     localField: "state",
                                            //     foreignField: "_id",
                                            //     pipeline: [{ $project: { stateName: 1 } }],
                                            //     as: "stateData",
                                            //   },
                                            // },
                                            // {
                                            //   $unwind: {
                                            //     path: "$stateData",
                                            //     preserveNullAndEmptyArrays: true,
                                            //   },
                                            // },
                                            // {
                                            //   $lookup: {
                                            //     from: "countries",
                                            //     localField: "country",
                                            //     foreignField: "_id",
                                            //     pipeline: [{ $project: { countryName: 1 } }],
                                            //     as: "countryData",
                                            //   },
                                            // },
                                            // {
                                            //   $unwind: {
                                            //     path: "$countryData",
                                            //     preserveNullAndEmptyArrays: true,
                                            //   },
                                            // },
                                            {
                                                $project: {
                                                    first_name: 1,
                                                    last_name: 1,
                                                    address: 1,
                                                    city: 1,
                                                    date_of_birth: 1,
                                                    patientId: 1,
                                                    // state: "$stateData.stateName",
                                                    // country: "$countryData.countryName",
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
                                        localField: "insurance_id",
                                        foreignField: "_id",
                                        pipeline: [
                                            {
                                                $match: insuranceCondition,
                                            },
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
                                                // $project: {
                                                //   insurance_plan_type: 1,
                                                //   insurance_comapny: "$insuranceCompanyData.companyName",
                                                // },
                                                $project: {
                                                    copay: 1,
                                                    coverage: 1,
                                                    insurance_name: "$insuranceCompanyData.companyName",
                                                    payer_id: 1,
                                                    insurance_type: 1,
                                                    insurance_plan_type: 1,
                                                },
                                            },
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
                                        from: "doctor",
                                        localField: "rendering_provider_id",
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
                                        as: "renderingProviderData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$renderingProviderData",
                                        preserveNullAndEmptyArrays: true,
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
                                        as: "referingProviderData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$referingProviderData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "doctor",
                                        localField: "billing_provider_id",
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
                                        as: "billingProviderData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$billingProviderData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                ///////
                                {
                                    $lookup: {
                                        from: "appointment",
                                        localField: "appointment_id",
                                        foreignField: "_id",
                                        pipeline: [
                                            { $match: appointmentCondition },
                                            {
                                                $lookup: {
                                                    from: "clinic_locations",
                                                    localField: "location_id",
                                                    foreignField: "_id",
                                                    pipeline: [
                                                        {
                                                            $project: { branchName: 1, city: 1 },
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
                                                $lookup: {
                                                    from: "appointment_type",
                                                    localField: "appointmentType_id",
                                                    foreignField: "_id",
                                                    pipeline: [{ $project: { type: 1 } }],
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
                                                    _id: 1,
                                                    visitType: 1,
                                                    appointment_number: 1,
                                                    locationData: 1,
                                                    appointmentTypeData: 1,
                                                    dos: "$startDateTime",
                                                    dos_end: "$endDateTime",
                                                    createdAt: "$createdAt",
                                                },
                                            },
                                        ],
                                        as: "appointmentData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$appointmentData",
                                        preserveNullAndEmptyArrays: false,
                                    },
                                },
                                ///
                                {
                                    $lookup: {
                                        from: "cpt",
                                        localField: "cpt.cpt_code_id",
                                        foreignField: "_id",
                                        pipeline: [
                                            {
                                                $project: {
                                                    cptCode: 1,
                                                    price: 1,
                                                    _id: 1,
                                                },
                                            },
                                        ],
                                        as: "cptData",
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "modifiers",
                                        localField: "cpt.modifier",
                                        foreignField: "_id",
                                        pipeline: [
                                            {
                                                $project: {
                                                    modifierCode: 1,
                                                    _id: 1,
                                                },
                                            },
                                        ],
                                        as: "modifierData",
                                    },
                                },
                                {
                                    $set: {
                                        cpt: {
                                            $map: {
                                                input: "$cpt",
                                                in: {
                                                    $mergeObjects: [
                                                        "$$this",
                                                        {
                                                            cptCode: {
                                                                $arrayElemAt: [
                                                                    "$cptData.cptCode",
                                                                    {
                                                                        $indexOfArray: [
                                                                            "$cptData._id",
                                                                            "$$this.cpt_code_id",
                                                                        ],
                                                                    },
                                                                ],
                                                            },
                                                            price: {
                                                                $arrayElemAt: [
                                                                    "$cptData.price",
                                                                    {
                                                                        $indexOfArray: [
                                                                            "$cptData._id",
                                                                            "$$this.cpt_code_id",
                                                                        ],
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                },
                                { $unset: "cptData" },
                                {
                                    $lookup: {
                                        from: "icts",
                                        localField: "icd",
                                        foreignField: "_id",
                                        pipeline: [
                                            {
                                                $project: {
                                                    ictCode: 1,
                                                    _id: 1,
                                                },
                                            },
                                        ],
                                        as: "icdData",
                                    },
                                },
                                // {
                                //   $unwind: {
                                //     path: "$icdData",
                                //     preserveNullAndEmptyArrays: true,
                                //   },
                                // },
                                {
                                    $facet: {
                                        count: [{ $count: "count" }],
                                        data: [
                                            {
                                                $project: {
                                                    _id: 1,
                                                    // status: 1,
                                                    // patient_id: 1,
                                                    // appointment_id: 1,
                                                    // payer_id: 1,
                                                    // responsible_party_name: 1,
                                                    // insurance_name: 1,
                                                    // provider_id: 1,
                                                    // rendering_provider_id: 1,
                                                    // fromDate: 1,
                                                    // toDate: 1,
                                                    // duration: 1,
                                                    // type_of_service: 1,
                                                    // place_of_service: 1,
                                                    //modifierData: 1,
                                                    appointment_id: 1,
                                                    insuranceData: 1,
                                                    patientData: 1,
                                                    doctorData: 1,
                                                    appointmentData: 1,
                                                    cptData: 1,
                                                    visit_report_status: "default report status",
                                                    cpt: 1,
                                                    status: 1,
                                                    icdData: 1,
                                                    marked_as_printed: 1,
                                                    billingProviderData: 1,
                                                    referingProviderData: 1,
                                                    renderingProviderData: 1,
                                                    total_amount: 1,
                                                    // financial_class_id: 1,
                                                    // total_amount: 1,
                                                    // responsible_party: 1,
                                                    // accept_assignment: 1,
                                                    // payment_option: 1,
                                                    // payment_mode: 1,
                                                    // received_cash: 1,
                                                    // cheque_number: 1,
                                                    // notes: 1,
                                                    updatedAt: 1,
                                                    // patientData: 1,
                                                },
                                            },
                                            { $skip: count * (defaultPage - 1) },
                                            { $limit: count },
                                        ],
                                    },
                                },
                            ])];
                    case 1:
                        result = _a.sent();
                        if (result &&
                            result.length > 0 &&
                            result[0].data &&
                            result[0].data.length > 0) {
                            formattedData_1 = [];
                            result[0].data.forEach(function (d) {
                                formattedData_1.push({
                                    _id: d._id,
                                    patient_name: d.patientData
                                        ? common_methods_1.default.getDecryptText(d.patientData.first_name) +
                                            " " +
                                            common_methods_1.default.getDecryptText(d.patientData.last_name)
                                        : "",
                                    visitType: d.appointmentData ? d.appointmentData.visitType : "",
                                    appointment_id: d.appointment_id,
                                    appointmentType: d.appointmentData && d.appointmentData.appointmentTypeData
                                        ? d.appointmentData.appointmentTypeData.type
                                        : "",
                                    dob: d.patientData.date_of_birth,
                                    //cpt: d.cptData ? d.cptData : [],
                                    ict: d.icdData ? d.icdData : [],
                                    cpt: d.cpt ? d.cpt : [],
                                    insuranceData: d.insuranceData ? d.insuranceData : null,
                                    // refering_provider_name: d.referingProviderData
                                    //   ? d.doctorData.first_name + " " + d.doctorData.last_name
                                    //   : "",
                                    referingProviderData: d.referingProviderData,
                                    renderingProviderData: d.renderingProviderData,
                                    billingProviderData: d.billingProviderData,
                                    dos: d.appointmentData ? d.appointmentData.dos : "",
                                    dos_end: d.appointmentData ? d.appointmentData.dos_end : "",
                                    date_of_creation: d.appointmentData
                                        ? d.appointmentData.createdAt
                                        : "",
                                    chartNo: d.patientData.patientId,
                                    visit_report_status: d.visit_report_status,
                                    status: d.status,
                                    location: d.appointmentData
                                        ? d.appointmentData.locationData
                                            ? d.appointmentData.locationData
                                            : null
                                        : null,
                                    modified_date: d.updatedAt,
                                    icd: d.icdData ? d.icdData : null,
                                    marked_as_printed: d.marked_as_printed,
                                    icd_type: "ICD-10",
                                    total_amount: d.total_amount,
                                    //modifierData: d.modifierData ? d.modifierData : [],
                                });
                            });
                            obj = {
                                data: formattedData_1,
                                // count: result.totalDocs,
                                totalDocs: result[0].count[0].count,
                                pageNumber: defaultPage,
                                pageSize: count,
                                totalPages: Math.ceil(result[0].count[0].count / count),
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
                                        message: erros_message_1.default.SUPER_BILL_LIST_NOT_FOUND,
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
        // Ankit -17-02-2023
        this.superBillAssignment = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, foundSuperBillDetails, ModelToSave, assignmentResult, updateSuperBill, addHistory, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        userDetails = req.user;
                        return [4 /*yield*/, super_bill_model_1.default.findById(model.superbillId)];
                    case 1:
                        foundSuperBillDetails = _a.sent();
                        model.createdby_id = userDetails._id;
                        ModelToSave = model;
                        return [4 /*yield*/, super_bill_assignment_model_1.default.create(ModelToSave)];
                    case 2:
                        assignmentResult = _a.sent();
                        if (!assignmentResult) return [3 /*break*/, 5];
                        return [4 /*yield*/, super_bill_model_1.default.updateOne({ _id: model.superbillId }, { assignedStatus: super_bill_model_1.EAssignedStatus.ASSIGNED })];
                    case 3:
                        updateSuperBill = _a.sent();
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: model.createdby_id,
                                description: "super bill assigned to billing team for further process",
                                type: history_model_1.EHistoryActivityTypeValues.SUPERBILL,
                                type_id: model.superbillId,
                                //type: EHistoryActivityTypeValues.USER,
                                // type_id:
                                //   foundSuperBillDetails && foundSuperBillDetails.patient_id
                                //     ? foundSuperBillDetails.patient_id
                                //     : null,
                            })];
                    case 4:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: assignmentResult,
                            }];
                    case 5: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.SUPER_BILL_ASSIGNMENT_ERROR,
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
        this.superBillAssignmentHistory = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, assignmentResult, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        return [4 /*yield*/, super_bill_assignment_model_1.default.find({
                                superbillId: new mongoose_1.default.Types.ObjectId(req.params._id),
                            }, { assignedTo: 1, discription: 1, teamId: 1 })
                                .populate([
                                {
                                    path: "assignedTo",
                                    select: { first_name: 1, last_name: 1 },
                                },
                            ])
                                .sort({ createdAt: -1 })];
                    case 1:
                        assignmentResult = _a.sent();
                        if (assignmentResult && assignmentResult.length > 0) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: assignmentResult,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.SUPER_BILL_ASSIGNMENT_HISTORY,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
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
        this.markAsPrinted = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var updateBillResult, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, super_bill_model_1.default.updateMany({ _id: { $in: model.super_bill_ids } }, { marked_as_printed: true })];
                    case 1:
                        updateBillResult = _a.sent();
                        if (updateBillResult && updateBillResult.modifiedCount > 0) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: erros_message_1.default.UPDATE_SUCCESSFULL,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_ON_UPDATE_PRINT_STATUS,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
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
        this.getDetailsForGenerateSuperBill = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, data_1, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = new mongoose_1.default.Types.ObjectId(model._id);
                        return [4 /*yield*/, appointment_model_1.default.aggregate([
                                {
                                    $match: {
                                        _id: new mongoose_1.default.Types.ObjectId(req.params._id),
                                        isDeleted: false,
                                    },
                                },
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
                                                        {
                                                            $project: {
                                                                stateName: 1,
                                                            },
                                                        },
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
                                                        {
                                                            $project: {
                                                                countryName: 1,
                                                            },
                                                        },
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
                                            {
                                                $project: {
                                                    first_name: 1,
                                                    last_name: 1,
                                                    stateName: "$stateData.stateName",
                                                    countryName: "$countryData.countryName",
                                                    responsible_person: 1,
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
                                        localField: "location_id",
                                        foreignField: "_id",
                                        pipeline: [
                                            {
                                                $project: {
                                                    branchName: 1,
                                                    city: 1,
                                                    address: 1,
                                                    postal_code: 1,
                                                    // branchName: 1, city: 1
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
                                    $lookup: {
                                        from: "appointment_type",
                                        localField: "appointmentType_id",
                                        foreignField: "_id",
                                        // pipeline: [
                                        //   {
                                        //     $project: {
                                        //       type: 1,
                                        //       // city: 1,
                                        //       // address: 1,
                                        //       // postal_code: 1,
                                        //       // // branchName: 1, city: 1
                                        //     },
                                        //   },
                                        // ],
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
                                    $lookup: {
                                        //from: "filledProgressNotes",
                                        from: "doctorcheckout",
                                        localField: "_id",
                                        //let: { appointment_id: "$_id" },
                                        foreignField: "appointment_id",
                                        pipeline: [
                                            // {
                                            //   // $match: {
                                            //   //   $expr: { $eq: ["$appointment_id", "$$appointment_id"] },
                                            //   // },
                                            // },
                                            {
                                                $lookup: {
                                                    from: "cpt",
                                                    localField: "codes.cptCode",
                                                    foreignField: "_id",
                                                    pipeline: [
                                                        {
                                                            $project: {
                                                                cptCode: 1,
                                                                description: 1,
                                                                price: 1,
                                                                _id: 1,
                                                            },
                                                        },
                                                    ],
                                                    as: "cptCodeData",
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "icts",
                                                    localField: "codes.ICD_10",
                                                    foreignField: "_id",
                                                    pipeline: [
                                                        {
                                                            $project: {
                                                                ictCode: 1,
                                                                description: 1,
                                                                codeCategory: 1,
                                                                _id: 1,
                                                            },
                                                        },
                                                    ],
                                                    as: "ictCodeData",
                                                },
                                            },
                                            {
                                                $project: {
                                                    //codes: 1,
                                                    ictCodeData: 1,
                                                    cptCodeData: 1,
                                                    placeOfService: 1,
                                                    insurance_id: 1,
                                                    insurance_name: 1,
                                                    payer_id: 1,
                                                },
                                            },
                                        ],
                                        as: "doctorCheckoutData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$doctorCheckoutData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "insurance",
                                        localField: "patient_id",
                                        foreignField: "patient_id",
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
                                                $project: {
                                                    copay: 1,
                                                    coverage: 1,
                                                    insurance_name: "$insuranceCompanyData.companyName",
                                                    payer_id: 1,
                                                },
                                            },
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
                                // {
                                //   $lookup: {
                                //     from: "doctorcheckout",
                                //     localField: "_id",
                                //     foreignField: "appointment_id",
                                //     pipeline: [
                                //       {
                                //         $project: { placeOfService: 1 },
                                //       },
                                //     ],
                                //     as: "doctorCheckoutData",
                                //   },
                                // },
                                // {
                                //   $unwind: {
                                //     path: "$doctorCheckoutData",
                                //     preserveNullAndEmptyArrays: true,
                                //   },
                                // },
                            ])];
                    case 1:
                        data_1 = _a.sent();
                        if (data_1 && data_1.length) {
                            data_1[0].patientData.first_name = common_methods_1.default.getDecryptText(data_1[0].patientData.first_name);
                            data_1[0].patientData.last_name = common_methods_1.default.getDecryptText(data_1[0].patientData.last_name);
                            data_1[0].insuranceDetails = [];
                            data_1[0].insuranceData.forEach(function (singleRecord) {
                                data_1[0].insuranceDetails.push({
                                    _id: singleRecord._id,
                                    coverage: singleRecord.coverage,
                                    payer_id: singleRecord.payer_id,
                                    insurance_name: singleRecord.insurance_name,
                                    coPayDetails: singleRecord.copay
                                        ? {
                                            amount: singleRecord.copay.amount,
                                            type: "FULL",
                                        }
                                        : null,
                                });
                            });
                            // data[0].insuranceDetails = data[0].insuranceData
                            //   ? {
                            //       _id: data[0].insuranceData._id,
                            //       payer_id: data[0].insuranceData.payer_id,
                            //       payer_id: data[0].insuranceData.payer_id,
                            //       insurance_name: data[0].insuranceData.insurance_name,
                            //       coPayDetails: data[0].insuranceData.copay
                            //         ? {
                            //             amount: data[0].insuranceData.copay.amount,
                            //             type: "FULL",
                            //           }
                            //         : null,
                            //     }
                            //   : null;
                            data_1[0].insurance_id = data_1[0].doctorCheckoutData
                                ? data_1[0].doctorCheckoutData.insurance_id
                                : null;
                            data_1[0].insurance_name = data_1[0].doctorCheckoutData
                                ? data_1[0].doctorCheckoutData.insurance_name
                                : null;
                            data_1[0].payer_id = data_1[0].doctorCheckoutData
                                ? data_1[0].doctorCheckoutData.payer_id
                                : null;
                            data_1[0].place_of_service = data_1[0].doctorCheckoutData
                                ? data_1[0].doctorCheckoutData.placeOfService
                                : null;
                            data_1[0].codeDetails = {
                                cptCode: data_1[0].doctorCheckoutData
                                    ? data_1[0].doctorCheckoutData.cptCodeData
                                    : [],
                                ICD_10: data_1[0].doctorCheckoutData
                                    ? data_1[0].doctorCheckoutData.ictCodeData
                                    : [],
                            };
                            // data[0].appointmentType_id = data[0].appointmentTypeData;
                            // data[0].location_id = data[0].locationData;
                            // data[0].location_id = data[0].locationData;
                            delete data_1[0].insuranceData;
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: data_1[0],
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_ON_GET_SUPER_BILL,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _a.sent();
                        next(error_9);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getSuperBillDataToExcel = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var workbook, superbillSheet_1, superbillSheetHeader, defaultPage, count, condition, result, formattedData_2, superBillData, sheetStyle_1, data, link, excelFileName, response, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, xlsx_populate_1.default.fromBlankAsync()];
                    case 1:
                        workbook = _a.sent();
                        superbillSheet_1 = workbook.sheet("Sheet1");
                        superbillSheetHeader = [
                            "Location",
                            "Billing Provider",
                            "Rendering Provider",
                            "Reffering Provider",
                            "Chart No.",
                            "PatientDOB",
                            "Patient",
                            "Insurance Plan",
                            "Insurance Company",
                            "Case Type",
                            "Case Name",
                            "CreationDate",
                            "DOS(FROM)",
                            "DOS(To)",
                            "CPT Code",
                            "ICD Code",
                            "Provider",
                            "Modifier",
                            "POS(unit)",
                            "Unit Charge",
                            "Total Charges",
                            "ICD Type",
                            "Status",
                        ];
                        superbillSheetHeader.forEach(function (el, i) {
                            superbillSheet_1
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
                        defaultPage = model.pageNumber ? model.pageNumber : 1;
                        count = model.pageSize ? model.pageSize : 50;
                        condition = {};
                        // if ("isDeleted" in model && model.isDeleted)
                        //   condition.isDeleted = model.isDeleted;
                        // if (model.search) {
                        //   let isEmptyNameOnlySpace = /^\s*$/.test(model.search);
                        //   condition.first_name = {
                        //     $regex: model.search,
                        //     $options: "i",
                        //   };
                        // }
                        if (model.isActive) {
                            condition.isActive = model.isActive;
                        }
                        return [4 /*yield*/, super_bill_model_1.default.aggregate([
                                {
                                    $lookup: {
                                        from: "patients",
                                        localField: "patient_id",
                                        foreignField: "_id",
                                        pipeline: [
                                            // {
                                            //   $lookup: {
                                            //     from: "states",
                                            //     localField: "state",
                                            //     foreignField: "_id",
                                            //     pipeline: [{ $project: { stateName: 1 } }],
                                            //     as: "stateData",
                                            //   },
                                            // },
                                            // {
                                            //   $unwind: {
                                            //     path: "$stateData",
                                            //     preserveNullAndEmptyArrays: true,
                                            //   },
                                            // },
                                            // {
                                            //   $lookup: {
                                            //     from: "countries",
                                            //     localField: "country",
                                            //     foreignField: "_id",
                                            //     pipeline: [{ $project: { countryName: 1 } }],
                                            //     as: "countryData",
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
                                                    first_name: 1,
                                                    patientId: 1,
                                                    last_name: 1,
                                                    address: 1,
                                                    city: 1,
                                                    date_of_birth: 1,
                                                    // state: "$stateData.stateName",
                                                    // country: "$countryData.countryName",
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
                                        from: "doctor",
                                        localField: "rendering_provider_id",
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
                                        as: "renderingProviderData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$renderingProviderData",
                                        preserveNullAndEmptyArrays: true,
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
                                        as: "referingProviderData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$referingProviderData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "doctor",
                                        localField: "billing_provider_id",
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
                                        as: "billingProviderData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$billingProviderData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                ///////
                                {
                                    $lookup: {
                                        from: "appointment",
                                        localField: "appointment_id",
                                        foreignField: "_id",
                                        pipeline: [
                                            {
                                                $lookup: {
                                                    from: "clinic_locations",
                                                    localField: "location_id",
                                                    foreignField: "_id",
                                                    pipeline: [
                                                        {
                                                            $project: { branchName: 1, city: 1 },
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
                                                $lookup: {
                                                    from: "appointment_type",
                                                    localField: "appointmentType_id",
                                                    foreignField: "_id",
                                                    pipeline: [{ $project: { type: 1 } }],
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
                                                    visitType: 1,
                                                    appointment_number: 1,
                                                    locationData: 1,
                                                    appointmentTypeData: 1,
                                                    dos: "$startDateTime",
                                                    endDate: "$endDateTime",
                                                    createdAt: "$createdAt",
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
                                ///
                                {
                                    $lookup: {
                                        from: "cpt",
                                        localField: "cpt.cpt_code_id",
                                        foreignField: "_id",
                                        pipeline: [
                                            {
                                                $project: {
                                                    cptCode: 1,
                                                    _id: 1,
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
                                        from: "icts",
                                        localField: "icd",
                                        foreignField: "_id",
                                        pipeline: [
                                            {
                                                $project: {
                                                    ictCode: 1,
                                                    _id: 1,
                                                },
                                            },
                                        ],
                                        as: "icdData",
                                    },
                                },
                                // {
                                //   $unwind: {
                                //     path: "$icdData",
                                //     preserveNullAndEmptyArrays: true,
                                //   },
                                // },
                                {
                                    $facet: {
                                        count: [{ $count: "count" }],
                                        data: [
                                            {
                                                $project: {
                                                    _id: 1,
                                                    // status: 1,
                                                    // patient_id: 1,
                                                    // appointment_id: 1,
                                                    // payer_id: 1,
                                                    // responsible_party_name: 1,
                                                    // insurance_name: 1,
                                                    // provider_id: 1,
                                                    // rendering_provider_id: 1,
                                                    // fromDate: 1,
                                                    // toDate: 1,
                                                    // duration: 1,
                                                    // type_of_service: 1,
                                                    // place_of_service: 1,
                                                    patientData: 1,
                                                    doctorData: 1,
                                                    appointmentData: 1,
                                                    cptData: 1,
                                                    visit_report_status: "default report status",
                                                    status: 1,
                                                    icdData: 1,
                                                    marked_as_printed: 1,
                                                    billingProviderData: 1,
                                                    referingProviderData: 1,
                                                    renderingProviderData: 1,
                                                    // financial_class_id: 1,
                                                    total_amount: 1,
                                                    // responsible_party: 1,
                                                    // accept_assignment: 1,
                                                    // payment_option: 1,
                                                    // payment_mode: 1,
                                                    // received_cash: 1,
                                                    // cheque_number: 1,
                                                    // notes: 1,
                                                    updatedAt: 1,
                                                    createdAt: 1,
                                                    // patientData: 1,
                                                    locationData: "$appointmentData.locationData",
                                                },
                                            },
                                            { $skip: count * (defaultPage - 1) },
                                            { $limit: count },
                                            {
                                                $sort: { updatedAt: -1 },
                                            },
                                        ],
                                    },
                                },
                            ])];
                    case 2:
                        result = _a.sent();
                        if (!(result &&
                            result.length > 0 &&
                            result[0].data &&
                            result[0].data.length > 0)) return [3 /*break*/, 5];
                        formattedData_2 = [];
                        result[0].data.forEach(function (d) {
                            var cptDataDetails;
                            d.cptData.map(function (e) {
                                cptDataDetails += e.cptCode + ",";
                            });
                            var icdDataDetails;
                            d.icdData.map(function (e) {
                                icdDataDetails += e.ictCode + ",";
                            });
                            var location = d.locationData && d.locationData.city && d.locationData.branchName
                                ? d.locationData.city + "(" + d.locationData.branchName + ")"
                                : "";
                            formattedData_2.push({
                                _id: d._id,
                                Patient: d.patientData
                                    ? common_methods_1.default.getDecryptText(d.patientData.first_name) +
                                        " " +
                                        common_methods_1.default.getDecryptText(d.patientData.last_name)
                                    : "",
                                Case_Type: d.appointmentData ? d.appointmentData.visitType : "",
                                visitType: d.appointmentData ? d.appointmentData.visitType : "",
                                appointmentType: d.appointmentData.appointmentTypeData
                                    ? d.appointmentData.appointmentTypeData.type
                                    : "",
                                Case_Name: d.appointmentData.appointmentTypeData
                                    ? d.appointmentData.appointmentTypeData.type
                                    : "",
                                dob: d.patientData.date_of_birth,
                                cpt: d.cptData ? d.cptData : [],
                                Chart_No: d.patientData.patientId,
                                Reffering_Provider: d.referingProviderData.first_name +
                                    "" +
                                    d.referingProviderData.last_name,
                                Rendering_Provider: d.renderingProviderData.first_name +
                                    "" +
                                    d.renderingProviderData.last_name,
                                Billing_Provider: d.billingProviderData.first_name +
                                    "" +
                                    d.billingProviderData.last_name,
                                dos: d.appointmentData ? d.appointmentData.dos : "",
                                date_of_creation: d.appointmentData
                                    ? d.appointmentData.createdAt
                                    : "",
                                CPT_Code: cptDataDetails.slice(8),
                                ICD_Code: icdDataDetails.slice(8),
                                Provider: "",
                                Modifier: "",
                                POS_unit: "",
                                Unit_Charge: "",
                                Total_Charges: d.total_amount,
                                ICD_Type: "ICD-10",
                                Status: d.status,
                                locationDetails: location,
                                CreatedDate: d.createdAt,
                            });
                        });
                        superBillData = formattedData_2;
                        sheetStyle_1 = {
                            border: true,
                            fontFamily: "Calibri",
                        };
                        superBillData.forEach(function (el, i) {
                            var date = (0, moment_1.default)(el.startDateTime).format("DD-MM-YYYY");
                            console.log(el);
                            superbillSheet_1
                                .cell("A" + (i + 2))
                                .value(el.locationDetails)
                                .style(sheetStyle_1);
                            superbillSheet_1
                                .cell("B" + (i + 2))
                                .value(el.Billing_Provider)
                                .style(sheetStyle_1);
                            superbillSheet_1
                                .cell("C" + (i + 2))
                                .value(el.Rendering_Provider)
                                .style(sheetStyle_1);
                            superbillSheet_1
                                .cell("D" + (i + 2))
                                .value(el.Reffering_Provider)
                                .style(sheetStyle_1);
                            superbillSheet_1
                                .cell("E" + (i + 2))
                                .value(el.Chart_No)
                                .style(sheetStyle_1);
                            superbillSheet_1
                                .cell("F" + (i + 2))
                                .value((0, moment_1.default)(el.PatientDOB).format("DD-MM-YYYY"))
                                .style(sheetStyle_1);
                            superbillSheet_1
                                .cell("G" + (i + 2))
                                .value(el.Patient)
                                .style(sheetStyle_1);
                            superbillSheet_1
                                .cell("H" + (i + 2))
                                .value(el.Insurance_Plan)
                                .style(sheetStyle_1);
                            superbillSheet_1
                                .cell("I" + (i + 2))
                                .value(el.Insurance_Company)
                                .style(sheetStyle_1);
                            superbillSheet_1
                                .cell("J" + (i + 2))
                                .value(el.Case_Type)
                                .style(sheetStyle_1);
                            superbillSheet_1
                                .cell("K" + (i + 2))
                                .value(el.Case_Name)
                                .style(sheetStyle_1);
                            superbillSheet_1
                                .cell("L" + (i + 2))
                                .value((0, moment_1.default)(el.CreatedDate).format("DD-MM-YYYY"))
                                .style(sheetStyle_1);
                            superbillSheet_1
                                .cell("M" + (i + 2))
                                .value((0, moment_1.default)(el.DOS).format("DD-MM-YYYY"))
                                .style(sheetStyle_1);
                            superbillSheet_1
                                .cell("N" + (i + 2))
                                .value((0, moment_1.default)(el.Enddate).format("DD-MM-YYYY"))
                                .style(sheetStyle_1);
                            superbillSheet_1
                                .cell("O" + (i + 2))
                                .value(el.CPT_Code)
                                .style(sheetStyle_1);
                            superbillSheet_1
                                .cell("P" + (i + 2))
                                .value(el.ICD_Code)
                                .style(sheetStyle_1);
                            superbillSheet_1
                                .cell("Q" + (i + 2))
                                .value(el.Provider)
                                .style(sheetStyle_1);
                            superbillSheet_1
                                .cell("R" + (i + 2))
                                .value(el.Modifier)
                                .style(sheetStyle_1);
                            superbillSheet_1
                                .cell("S" + (i + 2))
                                .value(el.POS_unit)
                                .style(sheetStyle_1);
                            superbillSheet_1
                                .cell("T" + (i + 2))
                                .value(el.Unit_Charge)
                                .style(sheetStyle_1);
                            superbillSheet_1
                                .cell("U" + (i + 2))
                                .value(el.Total_Charges)
                                .style(sheetStyle_1);
                            superbillSheet_1
                                .cell("V" + (i + 2))
                                .value(el.ICD_Type)
                                .style(sheetStyle_1);
                            superbillSheet_1
                                .cell("W" + (i + 2))
                                .value(el.Status)
                                .style(sheetStyle_1);
                        });
                        superbillSheet_1.freezePanes(1, 1);
                        return [4 /*yield*/, workbook.outputAsync()];
                    case 3:
                        data = _a.sent();
                        return [4 /*yield*/, fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../../../../public/upload/superbill/SuperBill_Report.xlsx"), data)];
                    case 4:
                        _a.sent();
                        link = "http://".concat(req.hostname, ":").concat(process.env.PORT, "/upload/superbill/SuperBill_Report.xlsx");
                        excelFileName = "SuperBill_Report.xlsx";
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
                                message: erros_message_1.default.SUPER_BILL_LIST_NOT_FOUND,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_10 = _a.sent();
                        next(error_10);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        // getDetailsForGenerateSuperBill1 = async (
        //   req: Request,
        //   model: GenerateDetailsViewmodel,
        //   next: NextFunction
        // ): Promise<IServiceResult1 | void> => {
        //   try {
        //     let condition = {
        //       clinic_id: new mongoose.Types.ObjectId(model.clinic_id),
        //       appointment_id: new mongoose.Types.ObjectId(model.appointment_id),
        //       _id: new mongoose.Types.ObjectId(model.checkout_id),
        //     };
        //     const data = await BillingCheckoutModel.aggregate([
        //       { $match: condition },
        //       {
        //         $lookup: {
        //           from: "locations",
        //           let: { location_id: "$location_id" },
        //           pipeline: [
        //             { $match: { $expr: { $eq: ["$_id", "$$location_id"] } } },
        //             {
        //               $project: {
        //                 city: "$city",
        //                 branchName: 1,
        //                 address: 1,
        //                 taxonomy: 1,
        //                 npiNo: 1,
        //               },
        //             },
        //           ],
        //           as: "locationData",
        //         },
        //       },
        //       {
        //         $unwind: { path: "$locationData", preserveNullAndEmptyArrays: true },
        //       },
        //       {
        //         $lookup: {
        //           from: "appointments",
        //           let: { appointment_id: "$appointment_id" },
        //           pipeline: [
        //             { $match: { $expr: { $eq: ["$_id", "$$appointment_id"] } } },
        //           ],
        //           as: "appointmentData",
        //         },
        //       },
        //       {
        //         $unwind: {
        //           path: "$appointmentData",
        //           preserveNullAndEmptyArrays: true,
        //         },
        //       },
        //       {
        //         $lookup: {
        //           from: "patients",
        //           let: { patient_id: "$patient_id" },
        //           pipeline: [
        //             { $match: { $expr: { $eq: ["$_id", "$$patient_id"] } } },
        //             {
        //               $project: {
        //                 firstName: 1,
        //                 patientId: 1,
        //                 lastName: 1,
        //                 image: 1,
        //                 responsiblePartyName: 1,
        //               },
        //             },
        //           ],
        //           as: "patientData",
        //         },
        //       },
        //       { $unwind: { path: "$patientData", preserveNullAndEmptyArrays: true } },
        //       {
        //         $lookup: {
        //           from: "users",
        //           let: { clinic_id: "$clinic_id" },
        //           pipeline: [
        //             {
        //               $match: {
        //                 $expr: { $eq: ["$invitedby_id", "$$clinic_id"] },
        //               },
        //             },
        //             {
        //               $lookup: {
        //                 from: "roles",
        //                 localField: "role_id",
        //                 foreignField: "_id",
        //                 as: "roleData",
        //               },
        //             },
        //             {
        //               $unwind: {
        //                 path: "$roleData",
        //                 preserveNullAndEmptyArrays: true,
        //               },
        //             },
        //             {
        //               $match: {
        //                 $expr: {
        //                   $in: [
        //                     "$roleData.roleTitle",
        //                     [
        //                       constants.rolename.ASSOCIATEPROVIDER,
        //                       constants.rolename.DOCTOR,
        //                     ],
        //                   ],
        //                 },
        //               },
        //             },
        //             {
        //               $project: {
        //                 firstName: 1,
        //                 lastName: 1,
        //                 roleTitle: "$roleData.roleTitle",
        //               },
        //             },
        //             { $sort: { roleTitle: -1 } },
        //           ],
        //           as: "providerList",
        //         },
        //       },
        //       {
        //         $lookup: {
        //           from: "users",
        //           let: { user_id: "$associate_id" },
        //           pipeline: [
        //             { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
        //             { $project: { firstName: 1, lastName: 1, image: 1, npiNo: 1 } },
        //           ],
        //           as: "doctorData",
        //         },
        //       },
        //       { $unwind: { path: "$doctorData", preserveNullAndEmptyArrays: true } },
        //       {
        //         $lookup: {
        //           from: "cards",
        //           let: { patient_id: "$patient_id" },
        //           pipeline: [
        //             { $match: { $expr: { $eq: ["$patient_id", "$$patient_id"] } } },
        //             { $project: { brand: 1, last4: 1 } },
        //           ],
        //           as: "patientCards",
        //         },
        //       },
        //       {
        //         $lookup: {
        //           from: "insurances",
        //           let: { patient_id: "$patient_id" },
        //           pipeline: [
        //             { $match: { $expr: { $eq: ["$patient_id", "$$patient_id"] } } },
        //             { $sort: { coverage: 1 } },
        //             {
        //               $project: {
        //                 insuranceName: 1,
        //                 copay: 1,
        //                 coverage: 1,
        //                 payerId: 1,
        //               },
        //             },
        //           ],
        //           as: "insuranceData",
        //         },
        //       },
        //       // {
        //       //   $lookup: {
        //       //     from: "financialclasses",
        //       //     let: { clinic_id: "$clinic_id" },
        //       //     pipeline: [
        //       //       { $match: { $expr: { $eq: ["$createdby_id", "$$clinic_id"] } } },
        //       //       { $project: { price: 1, code: 1, covered: 1 } },
        //       //     ],
        //       //     as: "financialClassData",
        //       //   },
        //       // },
        //       {
        //         $project: {
        //           _id: 0,
        //           //paper: 1,
        //           providerList: 1,
        //           copay: {
        //             type: "FULL",
        //             //notes: "$copay.notes",
        //             amount: "$copay.amount",
        //             //status: "$copay.status",
        //             // full: {
        //             //   type: "$copay.full.type",
        //             //   cheque: "$copay.full.cheque",
        //             //   status: "$copay.full.status",
        //             //   link: "$copay.full.link.url",
        //             //   email: "$copay.full.email",
        //             //   card_id: "$copay.full.card_id",
        //             // },
        //           },
        //           duration: 1,
        //           doctor_id: 1,
        //           doctorData: 1,
        //           patientData: 1,
        //           orignalRefNo: 1,
        //           patientCards: 1,
        //           associate_id: 1,
        //           locationData: 1,
        //           insuranceData: 1,
        //           typeOfService: 1,
        //           placeOfService: 1,
        //           resubmissionCode: 1,
        //           checkout_id: "$_id",
        //           acceptAssignment: 1,
        //           financialClass_id: 1,
        //           financialClassData: 1,
        //           endDateTime: "$toDOS",
        //           checkoutTime: "$checkoutTime",
        //           providerAssignedCodes: "$codes",
        //           appointment_id: "$appointment_id",
        //           insurancePortion: "$insurance.amount",
        //           checkInTime: "$appointmentData.startDateTime",
        //           startDateTime: "$appointmentData.startDateTime",
        //           appointment_number: "$appointmentData.appointment_number",
        //         },
        //       },
        //     ]);
        //     if (true) {
        //     } else {
        //       return {
        //         status_code: HttpStatus.BAD_REQUEST,
        //         success: false,
        //         data: {
        //           message: errorMessage.NO_RECORD_FOUND,
        //           error: errorMessage.ON_FETCH_ERROR,
        //         },
        //       };
        //     }
        //   } catch (error) {
        //     next(error);
        //   }
        // };
        this.getPatientList = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var get_patients, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, appointment_model_1.default.aggregate([
                                {
                                    $match: {
                                        appointment_number: model.appointment_number,
                                        status: "Checkout",
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
                                        from: "doctorcheckout",
                                        localField: "_id",
                                        foreignField: "appointment_id",
                                        pipeline: [
                                            { $match: { billGenerated: false, noShow: false } },
                                            {
                                                $project: {
                                                    _id: 1,
                                                },
                                            },
                                        ],
                                        as: "doctorCheckoutData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$doctorCheckoutData",
                                        preserveNullAndEmptyArrays: false,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "super_bill",
                                        localField: "_id",
                                        foreignField: "appointment_id",
                                        pipeline: [
                                            {
                                                $project: {
                                                    _id: 1,
                                                },
                                            },
                                        ],
                                        as: "superBillFound",
                                    },
                                },
                                {
                                    $match: {
                                        "superBillFound.0": {
                                            $exists: false,
                                        },
                                    },
                                },
                                {
                                    $project: {
                                        first_name: "$patientData.first_name",
                                        last_name: "$patientData.last_name",
                                        appointment_id: "$_id",
                                    },
                                },
                            ])];
                    case 1:
                        get_patients = _a.sent();
                        if (get_patients && get_patients.length) {
                            get_patients.forEach(function (e) {
                                e.first_name = common_methods_1.default.getDecryptText(e.first_name);
                                e.last_name = common_methods_1.default.getDecryptText(e.last_name);
                            });
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: get_patients,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_RECORD_FOUND,
                                        //message: errorMessage.NO_CHECKED_OUT_APPOINTMENT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_11 = _a.sent();
                        next(error_11);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getChargeHistory = function (req, 
        //model: PatientListViewmodel,
        next) { return __awaiter(_this, void 0, void 0, function () {
            var result, claim_history_data, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, super_bill_model_1.default.aggregate([
                                {
                                    $match: {
                                        _id: new mongoose_1.default.Types.ObjectId(req.params._id),
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "doctor",
                                        localField: "billing_provider_id",
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
                                        as: "billingProviderData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$billingProviderData",
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
                                                $lookup: {
                                                    from: "states",
                                                    localField: "state",
                                                    foreignField: "_id",
                                                    pipeline: [{ $project: { stateName: 1 } }],
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
                                                    localField: "country",
                                                    foreignField: "_id",
                                                    pipeline: [{ $project: { countryName: 1 } }],
                                                    as: "countryData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$countryData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $project: {
                                                    first_name: 1,
                                                    last_name: 1,
                                                    address: 1,
                                                    city: 1,
                                                    responsible_person: 1,
                                                    state: "$stateData.stateName",
                                                    country: "$countryData.countryName",
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
                                                    description: 1,
                                                    price: 1,
                                                    _id: 1,
                                                },
                                            },
                                        ],
                                        as: "cptData",
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "icts",
                                        localField: "icd",
                                        foreignField: "_id",
                                        pipeline: [
                                            {
                                                $project: {
                                                    ictCode: 1,
                                                    description: 1,
                                                    codeCategory: 1,
                                                    _id: 1,
                                                },
                                            },
                                        ],
                                        as: "icdData",
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
                                                    from: "clinic_locations",
                                                    localField: "location_id",
                                                    foreignField: "_id",
                                                    pipeline: [
                                                        {
                                                            $project: {
                                                                branchName: 1,
                                                                city: 1,
                                                                address: 1,
                                                                postal_code: 1,
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
                                                $lookup: {
                                                    from: "appointment_type",
                                                    localField: "appointmentType_id",
                                                    foreignField: "_id",
                                                    pipeline: [{ $project: { type: 1 } }],
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
                                                    visitType: 1,
                                                    appointment_number: 1,
                                                    duration: 1,
                                                    locationData: 1,
                                                    startDateTime: 1,
                                                    endDateTime: 1,
                                                    appointmentTypeData: 1,
                                                    dos: "$startDateTime",
                                                    createdAt: "$createdAt",
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
                                        localField: "insurance_id",
                                        foreignField: "_id",
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
                                                $project: {
                                                    copay: 1,
                                                    coverage: 1,
                                                    insurance_name: "$insuranceCompanyData.companyName",
                                                    payer_id: 1,
                                                    insurance_plan_type: 1,
                                                },
                                            },
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
                                    $facet: {
                                        overview: [
                                            {
                                                $project: {
                                                    _id: 1,
                                                    billingProviderData: 1,
                                                    patientData: 1,
                                                    cptData: 1,
                                                    icdData: 1,
                                                    total_amount: 1,
                                                    appointmentData: 1,
                                                    insuranceData: 1,
                                                    copay: 1,
                                                    insurance: 1,
                                                    notes: 1,
                                                    current_balance: 10,
                                                    againg_days: 10,
                                                    current_follow_up_status: null, //STATIC
                                                },
                                            },
                                        ],
                                    },
                                },
                            ])];
                    case 1:
                        result = _a.sent();
                        if (result &&
                            result.length &&
                            result[0].overview &&
                            result[0].overview.length) {
                            claim_history_data = [
                                {
                                    invoice: "59DGDGD232",
                                    billing_provider: result[0].overview[0].billingProviderData
                                        ? result[0].overview[0].billingProviderData
                                        : null,
                                    appointment_data: result[0].overview[0].appointmentData
                                        ? result[0].overview[0].appointmentData
                                        : null,
                                    insurance_data: result[0].overview[0].insuranceData
                                        ? result[0].overview[0].insuranceData
                                        : null,
                                    date: new Date(),
                                    charge: result[0].overview[0].total_amount,
                                    credited: 0,
                                    balance: 0,
                                    copay: result[0].overview[0].copay
                                        ? result[0].overview[0].copay.amount
                                        : 0,
                                    priority: result[0].overview[0].insurance
                                        ? result[0].overview[0].insurance.coverage
                                        : null,
                                    status: result[0].overview[0].insurance &&
                                        result[0].overview[0].insurance.claimStatus != null
                                        ? result[0].overview[0].insurance.claimStatus
                                        : "To be claimed",
                                    type: "E",
                                    remit_code: "",
                                    notes: result[0].overview[0].notes,
                                },
                            ];
                            result[0].overview[0].patientData.first_name = common_methods_1.default.getDecryptText(result[0].overview[0].patientData.first_name);
                            result[0].overview[0].patientData.last_name = common_methods_1.default.getDecryptText(result[0].overview[0].patientData.last_name);
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: {
                                        overview: result[0].overview[0],
                                        history: claim_history_data,
                                    },
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_RECORD_FOUND,
                                        //message: errorMessage.NO_CHECKED_OUT_APPOINTMENT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_12 = _a.sent();
                        next(error_12);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getPaymentHistory = function (req, 
        //model: GetHistoryViewmodel,
        next) { return __awaiter(_this, void 0, void 0, function () {
            var result, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, billing_payment_model_1.default.aggregate([
                                {
                                    $match: {
                                        appointment_id: new mongoose_1.default.Types.ObjectId(req.params._id),
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
                                                    from: "clinic_locations",
                                                    localField: "location_id",
                                                    foreignField: "_id",
                                                    pipeline: [
                                                        {
                                                            $project: {
                                                                branchName: 1,
                                                                city: 1,
                                                                address: 1,
                                                                postal_code: 1,
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
                                                $lookup: {
                                                    from: "appointment_type",
                                                    localField: "appointmentType_id",
                                                    foreignField: "_id",
                                                    pipeline: [{ $project: { type: 1 } }],
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
                                                    visitType: 1,
                                                    appointment_number: 1,
                                                    duration: 1,
                                                    locationData: 1,
                                                    startDateTime: 1,
                                                    endDateTime: 1,
                                                    appointmentTypeData: 1,
                                                    dos: "$startDateTime",
                                                    createdAt: "$createdAt",
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
                                        from: "super_bill",
                                        localField: "appointment_id",
                                        foreignField: "appointment_id",
                                        pipeline: [
                                            {
                                                $lookup: {
                                                    from: "doctor",
                                                    localField: "billing_provider_id",
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
                                                    as: "billingProviderData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$billingProviderData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "doctor",
                                                    localField: "rendering_provider_id",
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
                                                    as: "renderingProviderData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$renderingProviderData",
                                                    preserveNullAndEmptyArrays: true,
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
                                                    as: "referingProviderData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$referingProviderData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "cpt",
                                                    localField: "cpt.cpt_code_id",
                                                    foreignField: "_id",
                                                    pipeline: [
                                                        {
                                                            $project: {
                                                                cptCode: 1,
                                                                price: 1,
                                                                _id: 1,
                                                            },
                                                        },
                                                    ],
                                                    as: "cptData",
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "modifiers",
                                                    localField: "cpt.modifier",
                                                    foreignField: "_id",
                                                    pipeline: [
                                                        {
                                                            $project: {
                                                                modifierCode: 1,
                                                                _id: 1,
                                                            },
                                                        },
                                                    ],
                                                    as: "modifierData",
                                                },
                                            },
                                            {
                                                $set: {
                                                    cpt: {
                                                        $map: {
                                                            input: "$cpt",
                                                            in: {
                                                                $mergeObjects: [
                                                                    "$$this",
                                                                    {
                                                                        cptCode: {
                                                                            $arrayElemAt: [
                                                                                "$cptData.cptCode",
                                                                                {
                                                                                    $indexOfArray: [
                                                                                        "$cptData._id",
                                                                                        "$$this.cpt_code_id",
                                                                                    ],
                                                                                },
                                                                            ],
                                                                        },
                                                                        price: {
                                                                            $arrayElemAt: [
                                                                                "$cptData.price",
                                                                                {
                                                                                    $indexOfArray: [
                                                                                        "$cptData._id",
                                                                                        "$$this.cpt_code_id",
                                                                                    ],
                                                                                },
                                                                            ],
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                            { $unset: "cptData" },
                                            {
                                                $lookup: {
                                                    from: "icts",
                                                    localField: "icd",
                                                    foreignField: "_id",
                                                    pipeline: [
                                                        {
                                                            $project: {
                                                                ictCode: 1,
                                                                _id: 1,
                                                            },
                                                        },
                                                    ],
                                                    as: "icdData",
                                                },
                                            },
                                            {
                                                $project: {
                                                    billing_provider: "$billingProviderData",
                                                    rendering_provider: "$renderingProviderData",
                                                    refering_provider: "$referingProviderData",
                                                    icdData: "$icdData",
                                                    modifierData: "$modifierData",
                                                    cptData: "$cpt",
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
                                // {
                                //   $facet: {
                                //     overview: [
                                //       {
                                //         $project: {},
                                //       },
                                //     ],
                                //   },
                                // },
                            ])];
                    case 1:
                        result = _a.sent();
                        if (result && result.length) {
                            result.forEach(function (data) {
                                data.revCode = [];
                                data.admission_date = new Date();
                                data.discharge_date = new Date();
                                data.allowed_amount = 0;
                                data.total_paid_amount = 0;
                                data.total_adjustment_amount = 0;
                                data.claim_no = "";
                                data.referance_no = "";
                                data.insurance_plan = "";
                                data.insurance_priority = "";
                                data.fs_ra = "";
                                data.posted_date = data.createdAt;
                                data.adjustment_amount = 0;
                                data.rejection_code = "";
                                data.rejection_code_description = "";
                                data.reversal_payment = 0;
                                data.reversal_adjustment = 0;
                                data.remianing_balance = 0;
                                data.insuranceId = "";
                                data.patientData.first_name = common_methods_1.default.getDecryptText(data.patientData.first_name);
                                data.patientData.last_name = common_methods_1.default.getDecryptText(data.patientData.last_name);
                            });
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: result,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_RECORD_FOUND,
                                        //message: errorMessage.NO_CHECKED_OUT_APPOINTMENT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_13 = _a.sent();
                        next(error_13);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return SuperBillServices;
}());
exports.default = new SuperBillServices();
