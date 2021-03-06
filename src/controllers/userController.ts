import { ResponseObj } from './../domain/response';
import { UtilKatari } from './../util/utils';
import { UserModel } from './../model/profile/user';
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
var passport = require("passport");
import "../middlewares/passportHandler";
import * as bcrypt from "bcrypt-nodejs";
import * as randtoken from "rand-token";


export class UserController {

    public findUserByRol(email: string, rol: string){
        try{
            UserModel.find({$and: [{"email": email}, {"rol": email}]}, (err: any, data: any)=>{
                if (err || data.length == 0) {
                    return false;
                }else{
                    let obj = {
                        email: data.email,
                        rol: data.rol
                    };
                    return true;
                }
            });

        }catch(err){
            console.log('Problemas al consultar usuario ', err);
        }


    }

    public registerUser(req: Request, res: Response) {
        let responseObj = new ResponseObj();
       
        try {
            let email = req.body.email;
            UserModel.find({ "email": email }, (err: any, data: any) => {
                if (err || data.length == 0) {
                    const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
                    UserModel.create({
                        email: req.body.email,
                        roles: req.body.roles,
                        password: hashedPassword,
                        state: "INACTIVE",
                    }, (err: any, data: any) => {
                        if (err || data.length == 0) {
                            responseObj.setMessage("Error en la creacion: " + err);
                            UtilKatari.createObjResponseEmpty(responseObj, false);
                            res.json(responseObj);
                            console.log('Error: ' + err);
                        } else {
                            //Enviar correo electronico con endpoint de validacion de cuenta
                            let objectEmail = {
                                email: req.body.email
                            };
                            
                            responseObj.setMessage("Correo electronico con el siguiente codigo: " + data._id);
                            UtilKatari.createObjResponseEmpty(responseObj, true);
                            res.json(responseObj);
                        }
                    });
                } else {
                    responseObj.setMessage("Existe una cuenta asociada a este correo: ");
                    responseObj.setErrorCode("101");
                    UtilKatari.createObjResponseEmpty(responseObj, false);
                    res.json(responseObj);
                }
            })

        } catch (err) {
            console.log('Problemas al momento de registrar el usuario: ' + req.body.email + ' ' + err);
        }

    }

    public authenticateUser(req: Request, res: Response) {
        let getUser: any;

        UserModel.findOne({ "email": req.body.email }, { creationDate: 0, __v: 0 }).then((user: any) => {
            if (user == null) {
                return res.status(401).json({
                    errorCode: "101",
                    status: "ERROR",
                    message: "No existe el usuario"
                })
            } else {
                if (user.state == "INACTIVE") {
                    return res.status(401).json({
                        errorCode: "0",
                        status: "INFO",
                        message: "El usuario pendiente por activar cuenta codigo: " + user._id
                    });
                } else {
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
                            }, UtilKatari.JWT_SECRET, { expiresIn: UtilKatari.EXPIRE_TIME_JWT });
                            let refreshToken = randtoken.uid(256)

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
                        } else {
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

    public activeAccountByCode(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            let codigo = req.params.code
            UserModel.findById({ "_id": codigo }, (err: any, data: any) => {
                console.log("Datos de respuesta: ", data);
                if (data.state == "ACTIVE") {
                    res.status(200).json({
                        errorCode: "100",
                        status: "INFO",
                        message: "La cuenta se encuentra activa, por favor iniciar sesi??n"
                    });
                } else {
                    UserModel.updateOne({ "_id": codigo }, { state: "ACTIVE" }, { new: true }, (err: any, data: any) => {
                        if (err || data == null) {
                            console.log('Error: ', err);
                            responseObj.setMessage("Error en la activacion: " + err);
                            UtilKatari.createObjResponseEmpty(responseObj, false);
                            res.json(responseObj);
                        } else {
                            responseObj.setMessage("Cuenta activa");
                            UtilKatari.createObjResponseEmpty(responseObj, true);
                            res.json(responseObj);
                        }
                    });
                }
            });

        } catch (err) {
            console.log("Problemas al momento de activar cuenta: ", req.params.email);
        }
    }

    public forgotPassword(req: Request, res: Response) {
        try {
            let email = req.body.email
            UserModel.find({ "email": email }, (err: any, data: any) => {
                if (data.state == "INACTIVE") {
                    res.status(200).json({
                        errorCode: "100",
                        status: "INFO",
                        message: "La cuenta se encuentra Inactiva, por favor activar"
                    });
                } else {
                    //Enviar correo con instrucciones
                    res.status(200).json({
                        errorCode: "0",
                        status: "INFO",
                        message: "Te enviamos un correo con instrucciones para activar cuenta"
                    });
                }
            });

        } catch (err) {
            console.log("Error al momento de cambiar clave: ");
        }
    }

    public changePassword(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            let newPassword = req.body.password;
            const hashedPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
            UserModel.findByIdAndUpdate({ "_id": req.params.idUser }, { password: hashedPassword }, { new: true }, (err: any, data: any) => {
                if (err || data == null) {
                    responseObj.setMessage("No fue posible cambiar la clave: "+ err);
                    UtilKatari.createObjResponseEmpty(responseObj, false);
                    res.json(responseObj);
                } else {
                    UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
            });

        } catch (err) {
            console.log("Problemas al momento de cambiar la clave: ", err);
        }
    }


    public registerUserFacebook(req: Request, res: Response) {
        let newUserModel = new UserModel(req.body);
        UserModel.findOne({ 'facebookProvider.id': req.body.profile.id }, (err, data: any) => {
            if (err || data == null) {
                console.log('err facebookuser: ', err);
            } else {
                newUserModel.save((err) => {
                    if (err) {
                        console.log('err customer: ', err);
                    } else {
                        console.log('Sucess');
                    }

                });
            }
        })
    }


    public upsertFbUser(accessToken: any, refreshToken: any, profile: any, cb: any) {

        UserModel.findOne({
            'facebookProvider.id': profile.id
        }, function (err: any, user: any) {
            // no user was found, lets create a new one
            if (!user) {
                var newUser = new UserModel({
                    fullName: profile.displayName,
                    email: profile.emails[0].value,
                    facebookProvider: {
                        id: profile.id,
                        token: accessToken
                    }
                });

                newUser.save(function (error: any, savedUser: any) {
                    if (error) {
                        console.log(error);
                    }
                    return cb(error, savedUser);
                });
            } else {
                return cb(err, user);
            }
        });
    }

}