"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SESSION_SECRET = void 0;

var _util = require("./util");

const SESSION_SECRET = (0, _util.randomSecretSync)();
exports.SESSION_SECRET = SESSION_SECRET;