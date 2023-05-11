"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreatmentPlan_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var treatmentPlan_controller_1 = __importDefault(require("./treatmentPlan.controller"));
var TreatmentPlan_Router = /** @class */ (function () {
    function TreatmentPlan_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    TreatmentPlan_Router.prototype.config = function () {
        this.router.post("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        treatmentPlan_controller_1.default.addTreatmentPlan);
        this.router.put("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        treatmentPlan_controller_1.default.updateTreatmentPlan);
        this.router.delete("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        treatmentPlan_controller_1.default.deleteTreatmentPlan);
        this.router.get("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        treatmentPlan_controller_1.default.getTreatmentPlan);
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        treatmentPlan_controller_1.default.listTreatmentPlan);
        this.router.post("/import", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        treatmentPlan_controller_1.default.importTreatmentPlan);
    };
    return TreatmentPlan_Router;
}());
exports.TreatmentPlan_Router = TreatmentPlan_Router;
exports.default = new TreatmentPlan_Router().router;
