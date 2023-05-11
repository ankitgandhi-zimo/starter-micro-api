import { mongoose } from "@typegoose/typegoose";
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

export class ImportTreatmentPlanViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  treatment_plan_id!: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Type(() => String)
  @IsString()
  //@IsDefined()
  @IsNotEmpty()
  form_title!: string;
  //@IsEnum(entity: object)

  @Expose()
  //@IsObject()
  // @IsDefined()
  @ValidateNested()
  @Type(() => FormFields)
  fields!: FormFields[];

  @Expose()
  //@IsOptional()
  @IsNotEmpty()
  @Type(() => Boolean)
  import!: boolean;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  //@IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  createdby_id!: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  //@IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  clinic_id!: mongoose.Schema.Types.ObjectId;
}
