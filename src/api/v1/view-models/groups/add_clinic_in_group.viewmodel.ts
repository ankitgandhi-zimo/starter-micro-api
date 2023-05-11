import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsMongoId,
  IsNotEmpty,
} from "class-validator";
import mongoose from "mongoose";
import { Clinic } from "../../models/clinic.model";

export class AddClinicInGroupViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  group_id!: mongoose.Types.ObjectId;

  @Expose()
  @IsDefined()
  @IsArray()
  @IsMongoId({ each: true })
  @ArrayNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  clinic_ids!: Ref<Clinic>[] | null;
}
