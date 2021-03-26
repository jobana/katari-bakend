"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.contactschema = new mongoose_1.Schema({
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
exports.ContactModel = mongoose_1.model("Contact", exports.contactschema);
//# sourceMappingURL=contact.js.map