"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsurancePayment = exports.EPaymentFromValues = exports.ETransactionModeValues = exports.ECreditCardModeValues = exports.EPaymentModeValues = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var mongoose_1 = __importDefault(require("mongoose"));
var pagination_configuration_1 = require("../common/pagination/pagination_configuration");
var LinkObject = /** @class */ (function () {
    function LinkObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], LinkObject.prototype, "url", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], LinkObject.prototype, "id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], LinkObject.prototype, "resetKey", void 0);
    return LinkObject;
}());
var EPaymentModeValues;
(function (EPaymentModeValues) {
    EPaymentModeValues["EFT"] = "EFT";
    EPaymentModeValues["CARD"] = "CARD";
    EPaymentModeValues["CHEQUE"] = "CHEQUE";
})(EPaymentModeValues = exports.EPaymentModeValues || (exports.EPaymentModeValues = {}));
var ECreditCardModeValues;
(function (ECreditCardModeValues) {
    ECreditCardModeValues["PAYMENT"] = "PAYMENT";
    ECreditCardModeValues["REFUND"] = "REFUND";
})(ECreditCardModeValues = exports.ECreditCardModeValues || (exports.ECreditCardModeValues = {}));
var ETransactionModeValues;
(function (ETransactionModeValues) {
    ETransactionModeValues["PAYMENT"] = "PAYMENT";
    ETransactionModeValues["REFUND"] = "REFUND";
})(ETransactionModeValues = exports.ETransactionModeValues || (exports.ETransactionModeValues = {}));
var EPaymentFromValues;
(function (EPaymentFromValues) {
    EPaymentFromValues["INSURANCE"] = "INSURANCE";
    EPaymentFromValues["PATIENT"] = "PATIENT";
})(EPaymentFromValues = exports.EPaymentFromValues || (exports.EPaymentFromValues = {}));
var InsurancePayment = /** @class */ (function (_super) {
    __extends(InsurancePayment, _super);
    function InsurancePayment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ ref: "User" }),
        __metadata("design:type", Object)
    ], InsurancePayment.prototype, "clinic_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ enum: ETransactionModeValues }),
        __metadata("design:type", String)
    ], InsurancePayment.prototype, "transaction_type", void 0);
    __decorate([
        (0, typegoose_1.prop)({ enum: EPaymentFromValues }),
        __metadata("design:type", String)
    ], InsurancePayment.prototype, "payment_from", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: EPaymentModeValues,
        }),
        __metadata("design:type", String)
    ], InsurancePayment.prototype, "payment_mode", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: ECreditCardModeValues,
        }),
        __metadata("design:type", String)
    ], InsurancePayment.prototype, "credeitCard_mode", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], InsurancePayment.prototype, "transactionId", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "InsuranceCompany" }),
        __metadata("design:type", Object)
    ], InsurancePayment.prototype, "insurance_company", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], InsurancePayment.prototype, "insurance_plan", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], InsurancePayment.prototype, "refrence", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number }),
        __metadata("design:type", Number)
    ], InsurancePayment.prototype, "unapplied_amount", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: null }),
        __metadata("design:type", String)
    ], InsurancePayment.prototype, "refrenceDate", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number }),
        __metadata("design:type", Number)
    ], InsurancePayment.prototype, "payment_amount", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number }),
        __metadata("design:type", Number)
    ], InsurancePayment.prototype, "bill_charged_amount", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], InsurancePayment.prototype, "adjustment_amount", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], InsurancePayment.prototype, "excluded_claim", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], InsurancePayment.prototype, "notes", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "Patients", default: null }),
        __metadata("design:type", Object)
    ], InsurancePayment.prototype, "patient_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "Appointment", default: null }),
        __metadata("design:type", Object)
    ], InsurancePayment.prototype, "appointment_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "User", type: mongoose_1.default.Types.ObjectId }),
        __metadata("design:type", Object)
    ], InsurancePayment.prototype, "createdby_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], InsurancePayment.prototype, "document", void 0);
    InsurancePayment = __decorate([
        (0, typegoose_1.index)({ payment_mode: "text" })
    ], InsurancePayment);
    return InsurancePayment;
}(pagination_configuration_1.PaginatedModel));
exports.InsurancePayment = InsurancePayment;
var INSURANCE_PAYMENT_DB_MODEL = (0, typegoose_1.getModelForClass)(InsurancePayment, {
    schemaOptions: {
        collection: "insurance_payment",
        timestamps: true,
    },
});
exports.default = INSURANCE_PAYMENT_DB_MODEL;
