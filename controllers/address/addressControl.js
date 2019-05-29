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
var address_1 = require("../../models/address");
var baseControl_1 = require("./baseControl");
var AddressControl = /** @class */ (function (_super) {
    __extends(AddressControl, _super);
    function AddressControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = address_1["default"];
        return _this;
    }
    return AddressControl;
}(baseControl_1["default"]));
exports["default"] = AddressControl;
