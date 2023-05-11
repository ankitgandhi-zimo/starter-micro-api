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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRescheduleAppointmentViewmodel = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var mongoose_1 = __importDefault(require("mongoose"));
var add_appointment_viewmodel_1 = require("../add_appointment.viewmodel");
var AddRescheduleAppointmentViewmodel = /** @class */ (function () {
    function AddRescheduleAppointmentViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return mongoose_1.default.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", mongoose_1.default.Types.ObjectId)
    ], AddRescheduleAppointmentViewmodel.prototype, "doctor_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; }),
        (0, class_validator_1.IsDate)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddRescheduleAppointmentViewmodel.prototype, "endDateTime", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; }),
        (0, class_validator_1.IsDate)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddRescheduleAppointmentViewmodel.prototype, "nowTime", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; }),
        (0, class_validator_1.IsDate)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddRescheduleAppointmentViewmodel.prototype, "startDateTime", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return mongoose_1.default.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", mongoose_1.default.Types.ObjectId)
    ], AddRescheduleAppointmentViewmodel.prototype, "appointment_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.ValidateNested)(),
        (0, class_transformer_1.Type)(function () { return add_appointment_viewmodel_1.RescheduleObjectViewmodel; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", add_appointment_viewmodel_1.RescheduleObjectViewmodel)
    ], AddRescheduleAppointmentViewmodel.prototype, "reschedule", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddRescheduleAppointmentViewmodel.prototype, "description", void 0);
    return AddRescheduleAppointmentViewmodel;
}());
exports.AddRescheduleAppointmentViewmodel = AddRescheduleAppointmentViewmodel;
