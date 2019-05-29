"use strict";
exports.__esModule = true;
var database_1 = require("./database");
var Sequelize = require("sequelize");
// Define the 'Order' model
var Order = database_1["default"].define("Order", {
    orderId: Sequelize.STRING,
    customerId: Sequelize.STRING,
    productDetails: Sequelize.TEXT,
    shippingAddress: Sequelize.TEXT,
    billingAddress: Sequelize.TEXT,
    price: Sequelize.STRING,
    status: Sequelize.STRING,
    paymentMode: Sequelize.STRING,
    purchaseDateTime: Sequelize.STRING,
    allData: Sequelize.TEXT
});
exports["default"] = Order;
