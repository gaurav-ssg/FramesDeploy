"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var path = require("path");
var dotenv = require("dotenv");
var jwt = require("jsonwebtoken");
dotenv.load({ path: ".env" });
var crypto = require("crypto");
var bcrypt = require("bcryptjs");
var email_template_1 = require("../../templates/email-template");
var emailCtrl = new email_template_1["default"]();
var hbs = require("nodemailer-express-handlebars");
var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport({
    host: process.env.HOST,
    port: 25,
    secure: false
});
var handlebarsOptions = {
    viewEngine: "handlebars",
    viewPath: path.resolve("../templates/"),
    extName: ".html"
};
var parseJwt = function (token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var data = JSON.parse(Buffer.from(base64, "base64").toString("binary"));
    if (data.user.userRole === "admin" ||
        data.user.userRole === "support" ||
        data.user.userRole === "customer") {
        return true;
    }
    return false;
};
smtpTransport.use("compile", hbs(handlebarsOptions));
var getToken = function () { return __awaiter(_this, void 0, void 0, function () {
    var token, generateToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                generateToken = function (_a) {
                    var _b = _a === void 0 ? {} : _a, _c = _b.stringBase, stringBase = _c === void 0 ? "base64" : _c, _d = _b.byteLength, byteLength = _d === void 0 ? 32 : _d;
                    return new Promise(function (resolve, reject) {
                        crypto.randomBytes(byteLength, function (err, buffer) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(buffer.toString("hex"));
                            }
                        });
                    });
                };
                return [4 /*yield*/, generateToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, token];
        }
    });
}); };
var RegisterUser = function (registerUser, user, token) {
    // setup email data with unicode symbols
    var mailOptions = {
        from: '"no reply" <' + process.env.EMAIL_USER + ">",
        to: registerUser,
        subject: "User Registered",
        html: emailCtrl.registerUser(user, registerUser, token) // html body
    };
    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function (error, info) {
        console.log("Mail Sent");
        if (error) {
            return console.log(error);
        }
    });
};
var BaseControl = /** @class */ (function () {
    function BaseControl() {
        var _this = this;
        // Get all
        this.getAll = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!parseJwt(req.headers.authorization)) {
                    return [2 /*return*/, res.status(403).json({ error: "No credentials sent!" })];
                }
                this.model
                    .findAll()
                    .then(function (data, err) {
                    if (err) {
                        return console.error(err);
                    }
                    res.status(200).json(data);
                })["catch"](function (err) {
                    if (err) {
                        res.sendStatus(400);
                    }
                });
                return [2 /*return*/];
            });
        }); };
        // Insert
        this.insert = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var obj, token;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        obj = new this.model(req.body);
                        return [4 /*yield*/, getToken()];
                    case 1:
                        token = _a.sent();
                        this.model
                            .findOne({ where: { email: req.body.email } })
                            .then(function (user, err) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                if (user) {
                                    return [2 /*return*/, res.sendStatus(400)];
                                }
                                if (err) {
                                    return [2 /*return*/, res.sendStatus(400)];
                                }
                                obj
                                    .save()
                                    .then(function (item, err) {
                                    if (err && err.code === 11000) {
                                        return res.sendStatus(400);
                                    }
                                    _this.model
                                        .update({
                                        emailVerificationToken: token
                                    }, { where: { userId: req.body.userId } })
                                        .then(function (result) {
                                        // RegisterUser(req.body.email, req.body, token);
                                        var tokenLogin = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
                                        res.status(200).json({
                                            token: tokenLogin,
                                            uId: req.body.userId,
                                            customerId: req.body.customerId
                                        });
                                    });
                                })["catch"](function (err) {
                                    res.sendStatus(400);
                                });
                                return [2 /*return*/];
                            });
                        }); })["catch"](function (err) {
                            if (err) {
                                res.sendStatus(400);
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        // Get by id
        this.get = function (req, res) {
            _this.model
                .findOne({ where: { userId: req.params.id } })
                .then(function (user, err) {
                if (!user) {
                    return res.sendStatus(403);
                }
                if (err) {
                    return res.sendStatus(400);
                }
                var data = {
                    customerId: user.dataValues.customerId,
                    cartId: user.dataValues.cartId,
                    userRole: user.dataValues.userRole,
                    email: user.dataValues.email,
                    phoneNumber: user.dataValues.phoneNumber,
                    firstName: user.dataValues.firstName,
                    lastName: user.dataValues.lastName,
                    userAccess: user.dataValues.userAccess,
                    createdById: user.dataValues.createdById,
                    createdBy: user.dataValues.createdBy,
                    modifiedById: user.dataValues.modifiedById,
                    modifiedBy: user.dataValues.modifiedBy,
                    isVerified: user.dataValues.isVerified
                };
                res.status(200).json(data);
            })["catch"](function (err) {
                if (err) {
                    res.sendStatus(400);
                }
            });
        };
        // Update by id
        this.update = function (req, res) {
            if (!parseJwt(req.headers.authorization)) {
                return res.status(403).json({ error: "No credentials sent!" });
            }
            _this.model
                .update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userAccess: req.body.userAccess,
                userRole: req.body.userRole,
                phoneNumber: req.body.phoneNumber,
                modifiedById: req.body.modifiedById,
                modifiedBy: req.body.modifiedBy
            }, { where: { email: req.body.email } })
                .then(function (result) {
                if (result[0] == 0) {
                    res.sendStatus(400);
                }
                else {
                    res.status(200).json("OK");
                }
            })["catch"](function (err) {
                if (err) {
                    res.sendStatus(400);
                }
            });
        };
        // Delete by id
        this["delete"] = function (req, res) {
            if (!parseJwt(req.headers.authorization)) {
                return res.status(403).json({ error: "No credentials sent!" });
            }
            _this.model
                .destroy({
                where: { email: req.body.email }
            }, function (err) {
                if (err) {
                    return console.error(err);
                }
                res.status(200).json("OK");
            })["catch"](function (err) {
                if (err) {
                    res.sendStatus(400);
                }
            });
        };
        // Reset Password by id
        this.forgotPassword = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var token, sendMail, storeToken;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getToken()];
                    case 1:
                        token = _a.sent();
                        sendMail = function (user, err) {
                            // setup email data with unicode symbols
                            var mailOptions = {
                                from: '"no reply" <' + process.env.EMAIL_USER + ">",
                                to: user.email,
                                subject: "PASSWORD RESET REQUEST" // Subject line
                                // html: emailCtrl.passwordReset(user, token) // html body
                            };
                            // send mail with defined transport object
                            smtpTransport.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    return console.log(error);
                                }
                                console.log("Password Reset Mail Sent");
                                res.status(200).json({ token: token });
                            });
                        };
                        storeToken = function (user, err) {
                            _this.model
                                .update({
                                resetPasswordToken: token,
                                resetPasswordExpires: Date.now() + 86400000 // 24 Hours
                            }, { where: { email: user.email } })
                                .then(function () {
                                sendMail(user, err);
                            });
                        };
                        this.model
                            .findOne({ where: { email: req.body.email } })
                            .then(function (user, err) {
                            if (!user) {
                                return res.sendStatus(400);
                            }
                            if (err) {
                                return console.error(err);
                            }
                            storeToken(user, err);
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        this.changePassword = function (req, res) {
            _this.model
                .findOne({ where: { email: req.body.email } })
                .then(function (user, err) { return __awaiter(_this, void 0, void 0, function () {
                var newPassword_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!user) {
                                return [2 /*return*/, res.sendStatus(400)];
                            }
                            if (err) {
                                return [2 /*return*/, console.error(err)];
                            }
                            return [4 /*yield*/, user.validPassword(req.body.oldPassword)];
                        case 1:
                            if (_a.sent()) {
                                bcrypt
                                    .hash(req.body.password, 10)
                                    .then(function (hash) {
                                    newPassword_1 = hash;
                                })
                                    .then(function () {
                                    _this.model
                                        .update({
                                        password: newPassword_1,
                                        resetPasswordToken: "",
                                        resetPasswordExpires: ""
                                    }, { where: { email: user.email } })
                                        .then(function (result) {
                                        // let mailOptions = {
                                        //   from: '"no reply" <' + process.env.EMAIL_USER + ">", // sender address
                                        //   to: user.email, // list of receivers
                                        //   subject: "PASSWORD CHANGED CONFIRMATION" // Subject line
                                        //   // html: emailCtrl.passwordResetConfirmation(user) // html body
                                        // };
                                        // // send mail with defined transport object
                                        // smtpTransport.sendMail(mailOptions, (error, info) => {
                                        //   if (error) {
                                        //     return console.log(error);
                                        //   }
                                        //   console.log("Password Changed Confirmation Mail Sent");
                                        //   res.status(200).json("OK");
                                        // });
                                        res.status(200).json("OK");
                                    });
                                });
                            }
                            else {
                                res.sendStatus(403);
                            }
                            return [2 /*return*/];
                    }
                });
            }); })["catch"](function (err) {
                if (err) {
                    res.sendStatus(400);
                }
            });
        };
        this.resetPassword = function (req, res) {
            _this.model
                .findOne({ where: { resetPasswordToken: req.body.resetPasswordToken } })
                .then(function (user, err) {
                if (!user) {
                    return res.sendStatus(400);
                }
                if (err) {
                    return console.error(err);
                }
                var currentTime = Date.now();
                if (currentTime > user.resetPasswordExpires) {
                    // Link Expires
                    return res.sendStatus(402);
                }
                var newPassword;
                bcrypt
                    .hash(req.body.password, 10)
                    .then(function (hash) {
                    newPassword = hash;
                })
                    .then(function () {
                    _this.model
                        .update({
                        password: newPassword,
                        resetPasswordToken: "",
                        resetPasswordExpires: ""
                    }, { where: { email: user.email } })
                        .then(function (result) {
                        var mailOptions = {
                            from: '"no reply" <' + process.env.EMAIL_USER + ">",
                            to: user.email,
                            subject: "PASSWORD CHANGED CONFIRMATION" // Subject line
                            // html: emailCtrl.passwordResetConfirmation(user) // html body
                        };
                        // send mail with defined transport object
                        smtpTransport.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                return console.log(error);
                            }
                            console.log("Password Reset Confirmation Mail Sent");
                            res.status(200).json("OK");
                        });
                    });
                });
            })["catch"](function (err) {
                if (err) {
                    res.sendStatus(400);
                }
            });
        };
        this.checkUrl = function (req, res) {
            _this.model
                .findOne({ where: { resetPasswordToken: req.params.id } })
                .then(function (user, err) {
                if (!user) {
                    return res.sendStatus(400);
                }
                if (err) {
                    return console.error(err);
                }
                res.status(200).json("OK");
            });
        };
        this.confirmEmailUrl = function (req, res) {
            _this.model
                .findOne({ where: { emailVerificationToken: req.params.id } })
                .then(function (user, err) {
                if (!user) {
                    return res.sendStatus(400);
                }
                if (err) {
                    return console.error(err);
                }
                res.status(200).json("OK");
            });
        };
        this.confirmEmail = function (req, res) {
            _this.model
                .findOne({
                where: { emailVerificationToken: req.body.emailVerificationToken }
            })
                .then(function (user, err) {
                if (!user) {
                    return res.sendStatus(400);
                }
                if (err) {
                    return console.error(err);
                }
                _this.model
                    .update({
                    emailVerificationToken: "",
                    isVerified: true
                }, { where: { email: user.email } })
                    .then(function (result) {
                    res.status(200).json("OK");
                });
            })["catch"](function (err) {
                if (err) {
                    res.sendStatus(400);
                }
            });
        };
    }
    return BaseControl;
}());
exports["default"] = BaseControl;
