import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from "class-validator";
import mongoose from "mongoose";
import { Appointment } from "../../../models/appointment.model";
import { CPTCodes } from "../../../models/cpt.model";
import { FinancialClass } from "../../../models/financialclass.model";
import { ICTCodes } from "../../../models/ict.model";
import { Insurance } from "../../../models/insurance/insurance.model";
import { EBoolValues, User } from "../../../models/user.model";
export enum EDaysValues {
  TODAY = "TODAY",
  LAST7 = "LAST7",
  LAST_MONTH = "LAST_MONTH",
}
export class CodesObjectViewmodel {
  @ValidateIf((x) => x.noShow == "false" || x.noShow == false)
  @Expose()
  @IsArray()
  //@ArrayNotEmpty()
  @IsMongoId({ each: true })
  @IsDefined()
  @IsNotEmpty()
  @ArrayMinSize(1)
  //@Type(() => mongoose.Types.ObjectId)
  ICD_10!: Ref<ICTCodes>[];

  //   @ValidateIf(
  //     (x) => x.ICD_10.length == 0 && x.noShow == "false"
  //   )
  @Expose()
  @IsArray()
  //@ArrayNotEmpty()
  @IsMongoId({ each: true })
  @IsOptional()
  @IsNotEmpty()
  //@Type(() => mongoose.Types.ObjectId)
  ICD_9?: Ref<ICTCodes>[];

  @ValidateIf((x) => x.noShow == "false" || x.noShow == false)
  @Expose()
  @IsArray()
  //@ArrayNotEmpty()
  @IsMongoId({ each: true })
  @IsDefined()
  @IsNotEmpty()
  @ArrayMinSize(1)
  //@Type(() => mongoose.Types.ObjectId)
  cptCode!: Ref<CPTCodes>[];
}

export class PatientCheckOutViewmodel {
  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  nowTime!: Date;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  duration!: number;

  @IsOptional()
  @Expose()
  @Type(() => Boolean)
  @IsBoolean()
  //@IsDefined()
  //@IsNotEmpty()
  followUp?: boolean;

  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  clinic_id!: Ref<User>;

  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  appointment_id!: Ref<Appointment>;

  @Expose()
  @IsMongoId()
  @IsOptional()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  financialClass_id!: Ref<FinancialClass> | null;

  @IsOptional()
  @Expose()
  @Type(() => String)
  //   @IsString()
  //   @IsDefined()
  //   @IsNotEmpty()
  remark?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  //   @IsString()
  //   @IsDefined()
  //   @IsNotEmpty()
  notes?: string;

  // @Expose()
  // @IsDefined()
  // @IsEnum(EBoolValues, {
  //   message: "noShow value must be from one of them i.e true  or false",
  // })
  // noShow!: string;

  // @Expose()
  // @IsDefined()
  // @IsEnum(EBoolValues, {
  //   message: "chargePatient value must be from one of them i.e true  or false",
  // })
  // chargePatient!: string;

  @Expose()
  @Type(() => Boolean)
  @IsBoolean()
  @IsDefined()
  @IsNotEmpty()
  noShow!: boolean;

  @Expose()
  @Type(() => Boolean)
  @IsBoolean()
  @IsDefined()
  @IsNotEmpty()
  chargePatient!: boolean;

  @Expose()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  // @IsEnum(EBoolValues, {
  //   message: "noShow value must be from one of them i.e true  or false",
  // })
  placeOfService!: string;

  @Expose()
  @IsDefined()
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CodesObjectViewmodel)
  codes!: CodesObjectViewmodel;

  //ADDED BY CHARANJIT 12 April,23
  @Expose()
  @IsOptional()
  @IsString()
  payer_id?: string;

  @Expose()
  @IsOptional()
  @IsString()
  insurance_name?: string;

  @Expose()
  //@IsMongoId()
  //@IsDefined()
  //@IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  insurance_id!: Ref<Insurance> | null;
}
