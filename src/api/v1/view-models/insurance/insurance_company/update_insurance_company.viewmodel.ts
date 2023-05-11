import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import mongoose from "mongoose";
import { InsuranceCompany } from "../../../models/insurance/insurance_companies.model";

import {
  EBoolValues,
  User,
} from "../../../models/user.model";

export class UpdateInsuranceCompanyViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  _id!: Ref<InsuranceCompany>;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  companyName?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  mobile_number?: string;

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
  city?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  state?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  country?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  postalCode?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  payer_id?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  notes?: string;

  @Expose()
  clinic_id!: Ref<User> | null;

  @Expose()
  createdby_id!: Ref<User> | null;

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
}
