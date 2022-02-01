"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Predict = void 0;

require("dotenv/config");

var _status = require("../helpers/status.js");

var _uuid = require("uuid");

var _clarifaiNodejsGrpc = require("clarifai-nodejs-grpc");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var grpc = require("@grpc/grpc-js");

var Predict = /*#__PURE__*/function () {
  function Predict() {
    _classCallCheck(this, Predict);
  }

  _createClass(Predict, null, [{
    key: "getPrediction",
    value: function getPrediction(req, res) {
      var imageUrl = req.body.imageUrl;
      var apiKey = process.env.API_KEY;

      var stub = _clarifaiNodejsGrpc.ClarifaiStub.grpc();

      var metadata = new grpc.Metadata();
      metadata.set("authorization", "Key ".concat(apiKey));
      stub.PostModelOutputs({
        model_id: "bd367be194cf45149e75f01d59f77ba7",
        inputs: [{
          data: {
            image: {
              url: imageUrl
            }
          }
        }]
      }, metadata, function (err, response) {
        if (err) {
          console.log("Error: " + err);
          return res.status(_status.status.bad).json({
            error: "unable to process your request"
          });
        }

        if (response.status.code !== 10000) {
          console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
          return res.status(_status.status.bad).json({
            error: "unable to process your request"
          });
        }

        var toPercentage = function toPercentage(value) {
          return Math.round(value * 100);
        };

        var data = [];

        var _iterator = _createForOfIteratorHelper(response.outputs[0].data.concepts),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var c = _step.value;
            data.push({
              id: (0, _uuid.v4)(),
              name: c.name,
              value: toPercentage(c.value)
            });
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return res.status(_status.status.success).json(data);
      });
    }
  }]);

  return Predict;
}();

exports.Predict = Predict;