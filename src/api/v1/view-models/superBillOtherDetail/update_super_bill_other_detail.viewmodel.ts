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
import {
  ClaimNotes,
  Resubmission,
  SpecialProgramCode,
  SuperBillOtherDetail,
} from "../../models/super_bill_other_detail.model";
import { InsuranceObj } from "./add_super_bill_other_detail.viewmodel";

export class UpdateSuperBillOtherDetailViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsOptional()
  @IsMongoId()
  @IsNotEmpty()
  super_bill_id!: string;

  @Expose()
  @Type(() => String)
  //@IsArray()
  //@IsMongoId({ each: true })
  //@IsNotEmpty()
  claim_codes?: string[];

  @Expose()
  @Type(() => Date)
  // @IsDateString()
  // @IsNotEmpty()
  relinquished_care_date?: string;

  @Expose()
  @Type(() => Date)
  // @IsDateString()
  // @IsNotEmpty()
  hearing_vision_date?: string;

  @Expose()
  @Type(() => Date)
  // @IsDateString()
  // @IsNotEmpty()
  first_visit_date?: string;

  @Expose()
  @Type(() => Date)
  // @IsDateString()
  // @IsNotEmpty()
  acute_manifestation_date?: string;

  @Expose()
  @Type(() => Date)
  // @IsDateString()
  // @IsNotEmpty()
  last_seen_date?: string;

  @Expose()
  @Type(() => Date)
  // @IsDateString()
  // @IsNotEmpty()
  assumed_care_date?: string;

  @Expose()
  @Type(() => Date)
  //@IsDateString()
  //@IsNotEmpty()
  last_x_ray_date?: string;

  @Expose()
  @Type(() => Date)
  //@IsDateString()
  //@IsNotEmpty()
  initial_treatment_date?: string;

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsNotEmpty()
  additional_cliam_info?: string;

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsNotEmpty()
  ct_project_code?: string;

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsNotEmpty()
  property_casuality_claim_no?: string;

  @Expose()
  // @IsEnum(ClaimNotes, {
  //   message: "Status can only be ADD, CER, DCP, DGN or TPO",
  // })
  //@IsNotEmpty()
  claim_notes?: ClaimNotes;

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsNotEmpty()
  other_constitutional?: string;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  //@IsNotEmpty()
  lab_charges?: number;

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsNotEmpty()
  mammography_certification_no?: string;

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsNotEmpty()
  investigational_device_exemption_no?: string;

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsNotEmpty()
  delay_reason_code?: string;

  @Expose()
  // @IsEnum(SpecialProgramCode, {
  //   message: "Status can only be 02, 03, 05, or 09",
  // })
  //@IsNotEmpty()
  special_program_code?: SpecialProgramCode;

  @Expose()
  @IsArray()
  //@ArrayNotEmpty()
  //@ValidateNested()
  @Type(() => InsuranceObj)
  insurance_data?: InsuranceObj[];

  @Expose()
  @Type(() => Boolean)
  //@IsNotEmpty()
  EPSDT_referral?: boolean;

  @Expose()
  // @IsEnum(Resubmission, {
  //   message: "Status can only be 7, 8",
  // })
  //@IsNotEmpty()
  resubmission_no?: Resubmission;

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsNotEmpty()
  original_ref_no?: string;

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsNotEmpty()
  remarks?: string;
}
