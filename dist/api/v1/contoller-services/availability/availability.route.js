"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Availability_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var availability_controller_1 = __importDefault(require("./availability.controller"));
var Availability_Router = /** @class */ (function () {
    function Availability_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    Availability_Router.prototype.config = function () {
        // Auth Routes Section
        this.router.post("/set", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        availability_controller_1.default.setAvailability);
        this.router.post("/get", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        availability_controller_1.default.getAvailability);
        this.router.post("/get_view", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        availability_controller_1.default.getAvailabilityForView);
        this.router.put("/update", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        availability_controller_1.default.updateAvailability);
        this.router.post("/get_time_slots", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        availability_controller_1.default.getTimeSlots);
        this.router.post("/set_unavailability", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        availability_controller_1.default.setUnavailability);
        this.router.post("/get_unavailability", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        availability_controller_1.default.getUnavailability);
        this.router.post("/delete_unavailability", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        availability_controller_1.default.deleteUnavailability);
        this.router.post("/availability_for_update", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        availability_controller_1.default.getAvailabilityDetailsForUpdate);
        this.router.post("/available_days", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        availability_controller_1.default.getAvailableDatesArr);
        this.router.post("/get_doctor_location", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        availability_controller_1.default.getAvailableDoctorsLocation);
        this.router.post("/get_available_slots", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        availability_controller_1.default.getAvailableTimeSlots);
        this.router.post("/get_scheduler_data", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        availability_controller_1.default.getSchedulerData);
        this.router.post("/get_available_doctor", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        availability_controller_1.default.getAvailableDoctors);
        this.router.post("/get_selected_week_days", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        availability_controller_1.default.getSelectedWeekDaysOfAvailablility);
        //getAvailableDoctorsLocation
    };
    return Availability_Router;
}());
exports.Availability_Router = Availability_Router;
exports.default = new Availability_Router().router;
