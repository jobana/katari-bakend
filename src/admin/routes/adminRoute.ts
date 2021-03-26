import { AdminController } from './../controllers/adminController';
import { BlogController } from './../../controllers/blogController';
import { AuthController } from './../../controllers/authController';
import { ProductController } from './../../controllers/productController';
import { UtilKatari } from './../../util/utils';
import * as multer from 'multer';

export class RoutesAdmin {
    private api = UtilKatari.API_VERSION;

    private productController: ProductController = new ProductController();
    private authController: AuthController = new AuthController();
    public blogController: BlogController = new BlogController();
    public adminController: AdminController = new AdminController();

    public RoutesAdmin(app: any): void {

        //Routes Product
        app.route(this.api + 'admin/product/:pageNumber/:nPerPage')
            .get(this.authController.authenticateJWT, this.productController.findProducts)
        app.route(this.api + 'admin/product/:productId')
            .put(this.authController.authenticateJWT, this.productController.updateProduct)
            .get(this.authController.authenticateJWT, this.productController.findProductById)
            .delete(this.authController.authenticateJWT, this.productController.deleteProduct)
        app.route(this.api + 'admin/product')
            .post(this.authController.authenticateJWT, this.productController.addProduct)
        //Rutas blog
        app.route(this.api + 'admin/blog/article/:pageNumber/:nPerPage')
            .get(this.authController.authenticateJWT, this.blogController.findBlog)
        app.route(this.api + 'admin/blog/article/:id')
            .get(this.authController.authenticateJWT, this.blogController.findBlogById)
        app.route(this.api + 'admin/blog/article')
            .post(this.authController.authenticateJWT, this.blogController.addBlog)
            .put(this.authController.authenticateJWT, this.blogController.updateBlog)
            .delete(this.authController.authenticateJWT, this.blogController.deleteBlog)
        app.route(this.api + 'admin/model')
            .get(this.authController.authenticateJWT, this.adminController.findModel)
            .post(this.authController.authenticateJWT, this.adminController.createModel)
            .put(this.authController.authenticateJWT, this.adminController.updateModel)
            .delete(this.authController.authenticateJWT, this.adminController.deleteModel)
        app.route(this.api + 'admin/load/file')
            .post(multer({ dest: 'temp/' }).single('file-s3'), this.adminController.loadFileAws)
        app.route(this.api + 'admin/load/file/product')
            .post(multer({ dest: 'temp/' }).single('file-s3'), this.adminController.loadFileProduct)
        app.route(this.api + 'admin/delete/file')
            .post(this.adminController.deleteFileAws)
        app.route(this.api + 'admin/send/email')
            .get(this.adminController.sendEmail)

    }

}