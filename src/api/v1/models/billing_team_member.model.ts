import {
  getModelForClass,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { BillingTeam } from "./billing_team.model";
import { Roles } from "./roles.model";
import { User } from "./user.model";

export class BillingTeamMember extends PaginatedModel {
  @prop({
    ref: "BillingTeam",
    type: mongoose.Types.ObjectId,
  })
  team_id!: Ref<BillingTeam>;

  @prop({ ref: "Roles", type: mongoose.Types.ObjectId })
  role_id!: Ref<Roles>;

  @prop({ ref: "User", type: mongoose.Types.ObjectId })
  member_id!: Ref<User>;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ ref: "User", type: mongoose.Types.ObjectId })
  createdby_id!: Ref<User> | null;
}

const BILLING_TEAM_MEMBER_DB_MODEL = getModelForClass(
  BillingTeamMember,
  {
    schemaOptions: {
      collection: "billing_team_member",
      timestamps: true,
    },
  }
);

export default BILLING_TEAM_MEMBER_DB_MODEL;
