"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var mongoose_1 = __importDefault(require("mongoose"));
var passport_1 = __importDefault(require("passport"));
var serialize_error_1 = require("serialize-error");
var enviorment_config_1 = __importDefault(require("./api/v1/common/config/enviorment_config"));
var passport_config_1 = require("./api/v1/common/config/passport.config");
var socket_1 = __importDefault(require("./api/v1/common/socket"));
var routes_1 = __importDefault(require("./api/v1/routes"));
var http_1 = require("http");
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.app.use((0, express_fileupload_1.default)({ useTempFiles: true }));
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(express_1.default.static("public"));
// const database = process.env.DB_URL || "";
var database = process.env.DB_URL_LIVE || "";
mongoose_1.default
    .connect(database)
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("connected to database");
        return [2 /*return*/];
    });
}); })
    .catch(function (err) { return console.log("error mongodb", err); });
exports.app.use(passport_1.default.initialize());
(0, passport_config_1.strategy)(passport_1.default);
exports.app.use("/", routes_1.default);
var PORT = process.env.PORT || enviorment_config_1.default.PORT;
// handle internal server error while error occurring in controller part
exports.app.use(function (error, req, res, next) {
    var errorLog = (0, serialize_error_1.serializeError)(error);
    if (error) {
        console.log(error);
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).send({
            status_code: http_status_codes_1.default.INTERNAL_SERVER_ERROR,
            success: false,
            errors: { message: errorLog.message },
        });
    }
});
exports.app.use(function (req, res, next) {
    res.status(http_status_codes_1.default.NOT_FOUND).send({
        status_code: http_status_codes_1.default.NOT_FOUND,
        success: false,
        errors: { message: "Not A Valid Endpoint" },
    });
});
//BELOW LINE COMMENTED BY CHARANJIT
//app.listen(PORT, () => console.log(`server running on port:- ${PORT}`));
/** Socket Config */
//ADDED app in createServer function by CHARANJIT
var server = (0, http_1.createServer)(exports.app);
if (!server)
    //   console.log(
    //     `Server running  on the port ${process.env.PORT} `
    //   );
    // else
    console.log("!!!!!!!!      Unable to create Server      !!!!!!!!");
//ADDED server.listen(PORT) by CHARANJIT
server.listen(PORT);
var _a = socket_1.default.connectSocket(server), socketIO = _a.socketIO, chatIO = _a.chatIO;
exports.app.set("chatIO", chatIO);
exports.app.set("socketIO", socketIO);
//server.listen(PORT);
// require("./api/v1/contoller-services/chat/conversation_io.service").connectChat(
//   chatIO
// );
// /** Database and Firebase */
// require("./app/config/database").connectMongoDb(chatIO);
