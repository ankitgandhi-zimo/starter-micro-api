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
var mongoose_1 = __importDefault(require("mongoose"));
var erros_message_1 = __importDefault(require("../../common/erros_message"));
var history_model_1 = __importStar(require("../../models/history.model"));
var financialclass_model_1 = __importDefault(require("../../models/financialclass.model"));
var EnumRoles;
(function (EnumRoles) {
    EnumRoles["SUPERADMIN"] = "superadmin";
})(EnumRoles = exports.EnumRoles || (exports.EnumRoles = {}));
var FinancialClassServices = /** @class */ (function () {
    function FinancialClassServices() {
        var _this = this;
        this.addFinancialClass = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, checkExist, modelToSave, response, addHistory, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        userDetails = req.user;
                        return [4 /*yield*/, financialclass_model_1.default.findOne({
                                code: model.code,
                            })];
                    case 1:
                        checkExist = _a.sent();
                        if (!checkExist) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                data: {
                                    message: erros_message_1.default.financialClassMsg
                                        .ALREADY_EXIST_FINANCIAL_CLASS,
                                    error: erros_message_1.default.ON_ADD_ERROR,
                                },
                            }];
                    case 2:
                        modelToSave = model;
                        modelToSave.createdby_id = userDetails._id;
                        return [4 /*yield*/, financialclass_model_1.default.create(modelToSave)];
                    case 3:
                        response = _a.sent();
                        if (!response) return [3 /*break*/, 5];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "Financial class  added successfully",
                                type: history_model_1.EHistoryActivityTypeValues.CLINIC,
                            })];
                    case 4:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: response,
                            }];
                    case 5: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.financialClassMsg
                                    .ERROR_ADD_FINANCIAL_CLASS,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                        }];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.updateFinancialClass = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var foundFinancialClass, modelToSave, userDetails, checkExist, response, addHistory, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        return [4 /*yield*/, financialclass_model_1.default.findById(model._id)];
                    case 1:
                        foundFinancialClass = _a.sent();
                        if (!!foundFinancialClass) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                data: {
                                    message: erros_message_1.default.financialClassMsg
                                        .FINANCIAL_CLASS_DETAILS_NOT_FOUND,
                                    error: erros_message_1.default.ON_UPDATE_ERROR,
                                },
                            }];
                    case 2:
                        modelToSave = (model);
                        userDetails = req.user;
                        if (!model.code) return [3 /*break*/, 4];
                        return [4 /*yield*/, financialclass_model_1.default.findOne({
                                code: model.code,
                            })];
                    case 3:
                        checkExist = _a.sent();
                        if (checkExist &&
                            checkExist._id.toString() !==
                                model._id.toString())
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.financialClassMsg
                                            .ALREADY_EXIST_FINANCIAL_CLASS,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                }];
                        else
                            modelToSave.code = model.code;
                        _a.label = 4;
                    case 4:
                        modelToSave.createdby_id =
                            foundFinancialClass.createdby_id;
                        return [4 /*yield*/, financialclass_model_1.default.updateOne({ _id: model._id }, modelToSave)];
                    case 5:
                        response = _a.sent();
                        if (!(response && response.modifiedCount > 0)) return [3 /*break*/, 7];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "Financial class  updated successfully",
                                type: history_model_1.EHistoryActivityTypeValues.CLINIC,
                            })];
                    case 6:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.UPDATE_SUCCESSFULL,
                            }];
                    case 7: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.financialClassMsg
                                    .ERROR_UPDATE_FINANCIAL_CLASS,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                        }];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        this.getFinancialClassDetails = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var foundFinancialClass, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, financialclass_model_1.default.findOne({
                                _id: new mongoose_1.default.Types.ObjectId(req.params._id),
                                isDeleted: false,
                            })];
                    case 1:
                        foundFinancialClass = _a.sent();
                        if (foundFinancialClass)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: foundFinancialClass,
                                }];
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.financialClassMsg
                                            .FINANCIAL_CLASS_DETAILS_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteFinancialClassDetails = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, foundFinancialClass, deleteFinancialClassDetails, addHistory, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        userDetails = req.user;
                        return [4 /*yield*/, financialclass_model_1.default.findOne({
                                _id: new mongoose_1.default.Types.ObjectId(req.params._id),
                                isDeleted: false,
                            })];
                    case 1:
                        foundFinancialClass = _a.sent();
                        if (!!foundFinancialClass) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                data: {
                                    message: erros_message_1.default.financialClassMsg
                                        .FINANCIAL_CLASS_DETAILS_NOT_FOUND,
                                    error: erros_message_1.default.ON_FETCH_ERROR,
                                },
                            }];
                    case 2: return [4 /*yield*/, financialclass_model_1.default.updateOne({
                            _id: new mongoose_1.default.Types.ObjectId(req.params._id),
                        }, { isActive: false, isDeleted: true })];
                    case 3:
                        deleteFinancialClassDetails = _a.sent();
                        if (!(deleteFinancialClassDetails &&
                            deleteFinancialClassDetails.modifiedCount > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "Financial class deleted successfully",
                                type: history_model_1.EHistoryActivityTypeValues.CLINIC,
                            })];
                    case 4:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.DELETE_SUCCESSFULL,
                            }];
                    case 5: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.financialClassMsg
                                    .ERROR_DELETE_FINANCIAL_CLASS,
                                error: erros_message_1.default.ON_DELETE_ERROR,
                            },
                        }];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.getFinancialClassList = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var count, skip, condition, data, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        count = model.pageSize ? model.pageSize : 10;
                        req.body.page = model.pageNumber
                            ? model.pageNumber
                            : 1;
                        skip = count * (req.body.page - 1);
                        condition = {
                            isDeleted: false,
                            isActive: true,
                        };
                        if (model.clinic_id)
                            condition.createdby_id =
                                new mongoose_1.default.Types.ObjectId(model.clinic_id.toString());
                        if (model.isActive === "false") {
                            condition.isActive = false;
                        }
                        return [4 /*yield*/, financialclass_model_1.default.aggregate([
                                { $match: condition },
                                {
                                    $facet: {
                                        totalCount: [{ $count: "sum" }],
                                        aggregatedData: [
                                            {
                                                $project: {
                                                    _id: "$_id",
                                                    code: "$code",
                                                    price: "$price",
                                                    isActive: "$isActive",
                                                    isDeleted: "$isDeleted",
                                                    description: "$description",
                                                    createdby_id: "$createdby_id",
                                                },
                                            },
                                            { $limit: skip + count },
                                            { $skip: skip },
                                        ],
                                    },
                                },
                            ])];
                    case 1:
                        data = _a.sent();
                        if (data[0].aggregatedData &&
                            data[0].aggregatedData.length > 0) {
                            data[0].aggregatedData.push({
                                totalCount: data[0].totalCount[0].sum,
                            });
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    data: { data: data[0].aggregatedData },
                                    success: true,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.financialClassMsg
                                            .FINANCIAL_CLASS_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return FinancialClassServices;
}());
exports.default = new FinancialClassServices();
