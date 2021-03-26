import { Schema, Document, Model, model, Error } from "mongoose";
export interface IConfiguration extends Document {
    creationDate: Date;
}

export const configurationSchema = new Schema({
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    }

},{
    collection: 'config'
});

export const Configuration: Model<IConfiguration> = model<IConfiguration>("Configuration", configurationSchema);