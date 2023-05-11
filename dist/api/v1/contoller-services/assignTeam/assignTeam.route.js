"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignTeam_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var assignTeam_controller_1 = __importDefault(require("./assignTeam.controller"));
var AssignTeam_Router = /** @class */ (function () {
    function AssignTeam_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    AssignTeam_Router.prototype.config = function () {
        // Auth Routes Section
        this.router.post("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        assignTeam_controller_1.default.addAssignTeam);
        this.router.put("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        assignTeam_controller_1.default.updateAssignTeam);
        this.router.delete("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        assignTeam_controller_1.default.deleteAssignTeam);
        this.router.get("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        assignTeam_controller_1.default.getAssignTeam);
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        assignTeam_controller_1.default.listAssignTeam);
    };
    return AssignTeam_Router;
}());
exports.AssignTeam_Router = AssignTeam_Router;
exports.default = new AssignTeam_Router().router;
