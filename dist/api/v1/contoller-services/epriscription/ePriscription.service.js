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
var fs_1 = __importDefault(require("fs"));
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var mongoose_1 = __importDefault(require("mongoose"));
var path_1 = __importDefault(require("path"));
var xlsx_populate_1 = __importDefault(require("xlsx-populate"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var erros_message_1 = __importDefault(require("../../common/erros_message"));
var epriscription_model_1 = __importDefault(require("../../models/epriscription.model"));
var history_model_1 = __importStar(require("../../models/history.model"));
var EPriscriptionServices = /** @class */ (function () {
    function EPriscriptionServices() {
        var _this = this;
        this.addEPriscription = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, alreadyPresentEPriscription, saveResult, getResult, DoctorFormattedData, addHistory, doctorData, userInfo, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        userDetails = req.user;
                        model.createdby_id = userDetails._id;
                        return [4 /*yield*/, epriscription_model_1.default.findOne(model)];
                    case 1:
                        alreadyPresentEPriscription = _a.sent();
                        if (!alreadyPresentEPriscription) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                success: false,
                                data: {
                                    message: erros_message_1.default.ALREADY_EXIST_EPRISCRIPTION,
                                    error: erros_message_1.default.ON_ADD_ERROR,
                                },
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                            }];
                    case 2: return [4 /*yield*/, epriscription_model_1.default.create(model)];
                    case 3:
                        saveResult = _a.sent();
                        return [4 /*yield*/, epriscription_model_1.default.findOne({
                                _id: saveResult._id,
                            }).populate([
                                {
                                    path: "doctor_id",
                                    populate: [
                                        {
                                            path: "user_id",
                                            select: { first_name: 1, last_name: 1 },
                                        },
                                    ],
                                    select: { _id: 1, user_id: 1 },
                                },
                                {
                                    path: "appointment_id",
                                    select: {
                                        _id: 1,
                                        appointment_number: 1,
                                        startDateTime: 1,
                                        endDateTime: 1,
                                    },
                                },
                            ])];
                    case 4:
                        getResult = _a.sent();
                        DoctorFormattedData = {};
                        if (!(saveResult && getResult)) return [3 /*break*/, 6];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: model.createdby_id,
                                description: "eprescription added",
                                type: history_model_1.EHistoryActivityTypeValues.USER,
                                type_id: userDetails._id,
                            })];
                    case 5:
                        addHistory = _a.sent();
                        if (getResult.doctor_id &&
                            Object.keys(getResult.doctor_id).length > 0) {
                            doctorData = (getResult.doctor_id);
                            if (doctorData._id)
                                DoctorFormattedData._id = doctorData._id;
                            if ("user_id" in getResult.doctor_id) {
                                userInfo = (getResult.doctor_id.user_id);
                                if (userInfo.first_name)
                                    DoctorFormattedData.first_name =
                                        userInfo.first_name;
                                if (userInfo.last_name)
                                    DoctorFormattedData.last_name =
                                        userInfo.last_name;
                            }
                        }
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: {
                                    _id: getResult._id,
                                    medicine: getResult.medicine,
                                    strength: getResult.strength,
                                    frequency: getResult.frequency,
                                    precaution: getResult.precaution,
                                    provider: DoctorFormattedData,
                                    appointmentData: getResult.appointment_id,
                                },
                            }];
                    case 6: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ON_ADD_EPRISCRIPTION,
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
        // updateNotes = async (
        //   req: Request,
        //   model: UpdateNotesViewmodel,
        //   next: NextFunction
        // ): Promise<IServiceResult1 | void> => {
        //   try {
        //     let userDetails = <DocumentType<User>>req.user;
        //     let updateNotesResult = await NotesModel.findOneAndUpdate(
        //       { _id: model._id },
        //       model,
        //       {
        //         new: true,
        //       }
        //     );
        //     if (updateNotesResult) {
        //       let addHistory = await HistoryModel.create({
        //         user_id: userDetails._id,
        //         description: `user updated notes`,
        //         type: EHistoryActivityTypeValues.USER,
        //       });
        //       return {
        //         status_code: HttpStatus.OK,
        //         success: true,
        //         data: errorMessage.UPDATE_SUCCESSFULL,
        //         // data: {
        //         //   _id: updateCountryResult._id,
        //         //   countryName: updateCountryResult.countryName,
        //         //   countryCode: updateCountryResult.countryCode,
        //         // },
        //       };
        //     } else {
        //       return {
        //         success: false,
        //         data: {
        //           message: errorMessage.ERROR_ON_UPDATE_NOTES,
        //           error: errorMessage.ON_UPDATE_ERROR,
        //         },
        //         status_code: HttpStatus.BAD_REQUEST,
        //       };
        //     }
        //   } catch (error) {
        //     next(error);
        //   }
        // };
        // deleteNotes = async (
        //   req: Request,
        //   model: CheckMongoIdViewmodel,
        //   next: NextFunction
        // ): Promise<IServiceResult1 | void> => {
        //   try {
        //     let userDetails = <DocumentType<User>>req.user;
        //     let deleteNotesResult = await NotesModel.updateOne(
        //       { _id: req.params._id },
        //       { isDeleted: true }
        //     );
        //     if (deleteNotesResult && deleteNotesResult.modifiedCount > 0) {
        //       let addHistory = await HistoryModel.create({
        //         user_id: userDetails._id,
        //         description: `user deleted notes`,
        //         type: EHistoryActivityTypeValues.USER,
        //       });
        //       return {
        //         status_code: HttpStatus.OK,
        //         success: true,
        //         data: errorMessage.DELETE_SUCCESSFULL,
        //       };
        //     } else {
        //       return {
        //         success: false,
        //         data: {
        //           message: errorMessage.ERROR_ON_DELETE_USER,
        //           error: errorMessage.ON_DELETE_ERROR,
        //         },
        //         status_code: HttpStatus.BAD_REQUEST,
        //       };
        //     }
        //   } catch (error) {
        //     next(error);
        //   }
        // };
        // getNotes = async (
        //   req: Request,
        //   model: CheckMongoIdViewmodel,
        //   next: NextFunction
        // ): Promise<IServiceResult1 | void> => {
        //   try {
        //     let getNotesResult = await NotesModel.findOne({
        //       _id: model._id,
        //       isActive: true,
        //       isDeleted: false,
        //     }).populate([
        //       {
        //         path: "createdby_id",
        //         select: { _id: 1, first_name: 1, last_name: 1 },
        //       },
        //     ]);
        //     if (getNotesResult) {
        //       return {
        //         status_code: HttpStatus.OK,
        //         success: true,
        //         data: {
        //           _id: getNotesResult._id,
        //           notes: getNotesResult.notes,
        //           createdBy: getNotesResult.createdby_id,
        //         },
        //       };
        //     } else {
        //       return {
        //         success: false,
        //         data: {
        //           message: errorMessage.ERROR_ON_GET_NOTES,
        //           error: errorMessage.ON_FETCH_ERROR,
        //         },
        //         status_code: HttpStatus.BAD_REQUEST,
        //       };
        //     }
        //   } catch (error) {
        //     next(error);
        //   }
        // };
        this.listEPriscription = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var defaultPage, count, populateFeilds, condition, isEmptyNameOnlySpace, result, FormattedData_1, obj, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        defaultPage = void 0;
                        count = void 0;
                        defaultPage = model.pageNumber ? model.pageNumber : 1;
                        count = model.pageSize ? model.pageSize : 50;
                        populateFeilds = [
                            {
                                path: "doctor_id",
                                populate: [
                                    {
                                        path: "user_id",
                                        select: { first_name: 1, last_name: 1 },
                                    },
                                ],
                                select: { _id: 1, user_id: 1 },
                            },
                            {
                                path: "appointment_id",
                                select: {
                                    _id: 1,
                                    appointment_number: 1,
                                    startDateTime: 1,
                                    endDateTime: 1,
                                },
                            },
                        ];
                        condition = {
                            isDeleted: false,
                            clinic_id: model.clinic_id,
                            //isActive: true,
                        };
                        if (model.search) {
                            isEmptyNameOnlySpace = /^\s*$/.test(model.search);
                            condition.notes = {
                                $regex: model.search,
                                $options: "i",
                            };
                        }
                        if (model.isActive) {
                            condition.isActive = model.isActive;
                        }
                        return [4 /*yield*/, epriscription_model_1.default.paginate(condition, __assign(__assign({ page: defaultPage }, (count > 0
                                ? { limit: count }
                                : { pagination: false })), { populate: populateFeilds, sort: { createdAt: -1 } }))];
                    case 1:
                        result = _a.sent();
                        if (result && result.docs && result.docs.length > 0) {
                            FormattedData_1 = [];
                            result.docs.forEach(function (d) {
                                var DoctorFormattedData = {};
                                if (d.doctor_id &&
                                    Object.keys(d.doctor_id).length > 0) {
                                    var doctorData = (d.doctor_id);
                                    if (doctorData._id)
                                        DoctorFormattedData._id = doctorData._id;
                                    if ("user_id" in d.doctor_id) {
                                        var userInfo = (d.doctor_id.user_id);
                                        if (userInfo.first_name)
                                            DoctorFormattedData.first_name =
                                                userInfo.first_name;
                                        if (userInfo.last_name)
                                            DoctorFormattedData.last_name =
                                                userInfo.last_name;
                                    }
                                }
                                FormattedData_1.push({
                                    _id: d._id,
                                    medicine: d.medicine,
                                    strength: d.strength,
                                    frequency: d.frequency,
                                    precaution: d.precaution,
                                    provider: DoctorFormattedData,
                                    appointmentData: d.appointment_id,
                                });
                            });
                            obj = {
                                data: FormattedData_1,
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
                                        message: erros_message_1.default.EPRISCRIPTION_LIST_NOT_FOUND,
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
        this.getEPrescriptionListByGroupDataToExcel = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var workbook, ePrescriptionSheet_1, ePrescriptionSheetHeader, count, skip, condition, child_condition, sortObject, searchText, ePrescriptionArr, ePrescriptiondata, sheetStyle_1, data, link, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, xlsx_populate_1.default.fromBlankAsync()];
                    case 1:
                        workbook = _a.sent(), ePrescriptionSheet_1 = workbook.sheet("Sheet1"), ePrescriptionSheetHeader = [
                            "Appointment Number",
                            "Appointment Date/Time",
                            "Provider Name",
                            "Patient Name",
                        ];
                        ePrescriptionSheetHeader.forEach(function (el, i) {
                            ePrescriptionSheet_1
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
                        count = model.pageSize ? model.pageSize : 50;
                        req.body.page = model.pageSize ? model.pageSize : 1;
                        skip = count * (req.body.page - 1);
                        condition = { isDeleted: false }, child_condition = {}, sortObject = {};
                        if (req.body.sortValue && req.body.sortOrder)
                            sortObject[req.body.sortValue] = req.body.sortOrder;
                        else
                            sortObject = {
                                "appointmentData.startDateTime": -1,
                            };
                        if (model.clinic_id)
                            condition.clinic_id = new mongoose_1.default.Types.ObjectId(model.clinic_id.toString());
                        if (model.doctor_id)
                            condition.doctor_id = new mongoose_1.default.Types.ObjectId(model.doctor_id.toString());
                        if (model.patient_id)
                            condition.patient_id = new mongoose_1.default.Types.ObjectId(model.patient_id.toString());
                        if (model.createdby_id)
                            condition.createdby_id =
                                new mongoose_1.default.Types.ObjectId(model.createdby_id.toString()); /** this is the doctor id (_id of USER COLLECTION) */
                        if (model.appointment_id)
                            condition.appointment_id =
                                new mongoose_1.default.Types.ObjectId(model.appointment_id.toString());
                        if (model.startDateFilter && model.endDateFilter)
                            child_condition["appointmentData.startDateTime"] = {
                                $gte: new Date(model.startDateFilter),
                                $lte: new Date(model.endDateFilter),
                            };
                        if (model.search) {
                            searchText = decodeURIComponent(model.search).replace(/[[\]{}()*+?,\\^$|#\s]/g, "\\s+");
                            child_condition.$or = [
                                {
                                    "patientData.first_name": new RegExp(common_methods_1.default.getEncryptText(searchText.toUpperCase()), "gi"),
                                },
                                {
                                    "patientData.last_name": new RegExp(common_methods_1.default.getEncryptText(searchText.toUpperCase()), "gi"),
                                },
                                {
                                    "appointmentData.appointment_number": new RegExp(searchText, "gi"),
                                },
                            ];
                        }
                        return [4 /*yield*/, epriscription_model_1.default.aggregate([
                                { $match: condition },
                                {
                                    $group: {
                                        _id: "$appointment_id",
                                        clinic_id: { $first: "$clinic_id" },
                                        doctor_id: { $first: "$doctor_id" },
                                        patient_id: { $first: "$patient_id" },
                                        appointment_id: { $first: "$appointment_id" },
                                    },
                                },
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
                                            {
                                                $project: {
                                                    startDateTime: 1,
                                                    endDateTime: 1,
                                                    appointment_number: 1,
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
                                        from: "clinic",
                                        let: { clinic_id: "$clinic_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$user_id", "$$clinic_id"],
                                                    },
                                                },
                                            },
                                            { $project: { clinicName: "$clinicName" } },
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
                                                $project: {
                                                    first_name: 1,
                                                    last_name: 1,
                                                    patientId: 1,
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
                                        let: { doctor_id: "$doctor_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: { $eq: ["$_id", "$$doctor_id"] },
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "users",
                                                    let: { user_id: "$user_id" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $eq: ["$_id", "$$user_id"],
                                                                },
                                                            },
                                                        },
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
                                                $project: {
                                                    first_name: "$userData.first_name",
                                                    last_name: "$userData.last_name",
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
                                { $match: child_condition },
                                {
                                    $facet: {
                                        totalCount: [{ $count: "sum" }],
                                        aggregatedData: [
                                            {
                                                $project: {
                                                    _id: 0,
                                                    clinicData: "$clinicData",
                                                    // doctor_id: '$doctor_id',
                                                    doctorData: "$doctorData",
                                                    patientData: "$patientData",
                                                    appointmentData: "$appointmentData",
                                                },
                                            },
                                            { $sort: sortObject },
                                            // { $limit: parseInt(skip) + parseInt(count) },
                                            // { $skip: parseInt(skip) },
                                        ],
                                    },
                                },
                            ])];
                    case 2:
                        ePrescriptionArr = _a.sent();
                        if (!ePrescriptionArr.length)
                            return [2 /*return*/, {
                                    success: false,
                                    status_code: http_status_codes_1.default.NOT_FOUND,
                                    data: {
                                        message: erros_message_1.default.NO_RECORD_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        ePrescriptiondata = ePrescriptionArr[0].aggregatedData;
                        sheetStyle_1 = {
                            border: true,
                            fontFamily: "Calibri",
                        };
                        ePrescriptiondata.forEach(function (el, i) {
                            ePrescriptionSheet_1
                                .cell("A" + (i + 2))
                                .value(el.appointmentData.appointment_number)
                                .style(sheetStyle_1);
                            ePrescriptionSheet_1;
                            ePrescriptionSheet_1
                                .cell("B" + (i + 2))
                                .value(new Date(el.appointmentData.startDateTime))
                                .style(sheetStyle_1);
                            ePrescriptionSheet_1
                                .cell("C" + (i + 2))
                                .value(el.doctorData.first_name +
                                " " +
                                el.doctorData.last_name)
                                .style(sheetStyle_1);
                            ePrescriptionSheet_1
                                .cell("D" + (i + 2))
                                .value(common_methods_1.default.getDecryptText(el.patientData.first_name) +
                                " " +
                                common_methods_1.default.getDecryptText(el.patientData.last_name))
                                .style(sheetStyle_1);
                        });
                        ePrescriptionSheet_1.freezePanes(1, 1);
                        return [4 /*yield*/, workbook.outputAsync()];
                    case 3:
                        data = _a.sent();
                        return [4 /*yield*/, fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../../../../public/upload/others/E_Prescription_Report.xlsx"), data)];
                    case 4:
                        _a.sent();
                        link = "http://".concat(req.hostname, ":").concat(process.env.PORT, "/upload/others/E_Prescription_Report.xlsx");
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: link,
                            }];
                    case 5:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
    }
    return EPriscriptionServices;
}());
exports.default = new EPriscriptionServices();
