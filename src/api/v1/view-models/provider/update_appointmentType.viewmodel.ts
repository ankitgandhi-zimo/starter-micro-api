import { mongoose, Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import { ObjectId } from "mongodb";
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsMongoId,
  IsArray,
  ArrayNotEmpty,
  IsBoolean,
} from "class-validator";
import { AppointmentType } from "../../models/appointment_types.model";
import { User } from "../../models/user.model";

export class UpdateAppointmentTypeViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  _id!: Ref<User>;

  @Expose()
  @Type(() => Boolean)
  @IsBoolean()
  @IsDefined()
  assign!: boolean;

  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  appointment_type_id!: Ref<AppointmentType>;
}
