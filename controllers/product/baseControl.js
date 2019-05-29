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
                // .sort({ productPrice: -1 })
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
            _this.model
                .findOne({ where: { productId: req.params.id } })
                .then(function (product, err) {
                if (!product) {
                    return res.sendStatus(403);
                }
                if (err) {
                    return res.sendStatus(400);
                }
                var data = {
                    productId: product.dataValues.productId,
                    relatedProductId: product.dataValues.relatedProductId,
                    name: product.dataValues.name,
                    description: product.dataValues.description,
                    stock: product.dataValues.stock,
                    frameColor: product.dataValues.frameColor,
                    frameColorName: product.dataValues.frameColorName,
                    firstImage: product.dataValues.firstImage,
                    secondImage: product.dataValues.secondImage,
                    thirdImage: product.dataValues.thirdImage,
                    fourthImage: product.dataValues.fourthImage,
                    fifthImage: product.dataValues.fifthImage,
                    sixthImage: product.dataValues.sixthImage,
                    price: product.dataValues.price,
                    discountPrice: product.dataValues.discountPrice,
                    size: product.dataValues.size,
                    isFeatured: product.dataValues.isFeatured,
                    category: product.dataValues.category,
                    isDisabled: product.dataValues.isDisabled
                };
                res.status(200).json(data);
            })["catch"](function (err) {
                if (err) {
                    res.sendStatus(400);
                }
            });
        };
        // Get by id
        this.getSimilarProduct = function (req, res) {
            _this.model
                .findOne({ where: { relatedProductId: req.params.id } })
                .then(function (product, err) {
                if (!product) {
                    return res.sendStatus(403);
                }
                if (err) {
                    return res.sendStatus(400);
                }
                var data = {
                    productId: product.dataValues.productId,
                    name: product.dataValues.name,
                    description: product.dataValues.description,
                    stock: product.dataValues.stock,
                    frameColor: product.dataValues.frameColor,
                    frameColorName: product.dataValues.frameColorName,
                    firstImage: product.dataValues.firstImage,
                    secondImage: product.dataValues.secondImage,
                    thirdImage: product.dataValues.thirdImage,
                    fourthImage: product.dataValues.fourthImage,
                    fifthImage: product.dataValues.fifthImage,
                    sixthImage: product.dataValues.sixthImage,
                    price: product.dataValues.price,
                    discountPrice: product.dataValues.discountPrice,
                    size: product.dataValues.size,
                    isFeatured: product.dataValues.isFeatured,
                    category: product.dataValues.category,
                    isDisabled: product.dataValues.isDisabled
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
                .findOne({ where: { productId: req.body.productId } })
                .then(function (product, err) {
                if (product) {
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
                name: req.body.name,
                description: req.body.description,
                stock: req.body.stock,
                frameColor: req.body.frameColor,
                frameColorName: req.body.frameColorName,
                firstImage: req.body.firstImage,
                secondImage: req.body.secondImage,
                thirdImage: req.body.thirdImage,
                fourthImage: req.body.fourthImage,
                fifthImage: req.body.fifthImage,
                sixthImage: req.body.sixthImage,
                price: req.body.price,
                discountPrice: req.body.discountPrice,
                size: req.body.size,
                category: req.body.category
            }, { where: { productId: req.body.productId } })
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
        // Update by Id for Featured
        this.featureUpdate = function (req, res) {
            if (!parseJwt(req.headers.authorization)) {
                return res.status(403).json({ error: "No credentials sent!" });
            }
            _this.model
                .update({
                isFeatured: req.body.isFeatured
            }, { where: { productId: req.body.productId } })
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
        // Update by Id for Featured
        this.disableProduct = function (req, res) {
            if (!parseJwt(req.headers.authorization)) {
                return res.status(403).json({ error: "No credentials sent!" });
            }
            _this.model
                .update({
                isDisabled: req.body.isDisabled
            }, { where: { productId: req.body.productId } })
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
                where: { productId: req.params.id }
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
