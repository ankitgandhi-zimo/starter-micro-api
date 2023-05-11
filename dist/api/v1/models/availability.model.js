"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Availability = exports.AvailableDays = exports.AvailableSlots = exports.ArrayOfTimings = exports.SelectedDays = exports.DaysName = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var mongoose_1 = __importDefault(require("mongoose"));
var pagination_configuration_1 = require("../common/pagination/pagination_configuration");
var appointment_model_1 = require("./appointment.model");
var clinic_model_1 = require("./clinic.model");
var doctor_model_1 = require("./doctor.model");
var location_model_1 = require("./location.model");
var timezone_model_1 = require("./timezone.model");
var user_model_1 = require("./user.model");
var DaysName;
(function (DaysName) {
    DaysName["Sunday"] = "Sunday";
    DaysName["Monday"] = "Monday";
    DaysName["Tuesday"] = "Tuesday";
    DaysName["Wednesday"] = "Wednesday";
    DaysName["Thursday"] = "Thursday";
    DaysName["Friday"] = "Friday";
    DaysName["Saturday"] = "Saturday";
})(DaysName = exports.DaysName || (exports.DaysName = {}));
var SelectedDays = /** @class */ (function () {
    function SelectedDays() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], SelectedDays.prototype, "id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ enum: DaysName }),
        __metadata("design:type", String)
    ], SelectedDays.prototype, "name", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number }),
        __metadata("design:type", Array)
    ], SelectedDays.prototype, "unselectedSlots", void 0);
    return SelectedDays;
}());
exports.SelectedDays = SelectedDays;
var ArrayOfTimings = /** @class */ (function () {
    function ArrayOfTimings() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: Date }),
        __metadata("design:type", String)
    ], ArrayOfTimings.prototype, "startTime", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date }),
        __metadata("design:type", String)
    ], ArrayOfTimings.prototype, "endTime", void 0);
    return ArrayOfTimings;
}());
exports.ArrayOfTimings = ArrayOfTimings;
var AvailableSlots = /** @class */ (function () {
    function AvailableSlots() {
    }
    __decorate([
        (0, typegoose_1.prop)({
            ref: location_model_1.ClinicLocation,
            type: mongoose_1.default.Types.ObjectId,
        }),
        __metadata("design:type", Object)
    ], AvailableSlots.prototype, "apptType_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: SelectedDays }),
        __metadata("design:type", Array)
    ], AvailableSlots.prototype, "selectedDays", void 0);
    return AvailableSlots;
}());
exports.AvailableSlots = AvailableSlots;
var AvailableDays = /** @class */ (function () {
    function AvailableDays() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], AvailableDays.prototype, "id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "Sunday" }),
        __metadata("design:type", String)
    ], AvailableDays.prototype, "name", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], AvailableDays.prototype, "isChecked", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: ArrayOfTimings }),
        __metadata("design:type", Array)
    ], AvailableDays.prototype, "arrayOfTimings", void 0);
    return AvailableDays;
}());
exports.AvailableDays = AvailableDays;
var Availability = /** @class */ (function (_super) {
    __extends(Availability, _super);
    function Availability() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ type: Date }),
        __metadata("design:type", Date)
    ], Availability.prototype, "toDateTime", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date }),
        __metadata("design:type", Date)
    ], Availability.prototype, "fromDateTime", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: timezone_model_1.Timezone, type: mongoose_1.default.Types.ObjectId }),
        __metadata("design:type", Object)
    ], Availability.prototype, "timezone", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User, type: mongoose_1.default.Types.ObjectId }),
        __metadata("design:type", Object)
    ], Availability.prototype, "setby_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: doctor_model_1.Doctor, type: mongoose_1.default.Types.ObjectId }),
        __metadata("design:type", Object)
    ], Availability.prototype, "doctor_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: clinic_model_1.Clinic, type: mongoose_1.default.Types.ObjectId }),
        __metadata("design:type", Object)
    ], Availability.prototype, "clinic_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            ref: location_model_1.ClinicLocation,
            type: mongoose_1.default.Types.ObjectId,
        }),
        __metadata("design:type", Object)
    ], Availability.prototype, "location", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: AvailableDays }),
        __metadata("design:type", Array)
    ], Availability.prototype, "available_days", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: AvailableSlots }),
        __metadata("design:type", Array)
    ], Availability.prototype, "availableSlots", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: appointment_model_1.EVisitTypeValues,
            type: String,
            default: appointment_model_1.EVisitTypeValues.PHYSICAL,
        }),
        __metadata("design:type", String)
    ], Availability.prototype, "visitType", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], Availability.prototype, "isDeleted", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: true }),
        __metadata("design:type", Boolean)
    ], Availability.prototype, "isActive", void 0);
    return Availability;
}(pagination_configuration_1.PaginatedModel));
exports.Availability = Availability;
var AVAILABILITY_DB_MODEL = (0, typegoose_1.getModelForClass)(Availability, {
    schemaOptions: {
        collection: "availabilities",
        timestamps: true,
    },
});
exports.default = AVAILABILITY_DB_MODEL;
