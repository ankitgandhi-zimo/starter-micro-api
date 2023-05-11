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
exports.Cards = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var pagination_configuration_1 = require("../common/pagination/pagination_configuration");
var patient_model_1 = require("./patient.model");
var user_model_1 = require("./user.model");
// @index({ token: "text" })
var Cards = /** @class */ (function (_super) {
    __extends(Cards, _super);
    function Cards() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Cards.prototype, "client_ip", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User, required: true, default: "" }),
        __metadata("design:type", Object)
    ], Cards.prototype, "clinic_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User }),
        __metadata("design:type", Object)
    ], Cards.prototype, "createdby_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: patient_model_1.Patients }),
        __metadata("design:type", Object)
    ], Cards.prototype, "patient_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], Cards.prototype, "cardId", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], Cards.prototype, "token", void 0);
    return Cards;
}(pagination_configuration_1.PaginatedModel));
exports.Cards = Cards;
var CARDS_DB_MODEL = (0, typegoose_1.getModelForClass)(Cards, {
    schemaOptions: {
        collection: "cards",
        timestamps: true,
    },
});
exports.default = CARDS_DB_MODEL;
