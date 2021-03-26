import { Schema, Document, Model, model, Error } from "mongoose";

export interface IMaterial extends Document {
    type : string;
    name : string; 
    creationDate: Date;
}

export const materialschema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: 'Enter a code'
    },
    type: {
        type: String,
        required: 'Enter a type'
    },
    name: {
        type: String,
        required: 'Enter a code'
    },
   
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    }

},{
    collection: 'material'
});

export const Material: Model<IMaterial> = model<IMaterial>("Material", materialschema);