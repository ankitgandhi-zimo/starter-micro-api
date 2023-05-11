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
exports.ActivityHistory = exports.EHistoryActivityTypeValues = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var mongoose_1 = __importDefault(require("mongoose"));
var pagination_configuration_1 = require("../common/pagination/pagination_configuration");
var appointment_model_1 = require("./appointment.model");
var patient_model_1 = require("./patient.model");
var user_model_1 = require("./user.model");
var EHistoryActivityTypeValues;
(function (EHistoryActivityTypeValues) {
    EHistoryActivityTypeValues["CLINIC"] = "clinic";
    EHistoryActivityTypeValues["PATIENT"] = "patient";
    EHistoryActivityTypeValues["PROVIDER"] = "provider";
    EHistoryActivityTypeValues["USER"] = "user";
    EHistoryActivityTypeValues["APPOINTMENT"] = "appointment";
    EHistoryActivityTypeValues["SUPERBILL"] = "superbill";
    EHistoryActivityTypeValues["CLAIM"] = "claim";
    EHistoryActivityTypeValues["PAYMENT"] = "payment";
    EHistoryActivityTypeValues["CHECKOUT"] = "checkout";
    EHistoryActivityTypeValues["BillingTeam"] = "billingteam";
    EHistoryActivityTypeValues["ANNOUNCEMENT"] = "announcement";
})(EHistoryActivityTypeValues = exports.EHistoryActivityTypeValues || (exports.EHistoryActivityTypeValues = {}));
var ActivityHistory = /** @class */ (function (_super) {
    __extends(ActivityHistory, _super);
    function ActivityHistory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User }) // person who is performed action(activity by)
        ,
        __metadata("design:type", Object)
    ], ActivityHistory.prototype, "user_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User, default: null }),
        __metadata("design:type", Object)
    ], ActivityHistory.prototype, "doctor_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: patient_model_1.Patients, default: null }),
        __metadata("design:type", Object)
    ], ActivityHistory.prototype, "patient_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: appointment_model_1.Appointment, default: null }),
        __metadata("design:type", Object)
    ], ActivityHistory.prototype, "appointment_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], ActivityHistory.prototype, "description", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: EHistoryActivityTypeValues,
            type: String,
            require: true,
        }),
        __metadata("design:type", String)
    ], ActivityHistory.prototype, "type", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: mongoose_1.default.Types.ObjectId, default: null }),
        __metadata("design:type", mongoose_1.default.Types.ObjectId)
    ], ActivityHistory.prototype, "type_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ _id: false, default: null }),
        __metadata("design:type", Object)
    ], ActivityHistory.prototype, "data", void 0);
    return ActivityHistory;
}(pagination_configuration_1.PaginatedModel));
exports.ActivityHistory = ActivityHistory;
var ACTIVITY_HISTORY_DB_MODEL = (0, typegoose_1.getModelForClass)(ActivityHistory, {
    schemaOptions: {
        collection: "activity_history",
        timestamps: true,
        strict: false,
    },
});
exports.default = ACTIVITY_HISTORY_DB_MODEL;
