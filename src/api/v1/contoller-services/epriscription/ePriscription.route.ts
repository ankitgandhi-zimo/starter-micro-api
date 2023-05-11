import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import EPriscriptionController from "./ePriscription.controller";
export class EPriscription_Router {
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
      EPriscriptionController.addEPriscription
    );
    // this.router.put(
    //   "/",
    //   Utility.checkTokenExpiration(),
    //   passport.authenticate("jwt", { session: false }),
    //   //Utility.checkRoles("superadmin"),
    //   EPriscriptionController.updateNotes
    // );
    // this.router.delete(
    //   "/:_id",
    //   Utility.checkTokenExpiration(),
    //   passport.authenticate("jwt", { session: false }),
    //   //Utility.checkRoles("superadmin"),
    //   EPriscriptionController.deleteNotes
    // );
    // this.router.get(
    //   "/:_id",
    //   Utility.checkTokenExpiration(),
    //   passport.authenticate("jwt", { session: false }),
    //   //Utility.checkRoles("superadmin"),
    //   EPriscriptionController.getNotes
    // );
    this.router.post(
      "/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      EPriscriptionController.listEPriscription
    );

    this.router.post(
      "/exportListByGroupExcel",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      EPriscriptionController.getEPrescriptionListByGroupDataToExcel
    );
  }
}
export default new EPriscription_Router().router;
