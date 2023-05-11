import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsEnum,
  IsInt,
  IsMongoId,
  IsOptional,
  IsNotEmpty,
  IsString,
} from "class-validator";
import mongoose from "mongoose";
import { Clinic } from "../../models/clinic.model";

export class FetchProviderViewmodel {
  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => String)
  clinic_id!: string;
}
