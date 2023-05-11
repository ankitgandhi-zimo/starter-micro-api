import { mongoose, Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Appointment } from "../../models/appointment.model";
import {
  EBillingModeValues,
  EBillMethodValues,
} from "../../models/billing_payment.model";
import { Clinic } from "../../models/clinic.model";
import { CPTCodes } from "../../models/cpt.model";
import { Doctor } from "../../models/doctor.model";
import { FinancialClass } from "../../models/financialclass.model";
import { ICTCodes } from "../../models/ict.model";
import { Insurance } from "../../models/insurance/insurance.model";
import { ClinicLocation } from "../../models/location.model";
import { Patients } from "../../models/patient.model";
import { BillStatus } from "../../models/super_bill.model";

export class ClaimStatusObjectViewmodel {
  @Expose()
  claimStatus!: string;

  @Expose()
  submitDate!: string;
}
export class CPT {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  cpt_code_id!: Ref<CPTCodes>;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // cptCode!: string;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  unit!: number;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // description!: string;

  // @Expose()
  // @Type(() => Number)
  // @IsNumber()
  // @IsDefined()
  // @IsNotEmpty()
  // fee!: number;

  @Expose()
  @Type(() => String)
  @IsArray()
  @IsDefined()
  //@IsMongoId()
  @IsNotEmpty()
  modifier!: string;

  @Expose()
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  //@IsNotEmpty()
  icd?: number[];

  // @Expose()
  // @IsObject()
  // @IsOptional()
  // @ValidateNested()
  // @Type(() => LinkedICDS)
  // linkedIcd?: LinkedICDS;
}
//CPT HAS MULTIPLE ICDS
export class ICD {
  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  icd_id!: Ref<ICTCodes>;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // codeCategory!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  icdCode!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  description!: string;
}

export class LinkedICDS {
  @Expose()
  @IsDefined()
  @IsArray()
  @Type(() => Number)
  @IsNotEmpty()
  icd!: number[];

  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  pos!: number;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  quantity!: number;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  charges!: number;
}

// export class ProviderDetails {

// }

export class AddSuperBillViewmodel {
  @Expose()
  @IsEnum(BillStatus, {
    message:
      "Status can only be quickSave, quickSaveSignOff, linkAndSave, linkSaveSignOff or noLinkSave",
  })
  @IsDefined()
  @IsNotEmpty()
  status!: BillStatus;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  patient_id!: Ref<Patients>;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // name!: string;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  appointment_id!: Ref<Appointment>;

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
  location_id!: Ref<ClinicLocation>;

  @Expose()
  @Type(() => String)
  //@IsDefined()
  //@IsMongoId()
  //@IsNotEmpty()
  payer_id?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()

  //@IsNotEmpty()
  responsible_party_name?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  //@IsNotEmpty()
  insurance_name?: string;

  @IsOptional()
  @Expose()
  //@IsDefined()
  @Type(() => mongoose.Types.ObjectId)
  @IsString()
  @IsNotEmpty()
  insurance_id?: Ref<Insurance>;
  //patient detail ends

  //provider details ends

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  referring_provider_id!: Ref<Doctor>;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  rendering_provider_id!: Ref<Doctor>;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  billing_provider_id!: Ref<Doctor>;

  @Expose()
  @Type(() => String)
  @IsDateString()
  @IsDefined()
  @IsNotEmpty()
  fromDate!: string;

  @Expose()
  @Type(() => String)
  @IsDateString()
  @IsDefined()
  @IsNotEmpty()
  toDate!: string;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  duration!: number;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  type_of_service!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  place_of_service!: string;

  @Expose()
  @IsArray()
  @ArrayNotEmpty()
  @IsDefined()
  @ValidateNested()
  @Type(() => CPT)
  cpt!: CPT[];

  // @Expose()
  // @IsArray()
  // @ArrayNotEmpty()
  // //@ValidateNested()
  // @IsDefined()
  // @Type(() => mongoose.Types.ObjectId)
  // icd!: mongoose.Types.ObjectId[];

  @Expose()
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  //@IsDefined()
  @IsNotEmpty()
  icd!: Ref<ICTCodes>[];

  @Expose()
  @IsOptional()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  ///@IsNotEmpty()
  financial_class_id?: Ref<FinancialClass>;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  total_amount!: number;

  @Expose()
  @Type(() => Boolean)
  @IsNotEmpty()
  responsible_party!: boolean;

  @Expose()
  @Type(() => Boolean)
  @IsNotEmpty()
  accept_assignment!: boolean;
  // @Expose()
  // @IsArray()
  // @IsOptional()
  // @ValidateNested()
  // @Type(() => ProviderDetails)
  // provider_details!: ProviderDetails[];

  //copay starts

  // @Expose()
  // @Type(() => Number)
  // @IsNumber()
  // @IsNotEmpty()
  // total_amount!: number;

  // @Expose()
  // @IsEnum(EBillMethodValues, {
  //   message: "Method can only be FULL or ADVANCE",
  // })
  // @IsDefined()
  // @IsNotEmpty()
  // payment_option!: string;

  // @Expose()
  // @IsEnum(EBillingModeValues, {
  //   message: "Mode can only be CASH, CARD, CHEQUE or LINK",
  // })
  // @IsDefined()
  // @IsNotEmpty()
  // payment_mode!: string;

  // @Expose()
  // @Type(() => Number)
  // @IsOptional()
  // //@IsNotEmpty()
  // copay?: number;
  // @Expose()
  // @IsEnum(EModeValues, {
  //   message: "Mode can only be CASH, CARD, CHEQUE or LINK",
  // })
  // @IsDefined()
  // @IsNotEmpty()
  // mode!: string;

  @Expose()
  @Type(() => Boolean)
  @IsOptional()
  //@IsNotEmpty()
  received_cash?: boolean;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsOptional()
  // //@IsNotEmpty()
  // cheque_number?: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsOptional()
  //@IsNotEmpty()
  notes?: string;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsOptional()
  // //@IsNotEmpty()
  // email?: string;

  //copay details ends
  // @Expose()
  // @IsObject()
  // @IsDefined()
  // @ValidateNested()
  // @Type(() => CoPay)
  // copay_details!: CoPay;

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  createdby_id!: string;

  //Added By Ankit ---17-02-2023
  @Expose()
  assignedStatus!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  coverage?: string;

  @IsOptional()
  @Expose()
  insurance?: any;

  @Expose()
  copay!: any;
  //Added By Ankit ---30-32-2023
  @Expose()
  ClaimStatusObject!: ClaimStatusObjectViewmodel;
}
