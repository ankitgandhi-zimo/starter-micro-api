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
exports.AddUserRoleViewmodel = exports.PermissionObjectViewModel = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var user_model_1 = require("../../models/user.model");
var PermissionObjectViewModel = /** @class */ (function () {
    function PermissionObjectViewModel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], PermissionObjectViewModel.prototype, "name", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsEnum)(user_model_1.EPermissionValues, {
            message: "key value must be from one of them i.e AVAILABILITY,SCHEDULER,NOTES,SOAPNOTES,TREATMENTPLAN",
        }),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], PermissionObjectViewModel.prototype, "key", void 0);
    return PermissionObjectViewModel;
}());
exports.PermissionObjectViewModel = PermissionObjectViewModel;
var PermissionValuesObjectViewModel = /** @class */ (function () {
    function PermissionValuesObjectViewModel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Boolean)
    ], PermissionValuesObjectViewModel.prototype, "read", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Boolean)
    ], PermissionValuesObjectViewModel.prototype, "write", void 0);
    return PermissionValuesObjectViewModel;
}());
var PermissionSchemaViewModel = /** @class */ (function () {
    function PermissionSchemaViewModel() {
    }
    return PermissionSchemaViewModel;
}());
var AddUserRoleViewmodel = /** @class */ (function () {
    function AddUserRoleViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddUserRoleViewmodel.prototype, "roleTitle", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddUserRoleViewmodel.prototype, "roleName", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", PermissionSchemaViewModel)
    ], AddUserRoleViewmodel.prototype, "permission", void 0);
    __decorate([
        (0, class_transformer_1.Expose)()
        //   @IsDefined()
        //   @IsEnum(EBoolValues, {
        //     message:
        //       "isActive value must be boolean type i.e true or false",
        //   })
        ,
        __metadata("design:type", Boolean)
    ], AddUserRoleViewmodel.prototype, "isActive", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Boolean)
    ], AddUserRoleViewmodel.prototype, "isDeleted", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Boolean)
    ], AddUserRoleViewmodel.prototype, "isBillingTeam", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Object)
    ], AddUserRoleViewmodel.prototype, "createdby_id", void 0);
    return AddUserRoleViewmodel;
}());
exports.AddUserRoleViewmodel = AddUserRoleViewmodel;
