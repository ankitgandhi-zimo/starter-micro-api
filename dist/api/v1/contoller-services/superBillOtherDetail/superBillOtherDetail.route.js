"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperBill_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var superBillOtherDetail_controller_1 = __importDefault(require("./superBillOtherDetail.controller"));
var SuperBill_Router = /** @class */ (function () {
    function SuperBill_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    SuperBill_Router.prototype.config = function () {
        // Auth Routes Section
        this.router.post("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        superBillOtherDetail_controller_1.default.addSuperBillOtherDetail);
        this.router.put("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        superBillOtherDetail_controller_1.default.updateSuperBillOtherDetail);
        this.router.delete("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        superBillOtherDetail_controller_1.default.deleteSuperBillOtherDetail);
        this.router.get("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        superBillOtherDetail_controller_1.default.getSuperBillOtherDetail);
    };
    return SuperBill_Router;
}());
exports.SuperBill_Router = SuperBill_Router;
exports.default = new SuperBill_Router().router;
