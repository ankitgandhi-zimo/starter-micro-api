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
exports.Hmo = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var mongoose_1 = __importDefault(require("mongoose"));
var pagination_configuration_1 = require("../../common/pagination/pagination_configuration");
var clinic_model_1 = require("../clinic.model");
var Hmo = /** @class */ (function (_super) {
    __extends(Hmo, _super);
    function Hmo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Hmo.prototype, "copay", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Hmo.prototype, "otherCodes", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Hmo.prototype, "outOfPocket", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Hmo.prototype, "limitOnVisit", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Hmo.prototype, "planCalendarYear", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Hmo.prototype, "billableCptCodes", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Hmo.prototype, "claimsBillingAddress", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: clinic_model_1.Clinic, default: null }),
        __metadata("design:type", Object)
    ], Hmo.prototype, "clinic_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "Patients" }),
        __metadata("design:type", Object)
    ], Hmo.prototype, "patient_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: mongoose_1.default.Types.ObjectId }) // ref can be clinic, patient, frontdesk
        ,
        __metadata("design:type", mongoose_1.default.Types.ObjectId)
    ], Hmo.prototype, "createdby_id", void 0);
    Hmo = __decorate([
        (0, typegoose_1.index)({ copay: "text" })
    ], Hmo);
    return Hmo;
}(pagination_configuration_1.PaginatedModel));
exports.Hmo = Hmo;
var HMO_DB_MODEL = (0, typegoose_1.getModelForClass)(Hmo, {
    schemaOptions: {
        collection: "hmo",
        timestamps: true,
    },
});
exports.default = HMO_DB_MODEL;
