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
exports.Doctor = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var mongoose_1 = __importDefault(require("mongoose"));
var pagination_configuration_1 = require("../common/pagination/pagination_configuration");
var appointment_types_model_1 = require("./appointment_types.model");
var clinic_model_1 = require("./clinic.model");
var country_model_1 = require("./country.model");
var location_model_1 = require("./location.model");
var skill_model_1 = require("./skill.model");
var state_model_1 = require("./state.model");
var user_model_1 = require("./user.model");
var AdditionalSkillObject = /** @class */ (function () {
    function AdditionalSkillObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], AdditionalSkillObject.prototype, "name", void 0);
    return AdditionalSkillObject;
}());
var AwardsObject = /** @class */ (function () {
    function AwardsObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], AwardsObject.prototype, "name", void 0);
    return AwardsObject;
}());
var QualificationsObject = /** @class */ (function () {
    function QualificationsObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], QualificationsObject.prototype, "name", void 0);
    return QualificationsObject;
}());
var VideoCallCredentialObject = /** @class */ (function () {
    function VideoCallCredentialObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: null }),
        __metadata("design:type", Date)
    ], VideoCallCredentialObject.prototype, "lastUpdateOn", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], VideoCallCredentialObject.prototype, "status", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], VideoCallCredentialObject.prototype, "name", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], VideoCallCredentialObject.prototype, "email", void 0);
    return VideoCallCredentialObject;
}());
var NotesObj = /** @class */ (function () {
    function NotesObj() {
    }
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User, default: null }),
        __metadata("design:type", Object)
    ], NotesObj.prototype, "user_id", void 0);
    return NotesObj;
}());
var SkillObject = /** @class */ (function () {
    function SkillObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ ref: skill_model_1.Skill }) // need to change refrence with specialities
        ,
        __metadata("design:type", Object)
    ], SkillObject.prototype, "skill_id", void 0);
    return SkillObject;
}());
var PermissionsObj = /** @class */ (function () {
    function PermissionsObj() {
    }
    __decorate([
        (0, typegoose_1.prop)(),
        __metadata("design:type", Object)
    ], PermissionsObj.prototype, "notes", void 0);
    __decorate([
        (0, typegoose_1.prop)(),
        __metadata("design:type", Object)
    ], PermissionsObj.prototype, "schedular", void 0);
    __decorate([
        (0, typegoose_1.prop)(),
        __metadata("design:type", Object)
    ], PermissionsObj.prototype, "soapNotes", void 0);
    __decorate([
        (0, typegoose_1.prop)(),
        __metadata("design:type", Object)
    ], PermissionsObj.prototype, "availability", void 0);
    __decorate([
        (0, typegoose_1.prop)(),
        __metadata("design:type", Object)
    ], PermissionsObj.prototype, "treatmentPlan", void 0);
    return PermissionsObj;
}());
var EmergencyObject = /** @class */ (function () {
    function EmergencyObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], EmergencyObject.prototype, "name", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: null }),
        __metadata("design:type", Number)
    ], EmergencyObject.prototype, "mobile_no", void 0);
    return EmergencyObject;
}());
var MeetingModeObject = /** @class */ (function () {
    function MeetingModeObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: true }),
        __metadata("design:type", Boolean)
    ], MeetingModeObject.prototype, "virtual", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], MeetingModeObject.prototype, "physical", void 0);
    return MeetingModeObject;
}());
var SettingObject = /** @class */ (function () {
    function SettingObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: true }),
        __metadata("design:type", Boolean)
    ], SettingObject.prototype, "bookAppt", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], SettingObject.prototype, "newPatient", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: true }),
        __metadata("design:type", Boolean)
    ], SettingObject.prototype, "viewInsurance", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], SettingObject.prototype, "emergencyAppt", void 0);
    __decorate([
        (0, typegoose_1.prop)(),
        __metadata("design:type", MeetingModeObject)
    ], SettingObject.prototype, "meetingMode", void 0);
    __decorate([
        (0, typegoose_1.prop)(),
        __metadata("design:type", PermissionsObj)
    ], SettingObject.prototype, "permissions", void 0);
    return SettingObject;
}());
var Doctor = /** @class */ (function (_super) {
    __extends(Doctor, _super);
    function Doctor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: [] }),
        __metadata("design:type", Array)
    ], Doctor.prototype, "additionalSkill", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User }),
        __metadata("design:type", Object)
    ], Doctor.prototype, "verifiedby_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User }),
        __metadata("design:type", Object)
    ], Doctor.prototype, "user_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: clinic_model_1.Clinic }),
        __metadata("design:type", Object)
    ], Doctor.prototype, "clinic_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            ref: location_model_1.ClinicLocation,
            type: mongoose_1.default.Types.ObjectId,
            default: [],
        }),
        __metadata("design:type", Array)
    ], Doctor.prototype, "location", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Doctor.prototype, "npiNo", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Doctor.prototype, "deaNo", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Doctor.prototype, "title", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Doctor.prototype, "license", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Doctor.prototype, "middle_name", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Doctor.prototype, "mobile_home", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Doctor.prototype, "address", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Doctor.prototype, "postal_code", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Doctor.prototype, "city", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            ref: country_model_1.Country,
            type: mongoose_1.default.Types.ObjectId,
            default: null,
        }),
        __metadata("design:type", Object)
    ], Doctor.prototype, "country", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            ref: state_model_1.States,
            type: mongoose_1.default.Types.ObjectId,
            default: null,
        }),
        __metadata("design:type", Object)
    ], Doctor.prototype, "state", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Doctor.prototype, "dob", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], Doctor.prototype, "experience", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: null }),
        __metadata("design:type", Number)
    ], Doctor.prototype, "emergency_contact_number", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Doctor.prototype, "emergency_contact_name", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Doctor.prototype, "taxonomy", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Doctor.prototype, "relation", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], Doctor.prototype, "isVerified", void 0);
    __decorate([
        (0, typegoose_1.prop)({ default: null }),
        __metadata("design:type", Array)
    ], Doctor.prototype, "qualifications", void 0);
    __decorate([
        (0, typegoose_1.prop)({ default: null }),
        __metadata("design:type", Array)
    ], Doctor.prototype, "awards", void 0);
    __decorate([
        (0, typegoose_1.prop)({ default: null }),
        __metadata("design:type", VideoCallCredentialObject)
    ], Doctor.prototype, "videoCallCredential", void 0);
    __decorate([
        (0, typegoose_1.prop)({ default: null }),
        __metadata("design:type", Object)
    ], Doctor.prototype, "emergency", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            ref: appointment_types_model_1.AppointmentType,
            type: mongoose_1.default.Types.ObjectId,
            default: [],
        }),
        __metadata("design:type", Array)
    ], Doctor.prototype, "assignedApptTypes", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: [mongoose_1.default.Types.ObjectId], default: null }),
        __metadata("design:type", Object)
    ], Doctor.prototype, "supervising", void 0);
    __decorate([
        (0, typegoose_1.prop)(),
        __metadata("design:type", Object)
    ], Doctor.prototype, "settings", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            ref: skill_model_1.Skill,
            type: mongoose_1.default.Types.ObjectId,
            default: [],
        }),
        __metadata("design:type", Array)
    ], Doctor.prototype, "skills", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            ref: user_model_1.User,
            type: mongoose_1.default.Types.ObjectId,
            default: null,
        }),
        __metadata("design:type", Object)
    ], Doctor.prototype, "createdby_id", void 0);
    return Doctor;
}(pagination_configuration_1.PaginatedModel));
exports.Doctor = Doctor;
var DOCTOR_DB_MODEL = (0, typegoose_1.getModelForClass)(Doctor, {
    schemaOptions: {
        collection: "doctor",
        timestamps: true,
    },
});
exports.default = DOCTOR_DB_MODEL;
