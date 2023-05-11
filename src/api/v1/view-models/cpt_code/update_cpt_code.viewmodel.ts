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
import { EBoolValues } from "../../models/user.model";

export class UpdateCptCodeViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  _id!: string;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  cptCode!: string;

  @Expose()
  @Type(() => String)
  @IsOptional()
  @IsNotEmpty()
  description!: string;

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
