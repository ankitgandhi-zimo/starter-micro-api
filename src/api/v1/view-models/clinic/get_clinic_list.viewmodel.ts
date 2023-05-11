import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { EClinicTypeValues } from "../../models/clinic.model";
import { EBoolValues } from "../../models/user.model";

export class GetClinicListViewmodel {
  @IsOptional()
  @Expose()
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  pageNumber?: number;

  @IsOptional()
  @Expose()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  pageSize?: number;

  @IsOptional()
  @Expose()
  @IsEnum(EClinicTypeValues, {
    message:
      "clinic_type values must be from one of them i.e. individual, group",
  })
  @IsDefined()
  @IsNotEmpty()
  clinic_type?: EClinicTypeValues;

  @IsOptional()
  @Expose()
  @IsDefined()
  @IsEnum(EBoolValues, {
    message: "isActive value must be boolean type i.e true or false",
  })
  isActive?: boolean;

  // @IsOptional()
  // @Expose()
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // @Type(() => String)
  // clinic_name?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  clinic_name?: string;
}
