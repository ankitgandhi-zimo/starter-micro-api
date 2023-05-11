"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IcdCode_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../../common/common-methods"));
var icd_code_controller_1 = __importDefault(require("./icd_code.controller"));
var IcdCode_Router = /** @class */ (function () {
    function IcdCode_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    IcdCode_Router.prototype.config = function () {
        // Auth Routes Section
        this.router.post("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        icd_code_controller_1.default.addIcdCode);
        this.router.post("/getIcdCodeDataToExcel", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        icd_code_controller_1.default.getIcdCodeDataToExcel);
        this.router.put("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        icd_code_controller_1.default.updateIcdCode);
        this.router.delete("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        icd_code_controller_1.default.deleteIcdCode);
        this.router.get("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        icd_code_controller_1.default.getIcdCode);
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        icd_code_controller_1.default.listIcdCode);
        // this.router.post(
        //   "/filter_list",
        //   Utility.checkTokenExpiration(),
        //   passport.authenticate("jwt", { session: false }),
        //   //Utility.checkRoles("superadmin"),
        //   IcdCodeController.filterListCptCode
        // );
    };
    return IcdCode_Router;
}());
exports.IcdCode_Router = IcdCode_Router;
exports.default = new IcdCode_Router().router;
