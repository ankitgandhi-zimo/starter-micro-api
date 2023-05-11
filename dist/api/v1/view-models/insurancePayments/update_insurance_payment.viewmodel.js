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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInsurancePaymentViewmodel = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var mongoose_1 = __importDefault(require("mongoose"));
var insurance_payment_model_1 = require("../../models/insurance_payment.model");
var UpdateInsurancePaymentViewmodel = /** @class */ (function () {
    function UpdateInsurancePaymentViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return mongoose_1.default.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdateInsurancePaymentViewmodel.prototype, "_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return mongoose_1.default.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)()
        //@IsDefined()
        //@IsNotEmpty()
        ,
        __metadata("design:type", Object)
    ], UpdateInsurancePaymentViewmodel.prototype, "clinic_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsEnum)(insurance_payment_model_1.ETransactionModeValues, {
            message: "transaction_type value must be from one of them i.e. PAYMENT,REFUND",
        }),
        (0, class_validator_1.IsString)()
        //@IsDefined()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateInsurancePaymentViewmodel.prototype, "transaction_type", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsEnum)(insurance_payment_model_1.EPaymentFromValues, {
            message: "payment_from value must be from one of them i.e. INSURANCE,PATIENT",
        }),
        (0, class_validator_1.IsString)()
        //@IsDefined()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateInsurancePaymentViewmodel.prototype, "payment_from", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsEnum)(insurance_payment_model_1.EPaymentModeValues, {
            message: "payment_mode value must be from one of them i.e. EFT,CARD,CHEQUE",
        }),
        (0, class_validator_1.IsString)()
        //@IsDefined()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateInsurancePaymentViewmodel.prototype, "payment_mode", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsEnum)(insurance_payment_model_1.ECreditCardModeValues, {
            message: "credeitCard_mode value must be from one of them i.e.PAYMENT,REFUND",
        }),
        (0, class_validator_1.IsString)()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateInsurancePaymentViewmodel.prototype, "credeitCard_mode", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateInsurancePaymentViewmodel.prototype, "transactionId", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsMongoId)()
        //@IsDefined()
        //@IsNotEmpty()
        ,
        (0, class_transformer_1.Type)(function () { return mongoose_1.default.Types.ObjectId; }),
        __metadata("design:type", Object)
    ], UpdateInsurancePaymentViewmodel.prototype, "insurance_company", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsDefined()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateInsurancePaymentViewmodel.prototype, "insurance_plan", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsDefined()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateInsurancePaymentViewmodel.prototype, "refrence", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; }),
        (0, class_validator_1.IsDate)()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateInsurancePaymentViewmodel.prototype, "refrenceDate", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_validator_1.IsNumber)()
        //@IsDefined()
        //@IsNotEmpty()
        ,
        __metadata("design:type", Number)
    ], UpdateInsurancePaymentViewmodel.prototype, "payment_amount", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Number)
    ], UpdateInsurancePaymentViewmodel.prototype, "unapplied_amount", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_validator_1.IsNumber)()
        //@IsDefined()
        //@IsNotEmpty()
        ,
        __metadata("design:type", Number)
    ], UpdateInsurancePaymentViewmodel.prototype, "bill_charged_amount", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_validator_1.IsNumber)()
        //@IsDefined()
        //@IsNotEmpty()
        ,
        __metadata("design:type", Number)
    ], UpdateInsurancePaymentViewmodel.prototype, "adjustment_amount", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsDefined()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateInsurancePaymentViewmodel.prototype, "excluded_claim", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsDefined()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateInsurancePaymentViewmodel.prototype, "notes", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return mongoose_1.default.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)()
        //@IsDefined()
        //@IsNotEmpty()
        ,
        __metadata("design:type", Object)
    ], UpdateInsurancePaymentViewmodel.prototype, "patient_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return mongoose_1.default.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)()
        //@IsDefined()
        //@IsNotEmpty()
        ,
        __metadata("design:type", Object)
    ], UpdateInsurancePaymentViewmodel.prototype, "appointment_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", mongoose_1.default.Types.ObjectId)
    ], UpdateInsurancePaymentViewmodel.prototype, "createdby_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsDefined()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateInsurancePaymentViewmodel.prototype, "document", void 0);
    return UpdateInsurancePaymentViewmodel;
}());
exports.UpdateInsurancePaymentViewmodel = UpdateInsurancePaymentViewmodel;
