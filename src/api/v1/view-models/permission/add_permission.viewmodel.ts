import { Expose, Type, Transform } from "class-transformer";
import { IsDefined, IsNotEmpty, IsString, IsMongoId } from "class-validator";

export class AddPermissionViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  //@Transform((value) => value.toUpperCase())
  @IsDefined()
  @IsNotEmpty()
  name!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  createdby_id!: String;
}
