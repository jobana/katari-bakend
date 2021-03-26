import { TokenUserInfo } from './../domain/tokenUserInfo';
import { ResponseObj } from './../domain/response';
export class UtilKatari {

    public static API_VERSION = "/api/katari/v1/";
    public static JWT_SECRET = process.env.SECRET_JWT_KATARI;

    public static EXPIRE_TIME_JWT = 900;

    public static createObjResponse(response: ResponseObj, prodTemplate: object, state: boolean) {
        if (state) {
            response.setErrorCode("0");
            response.setMessage("Proceso exitoso");
            response.setStatus("INFO");
            response.setData(prodTemplate);
        } else {
            response.setErrorCode("100");
            response.setMessage("No hay información que mostrar");
            response.setStatus("ERROR");
            response.setData(prodTemplate);
        }
    }


    public static createObjResponseEmpty(response: ResponseObj, state: boolean) {

        if (state) {
            response.setErrorCode("0");
            response.setStatus("INFO");
        } else {
            response.setErrorCode("100");
            response.setStatus("ERROR");
        }
    }


}