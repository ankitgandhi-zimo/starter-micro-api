import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import AvailabilityController from "./availability.controller";
export class Availability_Router {
  public router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    // Auth Routes Section
    this.router.post(
      "/set",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      AvailabilityController.setAvailability
    );
    this.router.post(
      "/get",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      AvailabilityController.getAvailability
    );
    this.router.post(
      "/get_view",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      AvailabilityController.getAvailabilityForView
    );
    this.router.put(
      "/update",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      AvailabilityController.updateAvailability
    );
    this.router.post(
      "/get_time_slots",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      AvailabilityController.getTimeSlots
    );
    this.router.post(
      "/set_unavailability",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      AvailabilityController.setUnavailability
    );
    this.router.post(
      "/get_unavailability",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      AvailabilityController.getUnavailability
    );
    this.router.post(
      "/delete_unavailability",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      AvailabilityController.deleteUnavailability
    );
    this.router.post(
      "/availability_for_update",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      AvailabilityController.getAvailabilityDetailsForUpdate
    );
    this.router.post(
      "/available_days",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      AvailabilityController.getAvailableDatesArr
    );

    this.router.post(
      "/get_doctor_location",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      AvailabilityController.getAvailableDoctorsLocation
    );

    this.router.post(
      "/get_available_slots",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      AvailabilityController.getAvailableTimeSlots
    );

    this.router.post(
      "/get_scheduler_data",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      AvailabilityController.getSchedulerData
    );

    this.router.post(
      "/get_available_doctor",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      AvailabilityController.getAvailableDoctors
    );

    this.router.post(
      "/get_selected_week_days",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      AvailabilityController.getSelectedWeekDaysOfAvailablility
    );

    //getAvailableDoctorsLocation
  }
}
export default new Availability_Router().router;
