import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  MinLength,
} from "class-validator";

export class AddGroupViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @MinLength(2)
  @IsDefined()
  @IsNotEmpty()
  name!: string;

  @Expose()
  // @Type(() => String)
  // @IsString()
  // // @MinLength(2)
  // @IsDefined()
  // @IsNotEmpty()
  group_id!: string;
}
