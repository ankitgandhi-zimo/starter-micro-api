import { Ref } from "@typegoose/typegoose";
import { Roles } from "aws-sdk/clients/budgets";
import { Expose, Transform, TransformFnParams, Type } from "class-transformer";
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsDate,
  IsDefined,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import mongoose from "mongoose";
import { Cards } from "../../models/cards.model";
import { Country } from "../../models/country.model";
import { FinancialClass } from "../../models/financialclass.model";
import {
  EFullValues,
  EModeValues,
  EOccurenceValues,
  Patients,
} from "../../models/patient.model";

import { States } from "../../models/state.model";
import { EPermissionValues, User } from "../../models/user.model";
import { EGendervalues } from "../claims/claim_submit.viewmodel";

export class PermissionObjectViewModel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsEnum(EPermissionValues, {
    message:
      "key value must be from one of them i.e AVAILABILITY,SCHEDULER,NOTES,SOAPNOTES,TREATMENTPLAN",
  })
  @IsNotEmpty()
  key!: string;
}

class PaymentObjectViewmodel {
  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsEnum(EModeValues, {
    message: "mode value must be from one of them i.e FULL, SPLIT or EMI",
  })
  @IsDefined()
  @IsNotEmpty()
  mode?: string;

  @Expose()
  @IsOptional()
  full?: FullObjectViewModel;

  @Expose()
  @IsOptional()
  emi?: EmiObjectViewModel;

  @Expose()
  @IsOptional()
  split?: SplitObjectViewModel | null;
}

class FullObjectViewModel {
  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsEnum(EFullValues, {
    message: "type value must be from one of them i.e  CASH,CARD,CHEQUE,LINK",
  })
  @IsDefined()
  @IsNotEmpty()
  type?: string;

  @IsOptional()
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  card_id!: Ref<Cards> | null;
}

class EmiObjectViewModel {
  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsEnum(EOccurenceValues, {
    message:
      "type value must be from one of them i.e FIFTEEN,THIRTY,FOURTYFIVE,ZERO ",
  })
  @IsDefined()
  @IsNotEmpty()
  type?: number;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsEnum(EOccurenceValues, {
    message:
      "occurrence value must be from one of them i.e FIFTEEN,THIRTY,FOURTYFIVE,ZERO ",
  })
  @IsDefined()
  @IsNotEmpty()
  occurrence!: number;

  //   @prop({ ref: "Cards", default: null })
  //   card_id!: Ref<Cards> | null;
}

class SplitObjectViewModel {
  @Expose()
  p1!: P1ObjectViewModel;

  @Expose()
  p2!: P2ObjectViewmodel;
}

class P1ObjectViewModel {
  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsEnum(EModeValues, {
    message: "type value must be from one of them i.e FULL, SPLIT or EMI",
  })
  @IsDefined()
  @IsNotEmpty()
  type?: string;

  //   @prop({ ref: "Cards", default: null })
  //   card_id!: Ref<Cards> | null;
}

class P2ObjectViewmodel {
  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsEnum(EModeValues, {
    message: "type value must be from one of them i.e FULL, SPLIT or EMI",
  })
  @IsDefined()
  @IsNotEmpty()
  type?: string;
}

export class UpdatePatientViewmodel {
  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  _id!: Ref<Patients> | null;

  @IsOptional()
  @Expose()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  @IsDefined()
  @IsNotEmpty()
  cards?: string[] | null;

  @IsOptional()
  @Expose()
  financialClass_id?: Ref<FinancialClass> | null;

  @Expose()
  // @IsMongoId()
  // @IsDefined()
  // @IsNotEmpty()
  // @Type(() => mongoose.Types.ObjectId)
  clinic_id!: Ref<User> | null;

  @Expose()
  // @IsMongoId()
  // @IsDefined()
  // @IsNotEmpty()
  // @Type(() => mongoose.Types.ObjectId)
  role!: Ref<Roles> | null;

  @Expose()
  role_permission!: any;

  // Basic details portion

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  title?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  first_name?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  last_name?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  //@IsNotEmpty()
  middle_name?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  //@IsNotEmpty()
  image?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  //@IsNotEmpty()
  responsible_person?: string;

  @IsOptional()
  @Expose()
  //@Type(() => String)
  //@IsString()
  @IsDefined()
  @IsEnum(EGendervalues, {
    message: "Gender can only be  F, M, Others",
  })
  @IsNotEmpty()
  gender?: string;

  @Expose() // generated by self Fist letter first name and fist letter of last name---total 9 digit nemric number
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // @MaxLength(7)
  patientId!: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  GI?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  SO?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  SSN?: string;

  @IsOptional()
  @Expose()
  @IsEmail()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  email?: string;

  // @IsOptional()
  // @Expose()
  // @Type(() => Date)
  // @IsDate()
  // @IsDefined()
  // @IsNotEmpty()
  // date_of_birth?: string;

  @IsOptional()
  @Expose()
  // @Type(() => Date)
  // @IsDate()
  // @IsDefined()
  @IsNotEmpty()
  date_of_birth?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  marital_status?: string;

  // address details portion

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  appartment?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  address?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  postal_code?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  city?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  country?: Ref<Country> | null;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  state?: Ref<States> | null;

  @Expose()
  createdby_id: Ref<User> | null;

  @IsOptional()
  @Expose()
  @IsDefined()
  @MinLength(8, {
    message: "Password length can not less than 8 character",
  })
  @MaxLength(20, {
    message: "Password length can not greater than 20 character",
  })
  @Matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/, {
    message:
      "Password must have one number and one capital letter and one special character.",
  })
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  password?: string;

  @IsOptional()
  @Expose()
  time_zone?: string;

  @Expose()
  customer_id_stripe!: string;

  @IsOptional()
  @Expose()
  isActive?: boolean;

  @IsOptional()
  @Expose()
  isVerified?: boolean;

  @Expose()
  mergeStatus!: boolean;

  @IsOptional()
  @Expose()
  // @IsDefined()

  // @IsEnum(EBoolValues, {
  //   message:
  //     "isDeleted value must be boolean type i.e true or false",
  // })
  isDeleted?: boolean;

  @Expose()
  contact!: any;

  @IsOptional()
  @Expose()
  payment?: PaymentObjectViewmodel;

  // @IsOptional()
  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // emergency_person_relation?: string;

  // @IsOptional()
  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // emergency_person_name?: string;

  // @IsOptional()
  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // emergency_person_Contact?: string;

  //   @Expose()
  //   contact!: ContactObjectViewmodel;

  // @Expose()
  //   payment!: PaymentObjectViewmodel;

  //   @Expose()
  //   verifiedby_id!: Ref<User> | null;
}
