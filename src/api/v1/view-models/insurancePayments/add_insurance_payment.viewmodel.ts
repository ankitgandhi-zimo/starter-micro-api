import { Ref } from "@typegoose/typegoose";
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
import mongoose from "mongoose";
import { Appointment } from "../../models/appointment.model";
import { Clinic } from "../../models/clinic.model";
import { InsuranceCompany } from "../../models/insurance/insurance_companies.model";
import {
  ECreditCardModeValues,
  EPaymentFromValues,
  EPaymentModeValues,
  ETransactionModeValues,
} from "../../models/insurance_payment.model";
import { Patients } from "../../models/patient.model";

export class AddInsurancePaymentViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  clinic_id!: Ref<Clinic> | null;

  @Expose()
  @IsEnum(ETransactionModeValues, {
    message:
      "transaction_type value must be from one of them i.e. PAYMENT,REFUND",
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  transaction_type?: string;

  @Expose()
  @IsEnum(EPaymentFromValues, {
    message:
      "payment_from value must be from one of them i.e. INSURANCE,PATIENT",
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  payment_from?: string;

  @Expose()
  @IsEnum(EPaymentModeValues, {
    message: "payment_mode value must be from one of them i.e. EFT,CARD,CHEQUE",
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  payment_mode?: string;

  @Expose()
  @IsEnum(ECreditCardModeValues, {
    message:
      "credeitCard_mode value must be from one of them i.e.PAYMENT,REFUND",
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  credeitCard_mode?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  //@IsNotEmpty()
  transactionId?: string;

  @IsOptional()
  @Expose()
  //@IsMongoId()
  //@IsDefined()
  //@IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  insurance_company?: Ref<InsuranceCompany>;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  //@IsNotEmpty()
  insurance_plan?: string;

  //@IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  refrence?: string;

  @IsOptional()
  @Expose()
  @Type(() => Date)
  @IsDate()
  //@IsDefined()
  //@IsNotEmpty()
  refrenceDate?: string;

  //@IsOptional()
  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  payment_amount!: number;

  @IsOptional()
  @Expose()
  unapplied_amount?: number;

  @IsOptional()
  @Expose()
  @Type(() => Number)
  @IsNumber()
  //@IsDefined()
  //@IsNotEmpty()
  bill_charged_amount?: number;

  @IsOptional()
  @Expose()
  @Type(() => Number)
  @IsNumber()
  //@IsDefined()
  //@IsNotEmpty()
  adjustment_amount?: number;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  //@IsNotEmpty()
  excluded_claim?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  //@IsNotEmpty()
  notes?: string;

  @IsOptional()
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  //@IsDefined()
  //@IsNotEmpty()
  patient_id?: Ref<Patients> | null;

  @IsOptional()
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  //@IsDefined()
  //@IsNotEmpty()
  appointment_id?: Ref<Appointment> | null;

  @Expose()
  createdby_id!: mongoose.Types.ObjectId;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  //@IsNotEmpty()
  document?: string;
}
