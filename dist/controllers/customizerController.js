"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("./../model/product/material");
const customizer_1 = require("./../model/config/customizer");
const utils_1 = require("./../util/utils");
const response_1 = require("./../domain/response");
class CustomizerController {
    getDefaulModel(req, res) {
        let responseObj = new response_1.ResponseObj();
        let arrayDefaultModel = [];
        try {
            customizer_1.Customizer.find({ "category": req.body.category }, { creationDate: 0 }, (err, cust) => {
                if (err || cust.length == 0) {
                    console.log(`Errores ` + err);
                    utils_1.UtilKatari.createObjResponse(responseObj, null, false);
                    res.json(responseObj);
                }
                else {
                    cust.forEach((cus) => {
                        if (cus.default == true) {
                            arrayDefaultModel.push(cus);
                        }
                        else {
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
                        utils_1.UtilKatari.createObjResponse(responseObj, null, false);
                        res.json(responseObj);
                    }
                    else {
                        utils_1.UtilKatari.createObjResponse(responseObj, arrayDefaultModel, true);
                        res.json(responseObj);
                    }
                }
            });
        }
        catch (err) {
            console.log('Problemas al consultar personalizador', err);
        }
    }
    findMaterial(req, res) {
        let responseObj = new response_1.ResponseObj();
        try {
            const queryByCategory = {
                category: { $all: [req.body.category] }
            };
            material_1.Material.find(queryByCategory, { creationDate: 0 }, (err, data) => {
                if (err || data.length == 0) {
                    console.log(`Error al momento de consultar la informacion ` + err);
                    utils_1.UtilKatari.createObjResponse(responseObj, null, false);
                    res.json(responseObj);
                }
                else {
                    utils_1.UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
            });
        }
        catch (err) {
            console.log('Problemas al consultar el material: ', err);
        }
    }
    findCustomizer(req, res) {
        let responseObj = new response_1.ResponseObj();
        try {
            customizer_1.Customizer.find({}, (err, custo) => {
                if (err) {
                    res.send();
                    console.log(`Errores ` + res.send());
                    utils_1.UtilKatari.createObjResponse(responseObj, null, false);
                }
                else {
                    utils_1.UtilKatari.createObjResponse(responseObj, custo, true);
                    res.json(responseObj);
                }
            });
        }
        catch (exception) {
            console.log('Problemas al consultar personalizador' + exception);
        }
    }
    findCustomizerById(req, res) {
        let responseObj = new response_1.ResponseObj();
        try {
            customizer_1.Customizer.findById({ "_id": req.params.id }, { creationDate: 0 }, (err, data) => {
                if (err || data.length === 0) {
                    console.log(`Error al momento de consultar la informacion ` + err);
                    utils_1.UtilKatari.createObjResponse(responseObj, null, false);
                    res.json(responseObj);
                }
                else {
                    utils_1.UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
            });
        }
        catch (exception) {
            console.log('Problemas al consultar personalizador' + exception);
        }
    }
}
exports.CustomizerController = CustomizerController;
//# sourceMappingURL=customizerController.js.map