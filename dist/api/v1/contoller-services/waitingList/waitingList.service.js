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
exports.EnumRole = void 0;
var fs_1 = __importDefault(require("fs"));
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var path_1 = __importDefault(require("path"));
var xlsx_populate_1 = __importDefault(require("xlsx-populate"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var erros_message_1 = __importDefault(require("../../common/erros_message"));
var history_model_1 = __importStar(require("../../models/history.model"));
var waiting_list_model_1 = __importDefault(require("../../models/waiting_list.model"));
var EnumRole;
(function (EnumRole) {
    EnumRole["PROVIDER"] = "provider";
})(EnumRole = exports.EnumRole || (exports.EnumRole = {}));
var WaitingListServices = /** @class */ (function () {
    function WaitingListServices() {
        var _this = this;
        this.addWaitingList = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, alreadyPresentWaitingList, saveWaitingListResult, getWaitingListResult, addHistory, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        userDetails = req.user;
                        model.createdby_id = userDetails._id;
                        return [4 /*yield*/, waiting_list_model_1.default.findOne({
                                doctor_id: model.doctor_id,
                                clinic_id: model.clinic_id,
                                patient_id: model.patient_id,
                            })];
                    case 1:
                        alreadyPresentWaitingList = _a.sent();
                        if (!alreadyPresentWaitingList) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                success: false,
                                data: {
                                    message: erros_message_1.default.ALREADY_EXIST_WAITING_LIST,
                                    error: erros_message_1.default.ON_ADD_ERROR,
                                },
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                            }];
                    case 2: return [4 /*yield*/, waiting_list_model_1.default.create(model)];
                    case 3:
                        saveWaitingListResult = _a.sent();
                        return [4 /*yield*/, waiting_list_model_1.default.findOne({
                                _id: saveWaitingListResult._id,
                            })
                                .populate([
                                {
                                    path: "clinic_id",
                                },
                            ])
                                .populate([
                                {
                                    path: "doctor_id",
                                },
                            ])
                                .populate([
                                {
                                    path: "patient_id",
                                },
                            ])
                                .populate([
                                {
                                    path: "apptType_id",
                                },
                            ])];
                    case 4:
                        getWaitingListResult = _a.sent();
                        if (!getWaitingListResult) return [3 /*break*/, 6];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: model.createdby_id,
                                description: "waiting list added",
                                type: history_model_1.EHistoryActivityTypeValues.CLINIC,
                                type_id: model.createdby_id,
                            })];
                    case 5:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: {
                                    notes: getWaitingListResult,
                                },
                            }];
                    case 6: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ON_ADD_WAITING_LIST,
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
        this.updateWaitingList = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, updatedWaitingList, addHistory, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        userDetails = req.user;
                        return [4 /*yield*/, waiting_list_model_1.default.findOneAndUpdate({
                                _id: model._id,
                            }, model, { new: true })
                                .populate([
                                {
                                    path: "clinic_id",
                                },
                            ])
                                .populate([
                                {
                                    path: "doctor_id",
                                },
                            ])
                                .populate([
                                {
                                    path: "patient_id",
                                },
                            ])
                                .populate([
                                {
                                    path: "apptType_id",
                                },
                            ])];
                    case 1:
                        updatedWaitingList = _a.sent();
                        if (!updatedWaitingList) return [3 /*break*/, 3];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "waiting list updated",
                                type: history_model_1.EHistoryActivityTypeValues.CLINIC,
                                type_id: userDetails._id,
                            })];
                    case 2:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.UPDATE_SUCCESSFULL,
                                //data: updatedWaitingList,
                            }];
                    case 3: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ON_UPDATE_WAITING_LIST,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        // deleteSkill = async (
        //   req: Request,
        //   model: CheckMongoIdViewmodel,
        //   next: NextFunction
        // ): Promise<IServiceResult1 | void> => {
        //   try {
        //     let deleteSkillResult = await SkillModel.updateOne(
        //       { _id: req.params._id },
        //       { isDeleted: true }
        //     );
        //     if (deleteSkillResult && deleteSkillResult.modifiedCount > 0) {
        //       return {
        //         status_code: HttpStatus.OK,
        //         success: true,
        //         data: true,
        //       };
        //     } else {
        //       return {
        //         success: false,
        //         data: {
        //           message: errorMessage.ERROR_ON_DELETE_SKILL,
        //           error: errorMessage.ON_DELETE_ERROR,
        //         },
        //         status_code: HttpStatus.BAD_REQUEST,
        //       };
        //     }
        //   } catch (error) {
        //     next(error);
        //   }
        // };
        this.getWaitingList = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var getWaitingListResult, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, waiting_list_model_1.default.findOne({
                                _id: model._id,
                                isActive: true,
                                isDeleted: false,
                            })
                                .populate([
                                {
                                    path: "clinic_id",
                                },
                            ])
                                .populate([
                                {
                                    path: "doctor_id",
                                },
                            ])
                                .populate([
                                {
                                    path: "patient_id",
                                },
                            ])
                                .populate([
                                {
                                    path: "apptType_id",
                                },
                            ])];
                    case 1:
                        getWaitingListResult = _a.sent();
                        if (getWaitingListResult) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: {
                                        notes: getWaitingListResult,
                                    },
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_ON_FETCHING_WAITING_LIST,
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
        this.listWaitingList = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var defaultPage, count, condition, response, tempResult, result, obj, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        defaultPage = void 0;
                        count = void 0;
                        condition = {
                            //is_deleted: false,
                            doctor_id: model.doctor_id,
                        };
                        if (!(!model.pageNumber && !model.pageSize)) return [3 /*break*/, 2];
                        defaultPage = 1;
                        count = -1;
                        return [4 /*yield*/, waiting_list_model_1.default.find(condition, {
                                createdAt: 0,
                                updatedAt: 0,
                                __v: 0,
                            }).sort({ createdAt: -1 })];
                    case 1:
                        response = _a.sent();
                        if (response && response.length > 0) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: {
                                        data: response,
                                        // count: response.length,
                                        totalDocs: response.length,
                                        pageNumber: defaultPage,
                                        pageSize: response.length,
                                        totalPages: defaultPage,
                                    },
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.WAITING_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        if (model.pageNumber &&
                            model.pageNumber >= 1 &&
                            !model.pageSize) {
                            defaultPage = model.pageNumber;
                            count = 50;
                        }
                        else {
                            defaultPage = model.pageNumber || 1;
                            count = model.pageSize || 50;
                        }
                        _a.label = 3;
                    case 3:
                        tempResult = void 0;
                        return [4 /*yield*/, waiting_list_model_1.default.paginate(__assign(__assign({}, condition), { options: {
                                    projection: {
                                        createdAt: 0,
                                        updatedAt: 0,
                                        __v: 0,
                                    },
                                } }), __assign(__assign({ page: defaultPage }, (count > 0
                                ? { limit: count }
                                : { pagination: false })), { 
                                //populate: populateFeilds,
                                sort: { createdAt: -1 } }))];
                    case 4:
                        result = _a.sent();
                        tempResult = result;
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
                                        message: erros_message_1.default.WAITING_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getPatientWaitingDataToExcel = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var populateFeilds, condition, defaultPage, count, result, workbook, patientWaitingSheet_1, patientWaitingSheetHeader, sheetStyle_1, PatientWaitingdata, data, link, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        populateFeilds = [
                            {
                                path: "createdby_id",
                                select: { first_name: 1, last_name: 1 },
                            },
                            {
                                path: "patient_id",
                                select: { first_name: 1, last_name: 1 },
                            },
                            {
                                path: "apptType_id",
                                select: { type: 1, duration: 1 },
                            },
                            ,
                            {
                                path: "doctor_id",
                                select: { user_id: 1 },
                                populate: {
                                    path: "user_id",
                                    select: { first_name: 1, last_name: 1 },
                                },
                            },
                        ];
                        condition = {
                            //is_deleted: false,
                            doctor_id: model.doctor_id,
                        };
                        defaultPage = model.pageNumber || 1;
                        count = model.pageSize || 50;
                        return [4 /*yield*/, waiting_list_model_1.default.paginate(__assign(__assign({}, condition), { options: {
                                    projection: {
                                        createdAt: 0,
                                        updatedAt: 0,
                                        __v: 0,
                                    },
                                } }), __assign(__assign({ page: defaultPage }, (count > 0
                                ? { limit: count }
                                : { pagination: false })), { populate: populateFeilds, sort: { createdAt: -1 } }))];
                    case 1:
                        result = _a.sent();
                        if (!(result && result.docs && result.docs.length > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, xlsx_populate_1.default.fromBlankAsync()];
                    case 2:
                        workbook = _a.sent(), patientWaitingSheet_1 = workbook.sheet("Sheet1"), patientWaitingSheetHeader = [
                            "Patient",
                            "Appointment Type",
                            "Added By",
                            "Provider",
                            "Note",
                        ];
                        patientWaitingSheetHeader.forEach(function (el, i) {
                            patientWaitingSheet_1
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
                        sheetStyle_1 = {
                            border: true,
                            fontFamily: "Calibri",
                        };
                        PatientWaitingdata = result.docs;
                        PatientWaitingdata.forEach(function (el, i) {
                            var patientData = el.patient_id
                                ? el.patient_id
                                : { first_name: "", last_name: "" };
                            var appTypeData = el.apptType_id
                                ? el.apptType_id
                                : { type: "", duration: "" };
                            var addedbyData = (el.createdby_id);
                            var doctorDataDoc = (el.doctor_id.user_id);
                            var doctorData = doctorDataDoc && doctorDataDoc
                                ? doctorDataDoc
                                : { first_name: "", last_name: "" };
                            patientWaitingSheet_1
                                .cell("A" + (i + 2))
                                .value(common_methods_1.default.getDecryptText(patientData.first_name) +
                                " " +
                                common_methods_1.default.getDecryptText(patientData.last_name))
                                .style(sheetStyle_1);
                            patientWaitingSheet_1;
                            patientWaitingSheet_1
                                .cell("B" + (i + 2))
                                .value(appTypeData.type +
                                "(" +
                                appTypeData.duration +
                                "mins.)")
                                .style(sheetStyle_1);
                            patientWaitingSheet_1
                                .cell("C" + (i + 2))
                                .value(addedbyData.first_name +
                                " " +
                                addedbyData.last_name)
                                .style(sheetStyle_1);
                            patientWaitingSheet_1
                                .cell("D" + (i + 2))
                                .value(doctorData.first_name +
                                " " +
                                doctorData.last_name)
                                .style(sheetStyle_1);
                            patientWaitingSheet_1
                                .cell("E" + (i + 2))
                                .value(el.notes)
                                .style(sheetStyle_1);
                        });
                        patientWaitingSheet_1.freezePanes(1, 1);
                        return [4 /*yield*/, workbook.outputAsync()];
                    case 3:
                        data = _a.sent();
                        return [4 /*yield*/, fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../../../../public/upload/others/WaitingList_Report.xlsx"), data)];
                    case 4:
                        _a.sent();
                        link = "http://".concat(req.hostname, ":").concat(process.env.PORT, "/upload/others/WaitingList_Report.xlsx");
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                data: link,
                                success: true,
                            }];
                    case 5: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.WAITING_LIST_NOT_FOUND,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
    }
    return WaitingListServices;
}());
exports.default = new WaitingListServices();
