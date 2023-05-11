"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NocCodes_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var claimFillingPaymentCodes_controller_1 = __importDefault(require("./claimFillingPaymentCodes.controller"));
var NocCodes_Router = /** @class */ (function () {
    function NocCodes_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    NocCodes_Router.prototype.config = function () {
        // Auth Routes Section
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        claimFillingPaymentCodes_controller_1.default.listPaymentCodes);
    };
    return NocCodes_Router;
}());
exports.NocCodes_Router = NocCodes_Router;
exports.default = new NocCodes_Router().router;
