"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mail_1 = __importDefault(require("@sendgrid/mail"));
mail_1.default.setApiKey(process.env.SEND_GRID_API_KEY
    ? process.env.SEND_GRID_API_KEY
    : " ");
var sendMessage = /** @class */ (function () {
    function sendMessage() {
        this.sendMail1 = function (obj) {
            var msg = {
                to: obj.to,
                from: "ankit.zimo@outlook.com",
                subject: obj.subject,
                text: obj.content,
            };
            mail_1.default
                .send(msg)
                .then(function () {
                console.log("Email sent");
            })
                .catch(function (error) {
                console.log(error);
            });
        };
        this.sendMailMessage = function (obj) {
            return new Promise(function (resolve, reject) {
                var msg = {
                    to: obj.to,
                    from: "ankit.zimo@outlook.com",
                    subject: obj.subject,
                    text: obj.content,
                    html: obj.html,
                };
                mail_1.default
                    .send(msg)
                    .then(function (data) {
                    resolve(data);
                })
                    .catch(function (error) {
                    reject(error);
                });
            })
                .then(function (result) {
                return true;
            })
                .catch(function (error) {
                return false;
            });
        };
    }
    return sendMessage;
}());
exports.default = new sendMessage();
