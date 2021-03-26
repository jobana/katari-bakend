"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.colorschema = new mongoose_1.Schema({
    code: {
        type: String,
        required: 'Enter a code'
    },
    name: {
        type: String,
        required: 'Enter a code'
    },
    value: {
        type: String,
        required: 'Enter a value'
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    }
}, {
    collection: 'colors'
});
exports.Colors = mongoose_1.model("Colors", exports.colorschema);
//# sourceMappingURL=colors.js.map