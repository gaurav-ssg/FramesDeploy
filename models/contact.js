"use strict";
exports.__esModule = true;
var database_1 = require("./database");
var Sequelize = require("sequelize");
// Define the 'Contact' model
var Contact = database_1["default"].define("Contact", {
    contactId: Sequelize.STRING,
    address: Sequelize.TEXT,
    phoneNumber: Sequelize.STRING,
    email: Sequelize.STRING,
    facebook: Sequelize.STRING,
    instagram: Sequelize.STRING,
    twitter: Sequelize.STRING,
    other: Sequelize.STRING
});
exports["default"] = Contact;
