"use strict";
exports.__esModule = true;
var database_1 = require("./database");
var Sequelize = require("sequelize");
// Define the 'Address' model
var Address = database_1["default"].define("Address", {
    addressId: Sequelize.STRING,
    customerId: Sequelize.STRING,
    name: Sequelize.STRING,
    addressLineOne: Sequelize.STRING,
    addressLineTwo: Sequelize.STRING,
    addressLineThree: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    country: Sequelize.STRING,
    postCode: Sequelize.STRING,
    phoneNumber: Sequelize.STRING
});
exports["default"] = Address;
