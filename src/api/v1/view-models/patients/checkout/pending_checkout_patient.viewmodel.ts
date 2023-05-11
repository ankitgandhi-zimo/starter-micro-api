import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDate,
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from "class-validator";
import mongoose from "mongoose";
import { Doctor } from "../../../models/doctor.model";
import { ClinicLocation } from "../../../models/location.model";
import { Patients } from "../../../models/patient.model";
import { User } from "../../../models/user.model";
export enum EDaysValues {
  TODAY = "TODAY",
  LAST7 = "LAST7",
  LAST_MONTH = "LAST_MONTH",
}

export enum ETabValues {
  PENDING = "PENDING",
  NO_SHOW = "NO_SHOW",
  CHECKED_OUT = "CHECKED_OUT",
  NO_SHOW_CHARGABLE = "NO_SHOW_CHARGABLE",
}

export class PendingCheckoutPatientViewmodel {
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
  @Type(() => Date)
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  nowTime?: Date;

  @IsOptional()
  // @Default("true")
  // @Expose()
  // @IsDefined()
  // @IsEnum(EBoolValues, {
  //   message:
  //     "todayCase value must be boolean type i.e true or false",
  // })
  todayCase?: Boolean;

  @IsOptional()
  // @IsEnum(EBoolValues, {
  //   message:
  //     "chargePatient value must be boolean type i.e true or false",
  // })
  chargePatient?: Boolean;
  @IsOptional()
  @Expose()
  @Type(() => Date)
  // @IsDate()
  // @IsDefined()
  // @IsNotEmpty()
  startDateFilter?: Date;

  @IsOptional()
  @Expose()
  @Type(() => Date)
  // @IsDate()
  // @IsDefined()
  // @IsNotEmpty()
  endDateFilter?: Date;

  @IsOptional()
  @Expose()
  @IsMongoId()
  //@IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  clinic_id?: Ref<User>;

  @IsOptional()
  @Expose()
  // @IsMongoId()
  //@IsDefined()
  // @IsNotEmpty()
  // @Type(() => mongoose.Types.ObjectId)
  patient_id?: Ref<Patients>;

  @Expose()
  @IsDefined()
  @IsEnum(ETabValues, {
    message:
      "tab value must be from one of them i.e PENDING,NO_SHOW,CHECKED_OUT,NO_SHOW_CHARGABLE",
  })
  tab!: string;

  @IsOptional()
  @Expose()
  @IsMongoId()
  //@IsDefined()
  @IsOptional()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  doctor_id?: Ref<Doctor>;

  @IsOptional()
  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  location_id?: Ref<ClinicLocation>;

  @IsOptional()
  @Expose()
  @Type(() => String)
  //   @IsString()
  //   @IsDefined()
  //   @IsNotEmpty()
  searchText?: string;

  @IsOptional()
  @Expose()
  @IsDefined()
  @IsEnum(EDaysValues, {
    message:
      "days value must be from one of them i.e TODAY, LAST7 or LAST_MONTH",
  })
  days?: EDaysValues;
}
