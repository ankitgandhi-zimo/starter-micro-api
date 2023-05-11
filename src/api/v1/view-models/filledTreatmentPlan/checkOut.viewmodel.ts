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
} from "class-validator";

export class CheckOutViewmodel {
  // @Expose()
  // @Type(() => String)
  // @IsDefined()
  // @IsMongoId()
  // @IsNotEmpty()
  // doctor_id!: String;

  @Expose()
  @Type(() => String)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  clinic_id!: String;

  // @Expose()
  // @Type(() => String)
  // @IsDefined()
  // @IsMongoId()
  // @IsNotEmpty()
  // patient_id!: String;

  @Expose()
  @Type(() => String)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  appointment_id!: String;

  @Expose()
  @Type(() => String)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  treatmentPlan_id!: String;
}
