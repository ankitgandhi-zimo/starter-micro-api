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
exports.FilledProgressNotes = exports.EProgreessStatusValues = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var mongoose_1 = __importDefault(require("mongoose"));
var pagination_configuration_1 = require("../common/pagination/pagination_configuration");
var cpt_model_1 = require("./cpt.model");
var doctor_model_1 = require("./doctor.model");
var filled_dynamic_form_model_1 = require("./filled_dynamic_form.model");
var ict_model_1 = require("./ict.model");
var patient_model_1 = require("./patient.model");
var user_model_1 = require("./user.model");
var EProgreessStatusValues;
(function (EProgreessStatusValues) {
    EProgreessStatusValues["DRAFT"] = "DRAFT";
    EProgreessStatusValues["SAVED"] = "SAVED";
})(EProgreessStatusValues = exports.EProgreessStatusValues || (exports.EProgreessStatusValues = {}));
var CodesObject = /** @class */ (function () {
    function CodesObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({
            ref: ict_model_1.ICTCodes,
            type: mongoose_1.default.Types.ObjectId,
            default: [],
        }),
        __metadata("design:type", Array)
    ], CodesObject.prototype, "ICD_10", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            ref: cpt_model_1.CPTCodes,
            type: mongoose_1.default.Types.ObjectId,
            default: [],
        }),
        __metadata("design:type", Array)
    ], CodesObject.prototype, "cptCode", void 0);
    return CodesObject;
}());
// export class FieldData {
//   @prop({ type: mongoose.Types.ObjectId, default: null })
//   id!: string;
//   @prop({ default: null })
//   value!: any;
// }
var FilledProgressNotes = /** @class */ (function (_super) {
    __extends(FilledProgressNotes, _super);
    function FilledProgressNotes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ _id: false, type: CodesObject, default: null }),
        __metadata("design:type", CodesObject)
    ], FilledProgressNotes.prototype, "codes", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], FilledProgressNotes.prototype, "isDeleted", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User }),
        __metadata("design:type", Object)
    ], FilledProgressNotes.prototype, "clinic_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: doctor_model_1.Doctor }),
        __metadata("design:type", Object)
    ], FilledProgressNotes.prototype, "doctor_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "ProgressNotes" }),
        __metadata("design:type", Object)
    ], FilledProgressNotes.prototype, "progressNote_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: patient_model_1.Patients }),
        __metadata("design:type", Object)
    ], FilledProgressNotes.prototype, "patient_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "Appointment" }),
        __metadata("design:type", Object)
    ], FilledProgressNotes.prototype, "appointment_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "TreatmentPlan" }),
        __metadata("design:type", Object)
    ], FilledProgressNotes.prototype, "treatmentPlan_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], FilledProgressNotes.prototype, "session_narrative", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], FilledProgressNotes.prototype, "treatment_goal", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: filled_dynamic_form_model_1.FieldData, default: [], required: true }),
        __metadata("design:type", Array)
    ], FilledProgressNotes.prototype, "field_data", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "User" }),
        __metadata("design:type", Object)
    ], FilledProgressNotes.prototype, "createdby_id", void 0);
    return FilledProgressNotes;
}(pagination_configuration_1.PaginatedModel));
exports.FilledProgressNotes = FilledProgressNotes;
var FILLED_PROGRESS_NOTES_DB_MODEL = (0, typegoose_1.getModelForClass)(FilledProgressNotes, {
    schemaOptions: {
        collection: "filledProgressNotes",
        timestamps: true,
    },
});
exports.default = FILLED_PROGRESS_NOTES_DB_MODEL;
