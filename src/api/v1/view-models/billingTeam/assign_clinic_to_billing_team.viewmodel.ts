import { mongoose, Ref } from "@typegoose/typegoose";
import { User } from "aws-sdk/clients/appstream";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
} from "class-validator";
import { BillingTeam } from "../../models/billing_team.model";
import { Clinic } from "../../models/clinic.model";

export class AssignClinicToTeamViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  team_id!: Ref<BillingTeam>;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  clinic_id!: Ref<Clinic>;

  @Expose()
  isDeleted!: boolean;

  @Expose()
  isActive!: boolean;

  @Expose()
  createdby_id!: Ref<User> | null;

  @Expose()
  clinic!: Ref<Clinic>;
}
