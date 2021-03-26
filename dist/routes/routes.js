"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blogController_1 = require("./../controllers/blogController");
const productController_1 = require("./../controllers/productController");
const utils_1 = require("./../util/utils");
const mainController_1 = require("../controllers/mainController");
const newsletterController_1 = require("./../controllers/newsletterController");
const customizerController_1 = require("./../controllers/customizerController");
//cors
const cors = require("cors");
class Routes {
    constructor() {
        //config
        this.api = utils_1.UtilKatari.API_VERSION;
        //Controladores
        this.mainController = new mainController_1.MainController();
        this.newsLetterController = new newsletterController_1.NewsLetterController();
        this.customizerController = new customizerController_1.CustomizerController();
        this.productController = new productController_1.ProductController();
        this.blogController = new blogController_1.BlogController();
    }
    routes(app) {
        app.use(cors());
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'Acceso a petición GET'
            });
        });
        //Find configuration
        app.route(this.api + 'config')
            .post(this.mainController.findConfigurationByCode);
        //Rutas configuracion
        app.route(this.api + 'config')
            .get((req, res) => {
            res.status(200).send({
                status: "OK",
                errorCode: "0",
                message: 'Debe ingresar una opción de configuración'
            });
        });
        //Rutas newsletter
        app.route(this.api + 'newsletter')
            .post(this.newsLetterController.addNews)
            .delete(this.newsLetterController.deleteNews);
        //Rutas colecciones
        app.route(this.api + 'collection/:pageNumber/:nPerPage')
            .get(this.mainController.findSeason);
        app.route(this.api + 'collection/:alias')
            .get(this.mainController.findSeasonByAlias);
        //Rutas Precios
        app.route(this.api + 'price')
            .post(this.mainController.findPriceByMaterialCode);
        //Rutas blog
        app.route(this.api + 'blog/article/:pageNumber/:nPerPage/:category')
            .get(this.blogController.findBlog);
        app.route(this.api + 'blog/article/:pageNumber/:nPerPage')
            .get(this.blogController.findBlog);
        app.route(this.api + 'blog/article/:alias')
            .get(this.blogController.findBlogById);
        app.route(this.api + 'blog/article/search')
            .post(this.blogController.searchByName);
        //Slider
        app.route(this.api + 'slider')
            .get(this.blogController.findSlider);
        //Personalizador
        app.route(this.api + 'customizer/new')
            .post(this.customizerController.getDefaulModel);
        app.route(this.api + 'customizer/:id')
            .get(this.customizerController.findCustomizerById);
        app.route(this.api + 'customizer/material')
            .post(this.customizerController.findMaterial);
        //Ruta contact
        app.route(this.api + 'contact')
            .post(this.mainController.contact);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map