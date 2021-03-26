import { Schema, Document, Model, model, Error } from "mongoose";

export interface IUser extends Document {
    email: string;
    password: string;
    state: string;
    roles: string[];
    customerId: string;
}

export const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: 'Enter a email',
        trim: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        type: String,
        required: 'Enter a password'
    },
    notification: {
        type: Boolean,
        required: false
    },
    state: {
        type: String,
        required: 'state a password'
    },
    roles: {
        type: Array,
        required: false
    },
    facebookProvider: {
        type: {
            id: String,
            token: String
        },
        select: false
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    }

},
    {
        collection: "users"
    });

export const UserModel: Model<IUser> = model<IUser>("User", UserSchema);