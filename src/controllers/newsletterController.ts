import { UtilKatari } from './../util/utils';
import { ResponseObj } from './../domain/response';
import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { INewsLetter, NewsLetter } from './../model/news/newsLetter';

export class NewsLetterController {
    public responseObj = new ResponseObj();

    public async findNews(req: Request, res: Response) {
        console.log(`searching news`);
        let responseObj = new ResponseObj();
        try {
            const newsLetters = await NewsLetter.find({}, (err, data) => {
                if (err) {
                    res.send();
                    console.log(`Errores ` + res.send());
                    UtilKatari.createObjResponse(responseObj, null, false);
                } else {
                    UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
            });
        } catch (exception) {
            console.log('Problemas al consultar news' + exception);
        }

    }

    public async findNewsById(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            const newsLetters = await NewsLetter.findById(req.params.productTemplateId, (err, data) => {
                if (err) {
                    res.send();
                    UtilKatari.createObjResponse(responseObj, null, false);
                } else {
                    UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
            });
        } catch (exception) {
            console.log('Problemas al consultar news' + exception);
        }

    }

    public addNews(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            const newsLetterObj: INewsLetter = new NewsLetter(req.body);

            NewsLetter.find({ "email": req.body.email }, (err: any, data: any) => {
                if (err || data.length > 0) {
                    responseObj.setMessage("Error este usuario ya existe");
                    UtilKatari.createObjResponseEmpty(responseObj, false);
                    res.json(responseObj);
                } else {
                    newsLetterObj.save((err) => {
                        if (err) {
                            UtilKatari.createObjResponse(responseObj, null, false);
                            res.json(responseObj);
                        } else {
                            UtilKatari.createObjResponse(responseObj, newsLetterObj, true);
                            res.json(responseObj);
                        }

                    });
                }
            });


        } catch (exception) {
            console.log('Problemas al momento de guardar la news', exception);
        }
    }

    public async updateNews(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            const newsLetters = await NewsLetter.findOneAndUpdate({ _id: req.params.templateId }, req.body, { new: true }, (err, newsLetters) => {
                if (err) {
                    res.send(err);
                    this.responseObj.setMessage("No hay informacion que mostrar " + err)
                    UtilKatari.createObjResponseEmpty(responseObj, true);
                } else {
                    UtilKatari.createObjResponseEmpty(responseObj, true);
                    res.json(responseObj);
                }
            });
        } catch (exception) {
            console.log('Problemas al momento de actualizar la news', exception);
        }

    }
    public async deleteNews(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            const newsLetters = await NewsLetter.remove({ email: req.params.email }, (err) => {
                if (err) {
                    res.send(err);
                    this.responseObj.setMessage("No hay informacion que mostrar " + err)
                    UtilKatari.createObjResponseEmpty(responseObj, false);
                } else {
                    UtilKatari.createObjResponseEmpty(responseObj, true);
                    res.json(responseObj);
                }
            });
        } catch (exception) {
            console.log('Problemas al momento de actualizar la news', exception);
        }

    }

}

