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
exports.SuperBillAssignment = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var pagination_configuration_1 = require("../common/pagination/pagination_configuration");
var billing_team_model_1 = require("./billing_team.model");
var super_bill_model_1 = require("./super_bill.model");
var user_model_1 = require("./user.model");
var SuperBillAssignment = /** @class */ (function (_super) {
    __extends(SuperBillAssignment, _super);
    function SuperBillAssignment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], SuperBillAssignment.prototype, "discription", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: super_bill_model_1.SuperBill }),
        __metadata("design:type", Object)
    ], SuperBillAssignment.prototype, "superbillId", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User }),
        __metadata("design:type", Object)
    ], SuperBillAssignment.prototype, "assignedTo", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: billing_team_model_1.BillingTeam }),
        __metadata("design:type", Object)
    ], SuperBillAssignment.prototype, "teamId", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User }),
        __metadata("design:type", Object)
    ], SuperBillAssignment.prototype, "createdby_id", void 0);
    SuperBillAssignment = __decorate([
        (0, typegoose_1.index)({ discription: "text" })
    ], SuperBillAssignment);
    return SuperBillAssignment;
}(pagination_configuration_1.PaginatedModel));
exports.SuperBillAssignment = SuperBillAssignment;
var SUPERBILL_ASSIGNMENT_DB_MODEL = (0, typegoose_1.getModelForClass)(SuperBillAssignment, {
    schemaOptions: {
        collection: "superbill_assignment",
        timestamps: true,
    },
});
exports.default = SUPERBILL_ASSIGNMENT_DB_MODEL;
