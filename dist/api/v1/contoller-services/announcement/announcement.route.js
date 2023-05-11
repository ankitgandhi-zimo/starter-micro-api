"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Announcement_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var announcement_controller_1 = __importDefault(require("./announcement.controller"));
var Announcement_Router = /** @class */ (function () {
    function Announcement_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    Announcement_Router.prototype.config = function () {
        // Auth Routes Section
        this.router.post("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        announcement_controller_1.default.addAnnouncement);
        this.router.put("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        announcement_controller_1.default.updateAnnouncement);
        this.router.get("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        announcement_controller_1.default.getAnnouncement);
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        announcement_controller_1.default.listAnnouncement);
    };
    return Announcement_Router;
}());
exports.Announcement_Router = Announcement_Router;
exports.default = new Announcement_Router().router;
