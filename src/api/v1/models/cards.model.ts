import {
  getModelForClass,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { Patients } from "./patient.model";
import { User } from "./user.model";

// @index({ token: "text" })
export class Cards extends PaginatedModel {
  @prop({ type: String, default: null })
  client_ip!: string;

  @prop({ ref: User, required: true, default: "" })
  clinic_id!: Ref<User>;

  @prop({ ref: User })
  createdby_id!: Ref<User> | null;

  @prop({ ref: Patients })
  patient_id!: Ref<Patients> | null;

  @prop({ type: String })
  cardId!: string;

  @prop({ type: String })
  token!: string;

  // @prop({ type: String, required: true, default: "" })
  // id!: string;

  // @prop({ type: String, required: true, default: "" })
  // token!: string;

  // @prop({ type: String, required: true, default: "" })
  // brand!: string;

  // @prop({ type: String, required: true, default: "" })
  // last4!: string;

  // @prop({ type: String, required: true, default: "" })
  // funding!: string;

  // @prop({ type: String, required: true, default: "" })
  // cardHolderName!: string;
}

const CARDS_DB_MODEL = getModelForClass(Cards, {
  schemaOptions: {
    collection: "cards",
    timestamps: true,
  },
});

export default CARDS_DB_MODEL;
