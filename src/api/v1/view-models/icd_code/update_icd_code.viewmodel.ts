import { mongoose } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  IsEmail,
  IsInt,
  IsDate,
  Length,
  Min,
  Max,
  MinLength,
  MaxLength,
  IsMongoId,
  IsNumber,
  IsOptional,
} from "class-validator";
import { ECodeCategoryValues } from "../../models/ict.model";
import { EBoolValues } from "../../models/user.model";

export class UpdateIcdCodeViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  _id!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  ictCode!: string;

  @Expose()
  @Type(() => String)
  @IsOptional()
  @IsNotEmpty()
  description!: string;

  @Expose()
  @IsEnum(ECodeCategoryValues, {
    message: "Code category can only be ICD-9 or ICD-10",
  })
  @IsOptional()
  @IsNotEmpty()
  codeCategory!: ECodeCategoryValues;

  @IsOptional()
  @Expose()
  @IsEnum(EBoolValues, {
    message: "isActive value must be boolean type i.e true or false",
  })
  isActive?: boolean;

  @IsOptional()
  @Expose()
  @IsEnum(EBoolValues, {
    message: "isDeleted value must be boolean type i.e true or false",
  })
  isDeleted?: boolean;
}
