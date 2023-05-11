"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToBoolean = exports.Default = void 0;
var class_transformer_1 = require("class-transformer");
function Default(defaultValue) {
    return (0, class_transformer_1.Transform)(function (value) {
        return value !== null && value !== undefined ? value : defaultValue;
    });
}
exports.Default = Default;
function ToBoolean() {
    return (0, class_transformer_1.Transform)(function (value) {
        return value === "true" || value === true || value === 1 || value === "1";
    });
}
exports.ToBoolean = ToBoolean;
