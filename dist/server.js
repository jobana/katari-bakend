"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = process.env.PORT || 5000;
app_1.default.listen(PORT, () => {
    console.log(`API REST corriendo en puerto ${PORT}`);
});
//# sourceMappingURL=server.js.map