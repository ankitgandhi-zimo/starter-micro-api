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
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var erros_message_1 = __importDefault(require("../../common/erros_message"));
var ict_model_1 = __importDefault(require("../../models/ict.model"));
var cpt_model_1 = __importDefault(require("../../models/cpt.model"));
var noc_codes_model_1 = __importDefault(require("../../models/noc_codes.model"));
var modifiers_model_1 = __importDefault(require("../../models/modifiers.model"));
var timezone_model_1 = __importDefault(require("../../models/timezone.model"));
var ListCodeServices = /** @class */ (function () {
    function ListCodeServices() {
        var _this = this;
        //Provides listing for dropdown for filtering data
        this.listICDCodes = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var condition, isEmptyNameOnlySpace, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        condition = {
                        //isDeleted: false,
                        //isActive: true,
                        };
                        if (model.codeCategory) {
                            condition.codeCategory = model.codeCategory;
                        }
                        if (model.ictCode) {
                            condition.ictCode = model.ictCode;
                        }
                        if (model.search) {
                            isEmptyNameOnlySpace = /^\s*$/.test(model.search);
                            condition.ictCode = {
                                $regex: model.search,
                                $options: "i",
                            };
                        }
                        return [4 /*yield*/, ict_model_1.default.find(condition, {
                                createdAt: 0,
                                updatedAt: 0,
                                __v: 0,
                                createdby_id: 0,
                                isActive: 0,
                                isDeleted: 0,
                            }).sort({ createdAt: -1 })];
                    case 1:
                        response = _a.sent();
                        if (response && response.length > 0) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: {
                                        data: response,
                                        totalDocs: response.length,
                                    },
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ICD_CODES_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.listCPTCodes = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var condition, isEmptyNameOnlySpace, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        condition = {
                            isDeleted: false,
                            isActive: true,
                        };
                        if (model.search) {
                            isEmptyNameOnlySpace = /^\s*$/.test(model.search);
                            condition.cptCode = {
                                $regex: model.search,
                                $options: "i",
                            };
                        }
                        return [4 /*yield*/, cpt_model_1.default.find(condition, {
                                createdAt: 0,
                                updatedAt: 0,
                                __v: 0,
                                createdby_id: 0,
                                isActive: 0,
                                isDeleted: 0,
                            }).sort({ createdAt: -1 })];
                    case 1:
                        response = _a.sent();
                        if (response && response.length > 0) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: {
                                        data: response,
                                        totalDocs: response.length,
                                    },
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.CPT_CODE_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
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
        this.listNOCCodes = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var condition, isEmptyNameOnlySpace, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        condition = {
                            isDeleted: false,
                        };
                        if (model.search) {
                            isEmptyNameOnlySpace = /^\s*$/.test(model.search);
                            condition.HCPCS = {
                                $regex: model.search,
                                $options: "i",
                            };
                        }
                        if (model.HCPCS)
                            condition.HCPCS = model.HCPCS;
                        if (model.isActive) {
                            condition.isActive = model.isActive;
                        }
                        return [4 /*yield*/, noc_codes_model_1.default.find(condition, {
                                createdAt: 0,
                                updatedAt: 0,
                                __v: 0,
                                createdby_id: 0,
                                isActive: 0,
                                isDeleted: 0,
                            }).sort({ createdAt: -1 })];
                    case 1:
                        response = _a.sent();
                        if (response && response.length > 0) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: {
                                        data: response,
                                        totalDocs: response.length,
                                    },
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NOC_CODES_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
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
        this.listModifiers = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var condition, isEmptyNameOnlySpace, response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        condition = {
                            isDeleted: false,
                        };
                        if (model.search) {
                            isEmptyNameOnlySpace = /^\s*$/.test(model.search);
                            condition.cptCode = {
                                $regex: model.search,
                                $options: "i",
                            };
                        }
                        if (model.isActive) {
                            condition.isActive = model.isActive;
                        }
                        return [4 /*yield*/, modifiers_model_1.default.find(condition, {
                                createdAt: 0,
                                updatedAt: 0,
                                __v: 0,
                                createdby_id: 0,
                                isActive: 0,
                                isDeleted: 0,
                            }).sort({ createdAt: -1 })];
                    case 1:
                        response = _a.sent();
                        if (response && response.length > 0) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: {
                                        data: response,
                                        totalDocs: response.length,
                                    },
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.MODIFIERS_CODES_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
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
        this.listTimezone = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var condition, isEmptyNameOnlySpace, response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        condition = {
                            isDeleted: false,
                        };
                        if (model.search) {
                            isEmptyNameOnlySpace = /^\s*$/.test(model.search);
                            condition.timezone = {
                                $regex: model.search,
                                $options: "i",
                            };
                        }
                        return [4 /*yield*/, timezone_model_1.default.find(condition, {
                                createdAt: 0,
                                updatedAt: 0,
                                // __v: 0,
                                //createdby_id: 0,
                                isActive: 0,
                                isDeleted: 0,
                            }).sort({ timezone: 1 })];
                    case 1:
                        response = _a.sent();
                        if (response && response.length > 0) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: {
                                        data: response,
                                        totalDocs: response.length,
                                    },
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_RECORD_FOUND,
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
    return ListCodeServices;
}());
exports.default = new ListCodeServices();
