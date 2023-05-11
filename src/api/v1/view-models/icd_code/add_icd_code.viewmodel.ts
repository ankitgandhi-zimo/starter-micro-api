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
import { ECodeCategoryValues } from "../../models/ict.model";

export class AddIcdCodeViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  ictCode!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  description!: string;

  @Expose()
  @IsEnum(ECodeCategoryValues, {
    message: "Code category can only be ICD-9 or ICD-10",
  })
  @IsDefined()
  @IsNotEmpty()
  codeCategory!: ECodeCategoryValues;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsNotEmpty()
  createdby_id!: mongoose.Schema.Types.ObjectId;
}
