import { mongoose, Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  ValidateIf,
} from "class-validator";
import { Clinic } from "../../models/clinic.model";

export class GetFilterProviderListViewmodel {
  @ValidateIf((e) => e.clinic_id != "")
  @IsOptional()
  @Expose()
  @IsMongoId()
  @Type(() => mongoose.Types.ObjectId)
  clinic_id?: Ref<Clinic>;
}
