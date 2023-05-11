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
exports.GetSuperBillListViewmodel = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var GetSuperBillListViewmodel = /** @class */ (function () {
    function GetSuperBillListViewmodel() {
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        (0, class_transformer_1.Type)(function () { return Number; }),
        __metadata("design:type", Number)
    ], GetSuperBillListViewmodel.prototype, "pageNumber", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        (0, class_transformer_1.Type)(function () { return Number; }),
        __metadata("design:type", Number)
    ], GetSuperBillListViewmodel.prototype, "pageSize", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        __metadata("design:type", String)
    ], GetSuperBillListViewmodel.prototype, "search", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        __metadata("design:type", String)
    ], GetSuperBillListViewmodel.prototype, "isActive", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsString)()
        //@IsDefined()
        // @IsNotEmpty()
        ,
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        __metadata("design:type", Object)
    ], GetSuperBillListViewmodel.prototype, "clinic_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsString)()
        //@IsDefined()
        // @IsNotEmpty()
        ,
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        __metadata("design:type", Object)
    ], GetSuperBillListViewmodel.prototype, "cpt", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsString)()
        //@IsDefined()
        // @IsNotEmpty()
        ,
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        __metadata("design:type", Object)
    ], GetSuperBillListViewmodel.prototype, "icd", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; })
        //@IsString()
        //@IsDefined()
        // @IsEnum(EVisitTypeValues, {
        //   message: "visitType value must be from one of them i.e Physical,Tele-Call",
        // })
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], GetSuperBillListViewmodel.prototype, "visitType", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; })
        //@IsMongoId()
        //@IsDefined()
        //@IsNotEmpty()
        ,
        __metadata("design:type", Object)
    ], GetSuperBillListViewmodel.prototype, "location_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        __metadata("design:type", typegoose_1.mongoose.Types.ObjectId)
    ], GetSuperBillListViewmodel.prototype, "patient_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)()
        //@IsMongoId()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        __metadata("design:type", Object)
    ], GetSuperBillListViewmodel.prototype, "billing_provider_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)()
        //@IsMongoId()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        __metadata("design:type", Object)
    ], GetSuperBillListViewmodel.prototype, "rendering_provider_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)()
        //@IsMongoId()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        __metadata("design:type", Object)
    ], GetSuperBillListViewmodel.prototype, "referring_provider_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        __metadata("design:type", Object)
    ], GetSuperBillListViewmodel.prototype, "case_type", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)()
        // @Type(() => Date)
        // @IsDate()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], GetSuperBillListViewmodel.prototype, "startDateTime", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)()
        // @Type(() => Date)
        // @IsDate()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], GetSuperBillListViewmodel.prototype, "endDateTime", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", String)
    ], GetSuperBillListViewmodel.prototype, "charge_startDateTime", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", String)
    ], GetSuperBillListViewmodel.prototype, "charge_endDateTime", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", String)
    ], GetSuperBillListViewmodel.prototype, "insurance_plan_type", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", String)
    ], GetSuperBillListViewmodel.prototype, "insurance_coverage", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", String)
    ], GetSuperBillListViewmodel.prototype, "insurance_type", void 0);
    return GetSuperBillListViewmodel;
}());
exports.GetSuperBillListViewmodel = GetSuperBillListViewmodel;
