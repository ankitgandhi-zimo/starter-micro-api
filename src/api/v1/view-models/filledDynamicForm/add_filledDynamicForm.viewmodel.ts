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
  IsDateString,
  IsOptional,
} from "class-validator";

export class FieldData {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  id!: String;

  @Expose()
  //@Type(() => String)
  //@IsString()
  //@IsDefined()
  //@MaxLength(30)
  //@IsNotEmpty()
  value!: any;
}
export class Remark {
  @Expose()
  @Type(() => Date)
  @IsDateString()
  //@IsDefined()
  @IsNotEmpty()
  date!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  remark!: string;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsOptional()
  @IsNotEmpty()
  by!: mongoose.Schema.Types.ObjectId;
}
export class AddFilledDynamicFormViewmodel {
  @Expose()
  //@IsObject()
  //@IsDefined()
  @ValidateNested()
  @Type(() => FieldData)
  field_data!: FieldData[];

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  //@IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  form_id!: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  clinic_id!: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  provider_id!: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  patient_id!: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Type(() => String)
  //@IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  createdby_id!: String;
}
