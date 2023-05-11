import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import AppointmentStageController from "./appointmentStage.controller";
export class AppointmentStage_Router {
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
      AppointmentStageController.addAppointmentStage
    );
    this.router.put(
      "/",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      AppointmentStageController.updateAppointmentStage
    );
    this.router.delete(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      AppointmentStageController.deleteAppointmentStage
    );
    this.router.get(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      AppointmentStageController.getAppointmentStage
    );
    this.router.post(
      "/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      AppointmentStageController.listAppointmentStage
    );
  }
}
export default new AppointmentStage_Router().router;
