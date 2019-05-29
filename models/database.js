"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
dotenv.load({ path: ".env" });
var Sequelize = require("sequelize");
var userName = process.env.DATABASE_USERNAME;
var password = process.env.DATABASE_PASSWORD;
var hostName = process.env.DATABASE_HOSTNAME;
var dbName = process.env.DATABASE_NAME;
// Initialize Sequelize to connect to sample DB
var database = new Sequelize(dbName, userName, password, {
    dialect: "mssql",
    host: hostName,
    port: Number(process.env.PORT_NUMBER),
    logging: false,
    pool: {
        max: 30,
        min: 0,
        idle: 20000,
        acquire: 40000,
        evict: 20000
    },
    dialectOptions: {
        requestTimeout: 0 // timeout = 0 seconds
    }
});
exports["default"] = database;
