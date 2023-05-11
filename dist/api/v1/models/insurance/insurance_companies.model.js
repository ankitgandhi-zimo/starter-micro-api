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
exports.InsuranceCompany = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var pagination_configuration_1 = require("../../common/pagination/pagination_configuration");
var clinic_model_1 = require("../clinic.model");
var InsuranceCompany = /** @class */ (function (_super) {
    __extends(InsuranceCompany, _super);
    function InsuranceCompany() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], InsuranceCompany.prototype, "companyName", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], InsuranceCompany.prototype, "mobile_number", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], InsuranceCompany.prototype, "address", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], InsuranceCompany.prototype, "city", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], InsuranceCompany.prototype, "payer_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], InsuranceCompany.prototype, "state", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], InsuranceCompany.prototype, "country", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], InsuranceCompany.prototype, "postalCode", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], InsuranceCompany.prototype, "notes", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: clinic_model_1.Clinic, default: null }),
        __metadata("design:type", Object)
    ], InsuranceCompany.prototype, "clinic_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], InsuranceCompany.prototype, "isDeleted", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: true }),
        __metadata("design:type", Boolean)
    ], InsuranceCompany.prototype, "isActive", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "User" }),
        __metadata("design:type", Object)
    ], InsuranceCompany.prototype, "createdby_id", void 0);
    InsuranceCompany = __decorate([
        (0, typegoose_1.index)({ companyName: "text" })
    ], InsuranceCompany);
    return InsuranceCompany;
}(pagination_configuration_1.PaginatedModel));
exports.InsuranceCompany = InsuranceCompany;
var INSURANCE_COMPANIES_DB_MODEL = (0, typegoose_1.getModelForClass)(InsuranceCompany, {
    schemaOptions: {
        collection: "insurance_companies",
        timestamps: true,
    },
});
exports.default = INSURANCE_COMPANIES_DB_MODEL;
