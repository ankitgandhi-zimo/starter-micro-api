import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import InsuranceController from "../insurance/insurance.controller";
export class Insurance_Router {
  public router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    //Insurance Section Routes

    this.router.post(
      "/add",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      InsuranceController.addInsurance
    );

    this.router.put(
      "/update",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      InsuranceController.updateInsurance
    );

    this.router.get(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      InsuranceController.getInsuranceDetails
    );

    this.router.delete(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      InsuranceController.deleteInsuranceDetails
    );

    this.router.post(
      "/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      InsuranceController.getInsuranceList
    );

    this.router.post(
      "/without_pagination_list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      InsuranceController.getInsuranceListWithoutPagination
    );

    //Insurance Company Section Routes
    this.router.post(
      "/company/add",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      InsuranceController.addInsuranceCompany
    );

    this.router.post(
      "/company/getInsuranceCompanyDataToExcel",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      InsuranceController.getInsuranceCompanyDataToExcel
    );

    this.router.get(
      "/company/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      InsuranceController.getInsuranceCompanyDetails
    );

    this.router.delete(
      "/company/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      InsuranceController.deleteInsuranceCompanyDetails
    );

    this.router.post(
      "/company/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      InsuranceController.getInsuranceCompanyList
    );

    this.router.put(
      "/company/update",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      InsuranceController.updateInsuranceCompany
    );

    // Eap insurance section routes

    this.router.post(
      "/eap/add",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      InsuranceController.addEapInsurance
    );

    this.router.put(
      "/eap/update",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      InsuranceController.updateEapInsurance
    );

    this.router.get(
      "/eap/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      InsuranceController.getEapInsuranceDetails
    );

    // Hmo insurance section routes

    this.router.post(
      "/hmo/add",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      InsuranceController.addHmoInsurance
    );

    this.router.put(
      "/hmo/update",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      InsuranceController.updateHmoInsurance
    );

    this.router.get(
      "/hmo/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      InsuranceController.getHmoInsuranceDetails
    );

    // PPO insurance section routes

    this.router.post(
      "/ppo/add",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      InsuranceController.addPpoInsurance
    );

    this.router.put(
      "/ppo/update",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      InsuranceController.updatePpoInsurance
    );

    this.router.get(
      "/ppo/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      InsuranceController.getPpoInsuranceDetails
    );
  }
}
export default new Insurance_Router().router;
