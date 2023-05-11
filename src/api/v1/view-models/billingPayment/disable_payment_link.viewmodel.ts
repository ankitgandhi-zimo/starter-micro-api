import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
} from "class-validator";
import mongoose from "mongoose";
import { BillingPayment } from "../../models/billing_payment.model";
import { Clinic } from "../../models/clinic.model";
import { Patients } from "../../models/patient.model";

export class DisabledPaymentLinkViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  payment_id!: Ref<BillingPayment>;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  clinic_id!: Ref<Clinic> | null;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  patient_id!: Ref<Patients>;
}
