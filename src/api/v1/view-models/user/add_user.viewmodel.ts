import { Ref } from "@typegoose/typegoose";
import { Expose, Transform, TransformFnParams, Type } from "class-transformer";
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import mongoose from "mongoose";

import { Roles } from "../../models/roles.model";
import { EPermissionValues, User } from "../../models/user.model";

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
export class AddUserViewmodel {
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

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Expose()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  // @Min(10)
  // @Max(10)
  mobile_no!: number;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined({
    message: "Image is required",
  })
  //@IsNotEmpty()
  @IsNotEmpty({
    message: "Image is required",
  })
  image!: string;

  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  role!: Ref<Roles> | null;

  @Expose()
  role_permission!: any;

  @Expose()
  isActive!: boolean;

  @Expose()
  addedBy_id: Ref<User> | null;

  @Expose()
  // @IsDefined()

  // @IsEnum(EBoolValues, {
  //   message:
  //     "isDeleted value must be boolean type i.e true or false",
  // })
  isDeleted!: boolean;

  @Expose()
  resetkey!: string;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // address!: string;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // zip_code!: string;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // city!: string;

  // @Expose()
  // @IsMongoId()
  // @IsDefined()
  // @IsNotEmpty()
  // @Type(() => mongoose.Types.ObjectId)
  // state!: Ref<States> | null;

  // @Expose()
  // @IsMongoId()
  // @IsDefined()
  // @IsNotEmpty()
  // @Type(() => mongoose.Types.ObjectId)
  // country!: Ref<Country> | null;

  // @Expose()
  // @ValidateNested({ each: true })
  // @Type(() => PermissionObjectViewModel)
  // @IsArray()
  // @ArrayNotEmpty()
  // @IsDefined()
  // permission!: PermissionObjectViewModel[];

  // @Expose()
  // date_of_birth!: Date;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // deactivateReason!: string;

  // @Expose()
  // isPlanCancelled!: boolean;

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

  // @Expose()
  // @IsMongoId()
  // @IsDefined()
  // @IsNotEmpty()
  // @Type(() => mongoose.Types.ObjectId)
  // invitedby_id!: Ref<User> | null;

  // @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // resetkey!: string;

  // @Expose()
  // @IsEnum(EAcceptedValues, {
  //   message:
  //     "isAccepted values must be from one of them i.e. accepted, declined,pending,signup",
  // })
  // @IsDefined()
  // @IsNotEmpty()
  // isAccepted!: string;
}
