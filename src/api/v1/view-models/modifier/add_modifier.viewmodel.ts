import { mongoose, Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  IsMongoId,
  IsNumber,
  IsEnum,
} from "class-validator";

export class AddModifierViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  modifierCode!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  description!: string;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsNotEmpty()
  createdby_id!: mongoose.Schema.Types.ObjectId;
}
