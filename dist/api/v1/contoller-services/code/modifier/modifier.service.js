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
var erros_message_1 = __importDefault(require("../../../common/erros_message"));
var modifiers_model_1 = __importDefault(require("../../../models/modifiers.model"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var xlsx_populate_1 = __importDefault(require("xlsx-populate"));
var history_model_1 = __importStar(require("../../../models/history.model"));
var ModifierServices = /** @class */ (function () {
    function ModifierServices() {
        var _this = this;
        this.addModifier = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, alreadyPresentCode, saveCodeResult, getCodeResult, addHistory, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        userDetails = req.user;
                        model.createdby_id = userDetails._id;
                        return [4 /*yield*/, modifiers_model_1.default.findOne({
                                modifierCode: model.modifierCode,
                            })];
                    case 1:
                        alreadyPresentCode = _a.sent();
                        if (!alreadyPresentCode) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                success: false,
                                data: {
                                    message: erros_message_1.default.ALREADY_EXIST_MODIFIER,
                                    error: erros_message_1.default.ON_ADD_ERROR,
                                },
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                            }];
                    case 2: return [4 /*yield*/, modifiers_model_1.default.create(model)];
                    case 3:
                        saveCodeResult = _a.sent();
                        return [4 /*yield*/, modifiers_model_1.default.findOne({
                                _id: saveCodeResult._id,
                            }, { updatedAt: 0, __v: 0 })];
                    case 4:
                        getCodeResult = _a.sent();
                        if (!(saveCodeResult && getCodeResult)) return [3 /*break*/, 6];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: model.createdby_id,
                                description: "modifier added",
                                type: history_model_1.EHistoryActivityTypeValues.USER,
                                type_id: model.createdby_id,
                            })];
                    case 5:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: getCodeResult,
                            }];
                    case 6: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ON_ADD_MODIFIER,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.updateModifier = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, alreadyPresentCode, updateCodeResult, addHistory, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        userDetails = req.user;
                        return [4 /*yield*/, modifiers_model_1.default.findOne({
                                modifierCode: model.modifierCode,
                                _id: { $ne: model._id },
                            })];
                    case 1:
                        alreadyPresentCode = _a.sent();
                        if (alreadyPresentCode) {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ALREADY_EXIST_MODIFIER,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        return [4 /*yield*/, modifiers_model_1.default.updateOne({ _id: model._id }, model, {
                                new: true,
                            })];
                    case 2:
                        updateCodeResult = _a.sent();
                        if (!(updateCodeResult &&
                            updateCodeResult.modifiedCount > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "Modifier updated",
                                type: history_model_1.EHistoryActivityTypeValues.USER,
                                type_id: userDetails._id,
                            })];
                    case 3:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.UPDATE_SUCCESSFULL,
                                // data: {
                                //   _id: updateCountryResult._id,
                                //   countryName: updateCountryResult.countryName,
                                //   countryCode: updateCountryResult.countryCode,
                                // },
                            }];
                    case 4: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ON_UPDATE_MODIFIER,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.deleteModifier = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, deleteResult, addHistory, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        userDetails = req.user;
                        return [4 /*yield*/, modifiers_model_1.default.updateOne({ _id: req.params._id }, { isDeleted: true })];
                    case 1:
                        deleteResult = _a.sent();
                        if (!(deleteResult && deleteResult.modifiedCount > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "Modifier deleted",
                                type: history_model_1.EHistoryActivityTypeValues.USER,
                                type_id: userDetails._id,
                            })];
                    case 2:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.DELETE_SUCCESSFULL,
                            }];
                    case 3: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ON_DELETE_MODIFIER,
                                error: erros_message_1.default.ON_DELETE_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
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
        this.getModifier = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var getResult, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, modifiers_model_1.default.findOne({
                                _id: model._id,
                                // isActive: true,
                                // isDeleted: false,
                            }, { updatedAt: 0, __v: 0 })];
                    case 1:
                        getResult = _a.sent();
                        if (getResult) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: getResult,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_ON_GET_MODIFIER,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
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
        this.listModifier = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var defaultPage, count, populateFeilds, condition, isEmptyNameOnlySpace, result, obj, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        defaultPage = void 0;
                        count = void 0;
                        defaultPage = model.pageNumber ? model.pageNumber : 1;
                        count = model.pageSize ? model.pageSize : 50;
                        populateFeilds = [];
                        condition = {
                        //isDeleted: false,
                        };
                        if (model.search) {
                            isEmptyNameOnlySpace = /^\s*$/.test(model.search);
                            condition.modifierCode = {
                                $regex: model.search,
                                $options: "i",
                            };
                        }
                        if ("isActive" in model &&
                            model.isActive != undefined &&
                            model.isActive != null) {
                            condition.isActive = model.isActive;
                        }
                        if ("isDeleted" in model &&
                            model.isDeleted != undefined &&
                            model.isDeleted != null) {
                            condition.isDeleted = model.isDeleted;
                        }
                        return [4 /*yield*/, modifiers_model_1.default.paginate(condition, __assign(__assign({ page: defaultPage }, (count > 0
                                ? { limit: count }
                                : { pagination: false })), { populate: populateFeilds, select: { createdby_id: 0, __v: 0 }, sort: { createdAt: -1 } }))];
                    case 1:
                        result = _a.sent();
                        if (result && result.docs && result.docs.length > 0) {
                            obj = {
                                data: result.docs,
                                // count: result.totalDocs,
                                totalDocs: result.totalDocs,
                                pageNumber: result.page,
                                pageSize: result.limit,
                                totalPages: Math.ceil(result.totalDocs / result.limit),
                            };
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    data: obj,
                                    success: true,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.MODIFIER_LIST_NOT_FOUND,
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
        this.getModifierDataToExcel = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var workbook, modifierSheet_1, modifierSheetHeader, defaultPage, count, populateFeilds, condition, isEmptyNameOnlySpace, result, icdCodeData, sheetStyle_1, data, link, excelFileName, response, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, xlsx_populate_1.default.fromBlankAsync()];
                    case 1:
                        workbook = _a.sent();
                        modifierSheet_1 = workbook.sheet("Sheet1");
                        modifierSheetHeader = [
                            "Code",
                            "Description",
                            "Status",
                        ];
                        modifierSheetHeader.forEach(function (el, i) {
                            modifierSheet_1
                                .cell(String.fromCharCode(i + 65) + "1")
                                .value(el)
                                .style({
                                border: true,
                                fontFamily: "Calibri",
                                fill: {
                                    type: "solid",
                                    color: { rgb: "d9d9d9" },
                                },
                            });
                        });
                        defaultPage = void 0;
                        count = void 0;
                        defaultPage = model.pageNumber ? model.pageNumber : 1;
                        count = model.pageSize ? model.pageSize : 50;
                        populateFeilds = [];
                        condition = {
                        //isDeleted: false,
                        };
                        if (model.search) {
                            isEmptyNameOnlySpace = /^\s*$/.test(model.search);
                            condition.modifierCode = {
                                $regex: model.search,
                                $options: "i",
                            };
                        }
                        if ("isActive" in model &&
                            model.isActive != undefined &&
                            model.isActive != null) {
                            condition.isActive = model.isActive;
                        }
                        if ("isDeleted" in model &&
                            model.isDeleted != undefined &&
                            model.isDeleted != null) {
                            condition.isDeleted = model.isDeleted;
                        }
                        return [4 /*yield*/, modifiers_model_1.default.paginate(condition, __assign(__assign({ page: defaultPage }, (count > 0
                                ? { limit: count }
                                : { pagination: false })), { populate: populateFeilds, select: { createdby_id: 0, __v: 0 }, sort: { createdAt: -1 } }))];
                    case 2:
                        result = _a.sent();
                        if (!(result && result.docs && result.docs.length > 0)) return [3 /*break*/, 5];
                        icdCodeData = result.docs;
                        sheetStyle_1 = {
                            border: true,
                            fontFamily: "Calibri",
                        };
                        icdCodeData.forEach(function (el, i) {
                            modifierSheet_1
                                .cell("A" + (i + 2))
                                .value(el.modifierCode)
                                .style(sheetStyle_1);
                            modifierSheet_1
                                .cell("B" + (i + 2))
                                .value(el.description)
                                .style(sheetStyle_1);
                            modifierSheet_1
                                .cell("C" + (i + 2))
                                .value(el.isActive)
                                .style(sheetStyle_1);
                            modifierSheet_1;
                        });
                        modifierSheet_1.freezePanes(1, 1);
                        return [4 /*yield*/, workbook.outputAsync()];
                    case 3:
                        data = _a.sent();
                        return [4 /*yield*/, fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../../../../../public/upload/codes/Modifier_Report.xlsx"), data)];
                    case 4:
                        _a.sent();
                        link = "http://".concat(req.hostname, ":").concat(process.env.PORT, "/upload/codes/Modifier_Report.xlsx");
                        excelFileName = "Modifier_Report.xlsx";
                        response = {
                            link: link,
                            name: excelFileName,
                        };
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                data: response,
                                success: true,
                            }];
                    case 5: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.MODIFIER_LIST_NOT_FOUND,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_6 = _a.sent();
                        next(error_6);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        // filterListCptCode = async (
        //   req: Request,
        //   model: GetCptCodeListViewmodel,
        //   next: NextFunction
        // ): Promise<IServiceResult1 | void> => {
        //   try {
        //     let condition: any = {
        //       isDeleted: false,
        //     };
        //     if (model.search) {
        //       let isEmptyNameOnlySpace = /^\s*$/.test(model.search);
        //       condition.cptCode = {
        //         $regex: model.search,
        //         $options: "i",
        //       };
        //     }
        //     if (model.isActive) {
        //       condition.isActive = model.isActive;
        //     }
        //     let response = await CptCodeModel.find(condition, {
        //       createdAt: 0,
        //       updatedAt: 0,
        //       __v: 0,
        //       isDeleted: 0,
        //       isActive: 0,
        //     }).sort({ createdAt: -1 });
        //     if (response && response.length > 0) {
        //       return {
        //         status_code: HttpStatus.OK,
        //         success: true,
        //         data: {
        //           data: response,
        //           totalDocs: response.length,
        //         },
        //       };
        //     } else {
        //       return {
        //         status_code: HttpStatus.BAD_REQUEST,
        //         success: false,
        //         data: {
        //           message: errorMessage.CPT_CODE_LIST_NOT_FOUND,
        //           error: errorMessage.ON_FETCH_ERROR,
        //         },
        //       };
        //     }
        //   } catch (error) {
        //     next(error);
        //   }
        // };
    }
    return ModifierServices;
}());
exports.default = new ModifierServices();
