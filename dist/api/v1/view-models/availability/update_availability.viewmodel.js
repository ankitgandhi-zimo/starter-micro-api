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
exports.UpdateAvailabilityViewmodel = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var appointment_model_1 = require("../../models/appointment.model");
var get_time_slots_viewmodel_1 = require("./get_time_slots.viewmodel");
var set_availability_viewmodel_1 = require("./set_availability.viewmodel");
var UpdateAvailabilityViewmodel = /** @class */ (function () {
    function UpdateAvailabilityViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", typegoose_1.mongoose.Schema.Types.ObjectId)
    ], UpdateAvailabilityViewmodel.prototype, "availability_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return get_time_slots_viewmodel_1.SelectedDaysofWeekArr; }),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Array)
    ], UpdateAvailabilityViewmodel.prototype, "week", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return set_availability_viewmodel_1.AvailableSlots; }),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Array)
    ], UpdateAvailabilityViewmodel.prototype, "availableSlots", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsDateString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdateAvailabilityViewmodel.prototype, "startDate", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsDateString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdateAvailabilityViewmodel.prototype, "endDate", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", typegoose_1.mongoose.Schema.Types.ObjectId)
    ], UpdateAvailabilityViewmodel.prototype, "timezone", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", typegoose_1.mongoose.Schema.Types.ObjectId)
    ], UpdateAvailabilityViewmodel.prototype, "doctor_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", typegoose_1.mongoose.Schema.Types.ObjectId)
    ], UpdateAvailabilityViewmodel.prototype, "location", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", typegoose_1.mongoose.Schema.Types.ObjectId)
    ], UpdateAvailabilityViewmodel.prototype, "clinic_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsEnum)(appointment_model_1.EVisitTypeValues, {
            message: "visitType value must be from one of them i.e Physical,Tele-Call",
        }),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdateAvailabilityViewmodel.prototype, "visitType", void 0);
    return UpdateAvailabilityViewmodel;
}());
exports.UpdateAvailabilityViewmodel = UpdateAvailabilityViewmodel;
