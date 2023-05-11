"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Billing_Payment_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var billingPayment_controller_1 = __importDefault(require("../billingPayment/billingPayment.controller"));
var Billing_Payment_Router = /** @class */ (function () {
    function Billing_Payment_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    Billing_Payment_Router.prototype.config = function () {
        //Payment Section Routes
        this.router.post("/receivePayment", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        billingPayment_controller_1.default.receivePayment);
        this.router.post("/postPayment", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        billingPayment_controller_1.default.addPostPayment);
        this.router.put("/update_post_payment", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        billingPayment_controller_1.default.updatePostPayment);
        this.router.get("/getPostPaymentDetails/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        billingPayment_controller_1.default.getPostPaymentDetails);
        this.router.post("/postPayment/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        billingPayment_controller_1.default.getPostPaymentList);
        this.router.post("/get_superbill_list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        billingPayment_controller_1.default.getSuperBillListForPostPayment);
        this.router.put("/disableLink", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        billingPayment_controller_1.default.disablePaymentLink);
        this.router.put("/updateDuePayment", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        billingPayment_controller_1.default.updateDuePayment);
        this.router.post("/makeCMS1500Form", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        billingPayment_controller_1.default.makeCMS1500Form);
        // secondary insurance
        this.router.post("/makeCMS1500SecondaryIns", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        billingPayment_controller_1.default.makeCMS1500FormForSecondaryInsurance);
    };
    return Billing_Payment_Router;
}());
exports.Billing_Payment_Router = Billing_Payment_Router;
exports.default = new Billing_Payment_Router().router;
