const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/user");
const auth = require("./routes/auth");
const express = require("express");
const app = express();
const config = require("config");
const handler=require('./middleware/error-handling');
const winston = require("winston");
require("winston-mongodb");


// process.on('uncaughtException',ex=>{
//   console.log('uncaughtException outside express app');
//   winston.error(ex.message,ex);
// })

// process.on('unhandledRejection',ex=>{
//   console.log('unhandledRejection outside express app');
//   winston.error(ex.message,ex);
// })

winston.exceptions.handle(new winston.transports.File({filename:"unhandledException.log"}))

// winston.add(new winston.transports.File({filename:"unhandledException.log",handleExceptions:true}));
winston.add(new winston.transports.File({filename:"errorLog.log"}));
winston.add(new winston.transports.MongoDB({db:"mongodb://localhost/vidly"}));
// new winston.transports.File({ filename: "combined.log" });


if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR : jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  // .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(handler)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
