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
  IsOptional,
} from "class-validator";
import { EBoolValues } from "../../../models/user.model";

export class UpdateNoteTypeViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  _id!: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  type?: string;

  // @Expose()
  // @Type(() => Boolean)
  // //@IsDefined()
  // isActive!: boolean;

  // @Expose()
  // @Type(() => Boolean)
  // //@IsDefined()
  // isDeleted!: boolean;

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
}
