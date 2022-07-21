"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyPassword = exports.users = exports.findUserByName = exports.findUserById = exports.anon = void 0;

var _permissions = require("./permissions");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const anon = {
  id: -1,
  name: 'anonymous',
  permissions: [_permissions.Permissions.READ_TRAININGS],
  password: null
};
exports.anon = anon;
const users = [anon, {
  id: 0,
  name: 'admin',
  permissions: [_permissions.Permissions.ADD_TRAINING, _permissions.Permissions.READ_TRAININGS, _permissions.Permissions.BOOK_TRAINING, _permissions.Permissions.ADD_SLOT, _permissions.Permissions.DEL_SLOT, _permissions.Permissions.UPD_SLOT],
  password: '$2b$10$9FJLC92kSyciEMUvsTK/be9Ojw6klV/5Mk7WI4zpILYB5oZgmdyYy'
}, {
  id: 1,
  name: 'user',
  permissions: [_permissions.Permissions.BOOK_TRAINING, _permissions.Permissions.READ_TRAININGS],
  password: '$2b$10$3ZbV0SuIblXgDAPRZWOdL.JnHo.wAJk5WHT29M.Ym6D/7z/B8Cc7q'
}];
exports.users = users;

const findUserById = id => {
  return users.find(user => user.id === id);
};

exports.findUserById = findUserById;

const findUserByName = name => {
  return users.find(user => user.name === name);
};

exports.findUserByName = findUserByName;

const verifyPassword = (password, hash) => {
  return new Promise((resolve, reject) => {
    _bcrypt.default.compare(password, hash, function (err, result) {
      if (!err && result) {
        resolve(true);
      } else {
        reject();
      }
    });
  });
};

exports.verifyPassword = verifyPassword;