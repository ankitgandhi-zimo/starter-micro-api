import {
  getModelForClass,
  prop,
} from "@typegoose/typegoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";

export class NocCodes extends PaginatedModel {
  @prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @prop({ type: Boolean, default: true })
  isActive!: boolean;

  @prop({ type: String, default: null })
  HCPCS!: string;

  @prop({ type: String, default: null })
  description!: string;

  @prop({ type: Date, default: null })
  add_date!: string;

  @prop({ type: Date, default: null })
  term_date!: string;

  // @prop({ ref: User, type: mongoose.Types.ObjectId })
  // createdby_id!: Ref<User> | null;
}

const NOC_CODES_DB_MODEL = getModelForClass(NocCodes, {
  schemaOptions: {
    collection: "noc_codes",
    //timestamps: true,
  },
});

export default NOC_CODES_DB_MODEL;
