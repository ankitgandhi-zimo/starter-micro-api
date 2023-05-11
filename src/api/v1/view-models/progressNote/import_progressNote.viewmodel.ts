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
  IsOptional,
} from "class-validator";
import { FormFields } from "./add_progressNote.viewmodel";

export class ImportProgressNoteViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  progress_note_id!: mongoose.Schema.Types.ObjectId;

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

  // @Expose()
  // @IsOptional()
  // @IsNotEmpty()
  // @Type(() => Boolean)
  // saveAsDraft!: boolean;

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
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  clinic_id!: mongoose.Schema.Types.ObjectId;
}
