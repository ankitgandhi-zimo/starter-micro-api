import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { ECoveredValues } from "../../models/financialclass.model";

import { EBoolValues, User } from "../../models/user.model";

export class UpdateFinancialClassViewmodel {
  @Expose()
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
  code?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @Expose()
  @IsDefined()
  @IsEnum(EBoolValues, {
    message:
      "isActive value must be boolean type i.e true or false",
  })
  isActive?: boolean;

  @Expose()
  isDeleted!: boolean;

  @IsOptional()
  @Expose()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  price?: number;

  @IsOptional()
  @Expose()
  @IsEnum(ECoveredValues, {
    message:
      "covered value must be from one of them i.e. INSURANCE,SELFPAY",
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  covered?: string;

  @Expose()
  createdby_id!: Ref<User> | null;
}
