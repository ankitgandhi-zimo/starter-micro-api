"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Financial_Class_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var financialClass_controller_1 = __importDefault(require("../financialClass/financialClass.controller"));
var Financial_Class_Router = /** @class */ (function () {
    function Financial_Class_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    Financial_Class_Router.prototype.config = function () {
        //Financial_Class Section Routes
        this.router.post("/add", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        financialClass_controller_1.default.addFinancialClass);
        this.router.put("/update", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        financialClass_controller_1.default.updateFinancialClass);
        this.router.get("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        financialClass_controller_1.default.getFinancialClassDetails);
        this.router.delete("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        financialClass_controller_1.default.deleteFinancialClassDetails);
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        financialClass_controller_1.default.getFinancialClassList);
    };
    return Financial_Class_Router;
}());
exports.Financial_Class_Router = Financial_Class_Router;
exports.default = new Financial_Class_Router().router;
