"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressNote_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var progressNote_controller_1 = __importDefault(require("./progressNote.controller"));
var ProgressNote_Router = /** @class */ (function () {
    function ProgressNote_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    ProgressNote_Router.prototype.config = function () {
        this.router.post("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        progressNote_controller_1.default.addProgressNote);
        this.router.put("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        progressNote_controller_1.default.updateProgressNote);
        this.router.delete("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        progressNote_controller_1.default.deleteProgressNote);
        this.router.get("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        progressNote_controller_1.default.getProgressNote);
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        progressNote_controller_1.default.listProgressNote);
        this.router.post("/import", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        progressNote_controller_1.default.importProgressNote);
    };
    return ProgressNote_Router;
}());
exports.ProgressNote_Router = ProgressNote_Router;
exports.default = new ProgressNote_Router().router;
