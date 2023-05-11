"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var billingPayment_1 = require("../../view-models/billingPayment");
var check_mongo_id_viewmodel_1 = require("../../view-models/check_mongo_id.viewmodel");
var billingPayment_service_1 = __importDefault(require("../billingPayment/billingPayment.service"));
var Billing_Payment_Controller = /** @class */ (function () {
    function Billing_Payment_Controller() {
        var _this = this;
        this.receivePayment = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, paymentResult, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(billingPayment_1.ReceivedPaymentViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, billingPayment_service_1.default.receivePayment(req, model, next)];
                    case 3:
                        paymentResult = _a.sent();
                        if (paymentResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: paymentResult.status_code, success: paymentResult.success }, (paymentResult.success
                                    ? { data: paymentResult.data }
                                    : __assign({}, (paymentResult.success
                                        ? { data: paymentResult.data }
                                        : { errors: paymentResult.data })))))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.disablePaymentLink = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, paymentLinkResult, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(billingPayment_1.DisabledPaymentLinkViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, billingPayment_service_1.default.disablePaymentLink(req, model, next)];
                    case 3:
                        paymentLinkResult = _a.sent();
                        if (paymentLinkResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: paymentLinkResult.status_code, success: paymentLinkResult.success }, (paymentLinkResult.success
                                    ? { data: paymentLinkResult.data }
                                    : __assign({}, (paymentLinkResult.success
                                        ? { data: paymentLinkResult.data }
                                        : { errors: paymentLinkResult.data })))))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.updateDuePayment = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, updationlResult, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(billingPayment_1.UpdateBillingPaymentViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, billingPayment_service_1.default.updateDuePayment(req, model, next)];
                    case 3:
                        updationlResult = _a.sent();
                        if (updationlResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: updationlResult.status_code, success: updationlResult.success }, (updationlResult.success
                                    ? { data: updationlResult.data }
                                    : { errors: updationlResult.data })))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.addPostPayment = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, postPaymentResult, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(billingPayment_1.AddPostPaymentViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, billingPayment_service_1.default.addPostPayment(req, model, next)];
                    case 3:
                        postPaymentResult = _a.sent();
                        if (postPaymentResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: postPaymentResult.status_code, success: postPaymentResult.success }, (postPaymentResult.success
                                    ? { data: postPaymentResult.data }
                                    : __assign({}, (postPaymentResult.success
                                        ? { data: postPaymentResult.data }
                                        : { errors: postPaymentResult.data })))))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getPostPaymentList = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, postPaymentResult, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(billingPayment_1.GetPostPaymentListViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, billingPayment_service_1.default.getPostPaymentList(req, model, next)];
                    case 3:
                        postPaymentResult = _a.sent();
                        if (postPaymentResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: postPaymentResult.status_code, success: postPaymentResult.success }, (postPaymentResult.success
                                    ? { data: postPaymentResult.data }
                                    : __assign({}, (postPaymentResult.success
                                        ? { data: postPaymentResult.data }
                                        : { errors: postPaymentResult.data })))))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.updatePostPayment = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, postPaymentResult, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(billingPayment_1.UpdatePostPaymentViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, billingPayment_service_1.default.updatePostPayment(req, model, next)];
                    case 3:
                        postPaymentResult = _a.sent();
                        if (postPaymentResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: postPaymentResult.status_code, success: postPaymentResult.success }, (postPaymentResult.success
                                    ? { data: postPaymentResult.data }
                                    : __assign({}, (postPaymentResult.success
                                        ? { data: postPaymentResult.data }
                                        : { errors: postPaymentResult.data })))))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_6 = _a.sent();
                        next(error_6);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getPostPaymentDetails = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, postPaymentDetailsResult, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(check_mongo_id_viewmodel_1.CheckMongoIdViewmodel, JSON.parse("{\"_id\":\"".concat(req.params._id, "\"}")))];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(200).send({
                                status_code: http_status_codes_1.default.OK,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, billingPayment_service_1.default.getPostPaymentDetails(req, model, next)];
                    case 3:
                        postPaymentDetailsResult = _a.sent();
                        if (postPaymentDetailsResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: postPaymentDetailsResult.status_code, success: postPaymentDetailsResult.success }, (postPaymentDetailsResult.success
                                    ? { data: postPaymentDetailsResult.data }
                                    : { errors: postPaymentDetailsResult.data })))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_7 = _a.sent();
                        next(error_7);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getSuperBillListForPostPayment = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, requiredResult, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(billingPayment_1.GetSuperBillListForPostPaymentViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, billingPayment_service_1.default.getSuperBillListForPostPayment(req, model, next)];
                    case 3:
                        requiredResult = _a.sent();
                        if (requiredResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: requiredResult.status_code, success: requiredResult.success }, (requiredResult.success
                                    ? { data: requiredResult.data }
                                    : __assign({}, (requiredResult.success
                                        ? { data: requiredResult.data }
                                        : { errors: requiredResult.data })))))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_8 = _a.sent();
                        next(error_8);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.makeCMS1500Form = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, cms1500Result, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(billingPayment_1.MakeAndGetCMS1500Viewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, billingPayment_service_1.default.makeCMS1500Form(req, model, next)];
                    case 3:
                        cms1500Result = _a.sent();
                        if (cms1500Result)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: cms1500Result.status_code, success: cms1500Result.success }, (cms1500Result.success
                                    ? { data: cms1500Result.data }
                                    : __assign({}, (cms1500Result.success
                                        ? { data: cms1500Result.data }
                                        : { errors: cms1500Result.data })))))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_9 = _a.sent();
                        next(error_9);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.makeCMS1500FormForSecondaryInsurance = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, cms1500Result, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(billingPayment_1.MakeAndGetCMS1500Viewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.OK).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, billingPayment_service_1.default.makeCMS1500FormForSecondaryInsurance(req, model, next)];
                    case 3:
                        cms1500Result = _a.sent();
                        if (cms1500Result)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: cms1500Result.status_code, success: cms1500Result.success }, (cms1500Result.success
                                    ? { data: cms1500Result.data }
                                    : __assign({}, (cms1500Result.success
                                        ? { data: cms1500Result.data }
                                        : { errors: cms1500Result.data })))))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_10 = _a.sent();
                        next(error_10);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
    }
    return Billing_Payment_Controller;
}());
exports.default = new Billing_Payment_Controller();
