import { Ref } from "@typegoose/typegoose";
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
import { Appointment } from "../../models/appointment.model";
import { BillingCheckout } from "../../models/billing_checkout.model";
import { EPostBillingStatusValues } from "../../models/billing_post_payment.model";
import { Patients } from "../../models/patient.model";
import { SuperBill } from "../../models/super_bill.model";
import { User } from "../../models/user.model";

export class AddPostPaymentViewmodel {
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

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  clinic_id!: Ref<User> | null;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  patient_id!: Ref<Patients> | null;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  superbill_id!: Ref<SuperBill> | null;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  appointment_id!: Ref<Appointment> | null;

  @Expose()
  createdby_id!: Ref<User> | null;

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

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  checkout_id!: Ref<BillingCheckout> | null;
}
