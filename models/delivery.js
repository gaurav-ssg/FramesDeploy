"use strict";
exports.__esModule = true;
var database_1 = require("./database");
var Sequelize = require("sequelize");
// Define the 'Delivery' model
var DeliveryCharges = database_1["default"].define("DeliveryCharges", {
    dcId: Sequelize.STRING,
    amount: Sequelize.STRING,
    limit: Sequelize.STRING
});
exports["default"] = DeliveryCharges;
