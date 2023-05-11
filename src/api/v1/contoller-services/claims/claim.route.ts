import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import ClaimController from "../claims/claim.controller";
export class Claim_Router {
  public router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    //Financial_Class Section Routes

    this.router.post(
      "/submit",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      ClaimController.submitClaim
    );

    this.router.put(
      "/updateEdiStatus",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      ClaimController.updateEdiStatus
    );

    this.router.post(
      "/details",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      ClaimController.getClaimDetails
    );

    this.router.post(
      "/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      ClaimController.getClaimList
    );

    this.router.get(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      ClaimController.getClaimData
    );

    this.router.post(
      "/exportClaimExcel",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      ClaimController.exportClaimExcel
    );

    // this.router.post(
    //   "/list",
    //   Utility.checkTokenExpiration(),
    //   passport.authenticate("jwt", { session: false }),
    //   // Utility.checkRoles("superadmin"),
    //   ClaimController.getClaimList
    // );
    // this.router.delete(
    //   "/:_id",
    //   Utility.checkTokenExpiration(),
    //   passport.authenticate("jwt", { session: false }),
    //   // Utility.checkRoles("superadmin"),
    //   FinancialClassController.deleteFinancialClassDetails
    // );

    // this.router.post(
    //   "/list",
    //   Utility.checkTokenExpiration(),
    //   passport.authenticate("jwt", { session: false }),
    //   Utility.checkRoles("superadmin"),
    //   FinancialClassController.getFinancialClassList
    // );
  }
}
export default new Claim_Router().router;
