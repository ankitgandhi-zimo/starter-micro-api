"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var user_controller_1 = __importDefault(require("./user.controller"));
var User_Router = /** @class */ (function () {
    function User_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    User_Router.prototype.config = function () {
        // Auth Routes Section
        this.router.post("/login", 
        // Utility.isActiveUser(),
        user_controller_1.default.login);
        this.router.post("/logout", user_controller_1.default.logout);
        this.router.put("/change_password", user_controller_1.default.changePassword);
        this.router.post("/forgotPassword", user_controller_1.default.forgotPassword);
        this.router.post("/reset_forgot_password", user_controller_1.default.reset_forgot_password);
        //User Section Routes
        this.router.get("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        user_controller_1.default.getUserList);
        this.router.post("/without_pagination_list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        user_controller_1.default.getUserListWithoutPagination);
        this.router.post("/add", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), common_methods_1.default.checkRoles("superadmin", "teamadmin"), user_controller_1.default.addUser);
        this.router.put("/update", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin", "teamadmin"),
        user_controller_1.default.updateUser);
        // history section
        this.router.post("/history", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        user_controller_1.default.getUserHistoryDetails);
        this.router.get("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        user_controller_1.default.getUserDetails);
        this.router.get("/role/list/:type?", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        user_controller_1.default.getRoleList);
        this.router.get("/role/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        user_controller_1.default.getRoleDetails);
        this.router.put("/role/update", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        user_controller_1.default.updateRole);
        this.router.post("/role/add", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), common_methods_1.default.checkRoles("superadmin"), user_controller_1.default.addRole);
    };
    return User_Router;
}());
exports.User_Router = User_Router;
exports.default = new User_Router().router;
