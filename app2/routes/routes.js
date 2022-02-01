"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _controller = require("../controllers/controller.js");

var _default = function _default(app) {
  // prediction endpoints
  app.post("/predictions", _controller.Predict.getPrediction); // app.post("/predictions/save", Predict.savePrediction);
};

exports["default"] = _default;