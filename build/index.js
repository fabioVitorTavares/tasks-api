"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
exports.default = server_1.server.listen(process.env.PORT || 5441, () => console.log('App rodando'));
