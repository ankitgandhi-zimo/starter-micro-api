import { mongoose, Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDate,
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
} from "class-validator";
import { Conversation } from "../../models/chat/conversation.model";
import { Clinic } from "../../models/clinic.model";

export enum EChatActionValues {
  BLOCK = "BLOCK",
  UNBLOCK = "UN-BLOCK",
}
export class BlockUserInChatViewmodel {
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
  @IsEnum(EChatActionValues, {
    message: "Action can only be BLOCK or UN-BLOCK",
  })
  @IsDefined()
  @IsNotEmpty()
  action!: string;

  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  nowTime!: string;
}
