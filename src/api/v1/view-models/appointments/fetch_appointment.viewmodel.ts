import { Ref } from "@typegoose/typegoose";
import { Roles } from "aws-sdk/clients/budgets";
import { Expose, Transform, TransformFnParams, Type } from "class-transformer";
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsDate,
  IsDefined,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import mongoose from "mongoose";
import { Clinic } from "../../models/clinic.model";

export class FetchAppointmentViewmodel {
  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => String)
  clinic_id!: string;

  // @Expose()
  // @Type(() => Date)
  // @IsDate()
  // @IsDefined()
  // @IsNotEmpty()
  // lastFetchTime!: string;

  // @Expose()
  // @Type(() => Date)
  // @IsDate()
  // @IsDefined()
  // @IsNotEmpty()
  // currentDateTime!: string;
}
