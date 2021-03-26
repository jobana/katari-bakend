import { UtilKatari } from './../util/utils';
import * as jwt from 'jsonwebtoken';
export class TokenUserInfo {

    public isAdmin(authHeader: string) {
        let tokenInfo: any;
        let response: boolean = false;
        console.log("Datos authHeader: ", authHeader);
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, UtilKatari.JWT_SECRET, (err: any, user: any) => {
                if (err) {
                    return null;
                }
                else {
                    console.log("Datos user: ", user);
                    for (let rol of user.roles) {
                        console.log("Datos rol: ", rol);
                        if (rol == "admin") {
                            response = true;
                            break;
                        }
                    }

                }
            });
        }
        return response;
    }

}