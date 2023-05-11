import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import mongoose from "mongoose";
import { Clinic } from "../../../models/clinic.model";

export class GetPatientDocumentListViewmodel {
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

  @Expose()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  clinic_id!: Ref<Clinic>;

  @Expose()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  patient_id!: mongoose.Types.ObjectId;
}
