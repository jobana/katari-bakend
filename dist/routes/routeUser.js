"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("./../controllers/authController");
const userController_1 = require("./../controllers/userController");
const utils_1 = require("./../util/utils");
const userProfileController_1 = require("./../controllers/userProfileController");
//cors
const cors = require("cors");
class RouteUser {
    constructor() {
        //config
        this.api = utils_1.UtilKatari.API_VERSION;
        this.userProfileController = new userProfileController_1.UserProfileController();
        this.userController = new userController_1.UserController();
        this.authController = new authController_1.AuthController();
    }
    RouteUser(app) {
        app.use(cors());
        //Route user        
        app.route(this.api + 'user/:idUser')
            .put(this.userProfileController.updateUser)
            .get(this.userProfileController.findUserById);
        app.route(this.api + 'customer/register')
            .post(this.authController.authenticateJWT, this.userProfileController.addCustomer);
        app.route(this.api + 'customer/:idCustomer')
            .get(this.authController.authenticateJWT, this.userProfileController.findCustomerById)
            .put(this.authController.authenticateJWT, this.userProfileController.updateCustomer);
        app.route(this.api + 'customer/fav/:idCustomer')
            .post(this.authController.authenticateJWT, this.userProfileController.AddfavoritesCustomer);
        app.route(this.api + 'customer/design/:idCustomer')
            .post(this.authController.authenticateJWT, this.userProfileController.addDesignCustomer);
        app.route(this.api + 'customer/profile/:userId')
            .get(this.authController.authenticateJWT, this.userProfileController.findCustomerByIdUser);
        //Route user to Auth - by Jwt
        app.route(this.api + 'user/register')
            .post(this.userController.registerUser);
        app.route(this.api + 'user/login')
            .post(this.userController.authenticateUser);
        //Activate - Account
        app.route(this.api + 'user/activate/:code')
            .get(this.userController.activeAccountByCode);
        //Reset Password
        app.route(this.api + 'user/account/password/reset')
            .post(this.userController.forgotPassword);
        //Change Password
        app.route(this.api + 'user/account/password/edit/:idUser')
            .post(this.userController.changePassword);
    }
}
exports.RouteUser = RouteUser;
//# sourceMappingURL=routeUser.js.map