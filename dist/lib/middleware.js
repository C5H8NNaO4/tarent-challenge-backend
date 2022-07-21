"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasPermission = void 0;

var _errors = require("../errors");

const hasPermission = permission => (req, res, next) => {
  const {
    user
  } = req;

  if (user && user?.permissions.includes(permission)) {
    next();
  } else {
    (0, _errors.failure)(res, _errors.Unauthorized, 403);
  }
};

exports.hasPermission = hasPermission;