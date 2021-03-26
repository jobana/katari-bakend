"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
class ISeason extends mongoose_1.Document {
}
exports.ISeason = ISeason;
exports.SeasonSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: 'Enter a name'
    },
    alias: {
        type: String,
        required: 'Enter a alias'
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    }
}, {
    collection: 'collection'
});
exports.SeasonSchema.plugin(mongoosePaginate);
exports.SeasonSchema.index({ location: "2dsphere" });
exports.Season = mongoose_1.model("Collection", exports.SeasonSchema);
//# sourceMappingURL=season.js.map