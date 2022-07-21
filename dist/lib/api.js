"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendTrainingData = exports.sendSessionUser = exports.sendBookingData = exports.modifyTimeSlotOfTraining = exports.logout = exports.getBookingsByTrainingId = exports.deleteTimeSlotFromTraining = exports.cancelTimeSlotForTraining = exports.bookTimeSlotForTraining = exports.addTimeSlotToTraining = void 0;

var _data = require("../data");

var _errors = require("../errors");

var _util = require("./util");

const logout = (req, res) => {
  req.logOut(err => {
    if (err) {
      return (0, _errors.failure)(res, new Error(err));
    }

    res.status(200).clearCookie('connect.sid', {
      path: '/'
    });
    req.session.destroy(() => {
      res.end();
    });
    return res.end();
  });
};

exports.logout = logout;

const sendSessionUser = (req, res) => (0, _errors.success)(res, req.user);

exports.sendSessionUser = sendSessionUser;

const sendTrainingData = (req, res) => (0, _errors.success)(res, _data.trainingData);

exports.sendTrainingData = sendTrainingData;

const sendBookingData = (req, res) => (0, _errors.success)(res, _data.bookings);

exports.sendBookingData = sendBookingData;

const getBookingsByTrainingId = (req, res) => {
  const {
    id
  } = req.params;

  const filtered = _data.bookings.filter(booking => booking.trainingId === Number(id));

  if (!_data.trainingData[id]) {
    return (0, _errors.failure)(res, (0, _errors.InvalidId)(id), 500);
  }

  return (0, _errors.success)(res, filtered);
};

exports.getBookingsByTrainingId = getBookingsByTrainingId;

const bookTimeSlotForTraining = (req, res) => {
  const {
    id
  } = req.params;
  const {
    timeSlot
  } = req.body;

  if (!(0, _util.verifyTimeSlotParam)(timeSlot)) {
    return (0, _errors.failure)(res, (0, _errors.MalformedInput)('timeSlot'), 500);
  }

  if (!_data.trainingData[id]) {
    return (0, _errors.failure)(res, (0, _errors.InvalidId)(id), 500);
  }

  const training = _data.trainingData[id];

  const filtered = _data.bookings.filter(booking => booking.trainingId === Number(id) && booking.timeSlot === timeSlot);

  if (filtered.length === training.slots) {
    return (0, _errors.failure)(res, _errors.BookedOut, 401);
  }

  const booking = {
    trainingId: Number(id),
    userId: req.user.id,
    timeSlot
  };
  (0, _data.addBooking)(booking);
  return (0, _errors.success)(res, booking);
};

exports.bookTimeSlotForTraining = bookTimeSlotForTraining;

const cancelTimeSlotForTraining = (req, res) => {
  const {
    id,
    timeSlot
  } = req.params;

  if (!_data.trainingData[Number(id)]) {
    return (0, _errors.failure)(res, (0, _errors.InvalidId)(id), 500);
  }

  const index = _data.bookings.findIndex(booking => booking.trainingId === Number(id) && booking.timeSlot === timeSlot);

  if (index === -1) {
    return (0, _errors.failure)(res, _errors.RemoveNonExistingItemError);
  }

  const booking = _data.bookings.splice(index, 1);

  return (0, _errors.success)(res, booking);
};

exports.cancelTimeSlotForTraining = cancelTimeSlotForTraining;

const addTimeSlotToTraining = (req, res) => {
  const {
    id
  } = req.params;
  const {
    timeSlot
  } = req.body;

  if (!(0, _util.verifyTimeSlotParam)(timeSlot)) {
    return (0, _errors.failure)(res, (0, _errors.MalformedInput)('timeSlot'), 500);
  }

  if (!_data.trainingData[id]) {
    return (0, _errors.failure)(res, (0, _errors.InvalidId)(id), 500);
  }

  const training = _data.trainingData[id];

  if (training.availableTimeSlots.includes(timeSlot)) {
    return (0, _errors.failure)(res, _errors.AddDuplicateItemError);
  }

  training.availableTimeSlots.push(timeSlot);
  return (0, _errors.success)(res, training);
};

exports.addTimeSlotToTraining = addTimeSlotToTraining;

const deleteTimeSlotFromTraining = (req, res) => {
  const {
    id,
    timeSlot
  } = req.params;

  if (!_data.trainingData[id]) {
    return (0, _errors.failure)(res, (0, _errors.InvalidId)(id), 500);
  }

  const training = _data.trainingData[id];

  if (!training.availableTimeSlots.includes(timeSlot)) {
    return (0, _errors.failure)(res, _errors.RemoveNonExistingItemError);
  }

  const filtered = _data.bookings.filter(booking => booking.trainingId === Number(id) && booking.timeSlot === timeSlot);

  if (filtered.length > 0) {
    return (0, _errors.failure)(res, _errors.RemoveBookedItemError);
  }

  const index = training.availableTimeSlots.indexOf(timeSlot);
  training.availableTimeSlots.splice(index, 1);
  return (0, _errors.success)(res, training);
};

exports.deleteTimeSlotFromTraining = deleteTimeSlotFromTraining;

const modifyTimeSlotOfTraining = (req, res) => {
  const {
    id,
    timeSlot
  } = req.params;
  const {
    timeSlot: newTimeSlot
  } = req.body;

  if (!_data.trainingData[id]) {
    return (0, _errors.failure)(res, (0, _errors.InvalidId)(id), 500);
  }

  const training = _data.trainingData[id];

  if (!training.availableTimeSlots.includes(timeSlot)) {
    return (0, _errors.failure)(res, _errors.RemoveNonExistingItemError);
  }

  if (training.availableTimeSlots.includes(newTimeSlot)) {
    return (0, _errors.failure)(res, _errors.AddDuplicateItemError);
  }

  const index = training.availableTimeSlots.indexOf(timeSlot);
  training.availableTimeSlots[index] = newTimeSlot;
  return (0, _errors.success)(res, training);
};

exports.modifyTimeSlotOfTraining = modifyTimeSlotOfTraining;