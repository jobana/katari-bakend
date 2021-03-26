"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
class IProduct extends mongoose_1.Document {
}
exports.IProduct = IProduct;
exports.ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: 'Enter a name'
    },
    price: {
        type: Object,
        required: false
    },
    size: {
        type: Array,
        required: 'Enter a size'
    },
    sku: {
        type: String,
        required: 'Enter a name'
    },
    quantity: {
        type: Number,
        required: 'Enter a quantity'
    },
    season: {
        type: String,
        required: false
    },
    category: {
        type: Array,
        required: false
    },
    imagePath: {
        type: String,
        required: false
    },
    discount: {
        type: Number,
        required: false
    },
    state: {
        type: String,
        required: 'Enter a state'
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    },
    productTemplate: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'ProductTemplate'
    }
}, {
    collection: "products"
});
exports.ProductSchema.plugin(mongoosePaginate);
exports.ProductSchema.index({ location: "2dsphere" });
exports.Product = mongoose_1.model("Product", exports.ProductSchema);
//# sourceMappingURL=product.js.map