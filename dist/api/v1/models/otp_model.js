"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginOTPs = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var user_model_1 = require("./user.model");
var LoginOTPs = /** @class */ (function () {
    function LoginOTPs() {
    }
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User, type: typegoose_1.mongoose.Types.ObjectId }),
        __metadata("design:type", Object)
    ], LoginOTPs.prototype, "user_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String }),
        __metadata("design:type", String)
    ], LoginOTPs.prototype, "otp", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Number }),
        __metadata("design:type", Number)
    ], LoginOTPs.prototype, "otp_generation_time", void 0);
    LoginOTPs = __decorate([
        (0, typegoose_1.index)({ otp: "text" })
    ], LoginOTPs);
    return LoginOTPs;
}());
exports.LoginOTPs = LoginOTPs;
var LOGIN_OTP_MODEL = (0, typegoose_1.getModelForClass)(LoginOTPs, {
    schemaOptions: {
        collection: "login_otps",
        timestamps: true,
    },
});
exports.default = LOGIN_OTP_MODEL;
