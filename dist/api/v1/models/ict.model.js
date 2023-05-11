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
exports.ICTCodes = exports.ECodeCategoryValues = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var pagination_configuration_1 = require("../common/pagination/pagination_configuration");
var user_model_1 = require("./user.model");
var ECodeCategoryValues;
(function (ECodeCategoryValues) {
    ECodeCategoryValues["ICD_9"] = "ICD-9";
    ECodeCategoryValues["ICD_10"] = "ICD-10";
})(ECodeCategoryValues = exports.ECodeCategoryValues || (exports.ECodeCategoryValues = {}));
var ICTCodes = /** @class */ (function (_super) {
    __extends(ICTCodes, _super);
    function ICTCodes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], ICTCodes.prototype, "ictCode", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], ICTCodes.prototype, "description", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: true }),
        __metadata("design:type", Boolean)
    ], ICTCodes.prototype, "isActive", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], ICTCodes.prototype, "isDeleted", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User, default: null }),
        __metadata("design:type", Object)
    ], ICTCodes.prototype, "createdby_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: ECodeCategoryValues,
            type: String,
            default: null,
        }),
        __metadata("design:type", String)
    ], ICTCodes.prototype, "codeCategory", void 0);
    ICTCodes = __decorate([
        (0, typegoose_1.index)({ ictCode: "text" })
    ], ICTCodes);
    return ICTCodes;
}(pagination_configuration_1.PaginatedModel));
exports.ICTCodes = ICTCodes;
var ICT_CODE_DB_MODEL = (0, typegoose_1.getModelForClass)(ICTCodes, {
    schemaOptions: {
        collection: "icts",
        timestamps: true,
    },
});
exports.default = ICT_CODE_DB_MODEL;
