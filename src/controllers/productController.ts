import { TokenUserInfo } from './../domain/tokenUserInfo';
import { UserController } from './userController';
import { UtilKatari } from './../util/utils';
import { ProductSchema, Product } from '../model/product/product';
import { ResponseObj } from '../domain/response';

import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import * as  fs from 'fs';
import * as AWS from 'aws-sdk';



export class ProductController {

    public findProductByCollection(req: Request, res: Response) {
        const responseObj = new ResponseObj();
        try {
            let query = {};
            const options = {
                page: parseInt(req.params.pageNumber),
                limit: parseInt(req.params.nPerPage),
                collation: {
                    locale: 'en'
                }
            };

            if (req.body.category != null) {
                query = {
                    collection: req.body.collection,
                    category: req.body.category
                };
            } else {
                query = {
                    collection: req.body.collection
                };
            }

            Product.paginate(query, options, (err, data) => {
                if (err || data.docs.length === 0) {
                    UtilKatari.createObjResponse(responseObj, null, false);
                    res.json(responseObj);
                    console.log(`Errores ` + err);
                } else {
                    UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
            });

        } catch (err) {
            console.log("Problemas al consultar productos por coleccion ", err);
        }
    }

    public findProducts(req: Request, res: Response) {
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
            const discount = req.body.discount;

            if (req.body.category != null) {
                const queryByCategory = {
                    category: { $all: req.body.category },
                    discount: req.body.discount == true ? { $gt: 0 } : 0,
                    state: "ACTIVE"
                }

                Product.paginate(queryByCategory, options, (err, data) => {
                    if (err || data.docs.length === 0) {
                        UtilKatari.createObjResponse(responseObj, null, false);
                        res.json(responseObj);
                        console.log(`Errores ` + res.send());
                    } else {
                        UtilKatari.createObjResponse(responseObj, data, true);
                        res.json(responseObj);
                    }
                });
            } else {
                const queryAll = {
                    discount: req.body.discount == true ? { $gt: 0 } : 0,
                    state: "ACTIVE"
                }

                Product.paginate(queryAll, options, (err, data) => {
                    if (err || data.docs.length === 0) {
                        UtilKatari.createObjResponse(responseObj, null, false);
                        res.send();
                        console.log(`Errores ` + res.send());
                    } else {
                        UtilKatari.createObjResponse(responseObj, data, true);
                        res.json(responseObj);
                    }
                });
            }

        } catch (exception) {
            console.log('Problemas al consultar productos' + exception);
        }
    }


    public findProductById(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            Product.findById(req.params.productId, (err, data) => {
                if (err) {
                    res.send();
                    UtilKatari.createObjResponse(responseObj, null, false);
                } else {
                    UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
            });
        } catch (exception) {
            console.log('Problemas al consultar producto' + exception);
        }

    }


    //Crud Product

    public addProduct(req: Request, res: Response) {
        const responseObj = new ResponseObj();
        const newProduct = new Product(req.body);
        try {
            const authHeader = req.headers.authorization;
            const tokenUseInfo = new TokenUserInfo().isAdmin(authHeader);
            if (tokenUseInfo != null && tokenUseInfo) {

                newProduct.save((err: any) => {
                    if (err) {
                        console.log('Error al momento de crear el producto: ', err);
                        responseObj.setMessage("No hay informacion que mostrar " + err)
                        UtilKatari.createObjResponseEmpty(responseObj, false);
                        res.json(responseObj);
                    } else {
                        UtilKatari.createObjResponse(responseObj, newProduct, true);
                        res.json(responseObj);
                    }
                });
            } else {
                responseObj.setMessage("usuario no autorizado")
                UtilKatari.createObjResponseEmpty(responseObj, false);
            }


        } catch (err) {
            console.log('Error al momento de crear el producto: ', err);
        }
    }




    public updateProduct(req: Request, res: Response) {
        const responseObj = new ResponseObj();
        try {
            const authHeader = req.headers.authorization;
            const tokenUseInfo = new TokenUserInfo().isAdmin(authHeader);
            if (tokenUseInfo != null && tokenUseInfo) {
                Product.findOneAndUpdate({ _id: req.params.productId }, req.body, { new: true }, (err, data) => {
                    if (err || data == null) {
                        responseObj.setMessage("No hay informacion que mostrar " + err)
                        UtilKatari.createObjResponseEmpty(responseObj, true);
                        res.json(responseObj);
                    } else {
                        UtilKatari.createObjResponse(responseObj, data, true);
                        res.json(responseObj);
                    }
                });
            }


        } catch (err) {
            console.log('Error al momento de actualizar: ', err);
        }
    }


    public deleteProduct(req: Request, res: Response) {
        const responseObj = new ResponseObj();
        try {
            const authHeader = req.headers.authorization;
            const tokenUseInfo = new TokenUserInfo().isAdmin(authHeader);
            if (tokenUseInfo != null && tokenUseInfo == true) {
                Product.remove({ _id: req.params.productId }, (err) => {
                    if (err) {
                        responseObj.setMessage("No hay informacion que mostrar " + err)
                        UtilKatari.createObjResponseEmpty(responseObj, true);
                        res.json(responseObj);
                    } else {
                        UtilKatari.createObjResponseEmpty(responseObj, true);
                        res.json(responseObj);
                    }
                });
            }
        } catch (err) {
            console.log('Error al intentar eliminar: ', err);
        }

    }




}