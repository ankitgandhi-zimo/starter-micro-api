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
exports.ImportTreatmentPlanViewmodel = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var add_treatmentPlan_viewmodel_1 = require("./add_treatmentPlan.viewmodel");
var ImportTreatmentPlanViewmodel = /** @class */ (function () {
    function ImportTreatmentPlanViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", typegoose_1.mongoose.Schema.Types.ObjectId)
    ], ImportTreatmentPlanViewmodel.prototype, "treatment_plan_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsDefined()
        ,
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], ImportTreatmentPlanViewmodel.prototype, "form_title", void 0);
    __decorate([
        (0, class_transformer_1.Expose)()
        //@IsObject()
        // @IsDefined()
        ,
        (0, class_validator_1.ValidateNested)(),
        (0, class_transformer_1.Type)(function () { return add_treatmentPlan_viewmodel_1.FormFields; }),
        __metadata("design:type", Array)
    ], ImportTreatmentPlanViewmodel.prototype, "fields", void 0);
    __decorate([
        (0, class_transformer_1.Expose)()
        //@IsOptional()
        ,
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return Boolean; }),
        __metadata("design:type", Boolean)
    ], ImportTreatmentPlanViewmodel.prototype, "import", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; })
        //@IsDefined()
        ,
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", typegoose_1.mongoose.Schema.Types.ObjectId)
    ], ImportTreatmentPlanViewmodel.prototype, "createdby_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; })
        //@IsDefined()
        ,
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", typegoose_1.mongoose.Schema.Types.ObjectId)
    ], ImportTreatmentPlanViewmodel.prototype, "clinic_id", void 0);
    return ImportTreatmentPlanViewmodel;
}());
exports.ImportTreatmentPlanViewmodel = ImportTreatmentPlanViewmodel;
