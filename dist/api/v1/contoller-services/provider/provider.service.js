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
exports.EnumRole = void 0;
var axios_1 = __importDefault(require("axios"));
var fs_1 = __importDefault(require("fs"));
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var lodash_1 = __importDefault(require("lodash"));
var moment_1 = __importDefault(require("moment"));
var mongoose_1 = __importDefault(require("mongoose"));
var path_1 = __importDefault(require("path"));
var xlsx_populate_1 = __importDefault(require("xlsx-populate"));
var erros_message_1 = __importDefault(require("../../common/erros_message"));
var appointment_types_model_1 = __importDefault(require("../../models/appointment_types.model"));
var doctor_model_1 = __importDefault(require("../../models/doctor.model"));
var fetch_data_model_1 = __importDefault(require("../../models/fetch_data.model"));
var history_model_1 = __importStar(require("../../models/history.model"));
var location_model_1 = __importDefault(require("../../models/location.model"));
var roles_model_1 = __importDefault(require("../../models/roles.model"));
var user_model_1 = __importDefault(require("../../models/user.model"));
var EnumRole;
(function (EnumRole) {
    EnumRole["PROVIDER"] = "provider";
})(EnumRole = exports.EnumRole || (exports.EnumRole = {}));
var ProviderServices = /** @class */ (function () {
    function ProviderServices() {
        var _this = this;
        this.addProvider = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var alreadyPresentEmail, userDetails, roleId, userData, saveUserResult, saveDoctorResult, getDoctorResult, addHistory, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 10, , 11]);
                        return [4 /*yield*/, user_model_1.default.findOne({
                                email: model.email.toLowerCase(),
                            })];
                    case 1:
                        alreadyPresentEmail = _a.sent();
                        if (!alreadyPresentEmail) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                success: false,
                                data: {
                                    message: erros_message_1.default.ALREADY_ASSOCIATED_EMAIL,
                                    error: erros_message_1.default.ON_ADD_ERROR,
                                },
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                            }];
                    case 2:
                        userDetails = req.user;
                        model.createdby_id = userDetails._id;
                        return [4 /*yield*/, this.findRoleId(EnumRole.PROVIDER)];
                    case 3:
                        roleId = _a.sent();
                        if (!roleId)
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ROLE_NOT_FOUND,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        userData = {
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            email: req.body.email,
                            mobile_no: req.body.mobile_no,
                            image: req.body.image,
                            role: roleId._id,
                            role_permission: roleId.permission,
                        };
                        return [4 /*yield*/, user_model_1.default.create(userData)];
                    case 4:
                        saveUserResult = _a.sent();
                        model.user_id = saveUserResult._id;
                        return [4 /*yield*/, doctor_model_1.default.create(model)];
                    case 5:
                        saveDoctorResult = _a.sent();
                        return [4 /*yield*/, doctor_model_1.default.findOne({
                                _id: saveDoctorResult._id,
                            })];
                    case 6:
                        getDoctorResult = _a.sent();
                        if (!(saveDoctorResult && getDoctorResult)) return [3 /*break*/, 8];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: model.createdby_id,
                                description: "provider added",
                                type: history_model_1.EHistoryActivityTypeValues.PROVIDER,
                                type_id: getDoctorResult._id,
                                data: {
                                    first_name: req.body.first_name,
                                    last_name: req.body.last_name,
                                    email: req.body.email,
                                    mobile_no: req.body.mobile_no,
                                },
                            })];
                    case 7:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: {
                                    email: saveUserResult.email,
                                    _id: getDoctorResult._id,
                                    user_id: saveUserResult._id,
                                    first_name: saveUserResult.first_name,
                                    last_name: saveUserResult.last_name,
                                    mobile_no: saveUserResult.mobile_no,
                                    image: saveUserResult.image,
                                    middle_name: getDoctorResult.middle_name,
                                    title: getDoctorResult.title,
                                    address: getDoctorResult.address,
                                    postal_code: getDoctorResult.postal_code,
                                    city: getDoctorResult.city,
                                    state: getDoctorResult.state,
                                    country: getDoctorResult.country,
                                    dob: getDoctorResult.dob,
                                    license: getDoctorResult.license,
                                    npiNo: getDoctorResult.npiNo,
                                    deaNo: getDoctorResult.deaNo,
                                    experience: getDoctorResult.experience,
                                    taxonomy: getDoctorResult.experience,
                                    // additionalSkill: getDoctorResult.additionalSkill,
                                    // awards: getDoctorResult.awards,
                                    // qualifications: getDoctorResult.qualifications,
                                    // skills: getDoctorResult.skills,
                                    emergency_contact_number: getDoctorResult.emergency_contact_number,
                                    emergency_contact_name: getDoctorResult.emergency_contact_name,
                                    relation: getDoctorResult.relation,
                                },
                            }];
                    case 8: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ON_ADD_PROVIDER,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        }); };
        this.updateProvider = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, id, UserModelData, updateDoctorResult, updateUserResult, addHistory, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        userDetails = req.user;
                        id = model._id;
                        delete model._id;
                        UserModelData = {};
                        if (model.first_name)
                            UserModelData.first_name = model.first_name;
                        if (model.last_name)
                            UserModelData.last_name = model.last_name;
                        if (model.mobile_no)
                            UserModelData.mobile_no = model.mobile_no;
                        if (model.image)
                            UserModelData.image = model.image;
                        if ("isActive" in model)
                            UserModelData.isActive = model.isActive;
                        if ("isDeleted" in model)
                            UserModelData.isDeleted = model.isDeleted;
                        return [4 /*yield*/, doctor_model_1.default.findOneAndUpdate({ _id: id }, model, {
                                new: true,
                            }).populate([
                                {
                                    path: "skills",
                                    select: { skillName: 1 },
                                },
                            ])];
                    case 1:
                        updateDoctorResult = _a.sent();
                        if (!updateDoctorResult) return [3 /*break*/, 5];
                        if (!!lodash_1.default.isEmpty(UserModelData)) return [3 /*break*/, 3];
                        return [4 /*yield*/, user_model_1.default.findOneAndUpdate({ _id: updateDoctorResult.user_id }, UserModelData, {
                                new: true,
                            })];
                    case 2:
                        updateUserResult = _a.sent();
                        if (!updateUserResult) {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_ON_UPDATE_PROVIDER,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        _a.label = 3;
                    case 3: return [4 /*yield*/, history_model_1.default.create({
                            user_id: userDetails._id,
                            description: "provider updated",
                            type: history_model_1.EHistoryActivityTypeValues.PROVIDER,
                            type_id: updateDoctorResult._id,
                            data: UserModelData,
                        })];
                    case 4:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.UPDATE_SUCCESSFULL,
                                // {
                                //   _id: updateDoctorResult.user_id,
                                //   email: updateUserResult.email,
                                //   image: updateUserResult.image,
                                //   first_name: updateUserResult.first_name,
                                //   last_name: updateUserResult.last_name,
                                //   mobile_no: updateUserResult.mobile_no,
                                //   title: updateDoctorResult.title,
                                //   address: updateDoctorResult.address,
                                //   postal_code: updateDoctorResult.postal_code,
                                //   city: updateDoctorResult.city,
                                //   state: updateDoctorResult.state,
                                //   country: updateDoctorResult.country,
                                //   dob: updateDoctorResult.dob,
                                //   license: updateDoctorResult.license,
                                //   npiNo: updateDoctorResult.npiNo,
                                //   deaNo: updateDoctorResult.deaNo,
                                //   experience: updateDoctorResult.experience,
                                //   additionalSkill: updateDoctorResult.additionalSkill,
                                //   awards: updateDoctorResult.awards,
                                //   qualifications: updateDoctorResult.qualifications,
                                //   skills: updateDoctorResult.skills,
                                //   emergency_contact_number:
                                //     updateDoctorResult.emergency_contact_number,
                                //   emergency_contact_name: updateDoctorResult.emergency_contact_name,
                                //   relation: updateDoctorResult.relation,
                                // },
                            }];
                    case 5: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ON_UPDATE_PROVIDER,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.deleteProvider = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, find_user_id, deleteDoctorResult, addHistory, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        userDetails = req.user;
                        return [4 /*yield*/, doctor_model_1.default.findOne({ _id: model._id }, { user_id: 1 })];
                    case 1:
                        find_user_id = _a.sent();
                        if (!find_user_id) return [3 /*break*/, 6];
                        return [4 /*yield*/, user_model_1.default.updateOne({ _id: find_user_id.user_id }, { isDeleted: true })];
                    case 2:
                        deleteDoctorResult = _a.sent();
                        if (!(deleteDoctorResult && deleteDoctorResult.modifiedCount > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "provider deleted",
                                type: history_model_1.EHistoryActivityTypeValues.PROVIDER,
                                type_id: model._id,
                            })];
                    case 3:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.DELETE_SUCCESSFULL,
                            }];
                    case 4: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ON_DELETE_PROVIDER,
                                error: erros_message_1.default.ON_DELETE_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ON_DELETE_PROVIDER,
                                error: erros_message_1.default.ON_DELETE_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
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
        this.getProvider = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var _id, getDoctorResult, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _id = new mongoose_1.default.Types.ObjectId(model._id);
                        return [4 /*yield*/, doctor_model_1.default.aggregate([
                                {
                                    $match: {
                                        _id: _id,
                                        //isDeleted: false,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "users",
                                        let: { u_id: "$user_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$_id", "$$u_id"],
                                                    },
                                                },
                                            },
                                            {
                                                $project: {
                                                    _id: 0,
                                                    first_name: 1,
                                                    last_name: 1,
                                                    email: 1,
                                                    mobile_no: 1,
                                                    image: 1,
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
                                        let: { state: "$state" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$_id", "$$state"],
                                                    },
                                                },
                                            },
                                            {
                                                $project: {
                                                    _id: 1,
                                                    stateName: 1,
                                                },
                                            },
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
                                    $lookup: {
                                        from: "countries",
                                        let: { country: "$country" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$_id", "$$country"],
                                                    },
                                                },
                                            },
                                            {
                                                $project: {
                                                    _id: 1,
                                                    countryName: 1,
                                                },
                                            },
                                        ],
                                        as: "countryData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$countryData",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "skill",
                                        let: { skillIds: "$skills" },
                                        pipeline: [
                                            // {
                                            //   $match: {
                                            //     $expr: {
                                            //       $eq: ["$_id", "$$skillIds"],
                                            //     },
                                            //   },
                                            // },
                                            {
                                                $match: {
                                                    $expr: { $in: ["$_id", "$$skillIds"] },
                                                },
                                            },
                                            {
                                                $project: {
                                                    skillName: 1,
                                                    _id: 1,
                                                },
                                            },
                                        ],
                                        as: "skillData",
                                    },
                                },
                                {
                                    $project: {
                                        _id: 1,
                                        first_name: "$userData.first_name",
                                        last_name: "$userData.last_name",
                                        middle_name: 1,
                                        email: "$userData.email",
                                        mobile_no: "$userData.mobile_no",
                                        image: "$userData.image",
                                        user_id: 1,
                                        address: 1,
                                        title: 1,
                                        postal_code: 1,
                                        city: 1,
                                        state: "$stateData",
                                        country: "$countryData",
                                        dob: 1,
                                        license: 1,
                                        npiNo: 1,
                                        deaNo: 1,
                                        experience: 1,
                                        taxonomy: 1,
                                        awards: {
                                            $ifNull: ["$awards", []],
                                        },
                                        skills: "$skillData",
                                        qualifications: {
                                            $ifNull: ["$qualifications", []],
                                        },
                                        additionalSkill: {
                                            $ifNull: ["$additionalSkill", []],
                                        },
                                        emergency_contact_number: 1,
                                        emergency_contact_name: 1,
                                        relation: 1,
                                    },
                                },
                            ])];
                    case 1:
                        getDoctorResult = _a.sent();
                        // let getDoctorResult = await UserModel.aggregate([
                        //   {
                        //     $match: {
                        //       _id: _id,
                        //       //isDeleted: false,
                        //     },
                        //   },
                        //   {
                        //     $lookup: {
                        //       from: "doctor",
                        //       pipeline: [
                        //         {
                        //           $match: {
                        //             $expr: {
                        //               $eq: ["$user_id", _id],
                        //             },
                        //           },
                        //         },
                        //         {
                        //           $lookup: {
                        //             from: "states",
                        //             let: { state: "$state" },
                        //             pipeline: [
                        //               {
                        //                 $match: {
                        //                   $expr: {
                        //                     $eq: ["$_id", "$$state"],
                        //                   },
                        //                 },
                        //               },
                        //               {
                        //                 $project: {
                        //                   _id: 1,
                        //                   stateName: 1,
                        //                 },
                        //               },
                        //             ],
                        //             as: "stateData",
                        //           },
                        //         },
                        //         {
                        //           $unwind: {
                        //             path: "$stateData",
                        //             preserveNullAndEmptyArrays: true,
                        //           },
                        //         },
                        //         {
                        //           $lookup: {
                        //             from: "countries",
                        //             let: { country: "$country" },
                        //             pipeline: [
                        //               {
                        //                 $match: {
                        //                   $expr: {
                        //                     $eq: ["$_id", "$$country"],
                        //                   },
                        //                 },
                        //               },
                        //               {
                        //                 $project: {
                        //                   _id: 1,
                        //                   countryName: 1,
                        //                 },
                        //               },
                        //             ],
                        //             as: "countryData",
                        //           },
                        //         },
                        //         {
                        //           $unwind: {
                        //             path: "$countryData",
                        //             preserveNullAndEmptyArrays: true,
                        //           },
                        //         },
                        //         {
                        //           $project: {
                        //             user_id: 1,
                        //             title: 1,
                        //             address: 1,
                        //             postal_code: 1,
                        //             city: 1,
                        //             //country: 1,
                        //             //state: 1,
                        //             dob: 1,
                        //             license: 1,
                        //             npiNo: 1,
                        //             deaNo: 1,
                        //             experience: 1,
                        //             awards: 1,
                        //             skills: 1,
                        //             qualifications: 1,
                        //             relation: 1,
                        //             emergency_contact_number: 1,
                        //             emergency_contact_name: 1,
                        //             additionalSkill: 1,
                        //             state: "$stateData",
                        //             country: "$countryData",
                        //           },
                        //         },
                        //       ],
                        //       as: "doctorData",
                        //     },
                        //   },
                        //   { $unwind: { path: "$doctorData", preserveNullAndEmptyArrays: true } },
                        //   {
                        //     $lookup: {
                        //       from: "skill",
                        //       let: { skillIds: "$doctorData.skills" },
                        //       pipeline: [
                        //         // {
                        //         //   $match: {
                        //         //     $expr: {
                        //         //       $eq: ["$_id", "$$skillIds"],
                        //         //     },
                        //         //   },
                        //         // },
                        //         { $match: { $expr: { $in: ["$_id", "$$skillIds"] } } },
                        //         {
                        //           $project: {
                        //             skillName: 1,
                        //             _id: 1,
                        //           },
                        //         },
                        //       ],
                        //       as: "skillData",
                        //     },
                        //   },
                        //   {
                        //     $project: {
                        //       first_name: 1,
                        //       last_name: 1,
                        //       email: 1,
                        //       mobile_no: 1,
                        //       image: 1,
                        //       //user_id: "$doctorData.user_id",
                        //       address: "$doctorData.address",
                        //       title: "$doctorData.title",
                        //       postal_code: "$doctorData.postal_code",
                        //       city: "$doctorData.city",
                        //       state: "$doctorData.state",
                        //       country: "$doctorData.country",
                        //       dob: "$doctorData.dob",
                        //       license: "$doctorData.license",
                        //       npiNo: "$doctorData.npiNo",
                        //       deaNo: "$doctorData.deaNo",
                        //       experience: "$doctorData.experience",
                        //       awards: {
                        //         $ifNull: ["$doctorData.awards", []],
                        //       },
                        //       skills: "$skillData",
                        //       qualifications: {
                        //         $ifNull: ["$doctorData.qualifications", []],
                        //       },
                        //       additionalSkill: {
                        //         $ifNull: ["$doctorData.additionalSkill", []],
                        //       },
                        //       emergency_contact_number: "$doctorData.emergency_contact_number",
                        //       emergency_contact_name: "$doctorData.emergency_contact_name",
                        //       relation: "$doctorData.relation",
                        //     },
                        //   },
                        // ]);
                        if (getDoctorResult && getDoctorResult.length > 0) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: getDoctorResult[0],
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_ON_FETCHING_PROVIDER,
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
        this.listProvider = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var roleId, defaultPage, count, populateFeilds, condition, child_condition, isEmptyNameOnlySpace, result, sortedList, obj, error_5;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.findRoleId(EnumRole.PROVIDER)];
                    case 1:
                        roleId = _b.sent();
                        if (!!roleId) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                success: false,
                                data: {
                                    message: erros_message_1.default.ROLE_NOT_FOUND,
                                    error: erros_message_1.default.ON_ADD_ERROR,
                                },
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                            }];
                    case 2:
                        defaultPage = void 0;
                        count = void 0;
                        defaultPage = model.pageNumber ? model.pageNumber : 1;
                        count = model.pageSize ? model.pageSize : 50;
                        populateFeilds = [];
                        condition = {};
                        child_condition = {};
                        child_condition.role = new mongoose_1.default.Types.ObjectId(roleId._id);
                        condition.clinic_id = new mongoose_1.default.Types.ObjectId((_a = model.clinic_id) === null || _a === void 0 ? void 0 : _a.toString());
                        // if ("isDeleted" in model && model.isDeleted)
                        //   child_condition.isDeleted = model.isDeleted;
                        if (model.isDeleted == true || model.isDeleted == false) {
                            child_condition.isDeleted = model.isDeleted;
                        }
                        if (model.search) {
                            isEmptyNameOnlySpace = /^\s*$/.test(model.search);
                            child_condition.$or = [
                                {
                                    first_name: {
                                        $regex: model.search,
                                        $options: "i",
                                    },
                                },
                                {
                                    last_name: {
                                        $regex: model.search,
                                        $options: "i",
                                    },
                                },
                                {
                                    email: {
                                        $regex: model.search,
                                        $options: "i",
                                    },
                                },
                                {
                                    mobile_no: {
                                        $regex: model.search,
                                        $options: "i",
                                    },
                                },
                            ];
                        }
                        if (model.isActive) {
                            child_condition.isActive = model.isActive;
                        }
                        return [4 /*yield*/, doctor_model_1.default.aggregate([
                                { $match: condition },
                                {
                                    $lookup: {
                                        from: "users",
                                        localField: "user_id",
                                        foreignField: "_id",
                                        //pipeline: [{ $match: child_condition }],
                                        as: "userData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$userData",
                                        preserveNullAndEmptyArrays: false,
                                    },
                                },
                                {
                                    $facet: {
                                        count: [{ $count: "count" }],
                                        data: [
                                            {
                                                $project: {
                                                    _id: 1,
                                                    first_name: "$userData.first_name",
                                                    last_name: "$userData.last_name",
                                                    middle_name: 1,
                                                    email: "$userData.email",
                                                    mobile_no: "$userData.mobile_no",
                                                    image: "$userData.image",
                                                    isActive: "$userData.isActive",
                                                    isDeleted: "$userData.isDeleted",
                                                    createdAt: "$userData.createdAt",
                                                },
                                            },
                                            {
                                                $sort: { createdAt: -1 },
                                            },
                                            { $skip: count * (defaultPage - 1) },
                                            { $limit: count },
                                        ],
                                    },
                                },
                            ])];
                    case 3:
                        result = _b.sent();
                        // let result: mongoose.PaginateResult<any> = await UserModel.paginate(
                        //   condition,
                        //   {
                        //     page: defaultPage,
                        //     ...(count > 0 ? { limit: count } : { pagination: false }),
                        //     populate: populateFeilds,
                        //     select: {
                        //       _id: 1,
                        //       first_name: 1,
                        //       last_name: 1,
                        //       email: 1,
                        //       mobile_no: 1,
                        //       image: 1,
                        //       isActive: 1,
                        //       isDeleted: 1,
                        //     },
                        //     sort: { createdAt: -1 },
                        //   }
                        // );
                        if (result &&
                            result.length > 0 &&
                            result[0].data &&
                            result[0].data.length > 0) {
                            sortedList = result[0].data.sort(function (a, b) {
                                return a.first_name.localeCompare(b.first_name);
                            });
                            obj = {
                                data: sortedList,
                                // count: result.totalDocs,
                                totalDocs: result[0].count[0].count,
                                pageNumber: defaultPage,
                                pageSize: count,
                                totalPages: Math.ceil(result[0].count[0].count / count),
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
                                        message: erros_message_1.default.PROVIDER_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_5 = _b.sent();
                        next(error_5);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        //Provides listing for dropdown for filtering data
        this.filterListProvider = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var roleId, condition, response, result, i, userDetails, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.findRoleId(EnumRole.PROVIDER)];
                    case 1:
                        roleId = _a.sent();
                        if (!!roleId) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                success: false,
                                data: {
                                    message: erros_message_1.default.ROLE_NOT_FOUND,
                                    error: erros_message_1.default.ON_ADD_ERROR,
                                },
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                            }];
                    case 2:
                        condition = {
                            isDeleted: false,
                            role: roleId._id,
                            isActive: true,
                        };
                        if (model.clinic_id && model.clinic_id != undefined) {
                            condition.clinic_id = model.clinic_id;
                        }
                        return [4 /*yield*/, doctor_model_1.default.find(condition, {
                                user_id: 1,
                                createdAt: 1,
                            })
                                .populate("user_id", "first_name last_name")
                                .sort({ createdAt: -1 })];
                    case 3:
                        response = _a.sent();
                        if (response && response.length > 0) {
                            result = [];
                            for (i = 0; i < response.length; i++) {
                                userDetails = response[i].user_id;
                                result.push({
                                    _id: response[i]._id,
                                    user_id: userDetails ? userDetails._id : null,
                                    first_name: userDetails ? userDetails.first_name : null,
                                    last_name: userDetails ? userDetails.last_name : null,
                                });
                            }
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: {
                                        data: result,
                                        totalDocs: response.length,
                                    },
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.PROVIDER_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
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
        this.updateAppointmentType = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var condition, assignedAppointmentType, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        condition = {};
                        if (model.assign) {
                            condition.$addToSet = {
                                assignedApptTypes: model.appointment_type_id,
                            };
                        }
                        else {
                            condition.$pull = {
                                assignedApptTypes: model.appointment_type_id,
                            };
                        }
                        return [4 /*yield*/, doctor_model_1.default.update({
                                _id: model._id,
                            }, condition)];
                    case 1:
                        assignedAppointmentType = _a.sent();
                        if (assignedAppointmentType &&
                            assignedAppointmentType.modifiedCount > 0) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: erros_message_1.default.UPDATE_ASSIGNED_APPT_TYPE_SUCCESSFULL,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_ON_UPDATE_APPOINTMENTTYPE,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _a.sent();
                        next(error_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updateLocation = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var condition, assignedLocation, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        condition = {};
                        if (model.assign) {
                            condition.$addToSet = {
                                location: model.location_id,
                            };
                        }
                        else {
                            condition.$pull = { location: model.location_id };
                        }
                        return [4 /*yield*/, doctor_model_1.default.updateOne({
                                _id: model._id,
                            }, condition)];
                    case 1:
                        assignedLocation = _a.sent();
                        if (assignedLocation && assignedLocation.modifiedCount > 0) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: erros_message_1.default.UPDATE_SUCCESSFULL,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_UPDATE_CLINIC_LOCATION,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_8 = _a.sent();
                        next(error_8);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.listAppointmentType = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var defaultPage, count, apptTypesProvider, appointmentTypes, result, obj, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        defaultPage = void 0;
                        count = void 0;
                        defaultPage = model.pageNumber ? model.pageNumber : 1;
                        count = model.pageSize ? model.pageSize : 50;
                        return [4 /*yield*/, doctor_model_1.default.findOne({ _id: model._id }, { assignedApptTypes: 1 })];
                    case 1:
                        apptTypesProvider = _a.sent();
                        appointmentTypes = [];
                        if (apptTypesProvider)
                            appointmentTypes = apptTypesProvider.assignedApptTypes;
                        return [4 /*yield*/, appointment_types_model_1.default.aggregate([
                                {
                                    $match: {
                                        isActive: true,
                                        isDeleted: false,
                                        clinic_id: new mongoose_1.default.Types.ObjectId(model.clinic_id.toString()),
                                    },
                                },
                                {
                                    $facet: {
                                        count: [{ $count: "count" }],
                                        data: [
                                            {
                                                $project: {
                                                    _id: 1,
                                                    type: 1,
                                                    color: 1,
                                                    isAssigned: {
                                                        $cond: [{ $in: ["$_id", appointmentTypes] }, true, false],
                                                    },
                                                },
                                            },
                                            {
                                                $sort: { createdAt: -1 },
                                            },
                                            { $skip: count * (defaultPage - 1) },
                                            { $limit: count },
                                        ],
                                    },
                                },
                            ])];
                    case 2:
                        result = _a.sent();
                        // let apptTypesProvider = await DoctorModel.findOne({ _id: model._id });
                        // let appointmentTypes: any = [];
                        // if (
                        //   apptTypesProvider &&
                        //   apptTypesProvider.assignedApptTypes &&
                        //   apptTypesProvider.assignedApptTypes.length > 0
                        // ) {
                        //   apptTypesProvider.assignedApptTypes.forEach((e) => {
                        //     appointmentTypes.push(e!.toString());
                        //   });
                        // }
                        if (result &&
                            result.length > 0 &&
                            result[0].data &&
                            result[0].data.length > 0) {
                            obj = {
                                data: result[0].data,
                                // count: result.totalDocs,
                                totalDocs: result[0].count[0].count,
                                pageNumber: defaultPage,
                                pageSize: count,
                                totalPages: Math.ceil(result[0].count[0].count / count),
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
                                        message: erros_message_1.default.APPOINTMENT_TYPE_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_9 = _a.sent();
                        next(error_9);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.listLocation = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var defaultPage, count, locationProvider, location, result, obj, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        defaultPage = void 0;
                        count = void 0;
                        defaultPage = model.pageNumber ? model.pageNumber : 1;
                        count = model.pageSize ? model.pageSize : 50;
                        return [4 /*yield*/, doctor_model_1.default.findOne({ _id: model._id }, { location: 1 })];
                    case 1:
                        locationProvider = _a.sent();
                        location = [];
                        if (locationProvider)
                            location = locationProvider.location;
                        return [4 /*yield*/, location_model_1.default.aggregate([
                                {
                                    $match: {
                                        isActive: true,
                                        isDeleted: false,
                                        clinic_id: new mongoose_1.default.Types.ObjectId(model.clinic_id.toString()),
                                    },
                                },
                                {
                                    $facet: {
                                        count: [{ $count: "count" }],
                                        data: [
                                            {
                                                $lookup: {
                                                    from: "states",
                                                    let: { state: "$state" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $eq: ["$_id", "$$state"],
                                                                },
                                                            },
                                                        },
                                                        { $project: { stateName: 1 } },
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
                                                $lookup: {
                                                    from: "countries",
                                                    let: { country: "$country" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $eq: ["$_id", "$$country"],
                                                                },
                                                            },
                                                        },
                                                        { $project: { countryName: 1 } },
                                                    ],
                                                    as: "countryData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$countryData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $project: {
                                                    _id: 1,
                                                    branchName: 1,
                                                    address: 1,
                                                    city: 1,
                                                    state: "$stateData.stateName",
                                                    country: "$countryData.countryName",
                                                    isAssigned: {
                                                        $cond: [{ $in: ["$_id", location] }, true, false],
                                                    },
                                                },
                                            },
                                            {
                                                $sort: { createdAt: -1 },
                                            },
                                            { $skip: count * (defaultPage - 1) },
                                            { $limit: count },
                                        ],
                                    },
                                },
                            ])];
                    case 2:
                        result = _a.sent();
                        // let locations: any = [];
                        // if (
                        //   locationProvider &&
                        //   locationProvider.location &&
                        //   locationProvider.location.length > 0
                        // ) {
                        //   locationProvider.location.forEach((e) => {
                        //     locations.push(e!.toString());
                        //   });
                        // }
                        if (result &&
                            result.length > 0 &&
                            result[0].data &&
                            result[0].data.length > 0) {
                            obj = {
                                data: result[0].data,
                                // count: result.totalDocs,
                                totalDocs: result[0].count[0].count,
                                pageNumber: defaultPage,
                                pageSize: count,
                                totalPages: Math.ceil(result[0].count[0].count / count),
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
                                        message: erros_message_1.default.CLINIC_LOCATIONS_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_10 = _a.sent();
                        next(error_10);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.filterListLocations = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var result, obj, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, doctor_model_1.default.aggregate([
                                {
                                    $match: {
                                        // isActive: true,
                                        // isDeleted: false,
                                        _id: new mongoose_1.default.Types.ObjectId(model.doctor_id.toString()),
                                    },
                                },
                                {
                                    $unwind: "$location",
                                },
                                {
                                    $lookup: {
                                        from: "clinic_locations",
                                        let: { loc_id: "$location" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$_id", "$$loc_id"],
                                                    },
                                                },
                                            },
                                            {
                                                $project: {
                                                    branchName: 1,
                                                    address: 1,
                                                    city: 1,
                                                },
                                            },
                                        ],
                                        as: "locData",
                                    },
                                },
                                {
                                    $unwind: "$locData",
                                },
                                {
                                    $project: {
                                        _id: "$locData._id",
                                        branchName: "$locData.branchName",
                                        address: "$locData.address",
                                        city: "$locData.city",
                                    },
                                },
                                // {
                                //   $facet: {
                                //     count: [{ $count: "count" }],
                                //     data: [
                                //       {
                                //         $lookup: {
                                //           from: "states",
                                //           let: { state: "$state" },
                                //           pipeline: [
                                //             {
                                //               $match: {
                                //                 $expr: {
                                //                   $eq: ["$_id", "$$state"],
                                //                 },
                                //               },
                                //             },
                                //             { $project: { stateName: 1 } },
                                //           ],
                                //           as: "stateData",
                                //         },
                                //       },
                                //       {
                                //         $unwind: {
                                //           path: "$stateData",
                                //           preserveNullAndEmptyArrays: true,
                                //         },
                                //       },
                                //       {
                                //         $lookup: {
                                //           from: "countries",
                                //           let: { country: "$country" },
                                //           pipeline: [
                                //             {
                                //               $match: {
                                //                 $expr: {
                                //                   $eq: ["$_id", "$$country"],
                                //                 },
                                //               },
                                //             },
                                //             { $project: { countryName: 1 } },
                                //           ],
                                //           as: "countryData",
                                //         },
                                //       },
                                //       {
                                //         $unwind: {
                                //           path: "$countryData",
                                //           preserveNullAndEmptyArrays: true,
                                //         },
                                //       },
                                //       {
                                //         $project: {
                                //           _id: 1,
                                //           branchName: 1,
                                //           address: 1,
                                //           city: 1,
                                //           state: "$stateData.stateName",
                                //           country: "$countryData.countryName",
                                //         },
                                //       },
                                //       {
                                //         $sort: { createdAt: -1 },
                                //       },
                                //     ],
                                //   },
                                // },
                            ])];
                    case 1:
                        result = _a.sent();
                        if (result && result.length > 0) {
                            obj = {
                                data: result,
                                // count: result.totalDocs,
                                totalDocs: result.length,
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
                                        message: erros_message_1.default.CLINIC_LOCATIONS_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_11 = _a.sent();
                        next(error_11);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.filterListApptType = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var result, obj, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, doctor_model_1.default.aggregate([
                                {
                                    $match: {
                                        //isActive: true,
                                        //isDeleted: false,
                                        _id: new mongoose_1.default.Types.ObjectId(model.doctor_id.toString()),
                                    },
                                },
                                {
                                    $unwind: "$assignedApptTypes",
                                },
                                {
                                    $lookup: {
                                        from: "appointment_type",
                                        let: {
                                            apt_id: "$assignedApptTypes",
                                            clinic_id: "$clinic_id",
                                        },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        // $eq: ["$_id", "$$apt_id"],
                                                        $and: [
                                                            {
                                                                $eq: ["$clinic_id", "$$clinic_id"],
                                                            },
                                                            { $eq: ["$_id", "$$apt_id"] },
                                                            { $eq: ["$isActive", true] },
                                                            { $eq: ["$isDeleted", false] },
                                                        ],
                                                    },
                                                },
                                            },
                                            {
                                                $project: {
                                                    type: 1,
                                                    color: 1,
                                                    duration: 1,
                                                    isMultiPatient: 1,
                                                    number_of_patients: 1,
                                                },
                                            },
                                        ],
                                        as: "aptData",
                                    },
                                },
                                {
                                    $unwind: "$aptData",
                                },
                                {
                                    $project: {
                                        _id: "$aptData._id",
                                        type: "$aptData.type",
                                        color: "$aptData.color",
                                        duration: "$aptData.duration",
                                        isMultiPatient: "$aptData.isMultiPatient",
                                        number_of_patients: "$aptData.number_of_patients",
                                    },
                                },
                                // {
                                //   $facet: {
                                //     count: [{ $count: "count" }],
                                //     data: [
                                //       {
                                //         $lookup: {
                                //           from: "states",
                                //           let: { state: "$state" },
                                //           pipeline: [
                                //             {
                                //               $match: {
                                //                 $expr: {
                                //                   $eq: ["$_id", "$$state"],
                                //                 },
                                //               },
                                //             },
                                //             { $project: { stateName: 1 } },
                                //           ],
                                //           as: "stateData",
                                //         },
                                //       },
                                //       {
                                //         $unwind: {
                                //           path: "$stateData",
                                //           preserveNullAndEmptyArrays: true,
                                //         },
                                //       },
                                //       {
                                //         $lookup: {
                                //           from: "countries",
                                //           let: { country: "$country" },
                                //           pipeline: [
                                //             {
                                //               $match: {
                                //                 $expr: {
                                //                   $eq: ["$_id", "$$country"],
                                //                 },
                                //               },
                                //             },
                                //             { $project: { countryName: 1 } },
                                //           ],
                                //           as: "countryData",
                                //         },
                                //       },
                                //       {
                                //         $unwind: {
                                //           path: "$countryData",
                                //           preserveNullAndEmptyArrays: true,
                                //         },
                                //       },
                                //       {
                                //         $project: {
                                //           _id: 1,
                                //           branchName: 1,
                                //           address: 1,
                                //           city: 1,
                                //           state: "$stateData.stateName",
                                //           country: "$countryData.countryName",
                                //         },
                                //       },
                                //       {
                                //         $sort: { createdAt: -1 },
                                //       },
                                //     ],
                                //   },
                                // },
                            ])];
                    case 1:
                        result = _a.sent();
                        if (result && result.length > 0) {
                            obj = {
                                data: result,
                                // count: result.totalDocs,
                                totalDocs: result.length,
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
                                        message: erros_message_1.default.NO_RECORD_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_12 = _a.sent();
                        next(error_12);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        //filterListLocations
        this.getAssignedApptType = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var finalObjectToBeSend, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, doctor_model_1.default.aggregate([
                                {
                                    $match: {
                                        _id: new mongoose_1.default.Types.ObjectId(model._id.toString()),
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "appointment_type",
                                        localField: "assignedApptTypes",
                                        foreignField: "_id",
                                        as: "assignedApptTypes",
                                    },
                                },
                                { $project: { assignedApptTypes: 1 } },
                            ])];
                    case 1:
                        finalObjectToBeSend = _a.sent();
                        if (model.selectedDaysofWeekArr) {
                            model.selectedDaysofWeekArr.forEach(function (el) {
                                return el.isChecked == true
                                    ? (el.isSelectedForSlots = true)
                                    : (el.isSelectedForSlots = false);
                            });
                        }
                        if (model.selectedDaysofWeekArr)
                            finalObjectToBeSend[0].assignedApptTypes.forEach(function (apptType) {
                                return (apptType.selectedDaysofWeekArr = model.selectedDaysofWeekArr);
                            });
                        if (finalObjectToBeSend && finalObjectToBeSend.length > 0) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    data: finalObjectToBeSend[0],
                                    success: true,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.APPOINTMENT_TYPE_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_13 = _a.sent();
                        next(error_13);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.findRoleId = function (roleName) { return __awaiter(_this, void 0, void 0, function () {
            var roleIdData, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, roles_model_1.default.findOne({
                                roleName: roleName,
                                isActive: true,
                                isDeleted: false,
                            }, { _id: 1, permission: 1 })];
                    case 1:
                        roleIdData = _a.sent();
                        //if (roleIdData && "_id" in roleIdData) return roleIdData._id;
                        if (roleIdData)
                            return [2 /*return*/, roleIdData];
                        else
                            return [2 /*return*/, null];
                        return [3 /*break*/, 3];
                    case 2:
                        error_14 = _a.sent();
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // Download provider  data
        this.getProviderDataToExcel = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var roleId, workbook, providerSheet_1, providerSheetHeader, condition, child_condition, isEmptyNameOnlySpace, result, sortedList, Providerdata, sheetStyle_1, data, link, excelFileName, response, error_15;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 8, , 9]);
                        return [4 /*yield*/, this.findRoleId(EnumRole.PROVIDER)];
                    case 1:
                        roleId = _b.sent();
                        if (!roleId)
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ROLE_NOT_FOUND,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        return [4 /*yield*/, xlsx_populate_1.default.fromBlankAsync()];
                    case 2:
                        workbook = _b.sent();
                        providerSheet_1 = workbook.sheet("Sheet1");
                        providerSheetHeader = ["Name", "Email", "Status"];
                        providerSheetHeader.forEach(function (el, i) {
                            providerSheet_1
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
                        condition = {};
                        child_condition = {};
                        child_condition.role = new mongoose_1.default.Types.ObjectId(roleId._id);
                        condition.clinic_id = new mongoose_1.default.Types.ObjectId((_a = model.clinic_id) === null || _a === void 0 ? void 0 : _a.toString());
                        if (model.isDeleted == true || model.isDeleted == false) {
                            child_condition.isDeleted = model.isDeleted;
                        }
                        if (model.search) {
                            isEmptyNameOnlySpace = /^\s*$/.test(model.search);
                            child_condition.$or = [
                                {
                                    first_name: {
                                        $regex: model.search,
                                        $options: "i",
                                    },
                                },
                                {
                                    last_name: {
                                        $regex: model.search,
                                        $options: "i",
                                    },
                                },
                                {
                                    email: {
                                        $regex: model.search,
                                        $options: "i",
                                    },
                                },
                                {
                                    mobile_no: {
                                        $regex: model.search,
                                        $options: "i",
                                    },
                                },
                            ];
                        }
                        if (model.isActive) {
                            child_condition.isActive = model.isActive;
                        }
                        return [4 /*yield*/, doctor_model_1.default.aggregate([
                                { $match: condition },
                                {
                                    $lookup: {
                                        from: "users",
                                        localField: "user_id",
                                        foreignField: "_id",
                                        pipeline: [{ $match: child_condition }],
                                        as: "userData",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$userData",
                                        preserveNullAndEmptyArrays: false,
                                    },
                                },
                                {
                                    $facet: {
                                        count: [{ $count: "count" }],
                                        data: [
                                            {
                                                $project: {
                                                    _id: 1,
                                                    first_name: "$userData.first_name",
                                                    last_name: "$userData.last_name",
                                                    email: "$userData.email",
                                                    isActive: "$userData.isActive",
                                                },
                                            },
                                            {
                                                $sort: { createdAt: -1 },
                                            },
                                        ],
                                    },
                                },
                            ])];
                    case 3:
                        result = _b.sent();
                        if (!(result &&
                            result.length > 0 &&
                            result[0].data &&
                            result[0].data.length > 0)) return [3 /*break*/, 6];
                        sortedList = result[0].data.sort(function (a, b) {
                            return a.first_name.localeCompare(b.first_name);
                        });
                        Providerdata = sortedList;
                        sheetStyle_1 = {
                            border: true,
                            fontFamily: "Calibri",
                        };
                        Providerdata.forEach(function (el, i) {
                            providerSheet_1
                                .cell("A" + (i + 2))
                                .value(el.first_name + " " + el.last_name)
                                .style(sheetStyle_1);
                            providerSheet_1;
                            providerSheet_1
                                .cell("B" + (i + 2))
                                .value(el.email ? el.email : "")
                                .style(sheetStyle_1);
                            providerSheet_1
                                .cell("C" + (i + 2))
                                .value(el.isActive == true ? "Unarchived" : "Archived")
                                .style(sheetStyle_1);
                        });
                        providerSheet_1.freezePanes(1, 1);
                        return [4 /*yield*/, workbook.outputAsync()];
                    case 4:
                        data = _b.sent();
                        return [4 /*yield*/, fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../../../../public/upload/providers/Provider_Report.xlsx"), data)];
                    case 5:
                        _b.sent();
                        link = "http://".concat(req.hostname, ":").concat(process.env.PORT, "/upload/providers/Provider_Report.xlsx");
                        excelFileName = "Provider_Report.xlsx";
                        response = {
                            link: link,
                            name: excelFileName,
                        };
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                data: response,
                                success: true,
                            }];
                    case 6: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.PROVIDER_LIST_NOT_FOUND,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_15 = _b.sent();
                        next(error_15);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.fetchProviders = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, providerRoleData_1, last_fetch, last_fetch_time, fetch_time, make_fetch_req_entry, FETCH_PROVIDER_URL, data_fetched, data_1, user_data_1, existingRecords, conflicted_ids_1, bulkDoctor_1, bulkUser_1, doctorSaved, userSaved, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 16, , 17]);
                        userDetails = req.user;
                        return [4 /*yield*/, roles_model_1.default.findOne({
                                roleName: "provider",
                            }, { _id: 1, permission: 1 })];
                    case 1:
                        providerRoleData_1 = _a.sent();
                        if (!providerRoleData_1)
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ROLE_NOT_FOUND,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        return [4 /*yield*/, fetch_data_model_1.default.find({ clinic_id: model.clinic_id, type: "PROVIDER" }, { fetch_time: 1 })
                                .sort({ createdAt: -1 })
                                .limit(1)];
                    case 2:
                        last_fetch = _a.sent();
                        last_fetch_time = new Date((0, moment_1.default)(Date.now() - 7 * 24 * 3600 * 1000).format("YYYY-MM-DD"));
                        if (last_fetch && last_fetch.length) {
                            last_fetch_time = last_fetch[0].fetch_time;
                        }
                        fetch_time = new Date();
                        return [4 /*yield*/, fetch_data_model_1.default.create({
                                type: "PROVIDER",
                                last_fetch_time: last_fetch_time,
                                fetch_time: fetch_time,
                                clinic_id: model.clinic_id,
                                createdby_id: userDetails._id,
                            })];
                    case 3:
                        make_fetch_req_entry = _a.sent();
                        if (!make_fetch_req_entry) return [3 /*break*/, 14];
                        FETCH_PROVIDER_URL = "http://192.168.1.140:1336/api/rcm/doctor/exportData";
                        return [4 /*yield*/, axios_1.default.post(FETCH_PROVIDER_URL, {
                                currentDateTime: fetch_time,
                                lastFetchTime: last_fetch_time,
                            })];
                    case 4:
                        data_fetched = _a.sent();
                        if (!(data_fetched &&
                            data_fetched.data &&
                            data_fetched.data.data &&
                            (data_fetched.data.data.updatedArr.length ||
                                data_fetched.data.data.createdArr.length))) return [3 /*break*/, 12];
                        data_1 = [];
                        user_data_1 = [];
                        data_fetched.data.data.createdArr.forEach(function (singleRecord) {
                            data_1.push({
                                clinic_id: model.clinic_id,
                                _id: singleRecord._id,
                                user_id: singleRecord.user_id,
                                npiNo: singleRecord.npiNo,
                                deaNo: singleRecord.deaNo,
                                title: singleRecord.title,
                                license: singleRecord.license,
                                //relation: singleRecord.relation ? singleRecord.relation : null,
                                emergency_contact_number: singleRecord.emergency_contact_number
                                    ? singleRecord.emergency_contact_number
                                    : null,
                                emergency_contact_name: singleRecord.emergency_contact_name
                                    ? singleRecord.emergency_contact_name
                                    : null,
                                experience: singleRecord.experience,
                                dob: singleRecord.dob,
                                address: singleRecord.address,
                                postal_code: singleRecord.postal_code,
                                createdAt: singleRecord.createdAt,
                                updatedAt: singleRecord.updatedAt,
                                city: singleRecord.city,
                            });
                            user_data_1.push({
                                _id: singleRecord.user_id,
                                first_name: singleRecord.first_name,
                                last_name: singleRecord.last_name,
                                email: singleRecord.email,
                                mobile_no: singleRecord.mobile_no,
                                role: providerRoleData_1._id,
                                role_permission: providerRoleData_1.permission,
                            });
                        });
                        data_fetched.data.data.updatedArr.forEach(function (singleRecord) {
                            data_1.push({
                                clinic_id: model.clinic_id,
                                role: providerRoleData_1._id,
                                role_permission: providerRoleData_1.permission,
                                _id: singleRecord._id,
                                user_id: singleRecord.user_id,
                                npiNo: singleRecord.npiNo,
                                deaNo: singleRecord.deaNo,
                                title: singleRecord.title,
                                license: singleRecord.license,
                                //relation: singleRecord.relation ? singleRecord.relation : null,
                                emergency_contact_number: singleRecord.emergency_contact_number
                                    ? singleRecord.emergency_contact_number
                                    : null,
                                emergency_contact_name: singleRecord.emergency_contact_name
                                    ? singleRecord.emergency_contact_name
                                    : null,
                                experience: singleRecord.experience,
                                dob: singleRecord.dob,
                                address: singleRecord.address,
                                postal_code: singleRecord.postal_code,
                                createdAt: singleRecord.createdAt,
                                updatedAt: singleRecord.updatedAt,
                                city: singleRecord.city,
                            });
                            user_data_1.push({
                                _id: singleRecord.user_id,
                                first_name: singleRecord.first_name,
                                last_name: singleRecord.last_name,
                                email: singleRecord.email,
                                mobile_no: singleRecord.mobile_no,
                                role: providerRoleData_1._id,
                                role_permission: providerRoleData_1.permission,
                            });
                        });
                        return [4 /*yield*/, doctor_model_1.default.find({
                                $or: data_1.map(function (singleDoctor) { return ({
                                    _id: singleDoctor._id,
                                }); }),
                            }, { _id: 1, clinic_id: 1 })];
                    case 5:
                        existingRecords = _a.sent();
                        conflicted_ids_1 = [];
                        if (existingRecords && existingRecords.length) {
                            existingRecords.forEach(function (e) {
                                var foundIndex = data_1.findIndex(function (a) {
                                    return a._id.toString() == e._id.toString() &&
                                        a.clinic_id.toString() != e.clinic_id.toString();
                                });
                                if (foundIndex > -1) {
                                    conflicted_ids_1.push(data_1[foundIndex]._id);
                                    data_1.splice(foundIndex, 1);
                                }
                            });
                        }
                        if (!conflicted_ids_1.length) return [3 /*break*/, 7];
                        return [4 /*yield*/, fetch_data_model_1.default.updateOne({ _id: make_fetch_req_entry._id }, { conflicted_ids: conflicted_ids_1 })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        if (!(data_1.length > 0)) return [3 /*break*/, 10];
                        bulkDoctor_1 = [];
                        data_1.forEach(function (singleRecord) {
                            bulkDoctor_1.push({
                                updateOne: {
                                    filter: { _id: singleRecord._id },
                                    update: {
                                        $set: singleRecord,
                                    },
                                    upsert: true,
                                },
                            });
                        });
                        bulkUser_1 = [];
                        if (user_data_1.length > 0) {
                            user_data_1.forEach(function (singleRecord) {
                                bulkUser_1.push({
                                    updateOne: {
                                        filter: { _id: singleRecord._id },
                                        update: {
                                            $set: singleRecord,
                                        },
                                        upsert: true,
                                    },
                                });
                            });
                        }
                        return [4 /*yield*/, doctor_model_1.default.bulkWrite(bulkDoctor_1)];
                    case 8:
                        doctorSaved = _a.sent();
                        return [4 /*yield*/, user_model_1.default.bulkWrite(bulkUser_1)];
                    case 9:
                        userSaved = _a.sent();
                        if (doctorSaved && userSaved) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    data: conflicted_ids_1.length
                                        ? erros_message_1.default.DATA_FETCHED_SUCCESS_WITH_CONFLICTS
                                        : erros_message_1.default.DATA_FETCHED_SUCCESS,
                                    success: true,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NO_DATA_TO_FETCH,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 11];
                    case 10: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: conflicted_ids_1.length
                                    ? erros_message_1.default.NO_DATA_TO_FETCH_BUT_CONFLICT_PRESENT
                                    : erros_message_1.default.NO_DATA_TO_FETCH,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 11: return [3 /*break*/, 13];
                    case 12: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.NO_DATA_TO_FETCH,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 13: return [3 /*break*/, 15];
                    case 14: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.FAILED_TO_FETCH_DATA,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        error_16 = _a.sent();
                        next(error_16);
                        return [3 /*break*/, 17];
                    case 17: return [2 /*return*/];
                }
            });
        }); };
    }
    return ProviderServices;
}());
exports.default = new ProviderServices();
