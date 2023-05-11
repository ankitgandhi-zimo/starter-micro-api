import { mongoose, Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  IsMongoId,
  IsArray,
  ArrayNotEmpty,
} from "class-validator";
import { Clinic } from "../../models/clinic.model";
import { User } from "../../models/user.model";

export class AddBillingTeamViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Expose()
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId({ each: true })
  @IsDefined()
  clinics!: Ref<Clinic>[];

  // @Expose()
  // @Type(() => mongoose.Types.ObjectId)
  // @IsDefined()
  // @IsMongoId()
  // @IsNotEmpty()
  // team_admin!: Ref<User>;

  // @Expose()
  // @IsArray()
  // @ArrayNotEmpty()
  // @Type(() => mongoose.Types.ObjectId)
  // @IsMongoId({ each: true })
  // @IsDefined()
  // claim_creator!: Ref<User>[];

  // @Expose()
  // @IsArray()
  // @ArrayNotEmpty()
  // @Type(() => mongoose.Types.ObjectId)
  // @IsMongoId({ each: true })
  // @IsDefined()
  // auditor!: Ref<User>[];

  // @Expose()
  // @IsArray()
  // @Type(() => mongoose.Types.ObjectId)
  // @ArrayNotEmpty()
  // @IsMongoId({ each: true })
  // @IsDefined()
  // payment_dept!: Ref<User>[];

  // @Expose()
  // @IsArray()
  // @Type(() => mongoose.Types.ObjectId)
  // @ArrayNotEmpty()
  // @IsMongoId({ each: true })
  // @IsDefined()
  // statement_handler!: Ref<User>[];

  // @Expose()
  // @IsArray()
  // @Type(() => mongoose.Types.ObjectId)
  // @ArrayNotEmpty()
  // @IsMongoId({ each: true })
  // @IsDefined()
  // follow_up!: Ref<User>[];

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsString()
  //@IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  createdby_id!: Ref<User>;
}
