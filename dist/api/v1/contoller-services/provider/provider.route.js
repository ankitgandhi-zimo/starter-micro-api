"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var provider_controller_1 = __importDefault(require("./provider.controller"));
var Provider_Router = /** @class */ (function () {
    function Provider_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    Provider_Router.prototype.config = function () {
        // Auth Routes Section
        this.router.post("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        provider_controller_1.default.addProvider);
        this.router.put("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        provider_controller_1.default.updateProvider);
        this.router.delete("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        provider_controller_1.default.deleteProvider);
        this.router.get("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        provider_controller_1.default.getProvider);
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        provider_controller_1.default.listProvider);
        this.router.post("/filter_list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        provider_controller_1.default.filterListProvider);
        this.router.post("/filter_list_locations", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        provider_controller_1.default.filterListLocations);
        this.router.post("/filter_list_appt_type", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        provider_controller_1.default.filterListApptType);
        //filterListApptType
        this.router.post("/update_appointment_type", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        provider_controller_1.default.updateAppointmentType);
        this.router.post("/update_location", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        provider_controller_1.default.updateLocation);
        this.router.post("/list_appointment_type", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        provider_controller_1.default.listAppointmentType);
        this.router.post("/list_location", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        provider_controller_1.default.listLocation);
        this.router.post("/get_assigned_appt_type", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        provider_controller_1.default.getAssignedApptType);
        this.router.post("/exportProviderExcel", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        provider_controller_1.default.getProviderDataToExcel);
        this.router.post("/fetch", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        provider_controller_1.default.fetchProviders);
    };
    return Provider_Router;
}());
exports.Provider_Router = Provider_Router;
exports.default = new Provider_Router().router;
