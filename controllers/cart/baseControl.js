"use strict";
exports.__esModule = true;
var parseJwt = function (token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var data = JSON.parse(Buffer.from(base64, "base64").toString("binary"));
    if (data.user.userRole === "admin" ||
        data.user.userRole === "customer" ||
        data.user.userRole === "support") {
        return true;
    }
    return false;
};
var BaseControl = /** @class */ (function () {
    function BaseControl() {
        var _this = this;
        // Get all
        this.getAll = function (req, res) {
            if (!parseJwt(req.headers.authorization)) {
                return res.status(403).json({ error: "No credentials sent!" });
            }
            _this.model
                .findAll()
                .then(function (data, err) {
                if (err) {
                    return console.error(err);
                }
                res.status(200).json(data);
            })["catch"](function (err) {
                if (err) {
                    res.sendStatus(400);
                }
            });
        };
        // Get by id
        this.get = function (req, res) {
            if (!parseJwt(req.headers.authorization)) {
                return res.status(403).json({ error: "No credentials sent!" });
            }
            _this.model
                .findOne({ where: { customerId: req.params.id } })
                .then(function (cartData, err) {
                if (!cartData) {
                    return res.sendStatus(403);
                }
                if (err) {
                    return res.sendStatus(400);
                }
                var data = {
                    cartId: cartData.dataValues.cartId,
                    productList: cartData.dataValues.productList
                };
                res.status(200).json(data);
            })["catch"](function (err) {
                if (err) {
                    res.sendStatus(400);
                }
            });
        };
        // Insert
        this.insert = function (req, res) {
            if (!parseJwt(req.headers.authorization)) {
                return res.status(403).json({ error: "No credentials sent!" });
            }
            var obj = new _this.model(req.body);
            _this.model
                .findOne({ where: { customerId: req.body.customerId } })
                .then(function (cartData, err) {
                if (cartData) {
                    return res.sendStatus(400);
                }
                if (err) {
                    return res.sendStatus(400);
                }
                obj.save().then(function (item, err) {
                    if (err && err.code === 11000) {
                        return res.sendStatus(400);
                    }
                    res.status(200).json("OK");
                });
            })["catch"](function (err) {
                if (err) {
                    res.sendStatus(400);
                }
            });
        };
        // Update by id
        this.update = function (req, res) {
            if (!parseJwt(req.headers.authorization)) {
                return res.status(403).json({ error: "No credentials sent!" });
            }
            _this.model
                .update({
                productList: req.body.productList
            }, { where: { customerId: req.body.customerId } })
                .then(function (result) {
                if (result[0] == 0) {
                    res.sendStatus(400);
                }
                else {
                    res.status(200).json("OK");
                }
            })["catch"](function (err) {
                if (err) {
                    res.sendStatus(400);
                }
            });
        };
    }
    return BaseControl;
}());
exports["default"] = BaseControl;
