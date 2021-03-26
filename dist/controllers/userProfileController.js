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
const models_1 = require("./../model/product/models");
const user_1 = require("./../model/profile/user");
const customer_1 = require("./../model/profile/customer");
const utils_1 = require("./../util/utils");
const response_1 = require("./../domain/response");
const mongoose = require("mongoose");
var ObjectId = require('mongoose').Types.ObjectId;
const user = mongoose.model('users', user_1.UserSchema);
const customer = mongoose.model('customer', customer_1.CustomerSchema);
const models = mongoose.model('Models', models_1.modelschema);
class UserProfileController {
    addUser(req, res) {
        let responseObj = new response_1.ResponseObj();
        let newUser = new user_1.UserModel(req.body);
        newUser.save((err) => {
            if (err) {
                res.send(err);
                utils_1.UtilKatari.createObjResponse(responseObj, null, false);
            }
            else {
                utils_1.UtilKatari.createObjResponse(responseObj, newUser, true);
                res.json(responseObj);
            }
        });
        try {
        }
        catch (exception) {
            console.log('Problemas al momento de guardar la User' + exception);
        }
    }
    findUserById(req, res) {
        let responseObj = new response_1.ResponseObj();
        try {
            let id = req.body.id;
            user.findById({ "_id": req.params.idUser }, { password: 0 }, (err, data) => {
                if (err || data == null) {
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
            console.log('Problemas al consultar usuario' + exception);
        }
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let responseObj = new response_1.ResponseObj();
            try {
                const resp = yield user.findOneAndUpdate({ _id: req.params.idUser }, req.body, { new: true }, (err, data) => {
                    if (err || data == null) {
                        console.log('Error update user');
                        utils_1.UtilKatari.createObjResponseEmpty(responseObj, false);
                        res.json(responseObj);
                    }
                    else {
                        utils_1.UtilKatari.createObjResponse(responseObj, data, true);
                        res.json(responseObj);
                    }
                });
            }
            catch (err) {
                console.log('Problemas al actualizar usuario' + err);
            }
        });
    }
    //#############Crud customer######################//
    findCustomerById(req, res) {
        let responseObj = new response_1.ResponseObj();
        try {
            let id = req.body.id;
            customer.findById({ "_id": req.params.idCustomer }, (err, data) => {
                if (err || data == null) {
                    res.send();
                    utils_1.UtilKatari.createObjResponse(responseObj, null, false);
                }
                else {
                    utils_1.UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
            }).populate({
                path: 'favorites._id',
                select: '-__v'
            }).populate({
                path: 'myDesign._id',
                select: 'name'
            });
        }
        catch (exception) {
            console.log('Problemas al consultar customer' + exception);
        }
    }
    findCustomerByIdUser(req, res) {
        let responseObj = new response_1.ResponseObj();
        try {
            let id = req.body.id;
            customer.findOne({ "userId": new ObjectId(req.params.userId) }, (err, data) => {
                if (err || data == null) {
                    utils_1.UtilKatari.createObjResponse(responseObj, null, false);
                    res.json(responseObj);
                }
                else {
                    utils_1.UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
            }).populate({
                path: 'favorites._id',
                select: 'name'
            }).populate({
                path: 'myDesign._id',
                select: 'name'
            });
        }
        catch (exception) {
            console.log('Problemas al consultar customer' + exception);
        }
    }
    addCustomer(req, res) {
        let responseObj = new response_1.ResponseObj();
        let newCustomer = new customer(req.body);
        try {
            newCustomer.save((err) => {
                if (err) {
                    console.log('err customer: ', err);
                    utils_1.UtilKatari.createObjResponse(responseObj, null, false);
                    res.json(responseObj);
                }
                else {
                    utils_1.UtilKatari.createObjResponse(responseObj, newCustomer, true);
                    res.json(responseObj);
                }
            });
        }
        catch (exception) {
            console.log('Problemas al momento de guardar la Customer' + exception);
        }
    }
    updateCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let responseObj = new response_1.ResponseObj();
            try {
                const resp = yield customer.findOneAndUpdate({ _id: req.params.idCustomer }, req.body, { new: true }, (err, data) => {
                    if (err || data == null) {
                        utils_1.UtilKatari.createObjResponseEmpty(responseObj, false);
                        res.json(responseObj);
                    }
                    else {
                        utils_1.UtilKatari.createObjResponse(responseObj, data, true);
                        res.json(responseObj);
                    }
                });
            }
            catch (err) {
                console.log('Problemas al actualizar Customer' + err);
            }
        });
    }
    /**
     * Method add design
     * @param req
     * @param res
     */
    addDesignCustomer(req, res) {
        let responseObj = new response_1.ResponseObj();
        try {
            if (req.body.add) {
                const resp = customer.findByIdAndUpdate({ _id: req.params.idCustomer }, { "$push": { "myDesign": [req.body.idDesign] } }, { new: true, upsert: true }, (err, data) => {
                    if (err || data == null) {
                        res.send(err);
                        utils_1.UtilKatari.createObjResponseEmpty(responseObj, false);
                    }
                    else {
                        utils_1.UtilKatari.createObjResponse(responseObj, data, true);
                        res.json(responseObj);
                    }
                });
            }
            else {
                const resp = customer.findByIdAndUpdate({ _id: req.params.idCustomer }, { "$pull": { "myDesign": { "$in": [req.body.idDesign] } } }, { new: true, upsert: true }, (err, data) => {
                    if (err || data == null) {
                        res.send(err);
                        utils_1.UtilKatari.createObjResponseEmpty(responseObj, false);
                    }
                    else {
                        utils_1.UtilKatari.createObjResponse(responseObj, data, true);
                        res.json(responseObj);
                    }
                });
            }
        }
        catch (err) {
            console.log('Problemas al usuario Customer' + err);
        }
    }
    /**
     * Method add Favorites
     * @param req
     * @param res
     */
    AddfavoritesCustomer(req, res) {
        let responseObj = new response_1.ResponseObj();
        try {
            if (req.body.add) {
                const resp = customer.findByIdAndUpdate({ _id: req.params.idCustomer }, { "$push": { "favorites": [{ "_id": ObjectId(req.body.idFavorite) }] } }, { new: true, upsert: true }, (err, data) => {
                    if (err || data == null) {
                        res.send(err);
                        utils_1.UtilKatari.createObjResponseEmpty(responseObj, false);
                    }
                    else {
                        utils_1.UtilKatari.createObjResponse(responseObj, data, true);
                        res.json(responseObj);
                    }
                });
            }
            else {
                const resp = customer.findByIdAndUpdate({ _id: req.params.idCustomer }, { "$pull": { "favorites": { "$in": [{ "_id": ObjectId(req.body.idFavorite) }] } } }, { new: true, upsert: true }, (err, data) => {
                    if (err || data == null) {
                        res.send(err);
                        utils_1.UtilKatari.createObjResponseEmpty(responseObj, false);
                    }
                    else {
                        utils_1.UtilKatari.createObjResponse(responseObj, data, true);
                        res.json(responseObj);
                    }
                });
            }
        }
        catch (err) {
            console.log('Problemas al usuario Customer' + err);
        }
    }
    /**
    * Method add Orders
    * @param req
    * @param res
    */
    ordersCustomer(req, res) {
        let responseObj = new response_1.ResponseObj();
        try {
            if (req.body.add) {
                const resp = customer.findByIdAndUpdate({ _id: req.params.idCustomer }, { "$push": { "myOrders": [req.body.idOrder] } }, { new: true, upsert: true }, (err, data) => {
                    if (err || data == null) {
                        res.send(err);
                        utils_1.UtilKatari.createObjResponseEmpty(responseObj, false);
                    }
                    else {
                        utils_1.UtilKatari.createObjResponse(responseObj, data, true);
                        res.json(responseObj);
                    }
                });
            }
            else {
                const resp = customer.findByIdAndUpdate({ _id: req.params.idCustomer }, { "$pull": { "myOrders": { "$in": [req.body.idOrder] } } }, { new: true, upsert: true }, (err, data) => {
                    if (err || data == null) {
                        res.send(err);
                        utils_1.UtilKatari.createObjResponseEmpty(responseObj, false);
                    }
                    else {
                        utils_1.UtilKatari.createObjResponse(responseObj, data, true);
                        res.json(responseObj);
                    }
                });
            }
        }
        catch (err) {
            console.log('Problemas al usuario Customer' + err);
        }
    }
}
exports.UserProfileController = UserProfileController;
//# sourceMappingURL=userProfileController.js.map