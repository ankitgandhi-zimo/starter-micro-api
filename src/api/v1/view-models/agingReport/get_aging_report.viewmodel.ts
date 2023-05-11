import { Expose, Type } from "class-transformer";
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from "class-validator";
import mongoose from "mongoose";
import { EVisitTypeValues } from "../../models/appointment.model";

export enum EnumTab {
  TOTAL_AR = "TOTAL_AR",
  AGING_DOS = "AGING_DOS",
  AGING_SUBMISSION = "AGING_SUBMISSION",
  SUMMARY_DOS = "SUMMARY_DOS",
  SUMMARY_SUBMISSION = "SUMMARY_SUBMISSION",
}

export class GetAgingReportViewmodel {
  @IsOptional()
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  pageNumber?: number;

  @IsOptional()
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  pageSize?: number;

  @IsOptional()
  @Expose()
  @IsEnum(EnumTab, {
    message:
      "tab can only be TOTAL_AR, AGING_DOS, AGING_SUBMISSION, SUMMARY_DOS or SUMMARY_SUBMISSION",
  })
  @IsNotEmpty()
  tab!: EnumTab;

  @IsOptional()
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  clinic_id?: string;

  @IsOptional()
  @Expose()
  @IsEnum(EVisitTypeValues, {
    message: "visitType value must be from one of them i.e Physical,Tele-Call",
  })
  visitType?: string;

  @IsOptional()
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  location_id?: string;

  @IsOptional()
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  doctor_id?: string;

  @IsOptional()
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  insurance_company_id?: string;

  @IsOptional()
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  patient_id?: string;

  @IsOptional()
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  case_type?: string; //is appointment type id

  @IsOptional()
  @Expose()
  @Type(() => String)
  insurance_type?: string; //is plan type

  @IsOptional()
  @Expose()
  @Type(() => String)
  insurance_plan_type?: string; //is plan type

  @IsOptional()
  @Expose()
  startDateTime?: string;

  @IsOptional()
  @Expose()
  endDateTime?: string;

  @IsOptional()
  @Expose()
  @IsArray()
  aging?: number[];
}
