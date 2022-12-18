"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const mongodb_1 = require("mongodb");
require("dotenv/config");
const client = new mongodb_1.MongoClient(process.env.URL_MONGO_DB);
exports.client = client;
