import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import FilledTreatmentPlanController from "./filledTreatmentPlan.controller";
export class FilledTreatmentPlan_Router {
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
      FilledTreatmentPlanController.addTreatmentPlan
    );

    this.router.put(
      "/",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      FilledTreatmentPlanController.updateTreatmentPlan
    );

    this.router.delete(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      FilledTreatmentPlanController.deleteTreatmentPlan
    );

    this.router.get(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      FilledTreatmentPlanController.getTreatmentPlan
    );

    this.router.post(
      "/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      FilledTreatmentPlanController.listTreatmentPlan
    );

    this.router.post(
      "/checkout_data",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      FilledTreatmentPlanController.checkoutData
    );
  }
}
export default new FilledTreatmentPlan_Router().router;
