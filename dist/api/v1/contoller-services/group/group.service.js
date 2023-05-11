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
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var lodash_1 = __importDefault(require("lodash"));
var mongoose_1 = __importDefault(require("mongoose"));
var erros_message_1 = __importDefault(require("../../common/erros_message"));
var clinic_model_1 = __importStar(require("../../models/clinic.model"));
var clinic_association_with_group_model_1 = __importDefault(require("../../models/clinic_association_with_group.model"));
var group_model_1 = __importDefault(require("../../models/group.model"));
var history_model_1 = __importStar(require("../../models/history.model"));
var EnumRoles;
(function (EnumRoles) {
    EnumRoles["SUPERADMIN"] = "superadmin";
})(EnumRoles = exports.EnumRoles || (exports.EnumRoles = {}));
var GroupServices = /** @class */ (function () {
    function GroupServices() {
        var _this = this;
        this.addGroup = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, CheckGroupExistence, modelToSave, groupId, response, addHistory, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        userDetails = req.user;
                        return [4 /*yield*/, group_model_1.default.findOne({
                                name: model.name,
                                is_deleted: false,
                            })];
                    case 1:
                        CheckGroupExistence = _a.sent();
                        if (!CheckGroupExistence) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                data: {
                                    message: erros_message_1.default.ALREADY_EXISTED_GROUP,
                                    error: erros_message_1.default.ON_ADD_ERROR,
                                },
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                            }];
                    case 2:
                        modelToSave = model;
                        groupId = Math.round(Math.pow(36, 6 + 1) -
                            Math.random() * Math.pow(36, 6))
                            .toString(36)
                            .slice(1);
                        modelToSave.group_id =
                            modelToSave.name.slice(0, 2) + groupId;
                        return [4 /*yield*/, group_model_1.default.create(modelToSave)];
                    case 3:
                        response = _a.sent();
                        if (!response) return [3 /*break*/, 5];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "clinic group added successfully",
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
                                message: erros_message_1.default.ERROR_ADD_GROUP,
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
        this.getGroupDetails = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var foundGroup, checkClinicAssociatedWithGroup, associatedClinicIds_1, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, group_model_1.default.findOne({
                                _id: new mongoose_1.default.Types.ObjectId(req.params._id),
                                isDeleted: false,
                            })];
                    case 1:
                        foundGroup = _a.sent();
                        if (!foundGroup) return [3 /*break*/, 3];
                        return [4 /*yield*/, clinic_association_with_group_model_1.default.find({
                                group_id: new mongoose_1.default.Types.ObjectId(req.params._id),
                                is_deleted: false,
                            })];
                    case 2:
                        checkClinicAssociatedWithGroup = _a.sent();
                        associatedClinicIds_1 = [];
                        checkClinicAssociatedWithGroup.forEach(function (obj) {
                            var _a;
                            associatedClinicIds_1.push((_a = obj.clinic_id) === null || _a === void 0 ? void 0 : _a.toString());
                        });
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: __assign(__assign({}, foundGroup.toObject()), { totalClinics: checkClinicAssociatedWithGroup.length, associatedClinicArr: associatedClinicIds_1 }),
                            }];
                    case 3: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.GROUPS_DETAILS_NOT_FOUND,
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
        this.deleteGroupDetails = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, foundGroup, checkClinicAssociatedWithGroup, allClinicIds_1, updateClinicDetails, removeClinicAssociationWithGroup, deleteGroupDetails, addHistory, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, , 12]);
                        userDetails = req.user;
                        return [4 /*yield*/, group_model_1.default.findById(req.params._id)];
                    case 1:
                        foundGroup = _a.sent();
                        if (!foundGroup) return [3 /*break*/, 9];
                        return [4 /*yield*/, clinic_association_with_group_model_1.default.find({
                                group_id: new mongoose_1.default.Types.ObjectId(req.params._id),
                                is_deleted: false,
                            })];
                    case 2:
                        checkClinicAssociatedWithGroup = _a.sent();
                        allClinicIds_1 = [];
                        checkClinicAssociatedWithGroup.forEach(function (obj) {
                            var _a;
                            allClinicIds_1.push((_a = obj.clinic_id) === null || _a === void 0 ? void 0 : _a.toString());
                        });
                        if (!(allClinicIds_1.length > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, clinic_model_1.default.update({
                                _id: { $in: allClinicIds_1 },
                            }, { clinic_type: clinic_model_1.EClinicTypeValues.INDIVIDUAL })];
                    case 3:
                        updateClinicDetails = _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, clinic_association_with_group_model_1.default.deleteMany({
                            group_id: new mongoose_1.default.Types.ObjectId(req.params._id),
                        })];
                    case 5:
                        removeClinicAssociationWithGroup = _a.sent();
                        return [4 /*yield*/, group_model_1.default.updateOne({
                                _id: new mongoose_1.default.Types.ObjectId(req.params._id),
                            }, { isActive: false, isDeleted: true })];
                    case 6:
                        deleteGroupDetails = _a.sent();
                        if (!(deleteGroupDetails &&
                            deleteGroupDetails.modifiedCount > 0)) return [3 /*break*/, 8];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "clinic group deleted successfully",
                                type: history_model_1.EHistoryActivityTypeValues.CLINIC,
                            })];
                    case 7:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.DELETE_SUCCESSFULL,
                            }];
                    case 8: return [3 /*break*/, 10];
                    case 9: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_GROUP_DELETION,
                                error: erros_message_1.default.ON_DELETE_ERROR,
                            },
                        }];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        }); };
        // clinic association with group
        this.addClinicInGroup = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails_1, foundGroup_1, checkClinicAssociatedWithGroup, alreadyAssoClinicIds_1, clinicNotToBeGrouped_1, newArr, allClinicsObj_1, historyobjArr_1, clinicGroupingResult, updateClinicDetails, addHistory, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        userDetails_1 = req.user;
                        return [4 /*yield*/, group_model_1.default.findOne({
                                _id: new mongoose_1.default.Types.ObjectId(model.group_id),
                            })];
                    case 1:
                        foundGroup_1 = _a.sent();
                        model.clinic_ids = lodash_1.default.uniq(model.clinic_ids);
                        return [4 /*yield*/, clinic_association_with_group_model_1.default.find({
                                clinic_id: { $in: model.clinic_ids },
                                group_id: model.group_id,
                                isDeleted: false,
                            })];
                    case 2:
                        checkClinicAssociatedWithGroup = _a.sent();
                        if (checkClinicAssociatedWithGroup &&
                            checkClinicAssociatedWithGroup.length > 0) {
                            alreadyAssoClinicIds_1 = [];
                            checkClinicAssociatedWithGroup.forEach(function (obj) {
                                alreadyAssoClinicIds_1.push(obj.clinic_id.toString());
                            });
                            clinicNotToBeGrouped_1 = new Set(alreadyAssoClinicIds_1);
                            newArr = model.clinic_ids.filter(function (clinicId) {
                                // return those elements not in the clinicNotToBeGrouped
                                return !clinicNotToBeGrouped_1.has(clinicId);
                            });
                            model.clinic_ids = newArr;
                        }
                        allClinicsObj_1 = [];
                        historyobjArr_1 = [];
                        model.clinic_ids.forEach(function (tempId) {
                            var tempObj = {
                                clinic_id: tempId,
                                group_id: model.group_id.toString(),
                            };
                            allClinicsObj_1.push(tempObj);
                            var historyObj = {
                                user_id: userDetails_1._id,
                                description: "clinic added in ".concat(foundGroup_1.name, " group successfully"),
                                type: history_model_1.EHistoryActivityTypeValues.CLINIC,
                                type_id: tempId,
                            };
                            historyobjArr_1.push(historyObj);
                        });
                        return [4 /*yield*/, clinic_association_with_group_model_1.default.insertMany(allClinicsObj_1)];
                    case 3:
                        clinicGroupingResult = _a.sent();
                        if (!(clinicGroupingResult &&
                            clinicGroupingResult.length > 0)) return [3 /*break*/, 6];
                        return [4 /*yield*/, clinic_model_1.default.update({ _id: { $in: model.clinic_ids } }, { clinic_type: clinic_model_1.EClinicTypeValues.GROUP })];
                    case 4:
                        updateClinicDetails = _a.sent();
                        return [4 /*yield*/, history_model_1.default.insertMany(historyobjArr_1)];
                    case 5:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: clinicGroupingResult,
                            }];
                    case 6: return [2 /*return*/, {
                            data: {
                                message: erros_message_1.default.CLINIC_ALREADY_ASSOCIATED_GROUP,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                        }];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        // old api single added and updated
        // addClinicInGroup = async (
        //   req: Request,
        //   model: AddClinicInGroupViewmodel,
        //   next: NextFunction
        // ): Promise<IServiceResult1 | void> => {
        //   try {
        //     let userDetails = <DocumentType<User>>req.user;
        //     let CheckClinicExistInGroup =
        //       await ClinicAssociationModel.findOne({
        //         clinic_id: new mongoose.Types.ObjectId(
        //           model.clinic_id
        //         ),
        //       });
        //     if (
        //       CheckClinicExistInGroup &&
        //       CheckClinicExistInGroup.group_id!.toString() ==
        //         model.group_id.toString() &&
        //       CheckClinicExistInGroup.isDeleted == false
        //     ) {
        //       return {
        //         data: {
        //           message:
        //             errorMessage.CLINIC_ALREADY_ASSOCIATED_GROUP,
        //           error: errorMessage.ON_ADD_ERROR,
        //         },
        //         status_code: HttpStatus.BAD_REQUEST,
        //         success: false,
        //       };
        //     } else if (
        //       CheckClinicExistInGroup &&
        //       CheckClinicExistInGroup.group_id!.toString() ==
        //         model.group_id.toString() &&
        //       CheckClinicExistInGroup.isDeleted == true
        //     ) {
        //       // check this clinic already added but ungroup earlier , then only change isDeleted feild value "false"
        //       let updateClinicType = await ClinicModel.updateOne(
        //         {
        //           _id: new mongoose.Types.ObjectId(
        //             model.clinic_id
        //           ),
        //         },
        //         { clinic_type: EClinicTypeValues.GROUP }
        //       );
        //       // Add Activity History
        //       let addHistory = await HistoryModel.create({
        //         user_id: userDetails._id,
        //         description: `clinic re-associated with group successfully`,
        //         type: EHistoryActivityTypeValues.CLINIC,
        //       });
        //       let response =
        //         await ClinicAssociationModel.updateOne(
        //           { _id: CheckClinicExistInGroup._id },
        //           { isDeleted: false }
        //         );
        //       return {
        //         status_code: HttpStatus.OK,
        //         success: true,
        //         data: CheckClinicExistInGroup,
        //       };
        //     } else if (
        //       CheckClinicExistInGroup &&
        //       CheckClinicExistInGroup.group_id!.toString() !=
        //         model.group_id.toString() &&
        //       CheckClinicExistInGroup.isDeleted == false
        //     ) {
        //       return {
        //         data: {
        //           message:
        //             errorMessage.CLINIC_ALREADY_ASSOCIATED_ANOTHER_GROUP,
        //           error: errorMessage.ON_ADD_ERROR,
        //         },
        //         status_code: HttpStatus.BAD_REQUEST,
        //         success: false,
        //       };
        //     } else {
        //       let modelToSave = <ClinicAssociationGroup>model;
        //       let response = await ClinicAssociationModel.create(
        //         modelToSave
        //       );
        //       if (response) {
        //         {
        //           let updateClinicType =
        //             await ClinicModel.updateOne(
        //               {
        //                 _id: new mongoose.Types.ObjectId(
        //                   model.clinic_id
        //                 ),
        //               },
        //               { clinic_type: EClinicTypeValues.GROUP }
        //             );
        //           // Add Activity History
        //           let addHistory = await HistoryModel.create({
        //             user_id: userDetails._id,
        //             description: `clinic associated with group successfully`,
        //             type: EHistoryActivityTypeValues.CLINIC,
        //           });
        //           return {
        //             status_code: HttpStatus.OK,
        //             success: true,
        //             data: response,
        //           };
        //         }
        //       } else {
        //         return {
        //           status_code: HttpStatus.BAD_REQUEST,
        //           success: false,
        //           data: {
        //             message:
        //               errorMessage.ERROR_ADD_CLINIC_IN_GROUP,
        //             error: errorMessage.ON_ADD_ERROR,
        //           },
        //         };
        //       }
        //     }
        //   } catch (error) {
        //     next(error);
        //   }
        // };
        this.unGroupClinicFromGroup = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails_2, CheckClinicExistInGroup, response, updateClinicDetails, error_5;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        userDetails_2 = req.user;
                        return [4 /*yield*/, clinic_association_with_group_model_1.default.find({
                                clinic_id: { $in: model.clinic_ids },
                                is_deleted: false,
                            })];
                    case 1:
                        CheckClinicExistInGroup = _a.sent();
                        if (!(CheckClinicExistInGroup &&
                            CheckClinicExistInGroup.length < 1)) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                data: {
                                    message: erros_message_1.default.CLINIC_NOT_ASSOCIATED_GROUP,
                                    error: erros_message_1.default.ON_UPDATE_ERROR,
                                },
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                            }];
                    case 2: return [4 /*yield*/, clinic_association_with_group_model_1.default.deleteMany({
                            clinic_id: { $in: model.clinic_ids },
                        })];
                    case 3:
                        response = _a.sent();
                        if (!(response && response.deletedCount > 0)) return [3 /*break*/, 6];
                        return [4 /*yield*/, clinic_model_1.default.update({ _id: { $in: model.clinic_ids } }, {
                                clinic_type: clinic_model_1.EClinicTypeValues.INDIVIDUAL,
                            })];
                    case 4:
                        updateClinicDetails = _a.sent();
                        model.clinic_ids = lodash_1.default.uniq(model.clinic_ids);
                        return [4 /*yield*/, Promise.all(model.clinic_ids.map(function (obj) { return __awaiter(_this, void 0, void 0, function () {
                                var addHistory;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, history_model_1.default.create({
                                                user_id: userDetails_2._id,
                                                description: "clinic ungroup from group successfully",
                                                type: history_model_1.EHistoryActivityTypeValues.CLINIC,
                                                type_id: obj,
                                            })];
                                        case 1:
                                            addHistory = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.UPDATE_SUCCESSFULL,
                            }];
                    case 6: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_UNGROUP_CLINIC_IN_GROUP,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                        }];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.getGroupList = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var count, skip, condition, data, obj, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        count = model.pageSize ? model.pageSize : 50;
                        req.body.page = model.pageNumber
                            ? model.pageNumber
                            : 1;
                        skip = count * (req.body.page - 1);
                        condition = {
                            isDeleted: false,
                        };
                        if (model.group_name) {
                            // let isEmptyNameOnlySpace = /^\s*$/.test(
                            //   model.group_name
                            // );
                            // if (
                            //   isEmptyNameOnlySpace ||
                            //   model.group_name == null
                            //   // ||
                            //   // model.group_name === ""
                            // ) {
                            //   return {
                            //     data: {
                            //       message: errorMessage.NON_EMPTY_GROUP_NAME,
                            //       error: errorMessage.ON_FETCH_ERROR,
                            //     },
                            //     success: false,
                            //     status_code: HttpStatus.BAD_REQUEST,
                            //   };
                            // } else
                            condition.name = {
                                $regex: model.group_name,
                                $options: "i",
                            };
                        }
                        if (model.isActive) {
                            condition.isActive = model.isActive;
                        }
                        return [4 /*yield*/, group_model_1.default.aggregate([
                                { $match: condition },
                                { $sort: { createdAt: -1 } },
                                {
                                    $lookup: {
                                        from: "clinic_association_groups",
                                        localField: "_id",
                                        foreignField: "group_id",
                                        pipeline: [{ $match: { isDeleted: false } }],
                                        //pipeline: [{ $count: "count" }],
                                        as: "clinic_association_groups_arr",
                                    },
                                },
                                // {
                                //   $unwind: {
                                //     path: "$count",
                                //     preserveNullAndEmptyArrays: true,
                                //   },
                                // },
                                // {
                                //   $group: {
                                //     _id: "$_id",
                                //     count: { $first: "$count" },
                                //     name: { $first: "$name" },
                                //     isActive: { $first: "$isActive" },
                                //     isDeleted: { $first: "$isDeleted" },
                                //     createdAt: { $first: "$createdAt" },
                                //   },
                                // },
                                {
                                    $facet: {
                                        totalCount: [{ $count: "sum" }],
                                        aggregatedData: [
                                            {
                                                $project: {
                                                    _id: "$_id",
                                                    name: 1,
                                                    group_id: 1,
                                                    isActive: 1,
                                                    isDeleted: 1,
                                                    //count: { $ifNull: ["$count.count", 0] },
                                                    count: {
                                                        $cond: {
                                                            if: {
                                                                $isArray: "$clinic_association_groups_arr",
                                                            },
                                                            then: {
                                                                $size: "$clinic_association_groups_arr",
                                                            },
                                                            else: 0,
                                                        },
                                                    },
                                                    //createdAt: 1,
                                                },
                                            },
                                            { $limit: skip + count },
                                            { $skip: skip },
                                            //{ $sort: { createdAt: -1 } },
                                        ],
                                    },
                                },
                            ])];
                    case 1:
                        data = _a.sent();
                        if (data && data[0].aggregatedData.length > 0) {
                            obj = {
                                data: data[0].aggregatedData,
                                // count: result.totalDocs,
                                totalDocs: data[0].totalCount[0].sum,
                                // pageNumber: req.body.page,
                                // pageSize: count,
                                // totalPages: Math.ceil(
                                //   data[0].aggregatedData.length / count
                                // ),
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
                                        message: erros_message_1.default.CLINIC_GROUP_LIST_NOT_FOUND,
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
        this.getGroupListWithoutPagination = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var condition, response, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        condition = {
                            is_deleted: false,
                        };
                        return [4 /*yield*/, group_model_1.default.find(condition, {
                                name: 1,
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
                                        message: erros_message_1.default.CLINIC_GROUP_LIST_NOT_FOUND,
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
    }
    return GroupServices;
}());
exports.default = new GroupServices();
