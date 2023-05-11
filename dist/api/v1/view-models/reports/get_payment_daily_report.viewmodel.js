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
exports.GetDailyPaymentReportViewmodel = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var mongoose_1 = __importDefault(require("mongoose"));
var billing_payment_model_1 = require("../../models/billing_payment.model");
var EUserTypeReport;
(function (EUserTypeReport) {
    EUserTypeReport["PATIENT"] = "PATIENT";
    EUserTypeReport["INSURANCE"] = "INSURANCE";
})(EUserTypeReport || (EUserTypeReport = {}));
var GetDailyPaymentReportViewmodel = /** @class */ (function () {
    function GetDailyPaymentReportViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return mongoose_1.default.Types.ObjectId; }),
        __metadata("design:type", Object)
    ], GetDailyPaymentReportViewmodel.prototype, "clinic_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsEnum)(billing_payment_model_1.EBillingModeValues, {
            message: "Mode can only be CASH, CARD, CHEQUE or LINK",
        }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], GetDailyPaymentReportViewmodel.prototype, "mode", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return mongoose_1.default.Types.ObjectId; }),
        __metadata("design:type", mongoose_1.default.Types.ObjectId)
    ], GetDailyPaymentReportViewmodel.prototype, "patient_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; }),
        (0, class_validator_1.IsDate)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], GetDailyPaymentReportViewmodel.prototype, "depositDateFrom", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; }),
        (0, class_validator_1.IsDate)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], GetDailyPaymentReportViewmodel.prototype, "depositDateTo", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsEnum)(EUserTypeReport, {
            message: "user_type can only be PATIENT or INSURANCE",
        }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], GetDailyPaymentReportViewmodel.prototype, "user_type", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        (0, class_transformer_1.Type)(function () { return Number; }),
        __metadata("design:type", Number)
    ], GetDailyPaymentReportViewmodel.prototype, "pageNumber", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        (0, class_transformer_1.Type)(function () { return Number; }),
        __metadata("design:type", Number)
    ], GetDailyPaymentReportViewmodel.prototype, "pageSize", void 0);
    return GetDailyPaymentReportViewmodel;
}());
exports.GetDailyPaymentReportViewmodel = GetDailyPaymentReportViewmodel;
