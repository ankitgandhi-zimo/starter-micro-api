import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import ProviderController from "./provider.controller";
export class Provider_Router {
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
      ProviderController.addProvider
    );
    this.router.put(
      "/",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      ProviderController.updateProvider
    );
    this.router.delete(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      ProviderController.deleteProvider
    );
    this.router.get(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      ProviderController.getProvider
    );
    this.router.post(
      "/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      ProviderController.listProvider
    );
    this.router.post(
      "/filter_list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      ProviderController.filterListProvider
    );

    this.router.post(
      "/filter_list_locations",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      ProviderController.filterListLocations
    );
    this.router.post(
      "/filter_list_appt_type",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      ProviderController.filterListApptType
    );
    //filterListApptType

    this.router.post(
      "/update_appointment_type",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      ProviderController.updateAppointmentType
    );
    this.router.post(
      "/update_location",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      ProviderController.updateLocation
    );
    this.router.post(
      "/list_appointment_type",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      ProviderController.listAppointmentType
    );
    this.router.post(
      "/list_location",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      ProviderController.listLocation
    );
    this.router.post(
      "/get_assigned_appt_type",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      ProviderController.getAssignedApptType
    );

    this.router.post(
      "/exportProviderExcel",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      ProviderController.getProviderDataToExcel
    );
    this.router.post(
      "/fetch",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      ProviderController.fetchProviders
    );
  }
}
export default new Provider_Router().router;
