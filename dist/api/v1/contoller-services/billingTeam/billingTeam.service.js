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
var fs_1 = __importDefault(require("fs"));
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var lodash_1 = __importDefault(require("lodash"));
var mongoose_1 = __importDefault(require("mongoose"));
var path_1 = __importDefault(require("path"));
var xlsx_populate_1 = __importDefault(require("xlsx-populate"));
var erros_message_1 = __importDefault(require("../../common/erros_message"));
var billing_team_model_1 = __importDefault(require("../../models/billing_team.model"));
var billing_team_associated_clinics_model_1 = __importDefault(require("../../models/billing_team_associated_clinics.model"));
var billing_team_member_model_1 = __importDefault(require("../../models/billing_team_member.model"));
var history_model_1 = __importStar(require("../../models/history.model"));
var user_model_1 = __importDefault(require("../../models/user.model"));
var EnumRole;
(function (EnumRole) {
    EnumRole["PROVIDER"] = "provider";
})(EnumRole = exports.EnumRole || (exports.EnumRole = {}));
var BillingTeamServices = /** @class */ (function () {
    function BillingTeamServices() {
        var _this = this;
        this.addBillingTeam = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, alreadyPresentBillingTeam, saveBillingTeamResult_1, associated_clinis_1, findBillingTeamResult, findAssociatedClinics, addHistory, clinicData_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, , 12]);
                        userDetails = req.user;
                        model.createdby_id = userDetails._id;
                        return [4 /*yield*/, billing_team_model_1.default.findOne({
                                name: model.name,
                                isDeleted: false,
                            })];
                    case 1:
                        alreadyPresentBillingTeam = _a.sent();
                        if (!alreadyPresentBillingTeam) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                success: false,
                                data: {
                                    message: erros_message_1.default.ALREADY_EXIST_BILLING_TEAM,
                                    error: erros_message_1.default.ON_ADD_ERROR,
                                },
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                            }];
                    case 2: return [4 /*yield*/, billing_team_model_1.default.create(model)];
                    case 3:
                        saveBillingTeamResult_1 = _a.sent();
                        if (!saveBillingTeamResult_1) return [3 /*break*/, 5];
                        associated_clinis_1 = [];
                        if (model.clinics && model.clinics.length) {
                            model.clinics.forEach(function (e) {
                                associated_clinis_1.push({
                                    team_id: saveBillingTeamResult_1._id,
                                    clinic: e,
                                    createdby_id: model.createdby_id,
                                });
                            });
                        }
                        if (!associated_clinis_1.length) return [3 /*break*/, 5];
                        return [4 /*yield*/, billing_team_associated_clinics_model_1.default.insertMany(associated_clinis_1)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, billing_team_model_1.default.findOne({
                            _id: saveBillingTeamResult_1._id,
                        }, { updatedAt: 0, createdAt: 0, __v: 0 })];
                    case 6:
                        findBillingTeamResult = _a.sent();
                        if (!findBillingTeamResult) return [3 /*break*/, 9];
                        return [4 /*yield*/, billing_team_associated_clinics_model_1.default.find({
                                team_id: saveBillingTeamResult_1._id,
                            }, { updatedAt: 0, createdAt: 0, __v: 0 }).populate({
                                path: "clinic",
                                select: { clinic_name: 1, clinic_type: 1 },
                            })];
                    case 7:
                        findAssociatedClinics = _a.sent();
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: model.createdby_id,
                                description: "Billing team added",
                                type: history_model_1.EHistoryActivityTypeValues.BillingTeam,
                                type_id: model.createdby_id,
                                data: {
                                    team_id: findBillingTeamResult._id,
                                    name: findBillingTeamResult.name,
                                    //clinics: findBillingTeamResult.clinics,
                                },
                            })];
                    case 8:
                        addHistory = _a.sent();
                        clinicData_1 = [];
                        if (findAssociatedClinics) {
                            findAssociatedClinics.forEach(function (e) {
                                clinicData_1.push(e.clinic);
                            });
                        }
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: {
                                    _id: findBillingTeamResult._id,
                                    name: findBillingTeamResult.name,
                                    clinics: clinicData_1,
                                },
                            }];
                    case 9: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ON_ADD_BILLING_TEAM,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        }); };
        this.updateBillingTeam = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails_1, alreadyPresentBillingTeam, updateBillingTeamResult, find_associated_clinics, clinics_to_update_add_1, clinics_to_update_remove_1, associated_clinics_1, history_obj, addHistory, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 14, , 15]);
                        userDetails_1 = req.user;
                        model.clinics = lodash_1.default.uniq(model.clinics);
                        return [4 /*yield*/, billing_team_model_1.default.findOne({
                                name: model.name,
                                isDeleted: false,
                                _id: { $ne: model._id },
                            })];
                    case 1:
                        alreadyPresentBillingTeam = _a.sent();
                        if (!alreadyPresentBillingTeam) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                success: false,
                                data: {
                                    message: erros_message_1.default.ALREADY_EXIST_BILLING_TEAM,
                                    error: erros_message_1.default.ON_UPDATE_ERROR,
                                },
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                            }];
                    case 2: return [4 /*yield*/, billing_team_model_1.default.updateOne({ _id: model._id }, model)];
                    case 3:
                        updateBillingTeamResult = _a.sent();
                        return [4 /*yield*/, billing_team_associated_clinics_model_1.default.find({ team_id: model._id }, { clinic: 1, _id: 0, isDeleted: 1 })];
                    case 4:
                        find_associated_clinics = _a.sent();
                        clinics_to_update_add_1 = [];
                        clinics_to_update_remove_1 = [];
                        if (find_associated_clinics) {
                            find_associated_clinics.forEach(function (e) {
                                var _a, _b, _c, _d;
                                if (e.clinic) {
                                    if (model.clinics.includes((_a = e.clinic) === null || _a === void 0 ? void 0 : _a.toString())) {
                                        var index = model.clinics.indexOf((_b = e.clinic) === null || _b === void 0 ? void 0 : _b.toString());
                                        if (index !== -1) {
                                            //found
                                            if (e.isDeleted)
                                                clinics_to_update_add_1.push((_c = e.clinic) === null || _c === void 0 ? void 0 : _c.toString());
                                            model.clinics.splice(index, 1);
                                        }
                                    }
                                    else {
                                        clinics_to_update_remove_1.push((_d = e.clinic) === null || _d === void 0 ? void 0 : _d.toString());
                                    }
                                }
                            });
                        }
                        associated_clinics_1 = [];
                        if (model.clinics && model.clinics.length) {
                            model.clinics.forEach(function (e) {
                                associated_clinics_1.push({
                                    team_id: model._id,
                                    clinic: e,
                                    createdby_id: userDetails_1._id,
                                });
                            });
                        }
                        if (!associated_clinics_1.length) return [3 /*break*/, 6];
                        return [4 /*yield*/, billing_team_associated_clinics_model_1.default.insertMany(associated_clinics_1)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        if (!clinics_to_update_remove_1.length) return [3 /*break*/, 8];
                        return [4 /*yield*/, billing_team_associated_clinics_model_1.default.updateMany({
                                team_id: model._id,
                                clinic: { $in: clinics_to_update_remove_1 },
                            }, { $set: { isDeleted: true } })];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        if (!clinics_to_update_add_1.length) return [3 /*break*/, 10];
                        return [4 /*yield*/, billing_team_associated_clinics_model_1.default.updateMany({
                                team_id: model._id,
                                clinic: { $in: clinics_to_update_add_1 },
                            }, { $set: { isDeleted: false } })];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        if (!updateBillingTeamResult) return [3 /*break*/, 12];
                        history_obj = {};
                        if (model._id)
                            history_obj.team_id = model._id;
                        if (model.clinics)
                            history_obj.clinics = model.clinics;
                        if (model.isActive)
                            history_obj.isActive = model.isActive;
                        if (model.name)
                            history_obj.name = model.name;
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails_1._id,
                                description: "Billing team updated",
                                type: history_model_1.EHistoryActivityTypeValues.BillingTeam,
                                type_id: userDetails_1._id,
                                data: history_obj,
                            })];
                    case 11:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.UPDATE_SUCCESSFULL,
                            }];
                    case 12: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ON_UPDATE_BILLING_TEAM,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        }); };
        this.deleteBillingTeam = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, deleteBillingTeamResult, addHistory, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        userDetails = req.user;
                        return [4 /*yield*/, billing_team_model_1.default.updateOne({ _id: req.params._id }, { isDeleted: true })];
                    case 1:
                        deleteBillingTeamResult = _a.sent();
                        if (!(deleteBillingTeamResult &&
                            deleteBillingTeamResult.modifiedCount > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "Billing team deleted",
                                type: history_model_1.EHistoryActivityTypeValues.BillingTeam,
                                type_id: userDetails._id,
                                data: {
                                    team_id: model._id,
                                },
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
                                message: erros_message_1.default.ERROR_ON_DELETE_BILLING_TEAM,
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
        this.addMember = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, alreadyPresentEmail, createUser, assignResult, addHistory, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        userDetails = req.user;
                        return [4 /*yield*/, user_model_1.default.findOne({
                                email: model.email.toLowerCase(),
                            })];
                    case 1:
                        alreadyPresentEmail = _a.sent();
                        if (alreadyPresentEmail)
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ALREADY_ASSOCIATED_EMAIL,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        return [4 /*yield*/, user_model_1.default.create({
                                email: model.email,
                                first_name: model.first_name,
                                last_name: model.last_name,
                                role: model.role_id,
                            })];
                    case 2:
                        createUser = _a.sent();
                        return [4 /*yield*/, billing_team_member_model_1.default.create({
                                team_id: model.team_id,
                                member_id: createUser._id,
                                role_id: model.role_id,
                            })];
                    case 3:
                        assignResult = _a.sent();
                        if (!assignResult) return [3 /*break*/, 5];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "Team member assigned",
                                type: history_model_1.EHistoryActivityTypeValues.BillingTeam,
                                type_id: userDetails._id,
                                data: {
                                    team_id: model.team_id,
                                    email: model.email,
                                    first_name: model.first_name,
                                    last_name: model.last_name,
                                    role: model.role_id,
                                },
                            })];
                    case 4:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.TEAM_MEMBER_ASSIGN_SUCCESSFULL,
                            }];
                    case 5: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ON_ASSIGNING_BILLING_TEAM,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
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
        this.getBillingTeam = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var getBillingTeamResult, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, billing_team_model_1.default.aggregate([
                                {
                                    $match: {
                                        _id: new mongoose_1.default.Types.ObjectId(model._id),
                                        //isActive: true,
                                        //isDeleted: false,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "billing_team_associated_clinics",
                                        let: { team_id: "$_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$team_id", "$$team_id"],
                                                    },
                                                    isActive: true,
                                                    isDeleted: false,
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "clinic",
                                                    let: { clinic_id: "$clinic" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $eq: ["$_id", "$$clinic_id"],
                                                                },
                                                                isActive: true,
                                                                isDeleted: false,
                                                            },
                                                        },
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
                                                $project: {
                                                    _id: 1,
                                                    clinic: "$clinicData.clinic_name",
                                                },
                                            },
                                        ],
                                        as: "associatedClinicData",
                                    },
                                },
                                // {
                                //   $unwind: {
                                //     path: "$associatedClinicData",
                                //     preserveNullAndEmptyArrays: true,
                                //   },
                                // },
                                {
                                    $lookup: {
                                        from: "billing_team_member",
                                        let: { team_id: "$_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$team_id", "$$team_id"],
                                                    },
                                                    isActive: true,
                                                    isDeleted: false,
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "users",
                                                    let: { member_id: "$member_id" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $eq: ["$_id", "$$member_id"],
                                                                },
                                                                isActive: true,
                                                                isDeleted: false,
                                                            },
                                                        },
                                                        {
                                                            $lookup: {
                                                                from: "roles",
                                                                let: { role_id: "$role" },
                                                                pipeline: [
                                                                    {
                                                                        $match: {
                                                                            $expr: {
                                                                                $eq: ["$_id", "$$role_id"],
                                                                            },
                                                                            // isActive: true,
                                                                            // isDeleted: false,
                                                                        },
                                                                    },
                                                                ],
                                                                as: "roleData",
                                                            },
                                                        },
                                                        {
                                                            $unwind: {
                                                                path: "$roleData",
                                                                preserveNullAndEmptyArrays: true,
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
                                                    _id: 1,
                                                    first_name: "$userData.first_name",
                                                    last_name: "$userData.last_name",
                                                    email: "$userData.email",
                                                    mobile_no: "$userData.mobile_no",
                                                    role: "$userData.roleData.roleTitle",
                                                },
                                            },
                                        ],
                                        as: "memberData",
                                    },
                                },
                                {
                                    $project: {
                                        _id: 1,
                                        name: 1,
                                        clinics: "$associatedClinicData",
                                        members: "$memberData",
                                    },
                                },
                            ])];
                    case 1:
                        getBillingTeamResult = _a.sent();
                        // let getBillingTeamResult = await BillingTeamModel.findOne(
                        //   {
                        //     _id: model._id,
                        //     isActive: true,
                        //     isDeleted: false,
                        //   },
                        //   { updatedAt: 0, createdAt: 0, __v: 0, createdby_id: 0 }
                        // );
                        // let findAssociatedClinics = await BillingTeamAssociatedClinicsModel.find(
                        //   {
                        //     team_id: model._id,
                        //     isActive: true,
                        //     isDeleted: false,
                        //   },
                        //   { updatedAt: 0, createdAt: 0, __v: 0, createdby_id: 0 }
                        // ).populate({ path: "clinic", select: "clinic_name clinic_type" });
                        if (getBillingTeamResult) {
                            // let clinicData: any = [];
                            // if (findAssociatedClinics) {
                            //   findAssociatedClinics.forEach((e) => {
                            //     clinicData.push(e.clinic);
                            //   });
                            // }
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: getBillingTeamResult[0],
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_ON_GET_BILLING_TEAM,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
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
        this.listBillingTeam = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var defaultPage, count, populateFeilds, condition, child_condition, isEmptyNameOnlySpace, result, finalResponse_1, obj, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        defaultPage = void 0;
                        count = void 0;
                        defaultPage = model.pageNumber ? model.pageNumber : 1;
                        count = model.pageSize ? model.pageSize : 50;
                        populateFeilds = [];
                        condition = {};
                        child_condition = {};
                        //child_condition.role = new mongoose.Types.ObjectId(model.role_id);
                        // if ("isDeleted" in model && model.isDeleted)
                        //   child_condition.isDeleted = model.isDeleted;
                        // if (model.isDeleted == true || model.isDeleted == false) {
                        //   condition.isDeleted = model.isDeleted;
                        // }
                        condition.isDeleted = false;
                        condition.isActive = true;
                        if (model.search) {
                            isEmptyNameOnlySpace = /^\s*$/.test(model.search);
                            condition.$or = [
                                {
                                    name: {
                                        $regex: model.search,
                                        $options: "i",
                                    },
                                },
                            ];
                        }
                        return [4 /*yield*/, billing_team_model_1.default.aggregate([
                                { $match: condition },
                                {
                                    $lookup: {
                                        from: "billing_team_member",
                                        let: { team_id: "$_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$team_id", "$$team_id"],
                                                    },
                                                    isActive: true,
                                                    isDeleted: false,
                                                },
                                            },
                                        ],
                                        as: "memberData",
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "billing_team_associated_clinics",
                                        let: { team_id: "$_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$team_id", "$$team_id"],
                                                    },
                                                    isActive: true,
                                                    isDeleted: false,
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "clinic",
                                                    let: { clinic_id: "$clinic" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $eq: ["$_id", "$$clinic_id"],
                                                                },
                                                                // isActive: true,
                                                                // isDeleted: false,
                                                            },
                                                        },
                                                        {
                                                            $project: {
                                                                _id: 1,
                                                                clinic_name: 1,
                                                            },
                                                        },
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
                                                $project: {
                                                    clinic_id: "$clinic",
                                                    clinic_name: "$clinicData.clinic_name",
                                                },
                                            },
                                        ],
                                        as: "assocatedClinicData",
                                    },
                                },
                                // {
                                //   $unwind: {
                                //     path: "$memberData",
                                //     preserveNullAndEmptyArrays: true,
                                //   },
                                // },
                                {
                                    $facet: {
                                        count: [{ $count: "count" }],
                                        data: [
                                            {
                                                $project: {
                                                    _id: 1,
                                                    name: 1,
                                                    clinics: "$assocatedClinicData",
                                                    total_clinics: {
                                                        $cond: {
                                                            if: {
                                                                $isArray: "$assocatedClinicData",
                                                            },
                                                            then: {
                                                                $size: "$assocatedClinicData",
                                                            },
                                                            else: 0,
                                                        },
                                                    },
                                                    total_members: {
                                                        $cond: {
                                                            if: { $isArray: "$memberData" },
                                                            then: { $size: "$memberData" },
                                                            else: 0,
                                                        },
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
                    case 1:
                        result = _a.sent();
                        if (result &&
                            result.length > 0 &&
                            result[0].data &&
                            result[0].data.length > 0) {
                            finalResponse_1 = [];
                            result[0].data.forEach(function (obj) {
                                var clinicIdsArr = [];
                                obj.clinics.forEach(function (x) {
                                    clinicIdsArr.push(x.clinic_id);
                                });
                                obj.clinicIds = clinicIdsArr;
                                finalResponse_1.push(obj);
                            });
                            obj = {
                                data: finalResponse_1,
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
                                        message: erros_message_1.default.BILLING_TEAM_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        next(error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.listBillingTeamMembers = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var defaultPage, count, populateFeilds, condition, child_condition, isEmptyNameOnlySpace, result, obj, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        defaultPage = void 0;
                        count = void 0;
                        defaultPage = model.pageNumber ? model.pageNumber : 1;
                        count = model.pageSize ? model.pageSize : 50;
                        populateFeilds = [];
                        condition = { isDeleted: false };
                        child_condition = {};
                        child_condition.$expr = {
                            $eq: ["$_id", "$$user_id"],
                        };
                        if (model.role_id)
                            child_condition.role = new mongoose_1.default.Types.ObjectId(model.role_id);
                        // if ("isDeleted" in model && model.isDeleted)
                        //   child_condition.isDeleted = model.isDeleted;
                        // if (model.isDeleted == true || model.isDeleted == false) {
                        //   condition.isDeleted = model.isDeleted;
                        // }
                        condition.team_id = new mongoose_1.default.Types.ObjectId(model.team_id);
                        condition.isDeleted = false;
                        condition.isActive = true;
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
                            ];
                        }
                        child_condition.isActive = true;
                        child_condition.isDeleted = false;
                        return [4 /*yield*/, billing_team_member_model_1.default.aggregate([
                                { $match: condition },
                                {
                                    $lookup: {
                                        from: "users",
                                        let: { user_id: "$member_id" },
                                        pipeline: [
                                            {
                                                $match: child_condition,
                                            },
                                            {
                                                $lookup: {
                                                    from: "roles",
                                                    let: { role_id: "$role" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $eq: ["$_id", "$$role_id"],
                                                                },
                                                            },
                                                        },
                                                        {
                                                            $project: {
                                                                roleTitle: 1,
                                                            },
                                                        },
                                                    ],
                                                    as: "roleData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$roleData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $project: {
                                                    first_name: 1,
                                                    last_name: 1,
                                                    email: 1,
                                                    role: 1,
                                                    roleData: 1,
                                                },
                                            },
                                        ],
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
                                                    member_id: 1,
                                                    first_name: "$userData.first_name",
                                                    last_name: "$userData.last_name",
                                                    email: "$userData.email",
                                                    role: "$userData.roleData.roleTitle",
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
                    case 1:
                        result = _a.sent();
                        // console.log(JSON.stringify(result));
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
                                        message: erros_message_1.default.BILLING_TEAM_MEMBER_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
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
        this.listBillingTeamClinics = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var defaultPage, count, condition, child_condition, isEmptyNameOnlySpace, result, obj, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        defaultPage = void 0;
                        count = void 0;
                        defaultPage = model.pageNumber ? model.pageNumber : 1;
                        count = model.pageSize ? model.pageSize : 50;
                        condition = {};
                        child_condition = {};
                        if (model.search) {
                            isEmptyNameOnlySpace = /^\s*$/.test(model.search);
                            child_condition.$or = [
                                {
                                    clinic_name: {
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
                            ];
                        }
                        // let child_condition: any = {};
                        // child_condition.$expr = {
                        //   $eq: ["$_id", "$$user_id"],
                        // };
                        // if ("isDeleted" in model && model.isDeleted)
                        //   child_condition.isDeleted = model.isDeleted;
                        // if (model.isDeleted == true || model.isDeleted == false) {
                        //   condition.isDeleted = model.isDeleted;
                        // }
                        condition.team_id = new mongoose_1.default.Types.ObjectId(model.team_id);
                        condition.isDeleted = false;
                        condition.isActive = true;
                        return [4 /*yield*/, billing_team_associated_clinics_model_1.default.aggregate([
                                { $match: condition },
                                {
                                    $lookup: {
                                        from: "clinic",
                                        let: { clinic_id: "$clinic" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: { $eq: ["$_id", "$$clinic_id"] },
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "users",
                                                    let: { u_id: "$user_id" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: { $eq: ["$_id", "$$u_id"] },
                                                            },
                                                        },
                                                        {
                                                            $project: {
                                                                email: 1,
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
                                                    clinic_name: 1,
                                                    email: "$userData.email",
                                                },
                                            },
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
                                    $facet: {
                                        count: [{ $count: "count" }],
                                        data: [
                                            {
                                                $project: {
                                                    _id: 1,
                                                    clinic_name: "$clinicData.clinic_name",
                                                    clinic_id: "$clinicData._id",
                                                    email: "$clinicData.email",
                                                },
                                            },
                                            { $match: child_condition },
                                            {
                                                $sort: { createdAt: -1 },
                                            },
                                            { $skip: count * (defaultPage - 1) },
                                            { $limit: count },
                                        ],
                                    },
                                },
                            ])];
                    case 1:
                        result = _a.sent();
                        // console.log(JSON.stringify(result));
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
                                        message: erros_message_1.default.BILLING_TEAM_CLINICS_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
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
        this.assignMemberToTeam = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, alreadyPresentBillingTeamMember, updateExistingTeamMember, addHistory, user, assignMember, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, , 12]);
                        userDetails = req.user;
                        return [4 /*yield*/, billing_team_member_model_1.default.findOne({
                                team_id: model.team_id,
                                member_id: model.member_id,
                                //isDeleted: false,
                            })];
                    case 1:
                        alreadyPresentBillingTeamMember = _a.sent();
                        if (!(alreadyPresentBillingTeamMember &&
                            !alreadyPresentBillingTeamMember.isDeleted)) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                success: false,
                                data: {
                                    message: erros_message_1.default.ALREADY_EXIST_ASSIGNED_TEAM_MEMBER,
                                    error: erros_message_1.default.ON_ADD_ERROR,
                                },
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                            }];
                    case 2:
                        if (!(alreadyPresentBillingTeamMember &&
                            alreadyPresentBillingTeamMember.isDeleted)) return [3 /*break*/, 6];
                        return [4 /*yield*/, billing_team_member_model_1.default.updateOne({
                                team_id: model.team_id,
                                member_id: model.member_id,
                                //isDeleted: false,
                            }, {
                                $set: { isDeleted: false },
                            })];
                    case 3:
                        updateExistingTeamMember = _a.sent();
                        if (!(updateExistingTeamMember &&
                            updateExistingTeamMember.modifiedCount > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "Team member assigned",
                                type: history_model_1.EHistoryActivityTypeValues.BillingTeam,
                                type_id: userDetails._id,
                                data: {
                                    team_id: model.team_id,
                                    // email: model.email,
                                    // first_name: model.first_name,
                                    // last_name: model.last_name,
                                    // role: model.role_id,
                                    member_id: model.member_id,
                                },
                            })];
                    case 4:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.ASSIGNED_TEAM_MEMBER_SUCCESS,
                            }];
                    case 5: return [3 /*break*/, 10];
                    case 6: return [4 /*yield*/, user_model_1.default.aggregate([
                            {
                                $match: {
                                    _id: new mongoose_1.default.Types.ObjectId(model.member_id),
                                },
                            },
                            {
                                $lookup: {
                                    from: "roles",
                                    let: { role_id: "$role" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ["$_id", "$$role_id"],
                                                },
                                            },
                                        },
                                        { $project: { _id: 1 } },
                                    ],
                                    as: "roleData",
                                },
                            },
                            {
                                $unwind: {
                                    path: "$roleData",
                                    preserveNullAndEmptyArrays: true,
                                },
                            },
                            { $project: { roleData: 1 } },
                        ])];
                    case 7:
                        user = _a.sent();
                        if (!(user && user.length && user[0].roleData)) return [3 /*break*/, 9];
                        return [4 /*yield*/, billing_team_member_model_1.default.create({
                                team_id: model.team_id,
                                member_id: model.member_id,
                                role_id: user[0].roleData._id,
                            })];
                    case 8:
                        assignMember = _a.sent();
                        if (assignMember)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: erros_message_1.default.ASSIGNED_TEAM_MEMBER_SUCCESS,
                                }];
                        else
                            return [2 /*return*/, {
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ASSIGNED_TEAM_MEMBER_FAILED,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                }];
                        return [3 /*break*/, 10];
                    case 9: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ASSIGNED_TEAM_MEMBER_FAILED,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        error_9 = _a.sent();
                        next(error_9);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        }); };
        this.removeMember = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, removeMember, addHistory, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        userDetails = req.user;
                        return [4 /*yield*/, billing_team_member_model_1.default.updateOne({
                                team_id: new mongoose_1.default.Types.ObjectId(model.team_id),
                                member_id: new mongoose_1.default.Types.ObjectId(model.member_id),
                            }, { $set: { isDeleted: true } })];
                    case 1:
                        removeMember = _a.sent();
                        if (!(removeMember && removeMember.modifiedCount > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "Team member removed",
                                type: history_model_1.EHistoryActivityTypeValues.BillingTeam,
                                type_id: userDetails._id,
                                data: {
                                    team_id: model.team_id,
                                    // email: model.email,
                                    // first_name: model.first_name,
                                    // last_name: model.last_name,
                                    // role: model.role_id,
                                    member_id: model.member_id,
                                },
                            })];
                    case 2:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                data: erros_message_1.default.ASSIGNED_TEAM_MEMBER_REMOVE_SUCCESS,
                                success: true,
                            }];
                    case 3: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ASSIGNED_TEAM_MEMBER_REMOVE_FAILED,
                                error: erros_message_1.default.ON_DELETE_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_10 = _a.sent();
                        next(error_10);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        // Ankit -17-04-2023
        this.removeAndAddNewTeamAssociation = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, updateExistingTeamMember, newAssArr_1, addTeamMemberAss, addHistory, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        userDetails = req.user;
                        return [4 /*yield*/, billing_team_member_model_1.default.update({
                                // team_id: model.old_team_id,
                                member_id: model.member_id,
                                //isDeleted: false,
                            }, {
                                $set: {
                                    isDeleted: true,
                                    isActive: false,
                                },
                            })];
                    case 1:
                        updateExistingTeamMember = _a.sent();
                        newAssArr_1 = [];
                        model.new_team_ids.forEach(function (obj) {
                            var temp = {
                                team_id: obj,
                                member_id: model.member_id,
                            };
                            newAssArr_1.push(temp);
                        });
                        return [4 /*yield*/, billing_team_member_model_1.default.insertMany(newAssArr_1)];
                    case 2:
                        addTeamMemberAss = _a.sent();
                        if (!addTeamMemberAss) return [3 /*break*/, 4];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "Team member association updated successfully",
                                type: history_model_1.EHistoryActivityTypeValues.BillingTeam,
                                type_id: userDetails._id,
                                data: {
                                    team_id: model.new_team_ids[0],
                                    // email: model.email,
                                    // first_name: model.first_name,
                                    // last_name: model.last_name,
                                    // role: model.role_id,
                                    member_id: model.member_id,
                                },
                            })];
                    case 3:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.UPDATE_ASSIGNED_TEAM_MEMBER_Successfully,
                            }];
                    case 4: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.UPDATE_ASSIGNED_TEAM_MEMBER_FAILED,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_11 = _a.sent();
                        next(error_11);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.filterListBillingTeam = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var result, obj, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, billing_team_model_1.default.aggregate([
                                { $match: { isActive: true, isDeleted: false } },
                                { $project: { name: 1, _id: 1 } },
                                { $sort: { createdAt: -1 } },
                            ])];
                    case 1:
                        result = _a.sent();
                        if (result && result.length) {
                            obj = {
                                data: result,
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
                                        message: erros_message_1.default.BILLING_TEAM_MEMBER_LIST_NOT_FOUND,
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
        // Clinic assign ment to billing team
        this.assignClinicToBillingTeam = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, alreadyAddedClinicToBillingTeam, modelToSave, result, addHistory, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        userDetails = req.user;
                        return [4 /*yield*/, billing_team_associated_clinics_model_1.default.findOne({
                                clinic: model.clinic_id,
                                team_id: model.team_id,
                                isDeleted: false,
                            })];
                    case 1:
                        alreadyAddedClinicToBillingTeam = _a.sent();
                        if (!alreadyAddedClinicToBillingTeam) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                success: false,
                                data: {
                                    message: erros_message_1.default.CLINIC_ALREADY_ADDED_BILLING_TEAM,
                                    error: erros_message_1.default.ON_ADD_ERROR,
                                },
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                            }];
                    case 2:
                        modelToSave = model;
                        modelToSave.clinic = model.clinic_id;
                        modelToSave.createdby_id = userDetails._id;
                        return [4 /*yield*/, billing_team_associated_clinics_model_1.default.create(modelToSave)];
                    case 3:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 5];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "clinic assigned to billing team",
                                type: history_model_1.EHistoryActivityTypeValues.BillingTeam,
                                // type_id: model.team_member,
                            })];
                    case 4:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: result,
                            }];
                    case 5: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ON_ASSIGN_CLINIC_TO_TEAM,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_13 = _a.sent();
                        console.log(error_13);
                        next(error_13);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.UnAssignClinicToBillingTeam = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, updationResult, addHistory, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        userDetails = req.user;
                        return [4 /*yield*/, billing_team_associated_clinics_model_1.default.updateMany({
                                team_id: model.team_id,
                                clinic_id: { $in: model.clinicIds },
                            }, { isDeleted: true })];
                    case 1:
                        updationResult = _a.sent();
                        if (!(updationResult && updationResult.modifiedCount > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "clinic un-assigned from  billing team",
                                type: history_model_1.EHistoryActivityTypeValues.BillingTeam,
                                // type_id: model.team_member,
                            })];
                    case 2:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: "Clinic Unassigned successfully",
                            }];
                    case 3: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ON_UN_ASSIGN_CLINIC_TO_TEAM,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_14 = _a.sent();
                        next(error_14);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        // Download BillingTeam Data
        this.getBillingTeamDataToExcel = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var workbook, billinTeamSheet_1, billinTeamSheetHeader, defaultPage, count, populateFeilds, condition, isEmptyNameOnlySpace, result, sheetStyle_1, finalResponse, data, link, excelFileName, response, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, xlsx_populate_1.default.fromBlankAsync()];
                    case 1:
                        workbook = _a.sent();
                        billinTeamSheet_1 = workbook.sheet("Sheet1");
                        billinTeamSheetHeader = [
                            "Team Name",
                            "Clinic Assigned",
                            "Team Memeber",
                        ];
                        billinTeamSheetHeader.forEach(function (el, i) {
                            billinTeamSheet_1
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
                        condition = {};
                        condition.isDeleted = false;
                        condition.isActive = true;
                        if (model.search) {
                            isEmptyNameOnlySpace = /^\s*$/.test(model.search);
                            condition.$or = [
                                {
                                    name: {
                                        $regex: model.search,
                                        $options: "i",
                                    },
                                },
                            ];
                        }
                        return [4 /*yield*/, billing_team_model_1.default.aggregate([
                                { $match: condition },
                                {
                                    $lookup: {
                                        from: "billing_team_member",
                                        let: { team_id: "$_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$team_id", "$$team_id"],
                                                    },
                                                    isActive: true,
                                                    isDeleted: false,
                                                },
                                            },
                                        ],
                                        as: "memberData",
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "billing_team_associated_clinics",
                                        let: { team_id: "$_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$team_id", "$$team_id"],
                                                    },
                                                    isActive: true,
                                                    isDeleted: false,
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "clinic",
                                                    let: { clinic_id: "$clinic" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $eq: ["$_id", "$$clinic_id"],
                                                                },
                                                                // isActive: true,
                                                                // isDeleted: false,
                                                            },
                                                        },
                                                        {
                                                            $project: {
                                                                _id: 1,
                                                                clinic_name: 1,
                                                            },
                                                        },
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
                                                $project: {
                                                    clinic_id: "$clinic",
                                                    clinic_name: "$clinicData.clinic_name",
                                                },
                                            },
                                        ],
                                        as: "assocatedClinicData",
                                    },
                                },
                                // {
                                //   $unwind: {
                                //     path: "$memberData",
                                //     preserveNullAndEmptyArrays: true,
                                //   },
                                // },
                                {
                                    $facet: {
                                        count: [{ $count: "count" }],
                                        data: [
                                            {
                                                $project: {
                                                    _id: 1,
                                                    name: 1,
                                                    clinics: "$assocatedClinicData",
                                                    total_clinics: {
                                                        $cond: {
                                                            if: {
                                                                $isArray: "$assocatedClinicData",
                                                            },
                                                            then: {
                                                                $size: "$assocatedClinicData",
                                                            },
                                                            else: 0,
                                                        },
                                                    },
                                                    total_members: {
                                                        $cond: {
                                                            if: { $isArray: "$memberData" },
                                                            then: { $size: "$memberData" },
                                                            else: 0,
                                                        },
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
                        sheetStyle_1 = {
                            border: true,
                            fontFamily: "Calibri",
                        };
                        if (!(result && result[0].data && result[0].data.length > 0)) return [3 /*break*/, 5];
                        finalResponse = result[0].data;
                        finalResponse.forEach(function (el, i) {
                            billinTeamSheet_1
                                .cell("A" + (i + 2))
                                .value(el.name)
                                .style(sheetStyle_1);
                            billinTeamSheet_1
                                .cell("B" + (i + 2))
                                .value(el.total_clinics)
                                .style(sheetStyle_1);
                            billinTeamSheet_1
                                .cell("C" + (i + 2))
                                .value(el.total_members)
                                .style(sheetStyle_1);
                        });
                        billinTeamSheet_1.freezePanes(1, 1);
                        return [4 /*yield*/, workbook.outputAsync()];
                    case 3:
                        data = _a.sent();
                        return [4 /*yield*/, fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../../../../public/upload/billing/Billing_Team_Report.xlsx"), data)];
                    case 4:
                        _a.sent();
                        link = "http://".concat(req.hostname, ":").concat(process.env.PORT, "/upload/billing/Billing_Team_Report.xlsx");
                        excelFileName = "Billing_Team_Report.xlsx";
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
                                message: erros_message_1.default.BILLING_TEAM_LIST_NOT_FOUND,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_15 = _a.sent();
                        next(error_15);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.getBillingTeamMembersDataToExcel = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var workbook, billinTeamSheet_2, billinTeamSheetHeader, defaultPage, count, populateFeilds, condition, child_condition, isEmptyNameOnlySpace, result, sheetStyle_2, finalResponse, data, link, excelFileName, response, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, xlsx_populate_1.default.fromBlankAsync()];
                    case 1:
                        workbook = _a.sent();
                        billinTeamSheet_2 = workbook.sheet("Sheet1");
                        billinTeamSheetHeader = ["Name", "Email", "Assigned Roles"];
                        billinTeamSheetHeader.forEach(function (el, i) {
                            billinTeamSheet_2
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
                        condition = {};
                        child_condition = {};
                        child_condition.$expr = {
                            $eq: ["$_id", "$$user_id"],
                        };
                        if (model.role_id)
                            child_condition.role = new mongoose_1.default.Types.ObjectId(model.role_id);
                        // if ("isDeleted" in model && model.isDeleted)
                        //   child_condition.isDeleted = model.isDeleted;
                        // if (model.isDeleted == true || model.isDeleted == false) {
                        //   condition.isDeleted = model.isDeleted;
                        // }
                        condition.team_id = new mongoose_1.default.Types.ObjectId(model.team_id);
                        condition.isDeleted = false;
                        condition.isActive = true;
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
                            ];
                        }
                        child_condition.isActive = true;
                        child_condition.isDeleted = false;
                        return [4 /*yield*/, billing_team_member_model_1.default.aggregate([
                                { $match: condition },
                                {
                                    $lookup: {
                                        from: "users",
                                        let: { user_id: "$member_id" },
                                        pipeline: [
                                            {
                                                $match: child_condition,
                                            },
                                            {
                                                $lookup: {
                                                    from: "roles",
                                                    let: { role_id: "$role" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $eq: ["$_id", "$$role_id"],
                                                                },
                                                            },
                                                        },
                                                        {
                                                            $project: {
                                                                roleTitle: 1,
                                                            },
                                                        },
                                                    ],
                                                    as: "roleData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$roleData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $project: {
                                                    first_name: 1,
                                                    last_name: 1,
                                                    email: 1,
                                                    role: 1,
                                                    roleData: 1,
                                                },
                                            },
                                        ],
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
                                                    role: "$userData.roleData.roleTitle",
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
                        if (!(result &&
                            result.length > 0 &&
                            result[0].data &&
                            result[0].data.length > 0)) return [3 /*break*/, 5];
                        sheetStyle_2 = {
                            border: true,
                            fontFamily: "Calibri",
                        };
                        finalResponse = result[0].data;
                        finalResponse.forEach(function (el, i) {
                            billinTeamSheet_2
                                .cell("A" + (i + 2))
                                .value(el.first_name + "" + el.last_name)
                                .style(sheetStyle_2);
                            billinTeamSheet_2
                                .cell("B" + (i + 2))
                                .value(el.email)
                                .style(sheetStyle_2);
                            billinTeamSheet_2
                                .cell("C" + (i + 2))
                                .value(el.role)
                                .style(sheetStyle_2);
                        });
                        billinTeamSheet_2.freezePanes(1, 1);
                        return [4 /*yield*/, workbook.outputAsync()];
                    case 3:
                        data = _a.sent();
                        return [4 /*yield*/, fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../../../../public/upload/billing/Billing_Team_Member_Report.xlsx"), data)];
                    case 4:
                        _a.sent();
                        link = "http://".concat(req.hostname, ":").concat(process.env.PORT, "/upload/billing/Billing_Team_Member_Report.xlsx");
                        excelFileName = "Billing_Team_Member_Report.xlsx";
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
                                message: erros_message_1.default.BILLING_TEAM_MEMBER_LIST_NOT_FOUND,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_16 = _a.sent();
                        next(error_16);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
    }
    return BillingTeamServices;
}());
exports.default = new BillingTeamServices();
