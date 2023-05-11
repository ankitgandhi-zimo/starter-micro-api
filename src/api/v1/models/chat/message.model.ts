import {
  getModelForClass,
  index,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { PaginatedModel } from "../../common/pagination/pagination_configuration";
import { User } from "../user.model";

export enum EChatMessageType {
  "DOC",
  "IMAGE",
  "WORD",
  "PDF",
  "TEXT",
  "INFO",
  "REMOVE",
  "ADD",
  "LEFT",
}
@index({ message: "text" })
class ReadByRecipientSchema {
  @prop({ type: Date, default: Date.now() })
  readAt!: string;
  @prop({ ref: User })
  readByUserId!: Ref<User>;
}

export class Messages extends PaginatedModel {
  @prop({ type: String, default: "" })
  message!: string;

  @prop({
    type: ReadByRecipientSchema,
    default: () => ({}),
    _id: false,
  })
  readByRecipients!: ReadByRecipientSchema[];

  @prop({ type: Boolean, default: false })
  onlySender!: boolean;

  @prop({ type: [String], default: "" })
  document!: string[] | null;

  @prop({ type: Date, default: Date.now() })
  msgTime!: string;

  @prop({ ref: User })
  clinic_id!: Ref<User> | null;

  @prop({ ref: User })
  conversation_id!: Ref<User> | null;

  @prop({ ref: User })
  sender_id!: Ref<User> | null;

  @prop({
    enum: EChatMessageType,
    default: EChatMessageType.TEXT,
  })
  type!: EChatMessageType;
}

const MESSAGES_DB_MODEL = getModelForClass(Messages, {
  schemaOptions: {
    collection: "messages",
    timestamps: true,
  },
});

export default MESSAGES_DB_MODEL;
