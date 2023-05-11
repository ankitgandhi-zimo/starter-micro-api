import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import GroupController from "../group/group.controller";
export class Group_Router {
  public router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    //User Section Routes

    this.router.post(
      "/add",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      Utility.checkRoles("superadmin"),
      GroupController.addGroup
    );

    this.router.get(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      GroupController.getGroupDetails
    );

    this.router.delete(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      GroupController.deleteGroupDetails
    );

    this.router.put(
      "/remove_clinic_association",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      GroupController.unGroupClinicFromGroup
    );

    this.router.post(
      "/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      GroupController.getGroupList
    );
    this.router.post(
      "/without_pagination_list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      GroupController.getGroupListWithoutPagination
    );

    // clinic association with group

    this.router.post(
      "/addClinic",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      GroupController.addClinicInGroup
    );
  }
}
export default new Group_Router().router;
