import { Schema, Document, Model, model, Error } from "mongoose";

export interface IContact extends Document {
    code: string;
    name: string;
    value: string;
    creationDate: Date;
}

export const contactschema = new Schema({
    name: {
        type: String,
        required: 'Enter a name'
    },
    email: {
        type: String,
        required: 'Enter a email valid',
        trim: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    phone: {
        type: String,
        required: 'Enter a phone'
    },
    message: {
        type: String,
        required: 'Enter a description'
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    }

}, {
    collection: 'contact'
});

export const ContactModel: Model<IContact> = model<IContact>("Contact", contactschema);