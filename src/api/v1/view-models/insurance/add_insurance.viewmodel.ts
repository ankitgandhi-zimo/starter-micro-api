import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import mongoose from "mongoose";
import { Country } from "../../models/country.model";
import { CPTCodes } from "../../models/cpt.model";
import {
  ECopayValues,
  ECoverageValues,
  EInsuranceTypeValues,
} from "../../models/insurance/insurance.model";
import { InsuranceCompany } from "../../models/insurance/insurance_companies.model";
import { Patients } from "../../models/patient.model";
import { States } from "../../models/state.model";

import { User } from "../../models/user.model";
import { EGendervalues } from "../claims/claim_submit.viewmodel";

class CopayObjectViewmodel {
  @Expose()
  @Type(() => Number)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  amount!: number;

  @IsOptional()
  @Expose()
  @IsEnum(ECopayValues, {
    message: "type values must be from one of them i.e. $,/*, %,*/ ",
  })
  @IsDefined()
  @IsNotEmpty()
  type?: ECopayValues;
}

export class AddInsuranceViewmodel {
  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  clinic_id!: Ref<User> | null;

  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  insurance_company_id!: Ref<InsuranceCompany> | null;

  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  patient_id!: Ref<Patients> | null;

  @Expose()
  isActive!: boolean;

  @Expose()
  isDeleted!: boolean;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  mobile_no!: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  group_number?: string;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // title!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  subscriber_id!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  relationship!: string;

  @Expose()
  // @Type(() => Date)
  // @IsDate()
  @IsDefined()
  @IsNotEmpty()
  date_of_birth!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  payer_id!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  issue_date!: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  insurance_name?: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  insurance_city!: string;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // insurance_state!: string;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  insurance_state!: Ref<States>;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  insurance_country!: Ref<Country>;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  insurance_address!: string;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // insurance_country!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  insurance_zip_code!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  insurance_plan_type!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  note!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  subscriber_city!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  subscriber_state!: string;

  @Expose()
  //@Type(() => String)
  //@IsString()
  @IsDefined()
  @IsEnum(EGendervalues, {
    message: "Gender can only be  F, M, Others",
  })
  @IsNotEmpty()
  subscriber_gender!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  subscriber_address!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  subscriber_country!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  subscriber_zip_code!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  subscriber_last_name!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  subscriber_first_name!: string;

  @Expose() // ref can be clinic, patient, frontdesk
  createdby_id!: mongoose.Types.ObjectId;

  @IsOptional()
  @Expose()
  @Type(() => CPTCodes)
  @IsArray()
  @ArrayNotEmpty()
  @IsDefined()
  @IsNotEmpty()
  codes?: Ref<CPTCodes>[] | null;

  @Expose()
  //   @Default("individual")
  @IsEnum(ECoverageValues, {
    message:
      "coverage values must be from one of them i.e. Primary,Secondary,Tertiary",
  })
  @IsDefined()
  @IsNotEmpty()
  coverage!: string;

  @Expose()
  //   @Default("individual")
  @IsEnum(EInsuranceTypeValues, {
    message:
      "insurance_type values must be from one of them i.e. HMO, PPO,EAP,EPO,UNKNOWN ",
  })
  @IsDefined()
  @IsNotEmpty()
  insurance_type!: EInsuranceTypeValues;

  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => CopayObjectViewmodel)
  copay!: CopayObjectViewmodel;
}
