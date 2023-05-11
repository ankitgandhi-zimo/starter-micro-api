"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentType_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var appointmentType_controller_1 = __importDefault(require("./appointmentType.controller"));
var AppointmentType_Router = /** @class */ (function () {
    function AppointmentType_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    AppointmentType_Router.prototype.config = function () {
        // Auth Routes Section
        this.router.post("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        appointmentType_controller_1.default.addAppointmentType);
        this.router.put("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        appointmentType_controller_1.default.updateAppointmentType);
        this.router.delete("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        appointmentType_controller_1.default.deleteAppointmentType);
        this.router.get("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        appointmentType_controller_1.default.getAppointmentType);
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        appointmentType_controller_1.default.listAppointmentType);
        this.router.post("/filter_list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        appointmentType_controller_1.default.filterListAppointmentType);
    };
    return AppointmentType_Router;
}());
exports.AppointmentType_Router = AppointmentType_Router;
exports.default = new AppointmentType_Router().router;
