"use strict";
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
exports.AddProgressNoteViewmodel = exports.FormFields = exports.InputTypes = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var InputTypes;
(function (InputTypes) {
    InputTypes["TextField"] = "text";
    InputTypes["CheckBox"] = "checkbox";
    InputTypes["RadioButton"] = "radio";
    InputTypes["Date"] = "date";
    InputTypes["Title"] = "title";
    InputTypes["DropDown"] = "dropdown";
})(InputTypes = exports.InputTypes || (exports.InputTypes = {}));
var FormFields = /** @class */ (function () {
    function FormFields() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsEnum)(InputTypes, {
            message: "Input type can only be TextField,CheckBox or RadioButton",
        }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], FormFields.prototype, "input_type", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.MaxLength)(30),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], FormFields.prototype, "input_label", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsDefined)(),
        __metadata("design:type", Boolean)
    ], FormFields.prototype, "required", void 0);
    __decorate([
        (0, class_validator_1.ValidateIf)(function (d) {
            return d.input_type == "checkbox" ||
                d.input_type == "radio" ||
                d.input_type == "dropdown";
        }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsArray)(),
        __metadata("design:type", Array)
    ], FormFields.prototype, "options", void 0);
    __decorate([
        (0, class_validator_1.ValidateIf)(function (d) { return d.input_type == "title"; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], FormFields.prototype, "default", void 0);
    return FormFields;
}());
exports.FormFields = FormFields;
var AddProgressNoteViewmodel = /** @class */ (function () {
    function AddProgressNoteViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddProgressNoteViewmodel.prototype, "form_title", void 0);
    __decorate([
        (0, class_transformer_1.Expose)()
        //@IsObject()
        ,
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.ValidateNested)(),
        (0, class_transformer_1.Type)(function () { return FormFields; }),
        __metadata("design:type", Array)
    ], AddProgressNoteViewmodel.prototype, "fields", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; })
        //@IsDefined()
        ,
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", typegoose_1.mongoose.Schema.Types.ObjectId)
    ], AddProgressNoteViewmodel.prototype, "createdby_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; })
        //@IsDefined()
        ,
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", typegoose_1.mongoose.Schema.Types.ObjectId)
    ], AddProgressNoteViewmodel.prototype, "clinic_id", void 0);
    return AddProgressNoteViewmodel;
}());
exports.AddProgressNoteViewmodel = AddProgressNoteViewmodel;
