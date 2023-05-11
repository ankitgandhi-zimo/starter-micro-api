import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import GatewayController from "./paymentGateway.controller";
export class Payment_Gateway_Router {
  public router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    //Clinic Section Routes

    this.router.post(
      "/add",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      GatewayController.addPaymentGateway
    );

    // this.router.post(
    //   "/add",
    //   Utility.checkTokenExpiration(),
    //   passport.authenticate("jwt", { session: false }),
    //   Utility.checkRoles("superadmin"),
    //   GatewayController.addClinic
    // );

    this.router.get(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      GatewayController.getPaymentGatewayDetails
    );

    this.router.delete(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      GatewayController.deletePaymentGatewayDetails
    );

    this.router.get(
      "/list/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      GatewayController.getPaymentGatewayList
    );

    this.router.put(
      "/verify/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      GatewayController.verifyPaymentGatewayDetails
    );
  }
}
export default new Payment_Gateway_Router().router;
