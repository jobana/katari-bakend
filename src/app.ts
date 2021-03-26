require('dotenv').config();
import { RoutesAdmin } from './admin/routes/adminRoute';
import { RouteUser } from './routes/routeUser';
import { RouteProdcutTemplate } from './routes/routeProductTemplate';
import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/routes";
import './config/database'
import './config/keys'
import { RouteProduct } from './routes/routeProduct';

class App {
    public app: express.Application;
    //Config Routes
    private routePrv: Routes = new Routes();
    private routeProductTemplate = new RouteProdcutTemplate();
    private routeProduct = new RouteProduct();
    private routeUser = new RouteUser();
    private routerAdmin = new RoutesAdmin();

    constructor() {
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

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}

export default new App().app;