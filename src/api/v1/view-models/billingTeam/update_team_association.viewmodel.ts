import { mongoose } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsMongoId,
  IsNotEmpty,
} from "class-validator";

export class UpdateMemberAssociationToTeamViewmodel {
  @Expose()
  @IsArray()
  @ArrayMinSize(1)
  // @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId({ each: true })
  // @IsNotEmpty()
  new_team_ids!: mongoose.Types.ObjectId[];

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  member_id!: mongoose.Types.ObjectId;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  old_team_id!: mongoose.Types.ObjectId;
}
