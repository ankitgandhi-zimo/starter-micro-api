import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import SuperBillOtherDetailController from "./superBillOtherDetail.controller";
export class SuperBill_Router {
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
      SuperBillOtherDetailController.addSuperBillOtherDetail
    );
    this.router.put(
      "/",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      SuperBillOtherDetailController.updateSuperBillOtherDetail
    );
    this.router.delete(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      SuperBillOtherDetailController.deleteSuperBillOtherDetail
    );
    this.router.get(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      SuperBillOtherDetailController.getSuperBillOtherDetail
    );
  }
}
export default new SuperBill_Router().router;
