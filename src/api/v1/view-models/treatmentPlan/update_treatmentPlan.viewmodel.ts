import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  IsMongoId,
  IsInt,
  IsArray,
  ValidateNested,
  IsObject,
  MaxLength,
  IsEnum,
  ValidateIf,
  IsIn,
} from "class-validator";
import { FormFields } from "./add_treatmentPlan.viewmodel";

export class UpdateTreatmentPlanViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsNotEmpty()
  form_title!: string;
  //@IsEnum(entity: object)

  @Expose()
  //@IsObject()
  //@IsDefined()
  @ValidateNested()
  @Type(() => FormFields)
  fields!: FormFields[];

  @Expose()
  @Type(() => String)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  _id!: string;
}
