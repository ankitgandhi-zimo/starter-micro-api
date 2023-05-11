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
exports.FilledDynamicForm = exports.EStatusValues = exports.Remark = exports.FieldData = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var mongoose_1 = __importDefault(require("mongoose"));
var pagination_configuration_1 = require("../common/pagination/pagination_configuration");
var clinic_model_1 = require("./clinic.model");
var doctor_model_1 = require("./doctor.model");
var dynamic_form_model_1 = require("./dynamic_form.model");
var patient_model_1 = require("./patient.model");
var user_model_1 = require("./user.model");
var FieldData = /** @class */ (function () {
    function FieldData() {
    }
    __decorate([
        (0, typegoose_1.prop)({
            type: mongoose_1.default.Types.ObjectId,
            default: null,
            required: true,
        }),
        __metadata("design:type", String)
    ], FieldData.prototype, "id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ default: null }),
        __metadata("design:type", Object)
    ], FieldData.prototype, "value", void 0);
    return FieldData;
}());
exports.FieldData = FieldData;
var Remark = /** @class */ (function () {
    function Remark() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Remark.prototype, "remark", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: Date.now() }),
        __metadata("design:type", Date)
    ], Remark.prototype, "date", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User, type: mongoose_1.default.Types.ObjectId }),
        __metadata("design:type", Object)
    ], Remark.prototype, "by", void 0);
    return Remark;
}());
exports.Remark = Remark;
var EStatusValues;
(function (EStatusValues) {
    EStatusValues["VIEWED"] = "VIEWED";
    EStatusValues["SHARED"] = "SHARED";
    EStatusValues["REJECTED"] = "REJECTED";
})(EStatusValues = exports.EStatusValues || (exports.EStatusValues = {}));
var FilledDynamicForm = /** @class */ (function (_super) {
    __extends(FilledDynamicForm, _super);
    function FilledDynamicForm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], FilledDynamicForm.prototype, "isDeleted", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: true }),
        __metadata("design:type", Boolean)
    ], FilledDynamicForm.prototype, "isActive", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: EStatusValues,
            type: String,
            default: EStatusValues.SHARED,
        }),
        __metadata("design:type", String)
    ], FilledDynamicForm.prototype, "status", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], FilledDynamicForm.prototype, "filledPercentage", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: FieldData, default: [], required: true }),
        __metadata("design:type", Array)
    ], FilledDynamicForm.prototype, "field_data", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: clinic_model_1.Clinic, default: null }),
        __metadata("design:type", Object)
    ], FilledDynamicForm.prototype, "clinic_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: patient_model_1.Patients, default: null }),
        __metadata("design:type", Object)
    ], FilledDynamicForm.prototype, "patient_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: doctor_model_1.Doctor, default: null }),
        __metadata("design:type", Object)
    ], FilledDynamicForm.prototype, "provider_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: dynamic_form_model_1.DynamicForm, default: null }),
        __metadata("design:type", Object)
    ], FilledDynamicForm.prototype, "form_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Remark, default: [] }),
        __metadata("design:type", Array)
    ], FilledDynamicForm.prototype, "remarks", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: null }),
        __metadata("design:type", Date)
    ], FilledDynamicForm.prototype, "received_date", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User, type: mongoose_1.default.Types.ObjectId }),
        __metadata("design:type", Object)
    ], FilledDynamicForm.prototype, "createdby_id", void 0);
    return FilledDynamicForm;
}(pagination_configuration_1.PaginatedModel));
exports.FilledDynamicForm = FilledDynamicForm;
var FILLED_DYNAMIC_FORM_DB_MODEL = (0, typegoose_1.getModelForClass)(FilledDynamicForm, {
    schemaOptions: {
        collection: "filled_dynamic_form",
        timestamps: true,
        //strict: false,
    },
});
exports.default = FILLED_DYNAMIC_FORM_DB_MODEL;
