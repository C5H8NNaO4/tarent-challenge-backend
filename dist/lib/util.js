"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomSecretSync = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const randomSecretSync = () => _crypto.default.randomBytes(64).toString('hex');

exports.randomSecretSync = randomSecretSync;