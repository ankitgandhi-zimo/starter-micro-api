"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormCategory_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../../common/common-methods"));
var formCategory_controller_1 = __importDefault(require("./../formCategory/formCategory.controller"));
var FormCategory_Router = /** @class */ (function () {
    function FormCategory_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    FormCategory_Router.prototype.config = function () {
        this.router.post("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        formCategory_controller_1.default.addFormCategory);
        this.router.put("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        formCategory_controller_1.default.updateFormCategory);
        this.router.delete("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        formCategory_controller_1.default.deleteFormCategory);
        this.router.get("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        formCategory_controller_1.default.getFormCategory);
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        formCategory_controller_1.default.listFormCategory);
        this.router.post("/filter_list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        formCategory_controller_1.default.filterListFormCategory);
    };
    return FormCategory_Router;
}());
exports.FormCategory_Router = FormCategory_Router;
exports.default = new FormCategory_Router().router;
