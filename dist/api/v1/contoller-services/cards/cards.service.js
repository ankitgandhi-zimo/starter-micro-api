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
exports.EnumRoles = void 0;
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var erros_message_1 = __importDefault(require("../../common/erros_message"));
var history_model_1 = __importStar(require("../../models/history.model"));
var billing_payment_model_1 = __importDefault(require("../../models/billing_payment.model"));
var cards_model_1 = __importDefault(require("../../models/cards.model"));
var patient_model_1 = __importDefault(require("../../models/patient.model"));
var EnumRoles;
(function (EnumRoles) {
    EnumRoles["SUPERADMIN"] = "superadmin";
})(EnumRoles = exports.EnumRoles || (exports.EnumRoles = {}));
var PRIVATE__STRIPE = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
var PUBLIC__STRIPE = require("stripe")(process.env.STRIPE_PUBLIC_KEY);
var CardsServices = /** @class */ (function () {
    function CardsServices() {
        var _this = this;
        this.addCard = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, foundpatient, number, exp_year, exp_month, cardHolderName, patient_id, clinic_id, cvc, patientCardsCount, _a, tokenId, card, client_ip, customer, response, addHistory, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 9, , 10]);
                        userDetails = req.user;
                        return [4 /*yield*/, patient_model_1.default.findById(model.patient_id)];
                    case 1:
                        foundpatient = _b.sent();
                        if (!foundpatient)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.PATIENT_DETAILS_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        number = model.number, exp_year = model.exp_year, exp_month = model.exp_month, cardHolderName = model.cardHolderName, patient_id = model.patient_id, clinic_id = model.clinic_id, cvc = model.cvc;
                        return [4 /*yield*/, cards_model_1.default.countDocuments({
                                patient_id: patient_id,
                                clinic_id: clinic_id,
                            })];
                    case 2:
                        patientCardsCount = _b.sent();
                        if (patientCardsCount >= erros_message_1.default.cardMsg.limit)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.cardMsg.limitExceed(erros_message_1.default.cardMsg.limit),
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        return [4 /*yield*/, PUBLIC__STRIPE.tokens.create({
                                card: {
                                    number: number,
                                    exp_month: exp_month,
                                    exp_year: exp_year,
                                    cvc: cvc,
                                    name: cardHolderName,
                                    metadata: { clinic_id: model.clinic_id },
                                },
                            })];
                    case 3:
                        _a = _b.sent(), tokenId = _a.id, card = _a.card, client_ip = _a.client_ip;
                        return [4 /*yield*/, PRIVATE__STRIPE.customers.create({
                                source: tokenId,
                                name: patient_id,
                            })];
                    case 4:
                        customer = _b.sent();
                        return [4 /*yield*/, cards_model_1.default.create({
                                client_ip: client_ip,
                                patient_id: model.patient_id,
                                cardId: card.id,
                                clinic_id: clinic_id,
                                createdby_id: userDetails._id,
                                token: customer.id,
                            })];
                    case 5:
                        response = _b.sent();
                        if (!response) return [3 /*break*/, 7];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "Card added successfully",
                                type: history_model_1.EHistoryActivityTypeValues.PATIENT,
                                type_id: model.patient_id,
                            })];
                    case 6:
                        addHistory = _b.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: response,
                            }];
                    case 7: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ADD_CARD,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                        }];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        this.getCardDetails = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var foundCardDetails, card, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, cards_model_1.default.findOne({
                                cardId: model.card_id,
                            })];
                    case 1:
                        foundCardDetails = _a.sent();
                        if (!foundCardDetails) return [3 /*break*/, 3];
                        return [4 /*yield*/, PRIVATE__STRIPE.customers.retrieveSource(foundCardDetails.token, //patientDoc.customer_id_stripe,
                            model.card_id)];
                    case 2:
                        card = _a.sent();
                        if (!card)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.cardMsg.notFound,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: {
                                    client_ip: foundCardDetails.client_ip,
                                    id: card.id,
                                    brand: card.brand,
                                    last4: card.last4,
                                    funding: card.funding,
                                    cardHolderName: card.name,
                                    clinic_id: foundCardDetails.clinic_id,
                                    patient_id: foundCardDetails.patient_id,
                                    // metadata: card.metadata,
                                },
                            }];
                    case 3: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.cardMsg.notFound,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        console.log(error_2.response, "liiiii");
                        next(error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.deleteCardDetails = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, foundCardDetails, deletionResult, patientDoc, deleted, addHistory, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        userDetails = req.user;
                        return [4 /*yield*/, cards_model_1.default.findOne({
                                cardId: model.card_id,
                            })];
                    case 1:
                        foundCardDetails = _a.sent();
                        if (!!foundCardDetails) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                data: {
                                    message: erros_message_1.default.cardMsg.notFound,
                                    error: erros_message_1.default.ON_FETCH_ERROR,
                                },
                            }];
                    case 2: return [4 /*yield*/, cards_model_1.default.deleteOne({
                            cardId: model.card_id,
                        })];
                    case 3:
                        deletionResult = _a.sent();
                        if (!(deletionResult &&
                            deletionResult.deletedCount > 0)) return [3 /*break*/, 6];
                        patientDoc = (foundCardDetails.patient_id);
                        return [4 /*yield*/, PRIVATE__STRIPE.customers.deleteSource(foundCardDetails.token, model.card_id)];
                    case 4:
                        deleted = _a.sent();
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "Card details deleted successfully",
                                type: history_model_1.EHistoryActivityTypeValues.PATIENT,
                                type_id: foundCardDetails.patient_id,
                            })];
                    case 5:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.cardMsg.deleted,
                            }];
                    case 6: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.cardMsg.deletionError,
                                error: erros_message_1.default.ON_DELETE_ERROR,
                            },
                        }];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.getCardList = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var condition, cardsList, response_1, error_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        condition = {
                            patient_id: model.patient_id,
                            clinic_id: model.clinic_id,
                        };
                        return [4 /*yield*/, cards_model_1.default.find(condition)];
                    case 1:
                        cardsList = _a.sent();
                        if (!(cardsList && cardsList.length > 0)) return [3 /*break*/, 3];
                        response_1 = [];
                        return [4 /*yield*/, Promise.all(cardsList.map(function (el) { return __awaiter(_this, void 0, void 0, function () {
                                var card, tempObj;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, PRIVATE__STRIPE.customers.retrieveSource(el.token, //patientDoc.customer_id_stripe,
                                            el.cardId)];
                                        case 1:
                                            card = _a.sent();
                                            tempObj = {
                                                id: card.id,
                                                brand: card.brand,
                                                last4: card.last4,
                                                funding: card.funding,
                                                cardHolderName: card.name,
                                                // clinic_id: model.clinic_id,
                                                // patient_id: model.patient_id
                                            };
                                            response_1.push(tempObj);
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                data: { data: response_1 },
                                success: true,
                            }];
                    case 3: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.cardMsg.CARD_LIST_NOT_FOUND,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.chargeByPatientCards = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, foundCardDetails, chargeObj, result_1, paymentObj, addPaymentRecord, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        userDetails = req.user;
                        return [4 /*yield*/, cards_model_1.default.findOne({
                                cardId: model.card_id,
                            })];
                    case 1:
                        foundCardDetails = _a.sent();
                        if (!foundCardDetails) return [3 /*break*/, 5];
                        if (!foundCardDetails || !foundCardDetails.cardId)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.cardMsg.notFound,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        chargeObj = {};
                        chargeObj = {
                            customer: foundCardDetails.token,
                            amount: model.amount * 100,
                            currency: "USD",
                            // shipping: {
                            //   address: {
                            //     line1: "Chennai",
                            //     city: "CA",
                            //     country: "US",
                            //     postal_code: 98140,
                            //   },
                            //   name: "Dravid Json",
                            // },
                        };
                        console.log(chargeObj, "chargeObj");
                        if (model.email)
                            chargeObj.receipt_email = model.email;
                        return [4 /*yield*/, PRIVATE__STRIPE.charges
                                .create(chargeObj)
                                .then(function (data) {
                                result_1 = data;
                                // console.log(result, "dta");
                                return {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: data,
                                };
                            })
                                .catch(function (error) {
                                result_1 = error;
                                console.log("result  ", JSON.stringify(error));
                                return {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        messgae: error.raw.message,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                };
                            })];
                    case 2:
                        _a.sent();
                        if (!(result_1 && result_1.raw && result_1.raw.message)) return [3 /*break*/, 3];
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                data: {
                                    message: result_1.raw.message,
                                    error: erros_message_1.default.ON_FETCH_ERROR,
                                },
                            }];
                    case 3:
                        paymentObj = {
                            mode: "CARD",
                            remark: "",
                            amount: model.amount,
                            clinic_id: null,
                            patient_id: model.patient_id,
                            createdby_id: userDetails._id,
                            appointment_id: null,
                            method: "ADVANCE",
                            batchNumber: Date.now(),
                            chargeId: result_1 && result_1.id ? result_1.id : "",
                        };
                        return [4 /*yield*/, billing_payment_model_1.default.create(paymentObj)];
                    case 4:
                        addPaymentRecord = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: result_1,
                            }];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_5 = _a.sent();
                        console.log(error_5, "herejhjhh");
                        next(error_5);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
    }
    return CardsServices;
}());
exports.default = new CardsServices();
