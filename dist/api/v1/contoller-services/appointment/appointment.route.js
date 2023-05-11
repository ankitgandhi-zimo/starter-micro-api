"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var appointment_controller_1 = __importDefault(require("../appointment/appointment.controller"));
var Appointment_Router = /** @class */ (function () {
    function Appointment_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    Appointment_Router.prototype.config = function () {
        //Appointment Section Routes
        this.router.post("/add", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        appointment_controller_1.default.addAppointment);
        this.router.post("/recurring/add", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        appointment_controller_1.default.addRecurringAppointment);
        this.router.put("/update", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        appointment_controller_1.default.updateAppointment);
        this.router.get("/:appointment_number", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        appointment_controller_1.default.getAppointmentDetails);
        this.router.get("/details/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        appointment_controller_1.default.getAppointmentDetailsWithId);
        this.router.delete(
        // "/:appointment_number",
        "/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        appointment_controller_1.default.deleteAppointmentDetails);
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        appointment_controller_1.default.getAppointmentList);
        this.router.post("/without_pagination_list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        appointment_controller_1.default.getAppointmentListWithoutPagination);
        this.router.put("/reschedule", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        appointment_controller_1.default.rescheduleAppointment);
        this.router.put("/declined", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        appointment_controller_1.default.declineBooking);
        this.router.post("/exportAppointmentExcel", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        appointment_controller_1.default.getAppointmentDataToExcel);
        this.router.post("/fetch", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        appointment_controller_1.default.fetchAppointments);
        this.router.post("/checkout/fetch", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        appointment_controller_1.default.fetchCheckouts);
    };
    return Appointment_Router;
}());
exports.Appointment_Router = Appointment_Router;
exports.default = new Appointment_Router().router;
