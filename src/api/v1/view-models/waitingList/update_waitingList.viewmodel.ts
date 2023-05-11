import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  IsEmail,
  IsInt,
  IsDate,
  Length,
  Min,
  Max,
  MinLength,
  MaxLength,
  IsMongoId,
} from "class-validator";

export class UpdateWaitingListViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  notes!: string;

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
  //@IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  doctor_id!: String;

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
  apptType_id!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  _id!: string;
}
