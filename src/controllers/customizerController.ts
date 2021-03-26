import { Colors } from './../model/product/colors';
import { materialschema, Material } from './../model/product/material';
import { Customizer } from './../model/config/customizer';
import { UtilKatari } from './../util/utils';
import { ResponseObj } from './../domain/response';
import { Request, Response } from 'express';


export class CustomizerController {

    public getDefaulModel(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        let arrayDefaultModel: any = [];
        try {
            Customizer.find({ "category": req.body.category }, { creationDate: 0 }, (err, cust: any) => {

                if (err || cust.length == 0) {
                    console.log(`Errores ` + err);
                    UtilKatari.createObjResponse(responseObj, null, false);
                    res.json(responseObj);
                } else {
                    cust.forEach((cus: any) => {
                        if (cus.default == true) {
                            arrayDefaultModel.push(cus);
                        } else {
                            var onlyCategory = {
                                "id": cus._id,
                                "category": cus.category,
                                "code": cus.code,
                                "name": cus.name,
                                "state": cus.state,
                                "miniature": cus.miniature
                            };
                            arrayDefaultModel.push(onlyCategory);
                        }
                    });
                    if (arrayDefaultModel.length == 0) {
                        UtilKatari.createObjResponse(responseObj, null, false);
                        res.json(responseObj);
                    } else {
                        UtilKatari.createObjResponse(responseObj, arrayDefaultModel, true);
                        res.json(responseObj);
                    }
                }
            });
        } catch (err) {
            console.log('Problemas al consultar personalizador', err);
        }
    }


    public findMaterial(req: Request, res: Response) {
        let responseObj = new ResponseObj();

        try {
            const queryByCategory = {
                category: { $all: [req.body.category] }

            }
            Material.find(queryByCategory, { creationDate: 0 }, (err, data: any) => {
                if (err || data.length == 0) {
                    console.log(`Error al momento de consultar la informacion ` + err);
                    UtilKatari.createObjResponse(responseObj, null, false);
                    res.json(responseObj);
                } else {
                    UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
            });

        } catch (err) {
            console.log('Problemas al consultar el material: ', err);
        }

    }





    public findCustomizer(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            Customizer.find({}, (err, custo) => {
                if (err) {
                    res.send();
                    console.log(`Errores ` + res.send());
                    UtilKatari.createObjResponse(responseObj, null, false);
                } else {
                    UtilKatari.createObjResponse(responseObj, custo, true);
                    res.json(responseObj);
                }
            });
        } catch (exception) {
            console.log('Problemas al consultar personalizador' + exception);
        }
    }

    public findCustomizerById(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            Customizer.findById({ "_id": req.params.id }, { creationDate: 0 }, (err, data: any) => {
                if (err || data.length === 0) {
                    console.log(`Error al momento de consultar la informacion ` + err);
                    UtilKatari.createObjResponse(responseObj, null, false);
                    res.json(responseObj);
                } else {
                    UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
            });
        } catch (exception) {
            console.log('Problemas al consultar personalizador' + exception);
        }

    }



}


