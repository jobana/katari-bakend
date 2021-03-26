"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productTemplateController_1 = require("./../controllers/productTemplateController");
const utils_1 = require("./../util/utils");
//cors
const cors = require("cors");
class RouteProdcutTemplate {
    constructor() {
        //config
        this.api = utils_1.UtilKatari.API_VERSION;
        this.productTemplateController = new productTemplateController_1.ProductTemplateController();
    }
    RouteProdcutTemplate(app) {
        app.use(cors());
        app.route(this.api + 'template')
            .get(this.productTemplateController.findProductTemplate);
        app.route(this.api + 'template/:templateId')
            .get(this.productTemplateController.findProductTemplateById);
        app.route(this.api + 'design')
            .post(this.productTemplateController.addProductTemplate);
        app.route(this.api + 'design/:userId')
            .get(this.productTemplateController.findProductDesignById)
            .put(this.productTemplateController.updateProductTemplate)
            .delete(this.productTemplateController.deleteProductTemplate);
    }
}
exports.RouteProdcutTemplate = RouteProdcutTemplate;
//# sourceMappingURL=routeProductTemplate.js.map