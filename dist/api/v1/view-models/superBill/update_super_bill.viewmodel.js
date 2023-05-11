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
exports.UpdateSuperBillViewmodel = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var super_bill_model_1 = require("../../models/super_bill.model");
var add_super_bill_viewmodel_1 = require("./add_super_bill.viewmodel");
// export class CPT {
//   @Expose()
//   @Type(() => mongoose.Types.ObjectId)
//   @IsDefined()
//   @IsMongoId()
//   @IsNotEmpty()
//   cpt_code_id!: Ref<CPTCodes>;
//   @Expose()
//   @Type(() => Number)
//   @IsNumber()
//   @IsDefined()
//   @IsNotEmpty()
//   unit!: number;
//   @Expose()
//   @Type(() => String)
//   @IsString()
//   @IsDefined()
//   @IsNotEmpty()
//   description!: string;
//   @Expose()
//   @Type(() => Number)
//   @IsNumber()
//   @IsDefined()
//   @IsNotEmpty()
//   fee!: number;
//   @Expose()
//   @Type(() => String)
//   @IsString()
//   @IsDefined()
//   @IsMongoId()
//   @IsNotEmpty()
//   modifier!: string;
//   @Expose()
//   @IsOptional()
//   @IsArray()
//   @Type(() => Number)
//   icd?: number[];
//   // @Expose()
//   // @IsObject()
//   // @IsOptional()
//   // @ValidateNested()
//   // @Type(() => LinkedICDS)
//   // linkedIcd?: LinkedICDS;
// }
// //CPT HAS MULTIPLE ICDS
// export class ICD {
//   @Expose()
//   @IsMongoId()
//   @IsDefined()
//   @IsNotEmpty()
//   @Type(() => mongoose.Types.ObjectId)
//   icd_id!: Ref<ICTCodes>;
//   @Expose()
//   @Type(() => String)
//   @IsString()
//   @IsDefined()
//   @IsNotEmpty()
//   icdCode!: string;
//   @Expose()
//   @Type(() => String)
//   @IsString()
//   @IsDefined()
//   @IsNotEmpty()
//   description!: string;
// }
// export class LinkedICDS {
//   @Expose()
//   @IsDefined()
//   @IsArray()
//   @Type(() => Number)
//   @IsNotEmpty()
//   icd!: number[];
//   @Expose()
//   @Type(() => Number)
//   @IsNumber()
//   @IsDefined()
//   @IsNotEmpty()
//   pos!: number;
//   @Expose()
//   @Type(() => Number)
//   @IsNumber()
//   @IsDefined()
//   @IsNotEmpty()
//   quantity!: number;
//   @Expose()
//   @Type(() => Number)
//   @IsNumber()
//   @IsDefined()
//   @IsNotEmpty()
//   charges!: number;
// }
var UpdateSuperBillViewmodel = /** @class */ (function () {
    function UpdateSuperBillViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], UpdateSuperBillViewmodel.prototype, "_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsEnum)(super_bill_model_1.BillStatus, {
            message: "Status can only be quickSave, quickSaveSignOff, linkAndSave, linkSaveSignOff or noLinkSave",
        }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdateSuperBillViewmodel.prototype, "status", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsOptional)()
        // @IsMongoId()
        ,
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdateSuperBillViewmodel.prototype, "payer_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateSuperBillViewmodel.prototype, "responsible_party_name", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateSuperBillViewmodel.prototype, "insurance_name", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsString)()
        //@IsNotEmpty()
        ,
        __metadata("design:type", Object)
    ], UpdateSuperBillViewmodel.prototype, "insurance_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)()
        //@IsDefined()
        ,
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], UpdateSuperBillViewmodel.prototype, "referring_provider_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)()
        //@IsDefined()
        ,
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], UpdateSuperBillViewmodel.prototype, "rendering_provider_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)()
        //@IsDefined()
        ,
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], UpdateSuperBillViewmodel.prototype, "billing_provider_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)()
        //@IsDefined()
        ,
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsDateString)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdateSuperBillViewmodel.prototype, "fromDate", void 0);
    __decorate([
        (0, class_transformer_1.Expose)()
        //@IsDefined()
        ,
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsDateString)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdateSuperBillViewmodel.prototype, "toDate", void 0);
    __decorate([
        (0, class_transformer_1.Expose)()
        //@IsDefined()
        ,
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", Number)
    ], UpdateSuperBillViewmodel.prototype, "duration", void 0);
    __decorate([
        (0, class_transformer_1.Expose)()
        //@IsDefined()
        ,
        (0, class_transformer_1.Type)(function () { return String; })
        // @IsMongoId()
        ,
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdateSuperBillViewmodel.prototype, "type_of_service", void 0);
    __decorate([
        (0, class_transformer_1.Expose)()
        //@IsDefined()
        ,
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], UpdateSuperBillViewmodel.prototype, "place_of_service", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ArrayNotEmpty)(),
        (0, class_validator_1.ValidateNested)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Type)(function () { return add_super_bill_viewmodel_1.CPT; }),
        __metadata("design:type", Array)
    ], UpdateSuperBillViewmodel.prototype, "cpt", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ArrayNotEmpty)(),
        (0, class_validator_1.IsMongoId)({ each: true })
        //@IsDefined()
        ,
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Array)
    ], UpdateSuperBillViewmodel.prototype, "icd", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsOptional)()
        // @IsNotEmpty()
        ,
        __metadata("design:type", Object)
    ], UpdateSuperBillViewmodel.prototype, "financial_class_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Number)
    ], UpdateSuperBillViewmodel.prototype, "total_amount", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Boolean; }),
        (0, class_validator_1.IsOptional)()
        // @IsNotEmpty()
        ,
        __metadata("design:type", Boolean)
    ], UpdateSuperBillViewmodel.prototype, "responsible_party", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Boolean; }),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Boolean)
    ], UpdateSuperBillViewmodel.prototype, "accept_assignment", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Boolean; }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Boolean)
    ], UpdateSuperBillViewmodel.prototype, "received_cash", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdateSuperBillViewmodel.prototype, "cheque_number", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdateSuperBillViewmodel.prototype, "notes", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", String)
    ], UpdateSuperBillViewmodel.prototype, "assignedStatus", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", add_super_bill_viewmodel_1.ClaimStatusObjectViewmodel)
    ], UpdateSuperBillViewmodel.prototype, "ClaimStatusObject", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Boolean; }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Boolean)
    ], UpdateSuperBillViewmodel.prototype, "marked_as_printed", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], UpdateSuperBillViewmodel.prototype, "coverage", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Object)
    ], UpdateSuperBillViewmodel.prototype, "insurance", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Object)
    ], UpdateSuperBillViewmodel.prototype, "copay", void 0);
    return UpdateSuperBillViewmodel;
}());
exports.UpdateSuperBillViewmodel = UpdateSuperBillViewmodel;
