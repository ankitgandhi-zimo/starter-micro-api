import { mongoose, Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
  IsOptional,
  IsNumber,
  IsMongoId,
  IsDateString,
  IsEnum,
} from "class-validator";
import { isNumber } from "lodash";
import { StringDecoder } from "string_decoder";
import { EVisitTypeValues } from "../../models/appointment.model";
import { AppointmentType } from "../../models/appointment_types.model";
import { Availability } from "../../models/availability.model";
import { Clinic } from "../../models/clinic.model";
import { Doctor } from "../../models/doctor.model";
import { ClinicLocation } from "../../models/location.model";

export class GetSchedulerViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsOptional()
  @IsNotEmpty()
  availability_id!: Ref<Availability>;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  clinic_id!: Ref<Clinic>;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  pageSize?: number;

  @Expose()
  @Type(() => String)
  @IsDefined()
  @IsNotEmpty()
  filter!: string;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsOptional()
  @IsNotEmpty()
  location_id!: Ref<ClinicLocation>;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  pageNumber?: number;

  @Expose()
  @Type(() => String)
  @IsDefined()
  @IsNotEmpty()
  startDateFilter!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  timezone!: string;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  weekDay!: number;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsOptional()
  @IsNotEmpty()
  appType_id!: Ref<AppointmentType>;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  nowTime!: string;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsOptional()
  @IsNotEmpty()
  doctor_id!: Ref<Doctor>;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsOptional()
  @IsEnum(EVisitTypeValues, {
    message: "visitType value must be from one of them i.e Physical,Tele-Call",
  })
  @IsNotEmpty()
  visitType!: string;
}
