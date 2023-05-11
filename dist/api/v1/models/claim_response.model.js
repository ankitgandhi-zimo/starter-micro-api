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
exports.ClaimResponse = exports.MetaObject = exports.ClaimReferenceObject = exports.EClaimType = exports.PayerObject = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var pagination_configuration_1 = require("../common/pagination/pagination_configuration");
var clinic_model_1 = require("./clinic.model");
var super_bill_model_1 = require("./super_bill.model");
var PayerObject = /** @class */ (function () {
    function PayerObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], PayerObject.prototype, "payerName", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], PayerObject.prototype, "payerID", void 0);
    return PayerObject;
}());
exports.PayerObject = PayerObject;
var EClaimType;
(function (EClaimType) {
    EClaimType["PRO"] = "PRO";
    EClaimType["INST"] = "INST";
})(EClaimType = exports.EClaimType || (exports.EClaimType = {}));
var ClaimReferenceObject = /** @class */ (function () {
    function ClaimReferenceObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], ClaimReferenceObject.prototype, "correlationId", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], ClaimReferenceObject.prototype, "submitterId", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], ClaimReferenceObject.prototype, "customerClaimNumber", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], ClaimReferenceObject.prototype, "patientControlNumber", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date }),
        __metadata("design:type", String)
    ], ClaimReferenceObject.prototype, "timeOfResponse", void 0);
    __decorate([
        (0, typegoose_1.prop)({ enum: EClaimType, type: String }),
        __metadata("design:type", String)
    ], ClaimReferenceObject.prototype, "claimType", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], ClaimReferenceObject.prototype, "formatVersion", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], ClaimReferenceObject.prototype, "rhclaimNumber", void 0);
    return ClaimReferenceObject;
}());
exports.ClaimReferenceObject = ClaimReferenceObject;
var MetaObject = /** @class */ (function () {
    function MetaObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], MetaObject.prototype, "submitterId", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], MetaObject.prototype, "senderId", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], MetaObject.prototype, "billerId", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], MetaObject.prototype, "traceId", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], MetaObject.prototype, "controlNumber", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], MetaObject.prototype, "applicationMode", void 0);
    return MetaObject;
}());
exports.MetaObject = MetaObject;
var ClaimResponse = /** @class */ (function (_super) {
    __extends(ClaimResponse, _super);
    function ClaimResponse() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], ClaimResponse.prototype, "status", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], ClaimResponse.prototype, "controlNumber", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], ClaimResponse.prototype, "invoice", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], ClaimResponse.prototype, "tradingPartnerServiceId", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: ClaimReferenceObject }),
        __metadata("design:type", ClaimReferenceObject)
    ], ClaimResponse.prototype, "claimReference", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: MetaObject }),
        __metadata("design:type", MetaObject)
    ], ClaimResponse.prototype, "meta", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "FALSE" }),
        __metadata("design:type", String)
    ], ClaimResponse.prototype, "editStatus", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: PayerObject }),
        __metadata("design:type", PayerObject)
    ], ClaimResponse.prototype, "payer", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: super_bill_model_1.SuperBill }),
        __metadata("design:type", Object)
    ], ClaimResponse.prototype, "superBillId", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: clinic_model_1.Clinic, default: null }),
        __metadata("design:type", Object)
    ], ClaimResponse.prototype, "clinic_id", void 0);
    ClaimResponse = __decorate([
        (0, typegoose_1.index)({ status: "text" })
    ], ClaimResponse);
    return ClaimResponse;
}(pagination_configuration_1.PaginatedModel));
exports.ClaimResponse = ClaimResponse;
var CLAIM_RESPONSE_DB_MODEL = (0, typegoose_1.getModelForClass)(ClaimResponse, {
    schemaOptions: {
        collection: "claim_response",
        timestamps: true,
        strict: false,
    },
});
exports.default = CLAIM_RESPONSE_DB_MODEL;
