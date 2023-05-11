import {
  getModelForClass,
  index,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { User } from "./user.model";

@index({ name: "text" })
export class BillingTeam extends PaginatedModel {
  @prop({ type: String, trim: true })
  name!: string;

  // @prop({ ref: "Clinic", type: mongoose.Types.ObjectId, default: [] })
  // clinics!: Ref<Clinic>[];

  // @prop({ ref: "User", type: mongoose.Types.ObjectId })
  // team_admin!: Ref<User> | null;

  // @prop({ ref: "User", type: mongoose.Types.ObjectId, default: [] })
  // claim_creator!: Ref<User>[];

  // @prop({ ref: "User", type: mongoose.Types.ObjectId, default: [] })
  // auditor!: Ref<User>[];

  // @prop({ ref: "User", type: mongoose.Types.ObjectId, default: [] })
  // payment_dept!: Ref<User>[];

  // @prop({ ref: "User", type: mongoose.Types.ObjectId, default: [] })
  // statement_handler!: Ref<User>[];

  // @prop({ ref: "User", type: mongoose.Types.ObjectId, default: [] })
  // follow_up!: Ref<User>[];

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ ref: "User", type: mongoose.Types.ObjectId })
  createdby_id!: Ref<User> | null;
}

const BILLING_TEAM_DB_MODEL = getModelForClass(
  BillingTeam,
  {
    schemaOptions: {
      collection: "billing_team",
      timestamps: true,
    },
  }
);

export default BILLING_TEAM_DB_MODEL;
