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
var typegoose_1 = require("@typegoose/typegoose");
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var erros_message_1 = __importDefault(require("../../common/erros_message"));
var billing_payment_model_1 = __importStar(require("../../models/billing_payment.model"));
var history_model_1 = __importStar(require("../../models/history.model"));
var insurance_payment_model_1 = __importStar(require("../../models/insurance_payment.model"));
var InsurancePaymentServices = /** @class */ (function () {
    function InsurancePaymentServices() {
        var _this = this;
        this.addInsurancePayment = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, addPaymentResult, paymentObj, modelToSave, addHistory, error_1;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 8, , 9]);
                        userDetails = req.user;
                        addPaymentResult = void 0;
                        if (!(model.transaction_type == insurance_payment_model_1.ETransactionModeValues.REFUND)) return [3 /*break*/, 2];
                        paymentObj = {
                            mode: billing_payment_model_1.EBillingModeValues.CASH,
                            remark: model.notes,
                            amount: model.payment_amount,
                            clinic_id: model.clinic_id,
                            patient_id: (_a = model.patient_id) !== null && _a !== void 0 ? _a : null,
                            createdby_id: userDetails._id,
                            appointment_id: (_b = model.appointment_id) !== null && _b !== void 0 ? _b : null,
                            receiveDate: model.refrenceDate,
                            method: "ADVANCE",
                            status: "REFUND",
                            batchNumber: Date.now(),
                        };
                        return [4 /*yield*/, billing_payment_model_1.default.create(paymentObj)];
                    case 1:
                        addPaymentResult = _c.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        modelToSave = model;
                        modelToSave.createdby_id = userDetails._id;
                        modelToSave.unapplied_amount = model.payment_amount;
                        return [4 /*yield*/, insurance_payment_model_1.default.create(modelToSave)];
                    case 3:
                        addPaymentResult = _c.sent();
                        _c.label = 4;
                    case 4:
                        if (!addPaymentResult) return [3 /*break*/, 6];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "Insurance Payment added successfully",
                                type: history_model_1.EHistoryActivityTypeValues.PAYMENT,
                                type_id: userDetails._id,
                            })];
                    case 5:
                        addHistory = _c.sent();
                        return [2 /*return*/, {
                                success: true,
                                data: erros_message_1.default.paymentMsg.paymentAdded,
                                status_code: http_status_codes_1.default.OK,
                            }];
                    case 6: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.paymentMsg.ErrorPaymentAdded,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                            status_code: http_status_codes_1.default.UNAUTHORIZED,
                        }];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_1 = _c.sent();
                        next(error_1);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.updateInsurancePayment = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, updateObj, updatePayment, addHistory, updateObj, updatePayment, addHistory, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 10, , 11]);
                        userDetails = req.user;
                        if (!(model.transaction_type == insurance_payment_model_1.ETransactionModeValues.REFUND)) return [3 /*break*/, 5];
                        updateObj = {};
                        if (model.notes)
                            updateObj.remark = model.notes;
                        if (model.payment_amount)
                            updateObj.amount = model.payment_amount;
                        if (model.clinic_id)
                            updateObj.clinic_id = model.clinic_id;
                        if (model.patient_id)
                            updateObj.patient_id = model.patient_id;
                        if (model.appointment_id)
                            updateObj.appointment_id = model.appointment_id;
                        return [4 /*yield*/, billing_payment_model_1.default.updateOne({ _id: model._id }, { $set: updateObj })];
                    case 1:
                        updatePayment = _a.sent();
                        if (!(updatePayment && updatePayment.modifiedCount > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "Insurance Payment updated successfully",
                                type: history_model_1.EHistoryActivityTypeValues.PAYMENT,
                                type_id: userDetails._id,
                            })];
                    case 2:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                data: erros_message_1.default.UPDATE_SUCCESSFULL,
                                status_code: http_status_codes_1.default.OK,
                            }];
                    case 3: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.PAYMENT_UPDATE_FAILED,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 4: return [3 /*break*/, 9];
                    case 5:
                        updateObj = {};
                        if (model.notes)
                            updateObj.notes = model.notes;
                        if (model.payment_amount)
                            updateObj.payment_amount = model.payment_amount;
                        if (model.clinic_id)
                            updateObj.clinic_id = model.clinic_id;
                        if (model.patient_id)
                            updateObj.patient_id = model.patient_id;
                        if (model.appointment_id)
                            updateObj.appointment_id = model.appointment_id;
                        if (model.transaction_type)
                            updateObj.transaction_type = model.transaction_type;
                        if (model.payment_from)
                            updateObj.payment_from = model.payment_from;
                        if (model.payment_mode)
                            updateObj.payment_mode = model.payment_mode;
                        if (model.credeitCard_mode)
                            updateObj.credeitCard_mode = model.credeitCard_mode;
                        if (model.insurance_company)
                            updateObj.insurance_company = model.insurance_company;
                        if (model.transactionId)
                            updateObj.transactionId = model.transactionId;
                        if (model.insurance_plan)
                            updateObj.insurance_plan = model.insurance_plan;
                        if (model.refrence)
                            updateObj.refrence = model.refrence;
                        if (model.refrenceDate)
                            updateObj.refrenceDate = model.refrenceDate;
                        if (model.bill_charged_amount)
                            updateObj.bill_charged_amount = model.bill_charged_amount;
                        if (model.adjustment_amount)
                            updateObj.adjustment_amount = model.adjustment_amount;
                        if (model.document)
                            updateObj.document = model.document;
                        return [4 /*yield*/, insurance_payment_model_1.default.updateOne({ _id: model._id }, { $set: updateObj })];
                    case 6:
                        updatePayment = _a.sent();
                        if (!(updatePayment && updatePayment.modifiedCount > 0)) return [3 /*break*/, 8];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "Insurance Payment updated successfully",
                                type: history_model_1.EHistoryActivityTypeValues.PAYMENT,
                                type_id: userDetails._id,
                            })];
                    case 7:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                data: erros_message_1.default.UPDATE_SUCCESSFULL,
                                status_code: http_status_codes_1.default.OK,
                            }];
                    case 8: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.PAYMENT_UPDATE_FAILED,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        }); };
        //updateInsurancePayment
        this.listInsurancePayment = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var defaultPage, count, condition, startTime, endTime, startTime, endTime, startTime, endTime, startTime, endTime, result, obj, condition, startTime, endTime, startTime, endTime, result, obj, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        defaultPage = void 0;
                        count = void 0;
                        defaultPage = model.pageNumber ? model.pageNumber : 1;
                        count = model.pageSize ? model.pageSize : 50;
                        if (!(model.type != insurance_payment_model_1.ETransactionModeValues.REFUND)) return [3 /*break*/, 2];
                        condition = {};
                        if (model.clinic_id)
                            condition.clinic_id = new typegoose_1.mongoose.Types.ObjectId(model.clinic_id.toString());
                        if (model.patient_id)
                            condition.patient_id = new typegoose_1.mongoose.Types.ObjectId(model.patient_id.toString());
                        if (model.appointment_id)
                            condition.appointment_id = new typegoose_1.mongoose.Types.ObjectId(model.appointment_id.toString());
                        if (model.insurance_company)
                            condition.insurance_company = new typegoose_1.mongoose.Types.ObjectId(model.insurance_company.toString());
                        //if (model.payment_from) condition.payment_from = model.payment_from;
                        if (model.insurance_plan)
                            condition.insurance_plan = model.insurance_plan;
                        if (model.refrence)
                            condition.refrence = model.refrence;
                        if (model.ref_startDateTime) {
                            startTime = new Date(model.ref_startDateTime);
                            startTime.setHours(0, 0, 0, 0);
                            endTime = new Date(model.ref_startDateTime);
                            endTime.setHours(23, 59, 59, 999);
                            condition.refrenceDate = {
                                $gte: startTime,
                                //$lte: endTime,
                            };
                        }
                        if (model.ref_endDateTime) {
                            startTime = new Date(model.ref_endDateTime);
                            startTime.setHours(0, 0, 0, 0);
                            endTime = new Date(model.ref_endDateTime);
                            endTime.setHours(23, 59, 59, 999);
                            condition.refrenceDate = {
                                //$gte: startTime,
                                $lte: endTime,
                            };
                        }
                        ////
                        if (model.received_startDateTime) {
                            startTime = new Date(model.received_startDateTime);
                            startTime.setHours(0, 0, 0, 0);
                            endTime = new Date(model.received_startDateTime);
                            endTime.setHours(23, 59, 59, 999);
                            condition.createdAt = {
                                $gte: startTime,
                                //$lte: endTime,
                            };
                        }
                        if (model.received_endDateTime) {
                            startTime = new Date(model.received_endDateTime);
                            startTime.setHours(0, 0, 0, 0);
                            endTime = new Date(model.received_endDateTime);
                            endTime.setHours(23, 59, 59, 999);
                            condition.createdAt = {
                                //$gte: startTime,
                                $lte: endTime,
                            };
                        }
                        return [4 /*yield*/, insurance_payment_model_1.default.aggregate([
                                { $match: condition },
                                {
                                    $lookup: {
                                        from: "insurance_companies",
                                        let: { insurance_company: "$insurance_company" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$_id", "$$insurance_company"],
                                                    },
                                                },
                                            },
                                            { $project: { companyName: 1, _id: 1 } },
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
                                    $facet: {
                                        count: [{ $count: "count" }],
                                        data: [
                                            {
                                                $project: {
                                                    _id: 1,
                                                    clinic_id: 1,
                                                    transaction_type: 1,
                                                    payment_from: 1,
                                                    payment_mode: 1,
                                                    credeitCard_mode: 1,
                                                    transactionId: 1,
                                                    insurance_company: "$insuranceCompanyData.companyName",
                                                    insurance_company_id: "$insuranceCompanyData._id",
                                                    insurance_plan: 1,
                                                    refrence: 1,
                                                    refrenceDate: 1,
                                                    payment_amount: 1,
                                                    bill_charged_amount: 1,
                                                    adjustment_amount: 1,
                                                    excluded_claim: 1,
                                                    notes: 1,
                                                    patient_id: 1,
                                                    appointment_id: 1,
                                                    document: 1,
                                                    createdAt: 1,
                                                },
                                            },
                                            {
                                                $sort: { createdAt: -1 },
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
                            obj = {
                                data: result[0].data,
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
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_RECORD_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        condition = {};
                        if (model.clinic_id)
                            condition.clinic_id = new typegoose_1.mongoose.Types.ObjectId(model.clinic_id.toString());
                        if (model.patient_id)
                            condition.patient_id = new typegoose_1.mongoose.Types.ObjectId(model.patient_id.toString());
                        if (model.appointment_id)
                            condition.appointment_id = new typegoose_1.mongoose.Types.ObjectId(model.appointment_id.toString());
                        if (model.received_startDateTime) {
                            startTime = new Date(model.received_startDateTime);
                            startTime.setHours(0, 0, 0, 0);
                            endTime = new Date(model.received_startDateTime);
                            endTime.setHours(23, 59, 59, 999);
                            condition.receiveDate = {
                                $gte: startTime,
                                //$lte: endTime,
                            };
                        }
                        if (model.received_endDateTime) {
                            startTime = new Date(model.received_endDateTime);
                            startTime.setHours(0, 0, 0, 0);
                            endTime = new Date(model.received_endDateTime);
                            endTime.setHours(23, 59, 59, 999);
                            condition.receiveDate = {
                                //$gte: startTime,
                                $lte: endTime,
                            };
                        }
                        condition.status = insurance_payment_model_1.ETransactionModeValues.REFUND;
                        return [4 /*yield*/, billing_payment_model_1.default.aggregate([
                                { $match: condition },
                                {
                                    $facet: {
                                        count: [{ $count: "count" }],
                                        data: [
                                            {
                                                // mode: EBillingModeValues.CASH,
                                                // remark: model.notes,
                                                // method: "ADVANCE",
                                                // status: "REFUND",
                                                // batchNumber: Date.now(),
                                                $project: {
                                                    _id: 1,
                                                    //status: "REFUND",
                                                    //method: 1,
                                                    //email: 1,
                                                    // amount: 1,
                                                    transactionId: 1,
                                                    //remark: 1,
                                                    transaction_type: "REFUND",
                                                    cheque: 1,
                                                    payment_from: null,
                                                    //receiveDate: 1,
                                                    payment_mode: "$mode",
                                                    credeitCard_mode: null,
                                                    insurance_company: null,
                                                    insurance_company_id: null,
                                                    insurance_plan: null,
                                                    refrence: null,
                                                    refrenceDate: "$receiveDate",
                                                    payment_amount: "$amount",
                                                    bill_charged_amount: {
                                                        $ifNull: [
                                                            "$bill_charged_amount",
                                                            "$bill_charged_amount",
                                                            0,
                                                        ],
                                                    },
                                                    adjustment_amount: {
                                                        $ifNull: ["$adjustment_amount", "$adjustment_amount", 0],
                                                    },
                                                    excluded_claim: null,
                                                    notes: "$remark",
                                                    patient_id: 1,
                                                    appointment_id: 1,
                                                    document: 1,
                                                    createdAt: 1,
                                                    // _id: 1,
                                                    // clinic_id: 1,
                                                    // transaction_type: 1,
                                                    // payment_from: 1,
                                                    // payment_mode: 1,
                                                    // credeitCard_mode: 1,
                                                    // transactionId: 1,
                                                    // insurance_company: "$insuranceCompanyData.companyName",
                                                    // insurance_company_id: "$insuranceCompanyData._id",
                                                    // insurance_plan: 1,
                                                    // refrence: 1,
                                                    // refrenceDate: 1,
                                                    // payment_amount: 1,
                                                    // bill_charged_amount: 1,
                                                    // adjustment_amount: 1,
                                                    // excluded_claim: 1,
                                                    // notes: 1,
                                                    // patient_id: 1,
                                                    // appointment_id: 1,
                                                    // document: 1,
                                                    // createdAt: 1,
                                                },
                                            },
                                            {
                                                $sort: { createdAt: -1 },
                                            },
                                            { $skip: count * (defaultPage - 1) },
                                            { $limit: count },
                                        ],
                                    },
                                },
                            ])];
                    case 3:
                        result = _a.sent();
                        if (result &&
                            result.length > 0 &&
                            result[0].data &&
                            result[0].data.length > 0) {
                            obj = {
                                data: result[0].data,
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
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_RECORD_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
    }
    return InsurancePaymentServices;
}());
exports.default = new InsurancePaymentServices();
