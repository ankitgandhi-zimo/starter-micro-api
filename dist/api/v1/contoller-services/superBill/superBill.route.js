"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperBill_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var superBill_controller_1 = __importDefault(require("./superBill.controller"));
var SuperBill_Router = /** @class */ (function () {
    function SuperBill_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    SuperBill_Router.prototype.config = function () {
        // Auth Routes Section
        this.router.post("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        superBill_controller_1.default.addSuperBill);
        this.router.post("/exportSuperBillData", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        superBill_controller_1.default.getSuperBillDataToExcel);
        this.router.put("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        superBill_controller_1.default.updateSuperBill);
        this.router.delete("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        superBill_controller_1.default.deleteSuperBill);
        this.router.get("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        superBill_controller_1.default.getSuperBill);
        this.router.get("/getDetailsForGenerateSuperBill/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        superBill_controller_1.default.getDetailsForGenerateSuperBill);
        // this.router.post(
        //   "/getDetailsForGenerateSuperBill",
        //   Utility.checkTokenExpiration(),
        //   passport.authenticate("jwt", { session: false }),
        //   //Utility.checkRoles("superadmin"),
        //   SuperBillController.getDetailsForGenerateSuperBill1
        // );
        this.router.get("/assignmentHistory/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        superBill_controller_1.default.superBillAssignmentHistory);
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        superBill_controller_1.default.listSuperBill);
        // assign super bill to billing team member routes
        this.router.post("/assign", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        superBill_controller_1.default.superBillAssignment);
        this.router.post("/mark_as_printed", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        superBill_controller_1.default.markAsPrinted);
        this.router.post("/patient_list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        superBill_controller_1.default.getPatientList);
        this.router.get("/getHistory/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        superBill_controller_1.default.getChargeHistory);
        this.router.get("/getPaymentHistory/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        superBill_controller_1.default.getPaymentHistory);
        //getPaymentHistory
    };
    return SuperBill_Router;
}());
exports.SuperBill_Router = SuperBill_Router;
exports.default = new SuperBill_Router().router;
