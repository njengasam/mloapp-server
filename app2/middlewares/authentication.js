"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateGuest = exports.authenticateJWT = void 0;

require("dotenv/config");

var _status = require("../helpers/status");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var authenticateJWT = function authenticateJWT(req, res, next) {
  var authHeader = req.headers.authorization;

  if (authHeader) {
    var token = authHeader.split(' ')[1];

    _jsonwebtoken["default"].verify(token, process.env.accessTokenSecret, function (err, user) {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(_status.status.unauthorized).json({
            error: err.message
          });
        }

        return res.status(_status.status.unauthorized).json({
          error: "Invalid token"
        });
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(_status.status.unauthorized);
  }
};

exports.authenticateJWT = authenticateJWT;

var authenticateGuest = function authenticateGuest(req, res, next) {
  var authHeader = req.headers.authorization;

  if (authHeader) {
    var token = authHeader.split(' ')[1];

    _jsonwebtoken["default"].verify(token, process.env.guestTokenSecret, function (err, user) {
      if (err) {
        return res.status(_status.status.unauthorized).json({
          error: "Invalid token"
        });
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(_status.status.unauthorized);
  }
};

exports.authenticateGuest = authenticateGuest;