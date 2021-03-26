import { ProductController } from './../controllers/productController';
import { UtilKatari } from './../util/utils';
//cors
import * as cors from 'cors';
export class RouteProduct {
    //config
    private api = UtilKatari.API_VERSION;

    public productController: ProductController = new ProductController();

    public RouteProduct(app: any): void {
        app.use(cors());
        app.route(this.api + 'product/:pageNumber/:nPerPage')
            .post(this.productController.findProducts)
        app.route(this.api + 'product/:productId')
            .get(this.productController.findProductById)
        app.route(this.api + 'product/collection/:pageNumber/:nPerPage')
            .post(this.productController.findProductByCollection)
    }
}