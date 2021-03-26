import { DesignSchema } from './../model/product/design';
import { ProductTemplateSchema } from './../model/product/productTemplate';

import { UtilKatari } from './../util/utils';
import { ResponseObj } from './../domain/response';

import * as mongoose from 'mongoose';
import { Request, Response } from 'express';

const productTemplate = mongoose.model('productTemplate', ProductTemplateSchema);
const design = mongoose.model('design', DesignSchema);
export class ProductTemplateController {

    public findProductTemplate(req: Request, res: Response) {
        console.log(`Buscando plantillas`);
        let responseObj = new ResponseObj();
        try {
            productTemplate.find({}, (err, data) => {
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
            console.log('Problemas al consultar plantilla' + exception);
        }

    }

    public findProductTemplateById(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            productTemplate.findById(req.params.templateId, { creationDate: 0, __v: 0 }, (err, data) => {
                if (err) {
                    res.send();
                    UtilKatari.createObjResponse(responseObj, null, false);
                } else {
                    UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
            });
        } catch (exception) {
            console.log('Problemas al consultar plantilla' + exception);
        }

    }



    //CRUD design

    public findProductDesignById(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            design.find({ 'userId': req.params.userId }, { userId: 0, creationDate: 0, __v: 0 }, (err, data) => {
                if (err) {
                    res.send();
                    UtilKatari.createObjResponse(responseObj, null, false);
                } else {
                    UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
            });
        } catch (exception) {
            console.log('Problemas al consultar plantilla' + exception);
        }

    }


    public addProductTemplate(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        let newDesign = new design(req.body);
        try {
            newDesign.save((err) => {
                if (err) {
                    UtilKatari.createObjResponse(responseObj, null, false);
                    res.json(responseObj);
                } else {
                    UtilKatari.createObjResponse(responseObj, newDesign, true);
                    res.json(responseObj);
                }

            });
        } catch (exception) {
            console.log('Problemas al momento de guardar la plantilla' + exception);
        }
    }

    public updateProductTemplate(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            design.findOneAndUpdate({ _id: req.params.templateId }, req.body, { new: true }, (err, task) => {
                if (err) {
                    res.send(err);
                    responseObj.setMessage("No hay informacion que mostrar " + err);
                    UtilKatari.createObjResponseEmpty(responseObj, true);
                } else {
                    UtilKatari.createObjResponseEmpty(responseObj, true);
                    res.json(responseObj);
                }
            });
        } catch (exception) {
            console.log('Problemas al momento de actualizar la plantilla' + exception);
        }

    }
    public deleteProductTemplate(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            design.remove({ _id: req.params.templateId }, (err) => {
                if (err) {
                    responseObj.setMessage("No hay informacion que mostrar " + err)
                    UtilKatari.createObjResponseEmpty(responseObj, false);
                    res.json(responseObj);
                } else {
                    UtilKatari.createObjResponseEmpty(responseObj, true);
                    res.json(responseObj);
                }
            });
        } catch (exception) {
            console.log('Problemas al momento de actualizar la plantilla' + exception);
        }

    }

}

