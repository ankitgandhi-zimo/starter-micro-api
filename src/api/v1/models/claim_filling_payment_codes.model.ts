import {
  getModelForClass,
  index,
  prop,
} from "@typegoose/typegoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";

@index({ code: "text" })
export class ClaimFillingPaymentCodes extends PaginatedModel {
  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ type: String, default: null })
  code!: string;

  @prop({ type: String, default: null })
  description!: string;

  // @prop({ ref: User, type: mongoose.Types.ObjectId })
  // createdby_id!: Ref<User> | null;
}

const CLAIM_FILLING_PAYMENT_CODES_DB_MODEL =
  getModelForClass(ClaimFillingPaymentCodes, {
    schemaOptions: {
      collection: "claim_filling_payment_codes",
      //timestamps: true,
    },
  });

export default CLAIM_FILLING_PAYMENT_CODES_DB_MODEL;
