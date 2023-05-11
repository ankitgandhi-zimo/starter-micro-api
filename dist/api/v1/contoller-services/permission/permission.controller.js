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
var check_mongo_id_viewmodel_1 = require("../../view-models/check_mongo_id.viewmodel");
var permission_1 = require("../../view-models/permission");
var permission_service_1 = __importDefault(require("./permission.service"));
var Permission_Controller = /** @class */ (function () {
    function Permission_Controller() {
        var _this = this;
        this.addPermission = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, addPermissionResult, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(permission_1.AddPermissionViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error && conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.BAD_REQUEST).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, permission_service_1.default.addPermission(req, model, next)];
                    case 3:
                        addPermissionResult = _a.sent();
                        if (addPermissionResult)
                            return [2 /*return*/, res.status(addPermissionResult.status_code).json(__assign({ status_code: addPermissionResult.status_code, success: addPermissionResult.success }, (addPermissionResult.success
                                    ? { data: addPermissionResult.data }
                                    : __assign({}, (addPermissionResult.success
                                        ? { data: addPermissionResult.data }
                                        : { errors: addPermissionResult.data })))))];
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
        this.updatePermission = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, updatePermissionResult, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(permission_1.UpdatePermissionViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error && conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.BAD_REQUEST).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, permission_service_1.default.updatePermission(req, model, next)];
                    case 3:
                        updatePermissionResult = _a.sent();
                        if (updatePermissionResult)
                            return [2 /*return*/, res.status(updatePermissionResult.status_code).json(__assign({ status_code: updatePermissionResult.status_code, success: updatePermissionResult.success }, (updatePermissionResult.success
                                    ? { data: updatePermissionResult.data }
                                    : __assign({}, (updatePermissionResult.success
                                        ? { data: updatePermissionResult.data }
                                        : { errors: updatePermissionResult.data })))))];
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
        this.deletePermission = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, deletePermissionResult, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(check_mongo_id_viewmodel_1.CheckMongoIdViewmodel, JSON.parse("{\"_id\":\"".concat(req.params._id, "\"}")))];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error && conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.BAD_REQUEST).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, permission_service_1.default.deletePermission(req, model, next)];
                    case 3:
                        deletePermissionResult = _a.sent();
                        if (deletePermissionResult)
                            return [2 /*return*/, res.status(deletePermissionResult.status_code).json(__assign({ status_code: deletePermissionResult.status_code, success: deletePermissionResult.success }, (deletePermissionResult.success
                                    ? { data: deletePermissionResult.data }
                                    : __assign({}, (deletePermissionResult.success
                                        ? { data: deletePermissionResult.data }
                                        : { errors: deletePermissionResult.data })))))];
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
        this.getPermission = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, getPermissionResult, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(check_mongo_id_viewmodel_1.CheckMongoIdViewmodel, JSON.parse("{\"_id\":\"".concat(req.params._id, "\"}")))];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error && conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.BAD_REQUEST).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, permission_service_1.default.getPermission(req, model, next)];
                    case 3:
                        getPermissionResult = _a.sent();
                        if (getPermissionResult)
                            return [2 /*return*/, res.status(getPermissionResult.status_code).json(__assign({ status_code: getPermissionResult.status_code, success: getPermissionResult.success }, (getPermissionResult.success
                                    ? { data: getPermissionResult.data }
                                    : __assign({}, (getPermissionResult.success
                                        ? { data: getPermissionResult.data }
                                        : { errors: getPermissionResult.data })))))];
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
        this.listPermission = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, listPermissionResult, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(permission_1.GetPermissionListViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error && conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.BAD_REQUEST).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, permission_service_1.default.listPermission(req, model, next)];
                    case 3:
                        listPermissionResult = _a.sent();
                        if (listPermissionResult)
                            return [2 /*return*/, res.status(listPermissionResult.status_code).json(__assign({ status_code: listPermissionResult.status_code, success: listPermissionResult.success }, (listPermissionResult.success
                                    ? { data: listPermissionResult.data }
                                    : __assign({}, (listPermissionResult.success
                                        ? { data: listPermissionResult.data }
                                        : { errors: listPermissionResult.data })))))];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.updateUserPermission = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var conversionResult, model, updatePermissionResult, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, common_methods_1.default.ValidateAndConvert(permission_1.UpdateUserPermissionViewmodel, req.body)];
                    case 1:
                        conversionResult = _a.sent();
                        if (!(conversionResult.error && conversionResult.error.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(http_status_codes_1.default.BAD_REQUEST).send({
                                status_code: http_status_codes_1.default.BAD_REQUEST,
                                success: false,
                                errors: conversionResult.error[0],
                            })];
                    case 2:
                        model = conversionResult.data;
                        return [4 /*yield*/, permission_service_1.default.updateUserPermission(req, model, next)];
                    case 3:
                        updatePermissionResult = _a.sent();
                        if (updatePermissionResult)
                            return [2 /*return*/, res.status(updatePermissionResult.status_code).json(__assign({ status_code: updatePermissionResult.status_code, success: updatePermissionResult.success }, (updatePermissionResult.success
                                    ? { data: updatePermissionResult.data }
                                    : __assign({}, (updatePermissionResult.success
                                        ? { data: updatePermissionResult.data }
                                        : { errors: updatePermissionResult.data })))))];
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
    }
    return Permission_Controller;
}());
exports.default = new Permission_Controller();
