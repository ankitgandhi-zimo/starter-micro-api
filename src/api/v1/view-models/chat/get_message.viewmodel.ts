import { mongoose, Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDate,
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import {
  Conversation,
  ECONVERSATION_TYPES,
} from "../../models/chat/conversation.model";
import { Clinic } from "../../models/clinic.model";
export enum EChatActionValues {
  BLOCK = "BLOCK",
  UNBLOCK = "UN-BLOCK",
}
export class GetMessageViewmodel {
  @IsOptional()
  @Expose()
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  pageNumber?: number;

  @IsOptional()
  @Expose()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  pageSize?: number;

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

  @Expose()
  @IsEnum(ECONVERSATION_TYPES, {
    message:
      "type value can be one of them i.e. INDIVIDUAL,GROUP,PATIENT",
  })
  @IsDefined()
  @IsNotEmpty()
  conversationType!: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  roleTitle?: string;

  //   @Expose()
  //   @IsDefined()
  //   @IsNotEmpty()
  //   convOpened!: boolean;
}
