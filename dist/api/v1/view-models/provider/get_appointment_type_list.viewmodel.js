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
exports.GetAppointmentTypeListViewmodel = exports.SelectedDayObject = exports.ArrayOfTiming = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var ArrayOfTiming = /** @class */ (function () {
    function ArrayOfTiming() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsDateString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        __metadata("design:type", String)
    ], ArrayOfTiming.prototype, "startTime", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsDateString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        __metadata("design:type", String)
    ], ArrayOfTiming.prototype, "endTime", void 0);
    return ArrayOfTiming;
}());
exports.ArrayOfTiming = ArrayOfTiming;
var SelectedDayObject = /** @class */ (function () {
    function SelectedDayObject() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        __metadata("design:type", Number)
    ], SelectedDayObject.prototype, "id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        __metadata("design:type", String)
    ], SelectedDayObject.prototype, "name", void 0);
    __decorate([
        (0, class_validator_1.IsDefined)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Boolean; }),
        __metadata("design:type", Boolean)
    ], SelectedDayObject.prototype, "isChecked", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ValidateNested)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return ArrayOfTiming; }),
        __metadata("design:type", Array)
    ], SelectedDayObject.prototype, "arrayOfTimings", void 0);
    return SelectedDayObject;
}());
exports.SelectedDayObject = SelectedDayObject;
var GetAppointmentTypeListViewmodel = /** @class */ (function () {
    function GetAppointmentTypeListViewmodel() {
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        __metadata("design:type", Number)
    ], GetAppointmentTypeListViewmodel.prototype, "pageNumber", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], GetAppointmentTypeListViewmodel.prototype, "_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], GetAppointmentTypeListViewmodel.prototype, "clinic_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        __metadata("design:type", Number)
    ], GetAppointmentTypeListViewmodel.prototype, "pageSize", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        __metadata("design:type", String)
    ], GetAppointmentTypeListViewmodel.prototype, "search", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Boolean; }),
        __metadata("design:type", Boolean)
    ], GetAppointmentTypeListViewmodel.prototype, "isDeleted", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Boolean; }),
        __metadata("design:type", Boolean)
    ], GetAppointmentTypeListViewmodel.prototype, "isActive", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsArray)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return SelectedDayObject; }),
        __metadata("design:type", Array)
    ], GetAppointmentTypeListViewmodel.prototype, "selectedDaysofWeekArr", void 0);
    return GetAppointmentTypeListViewmodel;
}());
exports.GetAppointmentTypeListViewmodel = GetAppointmentTypeListViewmodel;