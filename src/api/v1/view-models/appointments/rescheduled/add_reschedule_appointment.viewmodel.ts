import { Expose, Type } from "class-transformer";
import {
  IsDate,
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import mongoose from "mongoose";
import { RescheduleObjectViewmodel } from "../add_appointment.viewmodel";

export class AddRescheduleAppointmentViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  doctor_id!: mongoose.Types.ObjectId;

  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  endDateTime!: string;

  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  nowTime!: string;

  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  startDateTime!: string;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  appointment_id!: mongoose.Types.ObjectId;

  @Expose()
  @ValidateNested()
  @Type(() => RescheduleObjectViewmodel)
  @IsDefined()
  @IsNotEmpty()
  reschedule!: RescheduleObjectViewmodel;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsOptional()
  //@IsNotEmpty()
  description!: string;
}
