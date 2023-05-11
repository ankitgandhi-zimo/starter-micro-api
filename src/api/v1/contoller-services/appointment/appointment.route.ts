import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import AppointmentController from "../appointment/appointment.controller";
export class Appointment_Router {
  public router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    //Appointment Section Routes

    this.router.post(
      "/add",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      AppointmentController.addAppointment
    );

    this.router.post(
      "/recurring/add",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      AppointmentController.addRecurringAppointment
    );

    this.router.put(
      "/update",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      AppointmentController.updateAppointment
    );

    this.router.get(
      "/:appointment_number",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      AppointmentController.getAppointmentDetails
    );

    this.router.get(
      "/details/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      AppointmentController.getAppointmentDetailsWithId
    );

    this.router.delete(
      // "/:appointment_number",
      "/",

      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      AppointmentController.deleteAppointmentDetails
    );

    this.router.post(
      "/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      AppointmentController.getAppointmentList
    );

    this.router.post(
      "/without_pagination_list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      AppointmentController.getAppointmentListWithoutPagination
    );

    this.router.put(
      "/reschedule",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      AppointmentController.rescheduleAppointment
    );

    this.router.put(
      "/declined",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      AppointmentController.declineBooking
    );

    this.router.post(
      "/exportAppointmentExcel",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      AppointmentController.getAppointmentDataToExcel
    );

    this.router.post(
      "/fetch",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      AppointmentController.fetchAppointments
    );

    this.router.post(
      "/checkout/fetch",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      AppointmentController.fetchCheckouts
    );
  }
}
export default new Appointment_Router().router;
