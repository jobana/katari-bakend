import { ProductTemplateController } from './../controllers/productTemplateController';
import { UtilKatari } from './../util/utils';
//cors
import * as cors from 'cors';
export class RouteProdcutTemplate {

    //config
    private api = UtilKatari.API_VERSION;
    public productTemplateController: ProductTemplateController = new ProductTemplateController();

    public RouteProdcutTemplate(app: any): void {
        app.use(cors());
        app.route(this.api + 'template')
            .get(this.productTemplateController.findProductTemplate)
        app.route(this.api + 'template/:templateId')
            .get(this.productTemplateController.findProductTemplateById)
        app.route(this.api + 'design')
            .post(this.productTemplateController.addProductTemplate)
        app.route(this.api + 'design/:userId')
            .get(this.productTemplateController.findProductDesignById)
            .put(this.productTemplateController.updateProductTemplate)
            .delete(this.productTemplateController.deleteProductTemplate)
    }
}