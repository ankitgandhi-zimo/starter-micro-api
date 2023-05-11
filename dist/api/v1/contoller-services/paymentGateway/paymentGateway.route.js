"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment_Gateway_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var paymentGateway_controller_1 = __importDefault(require("./paymentGateway.controller"));
var Payment_Gateway_Router = /** @class */ (function () {
    function Payment_Gateway_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    Payment_Gateway_Router.prototype.config = function () {
        //Clinic Section Routes
        this.router.post("/add", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        paymentGateway_controller_1.default.addPaymentGateway);
        // this.router.post(
        //   "/add",
        //   Utility.checkTokenExpiration(),
        //   passport.authenticate("jwt", { session: false }),
        //   Utility.checkRoles("superadmin"),
        //   GatewayController.addClinic
        // );
        this.router.get("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        paymentGateway_controller_1.default.getPaymentGatewayDetails);
        this.router.delete("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        paymentGateway_controller_1.default.deletePaymentGatewayDetails);
        this.router.get("/list/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        paymentGateway_controller_1.default.getPaymentGatewayList);
        this.router.put("/verify/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        paymentGateway_controller_1.default.verifyPaymentGatewayDetails);
    };
    return Payment_Gateway_Router;
}());
exports.Payment_Gateway_Router = Payment_Gateway_Router;
exports.default = new Payment_Gateway_Router().router;
