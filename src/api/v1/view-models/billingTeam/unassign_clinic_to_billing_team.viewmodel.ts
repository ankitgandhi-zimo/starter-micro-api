import { mongoose, Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsMongoId,
  IsNotEmpty,
} from "class-validator";
import { BillingTeam } from "../../models/billing_team.model";
import { Clinic } from "../../models/clinic.model";

export class UnAssignClinicToTeamViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  team_id!: Ref<BillingTeam>;

  @Expose()
  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsMongoId({ each: true })
  clinicIds!: Ref<Clinic>[];
}
