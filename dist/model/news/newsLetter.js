"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.newsletterSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: 'Enter a email'
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    }
}, {
    collection: 'newsletter'
});
exports.NewsLetter = mongoose_1.model("NewsLetter", exports.newsletterSchema);
//# sourceMappingURL=newsLetter.js.map