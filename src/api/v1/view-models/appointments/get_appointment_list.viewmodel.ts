import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDate,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import mongoose from "mongoose";
import { EStatusValues } from "../../models/appointment.model";
import { AppointmentType } from "../../models/appointment_types.model";
import { Clinic } from "../../models/clinic.model";
import { EBoolValues } from "../../models/user.model";

export class GetAppointmentListViewmodel {
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
  @IsDefined()
  @IsEnum(EBoolValues, {
    message:
      "isActive value must be boolean type i.e true or false",
  })
  isActive?: boolean;

  @IsOptional()
  @Expose()
  @IsDefined()
  @IsEnum(EBoolValues, {
    message:
      "isDeleted value must be boolean type i.e true or false",
  })
  isDeleted?: boolean;

  @IsOptional()
  @Expose()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  patient_id?: mongoose.Types.ObjectId;

  @IsOptional()
  @Expose()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  appointmentType_id?: Ref<AppointmentType>;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsEnum(EStatusValues, {
    message:
      "status value must be from one of them i.e  Accepted,Pending,Rescheduled,Unavailability,Cancelled,Declined,Checkout",
  })
  @IsNotEmpty()
  status?: string;

  @IsOptional()
  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  startDateTime?: string;

  @IsOptional()
  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  endDateTime?: string;

  @IsOptional()
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  hasDocument?: boolean;

  @IsOptional()
  @Expose()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  clinic_id?: Ref<Clinic>;
}
