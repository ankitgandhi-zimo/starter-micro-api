"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clinic_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var clinic_controller_1 = __importDefault(require("./clinic.controller"));
var Clinic_Router = /** @class */ (function () {
    function Clinic_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    Clinic_Router.prototype.config = function () {
        //Clinic Section Routes
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        clinic_controller_1.default.getClinicList);
        this.router.post("/without_pagination_list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        clinic_controller_1.default.getClinicListWithoutPagination);
        this.router.post("/location/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        clinic_controller_1.default.getClinicLocationList);
        this.router.post("/location/without_pagination_list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        clinic_controller_1.default.getClinicLocationListWithoutPagination);
        this.router.post("/add", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        clinic_controller_1.default.addClinic);
        this.router.put("/update", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        clinic_controller_1.default.updateClinic);
        this.router.get("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        clinic_controller_1.default.getClinicDetails);
        this.router.delete("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        clinic_controller_1.default.deleteClinicDetails);
        // clinic location section routes
        this.router.post("/add_location", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        clinic_controller_1.default.addClinicLocation);
        this.router.put("/update_location", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        clinic_controller_1.default.updateClinicLocation);
        this.router.get("/location/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        clinic_controller_1.default.getClinicLocationDetails);
        this.router.post("/exportClinicExcel", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        clinic_controller_1.default.getClinicDataToExcel);
    };
    return Clinic_Router;
}());
exports.Clinic_Router = Clinic_Router;
exports.default = new Clinic_Router().router;
