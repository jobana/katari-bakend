
import { NextFunction, Request, Response } from "express";
import "../middlewares/passportHandler";
import * as passport  from "passport";
export class AuthController {

    public authenticateJWT(req: Request, res: Response, next: NextFunction) {
        passport.authenticate("jwt", function (err: any, user: any, info: any) {
            if (err) {
                console.log("Error passport",err);
                return res.status(401).json({ status: "ERROR", code: "102", message:"No autorizado" });
            }
            if (!user) {
                return res.status(401).json({ status: "ERROR", code: "103", message:"Usuario no autorizado" });
            } else {
                console.log('Usuario autorizado');
                return next();
            }
        })(req, res, next);
    }

    public authorizeJWT(req: Request, res: Response, next: NextFunction) {
        passport.authenticate("jwt", function (err: any, user: any, jwtToken: any) {
            if (err) {
                console.log(err);
                return res.status(401).json({ status: "error", code: "unauthorized" });
            }
            if (!user) {
                return res.status(401).json({ status: "error", code: "unauthorized" });
            } else {
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