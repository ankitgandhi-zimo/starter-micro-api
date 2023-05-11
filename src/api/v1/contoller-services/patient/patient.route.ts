import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import PatientController from "../patient/patient.controller";
export class Patient_Router {
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
      // Utility.checkRoles("superadmin"),
      PatientController.addPatient
    );

    this.router.put(
      "/update",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PatientController.updatePatient
    );

    this.router.get(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PatientController.getPatientDetails
    );

    this.router.delete(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PatientController.deletePatientDetails
    );

    this.router.post(
      "/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PatientController.getPatientList
    );

    this.router.post(
      "/getPatientPaymentList",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PatientController.getPatientPaymentList
    );

    this.router.post(
      "/exportPatientPaymentList",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PatientController.exportPatientPaymentDataToExcel
    );

    this.router.post(
      "/without_pagination_list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PatientController.getPatientListWithoutPagination
    );

    this.router.post(
      "/checkout/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      PatientController.checkoutList
    );

    this.router.post(
      "/checkout/getCheckoutDataToExcel",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      PatientController.getCheckoutDataToExcel
    );

    this.router.post(
      "/checkout",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PatientController.checkoutPatient
    );

    // patient doc routes

    this.router.post(
      "/document",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PatientController.addPatientDocument
    );

    this.router.put(
      "/document",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PatientController.updatePatientDocument
    );

    this.router.get(
      "/document/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PatientController.getPatientDocumentDetails
    );

    this.router.delete(
      "/document/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PatientController.deletePatientDocumentDetails
    );

    this.router.post(
      "/document/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PatientController.getPatientDocumentList
    );

    this.router.post(
      "/linked",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PatientController.assignProviderToPatient
    );

    this.router.post(
      "/get_assigned_patients_providers",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PatientController.getAssignedProviderOrPatient
    );

    // export patient data excel

    this.router.post(
      "/exportPatientExcel",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PatientController.getPatientDataToExcel
    );
    this.router.post(
      "/visit_history_list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PatientController.getVisitHistoryList
    );
    this.router.post(
      "/visit_history_details",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PatientController.getVisitHistoryDetails
    );

    this.router.get(
      "/getCptCodes/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PatientController.getCptCodes
    );

    this.router.get(
      "/checkout_details/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PatientController.getCheckoutDetails
    );

    this.router.post(
      "/merge",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PatientController.mergePatient
    );

    this.router.post(
      "/fetch",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      PatientController.fetchPatients
    );

    //
  }
}
export default new Patient_Router().router;
