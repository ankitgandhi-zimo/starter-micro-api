"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversation_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var conversation_controller_1 = __importDefault(require("./conversation.controller"));
var Conversation_Router = /** @class */ (function () {
    function Conversation_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    Conversation_Router.prototype.config = function () {
        //Conversation Section Routes
        this.router.put("/blockUser", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        conversation_controller_1.default.blockUser);
        this.router.put("/deleteMessages", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        conversation_controller_1.default.deleteMessages);
        this.router.post("/newConversation", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        conversation_controller_1.default.startNewConversation);
        this.router.post("/getMyConversationDetails", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        conversation_controller_1.default.getMyConversationDetails);
    };
    return Conversation_Router;
}());
exports.Conversation_Router = Conversation_Router;
exports.default = new Conversation_Router().router;
