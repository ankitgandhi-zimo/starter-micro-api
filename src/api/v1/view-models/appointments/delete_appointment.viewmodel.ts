import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from "class-validator";
import { EBoolValues } from "../../models/user.model";

export class DeleteAppointmentViewmodel {
  // @Expose()
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // @Type(() => String)
  // appointment_number!: string;

  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => String)
  _id!: string;

  @IsOptional()
  @Expose()
  @IsDefined()
  @IsEnum(EBoolValues, {
    message:
      "deleteSeries value must be boolean type i.e true or false",
  })
  deleteSeries?: string;
}
