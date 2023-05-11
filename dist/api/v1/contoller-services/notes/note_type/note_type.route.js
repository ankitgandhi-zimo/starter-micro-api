"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteType_Router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var common_methods_1 = __importDefault(require("../../../common/common-methods"));
var note_type_controller_1 = __importDefault(require("./note_type.controller"));
var NoteType_Router = /** @class */ (function () {
    function NoteType_Router() {
        this.router = express_1.default.Router();
        this.config();
    }
    NoteType_Router.prototype.config = function () {
        // Auth Routes Section
        this.router.post("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        note_type_controller_1.default.addNoteType);
        this.router.put("/", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        note_type_controller_1.default.updateNoteType);
        this.router.delete("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        note_type_controller_1.default.deleteNoteType);
        this.router.get("/:_id", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        note_type_controller_1.default.getNoteType);
        this.router.post("/list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        note_type_controller_1.default.listNoteType);
        this.router.post("/filter_list", common_methods_1.default.checkTokenExpiration(), passport_1.default.authenticate("jwt", { session: false }), 
        //Utility.checkRoles("superadmin"),
        note_type_controller_1.default.filterListNoteType);
    };
    return NoteType_Router;
}());
exports.NoteType_Router = NoteType_Router;
exports.default = new NoteType_Router().router;
