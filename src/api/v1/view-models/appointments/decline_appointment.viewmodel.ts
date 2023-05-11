import { Expose, Type } from "class-transformer";
import {
  IsDate,
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from "class-validator";
import mongoose from "mongoose";

export enum EDeclineType {
  B_P_C = "B_P_C",
  B_A_C = "B_A_C",
  R_P_C = "R_P_C",
  R_A_C = "R_A_C",
  B_D = "B_D",
  R_D = "R_D",
}
export class DeclineAppointmentViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  reason!: string;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  appointmentId!: string;

  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  nowTime!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsEnum(EDeclineType, {
    message:
      "type value must be from one of them i.e  'B_P_C', 'B_A_C', 'R_P_C', 'R_A_C', 'B_D', 'R_D'",
  })
  @IsNotEmpty()
  type!: string;
}
