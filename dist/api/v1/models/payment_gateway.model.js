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
exports.PaymentGateway = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var pagination_configuration_1 = require("../common/pagination/pagination_configuration");
var PaymentGateway = /** @class */ (function (_super) {
    __extends(PaymentGateway, _super);
    function PaymentGateway() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ ref: "Clinic" }),
        __metadata("design:type", Object)
    ], PaymentGateway.prototype, "clinic_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], PaymentGateway.prototype, "secret_key", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], PaymentGateway.prototype, "public_key", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: " " }),
        __metadata("design:type", String)
    ], PaymentGateway.prototype, "type", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], PaymentGateway.prototype, "isVerified", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], PaymentGateway.prototype, "isDeleted", void 0);
    PaymentGateway = __decorate([
        (0, typegoose_1.index)({ public_key: "text" })
    ], PaymentGateway);
    return PaymentGateway;
}(pagination_configuration_1.PaginatedModel));
exports.PaymentGateway = PaymentGateway;
var PAYMENT_GATEWAY_DB_MODEL = (0, typegoose_1.getModelForClass)(PaymentGateway, {
    schemaOptions: {
        collection: "paymentGateway",
        timestamps: true,
    },
});
exports.default = PAYMENT_GATEWAY_DB_MODEL;
