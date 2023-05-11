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
exports.DeleteAppointmentViewmodel = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var user_model_1 = require("../../models/user.model");
var DeleteAppointmentViewmodel = /** @class */ (function () {
    function DeleteAppointmentViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        __metadata("design:type", String)
    ], DeleteAppointmentViewmodel.prototype, "_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsEnum)(user_model_1.EBoolValues, {
            message: "deleteSeries value must be boolean type i.e true or false",
        }),
        __metadata("design:type", String)
    ], DeleteAppointmentViewmodel.prototype, "deleteSeries", void 0);
    return DeleteAppointmentViewmodel;
}());
exports.DeleteAppointmentViewmodel = DeleteAppointmentViewmodel;