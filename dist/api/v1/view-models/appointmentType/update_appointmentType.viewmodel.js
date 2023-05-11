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
exports.UpdateAppointmentTypeViewmodel = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var user_model_1 = require("../../models/user.model");
var UpdateAppointmentTypeViewmodel = /** @class */ (function () {
    function UpdateAppointmentTypeViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdateAppointmentTypeViewmodel.prototype, "_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdateAppointmentTypeViewmodel.prototype, "type", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdateAppointmentTypeViewmodel.prototype, "color", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_validator_1.IsInt)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Number)
    ], UpdateAppointmentTypeViewmodel.prototype, "duration", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsEnum)(user_model_1.EBoolValues, {
            message: "isMultiPatient value must be boolean type i.e true or false",
        })
        //@IsString()
        ,
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", Boolean)
    ], UpdateAppointmentTypeViewmodel.prototype, "isMultiPatient", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_validator_1.IsInt)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Number)
    ], UpdateAppointmentTypeViewmodel.prototype, "number_of_patients", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsEnum)(user_model_1.EBoolValues, {
            message: "isActive value must be boolean type i.e true or false",
        })
        //@IsString()
        ,
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Boolean)
    ], UpdateAppointmentTypeViewmodel.prototype, "isActive", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsEnum)(user_model_1.EBoolValues, {
            message: "isDeleted value must be boolean type i.e true or false",
        })
        //@IsString()
        ,
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Boolean)
    ], UpdateAppointmentTypeViewmodel.prototype, "isDeleted", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdateAppointmentTypeViewmodel.prototype, "clinic_id", void 0);
    return UpdateAppointmentTypeViewmodel;
}());
exports.UpdateAppointmentTypeViewmodel = UpdateAppointmentTypeViewmodel;
