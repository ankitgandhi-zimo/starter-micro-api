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
  IsDate,
} from "class-validator";
import { EStatusValues } from "../../models/filled_dynamic_form.model";
import { FieldData, Remark } from "./add_filledDynamicForm.viewmodel";

export class UpdateFilledDynamicFormViewmodel {
  @Expose()
  @IsArray()
  //@IsDefined()
  @ValidateNested()
  @Type(() => FieldData)
  field_data!: FieldData[];

  @Expose()
  @IsDateString()
  //@IsDefined()
  @Type(() => String)
  received_date!: string;

  @Expose()
  //@IsObject()
  //@IsDefined()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  remarks!: string;

  // @Expose()
  // @IsNotEmpty()
  // @Type(() => Boolean)
  // status!: string;

  @Expose()
  @IsEnum(EStatusValues, {
    message: "Status can only VIEWED, SHARED or REJECTED",
  })
  //@IsDefined()
  @IsNotEmpty()
  status!: EStatusValues;

  @Expose()
  //@IsObject()
  //@IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  filledPercentage!: number;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  _id!: mongoose.Schema.Types.ObjectId;
}
