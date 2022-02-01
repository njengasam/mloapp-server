"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = void 0;

var _knex = _interopRequireDefault(require("knex"));

require("dotenv/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var db = (0, _knex["default"])({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL
  }
});
exports.db = db;