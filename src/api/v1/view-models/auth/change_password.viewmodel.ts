import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { EBoolValues } from "../../models/user.model";

export class ChangePasswordViewModel {
  @Expose()
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  email!: string;

  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  password!: string;

  @Expose()
  @IsDefined()
  @MinLength(8, {
    message:
      "password length can not less than 8 character",
  })
  @MaxLength(20, {
    message:
      "password length can not greater than 20 character",
  })
  // @Matches(/^[a-zA-Z0-9]\S*$/, {
  //   message: "password not contain any space ",
  // })
  @Matches(
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
    {
      message:
        "Password must have one number and one capital letter and one special character.",
    }
  )
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  new_password!: string;

  @IsOptional()
  @Expose()
  // @Default("false")
  @IsEnum(EBoolValues, {
    message:
      "logOutAll values must be from one of them i.e.true or false",
  })
  @IsDefined()
  @IsNotEmpty()
  logOutAll?: EBoolValues;
}
