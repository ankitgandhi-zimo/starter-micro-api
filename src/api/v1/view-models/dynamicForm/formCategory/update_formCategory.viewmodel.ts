import { mongoose } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  IsMongoId,
  IsInt,
  IsArray,
  ValidateNested,
  IsObject,
  MaxLength,
  IsEnum,
  ValidateIf,
  IsIn,
  IsOptional,
} from "class-validator";
import { EBoolValues } from "../../../models/user.model";

export class UpdateFormCategoryViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  category!: string;

  @Expose()
  @IsEnum(EBoolValues, {
    message: "isActive value must be boolean type i.e true or false",
  })
  //@IsString()
  @IsOptional()
  @IsNotEmpty()
  isActive!: boolean;

  @IsOptional()
  @Expose()
  @IsEnum(EBoolValues, {
    message: "isDeleted value must be boolean type i.e true or false",
  })
  //@IsString()
  //@IsNotEmpty()
  isDeleted?: boolean;

  //@IsEnum(entity: object)

  @Expose()
  @Type(() => String)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  _id!: string;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  clinic_id!: mongoose.Schema.Types.ObjectId;
}
