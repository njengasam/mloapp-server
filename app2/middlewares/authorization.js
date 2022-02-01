"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifiedVendor = exports.professionalOnly = exports.userOnly = exports.vendorOnly = exports.adminOnly = void 0;

require("dotenv/config");

var _status = require("../helpers/status");

var _dbOperations = require("../helpers/dbOperations");

var _connection = require("../database/connection");

var _process$env = process.env,
    adminRole = _process$env.adminRole,
    vendorRole = _process$env.vendorRole,
    userRole = _process$env.userRole,
    professionalRole = _process$env.professionalRole;

var adminOnly = function adminOnly(req, res, next) {
  if (req.user.role !== adminRole) {
    return res.sendStatus(_status.status.unauthorized);
  }

  next();
};

exports.adminOnly = adminOnly;

var vendorOnly = function vendorOnly(req, res, next) {
  if (req.user.role !== vendorRole) {
    return res.sendStatus(_status.status.unauthorized);
  }

  next();
};

exports.vendorOnly = vendorOnly;

var userOnly = function userOnly(req, res, next) {
  if (req.user.role !== userRole) {
    return res.sendStatus(_status.status.unauthorized);
  }

  next();
};

exports.userOnly = userOnly;

var professionalOnly = function professionalOnly(req, res, next) {
  if (req.user.role !== professionalRole) {
    return res.sendStatus(_status.status.unauthorized);
  }

  next();
};

exports.professionalOnly = professionalOnly;

var verifiedVendor = function verifiedVendor(req, res, next) {
  (0, _dbOperations.checkForExistence)('vendors', {
    vendor_id: req.user.id,
    verified: true
  }).then(function (exists) {
    if (!exists) {
      return res.status(_status.status.forbidden).json({
        error: "Your account has not been verified"
      });
    }

    next();
  })["catch"](function (err) {
    return res.status(_status.status.notfound).json({
      error: "Unable to check vendor"
    });
  });
};

exports.verifiedVendor = verifiedVendor;