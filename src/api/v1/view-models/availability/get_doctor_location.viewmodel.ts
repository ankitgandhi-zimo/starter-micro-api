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
import { EVisitTypeValues } from "../../models/appointment.model";
import { AppointmentType } from "../../models/appointment_types.model";
import { Availability } from "../../models/availability.model";
import { Clinic } from "../../models/clinic.model";
import { Doctor } from "../../models/doctor.model";
import { ClinicLocation } from "../../models/location.model";

export class GetDoctorLocationViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  doctor_id!: Ref<Doctor>;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  clinic_id!: Ref<Clinic>;

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
