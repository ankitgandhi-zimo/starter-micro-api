import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";
import { ECoveredValues } from "../../models/financialclass.model";

import { User } from "../../models/user.model";

export class AddFinancialClassViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  code!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  description!: string;

  @Expose()
  isActive!: boolean;

  @Expose()
  isDeleted!: boolean;

  @Expose()
  createdby_id!: Ref<User> | null;

  @Expose()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  price!: number;

  @Expose()
  @IsEnum(ECoveredValues, {
    message:
      "covered value must be from one of them i.e. INSURANCE,SELFPAY",
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  covered!: string;
}
