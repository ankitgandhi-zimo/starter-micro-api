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
exports.UpdateSuperBillOtherDetailViewmodel = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var super_bill_other_detail_model_1 = require("../../models/super_bill_other_detail.model");
var add_super_bill_other_detail_viewmodel_1 = require("./add_super_bill_other_detail.viewmodel");
var UpdateSuperBillOtherDetailViewmodel = /** @class */ (function () {
    function UpdateSuperBillOtherDetailViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdateSuperBillOtherDetailViewmodel.prototype, "super_bill_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; })
        //@IsArray()
        //@IsMongoId({ each: true })
        //@IsNotEmpty()
        ,
        __metadata("design:type", Array)
    ], UpdateSuperBillOtherDetailViewmodel.prototype, "claim_codes", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; })
        // @IsDateString()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateSuperBillOtherDetailViewmodel.prototype, "relinquished_care_date", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; })
        // @IsDateString()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateSuperBillOtherDetailViewmodel.prototype, "hearing_vision_date", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; })
        // @IsDateString()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateSuperBillOtherDetailViewmodel.prototype, "first_visit_date", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; })
        // @IsDateString()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateSuperBillOtherDetailViewmodel.prototype, "acute_manifestation_date", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; })
        // @IsDateString()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateSuperBillOtherDetailViewmodel.prototype, "last_seen_date", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; })
        // @IsDateString()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateSuperBillOtherDetailViewmodel.prototype, "assumed_care_date", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; })
        //@IsDateString()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateSuperBillOtherDetailViewmodel.prototype, "last_x_ray_date", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; })
        //@IsDateString()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateSuperBillOtherDetailViewmodel.prototype, "initial_treatment_date", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateSuperBillOtherDetailViewmodel.prototype, "additional_cliam_info", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateSuperBillOtherDetailViewmodel.prototype, "ct_project_code", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateSuperBillOtherDetailViewmodel.prototype, "property_casuality_claim_no", void 0);
    __decorate([
        (0, class_transformer_1.Expose)()
        // @IsEnum(ClaimNotes, {
        //   message: "Status can only be ADD, CER, DCP, DGN or TPO",
        // })
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateSuperBillOtherDetailViewmodel.prototype, "claim_notes", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateSuperBillOtherDetailViewmodel.prototype, "other_constitutional", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_validator_1.IsNumber)()
        //@IsNotEmpty()
        ,
        __metadata("design:type", Number)
    ], UpdateSuperBillOtherDetailViewmodel.prototype, "lab_charges", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateSuperBillOtherDetailViewmodel.prototype, "mammography_certification_no", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateSuperBillOtherDetailViewmodel.prototype, "investigational_device_exemption_no", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateSuperBillOtherDetailViewmodel.prototype, "delay_reason_code", void 0);
    __decorate([
        (0, class_transformer_1.Expose)()
        // @IsEnum(SpecialProgramCode, {
        //   message: "Status can only be 02, 03, 05, or 09",
        // })
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateSuperBillOtherDetailViewmodel.prototype, "special_program_code", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsArray)()
        //@ArrayNotEmpty()
        //@ValidateNested()
        ,
        (0, class_transformer_1.Type)(function () { return add_super_bill_other_detail_viewmodel_1.InsuranceObj; }),
        __metadata("design:type", Array)
    ], UpdateSuperBillOtherDetailViewmodel.prototype, "insurance_data", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Boolean; })
        //@IsNotEmpty()
        ,
        __metadata("design:type", Boolean)
    ], UpdateSuperBillOtherDetailViewmodel.prototype, "EPSDT_referral", void 0);
    __decorate([
        (0, class_transformer_1.Expose)()
        // @IsEnum(Resubmission, {
        //   message: "Status can only be 7, 8",
        // })
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateSuperBillOtherDetailViewmodel.prototype, "resubmission_no", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateSuperBillOtherDetailViewmodel.prototype, "original_ref_no", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateSuperBillOtherDetailViewmodel.prototype, "remarks", void 0);
    return UpdateSuperBillOtherDetailViewmodel;
}());
exports.UpdateSuperBillOtherDetailViewmodel = UpdateSuperBillOtherDetailViewmodel;
