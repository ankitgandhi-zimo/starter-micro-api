import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import CardsClassController from "../cards/cards.controller";
export class Cards_Class_Router {
  public router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.get(
      "/",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      CardsClassController.getCardDetails
    );

    this.router.post(
      "/add",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      CardsClassController.addCard
    );

    this.router.post(
      "/chargePayment",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      //Utility.checkRoles("superadmin"),
      CardsClassController.chargeByPatientCards
    );

    this.router.delete(
      "/",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      CardsClassController.deleteCardDetails
    );

    this.router.post(
      "/list",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      CardsClassController.getCardList
    );
  }
}
export default new Cards_Class_Router().router;
