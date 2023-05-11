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
exports.PatientCheckOutViewmodel = exports.CodesObjectViewmodel = exports.EDaysValues = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var mongoose_1 = __importDefault(require("mongoose"));
var EDaysValues;
(function (EDaysValues) {
    EDaysValues["TODAY"] = "TODAY";
    EDaysValues["LAST7"] = "LAST7";
    EDaysValues["LAST_MONTH"] = "LAST_MONTH";
})(EDaysValues = exports.EDaysValues || (exports.EDaysValues = {}));
var CodesObjectViewmodel = /** @class */ (function () {
    function CodesObjectViewmodel() {
    }
    __decorate([
        (0, class_validator_1.ValidateIf)(function (x) { return x.noShow == "false" || x.noShow == false; }),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsArray)()
        //@ArrayNotEmpty()
        ,
        (0, class_validator_1.IsMongoId)({ each: true }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.ArrayMinSize)(1)
        //@Type(() => mongoose.Types.ObjectId)
        ,
        __metadata("design:type", Array)
    ], CodesObjectViewmodel.prototype, "ICD_10", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsArray)()
        //@ArrayNotEmpty()
        ,
        (0, class_validator_1.IsMongoId)({ each: true }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNotEmpty)()
        //@Type(() => mongoose.Types.ObjectId)
        ,
        __metadata("design:type", Array)
    ], CodesObjectViewmodel.prototype, "ICD_9", void 0);
    __decorate([
        (0, class_validator_1.ValidateIf)(function (x) { return x.noShow == "false" || x.noShow == false; }),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsArray)()
        //@ArrayNotEmpty()
        ,
        (0, class_validator_1.IsMongoId)({ each: true }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.ArrayMinSize)(1)
        //@Type(() => mongoose.Types.ObjectId)
        ,
        __metadata("design:type", Array)
    ], CodesObjectViewmodel.prototype, "cptCode", void 0);
    return CodesObjectViewmodel;
}());
exports.CodesObjectViewmodel = CodesObjectViewmodel;
var PatientCheckOutViewmodel = /** @class */ (function () {
    function PatientCheckOutViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; }),
        (0, class_validator_1.IsDate)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Date)
    ], PatientCheckOutViewmodel.prototype, "nowTime", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Number)
    ], PatientCheckOutViewmodel.prototype, "duration", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Boolean; }),
        (0, class_validator_1.IsBoolean)()
        //@IsDefined()
        //@IsNotEmpty()
        ,
        __metadata("design:type", Boolean)
    ], PatientCheckOutViewmodel.prototype, "followUp", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return mongoose_1.default.Types.ObjectId; }),
        __metadata("design:type", Object)
    ], PatientCheckOutViewmodel.prototype, "clinic_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return mongoose_1.default.Types.ObjectId; }),
        __metadata("design:type", Object)
    ], PatientCheckOutViewmodel.prototype, "appointment_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return mongoose_1.default.Types.ObjectId; }),
        __metadata("design:type", Object)
    ], PatientCheckOutViewmodel.prototype, "financialClass_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; })
        //   @IsString()
        //   @IsDefined()
        //   @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], PatientCheckOutViewmodel.prototype, "remark", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; })
        //   @IsString()
        //   @IsDefined()
        //   @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], PatientCheckOutViewmodel.prototype, "notes", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Boolean; }),
        (0, class_validator_1.IsBoolean)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Boolean)
    ], PatientCheckOutViewmodel.prototype, "noShow", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Boolean; }),
        (0, class_validator_1.IsBoolean)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Boolean)
    ], PatientCheckOutViewmodel.prototype, "chargePatient", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
        // @IsEnum(EBoolValues, {
        //   message: "noShow value must be from one of them i.e true  or false",
        // })
        ,
        __metadata("design:type", String)
    ], PatientCheckOutViewmodel.prototype, "placeOfService", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.ValidateNested)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return CodesObjectViewmodel; }),
        __metadata("design:type", CodesObjectViewmodel)
    ], PatientCheckOutViewmodel.prototype, "codes", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], PatientCheckOutViewmodel.prototype, "payer_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], PatientCheckOutViewmodel.prototype, "insurance_name", void 0);
    __decorate([
        (0, class_transformer_1.Expose)()
        //@IsMongoId()
        //@IsDefined()
        //@IsNotEmpty()
        ,
        (0, class_transformer_1.Type)(function () { return mongoose_1.default.Types.ObjectId; }),
        __metadata("design:type", Object)
    ], PatientCheckOutViewmodel.prototype, "insurance_id", void 0);
    return PatientCheckOutViewmodel;
}());
exports.PatientCheckOutViewmodel = PatientCheckOutViewmodel;
