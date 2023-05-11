"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Insurance_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var insurance_controller_1 = __importDefault(require("../insurance/insurance.controller"));
var Insurance_Router = /** @class */ (function () {
    function Insurance_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    Insurance_Router.prototype.config = function () {
        //Insurance Section Routes
        this.router.post("/add", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        insurance_controller_1.default.addInsurance);
        this.router.put("/update", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        insurance_controller_1.default.updateInsurance);
        this.router.get("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        insurance_controller_1.default.getInsuranceDetails);
        this.router.delete("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        insurance_controller_1.default.deleteInsuranceDetails);
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        insurance_controller_1.default.getInsuranceList);
        this.router.post("/without_pagination_list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        insurance_controller_1.default.getInsuranceListWithoutPagination);
        //Insurance Company Section Routes
        this.router.post("/company/add", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        insurance_controller_1.default.addInsuranceCompany);
        this.router.post("/company/getInsuranceCompanyDataToExcel", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        insurance_controller_1.default.getInsuranceCompanyDataToExcel);
        this.router.get("/company/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        insurance_controller_1.default.getInsuranceCompanyDetails);
        this.router.delete("/company/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        insurance_controller_1.default.deleteInsuranceCompanyDetails);
        this.router.post("/company/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        insurance_controller_1.default.getInsuranceCompanyList);
        this.router.put("/company/update", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        insurance_controller_1.default.updateInsuranceCompany);
        // Eap insurance section routes
        this.router.post("/eap/add", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        insurance_controller_1.default.addEapInsurance);
        this.router.put("/eap/update", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        insurance_controller_1.default.updateEapInsurance);
        this.router.get("/eap/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        insurance_controller_1.default.getEapInsuranceDetails);
        // Hmo insurance section routes
        this.router.post("/hmo/add", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        insurance_controller_1.default.addHmoInsurance);
        this.router.put("/hmo/update", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        insurance_controller_1.default.updateHmoInsurance);
        this.router.get("/hmo/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        insurance_controller_1.default.getHmoInsuranceDetails);
        // PPO insurance section routes
        this.router.post("/ppo/add", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        insurance_controller_1.default.addPpoInsurance);
        this.router.put("/ppo/update", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        insurance_controller_1.default.updatePpoInsurance);
        this.router.get("/ppo/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        insurance_controller_1.default.getPpoInsuranceDetails);
    };
    return Insurance_Router;
}());
exports.Insurance_Router = Insurance_Router;
exports.default = new Insurance_Router().router;
