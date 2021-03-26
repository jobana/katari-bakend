"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class IProductTemplate extends mongoose_1.Document {
}
exports.IProductTemplate = IProductTemplate;
exports.ProductTemplateSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: 'Enter a name'
    },
    code: {
        type: String,
        required: 'Enter a code'
    },
    shoeModel: {
        type: Object,
        required: 'Enter a shoeModel'
    },
    heelHeight: {
        type: Object,
        required: 'Enter a heelHeight'
    },
    shoeTips: {
        type: Object,
        required: 'Enter a shoeTips'
    },
    accessory: {
        type: Array,
        required: 'Enter a accessory'
    },
    cut: {
        type: Object,
        required: 'Enter a cut'
    },
    shoeSize: {
        type: Object,
        required: 'Enter a shoeSize'
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    }
}, {
    collection: "productTemplate"
});
exports.ProductTemplate = mongoose_1.model("ProductTemplate", exports.ProductTemplateSchema);
//# sourceMappingURL=productTemplate.js.map