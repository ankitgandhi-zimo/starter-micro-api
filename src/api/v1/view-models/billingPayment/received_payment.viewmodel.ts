import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDate,
  IsDefined,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from "class-validator";
import mongoose from "mongoose";
import { Appointment } from "../../models/appointment.model";
import { EBillingModeValues } from "../../models/billing_payment.model";
import { Clinic } from "../../models/clinic.model";
import { Patients } from "../../models/patient.model";
class LinkObjectViewModel {
  @Expose()
  url!: string;

  @Expose()
  id!: string;

  @Expose()
  resetKey!: string;
}
export class ReceivedPaymentViewmodel {
  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  amount!: string;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  clinic_id!: Ref<Clinic> | null;

  @Expose()
  createdby_id!: mongoose.Types.ObjectId;

  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  nowTime!: string;

  @Expose()
  @IsEnum(EBillingModeValues, {
    message:
      "mode value must be from one of them i.e.  CASH,CARD,CHEQUE,LINK",
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  mode!: string;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  patient_id!: Ref<Patients>;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsEmail()
  @IsDefined()
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  cheque?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  remark?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  card_id?: string;

  @ValidateIf((x) => x.mode === EBillingModeValues.CARD)
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  cvc!: string;

  @ValidateIf((x) => x.mode === EBillingModeValues.CARD)
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  cardHolderName!: string;

  @ValidateIf((x) => x.mode === EBillingModeValues.CARD)
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  saveCard!: boolean;

  @ValidateIf((x) => x.mode === EBillingModeValues.CARD)
  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  exp_year!: number;

  @ValidateIf((x) => x.mode === EBillingModeValues.CARD)
  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  exp_month!: number;

  @ValidateIf((x) => x.mode === EBillingModeValues.CARD)
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  cardNumber!: string;

  // @IsOptional()
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  appointment_id?: Ref<Appointment> | null;

  @ValidateIf((x) => x.mode === EBillingModeValues.CASH)
  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  receiveDate!: Date;

  @Expose()
  @Type(() => LinkObjectViewModel)
  link!: LinkObjectViewModel;
}
