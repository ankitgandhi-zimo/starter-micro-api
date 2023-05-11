import { Expose, Type } from "class-transformer";
import { IsDefined, IsMongoId, IsNotEmpty, IsOptional } from "class-validator";
import mongoose from "mongoose";

export class CheckMongoIdOptionalViewmodel {
  @IsOptional()
  @Expose()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => mongoose.Types.ObjectId)
  _id?: string;
}
