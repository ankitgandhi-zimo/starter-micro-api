import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import FilledProgressNoteController from "./filledProgressNote.controller";
export class FilledProgressNote_Router {
  public router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.post(
      "/",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      FilledProgressNoteController.addFilledProgressNote
    );

    this.router.put(
      "/",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      FilledProgressNoteController.updateFilledProgressNote
    );

    this.router.delete(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      FilledProgressNoteController.deleteFilledProgressNote
    );

    this.router.get(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      FilledProgressNoteController.getFilledProgressNote
    );

    this.router.post(
      "/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      FilledProgressNoteController.listFilledProgressNote
    );

    this.router.post(
      "/checkout_data",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      FilledProgressNoteController.checkoutData
    );

    this.router.post(
      "/list_progress_note",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      FilledProgressNoteController.listProgressNoteCheckout
    );

    //listProgressNoteCheckout
  }
}
export default new FilledProgressNote_Router().router;
