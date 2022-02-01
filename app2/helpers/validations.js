"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.empty = exports.isEmpty = exports.validatePassword = exports.isValidEmail = void 0;

/**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
var isValidEmail = function isValidEmail(email) {
  var regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};
/**
   * validatePassword helper method
   * @param {string} password
   * @returns {Boolean} True or False
   */


exports.isValidEmail = isValidEmail;

var validatePassword = function validatePassword(password) {
  if (password.length <= 8 || password === '') {
    return false;
  }

  return true;
};
/**
   * isEmpty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */


exports.validatePassword = validatePassword;

var isEmpty = function isEmpty(input) {
  if (input === undefined || input === '') {
    return true;
  }

  if (input.replace(/\s/g, '').length) {
    return false;
  }

  return true;
};
/**
   * empty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */


exports.isEmpty = isEmpty;

var empty = function empty(input) {
  if (input === undefined || input === '') {
    return true;
  }
};

exports.empty = empty;