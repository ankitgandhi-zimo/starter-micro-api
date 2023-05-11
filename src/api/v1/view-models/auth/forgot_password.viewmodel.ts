import { Expose, Type } from "class-transformer";
import {
  IsDate,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
} from "class-validator";
export class ForgotPasswordViewmodel {
  @Expose()
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  email!: string;

  @Expose()
  @IsDefined()
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  currentDate!: Date;
}
