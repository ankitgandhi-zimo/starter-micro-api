import { mongoose, Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDateString,
  IsDefined,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Appointment } from "../../models/appointment.model";
import {
  BillingPayment,
  EBillingModeValues,
  EBillingStatusValues,
  EBillMethodValues,
} from "../../models/billing_payment.model";
import { Clinic } from "../../models/clinic.model";
import { InsurancePayment } from "../../models/insurance_payment.model";
import { Patients } from "../../models/patient.model";
import { LinkObject } from "./add_billing_payment.viewmodel";

export class UpdateBillingPaymentViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  _id!: Ref<BillingPayment>;

  @IsOptional()
  @Expose()
  @IsEnum(EBillingModeValues, {
    message: "Mode can only be CASH,CARD,CHEQUE or LINK",
  })
  //@IsDefined()
  @IsNotEmpty()
  mode?: string;

  @IsOptional()
  @Expose()
  @IsEnum(EBillingStatusValues, {
    message:
      "Status can only be RECEIVED, DUE,REFUND,FAILED or EXPECTED",
  })
  //@IsDefined()
  @IsNotEmpty()
  status?: string;

  @IsOptional()
  @Expose()
  @IsEnum(EBillMethodValues, {
    message: "Method can only be FULL or ADVANCE",
  })
  //@IsDefined()
  @IsNotEmpty()
  method?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  //@IsString()
  @IsDefined()
  @IsNotEmpty()
  batchNumber?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsEmail()
  //@IsDefined()
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  remark?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  transactionId?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  cheque?: string;

  @IsOptional()
  @Expose()
  // @Type(() => String)
  // @IsString()
  // //@IsDefined()
  // @IsNotEmpty()
  chargeId?: string;

  @IsOptional()
  @Expose()
  @Type(() => Number)
  @IsNumber()
  //@IsDefined()
  @IsNotEmpty()
  amount?: number;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsDateString()
  //@IsDefined()
  @IsNotEmpty()
  receiveDate?: string;

  @IsOptional()
  @Expose()
  @Type(() => LinkObject)
  @IsObject()
  //@IsDefined()
  @ValidateNested()
  @IsNotEmpty()
  link?: LinkObject;

  @Expose()
  // @Type(() => Boolean)
  //@IsDefined()
  isActive!: boolean;

  @Expose()
  clinic_id!: Ref<Clinic>;

  @Expose()
  patient_id!: Ref<Patients>;

  @Expose()
  appointment_id!: Ref<Appointment>;

  @Expose()
  insurancePaymentId!: Ref<InsurancePayment> | null;

  @Expose()
  createdby_id!: String | null;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  document?: string;
}
