"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class IOrder extends mongoose_1.Document {
}
exports.IOrder = IOrder;
exports.OrderSchema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
    name: {
        type: String,
        required: 'Enter a name'
    },
    code: {
        type: String,
        required: 'Enter a code'
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    }
}, {
    collection: "orders"
});
exports.Order = mongoose_1.model("Design", exports.OrderSchema);
//# sourceMappingURL=orders.js.map