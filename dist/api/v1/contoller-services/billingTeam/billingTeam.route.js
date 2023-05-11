"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingTeam_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var billingTeam_controller_1 = __importDefault(require("./billingTeam.controller"));
var BillingTeam_Router = /** @class */ (function () {
    function BillingTeam_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    BillingTeam_Router.prototype.config = function () {
        // Auth Routes Section
        this.router.post("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        billingTeam_controller_1.default.addBillingTeam);
        this.router.put("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        billingTeam_controller_1.default.updateBillingTeam);
        this.router.delete("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        billingTeam_controller_1.default.deleteBillingTeam);
        this.router.get("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        billingTeam_controller_1.default.getBillingTeam);
        this.router.post("/add_member", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        billingTeam_controller_1.default.addMember);
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        billingTeam_controller_1.default.listBillingTeam);
        this.router.post("/list_member", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        billingTeam_controller_1.default.listBillingTeamMembers);
        this.router.post("/list_clinic", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        billingTeam_controller_1.default.listBillingTeamClinics);
        this.router.post("/assign_member", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        billingTeam_controller_1.default.assignMemberToTeam);
        //removeMember
        this.router.put("/remove_member", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        billingTeam_controller_1.default.removeMember);
        // update member association to team
        this.router.put("/update_member_association", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        billingTeam_controller_1.default.removeAndAddNewTeamAssociation);
        this.router.post("/filter_list_billing_team", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        billingTeam_controller_1.default.filterListBillingTeam);
        //Export billing team list
        this.router.post("/getBillingTeamDataToExcel", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        billingTeam_controller_1.default.getBillingTeamDataToExcel);
        this.router.post("/exportBill_Team_Mem_Excel", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        billingTeam_controller_1.default.getBillingTeamMembersDataToExcel);
        // clinic assignment routes
        this.router.post("/assignClnic", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        billingTeam_controller_1.default.assignClinicToBillingTeam);
        this.router.put("/unAssignClnic", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        billingTeam_controller_1.default.UnAssignClinicToBillingTeam);
    };
    return BillingTeam_Router;
}());
exports.BillingTeam_Router = BillingTeam_Router;
exports.default = new BillingTeam_Router().router;
