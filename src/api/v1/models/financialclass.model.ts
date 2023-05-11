import {
  getModelForClass,
  index,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { User } from "./user.model";

export enum ECoveredValues {
  INSURANCE = "INSURANCE",
  SELFPAY = "SELFPAY",
}

@index({ code: "text" })
export class FinancialClass extends PaginatedModel {
  @prop({ type: String, default: null })
  code!: string;

  @prop({ type: String, default: null })
  description!: string;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({
    ref: User,
  }) /** Clinics are creating financial classes */
  createdby_id!: Ref<User> | null;

  @prop({ type: Number, default: 0 })
  price!: number;

  @prop({ enum: ECoveredValues })
  covered!: string;
}

const FINANCIAL_CLASS_DB_MODEL = getModelForClass(
  FinancialClass,
  {
    schemaOptions: {
      collection: "financialclasses",
      timestamps: true,
    },
  }
);

export default FINANCIAL_CLASS_DB_MODEL;
