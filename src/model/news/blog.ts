import { Schema, Document, Model, model, Error } from "mongoose";
import * as mongoosePaginate  from 'mongoose-paginate-v2';

export interface IBlog extends Document {
    title: string;
    type: string;
    alias: string;
    image: string;
    category: [];
    body: string;
    publish: string;
    creationDate: Date;
}

export const blogSchema = new Schema({
    title: {
        type: String,
        required: 'Enter a title'
    },
    type: {
        type: String,
        required: 'Enter a type'
    },
    alias: {
        type: String,
        required: 'Enter a alias'
    },
    image: {
        type: String,
        required: 'Enter a image'
    },
    category: {
        type: Array,
        required: false
    },
    body: {
        type: String,
        required: 'Enter a body'
    },
    publish: {
        type: String,
        required: 'Enter a body'
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    }

}, {
    collection: 'blog'
});
blogSchema.plugin(mongoosePaginate);
blogSchema.index({ location: "2dsphere" });


export const Blog = model("Blog", blogSchema);