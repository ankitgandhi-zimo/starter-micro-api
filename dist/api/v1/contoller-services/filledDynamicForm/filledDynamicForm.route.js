"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilledDynamicForm_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var filledDynamicForm_controller_1 = __importDefault(require("./filledDynamicForm.controller"));
var FilledDynamicForm_Router = /** @class */ (function () {
    function FilledDynamicForm_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    FilledDynamicForm_Router.prototype.config = function () {
        this.router.post("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        filledDynamicForm_controller_1.default.addFilledDynamicForm);
        this.router.put("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        filledDynamicForm_controller_1.default.updateFilledDynamicForm);
        this.router.delete("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        filledDynamicForm_controller_1.default.deleteFilledDynamicForm);
        this.router.get("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        filledDynamicForm_controller_1.default.getFilledDynamicForm);
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        filledDynamicForm_controller_1.default.listFilledDynamicForm);
        this.router.post("/send_form", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        filledDynamicForm_controller_1.default.sendForm);
    };
    return FilledDynamicForm_Router;
}());
exports.FilledDynamicForm_Router = FilledDynamicForm_Router;
exports.default = new FilledDynamicForm_Router().router;
