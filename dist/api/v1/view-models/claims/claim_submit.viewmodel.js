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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitClaimViewmodel = exports.EGendervalues = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var EGendervalues;
(function (EGendervalues) {
    EGendervalues["M"] = "M";
    EGendervalues["F"] = "F";
    EGendervalues["Others"] = "others";
})(EGendervalues = exports.EGendervalues || (exports.EGendervalues = {}));
// import { User } from "../../models/user.model";
var SubmitterObjectViewmodel = /** @class */ (function () {
    function SubmitterObjectViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], SubmitterObjectViewmodel.prototype, "organizationName", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return ContactInformationObjectViewmodel; }),
        __metadata("design:type", ContactInformationObjectViewmodel)
    ], SubmitterObjectViewmodel.prototype, "contactInformation", void 0);
    return SubmitterObjectViewmodel;
}());
var ReceiverObjectViewmodel = /** @class */ (function () {
    function ReceiverObjectViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], ReceiverObjectViewmodel.prototype, "organizationName", void 0);
    return ReceiverObjectViewmodel;
}());
var DependentObjectViewmodel = /** @class */ (function () {
    function DependentObjectViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], DependentObjectViewmodel.prototype, "memberId", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], DependentObjectViewmodel.prototype, "paymentResponsibilityLevelCode", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], DependentObjectViewmodel.prototype, "firstName", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], DependentObjectViewmodel.prototype, "lastName", void 0);
    __decorate([
        (0, class_transformer_1.Expose)()
        //   @IsEnum(EGendervalues, {
        //     message:
        //       "gender values must br from one of them i.e. M, F or others ",
        //   })
        //   @IsString()
        //   @IsDefined()
        //   @IsNotEmpty()
        ,
        __metadata("design:type", String)
    ], DependentObjectViewmodel.prototype, "gender", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], DependentObjectViewmodel.prototype, "dateOfBirth", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], DependentObjectViewmodel.prototype, "policyNumber", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return AddressObjectViewmodel; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", AddressObjectViewmodel)
    ], DependentObjectViewmodel.prototype, "address", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], DependentObjectViewmodel.prototype, "relationshipToSubscriberCode", void 0);
    return DependentObjectViewmodel;
}());
var CompositeDiagnosisCodePointersViewModel = /** @class */ (function () {
    function CompositeDiagnosisCodePointersViewModel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ArrayNotEmpty)(),
        (0, class_validator_1.ArrayMinSize)(1),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)({ each: true }),
        (0, class_validator_1.IsDefined)(),
        __metadata("design:type", Object)
    ], CompositeDiagnosisCodePointersViewModel.prototype, "diagnosisCodePointers", void 0);
    return CompositeDiagnosisCodePointersViewModel;
}());
var ContactInformationObjectViewmodel = /** @class */ (function () {
    function ContactInformationObjectViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsNumberString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], ContactInformationObjectViewmodel.prototype, "name", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; })
        // @IsNumberString()
        ,
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], ContactInformationObjectViewmodel.prototype, "phoneNumber", void 0);
    return ContactInformationObjectViewmodel;
}());
var SubscriberObjectViewmodel = /** @class */ (function () {
    function SubscriberObjectViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], SubscriberObjectViewmodel.prototype, "memberId", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], SubscriberObjectViewmodel.prototype, "paymentResponsibilityLevelCode", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], SubscriberObjectViewmodel.prototype, "firstName", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], SubscriberObjectViewmodel.prototype, "lastName", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsEnum)(EGendervalues, {
            message: "gender values must br from one of them i.e. M, F or others ",
        }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], SubscriberObjectViewmodel.prototype, "gender", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; }),
        (0, class_validator_1.IsDate)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Date)
    ], SubscriberObjectViewmodel.prototype, "dateOfBirth", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], SubscriberObjectViewmodel.prototype, "policyNumber", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return AddressObjectViewmodel; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", AddressObjectViewmodel)
    ], SubscriberObjectViewmodel.prototype, "address", void 0);
    return SubscriberObjectViewmodel;
}());
var AddressObjectViewmodel = /** @class */ (function () {
    function AddressObjectViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddressObjectViewmodel.prototype, "address1", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddressObjectViewmodel.prototype, "city", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddressObjectViewmodel.prototype, "state", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddressObjectViewmodel.prototype, "postalCode", void 0);
    return AddressObjectViewmodel;
}());
var ProvidersObjectViewmodel = /** @class */ (function () {
    function ProvidersObjectViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], ProvidersObjectViewmodel.prototype, "providerType", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], ProvidersObjectViewmodel.prototype, "npi", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], ProvidersObjectViewmodel.prototype, "employerId", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        __metadata("design:type", String)
    ], ProvidersObjectViewmodel.prototype, "organizationName", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return AddressObjectViewmodel; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", AddressObjectViewmodel)
    ], ProvidersObjectViewmodel.prototype, "address", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return ContactInformationObjectViewmodel; }),
        __metadata("design:type", ContactInformationObjectViewmodel)
    ], ProvidersObjectViewmodel.prototype, "contactInformation", void 0);
    return ProvidersObjectViewmodel;
}());
var HealthCareCodeInformationViewmodel = /** @class */ (function () {
    function HealthCareCodeInformationViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], HealthCareCodeInformationViewmodel.prototype, "diagnosisTypeCode", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], HealthCareCodeInformationViewmodel.prototype, "diagnosisCode", void 0);
    return HealthCareCodeInformationViewmodel;
}());
var ClaimSupplementalInformationViewmodel = /** @class */ (function () {
    function ClaimSupplementalInformationViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], ClaimSupplementalInformationViewmodel.prototype, "repricedClaimNumber", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], ClaimSupplementalInformationViewmodel.prototype, "claimNumber", void 0);
    return ClaimSupplementalInformationViewmodel;
}());
var ServiceFacilityLocationObjViewModel = /** @class */ (function () {
    function ServiceFacilityLocationObjViewModel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], ServiceFacilityLocationObjViewModel.prototype, "organizationName", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return AddressObjectViewmodel; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", AddressObjectViewmodel)
    ], ServiceFacilityLocationObjViewModel.prototype, "address", void 0);
    return ServiceFacilityLocationObjViewModel;
}());
var ClaimInformationObjectViewmodel = /** @class */ (function () {
    function ClaimInformationObjectViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], ClaimInformationObjectViewmodel.prototype, "claimFilingCode", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsNumberString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], ClaimInformationObjectViewmodel.prototype, "patientControlNumber", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsNumberString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], ClaimInformationObjectViewmodel.prototype, "claimChargeAmount", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], ClaimInformationObjectViewmodel.prototype, "placeOfServiceCode", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], ClaimInformationObjectViewmodel.prototype, "claimFrequencyCode", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], ClaimInformationObjectViewmodel.prototype, "signatureIndicator", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], ClaimInformationObjectViewmodel.prototype, "planParticipationCode", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], ClaimInformationObjectViewmodel.prototype, "benefitsAssignmentCertificationIndicator", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], ClaimInformationObjectViewmodel.prototype, "releaseInformationCode", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return ClaimSupplementalInformationViewmodel; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", ClaimSupplementalInformationViewmodel)
    ], ClaimInformationObjectViewmodel.prototype, "claimSupplementalInformation", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.ValidateNested)({ each: true }),
        (0, class_transformer_1.Type)(function () { return HealthCareCodeInformationViewmodel; }),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ArrayNotEmpty)(),
        (0, class_validator_1.ArrayMinSize)(1),
        (0, class_validator_1.IsDefined)(),
        __metadata("design:type", Array)
    ], ClaimInformationObjectViewmodel.prototype, "healthCareCodeInformation", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return ServiceFacilityLocationObjViewModel; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", ServiceFacilityLocationObjViewModel)
    ], ClaimInformationObjectViewmodel.prototype, "serviceFacilityLocation", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.ValidateNested)({ each: true }),
        (0, class_transformer_1.Type)(function () { return ServiceLinesObjectViewmodel; }),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ArrayNotEmpty)(),
        (0, class_validator_1.ArrayMinSize)(1),
        (0, class_validator_1.IsDefined)(),
        __metadata("design:type", Object)
    ], ClaimInformationObjectViewmodel.prototype, "serviceLines", void 0);
    return ClaimInformationObjectViewmodel;
}());
var ServiceLinesObjectViewmodel = /** @class */ (function () {
    function ServiceLinesObjectViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], ServiceLinesObjectViewmodel.prototype, "serviceDate", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return ProfessionalServiceObjViewModel; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", ProfessionalServiceObjViewModel)
    ], ServiceLinesObjectViewmodel.prototype, "professionalService", void 0);
    return ServiceLinesObjectViewmodel;
}());
var ProfessionalServiceObjViewModel = /** @class */ (function () {
    function ProfessionalServiceObjViewModel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], ProfessionalServiceObjViewModel.prototype, "procedureIdentifier", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], ProfessionalServiceObjViewModel.prototype, "lineItemChargeAmount", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], ProfessionalServiceObjViewModel.prototype, "procedureCode", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], ProfessionalServiceObjViewModel.prototype, "measurementUnit", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], ProfessionalServiceObjViewModel.prototype, "serviceUnitCount", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return CompositeDiagnosisCodePointersViewModel; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", CompositeDiagnosisCodePointersViewModel)
    ], ProfessionalServiceObjViewModel.prototype, "compositeDiagnosisCodePointers", void 0);
    return ProfessionalServiceObjViewModel;
}());
var SubmitClaimViewmodel = /** @class */ (function () {
    function SubmitClaimViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsNumberString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.MaxLength)(9),
        __metadata("design:type", String)
    ], SubmitClaimViewmodel.prototype, "controlNumber", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], SubmitClaimViewmodel.prototype, "tradingPartnerServiceId", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return SubmitterObjectViewmodel; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", SubmitterObjectViewmodel)
    ], SubmitClaimViewmodel.prototype, "submitter", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return ReceiverObjectViewmodel; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", ReceiverObjectViewmodel)
    ], SubmitClaimViewmodel.prototype, "receiver", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return SubscriberObjectViewmodel; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", SubscriberObjectViewmodel)
    ], SubmitClaimViewmodel.prototype, "subscriber", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return DependentObjectViewmodel; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", DependentObjectViewmodel)
    ], SubmitClaimViewmodel.prototype, "dependent", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.ValidateNested)({ each: true }),
        (0, class_transformer_1.Type)(function () { return ProvidersObjectViewmodel; }),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ArrayNotEmpty)(),
        (0, class_validator_1.ArrayMinSize)(1),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], SubmitClaimViewmodel.prototype, "providers", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return ClaimInformationObjectViewmodel; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", ClaimInformationObjectViewmodel)
    ], SubmitClaimViewmodel.prototype, "claimInformation", void 0);
    return SubmitClaimViewmodel;
}());
exports.SubmitClaimViewmodel = SubmitClaimViewmodel;
