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
exports.AddFilledProgressNoteViewmodel = exports.CodeObject = exports.FieldData = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var FieldData = /** @class */ (function () {
    function FieldData() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsDefined()
        ,
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], FieldData.prototype, "id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)()
        // @Type(() => String)
        // @IsString()
        // @IsDefined()
        // @MaxLength(30)
        // @IsNotEmpty()
        ,
        __metadata("design:type", Object)
    ], FieldData.prototype, "value", void 0);
    return FieldData;
}());
exports.FieldData = FieldData;
var CodeObject = /** @class */ (function () {
    function CodeObject() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsArray)()
        //@IsDefined()
        //@IsMongoId()
        ,
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Array)
    ], CodeObject.prototype, "ICD_10", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsArray)()
        //@IsDefined()
        //@IsMongoId()
        ,
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Array)
    ], CodeObject.prototype, "cptCode", void 0);
    return CodeObject;
}());
exports.CodeObject = CodeObject;
var AddFilledProgressNoteViewmodel = /** @class */ (function () {
    function AddFilledProgressNoteViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)()
        //@IsObject()
        // @IsDefined()
        ,
        (0, class_validator_1.ValidateNested)(),
        (0, class_transformer_1.Type)(function () { return FieldData; }),
        __metadata("design:type", Array)
    ], AddFilledProgressNoteViewmodel.prototype, "field_data", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddFilledProgressNoteViewmodel.prototype, "treatment_goal", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddFilledProgressNoteViewmodel.prototype, "session_narrative", void 0);
    __decorate([
        (0, class_transformer_1.Expose)()
        //@IsObject()
        //@IsDefined()
        ,
        (0, class_validator_1.ValidateNested)(),
        (0, class_transformer_1.Type)(function () { return CodeObject; }),
        __metadata("design:type", CodeObject)
    ], AddFilledProgressNoteViewmodel.prototype, "codes", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsDefined()
        ,
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddFilledProgressNoteViewmodel.prototype, "createdby_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddFilledProgressNoteViewmodel.prototype, "clinic_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddFilledProgressNoteViewmodel.prototype, "doctor_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddFilledProgressNoteViewmodel.prototype, "treatmentPlan_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddFilledProgressNoteViewmodel.prototype, "progressNote_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddFilledProgressNoteViewmodel.prototype, "patient_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddFilledProgressNoteViewmodel.prototype, "appointment_id", void 0);
    return AddFilledProgressNoteViewmodel;
}());
exports.AddFilledProgressNoteViewmodel = AddFilledProgressNoteViewmodel;
