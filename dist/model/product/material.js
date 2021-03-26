"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.materialschema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: 'Enter a code'
    },
    type: {
        type: String,
        required: 'Enter a type'
    },
    name: {
        type: String,
        required: 'Enter a code'
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    }
}, {
    collection: 'material'
});
exports.Material = mongoose_1.model("Material", exports.materialschema);
//# sourceMappingURL=material.js.map