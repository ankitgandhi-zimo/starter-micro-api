import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import FilledDynamicFormController from "./filledDynamicForm.controller";
export class FilledDynamicForm_Router {
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
      FilledDynamicFormController.addFilledDynamicForm
    );

    this.router.put(
      "/",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      FilledDynamicFormController.updateFilledDynamicForm
    );

    this.router.delete(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      FilledDynamicFormController.deleteFilledDynamicForm
    );

    this.router.get(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      FilledDynamicFormController.getFilledDynamicForm
    );

    this.router.post(
      "/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      FilledDynamicFormController.listFilledDynamicForm
    );

    this.router.post(
      "/send_form",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      FilledDynamicFormController.sendForm
    );
  }
}
export default new FilledDynamicForm_Router().router;
