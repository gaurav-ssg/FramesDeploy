"use strict";
exports.__esModule = true;
var parseJwt = function (token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var data = JSON.parse(Buffer.from(base64, "base64").toString("binary"));
    if (data.user.userRole === "admin") {
        return true;
    }
    return false;
};
var BaseControl = /** @class */ (function () {
    function BaseControl() {
        var _this = this;
        // Get all
        this.getAll = function (req, res) {
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
        // Insert
        this.insert = function (req, res) {
            if (!parseJwt(req.headers.authorization)) {
                return res.status(403).json({ error: "No credentials sent!" });
            }
            var obj = new _this.model(req.body);
            _this.model
                .findOne({ where: { contentFor: req.body.contentFor } })
                .then(function (contentData, err) {
                if (contentData) {
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
                content: req.body.content
            }, { where: { contentId: req.body.contentId } })
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
        // Delete by id
        this["delete"] = function (req, res) {
            if (!parseJwt(req.headers.authorization)) {
                return res.status(403).json({ error: "No credentials sent!" });
            }
            _this.model
                .destroy({
                where: { contentId: req.params.id }
            }, function (err) {
                if (err) {
                    return console.error(err);
                }
            })
                .then(function (result) {
                res.status(200).json("OK");
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
