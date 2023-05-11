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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messages = exports.EChatMessageType = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var pagination_configuration_1 = require("../../common/pagination/pagination_configuration");
var user_model_1 = require("../user.model");
var EChatMessageType;
(function (EChatMessageType) {
    EChatMessageType[EChatMessageType["DOC"] = 0] = "DOC";
    EChatMessageType[EChatMessageType["IMAGE"] = 1] = "IMAGE";
    EChatMessageType[EChatMessageType["WORD"] = 2] = "WORD";
    EChatMessageType[EChatMessageType["PDF"] = 3] = "PDF";
    EChatMessageType[EChatMessageType["TEXT"] = 4] = "TEXT";
    EChatMessageType[EChatMessageType["INFO"] = 5] = "INFO";
    EChatMessageType[EChatMessageType["REMOVE"] = 6] = "REMOVE";
    EChatMessageType[EChatMessageType["ADD"] = 7] = "ADD";
    EChatMessageType[EChatMessageType["LEFT"] = 8] = "LEFT";
})(EChatMessageType = exports.EChatMessageType || (exports.EChatMessageType = {}));
var ReadByRecipientSchema = /** @class */ (function () {
    function ReadByRecipientSchema() {
    }
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: Date.now() }),
        __metadata("design:type", String)
    ], ReadByRecipientSchema.prototype, "readAt", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User }),
        __metadata("design:type", Object)
    ], ReadByRecipientSchema.prototype, "readByUserId", void 0);
    ReadByRecipientSchema = __decorate([
        (0, typegoose_1.index)({ message: "text" })
    ], ReadByRecipientSchema);
    return ReadByRecipientSchema;
}());
var Messages = /** @class */ (function (_super) {
    __extends(Messages, _super);
    function Messages() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: "" }),
        __metadata("design:type", String)
    ], Messages.prototype, "message", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            type: ReadByRecipientSchema,
            default: function () { return ({}); },
            _id: false,
        }),
        __metadata("design:type", Array)
    ], Messages.prototype, "readByRecipients", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], Messages.prototype, "onlySender", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: [String], default: "" }),
        __metadata("design:type", Object)
    ], Messages.prototype, "document", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: Date.now() }),
        __metadata("design:type", String)
    ], Messages.prototype, "msgTime", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User }),
        __metadata("design:type", Object)
    ], Messages.prototype, "clinic_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User }),
        __metadata("design:type", Object)
    ], Messages.prototype, "conversation_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User }),
        __metadata("design:type", Object)
    ], Messages.prototype, "sender_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({
            enum: EChatMessageType,
            default: EChatMessageType.TEXT,
        }),
        __metadata("design:type", Number)
    ], Messages.prototype, "type", void 0);
    return Messages;
}(pagination_configuration_1.PaginatedModel));
exports.Messages = Messages;
var MESSAGES_DB_MODEL = (0, typegoose_1.getModelForClass)(Messages, {
    schemaOptions: {
        collection: "messages",
        timestamps: true,
    },
});
exports.default = MESSAGES_DB_MODEL;
