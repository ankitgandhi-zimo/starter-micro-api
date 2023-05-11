import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
} from "class-validator";
import mongoose from "mongoose";
import { Appointment } from "../../models/appointment.model";
import { Patients } from "../../models/patient.model";

export class GetPostPaymentListViewmodel {
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
  appointment_id!: Ref<Appointment> | null;

  //   @Expose()
  //   @Type(() => mongoose.Types.ObjectId)
  //   @IsMongoId()
  //   @IsDefined()
  //   @IsNotEmpty()
  //   clinic_id!: Ref<User> | null;

  //   @Expose()
  //   @Type(() => mongoose.Types.ObjectId)
  //   @IsMongoId()
  //   @IsDefined()
  //   @IsNotEmpty()
  //   superbill_id!: Ref<SuperBill> | null;

  //   @Expose()
  //   createdby_id!: Ref<User> | null;

  //   @IsOptional()
  //   @Expose()
  //   @IsEnum(EPostBillingStatusValues, {
  //     message:
  //       "status value must be from one of them i.e.  POSTED,PUBLISHED",
  //   })
  //   @IsString()
  //   @IsDefined()
  //   @IsNotEmpty()
  //   status?: string;

  //   @Expose()
  //   @Type(() => mongoose.Types.ObjectId)
  //   @IsMongoId()
  //   @IsDefined()
  //   @IsNotEmpty()
  //   checkout_id!: Ref<BillingCheckout> | null;
}
