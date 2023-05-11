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
import { EBoolValues } from "../../models/user.model";

export class UpdateNotesViewmodel {
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
  notes!: string;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsNotEmpty()
  note_type!: mongoose.Schema.Types.ObjectId;

  // @Expose()
  // @Type(() => Boolean)
  // //@IsDefined()
  // isActive!: boolean;
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
