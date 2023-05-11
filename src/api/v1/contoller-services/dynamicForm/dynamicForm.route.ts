import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import DynamicFormController from "./dynamicForm.controller";
export class DynamicForm_Router {
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
      DynamicFormController.addDynamicForm
    );

    this.router.put(
      "/",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      DynamicFormController.updateDynamicForm
    );

    this.router.delete(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      DynamicFormController.deleteDynamicForm
    );

    this.router.get(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      DynamicFormController.getDynamicForm
    );

    this.router.post(
      "/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      DynamicFormController.listDynamicForm
    );
    this.router.post(
      "/import",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      DynamicFormController.importDynamicForm
    );

    this.router.post(
      "/category_count",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      DynamicFormController.categoryCount
    );

    this.router.post(
      "/filter_list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      DynamicFormController.filterListForm
    );

    //filterListForm
  }
}
export default new DynamicForm_Router().router;
