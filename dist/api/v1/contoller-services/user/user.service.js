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
var bcrypt_1 = __importDefault(require("bcrypt"));
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var mongoose_1 = __importDefault(require("mongoose"));
var twilio_1 = __importDefault(require("twilio"));
var uuid_1 = require("uuid");
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var erros_message_1 = __importDefault(require("../../common/erros_message"));
var history_model_1 = __importStar(require("../../models/history.model"));
var login_token_model_1 = __importDefault(require("../../models/login_token.model"));
var otp_model_1 = __importDefault(require("../../models/otp_model"));
var patient_model_1 = __importDefault(require("../../models/patient.model"));
var roles_model_1 = __importDefault(require("../../models/roles.model"));
var user_model_1 = __importDefault(require("../../models/user.model"));
var EnumRoles;
(function (EnumRoles) {
    EnumRoles["SUPERADMIN"] = "superadmin";
})(EnumRoles = exports.EnumRoles || (exports.EnumRoles = {}));
var twilio_instance = (0, twilio_1.default)(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
var UserServices = /** @class */ (function () {
    function UserServices() {
        var _this = this;
        //Auth Services
        this.login = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var found_user, loginUserresult, comparePasswordResult, roleDoc, tokenPayload, signtoken, saveToken, addHistory, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 10, , 11]);
                        found_user = void 0;
                        return [4 /*yield*/, user_model_1.default.findOne({
                                email: model.email.toLowerCase(),
                            }).populate([{ path: "role" }])];
                    case 1:
                        found_user = _b.sent();
                        if (!!found_user) return [3 /*break*/, 3];
                        return [4 /*yield*/, patient_model_1.default.findOne({
                                email: model.email.toLowerCase(),
                            }).populate([{ path: "role" }])];
                    case 2:
                        loginUserresult = _b.sent();
                        if (loginUserresult) {
                            loginUserresult.first_name =
                                common_methods_1.default.getDecryptText(loginUserresult.first_name);
                            loginUserresult.last_name =
                                common_methods_1.default.getDecryptText(loginUserresult.last_name);
                            found_user = loginUserresult;
                        }
                        _b.label = 3;
                    case 3:
                        if (!!found_user) return [3 /*break*/, 4];
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                data: {
                                    message: erros_message_1.default.USER_NOT_FOUND,
                                    Error: erros_message_1.default.ON_FETCH_ERROR,
                                },
                                success: false,
                            }];
                    case 4: return [4 /*yield*/, bcrypt_1.default.compare(model.password, (_a = found_user.password) !== null && _a !== void 0 ? _a : "")];
                    case 5:
                        comparePasswordResult = _b.sent();
                        if (!comparePasswordResult) return [3 /*break*/, 8];
                        roleDoc = found_user.role;
                        tokenPayload = {
                            email: found_user.email,
                            user_id: found_user._id,
                            role: roleDoc ? roleDoc.roleTitle : "",
                        };
                        signtoken = common_methods_1.default.signJWT(tokenPayload);
                        return [4 /*yield*/, login_token_model_1.default.create({
                                token: signtoken,
                                user_id: found_user._id,
                            })];
                    case 6:
                        saveToken = _b.sent();
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: found_user._id,
                                description: "login successfully",
                                type: history_model_1.EHistoryActivityTypeValues.USER,
                                type_id: found_user._id,
                            })];
                    case 7:
                        addHistory = _b.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: {
                                    email: found_user.email,
                                    user_id: found_user._id,
                                    first_name: found_user.first_name,
                                    last_name: found_user.last_name,
                                    token: signtoken,
                                    role: roleDoc ? roleDoc.roleTitle : "",
                                    image: found_user.image,
                                    user_permission: found_user.role_permission
                                        ? found_user.role_permission
                                        : {},
                                },
                            }];
                    case 8: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: erros_message_1.default.WRONG_PASSWORD,
                                error: erros_message_1.default.LOGIN,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        }); };
        this.logout = function (req) { return __awaiter(_this, void 0, void 0, function () {
            var refresh_token, payload, checkNotExistTokenForLogin, result, result_1, addHistory, error_2;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 9, , 10]);
                        refresh_token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.replace("Bearer", "");
                        if (!!refresh_token) return [3 /*break*/, 1];
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                data: {
                                    message: "Token Not Found",
                                    error: "On Logout With Token Error",
                                },
                            }];
                    case 1:
                        payload = common_methods_1.default.decodeToken(refresh_token);
                        return [4 /*yield*/, login_token_model_1.default.findOne({
                                user_id: new mongoose_1.default.Types.ObjectId(payload.user_id),
                                token: refresh_token,
                            })];
                    case 2:
                        checkNotExistTokenForLogin = _b.sent();
                        return [4 /*yield*/, login_token_model_1.default.deleteOne({
                                user_id: new mongoose_1.default.Types.ObjectId(payload.user_id),
                                token: refresh_token,
                            })];
                    case 3:
                        result = _b.sent();
                        if (!((result && result.deletedCount > 0) ||
                            !checkNotExistTokenForLogin)) return [3 /*break*/, 7];
                        if (!(req.body.logoutAllDevices === true)) return [3 /*break*/, 5];
                        return [4 /*yield*/, login_token_model_1.default.deleteMany({
                                user_id: {
                                    $eq: new mongoose_1.default.Types.ObjectId(payload.user_id),
                                },
                            })];
                    case 4:
                        result_1 = _b.sent();
                        _b.label = 5;
                    case 5: return [4 /*yield*/, history_model_1.default.create({
                            user_id: payload.user_id,
                            description: "logout successfully",
                            type: history_model_1.EHistoryActivityTypeValues.USER,
                            type_id: payload._id,
                        })];
                    case 6:
                        addHistory = _b.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                data: true,
                                success: true,
                            }];
                    case 7: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            data: {
                                message: "Token Not Found",
                                error: "On Logout Error",
                            },
                            success: false,
                        }];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_2 = _b.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                data: true,
                                success: true,
                            }];
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        this.changePassword = function (req, model) { return __awaiter(_this, void 0, void 0, function () {
            var foundUser, isAuthenticateEmployee, salt, temp_password, updateUserPassword, logoutFromAllDevices, addHistory, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 14, , 15]);
                        return [4 /*yield*/, user_model_1.default.findOne({
                                email: model.email.toLowerCase(),
                            })];
                    case 1:
                        foundUser = _a.sent();
                        if (!!foundUser) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                success: false,
                                data: {
                                    message: "User Not Found",
                                    error: "On Add Error",
                                },
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                            }];
                    case 2: return [4 /*yield*/, bcrypt_1.default.compare(model.password, foundUser.password)];
                    case 3:
                        isAuthenticateEmployee = _a.sent();
                        if (!isAuthenticateEmployee) return [3 /*break*/, 12];
                        return [4 /*yield*/, bcrypt_1.default.genSalt(11)];
                    case 4:
                        salt = _a.sent();
                        return [4 /*yield*/, bcrypt_1.default.hash(model.new_password, salt)];
                    case 5:
                        temp_password = _a.sent();
                        return [4 /*yield*/, user_model_1.default.updateOne({
                                _id: new mongoose_1.default.Types.ObjectId(foundUser._id),
                            }, { password: temp_password })];
                    case 6:
                        updateUserPassword = _a.sent();
                        if (!(updateUserPassword.modifiedCount > 0)) return [3 /*break*/, 10];
                        if (!(model.logOutAll === "true")) return [3 /*break*/, 8];
                        return [4 /*yield*/, login_token_model_1.default.deleteMany({
                                user_id: { $eq: foundUser._id },
                            })];
                    case 7:
                        logoutFromAllDevices = _a.sent();
                        _a.label = 8;
                    case 8: return [4 /*yield*/, history_model_1.default.create({
                            user_id: foundUser._id,
                            description: "password changed successfully",
                            type: history_model_1.EHistoryActivityTypeValues.USER,
                            type_id: foundUser._id,
                        })];
                    case 9:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                data: true,
                                status_code: http_status_codes_1.default.OK,
                            }];
                    case 10: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: "An Error occurred While Reset Password",
                                error: "On Update Error",
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 11: return [3 /*break*/, 13];
                    case 12: return [2 /*return*/, {
                            success: false,
                            data: {
                                message: "Password Not Matched",
                                error: "On Update Error",
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                        }];
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        error_3 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                data: {
                                    message: "Internal Server Error",
                                    error: "On Update Error",
                                },
                                status_code: http_status_codes_1.default.INTERNAL_SERVER_ERROR,
                            }];
                    case 15: return [2 /*return*/];
                }
            });
        }); };
        //User Section
        this.getUserDetails = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, foundUser, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        return [4 /*yield*/, user_model_1.default.findById(req.params._id, {
                                // createdAt: 0,
                                // updatedAt: 0,
                                // __v: 0,
                                // password: 0,
                                first_name: 1,
                                last_name: 1,
                                mobile_no: 1,
                                image: 1,
                                role: 1,
                                email: 1,
                                role_permission: 1,
                            }).populate([
                                { path: "role", select: { _id: 0, roleTitle: 1 } },
                            ])];
                    case 1:
                        foundUser = _a.sent();
                        if (foundUser) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: foundUser,
                                }];
                        }
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.USER_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getRoleList = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var foundRoleList, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        foundRoleList = void 0;
                        return [4 /*yield*/, roles_model_1.default.find({
                                roleName: { $ne: "superadmin" },
                                isDeleted: false,
                            }).sort({ roleName: 1 })];
                    case 1:
                        foundRoleList = _a.sent();
                        if (!(req.params.type === "billing")) return [3 /*break*/, 3];
                        return [4 /*yield*/, roles_model_1.default.find({
                                roleName: { $ne: "superadmin" },
                                isDeleted: false,
                                isBillingTeam: true,
                            }).sort({ roleName: 1 })];
                    case 2:
                        foundRoleList = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (foundRoleList && foundRoleList.length > 0) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: foundRoleList,
                                }];
                        }
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ROLE_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 5];
                    case 4:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.updateRole = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, foundRole, modelToSave, newObj, key, response, addHistory, updateUserCollection, updatePatientCollection, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 10, , 11]);
                        userDetails = req.user;
                        return [4 /*yield*/, roles_model_1.default.findOne({
                                _id: model._id,
                                // is_deleted: false,
                            })];
                    case 1:
                        foundRole = _a.sent();
                        if (!foundRole) return [3 /*break*/, 8];
                        modelToSave = model;
                        newObj = {};
                        for (key in model.permission) {
                            if (!newObj.hasOwnProperty(key)) {
                                newObj[key] = model.permission[key];
                            }
                        }
                        return [4 /*yield*/, roles_model_1.default.updateOne({ _id: foundRole._id }, { $set: { permission: newObj } }
                            // modelToSave
                            )];
                    case 2:
                        response = _a.sent();
                        if (!(response && response.modifiedCount > 0)) return [3 /*break*/, 6];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "Role details updated successfully",
                                type: history_model_1.EHistoryActivityTypeValues.USER,
                                type_id: model._id,
                            })];
                    case 3:
                        addHistory = _a.sent();
                        return [4 /*yield*/, user_model_1.default.updateMany({
                                role: new mongoose_1.default.Types.ObjectId(model._id),
                            }, { role_permission: model.permission })];
                    case 4:
                        updateUserCollection = _a.sent();
                        return [4 /*yield*/, patient_model_1.default.updateMany({
                                role: new mongoose_1.default.Types.ObjectId(model._id),
                            }, { role_permission: model.permission })];
                    case 5:
                        updatePatientCollection = _a.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.UPDATE_SUCCESSFULL,
                            }];
                    case 6: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_UPDATE_USER_ROLE,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                        }];
                    case 7: return [3 /*break*/, 9];
                    case 8: return [2 /*return*/, {
                            data: {
                                message: erros_message_1.default.ROLE_NOT_FOUND,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                        }];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        error_6 = _a.sent();
                        next(error_6);
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        }); };
        this.addRole = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, modelToSave, checkRoleTitleExistence, checkRoleNameExistence, addRoleResult, addHistory, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        userDetails = req.user;
                        modelToSave = model;
                        modelToSave.createdby_id = userDetails._id;
                        return [4 /*yield*/, roles_model_1.default.findOne({
                                roleTitle: model.roleTitle,
                            })];
                    case 1:
                        checkRoleTitleExistence = _a.sent();
                        if (checkRoleTitleExistence)
                            return [2 /*return*/, {
                                    success: false,
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    data: {
                                        message: erros_message_1.default.ROLE_TITLE_ALREADY_ASSIGNED,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        return [4 /*yield*/, roles_model_1.default.findOne({
                                roleName: model.roleName,
                            })];
                    case 2:
                        checkRoleNameExistence = _a.sent();
                        if (checkRoleNameExistence)
                            return [2 /*return*/, {
                                    success: false,
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    data: {
                                        message: erros_message_1.default.ROLE_NAME_ALREADY_ASSIGNED,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        return [4 /*yield*/, roles_model_1.default.create(modelToSave)];
                    case 3:
                        addRoleResult = _a.sent();
                        if (!addRoleResult) return [3 /*break*/, 5];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "Role details added successfully",
                                type: history_model_1.EHistoryActivityTypeValues.USER,
                            })];
                    case 4:
                        addHistory = _a.sent();
                        // update role details in  user and patient collection associated with this role
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: addRoleResult,
                            }];
                    case 5: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_ADD_USER_ROLE,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                        }];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_7 = _a.sent();
                        next(error_7);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.getRoleDetails = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, foundRoleDetails, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        return [4 /*yield*/, roles_model_1.default.findById(req.params._id, {})];
                    case 1:
                        foundRoleDetails = _a.sent();
                        if (foundRoleDetails) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: foundRoleDetails,
                                }];
                        }
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ROLE_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 3];
                    case 2:
                        error_8 = _a.sent();
                        next(error_8);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.addUser = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, superadminRoleDoc_1, teamAdminRoleDoc_1, allRoles, foundUser, modelToSave, salt, temp_password, password_for_employee, passwordToBeSave, _a, response, addHistory, error_9;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 14, , 15]);
                        userDetails = req.user;
                        return [4 /*yield*/, roles_model_1.default.find({})];
                    case 1:
                        allRoles = _b.sent();
                        allRoles.forEach(function (x) {
                            if (x.roleName == "superadmin")
                                superadminRoleDoc_1 = x;
                            else if (x.roleName == "teamadmin")
                                teamAdminRoleDoc_1 = x;
                        });
                        if (!((userDetails === null || userDetails === void 0 ? void 0 : userDetails.role.toString()) !=
                            superadminRoleDoc_1._id.toString() &&
                            (userDetails === null || userDetails === void 0 ? void 0 : userDetails.role.toString()) !=
                                teamAdminRoleDoc_1._id.toString())) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                data: {
                                    message: erros_message_1.default.ADD_USER_NOT_AUTORIZED,
                                    error: erros_message_1.default.ON_ADD_ERROR,
                                },
                                success: false,
                                status_code: http_status_codes_1.default.UNAUTHORIZED,
                            }];
                    case 2:
                        if (!((userDetails === null || userDetails === void 0 ? void 0 : userDetails.role.toString()) !==
                            superadminRoleDoc_1._id.toString() &&
                            model.role == teamAdminRoleDoc_1._id.toString())) return [3 /*break*/, 3];
                        return [2 /*return*/, {
                                data: {
                                    message: erros_message_1.default.ADD_TEAM_ADMIN_USER_NOT_AUTORIZED,
                                    error: erros_message_1.default.ON_ADD_ERROR,
                                },
                                success: false,
                                status_code: http_status_codes_1.default.UNAUTHORIZED,
                            }];
                    case 3: return [4 /*yield*/, user_model_1.default.findOne({
                            email: model.email.toLowerCase(),
                            is_deleted: false,
                        })];
                    case 4:
                        foundUser = _b.sent();
                        if (!foundUser) return [3 /*break*/, 5];
                        return [2 /*return*/, {
                                data: {
                                    message: erros_message_1.default.ALREADY_ASSOCIATED_EMAIL,
                                    error: erros_message_1.default.ON_ADD_ERROR,
                                },
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                            }];
                    case 5:
                        modelToSave = model;
                        modelToSave.addedBy_id = userDetails._id;
                        return [4 /*yield*/, bcrypt_1.default.genSalt(11)];
                    case 6:
                        salt = _b.sent();
                        temp_password = Math.round(Math.pow(36, 6 + 1) -
                            Math.random() * Math.pow(36, 6))
                            .toString(36)
                            .slice(1);
                        password_for_employee = model.password
                            ? model.password
                            : temp_password;
                        if (!model.password) return [3 /*break*/, 8];
                        return [4 /*yield*/, bcrypt_1.default.hash(model.password, salt)];
                    case 7:
                        _a = _b.sent();
                        return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, bcrypt_1.default.hash(temp_password, salt)];
                    case 9:
                        _a = _b.sent();
                        _b.label = 10;
                    case 10:
                        passwordToBeSave = _a;
                        modelToSave.password = passwordToBeSave;
                        modelToSave.email = model.email.toLowerCase();
                        return [4 /*yield*/, user_model_1.default.create(modelToSave)];
                    case 11:
                        response = _b.sent();
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "user added successfully",
                                type: history_model_1.EHistoryActivityTypeValues.USER,
                                type_id: response._id,
                            })];
                    case 12:
                        addHistory = _b.sent();
                        if (response) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: response,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.ERROR_ADD_USER,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        }
                        _b.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        error_9 = _b.sent();
                        next(error_9);
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        }); };
        this.updateUser = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, superadminRoleDoc_2, teamAdminRoleDoc_2, allRoles, specifiedRole_1, clinicRoleDoc_1, foundUser, modelToSave, response, addHistory, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        userDetails = req.user;
                        console.log(req.body, "============");
                        return [4 /*yield*/, roles_model_1.default.find({})];
                    case 1:
                        allRoles = _a.sent();
                        allRoles.forEach(function (x) {
                            if (x.roleName == "superadmin")
                                superadminRoleDoc_2 = x;
                            if (x.roleName == "teamadmin")
                                teamAdminRoleDoc_2 = x;
                            if (x.roleName == "clinic")
                                clinicRoleDoc_1 = x;
                            if (model.role) {
                                if (x._id.toString() == model.role.toString())
                                    specifiedRole_1 = x;
                            }
                        });
                        if (model.role || model.isActive || model.isDeleted) {
                            if (userDetails.role.toString() !=
                                superadminRoleDoc_2._id.toString() &&
                                model.role
                            //   &&
                            // userDetails?.role!.toString() !=
                            //   teamAdminRoleDoc._id.toString()
                            )
                                return [2 /*return*/, {
                                        data: {
                                            message: erros_message_1.default.NOT_AUTORIZED_UPDATE_ROLE,
                                            error: erros_message_1.default.ON_UPDATE_ERROR,
                                        },
                                        success: false,
                                        status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    }];
                            if (userDetails.role.toString() !=
                                superadminRoleDoc_2._id.toString() &&
                                model.isActive)
                                return [2 /*return*/, {
                                        data: {
                                            message: erros_message_1.default.NOT_AUTORIZED_UPDATE_ACTIVATE_STATUS,
                                            error: erros_message_1.default.ON_UPDATE_ERROR,
                                        },
                                        success: false,
                                        status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    }];
                            if ((userDetails === null || userDetails === void 0 ? void 0 : userDetails.role.toString()) !=
                                superadminRoleDoc_2._id.toString() &&
                                model.isDeleted)
                                return [2 /*return*/, {
                                        data: {
                                            message: erros_message_1.default.NOT_AUTORIZED_DELETE_STATUS,
                                            error: erros_message_1.default.ON_UPDATE_ERROR,
                                        },
                                        success: false,
                                        status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    }];
                        }
                        return [4 /*yield*/, user_model_1.default.findOne({
                                _id: model._id,
                                is_deleted: false,
                            })];
                    case 2:
                        foundUser = _a.sent();
                        if (!foundUser) return [3 /*break*/, 7];
                        modelToSave = model;
                        // if (model.email) {
                        //   let foundEmailEixstence = await UserModel.findOne(
                        //     {
                        //       email: model.email.toLowerCase(),
                        //       is_deleted: false,
                        //     }
                        //   );
                        //   if (
                        //     foundEmailEixstence &&
                        //     foundEmailEixstence._id.toString() !==
                        //       model._id.toString()
                        //   ) {
                        //     return {
                        //       data: {
                        //         message:
                        //           errorMessage.ALREADY_ASSOCIATED_EMAIL,
                        //         error: errorMessage.ON_UPDATE_ERROR,
                        //       },
                        //       status_code: HttpStatus.BAD_REQUEST,
                        //       success: false,
                        //     };
                        //   } else {
                        //     modelToSave.email = model.email;
                        //   }
                        // }
                        if (specifiedRole_1) {
                            modelToSave.role = specifiedRole_1._id;
                            modelToSave.role_permission =
                                specifiedRole_1.permission;
                        }
                        modelToSave.first_name = model.first_name
                            ? model.first_name
                            : foundUser.first_name;
                        modelToSave.last_name = model.last_name
                            ? model.last_name
                            : foundUser.last_name;
                        modelToSave.password = foundUser.password;
                        return [4 /*yield*/, user_model_1.default.updateOne({ _id: model._id }, modelToSave)];
                    case 3:
                        response = _a.sent();
                        if (!(response && response.modifiedCount > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "user updated successfully",
                                type: history_model_1.EHistoryActivityTypeValues.USER,
                                type_id: model._id,
                            })];
                    case 4:
                        addHistory = _a.sent();
                        // // if user is clinic type role then update feilds in clinic collection
                        // if (
                        //   foundUser.role!.toString() ===
                        //     clinicRoleDoc._id.toString() &&
                        //   (model.first_name || model.last_name)
                        // ) {
                        //   let name =
                        //     model.first_name ??
                        //     foundUser.first_name +
                        //       " " +
                        //       model.last_name ??
                        //     foundUser.last_name;
                        //   let updateClinicDetails =
                        //     await ClinicModel.updateOne(
                        //       { user_id: foundUser._id },
                        //       { clinic_name: name }
                        //     );
                        // }
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: erros_message_1.default.UPDATE_SUCCESSFULL,
                            }];
                    case 5: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_UPDATE_USER,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                        }];
                    case 6: return [3 /*break*/, 8];
                    case 7: return [2 /*return*/, {
                            data: {
                                message: erros_message_1.default.USER_NOT_FOUND,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                        }];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_10 = _a.sent();
                        next(error_10);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        this.getUserList = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var superAdminRoleDoc, defaultPage, count, populateFeilds, condition, isEmptyNameOnlySpace, response, tempResult, result, obj, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, roles_model_1.default.findOne({
                                roleName: "superadmin",
                            })];
                    case 1:
                        superAdminRoleDoc = _a.sent();
                        defaultPage = void 0;
                        count = void 0;
                        populateFeilds = [
                            { path: "role", select: { _id: 0, roleTitle: 1 } },
                            {
                                path: "addedBy_id",
                                select: { _id: 0, first_name: 1, last_name: 1 },
                            },
                        ];
                        condition = {
                            role: { $ne: superAdminRoleDoc._id },
                            is_deleted: false,
                        };
                        if (model.role) {
                            condition.role = model.role;
                        }
                        if (model.first_name) {
                            isEmptyNameOnlySpace = /^\s*$/.test(model.first_name);
                            condition.first_name = {
                                $regex: model.first_name,
                                $options: "i",
                            };
                        }
                        if (!(!model.pageNumber && !model.pageSize)) return [3 /*break*/, 3];
                        defaultPage = 1;
                        count = -1;
                        return [4 /*yield*/, user_model_1.default.find(condition, {
                                createdAt: 0,
                                updatedAt: 0,
                                __v: 0,
                                password: 0,
                            })
                                .populate(populateFeilds)
                                .sort({ createdAt: -1 })];
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
                                        message: erros_message_1.default.USER_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 4];
                    case 3:
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
                        _a.label = 4;
                    case 4:
                        tempResult = void 0;
                        return [4 /*yield*/, user_model_1.default.paginate(__assign(__assign({}, condition), { options: {
                                    projection: {
                                        createdAt: 0,
                                        updatedAt: 0,
                                        __v: 0,
                                        password: 0,
                                    },
                                } }), __assign(__assign({ page: defaultPage }, (count > 0
                                ? { limit: count }
                                : { pagination: false })), { populate: populateFeilds, sort: { createdAt: -1 } }))];
                    case 5:
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
                                        message: erros_message_1.default.USER_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        error_11 = _a.sent();
                        next(error_11);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.getUserListWithoutPagination = function (req, next) { return __awaiter(_this, void 0, void 0, function () {
            var superAdminRoleDoc, condition, response, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, roles_model_1.default.findOne({
                                roleName: "superadmin",
                            })];
                    case 1:
                        superAdminRoleDoc = _a.sent();
                        condition = {
                            role: { $ne: superAdminRoleDoc._id },
                            is_deleted: false,
                        };
                        return [4 /*yield*/, user_model_1.default.find(condition, {
                                first_name: 1,
                                last_name: 1,
                                email: 1,
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
                                        message: erros_message_1.default.USER_LIST_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_12 = _a.sent();
                        next(error_12);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.forgotPassword = function (req, model) { return __awaiter(_this, void 0, void 0, function () {
            var found_user, condition, startTime, endTime, foundAlreadyGeneratedOtp, resetKeyValue, updateUserDetails, addEntryInOTP, printContents, options, mailResponse, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        return [4 /*yield*/, user_model_1.default.findOne({
                                email: model.email.toLowerCase(),
                            })];
                    case 1:
                        found_user = _a.sent();
                        if (!!found_user) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                success: false,
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                data: {
                                    message: erros_message_1.default.USER_NOT_FOUND,
                                    Error: erros_message_1.default.ON_FETCH_ERROR,
                                },
                            }];
                    case 2:
                        condition = {
                            user_id: new mongoose_1.default.Types.ObjectId(found_user._id),
                            createdAt: {},
                        };
                        startTime = new Date(model.currentDate);
                        startTime.setHours(0, 0, 0, 0);
                        endTime = new Date(model.currentDate);
                        endTime.setHours(23, 59, 59, 999);
                        condition.createdAt = {
                            $gte: startTime,
                            $lte: endTime,
                        };
                        return [4 /*yield*/, otp_model_1.default
                                .find(condition)
                                .sort({ updatedAt: -1 })];
                    case 3:
                        foundAlreadyGeneratedOtp = _a.sent();
                        if (foundAlreadyGeneratedOtp &&
                            foundAlreadyGeneratedOtp.length === 3) {
                            return [2 /*return*/, {
                                    success: false,
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    data: {
                                        message: erros_message_1.default.LIMIT_EXCEED_TRY_AFTER_24_HOURS,
                                        error: erros_message_1.default.ON_FORGOT_PASSWORD_ERROR,
                                    },
                                }];
                        }
                        resetKeyValue = (0, uuid_1.v4)();
                        return [4 /*yield*/, user_model_1.default.updateOne({ _id: found_user._id }, { resetkey: resetKeyValue })];
                    case 4:
                        updateUserDetails = _a.sent();
                        if (!(updateUserDetails &&
                            updateUserDetails.modifiedCount > 0)) return [3 /*break*/, 7];
                        return [4 /*yield*/, otp_model_1.default.create({
                                user_id: found_user._id,
                                otp: resetKeyValue,
                            })];
                    case 5:
                        addEntryInOTP = _a.sent();
                        printContents = {
                            userId: found_user._id,
                            email: found_user.email,
                            userName: found_user.first_name,
                            link: "http://192.168.1.114:3000/" +
                                "reset-password/" +
                                resetKeyValue,
                        };
                        options = {
                            to: found_user.email,
                            subject: erros_message_1.default.ForgotPasswordTitle,
                        };
                        return [4 /*yield*/, common_methods_1.default.ForgotPasswordEmail(options, printContents)];
                    case 6:
                        mailResponse = _a.sent();
                        if (mailResponse)
                            return [2 /*return*/, {
                                    success: true,
                                    status_code: http_status_codes_1.default.OK,
                                    data: erros_message_1.default.LINK_SEND_TO_EMAIL,
                                }];
                        else
                            return [2 /*return*/, {
                                    success: false,
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    data: {
                                        message: erros_message_1.default.EMAIL_NOT_SEND,
                                        error: erros_message_1.default.ON_FORGOT_PASSWORD_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 8];
                    case 7: return [2 /*return*/, {
                            success: false,
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            data: {
                                message: erros_message_1.default.EMAIL_NOT_SEND,
                                error: erros_message_1.default.ON_FORGOT_PASSWORD_ERROR,
                            },
                        }];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_13 = _a.sent();
                        console.log(error_13);
                        return [2 /*return*/, {
                                success: false,
                                status_code: http_status_codes_1.default.INTERNAL_SERVER_ERROR,
                                data: {
                                    message: erros_message_1.default.INTERNAL_SERVER_ERROR,
                                    error: erros_message_1.default.ON_FORGOT_PASSWORD_ERROR,
                                },
                            }];
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        this.reset_forgot_password = function (model) { return __awaiter(_this, void 0, void 0, function () {
            var found_user, salt, new_password, result, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, user_model_1.default.findOne({
                                // email: model.email.toLowerCase(),
                                resetkey: model.reset_token,
                            })];
                    case 1:
                        found_user = _a.sent();
                        if (!found_user) return [3 /*break*/, 5];
                        return [4 /*yield*/, bcrypt_1.default.genSalt(11)];
                    case 2:
                        salt = _a.sent();
                        return [4 /*yield*/, bcrypt_1.default.hash(model.new_password, salt)];
                    case 3:
                        new_password = _a.sent();
                        return [4 /*yield*/, user_model_1.default.updateOne({ email: found_user.email }, { password: new_password })];
                    case 4:
                        result = _a.sent();
                        if (result && result.modifiedCount > 0) {
                            return [2 /*return*/, {
                                    success: true,
                                    status_code: http_status_codes_1.default.OK,
                                    data: "Password Updated Successfully",
                                }];
                        }
                        else
                            return [2 /*return*/, {
                                    success: false,
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    data: {
                                        message: "Unbale To Update New Password",
                                        error: "On Update Error",
                                    },
                                }];
                        return [3 /*break*/, 6];
                    case 5: return [2 /*return*/, {
                            success: false,
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            data: {
                                message: erros_message_1.default.NOT_AUTHORIZED_RESET_PASSWORD,
                                error: erros_message_1.default.ON_FETCH_ERROR,
                            },
                        }];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_14 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                status_code: http_status_codes_1.default.INTERNAL_SERVER_ERROR,
                                data: {
                                    message: erros_message_1.default.INTERNAL_SERVER_ERROR,
                                    Error: erros_message_1.default.ON_FETCH_ERROR,
                                },
                            }];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        // history section
        this.getUserHistoryListNew = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var populatedFields, condition, defaultPage, count, result, obj, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        populatedFields = [
                            {
                                path: "user_id",
                                select: { first_name: 1, last_name: 1 },
                            },
                        ];
                        condition = {
                            user_id: new mongoose_1.default.Types.ObjectId(model.user_id.toString()),
                        };
                        if (model.type)
                            condition.type = model.type;
                        defaultPage = model.pageNumber
                            ? model.pageNumber
                            : 1;
                        count = model.pageSize ? model.pageSize : 50;
                        return [4 /*yield*/, history_model_1.default.paginate({
                                condition: condition,
                                options: {
                                    projection: {
                                        createdAt: 0,
                                        updatedAt: 0,
                                        __v: 0,
                                    },
                                },
                            }, __assign(__assign({ page: defaultPage }, (count > 0
                                ? { limit: count }
                                : { pagination: false })), { populate: populatedFields, sort: { createdAt: -1 } }))];
                    case 1:
                        result = _a.sent();
                        console.log(condition, "foundHistory");
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
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.HISTORY_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 3];
                    case 2:
                        error_15 = _a.sent();
                        next(error_15);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getUserHistoryDetails = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var condition, requiredModel, populatedFields, foundHistory, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        condition = {
                        //user_id: model._id,
                        };
                        requiredModel = void 0;
                        if (model.user_id) {
                            condition.user_id = model.user_id;
                        }
                        if (model.type) {
                            condition.type = model.type;
                        }
                        if (model.type_id) {
                            condition.type_id = model.type_id;
                        }
                        populatedFields = [
                            {
                                path: "user_id",
                                select: { first_name: 1, last_name: 1 },
                            },
                        ];
                        return [4 /*yield*/, history_model_1.default.find(condition)
                                .sort({
                                createdAt: -1,
                            })
                                .populate(populatedFields)];
                    case 1:
                        foundHistory = _a.sent();
                        if (foundHistory && foundHistory.length > 0)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: foundHistory,
                                }];
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.HISTORY_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 3];
                    case 2:
                        error_16 = _a.sent();
                        next(error_16);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return UserServices;
}());
exports.default = new UserServices();
