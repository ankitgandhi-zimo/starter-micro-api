import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsMongoId,
} from "class-validator";
import mongoose from "mongoose";
import { Clinic } from "../../models/clinic.model";

export class DeleteClinicFromGroupViewmodel {
  @Expose()
  @IsDefined()
  @IsArray()
  @IsMongoId({ each: true })
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @Type(() => mongoose.Types.ObjectId)
  clinic_ids!: Ref<Clinic>[] | null;
}
