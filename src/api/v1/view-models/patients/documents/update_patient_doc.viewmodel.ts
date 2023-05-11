import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import mongoose from "mongoose";
import { Patients } from "../../../models/patient.model";

import { User } from "../../../models/user.model";

export class UpdatePatientDocumentViewmodel {
  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  _id!: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  document?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  description?: string;

  @Expose()
  clinic_id!: Ref<User> | null;

  @Expose()
  patient_id!: Ref<Patients> | null;

  @Expose()
  createdby_id: Ref<User> | null;

  @Expose()
  isDeleted!: boolean;
}
