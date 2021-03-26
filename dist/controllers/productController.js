"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokenUserInfo_1 = require("./../domain/tokenUserInfo");
const utils_1 = require("./../util/utils");
const product_1 = require("../model/product/product");
const response_1 = require("../domain/response");
class ProductController {
    findProductByCollection(req, res) {
        const responseObj = new response_1.ResponseObj();
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
            }
            else {
                query = {
                    collection: req.body.collection
                };
            }
            product_1.Product.paginate(query, options, (err, data) => {
                if (err || data.docs.length === 0) {
                    utils_1.UtilKatari.createObjResponse(responseObj, null, false);
                    res.json(responseObj);
                    console.log(`Errores ` + err);
                }
                else {
                    utils_1.UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
            });
        }
        catch (err) {
            console.log("Problemas al consultar productos por coleccion ", err);
        }
    }
    findProducts(req, res) {
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
            const discount = req.body.discount;
            if (req.body.category != null) {
                const queryByCategory = {
                    category: { $all: req.body.category },
                    discount: req.body.discount == true ? { $gt: 0 } : 0,
                    state: "ACTIVE"
                };
                product_1.Product.paginate(queryByCategory, options, (err, data) => {
                    if (err || data.docs.length === 0) {
                        utils_1.UtilKatari.createObjResponse(responseObj, null, false);
                        res.json(responseObj);
                        console.log(`Errores ` + res.send());
                    }
                    else {
                        utils_1.UtilKatari.createObjResponse(responseObj, data, true);
                        res.json(responseObj);
                    }
                });
            }
            else {
                const queryAll = {
                    discount: req.body.discount == true ? { $gt: 0 } : 0,
                    state: "ACTIVE"
                };
                product_1.Product.paginate(queryAll, options, (err, data) => {
                    if (err || data.docs.length === 0) {
                        utils_1.UtilKatari.createObjResponse(responseObj, null, false);
                        res.send();
                        console.log(`Errores ` + res.send());
                    }
                    else {
                        utils_1.UtilKatari.createObjResponse(responseObj, data, true);
                        res.json(responseObj);
                    }
                });
            }
        }
        catch (exception) {
            console.log('Problemas al consultar productos' + exception);
        }
    }
    findProductById(req, res) {
        let responseObj = new response_1.ResponseObj();
        try {
            product_1.Product.findById(req.params.productId, (err, data) => {
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
            console.log('Problemas al consultar producto' + exception);
        }
    }
    //Crud Product
    addProduct(req, res) {
        const responseObj = new response_1.ResponseObj();
        const newProduct = new product_1.Product(req.body);
        try {
            const authHeader = req.headers.authorization;
            const tokenUseInfo = new tokenUserInfo_1.TokenUserInfo().isAdmin(authHeader);
            if (tokenUseInfo != null && tokenUseInfo) {
                newProduct.save((err) => {
                    if (err) {
                        console.log('Error al momento de crear el producto: ', err);
                        responseObj.setMessage("No hay informacion que mostrar " + err);
                        utils_1.UtilKatari.createObjResponseEmpty(responseObj, false);
                        res.json(responseObj);
                    }
                    else {
                        utils_1.UtilKatari.createObjResponse(responseObj, newProduct, true);
                        res.json(responseObj);
                    }
                });
            }
            else {
                responseObj.setMessage("usuario no autorizado");
                utils_1.UtilKatari.createObjResponseEmpty(responseObj, false);
            }
        }
        catch (err) {
            console.log('Error al momento de crear el producto: ', err);
        }
    }
    updateProduct(req, res) {
        const responseObj = new response_1.ResponseObj();
        try {
            const authHeader = req.headers.authorization;
            const tokenUseInfo = new tokenUserInfo_1.TokenUserInfo().isAdmin(authHeader);
            if (tokenUseInfo != null && tokenUseInfo) {
                product_1.Product.findOneAndUpdate({ _id: req.params.productId }, req.body, { new: true }, (err, data) => {
                    if (err || data == null) {
                        responseObj.setMessage("No hay informacion que mostrar " + err);
                        utils_1.UtilKatari.createObjResponseEmpty(responseObj, true);
                        res.json(responseObj);
                    }
                    else {
                        utils_1.UtilKatari.createObjResponse(responseObj, data, true);
                        res.json(responseObj);
                    }
                });
            }
        }
        catch (err) {
            console.log('Error al momento de actualizar: ', err);
        }
    }
    deleteProduct(req, res) {
        const responseObj = new response_1.ResponseObj();
        try {
            const authHeader = req.headers.authorization;
            const tokenUseInfo = new tokenUserInfo_1.TokenUserInfo().isAdmin(authHeader);
            if (tokenUseInfo != null && tokenUseInfo == true) {
                product_1.Product.remove({ _id: req.params.productId }, (err) => {
                    if (err) {
                        responseObj.setMessage("No hay informacion que mostrar " + err);
                        utils_1.UtilKatari.createObjResponseEmpty(responseObj, true);
                        res.json(responseObj);
                    }
                    else {
                        utils_1.UtilKatari.createObjResponseEmpty(responseObj, true);
                        res.json(responseObj);
                    }
                });
            }
        }
        catch (err) {
            console.log('Error al intentar eliminar: ', err);
        }
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=productController.js.map