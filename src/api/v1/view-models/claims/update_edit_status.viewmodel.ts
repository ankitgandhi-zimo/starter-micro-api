import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from "class-validator";
import mongoose from "mongoose";
import { Appointment } from "../../models/appointment.model";
import {
  EAcknowledgementStatusValues,
  EClaimStatusValues,
} from "../../models/billing_checkout.model";

class UpdateEditStatusObjectViewmodel {
  @Expose()
  @Type(() => String)
  @IsDefined()
  @IsEnum(EAcknowledgementStatusValues, {
    message:
      "acknowledgementStatus value must be from one of them i.e   CH_ACCEPTED,CH_REJECTED,CH_ACCEPTED_WITH_ERROR,SEND_TO_PAYER,PAYER_RECEIVED,PAYER_ACCEPTED,PAYER_REJECTED",
  })
  @IsNotEmpty()
  acknowledgementStatus!: EAcknowledgementStatusValues;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsEnum(EClaimStatusValues, {
    message:
      "claimStatus value must be from one of them i.e  PATIENT_RESPONSIBLE,BILLED_TO_PATIENT ,CLAIM_GENRATED,SEND_ON_PAPER,SEND_TO_CH,CH_SCRUB_ERROR,CH_CONFIRMED,PAID,REJECTED,COMPLETED",
  })
  @IsNotEmpty()
  claimStatus!: string;

  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  @Type(() => mongoose.Types.ObjectId)
  appointment_id!: Ref<Appointment>;
}

export class UpdateEditStatusViewmodel {
  @Expose()
  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => UpdateEditStatusObjectViewmodel)
  updateArr!: UpdateEditStatusObjectViewmodel[];
}
