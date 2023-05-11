import { DocumentType } from "@typegoose/typegoose";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { AES, enc } from "crypto-ts";
import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import "reflect-metadata";
import errorMessage from "../common/erros_message";
import roleModel from "../models/roles.model";
import { User } from "../models/user.model";
import { MessageFormatter } from "./message-formatter";
const util = require("util");
const jwtVerifyAsync = util.promisify(jwt.verify);
export class ValidationResult {
  data: any;
  error: any;
}
export interface IAPIResponse {
  status_code: number;
  success: boolean;
  errors?: string[];
  data?: object;
}
export interface IServiceResult {
  status_code: number;
  data: any;
}
export interface IServiceResult1 {
  status_code: number;
  success: boolean;
  data: any;
}

// export interface IPaginationResult {
//   status_code: number;
//   success: boolean;
//   data: any;
//   totalDocs?: number;
//   pageNumber?: number;
//   pageSize?: number;
// }
const getDecryptText = (text: string) => {
  var bytes = AES.decrypt(
    text,

    process.env.CRYPTO_PASSWORD ?? ""
  );

  var plaintext = bytes!.toString(enc!.Utf8) ?? "";

  return plaintext;
};
export class Utility {
  errors = [];
  ValidateAndConvert = async (classToConvert: any, body: string) => {
    const result = new ValidationResult();

    result.data = plainToClass(classToConvert, body);
    await validate(result.data, {
      skipMissingProperties: true,
      excludeExtraneousValues: true,
    }).then((errors) => {
      let errors_temp = MessageFormatter.format(errors);
      result.error = errors_temp;
      return result;
    });
    return result;
  };

  signJWT = (payload: any, expires_in?: string): string => {
    let jwtToken = jwt.sign(payload, process.env.JWT_TOKEN_SECRET || "", {
      issuer: process.env.JWT_TOKEN_ISSUER || "",
      expiresIn: expires_in ?? "20d",
      audience: process.env.JWT_AUDIENCE || "",
    });
    return jwtToken;
  };

  daysInMonth = (month: number, year: number) => {
    // Use 1 for January, 2 for February, etc.
    return new Date(year, month, 0).getDate();
  };

  //countSpecificDayInMonth----checkday=0 for sunday, 1 for monday so on...
  countSpecificDayInMonth(year: number, month: number, checkday: number) {
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
  }

  isValidDate(year: number, month: number, day: number) {
    month = month - 1;
    var d = new Date(year, month, day);
    if (
      d.getFullYear() == year &&
      d.getMonth() == month &&
      d.getDate() == day
    ) {
      return true;
    }
    return false;
  }

  //decode jwt token
  decodeToken(token: string) {
    var base64Payload = token.split(".")[1];
    var payload = Buffer.from(base64Payload, "base64");
    return JSON.parse(payload.toString());
  }

  //check user activation
  isActiveUser =
    () =>
    async (
      req: Request,
      res: Response<IServiceResult1>,
      next: NextFunction
    ) => {
      let user = <DocumentType<User>>req.user;
      console.log(user, "useruser");
      if (user.isActive) {
        next();
      } else
        res.send({
          data: {
            message:
              "Your account is temporarily blocked.Contatct with admin team for activation",
            Error: "On Fecth Error",
          },
          success: false,
          status_code: HttpStatus.OK,
        });
    };

  /** @info middleware to check whether user is hasspecific role  */
  checkRoles =
    (...roles: string[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        let userDetail = <DocumentType<User>>req.user;

        let requiredRoles = [...roles];

        let token: any = req.headers?.authorization?.split(" ")[1];
        if (token) {
          let allRoles = await roleModel.find({});
          var isAutorizedUser: boolean = false;
          let hasRoles: any = [];

          allRoles.forEach((x) => {
            if (x._id.toString() == userDetail?.role?.toString())
              hasRoles.push(x.roleName);
          });

          if (requiredRoles.some((r) => hasRoles.includes(r))) {
            isAutorizedUser = true;
          }
          console.log(isAutorizedUser);
          if (isAutorizedUser) next();
          else
            res.status(HttpStatus.UNAUTHORIZED).send({
              errors: {
                message: errorMessage.NOT_AUTHORIZED_FOR_ACTION,
                error: errorMessage.AUTH_ERROR,
              },

              status_code: HttpStatus.UNAUTHORIZED,
              success: false,
            });
        } else {
          return res.status(HttpStatus.FORBIDDEN).send({
            errors: {
              message: errorMessage.TOKEN_NOT_RECEIVED,
              error: errorMessage.AUTH_ERROR,
            },

            status_code: HttpStatus.FORBIDDEN,
            success: false,
          });
        }
      } catch (error) {
        next(error);
      }
    };

