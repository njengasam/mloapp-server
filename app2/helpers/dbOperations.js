"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkForExistence = void 0;

var _connection = require("../database/connection");

/**
   * check for existence helper method
   * @param {string} tbName table name
   * @param {{}} condition Object. {column : value, ...}
   * @returns {Boolean} True or False
   */
var checkForExistence = function checkForExistence(tbName, condition) {
  var query = (0, _connection.db)(tbName).where(condition);

  var exists = _connection.db.raw(query).wrap('exists (', ')');

  return _connection.db.select(exists).then(function (result) {
    return result[0].exists;
  })["catch"](function (err) {
    return err + '';
  });
};

exports.checkForExistence = checkForExistence;