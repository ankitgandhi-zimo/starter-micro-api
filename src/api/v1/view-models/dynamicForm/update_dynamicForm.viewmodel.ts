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
import { EBoolValues } from "../../models/user.model";
import { FormFields } from "./add_dynamicForm.viewmodel";

export class UpdateDynamicFormViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  form_title!: string;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  category!: string;
  //@IsEnum(entity: object)

  @Expose()
  //@IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => FormFields)
  fields!: FormFields[];

  @Expose()
  @IsEnum(EBoolValues, {
    message: "isActive value must be boolean type i.e true or false",
  })
  //@IsString()
  @IsOptional()
  @IsNotEmpty()
  isActive!: boolean;

  @Expose()
  @IsEnum(EBoolValues, {
    message: "isDeleted value must be boolean type i.e true or false",
  })
  //@IsString()
  @IsOptional()
  @IsNotEmpty()
  isDeleted!: boolean;

  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @Type(() => Boolean)
  saveAsDraft!: boolean;

  @Expose()
  @Type(() => String)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  _id!: string;
}
