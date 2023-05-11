import {
  getModelForClass,
  index,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { BillingTeam } from "./billing_team.model";
import { SuperBill } from "./super_bill.model";
import { User } from "./user.model";

@index({ discription: "text" })
export class SuperBillAssignment extends PaginatedModel {
  @prop({ type: String, default: null })
  discription!: string;

  @prop({ ref: SuperBill })
  superbillId!: Ref<SuperBill> | null;

  @prop({ ref: User })
  assignedTo!: Ref<User> | null;

  @prop({ ref: BillingTeam })
  teamId!: Ref<BillingTeam> | null;

  @prop({ ref: User })
  createdby_id!: Ref<User> | null;
}

const SUPERBILL_ASSIGNMENT_DB_MODEL = getModelForClass(
  SuperBillAssignment,
  {
    schemaOptions: {
      collection: "superbill_assignment",
      timestamps: true,
    },
  }
);

export default SUPERBILL_ASSIGNMENT_DB_MODEL;
