import { mongoose, Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDate,
  IsDefined,
  IsMongoId,
  IsNotEmpty,
} from "class-validator";
import { Conversation } from "../../models/chat/conversation.model";
import { Clinic } from "../../models/clinic.model";

export class DeleteMessageViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  clinic_id!: Ref<Clinic>;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  conversation_id!: Ref<Conversation>;

  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  nowTime!: string;
}
