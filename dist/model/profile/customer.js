"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.CustomerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: 'Enter a name'
    },
    lastName: {
        type: String,
        required: 'Enter a lastName'
    },
    documentNumber: {
        type: String,
        required: false
    },
    documentType: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    birthday: {
        type: String,
        required: false
    },
    cellPhone: {
        type: String,
        required: false
    },
    favorites: [
        {
            _id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product' }
        }
    ],
    userId: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'User',
        required: false
    },
    myDesign: [
        {
            _id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Design' }
        }
    ],
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    }
}, {
    collection: "customer"
});
exports.Customer = mongoose_1.model("Customer", exports.CustomerSchema);
//# sourceMappingURL=customer.js.map