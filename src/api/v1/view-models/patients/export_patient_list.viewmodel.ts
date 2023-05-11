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
import { Clinic } from "../../models/clinic.model";

export class ExportPatientListViewmodel {
  @Expose()
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  clinic_id!: Ref<Clinic>;

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

  @IsOptional()
  @Expose()
  //   @IsDefined()
  //   @IsEnum(EBoolValues, {
  //     message:
  //       "isActive value must be boolean type i.e true or false",
  //   })
  isActive?: boolean;

  // @IsOptional()
  // @Expose()
  // @IsDefined()
  // @IsEnum(EBoolValues, {
  //   message:
  //     "isDeleted value must be boolean type i.e true or false",
  // })

  @IsOptional()
  @Expose()
  @Type(() => Boolean)
  isDeleted?: boolean;

  @IsOptional()
  @Expose()
  @Type(() => Boolean)
  isVerified?: boolean;

  @IsOptional()
  @Expose()
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // @Type(() => String)
  name?: string;
}
