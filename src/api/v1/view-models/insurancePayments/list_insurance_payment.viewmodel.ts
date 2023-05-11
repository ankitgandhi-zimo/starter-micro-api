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

export enum EListTypeValues {
  INSURANCE_PAYMENT = "INSURANCE_PAYMENT",
  REFUND = "REFUND",
}

export class ListInsurancePaymentViewmodel {
  @IsOptional()
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  pageNumber?: number;

  @IsOptional()
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  pageSize?: number;

  @IsOptional()
  @Expose()
  //@IsDefined()
  @IsNotEmpty()
  @IsEnum(EListTypeValues, {
    message: "type can only be INSURANCE_PAYMENT or REFUND",
  })
  type?: string;

  @IsOptional()
  @Expose()
  //@Type(() => mongoose.Types.ObjectId)
  //@IsMongoId()
  ///@IsDefined()
  //@IsNotEmpty()
  clinic_id?: Ref<Clinic> | null;

  @IsOptional()
  @Expose()
  patient_id?: Ref<Patients> | null;

  @IsOptional()
  @Expose()
  appointment_id?: Ref<Appointment> | null;

  @IsOptional()
  @Expose()
  //@Type(() => mongoose.Types.ObjectId)
  //@IsMongoId()
  ///@IsDefined()
  //@IsNotEmpty()
  insurance_company?: mongoose.Types.ObjectId;

  @IsOptional()
  @Expose()
  payment_from?: string;

  @IsOptional()
  @Expose()
  refrence?: string;

  @IsOptional()
  @Expose()
  insurance_plan?: string;

  @IsOptional()
  @Expose()
  @Type(() => Date)
  @IsDate()
  //@IsDefined()
  @IsNotEmpty()
  ref_startDateTime?: string;

  @IsOptional()
  @Expose()
  @Type(() => Date)
  @IsDate()
  //@IsDefined()
  @IsNotEmpty()
  ref_endDateTime?: string;

  @IsOptional()
  @Expose()
  @Type(() => Date)
  @IsDate()
  //@IsDefined()
  @IsNotEmpty()
  received_startDateTime?: string;

  @IsOptional()
  @Expose()
  @Type(() => Date)
  @IsDate()
  //@IsDefined()
  @IsNotEmpty()
  received_endDateTime?: string;

  @IsOptional()
  @Expose()
  @Type(() => Date)
  @IsDate()
  //@IsDefined()
  @IsNotEmpty()
  startDateTime?: string;

  @IsOptional()
  @Expose()
  @Type(() => Date)
  @IsDate()
  //@IsDefined()
  @IsNotEmpty()
  endDateTime?: string;
}
