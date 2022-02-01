"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _routes = _interopRequireDefault(require("./app2/routes/routes"));

var _expressValidation = require("express-validation");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const app = (0, _express.default)();
const port = process.env.PORT || 6000;
app.use((0, _cors.default)());
app.use(_express.default.json()); //routes

(0, _routes.default)(app); //Global error handler

app.use(function (err, req, res, next) {
  if (err instanceof _expressValidation.ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(500).json(err);
}); //Route handler

app.use((req, res, next) => {
  res.status(404);

  if (req.accepts("json")) {
    res.send({
      error: true,
      message: "Route Not found"
    });
    return;
  }
});
app.listen(port, () => {
  console.log("app is listening on port " + port);
});
