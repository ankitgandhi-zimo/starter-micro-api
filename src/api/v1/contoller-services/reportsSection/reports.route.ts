import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";

import ReportsController from "../reportsSection/reports.controller";

export class Reports_Router {
  public router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.post(
      "/exportDailyPaymentReportExcel",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      ReportsController.exportDailyPaymentReportExcel
    );

    this.router.post(
      "/exportInsuranceLogReportExcel",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      ReportsController.exportInsuranceLogReportExcel
    );

    this.router.post(
      "/exportChargeLogReportExcel",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      ReportsController.exportChargeLogReportExcel
    );
  }
}
export default new Reports_Router().router;
