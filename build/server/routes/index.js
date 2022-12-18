"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controlers_1 = require("../controlers");
const router = (0, express_1.Router)();
exports.router = router;
router.post('/', controlers_1.addTask);
router.get('/', controlers_1.getTask);
