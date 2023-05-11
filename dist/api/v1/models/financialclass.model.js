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
exports.FinancialClass = exports.ECoveredValues = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var pagination_configuration_1 = require("../common/pagination/pagination_configuration");
var user_model_1 = require("./user.model");
var ECoveredValues;
(function (ECoveredValues) {
    ECoveredValues["INSURANCE"] = "INSURANCE";
    ECoveredValues["SELFPAY"] = "SELFPAY";
})(ECoveredValues = exports.ECoveredValues || (exports.ECoveredValues = {}));
var FinancialClass = /** @class */ (function (_super) {
    __extends(FinancialClass, _super);
    function FinancialClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], FinancialClass.prototype, "code", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], FinancialClass.prototype, "description", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: true }),
        __metadata("design:type", Boolean)
    ], FinancialClass.prototype, "isActive", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], FinancialClass.prototype, "isDeleted", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            ref: user_model_1.User,
        }) /** Clinics are creating financial classes */,
        __metadata("design:type", Object)
    ], FinancialClass.prototype, "createdby_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], FinancialClass.prototype, "price", void 0);
    __decorate([
        (0, typegoose_1.prop)({ enum: ECoveredValues }),
        __metadata("design:type", String)
    ], FinancialClass.prototype, "covered", void 0);
    FinancialClass = __decorate([
        (0, typegoose_1.index)({ code: "text" })
    ], FinancialClass);
    return FinancialClass;
}(pagination_configuration_1.PaginatedModel));
exports.FinancialClass = FinancialClass;
var FINANCIAL_CLASS_DB_MODEL = (0, typegoose_1.getModelForClass)(FinancialClass, {
    schemaOptions: {
        collection: "financialclasses",
        timestamps: true,
    },
});
exports.default = FINANCIAL_CLASS_DB_MODEL;
