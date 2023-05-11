"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicForm_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var dynamicForm_controller_1 = __importDefault(require("./dynamicForm.controller"));
var DynamicForm_Router = /** @class */ (function () {
    function DynamicForm_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    DynamicForm_Router.prototype.config = function () {
        this.router.post("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        dynamicForm_controller_1.default.addDynamicForm);
        this.router.put("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        dynamicForm_controller_1.default.updateDynamicForm);
        this.router.delete("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        dynamicForm_controller_1.default.deleteDynamicForm);
        this.router.get("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        dynamicForm_controller_1.default.getDynamicForm);
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        dynamicForm_controller_1.default.listDynamicForm);
        this.router.post("/import", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        dynamicForm_controller_1.default.importDynamicForm);
        this.router.post("/category_count", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        dynamicForm_controller_1.default.categoryCount);
        this.router.post("/filter_list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        dynamicForm_controller_1.default.filterListForm);
        //filterListForm
    };
    return DynamicForm_Router;
}());
exports.DynamicForm_Router = DynamicForm_Router;
exports.default = new DynamicForm_Router().router;
