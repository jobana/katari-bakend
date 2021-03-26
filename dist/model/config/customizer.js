"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.customizerSchema = new mongoose_1.Schema({
    category: {
        type: String,
        required: 'Enter a category'
    },
    code: {
        type: String,
        required: 'Enter a code'
    },
    name: {
        type: String,
        required: 'Enter a name'
    },
    state: {
        type: String,
        required: 'Enter a state'
    },
    miniature: {
        type: String,
        required: 'Enter a state'
    },
    default: {
        type: Boolean,
        required: false,
    },
    size: {
        type: Array,
        required: false,
    },
    modelId: {
        type: Object,
        required: 'Enter a modelId'
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    }
}, {
    collection: 'customizer'
});
exports.Customizer = mongoose_1.model("Customizer", exports.customizerSchema);
//# sourceMappingURL=customizer.js.map