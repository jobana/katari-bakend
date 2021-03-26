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
const slider_1 = require("./../model/news/slider");
const blog_1 = require("./../model/news/blog");
const utils_1 = require("./../util/utils");
const response_1 = require("./../domain/response");
class BlogController {
    constructor() {
        this.responseObj = new response_1.ResponseObj();
    }
    searchByName(req, res) {
        let responseObj = new response_1.ResponseObj();
        let query = {
            "$text": {
                "$search": req.body.search
            }
        };
        try {
            blog_1.Blog.find(query, (err, data) => {
                if (err || data.length === 0) {
                    console.log(`Errores ` + err);
                    responseObj.setMessage("No hay resultados que mostrar: " + err);
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
            console.log("Error intentando buscar el articulo: ", err);
        }
    }
    findBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let responseObj = new response_1.ResponseObj();
            try {
                const options = {
                    select: '-__v -publish',
                    sort: { creationDate: -1 },
                    page: parseInt(req.params.pageNumber),
                    limit: parseInt(req.params.nPerPage),
                    collation: {
                        locale: 'en'
                    }
                };
                let objQuery = {};
                const query = req.params.category == "" || req.params.category == undefined ? objQuery : objQuery = { category: req.params.category };
                blog_1.Blog.paginate(query, options, (err, data) => {
                    if (err || data.length === 0) {
                        console.log(`Errores ` + err);
                        responseObj.setMessage("No hay resultados que mostrar: " + err);
                        utils_1.UtilKatari.createObjResponseEmpty(responseObj, false);
                        res.json(responseObj);
                    }
                    else {
                        utils_1.UtilKatari.createObjResponse(responseObj, data, true);
                        res.json(responseObj);
                    }
                });
            }
            catch (exception) {
                console.log('Problemas al consultar articulos' + exception);
            }
        });
    }
    findBlogById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let responseObj = new response_1.ResponseObj();
            try {
                const newsLetters = yield blog_1.Blog.find({ alias: req.params.alias }, (err, data) => {
                    if (err) {
                        console.log("error " + err);
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
                console.log('Problemas al consultar news' + exception);
            }
        });
    }
    addBlog(req, res) {
        const responseObj = new response_1.ResponseObj();
        try {
            req.body.type = "article";
            const blogObj = new blog_1.Blog(req.body);
            const alias = req.body.title.split(' ').join('-').toLocaleLowerCase();
            blogObj.alias = alias;
            blog_1.Blog.find({ title: req.body.title }, (err, data) => {
                if (err || data.length > 0) {
                    responseObj.setMessage("Ya existe articulo con el mismo titulo por favor validar");
                    utils_1.UtilKatari.createObjResponseEmpty(responseObj, false);
                    res.json(responseObj);
                }
                else {
                    blogObj.save((err) => {
                        if (err) {
                            utils_1.UtilKatari.createObjResponse(responseObj, null, false);
                            res.json(responseObj);
                        }
                        else {
                            utils_1.UtilKatari.createObjResponse(responseObj, blogObj, true);
                            res.json(responseObj);
                        }
                    });
                }
            });
        }
        catch (exception) {
            console.log('Problemas al momento de guardar el articulo', exception);
        }
    }
    updateBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let responseObj = new response_1.ResponseObj();
            try {
                const blog = yield blog_1.Blog.findOneAndUpdate({ _id: req.params.templateId }, req.body, { new: true }, (err, data) => {
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
                console.log('Problemas al momento de actualizar el articulo', exception);
            }
        });
    }
    deleteBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let responseObj = new response_1.ResponseObj();
            try {
                const blog = yield blog_1.Blog.remove({ _id: req.params.templateId }, (err) => {
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
                console.log('Problemas al momento de eliminar el articulo', exception);
            }
        });
    }
    // Slider
    findSlider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let responseObj = new response_1.ResponseObj();
            try {
                const slider = yield slider_1.Slider.find({}, (err, data) => {
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
                console.log('Problemas al consultar news' + exception);
            }
        });
    }
}
exports.BlogController = BlogController;
//# sourceMappingURL=blogController.js.map