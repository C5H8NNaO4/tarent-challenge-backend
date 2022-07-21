"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyTimeSlotParam = exports.randomSecretSync = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _dateFns = require("date-fns");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const formatString = 'dd.MM HH:mm';

const randomSecretSync = () => _crypto.default.randomBytes(64).toString('hex');

exports.randomSecretSync = randomSecretSync;

const verifyTimeSlotParam = dateString => {
  try {
    return (0, _dateFns.format)((0, _dateFns.parse)(dateString, formatString, new Date()), formatString) === dateString;
  } catch (e) {
    return false;
  }
};

exports.verifyTimeSlotParam = verifyTimeSlotParam;