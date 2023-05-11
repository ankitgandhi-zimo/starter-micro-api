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
exports.UpdateBillingPaymentViewmodel = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var billing_payment_model_1 = require("../../models/billing_payment.model");
var add_billing_payment_viewmodel_1 = require("./add_billing_payment.viewmodel");
var UpdateBillingPaymentViewmodel = /** @class */ (function () {
    function UpdateBillingPaymentViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], UpdateBillingPaymentViewmodel.prototype, "_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsEnum)(billing_payment_model_1.EBillingModeValues, {
            message: "Mode can only be CASH,CARD,CHEQUE or LINK",
        })
        //@IsDefined()
        ,
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdateBillingPaymentViewmodel.prototype, "mode", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsEnum)(billing_payment_model_1.EBillingStatusValues, {
            message: "Status can only be RECEIVED, DUE,REFUND,FAILED or EXPECTED",
        })
        //@IsDefined()
        ,
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdateBillingPaymentViewmodel.prototype, "status", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsEnum)(billing_payment_model_1.EBillMethodValues, {
            message: "Method can only be FULL or ADVANCE",
        })
        //@IsDefined()
        ,
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdateBillingPaymentViewmodel.prototype, "method", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; })
        //@IsString()
        ,
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdateBillingPaymentViewmodel.prototype, "batchNumber", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsEmail)()
        //@IsDefined()
        ,
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdateBillingPaymentViewmodel.prototype, "email", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdateBillingPaymentViewmodel.prototype, "remark", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdateBillingPaymentViewmodel.prototype, "transactionId", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdateBillingPaymentViewmodel.prototype, "cheque", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)()
        // @Type(() => String)
        // @IsString()
        // //@IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateBillingPaymentViewmodel.prototype, "chargeId", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_validator_1.IsNumber)()
        //@IsDefined()
        ,
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Number)
    ], UpdateBillingPaymentViewmodel.prototype, "amount", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsDateString)()
        //@IsDefined()
        ,
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdateBillingPaymentViewmodel.prototype, "receiveDate", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return add_billing_payment_viewmodel_1.LinkObject; }),
        (0, class_validator_1.IsObject)()
        //@IsDefined()
        ,
        (0, class_validator_1.ValidateNested)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", add_billing_payment_viewmodel_1.LinkObject)
    ], UpdateBillingPaymentViewmodel.prototype, "link", void 0);
    __decorate([
        (0, class_transformer_1.Expose)()
        // @Type(() => Boolean)
        //@IsDefined()
        ,
        __metadata("design:type", Boolean)
    ], UpdateBillingPaymentViewmodel.prototype, "isActive", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Object)
    ], UpdateBillingPaymentViewmodel.prototype, "clinic_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Object)
    ], UpdateBillingPaymentViewmodel.prototype, "patient_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Object)
    ], UpdateBillingPaymentViewmodel.prototype, "appointment_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Object)
    ], UpdateBillingPaymentViewmodel.prototype, "insurancePaymentId", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Object)
    ], UpdateBillingPaymentViewmodel.prototype, "createdby_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdateBillingPaymentViewmodel.prototype, "document", void 0);
    return UpdateBillingPaymentViewmodel;
}());
exports.UpdateBillingPaymentViewmodel = UpdateBillingPaymentViewmodel;
