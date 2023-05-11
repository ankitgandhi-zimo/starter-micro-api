import { mongoose, Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import {
  EBillingModeValues,
  EBillMethodValues,
} from "../../models/billing_payment.model";
import { Doctor } from "../../models/doctor.model";
import { FinancialClass } from "../../models/financialclass.model";
import { ICTCodes } from "../../models/ict.model";
import { Insurance } from "../../models/insurance/insurance.model";
import {
  BillStatus,
  SuperBill,
} from "../../models/super_bill.model";
import {
  ClaimStatusObjectViewmodel,
  CPT,
} from "./add_super_bill.viewmodel";

// export class CPT {
//   @Expose()
//   @Type(() => mongoose.Types.ObjectId)
//   @IsDefined()
//   @IsMongoId()
//   @IsNotEmpty()
//   cpt_code_id!: Ref<CPTCodes>;

//   @Expose()
//   @Type(() => Number)
//   @IsNumber()
//   @IsDefined()
//   @IsNotEmpty()
//   unit!: number;

//   @Expose()
//   @Type(() => String)
//   @IsString()
//   @IsDefined()
//   @IsNotEmpty()
//   description!: string;

//   @Expose()
//   @Type(() => Number)
//   @IsNumber()
//   @IsDefined()
//   @IsNotEmpty()
//   fee!: number;

//   @Expose()
//   @Type(() => String)
//   @IsString()
//   @IsDefined()
//   @IsMongoId()
//   @IsNotEmpty()
//   modifier!: string;

//   @Expose()
//   @IsOptional()
//   @IsArray()
//   @Type(() => Number)
//   icd?: number[];
//   // @Expose()
//   // @IsObject()
//   // @IsOptional()
//   // @ValidateNested()
//   // @Type(() => LinkedICDS)
//   // linkedIcd?: LinkedICDS;
// }
// //CPT HAS MULTIPLE ICDS
// export class ICD {
//   @Expose()
//   @IsMongoId()
//   @IsDefined()
//   @IsNotEmpty()
//   @Type(() => mongoose.Types.ObjectId)
//   icd_id!: Ref<ICTCodes>;

//   @Expose()
//   @Type(() => String)
//   @IsString()
//   @IsDefined()
//   @IsNotEmpty()
//   icdCode!: string;

//   @Expose()
//   @Type(() => String)
//   @IsString()
//   @IsDefined()
//   @IsNotEmpty()
//   description!: string;
// }

// export class LinkedICDS {
//   @Expose()
//   @IsDefined()
//   @IsArray()
//   @Type(() => Number)
//   @IsNotEmpty()
//   icd!: number[];

//   @Expose()
//   @Type(() => Number)
//   @IsNumber()
//   @IsDefined()
//   @IsNotEmpty()
//   pos!: number;

//   @Expose()
//   @Type(() => Number)
//   @IsNumber()
//   @IsDefined()
//   @IsNotEmpty()
//   quantity!: number;

//   @Expose()
//   @Type(() => Number)
//   @IsNumber()
//   @IsDefined()
//   @IsNotEmpty()
//   charges!: number;
// }

export class UpdateSuperBillViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsOptional()
  @IsMongoId()
  @IsNotEmpty()
  _id!: Ref<SuperBill>;

  @Expose()
  @IsEnum(BillStatus, {
    message:
      "Status can only be quickSave, quickSaveSignOff, linkAndSave, linkSaveSignOff or noLinkSave",
  })
  @IsOptional()
  @IsNotEmpty()
  status!: BillStatus;

  // @Expose()
  // @Type(() => String)
  // @IsDefined()
  // @IsMongoId()
  // @IsNotEmpty()
  // patient_id!: string;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsMongoId()
  // @IsNotEmpty()
  // appointment_id!: string;

  @Expose()
  @Type(() => String)
  @IsOptional()
  // @IsMongoId()
  @IsNotEmpty()
  payer_id!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsOptional()
  //@IsNotEmpty()
  responsible_party_name?: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsOptional()
  //@IsNotEmpty()
  insurance_name?: string;

  @Expose()
  @IsOptional()
  @Type(() => mongoose.Types.ObjectId)
  @IsString()
  //@IsNotEmpty()
  insurance_id?: Ref<Insurance>;
  //patient detail ends

  //provider detail start

  @Expose()
  //@IsDefined()
  @IsOptional()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsNotEmpty()
  referring_provider_id!: Ref<Doctor>;

  @Expose()
  //@IsDefined()
  @IsOptional()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsNotEmpty()
  rendering_provider_id!: Ref<Doctor>;

  @Expose()
  //@IsDefined()
  @IsOptional()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsNotEmpty()
  billing_provider_id!: Ref<Doctor>;

  @Expose()
  //@IsDefined()
  @IsOptional()
  @Type(() => String)
  @IsDateString()
  @IsNotEmpty()
  fromDate!: string;

  @Expose()
  //@IsDefined()
  @IsOptional()
  @Type(() => String)
  @IsDateString()
  @IsNotEmpty()
  toDate!: string;

  @Expose()
  //@IsDefined()
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  duration!: number;

  @Expose()
  //@IsDefined()
  @Type(() => String)
  // @IsMongoId()
  @IsOptional()
  @IsNotEmpty()
  type_of_service!: string;

  @Expose()
  //@IsDefined()
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  place_of_service!: string;

  @Expose()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @IsOptional()
  @Type(() => CPT)
  cpt!: CPT[];

  @Expose()
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  //@IsDefined()
  @IsNotEmpty()
  icd!: Ref<ICTCodes>[];

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsOptional()
  // @IsNotEmpty()
  financial_class_id?: Ref<FinancialClass>;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  total_amount!: number;

  @Expose()
  @Type(() => Boolean)
  @IsOptional()
  // @IsNotEmpty()
  responsible_party!: boolean;

  @IsOptional()
  @Expose()
  @Type(() => Boolean)
  @IsNotEmpty()
  accept_assignment?: boolean;
  //provider details ends

  // @Expose()
  // @IsArray()
  // @IsOptional()
  // @ValidateNested()
  // @Type(() => ProviderDetails)
  // provider_details!: ProviderDetails[];

  //copay starts

  // @Expose()
  // @IsEnum(EBillMethodValues, {
  //   message: "Method can only be FULL or ADVANCE",
  // })
  // @IsOptional()
  // @IsNotEmpty()
  // payment_option!: string;

  // @Expose()
  // @IsEnum(EBillingModeValues, {
  //   message: "Mode can only be CASH, CARD, CHEQUE or LINK",
  // })
  // @IsOptional()
  // @IsNotEmpty()
  // payment_mode!: string;

  // @Expose()
  // @Type(() => Number)
  // @IsOptional()
  // //@IsNotEmpty()
  // copay?: number;

  @Expose()
  @Type(() => Boolean)
  @IsOptional()
  @IsNotEmpty()
  received_cash!: boolean;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsOptional()
  //@IsNotEmpty()
  cheque_number?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  notes?: string;

  //Added By Ankit ---17-02-2023
  @Expose()
  assignedStatus!: string;

  //Added By Ankit ---30-32-2023
  @Expose()
  ClaimStatusObject!: ClaimStatusObjectViewmodel;
  ///////////////////////////////////////////
  @Expose()
  @Type(() => Boolean)
  @IsOptional()
  @IsNotEmpty()
  marked_as_printed?: boolean;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsOptional()
  // @IsNotEmpty()
  // email!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  coverage?: string;

  @IsOptional()
  @Expose()
  insurance?: any;

  @IsOptional()
  @Expose()
  copay?: any;
}
