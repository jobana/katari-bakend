
import { Schema, Document, Model, model, Error } from "mongoose";

export interface ICustomizer extends Document {
    category: string;
    code: string;
    name: string;
    state: string;
    miniature: string;
    default: boolean;
    size: [];
    modelId: object;
    heelHeight: any;
    creationDate: Date;
}

export const customizerSchema = new Schema({
    category: {
        type: String,
        required: 'Enter a category'
    },
    code: {
        type: String,
        required: 'Enter a code'
    },
    name: {
        type: String,
        required: 'Enter a name'
    },
    state: {
        type: String,
        required: 'Enter a state'
    },
    miniature: {
        type: String,
        required: 'Enter a state'
    },
    default: {
        type: Boolean,
        required: false,
    },

    size: {
        type: Array,
        required: false,
    },
    modelId: {
        type: Object,
        required: 'Enter a modelId'
    },
    
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    }


}, {
    collection: 'customizer'
});

export const Customizer: Model<ICustomizer> = model<ICustomizer>("Customizer", customizerSchema);