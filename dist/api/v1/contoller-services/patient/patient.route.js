"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var patient_controller_1 = __importDefault(require("../patient/patient.controller"));
var Patient_Router = /** @class */ (function () {
    function Patient_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    Patient_Router.prototype.config = function () {
        //User Section Routes
        this.router.post("/add", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        patient_controller_1.default.addPatient);
        this.router.put("/update", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        patient_controller_1.default.updatePatient);
        this.router.get("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        patient_controller_1.default.getPatientDetails);
        this.router.delete("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        patient_controller_1.default.deletePatientDetails);
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        patient_controller_1.default.getPatientList);
        this.router.post("/getPatientPaymentList", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        patient_controller_1.default.getPatientPaymentList);
        this.router.post("/exportPatientPaymentList", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        patient_controller_1.default.exportPatientPaymentDataToExcel);
        this.router.post("/without_pagination_list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        patient_controller_1.default.getPatientListWithoutPagination);
        this.router.post("/checkout/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        patient_controller_1.default.checkoutList);
        this.router.post("/checkout/getCheckoutDataToExcel", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        patient_controller_1.default.getCheckoutDataToExcel);
        this.router.post("/checkout", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        patient_controller_1.default.checkoutPatient);
        // patient doc routes
        this.router.post("/document", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        patient_controller_1.default.addPatientDocument);
        this.router.put("/document", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        patient_controller_1.default.updatePatientDocument);
        this.router.get("/document/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        patient_controller_1.default.getPatientDocumentDetails);
        this.router.delete("/document/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        patient_controller_1.default.deletePatientDocumentDetails);
        this.router.post("/document/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        patient_controller_1.default.getPatientDocumentList);
        this.router.post("/linked", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        patient_controller_1.default.assignProviderToPatient);
        this.router.post("/get_assigned_patients_providers", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        patient_controller_1.default.getAssignedProviderOrPatient);
        // export patient data excel
        this.router.post("/exportPatientExcel", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        patient_controller_1.default.getPatientDataToExcel);
        this.router.post("/visit_history_list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        patient_controller_1.default.getVisitHistoryList);
        this.router.post("/visit_history_details", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        patient_controller_1.default.getVisitHistoryDetails);
        this.router.get("/getCptCodes/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        patient_controller_1.default.getCptCodes);
        this.router.get("/checkout_details/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        patient_controller_1.default.getCheckoutDetails);
        this.router.post("/merge", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        patient_controller_1.default.mergePatient);
        this.router.post("/fetch", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        patient_controller_1.default.fetchPatients);
        //
    };
    return Patient_Router;
}());
exports.Patient_Router = Patient_Router;
exports.default = new Patient_Router().router;
