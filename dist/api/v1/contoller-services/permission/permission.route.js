"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var permission_controller_1 = __importDefault(require("./permission.controller"));
var Permission_Router = /** @class */ (function () {
    function Permission_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    Permission_Router.prototype.config = function () {
        // Auth Routes Section
        this.router.post("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        permission_controller_1.default.addPermission);
        this.router.put("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        permission_controller_1.default.updatePermission);
        this.router.delete("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        permission_controller_1.default.deletePermission);
        this.router.get("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        permission_controller_1.default.getPermission);
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        permission_controller_1.default.listPermission);
        this.router.put("/user_permission", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        permission_controller_1.default.updateUserPermission);
    };
    return Permission_Router;
}());
exports.Permission_Router = Permission_Router;
exports.default = new Permission_Router().router;
