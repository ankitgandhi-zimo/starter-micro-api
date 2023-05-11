import { mongoose, Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  IsMongoId,
  ValidateNested,
  IsObject,
  IsDateString,
  IsNumberString,
  IsNumber,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  IsEnum,
} from "class-validator";
import { SuperBill } from "../../models/super_bill.model";
import {
  ClaimNotes,
  Resubmission,
  SpecialProgramCode,
} from "../../models/super_bill_other_detail.model";

export class InsuranceObj {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  insurance_plan!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  referral_no!: string;
}

export class AddSuperBillOtherDetailViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  super_bill_id!: Ref<SuperBill>;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsArray()
  //@IsDefined()
  //@IsMongoId({ each: true })
  //@IsNotEmpty()
  claim_codes?: string[];

  @IsOptional()
  @Expose()
  @Type(() => Date)
  //@IsDateString()
  //@IsDefined()
  //@IsNotEmpty()
  relinquished_care_date?: string;

  @IsOptional()
  @Expose()
  @Type(() => Date)
  //@IsDateString()
  //@IsDefined()
  //@IsNotEmpty()
  hearing_vision_date?: string;

  @IsOptional()
  @Expose()
  @Type(() => Date)
  //@IsDateString()
  // @IsDefined()
  // @IsNotEmpty()
  first_visit_date?: string;

  @IsOptional()
  @Expose()
  @Type(() => Date)
  //@IsDateString()
  // @IsDefined()
  // @IsNotEmpty()
  acute_manifestation_date?: string;

  @IsOptional()
  @Expose()
  @Type(() => Date)
  //@IsDateString()
  // @IsDefined()
  // @IsNotEmpty()
  last_seen_date?: string;

  @IsOptional()
  @Expose()
  @Type(() => Date)
  //@IsDateString()
  // @IsDefined()
  // @IsNotEmpty()
  assumed_care_date?: string;

  @IsOptional()
  @Expose()
  @Type(() => Date)
  //@IsDateString()
  // @IsDefined()
  // @IsNotEmpty()
  last_x_ray_date?: string;

  @IsOptional()
  @Expose()
  @Type(() => Date)
  //@IsDateString()
  // @IsDefined()
  // @IsNotEmpty()
  initial_treatment_date?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  additional_cliam_info?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  ct_project_code?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  property_casuality_claim_no?: string;

  @IsOptional()
  @Expose()
  @IsEnum(ClaimNotes, {
    message: "Notes can only be ADD, CER, DCP, DGN or TPO",
  })
  // @IsDefined()
  // @IsNotEmpty()
  claim_notes?: ClaimNotes;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  other_constitutional?: string;

  @IsOptional()
  @Expose()
  @Type(() => Number)
  @IsNumber()
  // @IsDefined()
  // @IsNotEmpty()
  lab_charges?: number;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  mammography_certification_no?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  investigational_device_exemption_no?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  delay_reason_code?: string;

  @IsOptional()
  @Expose()
  @IsEnum(SpecialProgramCode, {
    message: "Status can only be 02, 03, 05, or 09",
  })
  // @IsDefined()
  // @IsNotEmpty()
  special_program_code?: SpecialProgramCode;

  @IsOptional()
  @Expose()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => InsuranceObj)
  insurance_data?: InsuranceObj[];

  @IsOptional()
  @Expose()
  @Type(() => Boolean)
  // @IsDefined()
  // @IsNotEmpty()
  EPSDT_referral?: boolean;

  @IsOptional()
  @Expose()
  @IsEnum(Resubmission, {
    message: "Resubmission code can only be 7, 8",
  })
  // @IsDefined()
  // @IsNotEmpty()
  resubmission_no?: Resubmission;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  original_ref_no?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  remarks?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  // @IsMongoId()
  // @IsNotEmpty()
  createdby_id!: string;
}
