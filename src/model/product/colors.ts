import { Schema, Document, Model, model, Error } from "mongoose";

export interface IColor extends Document {
    code : string;
    name : string; 
    value: string;   
    creationDate: Date;
}

export const colorschema = new Schema({
    code: {
        type: String,
        required: 'Enter a code'
    },
    name: {
        type: String,
        required: 'Enter a code'
    },
    value: {
        type:String,
        required:'Enter a value'
    },
   
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    }

},{
    collection: 'colors'
});

export const Colors: Model<IColor> = model<IColor>("Colors", colorschema);