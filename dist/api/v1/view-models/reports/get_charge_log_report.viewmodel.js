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
exports.ChargeLogReportViewmodel = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var mongoose_1 = __importDefault(require("mongoose"));
var EUserTypeReport;
(function (EUserTypeReport) {
    EUserTypeReport["PATIENT"] = "PATIENT";
    EUserTypeReport["INSURANCE"] = "INSURANCE";
})(EUserTypeReport || (EUserTypeReport = {}));
var ChargeLogReportViewmodel = /** @class */ (function () {
    function ChargeLogReportViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return mongoose_1.default.Types.ObjectId; }),
        __metadata("design:type", Object)
    ], ChargeLogReportViewmodel.prototype, "clinic_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        (0, class_transformer_1.Type)(function () { return Number; }),
        __metadata("design:type", Number)
    ], ChargeLogReportViewmodel.prototype, "pageNumber", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        (0, class_transformer_1.Type)(function () { return Number; }),
        __metadata("design:type", Number)
    ], ChargeLogReportViewmodel.prototype, "pageSize", void 0);
    return ChargeLogReportViewmodel;
}());
exports.ChargeLogReportViewmodel = ChargeLogReportViewmodel;
