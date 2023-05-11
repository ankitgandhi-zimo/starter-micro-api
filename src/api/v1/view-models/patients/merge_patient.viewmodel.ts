import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
} from "class-validator";
import mongoose from "mongoose";
import { Clinic } from "../../models/clinic.model";
import { Patients } from "../../models/patient.model";

export class MergePatientViewmodel {
  // @Expose()
  // @IsMongoId()
  // @IsDefined()
  // @IsNotEmpty()
  // @Type(() => mongoose.Types.ObjectId)
  // clinic_id!: Ref<Clinic> | null;

  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  merge_patient_id!: Ref<Patients> | null;

  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  merge_to_patient_id!: Ref<Patients> | null;
}
