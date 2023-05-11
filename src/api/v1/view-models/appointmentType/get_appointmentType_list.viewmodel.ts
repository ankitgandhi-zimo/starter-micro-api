import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { EBoolValues } from "../../models/user.model";

export class GetAppointmentTypeListViewmodel {
  @IsOptional()
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  pageNumber?: number;

  @IsOptional()
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  pageSize?: number;

  @IsOptional()
  @Expose()
  //@IsDefined()
  @IsNotEmpty()
  @Type(() => String)
  type?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  search?: string;

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
  @IsString()
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  clinic_id!: String;
}
