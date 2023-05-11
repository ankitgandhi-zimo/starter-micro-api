import { mongoose } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from "class-validator";
import { EStatusValues } from "../../models/filled_dynamic_form.model";

export class GetFilledDynamicFormListViewmodel {
  @IsOptional()
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  pageNumber?: number;

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

  @Expose()
  @IsEnum(EStatusValues, {
    message: "Status can only VIEWED, SHARED or REJECTED",
  })
  @IsOptional()
  @IsNotEmpty()
  status!: EStatusValues;

  @IsOptional()
  @Expose()
  @Type(() => Boolean)
  isActive?: boolean;

  @IsOptional()
  @Expose()
  @Type(() => String)
  form_title?: string;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  clinic_id!: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  patient_id!: mongoose.Schema.Types.ObjectId;
}
