import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import FinancialClassController from "../financialClass/financialClass.controller";
export class Financial_Class_Router {
  public router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    //Financial_Class Section Routes

    this.router.post(
      "/add",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      FinancialClassController.addFinancialClass
    );

    this.router.put(
      "/update",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      FinancialClassController.updateFinancialClass
    );

    this.router.get(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      FinancialClassController.getFinancialClassDetails
    );

    this.router.delete(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      FinancialClassController.deleteFinancialClassDetails
    );

    this.router.post(
      "/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      FinancialClassController.getFinancialClassList
    );
  }
}
export default new Financial_Class_Router().router;
