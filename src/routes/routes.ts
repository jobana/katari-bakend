import { BlogController } from './../controllers/blogController';
import { ProductController } from './../controllers/productController';
import { UtilKatari } from './../util/utils';
import { MainController } from '../controllers/mainController';
import { Request, Response } from "express";
import { NewsLetterController } from './../controllers/newsletterController';
import { CustomizerController } from './../controllers/customizerController';
//cors
import * as cors from 'cors';

export class Routes {

    //config
    private api = UtilKatari.API_VERSION;
    //Controladores
    public mainController: MainController = new MainController();
    public newsLetterController: NewsLetterController = new NewsLetterController();
    public customizerController: CustomizerController = new CustomizerController();
    public productController: ProductController = new ProductController();
    public blogController: BlogController = new BlogController();

    public routes(app: any): void {
        app.use(cors());
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'Acceso a petición GET'
                })
            })
        //Find configuration
        app.route(this.api + 'config')
            .post(this.mainController.findConfigurationByCode)

        //Rutas configuracion
        app.route(this.api + 'config')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    status: "OK",
                    errorCode: "0",
                    message: 'Debe ingresar una opción de configuración'
                })
            })
        //Rutas newsletter
        app.route(this.api + 'newsletter')
            .post(this.newsLetterController.addNews)
            .delete(this.newsLetterController.deleteNews)
        //Rutas colecciones
        app.route(this.api + 'collection/:pageNumber/:nPerPage')
            .get(this.mainController.findSeason)
        app.route(this.api + 'collection/:alias')
            .get(this.mainController.findSeasonByAlias)
        //Rutas Precios
        app.route(this.api + 'price')
            .post(this.mainController.findPriceByMaterialCode)

        //Rutas blog
        app.route(this.api + 'blog/article/:pageNumber/:nPerPage/:category')
            .get(this.blogController.findBlog)
        app.route(this.api + 'blog/article/:pageNumber/:nPerPage')
            .get(this.blogController.findBlog)
        app.route(this.api + 'blog/article/:alias')
            .get(this.blogController.findBlogById)
        app.route(this.api + 'blog/article/search')
            .post(this.blogController.searchByName)

        //Slider
        app.route(this.api + 'slider')
            .get(this.blogController.findSlider)

        //Personalizador
        app.route(this.api + 'customizer/new')
            .post(this.customizerController.getDefaulModel)
        app.route(this.api + 'customizer/:id')
            .get(this.customizerController.findCustomizerById)
        app.route(this.api + 'customizer/material')
            .post(this.customizerController.findMaterial)

        //Ruta contact
        app.route(this.api + 'contact')
            .post(this.mainController.contact)
    }
}