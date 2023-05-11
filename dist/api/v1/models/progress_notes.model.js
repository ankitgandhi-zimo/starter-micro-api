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
exports.ProgressNotes = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var pagination_configuration_1 = require("../common/pagination/pagination_configuration");
var clinic_model_1 = require("./clinic.model");
var dynamic_form_model_1 = require("./dynamic_form.model");
var user_model_1 = require("./user.model");
// class MultiOptionObject {
//   @prop({ type: String, default: null })
//   display!: string;
//   @prop({ type: String, default: null })
//   value!: string;
// }
// class FieldsObject {
//   @prop({ type: String, default: null })
//   constKey!: string;
//   @prop({ type: String, default: null })
//   inputType!: string;
//   @prop({ type: String, default: null })
//   inputLabel!: string;
//   @prop({ type: Boolean, default: false })
//   isDeleted!: boolean;
//   @prop()
//   multiOption!: MultiOptionObject[] | null;
// }
// export class FormField {
//   @prop({ type: String, default: null, required: true })
//   input_label!: string;
//   @prop({
//     type: String,
//     enum: ["text", "checkbox", "radio", "title", "date", "dropdown"],
//     default: null,
//     required: true,
//   })
//   input_type!: string;
//   @prop({ type: Boolean, default: false })
//   required!: boolean;
//   @prop({ type: String, default: null })
//   options!: string[];
//   @prop({ type: String, default: null })
//   default!: string;
// }
var ProgressNotes = /** @class */ (function (_super) {
    __extends(ProgressNotes, _super);
    function ProgressNotes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], ProgressNotes.prototype, "form_title", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: true }),
        __metadata("design:type", Boolean)
    ], ProgressNotes.prototype, "isActive", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], ProgressNotes.prototype, "isDeleted", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], ProgressNotes.prototype, "saveAsDraft", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], ProgressNotes.prototype, "import", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: ProgressNotes, default: null }),
        __metadata("design:type", Object)
    ], ProgressNotes.prototype, "progress_note_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: clinic_model_1.Clinic, default: null }),
        __metadata("design:type", Object)
    ], ProgressNotes.prototype, "clinic_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: dynamic_form_model_1.FormField, default: [] }),
        __metadata("design:type", Array)
    ], ProgressNotes.prototype, "fields", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User }),
        __metadata("design:type", Object)
    ], ProgressNotes.prototype, "createdby_id", void 0);
    return ProgressNotes;
}(pagination_configuration_1.PaginatedModel));
exports.ProgressNotes = ProgressNotes;
var PROGRESS_NOTES_DB_MODEL = (0, typegoose_1.getModelForClass)(ProgressNotes, {
    schemaOptions: {
        collection: "progressnotes",
        timestamps: true,
    },
});
exports.default = PROGRESS_NOTES_DB_MODEL;
