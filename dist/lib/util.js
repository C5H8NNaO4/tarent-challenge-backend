"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyTimeSlotParam = exports.success = exports.randomSecretSync = exports.failure = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _dateFns = require("date-fns");

var _config = require("../config");

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

const failure = (res, error, status = 500) => {
  const response = {
    errorMessage: error.message,
    success: false
  };

  if (_config.NODE_ENV === 'production') {
    return res.status(status).send({
      success: false
    });
  }

  return res.status(status).send(response);
};

exports.failure = failure;

const success = (res, data) => {
  return res.status(200).send(data);
};

exports.success = success;