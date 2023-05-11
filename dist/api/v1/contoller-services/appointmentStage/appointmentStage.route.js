"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentStage_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var appointmentStage_controller_1 = __importDefault(require("./appointmentStage.controller"));
var AppointmentStage_Router = /** @class */ (function () {
    function AppointmentStage_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    AppointmentStage_Router.prototype.config = function () {
        // Auth Routes Section
        this.router.post("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        appointmentStage_controller_1.default.addAppointmentStage);
        this.router.put("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        appointmentStage_controller_1.default.updateAppointmentStage);
        this.router.delete("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        appointmentStage_controller_1.default.deleteAppointmentStage);
        this.router.get("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        appointmentStage_controller_1.default.getAppointmentStage);
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        appointmentStage_controller_1.default.listAppointmentStage);
    };
    return AppointmentStage_Router;
}());
exports.AppointmentStage_Router = AppointmentStage_Router;
exports.default = new AppointmentStage_Router().router;
