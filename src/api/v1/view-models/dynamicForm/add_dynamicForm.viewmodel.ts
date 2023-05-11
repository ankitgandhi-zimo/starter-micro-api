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

export enum InputTypes {
  TextField = "text",
  CheckBox = "checkbox",
  RadioButton = "radio",
  Date = "date",
  Title = "title",
  DropDown = "dropdown",
}

export class FormFields {
  @Expose()
  @IsEnum(InputTypes, {
    message:
      "Input type can only be text, checkbox, radio, title, dropdown or date",
  })
  @IsDefined()
  @IsNotEmpty()
  input_type!: InputTypes;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @MaxLength(30)
  @IsNotEmpty()
  input_label!: string;

  @Expose()
  @IsDefined()
  required!: boolean;

  @ValidateIf(
    (d) =>
      d.input_type == "checkbox" ||
      d.input_type == "radio" ||
      d.input_type == "dropdown"
  )
  @IsDefined()
  @IsNotEmpty()
  @IsArray()
  options!: string[];

  //@ValidateIf((d) => d.input_type == "title")
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  default!: string;
}

export class AddDynamicFormViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  form_title!: string;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  category!: string;
  //@IsEnum(entity: object)

  @Expose()
  //@IsObject()
  @IsDefined()
  @ValidateNested()
  @Type(() => FormFields)
  fields!: FormFields[];

  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @Type(() => Boolean)
  saveAsDraft!: boolean;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  //@IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  createdby_id!: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  //@IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  clinic_id!: mongoose.Schema.Types.ObjectId;
}
