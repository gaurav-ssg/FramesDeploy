"use strict";
exports.__esModule = true;
var database_1 = require("./database");
var Sequelize = require("sequelize");
// Define the 'FooterContent' model
var FooterContent = database_1["default"].define("FooterContent", {
    contentId: Sequelize.STRING,
    contentFor: Sequelize.STRING,
    content: Sequelize.TEXT
});
exports["default"] = FooterContent;
