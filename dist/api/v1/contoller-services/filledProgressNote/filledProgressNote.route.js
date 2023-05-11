"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilledProgressNote_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var filledProgressNote_controller_1 = __importDefault(require("./filledProgressNote.controller"));
var FilledProgressNote_Router = /** @class */ (function () {
    function FilledProgressNote_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    FilledProgressNote_Router.prototype.config = function () {
        this.router.post("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        filledProgressNote_controller_1.default.addFilledProgressNote);
        this.router.put("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        filledProgressNote_controller_1.default.updateFilledProgressNote);
        this.router.delete("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        filledProgressNote_controller_1.default.deleteFilledProgressNote);
        this.router.get("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        filledProgressNote_controller_1.default.getFilledProgressNote);
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        filledProgressNote_controller_1.default.listFilledProgressNote);
        this.router.post("/checkout_data", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        filledProgressNote_controller_1.default.checkoutData);
        this.router.post("/list_progress_note", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        filledProgressNote_controller_1.default.listProgressNoteCheckout);
        //listProgressNoteCheckout
    };
    return FilledProgressNote_Router;
}());
exports.FilledProgressNote_Router = FilledProgressNote_Router;
exports.default = new FilledProgressNote_Router().router;
