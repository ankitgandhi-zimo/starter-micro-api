import { mongoose, Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsMongoId,
  IsEnum,
} from "class-validator";
import { EVisitTypeValues } from "../../models/appointment.model";
import { AppointmentType } from "../../models/appointment_types.model";
import { Availability } from "../../models/availability.model";
import { Clinic } from "../../models/clinic.model";
import { Doctor } from "../../models/doctor.model";
import { ClinicLocation } from "../../models/location.model";

export class GetAvailableDoctorViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  clinic_id!: Ref<Clinic>;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsOptional()
  @IsNotEmpty()
  location_id!: Ref<ClinicLocation>;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  nowTime!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  roleTitle!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  timezone!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsOptional()
  @IsEnum(EVisitTypeValues, {
    message: "visitType value must be from one of them i.e Physical,Tele-Call",
  })
  @IsNotEmpty()
  visitType!: string;

  @Expose()
  @Type(() => Boolean)
  @IsDefined()
  @IsNotEmpty()
  todayCase!: boolean;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  pageNumber?: number;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  pageSize?: number;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  sortValue?: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  sortOrder?: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  search?: string;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsOptional()
  @IsNotEmpty()
  doctor_id!: Ref<Doctor>;

  // @Expose()
  // @Type(() => mongoose.Types.ObjectId)
  // @IsMongoId()
  // @IsDefined()
  // @IsNotEmpty()
  // appType_id!: Ref<AppointmentType>;

  // @Expose()
  // @Type(() => mongoose.Types.ObjectId)
  // @IsMongoId()
  // @IsDefined()
  // @IsNotEmpty()
  // availability_id!: Ref<Availability>;

  // @Expose()
  // @Type(() => String)
  // @IsDateString()
  // @IsDefined()
  // @IsNotEmpty()
  // today!: string;
}
