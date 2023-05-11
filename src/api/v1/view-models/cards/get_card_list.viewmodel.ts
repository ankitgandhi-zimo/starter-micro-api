import { Ref } from "@typegoose/typegoose";

import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
} from "class-validator";
import mongoose from "mongoose";
import { Patients } from "../../models/patient.model";
import { User } from "../../models/user.model";

// import { User } from "../../models/user.model";

export class GetCardListViewmodel {
  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  clinic_id!: Ref<User> | null;

  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  patient_id!: Ref<Patients> | null;
}
