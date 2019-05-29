"use strict";
exports.__esModule = true;
var database_1 = require("./database");
var Sequelize = require("sequelize");
// Define the 'Payment' model
var Payment = database_1["default"].define("Payment", {
    paymentId: Sequelize.STRING,
    customerId: Sequelize.STRING,
    orderId: Sequelize.STRING,
    totalAmount: Sequelize.STRING,
    paymentGateway: Sequelize.STRING,
    paymentStatus: Sequelize.STRING
});
exports["default"] = Payment;
