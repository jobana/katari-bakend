"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productController_1 = require("./../controllers/productController");
const utils_1 = require("./../util/utils");
//cors
const cors = require("cors");
class RouteProduct {
    constructor() {
        //config
        this.api = utils_1.UtilKatari.API_VERSION;
        this.productController = new productController_1.ProductController();
    }
    RouteProduct(app) {
        app.use(cors());
        app.route(this.api + 'product/:pageNumber/:nPerPage')
            .post(this.productController.findProducts);
        app.route(this.api + 'product/:productId')
            .get(this.productController.findProductById);
        app.route(this.api + 'product/collection/:pageNumber/:nPerPage')
            .post(this.productController.findProductByCollection);
    }
}
exports.RouteProduct = RouteProduct;
//# sourceMappingURL=routeProduct.js.map