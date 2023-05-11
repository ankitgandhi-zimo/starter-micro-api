import { mongoose, Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import { IsDefined, IsMongoId, IsNotEmpty, IsOptional } from "class-validator";

import { Doctor } from "../../models/doctor.model";

export class GetFilterListViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  doctor_id!: Ref<Doctor>;
}
