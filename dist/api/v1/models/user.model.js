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
exports.User = exports.EAcceptedValues = exports.EPermissionValues = exports.EBoolValues = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var mongoose_1 = __importDefault(require("mongoose"));
var pagination_configuration_1 = require("../common/pagination/pagination_configuration");
var EBoolValues;
(function (EBoolValues) {
    EBoolValues["TRUE"] = "true";
    EBoolValues["FALSE"] = "false";
})(EBoolValues = exports.EBoolValues || (exports.EBoolValues = {}));
var EPermissionValues;
(function (EPermissionValues) {
    EPermissionValues["AVAILABILITY"] = "AVAILABILITY";
    EPermissionValues["SCHEDULER"] = "SCHEDULER";
    EPermissionValues["NOTES"] = "NOTES";
    EPermissionValues["SOAPNOTES"] = "SOAPNOTES";
    EPermissionValues["TREATMENTPLAN"] = "TREATMENTPLAN";
})(EPermissionValues = exports.EPermissionValues || (exports.EPermissionValues = {}));
var PermissionObject = /** @class */ (function () {
    function PermissionObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], PermissionObject.prototype, "name", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: EPermissionValues }),
        __metadata("design:type", String)
    ], PermissionObject.prototype, "key", void 0);
    return PermissionObject;
}());
var EAcceptedValues;
(function (EAcceptedValues) {
    EAcceptedValues["ACCEPTED"] = "accepted";
    EAcceptedValues["DECLINED"] = "declined";
    EAcceptedValues["PENDING"] = "pending";
    EAcceptedValues["SIGNUP"] = "signup";
})(EAcceptedValues = exports.EAcceptedValues || (exports.EAcceptedValues = {}));
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User_1 = User;
    var User_1;
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], User.prototype, "first_name", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }),
        __metadata("design:type", String)
    ], User.prototype, "last_name", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            ref: "Roles",
            type: mongoose_1.default.Types.ObjectId,
            default: null,
        }),
        __metadata("design:type", Object)
    ], User.prototype, "role", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: null }),
        __metadata("design:type", Number)
    ], User.prototype, "mobile_no", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], User.prototype, "image", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: User_1, type: mongoose_1.default.Types.ObjectId }),
        __metadata("design:type", Object)
    ], User.prototype, "addedBy_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: true }),
        __metadata("design:type", Boolean)
    ], User.prototype, "isActive", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], User.prototype, "isDeleted", void 0);
    __decorate([
        (0, typegoose_1.prop)(),
        __metadata("design:type", Object)
    ], User.prototype, "role_permission", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], User.prototype, "resetkey", void 0);
    User = User_1 = __decorate([
        (0, typegoose_1.index)({ first_name: "text" })
    ], User);
    return User;
}(pagination_configuration_1.PaginatedModel));
exports.User = User;
var USER_DB_MODEL = (0, typegoose_1.getModelForClass)(User, {
    schemaOptions: {
        collection: "users",
        timestamps: true,
    },
});
exports.default = USER_DB_MODEL;
