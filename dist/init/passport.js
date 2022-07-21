"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initPassPort = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = _interopRequireDefault(require("passport-local"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _users = require("../data/users");

var _secrets = require("../lib/secrets");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initPassPort = app => {
  _passport.default.use(new _passportLocal.default(async function (username, password, done) {
    const user = (0, _users.findUserByName)(username);

    if (!user) {
      return done(null, false);
    }

    if (user.id === -1) {
      return done(null, _users.anon);
    }

    try {
      await (0, _users.verifyPassword)(password, user.password);
    } catch (e) {
      return done(null, false);
    }

    return done(null, user);
  }));

  app.use((0, _expressSession.default)({
    secret: _secrets.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false
    }
  }));
  app.use(_passport.default.initialize());
  app.use(_passport.default.session());

  _passport.default.serializeUser(function (user, done) {
    done(null, user.id);
  });

  _passport.default.deserializeUser(function (id, done) {
    try {
      const user = (0, _users.findUserById)(id);
      done(null, user);
    } catch (e) {
      done(e, false);
    }
  });
};

exports.initPassPort = initPassPort;