import { bucketName, accessKeyId, secretAccessKey, regionAws } from './../../config/keys';
import { ResponseObj } from './../../domain/response';
import { UtilKatari } from './../../util/utils';
import { Models, IModel } from './../../model/product/models';
import { Request, Response } from 'express';

import * as aws from 'aws-sdk';
import * as  fs from 'fs';

import * as nodemailer from 'nodemailer';

export class AdminController {
    public responseObj = new ResponseObj();

    public async findModel(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            let pageNumber = parseInt(req.params.pageNumber);
            let nPerPage = parseInt(req.params.nPerPage);
            let pageN = pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0;
            let objQuery = {}
            let query = req.params.category == "" || req.params.category == undefined ? objQuery : objQuery = { category: req.params.category };

            Models.find(query, { publish: 0 }, { skip: pageN, limit: nPerPage }, (err, data: any) => {
                if (err || data.length == 0) {
                    console.log(`Errores ` + err);
                    responseObj.setMessage("No hay resultados que mostrar: " + err);
                    UtilKatari.createObjResponseEmpty(responseObj, false);
                    res.json(responseObj);
                } else {
                    UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
            }).sort({ creationDate: -1 });
        } catch (exception) {
            console.log('Problemas al consultar modelos: ' + exception);
        }

    }

    public async findModelById(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            const newsLetters = await Models.findById(req.params.id, (err, data) => {
                if (err) {
                    res.send();
                    UtilKatari.createObjResponse(responseObj, null, false);
                } else {
                    UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
            });
        } catch (exception) {
            console.log('Problemas al consultar modelos: ' + exception);
        }

    }

    public loadFileProduct(req: Request, res: Response){
        let responseObj = new ResponseObj();
        try {
            aws.config.update({
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey,
                 region:regionAws
            });
            const s3 = new aws.S3();
 
            var params = {
                ACL: 'public-read',
                Bucket: bucketName,
                Body: fs.createReadStream(req.file.path),
                Key: `${req.body.path}/${req.body.type}/${req.file.originalname}`
            };

           

            s3.upload(params, (err: any, data: any) => {
                if (err) {
                    responseObj.setMessage("Error al subir el archivo: " + err);
                    UtilKatari.createObjResponseEmpty(responseObj, false);
                    res.json(responseObj);
                    console.log('Error occured while trying to upload to S3 bucket', err);
                }

                if (data) {
                    fs.unlinkSync(req.file.path); // Empty temp folder
                    UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                } else {
                    responseObj.setMessage("Error al subir el archivo: " + err);
                    UtilKatari.createObjResponseEmpty(responseObj, false);
                    res.json(responseObj);
                    console.log('Error occured while trying to upload to S3 bucket', err);
                }
            });
            

        } catch (exception) {
            res.send(exception);
            console.log('Problemas al momento de guardar el archiv para el producto: ', exception);
        }

    }


