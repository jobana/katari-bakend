"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminController_1 = require("./../controllers/adminController");
const blogController_1 = require("./../../controllers/blogController");
const authController_1 = require("./../../controllers/authController");
const productController_1 = require("./../../controllers/productController");
const utils_1 = require("./../../util/utils");
const multer = require("multer");
class RoutesAdmin {
    constructor() {
        this.api = utils_1.UtilKatari.API_VERSION;
        this.productController = new productController_1.ProductController();
        this.authController = new authController_1.AuthController();
        this.blogController = new blogController_1.BlogController();
        this.adminController = new adminController_1.AdminController();
    }
    RoutesAdmin(app) {
        //Routes Product
        app.route(this.api + 'admin/product/:pageNumber/:nPerPage')
            .get(this.authController.authenticateJWT, this.productController.findProducts);
        app.route(this.api + 'admin/product/:productId')
            .put(this.authController.authenticateJWT, this.productController.updateProduct)
            .get(this.authController.authenticateJWT, this.productController.findProductById)
            .delete(this.authController.authenticateJWT, this.productController.deleteProduct);
        app.route(this.api + 'admin/product')
            .post(this.authController.authenticateJWT, this.productController.addProduct);
        //Rutas blog
        app.route(this.api + 'admin/blog/article/:pageNumber/:nPerPage')
            .get(this.authController.authenticateJWT, this.blogController.findBlog);
        app.route(this.api + 'admin/blog/article/:id')
            .get(this.authController.authenticateJWT, this.blogController.findBlogById);
        app.route(this.api + 'admin/blog/article')
            .post(this.authController.authenticateJWT, this.blogController.addBlog)
            .put(this.authController.authenticateJWT, this.blogController.updateBlog)
            .delete(this.authController.authenticateJWT, this.blogController.deleteBlog);
        app.route(this.api + 'admin/model')
            .get(this.authController.authenticateJWT, this.adminController.findModel)
            .post(this.authController.authenticateJWT, this.adminController.createModel)
            .put(this.authController.authenticateJWT, this.adminController.updateModel)
            .delete(this.authController.authenticateJWT, this.adminController.deleteModel);
        app.route(this.api + 'admin/load/file')
            .post(multer({ dest: 'temp/' }).single('file-s3'), this.adminController.loadFileAws);
        app.route(this.api + 'admin/load/file/product')
            .post(multer({ dest: 'temp/' }).single('file-s3'), this.adminController.loadFileProduct);
        app.route(this.api + 'admin/delete/file')
            .post(this.adminController.deleteFileAws);
        app.route(this.api + 'admin/send/email')
            .get(this.adminController.sendEmail);
    }
}
exports.RoutesAdmin = RoutesAdmin;
//# sourceMappingURL=adminRoute.js.map