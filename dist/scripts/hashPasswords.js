"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saltRounds = Number(_config.SALT_ROUNDS);
const args = process.argv.slice(2);
const password = args[0];

_bcrypt.default.genSalt(saltRounds, function (_err, salt) {
  _bcrypt.default.hash(password, salt, function (_err, hash) {
    console.log(hash);
  });
});