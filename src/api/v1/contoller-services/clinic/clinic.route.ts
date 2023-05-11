import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import ClinicController from "./clinic.controller";
export class Clinic_Router {
  public router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    //Clinic Section Routes

    this.router.post(
      "/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      ClinicController.getClinicList
    );

    this.router.post(
      "/without_pagination_list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      ClinicController.getClinicListWithoutPagination
    );

    this.router.post(
      "/location/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      ClinicController.getClinicLocationList
    );

    this.router.post(
      "/location/without_pagination_list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      ClinicController.getClinicLocationListWithoutPagination
    );

    this.router.post(
      "/add",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      ClinicController.addClinic
    );

    this.router.put(
      "/update",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      ClinicController.updateClinic
    );

    this.router.get(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      ClinicController.getClinicDetails
    );

    this.router.delete(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      ClinicController.deleteClinicDetails
    );

    // clinic location section routes

    this.router.post(
      "/add_location",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      ClinicController.addClinicLocation
    );

    this.router.put(
      "/update_location",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      ClinicController.updateClinicLocation
    );

    this.router.get(
      "/location/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      ClinicController.getClinicLocationDetails
    );

    this.router.post(
      "/exportClinicExcel",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      ClinicController.getClinicDataToExcel
    );
  }
}
export default new Clinic_Router().router;
