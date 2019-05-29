"use strict";
exports.__esModule = true;
var database_1 = require("./database");
var Sequelize = require("sequelize");
// Define the 'FooterImages' model
var FooterImages = database_1["default"].define("PromotionImage", {
    imageId: Sequelize.STRING,
    image: Sequelize.TEXT,
    heading: Sequelize.STRING,
    description: Sequelize.STRING,
    buttonStatus: Sequelize.BOOLEAN,
    link: Sequelize.STRING
});
exports["default"] = FooterImages;
