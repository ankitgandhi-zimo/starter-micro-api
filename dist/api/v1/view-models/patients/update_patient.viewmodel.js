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
exports.UpdatePatientViewmodel = exports.PermissionObjectViewModel = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var mongoose_1 = __importDefault(require("mongoose"));
var patient_model_1 = require("../../models/patient.model");
var user_model_1 = require("../../models/user.model");
var claim_submit_viewmodel_1 = require("../claims/claim_submit.viewmodel");
var PermissionObjectViewModel = /** @class */ (function () {
    function PermissionObjectViewModel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], PermissionObjectViewModel.prototype, "name", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsEnum)(user_model_1.EPermissionValues, {
            message: "key value must be from one of them i.e AVAILABILITY,SCHEDULER,NOTES,SOAPNOTES,TREATMENTPLAN",
        }),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], PermissionObjectViewModel.prototype, "key", void 0);
    return PermissionObjectViewModel;
}());
exports.PermissionObjectViewModel = PermissionObjectViewModel;
var PaymentObjectViewmodel = /** @class */ (function () {
    function PaymentObjectViewmodel() {
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsEnum)(patient_model_1.EModeValues, {
            message: "mode value must be from one of them i.e FULL, SPLIT or EMI",
        }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], PaymentObjectViewmodel.prototype, "mode", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", FullObjectViewModel)
    ], PaymentObjectViewmodel.prototype, "full", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", EmiObjectViewModel)
    ], PaymentObjectViewmodel.prototype, "emi", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", Object)
    ], PaymentObjectViewmodel.prototype, "split", void 0);
    return PaymentObjectViewmodel;
}());
var FullObjectViewModel = /** @class */ (function () {
    function FullObjectViewModel() {
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], FullObjectViewModel.prototype, "email", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsEnum)(patient_model_1.EFullValues, {
            message: "type value must be from one of them i.e  CASH,CARD,CHEQUE,LINK",
        }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], FullObjectViewModel.prototype, "type", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return mongoose_1.default.Types.ObjectId; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], FullObjectViewModel.prototype, "card_id", void 0);
    return FullObjectViewModel;
}());
var EmiObjectViewModel = /** @class */ (function () {
    function EmiObjectViewModel() {
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsEnum)(patient_model_1.EOccurenceValues, {
            message: "type value must be from one of them i.e FIFTEEN,THIRTY,FOURTYFIVE,ZERO ",
        }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Number)
    ], EmiObjectViewModel.prototype, "type", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsEnum)(patient_model_1.EOccurenceValues, {
            message: "occurrence value must be from one of them i.e FIFTEEN,THIRTY,FOURTYFIVE,ZERO ",
        }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Number)
    ], EmiObjectViewModel.prototype, "occurrence", void 0);
    return EmiObjectViewModel;
}());
var SplitObjectViewModel = /** @class */ (function () {
    function SplitObjectViewModel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", P1ObjectViewModel)
    ], SplitObjectViewModel.prototype, "p1", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", P2ObjectViewmodel)
    ], SplitObjectViewModel.prototype, "p2", void 0);
    return SplitObjectViewModel;
}());
var P1ObjectViewModel = /** @class */ (function () {
    function P1ObjectViewModel() {
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], P1ObjectViewModel.prototype, "email", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsEnum)(patient_model_1.EModeValues, {
            message: "type value must be from one of them i.e FULL, SPLIT or EMI",
        }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], P1ObjectViewModel.prototype, "type", void 0);
    return P1ObjectViewModel;
}());
var P2ObjectViewmodel = /** @class */ (function () {
    function P2ObjectViewmodel() {
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], P2ObjectViewmodel.prototype, "email", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsEnum)(patient_model_1.EModeValues, {
            message: "type value must be from one of them i.e FULL, SPLIT or EMI",
        }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], P2ObjectViewmodel.prototype, "type", void 0);
    return P2ObjectViewmodel;
}());
var UpdatePatientViewmodel = /** @class */ (function () {
    function UpdatePatientViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return mongoose_1.default.Types.ObjectId; }),
        __metadata("design:type", Object)
    ], UpdatePatientViewmodel.prototype, "_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ArrayNotEmpty)(),
        (0, class_validator_1.ArrayUnique)(),
        (0, class_validator_1.IsString)({ each: true }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], UpdatePatientViewmodel.prototype, "cards", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Object)
    ], UpdatePatientViewmodel.prototype, "financialClass_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)()
        // @IsMongoId()
        // @IsDefined()
        // @IsNotEmpty()
        // @Type(() => mongoose.Types.ObjectId)
        ,
        __metadata("design:type", Object)
    ], UpdatePatientViewmodel.prototype, "clinic_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)()
        // @IsMongoId()
        // @IsDefined()
        // @IsNotEmpty()
        // @Type(() => mongoose.Types.ObjectId)
        ,
        __metadata("design:type", Object)
    ], UpdatePatientViewmodel.prototype, "role", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Object)
    ], UpdatePatientViewmodel.prototype, "role_permission", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdatePatientViewmodel.prototype, "title", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Transform)(function (_a) {
            var value = _a.value;
            return value === null || value === void 0 ? void 0 : value.trim();
        }),
        __metadata("design:type", String)
    ], UpdatePatientViewmodel.prototype, "first_name", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdatePatientViewmodel.prototype, "last_name", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsDefined()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdatePatientViewmodel.prototype, "middle_name", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsDefined()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdatePatientViewmodel.prototype, "image", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        //@IsDefined()
        //@IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdatePatientViewmodel.prototype, "responsible_person", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)()
        //@Type(() => String)
        //@IsString()
        ,
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsEnum)(claim_submit_viewmodel_1.EGendervalues, {
            message: "Gender can only be  F, M, Others",
        }),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdatePatientViewmodel.prototype, "gender", void 0);
    __decorate([
        (0, class_transformer_1.Expose)() // generated by self Fist letter first name and fist letter of last name---total 9 digit nemric number
        // @Type(() => String)
        // @IsString()
        // @IsDefined()
        // @IsNotEmpty()
        // @MaxLength(7)
        ,
        __metadata("design:type", String)
    ], UpdatePatientViewmodel.prototype, "patientId", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdatePatientViewmodel.prototype, "GI", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)()
        // @IsDefined()
        // @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], UpdatePatientViewmodel.prototype, "SO", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdatePatientViewmodel.prototype, "SSN", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsEmail)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdatePatientViewmodel.prototype, "email", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)()
        // @Type(() => Date)
        // @IsDate()
        // @IsDefined()
        ,
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdatePatientViewmodel.prototype, "date_of_birth", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdatePatientViewmodel.prototype, "marital_status", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdatePatientViewmodel.prototype, "appartment", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdatePatientViewmodel.prototype, "address", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdatePatientViewmodel.prototype, "postal_code", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], UpdatePatientViewmodel.prototype, "city", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return mongoose_1.default.Types.ObjectId; }),
        __metadata("design:type", Object)
    ], UpdatePatientViewmodel.prototype, "country", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return mongoose_1.default.Types.ObjectId; }),
        __metadata("design:type", Object)
    ], UpdatePatientViewmodel.prototype, "state", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Object)
    ], UpdatePatientViewmodel.prototype, "createdby_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.MinLength)(8, {
            message: "Password length can not less than 8 character",
        }),
        (0, class_validator_1.MaxLength)(20, {
            message: "Password length can not greater than 20 character",
        }),
        (0, class_validator_1.Matches)(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/, {
            message: "Password must have one number and one capital letter and one special character.",
        }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        __metadata("design:type", String)
    ], UpdatePatientViewmodel.prototype, "password", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", String)
    ], UpdatePatientViewmodel.prototype, "time_zone", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", String)
    ], UpdatePatientViewmodel.prototype, "customer_id_stripe", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Boolean)
    ], UpdatePatientViewmodel.prototype, "isActive", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Boolean)
    ], UpdatePatientViewmodel.prototype, "isVerified", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Boolean)
    ], UpdatePatientViewmodel.prototype, "mergeStatus", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)()
        // @IsDefined()
        // @IsEnum(EBoolValues, {
        //   message:
        //     "isDeleted value must be boolean type i.e true or false",
        // })
        ,
        __metadata("design:type", Boolean)
    ], UpdatePatientViewmodel.prototype, "isDeleted", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Object)
    ], UpdatePatientViewmodel.prototype, "contact", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", PaymentObjectViewmodel)
    ], UpdatePatientViewmodel.prototype, "payment", void 0);
    return UpdatePatientViewmodel;
}());
exports.UpdatePatientViewmodel = UpdatePatientViewmodel;
