"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CptCode_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../../common/common-methods"));
var cpt_code_controller_1 = __importDefault(require("./cpt_code.controller"));
var CptCode_Router = /** @class */ (function () {
    function CptCode_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    CptCode_Router.prototype.config = function () {
        // Auth Routes Section
        this.router.post("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        cpt_code_controller_1.default.addCptCode);
        this.router.post("/getCptCodeDataToExcel", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        cpt_code_controller_1.default.getCptCodeDataToExcel);
        this.router.put("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        cpt_code_controller_1.default.updateCptCode);
        this.router.delete("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        cpt_code_controller_1.default.deleteCptCode);
        this.router.get("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        cpt_code_controller_1.default.getCptCode);
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        cpt_code_controller_1.default.listCptCode);
        this.router.post("/filter_list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        cpt_code_controller_1.default.filterListCptCode);
    };
    return CptCode_Router;
}());
exports.CptCode_Router = CptCode_Router;
exports.default = new CptCode_Router().router;
