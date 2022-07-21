"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Permissions = void 0;
let Permissions;
exports.Permissions = Permissions;

(function (Permissions) {
  Permissions[Permissions["READ_TRAININGS"] = 0] = "READ_TRAININGS";
  Permissions[Permissions["ADD_TRAINING"] = 1] = "ADD_TRAINING";
  Permissions[Permissions["MOD_TIME"] = 2] = "MOD_TIME";
  Permissions[Permissions["BOOK_TRAINING"] = 3] = "BOOK_TRAINING";
  Permissions[Permissions["ADD_SLOT"] = 4] = "ADD_SLOT";
  Permissions[Permissions["DEL_SLOT"] = 5] = "DEL_SLOT";
  Permissions[Permissions["UPD_SLOT"] = 6] = "UPD_SLOT";
})(Permissions || (exports.Permissions = Permissions = {}));