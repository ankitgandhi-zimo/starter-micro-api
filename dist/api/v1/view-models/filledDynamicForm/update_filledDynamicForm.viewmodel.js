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
exports.UpdateFilledDynamicFormViewmodel = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var filled_dynamic_form_model_1 = require("../../models/filled_dynamic_form.model");
var add_filledDynamicForm_viewmodel_1 = require("./add_filledDynamicForm.viewmodel");
var UpdateFilledDynamicFormViewmodel = /** @class */ (function () {
    function UpdateFilledDynamicFormViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsArray)()
        //@IsDefined()
        ,
        (0, class_validator_1.ValidateNested)(),
        (0, class_transformer_1.Type)(function () { return add_filledDynamicForm_viewmodel_1.FieldData; }),
        __metadata("design:type", Array)
    ], UpdateFilledDynamicFormViewmodel.prototype, "field_data", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsDateString)()
        //@IsDefined()
        ,
        (0, class_transformer_1.Type)(function () { return String; }),
        __metadata("design:type", String)
    ], UpdateFilledDynamicFormViewmodel.prototype, "received_date", void 0);
    __decorate([
        (0, class_transformer_1.Expose)()
        //@IsObject()
        //@IsDefined()
        ,
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        __metadata("design:type", String)
    ], UpdateFilledDynamicFormViewmodel.prototype, "remarks", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsEnum)(filled_dynamic_form_model_1.EStatusValues, {
            message: "Status can only VIEWED, SHARED or REJECTED",
        })
        //@IsDefined()
        ,
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdateFilledDynamicFormViewmodel.prototype, "status", void 0);
    __decorate([
        (0, class_transformer_1.Expose)()
        //@IsObject()
        //@IsDefined()
        ,
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        __metadata("design:type", Number)
    ], UpdateFilledDynamicFormViewmodel.prototype, "filledPercentage", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", typegoose_1.mongoose.Schema.Types.ObjectId)
    ], UpdateFilledDynamicFormViewmodel.prototype, "_id", void 0);
    return UpdateFilledDynamicFormViewmodel;
}());
exports.UpdateFilledDynamicFormViewmodel = UpdateFilledDynamicFormViewmodel;
