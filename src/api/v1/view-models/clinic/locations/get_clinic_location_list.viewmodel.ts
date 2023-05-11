import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from "class-validator";
import mongoose from "mongoose";
import { Clinic } from "../../../models/clinic.model";
export class GetClinicLocationListViewmodel {
  @IsOptional()
  @Expose()
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  pageNumber?: number;

  @IsOptional()
  @Expose()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  pageSize?: number;

  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  clinic_id!: Ref<Clinic> | null;

  //   @IsOptional()
  //   @Expose()
  //   @IsEnum(EClinicTypeValues, {
  //     message:
  //       "clinic_type values must be from one of them i.e. individual, group",
  //   })
  //   @IsDefined()
  //   @IsNotEmpty()
  //   clinic_type?: EClinicTypeValues;

  @IsOptional()
  @Expose()
  // @IsDefined()
  // @IsEnum(EBoolValues, {
  //   message:
  //     "isActive value must be boolean type i.e true or false",
  // })
  isActive?: boolean;

  @IsOptional()
  @Expose()
  // @IsDefined()
  // @IsEnum(EBoolValues, {
  //   message:
  //     "isActive value must be boolean type i.e true or false",
  // })
  isDeleted?: boolean;

  @IsOptional()
  @Expose()
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // @Type(() => String)
  search?: string;
}
