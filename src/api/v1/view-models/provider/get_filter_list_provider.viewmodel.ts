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
  ValidateIf,
} from "class-validator";
import mongoose from "mongoose";
import { Clinic } from "../../models/clinic.model";

export class GetProviderFilterListViewmodel {
  @ValidateIf((e) => e.clinic_id != "")
  @IsOptional()
  @Expose()
  @IsMongoId()
  @Type(() => mongoose.Types.ObjectId)
  clinic_id?: Ref<Clinic>;
}
