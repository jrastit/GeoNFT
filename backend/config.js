const _config = require("./config.json");
const secret = require("./.secret.json");
const _ = require("lodash");

var config = _.defaultsDeep(secret, _config);

module.exports = config;