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
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var mongoose_1 = __importDefault(require("mongoose"));
var erros_message_1 = __importDefault(require("../../common/erros_message"));
var history_model_1 = __importStar(require("../../models/history.model"));
var payment_gateway_model_1 = __importDefault(require("../../models/payment_gateway.model"));
var PUBLIC__STRIPE = require("stripe")(process.env.STRIPE_PUBLIC_KEY);
var PaymentGatewayServices = /** @class */ (function () {
    function PaymentGatewayServices() {
        var _this = this;
        this.addPaymentGateway = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, modelToSave, response, addHistory, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        userDetails = req.user;
                        modelToSave = model;
                        return [4 /*yield*/, payment_gateway_model_1.default.create(modelToSave)];
                    case 1:
                        response = _a.sent();
                        if (!response) return [3 /*break*/, 3];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "payment gateway added successfully",
                                type: history_model_1.EHistoryActivityTypeValues.CLINIC,
                                type_id: model.clinic_id,
                            })];
                    case 2:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: response,
                            }];
                    case 3: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ADD_PAYMENT_GATEWAY,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                        }];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getPaymentGatewayDetails = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var foundPaymentGateway, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, payment_gateway_model_1.default.findOne({
                                _id: new mongoose_1.default.Types.ObjectId(req.params._id),
                                isDeleted: false,
                            }, {
                                isDeleted: 0,
                                createdAt: 0,
                                updatedAt: 0,
                                __v: 0,
                            })];
                    case 1:
                        foundPaymentGateway = _a.sent();
                        if (foundPaymentGateway) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: foundPaymentGateway,
                                }];
                        }
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.PAYMENT_GATEWAY_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deletePaymentGatewayDetails = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var foundClinic, clinicDeletionResult, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, payment_gateway_model_1.default.findById(req.params._id, {})];
                    case 1:
                        foundClinic = _a.sent();
                        if (!foundClinic) return [3 /*break*/, 3];
                        return [4 /*yield*/, payment_gateway_model_1.default.updateOne({ _id: req.params._id }, { isDeleted: true })];
                    case 2:
                        clinicDeletionResult = _a.sent();
                        if (clinicDeletionResult && clinicDeletionResult.modifiedCount > 0)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: erros_message_1.default.DELETE_SUCCESSFULL,
                                }];
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_DELETION_PAYMENT_GATEWAY,
                                        error: erros_message_1.default.ON_DELETE_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 4];
                    case 3: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.PAYMENT_GATEWAY_NOT_FOUND,
                                error: erros_message_1.default.ON_DELETE_ERROR,
                            },
                        }];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getPaymentGatewayList = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var foundPaymentGatewayList, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, payment_gateway_model_1.default.find({
                                clinic_id: new mongoose_1.default.Types.ObjectId(req.params._id),
                                isDeleted: false,
                            }, {
                                isDeleted: 0,
                                createdAt: 0,
                                updatedAt: 0,
                                __v: 0,
                            })];
                    case 1:
                        foundPaymentGatewayList = _a.sent();
                        if (foundPaymentGatewayList && foundPaymentGatewayList.length > 0) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: foundPaymentGatewayList,
                                }];
                        }
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.PAYMENT_GATEWAY_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.verifyPaymentGatewayDetails = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, foundPaymentGateway, stripe, token, stripe1, token1, updateGatewayAccount, addHistory, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 10, , 11]);
                        userDetails = req.user;
                        return [4 /*yield*/, payment_gateway_model_1.default.findOne({
                                _id: new mongoose_1.default.Types.ObjectId(req.params._id),
                                isDeleted: false,
                            }, {
                                isDeleted: 0,
                                createdAt: 0,
                                updatedAt: 0,
                                __v: 0,
                            })];
                    case 1:
                        foundPaymentGateway = _a.sent();
                        if (!foundPaymentGateway) return [3 /*break*/, 8];
                        stripe = require("stripe")(foundPaymentGateway.public_key);
                        return [4 /*yield*/, stripe.tokens.create({
                                person: {
                                    first_name: "Account",
                                    last_name: "verification",
                                    relationship: { owner: true },
                                },
                            })];
                    case 2:
                        token = _a.sent();
                        console.log(token, "token");
                        stripe1 = require("stripe")(foundPaymentGateway.secret_key);
                        return [4 /*yield*/, stripe1.tokens.create({
                                person: {
                                    first_name: "Account",
                                    last_name: "verification",
                                    relationship: { owner: true },
                                },
                            })];
                    case 3:
                        token1 = _a.sent();
                        if (!(token && token1)) return [3 /*break*/, 6];
                        return [4 /*yield*/, payment_gateway_model_1.default.updateOne({
                                _id: new mongoose_1.default.Types.ObjectId(req.params._id),
                            }, { isVerified: true })];
                    case 4:
                        updateGatewayAccount = _a.sent();
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "payment gateway verified successfully",
                                type: history_model_1.EHistoryActivityTypeValues.CLINIC,
                                type_id: foundPaymentGateway.clinic_id,
                            })];
                    case 5:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.PAYMENT_GATEWAY_ACCOUNT_VERIFIED,
                            }];
                    case 6: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.INVALID_PAYMENT_GATEWAY_CREDENTIALS,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 7: return [3 /*break*/, 9];
                    case 8: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.PAYMENT_GATEWAY_NOT_FOUND,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        }); };
    }
    return PaymentGatewayServices;
}());
exports.default = new PaymentGatewayServices();
