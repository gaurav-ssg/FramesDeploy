"use strict";
exports.__esModule = true;
var cors = require("cors");
var path = require("path");
var dotenv = require("dotenv");
var express = require("express");
var database_1 = require("./models/database");
var routes_1 = require("./routes/routes");
var compression = require("compression");
dotenv.load({ path: ".env" });
var app = express();
app.use(cors());
app.set("port", process.env.PORT || 3000);
app.use("/", express.static(path.join(__dirname, "./public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// compress all responses
app.use(compression());
database_1["default"]
  .authenticate()
  .then(function() {
    console.log("Connection has been established successfully.");
    database_1["default"]
      .sync()
      .then(function() {
        console.log("Connected to MsSQL Server");
        routes_1["default"](app);
        app.get("/*", function(req, res) {
          res.sendFile(path.join(__dirname, "./public/index.html"));
        });
        app.listen(app.get("port"), function() {
          return console.log("App listening on port " + app.get("port"));
        });
      })
      ["catch"](function(error) {
        return console.log("This error occured: ", error);
      });
  })
  ["catch"](function(err) {
    console.error("Unable to connect to the database:", err);
  });
