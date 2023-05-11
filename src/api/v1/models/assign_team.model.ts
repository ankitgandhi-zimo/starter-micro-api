import { getModelForClass, index, prop, Ref } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { Appointment } from "./appointment.model";
import { BillingTeam } from "./billing_team.model";
import { Roles } from "./roles.model";
import { User } from "./user.model";

@index({ name: "text" })
export class AssignTeam extends PaginatedModel {
  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ ref: Appointment, type: mongoose.Types.ObjectId })
  appointment_id!: Ref<Appointment> | null;

  @prop({ ref: Roles, type: mongoose.Types.ObjectId })
  role_id!: Ref<Roles> | null;

  @prop({ ref: User, type: mongoose.Types.ObjectId })
  team_member!: Ref<User>;

  @prop({ ref: BillingTeam, type: mongoose.Types.ObjectId })
  team_id!: Ref<BillingTeam>;
}

const ASSIGN_TEAM_DB_MODEL = getModelForClass(AssignTeam, {
  schemaOptions: {
    collection: "assign_team",
    timestamps: true,
  },
});

export default ASSIGN_TEAM_DB_MODEL;
