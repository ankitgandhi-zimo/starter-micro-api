import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
} from "class-validator";
import mongoose from "mongoose";
import { Appointment } from "../../models/appointment.model";
import { User } from "../../models/user.model";

export class MakeAndGetCMS1500Viewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  clinic_id!: Ref<User>;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  appointment_id!: Ref<Appointment> | null;

  @Expose()
  createdby_id!: Ref<User> | null;

  // @Expose()
  // @Type(() => mongoose.Types.ObjectId)
  // @IsMongoId()
  // @IsDefined()
  // @IsNotEmpty()
  // checkout_id!: Ref<BillingCheckout>;
}
