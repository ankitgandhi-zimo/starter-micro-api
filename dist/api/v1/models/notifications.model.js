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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var mongoose_1 = __importDefault(require("mongoose"));
var pagination_configuration_1 = require("../common/pagination/pagination_configuration");
var user_model_1 = require("./user.model");
var ReadByRecipientSchemaObject = /** @class */ (function () {
    function ReadByRecipientSchemaObject() {
    }
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User }),
        __metadata("design:type", Object)
    ], ReadByRecipientSchemaObject.prototype, "reader_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Date, default: new Date() }),
        __metadata("design:type", Date)
    ], ReadByRecipientSchemaObject.prototype, "readAt", void 0);
    return ReadByRecipientSchemaObject;
}());
var Notification = /** @class */ (function (_super) {
    __extends(Notification, _super);
    function Notification() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Notification.prototype, "title", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }),
        __metadata("design:type", String)
    ], Notification.prototype, "type", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User }) // Notification creator
        ,
        __metadata("design:type", Object)
    ], Notification.prototype, "sender", void 0);
    __decorate([
        (0, typegoose_1.prop)({ ref: user_model_1.User }) // Ids of the receivers of the notification
        ,
        __metadata("design:type", Object)
    ], Notification.prototype, "receiver", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: String, default: null }) // any description of the notification message
        ,
        __metadata("design:type", String)
    ], Notification.prototype, "message", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], Notification.prototype, "deleted", void 0);
    __decorate([
        (0, typegoose_1.prop)({ type: mongoose_1.default.Schema.Types.ObjectId }) // Ids of the receivers of the notification
        ,
        __metadata("design:type", mongoose_1.default.Schema.Types.ObjectId)
    ], Notification.prototype, "type_id", void 0);
    __decorate([
        (0, typegoose_1.prop)({ _id: false }),
        __metadata("design:type", ReadByRecipientSchemaObject)
    ], Notification.prototype, "readBy", void 0);
    Notification = __decorate([
        (0, typegoose_1.index)({ title: "text" })
    ], Notification);
    return Notification;
}(pagination_configuration_1.PaginatedModel));
exports.Notification = Notification;
var NOTIFICATION_DB_MODEL = (0, typegoose_1.getModelForClass)(Notification, {
    schemaOptions: {
        collection: "notifications",
        timestamps: true,
    },
});
exports.default = NOTIFICATION_DB_MODEL;
