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
exports.EnumRoles = void 0;
var fs_1 = __importDefault(require("fs"));
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var mongoose_1 = __importDefault(require("mongoose"));
var path_1 = __importDefault(require("path"));
var xlsx_populate_1 = __importDefault(require("xlsx-populate"));
var erros_message_1 = __importDefault(require("../../common/erros_message"));
var clinic_model_1 = __importStar(require("../../models/clinic.model"));
var clinic_association_with_group_model_1 = __importDefault(require("../../models/clinic_association_with_group.model"));
var history_model_1 = __importStar(require("../../models/history.model"));
var location_model_1 = __importDefault(require("../../models/location.model"));
var roles_model_1 = __importDefault(require("../../models/roles.model"));
var user_model_1 = __importDefault(require("../../models/user.model"));
var EnumRoles;
(function (EnumRoles) {
    EnumRoles["SUPERADMIN"] = "superadmin";
})(EnumRoles = exports.EnumRoles || (exports.EnumRoles = {}));
var ClinicServices = /** @class */ (function () {
    function ClinicServices() {
        var _this = this;
        this.addClinic = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, findClinicRoleDoc, foundUser, modelToSave, userObj, addRecordAsUser, addClinicPolicy, response, addHistory, addClinicInGroup, addHistory_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 12, , 13]);
                        userDetails = req.user;
                        return [4 /*yield*/, roles_model_1.default.findOne({
                                roleName: "clinic",
                            })];
                    case 1:
                        findClinicRoleDoc = _a.sent();
                        return [4 /*yield*/, user_model_1.default.findOne({
                                email: model.email.toLowerCase(),
                                is_deleted: false,
                            })];
                    case 2:
                        foundUser = _a.sent();
                        if (!foundUser) return [3 /*break*/, 3];
                        return [2 /*return*/, {
                                data: {
                                    message: erros_message_1.default.ALREADY_ASSOCIATED_EMAIL,
                                    error: erros_message_1.default.ON_ADD_ERROR,
                                },
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                            }];
                    case 3:
                        modelToSave = model;
                        userObj = {
                            first_name: model.first_name,
                            last_name: model.last_name,
                            image: modelToSave.image,
                            role: findClinicRoleDoc ? findClinicRoleDoc._id : "",
                            email: model.email.toLowerCase(),
                            password: "",
                            addedBy_id: userDetails._id,
                            mobile_no: model.mobile_no,
                            role_permission: findClinicRoleDoc.permission,
                        };
                        return [4 /*yield*/, user_model_1.default.create(userObj)];
                    case 4:
                        addRecordAsUser = _a.sent();
                        if (addRecordAsUser) {
                            modelToSave.user_id = addRecordAsUser._id;
                        }
                        addClinicPolicy = {
                            noShowCharge: 0,
                            isDeleted: false,
                            isActive: false,
                            cancel: {
                                hours: 24,
                                isAllowed: true,
                            },
                            reschedule: {
                                hours: 24,
                                isAllowed: true,
                            },
                        };
                        modelToSave.clinicPolicy = addClinicPolicy;
                        return [4 /*yield*/, clinic_model_1.default.create(modelToSave)];
                    case 5:
                        response = _a.sent();
                        if (!response) return [3 /*break*/, 10];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "clinic added successfully",
                                type: history_model_1.EHistoryActivityTypeValues.CLINIC,
                                type_id: response._id,
                            })];
                    case 6:
                        addHistory = _a.sent();
                        if (!model.group) return [3 /*break*/, 9];
                        return [4 /*yield*/, clinic_association_with_group_model_1.default.create({
                                group_id: model.group,
                                clinic_id: response._id,
                            })];
                    case 7:
                        addClinicInGroup = _a.sent();
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "clinic added in group successfully",
                                type: history_model_1.EHistoryActivityTypeValues.CLINIC,
                                type_id: response._id,
                            })];
                    case 8:
                        addHistory_1 = _a.sent();
                        _a.label = 9;
                    case 9: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.OK,
                            success: true,
                            data: response,
                        }];
                    case 10: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ADD_CLINIC,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                        }];
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        }); };
        this.getClinicDetails = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var foundClinic, foundClinicLocation, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, clinic_model_1.default.findById(req.params._id, {}).populate({
                                path: "user_id",
                                // select: { role_permission: 1 },
                                select: { createdAt: 0, updatedAt: 0, __v: 0 },
                            })];
                    case 1:
                        foundClinic = _a.sent();
                        if (!foundClinic) return [3 /*break*/, 3];
                        return [4 /*yield*/, location_model_1.default.find({
                                clinic_id: new mongoose_1.default.Types.ObjectId(req.params._id),
                            }).populate(["country", "state"])];
                    case 2:
                        foundClinicLocation = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: __assign(__assign({}, foundClinic.toObject()), { locations: foundClinicLocation }),
                            }];
                    case 3: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.CLINIC_DETAILS_NOT_FOUND,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
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
        this.deleteClinicDetails = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, foundClinic, clinicDeletionResult, addHistory, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        userDetails = req.user;
                        return [4 /*yield*/, clinic_model_1.default.findById(req.params._id, {})];
                    case 1:
                        foundClinic = _a.sent();
                        if (!foundClinic) return [3 /*break*/, 6];
                        return [4 /*yield*/, clinic_model_1.default.updateOne({ _id: req.params._id }, { isDeleted: true })];
                    case 2:
                        clinicDeletionResult = _a.sent();
                        if (!(clinicDeletionResult && clinicDeletionResult.modifiedCount > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "clinic deleted successfully",
                                type: history_model_1.EHistoryActivityTypeValues.CLINIC,
                                type_id: req.params._id,
                            })];
                    case 3:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.DELETE_SUCCESSFULL,
                            }];
                    case 4: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.CLINIC_DELETION_ERROR,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.CLINIC_DETAILS_NOT_FOUND,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
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
        // pending functionality
        this.getClinicList = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var clinicRoleDoc, defaultPage, count, populateFeilds, condition, isEmptyNameOnlySpace, response, tempResult, result, finalResponse_1, obj, error_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        return [4 /*yield*/, roles_model_1.default.findOne({
                                roleName: "clinic",
                            })];
                    case 1:
                        clinicRoleDoc = _a.sent();
                        defaultPage = void 0;
                        count = void 0;
                        populateFeilds = [
                            {
                                path: "user_id",
                                select: {
                                    _id: 0,
                                    first_name: 1,
                                    last_name: 1,
                                    email: 1,
                                },
                            },
                        ];
                        condition = {
                            isDeleted: false,
                            role: clinicRoleDoc._id,
                        };
                        if (model.clinic_name) {
                            isEmptyNameOnlySpace = /^\s*$/.test(model.clinic_name);
                            if (isEmptyNameOnlySpace ||
                                model.clinic_name == null ||
                                model.clinic_name === "") {
                                return [2 /*return*/, {
                                        data: {
                                            message: erros_message_1.default.NON_EMPTY_CLINIC_NAME,
                                            error: erros_message_1.default.ON_FETCH_ERROR,
                                        },
                                        success: false,
                                        status_code: http_status_codes_1.default.BAD_REQUEST,
                                    }];
                            }
                            else
                                condition.clinic_name = {
                                    $regex: model.clinic_name,
                                    $options: "i",
                                };
                        }
                        if (model.isActive) {
                            condition.isActive = model.isActive;
                        }
                        if (model.clinic_type) {
                            condition.clinic_type = model.clinic_type;
                        }
                        if (!(!model.pageNumber && !model.pageSize)) return [3 /*break*/, 3];
                        defaultPage = 1;
                        count = -1;
                        return [4 /*yield*/, clinic_model_1.default.find(condition, {
                                createdAt: 0,
                                updatedAt: 0,
                                __v: 0,
                                password: 0,
                            })
                                .populate(populateFeilds)
                                .sort({ clinic_name: 1 })];
                    case 2:
                        response = _a.sent();
                        // .sort({ createdAt: -1 });
                        if (response && response.length > 0) {
                            if (model.clinic_type == clinic_model_1.EClinicTypeValues.GROUP) {
                                //   response.forEach((obj)=>{
                                // obj.totalClinicInThisGroup=
                                //   })
                            }
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
                                        message: erros_message_1.default.CLINIC_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        if (model.pageNumber && model.pageNumber >= 1 && !model.pageSize) {
                            defaultPage = model.pageNumber;
                            count = 50;
                        }
                        else {
                            defaultPage = model.pageNumber || 1;
                            count = model.pageSize || 50;
                        }
                        _a.label = 4;
                    case 4:
                        tempResult = void 0;
                        return [4 /*yield*/, clinic_model_1.default.paginate(__assign(__assign({}, condition), { options: {
                                    projection: {
                                        createdAt: 0,
                                        updatedAt: 0,
                                        __v: 0,
                                    },
                                } }), __assign(__assign({ page: defaultPage }, (count > 0 ? { limit: count } : { pagination: false })), { populate: populateFeilds, 
                                // sort: { createdAt: -1 },
                                sort: { clinic_name: 1 } }))];
                    case 5:
                        result = _a.sent();
                        tempResult = result;
                        finalResponse_1 = [];
                        if (!(result && result.docs && result.docs.length > 0)) return [3 /*break*/, 7];
                        return [4 /*yield*/, Promise.all(result.docs.map(function (obj) { return __awaiter(_this, void 0, void 0, function () {
                                var temp, clinicGroupAssociations;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            temp = __assign({}, obj.toObject());
                                            return [4 /*yield*/, clinic_association_with_group_model_1.default.find({
                                                    clinic_id: new mongoose_1.default.Types.ObjectId(obj._id),
                                                }).populate("group_id")];
                                        case 1:
                                            clinicGroupAssociations = _a.sent();
                                            if (clinicGroupAssociations && clinicGroupAssociations.length > 0)
                                                temp.groupDetails = clinicGroupAssociations;
                                            else
                                                temp.groupDetails = [];
                                            finalResponse_1.push(temp);
                                            return [2 /*return*/, obj];
                                    }
                                });
                            }); }))];
                    case 6:
                        _a.sent();
                        // set group data in clinic list
                        finalResponse_1.forEach(function (finalObj) {
                            var finalGroupData = [];
                            if (finalObj.groupDetails.length > 0) {
                                finalObj.groupDetails.forEach(function (obj) {
                                    var groupDoc = obj.group_id;
                                    var tempObj = {
                                        group_id: groupDoc._id,
                                        group_name: groupDoc.name,
                                    };
                                    finalGroupData.push(tempObj);
                                });
                            }
                            finalObj.groupDetails = finalGroupData;
                        });
                        obj = {
                            data: finalResponse_1,
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
                    case 7: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.CLINIC_LIST_NOT_FOUND,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        this.getClinicList1 = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var clinicRoleDoc, defaultPage, count, condition, isEmptyNameOnlySpace, result, obj, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, roles_model_1.default.findOne({
                                roleName: "clinic",
                            })];
                    case 1:
                        clinicRoleDoc = _a.sent();
                        defaultPage = void 0;
                        count = void 0;
                        condition = {
                            isDeleted: false,
                            role: new mongoose_1.default.Types.ObjectId(clinicRoleDoc._id),
                        };
                        if (model.clinic_name) {
                            isEmptyNameOnlySpace = /^\s*$/.test(model.clinic_name);
                            if (isEmptyNameOnlySpace ||
                                model.clinic_name == null ||
                                model.clinic_name === "") {
                                return [2 /*return*/, {
                                        data: {
                                            message: erros_message_1.default.NON_EMPTY_CLINIC_NAME,
                                            error: erros_message_1.default.ON_FETCH_ERROR,
                                        },
                                        success: false,
                                        status_code: http_status_codes_1.default.BAD_REQUEST,
                                    }];
                            }
                            else
                                condition.clinic_name = {
                                    $regex: model.clinic_name,
                                    $options: "i",
                                };
                        }
                        if (model.isActive) {
                            condition.isActive = model.isActive;
                        }
                        if (model.clinic_type) {
                            condition.clinic_type = model.clinic_type;
                        }
                        defaultPage = model.pageNumber || 1;
                        count = model.pageSize || 50;
                        return [4 /*yield*/, clinic_model_1.default.aggregate([
                                { $match: condition },
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
                                                    email: 1,
                                                },
                                            },
                                        ],
                                        as: "user_id",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$user_id",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "clinic_association_groups",
                                        let: { clinic_id: "$_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$clinic_id", "$$clinic_id"],
                                                    },
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "clinic_groups",
                                                    let: { group_id: "$group_id" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $eq: ["$_id", "$$group_id"],
                                                                },
                                                            },
                                                        },
                                                        { $project: { name: 1 } },
                                                    ],
                                                    as: "clinicGroupData",
                                                },
                                            },
                                            {
                                                $unwind: {
                                                    path: "$clinicGroupData",
                                                    preserveNullAndEmptyArrays: true,
                                                },
                                            },
                                            {
                                                $project: {
                                                    group_id: "$group_id",
                                                    group_name: "$clinicGroupData.name",
                                                },
                                            },
                                        ],
                                        as: "groupDetails",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$groupDetails",
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
                                                    clinic_name: 1,
                                                    image: 1,
                                                    mobile_no: 1,
                                                    designation: 1,
                                                    clinic_type: 1,
                                                    user_id: 1,
                                                    isDeleted: 1,
                                                    isActive: 1,
                                                    office: 1,
                                                    fax: 1,
                                                    clinicPolicy: 1,
                                                    createdAt: 1,
                                                    updatedAt: 1,
                                                    __v: 1,
                                                    groupDetails: 1,
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
                        console.log(condition, "hjhhj", result);
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
                                        message: erros_message_1.default.CLINIC_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getClinicListWithoutPagination = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var clinicRoleDoc, condition, response, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, roles_model_1.default.findOne({
                                roleName: "clinic",
                            })];
                    case 1:
                        clinicRoleDoc = _a.sent();
                        condition = {
                            isDeleted: false,
                            isActive: true,
                        };
                        return [4 /*yield*/, clinic_model_1.default.find(condition, {
                                clinic_name: 1,
                            }).sort({ createdAt: -1 })];
                    case 2:
                        response = _a.sent();
                        if (response && response.length > 0) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: {
                                        data: response,
                                        // count: response.length,
                                        totalDocs: response.length,
                                        pageNumber: 1,
                                        pageSize: response.length,
                                        totalPages: 1,
                                    },
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.CLINIC_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_6 = _a.sent();
                        next(error_6);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.updateClinic = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, findClinicRoleDoc, foundClinic, userData, modelToSave, updateUserDetail, updateClinicDetails, addHistory, error_7;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 11, , 12]);
                        userDetails = req.user;
                        return [4 /*yield*/, roles_model_1.default.findOne({
                                roleName: "clinic",
                            })];
                    case 1:
                        findClinicRoleDoc = _e.sent();
                        return [4 /*yield*/, clinic_model_1.default.findOne({
                                _id: model._id,
                            }).populate("user_id")];
                    case 2:
                        foundClinic = _e.sent();
                        if (!foundClinic) return [3 /*break*/, 9];
                        userData = foundClinic.user_id;
                        modelToSave = model;
                        modelToSave.user_id = foundClinic.user_id;
                        if (!(model.first_name || model.last_name || model.mobile_no)) return [3 /*break*/, 4];
                        return [4 /*yield*/, user_model_1.default.updateOne({ _id: foundClinic.user_id }, {
                                first_name: (_a = model.first_name) !== null && _a !== void 0 ? _a : userData.first_name,
                                last_name: (_b = model.last_name) !== null && _b !== void 0 ? _b : userData.last_name,
                                mobile_no: (_c = model.mobile_no) !== null && _c !== void 0 ? _c : userData.mobile_no,
                                image: (_d = model.image) !== null && _d !== void 0 ? _d : userData.image,
                            })];
                    case 3:
                        updateUserDetail = _e.sent();
                        _e.label = 4;
                    case 4: return [4 /*yield*/, clinic_model_1.default.updateOne({ _id: model._id }, modelToSave)];
                    case 5:
                        updateClinicDetails = _e.sent();
                        if (!(updateClinicDetails && updateClinicDetails.modifiedCount > 0)) return [3 /*break*/, 7];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "clinic updated successfully",
                                type: history_model_1.EHistoryActivityTypeValues.CLINIC,
                                type_id: model._id,
                            })];
                    case 6:
                        addHistory = _e.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.UPDATE_SUCCESSFULL,
                            }];
                    case 7: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_UPDATE_CLINIC,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                        }];
                    case 8: return [3 /*break*/, 10];
                    case 9: return [2 /*return*/, {
                            data: {
                                message: erros_message_1.default.CLINIC_DETAILS_NOT_FOUND,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                        }];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        error_7 = _e.sent();
                        next(error_7);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        }); };
        // clinic location sections
        this.addClinicLocation = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, modelToSave, response, addHistory, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        userDetails = req.user;
                        modelToSave = model;
                        return [4 /*yield*/, location_model_1.default.create(modelToSave)];
                    case 1:
                        response = _a.sent();
                        if (!response) return [3 /*break*/, 3];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "clinic location added successfully",
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
                                message: erros_message_1.default.ERROR_ADD_CLINIC_LOCATION,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                        }];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_8 = _a.sent();
                        next(error_8);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getClinicLocationDetails = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var foundClinicLocation, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, location_model_1.default.findById(req.params._id, {}).populate({
                                path: "clinic_id",
                                select: { clinic_name: 1, clinic_type: 1 },
                            })];
                    case 1:
                        foundClinicLocation = _a.sent();
                        if (foundClinicLocation) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: foundClinicLocation,
                                }];
                        }
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.CLINIC_LOCATIONS_DETAILS_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _a.sent();
                        next(error_9);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updateClinicLocation = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, foundLocation, modelToSave, response, addHistory, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        userDetails = req.user;
                        return [4 /*yield*/, location_model_1.default.findOne({
                                is_deleted: false,
                                _id: model._id,
                            })];
                    case 1:
                        foundLocation = _a.sent();
                        if (!!foundLocation) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                data: {
                                    message: erros_message_1.default.CLINIC_LOCATIONS_DETAILS_NOT_FOUND,
                                    error: erros_message_1.default.ON_UPDATE_ERROR,
                                },
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                            }];
                    case 2:
                        modelToSave = model;
                        return [4 /*yield*/, location_model_1.default.updateOne({ _id: model._id }, modelToSave)];
                    case 3:
                        response = _a.sent();
                        if (!(response && response.modifiedCount > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "clinic location updated successfully",
                                type: history_model_1.EHistoryActivityTypeValues.CLINIC,
                                type_id: foundLocation.clinic_id,
                            })];
                    case 4:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.UPDATE_SUCCESSFULL,
                            }];
                    case 5: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_UPDATE_CLINIC_LOCATION,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                        }];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_10 = _a.sent();
                        next(error_10);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.getClinicLocationList = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var defaultPage, count, populateFeilds, condition, result, obj, error_11;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        defaultPage = (_a = model.pageNumber) !== null && _a !== void 0 ? _a : 1;
                        count = (_b = model.pageSize) !== null && _b !== void 0 ? _b : 10;
                        populateFeilds = [
                            {
                                path: "clinic_id",
                                select: {
                                    _id: 1,
                                    clinic_name: 1,
                                },
                            },
                        ];
                        condition = {
                            clinic_id: model.clinic_id,
                        };
                        if (model.search &&
                            model.search != "" &&
                            model.search != undefined &&
                            model.search != null) {
                            condition.branchName = {
                                $regex: model.search,
                                $options: "i",
                            };
                        }
                        if ("isActive" in model && model.isActive != null) {
                            condition.isActive = model.isActive;
                        }
                        if ("isDeleted" in model && model.isDeleted != null) {
                            condition.isDeleted = model.isDeleted;
                        }
                        return [4 /*yield*/, location_model_1.default.paginate(__assign(__assign({}, condition), { options: {
                                    projection: {
                                        createdAt: 0,
                                        updatedAt: 0,
                                        __v: 0,
                                    },
                                } }), __assign(__assign({ page: defaultPage }, (count > 0 ? { limit: count } : { pagination: false })), { populate: populateFeilds, sort: { createdAt: -1 } }))];
                    case 1:
                        result = _c.sent();
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
                                        message: erros_message_1.default.CLINIC_LOCATIONS_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_11 = _c.sent();
                        next(error_11);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getClinicLocationListWithoutPagination = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var condition, response, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        condition = {
                            clinic_id: model.clinic_id,
                        };
                        return [4 /*yield*/, location_model_1.default.find(condition, {
                                branchName: 1,
                                address: 1,
                            })];
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
                                        pageNumber: 1,
                                        pageSize: response.length,
                                        totalPages: 1,
                                    },
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
                        error_12 = _a.sent();
                        next(error_12);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // Export clinic list
        this.getClinicDataToExcel = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var workbook, clinicSheet_1, clinicSheetHeader, count, skip, clinicRoleDoc, populateFeilds, condition, isEmptyNameOnlySpace, clinicData, sortedList, sheetStyle_1, data, link, excelFileName, response, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, xlsx_populate_1.default.fromBlankAsync()];
                    case 1:
                        workbook = _a.sent();
                        clinicSheet_1 = workbook.sheet("Sheet1");
                        clinicSheetHeader = ["Clinic Name", "Email", "Type", "Status"];
                        clinicSheetHeader.forEach(function (el, i) {
                            clinicSheet_1
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
                        count = model.pageSize ? model.pageSize : erros_message_1.default.count;
                        req.body.page = model.pageNumber
                            ? model.pageNumber
                            : erros_message_1.default.defaultPageNo;
                        skip = count * (req.body.page - 1);
                        return [4 /*yield*/, roles_model_1.default.findOne({
                                roleName: "clinic",
                            })];
                    case 2:
                        clinicRoleDoc = _a.sent();
                        populateFeilds = [
                            {
                                path: "user_id",
                                select: {
                                    email: 1,
                                },
                            },
                        ];
                        condition = {
                            is_deleted: false,
                            role: clinicRoleDoc._id,
                        };
                        if (model.clinic_name) {
                            isEmptyNameOnlySpace = /^\s*$/.test(model.clinic_name);
                            if (isEmptyNameOnlySpace ||
                                model.clinic_name == null ||
                                model.clinic_name === "") {
                                return [2 /*return*/, {
                                        data: {
                                            message: erros_message_1.default.NON_EMPTY_CLINIC_NAME,
                                            error: erros_message_1.default.ON_FETCH_ERROR,
                                        },
                                        success: false,
                                        status_code: http_status_codes_1.default.BAD_REQUEST,
                                    }];
                            }
                            else
                                condition.clinic_name = {
                                    $regex: model.clinic_name,
                                    $options: "i",
                                };
                        }
                        if (model.isActive) {
                            condition.isActive = model.isActive;
                        }
                        if (model.clinic_type) {
                            condition.clinic_type = model.clinic_type;
                        }
                        return [4 /*yield*/, clinic_model_1.default.find(condition)
                                .populate(populateFeilds)
                                .sort({ clinic_name: 1 })];
                    case 3:
                        clinicData = _a.sent();
                        sortedList = clinicData.sort(function (a, b) {
                            return a.clinic_name.localeCompare(b.clinic_name);
                        });
                        if (!clinicData.length)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.CLINIC_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        sheetStyle_1 = {
                            border: true,
                            fontFamily: "Calibri",
                        };
                        sortedList.forEach(function (el, i) {
                            var _a;
                            clinicSheet_1
                                .cell("A" + (i + 2))
                                .value(el.clinic_name)
                                .style(sheetStyle_1);
                            clinicSheet_1;
                            clinicSheet_1
                                .cell("B" + (i + 2))
                                .value(((_a = el.user_id) === null || _a === void 0 ? void 0 : _a.email) ? el.user_id.email : "")
                                .style(sheetStyle_1);
                            clinicSheet_1
                                .cell("C" + (i + 2))
                                .value(el.clinic_type ? el.clinic_type : "")
                                .style(sheetStyle_1);
                            clinicSheet_1
                                .cell("D" + (i + 2))
                                .value(el.isActive === true ? "Activate" : "De-activate ")
                                .style(sheetStyle_1);
                        });
                        clinicSheet_1.freezePanes(1, 1);
                        return [4 /*yield*/, workbook.outputAsync()];
                    case 4:
                        data = _a.sent();
                        return [4 /*yield*/, fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../../../../public/upload/clinics/Clinic_Report.xlsx"), data)];
                    case 5:
                        _a.sent();
                        link = "http://".concat(req.hostname, ":").concat(process.env.PORT, "/upload/clinics/Clinic_Report.xlsx");
                        excelFileName = "Clinic_Report.xlsx";
                        response = {
                            link: link,
                            name: excelFileName,
                        };
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                data: response,
                                success: true,
                            }];
                    case 6:
                        error_13 = _a.sent();
                        next(error_13);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
    }
    return ClinicServices;
}());
exports.default = new ClinicServices();
