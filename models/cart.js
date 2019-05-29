"use strict";
exports.__esModule = true;
var database_1 = require("./database");
var Sequelize = require("sequelize");
// Define the 'Cart' model
var Cart = database_1["default"].define("Cart", {
    cartId: Sequelize.STRING,
    customerId: Sequelize.STRING,
    productList: Sequelize.TEXT
});
exports["default"] = Cart;
