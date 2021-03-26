"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./../util/utils");
const response_1 = require("./../domain/response");
const newsLetter_1 = require("./../model/news/newsLetter");
class NewsLetterController {
    constructor() {
        this.responseObj = new response_1.ResponseObj();
    }
    findNews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`searching news`);
            let responseObj = new response_1.ResponseObj();
            try {
                const newsLetters = yield newsLetter_1.NewsLetter.find({}, (err, data) => {
                    if (err) {
                        res.send();
                        console.log(`Errores ` + res.send());
                        utils_1.UtilKatari.createObjResponse(responseObj, null, false);
                    }
                    else {
                        utils_1.UtilKatari.createObjResponse(responseObj, data, true);
                        res.json(responseObj);
                    }
                });
            }
            catch (exception) {
                console.log('Problemas al consultar news' + exception);
            }
        });
    }
    findNewsById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let responseObj = new response_1.ResponseObj();
            try {
                const newsLetters = yield newsLetter_1.NewsLetter.findById(req.params.productTemplateId, (err, data) => {
                    if (err) {
                        res.send();
                        utils_1.UtilKatari.createObjResponse(responseObj, null, false);
                    }
                    else {
                        utils_1.UtilKatari.createObjResponse(responseObj, data, true);
                        res.json(responseObj);
                    }
                });
            }
            catch (exception) {
                console.log('Problemas al consultar news' + exception);
            }
        });
    }
    addNews(req, res) {
        let responseObj = new response_1.ResponseObj();
        try {
            const newsLetterObj = new newsLetter_1.NewsLetter(req.body);
            newsLetter_1.NewsLetter.find({ "email": req.body.email }, (err, data) => {
                if (err || data.length > 0) {
                    responseObj.setMessage("Error este usuario ya existe");
                    utils_1.UtilKatari.createObjResponseEmpty(responseObj, false);
                    res.json(responseObj);
                }
                else {
                    newsLetterObj.save((err) => {
                        if (err) {
                            utils_1.UtilKatari.createObjResponse(responseObj, null, false);
                            res.json(responseObj);
                        }
                        else {
                            utils_1.UtilKatari.createObjResponse(responseObj, newsLetterObj, true);
                            res.json(responseObj);
                        }
                    });
                }
            });
        }
        catch (exception) {
            console.log('Problemas al momento de guardar la news', exception);
        }
    }
    updateNews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let responseObj = new response_1.ResponseObj();
            try {
                const newsLetters = yield newsLetter_1.NewsLetter.findOneAndUpdate({ _id: req.params.templateId }, req.body, { new: true }, (err, newsLetters) => {
                    if (err) {
                        res.send(err);
                        this.responseObj.setMessage("No hay informacion que mostrar " + err);
                        utils_1.UtilKatari.createObjResponseEmpty(responseObj, true);
                    }
                    else {
                        utils_1.UtilKatari.createObjResponseEmpty(responseObj, true);
                        res.json(responseObj);
                    }
                });
            }
            catch (exception) {
                console.log('Problemas al momento de actualizar la news', exception);
            }
        });
    }
    deleteNews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let responseObj = new response_1.ResponseObj();
            try {
                const newsLetters = yield newsLetter_1.NewsLetter.remove({ email: req.params.email }, (err) => {
                    if (err) {
                        res.send(err);
                        this.responseObj.setMessage("No hay informacion que mostrar " + err);
                        utils_1.UtilKatari.createObjResponseEmpty(responseObj, false);
                    }
                    else {
                        utils_1.UtilKatari.createObjResponseEmpty(responseObj, true);
                        res.json(responseObj);
                    }
                });
            }
            catch (exception) {
                console.log('Problemas al momento de actualizar la news', exception);
            }
        });
    }
}
exports.NewsLetterController = NewsLetterController;
//# sourceMappingURL=newsletterController.js.map