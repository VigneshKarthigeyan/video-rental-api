const winston = require("winston");
require("winston-mongodb");

module.exports = function () {
  // process.on('uncaughtException',ex=>{
  //   console.log('uncaughtException outside express app');
  //   winston.error(ex.message,ex);
  // })

  // process.on('unhandledRejection',ex=>{
  //   console.log('unhandledRejection outside express app');
  //   winston.error(ex.message,ex);
  // })

  // winston.add(
  //   new winston.transports.Console({
  //     colorize: true,
  //     prettyPrint: true,
  //     handleExceptions: true,
  //   })
  // );
  winston.add(
    new winston.transports.File({
      filename: "unhandledException.log",
      handleExceptions: true,
    })
  );
  winston.add(new winston.transports.File({ filename: "errorLog.log" }));
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/vidly",
      level: "info",
      options:{useUnifiedTopology: true}
    })
  );
};
