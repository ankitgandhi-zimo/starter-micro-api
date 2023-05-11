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
exports.AddSuperBillViewmodel = exports.LinkedICDS = exports.ICD = exports.CPT = exports.ClaimStatusObjectViewmodel = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var super_bill_model_1 = require("../../models/super_bill.model");
var ClaimStatusObjectViewmodel = /** @class */ (function () {
    function ClaimStatusObjectViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", String)
    ], ClaimStatusObjectViewmodel.prototype, "claimStatus", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", String)
    ], ClaimStatusObjectViewmodel.prototype, "submitDate", void 0);
    return ClaimStatusObjectViewmodel;
}());
exports.ClaimStatusObjectViewmodel = ClaimStatusObjectViewmodel;
var CPT = /** @class */ (function () {
    function CPT() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], CPT.prototype, "cpt_code_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Number)
    ], CPT.prototype, "unit", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.IsDefined)()
        //@IsMongoId()
        ,
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CPT.prototype, "modifier", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsArray)(),
        (0, class_transformer_1.Type)(function () { return Number; })
        //@IsNotEmpty()
        ,
        __metadata("design:type", Array)
    ], CPT.prototype, "icd", void 0);
    return CPT;
}());
exports.CPT = CPT;
//CPT HAS MULTIPLE ICDS
var ICD = /** @class */ (function () {
    function ICD() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        __metadata("design:type", Object)
    ], ICD.prototype, "icd_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], ICD.prototype, "icdCode", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], ICD.prototype, "description", void 0);
    return ICD;
}());
exports.ICD = ICD;
var LinkedICDS = /** @class */ (function () {
    function LinkedICDS() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsArray)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Array)
    ], LinkedICDS.prototype, "icd", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Number)
    ], LinkedICDS.prototype, "pos", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Number)
    ], LinkedICDS.prototype, "quantity", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Number)
    ], LinkedICDS.prototype, "charges", void 0);
    return LinkedICDS;
}());
exports.LinkedICDS = LinkedICDS;
// export class ProviderDetails {
// }
var AddSuperBillViewmodel = /** @class */ (function () {
    function AddSuperBillViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsEnum)(super_bill_model_1.BillStatus, {
            message: "Status can only be quickSave, quickSaveSignOff, linkAndSave, linkSaveSignOff or noLinkSave",
        }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddSuperBillViewmodel.prototype, "status", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], AddSuperBillViewmodel.prototype, "patient_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], AddSuperBillViewmodel.prototype, "appointment_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], AddSuperBillViewmodel.prototype, "clinic_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], AddSuperBillViewmodel.prototype, "location_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; })
        //@IsDefined()
        //@IsMongoId()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddSuperBillViewmodel.prototype, "payer_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddSuperBillViewmodel.prototype, "responsible_party_name", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddSuperBillViewmodel.prototype, "insurance_name", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)()
        //@IsDefined()
        ,
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], AddSuperBillViewmodel.prototype, "insurance_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], AddSuperBillViewmodel.prototype, "referring_provider_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], AddSuperBillViewmodel.prototype, "rendering_provider_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], AddSuperBillViewmodel.prototype, "billing_provider_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsDateString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddSuperBillViewmodel.prototype, "fromDate", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsDateString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddSuperBillViewmodel.prototype, "toDate", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Number)
    ], AddSuperBillViewmodel.prototype, "duration", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddSuperBillViewmodel.prototype, "type_of_service", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddSuperBillViewmodel.prototype, "place_of_service", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ArrayNotEmpty)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.ValidateNested)(),
        (0, class_transformer_1.Type)(function () { return CPT; }),
        __metadata("design:type", Array)
    ], AddSuperBillViewmodel.prototype, "cpt", void 0);
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
    ], AddSuperBillViewmodel.prototype, "icd", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)()
        ///@IsNotEmpty()
        ,
        __metadata("design:type", Object)
    ], AddSuperBillViewmodel.prototype, "financial_class_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Number)
    ], AddSuperBillViewmodel.prototype, "total_amount", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Boolean; }),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Boolean)
    ], AddSuperBillViewmodel.prototype, "responsible_party", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Boolean; }),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Boolean)
    ], AddSuperBillViewmodel.prototype, "accept_assignment", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Boolean; }),
        (0, class_validator_1.IsOptional)()
        //@IsNotEmpty()
        ,
        __metadata("design:type", Boolean)
    ], AddSuperBillViewmodel.prototype, "received_cash", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddSuperBillViewmodel.prototype, "notes", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsDefined()
        ,
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddSuperBillViewmodel.prototype, "createdby_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", String)
    ], AddSuperBillViewmodel.prototype, "assignedStatus", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], AddSuperBillViewmodel.prototype, "coverage", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Object)
    ], AddSuperBillViewmodel.prototype, "insurance", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Object)
    ], AddSuperBillViewmodel.prototype, "copay", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", ClaimStatusObjectViewmodel)
    ], AddSuperBillViewmodel.prototype, "ClaimStatusObject", void 0);
    return AddSuperBillViewmodel;
}());
exports.AddSuperBillViewmodel = AddSuperBillViewmodel;
