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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayPayload = exports.GatewayOP = void 0;
var base_1 = require("./base");
var GatewayOP;
(function (GatewayOP) {
    GatewayOP[GatewayOP["HELLO"] = 1] = "HELLO";
    GatewayOP[GatewayOP["IDENTIFY"] = 2] = "IDENTIFY";
    GatewayOP[GatewayOP["READY"] = 3] = "READY";
    GatewayOP[GatewayOP["DISCONNECT"] = 4] = "DISCONNECT";
    GatewayOP[GatewayOP["EVENT"] = 5] = "EVENT";
})(GatewayOP = exports.GatewayOP || (exports.GatewayOP = {}));
var GatewayPayload = /** @class */ (function (_super) {
    __extends(GatewayPayload, _super);
    function GatewayPayload() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GatewayPayload;
}(base_1.Base));
exports.GatewayPayload = GatewayPayload;
