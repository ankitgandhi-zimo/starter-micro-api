import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  IsMongoId,
  IsInt,
  IsEnum,
  IsOptional,
} from "class-validator";
import { EBoolValues } from "../../models/user.model";

export class AddAppointmentTypeViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  type!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  color!: string;

  @Expose()
  @Type(() => Number)
  @IsInt()
  @IsDefined()
  @IsNotEmpty()
  duration!: number;

  @Expose()
  // @Type(() => Boolean)
  // @IsDefined()
  // isMultiPatient!: boolean;
  @IsEnum(EBoolValues, {
    message: "isMultiPatient value must be boolean type i.e true or false",
  })
  //@IsString()
  @IsOptional()
  isMultiPatient!: boolean;

  @Expose()
  @Type(() => Number)
  @IsInt()
  @IsDefined()
  @IsNotEmpty()
  number_of_patients!: number;

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
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  clinic_id!: String;
}
