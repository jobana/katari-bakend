"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.modelschema = new mongoose_1.Schema({
    code: {
        type: String,
        required: 'Enter a code'
    },
    name: {
        type: String,
        required: 'Enter a code'
    },
    section: {
        type: String,
        required: 'Enter a section'
    },
    category: {
        type: String,
        required: 'Enter a category'
    },
    url: {
        type: String,
        required: 'Enter a url'
    },
    initialMap: {
        type: Array,
        required: false
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    }
}, {
    collection: 'models'
});
exports.Models = mongoose_1.model("Models", exports.modelschema);
//# sourceMappingURL=models.js.map