import { Ref } from "@typegoose/typegoose";
import { User } from "aws-sdk/clients/budgets";
import { Expose, Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import mongoose from "mongoose";
import {
  EBoolValues,
  EPermissionValues,
  ERescheduleTypeFeildValues,
  EVisitTypeValues,
} from "../../models/appointment.model";
import { AppointmentType } from "../../models/appointment_types.model";
import { Doctor } from "../../models/doctor.model";
import { ClinicLocation } from "../../models/location.model";
import { Patients } from "../../models/patient.model";

class EmailStatusObjectViewmodel {
  @Expose()
  @IsDefined()
  @IsEnum(EBoolValues, {
    message: "before_30_min value must be boolean type i.e true or false",
  })
  before_30_min!: boolean;

  @Expose()
  @IsDefined()
  @IsEnum(EBoolValues, {
    message: "before_24_hrs value must be boolean type i.e true or false",
  })
  before_24_hrs!: boolean;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name!: string;

  @Expose()
  @IsDefined()
  @IsEnum(EPermissionValues, {
    message:
      "key value must be from on of them  i.e AVAILABILITY,SCHEDULER,NOTES,SOAPNOTES,TREATMENTPLAN",
  })
  key!: string;
}

class RescheduleObjectViewmodel {
  // @Expose()
  // @Type(() => Date)
  // @IsDate()
  // @IsDefined()
  // @IsNotEmpty()
  // startDateTime!: string;

  // @Expose()
  // @Type(() => Date)
  // @IsDate()
  // @IsDefined()
  // @IsNotEmpty()
  // endDateTime!: string;

  // @Expose()
  // @Type(() => Date)
  // @IsDate()
  // @IsDefined()
  // @IsNotEmpty()
  // responseTime!: string;

  // @Expose()
  // @Type(() => Date)
  // @IsDate()
  // @IsDefined()
  // @IsNotEmpty()
  // rescheduleTime!: string;

  @Expose()
  @IsDefined()
  @IsEnum(ERescheduleTypeFeildValues, {
    message: "type value must be from one of them i.e  CLINIC,PATIENT",
  })
  type!: string;

  // @Expose()
  // @Type(() => mongoose.Types.ObjectId)
  // @IsMongoId()
  // @IsDefined()
  // @IsNotEmpty()
  // rescheduleby_id!: Ref<User> | null;

  // @Expose()
  // @Type(() => mongoose.Types.ObjectId)
  // @IsMongoId()
  // @IsDefined()
  // @IsNotEmpty()
  // responseby_id!: Ref<User> | null;
}

class CallDataObjectViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  password!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  join_url!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  start_url!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  meetingNumber!: string;
}

class AcceptedObjectViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  user_id!: Ref<User> | null;

  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  time!: string;
}

class DeclinedObjectViewmodel {
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  user_id!: Ref<User> | null;

  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  time!: string;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  reason!: string;
}

class RecurringObjectViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  number!: string;

  @Expose()
  @IsDefined()
  @IsEnum(EBoolValues, {
    message: "status value must be boolean type i.e true or false",
  })
  status!: boolean;
}
export class UpdateAppointmentViewmodel {
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  appointment_number!: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  duration?: number;

  @IsOptional()
  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  endDateTime?: string;

  @Expose()
  isDeleted!: boolean;

  @IsOptional()
  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  startDateTime?: string;

  @IsOptional()
  @Expose()
  isEmergency!: boolean;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty() // there will be no appointment type in case of unavailability( if multi patient true hai type me to check)
  appointment_type?: string;

  @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsNotEmpty() // this  appointment number and group id same if multi option true in app type 02-01-2023 GG
  groupId!: string;

  @Expose()
  createdby_id!: Ref<User>;

  @IsOptional()
  @Expose()
  @Type(() => EmailStatusObjectViewmodel)
  @IsDefined()
  @IsNotEmpty()
  emailStatus?: EmailStatusObjectViewmodel;

  @Expose()
  clinic_id!: Ref<User> | null;

  @Expose()
  doctor_id!: Ref<Doctor> | null;

  @Expose()
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  @IsDefined()
  @IsNotEmpty()
  patient_ids!: Ref<Patients>[];

  @Expose()
  patient_id!: Ref<Patients> | null;

  @IsOptional()
  @Expose()
  @Type(() => mongoose.Types.ObjectId)
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  location_id?: Ref<ClinicLocation> | null;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsEnum(EVisitTypeValues, {
    message: "visitType value must be from one of them i.e Physical,Tele-Call",
  })
  @IsNotEmpty()
  visitType!: string;

  @Expose()
  appointmentType_id!: Ref<AppointmentType> | null;

  @IsOptional()
  @Expose()
  @ValidateNested()
  @Type(() => RescheduleObjectViewmodel)
  @IsDefined()
  @IsNotEmpty()
  reschedule?: RescheduleObjectViewmodel | null;

  @Expose()
  // @Type(() => String)
  // @IsString()
  // @IsDefined()
  // @IsEnum(EStatusValues, {
  //   message:
  //     "status value must be from one of them i.e  Accepted,Pending,Rescheduled,Unavailability,Cancelled,Declined,Checkout",
  // })
  // @IsNotEmpty()
  status!: string;
  /////////////////////////////////////////////////////////////////////

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @Expose()
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  document?: string;

  @IsOptional()
  @Expose()
  @Type(() => CallDataObjectViewmodel)
  @IsDefined()
  @IsNotEmpty()
  callData?: CallDataObjectViewmodel | null;

  @IsOptional()
  @Expose()
  @Type(() => AcceptedObjectViewmodel)
  @IsDefined()
  @IsNotEmpty()
  accepted?: AcceptedObjectViewmodel | null;

  @IsOptional()
  @Expose()
  @Type(() => DeclinedObjectViewmodel)
  @IsDefined()
  @IsNotEmpty()
  declined?: DeclinedObjectViewmodel | null;

  @IsOptional()
  @Expose()
  @Type(() => AcceptedObjectViewmodel)
  @IsDefined()
  @IsNotEmpty()
  deleted?: AcceptedObjectViewmodel | null;

  @IsOptional()
  @Expose()
  @Type(() => RecurringObjectViewmodel)
  @IsDefined()
  @IsNotEmpty()
  recurring?: RecurringObjectViewmodel | null;
}
