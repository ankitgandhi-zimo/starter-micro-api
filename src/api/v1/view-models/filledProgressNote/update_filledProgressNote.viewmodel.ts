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

export class FieldData {
  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  id!: String;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @MaxLength(30)
  @IsNotEmpty()
  value!: string;
}

export class UpdateFilledProgressNoteViewmodel {
  @Expose()
  //@IsObject()
  @IsDefined()
  @ValidateNested()
  @Type(() => FieldData)
  field_data!: FieldData[];

  @Expose()
  @Type(() => String)
  @IsString()
  @IsOptional()
  @IsMongoId()
  @IsNotEmpty()
  treatment_goal!: String;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsOptional()
  @IsMongoId()
  @IsNotEmpty()
  session_narrative!: String;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // //@IsDefined()
  // @IsMongoId()
  // @IsNotEmpty()
  // createdby_id!: String;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // //@IsDefined()
  // @IsMongoId()
  // @IsNotEmpty()
  // form_id!: String;

  @Expose()
  @Type(() => String)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  clinic_id!: String;

  @Expose()
  @Type(() => String)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  doctor_id!: String;

  @Expose()
  @Type(() => String)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  treatmentPlan_id!: String;

  @Expose()
  @Type(() => String)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  progressNote_id!: String;

  @Expose()
  @Type(() => String)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  patient_id!: String;

  @Expose()
  @Type(() => String)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  appointment_id!: String;

  @Expose()
  @Type(() => String)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  _id!: string;
}
