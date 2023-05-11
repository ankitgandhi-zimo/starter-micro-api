import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import ListCodesController from "./listCodes.controller";
export class ListCodes_Router {
  public router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    // Auth Routes Section

    this.router.post(
      "/icd",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      ListCodesController.listICDCodes
    );
    this.router.post(
      "/cpt",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      ListCodesController.listCPTCodes
    );
    this.router.post(
      "/noc",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      ListCodesController.listNOCCodes
    );
    this.router.post(
      "/modifier",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      ListCodesController.listModifiers
    );
    this.router.post(
      "/timezone",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      ListCodesController.listTimezone
    );
  }
}
export default new ListCodes_Router().router;
