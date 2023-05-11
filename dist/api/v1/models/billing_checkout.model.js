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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingCheckout = exports.EPaymentModeValues = exports.EFullObjTypeValues = exports.EClaimStatusValues = exports.EAcknowledgementStatusValues = exports.EInsuranceBatchValues = exports.EResponsiblePartyValues = exports.EBillingCoverageValues = exports.EResubmissionCodeValues = exports.EAssignmentValues = exports.EBatchValues = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var pagination_configuration_1 = require("../common/pagination/pagination_configuration");
var cpt_model_1 = require("./cpt.model");
var ict_model_1 = require("./ict.model");
var user_model_1 = require("./user.model");
var EBatchValues;
(function (EBatchValues) {
    EBatchValues["DONE"] = "DONE";
    EBatchValues["PENDING"] = "PENDING";
})(EBatchValues = exports.EBatchValues || (exports.EBatchValues = {}));
var EAssignmentValues;
(function (EAssignmentValues) {
    EAssignmentValues["A"] = "A";
    EAssignmentValues["C"] = "C";
})(EAssignmentValues = exports.EAssignmentValues || (exports.EAssignmentValues = {}));
var EResubmissionCodeValues;
(function (EResubmissionCodeValues) {
    EResubmissionCodeValues["ONE"] = "1";
    EResubmissionCodeValues["SEVEN"] = "7";
    EResubmissionCodeValues["EIGHT"] = "8";
})(EResubmissionCodeValues = exports.EResubmissionCodeValues || (exports.EResubmissionCodeValues = {}));
var EBillingCoverageValues;
(function (EBillingCoverageValues) {
    EBillingCoverageValues["Primary"] = "Primary";
    EBillingCoverageValues["Secondary"] = "Secondary";
    EBillingCoverageValues["Tertiary"] = "Tertiary";
    EBillingCoverageValues["NULL"] = "null";
})(EBillingCoverageValues = exports.EBillingCoverageValues || (exports.EBillingCoverageValues = {}));
var EResponsiblePartyValues;
(function (EResponsiblePartyValues) {
    EResponsiblePartyValues["FAMILY"] = "FAMILY";
    EResponsiblePartyValues["INSURANCE"] = "INSURANCE";
    EResponsiblePartyValues["NULL"] = "null";
})(EResponsiblePartyValues = exports.EResponsiblePartyValues || (exports.EResponsiblePartyValues = {}));
var EInsuranceBatchValues;
(function (EInsuranceBatchValues) {
    EInsuranceBatchValues["COMPLETE"] = "COMPLETE";
    EInsuranceBatchValues["EDI_AND_CMS_DONE"] = "EDI_AND_CMS_DONE";
    EInsuranceBatchValues["AR_APPROVED"] = "AR_APPROVED";
    EInsuranceBatchValues["CLINIC_APPROVED"] = "CLINIC_APPROVED";
    EInsuranceBatchValues["CLINIC_APPROVAL_PENDING"] = "CLINIC_APPROVAL_PENDING";
})(EInsuranceBatchValues = exports.EInsuranceBatchValues || (exports.EInsuranceBatchValues = {}));
var EAcknowledgementStatusValues;
(function (EAcknowledgementStatusValues) {
    EAcknowledgementStatusValues["CH_ACCEPTED"] = "CH_ACCEPTED";
    EAcknowledgementStatusValues["CH_REJECTED"] = "CH_REJECTED";
    EAcknowledgementStatusValues["CH_ACCEPTED_WITH_ERROR"] = "CH_ACCEPTED_WITH_ERROR";
    EAcknowledgementStatusValues["SEND_TO_PAYER"] = "SEND_TO_PAYER";
    EAcknowledgementStatusValues["PAYER_RECEIVED"] = "PAYER_RECEIVED";
    EAcknowledgementStatusValues["PAYER_ACCEPTED"] = "PAYER_ACCEPTED";
    EAcknowledgementStatusValues["PAYER_REJECTED"] = "PAYER_REJECTED";
    EAcknowledgementStatusValues["NULL"] = "null";
})(EAcknowledgementStatusValues = exports.EAcknowledgementStatusValues || (exports.EAcknowledgementStatusValues = {}));
var EClaimStatusValues;
(function (EClaimStatusValues) {
    EClaimStatusValues["PATIENT_RESPONSIBLE"] = "PATIENT_RESPONSIBLE";
    EClaimStatusValues["BILLED_TO_PATIENT"] = "BILLED_TO_PATIENT";
    EClaimStatusValues["CLAIM_GENRATED"] = "CLAIM_GENRATED";
    EClaimStatusValues["SEND_ON_PAPER"] = "SEND_ON_PAPER";
    EClaimStatusValues["SEND_TO_CH"] = "SEND_TO_CH";
    EClaimStatusValues["CH_SCRUB_ERROR"] = "CH_SCRUB_ERROR";
    EClaimStatusValues["CH_CONFIRMED"] = "CH_CONFIRMED";
    EClaimStatusValues["PAID"] = "PAID";
    EClaimStatusValues["REJECTED"] = "REJECTED";
    EClaimStatusValues["COMPLETED"] = "COMPLETED";
    EClaimStatusValues["NULL"] = "null";
})(EClaimStatusValues = exports.EClaimStatusValues || (exports.EClaimStatusValues = {}));
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
var EFullObjTypeValues;
(function (EFullObjTypeValues) {
    EFullObjTypeValues["CASH"] = "CASH";
    EFullObjTypeValues["CARD"] = "CARD";
    EFullObjTypeValues["CHEQUE"] = "CHEQUE";
    EFullObjTypeValues["LINK"] = "LINK";
})(EFullObjTypeValues = exports.EFullObjTypeValues || (exports.EFullObjTypeValues = {}));
var FullObject = /** @class */ (function () {
    function FullObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], FullObject.prototype, "email", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], FullObject.prototype, "cheque", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: LinkObject }),
        __metadata("design:type", LinkObject)
    ], FullObject.prototype, "link", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], FullObject.prototype, "status", void 0);
    __decorate([
        (0, typegoose_1.prop)({ enum: EFullObjTypeValues }),
        __metadata("design:type", String)
    ], FullObject.prototype, "type", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }),
        __metadata("design:type", String)
    ], FullObject.prototype, "notes", void 0);
    return FullObject;
}());
var EPaymentModeValues;
(function (EPaymentModeValues) {
    EPaymentModeValues["CASH"] = "CASH";
    EPaymentModeValues["CARD"] = "CARD";
    EPaymentModeValues["CHECQUE"] = "CHECQUE";
    EPaymentModeValues["LINK"] = "LINK";
})(EPaymentModeValues = exports.EPaymentModeValues || (exports.EPaymentModeValues = {}));
var ReceiveObject = /** @class */ (function () {
    function ReceiveObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ enum: EPaymentModeValues }),
        __metadata("design:type", String)
    ], ReceiveObject.prototype, "paymentMode", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], ReceiveObject.prototype, "amount", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: null }),
        __metadata("design:type", String)
    ], ReceiveObject.prototype, "date", void 0);
    return ReceiveObject;
}());
var CptCodeObject = /** @class */ (function () {
    function CptCodeObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 1 }),
        __metadata("design:type", Number)
    ], CptCodeObject.prototype, "unit", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: cpt_model_1.CPTCodes }),
        __metadata("design:type", Object)
    ], CptCodeObject.prototype, "code_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: [Number] }),
        __metadata("design:type", Array)
    ], CptCodeObject.prototype, "icd", void 0);
    return CptCodeObject;
}());
var BillingCodesObject = /** @class */ (function () {
    function BillingCodesObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ ref: ict_model_1.ICTCodes }),
        __metadata("design:type", Object)
    ], BillingCodesObject.prototype, "ICD_9", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: ict_model_1.ICTCodes }),
        __metadata("design:type", Object)
    ], BillingCodesObject.prototype, "ICD_10", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: CptCodeObject }),
        __metadata("design:type", Object)
    ], BillingCodesObject.prototype, "cptCode", void 0);
    return BillingCodesObject;
}());
var EInsuranceObject = /** @class */ (function () {
    function EInsuranceObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], EInsuranceObject.prototype, "status", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], EInsuranceObject.prototype, "amount", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], EInsuranceObject.prototype, "receive", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: null }),
        __metadata("design:type", String)
    ], EInsuranceObject.prototype, "date", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: EBillingCoverageValues,
            default: EBillingCoverageValues.NULL,
        }),
        __metadata("design:type", String)
    ], EInsuranceObject.prototype, "coverage", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            type: String,
            default: EAcknowledgementStatusValues.NULL,
        }),
        __metadata("design:type", String)
    ], EInsuranceObject.prototype, "acknowledgementStatus", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            type: String,
            default: EClaimStatusValues.NULL,
        }),
        __metadata("design:type", String)
    ], EInsuranceObject.prototype, "claimStatus", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            type: String,
            default: EInsuranceBatchValues.CLINIC_APPROVAL_PENDING,
        }),
        __metadata("design:type", String)
    ], EInsuranceObject.prototype, "batch", void 0);
    return EInsuranceObject;
}());
var CopayObject = /** @class */ (function () {
    function CopayObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], CopayObject.prototype, "amount", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }),
        __metadata("design:type", String)
    ], CopayObject.prototype, "notes", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], CopayObject.prototype, "status", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "FULL" }),
        __metadata("design:type", String)
    ], CopayObject.prototype, "type", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: EBatchValues,
            default: EBatchValues.PENDING,
        }),
        __metadata("design:type", String)
    ], CopayObject.prototype, "batch", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: FullObject }),
        __metadata("design:type", FullObject)
    ], CopayObject.prototype, "full", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: ReceiveObject }),
        __metadata("design:type", ReceiveObject)
    ], CopayObject.prototype, "receive", void 0);
    return CopayObject;
}());
// @index({ placeOfService: "text" })
var BillingCheckout = /** @class */ (function (_super) {
    __extends(BillingCheckout, _super);
    function BillingCheckout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], BillingCheckout.prototype, "duration", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: null }),
        __metadata("design:type", String)
    ], BillingCheckout.prototype, "runDate", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], BillingCheckout.prototype, "totalAmount", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], BillingCheckout.prototype, "placeOfService", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "MEDICALCARE" }),
        __metadata("design:type", String)
    ], BillingCheckout.prototype, "typeOfService", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: EBatchValues,
            default: EBatchValues.PENDING,
        }),
        __metadata("design:type", String)
    ], BillingCheckout.prototype, "batch", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: null }),
        __metadata("design:type", String)
    ], BillingCheckout.prototype, "toDOS", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], BillingCheckout.prototype, "paper", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], BillingCheckout.prototype, "noShow", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], BillingCheckout.prototype, "orignalRefNo", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User, default: null }),
        __metadata("design:type", Object)
    ], BillingCheckout.prototype, "clinic_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "User" }),
        __metadata("design:type", Object)
    ], BillingCheckout.prototype, "doctor_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "Patients" }),
        __metadata("design:type", Object)
    ], BillingCheckout.prototype, "patient_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "ClinicLocation" }),
        __metadata("design:type", Object)
    ], BillingCheckout.prototype, "location_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "Appointment" }),
        __metadata("design:type", Object)
    ], BillingCheckout.prototype, "appointment_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "FinancialClass", default: null }),
        __metadata("design:type", Object)
    ], BillingCheckout.prototype, "financialClass_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "User" }),
        __metadata("design:type", Object)
    ], BillingCheckout.prototype, "associate_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: EAssignmentValues,
            default: EAssignmentValues.A,
        }),
        __metadata("design:type", String)
    ], BillingCheckout.prototype, "acceptAssignment", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: EResubmissionCodeValues,
            default: EResubmissionCodeValues.ONE,
        }),
        __metadata("design:type", String)
    ], BillingCheckout.prototype, "resubmissionCode", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: EResponsiblePartyValues,
            default: EResponsiblePartyValues.NULL,
        }),
        __metadata("design:type", String)
    ], BillingCheckout.prototype, "responsibleParty", void 0);
    __decorate([
        (0, typegoose_1.prop)(),
        __metadata("design:type", EInsuranceObject)
    ], BillingCheckout.prototype, "insurance", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: BillingCodesObject }),
        __metadata("design:type", BillingCodesObject)
    ], BillingCheckout.prototype, "codes", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: CopayObject }),
        __metadata("design:type", CopayObject)
    ], BillingCheckout.prototype, "copay", void 0);
    return BillingCheckout;
}(pagination_configuration_1.PaginatedModel));
exports.BillingCheckout = BillingCheckout;
var BILLING_CHECKOUT_DB_MODEL = (0, typegoose_1.getModelForClass)(BillingCheckout, {
    schemaOptions: {
        collection: "billingCheckout",
        timestamps: true,
    },
});
exports.default = BILLING_CHECKOUT_DB_MODEL;
