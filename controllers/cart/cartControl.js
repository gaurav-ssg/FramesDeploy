"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var cart_1 = require("../../models/cart");
var baseControl_1 = require("./baseControl");
var CartControl = /** @class */ (function (_super) {
    __extends(CartControl, _super);
    function CartControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = cart_1["default"];
        return _this;
    }
    return CartControl;
}(baseControl_1["default"]));
exports["default"] = CartControl;
