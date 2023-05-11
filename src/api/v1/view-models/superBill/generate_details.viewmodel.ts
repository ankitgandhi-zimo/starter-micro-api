import { mongoose, Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

export class GenerateDetailsViewmodel {
  @Expose()
  @Type(() => String)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  clinic_id!: string;

  @Expose()
  @Type(() => String)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  appointment_id!: string;

  @Expose()
  @Type(() => String)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  checkout_id!: string;
}
