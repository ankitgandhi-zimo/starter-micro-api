import { mongoose, Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  IsMongoId,
  IsNumber,
} from "class-validator";

export class AddCptCodeViewmodel {
  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  price!: number;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  cptCode!: string;

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
