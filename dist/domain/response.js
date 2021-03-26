"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseObj {
    setStatus(status) {
        this.status = status;
    }
    getStatus() {
        return this.status;
    }
    setErrorCode(errorCode) {
        this.errorCode = errorCode;
    }
    getErrorCode() {
        return this.errorCode;
    }
    setMessage(message) {
        this.message = message;
    }
    getMessage() {
        return this.message;
    }
    setData(data) {
        this.data = data;
    }
    getdata() {
        return this.data;
    }
}
exports.ResponseObj = ResponseObj;
//# sourceMappingURL=response.js.map