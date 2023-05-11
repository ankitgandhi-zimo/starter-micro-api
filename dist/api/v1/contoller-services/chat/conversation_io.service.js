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
var erros_message_1 = __importDefault(require("../../common/erros_message"));
var conversation_model_1 = require("../../models/chat/conversation.model");
var member_model_1 = __importDefault(require("../../models/chat/member.model"));
var message_model_1 = __importDefault(require("../../models/chat/message.model"));
var index_1 = require("../../../../index");
var conversation_model_2 = __importDefault(require("../../models/chat/conversation.model"));
var chatUsers = new Map();
var aciveChatUsers = new Map();
var Conversatio_IO = /** @class */ (function () {
    function Conversatio_IO() {
        var _this = this;
        this.connectChat = function (chatIO) {
            return chatIO.on("connection", function (socket) {
                socket.on(erros_message_1.default.socketEvents.chat.joinConversation, function (data) { return __awaiter(_this, void 0, void 0, function () {
                    var conversationsArr, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, member_model_1.default.getConversationIds(data.loggedInUser, data.clinic_id)];
                            case 1:
                                conversationsArr = _a.sent();
                                conversationsArr.forEach(function (el) {
                                    return socket.join(el.toString());
                                });
                                // socket.data.user_id = data.loggedInUser
                                // console.log(data.loggedInUser, socket.id)
                                chatUsers.set(data.loggedInUser, socket.id);
                                return [3 /*break*/, 3];
                            case 2:
                                error_1 = _a.sent();
                                chatIO
                                    .to(socket.id)
                                    .emit(erros_message_1.default.socketEvents.chat
                                    .errorJoinConversation);
                                console.log("****************  CHAT IO ERROR START  **************** ");
                                console.log(error_1);
                                console.log("****************  CHAT IO ERROR END   **************** ");
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                socket.on(erros_message_1.default.socketEvents.chat.sendMessage, function (data) { return __awaiter(_this, void 0, void 0, function () {
                    var loggedInUser, clinic_id, conversation_id, message, type, nowTime, conversationType, document, insertObj, conversationData, socketResponse_1, memberData, socketResponse_2, socketResponse_3, socketResponse_4, messageResponse, socketResponse, error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 6, , 7]);
                                loggedInUser = data.loggedInUser, clinic_id = data.clinic_id, conversation_id = data.conversation_id, message = data.message, type = data.type, nowTime = data.nowTime, conversationType = data.conversationType, document = data.document;
                                insertObj = {};
                                insertObj = {
                                    type: type,
                                    message: message,
                                    msgTime: nowTime,
                                    clinic_id: clinic_id,
                                    sender_id: loggedInUser,
                                    conversation_id: conversation_id,
                                    document: document,
                                };
                                insertObj.readByRecipients = [
                                    {
                                        readByUserId: loggedInUser /*,readAt: nowTime*/,
                                    },
                                ];
                                return [4 /*yield*/, conversation_model_2.default.getConversationDataForMessage(conversation_id, loggedInUser, clinic_id, conversationType)];
                            case 1:
                                conversationData = _a.sent();
                                if (!conversationData.length) {
                                    socketResponse_1 = {
                                        code: erros_message_1.default.socketCodes.convNotFound,
                                        message: erros_message_1.default.conversationMsg.convNotFound,
                                    };
                                    return [2 /*return*/, chatIO
                                            .to(socket.id)
                                            .emit(erros_message_1.default.socketEvents.chat
                                            .receiveMessage, socketResponse_1)];
                                }
                                conversationData = conversationData[0];
                                memberData = conversationData.memberData;
                                if (!(conversationData.type ==
                                    conversation_model_1.ECONVERSATION_TYPES.INDIVIDUAL)) return [3 /*break*/, 2];
                                if (!memberData) {
                                    socketResponse_2 = {
                                        code: erros_message_1.default.socketCodes
                                            .uRNotMember,
                                        message: erros_message_1.default.conversationMsg
                                            .uRNotMember,
                                        data: { conversation_id: conversation_id },
                                    };
                                    return [2 /*return*/, chatIO
                                            .to(socket.id)
                                            .emit(erros_message_1.default.socketEvents.chat
                                            .receiveMessage, socketResponse_2)];
                                }
                                if (conversationData.setting.message &&
                                    !memberData.isAdmin) {
                                    socketResponse_3 = {
                                        code: erros_message_1.default.socketCodes
                                            .onlyAdminMsg,
                                        message: erros_message_1.default.conversationMsg
                                            .onlyAdminMsg,
                                        data: { conversation_id: conversation_id },
                                    };
                                    return [2 /*return*/, chatIO
                                            .to(socket.id)
                                            .emit(erros_message_1.default.socketEvents.chat
                                            .receiveMessage, socketResponse_3)];
                                }
                                return [3 /*break*/, 4];
                            case 2:
                                socketResponse_4 = {
                                    code: erros_message_1.default.socketCodes.uBlocked,
                                    message: erros_message_1.default.conversationMsg.uBlocked,
                                    data: { conversation_id: conversation_id },
                                };
                                if (memberData.isBlocked)
                                    return [2 /*return*/, chatIO
                                            .to(socket.id)
                                            .emit(erros_message_1.default.socketEvents.chat
                                            .receiveMessage, socketResponse_4)];
                                if (conversationData.friendConversationData
                                    .isBlocked)
                                    insertObj.onlySender = true;
                                if (!(conversationData.friendConversationData
                                    .isActive == false)) return [3 /*break*/, 4];
                                return [4 /*yield*/, member_model_1.default.findByIdAndUpdate(conversationData.friendConversationData
                                        ._id, { isActive: true })];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4: return [4 /*yield*/, message_model_1.default.create(insertObj)];
                            case 5:
                                messageResponse = _a.sent(), socketResponse = {
                                    code: erros_message_1.default.socketCodes.ok,
                                    message: erros_message_1.default.conversationMsg
                                        .sendMessageSucc,
                                    data: {
                                        message_id: messageResponse._id,
                                        conversation_id: conversation_id,
                                        clinic_id: clinic_id,
                                        conversationType: conversationType,
                                        sender_id: insertObj.sender_id,
                                    },
                                };
                                if (insertObj.onlySender)
                                    chatIO
                                        .to(socket.id)
                                        .emit(erros_message_1.default.socketEvents.chat
                                        .receiveMessage, socketResponse);
                                else
                                    chatIO
                                        .in(data.conversation_id)
                                        .emit(erros_message_1.default.socketEvents.chat
                                        .receiveMessage, socketResponse);
                                return [3 /*break*/, 7];
                            case 6:
                                error_2 = _a.sent();
                                chatIO
                                    .in(data.conversation_id)
                                    .emit(erros_message_1.default.socketEvents.chat
                                    .receiveMessage, {
                                    code: erros_message_1.default.socketCodes
                                        .internalservererror,
                                });
                                console.log("****************  CHAT IO ERROR START  **************** ");
                                console.log(error_2);
                                console.log("****************  CHAT IO ERROR END   **************** ");
                                return [3 /*break*/, 7];
                            case 7: return [2 /*return*/];
                        }
                    });
                }); });
                socket.on(erros_message_1.default.socketEvents.chat.joinNewConversation, function (data) {
                    // console.log('ErrorMessage.socketEvents.chat.newConversation', data)
                    socket.join(data.conversation_id);
                });
                socket[Symbol.for("nodejs.rejection")] = function (err) {
                    return socket.emit("error", err);
                };
            });
        };
        this.chatEventEmiter = function (event, receiverArr, data) {
            if (receiverArr && receiverArr.length) {
                receiverArr.forEach(function (_id) {
                    var toUser = chatUsers.get(_id.toString());
                    index_1.app.get("chatIO").to(toUser).emit(event, data);
                });
            }
            else
                process.env.NODE_ENV != "prod" &&
                    console.log("\n ***********  Chat IO haven't received array  ************\n");
        };
    }
    return Conversatio_IO;
}());
exports.default = new Conversatio_IO();
