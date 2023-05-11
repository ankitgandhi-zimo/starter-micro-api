import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import CountryController from "./country.controller";
export class Country_Router {
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
      CountryController.addCountry
    );
    this.router.put(
      "/",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      CountryController.updateCountry
    );
    this.router.delete(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      CountryController.deleteCountry
    );
    this.router.get(
      "/:_id",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      CountryController.getCountry
    );
    this.router.post(
      "/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      CountryController.listCountry
    );
    this.router.post(
      "/filter_list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      CountryController.filterListCountry
    );
  }
}
export default new Country_Router().router;
