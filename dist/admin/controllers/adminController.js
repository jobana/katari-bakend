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
const keys_1 = require("./../../config/keys");
const response_1 = require("./../../domain/response");
const utils_1 = require("./../../util/utils");
const models_1 = require("./../../model/product/models");
const aws = require("aws-sdk");
const fs = require("fs");
const nodemailer = require("nodemailer");
class AdminController {
    constructor() {
        this.responseObj = new response_1.ResponseObj();
    }
    findModel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let responseObj = new response_1.ResponseObj();
            try {
                let pageNumber = parseInt(req.params.pageNumber);
                let nPerPage = parseInt(req.params.nPerPage);
                let pageN = pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0;
                let objQuery = {};
                let query = req.params.category == "" || req.params.category == undefined ? objQuery : objQuery = { category: req.params.category };
                models_1.Models.find(query, { publish: 0 }, { skip: pageN, limit: nPerPage }, (err, data) => {
                    if (err || data.length == 0) {
                        console.log(`Errores ` + err);
                        responseObj.setMessage("No hay resultados que mostrar: " + err);
                        utils_1.UtilKatari.createObjResponseEmpty(responseObj, false);
                        res.json(responseObj);
                    }
                    else {
                        utils_1.UtilKatari.createObjResponse(responseObj, data, true);
                        res.json(responseObj);
                    }
                }).sort({ creationDate: -1 });
            }
            catch (exception) {
                console.log('Problemas al consultar modelos: ' + exception);
            }
        });
    }
    findModelById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let responseObj = new response_1.ResponseObj();
            try {
                const newsLetters = yield models_1.Models.findById(req.params.id, (err, data) => {
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
                console.log('Problemas al consultar modelos: ' + exception);
            }
        });
    }
    loadFileProduct(req, res) {
        let responseObj = new response_1.ResponseObj();
        try {
            aws.config.update({
                accessKeyId: keys_1.accessKeyId,
                secretAccessKey: keys_1.secretAccessKey,
                region: keys_1.regionAws
            });
            const s3 = new aws.S3();
            var params = {
                ACL: 'public-read',
                Bucket: keys_1.bucketName,
                Body: fs.createReadStream(req.file.path),
                Key: `${req.body.path}/${req.body.type}/${req.file.originalname}`
            };
            s3.upload(params, (err, data) => {
                if (err) {
                    responseObj.setMessage("Error al subir el archivo: " + err);
                    utils_1.UtilKatari.createObjResponseEmpty(responseObj, false);
                    res.json(responseObj);
                    console.log('Error occured while trying to upload to S3 bucket', err);
                }
                if (data) {
                    fs.unlinkSync(req.file.path); // Empty temp folder
                    utils_1.UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
                else {
                    responseObj.setMessage("Error al subir el archivo: " + err);
                    utils_1.UtilKatari.createObjResponseEmpty(responseObj, false);
                    res.json(responseObj);
                    console.log('Error occured while trying to upload to S3 bucket', err);
                }
            });
        }
        catch (exception) {
            res.send(exception);
            console.log('Problemas al momento de guardar el archiv para el producto: ', exception);
        }
    }
    loadFileAws(req, res) {
        let responseObj = new response_1.ResponseObj();
        try {
            aws.config.update({
                accessKeyId: keys_1.accessKeyId,
                secretAccessKey: keys_1.secretAccessKey,
                region: keys_1.regionAws
            });
            const s3 = new aws.S3();
            var params = {
                ACL: 'public-read',
                Bucket: keys_1.bucketName,
                Body: fs.createReadStream(req.file.path),
                Key: `${req.body.type}/${req.body.category}/${req.body.section}/${req.file.originalname}`
            };
            s3.upload(params, (err, data) => {
                if (err) {
                    responseObj.setMessage("Error al subir el archivo: " + err);
                    utils_1.UtilKatari.createObjResponseEmpty(responseObj, false);
                    res.json(responseObj);
                    console.log('Error occured while trying to upload to S3 bucket', err);
                }
                if (data) {
                    fs.unlinkSync(req.file.path); // Empty temp folder
                    utils_1.UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
                else {
                    responseObj.setMessage("Error al subir el archivo: " + err);
                    utils_1.UtilKatari.createObjResponseEmpty(responseObj, false);
                    res.json(responseObj);
                    console.log('Error occured while trying to upload to S3 bucket', err);
                }
            });
        }
        catch (exception) {
            res.send(exception);
            console.log('Problemas al momento de guardar el modelo: ', exception);
        }
    }
    deleteFileAws(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let responseObj = new response_1.ResponseObj();
            try {
                aws.config.update({
                    accessKeyId: keys_1.accessKeyId,
                    secretAccessKey: keys_1.secretAccessKey,
                    region: keys_1.regionAws
                });
                const s3 = new aws.S3();
                var params = {
                    Bucket: keys_1.bucketName,
                    Key: `${req.body.pathFile}`
                };
                yield s3.headObject(params).promise();
                console.log("File Found in S3");
                try {
                    yield s3.deleteObject(params).promise();
                    console.log("file deleted Successfully");
                    utils_1.UtilKatari.createObjResponse(responseObj, null, true);
                    res.json(responseObj);
                }
                catch (err) {
                    utils_1.UtilKatari.createObjResponseEmpty(responseObj, false);
                    res.json(responseObj);
                    console.log("ERROR in file Deleting : " + JSON.stringify(err));
                }
            }
            catch (exception) {
                console.log('Problemas al momento de eliminar el archivo en aws: ', exception);
            }
        });
    }
    createModel(req, res) {
        let responseObj = new response_1.ResponseObj();
        try {
            const modelObj = new models_1.Models(req.body);
            models_1.Models.find({ "code": req.body.code }, (err, data) => {
                if (err || data.length > 0) {
                    responseObj.setMessage("Ya existe un modelo con el mismo codigo");
                    utils_1.UtilKatari.createObjResponseEmpty(responseObj, false);
                    res.json(responseObj);
                }
                else {
                    modelObj.save((err, data) => {
                        if (err || data.length == 0) {
                            utils_1.UtilKatari.createObjResponse(responseObj, null, false);
                            res.json(responseObj);
                        }
                        else {
                            utils_1.UtilKatari.createObjResponse(responseObj, modelObj, true);
                            res.json(responseObj);
                        }
                    });
                }
            });
        }
        catch (exception) {
            console.log('Problemas al momento de guardar el modelo: ', exception);
        }
    }
    updateModel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let responseObj = new response_1.ResponseObj();
            try {
                const blog = yield models_1.Models.findOneAndUpdate({ _id: req.params.templateId }, req.body, { new: true }, (err, data) => {
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
                console.log('Problemas al momento de actualizar el articulo: ', exception);
            }
        });
    }
    deleteModel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let responseObj = new response_1.ResponseObj();
            try {
                const blog = yield models_1.Models.remove({ _id: req.params.templateId }, (err) => {
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
                console.log('Problemas al momento el articulo: ', exception);
            }
        });
    }
    sendEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let transporter = nodemailer.createTransport({
                    host: "smtp-relay.sendinblue.com",
                    port: 587,
                    secure: false,
                    auth: {
                        user: "info@jochiduarte.com.co",
                        pass: "UaQ20I1XLbq8JwDP",
                    },
                });
                let info = yield transporter.sendMail({
                    from: '"Fred Foo 👻" <piedrapalo@gmail.com>',
                    to: "luismezahe@gmail.com",
                    subject: "Hello ✔",
                    text: "Hello world?",
                    html: "<b>Hello world?</b>",
                });
                if (info.messageId) {
                    console.log("Message sent: %s", info.messageId);
                    res.json({ "message": "exitoso" });
                }
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview only available when sending through an Ethereal account
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            }
            catch (err) {
                res.json({ "status": "ERROR", "message": err });
                console.log("error email", err);
            }
        });
    }
    sendEmailInternal(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let transporter = nodemailer.createTransport({
                    host: "smtp-relay.sendinblue.com",
                    port: 587,
                    secure: false,
                    auth: {
                        user: "info@jochiduarte.com.co",
                        pass: "UaQ20I1XLbq8JwDP",
                    },
                });
                let info = yield transporter.sendMail({
                    from: object.from,
                    to: object.to,
                    subject: object.subject,
                    text: object.text,
                    html: "<b>Datos de contacto</b> " + object.html,
                });
                if (info.messageId) {
                    console.log("Message sent: %s", info.messageId);
                    return true;
                    // res.json({"message": "exitoso"})
                }
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview only available when sending through an Ethereal account
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            }
            catch (err) {
                return false;
                // res.json({"status": "ERROR", "message": err})
                console.log("error email", err);
            }
        });
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=adminController.js.map