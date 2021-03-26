"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../middlewares/passportHandler");
const passport = require("passport");
class AuthController {
    authenticateJWT(req, res, next) {
        passport.authenticate("jwt", function (err, user, info) {
            if (err) {
                console.log("Error passport", err);
                return res.status(401).json({ status: "ERROR", code: "102", message: "No autorizado" });
            }
            if (!user) {
                return res.status(401).json({ status: "ERROR", code: "103", message: "Usuario no autorizado" });
            }
            else {
                console.log('Usuario autorizado');
                return next();
            }
        })(req, res, next);
    }
    authorizeJWT(req, res, next) {
        passport.authenticate("jwt", function (err, user, jwtToken) {
            if (err) {
                console.log(err);
                return res.status(401).json({ status: "error", code: "unauthorized" });
            }
            if (!user) {
                return res.status(401).json({ status: "error", code: "unauthorized" });
            }
            else {
                const scope = req.baseUrl.split("/").slice(-1)[0];
                const authScope = jwtToken.scope;
                if (authScope && authScope.indexOf(scope) > -1) {
                    return next();
                }
                else {
                    return res.status(401).json({ status: "error", code: "unauthorized" });
                }
            }
        })(req, res, next);
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=authController.js.map