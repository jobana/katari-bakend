export class ResponseObj {
    private status: string;
    private errorCode: string;
    private message: string;
    private data: object;

    public setStatus(status: string): void {
        this.status = status;
    }

    public getStatus() {
        return this.status;
    }

    public setErrorCode(errorCode: string): void {
        this.errorCode = errorCode;
    }

    public getErrorCode() {
        return this.errorCode;
    }

    public setMessage(message: string): void {
        this.message = message;
    }

    public getMessage() {
        return this.message;
    }

    public setData(data: object): void {
        this.data = data;
    }

    public getdata() {
        return this.data;
    }

}