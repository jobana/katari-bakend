import { Schema, Document, Model, model, Error } from "mongoose";
import * as mongoosePaginate  from 'mongoose-paginate-v2';



export class ISeason extends Document {
    name: string;
    startDate: Date;
    endDate: Date;
    imagePath: string;
    state: boolean;
}

export const SeasonSchema = new Schema({
    name: {
        type: String,
        required: 'Enter a name'
    },

    alias: {
        type: String,
        required: 'Enter a alias'
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    }

},{
    collection: 'collection'
});

SeasonSchema.plugin(mongoosePaginate);
SeasonSchema.index({ location: "2dsphere" });

export const Season = model("Collection", SeasonSchema);