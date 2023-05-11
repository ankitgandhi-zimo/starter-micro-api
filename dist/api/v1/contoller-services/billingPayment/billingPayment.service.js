"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var lodash_1 = __importDefault(require("lodash"));
var moment_1 = __importDefault(require("moment"));
var mongoose_1 = __importDefault(require("mongoose"));
var path_1 = __importDefault(require("path"));
var uuid_1 = require("uuid");
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var erros_message_1 = __importDefault(require("../../common/erros_message"));
var appointment_model_1 = __importDefault(require("../../models/appointment.model"));
var billing_payment_model_1 = __importStar(require("../../models/billing_payment.model"));
var momentTimeZone = require("moment-timezone");
var billing_post_payment_model_1 = __importStar(require("../../models/billing_post_payment.model"));
var cards_model_1 = __importDefault(require("../../models/cards.model"));
var claim_response_model_1 = __importDefault(require("../../models/claim_response.model"));
var history_model_1 = __importStar(require("../../models/history.model"));
var insurance_model_1 = __importDefault(require("../../models/insurance/insurance.model"));
var patient_model_1 = __importDefault(require("../../models/patient.model"));
var payment_gateway_model_1 = __importDefault(require("../../models/payment_gateway.model"));
var super_bill_model_1 = __importDefault(require("../../models/super_bill.model"));
var cards_service_1 = __importDefault(require("../cards/cards.service"));
var sendGridMailer = require("@sendgrid/mail").setApiKey(process.env.sendGrid_API_KEY), _a = require("pdf-lib"), PDFDocument = _a.PDFDocument, createPDFAcroFields = _a.createPDFAcroFields, PDFName = _a.PDFName;
var BillingPaymentServices = /** @class */ (function () {
    function BillingPaymentServices() {
        var _this = this;
        this.receivePayment = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails_1, createdby_id, cvc, mode, email, cheque, amount, remark, nowTime, card_id, saveCard, exp_year, exp_month, clinic_id, cardNumber, patient_id, receiveDate, appointment_id, cardHolderName, paymentObj, clinicStripeDetails, PUBLIC__STRIPE, PRIVATE__STRIPE, patientData, _a, patientEmail, cardModel_1, cardChargeResponse, tokenData, firstName, lastName, email_1, card, client_ip, stripeObj, paymentData, patientCardsCount, tokenData_1, customerAdd, insertObj, addCard, previousCheckCondition, checkPreviousSentLink, paymentObj_1, paymentData, productObj, product, price, 
            //   resetKey = Utility.uuid.v1() + "1",
            resetKey, redirectUrl, paymentLink, updateObj, printContents, paymentLinkEmailsToBeSend, printContents, paymentLinkEmailsToBeSend, sendMessage, error_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 32, , 33]);
                        userDetails_1 = req.user;
                        createdby_id = userDetails_1._id;
                        cvc = model.cvc, mode = model.mode, email = model.email, cheque = model.cheque, amount = model.amount, remark = model.remark, nowTime = model.nowTime, card_id = model.card_id, saveCard = model.saveCard, exp_year = model.exp_year, exp_month = model.exp_month, clinic_id = model.clinic_id, cardNumber = model.cardNumber, patient_id = model.patient_id, receiveDate = model.receiveDate, appointment_id = model.appointment_id, cardHolderName = model.cardHolderName;
                        paymentObj = {
                            mode: mode,
                            remark: remark,
                            amount: amount,
                            clinic_id: clinic_id,
                            patient_id: patient_id,
                            createdby_id: createdby_id,
                            appointment_id: appointment_id,
                            method: "ADVANCE",
                            batchNumber: Date.now(),
                        };
                        return [4 /*yield*/, payment_gateway_model_1.default.findOne({
                                clinic_id: model.clinic_id,
                            })];
                    case 1:
                        clinicStripeDetails = _b.sent();
                        if (!clinicStripeDetails)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_STRIPE_PAYMENT_GATEWAY_ACCESS,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        PUBLIC__STRIPE = require("stripe")(clinicStripeDetails.public_key);
                        PRIVATE__STRIPE = require("stripe")(clinicStripeDetails.secret_key);
                        return [4 /*yield*/, patient_model_1.default.aggregate([
                                {
                                    $match: {
                                        _id: new mongoose_1.default.Types.ObjectId(patient_id.toString()),
                                    },
                                },
                            ])];
                    case 2:
                        patientData = _b.sent();
                        _a = mode;
                        switch (_a) {
                            case billing_payment_model_1.EBillingModeValues.CASH: return [3 /*break*/, 3];
                            case billing_payment_model_1.EBillingModeValues.CARD: return [3 /*break*/, 5];
                            case billing_payment_model_1.EBillingModeValues.LINK: return [3 /*break*/, 22];
                        }
                        return [3 /*break*/, 31];
                    case 3:
                        paymentObj.status = "RECEIVED";
                        paymentObj.receiveDate = receiveDate;
                        // return res.json({ code: 401, message: constants.messages.underDevelopment, paymentObj })
                        return [4 /*yield*/, billing_payment_model_1.default.create(paymentObj)];
                    case 4:
                        // return res.json({ code: 401, message: constants.messages.underDevelopment, paymentObj })
                        _b.sent();
                        return [2 /*return*/, {
                                success: true,
                                data: erros_message_1.default.appointmentMsg.paymentReceivedOnly(amount),
                                status_code: http_status_codes_1.default.OK,
                            }];
                    case 5:
                        if (!card_id) return [3 /*break*/, 8];
                        patientEmail = patientData[0].email
                            ? common_methods_1.default.getDecryptText(patientData[0].email)
                            : "";
                        cardModel_1 = {
                            amount: parseFloat(amount),
                            card_id: card_id,
                            email: patientEmail,
                            patient_id: patient_id,
                        };
                        return [4 /*yield*/, cards_service_1.default.chargeByPatientCards(req, cardModel_1, next)];
                    case 6:
                        cardChargeResponse = _b.sent();
                        // cardChargeResponse.data &&
                        //   (paymentObj.chargeId =
                        //     cardChargeResponse.data.id);
                        if (cardChargeResponse &&
                            cardChargeResponse.status_code == 200 &&
                            cardChargeResponse.data) {
                            paymentObj.status = "RECEIVED";
                            paymentObj.receiveDate = nowTime;
                            paymentObj.chargeId = cardChargeResponse.data.id;
                        }
                        else
                            paymentObj.status = "FAILED";
                        return [4 /*yield*/, billing_payment_model_1.default.create(paymentObj)];
                    case 7:
                        _b.sent();
                        return [2 /*return*/, {
                                success: true,
                                data: erros_message_1.default.appointmentMsg.paymentReceivedOnly(amount),
                                status_code: http_status_codes_1.default.OK,
                            }];
                    case 8: return [4 /*yield*/, PUBLIC__STRIPE.tokens.create({
                            card: {
                                number: cardNumber,
                                exp_month: exp_month,
                                exp_year: exp_year,
                                cvc: cvc,
                            },
                        })];
                    case 9:
                        tokenData = _b.sent();
                        if (!(tokenData && !("error" in tokenData))) return [3 /*break*/, 20];
                        firstName = patientData[0].first_name
                            ? common_methods_1.default.getDecryptText(patientData[0].first_name)
                            : "", lastName = patientData[0].last_name
                            ? common_methods_1.default.getDecryptText(patientData[0].last_name)
                            : "", email_1 = patientData[0].email
                            ? common_methods_1.default.getDecryptText(patientData[0].email)
                            : "", card = tokenData.card, client_ip = tokenData.client_ip, stripeObj = {
                            amount: amount,
                            tokenId: tokenData.id,
                            email: email_1,
                            name: firstName + " " + lastName,
                        };
                        // await query.stripePayment(stripeObj);
                        return [4 /*yield*/, common_methods_1.default.stripePayment(stripeObj, clinicStripeDetails.secret_key)];
                    case 10:
                        paymentData = 
                        // await query.stripePayment(stripeObj);
                        _b.sent();
                        // const paymentData: any = {};
                        paymentData.data && (paymentObj.chargeId = paymentData.data.id);
                        paymentObj.remark = paymentData.message;
                        if (paymentData.status == true && paymentData.data) {
                            paymentObj.status = "RECEIVED";
                            paymentObj.receiveDate = nowTime;
                        }
                        else
                            paymentObj.status = "FAILED";
                        return [4 /*yield*/, billing_payment_model_1.default.create(paymentObj)];
                    case 11:
                        _b.sent();
                        if (!paymentData.status || !paymentData.data)
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.subscriptionMsg.paymentDataErr,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                    status_code: erros_message_1.default.paymentFail,
                                }];
                        if (!(saveCard == true)) return [3 /*break*/, 18];
                        return [4 /*yield*/, cards_model_1.default.countDocuments({
                                patient_id: new mongoose_1.default.Types.ObjectId(patient_id.toString()),
                                clinic_id: new mongoose_1.default.Types.ObjectId(clinic_id.toString()),
                            })];
                    case 12:
                        patientCardsCount = _b.sent();
                        if (patientCardsCount &&
                            patientCardsCount >= erros_message_1.default.cardMsg.limit)
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: "".concat(erros_message_1.default.appointmentMsg.paymentReceivedOnly(amount) +
                                            ". but ," +
                                            erros_message_1.default.cardMsg.limitExceed(erros_message_1.default.cardMsg.limit)),
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                }];
                        return [4 /*yield*/, PUBLIC__STRIPE.tokens.create({
                                card: {
                                    number: cardNumber,
                                    exp_month: exp_month,
                                    exp_year: exp_year,
                                    cvc: cvc,
                                },
                            })];
                    case 13:
                        tokenData_1 = _b.sent();
                        if (!tokenData_1) return [3 /*break*/, 16];
                        return [4 /*yield*/, PRIVATE__STRIPE.customers.create({
                                source: tokenData_1.id,
                                name: patient_id,
                            })];
                    case 14:
                        customerAdd = _b.sent();
                        insertObj = {
                            client_ip: client_ip,
                            clinic_id: clinic_id,
                            patient_id: patient_id,
                            createdby_id: createdby_id,
                            cardId: card.id,
                            token: customerAdd.id,
                        };
                        return [4 /*yield*/, cards_model_1.default.create(insertObj)];
                    case 15:
                        addCard = _b.sent();
                        return [2 /*return*/, {
                                success: true,
                                data: erros_message_1.default.appointmentMsg.paymentReceivedOnly(amount),
                                status_code: http_status_codes_1.default.OK,
                            }];
                    case 16:
                        if (tokenData_1.error.type &&
                            tokenData_1.error.type.includes("Stripe"))
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: tokenData_1.error.raw.message,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                }];
                        else
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.INTERNAL_SERVER_ERROR,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.INTERNAL_SERVER_ERROR,
                                }];
                        _b.label = 17;
                    case 17: return [3 /*break*/, 19];
                    case 18: return [2 /*return*/, {
                            success: true,
                            data: erros_message_1.default.appointmentMsg.paymentReceivedOnly(amount),
                            status_code: http_status_codes_1.default.OK,
                        }];
                    case 19: return [3 /*break*/, 21];
                    case 20:
                        if (tokenData.error.type &&
                            tokenData.error.type.includes("Stripe"))
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: tokenData.error.raw.message,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                }];
                        else
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.INTERNAL_SERVER_ERROR,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.INTERNAL_SERVER_ERROR,
                                }];
                        _b.label = 21;
                    case 21: return [3 /*break*/, 31];
                    case 22:
                        previousCheckCondition = {
                            patient_id: new mongoose_1.default.Types.ObjectId(patient_id.toString()),
                            clinic_id: new mongoose_1.default.Types.ObjectId(clinic_id.toString()),
                            amount: parseInt(amount),
                            status: { $in: ["EXPECTED"] },
                        };
                        return [4 /*yield*/, billing_payment_model_1.default.aggregate([
                                { $match: previousCheckCondition },
                                { $sort: { createdAt: -1 } },
                            ])];
                    case 23:
                        checkPreviousSentLink = _b.sent();
                        if (!(!checkPreviousSentLink.length ||
                            (checkPreviousSentLink.length && !checkPreviousSentLink[0].link.url))) return [3 /*break*/, 29];
                        paymentObj_1 = {
                            mode: mode,
                            method: "FULL",
                            amount: amount,
                            status: "EXPECTED",
                            clinic_id: new mongoose_1.default.Types.ObjectId(clinic_id.toString()),
                            patient_id: new mongoose_1.default.Types.ObjectId(patient_id.toString()),
                            createdby_id: new mongoose_1.default.Types.ObjectId(createdby_id),
                            email: email
                                ? email
                                : common_methods_1.default.getDecryptText(patientData[0].email),
                        };
                        return [4 /*yield*/, billing_payment_model_1.default.create(paymentObj_1)];
                    case 24:
                        paymentData = _b.sent();
                        if (!paymentData)
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: "".concat(erros_message_1.default.SomeThingWentWrong, " Try again later"),
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                }];
                        productObj = {
                            name: "Due Payment ".concat((0, moment_1.default)(nowTime).format("YYYY-MM-DD"), " - ").concat(patientData[0].patientId),
                            metadata: {
                                id: paymentData._id.toString(),
                            },
                        };
                        return [4 /*yield*/, PRIVATE__STRIPE.products.create(productObj)];
                    case 25:
                        product = _b.sent();
                        return [4 /*yield*/, PRIVATE__STRIPE.prices.create({
                                unit_amount: parseFloat(amount) * 100,
                                currency: "usd",
                                product: product.id,
                            })];
                    case 26:
                        price = _b.sent(), resetKey = (0, uuid_1.v4)(), redirectUrl = 
                        // config.baseUrl +
                        "http://192.168.1.114:3000/" +
                            "payment-success/".concat(resetKey, "/").concat(clinic_id, "/").concat(paymentData._id.toString(), "/").concat(patient_id, "/DUE");
                        return [4 /*yield*/, PRIVATE__STRIPE.paymentLinks.create({
                                line_items: [{ price: price.id, quantity: 1 }],
                                after_completion: {
                                    type: "redirect",
                                    redirect: { url: redirectUrl },
                                },
                            })];
                    case 27:
                        paymentLink = _b.sent();
                        updateObj = {
                            link: {
                                url: paymentLink.url,
                                id: paymentLink.id,
                                resetKey: resetKey,
                            },
                        };
                        return [4 /*yield*/, billing_payment_model_1.default.updateOne({ _id: paymentData._id }, updateObj)];
                    case 28:
                        _b.sent();
                        printContents = {
                            amount: amount,
                            paymentLink: paymentLink.url,
                            lastName: patientData[0].last_name
                                ? common_methods_1.default.getDecryptText(patientData[0].last_name)
                                : "",
                            firstName: patientData[0].first_name
                                ? common_methods_1.default.getDecryptText(patientData[0].first_name)
                                : "",
                        };
                        paymentLinkEmailsToBeSend = [];
                        paymentLinkEmailsToBeSend.push({
                            to: email ? email : common_methods_1.default.getDecryptText(patientData[0].email),
                            from: "Payment link <".concat(process.env.SMTP_ClientEmail, ">"),
                            subject: erros_message_1.default.mailSubject.shareLinkPayment,
                            html: common_methods_1.default.shareLinkPaymentEmailForAmountDue(printContents),
                        });
                        sendGridMailer
                            .send(paymentLinkEmailsToBeSend)
                            .then(function () { return __awaiter(_this, void 0, void 0, function () {
                            var addHistory;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, history_model_1.default.create({
                                            user_id: userDetails_1._id,
                                            description: "Billing Payment added successfully",
                                            type: history_model_1.EHistoryActivityTypeValues.PAYMENT,
                                            type_id: userDetails_1._id,
                                        })];
                                    case 1:
                                        addHistory = _a.sent();
                                        return [2 /*return*/, {
                                                success: true,
                                                data: erros_message_1.default.billingMsg.successLinkSend,
                                                status_code: http_status_codes_1.default.OK,
                                            }];
                                }
                            });
                        }); })
                            .catch(function (error) {
                            return {
                                success: false,
                                data: {
                                    message: erros_message_1.default.billingMsg.emailSentError,
                                    error: erros_message_1.default.ON_ADD_ERROR,
                                },
                                status_code: http_status_codes_1.default.UNAUTHORIZED,
                            };
                        });
                        return [3 /*break*/, 31];
                    case 29:
                        printContents = {
                            amount: checkPreviousSentLink[0].amount,
                            paymentLink: checkPreviousSentLink[0].link.url,
                            lastName: patientData[0].last_name
                                ? common_methods_1.default.getDecryptText(patientData[0].last_name)
                                : "",
                            firstName: patientData[0].first_name
                                ? common_methods_1.default.getDecryptText(patientData[0].first_name)
                                : "",
                        };
                        paymentLinkEmailsToBeSend = [];
                        paymentLinkEmailsToBeSend.push({
                            to: email ? email : common_methods_1.default.getDecryptText(patientData[0].email),
                            from: "Payment link <".concat(process.env.sendGrid_ClientEmail, ">"),
                            subject: erros_message_1.default.mailSubject.shareLinkPayment,
                            html: common_methods_1.default.shareLinkPaymentEmailForAmountDue(printContents),
                        });
                        return [4 /*yield*/, sendGridMailer.send(paymentLinkEmailsToBeSend)];
                    case 30:
                        sendMessage = _b.sent();
                        console.log(JSON.stringify(sendMessage), "sendMessage");
                        // .then(() => {
                        if (sendMessage)
                            return [2 /*return*/, {
                                    success: true,
                                    data: erros_message_1.default.billingMsg.successLinkSend,
                                    status_code: http_status_codes_1.default.OK,
                                }];
                        // })
                        // .catch((error: any) => {
                        // console.log(error);
                        else
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.billingMsg.emailSentError,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                }];
                        _b.label = 31;
                    case 31: return [3 /*break*/, 33];
                    case 32:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3 /*break*/, 33];
                    case 33: return [2 /*return*/];
                }
            });
        }); };
        this.disablePaymentLink = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, _a, clinic_id, patient_id, payment_id, condition, updateObj, updateStatus, clinicStripeDetails, PRIVATE__STRIPE, paymentLink, addHistory, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        userDetails = req.user;
                        _a = req.body, clinic_id = _a.clinic_id, patient_id = _a.patient_id, payment_id = _a.payment_id;
                        condition = {
                            _id: payment_id,
                            patient_id: patient_id,
                            clinic_id: clinic_id,
                        };
                        updateObj = {};
                        updateObj["link.url"] = null;
                        updateObj["link.resetKey"] = null;
                        return [4 /*yield*/, billing_payment_model_1.default.findOneAndUpdate(condition, updateObj)];
                    case 1:
                        updateStatus = _b.sent();
                        if (!updateStatus)
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.billingMsg.paymentNotfound,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        if (!updateStatus.link.url)
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.billingMsg.alreadylinkDisabledSucc,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        return [4 /*yield*/, payment_gateway_model_1.default.findOne({
                                clinic_id: model.clinic_id,
                            })];
                    case 2:
                        clinicStripeDetails = _b.sent();
                        if (!clinicStripeDetails)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_STRIPE_PAYMENT_GATEWAY_ACCESS,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        PRIVATE__STRIPE = require("stripe")(clinicStripeDetails.secret_key);
                        return [4 /*yield*/, PRIVATE__STRIPE.paymentLinks.update(updateStatus.link.id, { active: false })];
                    case 3:
                        paymentLink = _b.sent();
                        if (!paymentLink) return [3 /*break*/, 5];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "Payment link disabled successfully",
                                type: history_model_1.EHistoryActivityTypeValues.PAYMENT,
                                type_id: userDetails._id,
                            })];
                    case 4:
                        addHistory = _b.sent();
                        return [2 /*return*/, {
                                success: true,
                                data: erros_message_1.default.billingMsg.linkDisabledSucc,
                                status_code: http_status_codes_1.default.OK,
                            }];
                    case 5: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.INTERNAL_SERVER_ERROR,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_2 = _b.sent();
                        next(error_2);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.updateDuePayment = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, foundPaymentDoc, modelToSave, updatePaymentDetails, addHistory, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        userDetails = req.user;
                        return [4 /*yield*/, billing_payment_model_1.default.findOne({
                                _id: model._id,
                            })];
                    case 1:
                        foundPaymentDoc = _a.sent();
                        if (!!foundPaymentDoc) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                data: {
                                    message: erros_message_1.default.billingMsg.paymentDetailsNotFound,
                                    error: erros_message_1.default.ON_UPDATE_ERROR,
                                },
                            }];
                    case 2:
                        if (foundPaymentDoc.status != billing_payment_model_1.EBillingStatusValues.DUE)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.billingMsg.onlyDuePaymentUpdated,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                }];
                        modelToSave = model;
                        return [4 /*yield*/, billing_payment_model_1.default.updateOne({ _id: foundPaymentDoc._id }, modelToSave)];
                    case 3:
                        updatePaymentDetails = _a.sent();
                        if (!(updatePaymentDetails && updatePaymentDetails.modifiedCount > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "Payment  details under status due updated successfully",
                                type: history_model_1.EHistoryActivityTypeValues.PAYMENT,
                                type_id: userDetails._id,
                            })];
                    case 4:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.billingMsg.paymentDetailsUpdated,
                            }];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        // post payment section
        this.addPostPayment = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, createdby_id, checkout_id, clinic_id, copay, allowed_amount, insurance_paid, secondary_balance_due, appointment_id, patient_id, deductible, adjustment, co_insurance, due_amount, superbill_id, superBillDetails, charge_amount, insertObj, billingPaymentObj, addBillingPaymentEntry, data, addHistory, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        userDetails = req.user;
                        createdby_id = userDetails._id;
                        checkout_id = model.checkout_id, clinic_id = model.clinic_id, copay = model.copay, allowed_amount = model.allowed_amount, insurance_paid = model.insurance_paid, secondary_balance_due = model.secondary_balance_due, appointment_id = model.appointment_id, patient_id = model.patient_id, deductible = model.deductible, adjustment = model.adjustment, co_insurance = model.co_insurance, due_amount = model.due_amount, superbill_id = model.superbill_id;
                        return [4 /*yield*/, super_bill_model_1.default.findById(model.superbill_id)];
                    case 1:
                        superBillDetails = _a.sent();
                        if (!superBillDetails)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.Not_FOUND_CHARGE_AMOUNT,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        charge_amount = superBillDetails.total_amount;
                        insertObj = {
                            copay: copay,
                            allowed_amount: allowed_amount,
                            insurance_paid: insurance_paid,
                            secondary_balance_due: secondary_balance_due,
                            clinic_id: clinic_id,
                            patient_id: patient_id,
                            appointment_id: appointment_id,
                            createdby_id: createdby_id,
                            checkout_id: checkout_id,
                            deductible: deductible,
                            adjustment: adjustment,
                            co_insurance: co_insurance,
                            due_amount: due_amount,
                            status: billing_post_payment_model_1.EPostBillingStatusValues.POSTED,
                            charge_amount: charge_amount,
                            superbill_id: superbill_id,
                        };
                        if (!(model.due_amount && model.due_amount > 0)) return [3 /*break*/, 3];
                        billingPaymentObj = {
                            patient_id: patient_id,
                            appointment_id: appointment_id,
                            clinic_id: clinic_id,
                            status: billing_payment_model_1.EBillingStatusValues.DUE,
                            mode: billing_payment_model_1.EBillingModeValues.CASH,
                            createdby_id: createdby_id,
                            amount: due_amount,
                        };
                        return [4 /*yield*/, billing_payment_model_1.default.create(billingPaymentObj)];
                    case 2:
                        addBillingPaymentEntry = _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, billing_post_payment_model_1.default.create(insertObj)];
                    case 4:
                        data = _a.sent();
                        if (!data) return [3 /*break*/, 6];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "Post Payment details added successfully",
                                type: history_model_1.EHistoryActivityTypeValues.PAYMENT,
                                type_id: userDetails._id,
                            })];
                    case 5:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                data: erros_message_1.default.UPDATE_SUCCESSFULL,
                                status_code: http_status_codes_1.default.OK,
                            }];
                    case 6: return [2 /*return*/, {
                            success: false,
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            data: erros_message_1.default.billingMsg.errorOccuredMakePayment,
                        }];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.getPostPaymentDetails = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var populatedFeilds, postPaymentDetailResult, patientDoc, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        populatedFeilds = [
                            {
                                path: "clinic_id",
                                select: { clinic_name: 1, clinic_type: 1 },
                            },
                            {
                                path: "patient_id",
                                select: { first_name: 1, last_name: 1 },
                            },
                            {
                                path: "appointment_id",
                                select: {},
                            },
                        ];
                        return [4 /*yield*/, billing_post_payment_model_1.default.findById(model._id).populate(populatedFeilds)];
                    case 1:
                        postPaymentDetailResult = _a.sent();
                        if (postPaymentDetailResult && postPaymentDetailResult.patient_id) {
                            patientDoc = (postPaymentDetailResult.patient_id);
                            patientDoc.first_name = common_methods_1.default.getDecryptText(patientDoc.first_name);
                            patientDoc.last_name = common_methods_1.default.getDecryptText(patientDoc.last_name);
                        }
                        if (postPaymentDetailResult) {
                            return [2 /*return*/, {
                                    success: true,
                                    data: postPaymentDetailResult,
                                    status_code: http_status_codes_1.default.OK,
                                }];
                        }
                        else
                            return [2 /*return*/, {
                                    success: false,
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    data: erros_message_1.default.billingMsg.PostPaymentNotFound,
                                }];
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getPostPaymentList = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var populatedFeilds, condition, postPaymentDetailResult, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        populatedFeilds = [
                            {
                                path: "clinic_id",
                                select: { clinic_name: 1, clinic_type: 1 },
                            },
                            {
                                path: "patient_id",
                                select: { first_name: 1, last_name: 1 },
                            },
                            {
                                path: "appointment_id",
                                select: {},
                            },
                        ];
                        condition = {
                            appointment_id: model.appointment_id,
                            patient_id: model.patient_id,
                        };
                        return [4 /*yield*/, billing_post_payment_model_1.default.find(condition).populate(populatedFeilds)];
                    case 1:
                        postPaymentDetailResult = _a.sent();
                        if (postPaymentDetailResult && postPaymentDetailResult.length > 0) {
                            postPaymentDetailResult.forEach(function (obj) {
                                if (obj.patient_id) {
                                    var patientDoc = obj.patient_id;
                                    patientDoc.first_name = common_methods_1.default.getDecryptText(patientDoc.first_name);
                                    patientDoc.last_name = common_methods_1.default.getDecryptText(patientDoc.last_name);
                                }
                            });
                            if (postPaymentDetailResult) {
                                return [2 /*return*/, {
                                        success: true,
                                        data: postPaymentDetailResult,
                                        status_code: http_status_codes_1.default.OK,
                                    }];
                            }
                        }
                        else
                            return [2 /*return*/, {
                                    success: false,
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    data: erros_message_1.default.billingMsg.PostPaymentListNotFound,
                                }];
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        next(error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updatePostPayment = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, modelToSave, foundPostPaymentDetails, billingPaymentObj, addBillingPaymentEntry, updationResult, addHistory, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        userDetails = req.user;
                        modelToSave = model;
                        return [4 /*yield*/, billing_post_payment_model_1.default.findById(model._id)];
                    case 1:
                        foundPostPaymentDetails = _a.sent();
                        if (!foundPostPaymentDetails)
                            return [2 /*return*/, {
                                    success: false,
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    data: {
                                        message: erros_message_1.default.billingMsg.PostPaymentNotFound,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                }];
                        modelToSave.appointment_id = foundPostPaymentDetails.appointment_id;
                        modelToSave.patient_id = foundPostPaymentDetails.patient_id;
                        modelToSave.checkout_id = foundPostPaymentDetails.checkout_id;
                        modelToSave.clinic_id = foundPostPaymentDetails.clinic_id;
                        modelToSave.charge_amount = foundPostPaymentDetails.charge_amount;
                        modelToSave.createdby_id = foundPostPaymentDetails.createdby_id;
                        if (!(model.status === billing_post_payment_model_1.EPostBillingStatusValues.PUBLISHED)) return [3 /*break*/, 3];
                        billingPaymentObj = {
                            patient_id: foundPostPaymentDetails.patient_id,
                            appointment_id: foundPostPaymentDetails.appointment_id,
                            clinic_id: foundPostPaymentDetails.clinic_id,
                            status: billing_payment_model_1.EBillingStatusValues.DUE,
                            mode: billing_payment_model_1.EBillingModeValues.CASH,
                            createdby_id: foundPostPaymentDetails.createdby_id,
                            amount: model.due_amount
                                ? model.due_amount
                                : foundPostPaymentDetails.due_amount,
                        };
                        return [4 /*yield*/, billing_payment_model_1.default.create(billingPaymentObj)];
                    case 2:
                        addBillingPaymentEntry = _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, billing_post_payment_model_1.default.updateOne({ _id: model._id }, modelToSave)];
                    case 4:
                        updationResult = _a.sent();
                        if (!(updationResult && updationResult.modifiedCount > 0)) return [3 /*break*/, 6];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "Post Payment details updated successfully",
                                type: history_model_1.EHistoryActivityTypeValues.PAYMENT,
                                type_id: userDetails._id,
                            })];
                    case 5:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                data: erros_message_1.default.UPDATE_SUCCESSFULL,
                                status_code: http_status_codes_1.default.OK,
                            }];
                    case 6: return [2 /*return*/, {
                            success: false,
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            data: erros_message_1.default.billingMsg.errorOccuredUpdatePostPayment,
                        }];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_7 = _a.sent();
                        next(error_7);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.getSuperBillListForPostPayment = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, foundSuperBillList, condition, apptCondition, startTime, endTime, startTime, endTime, findAppointmentList, allApptIds_1, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        userDetails = req.user;
                        foundSuperBillList = void 0;
                        condition = {};
                        if (model.patient_id)
                            condition.patient_id = model.patient_id;
                        if (!(model.startDateTime || model.endDateTime || model.appt_number)) return [3 /*break*/, 3];
                        apptCondition = {};
                        if (model.appt_number)
                            apptCondition.appointment_number = model.appt_number;
                        if (model.startDateTime) {
                            startTime = new Date(model.startDateTime);
                            startTime.setHours(0, 0, 0, 0);
                            endTime = new Date(model.startDateTime);
                            endTime.setHours(23, 59, 59, 999);
                            apptCondition.startDateTime = {
                                $gte: startTime,
                                $lte: endTime,
                            };
                        }
                        if (model.endDateTime) {
                            startTime = new Date(model.endDateTime);
                            startTime.setHours(0, 0, 0, 0);
                            endTime = new Date(model.endDateTime);
                            endTime.setHours(23, 59, 59, 999);
                            apptCondition.endDateTime = {
                                $gte: startTime,
                                $lte: endTime,
                            };
                        }
                        if (model.patient_id) {
                            apptCondition.patient_id = model.patient_id;
                        }
                        return [4 /*yield*/, appointment_model_1.default.find(apptCondition)];
                    case 1:
                        findAppointmentList = _a.sent();
                        allApptIds_1 = [];
                        findAppointmentList.forEach(function (x) {
                            allApptIds_1.push(x._id.toString());
                        });
                        return [4 /*yield*/, super_bill_model_1.default.find({
                                appointment_id: { $in: allApptIds_1 },
                            })];
                    case 2:
                        foundSuperBillList = _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, super_bill_model_1.default.find(condition)];
                    case 4:
                        foundSuperBillList = _a.sent();
                        if (!model.claim_id) return [3 /*break*/, 6];
                        return [4 /*yield*/, claim_response_model_1.default.find({
                                _id: model.claim_id,
                            }, { _id: 0, superBillId: 1 }).populate({
                                path: "superBillId",
                            })];
                    case 5:
                        foundSuperBillList = _a.sent();
                        foundSuperBillList = lodash_1.default.map(foundSuperBillList, lodash_1.default.property(["superBillId"]));
                        _a.label = 6;
                    case 6:
                        if (foundSuperBillList && foundSuperBillList.length > 0) {
                            return [2 /*return*/, {
                                    success: true,
                                    data: foundSuperBillList,
                                    status_code: http_status_codes_1.default.OK,
                                }];
                        }
                        else
                            return [2 /*return*/, {
                                    success: false,
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    data: {
                                        message: erros_message_1.default.SUPER_BILL_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 8];
                    case 7:
                        error_8 = _a.sent();
                        next(error_8);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.makeCMS1500Form = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, createdby_id, clinic_id, appointment_id, condition, data, dataForCMS1500_1, preferedMobileNumber, preferedMobileAreaCode, encrytedText, formPdfBytes, pdfDoc, form_1, insurance_name, insurance_address, insurance_address2, insurance_city_state_zip, insurance_id, pt_name, patient_dob_split, 
            // birth_mm = moment(dataForCMS1500.patientData.date_of_birth).format(
            //   "MM"
            // ),
            // birth_dd = moment(dataForCMS1500.patientData.date_of_birth).format(
            //   "DD"
            // ),
            // birth_yy = moment(dataForCMS1500.patientData.date_of_birth).format(
            //   "YY"
            // ),
            birth_mm, birth_dd, birth_yy, ins_name, pt_zip, pt_city, pt_state, pt_phone, pt_street, pt_AreaCode, ins_zip, ins_city, ins_state, ins_phone, ins_street, 
            // ins_phone_area = dataForCMS1500.insuranceData.mobile_no.substring(
            //   0,
            //   3
            // ),
            ins_phone_area, 
            //preferedMobileNumber, preferedMobileAreaCode;
            ins_dob_split, ins_dob_mm, ins_dob_dd, ins_dob_yy, 
            // ins_dob_mm = moment(
            //   dataForCMS1500.insuranceData.date_of_birth
            // ).format("MM"),
            // ins_dob_dd = moment(
            //   dataForCMS1500.insuranceData.date_of_birth
            // ).format("DD"),
            // ins_dob_yy = moment(
            //   dataForCMS1500.insuranceData.date_of_birth
            // ).format("YY"),
            pt_date, amt_paid, _a, a, b, t_charge, physician_signature, doc_name, clinic_name, 
            // clinic_location =
            //   dataForCMS1500.clinicData.city && dataForCMS1500.clinicData.state
            //     ? `${
            //         dataForCMS1500.clinicData.city
            //           ? dataForCMS1500.clinicData.city
            //           : ""
            //       }, ${
            //         dataForCMS1500.clinicData.state
            //           ? dataForCMS1500.clinicData.state
            //           : ""
            //       } ${
            //         dataForCMS1500.clinicData.postal_code
            //           ? dataForCMS1500.clinicData.postal_code
            //           : ""
            //       }`
            //     : "",
            // clinic_street = dataForCMS1500.clinicData.address
            //   ? dataForCMS1500.clinicData.address
            //   : "",
            // clinic_npi = dataForCMS1500.clinicData.npiNo
            //   ? dataForCMS1500.clinicData.npiNo
            //   : "",
            location_phone_area, location_phone, physician_date, fac_street, fac_name, fac_location, doc_street, doc_location, pin1, doc_phone_area, doc_phone, pin, tax_id, pt_account, medicaid_resub, original_ref, pt_signature, ins_signature, additional_claim_info, rendering_provider_taxonomy, _b, fm_1, fd_1, fy_1, _c, tm_1, td_1, ty_1, upperLineBillingProvider, lowerLineRenderingProvider, rendering_taxonomy, billing_taxonomy, insuranceType_box, insuranceType_value, i, checkBox, assignment_box, assignment_value, i, checkBox, subscriber_gender_box, subscriber_gender_value, i, checkBox, ssn_box, rel_to_ins_box, rel_to_ins_value, i, checkBox, patient_gender_box, patient_gender_value, i, checkBox, employment_box, i, other_accident_box, i, pt_auto_accident_box, i, pdfBytes, getGender, stirngAfterClaim, cptArray_1, pointer_string_arr_1, modifiedcpt_1, subscriberGender, icdCodes_1, relationshipEDI, NM1_85_line, NM1_82_line, 
            // providerStateCode = dataForCMS1500.doctorData.state.toUpperCase(),
            // providerAddress = dataForCMS1500.doctorData.address.toUpperCase(),
            locationZipCode, locationStateCode, locationAddress, locationCity, providerFN, providerLN, providerCity, subscriberPayerId, ediDataObject, ediString, error_9;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 8, , 9]);
                        userDetails = req.user;
                        createdby_id = userDetails._id;
                        clinic_id = model.clinic_id, appointment_id = model.appointment_id;
                        condition = {
                            clinic_id: new mongoose_1.default.Types.ObjectId(clinic_id.toString()),
                            appointment_id: new mongoose_1.default.Types.ObjectId(appointment_id.toString()),
                            // _id: new mongoose.Types.ObjectId(checkout_id!.toString()),
                        };
                        return [4 /*yield*/, super_bill_model_1.default.aggregate([
                                { $match: condition },
                                {
                                    $lookup: {
                                        from: "appointment",
                                        let: { appointment_id: "$appointment_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$_id", "$$appointment_id"],
                                                    },
                                                },
                                            },
                                        ],
                                        as: "appointmentData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$appointmentData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "clinic_locations",
                                        let: {
                                            location_id: "$appointmentData.location_id",
                                        },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$_id", "$$location_id"],
                                                    },
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "states",
                                                    let: { state_id: "$state" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $eq: ["$_id", "$$state_id"],
                                                                },
                                                            },
                                                        },
                                                        { $project: { stateCode: 1 } },
                                                    ],
                                                    as: "stateData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$stateData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $project: {
                                                    city: 1,
                                                    fed_id: 1,
                                                    branchName: 1,
                                                    address: 1,
                                                    taxonomy: 1,
                                                    npiNo: 1,
                                                    mobile_other: 1,
                                                    postal_code: 1,
                                                    state: "$stateData.stateCode",
                                                },
                                            },
                                        ],
                                        as: "locationData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$locationData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "patients",
                                        let: { patient_id: "$patient_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$_id", "$$patient_id"],
                                                    },
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "states",
                                                    let: { state_id: "$state" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $eq: ["$_id", "$$state_id"],
                                                                },
                                                            },
                                                        },
                                                        { $project: { stateCode: 1 } },
                                                    ],
                                                    as: "stateData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$stateData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $project: {
                                                    city: 1,
                                                    gender: 1,
                                                    address: 1,
                                                    contact: 1,
                                                    last_name: 1,
                                                    first_name: 1,
                                                    patientId: 1,
                                                    SSN: 1,
                                                    // patientId: 1,
                                                    middle_name: 1,
                                                    postal_code: 1,
                                                    date_of_birth: 1,
                                                    responsible_person: 1,
                                                    state: "$stateData.stateCode",
                                                },
                                            },
                                        ],
                                        as: "patientData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$patientData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "doctor",
                                        localField: "billing_provider_id",
                                        foreignField: "_id",
                                        pipeline: [
                                            {
                                                $lookup: {
                                                    from: "users",
                                                    localField: "user_id",
                                                    foreignField: "_id",
                                                    pipeline: [
                                                        {
                                                            $project: {
                                                                first_name: 1,
                                                                last_name: 1,
                                                            },
                                                        },
                                                    ],
                                                    as: "userData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$userData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "states",
                                                    let: { state_id: "$state" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $eq: ["$_id", "$$state_id"],
                                                                },
                                                            },
                                                        },
                                                        { $project: { stateCode: 1 } },
                                                    ],
                                                    as: "stateData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$stateData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $project: {
                                                    first_name: "$userData.first_name",
                                                    last_name: "$userData.last_name",
                                                    npiNo: 1,
                                                    taxonomy: 1,
                                                    stateCode: "$stateData.stateCode",
                                                    address: 1,
                                                    //mobile_home: 1,
                                                    city: 1,
                                                    postal_code: 1,
                                                },
                                            },
                                        ],
                                        as: "billingProviderData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$billingProviderData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "doctor",
                                        localField: "rendering_provider_id",
                                        foreignField: "_id",
                                        pipeline: [
                                            {
                                                $lookup: {
                                                    from: "users",
                                                    localField: "user_id",
                                                    foreignField: "_id",
                                                    pipeline: [
                                                        {
                                                            $project: {
                                                                first_name: 1,
                                                                last_name: 1,
                                                            },
                                                        },
                                                    ],
                                                    as: "userData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$userData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "states",
                                                    let: { state_id: "$state" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $eq: ["$_id", "$$state_id"],
                                                                },
                                                            },
                                                        },
                                                        { $project: { stateCode: 1 } },
                                                    ],
                                                    as: "stateData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$stateData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $project: {
                                                    first_name: "$userData.first_name",
                                                    last_name: "$userData.last_name",
                                                    npiNo: 1,
                                                    taxonomy: 1,
                                                    stateCode: "$stateData.stateCode",
                                                    address: 1,
                                                    //mobile_home: 1,
                                                    city: 1,
                                                    postal_code: 1,
                                                },
                                            },
                                        ],
                                        as: "renderingProviderData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$renderingProviderData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "doctor",
                                        let: { doctor_id: "$referring_provider_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$_id", "$$doctor_id"],
                                                    },
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "states",
                                                    let: { state_id: "$state" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $eq: ["$_id", "$$state_id"],
                                                                },
                                                            },
                                                        },
                                                        { $project: { stateCode: 1 } },
                                                    ],
                                                    as: "stateData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$stateData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $project: {
                                                    npiNo: 1,
                                                    user_id: 1,
                                                    address: 1,
                                                    //taxonomy: { $ifNull: ["$taxonomy", ""] },
                                                    //mobile_home: 1,
                                                    city: 1,
                                                    stateCode: "$stateData.stateCode",
                                                    postal_code: 1,
                                                },
                                            },
                                        ],
                                        as: "doctorCollectionData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$doctorCollectionData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "users",
                                        let: {
                                            user_id: "$doctorCollectionData.user_id",
                                            npiNo: "$doctorCollectionData.npiNo",
                                            city: "$doctorCollectionData.city",
                                            stateCode: "$doctorCollectionData.stateCode",
                                            postal_code: "$doctorCollectionData.postal_code",
                                            address: "$doctorCollectionData.address",
                                            //taxonomy: "$doctorCollectionData.taxonomy",
                                            //mobile_home: "$doctorCollectionData.mobile_home",
                                        },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: { $eq: ["$_id", "$$user_id"] },
                                                },
                                            },
                                            {
                                                $project: {
                                                    first_name: 1,
                                                    last_name: 1,
                                                    mobile_no: 1,
                                                    image: 1,
                                                    npiNo: "$$npiNo",
                                                    address: "$$address",
                                                    city: "$$city",
                                                    //mobile_no: 1,
                                                    //mobile_home: "$$mobile_home",
                                                    //state: "$stateData.stateCode",
                                                    state: "$$stateCode",
                                                    postal_code: "$$postal_code",
                                                    // city: 1,
                                                },
                                            },
                                        ],
                                        as: "doctorData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$doctorData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "insurance",
                                        let: {
                                            //patient_id: "$patient_id",
                                            insurance_id: "$insurance_id",
                                            //coverage: "$insurance.coverage",
                                        },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $and: [
                                                            {
                                                                $eq: ["$_id", "$$insurance_id"],
                                                            },
                                                            // {
                                                            //   $eq: ["$coverage", "$$coverage"],
                                                            // },
                                                        ],
                                                    },
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "insurance_companies",
                                                    localField: "insurance_company_id",
                                                    foreignField: "_id",
                                                    pipeline: [
                                                        {
                                                            $project: {
                                                                companyName: 1,
                                                            },
                                                        },
                                                    ],
                                                    as: "insuranceCompanyData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$insuranceCompanyData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "eap",
                                                    localField: "patient_id",
                                                    foreignField: "patient_id",
                                                    pipeline: [
                                                        {
                                                            $project: {
                                                                authNumber: 1,
                                                            },
                                                        },
                                                    ],
                                                    as: "eapData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$eapData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "states",
                                                    let: { state_id: "$insurance_state" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $eq: ["$_id", "$$state_id"],
                                                                },
                                                            },
                                                        },
                                                        //{ $project: { stateCode: 1 } },
                                                    ],
                                                    as: "stateData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$stateData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            //{ $project: { codes: 0, stateData: 1 } },
                                        ],
                                        as: "insuranceData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$insuranceData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "icts",
                                        let: { code_id: "$icd" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: { $in: ["$_id", "$$code_id"] },
                                                },
                                            },
                                            { $project: { ictCode: 1 } },
                                        ],
                                        as: "ICD_10",
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "cpt",
                                        let: { code_id: "$cpt.cpt_code_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: { $in: ["$_id", "$$code_id"] },
                                                },
                                            },
                                            { $project: { cptCode: 1, price: 1 } },
                                        ],
                                        as: "cptCodeData",
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "clinic",
                                        localField: "clinic_id",
                                        foreignField: "_id",
                                        pipeline: [
                                            {
                                                $project: {
                                                    clinic_name: 1,
                                                    mobile_no: 1,
                                                },
                                            },
                                        ],
                                        as: "clinicData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$clinicData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "super_bill_other_detail",
                                        localField: "_id",
                                        foreignField: "super_bill_id",
                                        pipeline: [
                                            {
                                                $project: {
                                                    additional_cliam_info: 1,
                                                    original_ref_no: 1,
                                                    resubmission_no: 1,
                                                },
                                            },
                                        ],
                                        as: "superBillOtherDetail",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$superBillOtherDetail",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                //superBillOtherDetail
                                {
                                    $lookup: {
                                        from: "modifiers",
                                        localField: "cpt.modifier",
                                        foreignField: "_id",
                                        pipeline: [
                                            {
                                                $project: {
                                                    modifierCode: 1,
                                                    description: 1,
                                                },
                                            },
                                        ],
                                        as: "modifierData",
                                    },
                                },
                                {
                                    $project: {
                                        _id: 0,
                                        paper: 1,
                                        ICD_10: 1,
                                        doctorData: 1,
                                        cptCodeData: 1,
                                        patientData: 1,
                                        locationData: 1,
                                        orignalRefNo: 1,
                                        typeOfService: 1,
                                        insuranceData: 1,
                                        place_of_service: 1,
                                        // typeOfService: 1,
                                        placeOfService: 1,
                                        // appointment_id: 1,
                                        accept_assignment: 1,
                                        resubmissionCode: 1,
                                        // acceptAssignment: 1,
                                        checkout_id: "$_id",
                                        financialClass_id: 1,
                                        checkoutTime: "$checkoutTime",
                                        //appliedCptCodes: "$codes.cptCode",
                                        appliedCptCodes: "$cpt",
                                        appointment_id: "$appointment_id",
                                        //insurancePortion: "$insurance.amount",
                                        insurancePortion: "$total_amount",
                                        endDateTime: "$appointmentData.endDateTime",
                                        checkInTime: "$appointmentData.startDateTime",
                                        startDateTime: "$appointmentData.startDateTime",
                                        appointment_number: "$appointmentData.appointment_number",
                                        billingProviderData: 1,
                                        renderingProviderData: 1,
                                        clinicData: 1,
                                        modifierData: 1,
                                        additional_cliam_info: "$superBillOtherDetail.additional_cliam_info",
                                        original_ref_no: "$superBillOtherDetail.original_ref_no",
                                        resubmission_no: "$superBillOtherDetail.resubmission_no",
                                    },
                                },
                            ])];
                    case 1:
                        data = _d.sent();
                        if (!data.length) return [3 /*break*/, 6];
                        dataForCMS1500_1 = data[0];
                        if (!dataForCMS1500_1.ICD_10.length)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.appointmentMsg.checkoutCodeReq,
                                    },
                                }];
                        dataForCMS1500_1.patientData.SSN = dataForCMS1500_1.patientData.SSN
                            ? dataForCMS1500_1.patientData.SSN
                            : "";
                        dataForCMS1500_1.patientData.city = dataForCMS1500_1.patientData.city
                            ? dataForCMS1500_1.patientData.city.toUpperCase()
                            : "";
                        dataForCMS1500_1.patientData.gender = dataForCMS1500_1.patientData.gender
                            ? dataForCMS1500_1.patientData.gender.toUpperCase()
                            : "";
                        dataForCMS1500_1.patientData.address = dataForCMS1500_1.patientData.address
                            ? dataForCMS1500_1.patientData.address.toUpperCase()
                            : "";
                        dataForCMS1500_1.patientData.last_name = dataForCMS1500_1.patientData
                            .last_name
                            ? common_methods_1.default.getDecryptText(dataForCMS1500_1.patientData.last_name)
                            : "";
                        dataForCMS1500_1.patientData.first_name = dataForCMS1500_1.patientData
                            .first_name
                            ? common_methods_1.default.getDecryptText(dataForCMS1500_1.patientData.first_name)
                            : "";
                        dataForCMS1500_1.patientData.middle_name = dataForCMS1500_1.patientData
                            .middle_name
                            ? common_methods_1.default.getDecryptText(dataForCMS1500_1.patientData.middle_name)
                            : "";
                        dataForCMS1500_1.patientData.postal_code = dataForCMS1500_1.patientData
                            .postal_code
                            ? dataForCMS1500_1.patientData.postal_code
                            : "";
                        preferedMobileNumber = "", preferedMobileAreaCode = "";
                        if (dataForCMS1500_1.patientData.contact.prefered.mobileNo) {
                            encrytedText = dataForCMS1500_1.patientData.contact.prefered.mobileNo;
                            preferedMobileNumber = "".concat(encrytedText.substring(3, 6), "-").concat(encrytedText.substring(6));
                            preferedMobileAreaCode = encrytedText.substring(0, 3);
                        }
                        console.log(__dirname + "/healthform", "  __dirname");
                        formPdfBytes = fs_1.default.readFileSync(path_1.default.join(__dirname, "../../../../../healthform", "form-cms1500.pdf"));
                        return [4 /*yield*/, PDFDocument.load(formPdfBytes)];
                    case 2:
                        pdfDoc = _d.sent(), form_1 = pdfDoc.getForm();
                        if (!dataForCMS1500_1.patientData)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NOT_FOUND,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                }];
                        if (!dataForCMS1500_1.insuranceData)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.insuranceMsg.notFound,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                }];
                        insurance_name = dataForCMS1500_1.insuranceData.insuranceCompanyData.companyName.toUpperCase(), insurance_address = dataForCMS1500_1.insuranceData.insurance_address.toUpperCase(), insurance_address2 = "", insurance_city_state_zip = "".concat(dataForCMS1500_1.insuranceData.insurance_city.toUpperCase(), ", ").concat(dataForCMS1500_1.insuranceData.stateData.stateCode.toUpperCase(), " ").concat(dataForCMS1500_1.insuranceData.insurance_zip_code.toUpperCase()), insurance_id = dataForCMS1500_1.insuranceData.subscriber_id, pt_name = "".concat(dataForCMS1500_1.patientData.last_name, ",").concat(dataForCMS1500_1.patientData.first_name), patient_dob_split = dataForCMS1500_1.patientData.date_of_birth.split("/"), birth_mm = patient_dob_split[0], birth_dd = patient_dob_split[1], birth_yy = patient_dob_split[2], ins_name = "".concat(dataForCMS1500_1.insuranceData.subscriber_last_name.toUpperCase(), ",").concat(dataForCMS1500_1.insuranceData.subscriber_first_name.toUpperCase()), pt_zip = dataForCMS1500_1.patientData.postal_code, pt_city = dataForCMS1500_1.patientData.city.toUpperCase(), pt_state = dataForCMS1500_1.patientData.state.toUpperCase(), pt_phone = preferedMobileNumber, pt_street = dataForCMS1500_1.patientData.address.toUpperCase(), pt_AreaCode = preferedMobileAreaCode, ins_zip = dataForCMS1500_1.insuranceData.subscriber_zip_code.toUpperCase(), ins_city = dataForCMS1500_1.insuranceData.subscriber_city.toUpperCase(), ins_state = dataForCMS1500_1.insuranceData.stateData.stateCode.toUpperCase(), ins_phone = preferedMobileNumber, ins_street = dataForCMS1500_1.insuranceData.subscriber_address.toUpperCase(), ins_phone_area = preferedMobileAreaCode, ins_dob_split = dataForCMS1500_1.insuranceData.date_of_birth.split("/"), ins_dob_mm = ins_dob_split[0], ins_dob_dd = ins_dob_split[1], ins_dob_yy = ins_dob_split[2], pt_date = (0, moment_1.default)(new Date()).format("MM-DD-YY"), amt_paid = "00  00", _a = dataForCMS1500_1.insurancePortion
                            .toFixed(2)
                            .toString()
                            .split("."), a = _a[0], b = _a[1], t_charge = a + "  " + b, physician_signature = dataForCMS1500_1.renderingProviderData.first_name +
                            " " +
                            dataForCMS1500_1.renderingProviderData.last_name, doc_name = dataForCMS1500_1.billingProviderData.last_name +
                            " " +
                            dataForCMS1500_1.billingProviderData.first_name, clinic_name = dataForCMS1500_1.clinicData.clinic_name, location_phone_area = dataForCMS1500_1.locationData.mobile_other
                            ? dataForCMS1500_1.locationData.mobile_other.substr(0, 3)
                            : "", location_phone = dataForCMS1500_1.locationData.mobile_other
                            ? dataForCMS1500_1.locationData.mobile_other.substr(3, 9)
                            : "", physician_date = pt_date, fac_street = dataForCMS1500_1.locationData.address, fac_name = dataForCMS1500_1.locationData.branchName, fac_location = "".concat(dataForCMS1500_1.locationData.city, ", ").concat(dataForCMS1500_1.locationData.state, " ").concat(dataForCMS1500_1.locationData.postal_code), doc_street = dataForCMS1500_1.billingProviderData.address, doc_location = "".concat(dataForCMS1500_1.billingProviderData.city, ", ").concat(dataForCMS1500_1.billingProviderData.stateCode, " ").concat(dataForCMS1500_1.billingProviderData.postal_code), pin1 = dataForCMS1500_1.doctorData.npiNo, doc_phone_area = dataForCMS1500_1.billingProviderData.mobile_no
                            ? dataForCMS1500_1.billingProviderData.mobile_no
                                .toString()
                                .substr(0, 3)
                            : "", doc_phone = dataForCMS1500_1.billingProviderData.mobile_no
                            ? dataForCMS1500_1.billingProviderData.mobile_no
                                .toString()
                                .substr(3, 9)
                            : "", pin = dataForCMS1500_1.locationData.npiNo, tax_id = dataForCMS1500_1.locationData.fed_id, pt_account = dataForCMS1500_1.patientData.patientId, medicaid_resub = dataForCMS1500_1.resubmission_no
                            ? dataForCMS1500_1.resubmission_no
                            : 1, original_ref = dataForCMS1500_1.original_ref_no
                            ? dataForCMS1500_1.original_ref_no
                            : "", pt_signature = "Signature on file", ins_signature = "Signature on file", additional_claim_info = dataForCMS1500_1.additional_cliam_info
                            ? dataForCMS1500_1.additional_cliam_info
                            : "";
                        //pt_signature = `${dataForCMS1500.patientData.first_name} ${dataForCMS1500.patientData.last_name}`,
                        //ins_signature = `${dataForCMS1500.insuranceData.subscriber_first_name} ${dataForCMS1500.insuranceData.subscriber_last_name}`;
                        // console.log(
                        //   "dataForCMS1500.doctorData  ",
                        //   dataForCMS1500.doctorData.mobile_no.toString().substr(3, 9)
                        // );
                        // const fields = form.getFields();
                        // fields.forEach((field: any) => {
                        //   const type = field.constructor.name;
                        //   const name = field.getName();
                        //   //console.log(name, type);
                        //   if (type == "PDFTextField") {
                        //     console.log(name, type);
                        //     form.getTextField(name).setText(name.substring(0, 2));
                        //   }
                        // });
                        form_1.getTextField("insurance_name").setText(insurance_name);
                        form_1.getTextField("insurance_address").setText(insurance_address);
                        form_1.getTextField("insurance_address2").setText(insurance_address2);
                        form_1
                            .getTextField("insurance_city_state_zip")
                            .setText(insurance_city_state_zip);
                        form_1.getTextField("insurance_id").setText(insurance_id);
                        form_1.getTextField("pt_name").setText(pt_name);
                        form_1.getTextField("birth_mm").setText(birth_mm);
                        form_1.getTextField("birth_dd").setText(birth_dd);
                        form_1.getTextField("birth_yy").setText(birth_yy);
                        form_1.getTextField("ins_name").setText(ins_name);
                        form_1.getTextField("pt_zip").setText(pt_zip);
                        form_1.getTextField("pt_city").setText(pt_city);
                        form_1.getTextField("pt_state").setText(pt_state);
                        form_1.getTextField("pt_phone").setText(pt_phone);
                        form_1.getTextField("pt_street").setText(pt_street);
                        form_1.getTextField("pt_AreaCode").setText(pt_AreaCode);
                        form_1.getTextField("ins_zip").setText(ins_zip);
                        form_1.getTextField("ins_city").setText(ins_city);
                        form_1.getTextField("ins_state").setText(ins_state);
                        form_1.getTextField("ins_phone").setText(ins_phone);
                        form_1.getTextField("ins_street").setText(ins_street);
                        form_1.getTextField("ins_phone area").setText(ins_phone_area);
                        form_1.getTextField("ins_dob_mm").setText(ins_dob_mm);
                        form_1.getTextField("ins_dob_dd").setText(ins_dob_dd);
                        form_1.getTextField("ins_dob_yy").setText(ins_dob_yy);
                        form_1.getTextField("ins_plan_name").setText(insurance_name);
                        form_1.getTextField("pt_signature").setText(pt_signature);
                        form_1.getTextField("ins_signature").setText(ins_signature);
                        form_1.getTextField("pt_date").setText(pt_date);
                        form_1.getTextField("96").setText(additional_claim_info); //additional claim info
                        //refering fields 17
                        form_1.getTextField("85").setText("DN");
                        form_1
                            .getTextField("ref_physician")
                            .setText(dataForCMS1500_1.doctorData.first_name.toUpperCase() +
                            " " +
                            dataForCMS1500_1.doctorData.last_name.toUpperCase());
                        form_1
                            .getTextField("id_physician")
                            .setText(dataForCMS1500_1.doctorData.npiNo.toUpperCase());
                        rendering_provider_taxonomy = "taxonomy" in dataForCMS1500_1.locationData
                            ? dataForCMS1500_1.locationData.taxonomy.toUpperCase()
                            : "";
                        if (rendering_provider_taxonomy != "") {
                            form_1.getTextField("physician number 17a1").setText("ZZ");
                            form_1
                                .getTextField("physician number 17a")
                                .setText(rendering_provider_taxonomy);
                        }
                        ////////////////////
                        // form.getTextField("grp").setText("12123423432");
                        // form.getTextField("Suppl").setText("32234234334");
                        // form.getTextField("ch1").setText("ch");
                        // form.getTextField("local1a").setText("loc");
                        //form.getTextField("276").setText("loc");
                        // form.getTextField("245").setText("loc");
                        // form.getTextField("223").setText("223");
                        // form.getTextField("201").setText("201");
                        // form.getTextField("179").setText("179");
                        // form.getTextField("157").setText("157");
                        // form.getTextField("135").setText("135");
                        dataForCMS1500_1.ICD_10.forEach(function (el, i) {
                            return form_1
                                .getTextField("diagnosis" + (i + 1))
                                .setText(el.ictCode.replace(".", ""));
                        });
                        _b = (0, moment_1.default)(dataForCMS1500_1.startDateTime)
                            .format("MM-DD-YY")
                            .split("-"), fm_1 = _b[0], fd_1 = _b[1], fy_1 = _b[2], _c = (0, moment_1.default)(dataForCMS1500_1.endDateTime)
                            .format("MM-DD-YY")
                            .split("-"), tm_1 = _c[0], td_1 = _c[1], ty_1 = _c[2];
                        upperLineBillingProvider = "";
                        lowerLineRenderingProvider = "";
                        dataForCMS1500_1.appliedCptCodes.forEach(function (el, i) {
                            i = (i + 1).toString();
                            var fromMonth = "sv" + i + "_mm_from", fromDate = "sv" + i + "_dd_from", fromYear = "sv" + i + "_yy_from", toMonth = "sv" + i + "_mm_end", toDate = "sv" + i + "_dd_end", toYear = "sv" + i + "_yy_end", placeOfService = "place" + i, 
                            //placeOfService = dataForCMS1500.place_of_service,
                            pointer = "diag" + i, cptCode = "cpt" + i, local = "local" + i, charge = "ch" + i, unit = "day" + i;
                            //emg = "emg" + i;
                            //modifier = "mod" + i + "a";
                            el.modifier.forEach(function (m, j) {
                                //m.toString();
                                var foundModifier = dataForCMS1500_1.modifierData.find(function (o) { return o._id.toString() == m.toString(); });
                                if (j < 3) {
                                    if (j == 0)
                                        form_1
                                            .getTextField("mod" + i + "a")
                                            .setText(foundModifier.modifierCode);
                                    if (j == 1)
                                        form_1
                                            .getTextField("mod" + i + "b")
                                            .setText(foundModifier.modifierCode);
                                    if (j == 2)
                                        form_1
                                            .getTextField("mod" + i + "c")
                                            .setText(foundModifier.modifierCode);
                                }
                            });
                            form_1.getTextField(fromMonth).setText(fm_1);
                            form_1.getTextField(fromDate).setText(fd_1);
                            form_1.getTextField(fromYear).setText(fy_1);
                            form_1.getTextField(toMonth).setText(tm_1);
                            form_1.getTextField(toDate).setText(td_1);
                            form_1.getTextField(toYear).setText(ty_1);
                            //form.getTextField(modifier).setText("95");
                            form_1
                                .getTextField(placeOfService)
                                .setText(dataForCMS1500_1.place_of_service
                                ? dataForCMS1500_1.place_of_service
                                : placeOfService);
                            var cptCodeEl = dataForCMS1500_1.cptCodeData.filter(function (el1) { return el1._id.toString() == el.cpt_code_id.toString(); })[0];
                            el.cptCodeEl = cptCodeEl;
                            var pointerValue = "";
                            form_1.getTextField(cptCode).setText(cptCodeEl.cptCode);
                            // dataForCMS1500.ICD_10.forEach((data, i) => {
                            //   console.log(data, "_________", i, JSON.stringify(el.icd));
                            //   el.icd.includes(i) &&
                            //     (pointerValue += String.fromCharCode(i + 1 + 64));
                            // });
                            el.icd.forEach(function (data, i) {
                                pointerValue += String.fromCharCode(data + 1 + 64);
                            });
                            form_1.getTextField(pointer).setText(pointerValue);
                            var _a = (cptCodeEl.price * el.unit)
                                .toFixed(2)
                                .toString()
                                .split("."), a = _a[0], b = _a[1], chargeString = a + "  " + b;
                            form_1.getTextField(charge).setText(chargeString);
                            form_1.getTextField(unit).setText(el.unit.toString());
                            form_1
                                .getTextField(local)
                                .setText(dataForCMS1500_1.renderingProviderData.npiNo.toUpperCase());
                            // form.getTextField('local1a').setText('1N')
                        });
                        //CHECKING IF INSURANCE TYPE IS MEDICAD
                        if (dataForCMS1500_1.insuranceData.insurance_plan_type == "MC" &&
                            (dataForCMS1500_1.insuranceData.coverage == "Primary" ||
                                dataForCMS1500_1.insuranceData.coverage == "Secondary")) {
                            rendering_taxonomy = "taxonomy" in dataForCMS1500_1.locationData
                                ? dataForCMS1500_1.locationData.taxonomy
                                : "";
                            billing_taxonomy = "ZZ";
                            billing_taxonomy +=
                                "taxonomy" in dataForCMS1500_1.locationData
                                    ? dataForCMS1500_1.locationData.taxonomy
                                    : "";
                            form_1.getTextField("grp").setText(billing_taxonomy);
                            form_1.getTextField("emg1").setText("ZZ");
                            form_1.getTextField("local1a").setText(rendering_taxonomy);
                            upperLineBillingProvider = "PRV*BI*PXC*".concat("taxonomy" in dataForCMS1500_1.locationData
                                ? dataForCMS1500_1.locationData.taxonomy
                                : "", "~");
                            lowerLineRenderingProvider = "PRV*PE*PXC*".concat("taxonomy" in dataForCMS1500_1.locationData
                                ? dataForCMS1500_1.locationData.taxonomy
                                : "", "~");
                            // form.getTextField("local1").setText("a");
                            // form.getTextField("local2a").setText("v");
                            // form.getTextField("local2").setText("c");
                            // form.getTextField("local3a").setText("d");
                            // form.getTextField("local4a").setText("e");
                            // form.getTextField("local3").setText("f");
                            // form.getTextField("local5a").setText("g");
                            // form.getTextField("local5").setText("h");
                            // form.getTextField("local6a").setText("u");
                            // form.getTextField("local6").setText("k");
                        }
                        form_1.getTextField("tax_id").setText(tax_id);
                        form_1.getTextField("pt_account").setText(pt_account);
                        form_1.getTextField("amt_paid").setText(amt_paid);
                        form_1.getTextField("t_charge").setText(t_charge);
                        form_1.getTextField("physician_signature").setText(physician_signature);
                        form_1.getTextField("physician_date").setText(physician_date);
                        form_1.getTextField("fac_street").setText(fac_street);
                        form_1.getTextField("fac_location").setText(fac_location);
                        form_1
                            .getTextField("pin1")
                            .setText(dataForCMS1500_1.renderingProviderData.npiNo.toUpperCase());
                        // form.getTextField('doc_phone area').setText('2Z')
                        // form.getTextField('doc_phone').setText('4P')
                        form_1.getTextField("doc_street").setText(fac_street);
                        form_1.getTextField("doc_location").setText(fac_location);
                        form_1.getTextField("pin").setText(pin);
                        //form.getTextField("pin").setText(pin);
                        form_1.getTextField("original_ref").setText(original_ref);
                        form_1.getTextField("doc_name").setText(clinic_name);
                        form_1.getTextField("fac_name").setText(fac_name);
                        form_1
                            .getTextField("doc_phone area")
                            .setText(location_phone_area.toString());
                        form_1.getTextField("doc_phone").setText(location_phone.toString());
                        form_1.getTextField("99icd").setText("0");
                        if (medicaid_resub != 1 || medicaid_resub != "1") {
                            form_1.getTextField("medicaid_resub").setText(medicaid_resub);
                            if (dataForCMS1500_1.insuranceData.eapData &&
                                "authNumber" in dataForCMS1500_1.insuranceData.eapData) {
                                form_1
                                    .getTextField("prior_auth")
                                    .setText(dataForCMS1500_1.insuranceData.eapData.authNumber);
                            }
                        }
                        insuranceType_box = createPDFAcroFields(form_1.getCheckBox("insurance_type").acroField.Kids()).map(function (_) { return _[0]; }), insuranceType_value = dataForCMS1500_1.insuranceData.insurance_plan_type;
                        insuranceTypeLoop: for (i = 0; i < insuranceType_box.length; i++) {
                            checkBox = insuranceType_box[i];
                            if (insuranceType_value == "MB" &&
                                checkBox.getOnValue().encodedName === "/Medicare") {
                                checkBox.setValue(checkBox.getOnValue());
                                break insuranceTypeLoop;
                            }
                            // console.log(
                            //   "insuranceType_value == MC ",
                            //   checkBox.getOnValue().encodedName
                            // );
                            if (insuranceType_value == "MC" &&
                                checkBox.getOnValue().encodedName === "/Medicaid") {
                                checkBox.setValue(checkBox.getOnValue());
                                break insuranceTypeLoop;
                            }
                            if (insuranceType_value == "CI" &&
                                checkBox.getOnValue().encodedName === "/Other") {
                                checkBox.setValue(checkBox.getOnValue());
                                break insuranceTypeLoop;
                            }
                        }
                        assignment_box = createPDFAcroFields(form_1.getCheckBox("assignment").acroField.Kids()).map(function (_) { return _[0]; }), assignment_value = dataForCMS1500_1.accept_assignment ? "A" : "C";
                        assignmentLoop: for (i = 0; i < assignment_box.length; i++) {
                            checkBox = assignment_box[i];
                            if (assignment_value == "A" &&
                                checkBox.getOnValue().encodedName === "/YES") {
                                checkBox.setValue(checkBox.getOnValue());
                                break assignmentLoop;
                            }
                            if (assignment_value == "C" &&
                                checkBox.getOnValue().encodedName === "/NO") {
                                checkBox.setValue(checkBox.getOnValue());
                                break assignmentLoop;
                            }
                        }
                        subscriber_gender_box = createPDFAcroFields(form_1.getCheckBox("ins_sex").acroField.Kids()).map(function (_) { return _[0]; }), subscriber_gender_value = dataForCMS1500_1.insuranceData.subscriber_gender == "M"
                            ? "Male"
                            : "Female";
                        subGenderLoop: for (i = 0; i < subscriber_gender_box.length; i++) {
                            checkBox = subscriber_gender_box[i];
                            if (subscriber_gender_value == "Male" &&
                                checkBox.getOnValue().encodedName === "/MALE") {
                                checkBox.setValue(checkBox.getOnValue());
                                break subGenderLoop;
                            }
                            if (subscriber_gender_value == "Female" &&
                                checkBox.getOnValue().encodedName === "/FEMALE") {
                                checkBox.setValue(checkBox.getOnValue());
                                break subGenderLoop;
                            }
                        }
                        ssn_box = createPDFAcroFields(form_1.getCheckBox("ssn").acroField.Kids()).map(function (_) { return _[0]; });
                        ssn_box[1].setValue(ssn_box[1].getOnValue());
                        rel_to_ins_box = createPDFAcroFields(form_1.getCheckBox("rel_to_ins").acroField.Kids()).map(function (_) { return _[0]; }), rel_to_ins_value = dataForCMS1500_1.insuranceData.relationship;
                        //console.log(rel_to_ins_value, "rel to insures");
                        rel_to_insLoop: for (i = 0; i < rel_to_ins_box.length; i++) {
                            checkBox = rel_to_ins_box[i];
                            //18,01,19
                            if (rel_to_ins_value == "Self" &&
                                checkBox.getOnValue().encodedName === "/S") {
                                checkBox.setValue(checkBox.getOnValue());
                                break rel_to_insLoop;
                            }
                            if (rel_to_ins_value == "Spouse" &&
                                checkBox.getOnValue().encodedName === "/M") {
                                checkBox.setValue(checkBox.getOnValue());
                                break rel_to_insLoop;
                            }
                            if (rel_to_ins_value == "Child" &&
                                checkBox.getOnValue().encodedName === "/C") {
                                checkBox.setValue(checkBox.getOnValue());
                                break rel_to_insLoop;
                            }
                            if (checkBox.getOnValue().encodedName === "/O") {
                                checkBox.setValue(checkBox.getOnValue());
                                break rel_to_insLoop;
                            }
                        }
                        patient_gender_box = createPDFAcroFields(form_1.getCheckBox("sex").acroField.Kids()).map(function (_) { return _[0]; }), patient_gender_value = dataForCMS1500_1.patientData.gender == "M" ? "Male" : "Female";
                        patientGenderLoop: for (i = 0; i < patient_gender_box.length; i++) {
                            checkBox = patient_gender_box[i];
                            if (patient_gender_value == "Male" &&
                                checkBox.getOnValue().encodedName === "/M") {
                                checkBox.setValue(checkBox.getOnValue());
                                break patientGenderLoop;
                            }
                            if (patient_gender_value == "Female" &&
                                checkBox.getOnValue().encodedName === "/F") {
                                checkBox.setValue(checkBox.getOnValue());
                                break patientGenderLoop;
                            }
                        }
                        employment_box = createPDFAcroFields(form_1.getCheckBox("employment").acroField.Kids()).map(function (_) { return _[0]; });
                        for (i = 0; i < employment_box.length; i++) {
                            if (employment_box[i].getOnValue().encodedName === "/NO") {
                                employment_box[i].setValue(employment_box[i].getOnValue());
                            }
                        }
                        other_accident_box = createPDFAcroFields(form_1.getCheckBox("other_accident").acroField.Kids()).map(function (_) { return _[0]; });
                        for (i = 0; i < other_accident_box.length; i++) {
                            if (other_accident_box[i].getOnValue().encodedName === "/NO") {
                                other_accident_box[i].setValue(other_accident_box[i].getOnValue());
                            }
                        }
                        pt_auto_accident_box = createPDFAcroFields(form_1.getCheckBox("pt_auto_accident").acroField.Kids()).map(function (_) { return _[0]; });
                        for (i = 0; i < pt_auto_accident_box.length; i++) {
                            if (pt_auto_accident_box[i].getOnValue().encodedName === "/NO") {
                                pt_auto_accident_box[i].setValue(pt_auto_accident_box[i].getOnValue());
                            }
                        }
                        /**
                            ? Code by Charanjit
                            const kids = createPDFAcroFields(form.getCheckBox('insurance_type').acroField. Kids()).map((_) => _[0])
                            kids.forEach((kid) => {
                              console.log(kid.getOnValue().encodedName)
                              if (kid.getOnValue().encodedName === '/Tricare') {
                                //console.log('in true')
                                kid.setValue(kid.getOnValue()) // Check that particular checkbox.
                              } else {
                                kid.setValue(PDFName.of('Off')) // Uncheck the checkbox
                              }
                            })
                          */
                        form_1.getFields().forEach(function (field) { return field.enableReadOnly(); });
                        return [4 /*yield*/, pdfDoc.save()];
                    case 3:
                        pdfBytes = _d.sent();
                        return [4 /*yield*/, fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../../../../public/upload/billing/CMS/CMS_".concat(dataForCMS1500_1.appointment_id.toString(), ".pdf")), pdfBytes)];
                    case 4:
                        _d.sent();
                        getGender = function (value) {
                            var gender;
                            switch (value) {
                                case "Male":
                                    gender = "M";
                                    break;
                                case "Female":
                                    gender = "F";
                                    break;
                                default:
                                    gender = "O";
                                    break;
                            }
                            return gender;
                        };
                        stirngAfterClaim = "";
                        if (dataForCMS1500_1.insuranceData.eapData &&
                            "authNumber" in dataForCMS1500_1.insuranceData.eapData &&
                            (medicaid_resub != 1 || medicaid_resub != "1")) {
                            //stirngAfterClaim = `REF*G1*${dataForCMS1500.insuranceData.eapData.authNumber}`;
                            stirngAfterClaim =
                                "CLM*".concat(pt_account, "*").concat(dataForCMS1500_1.insurancePortion, "***").concat(dataForCMS1500_1.place_of_service, ":B:").concat(medicaid_resub, "*Y*").concat(dataForCMS1500_1.accept_assignment ? "A" : "C", "*Y*Y~") +
                                    "\n" +
                                    "REF*G1*".concat(dataForCMS1500_1.insuranceData.eapData.authNumber, "~") +
                                    "\n" +
                                    "REF*F8*".concat(dataForCMS1500_1.original_ref_no, "~");
                        }
                        else if (medicaid_resub != 1 || medicaid_resub != "1") {
                            stirngAfterClaim =
                                "CLM*".concat(pt_account, "*").concat(dataForCMS1500_1.insurancePortion, "***").concat(dataForCMS1500_1.place_of_service, ":B:").concat(medicaid_resub, "*Y*").concat(dataForCMS1500_1.accept_assignment ? "A" : "C", "*Y*Y~") +
                                    "\n" +
                                    "REF*F8*".concat(dataForCMS1500_1.original_ref_no, "~");
                        }
                        else {
                            //stirngAfterClaim = `REF*F8*${dataForCMS1500.original_ref_no}`;
                            stirngAfterClaim = "CLM*".concat(pt_account, "*").concat(dataForCMS1500_1.insurancePortion, "***").concat(dataForCMS1500_1.place_of_service, ":B:").concat(medicaid_resub, "*Y*").concat(dataForCMS1500_1.accept_assignment ? "A" : "C", "*Y*Y~");
                        }
                        cptArray_1 = [];
                        pointer_string_arr_1 = [];
                        dataForCMS1500_1.appliedCptCodes.forEach(function (el, i) {
                            var cptLine = "";
                            var cptCodeEl = dataForCMS1500_1.cptCodeData.filter(function (el1) { return el1._id.toString() == el.cpt_code_id.toString(); })[0];
                            el.cptCodeEl = cptCodeEl;
                            cptLine += cptCodeEl.cptCode;
                            el.modifier.forEach(function (m, j) {
                                //m.toString();
                                var foundModifier = dataForCMS1500_1.modifierData.find(function (o) { return o._id.toString() == m.toString(); });
                                //console.log(foundModifier);
                                if (foundModifier) {
                                    //if (j > 0)
                                    cptLine += ":" + foundModifier.modifierCode;
                                    // else
                                    //   cptLine += cptCodeEl.cptCode + ":" + foundModifier.modifierCode;
                                }
                            });
                            cptLine += "*" + cptCodeEl.price + "*UN*" + el.unit;
                            cptLine.replace(",", "");
                            cptArray_1.push(cptLine);
                            var pointer_string = "";
                            el.icd.forEach(function (data, i) {
                                if (i == 0 && i != el.icd.length - 1)
                                    pointer_string += "" + (data + 1);
                                else
                                    pointer_string += ":" + (data + 1);
                            });
                            pointer_string_arr_1.push(pointer_string);
                            // cptLine +=
                            //   cptCodeEl.cptCode +
                            //   ":" +
                            //   foundModifier.modifierCode +
                            //   "*" +
                            //   cptCodeEl.price +
                            //   "*UN*" +
                            //   cptCodeEl.unit;
                            //cptCodeForEDI.push(cptLine);
                        });
                        modifiedcpt_1 = "";
                        cptArray_1.forEach(function (e, i) {
                            modifiedcpt_1 +=
                                "LX*".concat(i + 1, "~") +
                                    "\n" +
                                    "SV1*HC:" +
                                    e +
                                    "***".concat(pointer_string_arr_1[i], "~") +
                                    "\n" +
                                    "DTP*472*D8*" +
                                    momentTimeZone
                                        .tz(dataForCMS1500_1.startDateTime, "America/Los_Angeles")
                                        .format("YYYYMMDD");
                            if (i != cptArray_1.length - 1)
                                modifiedcpt_1 += "~" + "\n";
                        });
                        subscriberGender = dataForCMS1500_1.insuranceData.subscriber_gender;
                        icdCodes_1 = "";
                        dataForCMS1500_1.ICD_10.forEach(function (el, i) {
                            icdCodes_1 +=
                                i == 0
                                    ? "ABK:" + el.ictCode.replace(".", "")
                                    : "*ABF:" + el.ictCode.replace(".", "");
                        });
                        console.log(icdCodes_1);
                        icdCodes_1.replace(",", "");
                        relationshipEDI = "18";
                        if (dataForCMS1500_1.insuranceData.relationship == "Self") {
                            relationshipEDI = "18";
                        }
                        else if (dataForCMS1500_1.insuranceData.relationship == "Spouse") {
                            relationshipEDI = "01";
                        }
                        else if (dataForCMS1500_1.insuranceData.relationship == "Child") {
                            relationshipEDI = "19";
                        }
                        else {
                            relationshipEDI = "G8";
                        }
                        NM1_85_line = "";
                        if (upperLineBillingProvider != "") {
                            NM1_85_line =
                                upperLineBillingProvider +
                                    "\n" +
                                    "NM1*85*2*".concat(dataForCMS1500_1.clinicData.clinic_name, "*****XX*").concat(pin);
                        }
                        else {
                            NM1_85_line = "NM1*85*2*".concat(dataForCMS1500_1.clinicData.clinic_name, "*****XX*").concat(pin);
                        }
                        NM1_82_line = "";
                        if (lowerLineRenderingProvider != "") {
                            //NM1*DN*1* Last Name*First name****XX*NPI~doctorData
                            NM1_82_line =
                                "NM1*DN*1*".concat(dataForCMS1500_1.doctorData.last_name.toUpperCase(), "*").concat(dataForCMS1500_1.doctorData.first_name.toUpperCase(), "****XX*").concat(dataForCMS1500_1.doctorData.npiNo.toUpperCase(), "~") +
                                    "\n" +
                                    "NM1*82*1*".concat(dataForCMS1500_1.renderingProviderData.last_name.toUpperCase(), "*").concat(dataForCMS1500_1.renderingProviderData.first_name.toUpperCase(), "****XX*").concat(dataForCMS1500_1.renderingProviderData.npiNo.toUpperCase(), "~") +
                                    "\n" +
                                    lowerLineRenderingProvider;
                        }
                        else {
                            NM1_82_line =
                                "NM1*DN*1*".concat(dataForCMS1500_1.doctorData.last_name.toUpperCase(), "*").concat(dataForCMS1500_1.doctorData.first_name.toUpperCase(), "****XX*").concat(dataForCMS1500_1.doctorData.npiNo.toUpperCase(), "~") +
                                    "\n" +
                                    "NM1*82*1*".concat(dataForCMS1500_1.renderingProviderData.last_name.toUpperCase(), "*").concat(dataForCMS1500_1.renderingProviderData.first_name.toUpperCase(), "****XX*").concat(dataForCMS1500_1.renderingProviderData.npiNo.toUpperCase(), "~");
                        }
                        locationZipCode = dataForCMS1500_1.locationData.postal_code.toUpperCase(), locationStateCode = dataForCMS1500_1.locationData.state.toUpperCase(), locationAddress = dataForCMS1500_1.locationData.address.toUpperCase(), locationCity = dataForCMS1500_1.locationData.city.toUpperCase(), providerFN = dataForCMS1500_1.renderingProviderData.first_name.toUpperCase(), providerLN = dataForCMS1500_1.renderingProviderData.last_name.toUpperCase(), providerCity = dataForCMS1500_1.doctorData.city.toUpperCase(), subscriberPayerId = dataForCMS1500_1.insuranceData.payer_id.toUpperCase(), ediDataObject = {
                            applicationReceiverId: "ECGCLAIMS",
                            groupControlNumber: generateRandomNumber(9),
                            // 'EPIPHANY COUNSELING CONSULTING AND TREATMENT SERVICES'
                            // interchange
                            interchangeDateYYMMDD: (0, moment_1.default)(new Date()).format("YYMMDD"),
                            interchangeDate: (0, moment_1.default)(new Date()).format("YYYYMMDD"),
                            interchangeTime: (0, moment_1.default)(new Date()).format("hhmm"),
                            //interchangeControlNumber: Math.floor(Math.random() * 1000000000),
                            interchangeControlNumber: generateRandomNumber(9),
                            // provider
                            providerFN: providerFN,
                            providerLN: providerLN,
                            providerNPI: dataForCMS1500_1.renderingProviderData.npiNo.toUpperCase(),
                            NM1_85_line: NM1_85_line,
                            NM1_82_line: NM1_82_line,
                            // providerAddress,
                            // providerCity,
                            // providerStateCode,
                            // providerZipCode,
                            // location
                            locationCity: locationCity,
                            locationZipCode: locationZipCode,
                            locationAddress: locationAddress,
                            locationNPI: pin,
                            locationStateCode: locationStateCode,
                            locationFedID: tax_id,
                            stirngAfterClaim: stirngAfterClaim,
                            // subscriber
                            subscriberRelationship: relationshipEDI,
                            subscriberLN: dataForCMS1500_1.insuranceData.subscriber_last_name.toUpperCase(),
                            subscriberFN: dataForCMS1500_1.insuranceData.subscriber_first_name.toUpperCase(),
                            subscriberAddress: dataForCMS1500_1.insuranceData.subscriber_address.toUpperCase(),
                            subscriberCity: dataForCMS1500_1.insuranceData.subscriber_city.toUpperCase(),
                            subscriberStateCode: dataForCMS1500_1.insuranceData.stateData.stateCode.toUpperCase(),
                            subscriberZipCode: dataForCMS1500_1.insuranceData.subscriber_zip_code.toUpperCase(),
                            //subscriberZipCode: "HH",
                            // subscriberDOB: moment(
                            //   dataForCMS1500.insuranceData.date_of_birth
                            // ).format("YYYYMMDD"),
                            subscriberDOB: ins_dob_split[2] + ins_dob_split[0] + ins_dob_split[1],
                            subscriberGender: subscriberGender,
                            subscriberPayerId: subscriberPayerId,
                            // insurance
                            insuranceType: dataForCMS1500_1.insuranceData.coverage.substring(0, 1),
                            insurancePlanType: dataForCMS1500_1.insuranceData.insurance_plan_type,
                            insuranceName: insurance_name,
                            insuranceAddress: insurance_address,
                            insuranceCity: dataForCMS1500_1.insuranceData.insurance_city.toUpperCase(),
                            insuranceStateCode: dataForCMS1500_1.insuranceData.stateData.stateCode.toUpperCase(),
                            insuranceZipCode: dataForCMS1500_1.insuranceData.insurance_zip_code.toUpperCase(),
                            // patient
                            patientID: pt_account,
                            patientLN: dataForCMS1500_1.patientData.last_name,
                            patientSSN: dataForCMS1500_1.patientData.SSN,
                            patientFN: dataForCMS1500_1.patientData.first_name,
                            patientMN: dataForCMS1500_1.patientData.middle_name,
                            patientAddress: pt_street,
                            patientCity: pt_city,
                            patientStateCode: pt_state,
                            patientZipCode: pt_zip,
                            patientDOB: (0, moment_1.default)(dataForCMS1500_1.patientData.date_of_birth).format("YYYYMMDD"),
                            // patientGender: getGender(
                            //   dataForCMS1500.patientData.gender == "M" ? "Male" : "Female"
                            // ),
                            patientGender: dataForCMS1500_1.patientData.gender,
                            // Appointment
                            DOS: momentTimeZone
                                .tz(dataForCMS1500_1.startDateTime, "America/Los_Angeles")
                                .format("YYYYMMDD"),
                            // Other
                            orignalRefNo: original_ref,
                            icdCodes: icdCodes_1,
                            cptArray: cptArray_1,
                            modifiedcpt: modifiedcpt_1,
                            //let cptArray: string[] = [];,
                            //icdCodes: dataForCMS1500.ICD_10,
                            resubmissionCode: medicaid_resub,
                            cptCodes: dataForCMS1500_1.appliedCptCodes,
                            placeOfService: dataForCMS1500_1.place_of_service,
                            acceptAssignment: dataForCMS1500_1.accept_assignment ? "A" : "C",
                            totalChargeAmount: dataForCMS1500_1.insurancePortion,
                            billingProvider: dataForCMS1500_1.locationData.branchName.toUpperCase(),
                            clinic_name: dataForCMS1500_1.clinicData.clinic_name,
                            clinicContact: dataForCMS1500_1.locationData.mobile_other,
                        };
                        ediString = require("../../../../../healthform/EDI_TEXT").ediTemplateText(ediDataObject);
                        ediString = ediString.replace("{{LINES_COUNT}}", ediString.split("\n").length - 4);
                        return [4 /*yield*/, fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../../../../public/upload/billing/EDI/EDI_" +
                                dataForCMS1500_1.appointment_id.toString()), ediString)];
                    case 5:
                        _d.sent();
                        return [2 /*return*/, {
                                success: true,
                                data: {
                                    EDI: "http://".concat(req.host, ":").concat(process.env.PORT) +
                                        "/upload/billing/EDI/EDI_" +
                                        dataForCMS1500_1.appointment_id,
                                    CMS: "http://".concat(req.host, ":").concat(process.env.PORT) +
                                        "/upload/billing/CMS/CMS_" +
                                        dataForCMS1500_1.appointment_id +
                                        ".pdf",
                                },
                                status_code: http_status_codes_1.default.OK,
                            }];
                    case 6: return [2 /*return*/, {
                            success: false,
                            status_code: http_status_codes_1.default.NOT_FOUND,
                            data: {
                                message: erros_message_1.default.NO_RECORD_FOUND,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                        }];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_9 = _d.sent();
                        next(error_9);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        /////////////////////****************************************************************///////////////////////////////////////// */
        this.makeCMS1500FormForSecondaryInsurance = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, createdby_id, clinic_id, appointment_id, appointmentDetails, insuranceDetails, primaryInsuranceDetails, condition, data, dataForCMS1500_2, preferedMobileNumber, preferedMobileAreaCode, encrytedText, formPdfBytes, pdfDoc, form_2, insurance_name, insurance_address, insurance_address2, insurance_city_state_zip, insurance_id, pt_name, birth_mm, birth_dd, birth_yy, ins_name, pt_zip, pt_city, pt_state, pt_phone, pt_street, pt_AreaCode, ins_zip, ins_city, ins_state, ins_phone, ins_street, ins_phone_area, ins_dob_mm, ins_dob_dd, ins_dob_yy, 
            ////
            pt_date, amt_paid, _a, a, b, t_charge, physician_signature, doc_name, physician_date, fac_street, fac_name, fac_location, doc_street, doc_location, pin1, doc_phone_area, doc_phone, pin, tax_id, pt_account, medicaid_resub, original_ref, pt_signature, ins_signature, additional_claim_info, patientDoc, primaryInsuranceName, assignment_box1, assignment_value1, i, checkBox, _b, fm_2, fd_2, fy_2, _c, tm_2, td_2, ty_2, upperLineBillingProvider, lowerLineRenderingProvider, rendering_taxonomy, billing_taxonomy, insuranceType_box, insuranceType_value, i, checkBox, assignment_box, assignment_value, i, checkBox, subscriber_gender_box, subscriber_gender_value, i, checkBox, ssn_box, rel_to_ins_box, rel_to_ins_value, i, checkBox, patient_gender_box, patient_gender_value, i, checkBox, employment_box, i, other_accident_box, i, pt_auto_accident_box, i, pdfBytes, getGender, stirngAfterClaim, cptArray_2, modifiedcpt_2, subscriberGender, icdCodes_2, relationshipEDI, NM1_85_line, NM1_82_line, 
            // providerStateCode = dataForCMS1500.doctorData.state.toUpperCase(),
            // providerAddress = dataForCMS1500.doctorData.address.toUpperCase(),
            locationZipCode, locationStateCode, locationAddress, locationCity, providerFN, providerLN, providerCity, subscriberPayerId, ediDataObject, ediString, error_10;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 12, , 13]);
                        userDetails = req.user;
                        createdby_id = userDetails._id;
                        clinic_id = model.clinic_id, appointment_id = model.appointment_id;
                        return [4 /*yield*/, appointment_model_1.default.findOne({
                                _id: new mongoose_1.default.Types.ObjectId(model.appointment_id.toString()),
                            })];
                    case 1:
                        appointmentDetails = _d.sent();
                        if (!appointmentDetails) return [3 /*break*/, 3];
                        return [4 /*yield*/, insurance_model_1.default.findOne({
                                patient_id: appointmentDetails.patient_id,
                                coverage: "Secondary",
                            })];
                    case 2:
                        insuranceDetails = _d.sent();
                        if (!insuranceDetails)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_SECONDARY_INSURANCE,
                                    },
                                }];
                        _d.label = 3;
                    case 3: return [4 /*yield*/, insurance_model_1.default.findOne({
                            patient_id: appointmentDetails === null || appointmentDetails === void 0 ? void 0 : appointmentDetails.patient_id,
                            coverage: "Primary",
                        }).populate([
                            {
                                path: "insurance_company_id",
                                select: { companyName: 1 },
                            },
                            {
                                path: "patient_id",
                                select: { first_name: 1, last_name: 1 },
                            },
                        ])];
                    case 4:
                        primaryInsuranceDetails = _d.sent();
                        condition = {
                            clinic_id: new mongoose_1.default.Types.ObjectId(clinic_id.toString()),
                            appointment_id: new mongoose_1.default.Types.ObjectId(appointment_id.toString()),
                            // _id: new mongoose.Types.ObjectId(checkout_id!.toString()),
                        };
                        return [4 /*yield*/, super_bill_model_1.default.aggregate([
                                { $match: condition },
                                {
                                    $lookup: {
                                        from: "appointment",
                                        let: { appointment_id: "$appointment_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$_id", "$$appointment_id"],
                                                    },
                                                },
                                            },
                                        ],
                                        as: "appointmentData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$appointmentData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "clinic_locations",
                                        let: {
                                            location_id: "$appointmentData.location_id",
                                        },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$_id", "$$location_id"],
                                                    },
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "states",
                                                    let: { state_id: "$state" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $eq: ["$_id", "$$state_id"],
                                                                },
                                                            },
                                                        },
                                                        { $project: { stateCode: 1 } },
                                                    ],
                                                    as: "stateData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$stateData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $project: {
                                                    city: 1,
                                                    fed_id: 1,
                                                    branchName: 1,
                                                    address: 1,
                                                    taxonomy: 1,
                                                    npiNo: 1,
                                                    postal_code: 1,
                                                    state: "$stateData.stateCode",
                                                },
                                            },
                                        ],
                                        as: "locationData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$locationData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "patients",
                                        let: { patient_id: "$patient_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$_id", "$$patient_id"],
                                                    },
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "states",
                                                    let: { state_id: "$state" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $eq: ["$_id", "$$state_id"],
                                                                },
                                                            },
                                                        },
                                                        { $project: { stateCode: 1 } },
                                                    ],
                                                    as: "stateData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$stateData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $project: {
                                                    city: 1,
                                                    gender: 1,
                                                    address: 1,
                                                    contact: 1,
                                                    last_name: 1,
                                                    first_name: 1,
                                                    patientId: 1,
                                                    SSN: 1,
                                                    // patientId: 1,
                                                    middle_name: 1,
                                                    postal_code: 1,
                                                    date_of_birth: 1,
                                                    responsible_person: 1,
                                                    state: "$stateData.stateCode",
                                                },
                                            },
                                        ],
                                        as: "patientData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$patientData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "doctor",
                                        localField: "billing_provider_id",
                                        foreignField: "_id",
                                        pipeline: [
                                            {
                                                $lookup: {
                                                    from: "users",
                                                    localField: "user_id",
                                                    foreignField: "_id",
                                                    pipeline: [
                                                        {
                                                            $project: {
                                                                first_name: 1,
                                                                last_name: 1,
                                                            },
                                                        },
                                                    ],
                                                    as: "userData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$userData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "states",
                                                    let: { state_id: "$state" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $eq: ["$_id", "$$state_id"],
                                                                },
                                                            },
                                                        },
                                                        { $project: { stateCode: 1 } },
                                                    ],
                                                    as: "stateData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$stateData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $project: {
                                                    first_name: "$userData.first_name",
                                                    last_name: "$userData.last_name",
                                                    npiNo: 1,
                                                    taxonomy: 1,
                                                    stateCode: "$stateData.stateCode",
                                                    address: 1,
                                                    //mobile_home: 1,
                                                    city: 1,
                                                    postal_code: 1,
                                                },
                                            },
                                        ],
                                        as: "billingProviderData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$billingProviderData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "doctor",
                                        localField: "rendering_provider_id",
                                        foreignField: "_id",
                                        pipeline: [
                                            {
                                                $lookup: {
                                                    from: "users",
                                                    localField: "user_id",
                                                    foreignField: "_id",
                                                    pipeline: [
                                                        {
                                                            $project: {
                                                                first_name: 1,
                                                                last_name: 1,
                                                            },
                                                        },
                                                    ],
                                                    as: "userData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$userData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "states",
                                                    let: { state_id: "$state" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $eq: ["$_id", "$$state_id"],
                                                                },
                                                            },
                                                        },
                                                        { $project: { stateCode: 1 } },
                                                    ],
                                                    as: "stateData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$stateData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $project: {
                                                    first_name: "$userData.first_name",
                                                    last_name: "$userData.last_name",
                                                    npiNo: 1,
                                                    taxonomy: 1,
                                                    stateCode: "$stateData.stateCode",
                                                    address: 1,
                                                    //mobile_home: 1,
                                                    city: 1,
                                                    postal_code: 1,
                                                },
                                            },
                                        ],
                                        as: "renderingProviderData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$renderingProviderData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "doctor",
                                        let: { doctor_id: "$referring_provider_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$_id", "$$doctor_id"],
                                                    },
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "states",
                                                    let: { state_id: "$state" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $eq: ["$_id", "$$state_id"],
                                                                },
                                                            },
                                                        },
                                                        { $project: { stateCode: 1 } },
                                                    ],
                                                    as: "stateData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$stateData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $project: {
                                                    npiNo: 1,
                                                    user_id: 1,
                                                    address: 1,
                                                    //mobile_home: 1,
                                                    city: 1,
                                                    stateCode: "$stateData.stateCode",
                                                    postal_code: 1,
                                                },
                                            },
                                        ],
                                        as: "doctorCollectionData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$doctorCollectionData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "users",
                                        let: {
                                            user_id: "$doctorCollectionData.user_id",
                                            npiNo: "$doctorCollectionData.npiNo",
                                            city: "$doctorCollectionData.city",
                                            stateCode: "$doctorCollectionData.stateCode",
                                            postal_code: "$doctorCollectionData.postal_code",
                                            address: "$doctorCollectionData.address",
                                            //mobile_home: "$doctorCollectionData.mobile_home",
                                        },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: { $eq: ["$_id", "$$user_id"] },
                                                },
                                            },
                                            {
                                                $project: {
                                                    first_name: 1,
                                                    last_name: 1,
                                                    mobile_no: 1,
                                                    image: 1,
                                                    npiNo: "$$npiNo",
                                                    address: "$$address",
                                                    city: "$$city",
                                                    //mobile_no: 1,
                                                    //mobile_home: "$$mobile_home",
                                                    //state: "$stateData.stateCode",
                                                    state: "$$stateCode",
                                                    postal_code: "$$postal_code",
                                                    // city: 1,
                                                },
                                            },
                                        ],
                                        as: "doctorData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$doctorData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "insurance",
                                        let: {
                                            patient_id: "$patient_id",
                                            //insurance_id: "$insurance_id",
                                            coverage: "Secondary",
                                        },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $and: [
                                                            {
                                                                $eq: ["$patient_id", "$$patient_id"],
                                                            },
                                                            {
                                                                $eq: ["$coverage", "$$coverage"],
                                                            },
                                                        ],
                                                    },
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "insurance_companies",
                                                    localField: "insurance_company_id",
                                                    foreignField: "_id",
                                                    pipeline: [
                                                        {
                                                            $project: {
                                                                companyName: 1,
                                                            },
                                                        },
                                                    ],
                                                    as: "insuranceCompanyData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$insuranceCompanyData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "eap",
                                                    localField: "patient_id",
                                                    foreignField: "patient_id",
                                                    pipeline: [
                                                        {
                                                            $project: {
                                                                authNumber: 1,
                                                            },
                                                        },
                                                    ],
                                                    as: "eapData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$eapData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "states",
                                                    let: { state_id: "$insurance_state" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $eq: ["$_id", "$$state_id"],
                                                                },
                                                            },
                                                        },
                                                        //{ $project: { stateCode: 1 } },
                                                    ],
                                                    as: "stateData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$stateData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            //{ $project: { codes: 0, stateData: 1 } },
                                        ],
                                        as: "insuranceData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$insuranceData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "icts",
                                        let: { code_id: "$icd" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: { $in: ["$_id", "$$code_id"] },
                                                },
                                            },
                                            { $project: { ictCode: 1 } },
                                        ],
                                        as: "ICD_10",
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "cpt",
                                        let: { code_id: "$cpt.cpt_code_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: { $in: ["$_id", "$$code_id"] },
                                                },
                                            },
                                            { $project: { cptCode: 1, price: 1 } },
                                        ],
                                        as: "cptCodeData",
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "clinic",
                                        localField: "clinic_id",
                                        foreignField: "_id",
                                        pipeline: [
                                            {
                                                $project: {
                                                    clinic_name: 1,
                                                },
                                            },
                                        ],
                                        as: "clinicData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$clinicData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "super_bill_other_detail",
                                        localField: "_id",
                                        foreignField: "super_bill_id",
                                        pipeline: [
                                            {
                                                $project: {
                                                    additional_cliam_info: 1,
                                                    original_ref_no: 1,
                                                    resubmission_no: 1,
                                                },
                                            },
                                        ],
                                        as: "superBillOtherDetail",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$superBillOtherDetail",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                //superBillOtherDetail
                                {
                                    $lookup: {
                                        from: "modifiers",
                                        localField: "cpt.modifier",
                                        foreignField: "_id",
                                        pipeline: [
                                            {
                                                $project: {
                                                    modifierCode: 1,
                                                    description: 1,
                                                },
                                            },
                                        ],
                                        as: "modifierData",
                                    },
                                },
                                {
                                    $project: {
                                        _id: 0,
                                        paper: 1,
                                        ICD_10: 1,
                                        doctorData: 1,
                                        cptCodeData: 1,
                                        patientData: 1,
                                        locationData: 1,
                                        orignalRefNo: 1,
                                        typeOfService: 1,
                                        insuranceData: 1,
                                        place_of_service: 1,
                                        // typeOfService: 1,
                                        placeOfService: 1,
                                        // appointment_id: 1,
                                        accept_assignment: 1,
                                        resubmissionCode: 1,
                                        // acceptAssignment: 1,
                                        checkout_id: "$_id",
                                        financialClass_id: 1,
                                        checkoutTime: "$checkoutTime",
                                        //appliedCptCodes: "$codes.cptCode",
                                        appliedCptCodes: "$cpt",
                                        appointment_id: "$appointment_id",
                                        //insurancePortion: "$insurance.amount",
                                        insurancePortion: "$total_amount",
                                        endDateTime: "$appointmentData.endDateTime",
                                        checkInTime: "$appointmentData.startDateTime",
                                        startDateTime: "$appointmentData.startDateTime",
                                        appointment_number: "$appointmentData.appointment_number",
                                        billingProviderData: 1,
                                        renderingProviderData: 1,
                                        clinicData: 1,
                                        modifierData: 1,
                                        additional_cliam_info: "$superBillOtherDetail.additional_cliam_info",
                                        original_ref_no: "$superBillOtherDetail.original_ref_no",
                                        resubmission_no: "$superBillOtherDetail.resubmission_no",
                                    },
                                },
                            ])];
                    case 5:
                        data = _d.sent();
                        if (!data.length) return [3 /*break*/, 10];
                        dataForCMS1500_2 = data[0];
                        if (!dataForCMS1500_2.ICD_10.length)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.appointmentMsg.checkoutCodeReq,
                                    },
                                }];
                        dataForCMS1500_2.patientData.SSN = dataForCMS1500_2.patientData.SSN
                            ? dataForCMS1500_2.patientData.SSN
                            : "";
                        dataForCMS1500_2.patientData.city = dataForCMS1500_2.patientData.city
                            ? dataForCMS1500_2.patientData.city.toUpperCase()
                            : "";
                        dataForCMS1500_2.patientData.gender = dataForCMS1500_2.patientData.gender
                            ? dataForCMS1500_2.patientData.gender.toUpperCase()
                            : "";
                        dataForCMS1500_2.patientData.address = dataForCMS1500_2.patientData.address
                            ? dataForCMS1500_2.patientData.address.toUpperCase()
                            : "";
                        dataForCMS1500_2.patientData.last_name = dataForCMS1500_2.patientData
                            .last_name
                            ? common_methods_1.default.getDecryptText(dataForCMS1500_2.patientData.last_name)
                            : "";
                        dataForCMS1500_2.patientData.first_name = dataForCMS1500_2.patientData
                            .first_name
                            ? common_methods_1.default.getDecryptText(dataForCMS1500_2.patientData.first_name)
                            : "";
                        dataForCMS1500_2.patientData.middle_name = dataForCMS1500_2.patientData
                            .middle_name
                            ? common_methods_1.default.getDecryptText(dataForCMS1500_2.patientData.middle_name)
                            : "";
                        dataForCMS1500_2.patientData.postal_code = dataForCMS1500_2.patientData
                            .postal_code
                            ? dataForCMS1500_2.patientData.postal_code
                            : "";
                        preferedMobileNumber = "", preferedMobileAreaCode = "";
                        if (dataForCMS1500_2.patientData.contact.prefered.mobileNo) {
                            encrytedText = dataForCMS1500_2.patientData.contact.prefered.mobileNo;
                            preferedMobileNumber = "".concat(encrytedText.substring(3, 6), "-").concat(encrytedText.substring(6));
                            preferedMobileAreaCode = encrytedText.substring(0, 3);
                        }
                        console.log(__dirname + "/healthform", "  __dirname");
                        formPdfBytes = fs_1.default.readFileSync(path_1.default.join(__dirname, "../../../../../healthform", "form-cms1500.pdf"));
                        return [4 /*yield*/, PDFDocument.load(formPdfBytes)];
                    case 6:
                        pdfDoc = _d.sent(), form_2 = pdfDoc.getForm();
                        if (!dataForCMS1500_2.patientData)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NOT_FOUND,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                }];
                        if (!dataForCMS1500_2.insuranceData)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.insuranceMsg.notFound,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                }];
                        insurance_name = dataForCMS1500_2.insuranceData.insuranceCompanyData.companyName.toUpperCase(), insurance_address = dataForCMS1500_2.insuranceData.insurance_address.toUpperCase(), insurance_address2 = "", insurance_city_state_zip = "".concat(dataForCMS1500_2.insuranceData.insurance_city.toUpperCase(), ", ").concat(dataForCMS1500_2.insuranceData.stateData.stateCode.toUpperCase(), " ").concat(dataForCMS1500_2.insuranceData.insurance_zip_code.toUpperCase()), insurance_id = dataForCMS1500_2.insuranceData.subscriber_id, pt_name = "".concat(dataForCMS1500_2.patientData.last_name, ",").concat(dataForCMS1500_2.patientData.first_name), birth_mm = (0, moment_1.default)(dataForCMS1500_2.patientData.date_of_birth).format("MM"), birth_dd = (0, moment_1.default)(dataForCMS1500_2.patientData.date_of_birth).format("DD"), birth_yy = (0, moment_1.default)(dataForCMS1500_2.patientData.date_of_birth).format("YY"), ins_name = "".concat(dataForCMS1500_2.insuranceData.subscriber_last_name.toUpperCase(), ",").concat(dataForCMS1500_2.insuranceData.subscriber_first_name.toUpperCase()), pt_zip = dataForCMS1500_2.patientData.postal_code, pt_city = dataForCMS1500_2.patientData.city.toUpperCase(), pt_state = dataForCMS1500_2.patientData.state.toUpperCase(), pt_phone = preferedMobileNumber, pt_street = dataForCMS1500_2.patientData.address.toUpperCase(), pt_AreaCode = preferedMobileAreaCode, ins_zip = dataForCMS1500_2.insuranceData.subscriber_zip_code.toUpperCase(), ins_city = dataForCMS1500_2.insuranceData.subscriber_city.toUpperCase(), ins_state = dataForCMS1500_2.insuranceData.stateData.stateCode.toUpperCase(), ins_phone = "".concat(dataForCMS1500_2.insuranceData.mobile_no.substring(3, 6), "-").concat(dataForCMS1500_2.insuranceData.mobile_no.substring(6)), ins_street = dataForCMS1500_2.insuranceData.subscriber_address.toUpperCase(), ins_phone_area = dataForCMS1500_2.insuranceData.mobile_no.substring(0, 3), ins_dob_mm = (0, moment_1.default)(dataForCMS1500_2.insuranceData.date_of_birth).format("MM"), ins_dob_dd = (0, moment_1.default)(dataForCMS1500_2.insuranceData.date_of_birth).format("DD"), ins_dob_yy = (0, moment_1.default)(dataForCMS1500_2.insuranceData.date_of_birth).format("YY"), pt_date = (0, moment_1.default)(new Date()).format("MM-DD-YY"), amt_paid = "00  00", _a = dataForCMS1500_2.insurancePortion
                            .toFixed(2)
                            .toString()
                            .split("."), a = _a[0], b = _a[1], t_charge = a + "  " + b, physician_signature = dataForCMS1500_2.renderingProviderData.first_name +
                            " " +
                            dataForCMS1500_2.renderingProviderData.last_name, doc_name = dataForCMS1500_2.billingProviderData.last_name +
                            " " +
                            dataForCMS1500_2.billingProviderData.first_name, physician_date = pt_date, fac_street = dataForCMS1500_2.locationData.address, fac_name = dataForCMS1500_2.locationData.branchName, fac_location = "".concat(dataForCMS1500_2.locationData.city, ", ").concat(dataForCMS1500_2.locationData.state, " ").concat(dataForCMS1500_2.locationData.postal_code), doc_street = dataForCMS1500_2.billingProviderData.address, doc_location = "".concat(dataForCMS1500_2.billingProviderData.city, ", ").concat(dataForCMS1500_2.billingProviderData.stateCode, " ").concat(dataForCMS1500_2.billingProviderData.postal_code), pin1 = dataForCMS1500_2.doctorData.npiNo, doc_phone_area = dataForCMS1500_2.billingProviderData.mobile_no
                            ? dataForCMS1500_2.billingProviderData.mobile_no
                                .toString()
                                .substr(0, 3)
                            : "", doc_phone = dataForCMS1500_2.billingProviderData.mobile_no
                            ? dataForCMS1500_2.billingProviderData.mobile_no
                                .toString()
                                .substr(3, 9)
                            : "", pin = dataForCMS1500_2.locationData.npiNo, tax_id = dataForCMS1500_2.locationData.fed_id, pt_account = dataForCMS1500_2.patientData.patientId, medicaid_resub = dataForCMS1500_2.resubmission_no
                            ? dataForCMS1500_2.resubmission_no
                            : 1, original_ref = dataForCMS1500_2.original_ref_no
                            ? dataForCMS1500_2.original_ref_no
                            : "", pt_signature = "Signature on file", ins_signature = "Signature on file", additional_claim_info = dataForCMS1500_2.additional_cliam_info
                            ? dataForCMS1500_2.additional_cliam_info
                            : "";
                        patientDoc = (primaryInsuranceDetails.patient_id);
                        primaryInsuranceName = common_methods_1.default.getDecryptText(patientDoc.first_name) +
                            " " +
                            common_methods_1.default.getDecryptText(patientDoc.last_name);
                        form_2
                            .getTextField("other_ins_name") //9
                            .setText(primaryInsuranceName);
                        form_2
                            .getTextField("other_ins_policy") //9a
                            .setText(primaryInsuranceDetails.subscriber_id);
                        // form
                        //   .getTextField("other_accident")
                        //   .setText("other_accident");
                        form_2
                            .getTextField("other_ins_plan_name") //9d
                            .setText(primaryInsuranceDetails.subscriber_first_name +
                            " " +
                            primaryInsuranceDetails.subscriber_last_name);
                        assignment_box1 = createPDFAcroFields(form_2.getCheckBox("ins_benefit_plan").acroField.Kids()).map(function (_) { return _[0]; }), assignment_value1 = "C";
                        assignmentLoop: for (i = 0; i < assignment_box1.length; i++) {
                            checkBox = assignment_box1[i];
                            checkBox.setValue(checkBox.getOnValue());
                            break assignmentLoop;
                        }
                        /////////////////////////////////////////////////////////////////////
                        form_2.getTextField("insurance_name").setText(insurance_name);
                        form_2.getTextField("insurance_address").setText(insurance_address);
                        form_2.getTextField("insurance_address2").setText(insurance_address2);
                        form_2
                            .getTextField("insurance_city_state_zip")
                            .setText(insurance_city_state_zip);
                        form_2.getTextField("insurance_id").setText(insurance_id);
                        //**************************************************************************** */
                        form_2.getTextField("pt_name").setText(pt_name);
                        form_2.getTextField("birth_mm").setText(birth_mm);
                        form_2.getTextField("birth_dd").setText(birth_dd);
                        form_2.getTextField("birth_yy").setText(birth_yy);
                        form_2.getTextField("ins_name").setText(ins_name);
                        form_2.getTextField("pt_zip").setText(pt_zip);
                        form_2.getTextField("pt_city").setText(pt_city);
                        form_2.getTextField("pt_state").setText(pt_state);
                        form_2.getTextField("pt_phone").setText(pt_phone);
                        form_2.getTextField("pt_street").setText(pt_street);
                        form_2.getTextField("pt_AreaCode").setText(pt_AreaCode);
                        form_2.getTextField("ins_zip").setText(ins_zip);
                        form_2.getTextField("ins_city").setText(ins_city);
                        form_2.getTextField("ins_state").setText(ins_state);
                        form_2.getTextField("ins_phone").setText(ins_phone);
                        form_2.getTextField("ins_street").setText(ins_street);
                        form_2.getTextField("ins_phone area").setText(ins_phone_area);
                        form_2.getTextField("ins_dob_mm").setText(ins_dob_mm);
                        form_2.getTextField("ins_dob_dd").setText(ins_dob_dd);
                        form_2.getTextField("ins_dob_yy").setText(ins_dob_yy);
                        form_2.getTextField("ins_plan_name").setText(insurance_name);
                        form_2.getTextField("pt_signature").setText(pt_signature);
                        form_2.getTextField("ins_signature").setText(ins_signature);
                        form_2.getTextField("pt_date").setText(pt_date);
                        form_2.getTextField("96").setText(additional_claim_info); //additional claim info
                        // form.getTextField("grp").setText("12123423432");
                        // form.getTextField("Suppl").setText("32234234334");
                        // form.getTextField("ch1").setText("ch");
                        // form.getTextField("local1a").setText("loc");
                        //form.getTextField("276").setText("loc");
                        // form.getTextField("245").setText("loc");
                        // form.getTextField("223").setText("223");
                        // form.getTextField("201").setText("201");
                        // form.getTextField("179").setText("179");
                        // form.getTextField("157").setText("157");
                        // form.getTextField("135").setText("135");
                        dataForCMS1500_2.ICD_10.forEach(function (el, i) {
                            return form_2
                                .getTextField("diagnosis" + (i + 1))
                                .setText(el.ictCode.replace(".", ""));
                        });
                        _b = (0, moment_1.default)(dataForCMS1500_2.startDateTime)
                            .format("MM-DD-YY")
                            .split("-"), fm_2 = _b[0], fd_2 = _b[1], fy_2 = _b[2], _c = (0, moment_1.default)(dataForCMS1500_2.endDateTime)
                            .format("MM-DD-YY")
                            .split("-"), tm_2 = _c[0], td_2 = _c[1], ty_2 = _c[2];
                        upperLineBillingProvider = "";
                        lowerLineRenderingProvider = "";
                        dataForCMS1500_2.appliedCptCodes.forEach(function (el, i) {
                            i = (i + 1).toString();
                            var fromMonth = "sv" + i + "_mm_from", fromDate = "sv" + i + "_dd_from", fromYear = "sv" + i + "_yy_from", toMonth = "sv" + i + "_mm_end", toDate = "sv" + i + "_dd_end", toYear = "sv" + i + "_yy_end", placeOfService = "place" + i, 
                            //placeOfService = dataForCMS1500.place_of_service,
                            pointer = "diag" + i, cptCode = "cpt" + i, local = "local" + i, charge = "ch" + i, unit = "day" + i;
                            //emg = "emg" + i;
                            //modifier = "mod" + i + "a";
                            el.modifier.forEach(function (m, j) {
                                //m.toString();
                                var foundModifier = dataForCMS1500_2.modifierData.find(function (o) { return o._id.toString() == m.toString(); });
                                if (j < 3) {
                                    if (j == 0)
                                        form_2
                                            .getTextField("mod" + i + "a")
                                            .setText(foundModifier.modifierCode);
                                    if (j == 1)
                                        form_2
                                            .getTextField("mod" + i + "b")
                                            .setText(foundModifier.modifierCode);
                                    if (j == 2)
                                        form_2
                                            .getTextField("mod" + i + "c")
                                            .setText(foundModifier.modifierCode);
                                }
                            });
                            form_2.getTextField(fromMonth).setText(fm_2);
                            form_2.getTextField(fromDate).setText(fd_2);
                            form_2.getTextField(fromYear).setText(fy_2);
                            form_2.getTextField(toMonth).setText(tm_2);
                            form_2.getTextField(toDate).setText(td_2);
                            form_2.getTextField(toYear).setText(ty_2);
                            //form.getTextField(modifier).setText("95");
                            form_2
                                .getTextField(placeOfService)
                                .setText(dataForCMS1500_2.place_of_service
                                ? dataForCMS1500_2.place_of_service
                                : placeOfService);
                            var cptCodeEl = dataForCMS1500_2.cptCodeData.filter(function (el1) { return el1._id.toString() == el.cpt_code_id.toString(); })[0];
                            el.cptCodeEl = cptCodeEl;
                            var pointerValue = "";
                            form_2.getTextField(cptCode).setText(cptCodeEl.cptCode);
                            // dataForCMS1500.ICD_10.forEach((data, i) => {
                            //   console.log(data, "_________", i, JSON.stringify(el.icd));
                            //   el.icd.includes(i) &&
                            //     (pointerValue += String.fromCharCode(i + 1 + 64));
                            // });
                            el.icd.forEach(function (data, i) {
                                pointerValue += String.fromCharCode(data + 1 + 64);
                            });
                            form_2.getTextField(pointer).setText(pointerValue);
                            var _a = (cptCodeEl.price * el.unit)
                                .toFixed(2)
                                .toString()
                                .split("."), a = _a[0], b = _a[1], chargeString = a + "  " + b;
                            form_2.getTextField(charge).setText(chargeString);
                            form_2.getTextField(unit).setText(el.unit.toString());
                            form_2
                                .getTextField(local)
                                .setText(dataForCMS1500_2.renderingProviderData.npiNo.toUpperCase());
                            // form.getTextField('local1a').setText('1N')
                        });
                        //CHECKING IF INSURANCE TYPE IS MEDICAD
                        if (dataForCMS1500_2.insuranceData.insurance_plan_type == "MC" &&
                            (dataForCMS1500_2.insuranceData.coverage == "Primary" ||
                                dataForCMS1500_2.insuranceData.coverage == "Secondary")) {
                            rendering_taxonomy = "taxonomy" in dataForCMS1500_2.renderingProviderData
                                ? dataForCMS1500_2.renderingProviderData.taxonomy
                                : "";
                            billing_taxonomy = "ZZ";
                            billing_taxonomy +=
                                "taxonomy" in dataForCMS1500_2.billingProviderData
                                    ? dataForCMS1500_2.billingProviderData.taxonomy
                                    : "";
                            form_2.getTextField("grp").setText(billing_taxonomy);
                            form_2.getTextField("emg1").setText("ZZ");
                            form_2.getTextField("local1a").setText(rendering_taxonomy);
                            upperLineBillingProvider = "PRV*BI*PXC*".concat("taxonomy" in dataForCMS1500_2.billingProviderData
                                ? dataForCMS1500_2.billingProviderData.taxonomy
                                : "", "~");
                            lowerLineRenderingProvider = "PRV*PE*PXC*".concat("taxonomy" in dataForCMS1500_2.renderingProviderData
                                ? dataForCMS1500_2.renderingProviderData.taxonomy
                                : "", "~");
                            // form.getTextField("local1").setText("a");
                            // form.getTextField("local2a").setText("v");
                            // form.getTextField("local2").setText("c");
                            // form.getTextField("local3a").setText("d");
                            // form.getTextField("local4a").setText("e");
                            // form.getTextField("local3").setText("f");
                            // form.getTextField("local5a").setText("g");
                            // form.getTextField("local5").setText("h");
                            // form.getTextField("local6a").setText("u");
                            // form.getTextField("local6").setText("k");
                        }
                        form_2.getTextField("tax_id").setText(tax_id);
                        form_2.getTextField("pt_account").setText(pt_account);
                        form_2.getTextField("amt_paid").setText(amt_paid);
                        form_2.getTextField("t_charge").setText(t_charge);
                        form_2.getTextField("physician_signature").setText(physician_signature);
                        form_2.getTextField("physician_date").setText(physician_date);
                        form_2.getTextField("fac_street").setText(fac_street);
                        form_2.getTextField("fac_location").setText(fac_location);
                        form_2
                            .getTextField("pin1")
                            .setText(dataForCMS1500_2.renderingProviderData.npiNo.toUpperCase());
                        // form.getTextField('doc_phone area').setText('2Z')
                        // form.getTextField('doc_phone').setText('4P')
                        form_2.getTextField("doc_street").setText(doc_street);
                        form_2.getTextField("doc_location").setText(doc_location);
                        form_2
                            .getTextField("pin")
                            .setText(dataForCMS1500_2.billingProviderData.npiNo.toUpperCase());
                        //form.getTextField("pin").setText(pin);
                        form_2.getTextField("original_ref").setText(original_ref);
                        form_2.getTextField("doc_name").setText(doc_name);
                        form_2.getTextField("fac_name").setText(fac_name);
                        form_2.getTextField("doc_phone area").setText(doc_phone_area.toString());
                        form_2.getTextField("doc_phone").setText(doc_phone.toString());
                        form_2.getTextField("99icd").setText("0");
                        if (medicaid_resub != 1 || medicaid_resub != "1") {
                            form_2.getTextField("medicaid_resub").setText(medicaid_resub);
                            if (dataForCMS1500_2.insuranceData.eapData &&
                                "authNumber" in dataForCMS1500_2.insuranceData.eapData) {
                                form_2
                                    .getTextField("prior_auth")
                                    .setText(dataForCMS1500_2.insuranceData.eapData.authNumber);
                            }
                        }
                        // if (dataForCMS1500.insuranceData.eapData) {
                        // } else {
                        // }
                        // ? DUMMY VALUES START
                        // form.getCheckBox('276').check()
                        // form.getCheckBox('sex').check() // '/M', '/F'
                        // form.getCheckBox('lab').check() // '/YES', '/NO'
                        // form.getCheckBox('ssn').check() // '/SSN', '/EIN'
                        // form.getCheckBox('employment').check() // '/YES', '/NO'
                        // form.getCheckBox('ins_sex').check() // '/MALE', '/FEMALE'
                        // form.getCheckBox('assignment').check('NO') // '/YES', '/NO'
                        // form.getCheckBox('other_accident').check() // '/YES', '/NO'
                        // form.getCheckBox('pt_auto_accident').check() // '/YES', '/NO'
                        // form.getCheckBox('ins_benefit_plan').check() // '/YES', '/NO'
                        // form.getCheckBox('rel_to_ins').check() // '/S', '/M', '/C', 'O'
                        // form.getCheckBox('insurance_type').check() // '/Medicare', '/Medicaid', '/Tricare', '/Champva', '/Group', '/Feca', '/Other'
                        // ? DUMMY VALUES END
                        // form.getCheckBox('insurance_type').check()
                        console.log("!!!!!!!!!!!!!!!", dataForCMS1500_2.insuranceData.insurance_plan_type);
                        insuranceType_box = createPDFAcroFields(form_2.getCheckBox("insurance_type").acroField.Kids()).map(function (_) { return _[0]; }), insuranceType_value = dataForCMS1500_2.insuranceData.insurance_plan_type;
                        insuranceTypeLoop: for (i = 0; i < insuranceType_box.length; i++) {
                            checkBox = insuranceType_box[i];
                            if (insuranceType_value == "MB" &&
                                checkBox.getOnValue().encodedName === "/Medicare") {
                                checkBox.setValue(checkBox.getOnValue());
                                break insuranceTypeLoop;
                            }
                            console.log("insuranceType_value == MC ", checkBox.getOnValue().encodedName);
                            if (insuranceType_value == "MC" &&
                                checkBox.getOnValue().encodedName === "/Medicaid") {
                                checkBox.setValue(checkBox.getOnValue());
                                break insuranceTypeLoop;
                            }
                            if (insuranceType_value == "CI" &&
                                checkBox.getOnValue().encodedName === "/Other") {
                                checkBox.setValue(checkBox.getOnValue());
                                break insuranceTypeLoop;
                            }
                        }
                        assignment_box = createPDFAcroFields(form_2.getCheckBox("assignment").acroField.Kids()).map(function (_) { return _[0]; }), assignment_value = dataForCMS1500_2.accept_assignment ? "A" : "C";
                        assignmentLoop: for (i = 0; i < assignment_box.length; i++) {
                            checkBox = assignment_box[i];
                            if (assignment_value == "A" &&
                                checkBox.getOnValue().encodedName === "/YES") {
                                checkBox.setValue(checkBox.getOnValue());
                                break assignmentLoop;
                            }
                            if (assignment_value == "C" &&
                                checkBox.getOnValue().encodedName === "/NO") {
                                checkBox.setValue(checkBox.getOnValue());
                                break assignmentLoop;
                            }
                        }
                        subscriber_gender_box = createPDFAcroFields(form_2.getCheckBox("ins_sex").acroField.Kids()).map(function (_) { return _[0]; }), subscriber_gender_value = dataForCMS1500_2.insuranceData.subscriber_gender == "M"
                            ? "Male"
                            : "Female";
                        subGenderLoop: for (i = 0; i < subscriber_gender_box.length; i++) {
                            checkBox = subscriber_gender_box[i];
                            if (subscriber_gender_value == "Male" &&
                                checkBox.getOnValue().encodedName === "/MALE") {
                                checkBox.setValue(checkBox.getOnValue());
                                break subGenderLoop;
                            }
                            if (subscriber_gender_value == "Female" &&
                                checkBox.getOnValue().encodedName === "/FEMALE") {
                                checkBox.setValue(checkBox.getOnValue());
                                break subGenderLoop;
                            }
                        }
                        ssn_box = createPDFAcroFields(form_2.getCheckBox("ssn").acroField.Kids()).map(function (_) { return _[0]; });
                        ssn_box[1].setValue(ssn_box[1].getOnValue());
                        rel_to_ins_box = createPDFAcroFields(form_2.getCheckBox("rel_to_ins").acroField.Kids()).map(function (_) { return _[0]; }), rel_to_ins_value = dataForCMS1500_2.insuranceData.relationship;
                        console.log(rel_to_ins_value, "rel to insures");
                        rel_to_insLoop: for (i = 0; i < rel_to_ins_box.length; i++) {
                            checkBox = rel_to_ins_box[i];
                            //18,01,19
                            if (rel_to_ins_value == "Self" &&
                                checkBox.getOnValue().encodedName === "/S") {
                                checkBox.setValue(checkBox.getOnValue());
                                break rel_to_insLoop;
                            }
                            if (rel_to_ins_value == "Spouse" &&
                                checkBox.getOnValue().encodedName === "/M") {
                                checkBox.setValue(checkBox.getOnValue());
                                break rel_to_insLoop;
                            }
                            if (rel_to_ins_value == "Child" &&
                                checkBox.getOnValue().encodedName === "/C") {
                                checkBox.setValue(checkBox.getOnValue());
                                break rel_to_insLoop;
                            }
                            if (checkBox.getOnValue().encodedName === "/O") {
                                checkBox.setValue(checkBox.getOnValue());
                                break rel_to_insLoop;
                            }
                        }
                        patient_gender_box = createPDFAcroFields(form_2.getCheckBox("sex").acroField.Kids()).map(function (_) { return _[0]; }), patient_gender_value = dataForCMS1500_2.patientData.gender == "M" ? "Male" : "Female";
                        patientGenderLoop: for (i = 0; i < patient_gender_box.length; i++) {
                            checkBox = patient_gender_box[i];
                            if (patient_gender_value == "Male" &&
                                checkBox.getOnValue().encodedName === "/M") {
                                checkBox.setValue(checkBox.getOnValue());
                                break patientGenderLoop;
                            }
                            if (patient_gender_value == "Female" &&
                                checkBox.getOnValue().encodedName === "/F") {
                                checkBox.setValue(checkBox.getOnValue());
                                break patientGenderLoop;
                            }
                        }
                        employment_box = createPDFAcroFields(form_2.getCheckBox("employment").acroField.Kids()).map(function (_) { return _[0]; });
                        for (i = 0; i < employment_box.length; i++) {
                            if (employment_box[i].getOnValue().encodedName === "/NO") {
                                employment_box[i].setValue(employment_box[i].getOnValue());
                            }
                        }
                        other_accident_box = createPDFAcroFields(form_2.getCheckBox("other_accident").acroField.Kids()).map(function (_) { return _[0]; });
                        for (i = 0; i < other_accident_box.length; i++) {
                            if (other_accident_box[i].getOnValue().encodedName === "/NO") {
                                other_accident_box[i].setValue(other_accident_box[i].getOnValue());
                            }
                        }
                        pt_auto_accident_box = createPDFAcroFields(form_2.getCheckBox("pt_auto_accident").acroField.Kids()).map(function (_) { return _[0]; });
                        for (i = 0; i < pt_auto_accident_box.length; i++) {
                            if (pt_auto_accident_box[i].getOnValue().encodedName === "/NO") {
                                pt_auto_accident_box[i].setValue(pt_auto_accident_box[i].getOnValue());
                            }
                        }
                        /**
                            ? Code by Charanjit
                            const kids = createPDFAcroFields(form.getCheckBox('insurance_type').acroField. Kids()).map((_) => _[0])
                            kids.forEach((kid) => {
                              console.log(kid.getOnValue().encodedName)
                              if (kid.getOnValue().encodedName === '/Tricare') {
                                //console.log('in true')
                                kid.setValue(kid.getOnValue()) // Check that particular checkbox.
                              } else {
                                kid.setValue(PDFName.of('Off')) // Uncheck the checkbox
                              }
                            })
                          */
                        form_2.getFields().forEach(function (field) { return field.enableReadOnly(); });
                        return [4 /*yield*/, pdfDoc.save()];
                    case 7:
                        pdfBytes = _d.sent();
                        return [4 /*yield*/, fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../../../../public/upload/billing/CMS/CMS_".concat(dataForCMS1500_2.appointment_id.toString(), ".pdf")), pdfBytes)];
                    case 8:
                        _d.sent();
                        getGender = function (value) {
                            var gender;
                            switch (value) {
                                case "Male":
                                    gender = "M";
                                    break;
                                case "Female":
                                    gender = "F";
                                    break;
                                default:
                                    gender = "O";
                                    break;
                            }
                            return gender;
                        };
                        stirngAfterClaim = "";
                        if (dataForCMS1500_2.insuranceData.eapData &&
                            "authNumber" in dataForCMS1500_2.insuranceData.eapData &&
                            (medicaid_resub != 1 || medicaid_resub != "1")) {
                            //stirngAfterClaim = `REF*G1*${dataForCMS1500.insuranceData.eapData.authNumber}`;
                            stirngAfterClaim =
                                "CLM*".concat(pt_account, "*").concat(dataForCMS1500_2.insurancePortion, "***").concat(dataForCMS1500_2.place_of_service, ":B:").concat(medicaid_resub, "*Y*").concat(dataForCMS1500_2.accept_assignment ? "A" : "C", "*Y*Y~") +
                                    "\n" +
                                    "REF*G1*".concat(dataForCMS1500_2.insuranceData.eapData.authNumber, "~") +
                                    "\n" +
                                    "REF*F8*".concat(dataForCMS1500_2.original_ref_no, "~");
                        }
                        else if (medicaid_resub != 1 || medicaid_resub != "1") {
                            stirngAfterClaim =
                                "CLM*".concat(pt_account, "*").concat(dataForCMS1500_2.insurancePortion, "***").concat(dataForCMS1500_2.place_of_service, ":B:").concat(medicaid_resub, "*Y*").concat(dataForCMS1500_2.accept_assignment ? "A" : "C", "*Y*Y~") +
                                    "\n" +
                                    "REF*F8*".concat(dataForCMS1500_2.original_ref_no, "~");
                        }
                        else {
                            //stirngAfterClaim = `REF*F8*${dataForCMS1500.original_ref_no}`;
                            stirngAfterClaim = "CLM*".concat(pt_account, "*").concat(dataForCMS1500_2.insurancePortion, "***").concat(dataForCMS1500_2.place_of_service, ":B:").concat(medicaid_resub, "*Y*").concat(dataForCMS1500_2.accept_assignment ? "A" : "C", "*Y*Y~");
                        }
                        cptArray_2 = [];
                        //"${el.cptCodeEl.cptCode}*${el.cptCodeEl.price}*UN*${el.unit}";
                        ///////////////////////
                        //el.modifier.forEach((m, j) => {
                        //////////////////////////
                        dataForCMS1500_2.appliedCptCodes.forEach(function (el, i) {
                            var cptLine = "";
                            var cptCodeEl = dataForCMS1500_2.cptCodeData.filter(function (el1) { return el1._id.toString() == el.cpt_code_id.toString(); })[0];
                            el.cptCodeEl = cptCodeEl;
                            cptLine += cptCodeEl.cptCode;
                            el.modifier.forEach(function (m, j) {
                                //m.toString();
                                var foundModifier = dataForCMS1500_2.modifierData.find(function (o) { return o._id.toString() == m.toString(); });
                                //console.log(foundModifier);
                                if (foundModifier) {
                                    //if (j > 0)
                                    cptLine += ":" + foundModifier.modifierCode;
                                    // else
                                    //   cptLine += cptCodeEl.cptCode + ":" + foundModifier.modifierCode;
                                }
                            });
                            cptLine += "*" + cptCodeEl.price + "*UN*" + el.unit;
                            cptLine.replace(",", "");
                            cptArray_2.push(cptLine);
                            // cptLine +=
                            //   cptCodeEl.cptCode +
                            //   ":" +
                            //   foundModifier.modifierCode +
                            //   "*" +
                            //   cptCodeEl.price +
                            //   "*UN*" +
                            //   cptCodeEl.unit;
                            //cptCodeForEDI.push(cptLine);
                        });
                        modifiedcpt_2 = "";
                        cptArray_2.forEach(function (e, i) {
                            modifiedcpt_2 +=
                                "LX*".concat(i + 1, "~") +
                                    "\n" +
                                    "SV1*HC:" +
                                    e +
                                    "***1~" +
                                    "\n" +
                                    "DTP*472*D8*" +
                                    momentTimeZone
                                        .tz(dataForCMS1500_2.startDateTime, "America/Los_Angeles")
                                        .format("YYYYMMDD");
                            if (i != cptArray_2.length - 1)
                                modifiedcpt_2 += "~" + "\n";
                        });
                        subscriberGender = dataForCMS1500_2.insuranceData.subscriber_gender;
                        icdCodes_2 = "";
                        dataForCMS1500_2.ICD_10.forEach(function (el, i) {
                            icdCodes_2 +=
                                i == 0
                                    ? "ABK:" + el.ictCode.replace(".", "")
                                    : "*ABF:" + el.ictCode.replace(".", "");
                        });
                        console.log(icdCodes_2);
                        icdCodes_2.replace(",", "");
                        relationshipEDI = "18";
                        if (dataForCMS1500_2.insuranceData.relationship == "Self") {
                            relationshipEDI = "18";
                        }
                        else if (dataForCMS1500_2.insuranceData.relationship == "Spouse") {
                            relationshipEDI = "01";
                        }
                        else if (dataForCMS1500_2.insuranceData.relationship == "Child") {
                            relationshipEDI = "19";
                        }
                        else {
                            relationshipEDI = "G8";
                        }
                        NM1_85_line = "";
                        if (upperLineBillingProvider != "") {
                            NM1_85_line =
                                upperLineBillingProvider +
                                    "\n" +
                                    "NM1*85*2*".concat(dataForCMS1500_2.clinicData.clinic_name, "*****XX*").concat(pin);
                        }
                        else {
                            NM1_85_line = "NM1*85*2*".concat(dataForCMS1500_2.clinicData.clinic_name, "*****XX*").concat(pin);
                        }
                        NM1_82_line = "";
                        if (lowerLineRenderingProvider != "") {
                            NM1_82_line =
                                "NM1*DN*1*".concat(dataForCMS1500_2.doctorData.last_name.toUpperCase(), "*").concat(dataForCMS1500_2.doctorData.first_name.toUpperCase(), "****XX*").concat(dataForCMS1500_2.doctorData.npiNo.toUpperCase(), "~") +
                                    "\n" +
                                    "NM1*82*1*".concat(dataForCMS1500_2.renderingProviderData.last_name.toUpperCase(), "*").concat(dataForCMS1500_2.renderingProviderData.first_name.toUpperCase(), "****XX*").concat(dataForCMS1500_2.renderingProviderData.npiNo.toUpperCase(), "~") +
                                    "\n" +
                                    lowerLineRenderingProvider;
                        }
                        else {
                            NM1_82_line =
                                "NM1*DN*1*".concat(dataForCMS1500_2.doctorData.last_name.toUpperCase(), "*").concat(dataForCMS1500_2.doctorData.first_name.toUpperCase(), "****XX*").concat(dataForCMS1500_2.doctorData.npiNo.toUpperCase(), "~") +
                                    "\n" +
                                    "NM1*82*1*".concat(dataForCMS1500_2.renderingProviderData.last_name.toUpperCase(), "*").concat(dataForCMS1500_2.renderingProviderData.first_name.toUpperCase(), "****XX*").concat(dataForCMS1500_2.renderingProviderData.npiNo.toUpperCase(), "~");
                        }
                        locationZipCode = dataForCMS1500_2.locationData.postal_code.toUpperCase(), locationStateCode = dataForCMS1500_2.locationData.state.toUpperCase(), locationAddress = dataForCMS1500_2.locationData.address.toUpperCase(), locationCity = dataForCMS1500_2.locationData.city.toUpperCase(), providerFN = dataForCMS1500_2.renderingProviderData.first_name.toUpperCase(), providerLN = dataForCMS1500_2.renderingProviderData.last_name.toUpperCase(), providerCity = dataForCMS1500_2.doctorData.city.toUpperCase(), subscriberPayerId = dataForCMS1500_2.insuranceData.payer_id.toUpperCase(), ediDataObject = {
                            applicationReceiverId: "ECGCLAIMS",
                            groupControlNumber: generateRandomNumber(9),
                            // 'EPIPHANY COUNSELING CONSULTING AND TREATMENT SERVICES'
                            // interchange
                            interchangeDateYYMMDD: (0, moment_1.default)(new Date()).format("YYMMDD"),
                            interchangeDate: (0, moment_1.default)(new Date()).format("YYYYMMDD"),
                            interchangeTime: (0, moment_1.default)(new Date()).format("hhmm"),
                            //interchangeControlNumber: Math.floor(Math.random() * 1000000000),
                            interchangeControlNumber: generateRandomNumber(9),
                            // provider
                            providerFN: providerFN,
                            providerLN: providerLN,
                            providerNPI: dataForCMS1500_2.renderingProviderData.npiNo.toUpperCase(),
                            NM1_85_line: NM1_85_line,
                            NM1_82_line: NM1_82_line,
                            // providerAddress,
                            // providerCity,
                            // providerStateCode,
                            // providerZipCode,
                            // location
                            locationCity: locationCity,
                            locationZipCode: locationZipCode,
                            locationAddress: locationAddress,
                            locationNPI: pin,
                            locationStateCode: locationStateCode,
                            locationFedID: tax_id,
                            stirngAfterClaim: stirngAfterClaim,
                            // subscriber
                            subscriberRelationship: relationshipEDI,
                            subscriberLN: dataForCMS1500_2.insuranceData.subscriber_last_name.toUpperCase(),
                            subscriberFN: dataForCMS1500_2.insuranceData.subscriber_first_name.toUpperCase(),
                            subscriberAddress: dataForCMS1500_2.insuranceData.subscriber_address.toUpperCase(),
                            subscriberCity: dataForCMS1500_2.insuranceData.subscriber_city.toUpperCase(),
                            subscriberStateCode: dataForCMS1500_2.insuranceData.stateData.stateCode.toUpperCase(),
                            subscriberZipCode: dataForCMS1500_2.insuranceData.subscriber_zip_code.toUpperCase(),
                            //subscriberZipCode: "HH",
                            subscriberDOB: (0, moment_1.default)(dataForCMS1500_2.insuranceData.date_of_birth).format("YYYYMMDD"),
                            subscriberGender: subscriberGender,
                            subscriberPayerId: subscriberPayerId,
                            // insurance
                            insuranceType: dataForCMS1500_2.insuranceData.coverage.substring(0, 1),
                            insurancePlanType: dataForCMS1500_2.insuranceData.insurance_plan_type,
                            insuranceName: insurance_name,
                            insuranceAddress: insurance_address,
                            insuranceCity: dataForCMS1500_2.insuranceData.insurance_city.toUpperCase(),
                            insuranceStateCode: dataForCMS1500_2.insuranceData.stateData.stateCode.toUpperCase(),
                            insuranceZipCode: dataForCMS1500_2.insuranceData.insurance_zip_code.toUpperCase(),
                            // patient
                            patientID: pt_account,
                            patientLN: dataForCMS1500_2.patientData.last_name,
                            patientSSN: dataForCMS1500_2.patientData.SSN,
                            patientFN: dataForCMS1500_2.patientData.first_name,
                            patientMN: dataForCMS1500_2.patientData.middle_name,
                            patientAddress: pt_street,
                            patientCity: pt_city,
                            patientStateCode: pt_state,
                            patientZipCode: pt_zip,
                            patientDOB: (0, moment_1.default)(dataForCMS1500_2.patientData.date_of_birth).format("YYYYMMDD"),
                            // patientGender: getGender(
                            //   dataForCMS1500.patientData.gender == "M" ? "Male" : "Female"
                            // ),
                            patientGender: dataForCMS1500_2.patientData.gender,
                            // Appointment
                            DOS: momentTimeZone
                                .tz(dataForCMS1500_2.startDateTime, "America/Los_Angeles")
                                .format("YYYYMMDD"),
                            // Other
                            orignalRefNo: original_ref,
                            icdCodes: icdCodes_2,
                            cptArray: cptArray_2,
                            modifiedcpt: modifiedcpt_2,
                            //let cptArray: string[] = [];,
                            //icdCodes: dataForCMS1500.ICD_10,
                            resubmissionCode: medicaid_resub,
                            cptCodes: dataForCMS1500_2.appliedCptCodes,
                            placeOfService: dataForCMS1500_2.place_of_service,
                            acceptAssignment: dataForCMS1500_2.accept_assignment ? "A" : "C",
                            totalChargeAmount: dataForCMS1500_2.insurancePortion,
                            billingProvider: dataForCMS1500_2.billingProviderData.first_name.toUpperCase() +
                                " " +
                                dataForCMS1500_2.billingProviderData.last_name.toUpperCase(),
                            clinic_name: dataForCMS1500_2.clinicData.clinic_name,
                        };
                        ediString = require("../../../../../healthform/EDI_TEXT").ediTemplateText(ediDataObject);
                        ediString = ediString.replace("{{LINES_COUNT}}", ediString.split("\n").length - 4);
                        return [4 /*yield*/, fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../../../../public/upload/billing/EDI/EDI_" +
                                dataForCMS1500_2.appointment_id.toString()), ediString)];
                    case 9:
                        _d.sent();
                        return [2 /*return*/, {
                                success: true,
                                data: {
                                    EDI: "http://".concat(req.host, ":").concat(process.env.PORT) +
                                        "/upload/billing/EDI/EDI_" +
                                        dataForCMS1500_2.appointment_id,
                                    CMS: "http://".concat(req.host, ":").concat(process.env.PORT) +
                                        "/upload/billing/CMS/CMS_" +
                                        dataForCMS1500_2.appointment_id +
                                        ".pdf",
                                },
                                status_code: http_status_codes_1.default.OK,
                            }];
                    case 10: return [2 /*return*/, {
                            success: false,
                            status_code: http_status_codes_1.default.NOT_FOUND,
                            data: {
                                message: erros_message_1.default.NO_RECORD_FOUND,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                        }];
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        error_10 = _d.sent();
                        next(error_10);
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        }); };
    }
    return BillingPaymentServices;
}());
function generateRandomNumber(length) {
    var number = Math.floor(Math.random() * 1000000000);
    var str = "" + number;
    while (str.length < length) {
        str = "0" + str;
    }
    return str;
}
exports.default = new BillingPaymentServices();
