import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import mongoose from "mongoose";
import { EVisitTypeValues } from "../../models/appointment.model";
import { AppointmentType } from "../../models/appointment_types.model";
import { ClaimResponse } from "../../models/claim_response.model";
import { Clinic } from "../../models/clinic.model";
import { CPTCodes } from "../../models/cpt.model";
import { Doctor } from "../../models/doctor.model";
import { ICTCodes } from "../../models/ict.model";
import { ClinicLocation } from "../../models/location.model";

export class GetClaimListViewmodel {
  @IsOptional()
  @Expose()
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  pageNumber?: number;

  @IsOptional()
  @Expose()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  pageSize?: number;

  //@IsOptional()
  @Expose()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  clinic_id?: Ref<Clinic>;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsEnum(EVisitTypeValues, {
    message: "visitType value must be from one of them i.e Physical,Tele-Call",
  })
  @IsNotEmpty()
  visitType?: string;

  @IsOptional()
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  location_id?: Ref<ClinicLocation> | null;

  @IsOptional()
  @Expose()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  patient_id?: mongoose.Types.ObjectId;

  @IsOptional()
  @Expose()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  case_type?: Ref<AppointmentType>;

  @IsOptional()
  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  startDateTime?: string;

  @IsOptional()
  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  endDateTime?: string;

  @IsOptional()
  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  claimSubDateFrom?: string;

  @IsOptional()
  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  claimSubDateTo?: string;

  @IsOptional()
  @Expose()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => String)
  claimId?: string;

  @IsOptional()
  @Expose()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  invoice?: string;

  @IsOptional()
  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  billing_provider_id?: Ref<Doctor>;

  @IsOptional()
  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  rendering_provider_id?: Ref<Doctor>;

  @IsOptional()
  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  referring_provider_id?: Ref<Doctor>;

  @IsOptional()
  @Expose()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsDefined()
  @IsNotEmpty()
  insurance_plan_type?: string[];

  @IsOptional()
  @Expose()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  payer?: string;

  @Expose()
  @IsString()
  //@IsDefined()
  // @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  cpt?: Ref<CPTCodes>;

  @Expose()
  @IsString()
  //@IsDefined()
  // @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  icd?: Ref<ICTCodes>;
}
