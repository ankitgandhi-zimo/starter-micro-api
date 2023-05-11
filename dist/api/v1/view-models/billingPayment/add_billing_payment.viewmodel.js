"use strict";
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
exports.AddBillingPaymentViewmodel = exports.LinkObject = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var billing_payment_model_1 = require("../../models/billing_payment.model");
var LinkObject = /** @class */ (function () {
    function LinkObject() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsDefined()
        ,
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], LinkObject.prototype, "url", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsDefined()
        ,
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], LinkObject.prototype, "resetKey", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsDefined()
        ,
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], LinkObject.prototype, "id", void 0);
    return LinkObject;
}());
exports.LinkObject = LinkObject;
var AddBillingPaymentViewmodel = /** @class */ (function () {
    function AddBillingPaymentViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsEnum)(billing_payment_model_1.EBillingModeValues, {
            message: "Mode can only be CASH, CARD, CHEQUE or LINK",
        }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddBillingPaymentViewmodel.prototype, "mode", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsEnum)(billing_payment_model_1.EBillingStatusValues, {
            message: "Status can only be RECEIVED, DUE, FAILED,REFUND or EXPECTED",
        }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddBillingPaymentViewmodel.prototype, "status", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsEnum)(billing_payment_model_1.EBillMethodValues, {
            message: "Method can only be FULL or ADVANCE",
        }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddBillingPaymentViewmodel.prototype, "method", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddBillingPaymentViewmodel.prototype, "batchNumber", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsEmail)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddBillingPaymentViewmodel.prototype, "email", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddBillingPaymentViewmodel.prototype, "remark", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddBillingPaymentViewmodel.prototype, "cheque", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsDefined()
        ,
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddBillingPaymentViewmodel.prototype, "chargeId", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddBillingPaymentViewmodel.prototype, "transactionId", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Number)
    ], AddBillingPaymentViewmodel.prototype, "amount", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsDateString)()
        //@IsDefined()
        ,
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddBillingPaymentViewmodel.prototype, "receiveDate", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], AddBillingPaymentViewmodel.prototype, "clinic_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], AddBillingPaymentViewmodel.prototype, "patient_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], AddBillingPaymentViewmodel.prototype, "appointment_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return LinkObject; }),
        (0, class_validator_1.IsObject)()
        //@IsDefined()
        ,
        (0, class_validator_1.ValidateNested)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", LinkObject)
    ], AddBillingPaymentViewmodel.prototype, "link", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsDefined()
        ,
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddBillingPaymentViewmodel.prototype, "createdby_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddBillingPaymentViewmodel.prototype, "document", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Object)
    ], AddBillingPaymentViewmodel.prototype, "insurancePaymentId", void 0);
    return AddBillingPaymentViewmodel;
}());
exports.AddBillingPaymentViewmodel = AddBillingPaymentViewmodel;
