import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDate,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import mongoose from "mongoose";
import { EBillingModeValues } from "../../models/billing_payment.model";
import { Clinic } from "../../models/clinic.model";

enum EUserTypeReport {
  PATIENT = "PATIENT",
  INSURANCE = "INSURANCE",
}

export class GetDailyPaymentReportViewmodel {
  @Expose()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  clinic_id!: Ref<Clinic>;

  @IsOptional()
  @Expose()
  @IsEnum(EBillingModeValues, {
    message: "Mode can only be CASH, CARD, CHEQUE or LINK",
  })
  @IsDefined()
  @IsNotEmpty()
  mode?: string;

  @IsOptional()
  @Expose()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  patient_id?: mongoose.Types.ObjectId;

  @IsOptional()
  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  depositDateFrom?: string;

  @IsOptional()
  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  depositDateTo?: string;

  @IsOptional()
  @Expose()
  @IsEnum(EUserTypeReport, {
    message: "user_type can only be PATIENT or INSURANCE",
  })
  @IsDefined()
  @IsNotEmpty()
  user_type?: string;

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
