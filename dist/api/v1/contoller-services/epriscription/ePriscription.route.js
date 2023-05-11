"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EPriscription_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var ePriscription_controller_1 = __importDefault(require("./ePriscription.controller"));
var EPriscription_Router = /** @class */ (function () {
    function EPriscription_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    EPriscription_Router.prototype.config = function () {
        // Auth Routes Section
        this.router.post("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        ePriscription_controller_1.default.addEPriscription);
        // this.router.put(
        //   "/",
        //   Utility.checkTokenExpiration(),
        //   passport.authenticate("jwt", { session: false }),
        //   //Utility.checkRoles("superadmin"),
        //   EPriscriptionController.updateNotes
        // );
        // this.router.delete(
        //   "/:_id",
        //   Utility.checkTokenExpiration(),
        //   passport.authenticate("jwt", { session: false }),
        //   //Utility.checkRoles("superadmin"),
        //   EPriscriptionController.deleteNotes
        // );
        // this.router.get(
        //   "/:_id",
        //   Utility.checkTokenExpiration(),
        //   passport.authenticate("jwt", { session: false }),
        //   //Utility.checkRoles("superadmin"),
        //   EPriscriptionController.getNotes
        // );
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        ePriscription_controller_1.default.listEPriscription);
        this.router.post("/exportListByGroupExcel", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        ePriscription_controller_1.default.getEPrescriptionListByGroupDataToExcel);
    };
    return EPriscription_Router;
}());
exports.EPriscription_Router = EPriscription_Router;
exports.default = new EPriscription_Router().router;
