import { Schema, Document, Model, model, Error } from "mongoose";

export interface INewsLetter extends Document {
    email: string;
    creationDate: Date;
}

export const newsletterSchema = new Schema({
    email: {
        type: String,
        required: 'Enter a email'
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    }

},{
    collection: 'newsletter'
});

export const NewsLetter: Model<INewsLetter> = model<INewsLetter>("NewsLetter", newsletterSchema);