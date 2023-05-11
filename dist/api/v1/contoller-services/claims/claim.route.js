"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Claim_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var claim_controller_1 = __importDefault(require("../claims/claim.controller"));
var Claim_Router = /** @class */ (function () {
    function Claim_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    Claim_Router.prototype.config = function () {
        //Financial_Class Section Routes
        this.router.post("/submit", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        claim_controller_1.default.submitClaim);
        this.router.put("/updateEdiStatus", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        claim_controller_1.default.updateEdiStatus);
        this.router.post("/details", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        claim_controller_1.default.getClaimDetails);
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        claim_controller_1.default.getClaimList);
        this.router.get("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        claim_controller_1.default.getClaimData);
        this.router.post("/exportClaimExcel", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        claim_controller_1.default.exportClaimExcel);
        // this.router.post(
        //   "/list",
        //   Utility.checkTokenExpiration(),
        //   passport.authenticate("jwt", { session: false }),
        //   // Utility.checkRoles("superadmin"),
        //   ClaimController.getClaimList
        // );
        // this.router.delete(
        //   "/:_id",
        //   Utility.checkTokenExpiration(),
        //   passport.authenticate("jwt", { session: false }),
        //   // Utility.checkRoles("superadmin"),
        //   FinancialClassController.deleteFinancialClassDetails
        // );
        // this.router.post(
        //   "/list",
        //   Utility.checkTokenExpiration(),
        //   passport.authenticate("jwt", { session: false }),
        //   Utility.checkRoles("superadmin"),
        //   FinancialClassController.getFinancialClassList
        // );
    };
    return Claim_Router;
}());
exports.Claim_Router = Claim_Router;
exports.default = new Claim_Router().router;
