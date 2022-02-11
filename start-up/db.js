const mongoose = require("mongoose");
const winston = require("winston");
const config=require('config');

module.exports=function(){
    const stringUrl=config.get('db');
    mongoose
    .connect(stringUrl,{ useUnifiedTopology: true})
    .then(() => winston.info(`Connected to ${stringUrl}...`))
    // .catch((err) => console.error("Could not connect to MongoDB..."));
}
