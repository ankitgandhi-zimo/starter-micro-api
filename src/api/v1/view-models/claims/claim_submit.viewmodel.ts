import { Expose, Type } from "class-transformer";
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
  ValidateNested,
} from "class-validator";
export enum EGendervalues {
  M = "M",
  F = "F",
  Others = "others",
}
// import { User } from "../../models/user.model";
class SubmitterObjectViewmodel {
  @Expose()
  @Type(() => String)
  @IsDefined()
  @IsNotEmpty()
  organizationName!: string;

  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => ContactInformationObjectViewmodel)
  contactInformation!: ContactInformationObjectViewmodel;
}
class ReceiverObjectViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  organizationName!: string;
}

class DependentObjectViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  memberId!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  paymentResponsibilityLevelCode!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  firstName!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  lastName!: string;

  @Expose()
  //   @IsEnum(EGendervalues, {
  //     message:
  //       "gender values must br from one of them i.e. M, F or others ",
  //   })
  //   @IsString()
  //   @IsDefined()
  //   @IsNotEmpty()
  gender!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  dateOfBirth!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  policyNumber!: string;

  @Expose()
  @Type(() => AddressObjectViewmodel)
  @IsDefined()
  @IsNotEmpty()
  address!: AddressObjectViewmodel;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  relationshipToSubscriberCode!: string;
}
class CompositeDiagnosisCodePointersViewModel {
  @Expose()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @Type(() => String)
  @IsString({ each: true })
  @IsDefined()
  diagnosisCodePointers!: string[] | null;
}

class ContactInformationObjectViewmodel {
  @Expose()
  @Type(() => String)
  @IsNumberString()
  @IsDefined()
  @IsNotEmpty()
  name!: string;

  @Expose()
  @Type(() => String)
  // @IsNumberString()
  @IsDefined()
  @IsNotEmpty()
  phoneNumber!: string;
}

class SubscriberObjectViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  memberId!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  paymentResponsibilityLevelCode!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  firstName!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  lastName!: string;

  @Expose()
  @IsEnum(EGendervalues, {
    message: "gender values must br from one of them i.e. M, F or others ",
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  gender!: string;

  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  dateOfBirth!: Date;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  policyNumber!: string;

  @Expose()
  @Type(() => AddressObjectViewmodel)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  address!: AddressObjectViewmodel;
}

class AddressObjectViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  address1!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  city!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  state!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  postalCode!: string;
}

class ProvidersObjectViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  providerType!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  npi!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  employerId!: string;

  @Expose()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => String)
  organizationName!: string;

  @Expose()
  @Type(() => AddressObjectViewmodel)
  @IsDefined()
  @IsNotEmpty()
  address!: AddressObjectViewmodel;

  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => ContactInformationObjectViewmodel)
  contactInformation!: ContactInformationObjectViewmodel;
}

class HealthCareCodeInformationViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  diagnosisTypeCode!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  diagnosisCode!: string;
}

class ClaimSupplementalInformationViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  repricedClaimNumber!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  claimNumber!: string;
}
class ServiceFacilityLocationObjViewModel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  organizationName!: string;

  @Expose()
  @Type(() => AddressObjectViewmodel)
  @IsDefined()
  @IsNotEmpty()
  address!: AddressObjectViewmodel;
}
class ClaimInformationObjectViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  claimFilingCode!: string;

  @Expose()
  @Type(() => String)
  @IsNumberString()
  @IsDefined()
  @IsNotEmpty()
  patientControlNumber!: string;

  @Expose()
  @Type(() => String)
  @IsNumberString()
  @IsDefined()
  @IsNotEmpty()
  claimChargeAmount!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  placeOfServiceCode!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  claimFrequencyCode!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  signatureIndicator!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  planParticipationCode!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  benefitsAssignmentCertificationIndicator!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  releaseInformationCode!: string;

  @Expose()
  @Type(() => ClaimSupplementalInformationViewmodel)
  @IsDefined()
  @IsNotEmpty()
  claimSupplementalInformation!: ClaimSupplementalInformationViewmodel;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => HealthCareCodeInformationViewmodel)
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsDefined()
  healthCareCodeInformation!: HealthCareCodeInformationViewmodel[];

  @Expose()
  @Type(() => ServiceFacilityLocationObjViewModel)
  @IsDefined()
  @IsNotEmpty()
  serviceFacilityLocation!: ServiceFacilityLocationObjViewModel;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => ServiceLinesObjectViewmodel)
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsDefined()
  serviceLines!: ServiceLinesObjectViewmodel[] | null;
}

class ServiceLinesObjectViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  serviceDate!: string;

  @Expose()
  @Type(() => ProfessionalServiceObjViewModel)
  @IsDefined()
  @IsNotEmpty()
  professionalService!: ProfessionalServiceObjViewModel;
}

class ProfessionalServiceObjViewModel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  procedureIdentifier!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  lineItemChargeAmount!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  procedureCode!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  measurementUnit!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  serviceUnitCount!: string;

  @Expose()
  @Type(() => CompositeDiagnosisCodePointersViewModel)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  compositeDiagnosisCodePointers!: CompositeDiagnosisCodePointersViewModel;
}

export class SubmitClaimViewmodel {
  @Expose()
  @Type(() => String)
  @IsNumberString()
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(9)
  controlNumber!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  tradingPartnerServiceId!: string;

  @Expose()
  @Type(() => SubmitterObjectViewmodel)
  @IsDefined()
  @IsNotEmpty()
  submitter!: SubmitterObjectViewmodel;

  @Expose()
  @Type(() => ReceiverObjectViewmodel)
  @IsDefined()
  @IsNotEmpty()
  receiver!: ReceiverObjectViewmodel;

  @Expose()
  @Type(() => SubscriberObjectViewmodel)
  @IsDefined()
  @IsNotEmpty()
  subscriber!: SubscriberObjectViewmodel;

  @Expose()
  @Type(() => DependentObjectViewmodel)
  @IsDefined()
  @IsNotEmpty()
  dependent!: DependentObjectViewmodel;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => ProvidersObjectViewmodel)
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsDefined()
  @IsNotEmpty()
  providers!: ProvidersObjectViewmodel[] | null;

  @Expose()
  @Type(() => ClaimInformationObjectViewmodel)
  @IsDefined()
  @IsNotEmpty()
  claimInformation!: ClaimInformationObjectViewmodel;
}
