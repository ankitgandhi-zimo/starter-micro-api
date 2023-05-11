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
exports.SuperBill = exports.EAssignedStatus = exports.BillStatus = exports.ClaimStatusObjectValues = exports.ICD = exports.CPT = exports.LinkedICDS = exports.EPaymentModeValues = exports.EFullObjTypeValues = exports.EClaimStatusValues = exports.EAcknowledgementStatusValues = exports.EInsuranceBatchValues = exports.EResponsiblePartyValues = exports.EBillingCoverageValues = exports.EResubmissionCodeValues = exports.EAssignmentValues = exports.EBatchValues = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var mongoose_1 = __importDefault(require("mongoose"));
var pagination_configuration_1 = require("../common/pagination/pagination_configuration");
var appointment_model_1 = require("./appointment.model");
var clinic_model_1 = require("./clinic.model");
var cpt_model_1 = require("./cpt.model");
var doctor_model_1 = require("./doctor.model");
var financialclass_model_1 = require("./financialclass.model");
var ict_model_1 = require("./ict.model");
var insurance_model_1 = require("./insurance/insurance.model");
var location_model_1 = require("./location.model");
var modifiers_model_1 = require("./modifiers.model");
var patient_model_1 = require("./patient.model");
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
        (0, typegoose_1.prop)({ type: String, default: null }) //null
        ,
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
var LinkedICDS = /** @class */ (function () {
    function LinkedICDS() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: null }),
        __metadata("design:type", Array)
    ], LinkedICDS.prototype, "icd", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], LinkedICDS.prototype, "pos", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: null }),
        __metadata("design:type", Number)
    ], LinkedICDS.prototype, "quantity", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: null }),
        __metadata("design:type", Number)
    ], LinkedICDS.prototype, "charges", void 0);
    return LinkedICDS;
}());
exports.LinkedICDS = LinkedICDS;
var CPT = /** @class */ (function () {
    function CPT() {
    }
    __decorate([
        (0, typegoose_1.prop)({
            ref: cpt_model_1.CPTCodes,
            type: mongoose_1.default.Types.ObjectId,
            default: null,
        }),
        __metadata("design:type", Object)
    ], CPT.prototype, "cpt_code_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: null }),
        __metadata("design:type", Number)
    ], CPT.prototype, "unit", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            ref: modifiers_model_1.Modifiers,
            type: mongoose_1.default.Types.ObjectId,
            default: [],
        }),
        __metadata("design:type", Array)
    ], CPT.prototype, "modifier", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: [] }),
        __metadata("design:type", Array)
    ], CPT.prototype, "icd", void 0);
    return CPT;
}());
exports.CPT = CPT;
var ICD = /** @class */ (function () {
    function ICD() {
    }
    __decorate([
        (0, typegoose_1.prop)({
            ref: ict_model_1.ICTCodes,
            type: mongoose_1.default.Types.ObjectId,
            default: null,
        }),
        __metadata("design:type", Object)
    ], ICD.prototype, "icd_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], ICD.prototype, "icdCode", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], ICD.prototype, "description", void 0);
    return ICD;
}());
exports.ICD = ICD;
var ClaimStatusObjectValues = /** @class */ (function () {
    function ClaimStatusObjectValues() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], ClaimStatusObjectValues.prototype, "claimStatus", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: null }),
        __metadata("design:type", String)
    ], ClaimStatusObjectValues.prototype, "submitDate", void 0);
    return ClaimStatusObjectValues;
}());
exports.ClaimStatusObjectValues = ClaimStatusObjectValues;
var BillStatus;
(function (BillStatus) {
    BillStatus["QUICKSAVE"] = "quickSave";
    BillStatus["QUICKSAVEANDSIGNOF"] = "quickSaveSignOff";
    BillStatus["LINKANDSAVE"] = "linkAndSave";
    BillStatus["LINKSAVESIGNOFF"] = "linkSaveSignOff";
    BillStatus["NOLINKSAVE"] = "noLinkSave";
})(BillStatus = exports.BillStatus || (exports.BillStatus = {}));
var EAssignedStatus;
(function (EAssignedStatus) {
    EAssignedStatus["ASSIGNED"] = "assigned";
    EAssignedStatus["UNASSIGNED"] = "unassigned";
})(EAssignedStatus = exports.EAssignedStatus || (exports.EAssignedStatus = {}));
var SuperBill = /** @class */ (function (_super) {
    __extends(SuperBill, _super);
    function SuperBill() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], SuperBill.prototype, "isDeleted", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: true }),
        __metadata("design:type", Boolean)
    ], SuperBill.prototype, "isActive", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: BillStatus,
            type: String,
            default: BillStatus.QUICKSAVE,
        }),
        __metadata("design:type", String)
    ], SuperBill.prototype, "status", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], SuperBill.prototype, "resubmit", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: patient_model_1.Patients, type: mongoose_1.default.Types.ObjectId }),
        __metadata("design:type", Object)
    ], SuperBill.prototype, "patient_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: appointment_model_1.Appointment, type: mongoose_1.default.Types.ObjectId }),
        __metadata("design:type", Object)
    ], SuperBill.prototype, "appointment_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: clinic_model_1.Clinic, type: mongoose_1.default.Types.ObjectId }),
        __metadata("design:type", Object)
    ], SuperBill.prototype, "clinic_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            type: String,
            default: null,
        }),
        __metadata("design:type", String)
    ], SuperBill.prototype, "payer_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], SuperBill.prototype, "responsible_party_name", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], SuperBill.prototype, "insurance_name", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            ref: insurance_model_1.Insurance,
            type: mongoose_1.default.Types.ObjectId,
        }),
        __metadata("design:type", Object)
    ], SuperBill.prototype, "insurance_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            ref: doctor_model_1.Doctor,
            type: mongoose_1.default.Types.ObjectId,
            /// field: "user_id",
        }),
        __metadata("design:type", Object)
    ], SuperBill.prototype, "referring_provider_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            ref: doctor_model_1.Doctor,
            type: mongoose_1.default.Types.ObjectId,
            //field: "user_id",
        }),
        __metadata("design:type", Object)
    ], SuperBill.prototype, "rendering_provider_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            ref: doctor_model_1.Doctor,
            type: mongoose_1.default.Types.ObjectId,
            //field: "user_id",
        }),
        __metadata("design:type", Object)
    ], SuperBill.prototype, "billing_provider_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: null }),
        __metadata("design:type", String)
    ], SuperBill.prototype, "fromDate", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: null }),
        __metadata("design:type", String)
    ], SuperBill.prototype, "toDate", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], SuperBill.prototype, "duration", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "MEDICALCARE" }),
        __metadata("design:type", String)
    ], SuperBill.prototype, "type_of_service", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], SuperBill.prototype, "place_of_service", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: CPT }),
        __metadata("design:type", Array)
    ], SuperBill.prototype, "cpt", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            ref: ict_model_1.ICTCodes,
            type: mongoose_1.default.Types.ObjectId,
            default: [],
        }),
        __metadata("design:type", Array)
    ], SuperBill.prototype, "icd", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: financialclass_model_1.FinancialClass, default: null }),
        __metadata("design:type", Object)
    ], SuperBill.prototype, "financial_class_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], SuperBill.prototype, "total_amount", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: true }),
        __metadata("design:type", Boolean)
    ], SuperBill.prototype, "responsible_party", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: true }),
        __metadata("design:type", Boolean)
    ], SuperBill.prototype, "accept_assignment", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], SuperBill.prototype, "received_cash", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: EResubmissionCodeValues,
            type: String,
            default: EResubmissionCodeValues.ONE,
        }),
        __metadata("design:type", String)
    ], SuperBill.prototype, "resubmissionCode", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], SuperBill.prototype, "notes", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], SuperBill.prototype, "marked_as_printed", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User, type: mongoose_1.default.Types.ObjectId }),
        __metadata("design:type", Object)
    ], SuperBill.prototype, "createdby_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: EAssignedStatus,
            type: String,
            default: EAssignedStatus.UNASSIGNED,
        }),
        __metadata("design:type", String)
    ], SuperBill.prototype, "assignedStatus", void 0);
    __decorate([
        (0, typegoose_1.prop)(),
        __metadata("design:type", EInsuranceObject)
    ], SuperBill.prototype, "insurance", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: CopayObject }),
        __metadata("design:type", CopayObject)
    ], SuperBill.prototype, "copay", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            type: ClaimStatusObjectValues,
            default: function () { return ({}); },
            _id: false,
        }),
        __metadata("design:type", ClaimStatusObjectValues)
    ], SuperBill.prototype, "ClaimStatusObject", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            ref: location_model_1.ClinicLocation,
            type: mongoose_1.default.Types.ObjectId,
        }),
        __metadata("design:type", Object)
    ], SuperBill.prototype, "location_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], SuperBill.prototype, "noShow", void 0);
    SuperBill = __decorate([
        (0, typegoose_1.index)({ status: "text" })
    ], SuperBill);
    return SuperBill;
}(pagination_configuration_1.PaginatedModel));
exports.SuperBill = SuperBill;
var SUPER_BILL_DB_MODEL = (0, typegoose_1.getModelForClass)(SuperBill, {
    schemaOptions: {
        collection: "super_bill",
        timestamps: true,
    },
});
exports.default = SUPER_BILL_DB_MODEL;
