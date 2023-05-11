import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import WaitingListController from "./waitingList.controller";
export class WaitingList_Router {
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
      WaitingListController.addWaitingList
    );
    this.router.put(
      "/",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      WaitingListController.updateWaitingList
    );

    // this.router.delete(
    //   "/:_id",
    //   Utility.checkTokenExpiration(),
    //   passport.authenticate("jwt", { session: false }),
    //   //Utility.checkRoles("superadmin"),
    //   SkillController.deleteSkill
    // );
    this.router.get(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      WaitingListController.getWaitingList
    );
    this.router.post(
      "/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      WaitingListController.listWaitingList
    );

    this.router.post(
      "/getPatientWaitingDataToExcel",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      WaitingListController.getPatientWaitingDataToExcel
    );
  }
}
export default new WaitingList_Router().router;
