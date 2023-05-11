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
exports.AddAppointmentViewmodel = exports.RescheduleObjectViewmodel = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var mongoose_1 = __importDefault(require("mongoose"));
var appointment_model_1 = require("../../models/appointment.model");
var EmailStatusObjectViewmodel = /** @class */ (function () {
    function EmailStatusObjectViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsEnum)(appointment_model_1.EBoolValues, {
            message: "before_30_min value must be boolean type i.e true or false",
        }),
        __metadata("design:type", Boolean)
    ], EmailStatusObjectViewmodel.prototype, "before_30_min", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsEnum)(appointment_model_1.EBoolValues, {
            message: "before_24_hrs value must be boolean type i.e true or false",
        }),
        __metadata("design:type", Boolean)
    ], EmailStatusObjectViewmodel.prototype, "before_24_hrs", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], EmailStatusObjectViewmodel.prototype, "name", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsEnum)(appointment_model_1.EPermissionValues, {
            message: "key value must be from on of them  i.e AVAILABILITY,SCHEDULER,NOTES,SOAPNOTES,TREATMENTPLAN",
        }),
        __metadata("design:type", String)
    ], EmailStatusObjectViewmodel.prototype, "key", void 0);
    return EmailStatusObjectViewmodel;
}());
var RescheduleObjectViewmodel = /** @class */ (function () {
    function RescheduleObjectViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsEnum)(appointment_model_1.ERescheduleTypeFeildValues, {
            message: "type value must be from one of them i.e  CLINIC,PATIENT",
        }),
        __metadata("design:type", String)
    ], RescheduleObjectViewmodel.prototype, "type", void 0);
    return RescheduleObjectViewmodel;
}());
exports.RescheduleObjectViewmodel = RescheduleObjectViewmodel;
var CallDataObjectViewmodel = /** @class */ (function () {
    function CallDataObjectViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CallDataObjectViewmodel.prototype, "password", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CallDataObjectViewmodel.prototype, "join_url", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CallDataObjectViewmodel.prototype, "start_url", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CallDataObjectViewmodel.prototype, "meetingNumber", void 0);
    return CallDataObjectViewmodel;
}());
var AcceptedObjectViewmodel = /** @class */ (function () {
    function AcceptedObjectViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return mongoose_1.default.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], AcceptedObjectViewmodel.prototype, "user_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; }),
        (0, class_validator_1.IsDate)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AcceptedObjectViewmodel.prototype, "time", void 0);
    return AcceptedObjectViewmodel;
}());
var DeclinedObjectViewmodel = /** @class */ (function () {
    function DeclinedObjectViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return mongoose_1.default.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], DeclinedObjectViewmodel.prototype, "user_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; }),
        (0, class_validator_1.IsDate)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], DeclinedObjectViewmodel.prototype, "time", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], DeclinedObjectViewmodel.prototype, "reason", void 0);
    return DeclinedObjectViewmodel;
}());
var RecurringObjectViewmodel = /** @class */ (function () {
    function RecurringObjectViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], RecurringObjectViewmodel.prototype, "number", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsEnum)(appointment_model_1.EBoolValues, {
            message: "status value must be boolean type i.e true or false",
        }),
        __metadata("design:type", Boolean)
    ], RecurringObjectViewmodel.prototype, "status", void 0);
    return RecurringObjectViewmodel;
}());
var AddAppointmentViewmodel = /** @class */ (function () {
    function AddAppointmentViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)()
        // @Type(() => String)
        // @IsString()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddAppointmentViewmodel.prototype, "title", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Number)
    ], AddAppointmentViewmodel.prototype, "duration", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; }),
        (0, class_validator_1.IsDate)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddAppointmentViewmodel.prototype, "endDateTime", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Boolean)
    ], AddAppointmentViewmodel.prototype, "isDeleted", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; }),
        (0, class_validator_1.IsDate)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddAppointmentViewmodel.prototype, "startDateTime", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Boolean)
    ], AddAppointmentViewmodel.prototype, "isEmergency", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)() // there will be no appointment type in case of unavailability( if multi patient true hai type me to check)
        ,
        __metadata("design:type", String)
    ], AddAppointmentViewmodel.prototype, "appointment_type", void 0);
    __decorate([
        (0, class_transformer_1.Expose)()
        // @Type(() => String)
        // @IsString()
        // @IsDefined()
        // @IsNotEmpty() // this  appointment number and group id same if multi option true in app type 02-01-2023 GG
        ,
        __metadata("design:type", String)
    ], AddAppointmentViewmodel.prototype, "groupId", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", String)
    ], AddAppointmentViewmodel.prototype, "appointment_number", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Object)
    ], AddAppointmentViewmodel.prototype, "createdby_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return EmailStatusObjectViewmodel; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", EmailStatusObjectViewmodel)
    ], AddAppointmentViewmodel.prototype, "emailStatus", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return mongoose_1.default.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], AddAppointmentViewmodel.prototype, "clinic_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return mongoose_1.default.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], AddAppointmentViewmodel.prototype, "doctor_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ArrayNotEmpty)(),
        (0, class_validator_1.IsMongoId)({ each: true }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Array)
    ], AddAppointmentViewmodel.prototype, "patient_ids", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Object)
    ], AddAppointmentViewmodel.prototype, "patient_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return mongoose_1.default.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], AddAppointmentViewmodel.prototype, "location_id", void 0);
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
    ], AddAppointmentViewmodel.prototype, "visitType", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return mongoose_1.default.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], AddAppointmentViewmodel.prototype, "appointmentType_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return RescheduleObjectViewmodel; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], AddAppointmentViewmodel.prototype, "reschedule", void 0);
    __decorate([
        (0, class_transformer_1.Expose)()
        // @Type(() => String)
        // @IsString()
        // @IsDefined()
        // @IsEnum(EStatusValues, {
        //   message:
        //     "status value must be from one of them i.e  Accepted,Pending,Rescheduled,Unavailability,Cancelled,Declined,Checkout",
        // })
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddAppointmentViewmodel.prototype, "status", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsDefined()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddAppointmentViewmodel.prototype, "description", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsDefined()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], AddAppointmentViewmodel.prototype, "document", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return CallDataObjectViewmodel; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], AddAppointmentViewmodel.prototype, "callData", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return AcceptedObjectViewmodel; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], AddAppointmentViewmodel.prototype, "accepted", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return DeclinedObjectViewmodel; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], AddAppointmentViewmodel.prototype, "declined", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return AcceptedObjectViewmodel; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], AddAppointmentViewmodel.prototype, "deleted", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return RecurringObjectViewmodel; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], AddAppointmentViewmodel.prototype, "recurring", void 0);
    return AddAppointmentViewmodel;
}());
exports.AddAppointmentViewmodel = AddAppointmentViewmodel;
