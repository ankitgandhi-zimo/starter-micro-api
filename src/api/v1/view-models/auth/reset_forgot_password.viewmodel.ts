import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class ResetForgotPasswordViewmodel {
  // @Expose()
  // @IsDefined()
  // @IsEmail()
  // @IsNotEmpty()
  // @IsString()
  // @Type(() => String)
  // email!: string;

  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  reset_token!: string;

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
}
