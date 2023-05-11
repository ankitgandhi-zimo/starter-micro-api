import { mongoose } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  IsEmail,
  IsInt,
  IsDate,
  Length,
  Min,
  Max,
  MinLength,
  MaxLength,
  IsMongoId,
} from "class-validator";

export class UpdateEPriscriptionViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  _id!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  medicine!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsNotEmpty()
  strength!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsNotEmpty()
  frequency!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsNotEmpty()
  precaution!: string;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsNotEmpty()
  clinic_id!: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsNotEmpty()
  patient_id!: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsNotEmpty()
  doctor_id!: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  //@IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  appointment_id!: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Type(() => Boolean)
  //@IsDefined()
  isActive!: boolean;

  @Expose()
  @Type(() => Boolean)
  //@IsDefined()
  isDeleted!: boolean;
}
