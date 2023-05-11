"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var insurancePayments_controller_1 = __importDefault(require("./insurancePayments.controller"));
var Payment_Router = /** @class */ (function () {
    function Payment_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    Payment_Router.prototype.config = function () {
        //Payment Section Routes
        this.router.post("/addInsurancePayment", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        insurancePayments_controller_1.default.addInsurancePayment);
        this.router.put("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        insurancePayments_controller_1.default.updateInsurancePayment);
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        insurancePayments_controller_1.default.listInsurancePayment);
    };
    return Payment_Router;
}());
exports.Payment_Router = Payment_Router;
exports.default = new Payment_Router().router;
