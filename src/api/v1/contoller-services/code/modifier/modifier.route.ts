import express from "express";
import passport from "passport";
import Utility from "../../../common/common-methods";
import ModifierController from "./modifier.controller";
export class Modifier_Router {
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
      ModifierController.addModifier
    );
    this.router.post(
      "/getModifierDataToExcel",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      ModifierController.getModifierDataToExcel
    );

    this.router.put(
      "/",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      ModifierController.updateModifier
    );
    this.router.delete(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      ModifierController.deleteModifier
    );
    this.router.get(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      ModifierController.getModifier
    );
    this.router.post(
      "/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      ModifierController.listModifier
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
export default new Modifier_Router().router;