  checkTokenExpiration =
    () => async (req: Request, res: Response, next: NextFunction) => {
      try {
        let userDetail = <DocumentType<User>>req.user;
        let token: any = req.headers?.authorization?.split(" ")[1];
        if (token) {
          let decodedToken = JSON.parse(
            Buffer.from(token.split(".")[1], "base64").toString()
          );

          let currentTime = new Date().getTime() / 1000;
          console.log(decodedToken.exp <= currentTime);

          let isTokenExpired = decodedToken.exp <= currentTime;

          if (isTokenExpired == false) next();
          else
            res.status(HttpStatus.UNAUTHORIZED).send({
              errors: {
                message: errorMessage.TOKEN_EXPIRED,
                error: errorMessage.AUTH_ERROR,
              },

              status_code: HttpStatus.UNAUTHORIZED,
              success: false,
            });
        } else
          res.status(HttpStatus.UNAUTHORIZED).send({
            errors: {
              message: errorMessage.TOKEN_NOT_FOUND,
              error: errorMessage.AUTH_ERROR,
            },

            status_code: HttpStatus.UNAUTHORIZED,
            success: false,
          });
      } catch (error) {
        next(error);
      }
    };

  checkTokenExpiration1 =
    () => async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers?.authorization?.split(" ")[1];
      try {
        let rr = await jwtVerifyAsync(
          token,
          req.app.get(process.env.JWT_TOKEN_SECRET || "")
        );
        console.log(rr, "ll");
      } catch (err) {
        console.log(err, "op");
        throw new Error(err);
      }
      next();
    };

  generateRandomNDigits = (n: number) => {
    return Math.floor(Math.random() * (9 * Math.pow(10, n))) + Math.pow(10, n);
  };

  getEncryptText = (text: string) => {
    let ecryptedText = AES.encrypt(
      text,
      process.env.CRYPTO_PASSWORD ?? "zimo"
    ).toString();
    return ecryptedText;
  };

  getDecryptText = (text: string) => {
    var bytes = AES.decrypt(
      text,

      process.env.CRYPTO_PASSWORD ?? ""
    );

    var plaintext = bytes!.toString(enc!.Utf8) ?? "";

    return plaintext;
  };

  changeDateForClaim = (dateString: string) => {
    let subsDateOfBirthYear = new Date(dateString).getFullYear();
    let subsDateOfBirthMonth: any = new Date(dateString).getMonth() + 1;

    subsDateOfBirthMonth =
      subsDateOfBirthMonth < 10
        ? "0" + `${subsDateOfBirthMonth}`
        : subsDateOfBirthMonth;
    let subsDateOfBirthDate: any = new Date(dateString).getDate();

    subsDateOfBirthDate =
      subsDateOfBirthDate < 10
        ? "0" + `${subsDateOfBirthDate}`
        : subsDateOfBirthDate;
    let subsDateOfBirth: any =
      subsDateOfBirthYear + subsDateOfBirthMonth + subsDateOfBirthDate;

    return subsDateOfBirth;
  };

  replaceCharacter = (text: string, index: number, replacement: string) => {
    return (
      text.substring(0, index) +
      replacement +
      text.substring(index + replacement.length)
    );
  };

  ForgotPasswordEmail = (mailOptions: any, printContents: any) => {
    // 1) Creating HTML content
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>forgot Password Template</title>
</head>

<body style=" margin: 0 auto;
width: 80%;
font-family: sans-serif;">
   
                <div style=" border: 1px solid #bdbaba;
                padding: 15px;
                border-radius: 10px;">
                    
                <img style src="http://74.208.25.43:4004/uploads/company_logo/thumbnail/acbd192b-2d2c-40a4-9996-33451b11e3f0-1653997058191_Zimo logo.png" width="100px" height="60px">
                <hr>
                
                    <h1 style="text-align: center;">Reset your Password</h1>
                    <hr style="height: 0.5px;
                    opacity: 100;
                    width: 47%;
                    margin:10px auto;
                    background-color: #706f6d;
                    border: 1px solid #706f6d;
                    margin-top: -1em;">
                
                <h3 style="text-align: center; margin-bottom: 0.2em; margin-top: 2em;">Hi ${printContents.userName},</h3>
                <p style="letter-spacing: 1.5px;
                line-height: 1.7em; text-align: center;">To reset your Password, Click the button below.</p>

                <div style=" text-align: center; margin-bottom: 2em; margin-top: 2em;">    
                <a href="${printContents.link}" style="text-decoration: none;"><button style="
                font-size: 18px;
               background-color: #ffffff;
               border: 2px solid #198754;
               border-radius: 7px;
               padding:10px 26px;
               font-weight: 600;
               color: #198754;  
               letter-spacing: 1.8px;" type="button" class="btn btn-info ">Reset Your Password</button></a>
                </div>



            <p style="letter-spacing: 1.5px;
            line-height: 1.7em; text-align: center; ">If you do not want to change your password or didn't request  a reset ,you can ignore and delete this email.</p>
              
                <div style="text-align: center; margin-bottom: 2em; margin-top: 1em;" >
                <strong>Thank You!</strong></div>
                </div>
                
            </div>
       
</body>
</html>`;

    // 2) Setting HTML content to the mail options
    mailOptions.html = html;

    // 3) Actually sending the mail
    return this.sendEmail(mailOptions);
  };

  sendEmail = async (mailOptions: any) => {
    if (!mailOptions.from) {
      mailOptions.from = process.env.SMTP_mailUserName ?? "";
    }
    if (
      !mailOptions.from ||
      !mailOptions.to ||
      !mailOptions.subject ||
      !mailOptions.html
    ) {
      return false;
    }

    // Creating transporter
    const transporter = nodemailer.createTransport(
      smtpTransport({
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
      })
    );

    const transporterRes = await transporter.sendMail(mailOptions);

    return transporterRes.response.includes("250") ? true : false;
  };

  shareLinkPaymentEmailForAmountDue = (printContents: any) => `
  <html lang="en"><head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Link</title>
    </head>
    <body>
      <div style="padding: 0; margin: 0 auto; width: 100% !important; font-family: Helvetica Neue, Helvetica, Arial, sans-serif">
        <table role="presentation" align="center" border="0" cellspacing="0" cellpadding="0" width="100%" bgcolor="#F3F2EF" style="background-color: #f3f2ef; table-layout: fixed">
          <tbody>
            <tr>
              <td align="center" style="padding-top: 24px">
                <center style="width: 100%">
                  <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="512" bgcolor="#FFFFFF" style="background-color: #ffffff; margin: 0 auto; max-width: 512px; width: inherit">
                    <tbody>
                      <!-- HEADER -->
                      <tr>
                        <td bgcolor="#F6F8FA" style="background-color: #f6f8fa; padding: 12px; border-bottom: 1px solid #ececec">
                          <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%" style="width: 100% !important; min-width: 100% !important">
                            <tbody>
                              <tr>
                                <td valign="middle" width="100%" align="left">
                                  <p style="margin: 0; color: #262626; font-size: 20px; line-height: 1.2; text-align: center">Payment Link</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <!-- HEADER END -->
  
                      <!-- BODY -->
                      <tr>
                        <td>
                          <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
                            <tbody>
                              <tr>
                                <td style="padding: 20px 24px 10px 24px">
                                  <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
                                    <tbody>
                                      <tr>
                                        <td style="padding-bottom: 20px">
                                          <h2 style="margin: 0; color: #262626; font-weight: 700; font-size: 20px; line-height: 1.2">Dear ${printContents.firstName} ${printContents.lastName},</h2>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style="padding-bottom: 20px">
                                          <p style="margin: 0; color: #4c4c4c; font-weight: 400; font-size: 16px; line-height: 1.8">Your due amount is $${printContents.amount}. Kindly click on below given link to pay.</p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style="padding-bottom: 20px" align="center">
                                          <!-- PAYMENT LINK BUTTON START -->
                                          <table border="0" style="margin-right: 25px" cellpadding="0" cellspacing="0" align="left">
                                            <tbody>
                                              <tr>
                                                <td style="border: 1px solid #0084bf; border-radius: 2px; overflow: hidden">
                                                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tbody>
                                                      <tr>
                                                        <td height="25" style="
                                                            padding-left: 16px;
                                                            padding-right: 16px;
                                                            font-family: Helvetica Neue, Arial, sans-serif;
                                                            font-size: 14px;
                                                            text-align: center;
                                                            color: #0084bf;
                                                            font-weight: bold;
                                                            margin-right: 15px;
                                                          ">
                                                          <a href="${printContents.paymentLink}" style="text-decoration: none" target="_blank"><span style="display: block; width: 100%; padding-top: 8px; padding-bottom: 8px; color: #0084bf">Pay Now</span></a>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <!-- PAYMENT LINK BUTTON END -->
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
                            <tbody>
                              <tr>
                                <td bgcolor="#F8FAFC" style="background-color: #f8fafc; padding: 16px 0px 16px 24px">
                                  <h2 style="margin: 0; color: #262626; font-weight: 700; font-size: 14px; line-height: 1.429; margin-bottom: 12px">For any queries</h2>
                                  <p style="margin: 0; color: #737373; font-size: 12px; line-height: 1.333"><b>Contact Clinic</b></p>
                                  <p style="margin: 0; color: #737373; font-weight: 400; font-size: 12px; line-height: 1.333; margin-bottom: 12px"></p>
                                </td>
                                <td bgcolor="#F8FAFC" style="background-color: #f8fafc; padding: 16px 24px 16px 0px">
                                  <h2 style="margin: 0; color: #262626; font-weight: 700; font-size: 14px; line-height: 1.429; margin-bottom: 12px">Download our app</h2>
                                  <a href="https://apps.apple.com/in/app/theratap/id1622748871" style="display: inline-block; text-decoration: none" target="_blank">
                                    <img alt="Theratap" border="0" src="https://theratap.com:1337/upload/email/apple-logo.png" height="30" width="30" style="outline: none; color: #ffffff; max-width: unset !important; text-decoration: none; padding-right: 15px"></a>
                                  <a href="https://play.google.com/store/apps/developer?id=The+Schemata+Group+Inc" style="display: inline-block; text-decoration: none" target="_blank">
                                    <img alt="Theratap" border="0" src="https://theratap.com:1337/upload/email/play-store-logo.png" height="30" width="30" style="outline: none; color: #ffffff; max-width: unset !important; text-decoration: none"></a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <!-- BODY END -->
  
                      <!-- FOOTER -->
                      <tr>
                        <td>
                          <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%" bgcolor="#EDF0F3" style="background-color: #edf0f3; padding: 0 24px; color: #6a6c6d">
                            <tbody>
                              <tr>
                                <td style="padding-top: 15px">
                                  <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
                                    <tbody>
                                      <tr>
                                        <td style="padding: 0 0 12px 0">
                                          <p style="margin: 0; word-wrap: break-word; color: #6a6c6d; word-break: break-word; font-weight: 400; font-size: 12px; line-height: 1.333">
                                            This is a computer generated email do not reply
                                          </p>
                                        </td>
                                        <td align="right" style="padding: 0 0 12px 0">
                                          <p style="margin: 0; word-wrap: break-word; color: #6a6c6d; word-break: break-word; font-weight: 400; font-size: 12px; line-height: 1.333"><b>Powered By</b></p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style="padding: 0 0 12px 0">
                                          <p style="margin: 0; color: #6a6c6d; font-weight: 400; font-size: 12px; line-height: 1.333">© 2022-23 RCM</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
  
                                <td align="right" valign="middle">
                                  <a href="https://theratap.com" style="display: inline-block; text-decoration: none" target="_blank">
                                    <img alt="Theratap" border="0" src="https://theratap.com:1337/upload/email/logo.png" height="48" width="80" style="outline: none; color: #ffffff; max-width: unset !important; text-decoration: none"></a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <!-- FOOTER END -->
                    </tbody>
                  </table>
                </center>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  </body></html>
  `;

  stripePayment = (stripeObj: any, stripeKey: string) => {
    const PRIVATE__STRIPE = require("stripe")(stripeKey);

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
      .then((data: any) => {
        return { status: true, data };
      })
      .catch((err: any) => {
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

export default new Utility();
