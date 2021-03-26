"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./../util/utils");
const jwt = require("jsonwebtoken");
class TokenUserInfo {
    isAdmin(authHeader) {
        let tokenInfo;
        let response = false;
        console.log("Datos authHeader: ", authHeader);
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, utils_1.UtilKatari.JWT_SECRET, (err, user) => {
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
exports.TokenUserInfo = TokenUserInfo;
//# sourceMappingURL=tokenUserInfo.js.map