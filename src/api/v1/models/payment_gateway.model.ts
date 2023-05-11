import {
  getModelForClass,
  index,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { Clinic } from "./clinic.model";

@index({ public_key: "text" })
export class PaymentGateway extends PaginatedModel {
  @prop({ ref: "Clinic" })
  clinic_id!: Ref<Clinic> | null;

  @prop({ type: String })
  secret_key!: string;

  @prop({ type: String })
  public_key!: string;

  @prop({ type: String, default: " " })
  type!: string;

  @prop({ type: Boolean, default: false })
  isVerified!: boolean;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;
}

const PAYMENT_GATEWAY_DB_MODEL = getModelForClass(
  PaymentGateway,
  {
    schemaOptions: {
      collection: "paymentGateway",
      timestamps: true,
    },
  }
);

export default PAYMENT_GATEWAY_DB_MODEL;
