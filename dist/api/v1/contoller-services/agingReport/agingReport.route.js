"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgingReport_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var agingReport_controller_1 = __importDefault(require("./agingReport.controller"));
var AgingReport_Router = /** @class */ (function () {
    function AgingReport_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    AgingReport_Router.prototype.config = function () {
        // Auth Routes Section
        this.router.post("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        agingReport_controller_1.default.getReport);
        this.router.post("/download", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        agingReport_controller_1.default.getAgingReportExcel);
        //getAgingReportExcel
    };
    return AgingReport_Router;
}());
exports.AgingReport_Router = AgingReport_Router;
exports.default = new AgingReport_Router().router;
