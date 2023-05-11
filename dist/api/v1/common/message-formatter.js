"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageFormatter = void 0;
function dfs(src, dest, msg) {
    if (msg === void 0) { msg = ""; }
    var cur = msg ? "".concat(msg) : "";
    for (var _i = 0, src_1 = src; _i < src_1.length; _i++) {
        var validationError = src_1[_i];
        if (validationError.constraints) {
            for (var key in validationError.constraints) {
                if (validationError.constraints[key]) {
                    var formatProperty = cur
                        ? ".".concat(validationError.property)
                        : "".concat(validationError.property);
                    var field = isNaN(parseInt(validationError.property, 10))
                        ? formatProperty
                        : "[".concat(validationError.property, "]");
                    dest.push({
                        field: "".concat(cur).concat(field),
                        message: "".concat(validationError.constraints[key].charAt(0).toUpperCase() +
                            validationError.constraints[key].slice(1)).replace(/_/g, ' '), //capital first letter of error in uppercase and replace underscore with space 
                    });
                }
            }
        }
        if (validationError.children && validationError.children.length) {
            var formatProperty = cur
                ? ".".concat(validationError.property)
                : "".concat(validationError.property);
            var field = isNaN(parseInt(validationError.property, 10))
                ? formatProperty
                : "[".concat(validationError.property, "]");
            dfs(validationError.children, dest, "".concat(cur).concat(field));
        }
    }
}
var MessageFormatter = /** @class */ (function () {
    function MessageFormatter() {
    }
    MessageFormatter.format = function (validationErrors) {
        var dest = [];
        dfs(validationErrors, dest);
        return dest;
    };
    return MessageFormatter;
}());
exports.MessageFormatter = MessageFormatter;
// export default new MessageFormatter();
