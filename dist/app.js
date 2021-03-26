"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const adminRoute_1 = require("./admin/routes/adminRoute");
const routeUser_1 = require("./routes/routeUser");
const routeProductTemplate_1 = require("./routes/routeProductTemplate");
const express = require("express");
const bodyParser = require("body-parser");
const routes_1 = require("./routes/routes");
require("./config/database");
require("./config/keys");
const routeProduct_1 = require("./routes/routeProduct");
class App {
    constructor() {
        //Config Routes
        this.routePrv = new routes_1.Routes();
        this.routeProductTemplate = new routeProductTemplate_1.RouteProdcutTemplate();
        this.routeProduct = new routeProduct_1.RouteProduct();
        this.routeUser = new routeUser_1.RouteUser();
        this.routerAdmin = new adminRoute_1.RoutesAdmin();
        this.app = express();
        this.config();
        this.routing();
    }
    //Configuration routing
    routing() {
        this.routePrv.routes(this.app);
        this.routeProductTemplate.RouteProdcutTemplate(this.app);
        this.routeProduct.RouteProduct(this.app);
        this.routeUser.RouteUser(this.app);
        this.routerAdmin.RoutesAdmin(this.app);
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map