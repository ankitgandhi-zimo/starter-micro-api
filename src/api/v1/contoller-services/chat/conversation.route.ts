import express from "express";
import passport from "passport";
import Utility from "../../common/common-methods";
import ConversationController from "./conversation.controller";
export class Conversation_Router {
  public router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    //Conversation Section Routes

    this.router.put(
      "/blockUser",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      ConversationController.blockUser
    );

    this.router.put(
      "/deleteMessages",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      ConversationController.deleteMessages
    );
    this.router.post(
      "/newConversation",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      ConversationController.startNewConversation
    );

    this.router.post(
      "/getMyConversationDetails",
      Utility.checkTokenExpiration(),
      passport.authenticate("jwt", { session: false }),
      // Utility.checkRoles("superadmin"),
      ConversationController.getMyConversationDetails
    );
  }
}
export default new Conversation_Router().router;
