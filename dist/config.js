"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SALT_ROUNDS = exports.PORT = exports.NODE_ENV = exports.CLIENT_ORIGIN = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const {
  PORT = '3000',
  NODE_ENV = 'development',
  CLIENT_ORIGIN = 'http://localhost:3000',
  SALT_ROUNDS
} = process.env;
exports.CLIENT_ORIGIN = CLIENT_ORIGIN;
exports.NODE_ENV = NODE_ENV;
exports.PORT = PORT;
exports.SALT_ROUNDS = SALT_ROUNDS;