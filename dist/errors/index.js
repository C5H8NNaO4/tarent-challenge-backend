"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.success = exports.failure = exports.Unauthorized = exports.RemoveNonExistingItemError = exports.RemoveBookedItemError = exports.MalformedInput = exports.InvalidRouteError = exports.InvalidId = exports.BookedOut = exports.AddDuplicateItemError = void 0;

var _config = require("../config");

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
const InvalidRouteError = new Error('Invalid route');
exports.InvalidRouteError = InvalidRouteError;
const Unauthorized = new Error('Unauthorized');
exports.Unauthorized = Unauthorized;
const BookedOut = new Error('No slots available.');
exports.BookedOut = BookedOut;
const AddDuplicateItemError = new Error('Cannot add duplicate timeslot.');
exports.AddDuplicateItemError = AddDuplicateItemError;
const RemoveBookedItemError = new Error('Cannot remove timeslot that have been booked.');
exports.RemoveBookedItemError = RemoveBookedItemError;
const RemoveNonExistingItemError = new Error('Cannot remove nonexisting timeslot.');
exports.RemoveNonExistingItemError = RemoveNonExistingItemError;

const MalformedInput = field => new Error(`Malformed input in field '${field}'.`);

exports.MalformedInput = MalformedInput;

const InvalidId = id => new Error(`Invalid id '${id}' passed to route`);

exports.InvalidId = InvalidId;