import {
  getModelForClass,
  index,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../common/pagination/pagination_configuration";
import { User } from "./user.model";

class ReadByRecipientSchemaObject {
  @prop({ ref: User })
  reader_id!: Ref<User> | null;

  @prop({ type: Date, default: new Date() })
  readAt!: Date;
}

@index({ title: "text" })
export class Notification extends PaginatedModel {
  @prop({ type: String, default: null })
  title!: string;

  @prop({ type: String, default: null })
  type!: string;

  @prop({ ref: User }) // Notification creator
  sender!: Ref<User> | null;

  @prop({ ref: User }) // Ids of the receivers of the notification
  receiver!: Ref<User>[] | null;

  @prop({ type: String, default: null }) // any description of the notification message
  message!: string;

  @prop({ type: Boolean, default: false })
  deleted!: boolean;

  @prop({ type: mongoose.Schema.Types.ObjectId }) // Ids of the receivers of the notification
  type_id!: mongoose.Schema.Types.ObjectId;

  @prop({ _id: false })
  readBy!: ReadByRecipientSchemaObject;
}

const NOTIFICATION_DB_MODEL = getModelForClass(
  Notification,
  {
    schemaOptions: {
      collection: "notifications",
      timestamps: true,
    },
  }
);

export default NOTIFICATION_DB_MODEL;
