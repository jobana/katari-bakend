import { AuthController } from './../controllers/authController';
import { UserController } from './../controllers/userController';
import { UtilKatari } from './../util/utils';
import { UserProfileController } from './../controllers/userProfileController';

//cors
import * as cors from 'cors';
export class RouteUser {
    //config
    private api = UtilKatari.API_VERSION;

    public userProfileController: UserProfileController = new UserProfileController();
    public userController: UserController = new UserController();
    private authController: AuthController = new AuthController();

    public RouteUser(app: any): void {
        app.use(cors());
        //Route user        
        app.route(this.api + 'user/:idUser')
            .put(this.userProfileController.updateUser)
            .get(this.userProfileController.findUserById)
        app.route(this.api + 'customer/register')
            .post(this.authController.authenticateJWT, this.userProfileController.addCustomer)
        app.route(this.api + 'customer/:idCustomer')
            .get(this.authController.authenticateJWT, this.userProfileController.findCustomerById)
            .put(this.authController.authenticateJWT, this.userProfileController.updateCustomer)
        app.route(this.api + 'customer/fav/:idCustomer')
            .post(this.authController.authenticateJWT, this.userProfileController.AddfavoritesCustomer)
            app.route(this.api + 'customer/design/:idCustomer')
            .post(this.authController.authenticateJWT, this.userProfileController.addDesignCustomer)
        app.route(this.api + 'customer/profile/:userId')
            .get(this.authController.authenticateJWT, this.userProfileController.findCustomerByIdUser)

        //Route user to Auth - by Jwt
        app.route(this.api + 'user/register')
            .post(this.userController.registerUser)
        app.route(this.api + 'user/login')
            .post(this.userController.authenticateUser)

        //Activate - Account
        app.route(this.api + 'user/activate/:code')
            .get(this.userController.activeAccountByCode)
        //Reset Password
        app.route(this.api + 'user/account/password/reset')
            .post(this.userController.forgotPassword)
        //Change Password
        app.route(this.api + 'user/account/password/edit/:idUser')
            .post(this.userController.changePassword)

    }
}