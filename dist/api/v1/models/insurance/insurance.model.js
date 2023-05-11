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
exports.Insurance = exports.ECopayValues = exports.EInsuranceTypeValues = exports.ECoverageValues = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var mongoose_1 = __importDefault(require("mongoose"));
var pagination_configuration_1 = require("../../common/pagination/pagination_configuration");
var country_model_1 = require("../country.model");
var cpt_model_1 = require("../cpt.model");
var state_model_1 = require("../state.model");
var insurance_companies_model_1 = require("./insurance_companies.model");
var ECoverageValues;
(function (ECoverageValues) {
    ECoverageValues["PRIMARY"] = "Primary";
    ECoverageValues["SECONDARY"] = "Secondary";
    ECoverageValues["TERTIARY"] = "Tertiary";
})(ECoverageValues = exports.ECoverageValues || (exports.ECoverageValues = {}));
var EInsuranceTypeValues;
(function (EInsuranceTypeValues) {
    EInsuranceTypeValues["HMO"] = "HMO";
    EInsuranceTypeValues["PPO"] = "PPO";
    EInsuranceTypeValues["EAP"] = "EAP";
    EInsuranceTypeValues["EPO"] = "EPO";
    EInsuranceTypeValues["UNKNOWN"] = "Unknown";
})(EInsuranceTypeValues = exports.EInsuranceTypeValues || (exports.EInsuranceTypeValues = {}));
var ECopayValues;
(function (ECopayValues) {
    ECopayValues["DOLLAR"] = "$";
    ECopayValues["SLASHASTRIC"] = "/*";
    ECopayValues["MODULE"] = "%";
    ECopayValues["ASTRICSLASH"] = "*/";
})(ECopayValues = exports.ECopayValues || (exports.ECopayValues = {}));
var CopayObject = /** @class */ (function () {
    function CopayObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], CopayObject.prototype, "amount", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: ECopayValues,
            // type: String,
            default: ECopayValues.DOLLAR,
        }),
        __metadata("design:type", String)
    ], CopayObject.prototype, "type", void 0);
    return CopayObject;
}());
var Insurance = /** @class */ (function (_super) {
    __extends(Insurance, _super);
    function Insurance() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ ref: "Clinic" }),
        __metadata("design:type", Object)
    ], Insurance.prototype, "clinic_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "Patients" }),
        __metadata("design:type", Object)
    ], Insurance.prototype, "patient_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: insurance_companies_model_1.InsuranceCompany }),
        __metadata("design:type", Object)
    ], Insurance.prototype, "insurance_company_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: mongoose_1.default.Types.ObjectId }) // ref can be clinic, patient, frontdesk
        ,
        __metadata("design:type", mongoose_1.default.Types.ObjectId)
    ], Insurance.prototype, "createdby_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            ref: "CPTCodes",
            type: [cpt_model_1.CPTCodes],
            default: null,
        }),
        __metadata("design:type", Object)
    ], Insurance.prototype, "codes", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: true }),
        __metadata("design:type", Boolean)
    ], Insurance.prototype, "isActive", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, required: true }),
        __metadata("design:type", String)
    ], Insurance.prototype, "mobile_no", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Insurance.prototype, "group_number", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, required: true }),
        __metadata("design:type", String)
    ], Insurance.prototype, "subscriber_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, required: true }),
        __metadata("design:type", String)
    ], Insurance.prototype, "relationship", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }),
        __metadata("design:type", String)
    ], Insurance.prototype, "date_of_birth", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Insurance.prototype, "payer_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: null }),
        __metadata("design:type", String)
    ], Insurance.prototype, "issue_date", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Insurance.prototype, "insurance_name", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, required: true }),
        __metadata("design:type", String)
    ], Insurance.prototype, "insurance_city", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            ref: state_model_1.States,
            type: mongoose_1.default.Types.ObjectId,
            default: null,
        }),
        __metadata("design:type", Object)
    ], Insurance.prototype, "insurance_state", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, required: true }),
        __metadata("design:type", String)
    ], Insurance.prototype, "insurance_address", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            ref: country_model_1.Country,
            type: mongoose_1.default.Types.ObjectId,
            default: null,
        }),
        __metadata("design:type", Object)
    ], Insurance.prototype, "insurance_country", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, required: true }),
        __metadata("design:type", String)
    ], Insurance.prototype, "insurance_zip_code", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Insurance.prototype, "insurance_plan_type", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, required: true }),
        __metadata("design:type", String)
    ], Insurance.prototype, "note", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, required: true }),
        __metadata("design:type", String)
    ], Insurance.prototype, "subscriber_city", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, required: true }),
        __metadata("design:type", String)
    ], Insurance.prototype, "subscriber_state", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, required: true }),
        __metadata("design:type", String)
    ], Insurance.prototype, "subscriber_gender", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, required: true }),
        __metadata("design:type", String)
    ], Insurance.prototype, "subscriber_address", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, required: true }),
        __metadata("design:type", String)
    ], Insurance.prototype, "subscriber_country", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, required: true }),
        __metadata("design:type", String)
    ], Insurance.prototype, "subscriber_zip_code", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, required: true }),
        __metadata("design:type", String)
    ], Insurance.prototype, "subscriber_last_name", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, required: true }),
        __metadata("design:type", String)
    ], Insurance.prototype, "subscriber_first_name", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: ECoverageValues,
            type: String,
            default: ECoverageValues.PRIMARY,
        }),
        __metadata("design:type", String)
    ], Insurance.prototype, "coverage", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: EInsuranceTypeValues,
            type: String,
            default: EInsuranceTypeValues.UNKNOWN,
        }),
        __metadata("design:type", String)
    ], Insurance.prototype, "insurance_type", void 0);
    __decorate([
        (0, typegoose_1.prop)({}),
        __metadata("design:type", CopayObject)
    ], Insurance.prototype, "copay", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], Insurance.prototype, "isDeleted", void 0);
    Insurance = __decorate([
        (0, typegoose_1.index)({ insurance_name: "text" })
    ], Insurance);
    return Insurance;
}(pagination_configuration_1.PaginatedModel));
exports.Insurance = Insurance;
var INSURANCE_DB_MODEL = (0, typegoose_1.getModelForClass)(Insurance, {
    schemaOptions: {
        collection: "insurance",
        timestamps: true,
    },
});
exports.default = INSURANCE_DB_MODEL;
