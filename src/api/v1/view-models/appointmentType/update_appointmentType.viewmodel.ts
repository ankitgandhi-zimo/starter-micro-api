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
  IsOptional,
} from "class-validator";
import { EBoolValues } from "../../models/user.model";

export class UpdateAppointmentTypeViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  _id!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  type!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  color!: string;

  @Expose()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @IsNotEmpty()
  duration!: number;

  @Expose()
  @IsEnum(EBoolValues, {
    message: "isMultiPatient value must be boolean type i.e true or false",
  })
  //@IsString()
  @IsOptional()
  isMultiPatient!: boolean;

  @Expose()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @IsNotEmpty()
  number_of_patients!: number;

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
  @Type(() => String)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  clinic_id!: String;
}
