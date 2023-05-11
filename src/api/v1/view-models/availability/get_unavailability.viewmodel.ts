import { Ref } from "@typegoose/typegoose";
import { User } from "aws-sdk/clients/budgets";
import { Expose, Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsDateString,
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import mongoose from "mongoose";
import { EBoolValues, EVisitTypeValues } from "../../models/appointment.model";
import { AppointmentType } from "../../models/appointment_types.model";
import { Doctor } from "../../models/doctor.model";
import { ClinicLocation } from "../../models/location.model";
import { Patients } from "../../models/patient.model";
import { ArrayOfTimings } from "./get_time_slots.viewmodel";

export enum Status {
  Unavailable = "Unavailable",
}

export class GetUnavailabilityViewmodel {
  @Expose()
  @Type(() => String)
  @IsDateString()
  @IsDefined()
  @IsNotEmpty()
  startDate!: string;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  clinic_id!: Ref<User> | null;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  doctor_id!: Ref<Doctor> | null;

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

  /////////////////////////////////////////////////////////////////////
}
