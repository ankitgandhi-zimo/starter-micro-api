import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from "class-validator";
import mongoose from "mongoose";
import { Patients } from "../../models/patient.model";

import { User } from "../../models/user.model";

export enum EGetAssProvTypeValues {
  PROVIDER_LIST = "PROVIDER_LIST",

  PATIENT_LIST = "PATIENT_LIST",
}

export class GetAssignProviderPatientViewmodel {
  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  clinic_id!: Ref<User>;

  @Expose()
  @IsDefined()
  @IsEnum(EGetAssProvTypeValues, {
    message:
      "type value must be from one of them i.e. PATIENT_LIST or PROVIDER_LIST",
  })
  type!: string;

  @IsOptional()
  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  patient_id?: Ref<Patients>;

  @IsOptional()
  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  doctor_id?: Ref<User>;
}
