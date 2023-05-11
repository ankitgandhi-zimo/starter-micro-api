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
import { Patients } from "../../models/patient.model";

import { User } from "../../models/user.model";

export enum EAssProvTypeValues {
  ASSIGN_PATIENT = "ASSIGN_PATIENT",

  ASSIGN_PROVIDER = "ASSIGN_PROVIDER",
}

export class AssignProviderViewmodel {
  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  clinic_id!: Ref<User> | null;

  @Expose()
  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsMongoId({ each: true })
  @Type(() => mongoose.Types.ObjectId)
  providerArr!: Ref<User>[];

  @Expose()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsMongoId({ each: true })
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  patientArr!: Ref<Patients>[];

  @Expose()
  createdby_id: Ref<User> | null;

  @Expose()
  @IsDefined()
  @IsEnum(EAssProvTypeValues, {
    message:
      "type value must be from one of them i.e. ASSIGN_PATIENT or ASSIGN_PROVIDER",
  })
  type!: string;

  @Expose()
  patient_id!: Ref<Patients> | null;

  @Expose()
  doctor_id!: Ref<User> | null;
}
