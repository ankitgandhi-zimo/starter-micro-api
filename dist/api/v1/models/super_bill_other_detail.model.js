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
exports.SuperBillOtherDetail = exports.Resubmission = exports.InsuranceObject = exports.SpecialProgramCode = exports.ClaimNotes = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var mongoose_1 = __importDefault(require("mongoose"));
var pagination_configuration_1 = require("../common/pagination/pagination_configuration");
var super_bill_model_1 = require("./super_bill.model");
var user_model_1 = require("./user.model");
var ClaimNotes;
(function (ClaimNotes) {
    ClaimNotes["ADD"] = "ADD";
    ClaimNotes["CER"] = "CER";
    ClaimNotes["DCP"] = "DCP";
    ClaimNotes["DGN"] = "DGN";
    ClaimNotes["TPO"] = "TPO";
})(ClaimNotes = exports.ClaimNotes || (exports.ClaimNotes = {}));
var SpecialProgramCode;
(function (SpecialProgramCode) {
    SpecialProgramCode["N02"] = "02";
    SpecialProgramCode["N03"] = "03";
    SpecialProgramCode["N05"] = "05";
    SpecialProgramCode["N09"] = "09";
})(SpecialProgramCode = exports.SpecialProgramCode || (exports.SpecialProgramCode = {}));
var InsuranceObject = /** @class */ (function () {
    function InsuranceObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], InsuranceObject.prototype, "insurance_plan", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], InsuranceObject.prototype, "referral_no", void 0);
    return InsuranceObject;
}());
exports.InsuranceObject = InsuranceObject;
var Resubmission;
(function (Resubmission) {
    Resubmission["N7"] = "7";
    Resubmission["N8"] = "8";
})(Resubmission = exports.Resubmission || (exports.Resubmission = {}));
var SuperBillOtherDetail = /** @class */ (function (_super) {
    __extends(SuperBillOtherDetail, _super);
    function SuperBillOtherDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], SuperBillOtherDetail.prototype, "isDeleted", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: true }),
        __metadata("design:type", Boolean)
    ], SuperBillOtherDetail.prototype, "isActive", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: super_bill_model_1.SuperBill, type: mongoose_1.default.Types.ObjectId }),
        __metadata("design:type", Object)
    ], SuperBillOtherDetail.prototype, "super_bill_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", Array)
    ], SuperBillOtherDetail.prototype, "claim_codes", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: null }),
        __metadata("design:type", String)
    ], SuperBillOtherDetail.prototype, "relinquished_care_date", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: null }),
        __metadata("design:type", String)
    ], SuperBillOtherDetail.prototype, "hearing_vision_date", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: null }),
        __metadata("design:type", String)
    ], SuperBillOtherDetail.prototype, "first_visit_date", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: null }),
        __metadata("design:type", String)
    ], SuperBillOtherDetail.prototype, "acute_manifestation_date", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: null }),
        __metadata("design:type", String)
    ], SuperBillOtherDetail.prototype, "last_seen_date", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: null }),
        __metadata("design:type", String)
    ], SuperBillOtherDetail.prototype, "assumed_care_date", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: null }),
        __metadata("design:type", String)
    ], SuperBillOtherDetail.prototype, "last_x_ray_date", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: null }),
        __metadata("design:type", String)
    ], SuperBillOtherDetail.prototype, "initial_treatment_date", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], SuperBillOtherDetail.prototype, "additional_cliam_info", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], SuperBillOtherDetail.prototype, "ct_project_code", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], SuperBillOtherDetail.prototype, "property_casuality_claim_no", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: ClaimNotes,
            type: String,
            default: ClaimNotes.ADD,
        }),
        __metadata("design:type", String)
    ], SuperBillOtherDetail.prototype, "claim_notes", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], SuperBillOtherDetail.prototype, "other_constitutional", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], SuperBillOtherDetail.prototype, "lab_charges", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], SuperBillOtherDetail.prototype, "mammography_certification_no", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], SuperBillOtherDetail.prototype, "investigational_device_exemption_no", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], SuperBillOtherDetail.prototype, "delay_reason_code", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: SpecialProgramCode,
            type: String,
            default: null,
        }),
        __metadata("design:type", String)
    ], SuperBillOtherDetail.prototype, "special_program_code", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: InsuranceObject, default: [] }),
        __metadata("design:type", Array)
    ], SuperBillOtherDetail.prototype, "insurance_data", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean }),
        __metadata("design:type", Boolean)
    ], SuperBillOtherDetail.prototype, "EPSDT_referral", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: Resubmission,
            type: String,
            default: SpecialProgramCode.N02,
        }),
        __metadata("design:type", String)
    ], SuperBillOtherDetail.prototype, "resubmission_no", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], SuperBillOtherDetail.prototype, "original_ref_no", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], SuperBillOtherDetail.prototype, "remarks", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User, type: mongoose_1.default.Types.ObjectId }),
        __metadata("design:type", Object)
    ], SuperBillOtherDetail.prototype, "createdby_id", void 0);
    return SuperBillOtherDetail;
}(pagination_configuration_1.PaginatedModel));
exports.SuperBillOtherDetail = SuperBillOtherDetail;
var SUPER_BILL_OTHER_DETAIL_DB_MODEL = (0, typegoose_1.getModelForClass)(SuperBillOtherDetail, {
    schemaOptions: {
        collection: "super_bill_other_detail",
        timestamps: true,
    },
});
exports.default = SUPER_BILL_OTHER_DETAIL_DB_MODEL;
