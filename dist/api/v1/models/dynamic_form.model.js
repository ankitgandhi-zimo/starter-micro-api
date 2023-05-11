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
exports.DynamicForm = exports.FormField = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var mongoose_1 = __importDefault(require("mongoose"));
var pagination_configuration_1 = require("../common/pagination/pagination_configuration");
var clinic_model_1 = require("./clinic.model");
var form_category_model_1 = require("./form_category.model");
var user_model_1 = require("./user.model");
var FormField = /** @class */ (function () {
    function FormField() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null, required: true }),
        __metadata("design:type", String)
    ], FormField.prototype, "input_label", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            type: String,
            enum: [
                "text",
                "checkbox",
                "radio",
                "title",
                "date",
                "dropdown",
            ],
            default: null,
            required: true,
        }),
        __metadata("design:type", String)
    ], FormField.prototype, "input_type", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], FormField.prototype, "required", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", Array)
    ], FormField.prototype, "options", void 0);
    __decorate([
        (0, typegoose_1.prop)({ default: null }),
        __metadata("design:type", Object)
    ], FormField.prototype, "default", void 0);
    return FormField;
}());
exports.FormField = FormField;
var DynamicForm = /** @class */ (function (_super) {
    __extends(DynamicForm, _super);
    function DynamicForm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], DynamicForm.prototype, "isDeleted", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: true }),
        __metadata("design:type", Boolean)
    ], DynamicForm.prototype, "isActive", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], DynamicForm.prototype, "saveAsDraft", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], DynamicForm.prototype, "import", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], DynamicForm.prototype, "form_title", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: form_category_model_1.FormCategory, default: null }),
        __metadata("design:type", Object)
    ], DynamicForm.prototype, "category", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: FormField, default: [], required: true }),
        __metadata("design:type", Array)
    ], DynamicForm.prototype, "fields", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: DynamicForm, default: null }),
        __metadata("design:type", Object)
    ], DynamicForm.prototype, "form_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: clinic_model_1.Clinic, default: null }),
        __metadata("design:type", Object)
    ], DynamicForm.prototype, "clinic_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User, type: mongoose_1.default.Types.ObjectId }),
        __metadata("design:type", Object)
    ], DynamicForm.prototype, "createdby_id", void 0);
    return DynamicForm;
}(pagination_configuration_1.PaginatedModel));
exports.DynamicForm = DynamicForm;
var DYNAMIC_FORM_DB_MODEL = (0, typegoose_1.getModelForClass)(DynamicForm, {
    schemaOptions: {
        collection: "dynamic_form",
        timestamps: true,
    },
});
exports.default = DYNAMIC_FORM_DB_MODEL;
