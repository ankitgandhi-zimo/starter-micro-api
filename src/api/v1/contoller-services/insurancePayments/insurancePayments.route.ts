import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import PaymentController from "./insurancePayments.controller";
export class Payment_Router {
  public router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    //Payment Section Routes

    this.router.post(
      "/addInsurancePayment",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PaymentController.addInsurancePayment
    );
    this.router.put(
      "/",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PaymentController.updateInsurancePayment
    );
    this.router.post(
      "/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PaymentController.listInsurancePayment
    );
  }
}
export default new Payment_Router().router;
