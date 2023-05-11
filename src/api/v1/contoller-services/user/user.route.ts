import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import UserController from "./user.controller";
export class User_Router {
  public router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    // Auth Routes Section
    this.router.post(
      "/login",
      // Utility.isActiveUser(),
      UserController.login
    );

    this.router.post("/logout", UserController.logout);

    this.router.put(
      "/change_password",
      UserController.changePassword
    );

    this.router.post(
      "/forgotPassword",
      UserController.forgotPassword
    );

    this.router.post(
      "/reset_forgot_password",
      UserController.reset_forgot_password
    );
    //User Section Routes
    this.router.get(
      "/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      UserController.getUserList
    );
    this.router.post(
      "/without_pagination_list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      UserController.getUserListWithoutPagination
    );

    this.router.post(
      "/add",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      Utility.checkRoles("superadmin", "teamadmin"),
      UserController.addUser
    );

    this.router.put(
      "/update",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin", "teamadmin"),
      UserController.updateUser
    );

    // history section
    this.router.post(
      "/history",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      UserController.getUserHistoryDetails
    );

    this.router.get(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      UserController.getUserDetails
    );

    this.router.get(
      "/role/list/:type?",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      UserController.getRoleList
    );

    this.router.get(
      "/role/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      UserController.getRoleDetails
    );

    this.router.put(
      "/role/update",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      UserController.updateRole
    );

    this.router.post(
      "/role/add",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      Utility.checkRoles("superadmin"),
      UserController.addRole
    );
  }
}
export default new User_Router().router;
