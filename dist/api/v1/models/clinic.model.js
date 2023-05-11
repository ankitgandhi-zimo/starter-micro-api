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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clinic = exports.EClinicTypeValues = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var pagination_configuration_1 = require("../common/pagination/pagination_configuration");
var user_model_1 = require("./user.model");
var TreatmentPlanObject = /** @class */ (function () {
    function TreatmentPlanObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ ref: "TreatmentPlan", default: null }),
        __metadata("design:type", Object)
    ], TreatmentPlanObject.prototype, "plan_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], TreatmentPlanObject.prototype, "isDeleted", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: true }),
        __metadata("design:type", Boolean)
    ], TreatmentPlanObject.prototype, "isActive", void 0);
    return TreatmentPlanObject;
}());
var CancelObject = /** @class */ (function () {
    function CancelObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 24 }),
        __metadata("design:type", Number)
    ], CancelObject.prototype, "hours", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: true }),
        __metadata("design:type", Boolean)
    ], CancelObject.prototype, "isAllowed", void 0);
    return CancelObject;
}());
var RescheduleObject = /** @class */ (function () {
    function RescheduleObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 24 }),
        __metadata("design:type", Number)
    ], RescheduleObject.prototype, "hours", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], RescheduleObject.prototype, "isAllowed", void 0);
    return RescheduleObject;
}());
var ClinicPolicyObject = /** @class */ (function () {
    function ClinicPolicyObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 50 }),
        __metadata("design:type", Number)
    ], ClinicPolicyObject.prototype, "noShowCharge", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], ClinicPolicyObject.prototype, "isDeleted", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: true }),
        __metadata("design:type", Boolean)
    ], ClinicPolicyObject.prototype, "isActive", void 0);
    __decorate([
        (0, typegoose_1.prop)(),
        __metadata("design:type", CancelObject)
    ], ClinicPolicyObject.prototype, "cancel", void 0);
    __decorate([
        (0, typegoose_1.prop)(),
        __metadata("design:type", RescheduleObject)
    ], ClinicPolicyObject.prototype, "reschedule", void 0);
    return ClinicPolicyObject;
}());
var EClinicTypeValues;
(function (EClinicTypeValues) {
    EClinicTypeValues["INDIVIDUAL"] = "individual";
    EClinicTypeValues["GROUP"] = "group";
})(EClinicTypeValues = exports.EClinicTypeValues || (exports.EClinicTypeValues = {}));
var Clinic = /** @class */ (function (_super) {
    __extends(Clinic, _super);
    function Clinic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Clinic.prototype, "clinic_name", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Clinic.prototype, "image", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], Clinic.prototype, "mobile_no", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Clinic.prototype, "designation", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: EClinicTypeValues,
            type: String,
            default: EClinicTypeValues.INDIVIDUAL,
        }),
        __metadata("design:type", String)
    ], Clinic.prototype, "clinic_type", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User, default: null }),
        __metadata("design:type", Object)
    ], Clinic.prototype, "user_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], Clinic.prototype, "isDeleted", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: true }),
        __metadata("design:type", Boolean)
    ], Clinic.prototype, "isActive", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Clinic.prototype, "office", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Clinic.prototype, "fax", void 0);
    __decorate([
        (0, typegoose_1.prop)({ default: null }),
        __metadata("design:type", Object)
    ], Clinic.prototype, "clinicPolicy", void 0);
    Clinic = __decorate([
        (0, typegoose_1.index)({ clinic_name: "text" })
    ], Clinic);
    return Clinic;
}(pagination_configuration_1.PaginatedModel));
exports.Clinic = Clinic;
var CLINIC_DB_MODEL = (0, typegoose_1.getModelForClass)(Clinic, {
    schemaOptions: {
        collection: "clinic",
        timestamps: true,
    },
});
exports.default = CLINIC_DB_MODEL;
