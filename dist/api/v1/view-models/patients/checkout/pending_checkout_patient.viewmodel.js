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
exports.PendingCheckoutPatientViewmodel = exports.ETabValues = exports.EDaysValues = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var mongoose_1 = __importDefault(require("mongoose"));
var EDaysValues;
(function (EDaysValues) {
    EDaysValues["TODAY"] = "TODAY";
    EDaysValues["LAST7"] = "LAST7";
    EDaysValues["LAST_MONTH"] = "LAST_MONTH";
})(EDaysValues = exports.EDaysValues || (exports.EDaysValues = {}));
var ETabValues;
(function (ETabValues) {
    ETabValues["PENDING"] = "PENDING";
    ETabValues["NO_SHOW"] = "NO_SHOW";
    ETabValues["CHECKED_OUT"] = "CHECKED_OUT";
    ETabValues["NO_SHOW_CHARGABLE"] = "NO_SHOW_CHARGABLE";
})(ETabValues = exports.ETabValues || (exports.ETabValues = {}));
var PendingCheckoutPatientViewmodel = /** @class */ (function () {
    function PendingCheckoutPatientViewmodel() {
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        __metadata("design:type", Number)
    ], PendingCheckoutPatientViewmodel.prototype, "pageNumber", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        __metadata("design:type", Number)
    ], PendingCheckoutPatientViewmodel.prototype, "pageSize", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; }),
        (0, class_validator_1.IsDate)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Date)
    ], PendingCheckoutPatientViewmodel.prototype, "nowTime", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)()
        // @Default("true")
        // @Expose()
        // @IsDefined()
        // @IsEnum(EBoolValues, {
        //   message:
        //     "todayCase value must be boolean type i.e true or false",
        // })
        ,
        __metadata("design:type", Boolean)
    ], PendingCheckoutPatientViewmodel.prototype, "todayCase", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)()
        // @IsEnum(EBoolValues, {
        //   message:
        //     "chargePatient value must be boolean type i.e true or false",
        // })
        ,
        __metadata("design:type", Boolean)
    ], PendingCheckoutPatientViewmodel.prototype, "chargePatient", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; })
        // @IsDate()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", Date)
    ], PendingCheckoutPatientViewmodel.prototype, "startDateFilter", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; })
        // @IsDate()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", Date)
    ], PendingCheckoutPatientViewmodel.prototype, "endDateFilter", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsMongoId)()
        //@IsDefined()
        ,
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return mongoose_1.default.Types.ObjectId; }),
        __metadata("design:type", Object)
    ], PendingCheckoutPatientViewmodel.prototype, "clinic_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)()
        // @IsMongoId()
        //@IsDefined()
        // @IsNotEmpty()
        // @Type(() => mongoose.Types.ObjectId)
        ,
        __metadata("design:type", Object)
    ], PendingCheckoutPatientViewmodel.prototype, "patient_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsEnum)(ETabValues, {
            message: "tab value must be from one of them i.e PENDING,NO_SHOW,CHECKED_OUT,NO_SHOW_CHARGABLE",
        }),
        __metadata("design:type", String)
    ], PendingCheckoutPatientViewmodel.prototype, "tab", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsMongoId)()
        //@IsDefined()
        ,
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return mongoose_1.default.Types.ObjectId; }),
        __metadata("design:type", Object)
    ], PendingCheckoutPatientViewmodel.prototype, "doctor_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return mongoose_1.default.Types.ObjectId; }),
        __metadata("design:type", Object)
    ], PendingCheckoutPatientViewmodel.prototype, "location_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; })
        //   @IsString()
        //   @IsDefined()
        //   @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], PendingCheckoutPatientViewmodel.prototype, "searchText", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsEnum)(EDaysValues, {
            message: "days value must be from one of them i.e TODAY, LAST7 or LAST_MONTH",
        }),
        __metadata("design:type", String)
    ], PendingCheckoutPatientViewmodel.prototype, "days", void 0);
    return PendingCheckoutPatientViewmodel;
}());
exports.PendingCheckoutPatientViewmodel = PendingCheckoutPatientViewmodel;
