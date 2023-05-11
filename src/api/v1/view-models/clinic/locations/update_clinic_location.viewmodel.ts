import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import mongoose from "mongoose";
import { Clinic } from "../../../models/clinic.model";
import { Country } from "../../../models/country.model";
import { States } from "../../../models/state.model";

import { EBoolValues } from "../../../models/user.model";

export class UpdateClinicLocationViewmodel {
  @Expose()
  @Type(() => String)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  _id!: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  city?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  branchName?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  postal_code?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  npiNo?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  fed_id?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  taxonomy?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  address?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  mobile_other!: string;

  @IsOptional()
  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  country?: Ref<Country> | null;

  @IsOptional()
  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  state?: Ref<States> | null;

  @Expose()
  clinic_id!: Ref<Clinic> | null;

  @IsOptional()
  @Expose()
  @IsDefined()
  @IsEnum(EBoolValues, {
    message:
      "isActive value must be boolean type i.e true or false",
  })
  isActive?: boolean;

  @IsOptional()
  @Expose()
  @IsDefined()
  @IsEnum(EBoolValues, {
    message:
      "isDeleted value must be boolean type i.e true or false",
  })
  isDeleted?: boolean;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  office?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  fax?: string;
}
