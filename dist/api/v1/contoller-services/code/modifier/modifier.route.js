"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modifier_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../../common/common-methods"));
var modifier_controller_1 = __importDefault(require("./modifier.controller"));
var Modifier_Router = /** @class */ (function () {
    function Modifier_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    Modifier_Router.prototype.config = function () {
        // Auth Routes Section
        this.router.post("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        modifier_controller_1.default.addModifier);
        this.router.post("/getModifierDataToExcel", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        modifier_controller_1.default.getModifierDataToExcel);
        this.router.put("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        modifier_controller_1.default.updateModifier);
        this.router.delete("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        modifier_controller_1.default.deleteModifier);
        this.router.get("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        modifier_controller_1.default.getModifier);
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        modifier_controller_1.default.listModifier);
        // this.router.post(
        //   "/filter_list",
        //   Utility.checkTokenExpiration(),
        //   passport.authenticate("jwt", { session: false }),
        //   //Utility.checkRoles("superadmin"),
        //   IcdCodeController.filterListCptCode
        // );
    };
    return Modifier_Router;
}());
exports.Modifier_Router = Modifier_Router;
exports.default = new Modifier_Router().router;
