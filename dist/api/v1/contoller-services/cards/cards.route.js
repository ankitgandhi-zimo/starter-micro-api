"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cards_Class_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var cards_controller_1 = __importDefault(require("../cards/cards.controller"));
var Cards_Class_Router = /** @class */ (function () {
    function Cards_Class_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    Cards_Class_Router.prototype.config = function () {
        this.router.get("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        cards_controller_1.default.getCardDetails);
        this.router.post("/add", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        cards_controller_1.default.addCard);
        this.router.post("/chargePayment", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        cards_controller_1.default.chargeByPatientCards);
        this.router.delete("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        cards_controller_1.default.deleteCardDetails);
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        cards_controller_1.default.getCardList);
    };
    return Cards_Class_Router;
}());
exports.Cards_Class_Router = Cards_Class_Router;
exports.default = new Cards_Class_Router().router;
