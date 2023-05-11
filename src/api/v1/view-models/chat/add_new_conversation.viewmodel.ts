import { mongoose, Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from "class-validator";
import errorMessage from "../../common/erros_message";
import {
  Conversation,
  ECONVERSATION_TYPES,
} from "../../models/chat/conversation.model";
import { Member } from "../../models/chat/member.model";
import { Clinic } from "../../models/clinic.model";
export enum EChatActionValues {
  BLOCK = "BLOCK",
  UNBLOCK = "UN-BLOCK",
}
export class AddNewConversationInChatViewmodel {
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
  @IsEnum(ECONVERSATION_TYPES, {
    message:
      "type value can be one of them i.e. INDIVIDUAL,GROUP,PATIENT",
  })
  @IsDefined()
  @IsNotEmpty()
  type!: string;

  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  nowTime!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  image!: string;

  @Expose()
  @Type(() => String)
  @IsMongoId({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(errorMessage.conversationMsg.limit, {
    message: errorMessage.conversationMsg.limitExceed(
      errorMessage.conversationMsg.limit
    ),
  })
  @IsDefined()
  @IsNotEmpty({ each: true })
  membersArr!: Ref<Member>[];
}
