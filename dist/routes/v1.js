"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _passport = _interopRequireDefault(require("passport"));

var _permissions = require("../data/permissions");

var _api = require("../lib/api");

var _middleware = require("../lib/middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.get('/trainings', _api.sendTrainingData);
router.get('/bookings', _api.sendBookingData);
router.get('/login', _passport.default.authenticate('session'), _api.sendSessionUser);
router.post('/login', _passport.default.authenticate('local'), _api.sendSessionUser);
router.post('/logout', _api.logout);
router.get('/training/:id/bookings', _api.getBookingsByTrainingId);
router.post('/training/:id/booking', _passport.default.authenticate('session'), (0, _middleware.hasPermission)(_permissions.Permissions.BOOK_TRAINING), _api.bookTimeSlotForTraining);
router.delete('/training/:id/booking/:timeSlot', _passport.default.authenticate('session'), (0, _middleware.hasPermission)(_permissions.Permissions.BOOK_TRAINING), _api.cancelTimeSlotForTraining);
router.post('/training/:id/slot', _passport.default.authenticate('session'), (0, _middleware.hasPermission)(_permissions.Permissions.ADD_SLOT), _api.addTimeSlotToTraining);
router.delete('/training/:id/slot/:timeSlot', _passport.default.authenticate('session'), (0, _middleware.hasPermission)(_permissions.Permissions.DEL_SLOT), _api.deleteTimeSlotFromTraining);
router.put('/training/:id/slot/:timeSlot', _passport.default.authenticate('session'), (0, _middleware.hasPermission)(_permissions.Permissions.UPD_SLOT), _api.modifyTimeSlotOfTraining);
var _default = router;
exports.default = _default;