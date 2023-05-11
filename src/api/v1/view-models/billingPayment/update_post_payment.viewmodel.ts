import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import mongoose from "mongoose";
import { EPostBillingStatusValues } from "../../models/billing_post_payment.model";

export class UpdatePostPaymentViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  _id!: mongoose.Types.ObjectId;

  @IsOptional()
  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  copay?: number;

  @IsOptional()
  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  deductible?: number;

  @IsOptional()
  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  adjustment?: number;

  @IsOptional()
  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  due_amount?: number;

  @IsOptional()
  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  co_insurance?: number;

  @IsOptional()
  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  allowed_amount?: number;

  @IsOptional()
  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  insurance_paid?: number;

  @IsOptional()
  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  secondary_balance_due?: number;

  @IsOptional()
  @Expose()
  @IsEnum(EPostBillingStatusValues, {
    message:
      "status value must be from one of them i.e.  POSTED,PUBLISHED",
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  status?: string;
}
