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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumRole = void 0;
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var mongoose_1 = __importDefault(require("mongoose"));
var erros_message_1 = __importDefault(require("../../common/erros_message"));
var super_bill_other_detail_model_1 = __importDefault(require("../../models/super_bill_other_detail.model"));
var EnumRole;
(function (EnumRole) {
    EnumRole["PROVIDER"] = "provider";
})(EnumRole = exports.EnumRole || (exports.EnumRole = {}));
var SuperBillOtherDetailServices = /** @class */ (function () {
    function SuperBillOtherDetailServices() {
        var _this = this;
        this.addSuperBillOtherDetail = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, alreadyPresentSuperBillDetail, saveSuperBill, getSuperBill, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        userDetails = req.user;
                        model.createdby_id = userDetails._id;
                        return [4 /*yield*/, super_bill_other_detail_model_1.default.findOne({
                                super_bill_id: model.super_bill_id,
                            })];
                    case 1:
                        alreadyPresentSuperBillDetail = _a.sent();
                        if (!alreadyPresentSuperBillDetail) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                success: false,
                                data: {
                                    message: erros_message_1.default.ALREADY_EXIST_SUPER_BILL_DETAIL,
                                    error: erros_message_1.default.ON_ADD_ERROR,
                                },
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                            }];
                    case 2: return [4 /*yield*/, super_bill_other_detail_model_1.default.create(model)];
                    case 3:
                        saveSuperBill = _a.sent();
                        getSuperBill = {};
                        if (!saveSuperBill) return [3 /*break*/, 5];
                        return [4 /*yield*/, super_bill_other_detail_model_1.default.findOne({
                                _id: saveSuperBill._id,
                            })];
                    case 4:
                        getSuperBill = _a.sent();
                        return [3 /*break*/, 6];
                    case 5: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ON_ADD_SUPER_BILL_DETAIL,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 6:
                        if (saveSuperBill && getSuperBill) {
                            // let addHistory = await HistoryModel.create({
                            //   user_id: model.createdby_id,
                            //   description: `super bill details added`,
                            //   type: EHistoryActivityTypeValues.CLINIC,
                            //   //type_id: EHistoryActivityTypeValues.CLINIC,
                            // });
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: {
                                        notes: getSuperBill,
                                    },
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_ON_ADD_SUPER_BILL_DETAIL,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.updateSuperBillOtherDetail = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, userDetails, updateBillResult, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = model.super_bill_id;
                        userDetails = req.user;
                        return [4 /*yield*/, super_bill_other_detail_model_1.default.findOneAndUpdate({ super_bill_id: id }, model, {
                                new: true,
                                upsert: true,
                            })];
                    case 1:
                        updateBillResult = _a.sent();
                        if (updateBillResult) {
                            // let addHistory = await HistoryModel.create({
                            //   user_id: userDetails._id,
                            //   description: `user updated super bill other details`,
                            //   type: EHistoryActivityTypeValues.USER,
                            // });
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: erros_message_1.default.SAVED_SUCCESSFULL,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_ON_UPDATE_SUPER_BILL_DETAIL,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getSuperBillOtherDetail = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, getBillResult, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = new mongoose_1.default.Types.ObjectId(model._id);
                        return [4 /*yield*/, super_bill_other_detail_model_1.default.aggregate([
                                {
                                    $match: { super_bill_id: id },
                                },
                            ])];
                    case 1:
                        getBillResult = _a.sent();
                        if (getBillResult && getBillResult.length > 0) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: getBillResult[0],
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_ON_GET_SUPER_BILL_DETAIL,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteSuperBillOtherDetail = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var deleteBillResult, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, super_bill_other_detail_model_1.default.updateOne({ _id: model._id }, { isDeleted: true })];
                    case 1:
                        deleteBillResult = _a.sent();
                        if (deleteBillResult && deleteBillResult.modifiedCount > 0) {
                            // let addHistory = await HistoryModel.create({
                            //   user_id: model._id,
                            //   description: `user deleted super bill other detail`,
                            //   type: EHistoryActivityTypeValues.USER,
                            // });
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: erros_message_1.default.DELETE_SUCCESSFULL,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_ON_DELETE_SUPER_BILL_DETAIL,
                                        error: erros_message_1.default.ON_DELETE_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return SuperBillOtherDetailServices;
}());
exports.default = new SuperBillOtherDetailServices();
