"use strict";
exports.__esModule = true;
var database_1 = require("./database");
var Sequelize = require("sequelize");
// Define the 'Product' model
var Product = database_1["default"].define("Product", {
    productId: Sequelize.STRING,
    relatedProductId: Sequelize.STRING,
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
    stock: Sequelize.STRING,
    category: Sequelize.STRING,
    isDisabled: Sequelize.BOOLEAN,
    frameColor: Sequelize.STRING,
    frameColorName: Sequelize.STRING,
    firstImage: Sequelize.TEXT,
    secondImage: Sequelize.TEXT,
    thirdImage: Sequelize.TEXT,
    fourthImage: Sequelize.TEXT,
    fifthImage: Sequelize.TEXT,
    sixthImage: Sequelize.TEXT,
    price: Sequelize.STRING,
    discountPrice: Sequelize.STRING,
    size: Sequelize.TEXT,
    isFeatured: Sequelize.STRING
});
exports["default"] = Product;
