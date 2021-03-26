"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("./../domain/response");
const utils_1 = require("./../util/utils");
const user_1 = require("./../model/profile/user");
const jwt = require("jsonwebtoken");
var passport = require("passport");
require("../middlewares/passportHandler");
const bcrypt = require("bcrypt-nodejs");
const randtoken = require("rand-token");
class UserController {
    findUserByRol(email, rol) {
        try {
            user_1.UserModel.find({ $and: [{ "email": email }, { "rol": email }] }, (err, data) => {
                if (err || data.length == 0) {
                    return false;
                }
                else {
                    let obj = {
                        email: data.email,
                        rol: data.rol
                    };
                    return true;
                }
            });
        }
        catch (err) {
            console.log('Problemas al consultar usuario ', err);
        }
    }
    registerUser(req, res) {
        let responseObj = new response_1.ResponseObj();
        try {
            let email = req.body.email;
            user_1.UserModel.find({ "email": email }, (err, data) => {
                if (err || data.length == 0) {
                    const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
                    user_1.UserModel.create({
                        email: req.body.email,
                        roles: req.body.roles,
                        password: hashedPassword,
                        state: "INACTIVE",
                    }, (err, data) => {
                        if (err || data.length == 0) {
                            responseObj.setMessage("Error en la creacion: " + err);
                            utils_1.UtilKatari.createObjResponseEmpty(responseObj, false);
                            res.json(responseObj);
                            console.log('Error: ' + err);
                        }
                        else {
                            //Enviar correo electronico con endpoint de validacion de cuenta
                            let objectEmail = {
                                email: req.body.email
                            };
                            responseObj.setMessage("Correo electronico con el siguiente codigo: " + data._id);
                            utils_1.UtilKatari.createObjResponseEmpty(responseObj, true);
                            res.json(responseObj);
                        }
                    });
                }
                else {
                    responseObj.setMessage("Existe una cuenta asociada a este correo: ");
                    responseObj.setErrorCode("101");
                    utils_1.UtilKatari.createObjResponseEmpty(responseObj, false);
                    res.json(responseObj);
                }
            });
        }
        catch (err) {
            console.log('Problemas al momento de registrar el usuario: ' + req.body.email + ' ' + err);
        }
    }
    authenticateUser(req, res) {
        let getUser;
        user_1.UserModel.findOne({ "email": req.body.email }, { creationDate: 0, __v: 0 }).then((user) => {
            if (user == null) {
                return res.status(401).json({
                    errorCode: "101",
                    status: "ERROR",
                    message: "No existe el usuario"
                });
            }
            else {
                if (user.state == "INACTIVE") {
                    return res.status(401).json({
                        errorCode: "0",
                        status: "INFO",
                        message: "El usuario pendiente por activar cuenta codigo: " + user._id
                    });
                }
                else {
                    getUser = user;
                    return bcrypt.compare(req.body.password, user.password, (err, dataResult) => {
                        if (err) {
                            return res.status(401).json({
                                errorCode: "103",
                                status: "ERROR",
                                message: "Error validando password"
                            });
                        }
                        if (dataResult) {
                            console.log('password OK');
                            let jwtToken = jwt.sign({
                                email: getUser.email,
                                roles: getUser.roles
                            }, utils_1.UtilKatari.JWT_SECRET, { expiresIn: utils_1.UtilKatari.EXPIRE_TIME_JWT });
                            let refreshToken = randtoken.uid(256);
                            let infUser = {
                                "_id": getUser._id,
                                "email": getUser.email,
                                "state": getUser.state
                            };
                            res.status(200).json({
                                errorCode: "0",
                                status: "INFO",
                                token: jwtToken,
                                infoUSer: infUser,
                                refreshTokenTemp: refreshToken
                            });
                        }
                        else {
                            return res.status(401).json({
                                errorCode: "101",
                                status: "ERROR",
                                message: "Password incorrecta"
                            });
                        }
                    });
                }
            }
        }).catch(err => {
            return res.status(401).json({
                errorCode: "102",
                status: "ERROR",
                message: "Error autenticando"
            });
        });
    }
    activeAccountByCode(req, res) {
        let responseObj = new response_1.ResponseObj();
        try {
            let codigo = req.params.code;
            user_1.UserModel.findById({ "_id": codigo }, (err, data) => {
                console.log("Datos de respuesta: ", data);
                if (data.state == "ACTIVE") {
                    res.status(200).json({
                        errorCode: "100",
                        status: "INFO",
                        message: "La cuenta se encuentra activa, por favor iniciar sesión"
                    });
                }
                else {
                    user_1.UserModel.updateOne({ "_id": codigo }, { state: "ACTIVE" }, { new: true }, (err, data) => {
                        if (err || data == null) {
                            console.log('Error: ', err);
                            responseObj.setMessage("Error en la activacion: " + err);
                            utils_1.UtilKatari.createObjResponseEmpty(responseObj, false);
                            res.json(responseObj);
                        }
                        else {
                            responseObj.setMessage("Cuenta activa");
                            utils_1.UtilKatari.createObjResponseEmpty(responseObj, true);
                            res.json(responseObj);
                        }
                    });
                }
            });
        }
        catch (err) {
            console.log("Problemas al momento de activar cuenta: ", req.params.email);
        }
    }
    forgotPassword(req, res) {
        try {
            let email = req.body.email;
            user_1.UserModel.find({ "email": email }, (err, data) => {
                if (data.state == "INACTIVE") {
                    res.status(200).json({
                        errorCode: "100",
                        status: "INFO",
                        message: "La cuenta se encuentra Inactiva, por favor activar"
                    });
                }
                else {
                    //Enviar correo con instrucciones
                    res.status(200).json({
                        errorCode: "0",
                        status: "INFO",
                        message: "Te enviamos un correo con instrucciones para activar cuenta"
                    });
                }
            });
        }
        catch (err) {
            console.log("Error al momento de cambiar clave: ");
        }
    }
    changePassword(req, res) {
        let responseObj = new response_1.ResponseObj();
        try {
            let newPassword = req.body.password;
            const hashedPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
            user_1.UserModel.findByIdAndUpdate({ "_id": req.params.idUser }, { password: hashedPassword }, { new: true }, (err, data) => {
                if (err || data == null) {
                    responseObj.setMessage("No fue posible cambiar la clave: " + err);
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
            console.log("Problemas al momento de cambiar la clave: ", err);
        }
    }
    registerUserFacebook(req, res) {
        let newUserModel = new user_1.UserModel(req.body);
        user_1.UserModel.findOne({ 'facebookProvider.id': req.body.profile.id }, (err, data) => {
            if (err || data == null) {
                console.log('err facebookuser: ', err);
            }
            else {
                newUserModel.save((err) => {
                    if (err) {
                        console.log('err customer: ', err);
                    }
                    else {
                        console.log('Sucess');
                    }
                });
            }
        });
    }
    upsertFbUser(accessToken, refreshToken, profile, cb) {
        user_1.UserModel.findOne({
            'facebookProvider.id': profile.id
        }, function (err, user) {
            // no user was found, lets create a new one
            if (!user) {
                var newUser = new user_1.UserModel({
                    fullName: profile.displayName,
                    email: profile.emails[0].value,
                    facebookProvider: {
                        id: profile.id,
                        token: accessToken
                    }
                });
                newUser.save(function (error, savedUser) {
                    if (error) {
                        console.log(error);
                    }
                    return cb(error, savedUser);
                });
            }
            else {
                return cb(err, user);
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map