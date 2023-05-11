import { Ref } from "@typegoose/typegoose";
import { Roles } from "aws-sdk/clients/budgets";
import { Expose, Transform, TransformFnParams, Type } from "class-transformer";
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsDate,
  IsDefined,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import mongoose from "mongoose";
import { Clinic } from "../../models/clinic.model";
import { Doctor } from "../../models/doctor.model";
import { Patients } from "../../models/patient.model";

export class GetPatientHistoryDetailViewmodel {
  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  clinic_id!: Ref<Clinic> | null;

  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  patient_id!: Ref<Patients> | null;

  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  doctor_id!: Ref<Doctor> | null;

  @IsOptional()
  @Expose()
  @IsNotEmpty()
  @Type(() => Number)
  pageNumber?: number;

  @IsOptional()
  @Expose()
  @IsNotEmpty()
  @Type(() => Number)
  pageSize?: number;
}
