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
  Unavailability = "Unavailability",
}

export class SetUnavailabilityViewmodel {
  @Expose()
  @IsEnum(Status, {
    message: "Status can only be Unavailability",
  })
  @IsDefined()
  @IsNotEmpty()
  status!: Status;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  timezone!: string;

  @Expose()
  @Type(() => ArrayOfTimings)
  @IsArray()
  @IsDefined()
  //@IsNotEmpty()
  timingArr!: ArrayOfTimings[];

  @Expose()
  @Type(() => Number)
  @IsArray()
  @IsDefined()
  //@IsNotEmpty()
  weekDaysArr!: number[];

  @Expose()
  @Type(() => String)
  @IsDateString()
  @IsDefined()
  @IsNotEmpty()
  endDate!: string;

  @Expose()
  @Type(() => String)
  @IsDateString()
  @IsDefined()
  @IsNotEmpty()
  startDate!: string;

  @Expose()
  appointment_number!: string;

  @Expose()
  createdby_id!: mongoose.Schema.Types.ObjectId;

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

  // @Expose()
  // @IsArray()
  // @ArrayNotEmpty()
  // @IsMongoId({ each: true })
  // @IsDefined()
  // @IsNotEmpty()
  // patient_ids!: Ref<Patients>[];

  // @Expose()
  // patient_id!: Ref<Patients> | null;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  location_id!: Ref<ClinicLocation> | null;

  /////////////////////////////////////////////////////////////////////
}
