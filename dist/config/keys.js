"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtSecret = process.env.SECRET_JWT_KATARI;
exports.accessKeyId = process.env.ACCESSKEYID;
exports.secretAccessKey = process.env.SECRETACCESSKEY;
exports.bucketName = process.env.BUCKETNAME;
exports.regionAws = process.env.REGIONAWS;
if (!exports.jwtSecret) {
    console.log("No JWT secret string. Set JWT_SECRET environment variable.");
    process.exit(1);
}
else if (!exports.secretAccessKey) {
    console.log("No secretAccessKey aws string. Set SECRETACCESSKEY environment variable.");
    process.exit(1);
}
//# sourceMappingURL=keys.js.map