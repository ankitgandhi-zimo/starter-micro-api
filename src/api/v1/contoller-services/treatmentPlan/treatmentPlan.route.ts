import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import TreatmentPlanController from "./treatmentPlan.controller";
export class TreatmentPlan_Router {
  public router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.post(
      "/",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      TreatmentPlanController.addTreatmentPlan
    );

    this.router.put(
      "/",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      TreatmentPlanController.updateTreatmentPlan
    );

    this.router.delete(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      TreatmentPlanController.deleteTreatmentPlan
    );

    this.router.get(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      TreatmentPlanController.getTreatmentPlan
    );

    this.router.post(
      "/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      TreatmentPlanController.listTreatmentPlan
    );
    this.router.post(
      "/import",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      TreatmentPlanController.importTreatmentPlan
    );
  }
}
export default new TreatmentPlan_Router().router;
