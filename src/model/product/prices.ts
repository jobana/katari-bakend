import { Schema, Document, Model, model, Error } from "mongoose";

export class IPrice extends Document {
    materialCode: string;
    value: number;
    creationDate: Date;
}

export const PriceSchema = new Schema({
    materialCode: {
        type: String,
        required: false
    },
    value: {
        type: String,
        required: false
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    }  

},{
    collection: 'prices'
});

export const Price: Model<IPrice> = model<IPrice>("Price", PriceSchema);