    public loadFileAws(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            aws.config.update({
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey,
                 region:regionAws
            });
            const s3 = new aws.S3();

            var params = {
                ACL: 'public-read',
                Bucket: bucketName,
                Body: fs.createReadStream(req.file.path),
                Key: `${req.body.type}/${req.body.category}/${req.body.section}/${req.file.originalname}`
            };

            s3.upload(params, (err: any, data: any) => {
                if (err) {
                    responseObj.setMessage("Error al subir el archivo: " + err);
                    UtilKatari.createObjResponseEmpty(responseObj, false);
                    res.json(responseObj);
                    console.log('Error occured while trying to upload to S3 bucket', err);
                }

                if (data) {
                    fs.unlinkSync(req.file.path); // Empty temp folder
                    UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                } else {
                    responseObj.setMessage("Error al subir el archivo: " + err);
                    UtilKatari.createObjResponseEmpty(responseObj, false);
                    res.json(responseObj);
                    console.log('Error occured while trying to upload to S3 bucket', err);
                }
            });

        } catch (exception) {
            res.send(exception);
            console.log('Problemas al momento de guardar el modelo: ', exception);
        }
    }

    public async deleteFileAws(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {

            aws.config.update({
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey,
                 region: regionAws
            });
            const s3 = new aws.S3();

            var params = {
                Bucket: bucketName,
                Key: `${req.body.pathFile}`
            };
            
            await s3.headObject(params).promise()
            console.log("File Found in S3")
            try {
                await s3.deleteObject(params).promise()
                console.log("file deleted Successfully")
                UtilKatari.createObjResponse(responseObj, null, true);
                res.json(responseObj);
            }
            catch (err) {
                UtilKatari.createObjResponseEmpty(responseObj, false);
                res.json(responseObj);
                console.log("ERROR in file Deleting : " + JSON.stringify(err))
            }

        } catch (exception) {
            console.log('Problemas al momento de eliminar el archivo en aws: ', exception);
        }
    }

    public createModel(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            const modelObj: IModel = new Models(req.body);
            Models.find({ "code": req.body.code }, (err: any, data: any) => {
                if (err || data.length > 0) {
                    responseObj.setMessage("Ya existe un modelo con el mismo codigo");
                    UtilKatari.createObjResponseEmpty(responseObj, false);
                    res.json(responseObj);
                } else {
                    modelObj.save((err: any, data: any) => {
                        if (err || data.length == 0) {
                            UtilKatari.createObjResponse(responseObj, null, false);
                            res.json(responseObj);
                        } else {
                            UtilKatari.createObjResponse(responseObj, modelObj, true);
                            res.json(responseObj);
                        }
                    });
                }
            });
        } catch (exception) {
            console.log('Problemas al momento de guardar el modelo: ', exception);
        }
    }

    public async updateModel(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            const blog = await Models.findOneAndUpdate({ _id: req.params.templateId }, req.body, { new: true }, (err, data) => {
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
            console.log('Problemas al momento de actualizar el articulo: ', exception);
        }

    }

    public async deleteModel(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            const blog = await Models.remove({ _id: req.params.templateId }, (err) => {
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
            console.log('Problemas al momento el articulo: ', exception);
        }

    }



    public async sendEmail(req: Request, res: Response){
        try{
            let transporter = nodemailer.createTransport({
                host: "smtp-relay.sendinblue.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                  user: "info@jochiduarte.com.co", // generated ethereal user
                  pass: "UaQ20I1XLbq8JwDP", // generated ethereal password
                },
              });
    
              let info: any = await  transporter.sendMail({
                from: '"Fred Foo 👻" <piedrapalo@gmail.com>', // sender address
                to: "luismezahe@gmail.com", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>", // html body
              });
    
              if(info.messageId){
                console.log("Message sent: %s", info.messageId);
                res.json({"message": "exitoso"})
              }
              
              // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            
              // Preview only available when sending through an Ethereal account
              console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }catch(err){
            res.json({"status": "ERROR", "message": err})
            console.log("error email", err);
        }
        

    }



    public async sendEmailInternal(object: any){
        try{
            let transporter = nodemailer.createTransport({
                host: "smtp-relay.sendinblue.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                  user: "info@jochiduarte.com.co", // generated ethereal user
                  pass: "UaQ20I1XLbq8JwDP", // generated ethereal password
                },
              });
    
              let info: any = await  transporter.sendMail({
                from: object.from, // sender address
                to: object.to, // list of receivers
                subject: object.subject, // Subject line
                text: object.text, // plain text body
                html: "<b>Datos de contacto</b> "+ object.html, // html body
              });
    
              if(info.messageId){
                console.log("Message sent: %s", info.messageId);
                return true;
               // res.json({"message": "exitoso"})
              }
              
              // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            
              // Preview only available when sending through an Ethereal account
              console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }catch(err){
           return false;
            // res.json({"status": "ERROR", "message": err})
            console.log("error email", err);
        }
        

    }

}

