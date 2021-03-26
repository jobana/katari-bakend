"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UtilKatari {
    static createObjResponse(response, prodTemplate, state) {
        if (state) {
            response.setErrorCode("0");
            response.setMessage("Proceso exitoso");
            response.setStatus("INFO");
            response.setData(prodTemplate);
        }
        else {
            response.setErrorCode("100");
            response.setMessage("No hay información que mostrar");
            response.setStatus("ERROR");
            response.setData(prodTemplate);
        }
    }
    static createObjResponseEmpty(response, state) {
        if (state) {
            response.setErrorCode("0");
            response.setStatus("INFO");
        }
        else {
            response.setErrorCode("100");
            response.setStatus("ERROR");
        }
    }
}
exports.UtilKatari = UtilKatari;
UtilKatari.API_VERSION = "/api/katari/v1/";
UtilKatari.JWT_SECRET = process.env.SECRET_JWT_KATARI;
UtilKatari.EXPIRE_TIME_JWT = 900;
//# sourceMappingURL=utils.js.map