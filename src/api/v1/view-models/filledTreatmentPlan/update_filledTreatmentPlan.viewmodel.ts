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

export class UpdateFilledTreatmentPlanViewmodel {
  @Expose()
  //@IsObject()
  @IsDefined()
  @ValidateNested()
  @Type(() => FieldData)
  field_data!: FieldData[];

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // //@IsDefined()
  // @IsMongoId()
  // @IsNotEmpty()
  // createdby_id!: String;

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
  @Type(() => String)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  _id!: string;

  @IsOptional()
  @Expose()
  @IsEnum(EBoolValues, {
    message: "isActive value must be boolean type i.e true or false",
  })
  isActive?: boolean;

  @Expose()
  @IsEnum(EBoolValues, {
    message: "saveAsDraft value must be boolean type i.e true or false",
  })
  //@IsString()
  @IsDefined()
  @IsNotEmpty()
  saveAsDraft!: boolean;
}
