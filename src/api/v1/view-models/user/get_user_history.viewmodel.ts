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
import { EHistoryActivityTypeValues } from "../../models/history.model";
import { User } from "../../models/user.model";

export class GetUserHistoryViewmodel {
  // @IsOptional()
  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  user_id!: Ref<User> | null;

  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(EHistoryActivityTypeValues, {
    message:
      "type value must be from one of them i.e clinic,patient,provider,user,appointment,superbill,claim,payment,checkout,billingteam",
  })
  type!: EHistoryActivityTypeValues;

  @IsOptional()
  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  type_id?: mongoose.Types.ObjectId;

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
}
