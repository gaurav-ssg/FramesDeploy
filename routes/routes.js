"use strict";
exports.__esModule = true;
var express = require("express");
var userControl_1 = require("../controllers/user/userControl");
var orderControl_1 = require("../controllers/order/orderControl");
var headerControl_1 = require("../controllers/headerImages/headerControl");
var promoImageControl_1 = require("../controllers/promotionImage/promoImageControl");
var productControl_1 = require("../controllers/product/productControl");
var addressControl_1 = require("../controllers/address/addressControl");
var contactControl_1 = require("../controllers/contact/contactControl");
var paymentControl_1 = require("../controllers/payment/paymentControl");
var fileUpload_1 = require("../controllers/fileUpload/fileUpload");
var cartControl_1 = require("../controllers/cart/cartControl");
var dcControl_1 = require("../controllers/deliveryCharges/dcControl");
var groupControl_1 = require("../controllers/group/groupControl");
var fContentControl_1 = require("../controllers/footerContent/fContentControl");
function setRoutes(app) {
    var router = express.Router();
    var userControl = new userControl_1["default"]();
    var orderControl = new orderControl_1["default"]();
    var headerControl = new headerControl_1["default"]();
    var promoControl = new promoImageControl_1["default"]();
    var productControl = new productControl_1["default"]();
    var contactControl = new contactControl_1["default"]();
    var addressControl = new addressControl_1["default"]();
    var paymentControl = new paymentControl_1["default"]();
    var fileControl = new fileUpload_1["default"]();
    var cartControl = new cartControl_1["default"]();
    var deliveryCharges = new dcControl_1["default"]();
    var groupControl = new groupControl_1["default"]();
    var footerContentControl = new fContentControl_1["default"]();
    var compression = require("compression");
    // compress all responses
    app.use(compression());
    // Users
    router.route("/login").post(userControl.login);
    router.route("/user").post(userControl.insert);
    router.route("/user/:id").get(userControl.get);
    router.route("/users").get(userControl.getAll);
    router.route("/user/:id").post(userControl.update);
    router.route("/user/:id")["delete"](userControl["delete"]);
    router.route("/forgot").post(userControl.forgotPassword);
    router.route("/change-password").post(userControl.changePassword);
    router.route("/forgot/:id").get(userControl.checkUrl);
    router.route("/forgot/:id").post(userControl.resetPassword);
    router.route("/confirm/:id").get(userControl.confirmEmailUrl);
    router.route("/confirm/:id").post(userControl.confirmEmail);
    // Cart
    router.route("/cart").post(cartControl.insert);
    router.route("/cart/:id").post(cartControl.update);
    router.route("/cart").get(cartControl.getAll);
    router.route("/cart/:id").get(cartControl.get);
    // DeliveryCharges
    router.route("/dc").post(deliveryCharges.insert);
    router.route("/dc/:id").post(deliveryCharges.update);
    router.route("/dc").get(deliveryCharges.getAll);
    router.route("/dc/:id").get(deliveryCharges.get);
    // File
    router.route("/file-upload").post(fileControl.uploadFile);
    router.route("/file-download").post(fileControl.downloadFile);
    // FooterContent
    router.route("/footer-content").get(footerContentControl.getAll);
    router.route("/footer-content").post(footerContentControl.insert);
    router.route("/footer-content/:id").post(footerContentControl.update);
    router.route("/footer-content/:id")["delete"](footerContentControl["delete"]);
    // Promotion Image
    router.route("/promo-image").get(promoControl.getAll);
    router.route("/promo-image").post(promoControl.insert);
    router.route("/promo-image/:id").post(promoControl.update);
    router.route("/promo-image/:id")["delete"](promoControl["delete"]);
    // Header
    router.route("/header-images").get(headerControl.getAll);
    router.route("/header-images").post(headerControl.insert);
    router.route("/header-images/:id").post(headerControl.update);
    router.route("/header-images/:id")["delete"](headerControl["delete"]);
    // Product
    router.route("/products").get(productControl.getAll);
    router.route("/product/:id").get(productControl.get);
    router.route("/rel-product/:id").get(productControl.getSimilarProduct);
    router.route("/product").post(productControl.insert);
    router.route("/product/:id").post(productControl.update);
    router.route("/product-feature/:id").post(productControl.featureUpdate);
    router.route("/product-disable/:id").post(productControl.disableProduct);
    router.route("/products/:id")["delete"](productControl["delete"]);
    // Group
    router.route("/group").post(groupControl.insert);
    router.route("/group/:id").post(groupControl.update);
    router.route("/group").get(groupControl.getAll);
    router.route("/group/:id").get(groupControl.get);
    // Order
    router.route("/orders").get(orderControl.getAll);
    router.route("/order/:id").get(orderControl.get);
    router.route("/customer-order/:id").get(orderControl.getCustomerOrders);
    router.route("/order").post(orderControl.insert);
    router.route("/order/:id").post(orderControl.update);
    // Payment
    router.route("/payment").get(paymentControl.getAll);
    router.route("/payment/:id").get(paymentControl.get);
    router.route("/payment-order/:id").get(paymentControl.get);
    router.route("/payment").post(paymentControl.insert);
    router.route("/payment/:id").post(paymentControl.update);
    // Contact
    router.route("/contact").get(contactControl.getAll);
    router.route("/contact").post(contactControl.insert);
    router.route("/contact/:id").post(contactControl.update);
    router.route("/contact/:id")["delete"](contactControl["delete"]);
    // Address
    router.route("/addresses").get(addressControl.getAll);
    router.route("/address").post(addressControl.insert);
    router.route("/address/:id").get(addressControl.get);
    router
        .route("/customer-address/:id")
        .get(addressControl.getAllCustomerAddress);
    router.route("/address/:id").post(addressControl.update);
    router.route("/address/:id")["delete"](addressControl["delete"]);
    router
        .route("/customer-address/:id")
        .get(addressControl.getAllCustomerAddress);
    // Apply the routes to our application with the prefix /api
    app.use("/api", router);
}
exports["default"] = setRoutes;
