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
exports.DoctorCheckout = exports.CodesObject = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var pagination_configuration_1 = require("../common/pagination/pagination_configuration");
var clinic_model_1 = require("./clinic.model");
var cpt_model_1 = require("./cpt.model");
var ict_model_1 = require("./ict.model");
var user_model_1 = require("./user.model");
var CodesObject = /** @class */ (function () {
    function CodesObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({
            ref: ict_model_1.ICTCodes,
            type: typegoose_1.mongoose.Types.ObjectId,
            default: [],
        }),
        __metadata("design:type", Array)
    ], CodesObject.prototype, "ICD_10", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            ref: ict_model_1.ICTCodes,
            type: typegoose_1.mongoose.Types.ObjectId,
            default: [],
        }),
        __metadata("design:type", Array)
    ], CodesObject.prototype, "ICD_9", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            ref: cpt_model_1.CPTCodes,
            type: typegoose_1.mongoose.Types.ObjectId,
            default: [],
        }),
        __metadata("design:type", Array)
    ], CodesObject.prototype, "cptCode", void 0);
    return CodesObject;
}());
exports.CodesObject = CodesObject;
var DoctorCheckout = /** @class */ (function (_super) {
    __extends(DoctorCheckout, _super);
    function DoctorCheckout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], DoctorCheckout.prototype, "notes", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], DoctorCheckout.prototype, "duration", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], DoctorCheckout.prototype, "placeOfService", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], DoctorCheckout.prototype, "remark", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date }),
        __metadata("design:type", String)
    ], DoctorCheckout.prototype, "checkoutTime", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: clinic_model_1.Clinic }),
        __metadata("design:type", Object)
    ], DoctorCheckout.prototype, "clinic_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User }),
        __metadata("design:type", Object)
    ], DoctorCheckout.prototype, "doctor_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User }),
        __metadata("design:type", Object)
    ], DoctorCheckout.prototype, "createdby_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "Patients" }),
        __metadata("design:type", Object)
    ], DoctorCheckout.prototype, "patient_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "ClinicLocation" }),
        __metadata("design:type", Object)
    ], DoctorCheckout.prototype, "location_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "Appointment" }),
        __metadata("design:type", Object)
    ], DoctorCheckout.prototype, "appointment_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], DoctorCheckout.prototype, "noShow", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], DoctorCheckout.prototype, "followUp", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], DoctorCheckout.prototype, "chargePatient", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: CodesObject }),
        __metadata("design:type", CodesObject)
    ], DoctorCheckout.prototype, "codes", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], DoctorCheckout.prototype, "billGenerated", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], DoctorCheckout.prototype, "payer_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], DoctorCheckout.prototype, "insurance_name", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "Insurance", default: null }),
        __metadata("design:type", Object)
    ], DoctorCheckout.prototype, "insurance_id", void 0);
    DoctorCheckout = __decorate([
        (0, typegoose_1.index)({ placeOfService: "text" })
    ], DoctorCheckout);
    return DoctorCheckout;
}(pagination_configuration_1.PaginatedModel));
exports.DoctorCheckout = DoctorCheckout;
var DOCTOR_CHECKOUT_DB_MODEL = (0, typegoose_1.getModelForClass)(DoctorCheckout, {
    schemaOptions: {
        collection: "doctorcheckout",
        timestamps: true,
    },
});
exports.default = DOCTOR_CHECKOUT_DB_MODEL;
