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
var common_methods_1 = __importDefault(require("../../../v1/common/common-methods"));
var auth_1 = require("../../view-models/auth");
var change_password_viewmodel_1 = require("../../view-models/auth/change_password.viewmodel");
var check_mongo_id_viewmodel_1 = require("../../view-models/check_mongo_id.viewmodel");
var user_1 = require("../../view-models/user");
var user_service_1 = __importDefault(require("./user.service"));
var User_Controller = /** @class */ (function () {
    function User_Controller() {
        var _this = this;
        // //LOGIN
        this.login = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, loginResult, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(auth_1.LoginViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.BAD_REQUEST).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, user_service_1.default.login(req, model, next)];
                    case 3:
                        loginResult = _a.sent();
                        if (loginResult)
                            return [2 /*return*/, res.status(loginResult.status_code).json(__assign({ status_code: loginResult.status_code, success: loginResult.success }, (loginResult.success
                                    ? { data: loginResult.data }
                                    : __assign({}, (loginResult.success
                                        ? { data: loginResult.data }
                                        : { errors: loginResult.data })))))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.changePassword = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, resetpasswordResult, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(change_password_viewmodel_1.ChangePasswordViewModel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.BAD_REQUEST).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error,
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, user_service_1.default.changePassword(req, model)];
                    case 3:
                        resetpasswordResult = _a.sent();
                        if (resetpasswordResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: resetpasswordResult.status_code, success: resetpasswordResult.success }, (resetpasswordResult.success
                                    ? {
                                        data: resetpasswordResult.data,
                                        totalDocs: resetpasswordResult.data.totalDocs,
                                        pageNumber: resetpasswordResult.data.pageNumber,
                                        pageSize: resetpasswordResult.data.pageSize,
                                        totalPages: resetpasswordResult.data.totalPages,
                                    }
                                    : { errors: resetpasswordResult.data })))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.forgotPassword = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, forgotpasswordResult, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(auth_1.ForgotPasswordViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.BAD_REQUEST).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error,
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, user_service_1.default.forgotPassword(req, model)];
                    case 3:
                        forgotpasswordResult = _a.sent();
                        if (forgotpasswordResult &&
                            forgotpasswordResult.status_code === http_status_codes_1.default.OK)
                            return [2 /*return*/, res.status(200).json({
                                    status_code: forgotpasswordResult.status_code,
                                    success: true,
                                    data: forgotpasswordResult.data,
                                })];
                        else
                            return [2 /*return*/, res.status(200).json({
                                    status_code: forgotpasswordResult.status_code,
                                    success: false,
                                    errors: forgotpasswordResult.data,
                                })];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.reset_forgot_password = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, forgotpasswordResult, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(auth_1.ResetForgotPasswordViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.BAD_REQUEST).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error,
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, user_service_1.default.reset_forgot_password(model)];
                    case 3:
                        forgotpasswordResult = _a.sent();
                        if (forgotpasswordResult &&
                            forgotpasswordResult.status_code === http_status_codes_1.default.OK)
                            return [2 /*return*/, res.status(200).json({
                                    status_code: forgotpasswordResult.status_code,
                                    success: true,
                                    data: forgotpasswordResult.data,
                                })];
                        else
                            return [2 /*return*/, res.status(200).json({
                                    status_code: forgotpasswordResult.status_code,
                                    success: false,
                                    errors: forgotpasswordResult.data,
                                })];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.logout = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var logOutResult, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_service_1.default.logout(req)];
                    case 1:
                        logOutResult = _a.sent();
                        if (logOutResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: logOutResult.status_code, success: logOutResult.success }, (logOutResult.success
                                    ? {
                                        data: logOutResult.data,
                                        totalDocs: logOutResult.data.totalDocs,
                                        pageNumber: logOutResult.data.pageNumber,
                                        pageSize: logOutResult.data.pageSize,
                                        totalPages: logOutResult.data.totalPages,
                                    }
                                    : { errors: logOutResult.data })))];
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        //User Section
        this.addUser = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, userResult, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(user_1.AddUserViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.BAD_REQUEST).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, user_service_1.default.addUser(req, model, next)];
                    case 3:
                        userResult = _a.sent();
                        if (userResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: userResult.status_code, success: userResult.success }, (userResult.success
                                    ? { data: userResult.data }
                                    : __assign({}, (userResult.success
                                        ? { data: userResult.data }
                                        : { errors: userResult.data })))))];
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
        this.updateUser = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, userResult, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(user_1.UpdateUserViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.BAD_REQUEST).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, user_service_1.default.updateUser(req, model, next)];
                    case 3:
                        userResult = _a.sent();
                        if (userResult)
                            return [2 /*return*/, res.status(userResult.status_code).json(__assign({ status_code: userResult.status_code, success: userResult.success }, (userResult.success
                                    ? { data: userResult.data }
                                    : __assign({}, (userResult.success
                                        ? { data: userResult.data }
                                        : { errors: userResult.data })))))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_7 = _a.sent();
                        next(error_7);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getUserList = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, userListResult, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(user_1.GetUserListViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.BAD_REQUEST).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, user_service_1.default.getUserList(req, model, next)];
                    case 3:
                        userListResult = _a.sent();
                        if (userListResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: userListResult.status_code, success: userListResult.success }, (userListResult.success
                                    ? {
                                        data: userListResult.data.data,
                                        totalDocs: userListResult.data.totalDocs,
                                        pageNumber: userListResult.data.pageNumber,
                                        pageSize: userListResult.data.pageSize,
                                        totalPages: userListResult.data.totalPages,
                                    }
                                    : { errors: userListResult.data })))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_8 = _a.sent();
                        next(error_8);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getUserListWithoutPagination = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var userListResult, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_service_1.default.getUserListWithoutPagination(req, next)];
                    case 1:
                        userListResult = _a.sent();
                        if (userListResult)
                            return [2 /*return*/, res.status(userListResult.status_code).json(__assign({ status_code: userListResult.status_code, success: userListResult.success }, (userListResult.success
                                    ? {
                                        data: userListResult.data.data,
                                        totalDocs: userListResult.data.totalDocs,
                                        pageNumber: userListResult.data.pageNumber,
                                        pageSize: userListResult.data.pageSize,
                                        totalPages: userListResult.data.totalPages,
                                    }
                                    : { errors: userListResult.data })))];
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _a.sent();
                        next(error_9);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getUserDetails = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, userDetailResult, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(check_mongo_id_viewmodel_1.CheckMongoIdViewmodel, JSON.parse("{\"_id\":\"".concat(req.params._id, "\"}")))];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.BAD_REQUEST).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2: return [4 /*yield*/, user_service_1.default.getUserDetails(req, next)];
                    case 3:
                        userDetailResult = _a.sent();
                        if (userDetailResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: userDetailResult.status_code, success: userDetailResult.success }, (userDetailResult.success
                                    ? { data: userDetailResult.data }
                                    : { errors: userDetailResult.data })))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_10 = _a.sent();
                        next(error_10);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getRoleDetails = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, roleDetailResult, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(check_mongo_id_viewmodel_1.CheckMongoIdViewmodel, JSON.parse("{\"_id\":\"".concat(req.params._id, "\"}")))];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.BAD_REQUEST).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2: return [4 /*yield*/, user_service_1.default.getRoleDetails(req, next)];
                    case 3:
                        roleDetailResult = _a.sent();
                        if (roleDetailResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: roleDetailResult.status_code, success: roleDetailResult.success }, (roleDetailResult.success
                                    ? { data: roleDetailResult.data }
                                    : { errors: roleDetailResult.data })))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_11 = _a.sent();
                        next(error_11);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        //Role Section
        this.getRoleList = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var roleList, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_service_1.default.getRoleList(req, next)];
                    case 1:
                        roleList = _a.sent();
                        if (roleList)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: roleList.status_code, success: roleList.success }, (roleList.success
                                    ? {
                                        data: roleList.data,
                                        totalDocs: roleList.data.totalDocs,
                                        pageNumber: roleList.data.pageNumber,
                                        pageSize: roleList.data.pageSize,
                                        totalPages: roleList.data.totalPages,
                                    }
                                    : { errors: roleList.data })))];
                        return [3 /*break*/, 3];
                    case 2:
                        error_12 = _a.sent();
                        next(error_12);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.addRole = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, userRoleResult, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(user_1.AddUserRoleViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.BAD_REQUEST).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, user_service_1.default.addRole(req, model, next)];
                    case 3:
                        userRoleResult = _a.sent();
                        if (userRoleResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: userRoleResult.status_code, success: userRoleResult.success }, (userRoleResult.success
                                    ? { data: userRoleResult.data }
                                    : __assign({}, (userRoleResult.success
                                        ? { data: userRoleResult.data }
                                        : { errors: userRoleResult.data })))))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_13 = _a.sent();
                        next(error_13);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.updateRole = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, userRoleResult, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(user_1.UpdateUserRoleViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.BAD_REQUEST).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, user_service_1.default.updateRole(req, model, next)];
                    case 3:
                        userRoleResult = _a.sent();
                        if (userRoleResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: userRoleResult.status_code, success: userRoleResult.success }, (userRoleResult.success
                                    ? { data: userRoleResult.data }
                                    : __assign({}, (userRoleResult.success
                                        ? { data: userRoleResult.data }
                                        : { errors: userRoleResult.data })))))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_14 = _a.sent();
                        next(error_14);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        // history section
        this.getUserHistoryDetails = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, userHistoryDetailslResult, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(user_1.GetUserHistoryViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error &&
                            conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.BAD_REQUEST).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, user_service_1.default.getUserHistoryDetails(req, model, next)];
                    case 3:
                        userHistoryDetailslResult = _a.sent();
                        if (userHistoryDetailslResult)
                            return [2 /*return*/, res.status(200).json(__assign({ status_code: userHistoryDetailslResult.status_code, success: userHistoryDetailslResult.success }, (userHistoryDetailslResult.success
                                    ? { data: userHistoryDetailslResult.data }
                                    : __assign({}, (userHistoryDetailslResult.success
                                        ? {
                                            data: userHistoryDetailslResult.data,
                                        }
                                        : {
                                            errors: userHistoryDetailslResult.data,
                                        })))))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_15 = _a.sent();
                        next(error_15);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
    }
    return User_Controller;
}());
exports.default = new User_Controller();
