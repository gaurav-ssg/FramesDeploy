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
var delivery_1 = require("../../models/delivery");
var baseCtrl_1 = require("./baseCtrl");
var DCControl = /** @class */ (function (_super) {
    __extends(DCControl, _super);
    function DCControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = delivery_1["default"];
        return _this;
    }
    return DCControl;
}(baseCtrl_1["default"]));
exports["default"] = DCControl;
