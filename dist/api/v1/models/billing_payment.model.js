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
exports.BillingPayment = exports.EBillMethodValues = exports.EBillingStatusValues = exports.EBillingModeValues = void 0;
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
var EBillingModeValues;
(function (EBillingModeValues) {
    EBillingModeValues["CASH"] = "CASH";
    EBillingModeValues["CARD"] = "CARD";
    EBillingModeValues["CHEQUE"] = "CHEQUE";
    EBillingModeValues["LINK"] = "LINK";
})(EBillingModeValues = exports.EBillingModeValues || (exports.EBillingModeValues = {}));
var EBillingStatusValues;
(function (EBillingStatusValues) {
    EBillingStatusValues["RECEIVED"] = "RECEIVED";
    EBillingStatusValues["DUE"] = "DUE";
    EBillingStatusValues["FAILED"] = "FAILED";
    EBillingStatusValues["EXPECTED"] = "EXPECTED";
    EBillingStatusValues["REFUND"] = "REFUND";
})(EBillingStatusValues = exports.EBillingStatusValues || (exports.EBillingStatusValues = {}));
var EBillMethodValues;
(function (EBillMethodValues) {
    EBillMethodValues["FULL"] = "FULL"; /* 'EMI', 'SPLIT', 'E1', 'E2', 'E3', 'P1', 'P2',*/
    EBillMethodValues["ADVANCE"] = "ADVANCE";
})(EBillMethodValues = exports.EBillMethodValues || (exports.EBillMethodValues = {}));
// @index({ mode: "text" })
var BillingPayment = /** @class */ (function (_super) {
    __extends(BillingPayment, _super);
    function BillingPayment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ enum: EBillingModeValues }),
        __metadata("design:type", String)
    ], BillingPayment.prototype, "mode", void 0);
    __decorate([
        (0, typegoose_1.prop)({ enum: EBillingStatusValues }),
        __metadata("design:type", String)
    ], BillingPayment.prototype, "status", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: EBillMethodValues,
            default: EBillMethodValues.FULL,
        }),
        __metadata("design:type", String)
    ], BillingPayment.prototype, "method", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], BillingPayment.prototype, "batchNumber", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], BillingPayment.prototype, "email", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], BillingPayment.prototype, "transactionId", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], BillingPayment.prototype, "remark", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], BillingPayment.prototype, "cheque", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], BillingPayment.prototype, "chargeId", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, required: true }),
        __metadata("design:type", Number)
    ], BillingPayment.prototype, "amount", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: null }),
        __metadata("design:type", String)
    ], BillingPayment.prototype, "receiveDate", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "User" }),
        __metadata("design:type", Object)
    ], BillingPayment.prototype, "clinic_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "Patients" }),
        __metadata("design:type", Object)
    ], BillingPayment.prototype, "patient_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "Appointment" }),
        __metadata("design:type", Object)
    ], BillingPayment.prototype, "appointment_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "InsurancePayment", default: null }),
        __metadata("design:type", Object)
    ], BillingPayment.prototype, "insurancePaymentId", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            type: LinkObject,
            default: function () { return ({}); },
            _id: false,
        }),
        __metadata("design:type", LinkObject)
    ], BillingPayment.prototype, "link", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "User", type: mongoose_1.default.Types.ObjectId }),
        __metadata("design:type", Object)
    ], BillingPayment.prototype, "createdby_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], BillingPayment.prototype, "document", void 0);
    return BillingPayment;
}(pagination_configuration_1.PaginatedModel));
exports.BillingPayment = BillingPayment;
var BILLING_PAYMENT_DB_MODEL = (0, typegoose_1.getModelForClass)(BillingPayment, {
    schemaOptions: {
        collection: "billingpayment",
        timestamps: true,
    },
});
exports.default = BILLING_PAYMENT_DB_MODEL;
