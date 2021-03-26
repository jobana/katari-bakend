"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class IPrice extends mongoose_1.Document {
}
exports.IPrice = IPrice;
exports.PriceSchema = new mongoose_1.Schema({
    materialCode: {
        type: String,
        required: false
    },
    value: {
        type: String,
        required: false
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    }
}, {
    collection: 'prices'
});
exports.Price = mongoose_1.model("Price", exports.PriceSchema);
//# sourceMappingURL=prices.js.map