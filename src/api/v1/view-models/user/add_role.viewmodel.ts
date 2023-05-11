import { Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsString,
} from "class-validator";

import {
  EPermissionValues,
  User,
} from "../../models/user.model";

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

class PermissionValuesObjectViewModel {
  @Expose()
  read!: boolean;

  @Expose()
  write!: boolean;
}
class PermissionSchemaViewModel {
  [key: string]: PermissionValuesObjectViewModel;
}

export class AddUserRoleViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  roleTitle!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  roleName!: string;

  @Expose()
  permission!: PermissionSchemaViewModel;

  @Expose()
  //   @IsDefined()
  //   @IsEnum(EBoolValues, {
  //     message:
  //       "isActive value must be boolean type i.e true or false",
  //   })
  isActive!: boolean;

  @Expose()
  isDeleted!: boolean;

  @Expose()
  isBillingTeam!: boolean;

  @Expose()
  createdby_id: Ref<User> | null;
}
