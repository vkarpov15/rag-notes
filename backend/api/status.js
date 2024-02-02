'use strict';

const { version } = require('../../package.json');

const nodeVersion = process.version;

module.exports = async function status(req, res) {
  return res.json({ version, nodeVersion });
};