"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.SliderSchema = new mongoose_1.Schema({
    state: {
        type: String,
        required: 'Enter a state'
    },
    text1: {
        type: String,
        required: 'Enter a text1'
    },
    text2: {
        type: String,
        required: 'Enter a text2'
    },
    description: {
        type: String,
        required: 'Enter a description'
    },
    design: {
        type: Boolean,
        required: 'Enter a design'
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    }
}, {
    collection: 'slider'
});
exports.Slider = mongoose_1.model("Slider", exports.SliderSchema);
//# sourceMappingURL=slider.js.map