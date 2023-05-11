import { mongoose, Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { EVisitTypeValues } from "../../models/appointment.model";
import { AppointmentType } from "../../models/appointment_types.model";
import { Clinic } from "../../models/clinic.model";
import { CPTCodes } from "../../models/cpt.model";
import { Doctor } from "../../models/doctor.model";
import { ICTCodes } from "../../models/ict.model";
import { ClinicLocation } from "../../models/location.model";

export class GetSuperBillListViewmodel {
  @IsOptional()
  @Expose()
  // @IsDefined()
  // @IsNotEmpty()
  @Type(() => Number)
  pageNumber?: number;

  @IsOptional()
  @Expose()
  // @IsDefined()
  // @IsNotEmpty()
  @Type(() => Number)
  pageSize?: number;

  @IsOptional()
  @Expose()
  @Type(() => String)
  search?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  isActive?: string;

  @Expose()
  @IsString()
  //@IsDefined()
  // @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  clinic_id?: Ref<Clinic>;

  @Expose()
  @IsString()
  //@IsDefined()
  // @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  cpt?: Ref<CPTCodes>;

  @Expose()
  @IsString()
  //@IsDefined()
  // @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  icd?: Ref<ICTCodes>;

  @IsOptional()
  @Expose()
  @Type(() => String)
  //@IsString()
  //@IsDefined()
  // @IsEnum(EVisitTypeValues, {
  //   message: "visitType value must be from one of them i.e Physical,Tele-Call",
  // })
  //@IsNotEmpty()
  visitType?: string;

  @IsOptional()
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  //@IsMongoId()
  //@IsDefined()
  //@IsNotEmpty()
  location_id?: Ref<ClinicLocation> | null;

  @IsOptional()
  @Expose()

  // @IsDefined()
  // @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  patient_id?: mongoose.Types.ObjectId;

  @IsOptional()
  @Expose()
  //@IsMongoId()
  // @IsDefined()
  // @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  billing_provider_id?: Ref<Doctor>;

  @IsOptional()
  @Expose()
  //@IsMongoId()
  // @IsDefined()
  // @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  rendering_provider_id?: Ref<Doctor>;

  @IsOptional()
  @Expose()
  //@IsMongoId()
  // @IsDefined()
  // @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  referring_provider_id?: Ref<Doctor>;

  @IsOptional()
  @Expose()
  // @IsDefined()
  // @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  case_type?: Ref<AppointmentType>;

  @IsOptional()
  @Expose()
  // @Type(() => Date)
  // @IsDate()
  // @IsDefined()
  // @IsNotEmpty()
  startDateTime?: string;

  @IsOptional()
  @Expose()
  // @Type(() => Date)
  // @IsDate()
  // @IsDefined()
  // @IsNotEmpty()
  endDateTime?: string;

  @IsOptional()
  @Expose()
  charge_startDateTime?: string;

  @IsOptional()
  @Expose()
  charge_endDateTime?: string;

  @IsOptional()
  @Expose()
  insurance_plan_type?: string; //it can be md, ct

  @IsOptional()
  @Expose()
  insurance_coverage?: string; //Primary,secondary, tertiary

  @IsOptional()
  @Expose()
  insurance_type?: string; //hmo, ppo
}
