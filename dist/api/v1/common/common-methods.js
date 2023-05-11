"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utility = exports.ValidationResult = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var crypto_ts_1 = require("crypto-ts");
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var nodemailer_smtp_transport_1 = __importDefault(require("nodemailer-smtp-transport"));
require("reflect-metadata");
var erros_message_1 = __importDefault(require("../common/erros_message"));
var roles_model_1 = __importDefault(require("../models/roles.model"));
var message_formatter_1 = require("./message-formatter");
var util = require("util");
var jwtVerifyAsync = util.promisify(jsonwebtoken_1.default.verify);
var ValidationResult = /** @class */ (function () {
    function ValidationResult() {
    }
    return ValidationResult;
}());
exports.ValidationResult = ValidationResult;
// export interface IPaginationResult {
//   status_code: number;
//   success: boolean;
//   data: any;
//   totalDocs?: number;
//   pageNumber?: number;
//   pageSize?: number;
// }
var getDecryptText = function (text) {
    var _a, _b;
    var bytes = crypto_ts_1.AES.decrypt(text, (_a = process.env.CRYPTO_PASSWORD) !== null && _a !== void 0 ? _a : "");
    var plaintext = (_b = bytes.toString(crypto_ts_1.enc.Utf8)) !== null && _b !== void 0 ? _b : "";
    return plaintext;
};
var Utility = /** @class */ (function () {
    function Utility() {
        var _this = this;
        this.errors = [];
        this.ValidateAndConvert = function (classToConvert, body) { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = new ValidationResult();
                        result.data = (0, class_transformer_1.plainToClass)(classToConvert, body);
                        return [4 /*yield*/, (0, class_validator_1.validate)(result.data, {
                                skipMissingProperties: true,
                                excludeExtraneousValues: true,
                            }).then(function (errors) {
                                var errors_temp = message_formatter_1.MessageFormatter.format(errors);
                                result.error = errors_temp;
                                return result;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        }); };
        this.signJWT = function (payload, expires_in) {
            var jwtToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_TOKEN_SECRET || "", {
                issuer: process.env.JWT_TOKEN_ISSUER || "",
                expiresIn: expires_in !== null && expires_in !== void 0 ? expires_in : "20d",
                audience: process.env.JWT_AUDIENCE || "",
            });
            return jwtToken;
        };
        this.daysInMonth = function (month, year) {
            // Use 1 for January, 2 for February, etc.
            return new Date(year, month, 0).getDate();
        };
        //check user activation
        this.isActiveUser = function () {
            return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    user = req.user;
                    console.log(user, "useruser");
                    if (user.isActive) {
                        next();
                    }
                    else
                        res.send({
                            data: {
                                message: "Your account is temporarily blocked.Contatct with admin team for activation",
                                Error: "On Fecth Error",
                            },
                            success: false,
                            status_code: http_status_codes_1.default.OK,
                        });
                    return [2 /*return*/];
                });
            }); };
        };
        /** @info middleware to check whether user is hasspecific role  */
        this.checkRoles = function () {
            var roles = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                roles[_i] = arguments[_i];
            }
            return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                var userDetail_1, requiredRoles, token, allRoles, isAutorizedUser, hasRoles_1, error_1;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 4, , 5]);
                            userDetail_1 = req.user;
                            requiredRoles = __spreadArray([], roles, true);
                            token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
                            if (!token) return [3 /*break*/, 2];
                            return [4 /*yield*/, roles_model_1.default.find({})];
                        case 1:
                            allRoles = _c.sent();
                            isAutorizedUser = false;
                            hasRoles_1 = [];
                            allRoles.forEach(function (x) {
                                var _a;
                                if (x._id.toString() == ((_a = userDetail_1 === null || userDetail_1 === void 0 ? void 0 : userDetail_1.role) === null || _a === void 0 ? void 0 : _a.toString()))
                                    hasRoles_1.push(x.roleName);
                            });
                            if (requiredRoles.some(function (r) { return hasRoles_1.includes(r); })) {
                                isAutorizedUser = true;
                            }
                            console.log(isAutorizedUser);
                            if (isAutorizedUser)
                                next();
                            else
                                res.status(http_status_codes_1.default.UNAUTHORIZED).send({
                                    errors: {
                                        message: erros_message_1.default.NOT_AUTHORIZED_FOR_ACTION,
                                        error: erros_message_1.default.AUTH_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    success: false,
                                });
                            return [3 /*break*/, 3];
                        case 2: return [2 /*return*/, res.status(http_status_codes_1.default.FORBIDDEN).send({
                                errors: {
                                    message: erros_message_1.default.TOKEN_NOT_RECEIVED,
                                    error: erros_message_1.default.AUTH_ERROR,
                                },
                                status_code: http_status_codes_1.default.FORBIDDEN,
                                success: false,
                            })];
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            error_1 = _c.sent();
                            next(error_1);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); };
        };
        this.checkTokenExpiration = function () { return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetail, token, decodedToken, currentTime, isTokenExpired;
            var _a, _b;
            return __generator(this, function (_c) {
                try {
                    userDetail = req.user;
                    token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
                    if (token) {
                        decodedToken = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
                        currentTime = new Date().getTime() / 1000;
                        console.log(decodedToken.exp <= currentTime);
                        isTokenExpired = decodedToken.exp <= currentTime;
                        if (isTokenExpired == false)
                            next();
                        else
                            res.status(http_status_codes_1.default.UNAUTHORIZED).send({
                                errors: {
                                    message: erros_message_1.default.TOKEN_EXPIRED,
                                    error: erros_message_1.default.AUTH_ERROR,
                                },
                                status_code: http_status_codes_1.default.UNAUTHORIZED,
                                success: false,
                            });
                    }
                    else
                        res.status(http_status_codes_1.default.UNAUTHORIZED).send({
                            errors: {
                                message: erros_message_1.default.TOKEN_NOT_FOUND,
                                error: erros_message_1.default.AUTH_ERROR,
                            },
                            status_code: http_status_codes_1.default.UNAUTHORIZED,
                            success: false,
                        });
                }
                catch (error) {
                    next(error);
                }
                return [2 /*return*/];
            });
        }); }; };
        this.checkTokenExpiration1 = function () { return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var token, rr, err_1;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, jwtVerifyAsync(token, req.app.get(process.env.JWT_TOKEN_SECRET || ""))];
                    case 2:
                        rr = _c.sent();
                        console.log(rr, "ll");
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _c.sent();
                        console.log(err_1, "op");
                        throw new Error(err_1);
                    case 4:
                        next();
                        return [2 /*return*/];
                }
            });
        }); }; };
        this.generateRandomNDigits = function (n) {
            return Math.floor(Math.random() * (9 * Math.pow(10, n))) + Math.pow(10, n);
        };
        this.getEncryptText = function (text) {
            var _a;
            var ecryptedText = crypto_ts_1.AES.encrypt(text, (_a = process.env.CRYPTO_PASSWORD) !== null && _a !== void 0 ? _a : "zimo").toString();
            return ecryptedText;
        };
        this.getDecryptText = function (text) {
            var _a, _b;
            var bytes = crypto_ts_1.AES.decrypt(text, (_a = process.env.CRYPTO_PASSWORD) !== null && _a !== void 0 ? _a : "");
            var plaintext = (_b = bytes.toString(crypto_ts_1.enc.Utf8)) !== null && _b !== void 0 ? _b : "";
            return plaintext;
        };
        this.changeDateForClaim = function (dateString) {
            var subsDateOfBirthYear = new Date(dateString).getFullYear();
            var subsDateOfBirthMonth = new Date(dateString).getMonth() + 1;
            subsDateOfBirthMonth =
                subsDateOfBirthMonth < 10
                    ? "0" + "".concat(subsDateOfBirthMonth)
                    : subsDateOfBirthMonth;
            var subsDateOfBirthDate = new Date(dateString).getDate();
            subsDateOfBirthDate =
                subsDateOfBirthDate < 10
                    ? "0" + "".concat(subsDateOfBirthDate)
                    : subsDateOfBirthDate;
            var subsDateOfBirth = subsDateOfBirthYear + subsDateOfBirthMonth + subsDateOfBirthDate;
            return subsDateOfBirth;
        };
        this.replaceCharacter = function (text, index, replacement) {
            return (text.substring(0, index) +
                replacement +
                text.substring(index + replacement.length));
        };
        this.ForgotPasswordEmail = function (mailOptions, printContents) {
            // 1) Creating HTML content
            var html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    \n    <title>forgot Password Template</title>\n</head>\n\n<body style=\" margin: 0 auto;\nwidth: 80%;\nfont-family: sans-serif;\">\n   \n                <div style=\" border: 1px solid #bdbaba;\n                padding: 15px;\n                border-radius: 10px;\">\n                    \n                <img style src=\"http://74.208.25.43:4004/uploads/company_logo/thumbnail/acbd192b-2d2c-40a4-9996-33451b11e3f0-1653997058191_Zimo logo.png\" width=\"100px\" height=\"60px\">\n                <hr>\n                \n                    <h1 style=\"text-align: center;\">Reset your Password</h1>\n                    <hr style=\"height: 0.5px;\n                    opacity: 100;\n                    width: 47%;\n                    margin:10px auto;\n                    background-color: #706f6d;\n                    border: 1px solid #706f6d;\n                    margin-top: -1em;\">\n                \n                <h3 style=\"text-align: center; margin-bottom: 0.2em; margin-top: 2em;\">Hi ".concat(printContents.userName, ",</h3>\n                <p style=\"letter-spacing: 1.5px;\n                line-height: 1.7em; text-align: center;\">To reset your Password, Click the button below.</p>\n\n                <div style=\" text-align: center; margin-bottom: 2em; margin-top: 2em;\">    \n                <a href=\"").concat(printContents.link, "\" style=\"text-decoration: none;\"><button style=\"\n                font-size: 18px;\n               background-color: #ffffff;\n               border: 2px solid #198754;\n               border-radius: 7px;\n               padding:10px 26px;\n               font-weight: 600;\n               color: #198754;  \n               letter-spacing: 1.8px;\" type=\"button\" class=\"btn btn-info \">Reset Your Password</button></a>\n                </div>\n\n\n\n            <p style=\"letter-spacing: 1.5px;\n            line-height: 1.7em; text-align: center; \">If you do not want to change your password or didn't request  a reset ,you can ignore and delete this email.</p>\n              \n                <div style=\"text-align: center; margin-bottom: 2em; margin-top: 1em;\" >\n                <strong>Thank You!</strong></div>\n                </div>\n                \n            </div>\n       \n</body>\n</html>");
            // 2) Setting HTML content to the mail options
            mailOptions.html = html;
            // 3) Actually sending the mail
            return _this.sendEmail(mailOptions);
        };
        this.sendEmail = function (mailOptions) { return __awaiter(_this, void 0, void 0, function () {
            var transporter, transporterRes;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!mailOptions.from) {
                            mailOptions.from = (_a = process.env.SMTP_mailUserName) !== null && _a !== void 0 ? _a : "";
                        }
                        if (!mailOptions.from ||
                            !mailOptions.to ||
                            !mailOptions.subject ||
                            !mailOptions.html) {
                            return [2 /*return*/, false];
                        }
                        transporter = nodemailer_1.default.createTransport((0, nodemailer_smtp_transport_1.default)({
                            service: process.env.SMTP_service,
                            port: 587,
                            secure: false,
                            requireTLS: true,
                            host: process.env.SMTP_host,
                            auth: {
                                user: process.env.SMTP_username,
                                pass: process.env.SMTP_password,
                            },
                            tls: {
                                ciphers: "SSLv3",
                            },
                        }));
                        return [4 /*yield*/, transporter.sendMail(mailOptions)];
                    case 1:
                        transporterRes = _b.sent();
                        return [2 /*return*/, transporterRes.response.includes("250") ? true : false];
                }
            });
        }); };
        this.shareLinkPaymentEmailForAmountDue = function (printContents) { return "\n  <html lang=\"en\"><head>\n      <meta charset=\"UTF-8\">\n      <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n      <title>Payment Link</title>\n    </head>\n    <body>\n      <div style=\"padding: 0; margin: 0 auto; width: 100% !important; font-family: Helvetica Neue, Helvetica, Arial, sans-serif\">\n        <table role=\"presentation\" align=\"center\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" bgcolor=\"#F3F2EF\" style=\"background-color: #f3f2ef; table-layout: fixed\">\n          <tbody>\n            <tr>\n              <td align=\"center\" style=\"padding-top: 24px\">\n                <center style=\"width: 100%\">\n                  <table role=\"presentation\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"512\" bgcolor=\"#FFFFFF\" style=\"background-color: #ffffff; margin: 0 auto; max-width: 512px; width: inherit\">\n                    <tbody>\n                      <!-- HEADER -->\n                      <tr>\n                        <td bgcolor=\"#F6F8FA\" style=\"background-color: #f6f8fa; padding: 12px; border-bottom: 1px solid #ececec\">\n                          <table role=\"presentation\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" style=\"width: 100% !important; min-width: 100% !important\">\n                            <tbody>\n                              <tr>\n                                <td valign=\"middle\" width=\"100%\" align=\"left\">\n                                  <p style=\"margin: 0; color: #262626; font-size: 20px; line-height: 1.2; text-align: center\">Payment Link</p>\n                                </td>\n                              </tr>\n                            </tbody>\n                          </table>\n                        </td>\n                      </tr>\n                      <!-- HEADER END -->\n  \n                      <!-- BODY -->\n                      <tr>\n                        <td>\n                          <table role=\"presentation\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n                            <tbody>\n                              <tr>\n                                <td style=\"padding: 20px 24px 10px 24px\">\n                                  <table role=\"presentation\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n                                    <tbody>\n                                      <tr>\n                                        <td style=\"padding-bottom: 20px\">\n                                          <h2 style=\"margin: 0; color: #262626; font-weight: 700; font-size: 20px; line-height: 1.2\">Dear ".concat(printContents.firstName, " ").concat(printContents.lastName, ",</h2>\n                                        </td>\n                                      </tr>\n                                      <tr>\n                                        <td style=\"padding-bottom: 20px\">\n                                          <p style=\"margin: 0; color: #4c4c4c; font-weight: 400; font-size: 16px; line-height: 1.8\">Your due amount is $").concat(printContents.amount, ". Kindly click on below given link to pay.</p>\n                                        </td>\n                                      </tr>\n                                      <tr>\n                                        <td style=\"padding-bottom: 20px\" align=\"center\">\n                                          <!-- PAYMENT LINK BUTTON START -->\n                                          <table border=\"0\" style=\"margin-right: 25px\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\">\n                                            <tbody>\n                                              <tr>\n                                                <td style=\"border: 1px solid #0084bf; border-radius: 2px; overflow: hidden\">\n                                                  <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n                                                    <tbody>\n                                                      <tr>\n                                                        <td height=\"25\" style=\"\n                                                            padding-left: 16px;\n                                                            padding-right: 16px;\n                                                            font-family: Helvetica Neue, Arial, sans-serif;\n                                                            font-size: 14px;\n                                                            text-align: center;\n                                                            color: #0084bf;\n                                                            font-weight: bold;\n                                                            margin-right: 15px;\n                                                          \">\n                                                          <a href=\"").concat(printContents.paymentLink, "\" style=\"text-decoration: none\" target=\"_blank\"><span style=\"display: block; width: 100%; padding-top: 8px; padding-bottom: 8px; color: #0084bf\">Pay Now</span></a>\n                                                        </td>\n                                                      </tr>\n                                                    </tbody>\n                                                  </table>\n                                                </td>\n                                              </tr>\n                                            </tbody>\n                                          </table>\n                                          <!-- PAYMENT LINK BUTTON END -->\n                                        </td>\n                                      </tr>\n                                    </tbody>\n                                  </table>\n                                </td>\n                              </tr>\n                            </tbody>\n                          </table>\n                          <table role=\"presentation\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n                            <tbody>\n                              <tr>\n                                <td bgcolor=\"#F8FAFC\" style=\"background-color: #f8fafc; padding: 16px 0px 16px 24px\">\n                                  <h2 style=\"margin: 0; color: #262626; font-weight: 700; font-size: 14px; line-height: 1.429; margin-bottom: 12px\">For any queries</h2>\n                                  <p style=\"margin: 0; color: #737373; font-size: 12px; line-height: 1.333\"><b>Contact Clinic</b></p>\n                                  <p style=\"margin: 0; color: #737373; font-weight: 400; font-size: 12px; line-height: 1.333; margin-bottom: 12px\"></p>\n                                </td>\n                                <td bgcolor=\"#F8FAFC\" style=\"background-color: #f8fafc; padding: 16px 24px 16px 0px\">\n                                  <h2 style=\"margin: 0; color: #262626; font-weight: 700; font-size: 14px; line-height: 1.429; margin-bottom: 12px\">Download our app</h2>\n                                  <a href=\"https://apps.apple.com/in/app/theratap/id1622748871\" style=\"display: inline-block; text-decoration: none\" target=\"_blank\">\n                                    <img alt=\"Theratap\" border=\"0\" src=\"https://theratap.com:1337/upload/email/apple-logo.png\" height=\"30\" width=\"30\" style=\"outline: none; color: #ffffff; max-width: unset !important; text-decoration: none; padding-right: 15px\"></a>\n                                  <a href=\"https://play.google.com/store/apps/developer?id=The+Schemata+Group+Inc\" style=\"display: inline-block; text-decoration: none\" target=\"_blank\">\n                                    <img alt=\"Theratap\" border=\"0\" src=\"https://theratap.com:1337/upload/email/play-store-logo.png\" height=\"30\" width=\"30\" style=\"outline: none; color: #ffffff; max-width: unset !important; text-decoration: none\"></a>\n                                </td>\n                              </tr>\n                            </tbody>\n                          </table>\n                        </td>\n                      </tr>\n                      <!-- BODY END -->\n  \n                      <!-- FOOTER -->\n                      <tr>\n                        <td>\n                          <table role=\"presentation\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" bgcolor=\"#EDF0F3\" style=\"background-color: #edf0f3; padding: 0 24px; color: #6a6c6d\">\n                            <tbody>\n                              <tr>\n                                <td style=\"padding-top: 15px\">\n                                  <table role=\"presentation\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n                                    <tbody>\n                                      <tr>\n                                        <td style=\"padding: 0 0 12px 0\">\n                                          <p style=\"margin: 0; word-wrap: break-word; color: #6a6c6d; word-break: break-word; font-weight: 400; font-size: 12px; line-height: 1.333\">\n                                            This is a computer generated email do not reply\n                                          </p>\n                                        </td>\n                                        <td align=\"right\" style=\"padding: 0 0 12px 0\">\n                                          <p style=\"margin: 0; word-wrap: break-word; color: #6a6c6d; word-break: break-word; font-weight: 400; font-size: 12px; line-height: 1.333\"><b>Powered By</b></p>\n                                        </td>\n                                      </tr>\n                                      <tr>\n                                        <td style=\"padding: 0 0 12px 0\">\n                                          <p style=\"margin: 0; color: #6a6c6d; font-weight: 400; font-size: 12px; line-height: 1.333\">\u00A9 2022-23 RCM</p>\n                                        </td>\n                                      </tr>\n                                    </tbody>\n                                  </table>\n                                </td>\n  \n                                <td align=\"right\" valign=\"middle\">\n                                  <a href=\"https://theratap.com\" style=\"display: inline-block; text-decoration: none\" target=\"_blank\">\n                                    <img alt=\"Theratap\" border=\"0\" src=\"https://theratap.com:1337/upload/email/logo.png\" height=\"48\" width=\"80\" style=\"outline: none; color: #ffffff; max-width: unset !important; text-decoration: none\"></a>\n                                </td>\n                              </tr>\n                            </tbody>\n                          </table>\n                        </td>\n                      </tr>\n                      <!-- FOOTER END -->\n                    </tbody>\n                  </table>\n                </center>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n  </body></html>\n  "); };
        this.stripePayment = function (stripeObj, stripeKey) {
            var PRIVATE__STRIPE = require("stripe")(stripeKey);
            return PRIVATE__STRIPE.charges
                .create({
                amount: stripeObj.amount * 100,
                description: stripeObj.description ? stripeObj.description : "",
                currency: stripeObj.currency ? stripeObj.currency : "USD",
                source: stripeObj.tokenId,
                metadata: {
                    email: stripeObj.email,
                    name: stripeObj.name,
                },
            })
                .then(function (data) {
                return { status: true, data: data };
            })
                .catch(function (err) {
                return {
                    status: false,
                    type: err.type,
                    message: err.message,
                    error: err,
                };
            });
        };
        // decryptedRecord = (
        //   data: any,
        //   field: any,
        //   callback1: any
        // ) => {
        //   // console.log('here is my data', data)
        //   var newArr: any = [];
        //   var fields = ["_id", "createdAt", "updatedAt"]; //'is_deleted', 'status', '__v'
        //   if (field.length > 0) {
        //     for (var i = 0; i < field.length; i++) {
        //       fields.push(field[i]);
        //     }
        //   }
        //   //console.log("here is my fileds",fields);
        //   if (data instanceof Array) {
        //     async.each(
        //       data,
        //       function (result: any, callback: any) {
        //         var patientObj: any = {};
        //         for (var key in result) {
        //           //console.log("fields.indexOf(key)",fields.indexOf(key),key);
        //           if (fields.indexOf(key) == -1) {
        //             if (result[key]) {
        //               if (result[key] instanceof Array) {
        //                 if (result[key].length > 0) {
        //                   patientObj[key] = [];
        //                   for (
        //                     let j = 0;
        //                     j < result[key].length;
        //                     j++
        //                   ) {
        //                     patientObj[key][j] = {};
        //                     if (
        //                       typeof result[key][j] == "object"
        //                     ) {
        //                       for (var arrObjkey in result[key][
        //                         j
        //                       ]) {
        //                         if (
        //                           fields.indexOf(arrObjkey) == -1
        //                         ) {
        //                           if (result[key][j][arrObjkey]) {
        //                             patientObj[key][j][
        //                               arrObjkey
        //                             ] = getDecryptText(
        //                               result[key][j][
        //                                 arrObjkey
        //                               ].toString()
        //                             );
        //                           }
        //                         } else {
        //                           patientObj[key][j][arrObjkey] =
        //                             result[key][j][arrObjkey];
        //                         }
        //                       }
        //                     } else if (
        //                       typeof result[key][j] == "string"
        //                     ) {
        //                       patientObj[key][j] = getDecryptText(
        //                         result[key][j].toString()
        //                       );
        //                     }
        //                   }
        //                 } else {
        //                   patientObj[key] = result[key];
        //                 }
        //               } else if (typeof result[key] == "object") {
        //                 for (var objkey in result[key]) {
        //                   if (fields.indexOf(objkey) == -1) {
        //                     if (result[key][objkey]) {
        //                       if (
        //                         typeof result[key][objkey] ==
        //                         "object"
        //                       ) {
        //                         for (var arrObjkey1 in result[
        //                           key
        //                         ][objkey]) {
        //                           if (result.length) {
        //                             if (
        //                               fields.indexOf(
        //                                 arrObjkey1
        //                               ) == -1
        //                             ) {
        //                               if (
        //                                 result[key][objkey][
        //                                   arrObjkey1
        //                                 ]
        //                               ) {
        //                                 patientObj[objkey][
        //                                   arrObjkey1
        //                                 ] = getDecryptText(
        //                                   result[key][objkey][
        //                                     arrObjkey1
        //                                   ].toString()
        //                                 );
        //                               }
        //                             } else {
        //                               patientObj[objkey][
        //                                 arrObjkey1
        //                               ] =
        //                                 result[key][objkey][
        //                                   arrObjkey1
        //                                 ];
        //                             }
        //                           } else {
        //                             if (
        //                               fields.indexOf(
        //                                 arrObjkey1
        //                               ) == -1
        //                             ) {
        //                               if (result.objkey) {
        //                                 patientObj.objkey =
        //                                   getDecryptText(
        //                                     result.objkey.toString()
        //                                   );
        //                               }
        //                             } else {
        //                               patientObj.objkey =
        //                                 result.objkey;
        //                             }
        //                           }
        //                         }
        //                       }
        //                       patientObj[objkey] = getDecryptText(
        //                         result[key][objkey].toString()
        //                       );
        //                     }
        //                   } else {
        //                     patientObj[objkey] = result[objkey];
        //                   }
        //                 }
        //               } else {
        //                 patientObj[key] = getDecryptText(
        //                   result[key].toString()
        //                 );
        //               }
        //             }
        //           } else {
        //             patientObj[key] = result[key];
        //           }
        //         }
        //         newArr.push(patientObj);
        //         callback(null);
        //       },
        //       function (err: any) {
        //         callback1(newArr);
        //       }
        //     );
        //   } else {
        //     var patientObj: any = {};
        //     for (var key in data) {
        //       if (fields.indexOf(key) == -1) {
        //         if (data[key]) {
        //           if (data[key] instanceof Array) {
        //             if (data[key].length > 0) {
        //               patientObj[key] = [];
        //               for (let j = 0; j < data[key].length; j++) {
        //                 patientObj[key][j] = {};
        //                 if (typeof data[key][j] == "object") {
        //                   for (var arrObjkey in data[key][j]) {
        //                     if (fields.indexOf(arrObjkey) == -1) {
        //                       if (data[key][j][arrObjkey]) {
        //                         patientObj[key][j][arrObjkey] =
        //                           getDecryptText(
        //                             data[key][j][
        //                               arrObjkey
        //                             ].toString()
        //                           );
        //                       }
        //                     } else {
        //                       patientObj[key][j][arrObjkey] =
        //                         data[key][j][arrObjkey];
        //                     }
        //                   }
        //                 }
        //                 // else if (typeof result[key][j] == 'string') {
        //                 //   patientObj[key][j] = this.getDecryptText(result[key][j].toString())
        //                 // }
        //               }
        //             } else {
        //               patientObj[key] = data[key];
        //             }
        //           } else {
        //             patientObj[key] = getDecryptText(
        //               data[key].toString()
        //             );
        //           }
        //         }
        //       } else {
        //         patientObj[key] = data[key];
        //       }
        //     }
        //     callback1(patientObj);
        //   }
        // };
    }
    //countSpecificDayInMonth----checkday=0 for sunday, 1 for monday so on...
    Utility.prototype.countSpecificDayInMonth = function (year, month, checkday) {
        var day = 1;
        var counter = 0;
        var date = new Date(year, month, day);
        while (date.getMonth() === month) {
            if (date.getDay() === checkday) {
                counter++;
            }
            day++;
            date = new Date(year, month, day);
        }
        return counter;
    };
    Utility.prototype.isValidDate = function (year, month, day) {
        month = month - 1;
        var d = new Date(year, month, day);
        if (d.getFullYear() == year &&
            d.getMonth() == month &&
            d.getDate() == day) {
            return true;
        }
        return false;
    };
    //decode jwt token
    Utility.prototype.decodeToken = function (token) {
        var base64Payload = token.split(".")[1];
        var payload = Buffer.from(base64Payload, "base64");
        return JSON.parse(payload.toString());
    };
    return Utility;
}());
exports.Utility = Utility;
exports.default = new Utility();
