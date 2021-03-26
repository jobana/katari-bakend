"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.configurationSchema = new mongoose_1.Schema({
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    }
}, {
    collection: 'config'
});
exports.Configuration = mongoose_1.model("Configuration", exports.configurationSchema);
//# sourceMappingURL=configuration.js.map