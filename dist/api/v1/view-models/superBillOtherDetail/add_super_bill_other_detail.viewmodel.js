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
exports.AddSuperBillOtherDetailViewmodel = exports.InsuranceObj = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var super_bill_other_detail_model_1 = require("../../models/super_bill_other_detail.model");
var InsuranceObj = /** @class */ (function () {
    function InsuranceObj() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], InsuranceObj.prototype, "insurance_plan", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], InsuranceObj.prototype, "referral_no", void 0);
    return InsuranceObj;
}());
exports.InsuranceObj = InsuranceObj;
var AddSuperBillOtherDetailViewmodel = /** @class */ (function () {
    function AddSuperBillOtherDetailViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], AddSuperBillOtherDetailViewmodel.prototype, "super_bill_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsArray)()
        //@IsDefined()
        //@IsMongoId({ each: true })
        //@IsNotEmpty()
        ,
        __metadata("design:type", Array)
    ], AddSuperBillOtherDetailViewmodel.prototype, "claim_codes", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; })
        //@IsDateString()
        //@IsDefined()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddSuperBillOtherDetailViewmodel.prototype, "relinquished_care_date", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; })
        //@IsDateString()
        //@IsDefined()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddSuperBillOtherDetailViewmodel.prototype, "hearing_vision_date", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; })
        //@IsDateString()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddSuperBillOtherDetailViewmodel.prototype, "first_visit_date", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; })
        //@IsDateString()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddSuperBillOtherDetailViewmodel.prototype, "acute_manifestation_date", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; })
        //@IsDateString()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddSuperBillOtherDetailViewmodel.prototype, "last_seen_date", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; })
        //@IsDateString()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddSuperBillOtherDetailViewmodel.prototype, "assumed_care_date", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; })
        //@IsDateString()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddSuperBillOtherDetailViewmodel.prototype, "last_x_ray_date", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; })
        //@IsDateString()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddSuperBillOtherDetailViewmodel.prototype, "initial_treatment_date", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddSuperBillOtherDetailViewmodel.prototype, "additional_cliam_info", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddSuperBillOtherDetailViewmodel.prototype, "ct_project_code", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddSuperBillOtherDetailViewmodel.prototype, "property_casuality_claim_no", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsEnum)(super_bill_other_detail_model_1.ClaimNotes, {
            message: "Notes can only be ADD, CER, DCP, DGN or TPO",
        })
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddSuperBillOtherDetailViewmodel.prototype, "claim_notes", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddSuperBillOtherDetailViewmodel.prototype, "other_constitutional", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_validator_1.IsNumber)()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", Number)
    ], AddSuperBillOtherDetailViewmodel.prototype, "lab_charges", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddSuperBillOtherDetailViewmodel.prototype, "mammography_certification_no", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddSuperBillOtherDetailViewmodel.prototype, "investigational_device_exemption_no", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddSuperBillOtherDetailViewmodel.prototype, "delay_reason_code", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsEnum)(super_bill_other_detail_model_1.SpecialProgramCode, {
            message: "Status can only be 02, 03, 05, or 09",
        })
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddSuperBillOtherDetailViewmodel.prototype, "special_program_code", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ArrayNotEmpty)(),
        (0, class_validator_1.ValidateNested)(),
        (0, class_transformer_1.Type)(function () { return InsuranceObj; }),
        __metadata("design:type", Array)
    ], AddSuperBillOtherDetailViewmodel.prototype, "insurance_data", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Boolean; })
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", Boolean)
    ], AddSuperBillOtherDetailViewmodel.prototype, "EPSDT_referral", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsEnum)(super_bill_other_detail_model_1.Resubmission, {
            message: "Resubmission code can only be 7, 8",
        })
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddSuperBillOtherDetailViewmodel.prototype, "resubmission_no", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddSuperBillOtherDetailViewmodel.prototype, "original_ref_no", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddSuperBillOtherDetailViewmodel.prototype, "remarks", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsDefined()
        // @IsMongoId()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddSuperBillOtherDetailViewmodel.prototype, "createdby_id", void 0);
    return AddSuperBillOtherDetailViewmodel;
}());
exports.AddSuperBillOtherDetailViewmodel = AddSuperBillOtherDetailViewmodel;
