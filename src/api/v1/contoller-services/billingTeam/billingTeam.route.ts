import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import BillingTeamController from "./billingTeam.controller";
export class BillingTeam_Router {
  public router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    // Auth Routes Section
    this.router.post(
      "/",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      BillingTeamController.addBillingTeam
    );

    this.router.put(
      "/",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      BillingTeamController.updateBillingTeam
    );
    this.router.delete(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      BillingTeamController.deleteBillingTeam
    );
    this.router.get(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      BillingTeamController.getBillingTeam
    );
    this.router.post(
      "/add_member",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      BillingTeamController.addMember
    );

    this.router.post(
      "/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      BillingTeamController.listBillingTeam
    );

    this.router.post(
      "/list_member",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      BillingTeamController.listBillingTeamMembers
    );
    this.router.post(
      "/list_clinic",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      BillingTeamController.listBillingTeamClinics
    );
    this.router.post(
      "/assign_member",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      BillingTeamController.assignMemberToTeam
    );
    //removeMember
    this.router.put(
      "/remove_member",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      BillingTeamController.removeMember
    );

    // update member association to team
    this.router.put(
      "/update_member_association",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      BillingTeamController.removeAndAddNewTeamAssociation
    );

    this.router.post(
      "/filter_list_billing_team",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      BillingTeamController.filterListBillingTeam
    );
    //Export billing team list

    this.router.post(
      "/getBillingTeamDataToExcel",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      BillingTeamController.getBillingTeamDataToExcel
    );

    this.router.post(
      "/exportBill_Team_Mem_Excel",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      BillingTeamController.getBillingTeamMembersDataToExcel
    );

    // clinic assignment routes

    this.router.post(
      "/assignClnic",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      BillingTeamController.assignClinicToBillingTeam
    );

    this.router.put(
      "/unAssignClnic",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      BillingTeamController.UnAssignClinicToBillingTeam
    );
  }
}
export default new BillingTeam_Router().router;
