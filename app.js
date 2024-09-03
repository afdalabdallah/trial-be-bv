require("dotenv").config();

console.log("Initializing...");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

const { errors, isCelebrateError } = require("celebrate");

console.log("Modules imported");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Celebrate error
// app.use(errors());

app.use((err, req, res, next) => {
  console.log(req);
  if (isCelebrateError(err)) {
    const errorBody =
      err.details.get("body") ||
      err.details.get("query") ||
      err.details.get("params");
    return res.status(422).json({
      error: "Validation Error",
      details: errorBody ? errorBody.details : err.details,
    });
  }
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
