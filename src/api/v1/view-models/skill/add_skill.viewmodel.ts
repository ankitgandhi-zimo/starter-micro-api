import { Expose, Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsString, IsMongoId } from "class-validator";

export class AddSkillViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  skillName!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  createdby_id!: String;
}
