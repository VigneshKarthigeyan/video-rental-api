const express = require("express");
const winston = require("winston");
const app = express();

require('./start-up/logging')();
require('./start-up/routes')(app);
require('./start-up/db')();
require('./start-up/config')();
require('./start-up/joi_validation')();

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));