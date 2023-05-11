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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEditStatusViewmodel = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var mongoose_1 = __importDefault(require("mongoose"));
var billing_checkout_model_1 = require("../../models/billing_checkout.model");
var UpdateEditStatusObjectViewmodel = /** @class */ (function () {
    function UpdateEditStatusObjectViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsEnum)(billing_checkout_model_1.EAcknowledgementStatusValues, {
            message: "acknowledgementStatus value must be from one of them i.e   CH_ACCEPTED,CH_REJECTED,CH_ACCEPTED_WITH_ERROR,SEND_TO_PAYER,PAYER_RECEIVED,PAYER_ACCEPTED,PAYER_REJECTED",
        }),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdateEditStatusObjectViewmodel.prototype, "acknowledgementStatus", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsEnum)(billing_checkout_model_1.EClaimStatusValues, {
            message: "claimStatus value must be from one of them i.e  PATIENT_RESPONSIBLE,BILLED_TO_PATIENT ,CLAIM_GENRATED,SEND_ON_PAPER,SEND_TO_CH,CH_SCRUB_ERROR,CH_CONFIRMED,PAID,REJECTED,COMPLETED",
        }),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdateEditStatusObjectViewmodel.prototype, "claimStatus", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_transformer_1.Type)(function () { return mongoose_1.default.Types.ObjectId; }),
        __metadata("design:type", Object)
    ], UpdateEditStatusObjectViewmodel.prototype, "appointment_id", void 0);
    return UpdateEditStatusObjectViewmodel;
}());
var UpdateEditStatusViewmodel = /** @class */ (function () {
    function UpdateEditStatusViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ArrayNotEmpty)(),
        (0, class_validator_1.ArrayMinSize)(1),
        (0, class_validator_1.ValidateNested)(),
        (0, class_transformer_1.Type)(function () { return UpdateEditStatusObjectViewmodel; }),
        __metadata("design:type", Array)
    ], UpdateEditStatusViewmodel.prototype, "updateArr", void 0);
    return UpdateEditStatusViewmodel;
}());
exports.UpdateEditStatusViewmodel = UpdateEditStatusViewmodel;
