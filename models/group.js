"use strict";
exports.__esModule = true;
var database_1 = require("./database");
var Sequelize = require("sequelize");
// Define the 'Cart' model
var Group = database_1["default"].define("Group", {
    groupId: Sequelize.STRING,
    name: Sequelize.STRING
});
exports["default"] = Group;
