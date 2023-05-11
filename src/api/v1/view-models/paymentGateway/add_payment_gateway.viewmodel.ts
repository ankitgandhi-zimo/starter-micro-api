import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from "class-validator";
import mongoose from "mongoose";
import { User } from "../../models/user.model";

// import { User } from "../../models/user.model";

export class AddPaymentGatewayViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  public_key!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  secret_key!: string;

  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  clinic_id!: Ref<User> | null;

  @Expose()
  isDeleted!: boolean;

  @Expose()
  isVerified!: boolean;

  //   @Expose()
  //   @Type(() => String)
  //   @IsString()
  //   @IsDefined()
  //   @IsNotEmpty()
  //   number!: string;

  //   @Expose()
  //   @Type(() => Number)
  //   @IsNumber()
  //   @IsDefined()
  //   @IsNotEmpty()
  //   @Type(() => Number)
  //   exp_year!: number;

  //   @Expose()
  //   @Type(() => Number)
  //   @IsNumber()
  //   @IsDefined()
  //   @IsNotEmpty()
  //   @Type(() => Number)
  //   exp_month!: number;

  //   @Expose()
  //   @Type(() => Number)
  //   @IsNumber()
  //   @IsDefined()
  //   @IsNotEmpty()
  //   @Type(() => Number)
  //   cvc!: string;

  //   @Expose()
  //   @Type(() => String)
  //   @IsString()
  //   @IsDefined()
  //   @IsNotEmpty()
  //   cardHolderName!: string;

  //   @Expose()
  //   @IsMongoId()
  //   @IsDefined()
  //   @IsNotEmpty()
  //   @Type(() => mongoose.Types.ObjectId)
  //   clinic_id!: Ref<User> | null;

  //   @Expose()
  //   createdby_id!: Ref<User> | null;

  //   @Expose()
  //   @IsMongoId()
  //   @IsDefined()
  //   @IsNotEmpty()
  //   @Type(() => mongoose.Types.ObjectId)
  //   patient_id!: Ref<Patients> | null;
}
