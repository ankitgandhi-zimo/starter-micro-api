import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import PaymentController from "../billingPayment/billingPayment.controller";
export class Billing_Payment_Router {
  public router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    //Payment Section Routes

    this.router.post(
      "/receivePayment",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PaymentController.receivePayment
    );

    this.router.post(
      "/postPayment",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PaymentController.addPostPayment
    );

    this.router.put(
      "/update_post_payment",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PaymentController.updatePostPayment
    );

    this.router.get(
      "/getPostPaymentDetails/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PaymentController.getPostPaymentDetails
    );
    this.router.post(
      "/postPayment/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PaymentController.getPostPaymentList
    );

    this.router.post(
      "/get_superbill_list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PaymentController.getSuperBillListForPostPayment
    );

    this.router.put(
      "/disableLink",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PaymentController.disablePaymentLink
    );

    this.router.put(
      "/updateDuePayment",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PaymentController.updateDuePayment
    );

    this.router.post(
      "/makeCMS1500Form",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PaymentController.makeCMS1500Form
    );

    // secondary insurance
    this.router.post(
      "/makeCMS1500SecondaryIns",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PaymentController.makeCMS1500FormForSecondaryInsurance
    );
  }
}
export default new Billing_Payment_Router().router;
