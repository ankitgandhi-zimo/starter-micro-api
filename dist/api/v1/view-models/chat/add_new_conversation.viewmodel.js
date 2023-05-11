"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNewConversationInChatViewmodel = exports.EChatActionValues = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var erros_message_1 = __importDefault(require("../../common/erros_message"));
var conversation_model_1 = require("../../models/chat/conversation.model");
var EChatActionValues;
(function (EChatActionValues) {
    EChatActionValues["BLOCK"] = "BLOCK";
    EChatActionValues["UNBLOCK"] = "UN-BLOCK";
})(EChatActionValues = exports.EChatActionValues || (exports.EChatActionValues = {}));
var AddNewConversationInChatViewmodel = /** @class */ (function () {
    function AddNewConversationInChatViewmodel() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], AddNewConversationInChatViewmodel.prototype, "clinic_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return typegoose_1.mongoose.Types.ObjectId; }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Object)
    ], AddNewConversationInChatViewmodel.prototype, "conversation_id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsEnum)(conversation_model_1.ECONVERSATION_TYPES, {
            message: "type value can be one of them i.e. INDIVIDUAL,GROUP,PATIENT",
        }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddNewConversationInChatViewmodel.prototype, "type", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; }),
        (0, class_validator_1.IsDate)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddNewConversationInChatViewmodel.prototype, "nowTime", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddNewConversationInChatViewmodel.prototype, "name", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AddNewConversationInChatViewmodel.prototype, "image", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; }),
        (0, class_validator_1.IsMongoId)({ each: true }),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ArrayNotEmpty)(),
        (0, class_validator_1.ArrayMinSize)(1),
        (0, class_validator_1.ArrayMaxSize)(erros_message_1.default.conversationMsg.limit, {
            message: erros_message_1.default.conversationMsg.limitExceed(erros_message_1.default.conversationMsg.limit),
        }),
        (0, class_validator_1.IsDefined)(),
        (0, class_validator_1.IsNotEmpty)({ each: true }),
        __metadata("design:type", Array)
    ], AddNewConversationInChatViewmodel.prototype, "membersArr", void 0);
    return AddNewConversationInChatViewmodel;
}());
exports.AddNewConversationInChatViewmodel = AddNewConversationInChatViewmodel;
