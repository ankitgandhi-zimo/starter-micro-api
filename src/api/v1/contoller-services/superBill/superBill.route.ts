import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import SuperBillController from "./superBill.controller";
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
      SuperBillController.addSuperBill
    );

    this.router.post(
      "/exportSuperBillData",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      SuperBillController.getSuperBillDataToExcel
    );

    this.router.put(
      "/",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      SuperBillController.updateSuperBill
    );
    this.router.delete(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      SuperBillController.deleteSuperBill
    );
    this.router.get(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      SuperBillController.getSuperBill
    );

    this.router.get(
      "/getDetailsForGenerateSuperBill/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      SuperBillController.getDetailsForGenerateSuperBill
    );

    // this.router.post(
    //   "/getDetailsForGenerateSuperBill",
    //   Utility.checkTokenExpiration(),
    //   passport.authenticate("jwt", { session: false }),
    //   //Utility.checkRoles("superadmin"),
    //   SuperBillController.getDetailsForGenerateSuperBill1
    // );

    this.router.get(
      "/assignmentHistory/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      SuperBillController.superBillAssignmentHistory
    );

    this.router.post(
      "/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      SuperBillController.listSuperBill
    );

    // assign super bill to billing team member routes

    this.router.post(
      "/assign",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      SuperBillController.superBillAssignment
    );

    this.router.post(
      "/mark_as_printed",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      SuperBillController.markAsPrinted
    );

    this.router.post(
      "/patient_list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      SuperBillController.getPatientList
    );

    this.router.get(
      "/getHistory/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      SuperBillController.getChargeHistory
    );
    this.router.get(
      "/getPaymentHistory/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      SuperBillController.getPaymentHistory
    );
    //getPaymentHistory
  }
}
export default new SuperBill_Router().router;
