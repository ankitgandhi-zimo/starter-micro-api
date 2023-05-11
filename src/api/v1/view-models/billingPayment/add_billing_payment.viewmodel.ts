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
  EBillingModeValues,
  EBillingStatusValues,
  EBillMethodValues,
} from "../../models/billing_payment.model";
import { Clinic } from "../../models/clinic.model";
import { InsurancePayment } from "../../models/insurance_payment.model";
import { Patients } from "../../models/patient.model";

export class LinkObject {
  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsNotEmpty()
  url!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsNotEmpty()
  resetKey!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsNotEmpty()
  id!: string;
}

export class AddBillingPaymentViewmodel {
  @Expose()
  @IsEnum(EBillingModeValues, {
    message: "Mode can only be CASH, CARD, CHEQUE or LINK",
  })
  @IsDefined()
  @IsNotEmpty()
  mode!: string;

  @Expose()
  @IsEnum(EBillingStatusValues, {
    message:
      "Status can only be RECEIVED, DUE, FAILED,REFUND or EXPECTED",
  })
  @IsDefined()
  @IsNotEmpty()
  status!: string;

  @Expose()
  @IsEnum(EBillMethodValues, {
    message: "Method can only be FULL or ADVANCE",
  })
  @IsDefined()
  @IsNotEmpty()
  method!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  batchNumber!: string;

  @Expose()
  @Type(() => String)
  @IsEmail()
  @IsDefined()
  @IsNotEmpty()
  email!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  remark!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  cheque!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsNotEmpty()
  chargeId!: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  transactionId?: string;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  amount!: number;

  @Expose()
  @Type(() => String)
  @IsDateString()
  //@IsDefined()
  @IsNotEmpty()
  receiveDate!: string;

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
  patient_id!: Ref<Patients>;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  appointment_id!: Ref<Appointment>;

  @Expose()
  @Type(() => LinkObject)
  @IsObject()
  //@IsDefined()
  @ValidateNested()
  @IsNotEmpty()
  link!: LinkObject;

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  createdby_id!: String;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  document?: string;

  @Expose()
  insurancePaymentId!: Ref<InsurancePayment> | null;
}
