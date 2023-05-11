import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from "class-validator";
import mongoose from "mongoose";
import { EBoolValues, User } from "../../models/user.model";

export class GetFinancialClassListViewmodel {
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
  @IsDefined()
  @IsEnum(EBoolValues, {
    message:
      "isActive value must be boolean type i.e true or false",
  })
  isActive?: string;

  @IsOptional()
  @Expose()
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  clinic_id?: Ref<User> | null;
}
