"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var group_controller_1 = __importDefault(require("../group/group.controller"));
var Group_Router = /** @class */ (function () {
    function Group_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    Group_Router.prototype.config = function () {
        //User Section Routes
        this.router.post("/add", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), common_methods_1.default.checkRoles("superadmin"), group_controller_1.default.addGroup);
        this.router.get("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        group_controller_1.default.getGroupDetails);
        this.router.delete("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        group_controller_1.default.deleteGroupDetails);
        this.router.put("/remove_clinic_association", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        group_controller_1.default.unGroupClinicFromGroup);
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        group_controller_1.default.getGroupList);
        this.router.post("/without_pagination_list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        group_controller_1.default.getGroupListWithoutPagination);
        // clinic association with group
        this.router.post("/addClinic", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        group_controller_1.default.addClinicInGroup);
    };
    return Group_Router;
}());
exports.Group_Router = Group_Router;
exports.default = new Group_Router().router;
