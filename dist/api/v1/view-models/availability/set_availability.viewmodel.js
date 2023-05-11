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
exports.SetAvailabilityViewmodel = exports.AvailableSlots = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var appointment_model_1 = require("../../models/appointment.model");
var get_time_slots_viewmodel_1 = require("./get_time_slots.viewmodel");
var AvailableSlots = /** @class */ (function () {
    function AvailableSlots() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", typegoose_1.mongoose.Schema.Types.ObjectId)
    ], AvailableSlots.prototype, "apptType_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return get_time_slots_viewmodel_1.SelectedDaysofWeekArr; }),
        (0, class_validator_1.IsArray)()
        //@ValidateNested()
        ,
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Array)
    ], AvailableSlots.prototype, "selectedDaysofWeekArr", void 0);
    return AvailableSlots;
}());
exports.AvailableSlots = AvailableSlots;
var SetAvailabilityViewmodel = /** @class */ (function () {
    function SetAvailabilityViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], SetAvailabilityViewmodel.prototype, "startDate", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], SetAvailabilityViewmodel.prototype, "endDate", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsMongoId()
        ,
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], SetAvailabilityViewmodel.prototype, "timezone", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", typegoose_1.mongoose.Schema.Types.ObjectId)
    ], SetAvailabilityViewmodel.prototype, "doctor_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", typegoose_1.mongoose.Schema.Types.ObjectId)
    ], SetAvailabilityViewmodel.prototype, "clinic_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", typegoose_1.mongoose.Schema.Types.ObjectId)
    ], SetAvailabilityViewmodel.prototype, "location", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return get_time_slots_viewmodel_1.SelectedDaysofWeekArr; }),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Array)
    ], SetAvailabilityViewmodel.prototype, "week", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", typegoose_1.mongoose.Schema.Types.ObjectId)
    ], SetAvailabilityViewmodel.prototype, "setby_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return AvailableSlots; }),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Array)
    ], SetAvailabilityViewmodel.prototype, "availableSlots", void 0);
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
    ], SetAvailabilityViewmodel.prototype, "visitType", void 0);
    return SetAvailabilityViewmodel;
}());
exports.SetAvailabilityViewmodel = SetAvailabilityViewmodel;
