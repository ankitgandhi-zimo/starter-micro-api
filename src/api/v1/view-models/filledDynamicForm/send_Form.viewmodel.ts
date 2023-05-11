import { mongoose } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  IsMongoId,
  IsInt,
  IsArray,
  ValidateNested,
  IsObject,
  MaxLength,
  IsEnum,
  ValidateIf,
  IsIn,
  IsDateString,
  IsOptional,
  ArrayNotEmpty,
} from "class-validator";

export class SendFormViewmodel {
  @Expose()
  @Type(() => String)
  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  //@IsMongoId()
  @IsNotEmpty()
  form_ids!: string[];

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  clinic_id!: mongoose.Schema.Types.ObjectId;

  // @Expose()
  // @Type(() => mongoose.Types.ObjectId)
  // @IsDefined()
  // @IsMongoId()
  // @IsNotEmpty()
  // provider_id!: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  patient_id!: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Type(() => String)
  //@IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  createdby_id!: String;
}
