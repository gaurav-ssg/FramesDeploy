"use strict";
exports.__esModule = true;
var database_1 = require("./database");
var Sequelize = require("sequelize");
// Define the 'HeaderImages' model
var HeaderImages = database_1["default"].define("HeaderImages", {
    headerId: Sequelize.STRING,
    firstImage: Sequelize.TEXT,
    firstHeading: Sequelize.STRING,
    firstDescription: Sequelize.TEXT,
    secondImage: Sequelize.TEXT,
    secondHeading: Sequelize.STRING,
    secondDescription: Sequelize.TEXT,
    thirdImage: Sequelize.TEXT,
    thirdHeading: Sequelize.STRING,
    thirdDescription: Sequelize.TEXT,
    fourthImage: Sequelize.TEXT,
    fourthHeading: Sequelize.STRING,
    fourthDescription: Sequelize.TEXT,
    fifthImage: Sequelize.TEXT,
    fifthHeading: Sequelize.STRING,
    fifthDescription: Sequelize.TEXT
});
exports["default"] = HeaderImages;
