import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import claimFillingPaymentCodesController from "./claimFillingPaymentCodes.controller";
export class NocCodes_Router {
  public router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    // Auth Routes Section

    this.router.post(
      "/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      claimFillingPaymentCodesController.listPaymentCodes
    );
  }
}
export default new NocCodes_Router().router;
