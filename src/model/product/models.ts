import { Schema, Document, Model, model, Error } from "mongoose";

export interface IModel extends Document {
    code : string;
    name : string; 
    section: string;
    category : string;
    url : string;
    initialMap:  [];
    creationDate: Date;
}

export const modelschema = new Schema({
    code: {
        type: String,
        required: 'Enter a code'
    },
    name: {
        type: String,
        required: 'Enter a code'
    },
    section: {
        type: String,
        required: 'Enter a section'
    },
    category: {
        type: String,
        required: 'Enter a category'
    },
    url: {
        type: String,
        required: 'Enter a url'
    },
    initialMap: {
        type: Array,
        required: false
    },
   
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    }

},{
    collection: 'models'
});

export const Models: Model<IModel> = model<IModel>("Models", modelschema);