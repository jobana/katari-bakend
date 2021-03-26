import { modelschema } from './../model/product/models';
import { UserSchema, UserModel } from './../model/profile/user';
import { CustomerSchema } from './../model/profile/customer';
import { UtilKatari } from './../util/utils';
import { ResponseObj } from './../domain/response';
import * as mongoose from 'mongoose';
var ObjectId = require('mongoose').Types.ObjectId; 
import { Request, Response } from 'express';
import { UserController } from './userController';

const user = mongoose.model('users', UserSchema);
const customer = mongoose.model('customer', CustomerSchema);
const models = mongoose.model('Models', modelschema);


export class UserProfileController {

    public addUser(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        let newUser = new UserModel(req.body);
        newUser.save((err: any) => {
            if (err) {
                res.send(err);
                UtilKatari.createObjResponse(responseObj, null, false);
            } else {
                UtilKatari.createObjResponse(responseObj, newUser, true);
                res.json(responseObj);
            }
        });

        try {

        } catch (exception) {
            console.log('Problemas al momento de guardar la User' + exception);
        }
    }


    public findUserById(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            let id = req.body.id;
            user.findById({ "_id": req.params.idUser }, { password: 0 }, (err, data) => {
                if (err || data == null) {
                    res.send();
                    UtilKatari.createObjResponse(responseObj, null, false);
                } else {
                    UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
            });
        } catch (exception) {
            console.log('Problemas al consultar usuario' + exception);
        }

    }

    public async updateUser(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            const resp = await user.findOneAndUpdate({ _id: req.params.idUser }, req.body, { new: true }, (err, data) => {
                if (err || data == null) {
                    console.log('Error update user');
                    UtilKatari.createObjResponseEmpty(responseObj, false);
                    res.json(responseObj)
                } else {
                    UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
            });
        } catch (err) {
            console.log('Problemas al actualizar usuario' + err);
        }
    }

    //#############Crud customer######################//

    public findCustomerById(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            let id = req.body.id;
            customer.findById({ "_id": req.params.idCustomer }, (err, data) => {
                if (err || data == null) {
                    res.send();
                    UtilKatari.createObjResponse(responseObj, null, false);
                } else {
                    UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
            }).populate({
                path: 'favorites._id',
                select: '-__v'
            }).populate({
                path: 'myDesign._id',
                select: 'name'
            });
        } catch (exception) {
            console.log('Problemas al consultar customer' + exception);
        }

    }

    public findCustomerByIdUser(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            let id = req.body.id;
            customer.findOne({ "userId": new ObjectId(req.params.userId) }, (err, data) => {
                if (err || data == null) {
                    UtilKatari.createObjResponse(responseObj, null, false);
                    res.json(responseObj);
                } else {
                    UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
            }).populate({
                path: 'favorites._id',
                select: 'name'
            }).populate({
                path: 'myDesign._id',
                select: 'name'
            });
        } catch (exception) {
            console.log('Problemas al consultar customer' + exception);
        }

    }

    public addCustomer(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        let newCustomer = new customer(req.body);
        try {
            newCustomer.save((err: any) => {
                if (err) {
                    console.log('err customer: ', err);
                    UtilKatari.createObjResponse(responseObj, null, false);
                    res.json(responseObj);
                } else {
                    UtilKatari.createObjResponse(responseObj, newCustomer, true);
                    res.json(responseObj);
                }

            });
        } catch (exception) {
            console.log('Problemas al momento de guardar la Customer' + exception);
        }
    }

    public async updateCustomer(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            const resp = await customer.findOneAndUpdate({ _id: req.params.idCustomer }, req.body, { new: true }, (err, data) => {
                if (err || data == null) {
                    UtilKatari.createObjResponseEmpty(responseObj, false);
                    res.json(responseObj);
                } else {
                    UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
            });
        } catch (err) {
            console.log('Problemas al actualizar Customer' + err);
        }
    }


    /**
     * Method add design
     * @param req 
     * @param res 
     */
    public addDesignCustomer(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            if (req.body.add) {
                const resp = customer.findByIdAndUpdate({ _id: req.params.idCustomer },
                    { "$push": { "myDesign": [req.body.idDesign] } },
                    { new: true, upsert: true }, (err, data) => {
                        if (err || data == null) {
                            res.send(err);
                            UtilKatari.createObjResponseEmpty(responseObj, false);
                        } else {
                            UtilKatari.createObjResponse(responseObj, data, true);
                            res.json(responseObj);
                        }
                    });
            } else {
                const resp = customer.findByIdAndUpdate({ _id: req.params.idCustomer },
                    { "$pull": { "myDesign": { "$in": [req.body.idDesign] } } },
                    { new: true, upsert: true }, (err, data) => {
                        if (err || data == null) {
                            res.send(err);
                            UtilKatari.createObjResponseEmpty(responseObj, false);
                        } else {
                            UtilKatari.createObjResponse(responseObj, data, true);
                            res.json(responseObj);
                        }
                    });
            }
        } catch (err) {
            console.log('Problemas al usuario Customer' + err);
        }
    }

    /**
     * Method add Favorites
     * @param req 
     * @param res 
     */
    public AddfavoritesCustomer(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            if (req.body.add) {
                const resp = customer.findByIdAndUpdate({ _id: req.params.idCustomer },
                    { "$push": { "favorites": [{"_id": ObjectId(req.body.idFavorite) }] } },
                    { new: true, upsert: true }, (err, data) => {
                        if (err || data == null) {
                            res.send(err);
                            UtilKatari.createObjResponseEmpty(responseObj, false);
                        } else {
                            UtilKatari.createObjResponse(responseObj, data, true);
                            res.json(responseObj);
                        }
                    });
            } else {
                const resp = customer.findByIdAndUpdate({ _id: req.params.idCustomer },
                    { "$pull": { "favorites": { "$in": [{"_id": ObjectId(req.body.idFavorite) }] } } },
                    { new: true, upsert: true }, (err, data) => {
                        if (err || data == null) {
                            res.send(err);
                            UtilKatari.createObjResponseEmpty(responseObj, false);
                        } else {
                            UtilKatari.createObjResponse(responseObj, data, true);
                            res.json(responseObj);
                        }
                    });
            }
        } catch (err) {
            console.log('Problemas al usuario Customer' + err);
        }
    }

    /**
    * Method add Orders
    * @param req 
    * @param res 
    */
    public ordersCustomer(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            if (req.body.add) {
                const resp = customer.findByIdAndUpdate({ _id: req.params.idCustomer },
                    { "$push": { "myOrders": [req.body.idOrder] } },
                    { new: true, upsert: true }, (err, data) => {
                        if (err || data == null) {
                            res.send(err);
                            UtilKatari.createObjResponseEmpty(responseObj, false);
                        } else {
                            UtilKatari.createObjResponse(responseObj, data, true);
                            res.json(responseObj);
                        }
                    });
            } else {
                const resp = customer.findByIdAndUpdate({ _id: req.params.idCustomer },
                    { "$pull": { "myOrders": { "$in": [req.body.idOrder] } } },
                    { new: true, upsert: true }, (err, data) => {
                        if (err || data == null) {
                            res.send(err);
                            UtilKatari.createObjResponseEmpty(responseObj, false);
                        } else {
                            UtilKatari.createObjResponse(responseObj, data, true);
                            res.json(responseObj);
                        }
                    });
            }
        } catch (err) {
            console.log('Problemas al usuario Customer' + err);
        }
    }




}