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
exports.Roles = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var user_model_1 = require("./user.model");
var PermissionValues = /** @class */ (function () {
    function PermissionValues() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], PermissionValues.prototype, "label", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: true }),
        __metadata("design:type", Boolean)
    ], PermissionValues.prototype, "read", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: true }),
        __metadata("design:type", Boolean)
    ], PermissionValues.prototype, "write", void 0);
    return PermissionValues;
}());
var PermissionSchema = /** @class */ (function () {
    function PermissionSchema() {
    }
    return PermissionSchema;
}());
var Roles = /** @class */ (function () {
    function Roles() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Roles.prototype, "roleTitle", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Roles.prototype, "roleName", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: true }),
        __metadata("design:type", Boolean)
    ], Roles.prototype, "isActive", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], Roles.prototype, "isDeleted", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], Roles.prototype, "isBillingTeam", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User, default: null }),
        __metadata("design:type", Object)
    ], Roles.prototype, "createdby_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ _id: false }),
        __metadata("design:type", Object)
    ], Roles.prototype, "permission", void 0);
    Roles = __decorate([
        (0, typegoose_1.index)({ roleTitle: "text" })
    ], Roles);
    return Roles;
}());
exports.Roles = Roles;
var ROLES_DB_MODEL = (0, typegoose_1.getModelForClass)(Roles, {
    schemaOptions: {
        collection: "roles",
        timestamps: true,
    },
});
exports.default = ROLES_DB_MODEL;
