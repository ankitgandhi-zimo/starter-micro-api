import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import AgingReportController from "./agingReport.controller";
export class AgingReport_Router {
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
      AgingReportController.getReport
    );

    this.router.post(
      "/download",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      AgingReportController.getAgingReportExcel
    );

    //getAgingReportExcel
  }
}
export default new AgingReport_Router().router;
