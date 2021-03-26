"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const design_1 = require("./../model/product/design");
const productTemplate_1 = require("./../model/product/productTemplate");
const utils_1 = require("./../util/utils");
const response_1 = require("./../domain/response");
const mongoose = require("mongoose");
const productTemplate = mongoose.model('productTemplate', productTemplate_1.ProductTemplateSchema);
const design = mongoose.model('design', design_1.DesignSchema);
class ProductTemplateController {
    findProductTemplate(req, res) {
        console.log(`Buscando plantillas`);
        let responseObj = new response_1.ResponseObj();
        try {
            productTemplate.find({}, (err, data) => {
                if (err) {
                    res.send();
                    console.log(`Errores ` + res.send());
                    utils_1.UtilKatari.createObjResponse(responseObj, null, false);
                }
                else {
                    utils_1.UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
            });
        }
        catch (exception) {
            console.log('Problemas al consultar plantilla' + exception);
        }
    }
    findProductTemplateById(req, res) {
        let responseObj = new response_1.ResponseObj();
        try {
            productTemplate.findById(req.params.templateId, { creationDate: 0, __v: 0 }, (err, data) => {
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
            console.log('Problemas al consultar plantilla' + exception);
        }
    }
    //CRUD design
    findProductDesignById(req, res) {
        let responseObj = new response_1.ResponseObj();
        try {
            design.find({ 'userId': req.params.userId }, { userId: 0, creationDate: 0, __v: 0 }, (err, data) => {
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
            console.log('Problemas al consultar plantilla' + exception);
        }
    }
    addProductTemplate(req, res) {
        let responseObj = new response_1.ResponseObj();
        let newDesign = new design(req.body);
        try {
            newDesign.save((err) => {
                if (err) {
                    utils_1.UtilKatari.createObjResponse(responseObj, null, false);
                    res.json(responseObj);
                }
                else {
                    utils_1.UtilKatari.createObjResponse(responseObj, newDesign, true);
                    res.json(responseObj);
                }
            });
        }
        catch (exception) {
            console.log('Problemas al momento de guardar la plantilla' + exception);
        }
    }
    updateProductTemplate(req, res) {
        let responseObj = new response_1.ResponseObj();
        try {
            design.findOneAndUpdate({ _id: req.params.templateId }, req.body, { new: true }, (err, task) => {
                if (err) {
                    res.send(err);
                    responseObj.setMessage("No hay informacion que mostrar " + err);
                    utils_1.UtilKatari.createObjResponseEmpty(responseObj, true);
                }
                else {
                    utils_1.UtilKatari.createObjResponseEmpty(responseObj, true);
                    res.json(responseObj);
                }
            });
        }
        catch (exception) {
            console.log('Problemas al momento de actualizar la plantilla' + exception);
        }
    }
    deleteProductTemplate(req, res) {
        let responseObj = new response_1.ResponseObj();
        try {
            design.remove({ _id: req.params.templateId }, (err) => {
                if (err) {
                    responseObj.setMessage("No hay informacion que mostrar " + err);
                    utils_1.UtilKatari.createObjResponseEmpty(responseObj, false);
                    res.json(responseObj);
                }
                else {
                    utils_1.UtilKatari.createObjResponseEmpty(responseObj, true);
                    res.json(responseObj);
                }
            });
        }
        catch (exception) {
            console.log('Problemas al momento de actualizar la plantilla' + exception);
        }
    }
}
exports.ProductTemplateController = ProductTemplateController;
//# sourceMappingURL=productTemplateController.js.map