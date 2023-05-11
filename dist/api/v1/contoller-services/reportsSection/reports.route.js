"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reports_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var reports_controller_1 = __importDefault(require("../reportsSection/reports.controller"));
var Reports_Router = /** @class */ (function () {
    function Reports_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    Reports_Router.prototype.config = function () {
        this.router.post("/exportDailyPaymentReportExcel", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        reports_controller_1.default.exportDailyPaymentReportExcel);
        this.router.post("/exportInsuranceLogReportExcel", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        reports_controller_1.default.exportInsuranceLogReportExcel);
        this.router.post("/exportChargeLogReportExcel", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        // Utility.checkRoles("superadmin"),
        reports_controller_1.default.exportChargeLogReportExcel);
    };
    return Reports_Router;
}());
exports.Reports_Router = Reports_Router;
exports.default = new Reports_Router().router;
