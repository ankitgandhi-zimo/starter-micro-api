"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var erros_message_1 = __importDefault(require("../../common/erros_message"));
var member_model_1 = __importDefault(require("../../models/chat/member.model"));
var block_user_viewmodel_1 = require("../../view-models/chat/block_user.viewmodel");
var conversation_io_service_1 = __importDefault(require("../chat/conversation_io.service"));
var mongoose_1 = __importDefault(require("mongoose"));
var conversation_model_1 = __importStar(require("../../models/chat/conversation.model"));
var message_model_1 = __importDefault(require("../../models/chat/message.model"));
var ConversationServices = /** @class */ (function () {
    function ConversationServices() {
        var _this = this;
        this.blockUser = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, isBlocked, msg, condition, isUpdated, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        isBlocked = void 0, msg = void 0;
                        if (model.action == block_user_viewmodel_1.EChatActionValues.BLOCK) {
                            isBlocked = true;
                            msg = erros_message_1.default.conversationMsg.blockSucc;
                        }
                        else if (model.action == block_user_viewmodel_1.EChatActionValues.UNBLOCK) {
                            isBlocked = false;
                            msg = erros_message_1.default.conversationMsg.unblockSucc;
                        }
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.SomeThingWentWrong,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                }];
                        condition = {
                            user_id: userDetails._id,
                            clinic_id: model.clinic_id,
                            conversation_id: model.conversation_id,
                        };
                        return [4 /*yield*/, member_model_1.default.updateOne(condition, { isBlocked: isBlocked })];
                    case 1:
                        isUpdated = _a.sent();
                        if (isUpdated && isUpdated.modifiedCount > 0)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: msg,
                                }];
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.SomeThingWentWrong,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteMessages = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, condition, isUpdated, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        condition = {
                            user_id: userDetails._id,
                            clinic_id: model.clinic_id,
                            conversation_id: model.conversation_id,
                        };
                        return [4 /*yield*/, member_model_1.default.updateOne(condition, { isActive: false, clearTime: model.nowTime })];
                    case 1:
                        isUpdated = _a.sent();
                        if (isUpdated && isUpdated.modifiedCount > 0)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: erros_message_1.default.conversationMsg.deletedSucc,
                                }];
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.SomeThingWentWrong,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.startNewConversation = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, loggedInUser_1, validateArr, clinic_id_1, type, membersArr, nowTime_1, name, image, hasConversationBefore, conversationObj, conversationResult_1, insertArr, finalObjToBeReturn, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        userDetails = req.user;
                        loggedInUser_1 = userDetails._id;
                        validateArr = __spreadArray(__spreadArray([], model.membersArr, true), [
                            loggedInUser_1.toString(),
                        ], false);
                        clinic_id_1 = model.clinic_id, type = model.type, membersArr = model.membersArr, nowTime_1 = model.nowTime, name = model.name, image = model.image;
                        if (!(type === conversation_model_1.ECONVERSATION_TYPES.INDIVIDUAL ||
                            type === conversation_model_1.ECONVERSATION_TYPES.PATIENT)) return [3 /*break*/, 4];
                        if (membersArr.length > 1)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.NOT_FOUND,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.conversationMsg
                                            .onlyOneMemberInIndividual,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                }];
                        return [4 /*yield*/, member_model_1.default.getOneToOneConversation(clinic_id_1, loggedInUser_1, membersArr[0], nowTime_1, type)];
                    case 1:
                        hasConversationBefore = _a.sent();
                        if (!hasConversationBefore.length) return [3 /*break*/, 4];
                        if (!(hasConversationBefore[0].isActive == false)) return [3 /*break*/, 3];
                        return [4 /*yield*/, member_model_1.default.findByIdAndUpdate(hasConversationBefore[0]._id, { isActive: true })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        hasConversationBefore[0].name = req.body.name;
                        hasConversationBefore[0].image = req.body.image
                            ? req.body.image
                            : null;
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: hasConversationBefore[0],
                            }];
                    case 4:
                        conversationObj = {
                            type: type,
                            clinic_id: clinic_id_1,
                            admin_id: loggedInUser_1,
                        };
                        if (type == conversation_model_1.ECONVERSATION_TYPES.GROUP) {
                            conversationObj.name = req.body.name;
                            conversationObj.image = req.body.image;
                            conversationObj.totalMember = validateArr.length;
                        }
                        return [4 /*yield*/, conversation_model_1.default.create(conversationObj)];
                    case 5:
                        conversationResult_1 = _a.sent();
                        insertArr = membersArr.map(function (el) { return ({
                            clearTime: nowTime_1,
                            user_id: el,
                            clinic_id: clinic_id_1,
                            addedby_id: loggedInUser_1,
                            conversation_id: conversationResult_1._id,
                        }); });
                        insertArr.push({
                            clearTime: nowTime_1,
                            user_id: loggedInUser_1,
                            clinic_id: clinic_id_1,
                            addedby_id: loggedInUser_1,
                            conversation_id: conversationResult_1._id,
                            isAdmin: true,
                        });
                        return [4 /*yield*/, member_model_1.default.insertMany(insertArr)];
                    case 6:
                        _a.sent();
                        conversation_io_service_1.default.chatEventEmiter(erros_message_1.default.socketEvents.chat
                            .newConversationStarted, validateArr, { conversation_id: conversationResult_1._id });
                        finalObjToBeReturn = {
                            name: name,
                            unReadMsg: 0,
                            lastMessages: [],
                            isMuted: false,
                            isBlocked: false,
                            conversation_id: conversationResult_1._id,
                            totalMember: conversationResult_1.totalMember,
                        };
                        finalObjToBeReturn.type = type;
                        image
                            ? (finalObjToBeReturn.image = image)
                            : (finalObjToBeReturn.image = null);
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: finalObjToBeReturn,
                            }];
                    case 7:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.getConversationDetailsAfterNewMsg = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, loggedInUser, sender_id, conversation_id, clinic_id, message_id, 
            // sender_id,
            nowTime, convOpened, conversationType, roleTitle, conversationData, memberData, finalObjToBeReturn, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        userDetails = req.user;
                        loggedInUser = userDetails._id;
                        sender_id = userDetails._id;
                        conversation_id = model.conversation_id, clinic_id = model.clinic_id, message_id = model.message_id, nowTime = model.nowTime, convOpened = model.convOpened, conversationType = model.conversationType, roleTitle = model.roleTitle;
                        return [4 /*yield*/, conversation_model_1.default.getConversationDetailsAfterNewMsg(conversation_id, loggedInUser, clinic_id, conversationType, roleTitle)];
                    case 1:
                        conversationData = _a.sent();
                        console.log(model, "conversationData");
                        if (!conversationData.length)
                            return [2 /*return*/, {
                                    status_code: erros_message_1.default.socketCodes.convNotFound,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.conversationMsg.convNotFound,
                                        error: erros_message_1.default.ON_UPDATE_ERROR,
                                    },
                                }];
                        conversationData = conversationData[0];
                        memberData = conversationData.memberData;
                        console.log("conversationData  ", conversationData);
                        finalObjToBeReturn = {
                            sender_id: sender_id,
                            conversation_id: conversation_id,
                            type: conversationType,
                            isBlocked: memberData.isBlocked,
                            isMuted: memberData.isMuted,
                            lastMessages: memberData.messagesData.lastMessages,
                            unReadMsg: !convOpened
                                ? memberData.messagesData.unReadMsg
                                : 0,
                        };
                        if (conversationData.type == conversation_model_1.ECONVERSATION_TYPES.GROUP) {
                            if (!memberData)
                                return [2 /*return*/, {
                                        status_code: erros_message_1.default.socketCodes.uRNotMember,
                                        success: false,
                                        data: {
                                            message: erros_message_1.default.conversationMsg.uRNotMember,
                                            error: erros_message_1.default.ON_UPDATE_ERROR,
                                        },
                                    }];
                            finalObjToBeReturn.name = conversationData.name;
                            finalObjToBeReturn.image = conversationData.image;
                            finalObjToBeReturn.totalMember =
                                conversationData.totalMember;
                            // if (conversationData.setting.message && !memberData.isAdmin) return res.json(Response(constants.socketCodes.onlyAdminMsg, constants.conversationMsg.onlyAdminMsg, finalObjToBeReturn))
                        }
                        else if (conversationType == conversation_model_1.ECONVERSATION_TYPES.INDIVIDUAL) {
                            finalObjToBeReturn.name =
                                conversationData.friendData.first_name +
                                    " " +
                                    conversationData.friendData.last_name;
                            finalObjToBeReturn.image =
                                conversationData.friendData.image;
                        }
                        else if (conversationType == conversation_model_1.ECONVERSATION_TYPES.PATIENT) {
                            if (roleTitle != erros_message_1.default.rolename.PATIENT)
                                finalObjToBeReturn.name =
                                    common_methods_1.default.getDecryptText(conversationData.friendData.first_name) +
                                        " " +
                                        common_methods_1.default.getDecryptText(conversationData.friendData.last_name);
                            else
                                finalObjToBeReturn.name =
                                    conversationData.friendData.first_name +
                                        " " +
                                        conversationData.friendData.last_name;
                            finalObjToBeReturn.image =
                                conversationData.friendData.image;
                        }
                        if (!(convOpened == true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, message_model_1.default.findByIdAndUpdate(message_id, {
                                $addToSet: {
                                    readByRecipients: {
                                        readByUserId: new mongoose_1.default.Types.ObjectId(loggedInUser) /*,readAt: nowTime*/,
                                    },
                                },
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.OK,
                            success: true,
                            data: finalObjToBeReturn,
                        }];
                    case 4:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        // getMessages = async (
        //   req: Request,
        //   model: GetMessageViewmodel,
        //   next: NextFunction
        // ): Promise<IServiceResult1 | void> => {
        //   try {
        //     let userDetails = <DocumentType<User>>req.user;
        //     let loggedInUser = userDetails!._id;
        //     const count =
        //       model.pageSize && model.pageSize < 100
        //         ? req.body.pageSize
        //         : 50;
        //     req.body.page = model.pageNumber
        //       ? model.pageNumber
        //       : 1;
        //     const skip = count * (req.body.page - 1);
        //     const {
        //       clinic_id,
        //       conversationType,
        //       conversation_id,
        //       nowTime,
        //       roleTitle,
        //     } = model;
        //     const memberCond = {
        //         user_id: new mongoose.Types.ObjectId(
        //           loggedInUser
        //         ),
        //         clinic_id: clinic_id,
        //         conversation_id: conversation_id,
        //       },
        //       readMessageCond = {
        //         clinic_id: clinic_id,
        //         conversation_id: conversation_id,
        //       };
        //     const friendCollection =
        //         roleTitle != errorMessage.rolename.PATIENT &&
        //         conversationType == ECONVERSATION_TYPES.PATIENT
        //           ? "patients"
        //           : "users";
        //    const   allMessages :any= [
        //         {
        //           $lookup: {
        //             from: friendCollection,
        //             let: { user_id: "$sender_id" },
        //             pipeline: [
        //               {
        //                 $match: {
        //                   $expr: { $eq: ["$_id", "$$user_id"] },
        //                 },
        //               },
        //               {
        //                 $project: {
        //                   first_name: 1,
        //                   last_name: 1,
        //                   image: 1,
        //                 },
        //               },
        //             ],
        //             as: "userData",
        //           },
        //         },
        //         {
        //           $unwind: {
        //             path: "$userData",
        //             preserveNullAndEmptyArrays: true,
        //           },
        //         },
        //         {
        //           $project: {
        //             _id: 0,
        //             message_id: "$_id",
        //             sender_id: "$sender_id",
        //             message: "$message",
        //             msgTime: "$msgTime",
        //             userData: 1,
        //             document: 1,
        //           },
        //         },
        //         { $sort: { msgTime: -1 } },
        //         { $limit: skip + count },
        //         { $skip: skip },
        //         { $sort: { msgTime: 1 } },
        //       ];
        //     // console.log('friendCollection  ', friendCollection)
        //     const data = await MembersModel.aggregate([
        //       { $match: memberCond },
        //       {
        //         $lookup: {
        //           from: "conversations",
        //           let: { conversation_id: "$conversation_id" },
        //           pipeline: [
        //             {
        //               $match: {
        //                 clinic_id: new mongoose.Types.ObjectId(
        //                   clinic_id!.toString()
        //                 ),
        //                 $expr: {
        //                   $eq: ["$_id", "$$conversation_id"],
        //                 },
        //               },
        //             },
        //           ],
        //           as: "conversationData",
        //         },
        //       },
        //       { $unwind: { path: "$conversationData" } },
        //       {
        //         $lookup: {
        //           from: "messages",
        //           let: {
        //             conversation_id: "$conversation_id",
        //             clearTime: "$clearTime",
        //           },
        //           pipeline: [
        //             {
        //               $match: {
        //                 clinic_id: new mongoose.Types.ObjectId(
        //                   clinic_id!.toString()
        //                 ),
        //                 $expr: {
        //                   $and: [
        //                     { $gte: ["$msgTime", "$$clearTime"] },
        //                     {
        //                       $eq: [
        //                         "$conversation_id",
        //                         "$$conversation_id",
        //                       ],
        //                     },
        //                   ],
        //                 },
        //                 $or: [
        //                   { onlySender: false },
        //                   {
        //                     onlySender: true,
        //                     sender_id:
        //                       new mongoose.Types.ObjectId(
        //                         loggedInUser.toString()
        //                       ),
        //                   },
        //                 ],
        //               },
        //             },
        //             {
        //               $facet: {
        //                 totalMsg: [{ $count: "sum" }],
        //                 allMessages,
        //               },
        //             },
        //             {
        //               $unwind: {
        //                 path: "$totalMsg",
        //                 preserveNullAndEmptyArrays: true,
        //               },
        //             },
        //             {
        //               $project: {
        //                 allMessages: 1,
        //                 totalMsg: {
        //                   $cond: {
        //                     if: { $gt: ["$totalMsg.sum", 0] },
        //                     then: "$totalMsg.sum",
        //                     else: 0,
        //                   },
        //                 },
        //               },
        //             },
        //           ],
        //           as: "messagesData",
        //         },
        //       },
        //       {
        //         $unwind: {
        //           path: "$messagesData",
        //           preserveNullAndEmptyArrays: true,
        //         },
        //       },
        //       {
        //         $project: {
        //           _id: 0,
        //           isMuted: 1,
        //           isAdmin: 1,
        //           user_id: 1,
        //           clinic_id: 1,
        //           addedby_id: 1,
        //           messagesData: 1,
        //           conversation_id: 1,
        //           onlyAdminCanMessage:
        //             "$conversationData.setting.message",
        //         },
        //       },
        //     ]);
        //     if (!data.length)
        //       return res.json(
        //         Response(
        //           constants.statusCode.unauth,
        //           constants.messages.noRecordFound
        //         )
        //       );
        //     await MessageModel.updateMany(
        //       {
        //         ...readMessageCond,
        //         "readByRecipients.readByUserId": {
        //           $ne: new mongoose.Types.ObjectId(
        //             loggedInUser.toString()
        //           ),
        //         },
        //       },
        //       {
        //         $addToSet: {
        //           readByRecipients: {
        //             readByUserId: new mongoose.Types.ObjectId(
        //               loggedInUser.toString()
        //             ) /*,readAt: nowTime*/,
        //           },
        //         },
        //       },
        //       { multi: true }
        //     );
        //     // if (friendCollection == 'patients') {
        //     //   data[0].messagesData.allMessages.forEach((el) => {
        //     //     console.log(el)
        //     //     // el.userData.firstName = utility.getDecryptText(el.userData.firstName)
        //     //     // el.userData.lastName = utility.getDecryptText(el.userData.lastName)
        //     //   })
        //     // }
        //     let finalObjToBeReturn = {
        //       data: data[0],
        //       // count: result.totalDocs,
        //       totalDocs: data[0].messagesData.totalMsg,
        //       // pageNumber: req.body.page,
        //       // pageSize: count,
        //       // totalPages: Math.ceil(
        //       //   data[0].aggregatedData.length / count
        //       // ),
        //     };
        //     return {
        //       status_code: HttpStatus.OK,
        //       success: true,
        //       data: finalObjToBeReturn,
        //     };
        //   } catch (error) {
        //     next(error);
        //   }
        // };
    }
    return ConversationServices;
}());
exports.default = new ConversationServices();
