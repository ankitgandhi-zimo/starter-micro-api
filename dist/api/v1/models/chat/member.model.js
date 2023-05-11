"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var mongoose_1 = __importDefault(require("mongoose"));
var pagination_configuration_1 = require("../../common/pagination/pagination_configuration");
var user_model_1 = require("../user.model");
var conversation_model_1 = require("./conversation.model");
var Member = /** @class */ (function (_super) {
    __extends(Member, _super);
    function Member() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Member.getConversationIds = function (loggedInUser, clinic_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.find({
                        user_id: new mongoose_1.default.Types.ObjectId(loggedInUser),
                        clinic_id: new mongoose_1.default.Types.ObjectId(clinic_id),
                    }).distinct("conversation_id")];
            });
        });
    };
    Member.getOneToOneConversation = function (loggedInUser, clinic_id, friend_id, nowTime, type) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.aggregate([
                        {
                            $match: {
                                user_id: new mongoose_1.default.Types.ObjectId(loggedInUser),
                                clinic_id: new mongoose_1.default.Types.ObjectId(clinic_id),
                            },
                        },
                        {
                            $lookup: {
                                from: "members",
                                let: { conversation_id: "$conversation_id" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: [
                                                    "$conversation_id",
                                                    "$$conversation_id",
                                                ],
                                            },
                                            user_id: new mongoose_1.default.Types.ObjectId(friend_id),
                                            clinic_id: new mongoose_1.default.Types.ObjectId(clinic_id),
                                        },
                                    },
                                ],
                                as: "exist",
                            },
                        },
                        {
                            $match: {
                                $expr: { $gt: [{ $size: "$exist" }, 0] },
                            },
                        },
                        {
                            $lookup: {
                                from: "conversations",
                                let: { conversation_id: "$conversation_id" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ["$_id", "$$conversation_id"],
                                            },
                                        },
                                    },
                                ],
                                as: "conversationData",
                            },
                        },
                        {
                            $unwind: {
                                path: "$conversationData",
                                preserveNullAndEmptyArrays: true,
                            },
                        },
                        { $match: { "conversationData.type": type } },
                        {
                            $lookup: {
                                from: "users",
                                pipeline: [
                                    {
                                        $match: {
                                            _id: new mongoose_1.default.Types.ObjectId(friend_id),
                                            invitedby_id: new mongoose_1.default.Types.ObjectId(clinic_id),
                                        },
                                    },
                                    {
                                        $project: {
                                            // firstName: 1,
                                            // lastName: 1,
                                            first_name: 1,
                                            last_name: 1,
                                            image: 1,
                                        },
                                    },
                                ],
                                as: "friendData",
                            },
                        },
                        {
                            $unwind: {
                                path: "$friendData",
                                preserveNullAndEmptyArrays: true,
                            },
                        },
                        {
                            $lookup: {
                                from: "messages",
                                let: {
                                    conversation_id: "$conversation_id",
                                    clearTime: "$clearTime",
                                },
                                pipeline: [
                                    {
                                        $match: {
                                            clinic_id: new mongoose_1.default.Types.ObjectId(clinic_id),
                                            $expr: {
                                                $and: [
                                                    { $gte: ["$msgTime", "$$clearTime"] },
                                                    {
                                                        $gte: [
                                                            "$conversation_id",
                                                            "$$conversation_id",
                                                        ],
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                    {
                                        $facet: {
                                            unReadMsg: [
                                                {
                                                    $match: {
                                                        "readByRecipients.readByUserId": {
                                                            $ne: new mongoose_1.default.Types.ObjectId(loggedInUser),
                                                        },
                                                    },
                                                },
                                                { $count: "sum" },
                                            ],
                                            lastMessages: [
                                                {
                                                    $project: {
                                                        message: 1,
                                                        msgTime: 1,
                                                        clearTime: "$$clearTime",
                                                    },
                                                },
                                                { $sort: { _id: -1 } },
                                                { $limit: 1 },
                                            ],
                                        },
                                    },
                                    {
                                        $unwind: {
                                            path: "$unReadMsg",
                                            preserveNullAndEmptyArrays: true,
                                        },
                                    },
                                    {
                                        $project: {
                                            lastMessages: 1,
                                            unReadMsg: {
                                                $cond: {
                                                    if: { $gt: ["$unReadMsg.sum", 0] },
                                                    then: "$unReadMsg.sum",
                                                    else: 0,
                                                },
                                            },
                                        },
                                    },
                                ],
                                as: "messagesData",
                            },
                        },
                        {
                            $unwind: {
                                path: "$messagesData",
                                preserveNullAndEmptyArrays: true,
                            },
                        },
                        {
                            $project: {
                                // _id: 0,
                                isMuted: 1,
                                isActive: 1,
                                isBlocked: 1,
                                // friendData: '$friendData',
                                image: "$friendData.image",
                                // messagesData: '$messagesData',
                                type: "$conversationData.type",
                                conversation_id: "$conversation_id",
                                unReadMsg: "$messagesData.unReadMsg",
                                lastMessages: "$messagesData.lastMessages",
                                name: {
                                    $concat: [
                                        "$friendData.first_name",
                                        " ",
                                        "$friendData.last_name",
                                    ],
                                },
                            },
                        },
                    ])];
            });
        });
    };
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], Member.prototype, "isMuted", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], Member.prototype, "isAdmin", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: true }),
        __metadata("design:type", Boolean)
    ], Member.prototype, "isActive", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], Member.prototype, "isBlocked", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: Date.now() }),
        __metadata("design:type", String)
    ], Member.prototype, "clearTime", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User }),
        __metadata("design:type", Object)
    ], Member.prototype, "user_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User }),
        __metadata("design:type", Object)
    ], Member.prototype, "clinic_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User }),
        __metadata("design:type", Object)
    ], Member.prototype, "addedby_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: conversation_model_1.Conversation }),
        __metadata("design:type", Object)
    ], Member.prototype, "conversation_id", void 0);
    return Member;
}(pagination_configuration_1.PaginatedModel));
exports.Member = Member;
var MEMBER_DB_MODEL = (0, typegoose_1.getModelForClass)(Member, {
    schemaOptions: {
        collection: "member",
        timestamps: true,
    },
});
exports.default = MEMBER_DB_MODEL;
