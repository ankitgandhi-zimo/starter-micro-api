import { Expose, Type } from "class-transformer";
import {
    IsDefined, IsNotEmpty, IsString
} from "class-validator";

export class RefreshTokenViewmodel {
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  refresh_token!: string;

}
