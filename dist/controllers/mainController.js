"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const season_1 = require("./../model/product/season");
const adminController_1 = require("./../admin/controllers/adminController");
const contact_1 = require("./../model/product/contact");
const configuration_1 = require("./../model/config/configuration");
const prices_1 = require("../model/product/prices");
const utils_1 = require("../util/utils");
const response_1 = require("../domain/response");
const mongoose = require("mongoose");
const price = mongoose.model('prices', prices_1.PriceSchema);
const configuration = mongoose.model('configuration', configuration_1.configurationSchema);
class MainController {
    findSeason(req, res) {
        const responseObj = new response_1.ResponseObj();
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
            season_1.Season.paginate({}, options, (err, data) => {
                if (err || data.length === 0) {
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
            console.log('Problemas al consultar temporadas' + exception);
        }
    }
    findSeasonByAlias(req, res) {
        let responseObj = new response_1.ResponseObj();
        try {
            season_1.Season.find({ alias: req.params.alias }, (err, data) => {
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
            console.log('Problemas al consultar temporadas' + exception);
        }
    }
    // Find prices
    findPriceByMaterialCode(req, res) {
        let responseObj = new response_1.ResponseObj();
        try {
            price.find({ "materialCode": req.body.materialCode }, { materialCode: 0, _id: 0, creationDate: 0 }, (err, data) => {
                if (err || data == null) {
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
            console.log('Problemas al consultar precios' + exception);
        }
    }
    //Configuration
    findConfigurationByCode(req, res) {
        let responseObj = new response_1.ResponseObj();
        try {
            if (req.body.configCode != null) {
                configuration.find({ "configCode": req.body.configCode }, (err, data) => {
                    if (err || data == null || data.length == 0) {
                        utils_1.UtilKatari.createObjResponse(responseObj, null, false);
                        res.json(responseObj);
                    }
                    else {
                        utils_1.UtilKatari.createObjResponse(responseObj, data, true);
                        res.json(responseObj);
                    }
                });
            }
            else {
                console.log('No existe');
                utils_1.UtilKatari.createObjResponse(responseObj, null, false);
                res.json(responseObj);
            }
        }
        catch (exception) {
            console.log('Problemas al consultar configuraciones' + exception);
        }
    }
    contact(req, res) {
        let responseObj = new response_1.ResponseObj();
        let adminController = new adminController_1.AdminController();
        try {
            const objectContact = new contact_1.ContactModel(req.body);
            objectContact.save((err) => {
                if (err) {
                    console.log("error: ", err);
                    utils_1.UtilKatari.createObjResponse(responseObj, null, false);
                    res.json(responseObj);
                }
                else {
                    utils_1.UtilKatari.createObjResponse(responseObj, null, true);
                    res.json(responseObj);
                    //Enviar correo
                    let email = {
                        from: "info@jochiduarte.com.co",
                        to: "info@jochiduarte.com.co",
                        subject: "Contactenos",
                        text: req.body.name + " quiere contactarse " + req.body.message,
                        html: req.body.name + " quiere contactarse " + req.body.message
                    };
                    adminController.sendEmailInternal(email);
                }
            });
        }
        catch (err) {
            console.log("Problemas al enviar datos de contacto: ", err);
        }
    }
}
exports.MainController = MainController;
//# sourceMappingURL=mainController.js.map