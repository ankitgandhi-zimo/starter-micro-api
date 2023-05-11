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
exports.DeclineAppointmentViewmodel = exports.EDeclineType = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var mongoose_1 = __importDefault(require("mongoose"));
var EDeclineType;
(function (EDeclineType) {
    EDeclineType["B_P_C"] = "B_P_C";
    EDeclineType["B_A_C"] = "B_A_C";
    EDeclineType["R_P_C"] = "R_P_C";
    EDeclineType["R_A_C"] = "R_A_C";
    EDeclineType["B_D"] = "B_D";
    EDeclineType["R_D"] = "R_D";
})(EDeclineType = exports.EDeclineType || (exports.EDeclineType = {}));
var DeclineAppointmentViewmodel = /** @class */ (function () {
    function DeclineAppointmentViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], DeclineAppointmentViewmodel.prototype, "reason", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return mongoose_1.default.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], DeclineAppointmentViewmodel.prototype, "appointmentId", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; }),
        (0, class_validator_1.IsDate)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], DeclineAppointmentViewmodel.prototype, "nowTime", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsEnum)(EDeclineType, {
            message: "type value must be from one of them i.e  'B_P_C', 'B_A_C', 'R_P_C', 'R_A_C', 'B_D', 'R_D'",
        }),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], DeclineAppointmentViewmodel.prototype, "type", void 0);
    return DeclineAppointmentViewmodel;
}());
exports.DeclineAppointmentViewmodel = DeclineAppointmentViewmodel;
