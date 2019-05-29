"use strict";
exports.__esModule = true;
var IncomingForm = require("formidable").IncomingForm;
var fs = require("fs-extra");
var FileControl = /** @class */ (function () {
    function FileControl() {
        this.uploadFile = function (req, res) {
            var dir = __dirname + req.query.documentPath;
            var form = new IncomingForm();
            fs.ensureDir(dir).then(function () {
                form.on("fileBegin", function (name, file) {
                    file.path = __dirname + req.query.documentPath + "/" + file.name;
                });
                form.on("end", function (name, file) {
                    res.json("OK");
                });
                form.parse(req);
            });
        };
        this.downloadFile = function (req, res) {
            res.sendFile("" + req.body.path, { root: __dirname });
        };
    }
    return FileControl;
}());
exports["default"] = FileControl;
