import { Ref } from "@typegoose/typegoose";
import { Roles } from "aws-sdk/clients/budgets";
import { Expose, Transform, TransformFnParams, Type } from "class-transformer";
import {
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
import { Country } from "../../models/country.model";

import { States } from "../../models/state.model";
import { EPermissionValues, User } from "../../models/user.model";
import { EGendervalues } from "../claims/claim_submit.viewmodel";

export class PermissionObjectViewModel {
  // @prop({ ref: Product, type: mongoose.Types.ObjectId })
  // _id!:    | null;

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
export class AddPatientViewmodel {
  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
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

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  first_name!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  last_name!: string;

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
  //@IsDefined({ message: "Image is required" })
  //@IsNotEmpty()
  image!: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  //@IsNotEmpty()
  responsible_person?: string;

  @Expose()
  //@Type(() => String)
  ///@IsString()
  @IsDefined()
  @IsEnum(EGendervalues, {
    message: "Gender can only be  F, M, Others",
  })
  @IsNotEmpty()
  gender!: string;

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
  //@IsDefined()
  //@IsNotEmpty()
  GI?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  //@IsNotEmpty()
  SO?: string;

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  //@IsNotEmpty()
  SSN!: string;

  @Expose()
  @IsEmail()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  email!: string;

  // @Expose()
  // @Type(() => Date)
  // @IsDate()
  // @IsDefined()
  // @IsNotEmpty()

  @Expose()
  @IsDefined()
  @IsString()
  date_of_birth!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  marital_status!: string;

  // address details portion

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  appartment!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  address!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  postal_code!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  city!: string;

  @Expose()
  @Type(() => String)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  country!: Ref<Country> | null;

  @Expose()
  @Type(() => String)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  state!: Ref<States> | null;

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

  @Expose()
  time_zone!: string;

  @Expose()
  customer_id_stripe!: string;

  @Expose()
  cards?: string[] | null;

  @Expose()
  isActive!: boolean;

  @Expose()
  // @IsDefined()

  // @IsEnum(EBoolValues, {
  //   message:
  //     "isDeleted value must be boolean type i.e true or false",
  // })
  isDeleted!: boolean;

  @Expose()
  contact!: any;

  @Expose()
  payment!: any;

  @Expose()
  isVerified!: boolean;

  @Expose()
  mergeStatus!: boolean;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // emergency_person_relation!: string;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // emergency_person_name!: string;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // emergency_person_Contact!: string;

  //   @Expose()
  //   contact!: ContactObjectViewmodel;

  // @Expose()
  //   payment!: PaymentObjectViewmodel;

  //   @Expose()
  //   verifiedby_id!: Ref<User> | null;
}