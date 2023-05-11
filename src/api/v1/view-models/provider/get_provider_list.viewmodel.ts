import { mongoose, Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from "class-validator";
import { Clinic } from "../../models/clinic.model";

export class GetProviderListViewmodel {
  @IsOptional()
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  pageNumber?: number;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  clinic_id!: Ref<Clinic>;

  @IsOptional()
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  pageSize?: number;

  @IsOptional()
  @Expose()
  @Type(() => String)
  search?: string;

  @IsOptional()
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  isDeleted?: boolean;

  @IsOptional()
  @Expose()
  @Type(() => Boolean)
  isActive?: boolean;
}
