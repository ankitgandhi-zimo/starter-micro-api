import {
  getModelForClass,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { BillingTeam } from "./billing_team.model";
import { Clinic } from "./clinic.model";
import { User } from "./user.model";

export class BillingTeamAssociatedClinics extends PaginatedModel {
  @prop({
    ref: "BillingTeam",
    type: mongoose.Types.ObjectId,
  })
  team_id!: Ref<BillingTeam>;

  @prop({ ref: "Clinic", type: mongoose.Types.ObjectId })
  clinic!: Ref<Clinic>;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ ref: "User", type: mongoose.Types.ObjectId })
  createdby_id!: Ref<User> | null;
}

const BILLING_TEAM_ASSOCIATED_CLINICS_DB_MODEL =
  getModelForClass(BillingTeamAssociatedClinics, {
    schemaOptions: {
      collection: "billing_team_associated_clinics",
      timestamps: true,
    },
  });

export default BILLING_TEAM_ASSOCIATED_CLINICS_DB_MODEL;
