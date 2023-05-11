"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCodes_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var listCodes_controller_1 = __importDefault(require("./listCodes.controller"));
var ListCodes_Router = /** @class */ (function () {
    function ListCodes_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    ListCodes_Router.prototype.config = function () {
        // Auth Routes Section
        this.router.post("/icd", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        listCodes_controller_1.default.listICDCodes);
        this.router.post("/cpt", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        listCodes_controller_1.default.listCPTCodes);
        this.router.post("/noc", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        listCodes_controller_1.default.listNOCCodes);
        this.router.post("/modifier", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        listCodes_controller_1.default.listModifiers);
        this.router.post("/timezone", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        listCodes_controller_1.default.listTimezone);
    };
    return ListCodes_Router;
}());
exports.ListCodes_Router = ListCodes_Router;
exports.default = new ListCodes_Router().router;
