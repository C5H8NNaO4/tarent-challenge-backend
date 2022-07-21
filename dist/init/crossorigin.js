"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initCORS = void 0;

var _cors = _interopRequireDefault(require("cors"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _csurf = _interopRequireDefault(require("csurf"));

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initCORS = app => {
  const csrfProtection = (0, _csurf.default)({
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600
    }
  });
  const corsOptions = {
    origin: [_config.CLIENT_ORIGIN],
    credentials: true,
    // some legacy browsers (IE11, various SmartTVs) choke on 204
    optionsSuccessStatus: 200
  };
  app.use((0, _cors.default)(corsOptions));
  app.use((0, _bodyParser.default)());
  app.use((0, _cookieParser.default)());

  if (_config.NODE_ENV === 'production') {
    app.use(csrfProtection);
    /**
     * Sets a second cookie that needs to be returned with each request.
     * Note that setting this cookie, enables axios to *automagically* include it in a X-XSRF-Token header.
     * @see https://stackoverflow.com/a/66338080/1487756
     */

    app.use((req, res, next) => {
      res.cookie('XSRF-TOKEN', req.csrfToken());
      next();
    });
  }

  return {
    csrfProtection
  };
};

exports.initCORS = initCORS;