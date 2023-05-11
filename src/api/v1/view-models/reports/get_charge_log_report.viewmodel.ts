import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import mongoose from "mongoose";
import { Clinic } from "../../models/clinic.model";

enum EUserTypeReport {
  PATIENT = "PATIENT",
  INSURANCE = "INSURANCE",
}

export class ChargeLogReportViewmodel {
  @Expose()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  clinic_id!: Ref<Clinic>;

  @IsOptional()
  @Expose()
  // @IsDefined()
  // @IsNotEmpty()
  @Type(() => Number)
  pageNumber?: number;

  @IsOptional()
  @Expose()
  // @IsDefined()
  // @IsNotEmpty()
  @Type(() => Number)
  pageSize?: number;
}
