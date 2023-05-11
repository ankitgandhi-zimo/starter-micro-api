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
exports.FetchData = exports.ETypeValues = exports.EStatusValues = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var pagination_configuration_1 = require("../common/pagination/pagination_configuration");
var clinic_model_1 = require("./clinic.model");
var user_model_1 = require("./user.model");
var EStatusValues;
(function (EStatusValues) {
    EStatusValues["PENDING"] = "PENDING";
    EStatusValues["SUCCESS"] = "SUCCESS";
    EStatusValues["FAILED"] = "FAILED";
})(EStatusValues = exports.EStatusValues || (exports.EStatusValues = {}));
var ETypeValues;
(function (ETypeValues) {
    ETypeValues["PROVIDER"] = "PROVIDER";
    ETypeValues["PATIENT"] = "PATIENT";
    ETypeValues["APPOINTMENT"] = "APPOINTMENT";
    ETypeValues["DOCTORCHECKOUT"] = "DOCTORCHECKOUT";
})(ETypeValues = exports.ETypeValues || (exports.ETypeValues = {}));
var FetchData = /** @class */ (function (_super) {
    __extends(FetchData, _super);
    function FetchData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({
            enum: ETypeValues,
            type: String,
            default: null,
        }),
        __metadata("design:type", String)
    ], FetchData.prototype, "type", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: null }),
        __metadata("design:type", Date)
    ], FetchData.prototype, "fetch_time", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: null }),
        __metadata("design:type", Date)
    ], FetchData.prototype, "last_fetch_time", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: typegoose_1.mongoose.Types.ObjectId, default: [] }),
        __metadata("design:type", Array)
    ], FetchData.prototype, "conflicted_ids", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User, default: null }),
        __metadata("design:type", Object)
    ], FetchData.prototype, "createdby_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: clinic_model_1.Clinic, type: typegoose_1.mongoose.Types.ObjectId }),
        __metadata("design:type", Object)
    ], FetchData.prototype, "clinic_id", void 0);
    return FetchData;
}(pagination_configuration_1.PaginatedModel));
exports.FetchData = FetchData;
var FETCH_DATA_DB_MODEL = (0, typegoose_1.getModelForClass)(FetchData, {
    schemaOptions: {
        collection: "fetch_data",
        timestamps: true,
    },
});
exports.default = FETCH_DATA_DB_MODEL;
