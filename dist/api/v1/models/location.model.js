"use strict";
/************************ */
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
exports.ClinicLocation = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var pagination_configuration_1 = require("../common/pagination/pagination_configuration");
var clinic_model_1 = require("./clinic.model");
var ClinicLocation = /** @class */ (function (_super) {
    __extends(ClinicLocation, _super);
    function ClinicLocation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], ClinicLocation.prototype, "city", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], ClinicLocation.prototype, "email", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], ClinicLocation.prototype, "npiNo", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], ClinicLocation.prototype, "fed_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], ClinicLocation.prototype, "address", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], ClinicLocation.prototype, "taxonomy", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: true }),
        __metadata("design:type", Boolean)
    ], ClinicLocation.prototype, "isActive", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], ClinicLocation.prototype, "isDeleted", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: clinic_model_1.Clinic, default: null }),
        __metadata("design:type", Object)
    ], ClinicLocation.prototype, "clinic_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], ClinicLocation.prototype, "branchName", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], ClinicLocation.prototype, "mobile_other", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], ClinicLocation.prototype, "postal_code", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "States", default: null }),
        __metadata("design:type", Object)
    ], ClinicLocation.prototype, "state", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "Country", default: null }),
        __metadata("design:type", Object)
    ], ClinicLocation.prototype, "country", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], ClinicLocation.prototype, "office", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], ClinicLocation.prototype, "fax", void 0);
    ClinicLocation = __decorate([
        (0, typegoose_1.index)({ city: "text" })
    ], ClinicLocation);
    return ClinicLocation;
}(pagination_configuration_1.PaginatedModel));
exports.ClinicLocation = ClinicLocation;
var CLINIC_LOCATION_DB_MODEL = (0, typegoose_1.getModelForClass)(ClinicLocation, {
    schemaOptions: {
        collection: "clinic_locations",
        timestamps: true,
    },
});
exports.default = CLINIC_LOCATION_DB_MODEL;
