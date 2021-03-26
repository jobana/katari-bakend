"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
exports.blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: 'Enter a title'
    },
    type: {
        type: String,
        required: 'Enter a type'
    },
    alias: {
        type: String,
        required: 'Enter a alias'
    },
    image: {
        type: String,
        required: 'Enter a image'
    },
    category: {
        type: Array,
        required: false
    },
    body: {
        type: String,
        required: 'Enter a body'
    },
    publish: {
        type: String,
        required: 'Enter a body'
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    }
}, {
    collection: 'blog'
});
exports.blogSchema.plugin(mongoosePaginate);
exports.blogSchema.index({ location: "2dsphere" });
exports.Blog = mongoose_1.model("Blog", exports.blogSchema);
//# sourceMappingURL=blog.js.map