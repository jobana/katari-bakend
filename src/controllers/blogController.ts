import { Slider } from './../model/news/slider';
import { Blog, IBlog } from './../model/news/blog';
import { UtilKatari } from './../util/utils';
import { ResponseObj } from './../domain/response';
import { Request, Response } from 'express';

export class BlogController {
    public responseObj = new ResponseObj();

    public searchByName(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        let query = {
            "$text": {
                "$search": req.body.search
            }
        };
        try {
            Blog.find(query, (err, data: any) => {
                if (err || data.length === 0) {
                    console.log(`Errores ` + err);
                    responseObj.setMessage("No hay resultados que mostrar: " + err);
                    UtilKatari.createObjResponseEmpty(responseObj, false);
                    res.json(responseObj);
                } else {
                    UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
            })
        } catch (err) {
            console.log("Error intentando buscar el articulo: ", err);
        }
    }

    public async findBlog(req: Request, res: Response) {
        let responseObj = new ResponseObj();
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
            let objQuery = {}
            const query = req.params.category == "" || req.params.category == undefined ? objQuery : objQuery = { category: req.params.category };
            Blog.paginate(query, options, (err, data: any) => {
                if (err || data.length === 0) {
                    console.log(`Errores ` + err);
                    responseObj.setMessage("No hay resultados que mostrar: " + err);
                    UtilKatari.createObjResponseEmpty(responseObj, false);
                    res.json(responseObj);
                } else {
                    UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
            });
        } catch (exception) {
            console.log('Problemas al consultar articulos' + exception);
        }

    }

    public async findBlogById(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {

            const newsLetters = await Blog.find({ alias: req.params.alias }, (err, data) => {
                if (err) {
                    console.log("error " + err);
                    res.send();
                    UtilKatari.createObjResponse(responseObj, null, false);
                } else {
                    UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
            });
        } catch (exception) {
            console.log('Problemas al consultar news' + exception);
        }

    }

    public addBlog(req: Request, res: Response) {
        const responseObj = new ResponseObj();
        try {

            req.body.type = "article";
            const blogObj: IBlog = new Blog(req.body);
            const alias = req.body.title.split(' ').join('-').toLocaleLowerCase();
            blogObj.alias = alias;
            Blog.find({ title: req.body.title }, (err: any, data: any) => {
                if (err || data.length > 0) {
                    responseObj.setMessage("Ya existe articulo con el mismo titulo por favor validar");
                    UtilKatari.createObjResponseEmpty(responseObj, false);
                    res.json(responseObj);
                } else {
                    blogObj.save((err: any) => {
                        if (err) {
                            UtilKatari.createObjResponse(responseObj, null, false);
                            res.json(responseObj);
                        } else {
                            UtilKatari.createObjResponse(responseObj, blogObj, true);
                            res.json(responseObj);
                        }

                    });
                }
            });


        } catch (exception) {
            console.log('Problemas al momento de guardar el articulo', exception);
        }
    }

    public async updateBlog(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            const blog = await Blog.findOneAndUpdate({ _id: req.params.templateId }, req.body, { new: true }, (err, data) => {
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
            console.log('Problemas al momento de actualizar el articulo', exception);
        }

    }
    public async deleteBlog(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            const blog = await Blog.remove({ _id: req.params.templateId }, (err) => {
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
            console.log('Problemas al momento de eliminar el articulo', exception);
        }

    }

    // Slider

    public async findSlider(req: Request, res: Response) {
        let responseObj = new ResponseObj();
        try {
            const slider = await Slider.find({}, (err, data) => {
                if (err) {
                    res.send();
                    UtilKatari.createObjResponse(responseObj, null, false);
                } else {
                    UtilKatari.createObjResponse(responseObj, data, true);
                    res.json(responseObj);
                }
            });
        } catch (exception) {
            console.log('Problemas al consultar news' + exception);
        }

    }



}

