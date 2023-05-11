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
exports.BillingPostPayment = exports.EPostBillingStatusValues = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var mongoose_1 = __importDefault(require("mongoose"));
var pagination_configuration_1 = require("../common/pagination/pagination_configuration");
var EPostBillingStatusValues;
(function (EPostBillingStatusValues) {
    EPostBillingStatusValues["POSTED"] = "POSTED";
    EPostBillingStatusValues["PUBLISHED"] = "PUBLISHED";
})(EPostBillingStatusValues = exports.EPostBillingStatusValues || (exports.EPostBillingStatusValues = {}));
// @index({ status: "text" })
var BillingPostPayment = /** @class */ (function (_super) {
    __extends(BillingPostPayment, _super);
    function BillingPostPayment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], BillingPostPayment.prototype, "copay", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], BillingPostPayment.prototype, "deductible", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], BillingPostPayment.prototype, "adjustment", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], BillingPostPayment.prototype, "due_amount", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], BillingPostPayment.prototype, "co_insurance", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], BillingPostPayment.prototype, "allowed_amount", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], BillingPostPayment.prototype, "insurance_paid", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], BillingPostPayment.prototype, "secondary_balance_due", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], BillingPostPayment.prototype, "charge_amount", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "Clinic" }),
        __metadata("design:type", Object)
    ], BillingPostPayment.prototype, "clinic_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "Patients" }),
        __metadata("design:type", Object)
    ], BillingPostPayment.prototype, "patient_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "Appointment" }),
        __metadata("design:type", Object)
    ], BillingPostPayment.prototype, "appointment_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "SuperBill" }),
        __metadata("design:type", Object)
    ], BillingPostPayment.prototype, "superbill_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "User", type: mongoose_1.default.Types.ObjectId }),
        __metadata("design:type", Object)
    ], BillingPostPayment.prototype, "createdby_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: EPostBillingStatusValues,
            default: EPostBillingStatusValues.POSTED,
        }),
        __metadata("design:type", String)
    ], BillingPostPayment.prototype, "status", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            ref: "BillingCheckout",
            type: mongoose_1.default.Types.ObjectId,
        }),
        __metadata("design:type", Object)
    ], BillingPostPayment.prototype, "checkout_id", void 0);
    return BillingPostPayment;
}(pagination_configuration_1.PaginatedModel));
exports.BillingPostPayment = BillingPostPayment;
var BILLING_POST_PAYMENT_DB_MODEL = (0, typegoose_1.getModelForClass)(BillingPostPayment, {
    schemaOptions: {
        collection: "billingPostPayment",
        timestamps: true,
    },
});
exports.default = BILLING_POST_PAYMENT_DB_MODEL;
