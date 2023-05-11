import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  IsEmail,
  IsInt,
  IsDate,
  Length,
  Min,
  Max,
  MinLength,
  MaxLength,
  ValidateNested,
  IsObject,
  IsMongoId,
  ValidateIf,
} from "class-validator";

export class Permissions {
  [key: string]: PermissionObject;
}

export class PermissionObject {
  @Expose()
  @Type(() => Boolean)
  @IsNotEmpty()
  @IsDefined()
  read!: boolean;

  @Expose()
  @Type(() => Boolean)
  @IsNotEmpty()
  @IsDefined()
  write!: boolean;
}

export class UpdateUserPermissionViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  _id!: string;

  @Expose()
  @IsObject()
  @IsDefined()
  @ValidateNested()
  @Type(() => Permissions)
  role_permission!: Permissions;
}
