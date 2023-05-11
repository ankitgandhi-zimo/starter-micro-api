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
  IsBoolean,
} from "class-validator";
import { EBoolValues } from "../../models/user.model";

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

export class AddFilledTreatmentPlanViewmodel {
  // @Expose()
  // @IsArray()
  // @IsDefined()
  // @ValidateNested()
  // @Type(() => FieldData)
  // field_data!: FieldData[];

  // @Expose()
  // @Type(() => FieldData)
  // @IsArray()
  // @ValidateNested({ each: true })
  // @IsDefined()
  // @IsNotEmpty()
  // field_data!: FieldData[];

  @IsDefined()
  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  // @ArrayMinSize(2)
  // @ArrayMaxSize(2)
  @Type(() => FieldData)
  field_data!: FieldData[];

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  createdby_id!: String;

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  form_id!: String;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  clinic_id!: String;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  doctor_id!: String;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  treatmentPlan_id!: String;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  patient_id!: String;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  appointment_id!: String;

  @Expose()
  // @IsEnum(EBoolValues, {
  //   message: "saveAsDraft value must be boolean type i.e true or false",
  // })
  @Type(() => Boolean)
  @IsBoolean()
  @IsDefined()
  @IsNotEmpty()
  saveAsDraft!: boolean;
}
