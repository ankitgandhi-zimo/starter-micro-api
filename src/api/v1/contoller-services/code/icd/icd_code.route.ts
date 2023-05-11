import express from "express";
import passport from "passport";
import Utility from "../../../common/common-methods";
import IcdCodeController from "./icd_code.controller";
export class IcdCode_Router {
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
      IcdCodeController.addIcdCode
    );
    this.router.post(
      "/getIcdCodeDataToExcel",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      IcdCodeController.getIcdCodeDataToExcel
    );

    this.router.put(
      "/",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      IcdCodeController.updateIcdCode
    );
    this.router.delete(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      IcdCodeController.deleteIcdCode
    );
    this.router.get(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      IcdCodeController.getIcdCode
    );
    this.router.post(
      "/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      IcdCodeController.listIcdCode
    );
    // this.router.post(
    //   "/filter_list",
    //   Utility.checkTokenExpiration(),
    //   passport.authenticate("jwt", { session: false }),
    //   //Utility.checkRoles("superadmin"),
    //   IcdCodeController.filterListCptCode
    // );
  }
}
export default new IcdCode_Router().router;
