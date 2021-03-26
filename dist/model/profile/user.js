"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
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
}, {
    collection: "users"
});
exports.UserModel = mongoose_1.model("User", exports.UserSchema);
//# sourceMappingURL=user.js.map