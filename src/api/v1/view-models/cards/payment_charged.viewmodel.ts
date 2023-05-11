import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";
import mongoose from "mongoose";
import { Patients } from "../../models/patient.model";

// import { User } from "../../models/user.model";

export class PaymentChargedViewmodel {
  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  amount!: number;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  card_id!: string;

  @Expose()
  @Type(() => String)
  @IsEmail()
  @IsDefined()
  @IsNotEmpty()
  email!: string;

  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  patient_id!: Ref<Patients> | null;
}
