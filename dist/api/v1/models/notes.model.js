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
exports.Notes = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var mongoose_1 = __importDefault(require("mongoose"));
var pagination_configuration_1 = require("../common/pagination/pagination_configuration");
var clinic_model_1 = require("./clinic.model");
var note_type_model_1 = require("./note_type.model");
var Notes = /** @class */ (function (_super) {
    __extends(Notes, _super);
    function Notes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Notes.prototype, "notes", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: note_type_model_1.NoteType, type: mongoose_1.default.Types.ObjectId }),
        __metadata("design:type", Object)
    ], Notes.prototype, "note_type", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: clinic_model_1.Clinic, type: mongoose_1.default.Types.ObjectId }),
        __metadata("design:type", Object)
    ], Notes.prototype, "clinic_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "Patients", type: mongoose_1.default.Types.ObjectId }),
        __metadata("design:type", Object)
    ], Notes.prototype, "patient_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], Notes.prototype, "isDeleted", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: true }),
        __metadata("design:type", Boolean)
    ], Notes.prototype, "isActive", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: "User", type: mongoose_1.default.Types.ObjectId }),
        __metadata("design:type", Object)
    ], Notes.prototype, "createdby_id", void 0);
    return Notes;
}(pagination_configuration_1.PaginatedModel));
exports.Notes = Notes;
var NOTES_DB_MODEL = (0, typegoose_1.getModelForClass)(Notes, {
    schemaOptions: {
        collection: "notes",
        timestamps: true,
    },
});
exports.default = NOTES_DB_MODEL;