import { Schema, Document, Model, model, Error } from "mongoose";
import * as mongoosePaginate  from 'mongoose-paginate-v2';
export class IProduct extends Document {
    name: string;
    price: number;
    quantity: number;
    season: string;
    category: [];
    size: [];
    discount: number;
    imagePath: string;
    creationDate: Date;
}

export const ProductSchema = new Schema({
    name: {
        type: String,
        required: 'Enter a name'
    },
    price: {
        type: Object,
        required: false
    },
    size: {
        type: Array,
        required: 'Enter a size'
    },
    sku: {
        type: String,
        required: 'Enter a name'
    },
    quantity: {
        type: Number,
        required: 'Enter a quantity'
    },
    season: {
        type: String,
        required: false
    },
    category: {
        type: Array,
        required: false
    },
    imagePath: {
        type: String,
        required: false
    },
    discount: {
        type: Number,
        required: false
    },
    state: {
        type: String,
        required: 'Enter a state'
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    },
    productTemplate: {
        type: Schema.Types.ObjectId,
        ref: 'ProductTemplate'
    }

},{
    collection: "products"
});
ProductSchema.plugin(mongoosePaginate);
ProductSchema.index({ location: "2dsphere" });

export const Product =model ("Product", ProductSchema);