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
exports.Patients = exports.EFullValues = exports.EOccurenceValues = exports.EModeValues = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var pagination_configuration_1 = require("../common/pagination/pagination_configuration");
var clinic_model_1 = require("./clinic.model");
var user_model_1 = require("./user.model");
var EModeValues;
(function (EModeValues) {
    EModeValues["FULL"] = "FULL";
    EModeValues["SPLIT"] = "SPLIT";
    EModeValues["EMI"] = "EMI";
})(EModeValues = exports.EModeValues || (exports.EModeValues = {}));
var EOccurenceValues;
(function (EOccurenceValues) {
    EOccurenceValues[EOccurenceValues["FIFTEEN"] = 15] = "FIFTEEN";
    EOccurenceValues[EOccurenceValues["THIRTY"] = 30] = "THIRTY";
    EOccurenceValues[EOccurenceValues["FOURTYFIVE"] = 45] = "FOURTYFIVE";
    EOccurenceValues[EOccurenceValues["ZERO"] = 0] = "ZERO";
})(EOccurenceValues = exports.EOccurenceValues || (exports.EOccurenceValues = {}));
var EFullValues;
(function (EFullValues) {
    EFullValues["CASH"] = "CASH";
    EFullValues["CARD"] = "CARD";
    EFullValues["CHEQUE"] = "CHEQUE";
    EFullValues["LINK"] = "LINK";
})(EFullValues = exports.EFullValues || (exports.EFullValues = {}));
var FullObject = /** @class */ (function () {
    function FullObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], FullObject.prototype, "email", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: EFullValues,
            type: String,
            default: EFullValues.CASH,
        }),
        __metadata("design:type", String)
    ], FullObject.prototype, "type", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "Cards", default: null }),
        __metadata("design:type", Object)
    ], FullObject.prototype, "card_id", void 0);
    return FullObject;
}());
var EmiObject = /** @class */ (function () {
    function EmiObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({
            enum: EOccurenceValues,
            type: Number,
            default: EOccurenceValues.ZERO,
        }),
        __metadata("design:type", Number)
    ], EmiObject.prototype, "type", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: EOccurenceValues,
            type: Number,
            default: 0,
        }),
        __metadata("design:type", Number)
    ], EmiObject.prototype, "occurrence", void 0);
    return EmiObject;
}());
var SplitObject = /** @class */ (function () {
    function SplitObject() {
    }
    __decorate([
        (0, typegoose_1.prop)(),
        __metadata("design:type", P1Object)
    ], SplitObject.prototype, "p1", void 0);
    __decorate([
        (0, typegoose_1.prop)(),
        __metadata("design:type", P2Object)
    ], SplitObject.prototype, "p2", void 0);
    return SplitObject;
}());
var P1Object = /** @class */ (function () {
    function P1Object() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], P1Object.prototype, "email", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: EModeValues,
            type: String,
            default: null,
        }),
        __metadata("design:type", String)
    ], P1Object.prototype, "type", void 0);
    return P1Object;
}());
var P2Object = /** @class */ (function () {
    function P2Object() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], P2Object.prototype, "email", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: EModeValues,
            type: String,
            default: null,
        }),
        __metadata("design:type", String)
    ], P2Object.prototype, "type", void 0);
    return P2Object;
}());
var PreferedObject = /** @class */ (function () {
    function PreferedObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }),
        __metadata("design:type", String)
    ], PreferedObject.prototype, "mobileNo", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }),
        __metadata("design:type", String)
    ], PreferedObject.prototype, "name", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }),
        __metadata("design:type", String)
    ], PreferedObject.prototype, "relation", void 0);
    return PreferedObject;
}());
var AlternativeObject = /** @class */ (function () {
    function AlternativeObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }),
        __metadata("design:type", String)
    ], AlternativeObject.prototype, "mobileNo", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }),
        __metadata("design:type", String)
    ], AlternativeObject.prototype, "name", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }),
        __metadata("design:type", String)
    ], AlternativeObject.prototype, "relation", void 0);
    return AlternativeObject;
}());
var ContactObject = /** @class */ (function () {
    function ContactObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: PreferedObject }),
        __metadata("design:type", PreferedObject)
    ], ContactObject.prototype, "prefered", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: AlternativeObject }) // optinal
        ,
        __metadata("design:type", AlternativeObject)
    ], ContactObject.prototype, "alternative", void 0);
    return ContactObject;
}());
var PaymentObject = /** @class */ (function () {
    function PaymentObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({
            enum: EModeValues,
            type: String,
            default: EModeValues.FULL,
        }),
        __metadata("design:type", String)
    ], PaymentObject.prototype, "mode", void 0);
    __decorate([
        (0, typegoose_1.prop)(),
        __metadata("design:type", FullObject)
    ], PaymentObject.prototype, "full", void 0);
    __decorate([
        (0, typegoose_1.prop)(),
        __metadata("design:type", EmiObject)
    ], PaymentObject.prototype, "emi", void 0);
    __decorate([
        (0, typegoose_1.prop)(),
        __metadata("design:type", Object)
    ], PaymentObject.prototype, "split", void 0);
    return PaymentObject;
}());
var Patients = /** @class */ (function (_super) {
    __extends(Patients, _super);
    function Patients() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }) //optional
        ,
        __metadata("design:type", String)
    ], Patients.prototype, "GI", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }) //optional
        ,
        __metadata("design:type", String)
    ], Patients.prototype, "SO", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }) //optional
        ,
        __metadata("design:type", String)
    ], Patients.prototype, "SSN", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }),
        __metadata("design:type", String)
    ], Patients.prototype, "city", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }),
        __metadata("design:type", String)
    ], Patients.prototype, "image", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }),
        __metadata("design:type", String)
    ], Patients.prototype, "title", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }),
        __metadata("design:type", String)
    ], Patients.prototype, "email", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }),
        __metadata("design:type", String)
    ], Patients.prototype, "gender", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }),
        __metadata("design:type", String)
    ], Patients.prototype, "address", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }),
        __metadata("design:type", String)
    ], Patients.prototype, "last_name", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }),
        __metadata("design:type", String)
    ], Patients.prototype, "first_name", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }) // generated by self Fist letter first name and fist letter of last name---total 9 digit nemric number
        ,
        __metadata("design:type", String)
    ], Patients.prototype, "patientId", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }),
        __metadata("design:type", String)
    ], Patients.prototype, "time_zone", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }),
        __metadata("design:type", String)
    ], Patients.prototype, "appartment", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }) ///////optional
        ,
        __metadata("design:type", String)
    ], Patients.prototype, "middle_name", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Patients.prototype, "password", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }),
        __metadata("design:type", String)
    ], Patients.prototype, "date_of_birth", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }),
        __metadata("design:type", String)
    ], Patients.prototype, "postal_code", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: true }),
        __metadata("design:type", Boolean)
    ], Patients.prototype, "isActive", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }) //optinal
        ,
        __metadata("design:type", String)
    ], Patients.prototype, "marital_status", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], Patients.prototype, "isDeleted", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }) //optional    only in minor case   dob <18
        ,
        __metadata("design:type", String)
    ], Patients.prototype, "responsible_person", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "Country" }),
        __metadata("design:type", Object)
    ], Patients.prototype, "country", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: clinic_model_1.Clinic }),
        __metadata("design:type", Object)
    ], Patients.prototype, "clinic_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: [] }),
        __metadata("design:type", Array)
    ], Patients.prototype, "cards", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "Roles" }),
        __metadata("design:type", Object)
    ], Patients.prototype, "role", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "States" }),
        __metadata("design:type", Object)
    ], Patients.prototype, "state", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            type: ContactObject,
            default: ContactObject,
        }),
        __metadata("design:type", ContactObject)
    ], Patients.prototype, "contact", void 0);
    __decorate([
        (0, typegoose_1.prop)(),
        __metadata("design:type", PaymentObject)
    ], Patients.prototype, "payment", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User }),
        __metadata("design:type", Object)
    ], Patients.prototype, "createdby_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], Patients.prototype, "isVerified", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            ref: "FinancialClass",
            default: "611212443db9f0480d968011",
        }),
        __metadata("design:type", Object)
    ], Patients.prototype, "financialClass_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Patients.prototype, "customer_id_stripe", void 0);
    __decorate([
        (0, typegoose_1.prop)(),
        __metadata("design:type", Object)
    ], Patients.prototype, "role_permission", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], Patients.prototype, "mergeStatus", void 0);
    Patients = __decorate([
        (0, typegoose_1.index)({ email: "text" })
    ], Patients);
    return Patients;
}(pagination_configuration_1.PaginatedModel));
exports.Patients = Patients;
var PATIENT_DB_MODEL = (0, typegoose_1.getModelForClass)(Patients, {
    schemaOptions: {
        collection: "patients",
        timestamps: true,
    },
});
exports.default = PATIENT_DB_MODEL;
