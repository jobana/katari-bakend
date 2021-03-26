import { Season } from './../model/product/season';
import { AdminController } from './../admin/controllers/adminController';
import { ContactModel, IContact } from './../model/product/contact';
import { configurationSchema } from './../model/config/configuration';
import { PriceSchema } from '../model/product/prices';
import { SeasonSchema } from '../model/product/season';
import { UtilKatari } from '../util/utils';

import { ResponseObj } from '../domain/response';

import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
const price = mongoose.model('prices', PriceSchema);
const configuration = mongoose.model('configuration', configurationSchema);


export class MainController {



    public findSeason(req: Request, res: Response) {
        const responseObj = new ResponseObj();
        try {

            const options = {
                select: '-__v',
                sort: { creationDate: -1 },
                page: parseInt(req.params.pageNumber),
                limit: parseInt(req.params.nPerPage),
                collation: {
                    locale: 'en'
                }
            };
            Season.paginate({}, options, (err, data) => {
                if (err || data.length === 0) {
                    UtilKatari.createObjResponse(responseObj, null, false);
                    res.json(responseObj);
                } else {
                    UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
            });
        } catch (exception) {
            console.log('Problemas al consultar temporadas' + exception);
        }
    }

    public findSeasonByAlias(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            Season.find({ alias: req.params.alias }, (err, data) => {
                if (err || data == null) {
                    res.send();
                    UtilKatari.createObjResponse(responseObj, null, false);
                } else {
                    UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
            });
        } catch (exception) {
            console.log('Problemas al consultar temporadas' + exception);
        }

    }


    // Find prices

    public findPriceByMaterialCode(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            price.find({ "materialCode": req.body.materialCode }, { materialCode: 0, _id: 0, creationDate: 0 }, (err, data) => {
                if (err || data == null) {
                    UtilKatari.createObjResponse(responseObj, null, false);
                    res.json(responseObj);
                } else {
                    UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
            });
        } catch (exception) {
            console.log('Problemas al consultar precios' + exception);
        }
    }

    //Configuration
    public findConfigurationByCode(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            if (req.body.configCode != null) {
                configuration.find({ "configCode": req.body.configCode }, (err: any, data: any) => {
                    if (err || data == null || data.length == 0) {
                        UtilKatari.createObjResponse(responseObj, null, false);
                        res.json(responseObj);
                    } else {
                        UtilKatari.createObjResponse(responseObj, data, true);
                        res.json(responseObj);
                    }
                });
            } else {
                console.log('No existe');
                UtilKatari.createObjResponse(responseObj, null, false);
                res.json(responseObj);
            }

        } catch (exception) {
            console.log('Problemas al consultar configuraciones' + exception);
        }
    }

    public contact(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        let adminController = new AdminController();
        try {
            const objectContact: IContact = new ContactModel(req.body)
            objectContact.save((err) => {
                if (err) {
                    console.log("error: ", err);
                    UtilKatari.createObjResponse(responseObj, null, false);
                    res.json(responseObj);
                } else {
                    UtilKatari.createObjResponse(responseObj, null, true);
                    res.json(responseObj);

                    //Enviar correo

                    let email = {
                        from: "info@jochiduarte.com.co",
                        to: "info@jochiduarte.com.co",
                        subject: "Contactenos", // Subject line
                        text: req.body.name + " quiere contactarse " + req.body.message, // plain text body
                        html: req.body.name + " quiere contactarse " + req.body.message

                    };

                    adminController.sendEmailInternal(email);
                }
            });

        } catch (err) {
            console.log("Problemas al enviar datos de contacto: ", err);
        }
    }
}