"use strict";
/**
 * ? *********         NOTE         **************
 *
 *  When Clinic book appointment createdby_id == clinic_id
 *  When Patient book appointment createdby_id == patient_id
 *  When Sub Admin book appointment createdby_id == Sub admin _id
 *  When Super Admin book appointment createdby_id == Super admin _id
 *
 *            ALSO
 *  A doctor book appointment with himself in case if he/she is on holiday
 *  By doing this he will no longer visible available to patients
 *
 *  And when Doctor book appointment createdby_id == doctor_id
 */
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
exports.Appointment = exports.EStatusValues = exports.ERescheduleTypeFeildValues = exports.EPermissionValues = exports.EVisitTypeValues = exports.EBoolValues = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var mongoose_1 = __importDefault(require("mongoose"));
var pagination_configuration_1 = require("../common/pagination/pagination_configuration");
var appointment_types_model_1 = require("./appointment_types.model");
var clinic_model_1 = require("./clinic.model");
var doctor_model_1 = require("./doctor.model");
var user_model_1 = require("./user.model");
var EBoolValues;
(function (EBoolValues) {
    EBoolValues["TRUE"] = "true";
    EBoolValues["FALSE"] = "false";
})(EBoolValues = exports.EBoolValues || (exports.EBoolValues = {}));
var EVisitTypeValues;
(function (EVisitTypeValues) {
    EVisitTypeValues["PHYSICAL"] = "Physical";
    EVisitTypeValues["TELECALL"] = "Tele-Call";
})(EVisitTypeValues = exports.EVisitTypeValues || (exports.EVisitTypeValues = {}));
var EPermissionValues;
(function (EPermissionValues) {
    EPermissionValues["AVAILABILITY"] = "AVAILABILITY";
    EPermissionValues["SCHEDULER"] = "SCHEDULER";
    EPermissionValues["NOTES"] = "NOTES";
    EPermissionValues["SOAPNOTES"] = "SOAPNOTES";
    EPermissionValues["TREATMENTPLAN"] = "TREATMENTPLAN";
})(EPermissionValues = exports.EPermissionValues || (exports.EPermissionValues = {}));
var ERescheduleTypeFeildValues;
(function (ERescheduleTypeFeildValues) {
    ERescheduleTypeFeildValues["CLINIC"] = "CLINIC";
    ERescheduleTypeFeildValues["PATIENT"] = "PATIENT";
    ERescheduleTypeFeildValues["SUPERADMIN"] = "SUPER ADMIN";
})(ERescheduleTypeFeildValues = exports.ERescheduleTypeFeildValues || (exports.ERescheduleTypeFeildValues = {}));
var EStatusValues;
(function (EStatusValues) {
    EStatusValues["ACCEPTED"] = "Accepted";
    EStatusValues["PENDING"] = "Pending";
    EStatusValues["RESCHEDULED"] = "Rescheduled";
    EStatusValues["UNAVAILABILITY"] = "Unavailability";
    EStatusValues["CANCELLED"] = "Cancelled";
    EStatusValues["DECLINED"] = "Declined";
    EStatusValues["CHECKOUT"] = "Checkout";
})(EStatusValues = exports.EStatusValues || (exports.EStatusValues = {}));
var EmailStatusObject = /** @class */ (function () {
    function EmailStatusObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], EmailStatusObject.prototype, "before_30_min", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], EmailStatusObject.prototype, "before_24_hrs", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], EmailStatusObject.prototype, "name", void 0);
    __decorate([
        (0, typegoose_1.prop)({ enum: EPermissionValues }),
        __metadata("design:type", String)
    ], EmailStatusObject.prototype, "key", void 0);
    return EmailStatusObject;
}());
var RescheduleObject = /** @class */ (function () {
    function RescheduleObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: null }),
        __metadata("design:type", String)
    ], RescheduleObject.prototype, "endDateTime", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: null }),
        __metadata("design:type", String)
    ], RescheduleObject.prototype, "responseTime", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: null }),
        __metadata("design:type", String)
    ], RescheduleObject.prototype, "startDateTime", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: null }),
        __metadata("design:type", String)
    ], RescheduleObject.prototype, "rescheduleTime", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: ERescheduleTypeFeildValues,
            type: String,
            default: null,
        }),
        __metadata("design:type", String)
    ], RescheduleObject.prototype, "type", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User, default: null }),
        __metadata("design:type", Object)
    ], RescheduleObject.prototype, "rescheduleby_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User, default: null }),
        __metadata("design:type", Object)
    ], RescheduleObject.prototype, "responseby_id", void 0);
    return RescheduleObject;
}());
var CallDataObject = /** @class */ (function () {
    function CallDataObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], CallDataObject.prototype, "password", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], CallDataObject.prototype, "join_url", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], CallDataObject.prototype, "start_url", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], CallDataObject.prototype, "meetingNumber", void 0);
    return CallDataObject;
}());
var AcceptedObject = /** @class */ (function () {
    function AcceptedObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User, default: null }),
        __metadata("design:type", Object)
    ], AcceptedObject.prototype, "user_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: null }),
        __metadata("design:type", String)
    ], AcceptedObject.prototype, "time", void 0);
    return AcceptedObject;
}());
var DeclinedObject = /** @class */ (function () {
    function DeclinedObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ ref: "User", default: null }),
        __metadata("design:type", Object)
    ], DeclinedObject.prototype, "user_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: null }),
        __metadata("design:type", String)
    ], DeclinedObject.prototype, "time", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], DeclinedObject.prototype, "reason", void 0);
    return DeclinedObject;
}());
var RecurringObject = /** @class */ (function () {
    function RecurringObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], RecurringObject.prototype, "number", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], RecurringObject.prototype, "status", void 0);
    return RecurringObject;
}());
var Appointment = /** @class */ (function (_super) {
    __extends(Appointment, _super);
    function Appointment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "Booked" }),
        __metadata("design:type", String)
    ], Appointment.prototype, "title", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], Appointment.prototype, "duration", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Appointment.prototype, "document", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date }),
        __metadata("design:type", String)
    ], Appointment.prototype, "startDateTime", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date }),
        __metadata("design:type", String)
    ], Appointment.prototype, "endDateTime", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Appointment.prototype, "description", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], Appointment.prototype, "isDeleted", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], Appointment.prototype, "isEmergency", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }) // there will be no appointment type in case of unavailability( if multi patient true hai type me to check)
        ,
        __metadata("design:type", String)
    ], Appointment.prototype, "appointment_type", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }) // this  appointment number and group id same if multi option true in app type 02-01-2023 GG
        ,
        __metadata("design:type", String)
    ], Appointment.prototype, "groupId", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Appointment.prototype, "appointment_number", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "User" }),
        __metadata("design:type", Object)
    ], Appointment.prototype, "createdby_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ default: null }),
        __metadata("design:type", EmailStatusObject)
    ], Appointment.prototype, "emailStatus", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: clinic_model_1.Clinic, type: mongoose_1.default.Types.ObjectId }),
        __metadata("design:type", Object)
    ], Appointment.prototype, "clinic_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: doctor_model_1.Doctor, type: mongoose_1.default.Types.ObjectId }),
        __metadata("design:type", Object)
    ], Appointment.prototype, "doctor_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "Patients", type: mongoose_1.default.Types.ObjectId }),
        __metadata("design:type", Object)
    ], Appointment.prototype, "patient_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            ref: "ClinicLocation",
            type: mongoose_1.default.Types.ObjectId,
        }),
        __metadata("design:type", Object)
    ], Appointment.prototype, "location_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: EVisitTypeValues,
            type: String,
            default: EVisitTypeValues.PHYSICAL,
        }),
        __metadata("design:type", String)
    ], Appointment.prototype, "visitType", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            ref: appointment_types_model_1.AppointmentType,
            type: mongoose_1.default.Types.ObjectId,
        }) // there will be no appointment type _id in case of unavailability
        ,
        __metadata("design:type", Object)
    ], Appointment.prototype, "appointmentType_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ default: null }),
        __metadata("design:type", Object)
    ], Appointment.prototype, "reschedule", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: EStatusValues,
            type: String,
            default: EStatusValues.ACCEPTED,
        }),
        __metadata("design:type", String)
    ], Appointment.prototype, "status", void 0);
    __decorate([
        (0, typegoose_1.prop)({ default: null }),
        __metadata("design:type", Object)
    ], Appointment.prototype, "callData", void 0);
    __decorate([
        (0, typegoose_1.prop)({ default: null }),
        __metadata("design:type", Object)
    ], Appointment.prototype, "accepted", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: DeclinedObject, default: null }),
        __metadata("design:type", Object)
    ], Appointment.prototype, "declined", void 0);
    __decorate([
        (0, typegoose_1.prop)({ default: null }),
        __metadata("design:type", Object)
    ], Appointment.prototype, "deleted", void 0);
    __decorate([
        (0, typegoose_1.prop)({ default: null }),
        __metadata("design:type", Object)
    ], Appointment.prototype, "recurring", void 0);
    Appointment = __decorate([
        (0, typegoose_1.index)({ title: "text" })
    ], Appointment);
    return Appointment;
}(pagination_configuration_1.PaginatedModel));
exports.Appointment = Appointment;
var APPOINTMENT_DB_MODEL = (0, typegoose_1.getModelForClass)(Appointment, {
    schemaOptions: {
        collection: "appointment",
        timestamps: true,
    },
});
exports.default = APPOINTMENT_DB_MODEL;
