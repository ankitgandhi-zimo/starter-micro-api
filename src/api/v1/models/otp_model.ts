import {
  getModelForClass,
  index,
  mongoose,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { User } from "./user.model";
@index({ otp: "text" })
export class LoginOTPs {
  @prop({ ref: User, type: mongoose.Types.ObjectId })
  user_id!: Ref<User>;

  @prop({ type: String })
  otp!: string;

  @prop({ type: Number })
  otp_generation_time!: number;
}

const LOGIN_OTP_MODEL = getModelForClass(LoginOTPs, {
  schemaOptions: {
    collection: "login_otps",
    timestamps: true,
  },
});

export default LOGIN_OTP_MODEL;
