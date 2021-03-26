import { Schema, Document, Model, model, Error } from "mongoose";

export interface ICustomer extends Document {
    name: string;
    lastName: string;
    documentNumber: string;
    documentType: number;
    city: string;
    birthday: string;
    cellPhone: string;
    favorites: [];
}

export const CustomerSchema = new Schema({

    name: {
        type: String,
        required: 'Enter a name'
    },
    lastName: {
        type: String,
        required: 'Enter a lastName'
    },
    documentNumber: {
        type: String,
        required: false
    },
    documentType: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    birthday: {
        type: String,
        required: false
    },
    cellPhone: {
        type: String,
        required: false
    },

    favorites: [
        {
            _id: { type: Schema.Types.ObjectId, ref: 'Product' }
        }
    ],
    userId: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: false
    },
    myDesign: [
        {
            _id: { type: Schema.Types.ObjectId, ref: 'Design' }
        }

    ],
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    }

},
    {
        collection: "customer"
    });

export const Customer: Model<ICustomer> = model<ICustomer>("Customer", CustomerSchema);