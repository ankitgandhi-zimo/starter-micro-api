"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitingList_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var waitingList_controller_1 = __importDefault(require("./waitingList.controller"));
var WaitingList_Router = /** @class */ (function () {
    function WaitingList_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    WaitingList_Router.prototype.config = function () {
        // Auth Routes Section
        this.router.post("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        waitingList_controller_1.default.addWaitingList);
        this.router.put("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        waitingList_controller_1.default.updateWaitingList);
        // this.router.delete(
        //   "/:_id",
        //   Utility.checkTokenExpiration(),
        //   passport.authenticate("jwt", { session: false }),
        //   //Utility.checkRoles("superadmin"),
        //   SkillController.deleteSkill
        // );
        this.router.get("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        waitingList_controller_1.default.getWaitingList);
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        waitingList_controller_1.default.listWaitingList);
        this.router.post("/getPatientWaitingDataToExcel", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        waitingList_controller_1.default.getPatientWaitingDataToExcel);
    };
    return WaitingList_Router;
}());
exports.WaitingList_Router = WaitingList_Router;
exports.default = new WaitingList_Router().router;
